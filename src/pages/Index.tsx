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
import { TestimonialCarouselSection } from "@/components/TestimonialCarouselSection";
import { ImageShowcaseSection } from "@/components/ImageShowcaseSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ArrowRight, CheckCircle, Palette, Users } from "lucide-react";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";

interface IndexProps {
  onRegistrationClick?: () => void;
}

const Index = ({ onRegistrationClick }: IndexProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    // Show confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = () => {    
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
      
      {/* New section for artists and parents */}
      <section className="py-10 bg-gradient-to-b from-black/95 to-background/95">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-blue/10 border-creative-blue/20 hover:border-creative-blue/40 transition-all duration-300">
              <div className="mb-4 h-16 w-16 rounded-full bg-creative-blue/20 flex items-center justify-center">
                <Palette className="h-8 w-8 text-creative-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Artists</h3>
              <p className="text-white/80 mb-4">
                Looking to showcase your artistic talent on a national platform? This competition is your gateway to recognition, exposure, and the opportunity to win from a ₹30,000 prize pool.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue mt-1 shrink-0" />
                  <span className="text-sm">Connect with a community of like-minded artists</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue mt-1 shrink-0" />
                  <span className="text-sm">Get professional feedback on your artwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-blue mt-1 shrink-0" />
                  <span className="text-sm">Add national recognition to your portfolio</span>
                </li>
              </ul>
              <Button 
                className="bg-gradient-to-r from-creative-blue to-creative-purple text-white w-full"
                onClick={() => handleRegisterClick()}
              >
                Register as an Artist <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-pink/10 border-creative-pink/20 hover:border-creative-pink/40 transition-all duration-300">
              <div className="mb-4 h-16 w-16 rounded-full bg-creative-pink/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-creative-pink" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Parents</h3>
              <p className="text-white/80 mb-4">
                Want to nurture your child's creativity and give them a platform to shine? This competition provides valuable exposure and confidence-building experience for young artists.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink mt-1 shrink-0" />
                  <span className="text-sm">Boost your child's confidence in their artistic abilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink mt-1 shrink-0" />
                  <span className="text-sm">Help them earn recognition beyond school achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-creative-pink mt-1 shrink-0" />
                  <span className="text-sm">Give them something special for their education portfolio</span>
                </li>
              </ul>
              <Button 
                className="bg-gradient-to-r from-creative-pink to-creative-purple text-white w-full"
                onClick={() => handleRegisterClick()}
              >
                Register Your Child <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section with ID for scroll detection */}
      <section id="about-section">
        <AboutSection />
      </section>
      
      {/* Early Bird Banner - repositioned after About section */}
      <div className="container py-6 sm:py-8">
        <EarlyBirdBanner onRegisterClick={() => handleRegisterClick()} />
      </div>
      
      {/* Prize Section - moved right after Early Bird Banner */}
      <PrizeSection />
      
      {/* How It Works Process */}
      <HowItWorksSection onRegistrationClick={() => handleRegisterClick()} />
      
      {/* New Testimonial Carousel Section */}
      <TestimonialCarouselSection />

      
      {/* Certificate Section */}
      <CertificateSection onRegistrationClick={() => handleRegisterClick()} />
      
      {/* Social Proof Section */}
      <SocialProofSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Magazine Section */}
      <MagazineSection />
      
      {/* Call To Action */}

      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer onRegisterClick={() => handleRegisterClick()} />
      
      {/* Registration Modal */}
      {!onRegistrationClick && (
        <RegistrationFlowModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
        />
      )}
    </>
  );
};

export default Index;
