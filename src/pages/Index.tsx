import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { RealTimeAvailability } from "../components/RealTimeAvailability";
import { CourtsShowcase } from "../components/CourtsShowcase";
import { VideoGallery } from "../components/VideoGallery";
import { BookingSystem } from "../components/BookingSystem";
import { LocationMap } from "../components/LocationMap";
// Update the import path if the Contact component is located elsewhere, for example:
import { Contact } from "../components/Contact";
// Or create the Contact.tsx file in src/components if it does not exist.

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <RealTimeAvailability />
      <div id="courts">
        <CourtsShowcase />
      </div>
      <div id="videos">
        <VideoGallery />
      </div>
      <div id="booking">
        <BookingSystem />
      </div>
      <div id="location">
        <LocationMap />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
