import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, Cpu, Zap, Shield, Clock, CheckCircle, XCircle, 
  Code, Brain, Sparkles, Globe, Lock, Server, Users,
  ArrowRight, Play, BarChart3, Award, Building2
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { InArticleAd, MobileAd } from "@/components/AdUnit";

const AITechnology = () => {
  // Sample code comparison data
  const codeComparison = {
    human: {
      time: "15-30 minutes",
      lines: 45,
      code: `def sort_list(arr):
    # Manual implementation
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Missing edge cases
# No type hints
# Basic implementation only`
    },
    ai: {
      time: "2-5 seconds",
      lines: 28,
      code: `from typing import List, TypeVar, Optional
from functools import cmp_to_key

T = TypeVar('T')

def smart_sort(
    arr: List[T],
    key: Optional[callable] = None,
    reverse: bool = False
) -> List[T]:
    """
    AI-optimized sorting with edge case handling.
    
    Args:
        arr: Input list to sort
        key: Optional key function
        reverse: Sort in descending order
    
    Returns:
        Sorted list (new copy)
    """
    if not arr:
        return []
    
    return sorted(arr, key=key, reverse=reverse)`
    }
  };

  const competitors = [
    {
      name: "CodeHubMaster AI",
      price: "Free / $9.99",
      responseTime: "2-5 sec",
      languages: "15+",
      contextWindow: "32K tokens",
      features: ["Free tier", "Educational focus", "Explanations", "Multi-language"],
      highlight: true
    },
    {
      name: "GitHub Copilot",
      price: "$10/month",
      responseTime: "1-3 sec",
      languages: "20+",
      contextWindow: "8K tokens",
      features: ["IDE integration", "Code completion", "Enterprise"],
      highlight: false
    },
    {
      name: "Amazon CodeWhisperer",
      price: "$19/month",
      responseTime: "2-4 sec",
      languages: "15+",
      contextWindow: "4K tokens",
      features: ["AWS integration", "Security scans", "Enterprise"],
      highlight: false
    },
    {
      name: "Tabnine",
      price: "$12/month",
      responseTime: "1-2 sec",
      languages: "25+",
      contextWindow: "2K tokens",
      features: ["Privacy focus", "On-premise", "Team features"],
      highlight: false
    }
  ];

  const techSpecs = [
    { label: "AI Models", value: "GPT-4, Claude 3.5, Gemini Pro", icon: Brain },
    { label: "Response Time", value: "2-5 seconds average", icon: Clock },
    { label: "Accuracy Rate", value: "94.7% verified solutions", icon: CheckCircle },
    { label: "Context Window", value: "32,000 tokens", icon: Code },
    { label: "Languages Supported", value: "15+ programming languages", icon: Globe },
    { label: "Uptime", value: "99.9% availability", icon: Server }
  ];

  const securityFeatures = [
    { title: "SOC 2 Type II Compliant", description: "Enterprise-grade security controls and auditing" },
    { title: "End-to-End Encryption", description: "All data encrypted in transit and at rest" },
    { title: "No Code Storage", description: "Your code is never stored or used for training" },
    { title: "GDPR Compliant", description: "Full compliance with EU data protection laws" },
    { title: "API Rate Limiting", description: "Protection against abuse and DDoS attacks" },
    { title: "Audit Logging", description: "Complete activity logs for enterprise compliance" }
  ];

  return (
    <>
      <SEO 
        title="AI Technology - Advanced Coding Assistant Platform | CodeHubMaster"
        description="Explore our AI technology stack: GPT-4, Claude 3.5, and Gemini Pro models. See how our AI coding assistant compares to GitHub Copilot and Amazon CodeWhisperer. Enterprise-grade security with 99.9% uptime."
        keywords="AI coding technology, GPT-4 coding assistant, Claude AI programming, AI code generator comparison, GitHub Copilot alternative, enterprise AI coding, AI model specifications"
        canonical="https://codehubmaster.lovable.app/ai-technology"
        isAIContent={true}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "AI Technology", url: "https://codehubmaster.lovable.app/ai-technology" }
        ]}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise AI Technology</span>
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 gradient-text">
              AI Technology Stack
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Powered by the world's most advanced language models. See exactly how our AI 
              delivers intelligent coding solutions with enterprise-grade reliability.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-neon" asChild>
                <Link to="/ask">
                  <Play className="mr-2 h-5 w-5" />
                  Try AI Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-card border-primary/30">
                <a href="#comparison">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Comparisons
                </a>
              </Button>
            </div>
          </div>
        </section>

        <InArticleAd />

        {/* Tech Specs Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/40">Technical Specifications</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                Built on Industry-Leading AI Models
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform leverages multiple state-of-the-art AI models to deliver accurate, 
                context-aware coding solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techSpecs.map((spec, index) => (
                <Card key={index} className="glass-card border-primary/20 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-primary rounded-xl">
                        <spec.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{spec.label}</h3>
                        <p className="text-primary font-medium">{spec.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Model Details */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Brain className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>GPT-4 Turbo</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    OpenAI's most capable model for complex code generation and debugging.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      128K context window
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Code interpretation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Multi-step reasoning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Sparkles className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Claude 3.5 Sonnet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Anthropic's model excels at code explanation and educational content.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      200K context window
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Detailed explanations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Safety-focused
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Cpu className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Gemini Pro</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Google's multimodal model for visual code analysis and debugging.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Multimodal input
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Fast inference
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Code optimization
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <MobileAd />

        {/* AI vs Human Comparison */}
        <section className="py-20 bg-gradient-to-b from-background via-card/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">Live Demo</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                AI vs Human: Code Comparison
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See the difference in code quality, speed, and best practices between 
                AI-generated and manually written code.
              </p>
            </div>

            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="comparison">Side by Side</TabsTrigger>
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comparison">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Human Code */}
                  <Card className="glass-card border-muted">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          Human Developer
                        </CardTitle>
                        <Badge variant="outline" className="text-muted-foreground">
                          {codeComparison.human.time}
                        </Badge>
                      </div>
                      <CardDescription>{codeComparison.human.lines} lines</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-xs">
                        <code>{codeComparison.human.code}</code>
                      </pre>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-destructive" />
                          No type hints
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-destructive" />
                          Missing edge cases
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-destructive" />
                          No documentation
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Code */}
                  <Card className="glass-card border-primary/40 ring-2 ring-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-primary" />
                          AI Assistant
                        </CardTitle>
                        <Badge className="bg-primary/20 text-primary">
                          {codeComparison.ai.time}
                        </Badge>
                      </div>
                      <CardDescription className="text-primary">{codeComparison.ai.lines} lines • Production Ready</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-primary/5 p-4 rounded-lg overflow-x-auto text-xs border border-primary/20">
                        <code>{codeComparison.ai.code}</code>
                      </pre>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Full type hints with generics
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Edge case handling
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Complete docstrings
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics">
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="glass-card border-primary/20 text-center p-6">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-primary mb-2">95%</h3>
                    <p className="text-muted-foreground text-sm">Faster Development</p>
                  </Card>
                  <Card className="glass-card border-primary/20 text-center p-6">
                    <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-green-500 mb-2">94.7%</h3>
                    <p className="text-muted-foreground text-sm">Accuracy Rate</p>
                  </Card>
                  <Card className="glass-card border-primary/20 text-center p-6">
                    <Code className="h-10 w-10 text-accent mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-accent mb-2">40%</h3>
                    <p className="text-muted-foreground text-sm">Fewer Bugs</p>
                  </Card>
                  <Card className="glass-card border-primary/20 text-center p-6">
                    <Zap className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-yellow-500 mb-2">2.3s</h3>
                    <p className="text-muted-foreground text-sm">Avg Response Time</p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <InArticleAd />

        {/* Competitor Comparison */}
        <section id="comparison" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/40">Market Comparison</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                How We Compare to Leading AI Coding Tools
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparent comparison with GitHub Copilot, Amazon CodeWhisperer, and other 
                enterprise AI coding solutions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    {competitors.map((comp, idx) => (
                      <th key={idx} className={`text-center py-4 px-4 font-medium ${comp.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                        {comp.name}
                        {comp.highlight && <Badge className="ml-2 bg-primary/20">Recommended</Badge>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Price</td>
                    {competitors.map((comp, idx) => (
                      <td key={idx} className={`text-center py-4 px-4 ${comp.highlight ? 'text-primary font-semibold' : ''}`}>
                        {comp.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Response Time</td>
                    {competitors.map((comp, idx) => (
                      <td key={idx} className={`text-center py-4 px-4 ${comp.highlight ? 'text-primary font-semibold' : ''}`}>
                        {comp.responseTime}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Languages</td>
                    {competitors.map((comp, idx) => (
                      <td key={idx} className={`text-center py-4 px-4 ${comp.highlight ? 'text-primary font-semibold' : ''}`}>
                        {comp.languages}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Context Window</td>
                    {competitors.map((comp, idx) => (
                      <td key={idx} className={`text-center py-4 px-4 ${comp.highlight ? 'text-primary font-semibold' : ''}`}>
                        {comp.contextWindow}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Key Features</td>
                    {competitors.map((comp, idx) => (
                      <td key={idx} className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {comp.features.map((feature, fidx) => (
                            <Badge key={fidx} variant="outline" className={`text-xs ${comp.highlight ? 'border-primary/40 text-primary' : ''}`}>
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <MobileAd />

        {/* Security & Enterprise */}
        <section className="py-20 bg-gradient-to-b from-background via-card/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-500 border-green-500/40">Enterprise Ready</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                Security & Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade security with SOC 2 compliance, end-to-end encryption, 
                and strict data privacy policies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="glass-card border-green-500/20 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* API & Integration */}
            <div className="mt-16">
              <Card className="glass-card border-primary/20 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8">
                    <Badge className="mb-4 bg-primary/20 text-primary">API Access</Badge>
                    <h3 className="text-2xl font-bold mb-4">Developer API</h3>
                    <p className="text-muted-foreground mb-6">
                      Integrate CodeHubMaster AI directly into your development workflow with our 
                      RESTful API. Perfect for CI/CD pipelines, IDE plugins, and custom integrations.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        RESTful API with OpenAPI specification
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Webhook support for async operations
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        SDK libraries for Python, Node.js, Go
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Rate limiting and usage analytics
                      </li>
                    </ul>
                    <Button className="bg-gradient-primary" asChild>
                      <Link to="/pricing">
                        Get API Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="md:w-1/2 bg-muted/30 p-8 flex items-center">
                    <pre className="text-xs overflow-x-auto w-full">
                      <code className="text-muted-foreground">{`// Example API Request
curl -X POST https://api.codehubmaster.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Create a Python function to sort a list",
    "language": "python",
    "model": "gpt-4-turbo",
    "max_tokens": 1000
  }'

// Response
{
  "id": "gen_abc123",
  "code": "def smart_sort(arr: List[T]) -> List[T]...",
  "language": "python",
  "tokens_used": 287,
  "model": "gpt-4-turbo"
}`}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Team & Company */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">About Us</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                Built by Developers, for Developers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team combines decades of software engineering experience with cutting-edge 
                AI research to build the best coding assistant.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-card border-primary/20 text-center p-8">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Founded 2023</h3>
                <p className="text-muted-foreground text-sm">
                  Started with a mission to make AI coding accessible to everyone
                </p>
              </Card>
              <Card className="glass-card border-primary/20 text-center p-8">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">50,000+ Users</h3>
                <p className="text-muted-foreground text-sm">
                  Trusted by developers worldwide from startups to enterprises
                </p>
              </Card>
              <Card className="glass-card border-primary/20 text-center p-8">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Award Winning</h3>
                <p className="text-muted-foreground text-sm">
                  Recognized for innovation in AI-assisted development
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-40"></div>
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 glass-card p-12 rounded-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Start Building with AI</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 gradient-text">
              Experience the Power of AI Coding
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of developers using AI to code faster, smarter, and with fewer bugs. 
              Start free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-neon px-8 py-6 text-lg" asChild>
                <Link to="/ask">
                  <Bot className="mr-2 h-6 w-6" />
                  Try AI Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-card border-primary/30 px-8 py-6 text-lg" asChild>
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AITechnology;
