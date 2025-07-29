import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-event.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Create
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Amazing </span>
            Events
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The most powerful platform to create, manage, and promote your events. 
            From small meetups to large conferences, we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="glass" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Events
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16">
            <div className="text-center animate-scale-in">
              <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Calendar className="h-8 w-8 text-event-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-muted-foreground">Events Created</div>
              </div>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Users className="h-8 w-8 text-event-secondary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">500K+</div>
                <div className="text-muted-foreground">Happy Attendees</div>
              </div>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Ticket className="h-8 w-8 text-event-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">1M+</div>
                <div className="text-muted-foreground">Tickets Sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-primary rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;