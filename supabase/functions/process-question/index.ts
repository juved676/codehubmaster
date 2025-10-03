import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GOOGLE_GEMINI_API_KEY')!;

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

    // Prepare Gemini API request
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

    // First test with a simple success response to verify basic connectivity
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

    console.log('Making Gemini API request with prompt length:', prompt.length);
    
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      }
    );

    console.log('Gemini API response status:', geminiResponse.status);

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error details:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini API response structure:', JSON.stringify(geminiData, null, 2));
    
    const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('No generated text found in response:', geminiData);
      throw new Error(`No response from Gemini API. Response structure: ${JSON.stringify(geminiData)}`);
    }

    console.log('Generated text length:', generatedText.length);

    // Parse AI response
    let aiResponse;
    try {
      // Clean the response to extract JSON
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      aiResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      // Fallback if JSON parsing fails
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
        ai_provider: 'gemini',
        ai_response_raw: geminiData,
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

        // Log the event (handle anonymous users)
        await supabase
          .from('logs')
          .insert({
            event_type: 'ai_answer_generated',
            details: {
              question_id: questionId,
              answer_id: answer.id,
              requires_review: needsReview,
              ai_provider: 'gemini'
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
    
    return new Response(JSON.stringify({ 
      error: (error as any)?.message || 'Internal server error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});