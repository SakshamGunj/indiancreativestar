import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LazyImage from "./LazyImage";

interface HeaderV3Props {
  onRegistrationClick: () => void;
}

export const HeaderV3 = ({ onRegistrationClick }: HeaderV3Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <LazyImage
                src="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg?auto=format&q=80"
                alt="Daami Presents Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Indian Creative Star</h1>
              <p className="text-xs text-gray-600">Art Competition</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('prizes')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Prizes
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={onRegistrationClick}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('prizes')}
                className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Prizes
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                FAQ
              </button>
              <Button
                onClick={onRegistrationClick}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};