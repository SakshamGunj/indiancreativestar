
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
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
    <div className="sticky-cta-banner bg-gradient-to-r from-white to-indigo-50 border-t border-indigo-100/60">
      <div className="flex-1 text-sm font-medium flex items-center">
        <AlertCircle className="text-creative-pink h-4 w-4 mr-1.5 animate-pulse" />
        <span className="text-creative-purple">Limited Spots!</span>
        <span className="ml-1.5 text-creative-purple/80 hidden sm:inline-block">Early bird ends soon</span>
      </div>
      <Button 
        className="creative-btn group whitespace-nowrap"
        onClick={handleEnterCompetitions}
      >
        Enter Now <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
