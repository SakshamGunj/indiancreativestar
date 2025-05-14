import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Award, Bookmark, BookOpen, Palette, PenLine, Ribbon } from "lucide-react";

// Sample testimonials
const testimonials = [
  { name: "Arjun Kapoor", location: "Mumbai", quote: "Participating in ICS gave my artwork the platform I've been dreaming of for years!", rating: 5 },
  { name: "Priya Sharma", location: "Delhi", quote: "The feedback from professional judges transformed how I approach my poetry. Worth every minute!", rating: 5 },
  { name: "Rahul Mehra", location: "Bangalore", quote: "From a hobby artist to getting nationally recognized - ICS made it possible!", rating: 4 },
  { name: "Sneha Patel", location: "Ahmedabad", quote: "The community of artists I met through this contest has become my support system.", rating: 5 },
  { name: "Vikram Singh", location: "Jaipur", quote: "Getting featured in the eMagazine opened doors to art galleries I couldn't access before.", rating: 5 },
];

// Sample stats
const stats = [
  { label: "Participants", value: "10,000+", color: "creative-purple" },
  { label: "Cities Reached", value: "250+", color: "creative-blue" },
  { label: "Cash Prizes", value: "₹1,00,000", color: "creative-yellow" },
  { label: "Success Stories", value: "500+", color: "creative-pink" },
];

// Campus ambassadors
const ambassadors = [
  { name: "Meera Joshi", college: "Jadavpur University", region: "East India" },
  { name: "Shashank Saha", college: "Sikkim Manipal Institute of Technology", region: "Northeast India" },
  { name: "Sukriti Verma", college: "Medhavi University", region: "Northeast India" },
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1">
              Real Results
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-4">Join Thousands of Rising Artists</h2>
          <p className="text-muted-foreground text-xl">
            Don't just take our word for it - hear from the artists and poets who've been part of ICS
          </p>
          
          <div className="mt-6 creative-card py-2 px-4 inline-flex items-center gap-2 bg-gradient-to-r from-creative-yellow/20 to-creative-orange/20">
            <Star className="h-5 w-5 text-creative-yellow" />
            <span className="font-bold">4.5/5</span>
            <span className="text-sm">Rated by 10,000+ artists</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`creative-card p-6 text-center bg-gradient-to-br from-black/80 to-${stat.color}/10 border-${stat.color}/20 hover:scale-105 transition-all duration-300`}
              >
                <h3 className={`text-3xl sm:text-4xl font-bold text-${stat.color} mb-2`}>{stat.value}</h3>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Featured testimonial */}
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-yellow/10 border-creative-yellow/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-10 text-9xl font-serif group-hover:scale-110 transition-all duration-500">"</div>
            <div className="mb-4 flex justify-between">
              <div>
                <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-white/60">{testimonials[currentIndex].location}</p>
              </div>
              <div className="flex">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
            </div>
            
            <p className="text-lg italic text-white/90 mb-4">"{testimonials[currentIndex].quote}"</p>
            
            <div className="flex justify-center mt-4 space-x-1">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/30'}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Brands / Partner logos */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <Badge className="bg-gradient-to-r from-creative-blue to-creative-purple text-white px-3 py-1">
                Our Supporters
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-2">Our Partners & Sponsors</h3>
            <p className="text-sm text-white/40 uppercase tracking-wider mb-6">As featured in</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
              <Trophy className="h-6 w-6 mb-1 text-creative-yellow" />
              <span className="font-bold text-lg">DOM</span>
            </div>
            <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
              <Bookmark className="h-6 w-6 mb-1 text-creative-blue" />
              <span className="font-bold text-lg">Classmate</span>
            </div>
            <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
              <Star className="h-6 w-6 mb-1 text-creative-orange" />
              <span className="font-bold text-lg">Times Now</span>
            </div>
            <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
              <Star className="h-6 w-6 mb-1 text-creative-purple" />
              <span className="font-bold text-lg">YourStory</span>
            </div>
            <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
              <Star className="h-6 w-6 mb-1 text-creative-red" />
              <span className="font-bold text-lg">India Today</span>
            </div>
          </div>
          
          {/* Certificate Partner */}
          <div className="mt-10 text-center">
            <p className="text-sm text-white/40 uppercase tracking-wider mb-4">Certificate Partner</p>
            <div className="creative-card h-24 max-w-md mx-auto flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 p-3">
              <Ribbon className="h-8 w-8 mr-3 text-creative-yellow" />
              <span className="font-bold text-xl">Indian Creative Media Design Co.</span>
            </div>
          </div>
          
          {/* Poetry Partners */}
          <div className="mt-10 text-center">
            <p className="text-sm text-white/40 uppercase tracking-wider mb-4">Poetry Partners</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
                <PenLine className="h-6 w-6 mb-1 text-creative-pink" />
                <span className="font-bold text-lg">Poetry Society of India</span>
              </div>
              <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
                <BookOpen className="h-6 w-6 mb-1 text-creative-blue" />
                <span className="font-bold text-lg">Classmate</span>
              </div>
              <div className="creative-card h-20 flex flex-col items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 p-2">
                <Palette className="h-6 w-6 mb-1 text-creative-purple" />
                <span className="font-bold text-lg">Poets' Collective</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Campus Ambassadors */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Campus Ambassadors</h3>
            <p className="text-sm text-white/60 mb-6">
              Student representatives from top institutions across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ambassadors.map((ambassador, index) => (
              <div 
                key={index} 
                className="creative-card p-4 bg-gradient-to-br from-black/60 to-creative-purple/10 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-creative-purple/20 mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold">{ambassador.name[0]}</span>
                </div>
                <p className="font-semibold text-sm">{ambassador.name}</p>
                <p className="text-xs text-white/60">{ambassador.college}</p>
                <p className="text-xs text-creative-purple mt-1">{ambassador.region}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">Why Artists Trust Us</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="creative-card p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-creative-yellow/20 mx-auto mb-3 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-creative-yellow" />
            </div>
            <h4 className="font-bold">Transparent Process</h4>
            <p className="text-xs text-white/60 mt-1">Clear judging criteria and fair competition</p>
          </div>
          
          <div className="creative-card p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-creative-blue/20 mx-auto mb-3 flex items-center justify-center">
              <Award className="h-6 w-6 text-creative-blue" />
            </div>
            <h4 className="font-bold">Expert Jury</h4>
            <p className="text-xs text-white/60 mt-1">Recognized industry experts evaluate your work</p>
          </div>
          
          <div className="creative-card p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-creative-pink/20 mx-auto mb-3 flex items-center justify-center">
              <Star className="h-6 w-6 text-creative-pink" />
            </div>
            <h4 className="font-bold">Nationwide Platform</h4>
            <p className="text-xs text-white/60 mt-1">Connect with artists across all of India</p>
          </div>
          
          <div className="creative-card p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-creative-purple/20 mx-auto mb-3 flex items-center justify-center">
              <Star className="h-6 w-6 text-creative-purple" />
            </div>
            <h4 className="font-bold">Real Opportunities</h4>
            <p className="text-xs text-white/60 mt-1">Career-building exposure and connections</p>
          </div>
        </div>
        
        {/* Social proof badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="social-proof-badge bg-black/40 border border-creative-purple/30 text-white">
            <Star className="h-3 w-3 text-creative-purple" />
            <span>10K+ Registrations</span>
          </div>
          <div className="social-proof-badge bg-black/40 border border-creative-blue/30 text-white">
            <Star className="h-3 w-3 text-creative-blue" />
            <span>4.5/5 Participant Rating</span>
          </div>
          <div className="social-proof-badge bg-black/40 border border-creative-pink/30 text-white">
            <Star className="h-3 w-3 text-creative-pink" />
            <span>500+ Success Stories</span>
          </div>
          <div className="social-proof-badge bg-black/40 border border-creative-yellow/30 text-white">
            <Star className="h-3 w-3 text-creative-yellow" />
            <span>National Recognition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
