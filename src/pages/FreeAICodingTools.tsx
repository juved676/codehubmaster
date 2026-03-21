import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Code2, 
  Lightbulb, 
  MessageSquare, 
  Zap,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Terminal
} from "lucide-react";

const FreeAICodingTools = () => {
  const faqData = [
    {
      question: "Are free AI coding tools effective for beginners?",
      answer: "Yes! Free AI coding tools provide instant explanations, debug help, and step-by-step guidance that makes learning faster and less frustrating for beginners."
    },
    {
      question: "Can I learn Python with an AI assistant for free?",
      answer: "Absolutely. Platforms like CodeHubMaster offer free AI-powered Python learning where you can ask questions, get code explanations, and practice interactively."
    },
    {
      question: "How does an AI tutor help with web development?",
      answer: "AI tutors guide you through HTML, CSS, and JavaScript step by step, help you build projects, fix errors, and understand layout concepts without overwhelming you."
    },
    {
      question: "Do I need prior coding experience to use AI coding tools?",
      answer: "No prior experience needed. AI coding tools are designed for complete beginners and explain concepts in simple, easy-to-understand language."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free AI Coding Tools for Beginners | Learn Python & Web Dev"
        description="Discover free AI coding tools for beginners. Learn Python with AI assistant and web development with AI tutor. Start coding without fear on CodeHubMaster."
        keywords="free AI coding tools for beginners, learn Python with AI assistant, learn web development with AI tutor, AI coding help, beginner programming"
        canonical="https://codehubmaster.site/free-ai-coding-tools-for-beginners"
        articleData={{
          publishedTime: "2026-01-31",
          modifiedTime: "2026-01-31",
          author: "CodeHubMaster",
          section: "AI Learning"
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.site" },
          { name: "Free AI Coding Tools", url: "https://codehubmaster.site/free-ai-coding-tools-for-beginners" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Free AI-Powered Learning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Free AI Coding Tools for Beginners: Learn Python & Web Development
              </h1>
              <p className="text-xl text-muted-foreground">
                Learning to code can be frustrating. Syntax errors, unclear tutorials, and lack of guidance slow down progress. That's why free AI coding tools for beginners are changing everything.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/ask">
                  <Button size="lg" className="gap-2">
                    Start Learning Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/python-with-ai">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Code2 className="w-4 h-4" /> Python with AI
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
                <div className="bg-card rounded-lg p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground ml-2">AI Code Assistant</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-muted-foreground"># AI helps you learn Python</div>
                    <div><span className="text-primary">def</span> <span className="text-accent-foreground">greet</span>(name):</div>
                    <div className="pl-4"><span className="text-primary">return</span> <span className="text-green-500">"Hello, "</span> + name</div>
                    <div className="mt-4 p-3 bg-primary/10 rounded border-l-4 border-primary">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-medium">AI Explanation</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">This function takes a name and returns a greeting message...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Beginners Need AI Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Beginners Need AI Coding Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most beginners struggle because traditional learning methods assume prior knowledge. AI changes this by acting like a personal tutor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ask in Simple Language</h3>
                <p className="text-muted-foreground text-sm">
                  No need for technical jargon. Ask questions naturally and get clear answers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Instant Explanations</h3>
                <p className="text-muted-foreground text-sm">
                  Understand concepts immediately without waiting for tutorials or searching forums.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Understand, Don't Memorize</h3>
                <p className="text-muted-foreground text-sm">
                  Learn why errors happen instead of just memorizing fixes. Build real understanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learn Python with AI Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium">
                <Terminal className="w-4 h-4" />
                Python Learning
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Learn Python with AI Assistant
              </h2>
              <p className="text-muted-foreground">
                Python is beginner-friendly, but learners still get stuck with logic and syntax. When you learn Python with AI assistant, learning becomes interactive and personalized.
              </p>
              
              <div className="space-y-4">
                {[
                  "Explaining Python concepts clearly",
                  "Writing example programs on demand",
                  "Debugging errors step by step",
                  "Understanding how and why code works"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/python-with-ai">
                <Button className="gap-2">
                  Explore Python with AI <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Code Illustration */}
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Python AI Tutor</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">🧑‍💻 Student asks:</p>
                  <p className="text-foreground">"How do I create a list in Python?"</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm text-primary mb-2">🤖 AI Assistant:</p>
                  <p className="text-foreground text-sm mb-3">A list in Python stores multiple items. Here's how:</p>
                  <div className="bg-background rounded p-3 font-mono text-sm">
                    <div>fruits = [<span className="text-green-500">"apple"</span>, <span className="text-green-500">"banana"</span>]</div>
                    <div className="text-muted-foreground"># Access: fruits[0] → "apple"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Article CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of beginners learning to code with AI guidance. No prior experience needed.
          </p>
          <Link to="/ask">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Start Learning with AI
            </Button>
          </Link>
        </div>
      </section>

      {/* Web Development Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Web Development AI Tutor</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-orange-500/10 rounded-lg p-3 text-center">
                      <Code2 className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-medium">HTML</span>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                      <Code2 className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <span className="text-xs font-medium">CSS</span>
                    </div>
                    <div className="bg-yellow-500/10 rounded-lg p-3 text-center">
                      <Code2 className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                      <span className="text-xs font-medium">JavaScript</span>
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm">AI guides you through building real websites step by step, explaining each concept clearly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                <Globe className="w-4 h-4" />
                Web Development
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Learn Web Development with AI Tutor
              </h2>
              <p className="text-muted-foreground">
                Web development involves HTML, CSS, and JavaScript, which can overwhelm beginners. When you learn web development with AI tutor, the process becomes structured and manageable.
              </p>
              
              <div className="space-y-4">
                {[
                  "Build basic websites from scratch",
                  "Understand layout and styling concepts",
                  "Fix frontend issues with AI guidance",
                  "Learn practical skills, not just theory"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/web-development-with-ai">
                <Button className="gap-2">
                  Explore Web Dev with AI <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Learning Matters Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Free Learning Matters</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Not every student can afford paid courses. That's why free AI coding tools for beginners are important. They allow students to explore coding before upgrading to advanced features.
          </p>
          <p className="text-muted-foreground">
            Many learners start free on CodeHubMaster and later move to advanced plans once confident.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg border px-6">
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Explore More AI Learning Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/ai-coding-for-beginners" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Coding for Beginners</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ai-projects-for-students" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Projects for Students</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/how-ai-helps-in-coding" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="font-medium">How AI Helps in Coding</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start Coding Without Fear</h2>
          <p className="text-lg text-muted-foreground mb-8">
            AI has changed how beginners learn coding. With AI guidance, learning Python and web development becomes faster and more enjoyable.
          </p>
          <p className="text-muted-foreground mb-8">
            All learning, coding, and project building happens directly on this AI-powered website.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Explore CodeHubMaster
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FreeAICodingTools;
