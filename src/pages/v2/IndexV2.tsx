import React, { useEffect, useState, lazy, Suspense, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { HeaderV2 } from "@/components/HeaderV2";
import { StickyCTABanner } from "@/components/StickyCTABanner";
import { Footer } from "@/components/Footer";
import { Confetti } from "@/components/Confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import OptimizedHeroSection from "@/components/OptimizedHeroSection";
import OptimizedBenefitsSection from "@/components/OptimizedBenefitsSection";
import OptimizedSuccessSection from "@/components/OptimizedSuccessSection";
import OptimizedMobileBanner from "@/components/OptimizedMobileBanner";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { preloadCriticalImages, preloadImagesOnIdle } from "@/utils/imagePreloader";
import { baseArtworkImages, reviewImages, prizeDistributionImages } from "@/data/artworkImages";

// Lazy load heavy components to reduce initial bundle size
const OptimizedReviewsSection = lazy(() => import("@/components/OptimizedReviewsSection"));
const OptimizedPrizeDistributionSection = lazy(() => import("@/components/OptimizedPrizeDistributionSection"));
const OptimizedArtworkGallery = lazy(() => import("@/components/OptimizedArtworkGallery"));
const OptimizedReviewsCarousel = lazy(() => import("@/components/OptimizedReviewsCarousel"));
const GallerySectionV2 = lazy(() => import("@/components/GallerySectionV2"));
const PrizeSectionV2 = lazy(() => import("@/components/PrizeSectionV2"));
const FAQSectionV2 = lazy(() => import("@/components/FAQSectionV2"));
const WinnersGallery = lazy(() => import("@/components/WinnersGallery"));

// Lazy load non-critical sections for better initial performance
const AboutSectionV2 = lazy(() => import("@/components/AboutSectionV2"));
const HowItWorksSectionV2 = lazy(() => import("@/components/HowItWorksSectionV2"));

interface IndexV2Props {
  onRegistrationClick?: () => void;
}

// Loading fallback component
const SectionLoader = memo(() => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
));

const IndexV2 = memo(({ onRegistrationClick }: IndexV2Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRegistrationDrawer, setShowRegistrationDrawer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    category: 'adult'
  });

  const navigate = useNavigate();

  // Preload critical images immediately and register service worker
  useEffect(() => {
    // Define critical images inline to avoid circular dependency
    const criticalImages = [
      baseArtworkImages[0], // First artwork image
      "https://i.ibb.co/fz9nV0sg/4fe133328b5c.jpg" // Hero background
    ];
    
    preloadCriticalImages(criticalImages);
    
    // Register service worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('SW registration failed:', error);
      });
    }
    
    // Preload other images when browser is idle
    preloadImagesOnIdle([...baseArtworkImages, ...reviewImages, ...prizeDistributionImages], 'low');
  }, []);

  // Optimized confetti trigger - delayed to not impact initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 8000); // Increased delay to not interfere with initial render
    return () => clearTimeout(timer);
  }, []);

  // Optimized body background fix - single effect
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';
    
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  const handleRegisterClick = useCallback(() => {    
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      setShowRegistrationDrawer(true);
    }
  }, [onRegistrationClick]);

  const handleCloseModal = useCallback(() => {
    setShowRegistrationDrawer(false);
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determine category based on age
      let category = "Adult";
      const age = parseInt(formData.age);
      if (age >= 5 && age <= 8) {
        category = "Group A (5-8 years)";
      } else if (age >= 9 && age <= 12) {
        category = "Group B (9-12 years)";
      } else if (age >= 13 && age <= 17) {
        category = "Group C (13-17 years)";
      }

      // Navigate to thank you page with form data
      navigate('/thank-you', { 
        state: { 
          formData: { ...formData, category },
          from: '/indiancreativestar/v2'
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, navigate]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      {/* Performance monitoring in development */}
      <PerformanceMonitor />
      
      {/* Optimized global styles - moved to CSS classes */}
      <div className="gpu-layer">
        
        {/* Header */}
        <HeaderV2 onRegistrationClick={handleRegisterClick} />
        
        {/* Delayed confetti for better performance */}
        {showConfetti && <Confetti />}
        
        {/* Optimized mobile banner */}
        <OptimizedMobileBanner 
          onRegisterClick={handleRegisterClick}
          isModalOpen={showRegistrationDrawer}
        />
        
        <StickyCTABanner onRegisterClick={handleRegisterClick} />
        
        {/* Hero Section - Optimized */}
        <OptimizedHeroSection onRegisterClick={handleRegisterClick} />
        
        {/* Benefits Section */}
        <OptimizedBenefitsSection />
        
        {/* Success Stories */}
        <OptimizedSuccessSection />
        
        {/* Lazy loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <OptimizedArtworkGallery />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <OptimizedReviewsCarousel />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <OptimizedReviewsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <OptimizedPrizeDistributionSection />
        </Suspense>
        
        {/* Standard sections - also lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSectionV2 />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSectionV2 onRegistrationClick={handleRegisterClick} />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <PrizeSectionV2 />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <GallerySectionV2 />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FAQSectionV2 />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <WinnersGallery />
        </Suspense>
        
        <Footer onRegisterClick={handleRegisterClick} />
      </div>

      {/* Registration Modal */}
      <Dialog open={showRegistrationDrawer} onOpenChange={setShowRegistrationDrawer}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register for Indian Creative Star</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={useCallback((e) => setFormData(prev => ({...prev, name: e.target.value})), [])}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={useCallback((e) => setFormData(prev => ({...prev, email: e.target.value})), [])}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={useCallback((e) => setFormData(prev => ({...prev, phone: e.target.value})), [])}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="5"
                max="100"
                value={formData.age}
                onChange={useCallback((e) => setFormData(prev => ({...prev, age: e.target.value})), [])}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
});

IndexV2.displayName = 'IndexV2';

export default IndexV2;