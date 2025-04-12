
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Award } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Colors of Emotion",
    artist: "Ananya Sharma",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    likes: 432,
    views: 1204,
  },
  {
    id: 2,
    title: "Whispers of the Soul",
    artist: "Rajiv Mehta",
    type: "poetry",
    imageUrl: "https://images.unsplash.com/photo-1512677859289-868722899545?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    likes: 356,
    views: 890,
  },
  {
    id: 3,
    title: "Monsoon Dreams",
    artist: "Priya Nair",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    likes: 289,
    views: 734,
  },
  {
    id: 4,
    title: "Urban Chaos",
    artist: "Vikram Singh",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    likes: 521,
    views: 1457,
  },
];

export function GallerySection() {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge variant="outline" className="mb-2">Featured Work</Badge>
            <h2 className="text-4xl font-bold text-gradient">Featured Artworks</h2>
            <p className="text-muted-foreground mt-2">Previous winners and notable entries</p>
          </div>
          <button className="creative-btn-secondary flex items-center gap-2">
            View All Artworks
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="gallery-item group overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.artist}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${item.type === 'art' ? 'bg-creative-blue/10 text-creative-blue' : 'bg-creative-pink/10 text-creative-pink'}`}
                  >
                    {item.type === 'art' ? 'Artwork' : 'Poetry'}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {item.views}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
