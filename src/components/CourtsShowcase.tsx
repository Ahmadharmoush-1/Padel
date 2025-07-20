import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Users, Clock, Thermometer, Droplets } from "lucide-react";
// import indoorCourtImage from "@/assets/indoor-court.jpg";
// import outdoorCourtImage from "@/assets/outdoor-court.jpg";
const indoorCourtImage = "/images/indoor.jpg";
const outdoorCourtImage = "/images/outdoor.jpg";

const courts = [
  {
    id: "indoor",
    name: "Indoor Court",
    image: indoorCourtImage,
    features: ["Climate Controlled", "LED Lighting", "Premium Glass Walls", "Professional Flooring"],
    icons: [Thermometer, Clock, Users, Droplets],
    description: "Experience padel in perfect conditions year-round with our state-of-the-art indoor facility."
  },
  {
    id: "outdoor",
    name: "Outdoor Court", 
    image: outdoorCourtImage,
    features: ["Natural Ambiance", "Mountain Views", "Fresh Air", "Sunset Games"],
    icons: [Users, Clock, Thermometer, Droplets],
    description: "Play under the open sky with breathtaking views and natural lighting for an authentic experience."
  }
];

export const CourtsShowcase = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Premium</span> Courts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose between our luxury indoor facility or scenic outdoor court, 
            both designed to deliver an exceptional padel experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courts.map((court, index) => (
            <Card 
              key={court.id} 
              className="group bg-gradient-card backdrop-blur-glass border-border hover:border-primary/50 transition-all duration-500 overflow-hidden animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge 
                  className="absolute top-4 left-4 bg-primary/90 text-primary-foreground"
                >
                  {court.name}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {court.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {court.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {court.features.map((feature, featureIndex) => {
                    const Icon = court.icons[featureIndex];
                    return (
                      <div 
                        key={feature} 
                        className="flex items-center gap-2 text-sm"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};