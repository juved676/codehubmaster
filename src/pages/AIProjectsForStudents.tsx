import { Link } from 'react-router-dom';
import { Bot, Code, Lightbulb, Rocket, Target, Users, CheckCircle, ArrowRight, Sparkles, BookOpen, Zap, FolderGit2, FileCode, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import { LaunchProjectCTA } from '@/components/LaunchProjectCTA';

export default function AIProjectsForStudents() {
  const projectExamples = [
    {
      title: "Python AI Chatbot",
      description: "Build a smart chatbot using Python and AI that can answer questions automatically.",
      level: "Beginner",
      icon: Bot
    },
    {
      title: "Image Recognition App",
      description: "Create an app that identifies objects in images using machine learning.",
      level: "Intermediate",
      icon: Target
    },
    {
      title: "AI-Powered Website",
      description: "Build a modern website with AI features like smart search and recommendations.",
      level: "Beginner",
      icon: Code
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Analyze text to understand emotions and opinions using AI algorithms.",
      level: "Intermediate",
      icon: Lightbulb
    },
    {
      title: "Voice Assistant",
      description: "Create your own voice-controlled assistant using Python and AI libraries.",
      level: "Advanced",
      icon: Sparkles
    },
    {
      title: "Recommendation System",
      description: "Build a system that suggests products or content based on user preferences.",
      level: "Advanced",
      icon: Zap
    }
  ];

  const problems = [
    "Don't know where to start with AI projects",
    "Confused by complex code and algorithms",
    "No access to source code or examples",
    "Stuck on errors with no help available",
    "Can't understand the logic behind AI code"
  ];

  const solutions = [
    {
      title: "Step-by-Step Guidance",
      description: "AI breaks down complex projects into simple, manageable steps you can follow.",
      icon: BookOpen
    },
    {
      title: "Instant Code Generation",
      description: "Get working source code for your projects instantly, explained line by line.",
      icon: FileCode
    },
    {
      title: "Learn While Building",
      description: "Understand the logic and concepts as you build real AI projects.",
      icon: GraduationCap
    },
    {
      title: "Error-Free Development",
      description: "AI helps you debug and fix issues so you never get stuck.",
      icon: CheckCircle
    }
  ];

  const faqs = [
    {
      question: "Where can I find AI projects for students with source code?",
      answer: "Right here on this website! Our AI generates complete project source code with explanations. You can learn concepts, understand the logic, and get working code for Python AI projects, web development projects, and more—all in one place."
    },
    {
      question: "Are there AI project PDFs or GitHub resources available?",
      answer: "Instead of searching for PDFs or GitHub repositories, you can use our AI-powered platform to generate custom projects tailored to your skill level. The AI provides complete code, documentation, and step-by-step guides that you can save and use offline."
    },
    {
      question: "Can beginners complete AI projects without prior experience?",
      answer: "Absolutely! Our platform is designed for beginners. The AI explains everything in simple language, breaks down complex concepts, and guides you through each step. You don't need prior AI or coding experience to start building projects."
    },
    {
      question: "What types of AI projects can students build on this website?",
      answer: "Students can build chatbots, image recognition apps, sentiment analysis tools, recommendation systems, voice assistants, AI-powered websites, and much more. Projects range from beginner to advanced levels in Python, web development, and machine learning."
    },
    {
      question: "How is this different from copying code from the internet?",
      answer: "Our AI doesn't just give you code—it teaches you. You'll understand WHY the code works, learn the logic behind each function, and be able to modify and improve projects on your own. This builds real skills, not just copy-paste habits."
    }
  ];

  return (
    <>
      <SEO 
        title="AI Projects for Students | Build Projects with AI Help & Source Code"
        description="Create AI projects for students with complete source code and step-by-step guidance. Build Python AI projects, web apps, and ML projects using AI on this platform."
        keywords="ai projects for students, ai project for student with source code, ai project for student github, ai projects pdf, python ai projects, student ai projects"
        canonical="https://codehubmaster.lovable.app/ai-projects-for-students"
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <FolderGit2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Project Builder</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                AI Projects for Students
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Build complete AI projects with source code, step-by-step guidance, and AI assistance. 
                From Python chatbots to ML apps—create real projects that work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ask">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    <Rocket className="h-5 w-5" />
                    Start Building Projects
                  </Button>
                </Link>
                <Link to="/topics">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    <BookOpen className="h-5 w-5" />
                    Browse Project Ideas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Are AI Projects */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">What Are AI Projects?</h2>
              <div className="bg-card rounded-2xl p-8 border shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Simple Explanation</h3>
                    <p className="text-muted-foreground">Understanding AI projects in plain language</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AI projects are applications that use artificial intelligence to solve real problems. 
                  These include chatbots that answer questions, apps that recognize images, systems that 
                  predict outcomes, and websites with smart features. As a student, building AI projects 
                  helps you understand how technology works and prepares you for future careers in tech.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Common Problems Students Face</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Most students struggle to complete AI projects because of these challenges
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-6 text-destructive">Why Students Fail</h3>
                  <ul className="space-y-4">
                    {problems.map((problem, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-destructive/10 rounded-full">
                          <span className="block w-2 h-2 bg-destructive rounded-full" />
                        </div>
                        <span className="text-muted-foreground">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-card rounded-2xl p-8 border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-16 w-16 text-primary" />
                    </div>
                    <p className="text-lg font-medium">AI Project Development Illustration</p>
                    <p className="text-sm text-muted-foreground">Students learning with AI assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How AI Solves These Problems</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered platform helps students build projects step by step
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {solutions.map((solution, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                          <solution.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                          <p className="text-muted-foreground">{solution.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose This Website */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose This Website for AI Projects</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent border-2">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileCode className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Complete Source Code</h3>
                    <p className="text-sm text-muted-foreground">Get working code with explanations, ready to use and learn from</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6 bg-gradient-to-br from-accent/5 to-transparent border-2">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Learn Concepts</h3>
                    <p className="text-sm text-muted-foreground">Understand the logic behind every line of code</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6 bg-gradient-to-br from-secondary/20 to-transparent border-2">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Instant Generation</h3>
                    <p className="text-sm text-muted-foreground">Generate custom projects tailored to your needs</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">AI-Powered Project Learning</h2>
              <p className="text-center text-muted-foreground mb-12">How it works in 4 simple steps</p>
              
              <div className="space-y-6">
                {[
                  { step: 1, title: "Choose Your Project", desc: "Browse project ideas or describe what you want to build" },
                  { step: 2, title: "AI Generates Code", desc: "Get complete source code with detailed explanations" },
                  { step: 3, title: "Learn the Logic", desc: "Understand how each part works through AI explanations" },
                  { step: 4, title: "Build & Customize", desc: "Modify the code and make the project your own" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-6 bg-card rounded-xl p-6 border">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Examples */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Beginner to Advanced AI Projects</h2>
              <p className="text-center text-muted-foreground mb-12">
                Explore project ideas you can build with AI assistance
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectExamples.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <project.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.level === 'Beginner' ? 'bg-green-500/10 text-green-600' :
                          project.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-red-500/10 text-red-600'
                        }`}>
                          {project.level}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8">Explore More AI Learning</h2>
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
                <Link to="/how-ai-helps-in-coding">
                  <Button variant="outline" className="gap-2">
                    <Lightbulb className="h-4 w-4" />
                    How AI Helps in Coding
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
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
        <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Build Your AI Projects with Help of AI</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop searching for PDFs and GitHub repos. Start building real projects with AI guidance right here.
              </p>
              <Link to="/ask">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Rocket className="h-5 w-5" />
                  Start Building Now
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
