import { Rocket, Globe, Mail, Server, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface LaunchProjectCTAProps {
  variant?: 'full' | 'compact' | 'sidebar' | 'banner';
  className?: string;
}

const AFFILIATE_LINK = 'https://hostinger.com?REFERRALCODE=AEQSAIFIUKXH';

export const LaunchProjectCTA = ({ variant = 'full', className = '' }: LaunchProjectCTAProps) => {
  const benefits = [
    { icon: Globe, text: 'Turn your code into a real website/app' },
    { icon: Mail, text: 'Get a professional email (yourname@yourproject.com)' },
    { icon: Server, text: 'Super-fast hosting with 99.9% uptime' },
  ];

  if (variant === 'compact') {
    return (
      <Card className={`bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 ${className}`}>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Ready to Launch?</h4>
              <p className="text-sm text-muted-foreground">Get hosting with 90% off</p>
            </div>
          </div>
          <Button asChild className="bg-gradient-primary hover:shadow-neon whitespace-nowrap">
            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
              <Rocket className="mr-2 h-4 w-4" />
              Get Hosting
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Card className={`bg-gradient-to-b from-primary/5 to-accent/5 border-primary/20 ${className}`}>
        <CardContent className="p-4 space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-3">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-bold text-foreground">Launch Your Project</h4>
            <p className="text-xs text-muted-foreground mt-1">90% OFF Hosting</p>
          </div>
          <ul className="space-y-2 text-xs">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <benefit.icon className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit.text}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full bg-gradient-primary hover:shadow-neon" size="sm">
            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
              <Rocket className="mr-2 h-4 w-4" />
              Get Hosting Now
            </a>
          </Button>
          <Link 
            to="/hosting-guide" 
            className="block text-center text-xs text-primary hover:underline"
          >
            Learn more about hosting →
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-white py-3 px-4 ${className}`}>
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            <span className="font-medium">Ready to launch your project?</span>
          </div>
          <Button asChild size="sm" variant="secondary" className="whitespace-nowrap">
            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
              Get 90% OFF Hosting
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Rocket className="h-4 w-4" />
              Next Step
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Launch Your Project Online?
            </h3>
            <p className="text-muted-foreground">
              Get a Live Server, Domain, and Professional Email with exclusive 90% discount.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild size="lg" className="bg-gradient-primary hover:shadow-neon">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2 h-5 w-5" />
                  🚀 Get Hosting & Launch Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/hosting-guide">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-primary rounded-full opacity-20 blur-3xl absolute" />
              <div className="relative bg-card border border-primary/20 rounded-2xl p-6 shadow-elegant">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Server className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-bold">Your Project</div>
                      <div className="text-xs text-muted-foreground">Ready to go live</div>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="bg-primary/5 rounded-lg p-2">
                      <div className="font-bold text-primary">99.9%</div>
                      <div className="text-muted-foreground">Uptime</div>
                    </div>
                    <div className="bg-accent/5 rounded-lg p-2">
                      <div className="font-bold text-accent">90%</div>
                      <div className="text-muted-foreground">OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaunchProjectCTA;
