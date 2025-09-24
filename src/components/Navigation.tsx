import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, MessageCircle } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Islamic Study Hub
            </span>
            <span className="text-sm text-muted-foreground hidden sm:block">
              اسلامی مطالعاتی مرکز
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/topics"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/topics") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Topics / مواضیع
            </Link>
            <Link
              to="/ask"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/ask") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Ask Question / سوال پوچھیں
            </Link>
            <Button variant="default" size="sm" asChild>
              <Link to="/ask">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask Now
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/topics"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Topics / مواضیع
              </Link>
              <Link
                to="/ask"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Ask Question / سوال پوچھیں
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;