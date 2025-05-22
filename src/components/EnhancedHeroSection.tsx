import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowDown, 
  ArrowRight,
  Star,
  Award,
  CheckCircle,
  Trophy,
  Medal,
  Palette,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "@/components/CountdownTimer";

interface EnhancedHeroSectionProps {
  onRegisterClick?: () => void;
}

export function EnhancedHeroSection({ onRegisterClick }: EnhancedHeroSectionProps) {
  const navigate = useNavigate();
  
  const handleEnterCompetitions = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      navigate("/competitions");
    }
  };

  const scrollToLearnMore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-background/90 to-background z-10" />
        <img 
          src="https://i.postimg.cc/3d02RYzF/pexels-pixabay-161154-11zon-1.jpg" 
          alt="Creative Star Background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-3">
              <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1 text-sm font-medium">
                Limited Time Opportunity
              </Badge>
            </div>
            
            <h1 className="font-bold mb-4 animate-fade-in leading-tight">
              <span className="text-white text-xl md:text-2xl lg:text-3xl opacity-90">Transform Your Art Into</span>
              <span className="block text-gradient text-xl md:text-2xl lg:text-3xl mt-1 mb-3 opacity-90">National Recognition</span>
              <span className="block text-4xl md:text-6xl lg:text-8xl mt-2 mb-3 bg-gradient-to-r from-creative-yellow to-creative-orange bg-clip-text text-transparent font-extrabold drop-shadow-sm relative">
                India's Prestigious Art Competition
                <span className="absolute -inset-1 -z-10 blur-sm bg-gradient-to-r from-creative-yellow/10 to-creative-orange/10 rounded-lg"></span>
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              <Badge className="hero-badge bg-gradient-to-r from-creative-purple/30 to-creative-purple/10 text-xs sm:text-sm">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-creative-yellow" />
                <span>1,000+ Artists Nationwide</span>
              </Badge>
              <Badge className="hero-badge bg-gradient-to-r from-creative-blue/30 to-creative-blue/10 text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-creative-blue" />
                <span>₹30,000 Prize Pool</span>
              </Badge>
              <Badge className="hero-badge bg-gradient-to-r from-creative-yellow/30 to-creative-yellow/10 text-xs sm:text-sm">
                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-creative-yellow" />
                <span>Professional Jury</span>
              </Badge>
            </div>
            
            {/* Creative Manifesto Quote */}
            <div 
              className="creative-card p-3 sm:p-4 mb-5 sm:mb-6 border-creative-yellow/30 bg-black/60 animate-fade-in transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-1">
                <span className="text-xs uppercase tracking-wider text-creative-yellow">OUR CREATIVE MANIFESTO</span>
              </div>
              
              <div>
                <p className="text-xs sm:text-base font-playfair italic text-white/90 leading-relaxed">
                  "They told your dreams don't pay, <br />
                  but your brush had more to say. <br />
                  What you create alone — the nation will now celebrate. <br />
                  India has millions of stories. Let yours rise today."
                </p>
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button 
                className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold group py-3 px-8 w-full sm:w-auto text-base sm:text-lg relative overflow-hidden"
                onClick={handleEnterCompetitions}
              >
                <span className="relative z-10">Enter Now - Only ₹50</span>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Button>
              
              <div className="text-xs text-white/70 flex items-center gap-1">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500/20 border border-green-500 relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                </span>
                <span>Registration Closing Soon</span>
              </div>
            </div>
            
            {/* Trusted by artists section */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="inline-flex items-center px-3 py-2 rounded-full bg-black/50 border border-white/20">
                <div className="flex -space-x-1 mr-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Artist" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20">
                    <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Artist" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="font-semibold text-sm"><span className="text-creative-yellow">1,000+</span> artists</span>
              </div>
              
              <div className="inline-flex items-center px-3 py-2 rounded-full bg-black/50 border border-white/20">
                <Star className="h-4 w-4 fill-creative-yellow text-creative-yellow mr-1.5" />
                <span className="font-semibold text-sm"><span className="text-creative-yellow">4.9</span> rating</span>
              </div>
              
              <div className="inline-flex items-center px-3 py-2 rounded-full bg-black/50 border border-white/20">
                <Users className="h-4 w-4 text-creative-blue mr-1.5" />
                <span className="font-semibold text-sm">Nationwide</span>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-6 xl:pl-10 animate-fade-in mt-6 lg:mt-0" style={{ animationDelay: "0.8s" }}>
            <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Registration Closes In:</h2>
                <Badge variant="outline" className="font-mono text-xs sm:text-sm">30 May 2025</Badge>
              </div>
              
              <CountdownTimer />
              
              <div className="mt-6 sm:mt-8 creative-card p-4 bg-gradient-to-r from-black/80 via-creative-purple/20 to-black/80 border-creative-purple/30">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
                    <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-creative-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">India's Creative Art Competition</h3>
                    <p className="text-sm text-white/70">Theme: Colors of Emotions</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="creative-card p-3 bg-black/60 border-creative-yellow/30 text-center">
                    <p className="text-xs text-white/70">Prize Pool</p>
                    <p className="text-xl sm:text-2xl font-bold text-creative-yellow">₹30,000</p>
                  </div>
                  <div className="creative-card p-3 bg-black/60 border-creative-blue/30 text-center">
                    <p className="text-xs text-white/70">Entry Fee</p>
                    <p className="text-xl sm:text-2xl font-bold text-creative-blue">₹50</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 creative-card p-4 bg-gradient-to-br from-black/60 to-creative-yellow/10 border-creative-yellow/30">
                <h3 className="font-semibold mb-3 text-white">Why Join This Competition:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-0.5 shrink-0" />
                    <span className="text-sm">Featured in "India's Creative Star 2025" Official eMagazine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-0.5 shrink-0" />
                    <span className="text-sm">National exposure to art galleries and collectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-0.5 shrink-0" />
                    <span className="text-sm">Professional feedback from renowned artists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-0.5 shrink-0" />
                    <span className="text-sm">Digital certificate and Artist ID Card</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-creative-blue to-creative-purple text-white font-bold py-3 text-base"
                onClick={handleEnterCompetitions}
              >
                Register Your Artwork Now
              </Button>
              
              <div className="mt-3 text-center text-xs text-white/60">
                <p>No complicated process. Register today and submit your artwork.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
