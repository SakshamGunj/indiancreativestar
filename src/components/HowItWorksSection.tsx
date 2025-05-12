
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HowItWorksSection() {
  const navigate = useNavigate();
  
  const handleEnterCompetitions = () => {
    navigate("/competitions");
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
            From registration to winning - your path to nationwide recognition
          </p>
        </div>
        
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-purple to-creative-pink flex items-center justify-center text-white font-bold">1</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Registration (₹99)</span>
              </h3>
              <p className="text-white/70 mb-4">
                Choose your competition: 🖌️ Art or ✍️ Poetry. Fill the short form to join your exclusive WhatsApp group for updates and support.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-purple" />
                  <span className="text-sm text-white/80">Just ₹99 registration fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-purple" />
                  <span className="text-sm text-white/80">Takes just 2 minutes</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-blue to-creative-purple flex items-center justify-center text-white font-bold">2</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Pay Entry Fee</span>
                <Badge className="ml-2 bg-creative-yellow/20 text-creative-yellow border-creative-yellow/30 text-xs">Only ₹99</Badge>
              </h3>
              <p className="text-white/70 mb-4">
                After joining the WhatsApp group, you'll pay the entry fee of just ₹99 to confirm your participation and unlock all benefits.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm text-white/80">Secure online payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm text-white/80">Simple payment process</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-pink to-creative-purple flex items-center justify-center text-white font-bold">3</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Submit Your Work</span>
              </h3>
              <p className="text-white/70 mb-4">
                Once registered, you'll get a portal link to upload your best creation. This is your moment to shine!
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink" />
                  <span className="text-sm text-white/80">Art as image or photo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink" />
                  <span className="text-sm text-white/80">Poetry as text or PDF</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-yellow/10 border-creative-yellow/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-yellow to-creative-orange flex items-center justify-center text-white font-bold">4</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Jury Review</span>
              </h3>
              <p className="text-white/70 mb-4">
                Our expert panel of judges will review every submission looking for creativity, originality, and emotion to select the top entries.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-yellow" />
                  <span className="text-sm text-white/80">Fair evaluation process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-yellow" />
                  <span className="text-sm text-white/80">Professional jury</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-orange/10 border-creative-orange/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-orange to-creative-red flex items-center justify-center text-white font-bold">5</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Voting & Audience Love</span>
              </h3>
              <p className="text-white/70 mb-4">
                All entries go live on our voting portal with a "Vote for Me" link to share. Top voted entries become People's Choice Finalists!
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-orange" />
                  <span className="text-sm text-white/80">Public recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-orange" />
                  <span className="text-sm text-white/80">Community support</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-red/10 border-creative-red/20 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-creative-red to-creative-pink flex items-center justify-center text-white font-bold">6</div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-gradient">Winner Announcement</span>
              </h3>
              <p className="text-white/70 mb-4">
                We'll announce the final winners (jury + voting) in a grand Instagram Live Show with cash prizes and national recognition.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-red" />
                  <span className="text-sm text-white/80">Cash prizes for winners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-red" />
                  <span className="text-sm text-white/80">Digital trophies & recognition</span>
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
            You'll be featured on our Wall of Artists & Poets and be part of a real creator community.
            Your art. Your poetry. Created in silence — now it's time to shine.
          </p>
          <Button 
            className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold group py-3 px-8"
            onClick={handleEnterCompetitions}
          >
            Register Now – Only ₹99! <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-purple" />
            </div>
            <div>
              <h4 className="font-medium">Just ₹99 Entry</h4>
              <p className="text-xs text-white/60">Affordable for everyone</p>
            </div>
          </div>
          
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-blue" />
            </div>
            <div>
              <h4 className="font-medium">National Visibility</h4>
              <p className="text-xs text-white/60">Share your art across India</p>
            </div>
          </div>
          
          <div className="creative-card p-4 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-creative-pink" />
            </div>
            <div>
              <h4 className="font-medium">Digital Certificate</h4>
              <p className="text-xs text-white/60">Recognition for all entrants</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
