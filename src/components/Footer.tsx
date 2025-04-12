
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 py-12 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-creative flex items-center justify-center">
                <span className="font-bold text-white">ICS</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-gradient text-xl">
                  India Creative Star
                </span>
              </div>
            </a>
            <p className="text-muted-foreground mb-4 max-w-md">
              India's premier platform for discovering and showcasing artistic talent. We celebrate creativity through competitions, workshops, and publications.
            </p>
            <div className="flex gap-4">
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
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#prizes" className="text-muted-foreground hover:text-white transition-colors">Prizes</a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@indiacreativestar.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
            <div className="border border-white/10 rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-1">Newsletter</h4>
              <p className="text-muted-foreground text-sm mb-2">Get updates on new contests</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 rounded-md px-3 py-1 text-sm flex-grow"
                />
                <button className="bg-primary hover:bg-primary/80 text-white rounded-md px-3 py-1 text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 India Creative Star. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
