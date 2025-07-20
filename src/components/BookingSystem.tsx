import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "./ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { useToast } from "../hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, DollarSign, MessageCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface Booking {
  date: string;
  time: string;
  court: string;
}

interface BookingForm {
  name: string;
  date: Date | undefined;
  time: string;
  court: string;
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

const courts = [
  { id: "indoor", name: "Indoor Court", icon: "🏢" },
  { id: "outdoor", name: "Outdoor Court", icon: "🌲" }
];

export const BookingSystem = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    date: undefined,
    time: "",
    court: ""
  });
  const { toast } = useToast();

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("padelBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Set up daily reset at midnight Lebanon time
    const setupDailyReset = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      // Adjust for Lebanon timezone (UTC+2 or UTC+3 depending on DST)
      const lebanonOffset = 3 * 60; // 3 hours in minutes
      const utcTime = tomorrow.getTime() + (tomorrow.getTimezoneOffset() * 60000);
      const lebanonTime = new Date(utcTime + (lebanonOffset * 60000));
      
      const timeUntilReset = lebanonTime.getTime() - now.getTime();

      setTimeout(() => {
        // Reset only yesterday's bookings, keep today's and future
        const today = format(new Date(), "yyyy-MM-dd");
        const currentBookings = JSON.parse(localStorage.getItem("padelBookings") || "[]");
        const futureBookings = currentBookings.filter((booking: Booking) => booking.date >= today);
        
        localStorage.setItem("padelBookings", JSON.stringify(futureBookings));
        setBookings(futureBookings);
        
        // Set up next reset
        setupDailyReset();
      }, timeUntilReset);
    };

    setupDailyReset();
  }, []);

  const isTimeSlotBooked = (date: Date, time: string, court: string) => {
    const dateString = format(date, "yyyy-MM-dd");
    return bookings.some(
      booking => 
        booking.date === dateString && 
        booking.time === time && 
        booking.court === court
    );
  };

  const getPrice = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    return hour < 16 ? 20 : 40; // 50% off before 4 PM
  };

  const handleBooking = async () => {
    if (!form.name || !form.date || !form.time || !form.court) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields to complete your booking.",
        variant: "destructive",
      });
      return;
    }

    const dateString = format(form.date, "yyyy-MM-dd");
    
    if (isTimeSlotBooked(form.date, form.time, form.court)) {
      toast({
        title: "Time Slot Unavailable",
        description: "This time slot is already booked. Please choose another time.",
        variant: "destructive",
      });
      return;
    }

    const newBooking: Booking = {
      date: dateString,
      time: form.time,
      court: form.court
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("padelBookings", JSON.stringify(updatedBookings));

    // Prepare initial WhatsApp booking message
    const price = getPrice(form.time);
    const courtName = courts.find(c => c.id === form.court)?.name;
    const formattedDate = format(form.date, "EEEE, MMMM dd, yyyy");
    
    const bookingMessage = encodeURIComponent(
      `🏓 New Padel Court Booking\n\n` +
      `👤 Name: ${form.name}\n` +
      `🏢 Court: ${courtName}\n` +
      `📅 Date: ${formattedDate}\n` +
      `⏰ Time: ${form.time}\n` +
      `💰 Price: $${price}${price === 20 ? " (Early Bird Discount)" : ""}\n\n` +
      `Please confirm this booking. Thank you!`
    );

    // Replace with your Lebanese WhatsApp number
    const whatsappNumber = "+96178841832"; // Replace with your actual number
    const bookingUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;
    
    window.open(bookingUrl, "_blank");

    // Schedule automated follow-up messages (simulate with localStorage for demo)
    const followUpData = {
      customerName: form.name,
      courtName,
      date: formattedDate,
      time: form.time,
      price,
      bookingTime: new Date().toISOString()
    };
    
    // Store follow-up data for future automated messages
    const followUps = JSON.parse(localStorage.getItem("padelFollowUps") || "[]");
    followUps.push(followUpData);
    localStorage.setItem("padelFollowUps", JSON.stringify(followUps));

    // Show automated follow-up preview
    setTimeout(() => {
      const reminderMessage = encodeURIComponent(
        `🎾 Elite Padel Reminder\n\n` +
        `Hi ${form.name}! 👋\n\n` +
        `This is a friendly reminder about your upcoming padel session:\n\n` +
        `🏢 Court: ${courtName}\n` +
        `📅 Date: ${formattedDate}\n` +
        `⏰ Time: ${form.time}\n\n` +
        `See you on the court! 🔥\n` +
        `Elite Padel Team`
      );
      
      toast({
        title: "Automated Follow-up Scheduled",
        description: `We'll send a reminder message: "Hi ${form.name}! See you at ${form.time} on ${form.date ? format(form.date, "MMM dd") : ""}!"`,
      });
    }, 2000);

    toast({
      title: "Booking Submitted!",
      description: "Your booking details have been sent to WhatsApp. We'll confirm shortly.",
    });

    // Reset form
    setForm({
      name: "",
      date: undefined,
      time: "",
      court: ""
    });
  };

  return (
    <section id="booking" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your <span className="text-primary">Court</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Select your preferred date, time, and court. Get 50% off for bookings before 4 PM!
          </p>
        </div>

        <Card className="bg-gradient-card backdrop-blur-glass border-border animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CalendarIcon className="w-6 h-6 text-primary" />
              Court Reservation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-secondary/50 border-border focus:border-primary"
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(form.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => setForm({ ...form, date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Court Selection */}
            <div className="space-y-2">
              <Label>Choose Court</Label>
              <div className="grid grid-cols-2 gap-4">
                {courts.map((court) => (
                  <Button
                    key={court.id}
                    variant={form.court === court.id ? "default" : "secondary"}
                    className="h-16 flex-col gap-2"
                    onClick={() => setForm({ ...form, court: court.id })}
                  >
                    <span className="text-2xl">{court.icon}</span>
                    <span>{court.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {form.date && form.court && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = isTimeSlotBooked(form.date!, time, form.court);
                    const price = getPrice(time);
                    const isEarlyBird = price === 20;
                    
                    return (
                      <Button
                        key={time}
                        variant={form.time === time ? "default" : "secondary"}
                        disabled={isBooked}
                        className={cn(
                          "h-16 flex-col gap-1 relative",
                          isBooked && "opacity-50 cursor-not-allowed",
                          isEarlyBird && !isBooked && "ring-2 ring-primary/50"
                        )}
                        onClick={() => setForm({ ...form, time })}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{time}</span>
                        <span className="text-xs text-primary font-bold">
                          ${price}
                        </span>
                        {isEarlyBird && !isBooked && (
                          <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                            50% OFF
                          </div>
                        )}
                      </Button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>Before 4 PM: $20 (50% off)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>After 4 PM: $40</span>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary and Submit */}
            {form.name && form.date && form.time && form.court && (
              <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{courts.find(c => c.id === form.court)?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span>{format(form.date, "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{form.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-bold">${getPrice(form.time)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBooking}
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirm Booking via WhatsApp
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
