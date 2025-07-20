import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "./ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { MapPin, Navigation, ExternalLink, AlertCircle } from "lucide-react";

export const LocationMap = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Lebanon coordinates (Beirut area)
  const latitude = 33.8938;
  const longitude = 35.5018;
  const address = "Beirut Sports Complex, Lebanon";

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find <span className="text-primary">Our Location</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Easy to reach, convenient parking, and located in the heart of Beirut.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="animate-fade-in-scale">
            <Card className="bg-gradient-card backdrop-blur-glass border-border overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {showTokenInput ? (
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground mb-1">Mapbox Token Required</p>
                        <p className="text-muted-foreground">
                          To display the interactive map, please enter your Mapbox public token. 
                          Get yours at{" "}
                          <a 
                            href="https://mapbox.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            mapbox.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                      <Input
                        id="mapbox-token"
                        type="password"
                        placeholder="pk.eyJ1..."
                        value={mapboxToken}
                        onChange={(e) => setMapboxToken(e.target.value)}
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleTokenSubmit}
                      disabled={!mapboxToken.trim()}
                      className="w-full"
                    >
                      Load Interactive Map
                    </Button>
                  </div>
                ) : (
                  <div className="h-80 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Interactive map would load here with Mapbox token
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowTokenInput(true)}
                        className="mt-2"
                      >
                        Change Token
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Directions & Info */}
          <div className="space-y-6 animate-fade-in-scale [animation-delay:0.2s]">
            <Card className="bg-gradient-card backdrop-blur-glass border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Address</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button 
                    variant="ghost" 
                    className="justify-start h-12"
                    onClick={() => window.open(googleMapsUrl, "_blank")}
                  >
                    <Navigation className="w-5 h-5 mr-3 text-blue-500" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start h-12"
                    onClick={() => window.open(appleMapsUrl, "_blank")}
                  >
                    <Navigation className="w-5 h-5 mr-3 text-gray-500" />
                    <span>Open in Apple Maps</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start h-12"
                    onClick={() => window.open(wazeUrl, "_blank")}
                  >
                    <Navigation className="w-5 h-5 mr-3 text-cyan-500" />
                    <span>Open in Waze</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-gradient-card backdrop-blur-glass border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">Getting Here</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Free parking available on-site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>5 minutes from Beirut city center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Public transport accessible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Near major shopping centers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};