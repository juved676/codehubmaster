import { Link } from 'react-router-dom';
import { Bot, Code, Lightbulb, Rocket, Target, Brain, CheckCircle, ArrowRight, Sparkles, BookOpen, Zap, Shield, HelpCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import { LaunchProjectCTA } from '@/components/LaunchProjectCTA';

export default function HowAIHelpsInCoding() {
  const aiVsTraditional = [
    {
      aspect: "Learning Speed",
      traditional: "Months to understand basics",
      withAI: "Days to start building"
    },
    {
      aspect: "Error Handling",
      traditional: "Stuck for hours on bugs",
      withAI: "Instant explanations and fixes"
    },
    {
      aspect: "Code Understanding",
      traditional: "Copy without understanding",
      withAI: "Learn logic behind every line"
    },
    {
      aspect: "Practice",
      traditional: "Limited exercises available",
      withAI: "Unlimited custom challenges"
    },
    {
      aspect: "Support",
      traditional: "Wait for teacher/forum help",
      withAI: "24/7 instant assistance"
    }
  ];

  const codingLanguages = [
    { name: "Python", desc: "Most popular for AI and beginners", icon: "🐍" },
    { name: "JavaScript", desc: "Essential for web development", icon: "⚡" },
    { name: "HTML/CSS", desc: "Foundation of all websites", icon: "🎨" },
    { name: "SQL", desc: "Database management basics", icon: "🗃️" }
  ];

  const whoShouldLearn = [
    {
      title: "Complete Beginners",
      description: "Never written a line of code? AI explains everything from scratch in simple words.",
      icon: Sparkles
    },
    {
      title: "Students",
      description: "School or college projects? Get instant help with assignments and understand concepts.",
      icon: BookOpen
    },
    {
      title: "Career Changers",
      description: "Want to switch to tech? Learn coding faster with AI guidance and support.",
      icon: TrendingUp
    },
    {
      title: "Hobbyists",
      description: "Build personal projects and apps without struggling through complex tutorials.",
      icon: Zap
    }
  ];

  const howAIGuides = [
    {
      step: "Ask Any Question",
      description: "Type your coding question in plain English. No technical jargon needed.",
      icon: HelpCircle
    },
    {
      step: "Get Clear Explanations",
      description: "AI breaks down concepts into simple, easy-to-understand pieces.",
      icon: Lightbulb
    },
    {
      step: "See Working Code",
      description: "Get actual code examples with line-by-line explanations.",
      icon: Code
    },
    {
      step: "Practice & Improve",
      description: "Try exercises, get feedback, and build real projects.",
      icon: Target
    }
  ];

  const faqs = [
    {
      question: "What coding is used for AI?",
      answer: "Python is the most popular language for AI development because of its simple syntax and powerful libraries. However, JavaScript, R, and Java are also used. On this website, you can learn any of these languages with AI assistance, starting from the basics."
    },
    {
      question: "Do I need to know coding before learning AI?",
      answer: "No! Our AI-powered platform is designed for complete beginners. The AI explains coding concepts from scratch, so you can learn programming and AI together. Many students start with zero experience and successfully build AI projects."
    },
    {
      question: "Is coding required for AI jobs?",
      answer: "While some AI tools don't require coding, understanding programming gives you a huge advantage. It helps you customize solutions, debug issues, and build unique applications. Our platform teaches you coding in a way that's actually enjoyable."
    },
    {
      question: "How does AI make coding easier for beginners?",
      answer: "AI acts like a patient teacher who never gets tired. It explains errors, suggests improvements, generates examples, and answers questions 24/7. This removes the frustration that often causes beginners to give up on learning to code."
    },
    {
      question: "Can I really learn coding without a teacher?",
      answer: "Absolutely! Our AI provides personalized guidance based on your questions and skill level. It's like having a private tutor available whenever you need help. Many students prefer learning this way because they can go at their own pace."
    }
  ];

  return (
    <>
      <SEO 
        title="How AI Helps in Coding | Learn Programming with AI Assistance"
        description="Discover how AI helps in coding for beginners. Learn what coding is used for AI, whether coding is required, and how AI removes fear of programming."
        keywords="how ai helps in coding, what coding is used for ai, do ai need coding, is coding required for ai, learn coding with ai, ai coding assistant"
        canonical="https://codehubmaster.lovable.app/how-ai-helps-in-coding"
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
          <div className="absolute top-10 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <Brain className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium">AI-Powered Learning</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                How AI Helps in Coding
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how artificial intelligence removes the fear of coding and helps beginners 
                learn programming faster than ever before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ask">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    <Rocket className="h-5 w-5" />
                    Start Coding with AI
                  </Button>
                </Link>
                <Link to="/ai-coding-for-beginners">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    <Sparkles className="h-5 w-5" />
                    Beginner's Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Role AI Plays */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">What Role Does AI Play in Coding?</h2>
              <div className="bg-card rounded-2xl p-8 border shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      AI in coding acts as your intelligent assistant. It understands your questions, 
                      generates working code, explains complex concepts in simple words, and helps you 
                      debug errors instantly.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Think of it as having a patient teacher available 24/7 who never judges your 
                      questions and always explains things at your level.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <Bot className="h-20 w-20 text-primary" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">AI Helping in Coding Process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Do Beginners Need Coding */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Do Beginners Need to Know Coding Before AI?</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                The simple answer: No! Here's why that's great news for you.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">The Good News</h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• AI explains coding from absolute zero</li>
                      <li>• No prior experience required</li>
                      <li>• Learn at your own pace</li>
                      <li>• Ask any question, no matter how basic</li>
                      <li>• Get personalized guidance</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-6 w-6 text-accent-foreground" />
                      <h3 className="text-xl font-semibold">AI Removes Fear</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Many students fear coding because of complex syntax, confusing errors, and 
                      overwhelming tutorials. AI changes this by breaking everything down into 
                      simple steps, explaining errors in plain language, and encouraging you 
                      to experiment without fear.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coding Languages for AI */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">What Coding Languages Are Used in AI?</h2>
              <p className="text-center text-muted-foreground mb-12">
                Here are the main languages you can learn with AI on this website
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {codingLanguages.map((lang, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{lang.icon}</div>
                      <h3 className="font-semibold text-lg mb-1">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground">{lang.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI vs Traditional Comparison */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">AI vs Traditional Coding</h2>
              <p className="text-center text-muted-foreground mb-12">A beginner's comparison</p>
              
              <div className="bg-card rounded-2xl border overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 font-semibold text-center">
                  <div>Aspect</div>
                  <div className="text-destructive">Traditional Learning</div>
                  <div className="text-primary">With AI</div>
                </div>
                {aiVsTraditional.map((item, index) => (
                  <div key={index} className={`grid grid-cols-3 gap-4 p-4 text-center ${index % 2 === 0 ? '' : 'bg-muted/20'}`}>
                    <div className="font-medium">{item.aspect}</div>
                    <div className="text-muted-foreground text-sm">{item.traditional}</div>
                    <div className="text-sm text-primary">{item.withAI}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How AI Guides Students */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">How AI Guides Students Step by Step</h2>
              <p className="text-center text-muted-foreground mb-12">
                The learning process is simple and effective
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {howAIGuides.map((item, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">{item.step}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Learn */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Who Should Learn Coding with AI?</h2>
              <p className="text-center text-muted-foreground mb-12">AI-assisted learning works for everyone</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whoShouldLearn.map((item, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all group">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Practice on Website */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 md:p-12 border shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <Code className="h-24 w-24 text-primary" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Student Building Projects with AI</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Learn & Practice Coding with AI on This Website</h2>
                    <p className="text-muted-foreground mb-6">
                      Everything you need is right here. Ask questions, get code examples, 
                      understand concepts, and build real projects—all with AI assistance.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span>Instant answers to coding questions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span>Working code with explanations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span>Learn Python, Web Dev, AI & more</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span>Build projects step by step</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8">Continue Your AI Learning Journey</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/ai-coding-for-beginners">
                  <Button variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Coding for Beginners
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/python-with-ai">
                  <Button variant="outline" className="gap-2">
                    <Code className="h-4 w-4" />
                    Python with AI
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/web-development-with-ai">
                  <Button variant="outline" className="gap-2">
                    <Target className="h-4 w-4" />
                    Web Development with AI
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/ai-projects-for-students">
                  <Button variant="outline" className="gap-2">
                    <Rocket className="h-4 w-4" />
                    AI Projects for Students
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-card border rounded-xl px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Start Coding with AI Guidance</h2>
              <p className="text-lg text-muted-foreground mb-8">
                No experience needed. No fear required. Just you and AI, building amazing things together.
              </p>
              <Link to="/ask">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Rocket className="h-5 w-5" />
                  Begin Learning Now
                </Button>
              </Link>
              <p className="mt-8 text-sm text-muted-foreground">
                All learning, coding, and project building happens directly on this AI-powered website.
              </p>
            </div>
          </div>
        </section>

        {/* Launch CTA */}
        <LaunchProjectCTA variant="compact" />
      </main>
    </>
  );
}
