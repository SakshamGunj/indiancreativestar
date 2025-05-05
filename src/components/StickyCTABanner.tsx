
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <div className="sticky-cta-banner">
      <div className="flex-1 text-sm font-medium">
        <span className="text-creative-purple">Limited Spots!</span> Early bird ends soon
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
