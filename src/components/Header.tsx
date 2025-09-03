import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Instagram,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBranding } from "@/lib/branding";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Prizes", href: "#prizes" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
          { name: "Artist ID Card", href: "/sikkimcreativestar" },
];

interface HeaderProps {
  onRegistrationClick?: () => void;
}

export function Header({ onRegistrationClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { brandName } = useBranding();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (isMobile) {
        // Mobile: Start appearing after 100px scroll, fully visible at 200px
        const startScroll = 100;
        const endScroll = 200;
        const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
        setScrollProgress(progress);
        setIsScrolled(scrollY > startScroll);
      } else {
        // Desktop: Original behavior
        if (scrollY > 50) {
          setIsScrolled(true);
          setScrollProgress(1);
        } else {
          setIsScrolled(false);
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const handleEnterNowClick = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      window.location.href = "#register";
    }
  };

  // Calculate opacity and background for mobile
  const mobileOpacity = isMobile ? scrollProgress : 1;
  const mobileBackgroundOpacity = isMobile ? scrollProgress * 0.8 : isScrolled ? 0.8 : 0;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        !isMobile && isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2"
          : !isMobile 
          ? "bg-transparent py-3"
          : "py-2"
      )}
      style={{ 
        willChange: "transform, background, opacity",
        backfaceVisibility: "hidden",
        ...(isMobile && {
          backgroundColor: `rgba(0, 0, 0, ${mobileBackgroundOpacity})`,
          backdropFilter: scrollProgress > 0.3 ? 'blur(8px)' : 'none',
          opacity: mobileOpacity,
          transform: `translateY(${(1 - scrollProgress) * -10}px)`,
        })
      }}
    >
      <div 
        className="container flex items-center justify-between gap-2 sm:gap-4"
        style={{
          ...(isMobile && {
            opacity: mobileOpacity,
          })
        }}
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">{brandName}</span>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
              <img src="/company-logo.jpeg" alt="SCS Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-playfair font-bold text-gradient text-base sm:text-xl">
                {isMobile ? brandName.split(" ").map(w => w[0]).join("") : brandName}
              </span>
            </div>
          </a>
        </div>

        <div className="flex justify-center flex-1 overflow-x-auto py-2 sm:py-0 gap-3 sm:gap-6 px-2 text-center no-scrollbar">
          {navigation.map((item) => (
            item.href.startsWith('/') ? (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="text-xs sm:text-sm font-medium text-white whitespace-nowrap hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-xs sm:text-sm font-medium text-white whitespace-nowrap hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        <div className="flex gap-3 sm:gap-4">
          <a
            href="https://www.instagram.com/daamievent"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition"
          >
            <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <Button
            className="creative-btn group text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4 h-auto"
            onClick={handleEnterNowClick}
          >
            Enter Now <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </header>
  );
}
