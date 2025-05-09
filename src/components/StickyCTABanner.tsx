
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function StickyCTABanner() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Only show on mobile devices
  if (!isMobile) return null;
  
  const handleEnterCompetitions = () => {
    navigate("/competitions");
  };

  return (
    <div className="sticky-cta-banner bg-gradient-to-r from-black/90 via-creative-purple/50 to-black/90">
      <div className="flex-1 text-sm font-medium flex items-center">
        <div className="relative">
          <Star className="text-creative-yellow h-4 w-4 mr-1.5 absolute animate-pulse" />
          <Award className="text-creative-pink h-4 w-4 mr-1.5" />
        </div>
        <span className="text-white">Registration is FREE!</span>
        <span className="ml-1.5 text-white/80 hidden sm:inline-block">Limited spots left</span>
      </div>
      <Button 
        className="creative-btn group whitespace-nowrap bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold"
        onClick={handleEnterCompetitions}
      >
        Enter Now <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
