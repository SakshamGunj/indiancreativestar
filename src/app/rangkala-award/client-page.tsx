"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, PlayCircle, Trophy, Globe, Lock, 
  ChevronDown, CheckSquare, AlertTriangle, ArrowBigRight, Paintbrush,
  Eye, Award, Users, Camera, Newspaper, Gift, Star
} from "lucide-react";
import Link from 'next/link';

// Standard Hormozi/Brunson direct response colors: 
// #d9232d (Red/Alert), #fbbf24 (Amber/Gold), #111827 (Dark BG)

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-700/50 mb-2 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-3 md:px-5 md:py-3 flex justify-between items-center focus:outline-none"
      >
        <h4 className="font-header font-bold text-sm md:text-base text-white pr-3 md:pr-4">{question}</h4>
        <ChevronDown className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 py-3 md:px-5 md:py-3 text-gray-300 text-sm md:text-base bg-black/20 font-body leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RangKalaAward() {
  const [spotsLeft, setSpotsLeft] = useState(12);

  // Fake countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSpotsLeft(prev => prev > 2 ? prev - 1 : prev);
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* Injecting High-Converting Fonts - Montserrat Header, Inter Body */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800;900&display=swap');
        .font-header { font-family: 'Montserrat', sans-serif; letter-spacing: -0.5px; }
        .font-body { font-family: 'Inter', sans-serif; }
        .highlight-yellow {
          background: linear-gradient(180deg, transparent 50%, rgba(253, 224, 71, 0.4) 50%);
          display: inline;
        }
        @keyframes custom-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: custom-float 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* SCARCITY BAR */}
      <div className="bg-red-600 text-white font-header font-bold text-center py-1.5 px-1 sm:px-2 shadow-[0_5px_20px_rgba(220,38,38,0.4)] sticky top-0 z-50 flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm tracking-wide">
        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse shrink-0" />
        <span className="uppercase text-center leading-tight">WARNING: REGISTRATION STRICTLY CAPPED AT 350 PARTICIPANTS</span>
        <span className="font-mono bg-black/30 px-1.5 py-0.5 rounded text-amber-300 tracking-wider whitespace-nowrap text-[10px] sm:text-xs ml-1 sm:ml-2">
          (ONLY {spotsLeft} SPOTS LEFT)
        </span>
      </div>

      {/* 1. HERO / VSL SECTION */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10 px-2 sm:px-4">
        <div className="container mx-auto max-w-4xl text-center">
          
          {/* Eyebrow / Brand Identity */}
          <div className="inline-block border-b-2 border-amber-500 pb-1 mb-3 sm:mb-4 max-w-full">
            <p className="font-header text-amber-400 font-black tracking-widest uppercase text-[11px] sm:text-xs md:text-sm drop-shadow-md break-words flex items-center justify-center gap-2">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-300" /> THE RANG KALA AWARDS — 100% ONLINE EVENT
            </p>
          </div>

          {/* Main Headline & Trophy Split (Optimized for Online Event Narrative) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 mb-8 sm:mb-10 max-w-6xl mx-auto">
            <div className="flex-1 text-center md:text-left z-10 space-y-4">
              <h1 className="font-header text-[26px] sm:text-3xl md:text-4xl lg:text-[42px] font-black leading-[1.05] sm:leading-[1.1] text-white uppercase tracking-tighter">
                Compete From Home, Win Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 underline decoration-double decoration-amber-500/50">Golden Trophies</span>, And Build Worldwide Authority As An Artist... 
                <br className="hidden md:block" />
                <span className="text-red-500 italic mt-2 md:mt-3 inline-block drop-shadow-lg text-lg sm:text-xl md:text-2xl lg:text-[28px] break-words">Without Any Hidden Fees!</span>
              </h1>
              <p className="font-body text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed px-1 sm:px-0">
                Most "online" art shows trick you. They lure you in digitally, but if you win, they charge insane delivery fees just to ship your own award. The Rang Kala Awards is entirely different. <span className="highlight-yellow font-bold text-white px-1 leading-relaxed">Watch the short video below</span> to see exactly why we strictly cap entries to 350 artists.
              </p>
            </div>

            {/* The Physical Trophy Anchor (Social Proof / Desire Trigger) */}
            <div className="flex-shrink-0 relative w-48 sm:w-64 md:w-80 lg:w-[360px] xl:w-[400px] group order-first md:order-last mt-6 sm:mt-12 md:mt-8 mb-6 md:mb-0">
              {/* Glowing Aura Effect */}
              <div className="absolute inset-0 bg-amber-500/30 blur-[70px] rounded-full mix-blend-screen group-hover:bg-amber-400/50 transition-all duration-700"></div>
              
              {/* Floating Tag 1: Title (Pushed UP and LEFT into negative space) */}
              <div className="absolute -top-4 sm:top-0 -left-6 sm:-left-8 md:-left-12 lg:-left-16 xl:-left-20 bg-black/50 sm:bg-black/40 backdrop-blur-md border border-white/20 sm:border-white/10 px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.5)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 animate-float scale-90 sm:scale-100 origin-left" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <div className="flex flex-col">
                    <span className="font-header font-black text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-wider uppercase leading-tight">Rang Kala Award</span>
                    <span className="font-body font-semibold text-gray-300 sm:text-gray-400 text-[6px] sm:text-[8px] md:text-[9px] uppercase tracking-widest mt-0.5">Official Showpiece</span>
                  </div>
                </div>
              </div>

              {/* Floating Tag 2: Review (Pushed DOWN and RIGHT into thin stem space) */}
              <div className="absolute bottom-[10%] sm:bottom-[15%] -right-8 sm:-right-10 md:-right-12 lg:-right-16 xl:-right-20 bg-black/50 sm:bg-black/40 backdrop-blur-md border border-white/20 sm:border-white/10 px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.5)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 animate-float scale-90 sm:scale-100 origin-right" style={{ animationDelay: '1.5s' }}>
                <div className="flex flex-col items-center sm:items-start gap-0.5 sm:gap-1">
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />)}
                  </div>
                  <span className="font-body font-bold text-white text-[7px] sm:text-[8px] md:text-[9px] tracking-widest uppercase opacity-90 mt-0.5 sm:mt-1">4.9/5 (180+ Reviews)</span>
                </div>
              </div>

              {/* Floating Trophy Image */}
              <img 
                src="/Trophy_transparent.png" 
                alt="Rang Kala Golden Trophy" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(245,158,11,0.6)] animate-float transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Bottom Badge */}
              <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 text-black font-header font-black text-[10px] sm:text-xs md:text-sm px-5 py-2 sm:py-2.5 rounded-full whitespace-nowrap shadow-[0_10px_25px_rgba(245,158,11,0.6)] border-[2px] border-amber-300 uppercase tracking-[0.2em] z-20 hover:scale-110 transition-transform">
                The Actual Trophy
              </div>
            </div>
          </div>

          {/* VSL (Video Sales Letter) Placeholder Box */}
          <div className="relative mx-auto max-w-2xl w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-[3px] border-gray-800 shadow-[0_0_20px_rgba(245,158,11,0.15)] group cursor-pointer mb-6 sm:mb-8">
            <img 
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop" 
              alt="Video Placeholder" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="relative">
                <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 text-amber-500 opacity-90 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] bg-black/30 rounded-full" />
              </div>
            </div>
            {/* VSL Headline */}
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-2 sm:p-3 text-left">
              <span className="font-header text-white font-bold text-xs sm:text-sm drop-shadow-md tracking-wide">Click To Watch This Urgent Message From Our 5 Judges 🔊</span>
            </div>
          </div>

          {/* Core CTA */}
          <div className="flex flex-col items-center w-full px-1 sm:px-0">
            <ArrowBigRight className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 animate-bounce rotate-90 mb-2" />
            <Link href="/rangkala-award/register" className="w-full sm:w-[85%] md:w-auto">
              <button className="w-full bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-header text-lg sm:text-xl lg:text-2xl px-2 sm:px-6 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl border-b-[4px] sm:border-b-[5px] border-amber-800 active:border-b-0 active:translate-y-[4px] sm:active:translate-y-[5px] transition-all transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(245,158,11,0.3)] flex flex-col items-center justify-center tracking-wide uppercase">
                <span className="font-black leading-tight text-center">YES! SECURE MY SPOT FOR EXACTLY ₹599</span>
                <span className="font-body text-[9px] sm:text-[11px] md:text-xs font-bold text-black/75 mt-1 lg:mt-1.5 uppercase tracking-widest text-center leading-tight">Zero Hidden Fees • Submit Up To 2 Artworks</span>
              </button>
            </Link>
            
            {/* Payment Logos & Tech Trust */}
            <div className="w-full flex flex-col items-center mt-4">
              <div className="flex items-center justify-center gap-4 sm:gap-6 opacity-70 mb-3 bg-black/40 px-5 border border-gray-800 rounded-full h-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPI-Logo.png/1200px-UPI-Logo.png" alt="UPI" className="h-3 sm:h-4 object-contain grayscale hover:grayscale-0 transition-opacity" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 sm:h-4 object-contain grayscale hover:grayscale-0 transition-opacity" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 sm:h-5 object-contain grayscale hover:grayscale-0 transition-opacity" />
                <span className="font-header font-bold text-[9px] sm:text-[10px] text-gray-400 border-l border-gray-700 pl-3">POWERED BY CASHFREE</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 opacity-75 justify-center flex-wrap font-body text-gray-300">
                <div className="flex items-center gap-1.5"><Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" /><span className="text-[10px] sm:text-xs tracking-wide">256-Bit Secure Checkout</span></div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" /><span className="text-[10px] sm:text-xs tracking-wide">Daami Event Verified Hosted</span></div>
                <div className="flex items-center gap-1.5"><CheckSquare className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" /><span className="text-[10px] sm:text-xs tracking-wide">Keep Your Copyright</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY / THE PAIN (Russell Brunson style "Epiphany Bridge") */}
      <section className="py-10 sm:py-12 md:py-16 bg-white text-gray-900 border-t-4 sm:border-t-8 border-gray-200">
        <div className="container mx-auto px-3 sm:px-6 max-w-2xl font-body">
          <p className="font-header text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 inline-block pb-1">From the desk of Daami Event,</p>
          <p className="text-sm sm:text-base mb-3 leading-relaxed font-bold">Dear Fellow Artist,</p>
          <p className="text-sm sm:text-base mb-3 leading-relaxed text-gray-700">
            Listen, there's a dirty little secret in the online art competition world. Most shows lure you in with a decent entry fee, but if you miraculously win... <span className="font-bold border-b-2 border-red-500">they charge you insane delivery costs</span> just to get your own trophy!
          </p>
          <p className="text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed text-gray-700 p-2 sm:p-4 bg-yellow-100/80 border-l-4 border-yellow-400 rounded-r shadow-sm">
            That is infuriating, and trying to make a living off your passion feels like an <span className="font-bold underline">impossible uphill battle</span> when people scam you like that.
          </p>
          <h2 className="font-header text-xl sm:text-2xl md:text-3xl font-extrabold text-red-600 mb-4 sm:mb-6 md:mt-8 leading-[1.2] uppercase tracking-tight">
            We built the Rang Kala Award to shatter that nonsense.
          </h2>
          <p className="text-sm sm:text-base mb-3 leading-relaxed text-gray-700">
            We created a strictly-capped event of exactly <strong>350 artists</strong>. We brought in a pristine panel of <strong>5 elite judges</strong>. And we established a hardline "One-Time Cost Strategy."
          </p>
          <p className="font-header text-base sm:text-lg md:text-xl mb-4 sm:mb-5 leading-tight font-black text-black bg-gray-100 p-2.5 sm:p-4 border-l-[4px] sm:border-l-[6px] border-black">
            If you win, we ship your Golden Trophy, your Medal, and your Physical Certificate... 100% FREE.
          </p>
          <p className="text-sm sm:text-base mb-3 leading-relaxed text-gray-700">
            No shipping fees. No hidden costs. Just pure, unadulterated recognition for your raw artistic talent. You get to submit up to 2 artworks for a single flat fee, and everybody walks away with an appreciation letter.
          </p>
        </div>
      </section>

      {/* 3. THE GRAND SLAM OFFER / VALUE STACK (Hormozi Style) */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#111827] border-y-[4px] sm:border-y-[6px] border-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-2 sm:px-4 max-w-4xl relative z-10">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="font-header text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 text-white uppercase tracking-tight leading-[1.1]">
              Here is EXACTLY what you get
            </h2>
            <h3 className="font-body text-xs sm:text-sm md:text-base text-amber-500 font-bold uppercase tracking-widest drop-shadow-md">
              The "No-Hidden-Fees" Guarantee
            </h3>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-[3px] border-amber-500 max-w-2xl mx-auto flex flex-col">
            <div className="p-3 sm:p-5 bg-gray-50 flex-grow">
              <ul className="space-y-2 sm:space-y-4">
                {[
                  { title: "Top 15 per Category: Rang Kala Golden Trophy", val: "₹15,000", icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> },
                  { title: "Top 15 per Category: Rang Kala Golden Medal", val: "₹5,000", icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> },
                  { title: "Top 50 Artists: Feature in News Media Article", val: "₹50,000", icon: <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> },
                  { title: "Physical Certificate Delivered 100% Free", val: "₹5,000", icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> },
                  { title: "All Participants: Digital Letter & Certificate", val: "PRICELESS", icon: <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> },
                ].map((item, i) => (
                  <motion.li 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    key={i} className="flex flex-col sm:flex-row items-start sm:items-center py-2 border-b-2 border-gray-200 last:border-0 gap-2 sm:gap-3 group hover:bg-white p-2 rounded-lg sm:rounded-xl transition-colors"
                  >
                    <div className="flex w-full sm:w-auto items-start sm:items-center justify-between sm:justify-start">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-1.5 sm:p-2.5 rounded-full mr-2 sm:mr-3 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <h4 className="font-header text-sm md:text-base font-bold text-gray-900 leading-tight uppercase pr-2">{item.title}</h4>
                      </div>
                      <div className="sm:hidden shrink-0 text-right mt-1 min-w-[55px]">
                        <span className="font-body text-[9px] font-bold text-gray-500 uppercase block leading-none">Value:</span>
                        <p className="font-header text-sm font-black text-red-600 line-through decoration-red-600/40">{item.val}</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block sm:ml-auto shrink-0 pl-3 md:pl-4 text-right">
                      <span className="font-body text-[10px] md:text-xs font-bold text-gray-500 uppercase block mb-0.5">Value:</span>
                      <p className="font-header text-base md:text-lg font-black text-red-600 line-through decoration-red-600/40">{item.val}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* The Price Drop */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 md:p-8 text-center border-t border-gray-800">
              <h3 className="font-header text-sm sm:text-base md:text-lg text-gray-400 font-bold mb-1 tracking-wide uppercase">Total Value: <span className="line-through">₹75,000+</span></h3>
              <p className="font-body text-red-400 text-xs sm:text-sm font-bold mb-3 sm:mb-4 tracking-widest uppercase">For the 350 artists who step up today...</p>
              
              <h2 className="font-header text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-amber-500 mb-4 sm:mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] leading-none">
                You Pay:<br className="sm:hidden"/><span className="text-white"> Just ₹599</span>
              </h2>

              <Link href="/rangkala-award/register" className="inline-block w-full sm:w-[90%] md:w-auto mx-auto block">
                <button className="w-full bg-green-500 hover:bg-green-400 text-white font-header text-lg sm:text-xl lg:text-2xl px-2 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl border-b-[4px] sm:border-b-[5px] border-green-700 active:border-b-0 active:translate-y-[4px] sm:active:translate-y-[5px] transition-all transform hover:scale-[1.03] shadow-[0_10px_20px_rgba(34,197,94,0.3)] flex flex-col items-center justify-center mx-auto tracking-wide uppercase">
                  <span className="font-extrabold leading-tight text-center">CLAIM MY SPOT & SUBMIT 2 ARTWORKS</span>
                  <span className="font-body text-[9px] sm:text-[11px] font-bold text-green-900 mt-1 tracking-widest text-center leading-tight">One-Time Charge. Zero Delivery Costs.</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 RISK REVERSAL GUARANTEE */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 to-orange-100 border-y-2 border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-[2rem] shadow-[0_15px_40px_rgba(245,158,11,0.15)] border-4 border-amber-400 relative">
            <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-amber-500 rounded-full p-4 sm:p-5 shadow-xl border-4 border-white">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h2 className="font-header text-xl sm:text-3xl md:text-5xl font-black text-gray-900 mt-6 sm:mt-10 mb-4 sm:mb-6 uppercase tracking-tighter">The 100% Artist Protection Guarantee</h2>
            <p className="font-body text-sm sm:text-lg text-gray-700 font-medium leading-relaxed mb-6 sm:mb-8 px-2 max-w-2xl mx-auto">
              You retain <strong className="text-gray-900">100% of your copyright.</strong> We will never sell, mint, or misuse your artwork. And if you win the Golden Trophy and we try to charge you a single Rupee for delivery within India, we will instantly refund your ₹599 in full. 
            </p>
            <div className="bg-amber-100/60 p-3 sm:p-4 rounded-xl border border-amber-300 inline-block">
              <p className="font-header text-amber-800 font-bold uppercase tracking-widest text-xs sm:text-base">Zero Risk. Zero Hidden Fees. Absolute Security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES & ELIGIBILITY */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-100 text-center border-b-2 border-gray-200">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="font-header text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 uppercase tracking-tight">"Is My Art Eligible?"</h2>
          
          {/* ELIGIBILITY BANNERS */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="bg-red-600 text-white font-header font-bold text-[11px] sm:text-xs md:text-sm px-4 py-1.5 rounded-md uppercase tracking-wider shadow-sm border-b-2 border-red-800">Theme: 100% OPEN</span>
            <span className="bg-blue-600 text-white font-header font-bold text-[11px] sm:text-xs md:text-sm px-4 py-1.5 rounded-md uppercase tracking-wider shadow-sm border-b-2 border-blue-800">Age: 16+ (Adult)</span>
          </div>

          <p className="font-body text-xs sm:text-sm md:text-base text-gray-700 font-medium mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-1 sm:px-2">We are assessing raw talent. Your submission can be on <span className="font-bold underline">any theme</span>. Just make sure your artwork fits into one of these 3 primary formats:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            
            {/* Category 1 */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border-2 sm:border-[3px] border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all text-left flex flex-col h-full group">
              <Paintbrush className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-blue-500 group-hover:scale-110 transition-transform"/>
              <h3 className="font-header text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 uppercase">1. Wet Medium</h3>
              <p className="font-body text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-2 flex-grow">
                Watercolor, Acrylic Painting, Oil Painting, Gouache, Poster Color, Tempera, or literally any wet medium executed on paper or canvas.
              </p>
            </div>

            {/* Category 2 */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border-2 sm:border-[3px] border-rose-200 hover:border-rose-500 hover:shadow-lg transition-all text-left flex flex-col h-full group">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-rose-500 group-hover:scale-110 transition-transform"/>
              <h3 className="font-header text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 uppercase">2. Drawing & Sketch</h3>
              <p className="font-body text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-2 flex-grow">
                Pencil Sketch, Charcoal Drawing, Ink or Pen Art, Colour Pencil, Pastels, intricate Mandala Art, Line Art, and Doodle Art.
              </p>
            </div>

            {/* Category 3 */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border-2 sm:border-[3px] border-emerald-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left flex flex-col h-full group">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-emerald-500 group-hover:scale-110 transition-transform"/>
              <h3 className="font-header text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 uppercase">3. Digital Art</h3>
              <p className="font-body text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-2 flex-grow">
                Digital Painting (Procreate, Photoshop), Illustrations, Character Design, Concept Art, Digital Collage, and AI-assisted art.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 MEET THE JUDGES */}
      <section className="py-10 sm:py-12 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-header text-xl sm:text-2xl md:text-3xl font-black mb-2 md:mb-3 text-gray-900 uppercase tracking-tight">Your 5 Elite Jury Members</h2>
          <p className="font-body text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-6 sm:mb-8 max-w-xl mx-auto px-2">Every single artwork submitted is reviewed and scored by established industry veterans from across India to ensure absolute fairness.</p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {[
              { name: "Aditya Verma", role: "Sr. Art Critic" },
              { name: "Meera Nair", role: "Gallery Curator" },
              { name: "Rahul Deshmukh", role: "Master Fine Artist" },
              { name: "Priya Singh", role: "Visual Arts Director" },
              { name: "Vikram Chatterjee", role: "Contemporary Artist" },
            ].map((judge, idx) => (
              <div key={idx} className="bg-gray-50 w-[120px] sm:w-[140px] p-3 sm:p-4 rounded-xl border border-gray-200 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mb-2 opacity-90" />
                <h4 className="font-header font-bold text-gray-900 text-xs sm:text-sm leading-tight text-center">{judge.name}</h4>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-body mt-1 text-center font-semibold">{judge.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.7 THE BANDWAGON / SOCIAL PROOF */}
      <section className="py-12 sm:py-16 bg-gray-50 border-y-2 border-gray-200 overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-5xl text-center flex flex-col items-center">
          <h2 className="font-header text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-gray-900 uppercase tracking-tight">Don't Just Take Our Word For It</h2>
          <p className="font-body text-xs sm:text-sm md:text-base text-gray-500 font-bold mb-8 md:mb-12 uppercase tracking-widest">Join the fast-growing community of respected artists.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left max-w-5xl mx-auto w-full">
            {[
              {
                text: "Finally an award show that respects artists. No hidden fees, clear categories, and the certificate quality is genuinely premium. Daami Event does not play around!",
                author: "Rajesh K.", role: "Charcoal Artist"
              },
              {
                text: "I submitted two pieces. The secure checkout was flawless, and I absolutely love that they strictly cap it to ensure the judging actually matters.",
                author: "Priya M.", role: "Digital Illustrator"
              },
              {
                text: "The fact that they guarantee no delivery fees if you win is what sold me. It shows they actually care about the talent, not just milking registrants.",
                author: "Aman S.", role: "Acrylic Painter"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border-x-[4px] border-b-[4px] border-t-[8px] border-gray-200 border-t-amber-500 shadow-md hover:shadow-xl transition-all flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="font-body text-gray-700 text-sm sm:text-base font-medium italic mb-6 leading-relaxed flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-header font-black text-gray-400 text-xl border-2 border-gray-200 shadow-inner">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-header font-bold text-gray-900 text-sm sm:text-base uppercase tracking-wide">{review.author}</h4>
                    <span className="font-body text-[10px] sm:text-xs text-amber-600 font-bold uppercase tracking-widest block mt-0.5">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-14 inline-block">
            <div className="inline-flex items-center gap-3 bg-green-100/80 text-green-800 px-5 sm:px-8 py-3 rounded-full font-body text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider border-2 border-green-300 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
              </span>
              Over 187+ Artists Have Already Secured Their Spots
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ (Objection Handling) */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#0d0f12]">
        <div className="container mx-auto px-2 sm:px-4 max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-header text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-white uppercase tracking-tight">Frequently Asked Questions</h2>
            <p className="font-body text-xs sm:text-sm text-gray-400 font-medium tracking-wide">(And the exact answers you've been looking for)</p>
          </div>

          <div className="bg-gray-900 border-2 sm:border-[3px] border-gray-800 rounded-lg p-1.5 sm:p-3 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            <FAQItem 
              question="Are there actually ANY hidden delivery charges?" 
              answer="ZERO. NONE. We literally built the Rang Kala Award to despise hidden fees. If you are one of the Top 15 per category, we cover the shipping and delivery of your Golden Trophy, Golden Medal, and Physical Certificate inside India."
            />
            <FAQItem 
              question="How many artworks can I submit for my ₹599?" 
              answer="A single ₹599 registration allows you to submit up to 2 premium artworks. This gives you two distinct chances to impress our 5-judge panel."
            />
            <FAQItem 
              question="What if I don't make the Top 15?" 
              answer="First of all, the Top 50 artists still receive a massive feature in our news media article spotlight! And EVERY SINGLE participant receives an official Appreciation Letter and Certificate, making your single ₹599 fee entirely risk-free in value."
            />
            <FAQItem 
              question="Why cap the participants at 350?" 
              answer="To preserve the integrity of the Golden Trophy. A panel of 5 deep-diving judges cannot review 5,000 artworks ethically. By capping it at 350, we ensure that every single submitter gets the authentic jury review they deserve."
            />
          </div>
        </div>
      </section>

      {/* 6. FINAL SCARCITY CTA (The "Don't Miss Out" Footer) */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-red-600 to-red-900 text-center relative overflow-hidden">
        {/* Warning Tape Overlay */}
        <div className="absolute top-0 left-0 w-full h-4 sm:h-6 bg-black/40 stripe-pattern shadow-md" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)"}} />
        <div className="absolute bottom-0 left-0 w-full h-4 sm:h-6 bg-black/40 stripe-pattern shadow-md" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)"}} />

        <div className="container mx-auto px-2 sm:px-4 max-w-2xl relative z-10 mt-4 sm:mt-6">
          <h2 className="font-header text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3 uppercase tracking-tighter drop-shadow-lg leading-tight">
            Do Not Close This PAGE...
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-white font-bold mb-5 sm:mb-6 max-w-xl mx-auto drop-shadow-sm px-1 leading-relaxed">
            There are only 350 total seats. Once they fill up, this page shuts down completely. 
          </p>
          
          <div className="bg-black/30 p-3 sm:p-5 rounded-lg sm:rounded-xl backdrop-blur-sm border-2 border-white/20 mb-6 sm:mb-8 inline-block max-w-lg w-full text-left mx-auto shadow-lg">
            <h3 className="font-header text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="text-amber-400 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              Here's The Brutal Truth:
            </h3>
            <p className="font-body text-[11px] sm:text-xs md:text-sm text-white/95 leading-relaxed font-semibold">
              You have two choices. Choice 1: Walk away, save your ₹599, and sit on the sidelines wondering "what if" while other artists hold the Golden Trophies. <br/><br/>
              Choice 2: Take 2 minutes, register your 2 best artworks, and potentially change your entire creative career. The 5 judges are waiting for you. Let's do this.
            </p>
          </div>

          <Link href="/rangkala-award/register" className="block w-full sm:inline-block sm:w-[90%] md:w-auto mx-auto mb-3">
            <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-header text-lg sm:text-xl md:text-2xl px-2 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-b-[4px] sm:border-b-[5px] border-amber-800 active:border-b-0 active:translate-y-[4px] transition-all transform hover:scale-[1.03] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center mx-auto tracking-wide uppercase">
              <span className="font-black leading-tight text-center">YES! LET ME IN RIGHT NOW</span>
              <span className="font-body text-[9px] sm:text-[11px] md:text-xs font-bold text-amber-900 mt-1 tracking-widest text-center leading-tight">Secure 1 Of The 350 Guaranteed Spots</span>
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
