import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GallerySectionV2 } from "@/components/GallerySectionV2";
import { PrizeSectionV2 } from "@/components/PrizeSectionV2";
import { FAQSectionV2 } from "@/components/FAQSectionV2";
import TestimonialsSection from "@/components/ReviewsSection";
import WinnersGallery from "@/components/WinnersGallery";
import { Confetti } from "@/components/Confetti";
import { HeaderV2 } from "@/components/HeaderV2";
import { EarlyBirdBanner } from "@/components/EarlyBirdBanner";
import { StickyCTABanner } from "@/components/StickyCTABanner";
import { CountdownSection } from "@/components/CountdownSection";
import { Footer } from "@/components/Footer";
import { AboutSectionV2 } from "@/components/AboutSectionV2";
import { HowItWorksSectionV2 } from "@/components/HowItWorksSectionV2";
import LazyImage from "@/components/LazyImage";
import { ArrowRight, CheckCircle, Palette, Users, Star, Award, Trophy, BookOpen, Heart, Camera, Brush, Music, Lightbulb, Clock, Calendar, Gift, Globe, Zap, Target, X, Shield, Loader2 } from "lucide-react";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface IndexV2Props {
  onRegistrationClick?: () => void;
}

const IndexV2 = ({ onRegistrationClick }: IndexV2Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRegistrationDrawer, setShowRegistrationDrawer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  
  // Optimized animation refs - reduced from 6 to 2 for better performance
  const mainSectionRef = useRef(null);
  const secondarySectionRef = useRef(null);
  
  // Optimized animation visibility hooks - reduced from 6 to 2
  const isMainSectionInView = useInView(mainSectionRef, { once: true, margin: "-100px" });
  const isSecondarySectionInView = useInView(secondarySectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    category: 'adult'
  });

  // Optimized animation variants - reduced complexity for better performance
  const optimizedFadeIn = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }), []);

  const optimizedSlideIn = useMemo(() => ({
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }), []);

  // Optimized confetti - delayed longer to improve initial load performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 8000); // Increased from 5000ms to 8000ms
    return () => clearTimeout(timer);
  }, []);

  // Fix mobile white flash during scrolling
  useEffect(() => {
    // Set body background to black to prevent white flash
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';
    
    return () => {
      // Reset on unmount
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  // Optimized mobile banner creation with better performance
  const createMobileBanner = useCallback(() => {
    if (window.innerWidth >= 1024) return;
    
    const existingBanner = document.getElementById('mobile-sticky-banner');
    if (existingBanner) existingBanner.remove();
    
    const banner = document.createElement('div');
    banner.id = 'mobile-sticky-banner';
    banner.style.cssText = `
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 999999 !important;
      background: linear-gradient(to right, #9333ea, #ec4899) !important;
      border-top: 2px solid rgba(255, 255, 255, 0.2) !important;
      box-shadow: 0 -10px 25px -3px rgba(0, 0, 0, 0.3) !important;
      padding: 12px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      will-change: transform;
    `;
    
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%;">
          <img src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png" alt="Daami Presents Logo" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
        </div>
        <div>
          <h3 style="color: white; font-weight: bold; font-size: 14px; margin: 0; line-height: 1.2;">Indian Creative Star</h3>
          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">Art Competition</p>
        </div>
      </div>
      <button id="mobile-register-btn" style="
        background: white !important;
        color: #9333ea !important;
        font-weight: bold !important;
        padding: 10px 20px !important;
        border-radius: 25px !important;
        border: none !important;
        font-size: 14px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
        transition: transform 0.2s ease !important;
      ">Register Now</button>
    `;
    
    document.body.appendChild(banner);
    
    const registerBtn = document.getElementById('mobile-register-btn');
    if (registerBtn) {
      registerBtn.onclick = () => handleRegisterClick();
      
      // Optimized hover effects with transform only
      registerBtn.addEventListener('mouseenter', () => {
        registerBtn.style.transform = 'scale(1.05)';
      });
      
      registerBtn.addEventListener('mouseleave', () => {
        registerBtn.style.transform = 'scale(1)';
      });
    }
  }, []);
  
  useEffect(() => {
    // Debounced resize handler with better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(createMobileBanner, 200); // Increased debounce time
    };
    
    createMobileBanner();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      const banner = document.getElementById('mobile-sticky-banner');
      if (banner) banner.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [createMobileBanner]);

  // Hide sticky banner when modal is open
  useEffect(() => {
    const banner = document.getElementById('mobile-sticky-banner');
    if (banner) {
      if (showRegistrationDrawer) {
        banner.style.transform = 'translateY(100%)';
        banner.style.transition = 'transform 0.3s ease';
      } else {
        banner.style.transform = 'translateY(0)';
        banner.style.transition = 'transform 0.3s ease';
      }
    }
  }, [showRegistrationDrawer]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
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

      // Prepare participant data for Firebase
      const participantData = {
        name: formData.name,
        age: parseInt(formData.age),
        whatsapp: formData.phone, // Using phone field as whatsapp in v2 form
        email: formData.email,
        instagram: "",
        contestType: "art",
        category: category
      };

      // Save to Firebase
      const { addParticipant } = await import("@/lib/firebase");
      const result = await addParticipant(participantData);

      if (result.success) {

        setShowRegistrationDrawer(false);

        // Navigate to thank you page with full details via query params
        const qp = new URLSearchParams({
          name: formData.name,
          type: "art",
          id: result.id,
          age: String(formData.age ?? ""),
          whatsapp: formData.phone ?? "",
          email: formData.email ?? "",
          instagram: "",
          category
        });

        // Persist locally as fallback for Thank You page
        try {
          sessionStorage.setItem(
            "ics_last_registration",
            JSON.stringify({
              id: result.id,
              name: formData.name,
              type: "art",
              age: String(formData.age ?? ""),
              whatsapp: formData.phone ?? "",
              email: formData.email ?? "",
              instagram: "",
              category
            })
          );
        } catch (e) {
          // ignore
        }

        navigate(`/thank-you?${qp.toString()}`);
      } else {
        console.error("Registration failed:", result);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      alert("Registration failed. Please try again.");
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  // Memoized artwork images for better performance
  const baseArtworkImages = useMemo(() => [
    "https://i.ibb.co/WvDdnrrp/ba50688142d1.jpg",
    "https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg",
    "https://i.ibb.co/1tfb4qTq/1753870691007.jpg",
    "https://i.ibb.co/hRF9fSgq/IMG-20250710-133728.jpg",
    "https://i.ibb.co/5g7k8VTJ/4ae89184da7e.jpg",
    "https://i.ibb.co/tM7Z9mXc/4ee7930e6f86.jpg",
    "https://i.ibb.co/HLdJDyP2/770cb2e47d9d.jpg",
    "https://i.ibb.co/TqvgmCQL/eb8f3507b6a6.jpg",
    "https://i.ibb.co/hJZLG60Z/c64f6f4adcec.jpg",
    "https://i.ibb.co/67YkzZH5/1000077583.jpg",
    "https://i.ibb.co/GQT1152P/1000076355.jpg",
    "https://i.ibb.co/wN8gm9Zh/1000077393.jpg",
    "https://i.ibb.co/Y7MkyNRm/Screenshot-20250710-193546.png",
    "https://i.ibb.co/mF6VsCY5/96f7ff59210a.png",
    "https://i.ibb.co/cc5kPhJf/bbbe857c0f6f.png"
  ], []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black" style={{ scrollBehavior: 'smooth' }}>
      {/* Performance optimization: reduced willChange usage */}
      <style>{`
        body {
          background-color: black !important;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }
        html {
          background-color: black !important;
          scroll-behavior: smooth;
        }
        @media (max-width: 768px) {
          body {
            background-color: black !important;
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Performance optimizations */
        * {
          box-sizing: border-box;
        }
        
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Optimized gradient animation */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animated-gradient {
          background: linear-gradient(-45deg, #ff6b6b, #ffa500, #ff4757, #ff6348, #ff7675, #fd79a8);
          background-size: 400% 400%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .animated-gradient:hover {
          animation-duration: 2s;
        }
        
        /* Pause animations when not visible to save battery */
        @media (prefers-reduced-motion: reduce) {
          .animated-gradient {
            animation: none !important;
            background: linear-gradient(-45deg, #ff6b6b, #ffa500) !important;
          }
        }
      `}</style>
      
      {/* Header */}
      <HeaderV2 onRegistrationClick={() => handleRegisterClick()} />
      
      {showConfetti && <Confetti />}
      <StickyCTABanner onRegisterClick={() => handleRegisterClick()} />
      

      
      {/* Hero Section - Single Blurred Background */}
      <section className="relative pt-0 sm:pt-32 pb-16 sm:pb-20 px-2 sm:px-4 overflow-hidden min-h-screen">
        {/* Single Blurred Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image - Best artwork from the collection */}
          <div className="absolute inset-0">
            <LazyImage
              src="https://i.ibb.co/fz9nV0sg/4fe133328b5c.jpg"
              alt="Featured Artwork Background"
              className="w-full h-full object-cover blur-sm scale-110"
            />
          </div>
          
          {/* Dark Gradient Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 z-10"></div>
        </div>

        {/* Content Overlay */}
        <div className="container mx-auto max-w-6xl relative z-20 px-4 pt-24">
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium text-white/90">Limited Time Opportunity</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-white font-light">Indian Creative Star Season 1</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent font-bold">
                  India's Prestigious Art Competition
              </span>
            </h1>
            
              <div className="space-y-2">
                <p className="text-lg sm:text-xl text-white/90 font-light">Transform Your Art Into</p>
                <p className="text-base text-white/70">National Recognition</p>
              </div>
            </div>

            {/* Reviews and Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="flex -space-x-2">
                  <LazyImage src="/WhatsApp Image 2025-09-08 at 17.20.43.jpeg" alt="Artist 1" className="w-8 h-8 rounded-full border-2 border-white" />
                  <LazyImage src="/WhatsApp Image 2025-09-08 at 17.41.27.jpeg" alt="Artist 2" className="w-8 h-8 rounded-full border-2 border-white" />
                  <LazyImage src="/WhatsApp Image 2025-09-08 at 20.31.58.jpeg" alt="Artist 3" className="w-8 h-8 rounded-full border-2 border-white" />
                  <LazyImage src="/WhatsApp Image 2025-09-08 at 21.35.50.jpeg" alt="Artist 4" className="w-8 h-8 rounded-full border-2 border-white" />
                  <LazyImage src="/image.dslr2.jpg" alt="Artist 5" className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm text-white/90 font-medium block">1,000+ artists</span>
                  <span className="text-xs text-white/70">Verified by Google Reviews</span>
                </div>
          </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </div>
                  <span className="text-sm text-white/90 font-medium ml-1">4.9 rating</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm text-white/90 font-medium">Nationwide</span>
                </div>
              </div>
              
            {/* Theme Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-white/20">
              <span className="text-white font-medium">Open Theme</span>
                </div>

            {/* Description */}
            <div className="max-w-2xl">
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed">
                Join thousands of artists across India in this nationwide art movement.
                Become a Creative Star and showcase your talent nationwide.
              </p>
              </div>
              
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-4xl">
              <div className="relative bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-3 sm:p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                  <Trophy className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-lg sm:text-4xl font-bold text-orange-300 mb-1 sm:mb-2 text-center">₹50,000</div>
                <div className="text-white/80 text-xs sm:text-sm font-medium text-center">Prize Pool</div>
              </div>
              <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-3 sm:p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                  <Gift className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-lg sm:text-4xl font-bold text-green-300 mb-1 sm:mb-2 text-center">₹249</div>
                <div className="text-white/80 text-xs sm:text-sm font-medium text-center">Entry Fee</div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-3 sm:p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                  <Award className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-sm sm:text-lg font-bold text-blue-300 mb-1 sm:mb-2 text-center">Government</div>
                <div className="text-white/80 text-xs sm:text-sm font-medium text-center">Verified Certificate</div>
              </div>
              <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-3 sm:p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                  <Users className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-sm sm:text-lg font-bold text-purple-300 mb-1 sm:mb-2 text-center">500 Slots</div>
                <div className="text-white/80 text-xs sm:text-sm font-medium text-center">Available</div>
            </div>
          </div>

            {/* Creative Manifesto */}
            <div className="max-w-3xl">
              <div className="bg-gradient-to-r from-black/50 to-black/70 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-3 sm:mb-4 text-center tracking-wide">OUR CREATIVE MANIFESTO</h3>
                <blockquote className="text-white/90 italic text-center leading-relaxed text-sm sm:text-lg">
                  "They told your dreams don't pay,<br />
                  but your brush had more to say.<br />
                  What you create alone — the nation will now celebrate.<br />
                  <span className="text-yellow-300 font-medium">India has millions of stories. Let yours rise today.</span>"
                </blockquote>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex justify-center w-full max-w-md">
              <Button
                onClick={handleRegisterClick}
                className="animated-gradient text-white font-semibold py-5 px-10 sm:py-4 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg sm:text-base"
              >
                Register Now
                <ArrowRight className="ml-2 h-6 w-6 sm:h-5 sm:w-5" />
              </Button>
              </div>

            </div>
        </div>
      </section>

      {/* For Artists and Parents Section */}
      <section className="py-20 -mx-4 px-1 sm:mx-0 sm:px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-lg mb-6">
              <span className="text-sm font-medium text-gray-800">Who Can Join</span>
              </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Creative Journey</span> Starts Here
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're an artist or a parent supporting young talent, this is your gateway to national recognition
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* For Artists */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">For Artists</h3>
          </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Showcase your artistic talent on a national platform and win from a <span className="font-semibold text-orange-600">₹50,000 prize pool</span>.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">Connect with like-minded artists nationwide</p>
                  </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                </div>
                  <p className="text-sm sm:text-base text-gray-700">Get professional feedback on your artwork</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">Add national recognition to your portfolio</p>
                  </div>
                </div>
              
              <Button
                onClick={handleRegisterClick}
                className="w-full animated-gradient text-white font-semibold py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Palette className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Register as Artist
              </Button>
              </div>
              
            {/* For Parents */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">For Parents</h3>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Nurture your child's creativity and give them a platform to shine with <span className="font-semibold text-blue-600">confidence-building experience</span>.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">Boost your child's artistic confidence</p>
                  </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                </div>
                  <p className="text-sm sm:text-base text-gray-700">Recognition beyond school achievements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">Special addition to education portfolio</p>
                </div>
              </div>
              
              <Button
                onClick={handleRegisterClick}
                className="w-full animated-gradient text-white font-semibold py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Register as Parent
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* About Section V2 */}
      <div id="about">
        <AboutSectionV2 />
      </div>

      {/* Official Certificate & ID Card Section */}
      <section className="py-6 -mx-4 px-1 sm:mx-0 sm:px-4 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #6a5acd, #ff6b6b, #4ecdc4, #45b7d1)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease-in-out infinite'
        }}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-between">
            
            {/* Content */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                <h3 className="text-base md:text-2xl font-bold text-white mb-1" style={{
                  animation: 'colorGlow 3s ease-in-out infinite alternate'
                }}>
                  Every participant will get Official Certificate & Artist ID Card
                </h3>
                  </div>
                </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white/30">
                <LazyImage
                  src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png"
                  alt="Daami Presents Logo"
                  className="w-full h-full"
                />
              </div>
            </div>
            
            </div>
          </div>

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 50%; }
            50% { background-position: 200% 50%; }
            75% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes colorGlow {
            0% {
              text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4);
            }
            25% {
              text-shadow: 0 0 20px rgba(255,182,193,0.8), 0 0 30px rgba(255,182,193,0.6), 0 0 40px rgba(255,182,193,0.4);
            }
            50% {
              text-shadow: 0 0 20px rgba(173,216,230,0.8), 0 0 30px rgba(173,216,230,0.6), 0 0 40px rgba(173,216,230,0.4);
            }
            75% {
              text-shadow: 0 0 20px rgba(144,238,144,0.8), 0 0 30px rgba(144,238,144,0.6), 0 0 40px rgba(144,238,144,0.4);
            }
            100% {
              text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4);
            }
          }
        `}</style>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 -mx-4 px-1 sm:mx-0 sm:px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="container mx-auto max-w-7xl">
          {/* Header - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left order-1 flex flex-col justify-start items-center lg:items-start">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-lg mb-6">
                <Trophy className="h-4 w-4 mr-2 text-orange-600" />
                <span className="text-sm font-medium text-gray-800">Rewards & Recognition</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">Rewarded</span>
              </h2>
              <p className="text-2xl font-semibold text-gray-800 mb-4">What's in it for YOU?</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe in recognizing and rewarding creativity. Here are the exciting prizes available in our competitions.
              </p>
            <Button 
              onClick={handleRegisterClick}
                className="animated-gradient text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-fit text-lg"
            >
                Register Now
                <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            </div>
            <div className="space-y-8 order-2 flex flex-col justify-start">
              {/* This will be shown on mobile only, below the categories */}
            </div>
          </div>

          {/* Competition Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Adult Competition */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
                <div className="relative bg-gradient-to-r from-orange-500/90 to-red-500/90 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Adult Art Competition</h3>
                      <p className="text-orange-100 font-medium">18+ Years | Prize Pool: ₹30,000</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-end justify-center gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-700">₹10,000</p>
                        <p className="text-xs text-gray-500">Silver</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-28 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex items-center justify-center mb-2 shadow-xl relative">
                        <span className="text-white font-bold text-2xl">1</span>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <Trophy className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">₹15,000</p>
                        <p className="text-xs text-gray-500">Gold Champion</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-orange-600">₹5,000</p>
                        <p className="text-xs text-gray-500">Bronze</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/40 rounded-2xl p-4 backdrop-blur-sm">
                    <h4 className="font-bold text-gray-800 mb-3 text-center">All Winners Receive</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-medium text-gray-700">National Recognition</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-700">e-Magazine Feature</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <Gift className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-medium text-gray-700">Surprise Hamper</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-700">Mystery Gift</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

            {/* Kids Competition */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
                <div className="relative bg-gradient-to-r from-blue-500/90 to-purple-500/90 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Heart className="h-8 w-8 text-white" />
              </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Kids Art Competition</h3>
                      <p className="text-blue-100 font-medium">5-17 Years | Prize Pool: ₹20,000</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <Heart className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Group A (5-8 years)</h4>
                            <p className="text-sm text-gray-600">Little Artists</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹5,000</p>
                          <p className="text-xs text-gray-500">Winner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <Palette className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Group B (9-12 years)</h4>
                            <p className="text-sm text-gray-600">Young Creators</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">₹5,000</p>
                          <p className="text-xs text-gray-500">Winner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Group C (13-17 years)</h4>
                            <p className="text-sm text-gray-600">Teen Artists</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">₹10,000</p>
                          <p className="text-xs text-gray-500">Winner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/40 rounded-2xl p-4 backdrop-blur-sm mt-4">
                    <h4 className="font-bold text-gray-800 mb-3 text-center">All Winners Receive</h4>
                    <div className="flex justify-center gap-4">
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-700">e-Magazine Feature</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                        <Gift className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-medium text-gray-700">Gift Hamper</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            

              </div>
      </section>

      {/* Artist Benefits Section */}
      <section className="relative py-20 overflow-hidden" id="benefits">
        {/* Single Blurred Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <LazyImage
              src="https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg"
              alt="Benefits Background"
              className="w-full h-full object-cover blur-sm scale-110"
            />
          </div>
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 z-10"></div>
        </div>

        {/* Header Section */}
        <div className="relative z-20 text-center mb-6 pt-2">
          <div className="inline-flex items-center px-6 py-3 bg-white/30 rounded-full border border-white/40 mb-6">
            <Lightbulb className="h-4 w-4 mr-2 text-orange-300" />
            <span className="text-sm font-medium text-white/90">Your Creative Journey</span>
                </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-6">
            Every Artist <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Wins Something</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Because we believe every creative soul deserves recognition, growth, and a platform to shine.
          </p>
        </div>

        {/* Sliding Benefits Cards */}
        <div className="relative z-20">
          <div className="overflow-x-hidden">
            <div className="flex animate-slide-left-continuous space-x-4 sm:space-x-8 max-w-[100vw]" style={{ willChange: 'transform' }}>
               {/* Duplicate cards for seamless loop */}
               {[...Array(3)].map((_, setIndex) => (
                 <React.Fragment key={setIndex}>
                   
                   {/* Your Spotlight Moment */}
                   <div className="flex-shrink-0 w-56 sm:w-80">
                     <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur opacity-20"></div>
                       <div className="relative bg-white/70 rounded-3xl p-3 sm:p-6 border border-white/50 shadow-xl">
                         <div className="text-center">
                           <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2.5 sm:mb-4">
                             <Star className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                           </div>
                           <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">Your Spotlight Moment</h3>
                           <p className="text-gray-700 leading-relaxed text-xs sm:text-base">
                              Featured in our Artist Showcase reaching <span className="font-bold text-orange-600">50,000+ art lovers</span> across India
                            </p>
                         </div>
                       </div>
                </div>
              </div>
              
                   {/* Official Creative Badge */}
                   <div className="flex-shrink-0 w-56 sm:w-80">
                     <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-20"></div>
                       <div className="relative bg-white/70 rounded-3xl p-3 sm:p-6 border border-white/50 shadow-xl">
                         <div className="text-center">
                           <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2.5 sm:mb-4">
                             <Award className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                           <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">Official Creative Badge</h3>
                           <p className="text-gray-700 leading-relaxed text-xs sm:text-base">
                              Digital certificate + Artist ID that you can proudly display on <span className="font-bold text-blue-600">LinkedIn & social media</span>
                            </p>
                </div>
                       </div>
                </div>
              </div>
              
                   {/* Exclusive Artist Circle */}
                   <div className="flex-shrink-0 w-56 sm:w-80">
                     <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur opacity-20"></div>
                       <div className="relative bg-white/70 rounded-3xl p-3 sm:p-6 border border-white/50 shadow-xl">
                         <div className="text-center">
                           <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2.5 sm:mb-4">
                             <Users className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                           </div>
                           <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">Exclusive Artist Circle</h3>
                           <p className="text-gray-700 leading-relaxed text-xs sm:text-base">
                              Join our private community of <span className="font-bold text-green-600">1,000+ verified artists</span> for collaborations & opportunities
                            </p>
                         </div>
                       </div>
                     </div>
            </div>
            
                   {/* VIP Early Access */}
                   <div className="flex-shrink-0 w-56 sm:w-80">
                     <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20"></div>
                       <div className="relative bg-white/70 rounded-3xl p-3 sm:p-6 border border-white/50 shadow-xl">
                         <div className="text-center">
                           <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2.5 sm:mb-4">
                             <Zap className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                           <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">VIP Early Access</h3>
                           <p className="text-gray-700 leading-relaxed text-xs sm:text-base">
                              First to know about <span className="font-bold text-purple-600">exhibitions, contests & art opportunities</span> before anyone else
                            </p>
                         </div>
                       </div>
                </div>
              </div>
              
                 </React.Fragment>
               ))}
                </div>
          </div>
        </div>
        

      </section>

      {/* Previous Competition Highlights - Compact */}
      <section className="py-12 -mx-4 px-1 sm:mx-0 sm:px-4 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 px-4">
          
          {/* Header */}
          <motion.div 
            ref={mainSectionRef}
            variants={optimizedFadeIn}
            initial="hidden"
            animate={isMainSectionInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <motion.div 
              variants={optimizedFadeIn}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-orange-200 mb-4"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Trophy className="h-4 w-4 mr-2 text-orange-600" />
              </motion.div>
              <span className="text-sm font-semibold text-orange-700">Success Stories</span>
            </motion.div>
            <motion.h2 
              variants={optimizedFadeIn}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Previous Competition <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Highlights</span>
            </motion.h2>
            <motion.p 
              variants={optimizedFadeIn}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Celebrating incredible talent from our past competitions
            </motion.p>
          </motion.div>

          {/* Leaderboard Podium with Artworks - Larger */}
          <div className="mb-20 relative">
            
            {/* Mobile Stats Grid - Visible only on mobile */}
            <motion.div 
              ref={mainSectionRef}
              variants={optimizedFadeIn}
              initial="hidden"
              animate={isMainSectionInView ? "visible" : "hidden"}
              className="block md:hidden mb-8"
            >
              <motion.div 
                variants={optimizedFadeIn}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: Users, number: "500+", label: "Participants", gradient: "from-blue-500 to-cyan-500", color: "text-blue-600" },
                  { icon: Gift, number: "₹50K", label: "Prize Pool", gradient: "from-green-500 to-emerald-500", color: "text-green-600" },
                  { icon: Star, number: "4.9★", label: "Rating", gradient: "from-purple-500 to-pink-500", color: "text-purple-600" },
                  { icon: Award, number: "100+", label: "Featured", gradient: "from-orange-500 to-red-500", color: "text-orange-600" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    variants={optimizedFadeIn}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    className="bg-white/60 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}
                      >
                        <stat.icon className="h-4 w-4 text-white" />
                      </motion.div>
                      <div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Desktop Side Cards - Hidden on mobile with Floating Animation */}
            <motion.div 
              variants={optimizedSlideIn}
              initial="hidden"
              animate={isMainSectionInView ? "visible" : "hidden"}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4"
            >
              <motion.div 
                variants={optimizedFadeIn}
                className="space-y-4"
              >
                {[
                  { icon: Users, number: "500+", label: "Participants Joined", gradient: "from-blue-500 to-cyan-500", color: "text-blue-600", delay: "0s" },
                  { icon: Gift, number: "₹25K", label: "Prize Distributed", gradient: "from-green-500 to-emerald-500", color: "text-green-600", delay: "1s" },
                  { icon: Star, number: "4.9★", label: "Success Rating", gradient: "from-purple-500 to-pink-500", color: "text-purple-600", delay: "2s" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    variants={optimizedFadeIn}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 w-48 animate-float" 
                    style={{ animationDelay: stat.delay }}
                  >
                <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <stat.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={optimizedSlideIn}
              initial="hidden"
              animate={isMainSectionInView ? "visible" : "hidden"}
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4"
            >
              <motion.div 
                variants={optimizedFadeIn}
                className="space-y-4"
              >
                {[
                  { icon: Award, number: "100+", label: "Featured Artists", gradient: "from-orange-500 to-red-500", color: "text-orange-600", delay: "0.5s" },
                  { icon: Globe, number: "50K+", label: "Media Reach", gradient: "from-indigo-500 to-purple-500", color: "text-indigo-600", delay: "1.5s" },
                  { icon: BookOpen, number: "500+", label: "Certificates Issued", gradient: "from-teal-500 to-cyan-500", color: "text-teal-600", delay: "2.5s" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    variants={optimizedFadeIn}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 w-48 animate-float" 
                    style={{ animationDelay: stat.delay }}
                  >
                <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <stat.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              ref={secondarySectionRef}
              variants={optimizedFadeIn}
              initial="hidden"
              animate={isSecondarySectionInView ? "visible" : "hidden"}
              className="flex items-end justify-center gap-2 md:gap-12 mb-12 px-4"
            >
              
              {/* 2nd Place */}
              <motion.div 
                variants={optimizedSlideIn}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-3 md:mb-6"
                >
                  <img
                    src={baseArtworkImages[1]}
                    alt="2nd Place Artwork"
                    className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl border-2 md:border-6 border-gray-300"
                  />
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 -right-1 md:-top-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full flex items-center justify-center shadow-lg md:shadow-xl"
                  >
                    <span className="text-white font-bold text-xs md:text-lg">2</span>
                  </motion.div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-20 md:w-48 md:h-32 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-xl md:shadow-2xl"
                >
                  <span className="text-white font-black text-lg md:text-4xl">2nd</span>
                </motion.div>
              </motion.div>

              {/* 1st Place - Tallest */}
              <motion.div 
                variants={optimizedFadeIn}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-3 md:mb-6"
                >
                  <img
                    src={baseArtworkImages[0]}
                    alt="1st Place Artwork"
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl border-2 md:border-6 border-yellow-400"
                  />
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 -right-1 md:-top-4 md:-right-4 w-8 h-8 md:w-14 md:h-14 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-xl md:shadow-2xl"
                  >
                    <Trophy className="h-4 w-4 md:h-7 md:w-7 text-white" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-36 h-28 md:w-56 md:h-40 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-xl md:shadow-2xl relative"
                >
                  <span className="text-white font-black text-2xl md:text-5xl">1st</span>
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 md:-top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-8 md:h-8 bg-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Star className="h-2 w-2 md:h-4 md:w-4 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div 
                variants={optimizedSlideIn}
                whileHover={{ scale: 1.05, rotateY: -5 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-3 md:mb-6"
                >
                  <img
                    src={baseArtworkImages[2]}
                    alt="3rd Place Artwork"
                    className="w-20 h-20 md:w-36 md:h-36 object-cover rounded-xl md:rounded-3xl shadow-lg md:shadow-xl border-2 md:border-6 border-orange-400"
                  />
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 -right-1 md:-top-3 md:-right-3 w-5 h-5 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg md:shadow-xl"
                  >
                    <span className="text-white font-bold text-xs md:text-base">3</span>
                  </motion.div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-16 md:w-44 md:h-28 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-lg md:shadow-xl"
                >
                  <span className="text-white font-black text-sm md:text-3xl">3rd</span>
                </motion.div>
              </motion.div>
              
            </motion.div>
            
            {/* Prize Pool Banner */}
            <motion.div 
              variants={optimizedFadeIn}
              initial="hidden"
              animate={isSecondarySectionInView ? "visible" : "hidden"}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="inline-flex items-center gap-2 md:gap-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl px-4 md:px-8 py-2 md:py-4 shadow-xl md:shadow-2xl"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Gift className="h-5 w-5 md:h-8 md:w-8 text-white" />
                </motion.div>
                <span className="text-lg md:text-2xl font-bold text-white">₹50K Prize Pool</span>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="h-5 w-5 md:h-8 md:w-8 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            </div>
          </div>

        {/* Full Width Sliding Testimonials - Improved Mobile */}
        <motion.div 
          ref={secondarySectionRef}
          variants={optimizedFadeIn}
          initial="hidden"
          animate={isSecondarySectionInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <motion.h3 
            variants={optimizedFadeIn}
            className="text-lg md:text-xl font-bold text-gray-900 text-center mb-4 md:mb-6 px-4"
          >
            Artist Success Stories
          </motion.h3>
          
          <div className="overflow-hidden">
            <div className="flex animate-testimonial-slide-fast space-x-3 md:space-x-6">
              {[...Array(4)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {[
                    { name: "Anjali Sharma", quote: "Very professional management! My daughter participated and felt so motivated. Finally, an art platform that respects young talent.", avatar: "A", gradient: "from-purple-500 to-pink-500" },
                    { name: "Rizwan Khan", quote: "As an artist, I joined Sikkim Creative Star Season 1 and now I'm here again for Season 2. The team keeps improving every year. Excited!", avatar: "R", gradient: "from-blue-500 to-cyan-500" },
                    { name: "Priya Das", quote: "Honestly, I didn't expect such smooth coordination. From registration to updates, everything was managed really well. Great job, Daami Event!", avatar: "P", gradient: "from-green-500 to-emerald-500" },
                    { name: "Arvind Mehta", quote: "This competition is not just about prizes, it's about recognition. Artists finally have a stage where their creativity is valued.", avatar: "A", gradient: "from-orange-500 to-red-500" },
                    { name: "Meera Kapoor", quote: "My son participated, and I was amazed at the exposure he got. It really boosts children's confidence to see their art celebrated.", avatar: "M", gradient: "from-indigo-500 to-purple-500" },
                    { name: "Sana Fatima", quote: "I joined this competition because I believe art needs recognition. The organizers actually care about artists, and that makes a big difference.", avatar: "S", gradient: "from-pink-500 to-rose-500" },
                    { name: "Deepak Joshi", quote: "Season 1 had 300+ artists, and I was one of them. The way winners were celebrated was inspiring. Can't wait for Season 2 results!", avatar: "D", gradient: "from-teal-500 to-cyan-500" },
                    { name: "Vikram Thapa", quote: "Superb initiative. The certificates are genuine and even supported by the Culture Department, which makes it feel official and prestigious.", avatar: "V", gradient: "from-yellow-500 to-orange-500" },
                    { name: "Rohit Sen", quote: "Good experience overall. Communication was clear, deadlines were fair, and the theme really pushed us to be creative.", avatar: "R", gradient: "from-red-500 to-pink-500" },
                    { name: "Neha Kumari", quote: "My daughter's painting was shortlisted last year. The smile on her face was priceless. Thank you for giving kids such a platform.", avatar: "N", gradient: "from-emerald-500 to-green-500" },
                    { name: "Krishna Prasad", quote: "I've seen many competitions, but none managed so smoothly. From online registration to updates on dashboard, everything was top-notch.", avatar: "K", gradient: "from-violet-500 to-purple-500" },
                    { name: "Aarav Patel", quote: "I joined because I wanted my art recognized at a national level. This competition gives hope to upcoming artists.", avatar: "A", gradient: "from-sky-500 to-blue-500" },
                    { name: "Lata Subba", quote: "As a parent, I loved how transparent the judging was. Every child felt included, and that's the beauty of this platform.", avatar: "L", gradient: "from-lime-500 to-green-500" },
                    { name: "Imran Ali", quote: "This is not just an event — it's a movement. I participated in Sikkim Creative Star, and that experience made me return again. Truly inspiring.", avatar: "I", gradient: "from-amber-500 to-yellow-500" },
                    { name: "Sunita Sharma", quote: "Simple process, clear communication, and supportive team. Very rare to find this level of professionalism in art competitions.", avatar: "S", gradient: "from-fuchsia-500 to-pink-500" },
                    { name: "Ramesh Chhetri", quote: "I have been an artist for more than 10 years, but this is the first competition where I felt my work was truly valued. The management was fantastic.", avatar: "R", gradient: "from-cyan-500 to-blue-500" },
                    { name: "Fatima Begum", quote: "My child participated in Season 1, and though she didn't win, she gained immense confidence. She now paints daily and dreams of becoming an artist.", avatar: "F", gradient: "from-rose-500 to-pink-500" },
                    { name: "Rajendra Singh", quote: "I was part of Sikkim Creative Star Season 1 and I'm amazed to see how far this initiative has come. What started with 300 artists is now national-level!", avatar: "R", gradient: "from-indigo-500 to-blue-500" },
                    { name: "Anushka Verma", quote: "As an art teacher, I encouraged my students to participate, and many did. The joy they felt in seeing their names featured officially is priceless.", avatar: "A", gradient: "from-green-500 to-teal-500" },
                    { name: "Ganesh Lama", quote: "I must say the professionalism surprised me. Most competitions are messy, but here everything was well-structured. The support team was excellent.", avatar: "G", gradient: "from-purple-500 to-violet-500" }
                  ].map((testimonial, index) => (
                    <motion.div 
                      key={`${setIndex}-${index}`} 
                      variants={optimizedFadeIn}
                      whileHover={{ 
                        scale: 1.02, 
                        rotateY: 5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                      }}
                      className="flex-shrink-0 w-64 md:w-80"
                    >
                      <div className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-white/30 relative">
                        {/* Verified Badge */}
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="absolute top-1 right-1 bg-green-500 text-white font-medium px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5"
                        >
                          <CheckCircle className="h-2 w-2" />
                          <span className="text-xs">Verified</span>
                        </motion.div>
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 mt-2">
                          <motion.div 
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}
                          >
                            <span className="text-white font-bold text-xs md:text-sm">{testimonial.avatar}</span>
                          </motion.div>
                          <div>
                            <div className="text-xs md:text-sm font-bold text-gray-900">{testimonial.name}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  transition={{ duration: 0.2, delay: i * 0.1 }}
                                >
                                  <Star className="h-2 w-2 md:h-3 md:w-3 text-yellow-400 fill-current" />
                                </motion.div>
                              ))}
        </div>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 italic leading-tight">"{testimonial.quote}"</p>
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Full Width Artwork Gallery - Improved Mobile */}
        <motion.div 
          ref={secondarySectionRef}
          variants={optimizedFadeIn}
          initial="hidden"
          animate={isSecondarySectionInView ? "visible" : "hidden"}
          className="overflow-hidden"
        >
          <motion.div 
            variants={optimizedFadeIn}
            className="flex animate-slide-right-fast space-x-2 md:space-x-4"
          >
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {baseArtworkImages.map((image, index) => (
                  <motion.div 
                    key={`gallery-${setIndex}-${index}`} 
                    variants={optimizedFadeIn}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    className="flex-shrink-0"
                  >
                    <div className="relative group overflow-hidden rounded-xl md:rounded-2xl w-48 h-48 md:w-80 md:h-60">
                      <LazyImage
                        src={image}
                        alt={`Previous artwork ${index + 1}`}
                        className="w-full h-full transition-all duration-300"
                      />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      ></motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-1 left-1 text-white"
                      >
                        <motion.div 
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="text-xs font-bold"
                        >
                          🏆
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
        
        <style>{`
          @keyframes testimonial-slide-fast {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes slide-right-fast {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-testimonial-slide-fast {
            animation: testimonial-slide-fast 30s linear infinite;
          }
          
          .animate-slide-right-fast {
            animation: slide-right-fast 35s linear infinite;
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          /* Pause animations when not visible */
          @media (prefers-reduced-motion: reduce) {
            .animate-testimonial-slide-fast,
            .animate-slide-right-fast,
            .animate-float {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* Testimonials Section - Moved here after Previous Competition Highlights */}
      <TestimonialsSection />
      
      {/* Real Reviews Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Real Reviews 📱
            </h2>
            <p className="text-base text-gray-600">Authentic feedback from Season 1 participants</p>
          </div>
          
          <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {[
              "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
              "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
              "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
              "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
              "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
              "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
              "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
            ].map((image, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="relative group break-inside-avoid mb-3 md:mb-4">
                <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-lg">
                    <LazyImage src={image} alt={`Review ${i + 1}`} className="w-full h-auto max-h-96 object-contain transition-transform group-hover:scale-105" />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                      ✓
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md">
              <span className="text-lg">⭐</span>
              <span className="font-bold text-gray-900 text-sm">4.9/5 from 300+ Artists</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prize Distribution Ceremony Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Prize Distribution Ceremony 🏆
            </h2>
            <p className="text-lg text-gray-600">Season 1 - Celebrating our Creative Stars</p>
          </div>
          
          <div className="columns-2 md:columns-2 lg:columns-3 gap-3 space-y-3" style={{ columnFill: 'balance' }}>
            {[
              "https://i.ibb.co/GvxDtkMB/IMG-20250914-WA0061-1-11zon.jpg",
              "https://i.ibb.co/dsLXSzc5/IMG-20250914-WA0034-11zon.jpg",
              "https://i.ibb.co/6Jf9VgW9/IMG-20250914-WA0065-11zon.jpg",
              "https://i.ibb.co/gFjJ0nrD/IMG-20250915-133301-11zon.jpg",
              "https://i.ibb.co/hFtJFDNM/IMG-20250914-WA0024-11zon.jpg",
              "https://i.ibb.co/PRq5Y0T/IMG-20250914-WA0028-11zon.jpg",
              "https://i.ibb.co/RxbjbPt/IMG-20250914-WA0026-11zon-2.jpg"
            ].map((image, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`relative group break-inside-avoid mb-3 ${i === 0 ? 'column-span-2' : ''}`}>
                <div className="bg-white rounded-lg p-1 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-md">
                    <LazyImage src={image} alt={`Prize Distribution ${i + 1}`} className="w-full h-auto max-h-96 object-contain transition-transform group-hover:scale-105" />
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                      <div className="text-sm mb-0">🎉</div>
                      <div className="font-bold text-xs">Season 1</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl px-6 py-3 text-white shadow-lg">
              <span className="text-2xl">🎊</span>
              <span className="font-bold">6 Creative Stars Awarded in Season 1</span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Countdown Section */}
      <CountdownSection onRegisterClick={handleRegisterClick} />
      
      {/* Winners Gallery - Moved here after Testimonials */}
      <div id="gallery">
        <WinnersGallery />
      </div>

      {/* How It Works Section - Vertical Timeline */}
      <section className="py-20 -mx-4 px-1 sm:mx-0 sm:px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200 mb-4">
              <span className="text-sm font-semibold text-blue-700">Step-by-Step Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">How It Works</span>
            </h2>
            <p className="text-lg font-semibold text-gray-800 mb-2">Simple Step-by-Step Journey</p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              From registration to winning - your path to nationwide recognition
            </p>
          </div>

          {/* Responsive Timeline */}
          <div className="relative">
            {/* Desktop Timeline - Hidden on mobile */}
            <div className="hidden md:block">
              {/* Central Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 to-green-500 rounded-full opacity-30"></div>
              
              {/* Desktop Timeline Steps */}
              <div className="space-y-8">
                
                {/* Step 1 - Right Side */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl z-10">1</div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 translate-x-6 w-6 h-0.5 bg-blue-500 z-5">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 text-blue-500" />
              </div>
                  <div className="w-5/12 ml-auto">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Register & Join</h3>
                      <p className="text-gray-700 mb-3 text-sm">Complete the simple registration form, and you'll be added to our WhatsApp group for all competition updates and guidance.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Simple payment
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />WhatsApp support
                        </span>
                      </div>
                    </div>
                  </div>
            </div>

                {/* Step 2 - Left Side */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl z-10">2</div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-x-6 w-6 h-0.5 bg-purple-500 z-5 rotate-180">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 text-purple-500" />
              </div>
                  <div className="w-5/12 mr-auto">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Your Artwork</h3>
                      <p className="text-gray-700 mb-3 text-sm">You'll receive a portal link where you can easily upload photos of your artwork and provide details about your creative process.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Easy upload
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Any medium
                        </span>
                      </div>
                    </div>
                  </div>
            </div>

                {/* Step 3 - Right Side */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl z-10">3</div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 translate-x-6 w-6 h-0.5 bg-orange-500 z-5">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 text-orange-500" />
              </div>
                  <div className="w-5/12 ml-auto">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Judging & Voting</h3>
                      <p className="text-gray-700 mb-3 text-sm">Expert judges will evaluate all entries while live public voting takes place. This dual process ensures the most deserving artists rise to the top.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Expert jury
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Public voting
                        </span>
                      </div>
                    </div>
                  </div>
            </div>

                {/* Step 4 - Left Side */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl z-10">4</div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-x-6 w-6 h-0.5 bg-green-500 z-5 rotate-180">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 text-green-500" />
              </div>
                  <div className="w-5/12 mr-auto">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Winners Announced</h3>
                      <p className="text-gray-700 mb-3 text-sm">Winners will be announced and awarded from our ₹50,000 prize pool across adult and kids categories, with additional recognition through our digital platforms.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Cash prizes
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="h-2 w-2 mr-1" />Recognition
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Mobile Timeline - Visible only on mobile */}
            <div className="md:hidden space-y-6">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">1</div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Register & Join</h3>
                  <p className="text-gray-700 mb-3 text-sm">Complete the simple registration form, and you'll be added to our WhatsApp group for all competition updates and guidance.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Simple payment
                    </span>
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />WhatsApp support
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">2</div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Your Artwork</h3>
                  <p className="text-gray-700 mb-3 text-sm">You'll receive a portal link where you can easily upload photos of your artwork and provide details about your creative process.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Easy upload
                    </span>
                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Any medium
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">3</div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Judging & Voting</h3>
                  <p className="text-gray-700 mb-3 text-sm">Expert judges will evaluate all entries while live public voting takes place. This dual process ensures the most deserving artists rise to the top.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Expert jury
                    </span>
                    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Public voting
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">4</div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Winners Announced</h3>
                  <p className="text-gray-700 mb-3 text-sm">Winners will be announced and awarded from our ₹50,000 prize pool across adult and kids categories, with additional recognition through our digital platforms.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Cash prizes
                    </span>
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-2 w-2 mr-1" />Recognition
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Official Recognition Section */}
      <section className="py-20 -mx-4 px-1 sm:mx-0 sm:px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Official Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">All Participants Receive a Digital Certificate</p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our professionally designed digital certificate is perfect for:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Benefits */}
            <div className="space-y-8">
              
              {/* Resume Enhancement */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Enhancement</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Add creative credentials to your professional profile
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Portfolio Building */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio Building</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Demonstrate your commitment to your craft
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Sharing */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Social Media Sharing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Share your achievement with friends and followers
                    </p>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Certificate Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Indian Creative Star Certificate</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">Certificate of Participation</h4>
                    <p className="text-sm text-gray-600">Indian Creative Star Season 1</p>
                    <p className="text-xs text-gray-500">This certifies that [Participant Name] has successfully participated in India's premier art competition</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="w-8 h-1 bg-blue-300 rounded"></div>
                      <div className="w-8 h-1 bg-purple-300 rounded"></div>
                      <div className="w-8 h-1 bg-orange-300 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Professional design • High resolution • Instantly downloadable</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Our Supporters Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Supporters</span>
            </h2>
            <p className="text-lg text-gray-600">Our Partners & Sponsors</p>
          </div>
      </div>
      
        {/* Full Width Sliding Partners */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Funky Monkey */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">FM</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Funky Monkey</h3>
                      <p className="text-xs text-gray-600">Sponsor</p>
                    </div>
                  </div>

            {/* Daami Event */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">DE</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Daami Event</h3>
                      <p className="text-xs text-gray-600">Event Management</p>
                    </div>
                  </div>

            {/* Tenverse Media */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">TM</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Tenverse Media</h3>
                      <p className="text-xs text-gray-600">Sponsor</p>
                    </div>
                  </div>

            {/* Sikkim Daily News */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">SDN</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Sikkim Daily News</h3>
                      <p className="text-xs text-gray-600">Media Partner</p>
                    </div>
                  </div>

            {/* Cultural Department */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Cultural Dept. Sikkim</h3>
                      <p className="text-xs text-gray-600">Government Partner</p>
                    </div>
                  </div>

            {/* Education Department */}
            <div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Education Dept. Sikkim</h3>
                      <p className="text-xs text-gray-600">Educational Partner</p>
                    </div>
                  </div>

            </div>
          </div>

        {/* Campus Network Section - Compact */}
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Campus Network</h3>
            <p className="text-sm text-gray-600 mb-4">Our Campus Ambassadors - Student representatives from top institutions across Sikkim helping us discover emerging artistic talent</p>
            
            {/* Ambassador Card - Inline */}
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="text-left">
                <h5 className="text-sm font-bold text-gray-900">Shashank Saha</h5>
                <p className="text-xs text-gray-600">Sikkim Manipal Institute of Technology, Northeast India</p>
              </div>
            </div>
          </div>
        </div>
        

      </section>
      
      {/* FAQ Section */}
      <div id="faq">
        <React.Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
          <FAQSectionV2 />
        </React.Suspense>
      </div>
      
      {/* Performance Optimization Styles */}
      <style>{`
        /* Smooth scrolling optimization */
        html {
          scroll-behavior: smooth;
        }
        
        /* GPU acceleration for transforms */
        .hover\:scale-105:hover,
        .hover\:scale-110:hover {
          transform: scale(1.05) translateZ(0);
          will-change: transform;
        }
        
        /* Optimize images */
        img {
          content-visibility: auto;
          contain-intrinsic-size: 300px 200px;
        }
        
        /* Reduce motion for better performance */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Optimize scrolling */
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Prevent layout shifts */
        .container {
          contain: layout style;
        }
      `}</style>
      
      {/* Beautiful Registration Modal */}
      {!onRegistrationClick && (
        <Dialog open={showRegistrationDrawer} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
          <DialogContent hideClose className="sm:max-w-[600px] w-[95vw] sm:w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none mx-auto px-3 sm:px-0">
            <div className="bg-white rounded-lg sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-4 py-5 sm:px-8 sm:py-8 text-white relative">
                {/* Close Button - Top Right */}
                <button
                  aria-label="Close"
                  onClick={handleCloseModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-white/15 hover:bg-white/25 transition-colors p-1.5 sm:p-2.5 z-10"
                >
                  <X className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                
                {/* Content - Centered */}
                <div className="text-center">
                  <DialogHeader className="p-0">
                    <DialogTitle className="text-xl sm:text-3xl font-bold leading-tight">
                      <div className="flex items-center justify-center gap-3 mb-1">
                        
                        <div className="text-center">
                          <span className="block text-lg sm:text-2xl font-extrabold leading-tight">Join Indian Creative Star</span>
                          <span className="block text-sm sm:text-lg font-semibold opacity-95 -mt-1">Art Competition</span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-sm sm:text-base opacity-90 mt-1 leading-relaxed font-medium">
                    Become the next creative star
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="px-3 py-4 sm:px-8 sm:py-8">
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <Label htmlFor="name" className="mb-1.5 block text-sm sm:text-base font-medium">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-10 sm:h-12 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-1.5 block text-sm sm:text-base font-medium">WhatsApp Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your WhatsApp number"
                        className="h-10 sm:h-12 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <Label htmlFor="age" className="mb-1.5 block text-sm sm:text-base font-medium">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        min={1}
                        max={120}
                        className="h-10 sm:h-12 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-1.5 block text-sm sm:text-base font-medium">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  </div>


                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full animated-gradient text-white font-bold py-2.5 sm:py-5 rounded-lg sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] text-sm sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-6 sm:w-6 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 sm:h-6 sm:w-6" />
                          Register Now
                          <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Thank You overlay removed: now navigates to /thank-you */}
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-8 sm:py-12 pb-20 sm:pb-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-white/20">
                <LazyImage
                  src="/company-logo.jpeg"
                  alt="Daami Event Logo"
                  className="w-full h-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Daami Event
                </h3>
                <p className="text-purple-300 text-xs sm:text-sm font-medium">Event Management Company</p>
              </div>
            </div>
            
            {/* Tagline */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-lg text-white/90 font-medium mb-2">
                Empowering Artists Nationwide
              </p>
              <p className="text-white/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-4">
                Through creative competitions, recognition, and building a community of talented artists across India.
              </p>
            </div>
            
            {/* Divider */}
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4 sm:mb-6"></div>
            
            {/* Copyright */}
            <div className="space-y-1 sm:space-y-2">
              <p className="text-white/80 font-medium text-sm sm:text-base">
                © 2025 Daami Event. All Rights Reserved.
              </p>
              <p className="text-white/50 text-xs">
                Proudly organizing India's premier art competitions since 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexV2;

