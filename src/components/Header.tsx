import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Instagram,
  Twitter,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Prizes", href: "#prizes" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

interface HeaderProps {
  onRegistrationClick?: () => void;
}

export function Header({ onRegistrationClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEnterNowClick = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      window.location.href = "#register";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-3"
      )}
      style={{ 
        willChange: "transform, background",
        backfaceVisibility: "hidden"
      }}
    >
      <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">Sikkim Creative Star</span>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
              <img src="/company-logo.jpeg" alt="SCS Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-playfair font-bold text-gradient text-base sm:text-xl">
                {isMobile ? "SCS" : "Sikkim Creative Star"}
              </span>
            </div>
          </a>
        </div>

        <div className="flex justify-center flex-1 overflow-x-auto py-2 sm:py-0 gap-3 sm:gap-6 px-2 text-center no-scrollbar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs sm:text-sm font-medium text-white whitespace-nowrap hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex gap-3 sm:gap-4">
          <a
            href="https://www.instagram.com/indiancreativestar/"
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
