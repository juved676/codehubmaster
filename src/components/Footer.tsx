import { Link } from 'react-router-dom';
import { Bot, Code, Brain, Zap, Rocket, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import logo from '@/assets/codehubmaster-logo.jpeg';

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-primary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="CodeHubMaster AI Logo" 
                className="object-contain" 
                width="48" 
                height="40"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg gradient-text">CodeHubMaster</span>
                <span className="text-xs text-primary flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  AI Coding Assistant
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered coding assistant for Python, web development, and machine learning. 
              Get instant AI-generated solutions and learn programming with confidence.
            </p>
          </div>

          {/* Resources - AI Skills Pages */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/free-ai-coding-tools-for-beginners" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" />
                  Free AI Coding Tools
                </Link>
              </li>
              <li>
                <Link to="/ai-tools-for-data-science" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Brain className="h-3 w-3" />
                  AI for Data Science
                </Link>
              </li>
              <li>
                <Link to="/ai-coding-skills-for-jobs-2025" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Briefcase className="h-3 w-3" />
                  AI Skills for Jobs 2025
                </Link>
              </li>
              <li>
                <Link to="/ai-projects-for-students" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Code className="h-3 w-3" />
                  AI Projects for Students
                </Link>
              </li>
              <li>
                <Link to="/how-ai-helps-in-coding" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  How AI Helps in Coding
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" />
              Learning Paths
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-coding-for-beginners" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI Coding for Beginners
                </Link>
              </li>
              <li>
                <Link to="/python-with-ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Python with AI
                </Link>
              </li>
              <li>
                <Link to="/web-development-with-ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Web Development with AI
                </Link>
              </li>
              <li>
                <Link to="/ai-technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI Technology Hub
                </Link>
              </li>
              <li>
                <Link to="/hosting-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Rocket className="h-3 w-3" />
                  Launch Your Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics & Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              Topics
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/topic/python-basics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Python Basics
                </Link>
              </li>
              <li>
                <Link to="/topic/data-science" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/topic/web-development" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/topic/machine-learning" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeHubMaster. AI-Powered Learning Platform.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/ask" className="text-sm text-primary hover:underline flex items-center gap-1">
                <Bot className="h-3 w-3" />
                Try AI Assistant
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/about-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
