import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ArrowLeft, MapPin, Clock, Users, DollarSign, Image, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 

const CreateEvent = () => {
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5000"; // Base backend URL

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEventImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token"); // Get token from local storage

    if (!token) {
      setError("You must be logged in to create an event.");
      setLoading(false);
      return;
    }

    // Basic validation
    if (!title || !category || !type || !date || !time || !location || !description) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const eventData = {
        title,
        description,
        category,
        type,
        date,
        time,
        location,
        capacity: capacity ? parseInt(capacity) : undefined, // Convert to number
        price: price ? parseFloat(price) : undefined, // Convert to number
        tags,
        imageUrl: eventImage || undefined, // Send base64 image or URL if already uploaded
      };

      const response = await fetch(`${BACKEND_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, // Send the JWT token
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the backend sends validation errors, display them
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.map((err: any) => err.msg).join(", "));
        } else {
          setError(data.msg || "Failed to create event. Please try again.");
        }
        setLoading(false);
        return;
      }

      console.log("Event created successfully:", data);
      navigate("/"); // Redirect to the Discover page (home)
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Network error or server unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-primary rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-primary rounded-full opacity-5 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Event</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bring your vision to life and connect with your audience
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-0 shadow-elegant backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Event Details</CardTitle>
              <CardDescription>Fill in the information about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6"> {/* Add form tag and onSubmit */}
                {/* Event Image Upload */}
                <div className="space-y-2">
                  <Label>Event Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {eventImage ? (
                      <div className="relative">
                        <img src={eventImage} alt="Event preview" className="max-h-48 mx-auto rounded-lg" />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setEventImage(null)}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">Upload an eye-catching image for your event</p>
                        <Label htmlFor="image-upload">
                          <Button variant="outline" asChild>
                            <span>Choose Image</span>
                          </Button>
                        </Label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Title */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your event title"
                      className="text-lg"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Event Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type *</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter event location or online link"
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Maximum Attendees</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="e.g. 100"
                        className="pl-10"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Ticket Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00 (Free event)"
                        className="pl-10"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event, what attendees can expect, agenda, speakers, etc."
                      className="min-h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tags"
                        placeholder="e.g. networking, technology, startup (comma separated)"
                        className="pl-10"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Add relevant tags to help people discover your event</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button variant="outline" className="flex-1" type="button"> {/* Changed to type="button" to prevent form submission */}
                    Save as Draft
                  </Button>
                  <Button variant="hero" className="flex-1" type="submit" disabled={loading}>
                    {loading ? "Publishing..." : "Publish Event"}
                  </Button>
                </div>
              </form> {/* Close form tag */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;