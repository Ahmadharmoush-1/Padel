import { Button } from "./ui/button";
import { MessageCircle, Menu } from "lucide-react";
// import logo from "../assets/logo.png";

export const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const whatsappNumber = "+96178841832"; // Replace with your actual Lebanese number
    const message = encodeURIComponent("Hello! I'd like to know more about your padel courts.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-card backdrop-blur-glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
                  <img
  src="/photos/logo.png"
  alt="Padel Court"
   className="w-12 h-12 object-cover rounded-full"
/>

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">{"PADELNAME"}</h1>
              <p className="text-xs text-muted-foreground">Premium Courts</p>
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("courts")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Courts
            </button>
            <button 
              onClick={() => scrollToSection("videos")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Book Now
            </button>
            <button 
              onClick={() => scrollToSection("location")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Location
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={openWhatsApp}
              className="hidden sm:flex"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={() => scrollToSection("booking")}
            >
              Book Court
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};