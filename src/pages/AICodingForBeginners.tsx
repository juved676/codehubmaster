import { Link } from 'react-router-dom';
import { Bot, Code, Lightbulb, Rocket, Zap, BookOpen, CheckCircle, HelpCircle, ArrowRight, Sparkles, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SEO } from '@/components/SEO';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

const AICodingForBeginners = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const struggles = [
    { icon: Code, title: "Complex Syntax", description: "Programming languages have strict rules that confuse beginners" },
    { icon: Target, title: "No Guidance", description: "Students don't know where to start or what to learn first" },
    { icon: Lightbulb, title: "Error Frustration", description: "Small mistakes cause big errors that are hard to fix" },
    { icon: BookOpen, title: "Overwhelming Resources", description: "Too many tutorials, but no clear learning path" },
  ];

  const aiSolutions = [
    { title: "Instant Code Help", description: "AI explains errors in simple words and fixes them for you", icon: Zap },
    { title: "Step-by-Step Learning", description: "Get personalized guidance based on your skill level", icon: Target },
    { title: "Code Generation", description: "Describe what you want, and AI writes the code for you", icon: Sparkles },
    { title: "24/7 AI Tutor", description: "Ask questions anytime and get instant, accurate answers", icon: Bot },
  ];

  const projects = [
    { category: "Python", examples: ["Calculator App", "Weather Checker", "Quiz Game", "Data Analyzer"] },
    { category: "Web Development", examples: ["Portfolio Website", "Landing Page", "Blog Template", "Contact Form"] },
    { category: "AI Projects", examples: ["Chatbot", "Image Classifier", "Text Analyzer", "Prediction Model"] },
  ];

  const faqs = [
    { question: "What is AI coding for beginners?", answer: "AI coding means using artificial intelligence tools to help you write, understand, and debug code. For beginners, AI acts like a smart tutor that explains concepts in simple language, writes code when you describe what you need, and helps fix errors instantly." },
    { question: "Do I need programming experience to start?", answer: "No! AI coding is perfect for complete beginners. Our AI assistant guides you from the very basics, explains everything in simple terms, and helps you build real projects even if you've never written a single line of code before." },
    { question: "How does AI help me learn coding faster?", answer: "AI provides instant feedback, fixes your errors in real-time, generates code examples, and answers your questions 24/7. Instead of spending hours searching for solutions, you get immediate help and can focus on learning concepts." },
    { question: "What programming languages can I learn with AI?", answer: "On our platform, you can learn Python, HTML, CSS, JavaScript, and explore AI/Machine Learning. Our AI assistant supports all these languages and helps you build projects in each area." },
    { question: "Is AI coding the future of programming?", answer: "Yes! AI is transforming how developers work. Learning to code with AI gives you a competitive advantage. You'll learn both traditional programming skills and how to effectively use AI tools—skills that are highly valued in today's tech industry." },
  ];

  return (
    <>
      <SEO 
        title="AI Coding for Beginners | Learn Programming with AI Assistant"
        description="Start your coding journey with AI assistance. Learn Python, Web Development, and build real projects with our AI-powered platform. Perfect for complete beginners."
        keywords="ai coding for beginners, learn coding with ai, ai programming tutorial, beginner coding ai, ai code helper"
        canonical="https://codehubmaster.lovable.app/ai-coding-for-beginners"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI Coding for Beginners
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your programming journey with an AI assistant that teaches, guides, and codes with you. 
              No experience needed—just your curiosity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ask">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Rocket className="h-5 w-5" />
                  Start Learning with AI
                </Button>
              </Link>
              <Link to="/topic/python-basics">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <BookOpen className="h-5 w-5" />
                  Browse Tutorials
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* What is AI Coding Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What is AI Coding?</h2>
              <p className="text-lg text-muted-foreground">Understanding the future of programming</p>
            </div>
            
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                      <Brain className="h-16 w-16 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed mb-4">
                      <strong>AI Coding</strong> is a modern way of learning and writing computer programs with the help of 
                      Artificial Intelligence. Instead of struggling alone with complex syntax and confusing errors, 
                      you have a smart AI assistant that:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Explains programming concepts in simple, easy-to-understand language</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Writes code for you when you describe what you want to build</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Finds and fixes errors instantly, teaching you along the way</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Answers your questions 24/7 like a personal coding tutor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Beginners Struggle Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Beginners Struggle with Coding</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These common challenges stop most people from learning to code. AI solves all of them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {struggles.map((item, index) => (
              <Card key={index} className="border-destructive/20 bg-gradient-to-br from-card to-destructive/5 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-2">
                    <item.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How AI Solves Problems Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Solves Your Coding Problems</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform turns coding struggles into smooth learning experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiSolutions.map((solution, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                    <solution.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learn on Our Website Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn AI Coding on Our Website</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to start your coding journey is right here
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-2 border-primary/20 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ask AI Questions</h3>
                  <p className="text-muted-foreground mb-4">Type any coding question and get instant, accurate answers with code examples</p>
                  <Link to="/ask">
                    <Button variant="outline" className="gap-2">
                      Try Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-primary/20 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Follow Tutorials</h3>
                  <p className="text-muted-foreground mb-4">Step-by-step guides with AI assistance to learn at your own pace</p>
                  <Link to="/topics">
                    <Button variant="outline" className="gap-2">
                      Browse Topics <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-primary/20 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Build Projects</h3>
                  <p className="text-muted-foreground mb-4">Create real applications with AI-generated code and guidance</p>
                  <Link to="/hosting-guide">
                    <Button variant="outline" className="gap-2">
                      Launch Project <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Project Examples Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects You Can Build with AI</h2>
            <p className="text-lg text-muted-foreground">Real examples of what beginners create on our platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-2 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className={`h-5 w-5 ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-green-500' : 'text-purple-500'}`} />
                    {project.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore More AI Learning Paths</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/python-with-ai" className="group">
                <Card className="hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Code className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Python with AI</h3>
                      <p className="text-sm text-muted-foreground">Master Python programming with AI assistance</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
              <Link to="/web-development-with-ai" className="group">
                <Card className="hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Web Development with AI</h3>
                      <p className="text-sm text-muted-foreground">Build websites faster with AI tools</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Everything you need to know about AI coding for beginners</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="font-medium text-left">{faq.question}</span>
                        </div>
                        <ArrowRight className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-muted-foreground pl-8">{faq.answer}</p>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Learning with AI Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Everything you learn and build is available directly on this website using AI. 
            No complex setup, no confusing tools—just start coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ask">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                <Rocket className="h-5 w-5" />
                Start Learning with AI on This Website
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AICodingForBeginners;
