
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function EarlyBirdBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [placesLeft, setPlacesLeft] = useState(23);
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

  if (!isVisible) return null;

  return (
    <Card className={`fixed bottom-4 ${isMobile ? 'left-4 right-4' : 'right-4'} z-40 w-full ${isMobile ? 'max-w-full' : 'max-w-md'} creative-card p-3 sm:p-4 animate-bounce-in`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-creative-yellow" />
          <Badge className="bg-creative-yellow text-black text-xs sm:text-sm px-2 py-0.5">Limited Offer</Badge>
        </div>
        <button 
          onClick={handleClose}
          className="text-muted-foreground hover:text-white h-6 w-6 flex items-center justify-center touch-target"
        >
          &times;
        </button>
      </div>
      <h3 className="text-base sm:text-lg font-bold mt-2">Early Bird Discount Ending Soon!</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Only <span className="text-creative-yellow font-bold">{placesLeft}</span> spots left at ₹199 (reg. ₹299)
      </p>
      <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Offer expires in 24 hours</p>
      </div>
    </Card>
  );
}
