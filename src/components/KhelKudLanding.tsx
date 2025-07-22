import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Gamepad2, 
  Users, 
  Zap, 
  Target, 
  Star,
  CheckCircle,
  Loader2,
  MapPin,
  Mail,
  User,
  Sparkles,
  ChevronDown,
  UserPlus,
  Clock,
  Calendar,
  Gift,
  HelpCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-sports.jpg';
import areasDataRaw from '@/data/areas.json';

interface WaitlistFormData {
  fullName: string;
  email: string;
  city: string;
  areaName: string;
  role: 'player' | 'owner';
}

interface AreaData {
  city: string;
  areas: string[];
}

const areasData: AreaData[] = areasDataRaw as AreaData[];

const KhelKudLanding = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: '', email: '', city: '', areaName: '', role: 'player'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { toast } = useToast();

  // Extract cities and areas from areasData
  const cities = useMemo(() => areasData.map((item) => item.city), []);
  const [areaInput, setAreaInput] = useState('');
  const [areaSuggestions, setAreaSuggestions] = useState<string[]>([]);

  // Find areas for the selected city
  const selectedCityAreas = useMemo(() => {
    const found = areasData.find((item) => item.city === formData.city);
    return found ? found.areas : [];
  }, [formData.city]);

  // Update area suggestions as user types
  useEffect(() => {
    if (formData.city && areaInput) {
      const suggestions = selectedCityAreas.filter((area: string) =>
        area.toLowerCase().includes(areaInput.toLowerCase())
      );
      setAreaSuggestions(suggestions);
    } else {
      setAreaSuggestions([]);
    }
  }, [areaInput, formData.city, selectedCityAreas]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'how-it-works', 'waitlist', 'faqs'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (key: keyof WaitlistFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.city) return "Please select your city";
    if (!formData.areaName.trim()) return "Area name is required";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast({
        title: "Validation Error",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send POST request to backend
      const response = await fetch('https://waitlist-backend-khel-kud.vercel.app/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSuccess(true);
      toast({
        title: "You're in! 🎉",
        description: "We've sent a confirmation SMS 📩",
      });
      // Clear form fields
      setFormData({
        fullName: '',
        email: '',
        city: '',
        areaName: '',
        role: 'player',
      });
      setAreaInput('');
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please check your info and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Pure black background with neon green accents */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle grid pattern overlay with neon green */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          {/* Neon welcome badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-card/50 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm neon-glow">
              🏆 Welcome to the future of sports
            </span>
          </div>
          
          {/* Main heading with neon green */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Khel </span>
            <span className="text-primary">
              Kud
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Join the waitlist for exclusive early access to the platform that's revolutionizing sports and esports communities
          </p>
          
          {/* Neon button - centered */}
          <div className="flex justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 neon-glow"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Waitlist
            </Button>
          </div>
        </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-card/80 backdrop-blur-md border border-border rounded-2xl px-6 py-3 shadow-lg neon-glow">
          <button 
            className={`p-2 rounded-lg transition-all duration-200 group ${activeSection === 'hero' ? 'bg-primary/20' : 'hover:bg-muted'}`}
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles className={`w-5 h-5 transition-colors ${activeSection === 'hero' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
          </button>
          <button 
            className={`p-2 rounded-lg transition-all duration-200 group ${activeSection === 'features' ? 'bg-primary/20' : 'hover:bg-muted'}`}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Zap className={`w-5 h-5 transition-colors ${activeSection === 'features' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
          </button>
          <button 
            className={`p-2 rounded-lg transition-all duration-200 group ${activeSection === 'how-it-works' ? 'bg-primary/20' : 'hover:bg-muted'}`}
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Target className={`w-5 h-5 transition-colors ${activeSection === 'how-it-works' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
          </button>
          <button 
            className={`p-2 rounded-lg transition-all duration-200 group ${activeSection === 'waitlist' ? 'bg-primary/20' : 'hover:bg-muted'}`}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <UserPlus className={`w-5 h-5 transition-colors ${activeSection === 'waitlist' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
          </button>
          <button 
            className={`p-2 rounded-lg transition-all duration-200 group ${activeSection === 'faqs' ? 'bg-primary/20' : 'hover:bg-muted'}`}
            onClick={() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <HelpCircle className={`w-5 h-5 transition-colors ${activeSection === 'faqs' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
          </button>
        </div>
      </div>
      </section>
      {/* Features Section */}
      <section id="features" className="relative py-32 px-4 overflow-hidden">
        {/* Black background with neon green accents */}
        <div className="absolute inset-0 bg-dark" />
        
        {/* Neon green grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Game-Changing </span>
              <span className="text-primary">
                Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Experience sports and esports like never before</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Community Hub",
                description: "Connect with players, teams, and fans from your city and beyond",
                gradient: "gradient-primary"
              },
              {
                icon: Zap,
                title: "Live Tournaments",
                description: "Join real-time competitions in both physical and digital arenas",
                gradient: "gradient-secondary"
              },
              {
                icon: Target,
                title: "Skill Tracking",
                description: "Monitor your progress across multiple sports and games",
                gradient: "gradient-accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border backdrop-blur-sm hover:scale-105 transition-all duration-300 group gradient-card neon-glow">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${feature.gradient} flex items-center justify-center neon-glow`}>
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-4 overflow-hidden">
        {/* Black background with neon accents */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Neon green grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">How It </span>
              <span className="text-primary">
                Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Get started in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Sign Up", 
                description: "Join our waitlist with your email.",
                icon: UserPlus,
                gradient: "gradient-primary"
              },
              { 
                step: "02", 
                title: "Get Early Access", 
                description: "We'll invite you to the beta based on region and referrals.",
                icon: Clock,
                gradient: "gradient-secondary"
              },
              { 
                step: "03", 
                title: "Book & Play", 
                description: "Reserve a ground or jump into a game.",
                icon: Calendar,
                gradient: "gradient-accent"
              },
              { 
                step: "04", 
                title: "Invite Friends", 
                description: "Unlock rewards as you grow the community.",
                icon: Gift,
                gradient: "gradient-primary"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-card/50 border-border backdrop-blur-sm hover:scale-105 transition-all duration-300 group text-center gradient-card neon-glow">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${item.gradient} flex items-center justify-center neon-glow`}>
                    <item.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">Step {item.step}</div>
                  <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="relative py-32 px-4 overflow-hidden">
        {/* Black background with neon accents */}
        <div className="absolute inset-0 bg-dark" />
        
        {/* Neon green grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Join the </span>
              <span className="text-primary">
                Waitlist
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Be among the first to experience the future of sports and esports</p>
            {/* TODO: Maybe add back sports claimed counter in the future */}
            {/* <div className="mt-6 p-4 bg-card/50 border border-border backdrop-blur-sm rounded-lg neon-glow">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">3,217 spots claimed</span> | 
                <span className="text-primary font-bold"> 482 left</span>
              </p>
            </div> */}
          </div>

          {!isSuccess ? (
            <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 gradient-card neon-glow">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center space-x-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>City</span>
                    </Label>
                    <Select value={formData.city} onValueChange={(value) => {
                      handleInputChange('city', value);
                      setAreaInput('');
                      setFormData(prev => ({ ...prev, areaName: '' }));
                    }}>
                      <SelectTrigger className="bg-input border-border text-foreground focus:border-primary">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {cities.map((city: string) => (
                          <SelectItem key={city} value={city} className="text-foreground hover:bg-muted">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area Name field: only show if city is selected */}
                  {formData.city && (
                    <div className="space-y-2 relative">
                      <Label htmlFor="areaName" className="text-muted-foreground">Area Name</Label>
                      <Input
                        id="areaName"
                        value={areaInput}
                        onChange={(e) => {
                          setAreaInput(e.target.value);
                          handleInputChange('areaName', e.target.value);
                        }}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        placeholder="Enter your area/locality"
                        autoComplete="off"
                      />
                      {/* Suggestions dropdown */}
                      {areaSuggestions.length > 0 && (
                        <ul className="absolute z-20 bg-card border border-border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                          {areaSuggestions.map((area) => (
                            <li
                              key={area}
                              className="px-4 py-2 cursor-pointer hover:bg-muted text-foreground"
                              onClick={() => {
                                setAreaInput(area);
                                handleInputChange('areaName', area);
                                setAreaSuggestions([]);
                              }}
                            >
                              {area}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="player"
                          checked={formData.role === 'player'}
                          onCheckedChange={(checked) => {
                            if (checked) handleInputChange('role', 'player');
                          }}
                        />
                        <Label htmlFor="player" className="text-sm font-normal text-foreground cursor-pointer">
                          I want to register as a Player
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="venue-owner"
                          checked={formData.role === 'owner'}
                          onCheckedChange={(checked) => {
                            if (checked) handleInputChange('role', 'owner');
                          }}
                        />
                        <Label htmlFor="venue-owner" className="text-sm font-normal text-foreground cursor-pointer">
                          I want to register as a Venue Owner
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining the Revolution...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        Claim Your Spot
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/50 border-border backdrop-blur-sm gradient-card neon-glow">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4 animate-glow" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">You're In! 🎉</h3>
                <p className="text-muted-foreground mb-4">
                  Welcome to the Khel Kud revolution! We've sent a confirmation SMS to your number.
                </p>
                <p className="text-sm text-muted-foreground">
                  Get ready for an epic sports and esports experience. We'll notify you as soon as we launch!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="relative py-32 px-4 overflow-hidden">
        {/* Black background with neon accents */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Neon green grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Frequently Asked </span>
              <span className="text-primary">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about Khel Kud</p>
          </div>
          
          <Card className="bg-card/50 border-border backdrop-blur-sm gradient-card neon-glow">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors text-foreground">
                    What is Khel Kud?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Khel Kud is a revolutionary platform that bridges traditional sports and esports communities. 
                    We connect players, organize tournaments, facilitate ground bookings, and create a vibrant 
                    ecosystem where sports enthusiasts can discover, compete, and grow together.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors text-foreground">
                    When will I get access?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We're rolling out access in waves based on your location and referrals. Early waitlist members 
                    will get priority access to our beta launch. Expect your invitation within 2-4 weeks of signing up, 
                    with full launch planned for early 2024.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors text-foreground">
                    Can I host my own game?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely! Khel Kud allows you to create and host your own tournaments, casual games, and training 
                    sessions. Whether it's a neighborhood cricket match or an online gaming tournament, our platform 
                    provides all the tools you need to organize, promote, and manage your events.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors text-foreground">
                    Can I find players on this platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Finding teammates and opponents is one of our core features. Use our smart matching system 
                    to connect with players based on skill level, location, preferred sports/games, and availability. 
                    Join existing teams or form new ones with players who share your passion.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-32 px-4 border-t border-border overflow-hidden">
        {/* Black background */}
        <div className="absolute inset-0 bg-dark" />
        
        <div className="relative z-10 container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-lg font-bold text-foreground">
              Khel Kud
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Khel-Kud. Revolutionizing sports and esports communities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KhelKudLanding;