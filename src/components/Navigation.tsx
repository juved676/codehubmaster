import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { useAuth } from '@/hooks/useAuth';

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
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Islamic Study Hub
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Home / ہوم
            </Link>
            <Link
              to="/topics"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/topics') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Topics / موضوعات
            </Link>
            <Link
              to="/ask"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/ask') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Ask Question / سوال پوچھیں
            </Link>
            <Link
              to="/pricing"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/pricing') ? 'text-foreground' : 'text-foreground/60'
              } bg-gradient-accent text-white px-3 py-1 rounded-full text-xs font-semibold`}
            >
              Pricing ⚡ 80% OFF
            </Link>
            
            {/* Auth Navigation */}
            {!loading && user && (
              <>
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
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold">Islamic Study Hub</span>
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
                      Sign In / لاگ ان
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
              Home / ہوم
            </Link>
            <Link
              to="/topics"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/topics') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Topics / موضوعات
            </Link>
            <Link
              to="/ask"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/ask') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Ask Question / سوال پوچھیں
            </Link>
            <Link
              to="/pricing"
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                isActive('/pricing') ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              💰 Pricing - 80% OFF Sale!
            </Link>
            
            {/* Mobile Auth Navigation */}
            {!loading && (
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
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
                      Sign Out / لاگ آؤٹ
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Sign In / لاگ ان
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