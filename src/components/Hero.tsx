import { Button } from "./ui/button";

import { ChevronDown } from "lucide-react";
// import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
  <video
    src="\videos\padel.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
</div>


      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            ThePadelMount

          </span>
          <br />
          <span className="text-foreground">Experience</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up [animation-delay:0.2s]">
          Where champions are made. Book your court today and elevate your game 
          on our premium indoor and outdoor facilities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.4s]">
          <Button 
            variant="default" 
            size="lg" 
            onClick={scrollToBooking}
            className="group"
          >
            Book Your Court
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="hover:text-primary"
          >
            View Courts
          </Button>
        </div>
      </div>

      {/* Floating Animation Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
};