import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const artworkItems = [
  {
    id: 1,
    title: "Ephemeral Dreams",
    artist: "Ananya Sharma",
    type: "art",
    imageUrl: "/images/e86eb06b5d4904169f8df31bebe2cb86.jpg",
    likes: 432,
    views: 1204,
  },
  {
    id: 2,
    title: "Urban Canvas",
    artist: "Vikram Singh",
    type: "art",
    imageUrl: "/images/54614b3791b5fd2d60530d9661b3cf80.jpg",
    likes: 521,
    views: 1457,
  },
  {
    id: 3,
    title: "Mystic Forest",
    artist: "Priya Nair",
    type: "art",
    imageUrl: "/images/f0d90b249cd4582aaaeb47b9ecee3c14.jpg",
    likes: 289,
    views: 734,
  },
  {
    id: 4,
    title: "Digital Bloom",
    artist: "Rajiv Mehta",
    type: "art",
    imageUrl: "/images/c9c807abb1b5486218c4f0eeb641414c.jpg",
    likes: 356,
    views: 890,
  },
  
];

export function GallerySection() {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        {/* Featured Artworks Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge variant="outline" className="mb-2 border-creative-blue/50 text-creative-blue">Featured Art</Badge>
            <h2 className="text-4xl font-bold text-gradient from-creative-blue to-creative-indigo mb-2">Featured Artworks</h2>
            <p className="text-muted-foreground mt-1">Creations from our talented artists</p>
          </div>
        
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {artworkItems.slice(0, 8).map((item) => (
            <Card key={item.id} className="gallery-item group overflow-hidden border-border/30 hover:border-creative-blue/70 transition-all duration-300 shadow-lg hover:shadow-creative-blue/20">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-white/70 text-sm">By {item.artist}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge 
                    variant="outline" 
                    className="bg-creative-blue/10 text-creative-blue border-creative-blue/30"
                  >
                    Artwork
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {item.likes}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {item.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
         your art can be next 😊
        </div>
        
      
      </div>
    </section>
  );
}
