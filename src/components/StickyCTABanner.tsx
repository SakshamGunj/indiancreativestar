import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBranding } from "@/lib/branding";

interface StickyCTABannerProps {
  onRegisterClick?: () => void;
}

export function StickyCTABanner({ onRegisterClick }: StickyCTABannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { brandName, regionName } = useBranding();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
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
  }, []);

  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  const handleClick = useCallback(() => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.location.href = "#register";
    }
  }, [onRegisterClick]);

  return (
    <div
      className={cn(
        "fixed z-40 bottom-0 left-0 right-0 transition-all duration-300 pb-safe bg-black/80",
        isVisible ? "translate-y-0" : "translate-y-full opacity-0"
      )}
      style={{
        willChange: "transform, opacity",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        backfaceVisibility: "hidden"
      }}
    >
      <div className="container py-2 px-3 sm:px-4">
        <div className="bg-gradient-to-r from-creative-purple to-creative-blue p-2 sm:p-3 rounded-t-lg shadow-xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold">Join {brandName} - Season 1</h3>

          </div>
          <Button
            size={isMobile ? "sm" : "default"}
            className="group whitespace-nowrap bg-creative-yellow text-black hover:bg-creative-yellow/90 font-semibold py-1 px-2 h-auto min-h-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ease-in-out"
            onClick={handleClick}
          >
            Register <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
