import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-card/50 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm neon-glow">
            <Sparkles className="w-4 h-4 mr-2" />
            Khel Kud
          </span>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold mb-6 neon-glow text-primary">404</h1>
        <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">Oops! This page doesn't exist.</p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 neon-glow"
        >
          <a href="/">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
