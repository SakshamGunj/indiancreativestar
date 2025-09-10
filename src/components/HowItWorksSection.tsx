import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HowItWorksSectionProps {
  onRegistrationClick?: () => void;
}

export function HowItWorksSection({ onRegistrationClick }: HowItWorksSectionProps) {
  const navigate = useNavigate();
  
  const handleEnterCompetitions = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      navigate("/competitions");
    }
  };
  
  return (
    <section className="section-padding bg-gradient-to-b from-black to-background/95">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1">
              🛤️ How It Works
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-4">Simple Step-by-Step Journey</h2>
          <p className="text-muted-foreground text-xl">
            From registration to winning - your path to statewide recognition
          </p>
        </div>
        
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-purple to-creative-pink flex items-center justify-center text-white font-bold">1</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Register & Join</span>
              </h3>
              <p className="text-white/70 mb-4">
                Complete the simple registration form, and you'll be added to our WhatsApp group for all competition updates and guidance.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-purple" />
                  <span className="text-sm text-white/80">Simple one-time payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-purple" />
                  <span className="text-sm text-white/80">Direct support via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-blue to-creative-purple flex items-center justify-center text-white font-bold">2</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Submit Your Artwork</span>
              </h3>
              <p className="text-white/70 mb-4">
                You'll receive a portal link where you can easily upload photos of your artwork and provide details about your creative process.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm text-white/80">User-friendly submission system</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm text-white/80">Submit any art medium or style</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-yellow/10 border-creative-yellow/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-yellow to-creative-orange flex items-center justify-center text-white font-bold">3</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Judging & Voting</span>
              </h3>
              <p className="text-white/70 mb-4">
                Expert judges will evaluate all entries while live public voting takes place. This dual process ensures the most deserving artists rise to the top.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-yellow" />
                  <span className="text-sm text-white/80">Professional jury assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-yellow" />
                  <span className="text-sm text-white/80">Public voting opportunity</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-pink to-creative-purple flex items-center justify-center text-white font-bold">4</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Winners Announced</span>
              </h3>
              <p className="text-white/70 mb-4">
                Winners will be announced and awarded from our ₹50,000 prize pool across adult and kids categories, with additional recognition through our digital platforms.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink" />
                  <span className="text-sm text-white/80">Cash prizes for top 3 artists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink" />
                  <span className="text-sm text-white/80">Statewide recognition & exposure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 creative-card p-6 bg-gradient-to-r from-black/80 via-creative-purple/20 to-black/80 text-center border-creative-purple/20">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold px-3 py-1">
              🎯 Bonus
            </Badge>
          </div>
          <h3 className="text-2xl font-bold mb-4">Even if you don't win — your work will be seen.</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            You'll be featured on our Wall of Artists and be part of a real creator community.
            Your art. Created in silence — now it's time to shine.
          </p>
          <Button 
            className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold group py-3 px-8"
            onClick={onRegistrationClick || (() => navigate("/competitions"))}
          >
            Submit Now – Free! <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-purple" />
            </div>
            <div>
              <h4 className="font-medium">Affordable Entry</h4>
              <p className="text-xs text-white/60">Free to join</p>
            </div>
          </div>
          
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-blue" />
            </div>
            <div>
              <h4 className="font-medium">Statewide Visibility</h4>
              <p className="text-xs text-white/60">Share your art across Sikkim</p>
            </div>
          </div>
          
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-pink" />
            </div>
            <div>
              <h4 className="font-medium">₹50,000 Prize Pool</h4>
              <p className="text-xs text-white/60">Cash prizes across age categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
