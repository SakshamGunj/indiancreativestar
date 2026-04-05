import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Award, Palette, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const artworkItems = [
  {
    id: 1,
    title: "Ephemeral Dreams",
    artist: "Ananya Sharma",
    type: "Digital Art",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 432,
    views: 1204,
    category: "Digital"
  },
  {
    id: 2,
    title: "Urban Canvas",
    artist: "Vikram Singh",
    type: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 521,
    views: 1457,
    category: "Traditional"
  },
  {
    id: 3,
    title: "Mystic Forest",
    artist: "Priya Nair",
    type: "Mixed Media",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 289,
    views: 734,
    category: "Mixed Media"
  },
  {
    id: 4,
    title: "Digital Bloom",
    artist: "Rajiv Mehta",
    type: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 356,
    views: 890,
    category: "Photography"
  },
  {
    id: 5,
    title: "Abstract Harmony",
    artist: "Sneha Patel",
    type: "Abstract",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    likes: 298,
    views: 756,
    category: "Abstract"
  },
  {
    id: 6,
    title: "Nature's Palette",
    artist: "Arjun Kumar",
    type: "Landscape",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 445,
    views: 1123,
    category: "Landscape"
  },
  {
    id: 7,
    title: "Modern Minimalism",
    artist: "Zara Khan",
    type: "Contemporary",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    likes: 378,
    views: 945,
    category: "Contemporary"
  },
  {
    id: 8,
    title: "Cultural Fusion",
    artist: "Rahul Verma",
    type: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format&q=80",
    likes: 512,
    views: 1289,
    category: "Cultural"
  }
];

export function GallerySectionV2() {
  return (
    <section className="py-20 px-4" id="gallery">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            🎨 Featured Art
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-gradient">Artworks</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Discover incredible creations from our talented artists. Each piece tells a unique story of creativity and passion.
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {artworkItems.map((item) => (
            <Card key={item.id} className="glassmorphism-card group overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/80 text-xs mb-2">By {item.artist}</p>
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="outline" 
                    className="bg-purple-50 text-purple-600 border-purple-200 text-xs"
                  >
                    {item.type}
                  </Badge>
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" /> 
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-500" /> 
                      {item.views}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-gray-600 text-xs">By {item.artist}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="glassmorphism-card p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Palette className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Your Art Could Be Next! 😊
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join our community of talented artists and showcase your creativity to the world. 
              Submit your artwork today and get featured in our gallery!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Submit Your Artwork
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="px-8 py-4 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-lg font-semibold rounded-2xl transition-all duration-300">
                View Full Gallery
                <Star className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

