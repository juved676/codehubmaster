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
  Database, 
  TrendingUp, 
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Workflow,
  Zap,
  BookOpen,
  Code2,
  Lightbulb
} from "lucide-react";

const AIToolsDataScience = () => {
  const faqData = [
    {
      question: "What are the best AI tools for data science beginners?",
      answer: "AI-powered platforms like CodeHubMaster help beginners by explaining data concepts, generating Python code for analysis, and fixing errors in data pipelines—all with step-by-step guidance."
    },
    {
      question: "Can AI help automate Python data analysis?",
      answer: "Yes! AI tools can automate dataset cleaning, generate analysis scripts, and create visualizations, allowing you to focus on insights rather than repetitive coding tasks."
    },
    {
      question: "Is there a free AI tutor for learning data science?",
      answer: "CodeHubMaster offers free AI-powered guidance for data science learners. You can ask questions, get code explanations, and practice with real datasets."
    },
    {
      question: "Do I need prior Python knowledge for data science with AI?",
      answer: "While basic Python helps, AI tutors can teach you Python alongside data science concepts, making it accessible even for complete beginners."
    }
  ];

  const struggles = [
    { icon: Workflow, text: "Understanding complex data workflows" },
    { icon: Code2, text: "Writing long Python scripts for analysis" },
    { icon: Database, text: "Cleaning and processing messy datasets" },
    { icon: BarChart3, text: "Creating meaningful visualizations" }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Concept Explanation",
      description: "AI explains data science concepts in simple terms, not textbook jargon"
    },
    {
      icon: Code2,
      title: "Code Generation",
      description: "Generate Python code for analysis, visualization, and data processing"
    },
    {
      icon: Zap,
      title: "Error Debugging",
      description: "Fix errors in your data pipelines with AI-guided debugging"
    },
    {
      icon: TrendingUp,
      title: "Pipeline Automation",
      description: "Learn to automate repetitive data tasks efficiently"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Tools for Data Science Beginners | Learn Data Analysis with AI"
        description="Discover AI tools for data science beginners. Learn Python data analysis with a free AI tutor. Automate data pipelines and build real projects on CodeHubMaster."
        keywords="AI tools for data science beginners, data science AI tutor free, AI tools for automating Python data analysis pipelines, learn data science, Python data analysis"
        canonical="https://codehubmaster.lovable.app/ai-tools-for-data-science"
        articleData={{
          publishedTime: "2026-01-31",
          modifiedTime: "2026-01-31",
          author: "CodeHubMaster",
          section: "Data Science"
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "AI Tools for Data Science", url: "https://codehubmaster.lovable.app/ai-tools-for-data-science" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-cyan-500/5 via-background to-purple-500/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 text-sm font-medium">
                <Database className="w-4 h-4" />
                Data Science Learning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                AI Tools for Data Science Beginners and Python Automation
              </h1>
              <p className="text-xl text-muted-foreground">
                Data science is one of the fastest-growing fields, but beginners often find it complex. AI simplifies learning by guiding you step by step and automating repetitive tasks.
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
            
            {/* Data Science Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/10">
                <div className="bg-card rounded-lg p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-muted-foreground">Data Analysis Dashboard</span>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-end gap-2 h-24">
                      <div className="w-8 bg-primary/60 rounded-t h-16"></div>
                      <div className="w-8 bg-primary/80 rounded-t h-20"></div>
                      <div className="w-8 bg-primary rounded-t h-24"></div>
                      <div className="w-8 bg-cyan-500/80 rounded-t h-18"></div>
                      <div className="w-8 bg-cyan-500 rounded-t h-14"></div>
                      <div className="w-8 bg-purple-500/80 rounded-t h-22"></div>
                      <div className="w-8 bg-purple-500 rounded-t h-12"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-primary/10 rounded p-2 text-center">
                        <div className="text-lg font-bold text-primary">94%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="flex-1 bg-cyan-500/10 rounded p-2 text-center">
                        <div className="text-lg font-bold text-cyan-600">1.2K</div>
                        <div className="text-xs text-muted-foreground">Records</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Data Science Feels Hard */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Data Science Feels Hard at First</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beginners often struggle with complex concepts that traditional tutorials don't explain well.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {struggles.map((item, index) => (
              <Card key={index} className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-10 h-10 text-destructive/70 mx-auto mb-4" />
                  <p className="text-foreground font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Traditional tutorials explain theory but don't help with real problems. AI changes this.
          </p>
        </div>
      </section>

      {/* AI Tools Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">AI Tools for Data Science Beginners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern AI tools help beginners by providing personalized guidance and automating complex tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Article Illustration & CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Python Data Pipeline</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <div className="text-muted-foreground"># AI-generated data analysis code</div>
                <div><span className="text-cyan-600">import</span> pandas <span className="text-cyan-600">as</span> pd</div>
                <div><span className="text-cyan-600">import</span> matplotlib.pyplot <span className="text-cyan-600">as</span> plt</div>
                <div className="mt-2"></div>
                <div><span className="text-muted-foreground"># Load and clean data</span></div>
                <div>df = pd.read_csv(<span className="text-green-500">"data.csv"</span>)</div>
                <div>df = df.dropna()</div>
                <div className="mt-2"></div>
                <div><span className="text-muted-foreground"># Visualize results</span></div>
                <div>df.plot(kind=<span className="text-green-500">"bar"</span>)</div>
                <div>plt.show()</div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                AI Tools for Automating Python Data Analysis Pipelines
              </h2>
              <p className="text-muted-foreground">
                Automation is one of AI's biggest advantages. AI tools help beginners automate repetitive tasks so they can focus on insights.
              </p>
              <div className="space-y-3">
                {[
                  "Clean datasets automatically",
                  "Generate analysis scripts on demand",
                  "Create visualizations effortlessly",
                  "Focus on insights, not repetitive coding"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/ask">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" /> Start Learning with AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free AI Tutor Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                Free Learning
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Learning with a Data Science AI Tutor Free
              </h2>
              <p className="text-muted-foreground">
                A data science AI tutor free doesn't just give answers — it teaches thinking. You can ask deeper questions to build real understanding.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <p className="font-medium text-foreground">Questions you can ask:</p>
                <div className="space-y-3">
                  <div className="bg-card rounded p-3 border-l-4 border-primary">
                    <p className="text-sm italic">"Why is this data cleaned this way?"</p>
                  </div>
                  <div className="bg-card rounded p-3 border-l-4 border-cyan-500">
                    <p className="text-sm italic">"How can this analysis be improved?"</p>
                  </div>
                  <div className="bg-card rounded p-3 border-l-4 border-purple-500">
                    <p className="text-sm italic">"What does this error mean?"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Real Benefits for Students</h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Learn faster with personalized guidance" },
                  { icon: Code2, text: "Build real data science projects" },
                  { icon: TrendingUp, text: "Prepare for internships and jobs" },
                  { icon: Brain, text: "Gain confidence with real datasets" }
                ].map((item, index) => (
                  <Card key={index} className="border-primary/10">
                    <CardContent className="p-4 flex items-center gap-4">
                      <item.icon className="w-8 h-8 text-primary" />
                      <span className="font-medium">{item.text}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
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
            <Link to="/ai-projects-for-students" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Projects for Students</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/python-with-ai" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="font-medium">Python with AI</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/web-development-with-ai" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="font-medium">Web Development with AI</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-500/10 via-background to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Data Science Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Data science doesn't have to be confusing. With AI guidance, beginners can learn Python, automate analysis, and build real projects efficiently.
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

export default AIToolsDataScience;
