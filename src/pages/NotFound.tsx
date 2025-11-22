import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error | CodeHub"
        description="The page you're looking for doesn't exist. Return to CodeHub homepage to explore Python tutorials and coding resources."
        canonical="https://codehubmaster.lovable.app/404"
      />
      
      <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl">
        <h1 className="mb-4 text-8xl font-bold gradient-text">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block px-8 py-4 bg-gradient-primary text-white rounded-xl hover:shadow-neon transition-all duration-300 font-semibold">
          Return to Home
        </a>
      </div>
      </div>
    </>
  );
};

export default NotFound;
