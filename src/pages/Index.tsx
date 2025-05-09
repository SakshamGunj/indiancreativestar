
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RegistrationModal } from "@/components/RegistrationModal";
import { FloatingNotification } from "@/components/FloatingNotification";
import { GallerySection } from "@/components/GallerySection";
import { PrizeSection } from "@/components/PrizeSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FAQSection } from "@/components/FAQSection";
import { MagazineSection } from "@/components/MagazineSection";
import { Confetti } from "@/components/Confetti";
import { Header } from "@/components/Header";
import { StatsSection } from "@/components/StatsSection";
import { EarlyBirdBanner } from "@/components/EarlyBirdBanner";
import { StickyCTABanner } from "@/components/StickyCTABanner";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { CertificateSection } from "@/components/CertificateSection";
import { EnhancedHeroSection } from "@/components/EnhancedHeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { AboutVideoSection } from "@/components/AboutVideoSection";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterCompetitions = () => {
    navigate("/competitions");
  };

  return (
    <>
      <Header />
      
      {showConfetti && <Confetti />}
      <FloatingNotification />
      <StickyCTABanner />
      
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* About Video Section with YouTube Video */}
      <AboutVideoSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Early Bird Banner - repositioned after About section */}
      <div className="container py-8">
        <EarlyBirdBanner />
      </div>
      
      {/* How It Works Process */}
      <HowItWorksSection />
      
      {/* Prize Section */}
      <PrizeSection />
      
      {/* Certificate Section */}
      <CertificateSection />
      
      {/* Social Proof Section */}
      <SocialProofSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Magazine Section */}
      <MagazineSection />
      
      {/* Call To Action */}
      <section className="section-padding bg-gradient-to-r from-creative-purple/30 to-creative-pink/30" id="register">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-2 animate-pulse">🚀 Limited Free Registration</Badge>
            <h2 className="text-5xl font-bold text-gradient mb-6">Your Art Deserves The Spotlight</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't wait any longer. Join India's biggest art and poetry community today
              and take the first step toward becoming India's next Creative Star.
            </p>
            
            <div className="creative-card p-8 mb-8 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20">
              <h3 className="text-2xl font-bold mb-4">Choose Your Competition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 hover:border-creative-blue/40 transition-all duration-300 group">
                  <div className="h-12 w-12 rounded-full bg-creative-blue/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="h-6 w-6 text-creative-blue">🖌️</div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Art Contest</h4>
                  <p className="text-muted-foreground mb-4">
                    Submit your drawings, paintings, digital art, or any visual medium.
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <Badge className="bg-gradient-to-r from-creative-blue to-creative-purple text-white">FREE Registration</Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-creative-blue to-creative-purple text-white group font-bold"
                    onClick={() => navigate("/competitions")}
                  >
                    Enter Art Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                
                <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 hover:border-creative-pink/40 transition-all duration-300 group">
                  <div className="h-12 w-12 rounded-full bg-creative-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="h-6 w-6 text-creative-pink">✍️</div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Poetry Contest</h4>
                  <p className="text-muted-foreground mb-4">
                    Submit your poems, verses, sonnets, or any written expression.
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <Badge className="bg-gradient-to-r from-creative-pink to-creative-purple text-white">FREE Registration</Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-creative-pink to-creative-purple text-white group font-bold"
                    onClick={() => navigate("/competitions")}
                  >
                    Enter Poetry Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% safe. No spam. No hidden fees.</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Index;
