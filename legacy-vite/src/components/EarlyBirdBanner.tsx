import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Award, ArrowRight, Flag, Gift } from "lucide-react";
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
      <Card className="w-full bg-gradient-to-r from-creative-yellow/30 via-creative-purple/30 to-creative-blue/30 border border-white/20 shadow-lg shadow-creative-purple/20 p-3 sm:p-5 animate-fade-in mx-auto relative overflow-hidden">
        {/* Celebration elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 rotate-12 opacity-30 bg-creative-yellow rounded-full blur-xl" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 -rotate-12 opacity-30 bg-creative-blue rounded-full blur-xl" />
        
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge className="bg-creative-yellow text-black px-3 py-1 animate-pulse">
              <Flag className="h-3 w-3 mr-1" /> 50 Years Celebration
            </Badge>
          </div>
          
          <h3 className="text-sm sm:text-xl font-bold text-center text-white">
            Celebrating Sikkim's 50 Years of Statehood!
          </h3>
          
          <p className="text-xs sm:text-sm text-white/90 mt-1.5 text-center">
            <span className="text-creative-yellow font-bold">Registration is open</span> as our gift to the people of Sikkim
          </p>
          
          <div className="flex items-center justify-between mt-3 sm:mt-4 flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-creative-yellow animate-bounce" />
              <p className="text-xs sm:text-sm text-white/80">Limited time celebration offer</p>
            </div>
            <Button 
              className="creative-btn group whitespace-nowrap bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold text-xs sm:text-sm py-1.5 px-3 h-auto min-h-7 w-full sm:w-auto"
              onClick={handleRegister}
            >
              Register <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
      
      {!onRegisterClick && (
        <RegistrationFlowModal 
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          contestType="art"
        />
      )}
    </>
  );
}
