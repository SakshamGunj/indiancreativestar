
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
      // Get the About section position
      const aboutSection = document.getElementById('about-section');
      
      if (aboutSection) {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        // Show the banner after scrolling to the About section
        if (aboutSectionTop <= 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback to previous behavior if section not found
        if (window.scrollY > 600) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
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
        "fixed z-40 bottom-0 left-0 right-0 transition-all duration-300 pb-safe will-change-transform",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container py-2 px-3 sm:px-4">
        <div className="bg-gradient-to-r from-creative-purple to-creative-blue p-2 sm:p-3 rounded-t-lg shadow-xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold">Join India Creative Star - Season 1</h3>
            <p className="text-[10px] sm:text-xs text-white/70 hidden sm:block">Only ₹99 Registration</p>
          </div>
          <Button
            size={isMobile ? "sm" : "default"}
            className="creative-btn group whitespace-nowrap bg-white text-black py-1 px-2 h-auto min-h-8"
            onClick={handleClick}
          >
            Register Now <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
