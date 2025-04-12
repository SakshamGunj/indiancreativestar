
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

export function EarlyBirdBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [placesLeft, setPlacesLeft] = useState(23);

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
    <Card className="fixed bottom-4 right-4 z-40 w-full max-w-md creative-card p-4 animate-bounce-in">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-creative-yellow" />
          <Badge className="bg-creative-yellow text-black">Limited Offer</Badge>
        </div>
        <button 
          onClick={handleClose}
          className="text-muted-foreground hover:text-white"
        >
          &times;
        </button>
      </div>
      <h3 className="text-lg font-bold mt-2">Early Bird Discount Ending Soon!</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Only <span className="text-creative-yellow font-bold">{placesLeft}</span> spots left at ₹199 (reg. ₹299)
      </p>
      <div className="flex items-center gap-2 mt-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Offer expires in 24 hours</p>
      </div>
    </Card>
  );
}
