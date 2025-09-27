import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Star, Palette, Users } from "lucide-react";

interface HeaderV2Props {
  onRegistrationClick?: () => void;
  variant?: "dark" | "light" | "gradient";
  showJoinButton?: boolean;
  basePath?: string;
}

export function HeaderV2({ onRegistrationClick, variant = "dark", showJoinButton = true, basePath = "" }: HeaderV2Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Optimized scroll handler with throttling for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
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

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Close on Escape and lock body scroll while open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Header background (remove backdrop blur while menu is open)
  const baseHeaderBg = isScrolled
    ? variant === "gradient"
      ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white"
      : variant === "light"
      ? "bg-white/95 border-gray-200 text-gray-900"
      : "bg-black/30 border-white/10 text-white"
    : "bg-transparent border-transparent text-white";

  const headerExtra = variant === "dark" && !isMobileMenuOpen ? " bg-black/50" : "";

  const navLink = variant === "light"
    ? "text-gray-900 hover:text-gray-700"
    : "text-white/90 hover:text-white";

  const menuButton = variant === "light"
    ? "md:hidden p-1.5 rounded-lg bg-gray-100 border border-gray-200"
    : "md:hidden p-1.5 rounded-lg bg-white/30 border border-white/30";

  const ctaClass = variant === "light"
    ? "bg-gray-900 hover:bg-black text-white"
    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white";

  const href = (hash: string) => `${basePath}${hash}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${baseHeaderBg}${headerExtra}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img 
                src="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg?auto=format&q=80"
                alt="Daami Presents Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href={href("#about")} className={`${navLink} font-medium transition-colors text-sm`}>
              About
            </a>
            <a href={href("#prizes")} className={`${navLink} font-medium transition-colors text-sm`}>
              Prizes
            </a>
            <a href={href("#gallery")} className={`${navLink} font-medium transition-colors text-sm`}>
              Gallery
            </a>
            <a href={href("#faq")} className={`${navLink} font-medium transition-colors text-sm`}>
              FAQ
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {showJoinButton && onRegistrationClick && (
              <Button 
                onClick={onRegistrationClick}
                className={`${ctaClass} font-semibold rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm`}
              >
                <Palette className="h-3 w-3 mr-1" />
                Join Now
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={menuButton}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${variant === "light" ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${variant === "light" ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (top, compact, black translucent) */}
      {isMobileMenuOpen && (
        <>
          {/* Transparent full-screen overlay to capture outside clicks */}
          <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setIsMobileMenuOpen(false)} />

          <div className="md:hidden fixed inset-x-0 top-20 z-40 px-3">
            <div className="mx-auto w-full max-w-[420px] rounded-2xl bg-black/80 border border-white/30 shadow-2xl max-h-[65vh] overflow-y-auto animate-in slide-in-from-top duration-300" onClick={(e) => e.stopPropagation()}>
              <nav className="flex flex-col divide-y divide-white/15">
                <a href={href("#about")} onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-sm font-medium text-white hover:bg-white/10">About</a>
                <a href={href("#prizes")} onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-sm font-medium text-white hover:bg-white/10">Prizes</a>
                <a href={href("#gallery")} onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-sm font-medium text-white hover:bg-white/10">Gallery</a>
                <a href={href("#faq")} onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-sm font-medium text-white hover:bg-white/10">FAQ</a>
              </nav>
              {showJoinButton && onRegistrationClick && (
                <div className="p-4 border-t border-white/15">
                  <Button 
                    onClick={() => { setIsMobileMenuOpen(false); onRegistrationClick(); }}
                    className={`w-full ${ctaClass} font-semibold rounded-xl py-2.5 shadow-lg text-sm`}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Join Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

