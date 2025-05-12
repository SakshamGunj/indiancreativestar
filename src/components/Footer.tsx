import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ArrowRight, Mail, MapPin, PhoneCall } from "lucide-react";

interface FooterProps {
  onRegisterClick?: () => void;
}

export function Footer({ onRegisterClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/80 border-t border-white/10 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src="/company-logo.jpeg" alt="ICS Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-playfair font-bold text-gradient text-xl">India Creative Star</span>
            </div>
            <p className="text-white/70 mb-4">
              Celebrating India's emerging art and poetry talent through national competitions and recognition.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-creative-purple/40 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-creative-blue/40 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-creative-pink/40 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-creative-purple transition-colors">Home</a></li>
              <li><a href="#about" className="text-white/70 hover:text-creative-purple transition-colors">About ICS</a></li>
              <li><a href="#prizes" className="text-white/70 hover:text-creative-purple transition-colors">Prizes</a></li>
              <li><a href="#testimonials" className="text-white/70 hover:text-creative-purple transition-colors">Testimonials</a></li>
              <li><a href="#gallery" className="text-white/70 hover:text-creative-purple transition-colors">Gallery</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-creative-purple transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-creative-purple mt-0.5" />
                <span className="text-white/70">support@indiacreativestar.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-creative-purple mt-0.5" />
                <span className="text-white/70">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneCall className="h-5 w-5 text-creative-purple mt-0.5" />
                <span className="text-white/70">+91 98765 43210</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Register Now</h3>
            <p className="text-white/70 mb-4">
              Take the first step towards becoming India's next Creative Star.
            </p>
            <Button 
              className="creative-btn group w-full"
              onClick={onRegisterClick}
            >
              Enter Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} India Creative Star. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
