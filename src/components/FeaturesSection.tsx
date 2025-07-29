import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  CreditCard, 
  MessageSquare, 
  Shield,
  Smartphone,
  Globe,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description: "Create stunning events in minutes with our intuitive drag-and-drop builder. No technical skills required.",
      color: "text-event-primary"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Accept payments securely with Stripe integration. Multiple payment methods and instant payouts.",
      color: "text-event-success"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track ticket sales, attendee engagement, and revenue with comprehensive real-time analytics.",
      color: "text-event-secondary"
    },
    {
      icon: Users,
      title: "Attendee Management",
      description: "Manage registrations, send updates, and track attendance with our powerful attendee tools.",
      color: "text-event-accent"
    },
    {
      icon: MessageSquare,
      title: "Communication Tools",
      description: "Keep attendees engaged with automated emails, push notifications, and in-app messaging.",
      color: "text-event-warning"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SSL encryption, data protection, and GDPR compliance built-in.",
      color: "text-event-primary"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect experience on all devices. Mobile apps for iOS and Android coming soon.",
      color: "text-event-secondary"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Multi-language support, international payment methods, and timezone management.",
      color: "text-event-accent"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with global CDN, instant loading, and real-time updates.",
      color: "text-event-success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to help you create, manage, and grow your events like never before
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 group"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-background/50">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 shadow-card">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Create Your First Event?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust EventFlow to power their events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
             <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              get started
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
              Browse Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;