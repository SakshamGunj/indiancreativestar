
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Prizes", href: "#prizes" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">India Creative Star</span>
            <div className="h-10 w-10 rounded-full bg-gradient-creative flex items-center justify-center">
              <span className="font-bold text-white">ICS</span>
            </div>
            <div>
              <span className="font-playfair font-bold text-gradient text-xl">
                India Creative Star
              </span>
            </div>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <Button
            href="#register"
            className="creative-btn ml-4"
          >
            Enter Now
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-background/90 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-creative flex items-center justify-center">
                <span className="font-bold text-white">ICS</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-gradient text-xl">
                  India Creative Star
                </span>
              </div>
            </a>
          </div>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="container mt-6 flow-root">
          <div className="-my-6 divide-y divide-white/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <Button
                className="w-full creative-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "#register";
                }}
              >
                Enter Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
