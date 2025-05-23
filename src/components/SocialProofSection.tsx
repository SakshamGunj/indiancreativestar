import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Award, Bookmark, Palette, Ribbon, Users, Medal, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

// Sample testimonials
const testimonials = [
  { name: "Arjun Kapoor", location: "Mumbai", quote: "Participating in SCS gave my artwork the platform I've been dreaming of for years!", rating: 5 },
  { name: "Rahul Mehra", location: "Bangalore", quote: "From a hobby artist to getting nationally recognized - SCS made it possible!", rating: 4 },
  { name: "Sneha Patel", location: "Ahmedabad", quote: "The community of artists I met through this contest has become my support system.", rating: 5 },
  { name: "Vikram Singh", location: "Jaipur", quote: "Getting featured in the eMagazine opened doors to art galleries I couldn't access before.", rating: 5 },
  { name: "Ayesha Khan", location: "Lucknow", quote: "The professional feedback on my artwork helped me improve my technique tremendously!", rating: 5 },
];

// Sample stats
const stats = [
  { label: "Participants", value: "1,000+", color: "creative-purple", icon: Users },
  { label: "Cities Reached", value: "250+", color: "creative-blue", icon: Bookmark },
  { label: "Cash Prizes", value: "₹30,000", color: "creative-yellow", icon: Trophy },
  { label: "Success Stories", value: "500+", color: "creative-pink", icon: Medal },
];

// Campus ambassadors
const ambassadors = [
  
  { name: "Shashank Saha", college: "Sikkim Manipal Institute of Technology", region: "Northeast India" },
  
];

// Trust reasons
const trustReasons = [
  { 
    title: "Transparent Process", 
    description: "Clear judging criteria and fair competition",
    icon: Check,
    color: "creative-yellow" 
  },
  { 
    title: "Expert Jury", 
    description: "Recognized industry experts evaluate your work",
    icon: Award,
    color: "creative-blue" 
  },
  { 
    title: "Artistic Showcase", 
    description: "Your art gets the visibility it deserves",
    icon: Palette,
    color: "creative-purple" 
  },
  { 
    title: "Community Support", 
    description: "Join a network of like-minded artists",
    icon: Users,
    color: "creative-pink" 
  },
];

export function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-creative-yellow' : 'text-white/20'}`}
      />
    ));
  };
  
  return (
    <section className="section-padding bg-gradient-to-b from-background/95 to-black/95">
      <div className="container">
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black px-3 py-1 mb-2">
              Our Supporters
            </Badge>
            <h3 className="text-2xl font-bold mb-2">Our Partners & Sponsors</h3>
          </div>
          
          {/* Featured Partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-10">
            <div className="creative-card p-5 min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-br from-black/70 to-creative-yellow/10 border-creative-yellow/40 hover:border-creative-yellow/70 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-white/5 p-1 flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src="/funkymonkey.jpeg" 
                  alt="Funky Monkey" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="font-bold text-base sm:text-lg">Funky Monkey</span>
              <span className="text-xs text-white/70 mt-1">Sponsor</span>
            </div>
            
            <div className="creative-card p-5 min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-br from-black/70 to-creative-blue/10 border-creative-blue/40 hover:border-creative-blue/70 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-white/5 p-1 flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src="/images/491464951_17845907094465695_1813363270352732276_n.jpg" 
                  alt="Daami Event" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="font-bold text-base sm:text-lg">Daami Event</span>
              <span className="text-xs text-white/70 mt-1">Event Management Partner</span>
            </div>
            
            <div className="creative-card p-5 min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-br from-black/70 to-creative-orange/10 border-creative-orange/40 hover:border-creative-orange/70 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-white/5 p-1 flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src="/tenversemedia.jpeg" 
                  alt="Tenverse Media" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="font-bold text-base sm:text-lg">Tenverse Media</span>
              <span className="text-xs text-white/70 mt-1">Sponsor</span>
            </div>
            
            <div className="creative-card p-5 min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-br from-black/70 to-creative-purple/10 border-creative-purple/40 hover:border-creative-purple/70 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-white/5 p-1 flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src="/images/370551319_670765108420844_4119394780844068712_n__1_-removebg-preview.png" 
                  alt="Sikkim Daily News" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="font-bold text-base sm:text-lg">Sikkim Daily News</span>
              <span className="text-xs text-white/70 mt-1">Media News Agency Partner</span>
            </div>
            
           
          </div>
          
          {/* Certificate and Art Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <p className="text-sm text-white/70 uppercase tracking-wider mb-4 text-center font-semibold">Certificate Partner</p>
              <div className="creative-card p-6 min-h-[120px] flex items-center justify-center bg-gradient-to-br from-black/70 to-creative-yellow/10 border-creative-yellow/40 hover:border-creative-yellow/70 hover:scale-105 transition-all duration-300">
                <div className="bg-black/30 rounded-full p-3 mr-4">
                  <Ribbon className="h-8 w-8 text-creative-yellow" />
                </div>
                <span className="font-bold text-lg">Sikkim Creative Media Design Co.</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-white/70 uppercase tracking-wider mb-4 text-center font-semibold">Art Partners</p>
              <div className="creative-card p-6 min-h-[120px] flex items-center justify-center bg-gradient-to-br from-black/70 to-creative-purple/10 border-creative-purple/40 hover:border-creative-purple/70 hover:scale-105 transition-all duration-300">
                <div className="bg-black/30 rounded-full p-3 mr-4">
                  <Palette className="h-8 w-8 text-creative-purple" />
                </div>
                <span className="font-bold text-lg">Art Society of Sikkim</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Campus Ambassadors - Enhanced */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-blue text-white px-3 py-1 mb-2">
              Campus Network
            </Badge>
            <h3 className="text-2xl font-bold mb-2">Our Campus Ambassadors</h3>
            <p className="text-sm text-white/60 mb-6 max-w-2xl mx-auto">
              Student representatives from top institutions across Sikkim helping us discover emerging artistic talent
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {ambassadors.map((ambassador, index) => (
              <div 
                key={index} 
                className="creative-card p-4 bg-gradient-to-br from-black/60 to-creative-purple/10 border-creative-purple/20 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-full bg-creative-purple/20 mx-auto mb-3 flex items-center justify-center">
                  <span className="font-bold text-lg">{ambassador.name[0]}</span>
                </div>
                <p className="font-semibold text-sm">{ambassador.name}</p>
                <p className="text-xs text-white/60">{ambassador.college}</p>
                <p className="text-xs text-creative-purple mt-1">{ambassador.region}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
