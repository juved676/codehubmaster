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
  Briefcase, 
  TrendingUp, 
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Rocket,
  Target,
  Lightbulb,
  Code2,
  GraduationCap,
  Zap,
  Brain,
  Users
} from "lucide-react";

const AICodingSkillsJobs = () => {
  const faqData = [
    {
      question: "What AI coding skills are needed for jobs in 2025?",
      answer: "Developers in 2025 need AI-assisted coding workflows, automation skills, and problem-solving ability. Learning to work alongside AI tools gives you a significant advantage."
    },
    {
      question: "What are agentic AI coding tools?",
      answer: "Agentic AI tools can perform tasks independently—analyzing requirements, generating solutions, and improving code iteratively. Understanding these tools is essential for modern developers."
    },
    {
      question: "Will AI replace developers?",
      answer: "No, AI enhances developers rather than replaces them. Developers who use AI tools save time, reduce errors, and focus on creative problem-solving—making them more valuable."
    },
    {
      question: "How can I prepare for AI-focused tech jobs?",
      answer: "Build AI-assisted coding workflows, practice automation, and develop strong problem-solving skills. Platforms like CodeHubMaster help you practice these skills through real projects."
    }
  ];

  const futureSkills = [
    {
      icon: Bot,
      title: "AI-Assisted Workflows",
      description: "Learn to integrate AI tools into your daily coding workflow for maximum efficiency"
    },
    {
      icon: Zap,
      title: "Automation Skills",
      description: "Automate repetitive tasks and focus on creative problem-solving"
    },
    {
      icon: Brain,
      title: "Problem-Solving",
      description: "Develop critical thinking skills that AI cannot replace"
    },
    {
      icon: Target,
      title: "AI Tool Mastery",
      description: "Understand how to leverage different AI tools for different tasks"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Coding Skills for Jobs 2025 | Developer Career Guide"
        description="Learn AI coding skills for jobs 2025. Discover agentic AI coding tools, AI tools for developers, and AI tools for instructional design. Prepare for the future of tech."
        keywords="AI coding skills for jobs 2025, agentic AI coding tools, AI tools for developers, AI tools for instructional design, future tech careers"
        canonical="https://codehubmaster.lovable.app/ai-coding-skills-for-jobs-2025"
        articleData={{
          publishedTime: "2026-01-31",
          modifiedTime: "2026-01-31",
          author: "CodeHubMaster",
          section: "Career"
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "AI Coding Skills for Jobs 2025", url: "https://codehubmaster.lovable.app/ai-coding-skills-for-jobs-2025" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium">
                <Briefcase className="w-4 h-4" />
                Career Development
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                AI Coding Skills for Jobs 2025: Tools Developers Must Learn
              </h1>
              <p className="text-xl text-muted-foreground">
                The tech industry is evolving fast. In 2025, developers need more than basic coding skills. AI coding skills are becoming essential for career growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/ask">
                  <Button size="lg" className="gap-2">
                    Start Building Skills <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/ai-projects-for-students">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Code2 className="w-4 h-4" /> View Projects
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Career Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-8 backdrop-blur-sm border border-orange-500/10">
                <div className="bg-card rounded-lg p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-muted-foreground">2025 Developer Skills</span>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AI-Assisted Coding</span>
                        <span className="text-primary">95%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Automation Skills</span>
                        <span className="text-orange-500">88%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Problem Solving</span>
                        <span className="text-red-500">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <Rocket className="w-4 h-4" />
                      <span className="text-sm font-medium">High Demand in 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Skills Matter */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why AI Skills Matter for Developers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI doesn't replace developers — it enhances them. Companies now expect developers to work faster, smarter, and with AI assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground text-sm">
                  AI tools automate repetitive tasks, letting you focus on what matters most.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reduce Errors</h3>
                <p className="text-muted-foreground text-sm">
                  AI catches bugs early and suggests improvements before they become problems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Focus on Problem-Solving</h3>
                <p className="text-muted-foreground text-sm">
                  With AI handling routine work, you can focus on creative solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agentic AI Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Bot className="w-4 h-4" />
                Advanced AI Tools
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Agentic AI Coding Tools Explained
              </h2>
              <p className="text-muted-foreground">
                Agentic AI coding tools can perform tasks independently. They don't just respond to commands—they analyze, plan, and execute complex development tasks.
              </p>
              
              <div className="space-y-4">
                {[
                  "Analyze requirements automatically",
                  "Generate complete solutions",
                  "Improve code iteratively",
                  "Learn from your coding patterns"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground">
                Learning how these tools work gives developers a strong edge in the job market.
              </p>
            </div>

            {/* Agentic AI Illustration */}
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                <Bot className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Agentic AI Workflow</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Analyze</p>
                    <p className="text-sm text-muted-foreground">AI understands your requirements</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-muted-foreground/30 ml-5 h-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Generate</p>
                    <p className="text-sm text-muted-foreground">Creates optimal solutions</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-muted-foreground/30 ml-5 h-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Improve</p>
                    <p className="text-sm text-muted-foreground">Iteratively refines code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Article CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Build Job-Ready AI Skills Today</h3>
          <p className="text-muted-foreground mb-6">
            Don't wait until 2025. Start building AI-assisted coding workflows now and stay ahead of the curve.
          </p>
          <Link to="/ask">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Start Practicing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* AI Tools for Instructional Design */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-xl border shadow-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  AI in Education
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Create Structured Lessons</p>
                      <p className="text-sm text-muted-foreground">AI helps organize content logically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Personalize Learning Paths</p>
                      <p className="text-sm text-muted-foreground">Adapt content to individual learners</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Improve Training Quality</p>
                      <p className="text-sm text-muted-foreground">Data-driven content improvements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                Education & Training
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                AI Tools for Instructional Design
              </h2>
              <p className="text-muted-foreground">
                AI is also changing how learning content is created. This is useful for educators, mentors, and content creators who want to build better training materials.
              </p>
              <p className="text-muted-foreground">
                Understanding AI tools for instructional design is becoming valuable across industries, not just tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills for 2025 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Preparing for Jobs in 2025</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To stay relevant, developers must build these essential skills that companies are actively seeking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureSkills.map((skill, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Learning Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Free Learning Still Matters</h2>
          <p className="text-muted-foreground">
            Not everyone can start with paid tools. Free learning options allow beginners to explore AI before committing to advanced plans. CodeHubMaster offers free AI-powered learning to help you get started.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
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
      <section className="py-12 px-4 bg-muted/30">
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
            <Link to="/python-with-ai" className="block">
              <Card className="hover:border-primary/40 transition-colors h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">Python with AI</span>
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
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500/10 via-background to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shape Your Future in Tech</h2>
          <p className="text-lg text-muted-foreground mb-8">
            AI-powered tools are shaping the future of software development. Developers who learn these skills today will lead tomorrow.
          </p>
          <p className="text-muted-foreground mb-8">
            All learning, coding, and project building happens directly on this AI-powered website.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Build Job-Ready AI Skills
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AICodingSkillsJobs;
