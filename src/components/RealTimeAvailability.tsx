import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  date: string;
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

export const RealTimeAvailability = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem("padelBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Listen for storage changes to update availability in real-time
    const handleStorageChange = () => {
      const updatedBookings = localStorage.getItem("padelBookings");
      if (updatedBookings) {
        setBookings(JSON.parse(updatedBookings));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isTimeSlotBooked = (court: string, time: string) => {
    const today = format(new Date(), "yyyy-MM-dd");
    return bookings.some(
      booking => 
        booking.date === today && 
        booking.time === time && 
        booking.court === court
    );
  };

  const getAvailableSlots = (court: string) => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    return timeSlots.filter(time => {
      const [hour] = time.split(":").map(Number);
      const isNotPast = hour > currentHour || (hour === currentHour && currentMinute < 30);
      const isNotBooked = !isTimeSlotBooked(court, time);
      return isNotPast && isNotBooked;
    });
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 px-6 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            <span className="text-primary">Live</span> Availability
          </h3>
          <p className="text-muted-foreground">
            Real-time court availability for today • Updates automatically
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courts.map((court) => {
            const availableSlots = getAvailableSlots(court.id);
            const totalSlots = timeSlots.length;
            const bookedSlots = totalSlots - availableSlots.length;
            const availabilityPercentage = Math.round((availableSlots.length / totalSlots) * 100);

            return (
              <Card 
                key={court.id}
                className="bg-gradient-card backdrop-blur-glass border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={scrollToBooking}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{court.icon}</span>
                      <span>{court.name}</span>
                    </div>
                    <Badge 
                      variant={availableSlots.length > 5 ? "default" : availableSlots.length > 0 ? "secondary" : "destructive"}
                      className="ml-2"
                    >
                      {availabilityPercentage}% Available
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Availability Summary */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span>{availableSlots.length} Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="w-4 h-4" />
                        <span>{bookedSlots} Booked</span>
                      </div>
                    </div>

                    {/* Next Available Slots */}
                    {availableSlots.length > 0 ? (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Next Available:</p>
                        <div className="flex flex-wrap gap-2">
                          {availableSlots.slice(0, 4).map((time) => (
                            <Badge 
                              key={time}
                              variant="outline" 
                              className="text-xs border-primary/50 text-primary"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                          {availableSlots.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{availableSlots.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Fully booked today</p>
                        <p className="text-xs text-muted-foreground">Try tomorrow!</p>
                      </div>
                    )}

                    {/* Quick Book Button */}
                    {availableSlots.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-center text-muted-foreground hover:text-primary transition-colors">
                          Click to book this court →
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live updates • Last refreshed: {format(currentTime, "HH:mm")}
          </p>
        </div>
      </div>
    </section>
  );
};