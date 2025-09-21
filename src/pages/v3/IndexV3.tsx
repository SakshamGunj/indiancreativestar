import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/LazyImage";
import { ArrowRight, Star, Trophy, Users, Award, CheckCircle, Palette, Heart, Gift, Globe, Zap, Target, X, Loader2, Clock, Shield, Camera, Play, ChevronDown, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface IndexV3Props {
  onRegistrationClick?: () => void;
}

const IndexV3 = ({ onRegistrationClick }: IndexV3Props) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 8, minutes: 23 });
  const [earlyBirdTime, setEarlyBirdTime] = useState({
    hours: 0,
    minutes: 59,
    seconds: 0,
  });
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    category: 'adult'
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const earlyBirdTimer = setInterval(() => {
      setEarlyBirdTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(earlyBirdTimer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  useEffect(() => {
    const createMobileBanner = () => {
      if (window.innerWidth >= 1024) return;
      
      const existingBanner = document.getElementById('mobile-sticky-banner-v3');
      if (existingBanner) existingBanner.remove();
      
      const banner = document.createElement('div');
      banner.id = 'mobile-sticky-banner-v3';
      banner.style.cssText = `
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 999999 !important;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%) !important;
        padding: 12px 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2) !important;
      `;
      
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="https://www.daamievent.com/Daami%20Presents%20(1920%20x%201080%20px)%20(1000%20x%201000%20px).png" alt="Indian Creative Star" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
          <div>
            <div style="color: white; font-weight: 700; font-size: 14px; line-height: 1.2;">Join National Art Competition</div>
            <div style="color: rgba(255,255,255,0.9); font-size: 12px;">Indian Creative Star Season 2</div>
          </div>
        </div>
        <button id="mobile-register-btn-v3" style="
          background: white !important;
          color: #ff6b6b !important;
          font-weight: 700 !important;
          padding: 10px 20px !important;
          border-radius: 25px !important;
          border: none !important;
          font-size: 13px !important;
          cursor: pointer !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
        ">Join Now</button>
      `;
      
      document.body.appendChild(banner);
      
      const registerBtn = document.getElementById('mobile-register-btn-v3');
      if (registerBtn) {
        registerBtn.onclick = () => handleRegisterClick();
      }
    };
    
    createMobileBanner();
    window.addEventListener('resize', createMobileBanner);
    
    return () => {
      const banner = document.getElementById('mobile-sticky-banner-v3');
      if (banner) banner.remove();
      window.removeEventListener('resize', createMobileBanner);
    };
  }, []);

  const handleRegisterClick = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      setShowRegistrationModal(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let category = "Adult";
      const age = parseInt(formData.age);
      if (age >= 5 && age <= 8) {
        category = "Group A (5-8 years)";
      } else if (age >= 9 && age <= 12) {
        category = "Group B (9-12 years)";
      } else if (age >= 13 && age <= 17) {
        category = "Group C (13-17 years)";
      }

      const participantData = {
        name: formData.name,
        age: parseInt(formData.age),
        whatsapp: formData.phone,
        email: formData.email,
        instagram: "",
        contestType: "art",
        category: category
      };

      const { addParticipant } = await import("@/lib/firebase");
      const result = await addParticipant(participantData);

      if (result.success) {
        setShowRegistrationModal(false);

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

        qp.append("from", "/indiancreativestar/v3");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const artworkImages = [
    "https://i.ibb.co/WvDdnrrp/ba50688142d1.jpg",
    "https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg",
    "https://i.ibb.co/1tfb4qTq/1753870691007.jpg",
    "https://i.ibb.co/hRF9fSgq/IMG-20250710-133728.jpg",
    "https://i.ibb.co/5g7k8VTJ/4ae89184da7e.jpg",
    "https://i.ibb.co/tM7Z9mXc/4ee7930e6f86.jpg"
  ];

  const CreativeStarsSection = () => {
    const winners = [
      {
        place: 1,
        rank: "1st",
        title: "Gold Star",
        name: "Yog Raj Gurung",
        artistImage: "https://www.daamievent.com/WhatsApp%20Image%202025-09-08%20at%2020.31.58.jpeg",
        artworkImage: artworkImages[0],
        order: "md:order-2",
        podiumHeight: "md:h-48",
        gradient: "from-yellow-400 to-amber-500",
        shadow: "shadow-yellow-500/50",
        borderColor: "border-yellow-400",
        textColor: "text-yellow-900",
        badge: "🏆"
      },
      {
        place: 2,
        rank: "2nd",
        title: "Silver Star",
        name: "Chogyal Lama Grangdan",
        artistImage: "https://www.daamievent.com/image.dslr2.jpg",
        artworkImage: artworkImages[1],
        order: "md:order-1",
        podiumHeight: "md:h-40",
        gradient: "from-slate-300 to-gray-400",
        shadow: "shadow-gray-500/50",
        borderColor: "border-gray-400",
        textColor: "text-gray-800",
        badge: "🥈"
      },
      {
        place: 3,
        rank: "3rd",
        title: "Bronze Star",
        name: "Shashi Bhusan Thakur",
        artistImage: "https://www.daamievent.com/WhatsApp%20Image%202025-09-08%20at%2017.20.43.jpeg",
        artworkImage: artworkImages[2],
        order: "md:order-3",
        podiumHeight: "md:h-32",
        gradient: "from-orange-400 to-amber-600",
        shadow: "shadow-orange-500/50",
        borderColor: "border-orange-500",
        textColor: "text-orange-900",
        badge: "🥉"
      }
    ];

    return (
      <section id="creative-stars" className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Season 1 Success Story 🚀
            </h2>
            <p className="text-lg text-gray-600">Celebrating our Sikkim Creative Stars</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { number: "300+", label: "Artists Participated", emoji: "🎨" },
              { number: "₹50K", label: "Prizes Distributed (S1)", emoji: "💰", subtext: "Total Till Now: ₹300K+" },
              { number: "4.9★", label: "Success Rating", emoji: "⭐" },
              { number: "6", label: "Creative Stars Found", emoji: "🏆" }
            ].map((stat: any, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex-grow">
                  <div className="text-2xl sm:text-3xl mb-2">{stat.emoji}</div>
                  <div className="text-xl sm:text-2xl font-black text-gray-900">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
                </div>
                {stat.subtext && <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">{stat.subtext}</div>}
              </div>
            ))}
          </div>

          {/* Winners Podium - V4 Style */}
          <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-8">Our Creative Stars ✨</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-end">
              {winners.map((winner) => (
                <div
                  key={winner.place}
                  className={`${winner.order} flex flex-col items-center`}
                >
                  {/* Mobile Layout: Simplified Card */}
                  <div className="md:hidden w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 mb-4 border-t-4 border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center w-20">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${winner.gradient} flex items-center justify-center text-3xl shadow-md`}>
                          {winner.badge}
                        </div>
                        <div className={`text-center text-3xl font-black ${winner.textColor}`}>{winner.rank}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold ${winner.textColor}`}>{winner.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{winner.title}</p>
                        <div className={`mt-2 w-16 h-16 rounded-lg overflow-hidden border-2 ${winner.borderColor}`}>
                          <img src={winner.artistImage} alt={`${winner.rank} Place Artist`} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className={`w-28 h-40 rounded-lg overflow-hidden border-2 ${winner.borderColor}`}>
                        <img src={winner.artworkImage} alt={`${winner.rank} Place Artwork`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout: Podium Style */}
                  <div className="hidden md:flex flex-col items-center text-center">
                    <div className={`bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs relative border-t-4 ${winner.borderColor}`}>
                      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${winner.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                        {winner.badge}
                      </div>
                      <div className={`mt-8 mb-3 w-20 h-20 rounded-full overflow-hidden mx-auto border-4 ${winner.borderColor} shadow-md`}>
                        <img src={winner.artistImage} alt={`${winner.rank} Place Artist`} className="w-full h-full object-cover" />
                      </div>
                      <h4 className={`text-xl font-bold ${winner.textColor}`}>{winner.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{winner.title}</p>
                      <div className={`mt-4 h-48 rounded-lg overflow-hidden border-2 ${winner.borderColor}`}>
                        <img src={winner.artworkImage} alt={`${winner.rank} Place Artwork`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className={`w-full max-w-xs ${winner.podiumHeight} bg-gradient-to-r ${winner.gradient} rounded-b-xl shadow-inner flex items-center justify-center`}>
                      <span className={`text-4xl font-black text-white text-opacity-80`}>{winner.rank}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Achievement Banner */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl px-6 py-4 text-white shadow-lg">
                <span className="text-2xl">🎉</span>
                <span className="font-bold text-lg">Season 1: 6 Creative Stars Discovered!</span>
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="https://www.daamievent.com/Daami%20Presents%20(1920%20x%201080%20px)%20(1000%20x%201000%20px).png" alt="Indian Creative Star" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Indian Creative Star</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#prizes" className="text-gray-700 hover:text-gray-900 font-medium">Prizes</a>
              <a href="#gallery" className="text-gray-700 hover:text-gray-900 font-medium">Gallery</a>
              <a href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</a>
              <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-semibold">
                Join Now
              </Button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="px-4 py-3 space-y-3">
                <a href="#prizes" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-gray-900 font-medium py-2">
                  Prizes
                </a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-gray-900 font-medium py-2">
                  Gallery
                </a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-gray-900 font-medium py-2">
                  FAQ
                </a>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleRegisterClick();
                  }} 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold mt-2"
                >
                  Join Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="pt-16 pb-6 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"></div>
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-5 text-center lg:text-left">
              
              {/* Main Headline */}
              <div className="space-y-3 mt-6">
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                  Win <span className="text-green-600">₹50,000</span> in<br/>
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    India's Biggest
                  </span><br/>
                  <span className="text-gray-900">Art Competition</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Join <span className="font-bold text-blue-600">1000+ artists</span> competing for national recognition and cash prizes.
                </p>
              </div>

              {/* Enhanced Social Proof - Mobile Optimized */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="space-y-4">
                  {/* Artist Avatars Row */}
                  <div className="flex justify-center">
                    <div className="flex -space-x-3">
                      {[
                        "/WhatsApp Image 2025-09-08 at 17.20.43.jpeg",
                        "/WhatsApp Image 2025-09-08 at 17.41.27.jpeg",
                        "/WhatsApp Image 2025-09-08 at 20.31.58.jpeg",
                        "/WhatsApp Image 2025-09-08 at 21.35.50.jpeg",
                        "/image.dslr2.jpg"
                      ].map((image, i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
                          <LazyImage src={image} alt={`Artist ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <div className="font-bold text-gray-900 text-lg">500+ Artists</div>
                      <div className="text-yellow-600 font-semibold text-sm">⭐⭐⭐⭐⭐ 4.9/5</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-4xl font-black text-green-600">₹50K</div>
                      <div className="text-gray-600 text-sm">Prize Pool</div>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center justify-center gap-3 text-gray-800 text-sm font-semibold">
                          <div className="flex items-center gap-1">
                            <Shield className="h-5 w-5 text-green-600" />
                            <Award className="h-5 w-5 text-blue-600" />
                          </div>
                          <span>Get Culture Department Government verified certificate and artist ID card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-2xl transition-all w-full"
                >
                  🎨 REGISTER NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <a href="#creative-stars" className="w-full">
                  <Button variant="outline" className="w-full px-6 py-4 rounded-full font-bold border-2 border-gray-300 hover:border-gray-400">
                    <Play className="mr-2 h-5 w-5" />
                    🏆 Watch Winners
                  </Button>
                </a>
              </div>



            </motion.div>

            {/* Right Visual - Mobile Optimized */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mt-6 lg:mt-0">
              {/* Main Prize Display */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-yellow-200 relative mx-2 sm:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-50 rounded-2xl sm:rounded-3xl"></div>
                
                <div className="relative z-10 text-center space-y-3 sm:space-y-4">
                  {/* YouTube Video Embed */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src="https://www.youtube.com/embed/IkDZIkiXIj4?si=VT82dwlMfFAF7Q-z"
                      title="Indian Creative Star Competition Video"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Creative Manifesto */}
                  <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-4 sm:p-6 text-white mt-4">
                    <div className="text-center">
                      <h3 className="text-sm sm:text-base font-bold mb-3 text-yellow-400">OUR CREATIVE MANIFESTO</h3>
                      <blockquote className="text-sm sm:text-base italic leading-relaxed">
                        "They told your dreams don't pay,<br/>
                        but your brush had more to say.<br/>
                        What you create alone — the nation will now celebrate.<br/>
                        <span className="text-yellow-300 font-semibold">India has millions of stories. Let yours rise today.</span>"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* India #1 Badge - Outside container */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-black animate-bounce shadow-lg z-20">
                India #1 🏆
              </div>

              {/* Countdown Timer - Mobile Optimized */}
              <div className="mt-3 sm:mt-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-center shadow-xl mx-2 sm:mx-0">
                <div className="text-xs sm:text-sm font-bold mb-2 opacity-90">Early Bird Registration Ends In:</div>
                <div className="flex justify-center gap-2 sm:gap-3">
                  <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1 sm:py-2 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-black">{String(earlyBirdTime.hours).padStart(2, '0')}</div>
                    <div className="text-xs font-bold opacity-80">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1 sm:py-2 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-black">{String(earlyBirdTime.minutes).padStart(2, '0')}</div>
                    <div className="text-xs font-bold opacity-80">Mins</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1 sm:py-2 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-black">{String(earlyBirdTime.seconds).padStart(2, '0')}</div>
                    <div className="text-xs font-bold opacity-80">Secs</div>
                  </div>
                </div>
                <div className="text-xs font-bold mt-2 opacity-90">⚡ Don't Miss Out!</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar - Enhanced Design */}
      <section className="py-3 sm:py-8 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto max-w-6xl px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-lg sm:text-3xl font-black text-green-400 mb-0.5 sm:mb-1">₹249</div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">Entry Fee</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-lg sm:text-3xl font-black text-blue-400 mb-0.5 sm:mb-1">No Limit</div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">Age Limit</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-lg sm:text-3xl font-black text-purple-400 mb-0.5 sm:mb-1">Open</div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">Theme</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-lg sm:text-3xl font-black text-orange-400 mb-0.5 sm:mb-1">272</div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">Seats Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join - V3 Style */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Who Can Join?
            </h2>
            <p className="text-lg text-gray-600">Artists & Parents - Everyone Wins!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Artists</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Win from ₹50K prize pool</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">National recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Professional feedback</span>
                </div>
              </div>
              
              <Button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full font-bold">
                🎨 Join as Artist
              </Button>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Parents</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Boost child's confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Portfolio enhancement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Recognition beyond school</span>
                </div>
              </div>
              
              <Button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-full font-bold">
                👨‍👩‍👧‍👦 Register Child
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us - V3 Style */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Our Story 📖
            </h2>
            <p className="text-lg text-gray-600">Discover what makes us special</p>
          </div>

          {/* Mobile Image - Show only on mobile */}
          <div className="lg:hidden mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <LazyImage
                src="https://www.daamievent.com/WhatsApp%20Image%202025-09-09%20at%2011.03.00.jpeg"
                alt="Government of Sikkim Support"
                className="w-full h-auto rounded-xl"
              />
              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-gray-900">Government of Sikkim</div>
                <div className="text-xs text-gray-600">Official Support Certificate</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are <span className="font-bold text-orange-600">Daami Event</span>, an emerging event firm, and proud organizers of <span className="font-bold text-blue-600">Indian Creative Star (Art Competition) – Season 2</span>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our journey began with <span className="font-bold text-purple-600">Sikkim Creative Star (Art Competition) – Season 1</span>, where <span className="font-bold text-green-600">300+ artists registered</span> and we discovered <span className="font-bold text-yellow-600">6 Creative Stars</span>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are <span className="font-bold text-red-600">officially supported by Government of Sikkim</span>, which adds credibility to our events.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Our mission: <span className="text-orange-600">discover and celebrate Creative Stars across India</span>.
                </p>
              </div>
              
            </motion.div>

            {/* Right Image - Desktop Only */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="text-center hidden lg:block">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <LazyImage
                  src="https://www.daamievent.com/WhatsApp%20Image%202025-09-09%20at%2011.03.00.jpeg"
                  alt="Government of Sikkim Support"
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-4 text-center">
                  <div className="text-sm font-bold text-gray-900">Government of Sikkim</div>
                  <div className="text-xs text-gray-600">Official Support Certificate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes - V3 Style */}
      <section id="prizes" className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Win Big Prizes! 💰
            </h2>
            <p className="text-lg text-gray-600 mb-6">₹50,000 total prize pool waiting for you</p>
            <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold">
              🎯 Claim Your Prize
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Adult Prizes */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">👨‍🎨</div>
                <h3 className="text-xl font-bold text-gray-900">Adult Competition</h3>
                <p className="text-gray-600">18+ Years • ₹30,000 Pool</p>
              </div>
              
              <div className="flex justify-center items-end gap-4 mb-6">
                <div className="text-center">
                  <div className="w-12 h-16 bg-gray-300 rounded-t-lg flex items-center justify-center mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="font-bold text-gray-700">₹10K</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-20 bg-yellow-400 rounded-t-lg flex items-center justify-center mb-2 relative">
                    <span className="text-white font-bold text-lg">1</span>
                    <div className="absolute -top-2 text-xl">🏆</div>
                  </div>
                  <div className="font-bold text-yellow-600">₹15K</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-400 rounded-t-lg flex items-center justify-center mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="font-bold text-orange-600">₹5K</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-center font-bold text-gray-800 mb-3">Bonus Rewards</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>🌟 National Fame</div>
                  <div>📖 Magazine Feature</div>
                  <div>🎁 Surprise Box</div>
                  <div>⚡ Mystery Gift</div>
                </div>
              </div>
            </motion.div>

            {/* Kids Prizes */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">👶🎨</div>
                <h3 className="text-xl font-bold text-gray-900">Kids Competition</h3>
                <p className="text-gray-600">5-17 Years • ₹20,000 Pool</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧒</div>
                    <div>
                      <div className="font-bold text-gray-800">Age 5-8</div>
                      <div className="text-sm text-gray-600">Little Artists</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">₹5K</div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">👦</div>
                    <div>
                      <div className="font-bold text-gray-800">Age 9-12</div>
                      <div className="text-sm text-gray-600">Young Creators</div>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600">₹5K</div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧑</div>
                    <div>
                      <div className="font-bold text-gray-800">Age 13-17</div>
                      <div className="text-sm text-gray-600">Teen Artists</div>
                    </div>
                  </div>
                  <div className="font-bold text-purple-600">₹10K</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-center font-bold text-gray-800 mb-3">All Kids Get</div>
                <div className="flex justify-center gap-4 text-sm">
                  <div>📖 Magazine</div>
                  <div>🎁 Gift Box</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
              ⏰ Only {timeLeft.days} days left to win!
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Banner Section */}
      <section className="py-4">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="relative rounded-2xl p-4 sm:p-6 text-center overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-glow"></div>
            <div className="relative z-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 sm:h-12 sm:w-12 text-white/80" />
              </div>
              <p className="text-sm sm:text-xl font-bold text-white">
                Every participant will get an Official Certificate & Artist ID Card
              </p>
              <div className="flex-shrink-0">
                  <img src="https://www.daamievent.com/Daami%20Presents%20(1920%20x%201080%20px)%20(1000%20x%201000%20px).png" alt="Daami Presents" className="h-8 w-8 sm:h-12 sm:w-12 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - V3 Style */}

      <CreativeStarsSection />

      {/* Review Screenshots - Compact */}
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

      {/* Artist Success Stories - Sliding V3 Style */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Artist Success Stories 🎨
            </h2>
            <p className="text-lg text-gray-600">Real testimonials from Season 1 participants</p>
          </div>
          
          {/* Sliding Testimonials */}
          <div className="overflow-hidden">
            <div className="flex animate-slide-testimonials space-x-6">
              {[
                ...Array(2)
              ].flatMap((_, setIndex) =>
                [
                  { name: "Anjali Sharma", quote: "Very professional management! My daughter participated and felt so motivated. Finally, an art platform that respects young talent.", avatar: "A", gradient: "from-purple-500 to-pink-500" },
                  { name: "Rizwan Khan", quote: "As an artist, I joined Sikkim Creative Star Season 1 and now I'm here again for Season 2. The team keeps improving every year. Excited!", avatar: "R", gradient: "from-blue-500 to-cyan-500" },
                  { name: "Priya Das", quote: "Honestly, I didn't expect such smooth coordination. From registration to updates, everything was managed really well. Great job, Daami Event!", avatar: "P", gradient: "from-green-500 to-emerald-500" },
                  { name: "Arvind Mehta", quote: "This competition is not just about prizes, it's about recognition. Artists finally have a stage where their creativity is valued.", avatar: "A", gradient: "from-orange-500 to-red-500" },
                  { name: "Meera Kapoor", quote: "My son participated, and I was amazed at the exposure he got. It really boosts children's confidence to see their art celebrated.", avatar: "M", gradient: "from-indigo-500 to-purple-500" },
                  { name: "Sana Fatima", quote: "I joined this competition because I believe art needs recognition. The organizers actually care about artists, and that makes a big difference.", avatar: "S", gradient: "from-pink-500 to-rose-500" },
                  { name: "Deepak Joshi", quote: "Season 1 had 300+ artists, and I was one of them. The way winners were celebrated was inspiring. Can't wait for Season 2 results!", avatar: "D", gradient: "from-teal-500 to-cyan-500" }
                ].map((testimonial, index) => (
                  <motion.div key={`${setIndex}-${index}`} className="flex-shrink-0 w-72">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative h-full">
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ✓ Verified
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-yellow-400">
                            ★★★★★
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes slide-testimonials {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          .animate-slide-testimonials {
            animation: slide-testimonials 40s linear infinite;
          }

          @media (max-width: 767px) {
            .animate-slide-testimonials {
              animation-duration: 15s;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-slide-testimonials {
              animation: none !important;
            }
          }

          @keyframes gradient-glow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-glow {
            background-size: 200% 200%;
            animation: gradient-glow 5s ease infinite;
          }
          
          .column-span-2 {
            column-span: all;
            break-inside: avoid;
          }
          
          @media (min-width: 768px) {
            .column-span-2 {
              column-span: 2;
            }
          }
          
          @media (min-width: 1024px) {
            .column-span-2 {
              column-span: 2;
            }
          }
        `}</style>
      </section>

      {/* Prize Distribution Ceremony - Season 1 */}
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

      {/* Winners Gallery */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Winners Gallery 🎨
            </h2>
            <p className="text-lg text-gray-600">Amazing artwork from our past competitions</p>
          </div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
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
              "https://i.ibb.co/wN8gm9Zh/1000077393.jpg"
            ].map((image, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="relative group break-inside-avoid mb-4">
                <div className="overflow-hidden rounded-xl">
                  <LazyImage src={image} alt={`Artwork ${i + 1}`} className="w-full h-auto object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Trophy className="h-6 w-6 mb-1" />
                      <div className="font-bold text-sm">Winner</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-3xl font-bold text-gray-900">300+</div>
              <div className="text-gray-600">Artists participated in Season 1</div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews - V3 Style */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              What Our Artists Say 🌟
            </h2>
            <p className="text-lg text-gray-600">Hear from the talented artists who have participated in our competitions</p>
          </div>
          
          {/* Google Reviews Masonry Layout - Desktop: 4 columns with natural flow */}
          <div className="hidden lg:block">
            <div className="columns-4 gap-6 space-y-6">
              {[
                { name: "Nimesh Rai", rating: 5, date: "08/09/2025", review: "This competition was a wonderful experience for me. I not only got a chance to showcase my art but also learned so much throughout the journey. Winning in Group C (13–17) feels truly special, and I'm grateful to the organisers for giving us this platform. Thank you to everyone who supported me!" },
                { name: "Satish Paswan", rating: 5, date: "09/09/2025", review: "It was a wonderful experience participating in this creative art competition. The platform gave artists like me an opportunity to express our creativity and showcase our talent to a wider audience. The organization was smooth, the guidelines were clear, and the process was well-structured." },
                { name: "Pramita Pradhan", rating: 4, date: "08/09/2025", review: "This was my first art competition, and as a beginner who loves painting, the experience has been truly wonderful. The organisers, Daami Event, provided us with a great opportunity and an amazing platform for artists to showcase their work and be seen." },
                { name: "Gracy Kami (Ghimiray)", rating: 5, date: "08/09/2025", review: "Thank you for giving us this opportunity 🙏🙏 I really enjoyed it ☺️ I want to participate in future also 🙏🙏🙏." },
                { name: "Shashi Bhusan Thakur", rating: 5, date: "08/09/2025", review: "I got excellent platform for my Art work and recognise with all. Thank you so much." },
                { name: "Kishor Chettri", rating: 4, date: "08/09/2025", review: "Everything was good but the thing is painting and pencil sketches cannot compete in one stage like painting should have a different group and sketch should have a different group because painting will always have an upper hand." },
                { name: "Aakriti Thakur", rating: 5, date: "08/09/2025", review: "Very good opportunity for kids, thank you." },
                { name: "Mngma Tamang", rating: 4, date: "08/09/2025", review: "It was really good ,and it can help us to next competitive level thankyou to daami events" },
                { name: "Yonten Phuntshok Tamang", rating: 5, date: "08/09/2025", review: "It was too good" },
                { name: "Ojashwi Pakhrin", rating: 4, date: "08/09/2025", review: "Thank you for this wonderful opportunity to represent myself. In my opinion next time there should also be a second and third place in the kids category.With reference to the adult category." },
                { name: "Kewal Rai", rating: 4, date: "09/09/2025", review: "You guys are doing great just keep organising competition like this so artist's can improve more" },
                { name: "Biswajyoti Sarma", rating: 5, date: "09/09/2025", review: "Good experience" }
              ].map((review, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="break-inside-avoid mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative mb-4">
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <span className="text-xs font-bold text-blue-600">G</span>
                      <span className="text-xs text-gray-500">Google</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{review.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-yellow-400">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm">"{review.review}"</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</span>
                        <span>Verified by Google Reviews</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Masonry Layout - 2 columns with natural flow */}
          <div className="lg:hidden">
            <div className="columns-2 gap-4 space-y-4">
              {[
                { name: "Nimesh Rai", rating: 5, date: "08/09/2025", review: "This competition was a wonderful experience for me. I not only got a chance to showcase my art but also learned so much throughout the journey. Winning in Group C (13–17) feels truly special, and I'm grateful to the organisers for giving us this platform. Thank you to everyone who supported me!" },
                { name: "Satish Paswan", rating: 5, date: "09/09/2025", review: "It was a wonderful experience participating in this creative art competition. The platform gave artists like me an opportunity to express our creativity and showcase our talent to a wider audience. The organization was smooth, the guidelines were clear, and the process was well-structured." },
                { name: "Pramita Pradhan", rating: 4, date: "08/09/2025", review: "This was my first art competition, and as a beginner who loves painting, the experience has been truly wonderful. The organisers, Daami Event, provided us with a great opportunity and an amazing platform for artists to showcase their work and be seen." },
                { name: "Gracy Kami (Ghimiray)", rating: 5, date: "08/09/2025", review: "Thank you for giving us this opportunity 🙏🙏 I really enjoyed it ☺️ I want to participate in future also 🙏🙏🙏." },
                { name: "Shashi Bhusan Thakur", rating: 5, date: "08/09/2025", review: "I got excellent platform for my Art work and recognise with all. Thank you so much." },
                { name: "Kishor Chettri", rating: 4, date: "08/09/2025", review: "Everything was good but the thing is painting and pencil sketches cannot compete in one stage like painting should have a different group and sketch should have a different group because painting will always have an upper hand." },
                { name: "Aakriti Thakur", rating: 5, date: "08/09/2025", review: "Very good opportunity for kids, thank you." },
                { name: "Mngma Tamang", rating: 4, date: "08/09/2025", review: "It was really good ,and it can help us to next competitive level thankyou to daami events" },
                { name: "Yonten Phuntshok Tamang", rating: 5, date: "08/09/2025", review: "It was too good" },
                { name: "Ojashwi Pakhrin", rating: 4, date: "08/09/2025", review: "Thank you for this wonderful opportunity to represent myself. In my opinion next time there should also be a second and third place in the kids category.With reference to the adult category." },
                { name: "Kewal Rai", rating: 4, date: "09/09/2025", review: "You guys are doing great just keep organising competition like this so artist's can improve more" },
                { name: "Biswajyoti Sarma", rating: 5, date: "09/09/2025", review: "Good experience" }
              ].map((review, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="break-inside-avoid mb-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 relative mb-3">
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                      <span className="text-xs font-bold text-blue-600">G</span>
                      <span className="text-xs text-gray-500">Google</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 pr-16">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {review.name[0]}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="font-bold text-gray-900 text-sm truncate">{review.name}</div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <div className="text-yellow-400 text-xs flex-shrink-0">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                          </div>
                          <span className="text-xs text-gray-500 truncate">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-xs">"{review.review}"</p>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</span>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl px-6 py-3 text-white shadow-lg">
              <span className="text-2xl">🌟</span>
              <span className="font-bold">4.8/5 Average Rating on Google Reviews</span>
              <span className="text-2xl">📱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Support - V3 Style */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Trusted Partners 🤝
            </h2>
            <p className="text-lg text-gray-600">Government-backed & media supported</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Funky Monkey", emoji: "🐵" },
              { name: "Daami Event", emoji: "🎉" },
              { name: "Tenverse Media", emoji: "📺" },
              { name: "Sikkim Daily", emoji: "📰" },
              { name: "Cultural Dept.", emoji: "🏢" },
              { name: "Education Dept.", emoji: "🏫" }
            ].map((partner, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-3 bg-white rounded-xl border border-gray-100">
                <div className="text-2xl mb-2">{partner.emoji}</div>
                <h3 className="font-bold text-gray-900 text-xs">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              <Shield className="h-4 w-4" />
              Government Certified Competition
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - V3 Style */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Everyone Gets Something! 🎉
            </h2>
            <p className="text-lg text-gray-600">No one goes home empty-handed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🌟", title: "50K+ Exposure", desc: "Featured in our showcase" },
              { emoji: "📜", title: "Official Certificate", desc: "LinkedIn-worthy credentials" },
              { emoji: "👥", title: "Artist Network", desc: "1000+ verified artists" },
              { emoji: "⚡", title: "VIP Access", desc: "First to know opportunities" }
            ].map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{benefit.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Offer Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-red-500 mb-2">Limited Time Offer</h2>
            <p className="text-lg text-gray-600 mb-6">Only 135 Slots Left!</p>

            <div className="text-2xl font-bold text-gray-800 mb-4">
              Early Bird Registration Ends In
            </div>
            
            <div className="flex justify-center items-center space-x-2 text-4xl font-mono text-gray-900 mb-6">
              <div className="bg-gray-200 p-4 rounded-lg">
                <span>{String(earlyBirdTime.hours).padStart(2, '0')}</span>
              </div>
              <span>:</span>
              <div className="bg-gray-200 p-4 rounded-lg">
                <span>{String(earlyBirdTime.minutes).padStart(2, '0')}</span>
              </div>
              <span>:</span>
              <div className="bg-gray-200 p-4 rounded-lg">
                <span>{String(earlyBirdTime.seconds).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(135/230)*100}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mb-6">135 slots remaining out of 230</p>
            
            <p className="text-gray-700 mb-6">Artists are registering fast! Secure your spot now before it's too late.</p>

            <Button onClick={handleRegisterClick} size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg">
              Register Now
            </Button>
            <p className="text-sm text-gray-500 mt-4">Join thousands of artists who have already registered</p>
          </div>
        </div>
      </section>

      {/* FAQ - V3 Style */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Got Questions? 🤔
            </h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Who can join?", a: "Anyone aged 5+. We have categories for all age groups." },
              { q: "Entry fee?", a: "Just ₹249 for all categories. Covers everything!" },
              { q: "What art types?", a: "All visual art - paintings, drawings, digital, sketches, mixed media." },
              { q: "How is judging done?", a: "Expert panel + public voting. Fair & transparent process." },
              { q: "When are results?", a: "Within 2-3 weeks after deadline. WhatsApp + email notification." },
              { q: "What do winners get?", a: "Cash from ₹50K pool + certificates + recognition + magazine feature." }
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="font-bold text-gray-900 mb-2">{faq.q}</div>
                <div className="text-gray-600">{faq.a}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold">
              Still Have Questions? Register & Ask! 💬
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Become India's Next Creative Star?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ artists competing for ₹50,000 prize pool
          </p>
          <Button onClick={handleRegisterClick} size="lg" className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg">
            🎨 Register Now - Only ₹249
          </Button>
          <div className="mt-4 text-sm opacity-75">
            ⏰ Registration closes in {timeLeft.days} days
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 pb-20 md:pb-12">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">🎨</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Daami Event</h3>
              <p className="text-gray-400 text-sm">Event Management Company</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Empowering Artists Nationwide</p>
          <p className="text-gray-500 text-sm">© 2025 Daami Event. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Registration Modal - V5 Style */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="w-[95vw] max-w-lg mx-auto bg-white p-0 rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-t-2xl">
            <DialogHeader>
              <div className="text-center">
                <DialogTitle className="text-xl font-black text-gray-900">
                  Join <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Indian Creative Star: Season 2</span>
                </DialogTitle>
                <p className="text-sm text-gray-600 font-medium">
                  National Art Competition & Become the <span className="font-bold text-orange-500">Next Creative Star</span>
                </p>
              </div>
            </DialogHeader>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="pl-10 h-11 bg-gray-50" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age</Label>
                  <div className="relative">
                    <Gift className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="Your Age" className="pl-10 h-11 bg-gray-50" min={1} max={120} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">WhatsApp</Label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp Number" className="pl-10 h-11 bg-gray-50" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" className="pl-10 h-11 bg-gray-50" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</>
                ) : (
                  <>🎨 Register Now - ₹249<ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
              
              <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure payment & data privacy</span>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndexV3;