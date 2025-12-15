import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Shield, Users, Bot, Sparkles, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/codehubmaster-logo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src={logo} alt="CodeHubMaster AI Logo" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg gradient-text leading-tight">
                CodeHubMaster
              </span>
              <span className="text-[10px] text-primary flex items-center gap-1">
                <Bot className="h-2.5 w-2.5" />
                AI Coding Assistant
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Home
            </Link>
            <Link
              to="/ai-technology"
              className={`transition-colors hover:text-foreground/80 flex items-center gap-1 ${
                isActive('/ai-technology') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              <Cpu className="h-3 w-3" />
              AI Tech
            </Link>
            <Link
              to="/topic/python-basics"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/topic/python-basics') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Python
            </Link>
            <Link
              to="/topic/data-science"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/topic/data-science') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Data Science
            </Link>
            <Link
              to="/topic/web-development"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/topic/web-development') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Web Dev
            </Link>
            <Link
              to="/topic/machine-learning"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/topic/machine-learning') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              ML
            </Link>
            <Link
              to="/pricing"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/pricing') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about-policy"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/about-policy') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              About & Policy
            </Link>
            
            {/* Auth Navigation */}
            {!loading && user && (
              <>
                <Link
                  to="/verify-payment"
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive('/verify-payment') ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  Verify Payment
                </Link>
                <Link
                  to="/admin"
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive('/admin') ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  <Shield className="h-4 w-4 inline mr-1" />
                  Admin
                </Link>
                <Link
                  to="/review-queue"
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive('/review-queue') ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-1" />
                  Reviews
                </Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Credits Display for Desktop */}
        <div className="hidden lg:flex items-center mr-4">
          <CreditsDisplay variant="compact" />
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <img src={logo} alt="CodeHubMaster AI Logo" className="h-8 w-auto" />
              <div className="flex flex-col">
                <span className="font-bold gradient-text text-sm">CodeHubMaster</span>
                <span className="text-[9px] text-primary flex items-center gap-0.5">
                  <Bot className="h-2 w-2" />
                  AI Assistant
                </span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {!loading && (
              <>
                {user ? (
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button variant="default" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="border-t md:hidden">
          <nav className="grid gap-2 p-4">
            <Link
              to="/"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/ai-technology"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-2 ${
                isActive('/ai-technology') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Cpu className="h-4 w-4" />
              AI Technology
            </Link>
            <Link
              to="/topic/python-basics"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/topic/python-basics') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Python
            </Link>
            <Link
              to="/topic/data-science"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/topic/data-science') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Data Science
            </Link>
            <Link
              to="/topic/web-development"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/topic/web-development') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Web Development
            </Link>
            <Link
              to="/topic/machine-learning"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/topic/machine-learning') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Machine Learning
            </Link>
            <Link
              to="/pricing"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/pricing') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about-policy"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/about-policy') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              About & Policy
            </Link>
            
            {/* Mobile Auth Navigation */}
            {!loading && (
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
                    <Link
                      to="/verify-payment"
                      className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        isActive('/verify-payment') ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Verify Payment
                    </Link>
                    <Link
                      to="/admin"
                      className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        isActive('/admin') ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="h-4 w-4 inline mr-2" />
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/review-queue"
                      className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        isActive('/review-queue') ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Users className="h-4 w-4 inline mr-2" />
                      Review Queue
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}