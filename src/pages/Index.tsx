import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { ArrowRight, CheckCircle } from "lucide-react";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";

interface IndexProps {
  onRegistrationClick?: () => void;
}

const Index = ({ onRegistrationClick }: IndexProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedContestType, setSelectedContestType] = useState<"art" | "poetry">("art");

  useEffect(() => {
    // Show confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = (contestType?: "art" | "poetry") => {
    if (contestType) {
      setSelectedContestType(contestType);
    }
    
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      setShowRegistrationModal(true);
    }
  };

  return (
    <>
      <Header onRegistrationClick={() => handleRegisterClick()} />
      
      {showConfetti && <Confetti />}
      <FloatingNotification />
      <StickyCTABanner onRegisterClick={() => handleRegisterClick()} />
      
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection onRegisterClick={() => handleRegisterClick()} />
      
      {/* About Section with ID for scroll detection */}
      <section id="about-section" className="will-change-transform">
        <AboutSection />
      </section>
      
      {/* Early Bird Banner - repositioned after About section */}
      <div className="container py-6 sm:py-8">
        <EarlyBirdBanner onRegisterClick={() => handleRegisterClick()} />
      </div>
      
      {/* Prize Section - moved right after Early Bird Banner */}
      <PrizeSection />
      
      {/* How It Works Process */}
      <HowItWorksSection />
      
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
            <Badge variant="outline" className="mb-2 animate-pulse">🚀 Limited Time Offer</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6">Your Art Deserves The Spotlight</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
              Don't wait any longer. Join India's biggest art and poetry community today
              and take the first step toward becoming India's next Creative Star.
            </p>
            
            <div className="creative-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 bg-gradient-to-br from-black/80 to-creative-purple/10 border-creative-purple/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Choose Your Competition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="creative-card p-4 sm:p-6 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 hover:border-creative-blue/40 transition-all duration-300 group">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-creative-blue/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-creative-blue">🖌️</div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Art Contest</h4>
                  <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                    Submit your drawings, paintings, digital art, or any visual medium.
                  </p>
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <Badge className="bg-gradient-to-r from-creative-blue to-creative-purple text-white">Only ₹99</Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-creative-blue to-creative-purple text-white group font-bold py-1.5 sm:py-2 h-auto"
                    onClick={() => handleRegisterClick("art")}
                  >
                    Enter Art Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                
                <div className="creative-card p-4 sm:p-6 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 hover:border-creative-pink/40 transition-all duration-300 group">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-creative-pink/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-creative-pink">✍️</div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Poetry Contest</h4>
                  <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                    Submit your poems, verses, sonnets, or any written expression.
                  </p>
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <Badge className="bg-gradient-to-r from-creative-pink to-creative-purple text-white">Only ₹99</Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-creative-pink to-creative-purple text-white group font-bold py-1.5 sm:py-2 h-auto"
                    onClick={() => handleRegisterClick("poetry")}
                  >
                    Enter Poetry Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>100% safe. No spam. No hidden fees.</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer onRegisterClick={() => handleRegisterClick()} />
      
      {/* Registration Modal */}
      {!onRegistrationClick && (
        <RegistrationFlowModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          preselectedContest={selectedContestType}
        />
      )}
    </>
  );
};

export default Index;
