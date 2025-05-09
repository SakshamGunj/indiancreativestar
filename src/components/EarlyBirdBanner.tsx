
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Award, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { RegistrationFlowModal } from "./RegistrationFlowModal";

interface EarlyBirdBannerProps {
  onRegisterClick?: () => void;
}

export function EarlyBirdBanner({ onRegisterClick }: EarlyBirdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [placesLeft, setPlacesLeft] = useState(23);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate decreasing spots randomly
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && placesLeft > 1) {
        setPlacesLeft(prev => prev - 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [placesLeft]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      setShowRegistrationModal(true);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <Card className="w-full bg-gradient-to-br from-black/90 to-creative-purple/30 border border-creative-purple/30 shadow-lg shadow-creative-purple/20 p-2.5 sm:p-4 animate-fade-in mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1 sm:gap-2">
            <Star className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-creative-yellow" />
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5 font-bold">FREE Registration!</Badge>
          </div>
          <button 
            onClick={handleClose}
            className="text-white/60 hover:text-white h-8 w-8 flex items-center justify-center touch-target"
            aria-label="Close banner"
          >
            &times;
          </button>
        </div>
        <h3 className="text-sm sm:text-lg font-bold mt-1.5 sm:mt-2 text-white">ICS Season 1 - Limited Time Offer!</h3>
        <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">
          Only <span className="text-creative-yellow font-bold">{placesLeft}</span> free spots left. Register now!
        </p>
        <div className="flex items-center justify-between mt-1.5 sm:mt-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <p className="text-[10px] sm:text-xs text-white/60">Offer ends soon</p>
          </div>
          <Button 
            className="creative-btn group whitespace-nowrap bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold text-xs py-1 px-2 h-auto min-h-7"
            onClick={handleRegister}
          >
            Register Free <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
      
      {!onRegisterClick && (
        <RegistrationFlowModal 
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          preselectedContest="art"
        />
      )}
    </>
  );
}
