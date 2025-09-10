import React, { useEffect, useState } from "react";
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
import { Footer } from "@/components/Footer";
import { AboutSectionV2 } from "@/components/AboutSectionV2";
import { HowItWorksSectionV2 } from "@/components/HowItWorksSectionV2";
import { ArrowRight, CheckCircle, Palette, Users, Star, Award, Trophy, BookOpen, Heart, Camera, Brush, Music, Lightbulb, Clock, Calendar, Gift, Globe, Zap, Target, X, Shield } from "lucide-react";
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
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    category: 'adult'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createMobileBanner = () => {
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
      `;
      
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%;">
            <img src="/public/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png" alt="Daami Presents Logo" style="width: 100%; height: 100%; object-fit: cover;" />
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
          padding: 8px 16px !important;
          border-radius: 20px !important;
          border: none !important;
          font-size: 14px !important;
          cursor: pointer !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        ">Register Now</button>
      `;
      
      document.body.appendChild(banner);
      
      const registerBtn = document.getElementById('mobile-register-btn');
      if (registerBtn) {
        registerBtn.onclick = () => handleRegisterClick();
      }
    };
    
    createMobileBanner();
    window.addEventListener('resize', createMobileBanner);
    
    return () => {
      const banner = document.getElementById('mobile-sticky-banner');
      if (banner) banner.remove();
      window.removeEventListener('resize', createMobileBanner);
    };
  }, []);

  const handleRegisterClick = () => {    
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      setShowRegistrationDrawer(true);
    }
  };

  const handleCloseModal = () => {
    setShowRegistrationDrawer(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRegistrationDrawer(false);
    navigate(`/thank-you?name=${encodeURIComponent(formData.name)}&type=art`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Artwork images for Netflix-style background
  const baseArtworkImages = [
    "https://i.ibb.co/zW2ZJr53/287326c1587c.jpg",
    "https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg",
    "https://i.ibb.co/cSGgqcw0/9c02b0fe24bb.jpg",
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
  ];

  // Create continuous flow by duplicating images multiple times for seamless animation
  const artworkImages = [
    ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages,
    ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages,
    ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages,
    ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages,
    ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages, ...baseArtworkImages
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <HeaderV2 onRegistrationClick={() => handleRegisterClick()} />
      
      {showConfetti && <Confetti />}
      <StickyCTABanner onRegisterClick={() => handleRegisterClick()} />
      

      
      {/* Hero Section - Netflix Style with Flowing Artwork */}
      <section className="relative pt-0 sm:pt-32 pb-16 sm:pb-20 px-2 sm:px-4 overflow-hidden min-h-screen">
        {/* Full-Screen Artwork Gallery Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark Gradient Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 z-10"></div>

          {/* Large Square Artwork Grid - Row 1 (Left to Right) */}
          <div className="absolute top-0 left-0 w-full h-1/3 animate-flow-right-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.map((image, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover shadow-2xl opacity-60 hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Large Square Artwork Grid - Row 2 (Right to Left) */}
          <div className="absolute top-1/3 left-0 w-full h-1/3 animate-flow-left-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.slice().reverse().map((image, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-48 md:w-64 object-cover shadow-2xl opacity-50 hover:opacity-70 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Large Square Artwork Grid - Row 3 (Left to Right) */}
          <div className="absolute top-2/3 left-0 w-full h-1/3 animate-flow-right-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.map((image, index) => (
                <div key={`row3-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-48 md:w-64 object-cover shadow-2xl opacity-40 hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
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
                  <img src="/WhatsApp Image 2025-09-08 at 17.20.43.jpeg" alt="Artist 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="/WhatsApp Image 2025-09-08 at 17.41.27.jpeg" alt="Artist 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="/WhatsApp Image 2025-09-08 at 20.31.58.jpeg" alt="Artist 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="/WhatsApp Image 2025-09-08 at 21.35.50.jpeg" alt="Artist 4" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                   <img src="/image.dslr2.jpg" alt="Artist 5" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
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
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-5 px-10 sm:py-4 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg sm:text-base"
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <h3 className="text-2xl font-bold text-gray-900">For Artists</h3>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Showcase your artistic talent on a national platform and win from a <span className="font-semibold text-orange-600">₹50,000 prize pool</span>.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Connect with like-minded artists nationwide</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Get professional feedback on your artwork</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Add national recognition to your portfolio</p>
                </div>
              </div>
              
              <Button 
                onClick={handleRegisterClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Palette className="h-5 w-5 mr-2" />
                Register as Artist
              </Button>
            </div>

            {/* For Parents */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Parents</h3>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nurture your child's creativity and give them a platform to shine with <span className="font-semibold text-blue-600">confidence-building experience</span>.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Boost your child's artistic confidence</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Recognition beyond school achievements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">Special addition to education portfolio</p>
                </div>
              </div>
              
              <Button 
                onClick={handleRegisterClick}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Heart className="h-5 w-5 mr-2" />
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
                <img
                  src="/public/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png"
                  alt="Daami Presents Logo"
                  className="w-full h-full object-cover"
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
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-fit text-lg"
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

      {/* Artist Benefits Sliding Section */}
      <section className="relative py-20 overflow-x-hidden overflow-y-visible" id="benefits">
        {/* Hero-style Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 z-10"></div>
          
          {/* Artwork Grid Background - Row 1 */}
          <div className="absolute top-0 left-0 w-full h-1/3 animate-flow-right-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.map((image, index) => (
                <div key={`benefits-row1-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover shadow-2xl opacity-40 hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Artwork Grid Background - Row 2 */}
          <div className="absolute top-1/3 left-0 w-full h-1/3 animate-flow-left-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.slice().reverse().map((image, index) => (
                <div key={`benefits-row2-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-48 md:w-64 object-cover shadow-2xl opacity-30 hover:opacity-50 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Artwork Grid Background - Row 3 */}
          <div className="absolute top-2/3 left-0 w-full h-1/3 animate-flow-right-slow">
            <div className="flex space-x-0 h-full">
              {artworkImages.map((image, index) => (
                <div key={`benefits-row3-${index}`} className="flex-shrink-0 h-full">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="h-full w-48 md:w-64 object-cover shadow-2xl opacity-20 hover:opacity-40 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="relative z-20 text-center mb-6 pt-2">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
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
            <div className="flex animate-slide-left-continuous space-x-4 sm:space-x-8 max-w-[100vw]">
               {/* Duplicate cards for seamless loop */}
               {[...Array(3)].map((_, setIndex) => (
                 <React.Fragment key={setIndex}>
                   
                   {/* Your Spotlight Moment */}
                   <div className="flex-shrink-0 w-56 sm:w-80">
                     <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur opacity-20"></div>
                       <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-3 sm:p-6 border border-white/40 shadow-xl">
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
                       <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-3 sm:p-6 border border-white/40 shadow-xl">
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
                       <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-3 sm:p-6 border border-white/40 shadow-xl">
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
                       <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-3 sm:p-6 border border-white/40 shadow-xl">
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
        
        <style>{`
          @keyframes slide-left-continuous {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          .animate-slide-left-continuous {
            animation: slide-left-continuous 30s linear infinite;
          }
        `}</style>
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-orange-200 mb-4">
              <Trophy className="h-4 w-4 mr-2 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Previous Competition <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Highlights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating incredible talent from our past competitions
            </p>
          </div>

          {/* Leaderboard Podium with Artworks - Larger */}
          <div className="mb-20 relative">
            
            {/* Mobile Stats Grid - Visible only on mobile */}
            <div className="block md:hidden mb-8">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users, number: "500+", label: "Participants", gradient: "from-blue-500 to-cyan-500", color: "text-blue-600" },
                  { icon: Gift, number: "₹50K", label: "Prize Pool", gradient: "from-green-500 to-emerald-500", color: "text-green-600" },
                  { icon: Star, number: "4.9★", label: "Rating", gradient: "from-purple-500 to-pink-500", color: "text-purple-600" },
                  { icon: Award, number: "100+", label: "Featured", gradient: "from-orange-500 to-red-500", color: "text-orange-600" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Side Cards - Hidden on mobile with Floating Animation */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
              <div className="space-y-4">
                {[
                  { icon: Users, number: "500+", label: "Participants Joined", gradient: "from-blue-500 to-cyan-500", color: "text-blue-600", delay: "0s" },
                  { icon: Gift, number: "₹25K", label: "Prize Distributed", gradient: "from-green-500 to-emerald-500", color: "text-green-600", delay: "1s" },
                  { icon: Star, number: "4.9★", label: "Success Rating", gradient: "from-purple-500 to-pink-500", color: "text-purple-600", delay: "2s" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 w-48 hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: stat.delay }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
              <div className="space-y-4">
                {[
                  { icon: Award, number: "100+", label: "Featured Artists", gradient: "from-orange-500 to-red-500", color: "text-orange-600", delay: "0.5s" },
                  { icon: Globe, number: "50K+", label: "Media Reach", gradient: "from-indigo-500 to-purple-500", color: "text-indigo-600", delay: "1.5s" },
                  { icon: BookOpen, number: "500+", label: "Certificates Issued", gradient: "from-teal-500 to-cyan-500", color: "text-teal-600", delay: "2.5s" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 w-48 hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: stat.delay }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-end justify-center gap-2 md:gap-12 mb-12 px-4">
              
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3 md:mb-6">
                  <img
                    src={baseArtworkImages[1]}
                    alt="2nd Place Artwork"
                    className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl border-2 md:border-6 border-gray-300"
                  />
                  <div className="absolute -top-1 -right-1 md:-top-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full flex items-center justify-center shadow-lg md:shadow-xl">
                    <span className="text-white font-bold text-xs md:text-lg">2</span>
                  </div>
                </div>
                <div className="w-28 h-20 md:w-48 md:h-32 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-xl md:shadow-2xl">
                  <span className="text-white font-black text-lg md:text-4xl">2nd</span>
                </div>
              </div>

              {/* 1st Place - Tallest */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3 md:mb-6">
                  <img
                    src={baseArtworkImages[0]}
                    alt="1st Place Artwork"
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl border-2 md:border-6 border-yellow-400"
                  />
                  <div className="absolute -top-1 -right-1 md:-top-4 md:-right-4 w-8 h-8 md:w-14 md:h-14 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-xl md:shadow-2xl">
                    <Trophy className="h-4 w-4 md:h-7 md:w-7 text-white" />
                  </div>
                </div>
                <div className="w-36 h-28 md:w-56 md:h-40 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-xl md:shadow-2xl relative">
                  <span className="text-white font-black text-2xl md:text-5xl">1st</span>
                  <div className="absolute -top-1 md:-top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-8 md:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Star className="h-2 w-2 md:h-4 md:w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3 md:mb-6">
                  <img
                    src={baseArtworkImages[2]}
                    alt="3rd Place Artwork"
                    className="w-20 h-20 md:w-36 md:h-36 object-cover rounded-xl md:rounded-3xl shadow-lg md:shadow-xl border-2 md:border-6 border-orange-400"
                  />
                  <div className="absolute -top-1 -right-1 md:-top-3 md:-right-3 w-5 h-5 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg md:shadow-xl">
                    <span className="text-white font-bold text-xs md:text-base">3</span>
                  </div>
                </div>
                <div className="w-24 h-16 md:w-44 md:h-28 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-xl md:rounded-t-3xl flex items-center justify-center shadow-lg md:shadow-xl">
                  <span className="text-white font-black text-sm md:text-3xl">3rd</span>
                </div>
              </div>
              
            </div>
            
            {/* Prize Pool Banner */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 md:gap-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl px-4 md:px-8 py-2 md:py-4 shadow-xl md:shadow-2xl">
                <Gift className="h-5 w-5 md:h-8 md:w-8 text-white" />
                <span className="text-lg md:text-2xl font-bold text-white">₹50K Prize Pool</span>
                <Trophy className="h-5 w-5 md:h-8 md:w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sliding Testimonials - Improved Mobile */}
        <div className="mb-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-4 md:mb-6 px-4">Artist Success Stories</h3>
          
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
                    <div key={`${setIndex}-${index}`} className="flex-shrink-0 w-64 md:w-80">
                      <div className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-white/30 relative">
                        {/* Verified Badge */}
                        <div className="absolute top-1 right-1 bg-green-500 text-white font-medium px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                          <CheckCircle className="h-2 w-2" />
                          <span className="text-xs">Verified</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 mt-2">
                          <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-xs md:text-sm">{testimonial.avatar}</span>
                          </div>
                          <div>
                            <div className="text-xs md:text-sm font-bold text-gray-900">{testimonial.name}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-2 w-2 md:h-3 md:w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 italic leading-tight">"{testimonial.quote}"</p>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Full Width Artwork Gallery - Improved Mobile */}
        <div className="overflow-hidden">
          <div className="flex animate-slide-right-fast space-x-2 md:space-x-4">
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {baseArtworkImages.map((image, index) => (
                  <div key={`gallery-${setIndex}-${index}`} className="flex-shrink-0">
                    <div className="relative group overflow-hidden rounded-xl md:rounded-2xl w-48 h-48 md:w-80 md:h-60">
                      <img
                        src={image}
                        alt={`Previous artwork ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-1 left-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-xs font-bold">🏆</div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        
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
            animation: testimonial-slide-fast 20s linear infinite;
          }
          
          .animate-slide-right-fast {
            animation: slide-right-fast 27s linear infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Testimonials Section - Moved here after Previous Competition Highlights */}
      <TestimonialsSection />
      
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
        <div className="overflow-hidden mb-8">
          <div className="flex animate-slide-left-continuous space-x-6">
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                  
                  {/* Funky Monkey */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">FM</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Funky Monkey</h3>
                      <p className="text-xs text-gray-600">Sponsor</p>
                    </div>
                  </div>

                  {/* Daami Event */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">DE</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Daami Event</h3>
                      <p className="text-xs text-gray-600">Event Management</p>
                    </div>
                  </div>

                  {/* Tenverse Media */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">TM</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Tenverse Media</h3>
                      <p className="text-xs text-gray-600">Sponsor</p>
                    </div>
                  </div>

                  {/* Sikkim Daily News */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">SDN</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Sikkim Daily News</h3>
                      <p className="text-xs text-gray-600">Media Partner</p>
                    </div>
                  </div>

                  {/* Cultural Department */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Cultural Dept. Sikkim</h3>
                      <p className="text-xs text-gray-600">Government Partner</p>
                    </div>
                  </div>

                  {/* Education Department */}
                  <div className="flex-shrink-0 w-48">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Education Dept. Sikkim</h3>
                      <p className="text-xs text-gray-600">Educational Partner</p>
                    </div>
                  </div>
                  
                </React.Fragment>
              ))}
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
        
        <style>{`
          @keyframes slide-left-continuous {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          .animate-slide-left-continuous {
            animation: slide-left-continuous 25s linear infinite;
          }
        `}</style>
      </section>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSectionV2 />
      </div>
      
      {/* Beautiful Registration Modal */}
      {!onRegistrationClick && (
        <Dialog open={showRegistrationDrawer} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
          <DialogContent hideClose className="sm:max-w-[720px] w-[92vw] sm:w-full max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-5 py-6 sm:px-8 sm:py-8 text-white relative">
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <DialogHeader className="p-0">
                      <DialogTitle className="text-2xl sm:text-3xl font-bold">🎨 Join Indian Creative Star</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm sm:text-base opacity-90 mt-1 truncate">Transform your art into national recognition</p>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={handleCloseModal}
                    className="shrink-0 rounded-full bg-white/15 hover:bg-white/25 transition-colors p-2 sm:p-2.5"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="px-5 py-6 sm:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="h-12 text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="mb-2 block">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        min={1}
                        max={120}
                        className="h-12 text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="mb-2 block">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-base appearance-none bg-white"
                    >
                      <option value="adult">Adult (18+ years)</option>
                      <option value="teen">Teen (13-17 years)</option>
                      <option value="child">Child (5-12 years)</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-4 sm:py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] text-base sm:text-lg"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                      Register Now
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
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
                <img
                  src="/company-logo.jpeg"
                  alt="Daami Event Logo"
                  className="w-full h-full object-cover"
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
