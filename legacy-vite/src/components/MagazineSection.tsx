import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe, User } from "lucide-react";
import { useBranding } from "@/lib/branding";

export function MagazineSection() {
  const { brandName, regionName } = useBranding();
  return (
    <section className="section-padding relative overflow-hidden" id="magazine">
      <div className="absolute inset-0 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 opacity-50 z-0"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-2">Premium Publication</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Get Published in Our Hall of Fame
            </h2>
            <p className="text-xl mb-6 text-muted-foreground">
              Top entries will be featured in our exclusive {brandName} Magazine Volume 1, 
              showcasing exceptional artwork to thousands across the country.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-creative-purple/20 flex items-center justify-center mt-1">
                  <BookOpen className="h-3 w-3 text-creative-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Professional Publishing</h3>
                  <p className="text-muted-foreground">Your work professionally edited and beautifully presented</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-1">
                  <Globe className="h-3 w-3 text-creative-yellow" />
                </div>
                <div>
                  <h3 className="font-medium">Digital Distribution</h3>
                  <p className="text-muted-foreground">Available on multiple platforms for maximum exposure</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-creative-blue/20 flex items-center justify-center mt-1">
                  <User className="h-3 w-3 text-creative-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Artist Profile</h3>
                  <p className="text-muted-foreground">Includes your bio and contact information for opportunities</p>
                </div>
              </li>
            </ul>
            <Button className="creative-btn">
              Enter the Competition <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-2xl rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-creative-pink/20 to-creative-blue/20 rounded-2xl -rotate-3 scale-95"></div>
            
            <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-white/10 rotate-2">
              <div className="relative">
                <img 
                  src="/magazine-cover.png" 
                  alt={`${brandName} Magazine`} 
                  className="w-full h-auto rounded-lg shadow-lg mb-6"
                />
                <div className="absolute -top-4 -right-4 bg-creative-yellow text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  Volume 1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{brandName} Magazine</h3>
              <p className="text-muted-foreground mb-4">
                The Hall of Fame for {regionName}'s Best Artists
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Featuring selected artists from across {regionName}
                </p>
                <Badge>Limited Edition</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
