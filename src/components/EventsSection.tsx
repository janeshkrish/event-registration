import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard"; 
import { Search, Filter, Calendar, MapPin } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  date: string;
  time: string;
  location: string;
  capacity?: number;
  price?: number;
  tags?: string[];
  imageUrl?: string;
  organizer: string;
  createdAt: string;
}

const EventsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BACKEND_URL}/api/events`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.msg || "Failed to fetch events.");
          return;
        }

        const sortedEvents = data.sort((a: Event, b: Event) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });

        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Network error or server unavailable when fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ["all", ...new Set(events.map(event => event.category))];

  if (loading) {
    return (
      <section id="events" className="py-20 bg-background flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-primary">Loading events...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-background flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span> Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From tech conferences to music festivals, find events that match your interests
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events by title, description, location, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg"><MapPin className="h-4 w-4 mr-2" /> Location</Button>
              <Button variant="outline" size="lg"><Calendar className="h-4 w-4 mr-2" /> Date</Button>
              <Button variant="outline" size="lg"><Filter className="h-4 w-4 mr-2" /> More Filters</Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory.toLowerCase() === category.toLowerCase() ? "premium" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="md:col-span-3 text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <div
                key={event._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard
                  id={event._id}
                  title={event.title}
                  description={event.description}
                  date={new Date(event.date).toLocaleDateString()}
                  time={event.time}
                  location={event.location}
                  category={event.category}
                  image={event.imageUrl}
                  attendees={0} 
                  maxAttendees={event.capacity ?? 0}
                  price={event.price ?? 0}
                  isFeatured={false}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;