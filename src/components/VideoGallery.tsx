import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Play, X, Users, Award, Camera } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Professional Gameplay",
    description: "Watch our elite players in action on our premium indoor courts",
    thumbnail: "https://via.placeholder.com/400x250?text=Video+1", // Replace with actual thumbnail or import
    duration: "2:30",
    category: "Gameplay",
    icon: Award,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
  },
  {
    id: 2,
    title: "Facility Tour",
    description: "Explore our world-class facilities and premium amenities",
    thumbnail: "https://via.placeholder.com/400x250?text=Video+2", // Replace with actual thumbnail or import
    duration: "3:15",
    category: "Facilities",
    icon: Camera,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
  },
  {
    id: 3,
    title: "Happy Customers",
    description: "See why our members love playing at Elite Padel",
    thumbnail: "https://via.placeholder.com/400x250?text=Video+3", // Replace with actual thumbnail or import
    duration: "1:45",
    category: "Community",
    icon: Users,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
  }
];

export const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const openVideo = (videoId: number) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const selectedVideoData = videos.find(v => v.id === selectedVideo);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience <span className="text-primary">Elite Padel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See our courts in action, explore our facilities, and discover why 
            players choose Elite Padel for their ultimate gaming experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => {
            const Icon = video.icon;
            return (
              <Card 
                key={video.id}
                className="group bg-gradient-card backdrop-blur-glass border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => openVideo(video.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <Badge className="absolute bottom-3 right-3 bg-background/80 text-foreground">
                    {video.duration}
                  </Badge>

                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                    <Icon className="w-3 h-3 mr-1" />
                    {video.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Video Modal */}
        {selectedVideo && selectedVideoData && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl mx-auto">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 z-10"
                onClick={closeVideo}
              >
                <X className="w-6 h-6" />
              </Button>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={selectedVideoData.videoUrl}
                  title={selectedVideoData.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {selectedVideoData.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedVideoData.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};