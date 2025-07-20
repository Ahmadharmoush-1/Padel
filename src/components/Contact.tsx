import { Button } from "./ui/Button";;
import { Card, CardContent } from "../components/ui/card";
import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";

export const Contact = () => {
  const openWhatsApp = () => {
    const whatsappNumber = "+96178841832"; // Replace with your actual Lebanese number
    const message = encodeURIComponent("Hello! I'd like to know more about your padel courts.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-t from-secondary/20 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Have questions? Need assistance? We're here to help you book the perfect court.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-scale">
            <Card className="bg-gradient-card backdrop-blur-glass border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+961 78841832</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-glass border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Beirut Sports Complex<br />Lebanon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-glass border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Hours</h3>
                    <p className="text-muted-foreground">Daily: 8:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col justify-center animate-fade-in-scale [animation-delay:0.2s]">
            <Card className="bg-gradient-card backdrop-blur-glass border-border text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Book via WhatsApp
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get instant confirmation and support through WhatsApp. 
                  Chat with us directly for booking assistance.
                </p>
                <Button 
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white hover:shadow-glow hover:scale-105 w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};