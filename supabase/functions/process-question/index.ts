import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { questionId } = await req.json();
    
    console.log('Processing question:', questionId);

      // Get question details
      const { data: question, error: questionError } = await supabase
        .from('questions')
        .select('*')
        .eq('id', questionId)
        .maybeSingle();

    if (questionError || !question) {
      throw new Error('Question not found');
    }

    // Get relevant sources (simple keyword matching for now)
    const { data: sources } = await supabase
      .from('sources')
      .select('*')
      .limit(3);

    // Prepare context from sources
    const contextSnippets = sources?.map(s => 
      `[${s.type}] ${s.title}: ${s.text_snippet} (Citation: ${s.citation})`
    ).join('\n') || '';

    // Detect question complexity
    const isComplexQuestion = /multithreading|multi-threading|concurrent|parallel|distributed|system design|architecture|design pattern|algorithm complexity|big o|optimization|performance tuning|memory management|garbage collection|compiler|interpreter/i.test(question.body) ||
      question.body.length > 500;

    console.log('Question complexity detected:', isComplexQuestion ? 'COMPLEX' : 'SIMPLE');

    // Prepare DeepSeek API request with dynamic token allocation
    const maxTokens = isComplexQuestion ? 8192 : 2048;
    
    const prompt = `You are an expert coding instructor and debugging mentor for Indian students learning programming. Your role is to ACTIVELY TEACH coding concepts, not just answer questions.

TEACHING APPROACH:
1. Start with a clear explanation of the concept
2. Provide working code examples with detailed comments
3. Explain WHY things work, not just HOW
4. Include practical tips and best practices
5. Suggest next steps for deeper learning
6. Use simple language for beginners, technical depth for advanced learners

When explaining code:
- Break down complex concepts into simple steps
- Show both correct and common mistake examples
- Explain error messages if relevant
- Provide debugging strategies

${isComplexQuestion ? 'NOTE: This is a complex question requiring detailed explanation. Take your time to provide comprehensive coverage with multiple examples.' : ''}

Question: ${question.title}
Details: ${question.body}
Language: ${question.language}
Experience Level: ${question.audience_level}
Context: ${contextSnippets}

Response format (JSON):
{
  "answer_text": "Comprehensive explanation with code examples and teaching points",
  "short_summary": "40-word summary of key learning",
  "sources": ["Python Docs", "MDN", "GeeksforGeeks", "W3Schools"],
  "requires_review": false
}

Set requires_review=true only for: full project builds, production deployment questions, or security-sensitive topics.`;

    // Test mode for connectivity verification
    if (question.title.toLowerCase().includes('test')) {
      const testAnswer = {
        id: 'test-answer-id',
        question_id: questionId,
        answer_text: '🧪 Test successful! The edge function is working correctly.',
        summary_text: 'Edge function connectivity test passed',
        sources_used: [],
        ai_provider: 'test',
        confidence_score: 1.0,
        requires_review: false,
        published: true
      };

      const { data: answer, error: answerError } = await supabase
        .from('answers')
        .insert(testAnswer)
        .select()
        .single();

      if (answerError) throw answerError;

      return new Response(JSON.stringify({ 
        success: true,
        answer_id: answer.id,
        requires_review: false,
        published: true,
        test_mode: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Making DeepSeek API request with prompt length:', prompt.length, 'maxTokens:', maxTokens);
    
    // Retry mechanism with exponential backoff
    let deepseekResponse;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount <= maxRetries) {
      try {
        deepseekResponse = await fetch(
          'https://api.deepseek.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${deepseekApiKey}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                { role: 'system', content: 'You are an expert coding instructor and debugging mentor for Indian students learning programming.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.7,
              max_tokens: maxTokens,
              response_format: { type: 'json_object' }
            })
          }
        );

        if (deepseekResponse.ok) {
          break; // Success, exit retry loop
        }

        // Handle rate limits and server errors with retry
        if (deepseekResponse.status === 429 || deepseekResponse.status >= 500) {
          retryCount++;
          if (retryCount > maxRetries) {
            throw new Error(`DeepSeek API failed after ${maxRetries} retries: ${deepseekResponse.status}`);
          }
          
          const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
          console.log(`Retry ${retryCount}/${maxRetries} after ${backoffDelay}ms due to status ${deepseekResponse.status}`);
          await new Promise(resolve => setTimeout(resolve, backoffDelay));
          continue;
        }

        // For other errors, don't retry
        break;
      } catch (fetchError) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw new Error(`Network error after ${maxRetries} retries: ${fetchError.message}`);
        }
        
        const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        console.log(`Retry ${retryCount}/${maxRetries} after ${backoffDelay}ms due to network error`);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }

    console.log('DeepSeek API response status:', deepseekResponse.status);

    if (!deepseekResponse.ok) {
      const errorText = await deepseekResponse.text();
      console.error('DeepSeek API error details:', errorText);
      
      // Provide user-friendly error messages
      let userMessage = 'Failed to generate answer. Please try again.';
      if (deepseekResponse.status === 429) {
        userMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (deepseekResponse.status >= 500) {
        userMessage = 'AI service temporarily unavailable. Please try again in a few moments.';
      } else if (deepseekResponse.status === 400) {
        userMessage = 'Question format issue. Try rephrasing your question.';
      }
      
      throw new Error(userMessage);
    }

    const deepseekData = await deepseekResponse.json();
    console.log('DeepSeek API response structure:', JSON.stringify(deepseekData, null, 2));
    
    const generatedText = deepseekData.choices?.[0]?.message?.content;

    if (!generatedText) {
      console.error('No generated text found in response:', deepseekData);
      throw new Error(`No response from DeepSeek API. Response structure: ${JSON.stringify(deepseekData)}`);
    }

    console.log('Generated text length:', generatedText.length);

    // Parse AI response (DeepSeek returns JSON directly due to response_format)
    let aiResponse;
    try {
      aiResponse = JSON.parse(generatedText);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.error('JSON parse error:', parseError);
      aiResponse = {
        answer_text: generatedText,
        short_summary: generatedText.substring(0, 100) + '...',
        sources: [],
        requires_review: false
      };
    }

    // Calculate confidence score based on response quality
    const confidenceScore = aiResponse.requires_review ? 0.3 : 0.8;

    // Check for moderation flags
    const needsReview = aiResponse.requires_review || 
      /complex project|full application|complete system|build entire/i.test(question.body) ||
      confidenceScore < 0.6;

    // Save answer to database
    const { data: answer, error: answerError } = await supabase
      .from('answers')
      .insert({
        question_id: questionId,
        answer_text: aiResponse.answer_text,
        summary_text: aiResponse.short_summary,
        sources_used: aiResponse.sources || [],
        ai_provider: 'deepseek',
        ai_response_raw: deepseekData,
        confidence_score: confidenceScore,
        requires_review: needsReview,
        published: !needsReview
      })
      .select()
      .single();

    if (answerError) {
      throw answerError;
    }

    // Update question status
    await supabase
      .from('questions')
      .update({ 
        status: needsReview ? 'pending_review' : 'published' 
      })
      .eq('id', questionId);

    // Deduct credits for the user (if authenticated)
    if (question.user_id) {
      console.log('Deducting credits for user:', question.user_id);
      
      // Get current period
      const currentPeriod = Math.floor((new Date().getDate() - 1) / 10) + 1;
      
      // Try to deduct from active subscription first
      const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', question.user_id)
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString())
        .eq('current_period', currentPeriod)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (subscription && subscription.credits_remaining > 0) {
        // Deduct from subscription
        await supabase
          .from('user_subscriptions')
          .update({ 
            credits_remaining: subscription.credits_remaining - 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', subscription.id);
        
        console.log('Credits deducted from subscription. Remaining:', subscription.credits_remaining - 1);
      } else {
        // User has no active subscription, they're using free credits
        // Update user_usage table to track free credit usage
        const { data: usage } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', question.user_id)
          .maybeSingle();
        
        if (usage) {
          await supabase
            .from('user_usage')
            .update({
              credits_used_current_period: (usage.credits_used_current_period || 0) + 1
            })
            .eq('user_id', question.user_id);
        } else {
          // Create usage record if it doesn't exist
          await supabase
            .from('user_usage')
            .insert({
              user_id: question.user_id,
              credits_used_current_period: 1,
              current_period_number: currentPeriod
            });
        }
        
        console.log('Free credit used');
      }
    }

        // Log the event (handle anonymous users)
        await supabase
          .from('logs')
          .insert({
            event_type: 'ai_answer_generated',
            details: {
              question_id: questionId,
              answer_id: answer.id,
              requires_review: needsReview,
              ai_provider: 'deepseek'
            },
            user_id: question.user_id || null // Handle anonymous questions
          });

    console.log('Question processed successfully:', {
      questionId,
      answerId: answer.id,
      needsReview
    });

    return new Response(JSON.stringify({ 
      success: true,
      answer_id: answer.id,
      requires_review: needsReview,
      published: !needsReview
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing question:', error);
    
    // Log to database for monitoring
    try {
      await supabase
        .from('logs')
        .insert({
          event_type: 'edge_function_error',
          details: {
            function: 'process-question',
            error: (error as any)?.message || 'Unknown error',
            stack: (error as any)?.stack,
            timestamp: new Date().toISOString()
          },
          user_id: null
        });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
    
    // Return user-friendly error message
    const errorMessage = (error as any)?.message || 'Unable to process your question. Please try again or contact support.';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      retry: true // Indicate that retry is possible
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});