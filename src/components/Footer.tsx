import { Button } from "@/components/ui/button";
import { Instagram, ArrowRight, Mail, MapPin, PhoneCall } from "lucide-react";

interface FooterProps {
  onRegisterClick?: () => void;
}

export function Footer({ onRegisterClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src="/public/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png" alt="Daami Presents Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-playfair font-bold text-gray-800 text-xl">Indian Creative Star</span>
            </div>
            <p className="text-gray-600 mb-4">
              Celebrating India's emerging art talent through national competitions and recognition.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/daamievent" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-purple-100 transition-colors"
              >
                <Instagram className="h-4 w-4 text-gray-600" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-purple-500 transition-colors">About ICS</a></li>
              <li><a href="#prizes" className="text-gray-600 hover:text-purple-500 transition-colors">Prizes</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-purple-500 transition-colors">Testimonials</a></li>
              <li><a href="#gallery" className="text-gray-600 hover:text-purple-500 transition-colors">Gallery</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-purple-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-500 mt-0.5" />
                <span className="text-gray-600">daamievent@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneCall className="h-5 w-5 text-purple-500 mt-0.5" />
                <span className="text-gray-600">+91 9800452188</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-500 mt-0.5" />
                <span className="text-gray-600">Sikkim, India</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Register Now</h3>
            <p className="text-gray-600 mb-4">
              Take the first step towards becoming India's next Creative Star.
            </p>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-transform shadow-xl group w-full"
              onClick={onRegisterClick}
            >
              Enter Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Indian Creative Star. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
