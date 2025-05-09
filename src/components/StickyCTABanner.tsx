
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface StickyCTABannerProps {
  onRegisterClick?: () => void;
}

export function StickyCTABanner({ onRegisterClick }: StickyCTABannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show the banner after scrolling 400px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.location.href = "#register";
    }
  };

  return (
    <div
      className={cn(
        "fixed z-40 bottom-0 left-0 right-0 transition-all duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container py-2 px-4">
        <div className="bg-gradient-to-r from-creative-purple to-creative-blue p-2 sm:p-3 rounded-t-lg shadow-xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold">Join India Creative Star - Season 1</h3>
            <p className="text-xs text-white/70 hidden sm:block">Art & Poetry Competition</p>
          </div>
          <Button
            size={isMobile ? "sm" : "default"}
            className="creative-btn group whitespace-nowrap bg-white text-black"
            onClick={handleClick}
          >
            Register Free <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
