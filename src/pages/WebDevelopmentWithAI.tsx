import { Link } from 'react-router-dom';
import { Bot, Code, Lightbulb, Rocket, Zap, BookOpen, CheckCircle, HelpCircle, ArrowRight, Sparkles, Brain, Globe, Layout, Palette, FileCode, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SEO } from '@/components/SEO';
import { useState } from 'react';

const WebDevelopmentWithAI = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const studentProblems = [
    { icon: Code, title: "Complex Syntax", description: "HTML, CSS, and JavaScript have different rules that confuse beginners" },
    { icon: Layout, title: "Responsive Design", description: "Making websites look good on all devices is challenging" },
    { icon: Palette, title: "Design Skills", description: "Creating attractive layouts without design experience" },
    { icon: Server, title: "Debugging", description: "Finding and fixing errors in web code is time-consuming" },
  ];

  const aiHelps = [
    { title: "Generate HTML/CSS", description: "Describe your website layout, and AI creates the complete code structure", icon: FileCode },
    { title: "Write JavaScript", description: "Need interactivity? Describe the feature, and AI writes the JavaScript", icon: Code },
    { title: "Fix Design Issues", description: "AI suggests CSS fixes and responsive design solutions instantly", icon: Palette },
    { title: "Debug Code", description: "Paste your code and error, get instant fixes with explanations", icon: Zap },
  ];

  const techExamples = [
    { 
      tech: "HTML with AI", 
      description: "Create semantic, accessible HTML structures instantly",
      examples: ["Page layouts", "Forms", "Tables", "Navigation menus"],
      color: "bg-orange-500"
    },
    { 
      tech: "CSS with AI", 
      description: "Generate beautiful styles and responsive designs",
      examples: ["Flexbox layouts", "Animations", "Color schemes", "Mobile-first design"],
      color: "bg-blue-500"
    },
    { 
      tech: "JavaScript with AI", 
      description: "Add interactivity and dynamic features easily",
      examples: ["Form validation", "DOM manipulation", "API calls", "Event handling"],
      color: "bg-yellow-500"
    },
  ];

  const projectExamples = [
    { title: "Portfolio Website", description: "Showcase your work professionally", difficulty: "Beginner" },
    { title: "Landing Page", description: "Marketing page with CTA buttons", difficulty: "Beginner" },
    { title: "Blog Template", description: "Multi-page blog with navigation", difficulty: "Intermediate" },
    { title: "E-commerce Layout", description: "Product cards and shopping cart UI", difficulty: "Intermediate" },
    { title: "Dashboard", description: "Admin panel with charts and tables", difficulty: "Advanced" },
    { title: "Interactive Form", description: "Multi-step form with validation", difficulty: "Intermediate" },
  ];

  const faqs = [
    { question: "What is AI-powered web development?", answer: "AI-powered web development uses artificial intelligence to help you create websites faster. Instead of writing every line of code manually, you describe what you want, and AI generates HTML, CSS, and JavaScript code for you. It also helps fix errors, explains concepts, and guides you through building complete websites." },
    { question: "What problems do students face in web development?", answer: "Students often struggle with understanding different languages (HTML, CSS, JavaScript), making responsive designs that work on all devices, creating visually appealing layouts, debugging errors, and keeping up with constantly changing technologies. AI solves all these problems by providing instant help and code generation." },
    { question: "How does AI help build websites faster?", answer: "AI accelerates web development by generating boilerplate code instantly, suggesting design improvements, fixing bugs automatically, creating responsive layouts on request, and providing step-by-step guidance. What might take hours manually can be done in minutes with AI assistance." },
    { question: "Can I learn HTML, CSS, and JavaScript with AI?", answer: "Absolutely! On our platform, AI teaches you web development by generating code with explanations, answering your questions in simple language, showing you best practices, and helping you build real projects. You learn by doing, with AI as your patient tutor." },
    { question: "What web projects can I build with AI help?", answer: "You can build any type of website: portfolios, landing pages, blogs, e-commerce sites, dashboards, forms, and more. AI helps with the entire process—from planning the structure to writing code to fixing issues. Start simple and gradually build more complex projects." },
  ];

  return (
    <>
      <SEO 
        title="Web Development with AI | Build Websites with AI Assistant"
        description="Learn web development with AI assistance. Generate HTML, CSS, and JavaScript code instantly. Build responsive websites faster with our AI-powered platform."
        keywords="web development with ai, ai website builder, html css ai, javascript ai, build websites with ai"
        canonical="https://codehubmaster.lovable.app/web-development-with-ai"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-600/10 via-background to-emerald-500/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-6">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Web Development</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Web Development with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build stunning websites faster than ever. Our AI generates HTML, CSS, and JavaScript code 
              while teaching you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ask">
                <Button size="lg" className="gap-2 text-lg px-8 bg-green-600 hover:bg-green-700">
                  <Rocket className="h-5 w-5" />
                  Build Websites with AI
                </Button>
              </Link>
              <Link to="/topic/web-development">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <BookOpen className="h-5 w-5" />
                  Web Dev Tutorials
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* What is AI-Powered Web Development Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What is AI-Powered Web Development?</h2>
              <p className="text-lg text-muted-foreground">The future of building websites is here</p>
            </div>
            
            <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Globe className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed mb-4">
                      <strong>AI-powered web development</strong> transforms how you create websites. Instead of 
                      struggling with complex code, you describe what you want, and AI builds it for you:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Generate complete HTML page structures from simple descriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Create beautiful CSS styles and responsive layouts instantly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Add JavaScript interactivity by describing the features you need</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Debug and fix issues with AI-powered error analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problems Students Face Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Problems Students Face in Web Development</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common challenges that slow down your learning—AI solves them all
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studentProblems.map((item, index) => (
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

      {/* How AI Helps Build Websites Section */}
      <section className="py-16 bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Helps Build Websites Faster</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant accelerates every step of web development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiHelps.map((item, index) => (
              <Card key={index} className="border-green-500/20 hover:border-green-500/40 transition-all hover:shadow-xl">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
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

      {/* Learn Web Dev on Our Website Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Web Development with AI on Our Website</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Master HTML, CSS, and JavaScript with intelligent AI assistance
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-2 border-green-500/20 hover:border-green-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ask Web Dev Questions</h3>
                  <p className="text-muted-foreground mb-4">Get instant HTML, CSS, JavaScript answers with working code</p>
                  <Link to="/ask">
                    <Button variant="outline" className="gap-2 border-green-500/50 hover:bg-green-500/10">
                      Ask AI <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-green-500/20 hover:border-green-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Web Dev Tutorials</h3>
                  <p className="text-muted-foreground mb-4">Structured lessons from HTML basics to advanced JavaScript</p>
                  <Link to="/topic/web-development">
                    <Button variant="outline" className="gap-2 border-emerald-500/50 hover:bg-emerald-500/10">
                      Start Learning <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-green-500/20 hover:border-green-500 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Launch Your Site</h3>
                  <p className="text-muted-foreground mb-4">Put your website online with our hosting guide</p>
                  <Link to="/hosting-guide">
                    <Button variant="outline" className="gap-2 border-teal-500/50 hover:bg-teal-500/10">
                      Go Live <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* HTML, CSS, JavaScript with AI Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HTML, CSS, JavaScript with AI</h2>
            <p className="text-lg text-muted-foreground">Master all three core web technologies with AI assistance</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {techExamples.map((tech, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-2 ${tech.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className={`h-5 w-5 ${tech.color.replace('bg-', 'text-')}`} />
                    {tech.tech}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Examples Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Projects You Can Build</h2>
            <p className="text-lg text-muted-foreground">Real projects you'll create with AI assistance</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectExamples.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow hover:border-green-500/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-600' :
                      project.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-purple-500/10 text-purple-600'
                    }`}>
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
      <section className="py-12 bg-muted/30">
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
              <Link to="/python-with-ai" className="group">
                <Card className="hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Code className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Python with AI</h3>
                      <p className="text-sm text-muted-foreground">Master Python programming with AI</p>
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Common questions about web development with AI</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Websites with AI on This Platform</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Everything you learn and build is available directly on this website using AI. 
            Start creating stunning websites today with intelligent assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ask">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                <Globe className="h-5 w-5" />
                Start Building Websites Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDevelopmentWithAI;
