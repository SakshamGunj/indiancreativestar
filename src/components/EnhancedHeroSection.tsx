
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowDown, 
  ArrowRight,
  Star,
  Award,
  CheckCircle,
  Trophy,
  Medal
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
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background/90 to-background z-10" />
        <img 
          src="/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png" 
          alt="Creative Star Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-3">
              <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1 text-sm font-medium">
                ICS Presents
              </Badge>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              <Badge className="hero-badge bg-gradient-to-r from-creative-purple/30 to-creative-purple/10">
                <Star className="h-4 w-4 text-creative-yellow" />
                <span>India's Biggest Online Contest</span>
              </Badge>
              <Badge className="hero-badge bg-gradient-to-r from-creative-pink/30 to-creative-pink/10">
                <Award className="h-4 w-4 text-creative-pink" />
                <span>Registration is FREE!</span>
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-fade-in">
              <span className="text-white">Indian Creative Star</span>
              <span className="block text-gradient text-5xl md:text-6xl lg:text-7xl mt-1">Season 1</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white/90">Art & Poetry Competition</span>
            </h1>
            
            <div 
              className="creative-card p-3 sm:p-4 mb-6 border-creative-yellow/30 bg-black/60 animate-fade-in transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-1">
                <span className="text-xs uppercase tracking-wider text-creative-yellow">OUR CREATIVE MANIFESTO</span>
              </div>
              
              <div>
                <p className="text-sm sm:text-base font-playfair italic text-white/90 leading-relaxed">
                  "They told your dreams don't pay, <br />
                  but your brush and pen had more to say. <br />
                  What you create alone — the nation will now celebrate. <br />
                  India has millions of stories. Let yours rise today."
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
              <Badge className="bg-black/40 border border-creative-purple/40 text-white px-3 py-1.5 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-creative-purple" />
                <span>Get Certificate</span>
              </Badge>
              <Badge className="bg-black/40 border border-creative-pink/40 text-white px-3 py-1.5 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-creative-pink" />
                <span>National Recognition</span>
              </Badge>
              <Badge className="bg-black/40 border border-creative-yellow/40 text-white px-3 py-1.5 flex items-center gap-1">
                <Medal className="h-3.5 w-3.5 text-creative-yellow" />
                <span>Jury Reviewed</span>
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button 
                className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold group py-3 px-8"
                onClick={handleEnterCompetitions}
              >
                Register FREE <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="creative-btn-secondary" onClick={scrollToLearnMore}>
                Learn More <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Theme: All</span>
              <div className="h-4 w-px bg-white/20 mx-2"></div>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-creative-yellow font-bold">Limited Time FREE!</span>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Contest Ends In:</h2>
                <Badge variant="outline" className="font-mono">30 April 2025</Badge>
              </div>
              
              <CountdownTimer />
              
              <div className="mt-8 creative-card p-4 bg-gradient-to-br from-black/60 to-creative-purple/20 border-creative-purple/30">
                <div className="flex justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Prize Pool</h3>
                    <p className="prize-highlight text-3xl md:text-4xl font-bold mb-1">₹1,00,000</p>
                    <p className="text-white/70 text-sm">In Cash & Recognition</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 creative-card p-4 bg-gradient-to-br from-black/60 to-creative-yellow/20 border-creative-yellow/30">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-1 shrink-0" />
                    <span className="text-sm">Featured in "India's Creative Star 2025" Official eMagazine (Top 100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-1 shrink-0" />
                    <span className="text-sm">Featured in a Pan-India Digital Gallery (Lifetime)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-creative-yellow mt-1 shrink-0" />
                    <span className="text-sm">ICS Artist ID Card with your name & quote</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center creative-card p-4 bg-gradient-to-br from-black/60 to-creative-blue/20 border-creative-blue/30 animate-float" style={{ animationDelay: "0s" }}>
                  <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-creative-blue" />
                  </div>
                  <h3 className="font-medium">Art Contest</h3>
                  <Button 
                    className="text-sm py-1.5 px-4 mt-2 bg-gradient-to-r from-creative-blue to-creative-purple text-white"
                    onClick={handleEnterCompetitions}
                  >
                    Join Free
                  </Button>
                </div>
                <div className="flex flex-col items-center creative-card p-4 bg-gradient-to-br from-black/60 to-creative-pink/20 border-creative-pink/30 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-creative-pink" />
                  </div>
                  <h3 className="font-medium">Poetry Contest</h3>
                  <Button 
                    className="text-sm py-1.5 px-4 mt-2 bg-gradient-to-r from-creative-pink to-creative-purple text-white"
                    onClick={handleEnterCompetitions}
                  >
                    Join Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
