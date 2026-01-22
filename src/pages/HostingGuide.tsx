import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Rocket,
  Server,
  Globe,
  Cloud,
  Terminal,
  Mail,
  Palette,
  Building2,
  Users,
  Check,
  ExternalLink,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  HelpCircle,
  Code2,
} from 'lucide-react';

const AFFILIATE_LINK = 'https://hostinger.com?REFERRALCODE=AEQSAIFIUKXH';

const hostingPlans = [
  {
    name: 'Web Hosting',
    icon: Globe,
    bestFor: 'Beginners, Blogs, Small Sites',
    keyFeature: 'Easy 1-click WordPress install',
    discount: '90% Off',
    popular: true,
  },
  {
    name: 'Cloud Hosting',
    icon: Cloud,
    bestFor: 'Growing Sites, E-commerce',
    keyFeature: 'Dedicated resources, more power',
    discount: '90% Off',
    popular: false,
  },
  {
    name: 'VPS Hosting',
    icon: Terminal,
    bestFor: 'Developers, Custom Apps',
    keyFeature: 'Full root access & control',
    discount: '90% Off',
    popular: false,
  },
  {
    name: 'Agency Hosting',
    icon: Building2,
    bestFor: 'Agencies, Multiple Clients',
    keyFeature: 'Manage 100+ sites easily',
    discount: '90% Off',
    popular: false,
  },
  {
    name: 'Website Builder',
    icon: Palette,
    bestFor: 'No-code, Quick Launch',
    keyFeature: 'Drag & drop editor + AI tools',
    discount: '90% Off',
    popular: false,
  },
  {
    name: 'Email Hosting',
    icon: Mail,
    bestFor: 'Professional Email',
    keyFeature: 'yourname@yourdomain.com',
    discount: '90% Off',
    popular: false,
  },
];

const steps = [
  {
    number: 1,
    title: 'Choose Your Plan',
    description: 'Select a hosting plan based on your project needs. Web Hosting is perfect for beginners.',
    icon: HelpCircle,
  },
  {
    number: 2,
    title: 'Register Domain',
    description: 'Pick a domain name (e.g., yourproject.com). Many plans include a free domain!',
    icon: Globe,
  },
  {
    number: 3,
    title: 'Complete Purchase',
    description: 'Use our exclusive link to get 90% off. The discount is applied automatically.',
    icon: Zap,
  },
  {
    number: 4,
    title: 'Upload Your Code',
    description: 'Use FTP, Git, or the file manager to upload your project files to the server.',
    icon: Code2,
  },
  {
    number: 5,
    title: 'Go Live!',
    description: 'Point your domain to the server, and your project is now live on the internet!',
    icon: Rocket,
  },
];

const HostingGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Launch Your Project - Web Hosting Guide | CodeHubMaster"
        description="Learn how to launch your coding projects online. Get 90% off web hosting with our exclusive Hostinger discount. Step-by-step guide for beginners."
        keywords="web hosting, launch project, deploy website, hostinger, hosting guide, go live"
        canonical="https://codehubmaster.lovable.app/hosting-guide"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary">
              <Rocket className="mr-1 h-3 w-3" />
              Launch Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Launch Your Project Online
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              You've learned to code. You've built something amazing. 
              Now it's time to share it with the world. Here's how.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-neon">
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                <Rocket className="mr-2 h-5 w-5" />
                Claim Your 90% Discount
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Hosting Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Do You Need Hosting?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Server className="h-5 w-5 text-primary" />
                    What is Web Hosting?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Think of hosting as renting a computer that's always connected to the internet. 
                    Your code runs on this computer (server), allowing anyone in the world to access 
                    your website or app 24/7.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-primary" />
                    Why Can't Code Run Locally?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Your laptop isn't designed to handle web traffic from thousands of users. 
                    Hosting servers are optimized for speed, security, and reliability — they never 
                    sleep so your project is always accessible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hosting Plans Table */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Choose the Right Hosting for You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare hosting services to find the perfect match for your project.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Plan</TableHead>
                    <TableHead className="font-semibold">Best For</TableHead>
                    <TableHead className="font-semibold">Key Feature</TableHead>
                    <TableHead className="font-semibold text-center">Discount</TableHead>
                    <TableHead className="font-semibold text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostingPlans.map((plan) => (
                    <TableRow key={plan.name} className={plan.popular ? 'bg-primary/5' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <plan.icon className="h-5 w-5 text-primary" />
                          {plan.name}
                          {plan.popular && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{plan.bestFor}</TableCell>
                      <TableCell className="text-muted-foreground">{plan.keyFeature}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                          {plan.discount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button asChild size="sm" variant={plan.popular ? 'default' : 'outline'}>
                          <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                            Get Started
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to Launch Your Project (Step-by-Step)
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to take your project from local development to live on the web.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-4 pb-8">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                )}
                
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                
                {/* Step content */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <step.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose Hostinger?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: '99.9% Uptime', description: 'Your site stays online, always' },
              { icon: Shield, title: 'Free SSL', description: 'Secure HTTPS for all sites' },
              { icon: Clock, title: '24/7 Support', description: 'Help whenever you need it' },
              { icon: Globe, title: 'Free Domain', description: 'Included with annual plans' },
            ].map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Go Live?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your exclusive 90% discount on Hostinger and launch your project today.
              Limited time offer through our partnership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:shadow-neon">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2 h-5 w-5" />
                  Claim Your 90% Discount Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/topics">
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              * Affiliate link. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostingGuide;
