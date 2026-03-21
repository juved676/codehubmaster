import { Link } from 'react-router-dom';
import { Bot, Code, Lightbulb, Rocket, Zap, BookOpen, CheckCircle, HelpCircle, ArrowRight, Sparkles, Brain, Terminal, Database, BarChart3, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SEO } from '@/components/SEO';
import { useState } from 'react';

const PythonWithAI = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whyPythonAI = [
    { icon: BookOpen, title: "Easy to Learn", description: "Python's simple syntax makes it perfect for beginners, and AI makes it even easier" },
    { icon: Brain, title: "AI & ML Ready", description: "Python is the #1 language for artificial intelligence and machine learning" },
    { icon: Zap, title: "Fast Development", description: "Build working applications quickly with AI-assisted code generation" },
    { icon: Database, title: "Versatile", description: "Use Python for web apps, data science, automation, and more" },
  ];

  const aiHelps = [
    { title: "Write Python Code", description: "Describe what you need in plain English, and AI generates clean, working Python code", icon: Code },
    { title: "Debug Errors", description: "Paste your error message, and AI explains what went wrong and how to fix it", icon: Terminal },
    { title: "Explain Concepts", description: "Ask about any Python concept—loops, functions, classes—and get simple explanations", icon: Lightbulb },
    { title: "Build Projects", description: "Get step-by-step guidance to create complete Python applications", icon: Rocket },
  ];

  const projectExamples = [
    { 
      title: "Calculator App", 
      description: "Build a calculator that performs math operations", 
      difficulty: "Beginner",
      color: "bg-green-500"
    },
    { 
      title: "Weather Checker", 
      description: "Create an app that shows weather for any city", 
      difficulty: "Beginner",
      color: "bg-green-500"
    },
    { 
      title: "Todo List Manager", 
      description: "Build a task manager with add, delete, and complete features", 
      difficulty: "Beginner",
      color: "bg-green-500"
    },
    { 
      title: "Data Analyzer", 
      description: "Analyze CSV files and create charts", 
      difficulty: "Intermediate",
      color: "bg-yellow-500"
    },
    { 
      title: "Web Scraper", 
      description: "Extract information from websites automatically", 
      difficulty: "Intermediate",
      color: "bg-yellow-500"
    },
    { 
      title: "Chatbot", 
      description: "Create an AI-powered chatbot using Python", 
      difficulty: "Advanced",
      color: "bg-purple-500"
    },
  ];

  const faqs = [
    { question: "What is Python with AI?", answer: "Python with AI means using artificial intelligence tools to help you learn and write Python code. The AI assistant can explain Python concepts, generate code from your descriptions, fix errors, and guide you through building projects—all in simple language that beginners can understand." },
    { question: "Why is Python the best language for AI?", answer: "Python is the most popular language for AI because it has simple syntax, powerful libraries like TensorFlow and PyTorch, a huge community, and extensive documentation. Most AI and machine learning frameworks are built for Python first." },
    { question: "Can I learn Python without any coding experience?", answer: "Absolutely! Python is often recommended as the first programming language for beginners. With AI assistance on our platform, learning becomes even easier because you get instant help, code explanations, and personalized guidance whenever you need it." },
    { question: "How does AI help me write Python code?", answer: "You can describe what you want to build in plain English, like 'create a function that calculates the average of a list of numbers,' and the AI generates working Python code. It also explains each line so you learn while building." },
    { question: "What Python projects can I build with AI help?", answer: "You can build anything from simple calculators and todo apps to complex projects like web scrapers, data analyzers, chatbots, and machine learning models. Our AI helps you at every step, regardless of project complexity." },
  ];

  return (
    <>
      <SEO 
        title="Python with AI | Learn Python Programming with AI Assistant"
        description="Master Python programming with AI assistance. Get instant code generation, error debugging, and step-by-step project guidance. Perfect for students and beginners."
        keywords="python with ai, learn python ai, python ai tutorial, python code generator, ai python programming"
        canonical="https://codehubmaster.site/python-with-ai"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600/10 via-background to-cyan-500/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Python Learning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Python with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn Python programming the smart way. Our AI assistant writes code, explains concepts, 
              and helps you build real projects—all in simple language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ask">
                <Button size="lg" className="gap-2 text-lg px-8 bg-blue-600 hover:bg-blue-700">
                  <Bot className="h-5 w-5" />
                  Learn Python with AI Here
                </Button>
              </Link>
              <Link to="/topic/python-basics">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <BookOpen className="h-5 w-5" />
                  Python Tutorials
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* What is Python with AI Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What is Python with AI?</h2>
              <p className="text-lg text-muted-foreground">The most powerful combination for learning programming</p>
            </div>
            
            <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Terminal className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed mb-4">
                      <strong>Python with AI</strong> combines the world's most beginner-friendly programming language 
                      with intelligent AI assistance. This means you can:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Write Python code by describing what you want in plain English</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Understand complex concepts through simple AI explanations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Debug errors instantly with AI-powered error analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Build complete Python projects with step-by-step AI guidance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Python + AI is Best Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Python + AI is Best for Students</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The perfect combination for learning programming and building your future career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyPythonAI.map((item, index) => (
              <Card key={index} className="border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                    <item.icon className="h-6 w-6 text-blue-500" />
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

      {/* How AI Helps Write Python Section */}
      <section className="py-16 bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Helps You Write Python Code</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant makes Python programming easy and fun
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiHelps.map((item, index) => (
              <Card key={index} className="border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-xl">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learn Python on Our Website Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Python with AI on Our Website</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your Python journey today with our AI-powered learning platform
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-2 border-blue-500/20 hover:border-blue-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ask Python Questions</h3>
                  <p className="text-muted-foreground mb-4">Get instant answers to any Python question with code examples</p>
                  <Link to="/ask">
                    <Button variant="outline" className="gap-2 border-blue-500/50 hover:bg-blue-500/10">
                      Ask AI <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-blue-500/20 hover:border-blue-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Python Tutorials</h3>
                  <p className="text-muted-foreground mb-4">Follow structured lessons from basics to advanced topics</p>
                  <Link to="/topic/python-basics">
                    <Button variant="outline" className="gap-2 border-cyan-500/50 hover:bg-cyan-500/10">
                      Start Learning <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-blue-500/20 hover:border-blue-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Data Science Path</h3>
                  <p className="text-muted-foreground mb-4">Learn Python for data analysis and visualization</p>
                  <Link to="/topic/data-science">
                    <Button variant="outline" className="gap-2 border-teal-500/50 hover:bg-teal-500/10">
                      Explore <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Python Projects Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Python Project Examples</h2>
            <p className="text-lg text-muted-foreground">Build these projects with AI assistance on our platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectExamples.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 ${project.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${project.color}/10 ${project.color.replace('bg-', 'text-')}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
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
              <Link to="/ai-coding-for-beginners" className="group">
                <Card className="hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">AI Coding for Beginners</h3>
                      <p className="text-sm text-muted-foreground">Start your coding journey with AI</p>
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
                      <p className="text-sm text-muted-foreground">Build websites faster with AI</p>
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
              <p className="text-lg text-muted-foreground">Common questions about learning Python with AI</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Learn Python with AI Here</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Everything you learn and build is available directly on this website using AI. 
            Start writing Python code today with intelligent assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ask">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                <Terminal className="h-5 w-5" />
                Start Python with AI Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PythonWithAI;
