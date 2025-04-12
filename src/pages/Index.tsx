
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
import { CountdownTimer } from "@/components/CountdownTimer";
import { Confetti } from "@/components/Confetti";
import { Header } from "@/components/Header";
import { StatsSection } from "@/components/StatsSection";
import { EarlyBirdBanner } from "@/components/EarlyBirdBanner";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { CertificateSection } from "@/components/CertificateSection";
import { useNavigate } from "react-router-dom";
import { 
  ArrowDown, 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Palette, 
  PenLine, 
  TrendingUp, 
  Users,
  Star,
  Clock,
  ArrowRight
} from "lucide-react";

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
      <EarlyBirdBanner />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background/90 to-background z-10" />
          <img 
            src="/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png" 
            alt="Creative Star Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <Badge className="hero-badge">
                  <Star className="h-4 w-4 text-creative-yellow" />
                  <span>India's Biggest Online Contest</span>
                </Badge>
                <Badge className="hero-badge">
                  <Clock className="h-4 w-4 text-creative-yellow" />
                  <span>Limited Time Entry</span>
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                India's Creative Star
                <span className="block text-gradient">Art & Poetry Challenge</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Where India's imagination comes to shine. Submit your art or poetry and win up to ₹50,000 plus national recognition.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button 
                  className="creative-btn group"
                  onClick={handleEnterCompetitions}
                >
                  Enter Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button variant="outline" className="creative-btn-secondary">
                  Learn More <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Theme: Colors of Emotions</span>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Early Bird: ₹199 only</span>
              </div>
            </div>
            
            <div className="lg:pl-10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Contest Ends In:</h2>
                  <Badge variant="outline" className="font-mono">30 April 2025</Badge>
                </div>
                
                <CountdownTimer />
                
                <div className="mt-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center creative-card p-4 animate-float" style={{ animationDelay: "0s" }}>
                      <Palette className="h-6 w-6 text-creative-blue mb-2" />
                      <h3 className="font-medium">Art Contest</h3>
                      <Button 
                        className="text-sm py-1.5 px-4 mt-2 creative-btn"
                        onClick={() => navigate("/competitions")}
                      >
                        Join Now
                      </Button>
                    </div>
                    <div className="flex flex-col items-center creative-card p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                      <PenLine className="h-6 w-6 text-creative-pink mb-2" />
                      <h3 className="font-medium">Poetry Contest</h3>
                      <Button 
                        className="text-sm py-1.5 px-4 mt-2 creative-btn"
                        onClick={() => navigate("/competitions")}
                      >
                        Join Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="creative-card p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-creative-yellow/20 flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5 text-creative-yellow" />
                    </div>
                    <div>
                      <h3 className="font-medium">Win up to ₹50,000</h3>
                      <p className="text-sm text-muted-foreground">Plus get featured across India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
      
      {/* Who Can Participate */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-2">For Everyone</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-4">Who Can Participate?</h2>
            <p className="text-muted-foreground text-xl">
              We welcome all creative minds. No previous experience required!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-creative-purple/20 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-creative-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">School & College Students</h3>
              <p className="text-muted-foreground">
                Showcase your talent while building your portfolio for future opportunities.
              </p>
            </div>
            
            <div className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-creative-blue/20 flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-creative-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Working Professionals</h3>
              <p className="text-muted-foreground">
                With creative hobbies looking to share their passion beyond their 9-to-5.
              </p>
            </div>
            
            <div className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-creative-pink/20 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-creative-pink" />
              </div>
              <h3 className="text-xl font-bold mb-3">Parents of Talented Kids</h3>
              <p className="text-muted-foreground">
                Help your children (Age 7+) gain recognition and build confidence through art.
              </p>
            </div>
            
            <div className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-creative-orange/20 flex items-center justify-center mb-6">
                <Palette className="h-8 w-8 text-creative-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Art & Poetry Enthusiasts</h3>
              <p className="text-muted-foreground">
                ANYONE who loves to draw, paint, or write, regardless of experience level.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-fade-in">
            <Button 
              className="creative-btn group"
              onClick={handleEnterCompetitions}
            >
              Join the Community Today <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-2">Simple Process</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-4">How to Join</h2>
            <p className="text-muted-foreground text-xl">
              Four simple steps to become India's next Creative Star
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="creative-card p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-creative-purple flex items-center justify-center text-white font-bold border-2 border-background">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4">Register</h3>
                <p className="text-muted-foreground mb-4">
                  Fill your name and contact details in our simple registration form.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Takes just 2 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No complex forms</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="creative-card p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-creative-blue flex items-center justify-center text-white font-bold border-2 border-background">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4">Upload Your Work</h3>
                <p className="text-muted-foreground mb-4">
                  Submit your artwork as an image or poetry as a PDF document.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Photo or scan for artwork</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Typed PDF for poetry</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="creative-card p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-creative-pink flex items-center justify-center text-white font-bold border-2 border-background">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Pay Entry Fee</h3>
                <p className="text-muted-foreground mb-4">
                  Secure payment through Razorpay with multiple payment options.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>₹299 regular fee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>₹199 early bird (limited)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="creative-card p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-creative-yellow flex items-center justify-center text-white font-bold border-2 border-background">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4">Wait for Results</h3>
                <p className="text-muted-foreground mb-4">
                  Our judges will review all entries and announce winners within 4 weeks.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Fair evaluation process</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Results via email & WhatsApp</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 creative-card p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-creative-yellow" />
              <h3 className="text-xl font-bold">Theme of the Month: Colors of Emotions</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Express emotions through colors in your artwork or poetry. How do different emotions look or feel to you? 
              Use this theme as inspiration for your submission.
            </p>
            <Button 
              className="creative-btn group"
              onClick={handleEnterCompetitions}
            >
              Start Creating Today <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Prize Section */}
      <PrizeSection />
      
      {/* Certificate Section */}
      <CertificateSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Magazine Section */}
      <MagazineSection />
      
      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Psychology Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-2">Contest Psychology</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-4">Why This Contest Works</h2>
            <p className="text-muted-foreground text-xl">
              We've designed this contest based on core psychological principles that make participation rewarding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="creative-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-creative-purple" />
                </div>
                <h3 className="text-xl font-bold">Status Desire</h3>
              </div>
              <p className="text-muted-foreground">
                People naturally want to be seen as talented and creative. Our contest provides validation and recognition from experts.
              </p>
            </div>
            
            <div className="creative-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-creative-blue" />
                </div>
                <h3 className="text-xl font-bold">FOMO</h3>
              </div>
              <p className="text-muted-foreground">
                With monthly themes and limited spots, the fear of missing out drives timely participation and quick decision-making.
              </p>
            </div>
            
            <div className="creative-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-creative-pink" />
                </div>
                <h3 className="text-xl font-bold">Multi-Tiered Rewards</h3>
              </div>
              <p className="text-muted-foreground">
                Everyone gets something - from certificates to publication opportunities - creating a positive experience regardless of winning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="section-padding bg-gradient-to-r from-creative-purple/30 to-creative-pink/30" id="register">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-2 animate-pulse">Limited Time Offer</Badge>
            <h2 className="text-5xl font-bold text-gradient mb-6">You've Waited Long Enough</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Your art deserves the spotlight. Your words deserve to be heard.
              Submit your creation today and take the first step toward becoming India's next Creative Star.
            </p>
            
            <div className="creative-card p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Choose Your Contest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="creative-card p-6 bg-gradient-to-br from-creative-blue/20 to-creative-purple/20 border-white/5 hover:border-white/20 transition-all duration-300 group">
                  <Palette className="h-10 w-10 text-creative-blue mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-bold mb-2">Art Contest</h4>
                  <p className="text-muted-foreground mb-4">
                    Submit your drawings, paintings, digital art, or any visual medium.
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-muted-foreground">Regular: ₹299</span>
                    <Badge className="bg-creative-yellow text-black">Early Bird: ₹199</Badge>
                  </div>
                  <Button 
                    className="w-full creative-btn group"
                    onClick={() => navigate("/competitions")}
                  >
                    Enter Art Contest <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                
                <div className="creative-card p-6 bg-gradient-to-br from-creative-pink/20 to-creative-orange/20 border-white/5 hover:border-white/20 transition-all duration-300 group">
                  <PenLine className="h-10 w-10 text-creative-pink mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-bold mb-2">Poetry Contest</h4>
                  <p className="text-muted-foreground mb-4">
                    Submit your poems, verses, sonnets, or any written expression.
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-muted-foreground">Regular: ₹299</span>
                    <Badge className="bg-creative-yellow text-black">Early Bird: ₹199</Badge>
                  </div>
                  <Button 
                    className="w-full creative-btn group"
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
