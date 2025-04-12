
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export function MagazineSection() {
  return (
    <section className="section-padding relative overflow-hidden" id="magazine">
      <div className="absolute inset-0 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 opacity-50 z-0"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-2">Premium Publication</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Get Published in Our Exclusive Anthology
            </h2>
            <p className="text-xl mb-6 text-muted-foreground">
              Top entries will be featured in our exclusive India's Creative Star Magazine and eBook Anthology
              that reaches thousands of art enthusiasts across the country.
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
                <div className="h-6 w-6 rounded-full bg-creative-purple/20 flex items-center justify-center mt-1">
                  <BookOpen className="h-3 w-3 text-creative-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Digital Distribution</h3>
                  <p className="text-muted-foreground">Available on multiple platforms for maximum exposure</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-creative-purple/20 flex items-center justify-center mt-1">
                  <BookOpen className="h-3 w-3 text-creative-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Author Profile</h3>
                  <p className="text-muted-foreground">Includes your bio and contact information for opportunities</p>
                </div>
              </li>
            </ul>
            <Button className="creative-btn">
              View Past Editions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-2xl rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-creative-pink/20 to-creative-blue/20 rounded-2xl -rotate-3 scale-95"></div>
            
            <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-white/10 rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Magazine Cover" 
                className="w-full h-auto rounded-lg shadow-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-2">India's Creative Star Anthology</h3>
              <p className="text-muted-foreground mb-4">
                Volume 3: Colors of Emotion
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Featuring 100+ artists and poets from across India
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
