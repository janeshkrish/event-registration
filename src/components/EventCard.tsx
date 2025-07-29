import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  category: string;
  image?: string;
  isFeatured?: boolean;
}

const EventCard = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  attendees, 
  maxAttendees, 
  price, 
  category,
  image,
  isFeatured = false 
}: EventCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105">
      <div className="relative h-48 bg-muted overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
            <Calendar className="h-12 w-12 text-white/60" />
          </div>
        )}
        
        {isFeatured && (
          <Badge className="absolute top-3 left-3 bg-event-warning text-white font-semibold">
            Featured
          </Badge>
        )}
        
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
        >
          {category}
        </Badge>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-event-primary" />
            <span>{date}</span>
            <Clock className="h-4 w-4 ml-4 mr-2 text-event-primary" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-event-primary" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-event-primary" />
            <span>{attendees}/{maxAttendees} attendees</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {price > 0 ? (
              <span className="text-2xl font-bold text-foreground">${price}</span>
            ) : (
              <span className="text-2xl font-bold text-event-success">Free</span>
            )}
          </div>
          
          <Button variant="premium" size="sm" className="group-hover:shadow-glow">
            Get Tickets
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;