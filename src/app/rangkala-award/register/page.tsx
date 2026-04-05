"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Lock, ShieldCheck, CheckSquare, ChevronRight, AlertTriangle, ArrowLeft } from "lucide-react";

export default function RangKalaAwardRegister() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-amber-500 selection:text-black pb-12">
      
      {/* High-Converting Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');
        .font-header { font-family: 'Montserrat', sans-serif; letter-spacing: -0.5px; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* SCARCITY HEADER */}
      <div className="bg-[#111827] text-white py-3 border-b-4 border-amber-500 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between">
          <Link href="/rangkala-award" className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-2 sm:mb-0">
            <ArrowLeft className="w-4 h-4 mr-1" /> BACK TO DETAILS
          </Link>
          <div className="flex items-center gap-2 font-header text-xs sm:text-sm tracking-widest text-amber-500 uppercase">
            <Lock className="w-4 h-4" /> SECURE 256-BIT ENCRYPTED CHECKOUT
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: The Order Form (2-Step style) */}
        <div className="w-full lg:w-3/5">
          <div className="mb-6">
            <h1 className="font-header text-2xl sm:text-4xl font-black uppercase text-gray-900 mb-2">
              Final Step: Secure Your Spot
            </h1>
            <p className="font-body text-gray-600 text-sm sm:text-base font-medium">
              You are exactly 1 step away from claiming 1 of the 350 strictly capped slots for the Rang Kala Award. Enter your details below to finalize your registration.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-t-[8px] border-blue-600 p-6 sm:p-8">
            
            {/* Progress Bar indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
                <span className="font-header text-sm sm:text-base uppercase tracking-wide">Artist Info</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
                <span className="font-header text-sm sm:text-base uppercase tracking-wide">Payment</span>
              </div>
            </div>

            {/* Step 1 Form */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-header text-xl font-bold mb-4 uppercase text-gray-800 border-b-2 border-amber-400 inline-block pb-1">Artist Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">First Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-body text-sm" placeholder="Enter full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Last Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-body text-sm" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email Address (Where we send updates)</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-body text-sm" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">WhatsApp / Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-body text-sm" placeholder="+91" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Select Primary Category</label>
                    <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-body text-sm">
                      <option>Wet Medium Painting</option>
                      <option>Drawing & Sketching</option>
                      <option>Digital Art</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-header text-lg sm:text-xl px-4 py-4 sm:py-5 rounded-xl border-b-[4px] border-blue-800 active:border-b-0 active:translate-y-[4px] transition-all transform hover:scale-[1.01] shadow-lg flex justify-center items-center uppercase tracking-wide"
                >
                  Proceed to Step 2 <ChevronRight className="w-6 h-6 ml-2" />
                </button>
              </motion.div>
            )}

            {/* Step 2 Form (Payment/Checkout) */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                 <h2 className="font-header text-xl font-bold mb-4 uppercase text-gray-800 border-b-2 border-green-500 inline-block pb-1">Secure Checkout</h2>
                 
                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                   <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                   <div>
                     <p className="font-bold text-red-800 text-sm">Do Not Refresh This Page</p>
                     <p className="text-xs text-red-700 font-medium">Your slot is temporarily reserved. Completing this page secures your position in the 350 participant cap.</p>
                   </div>
                 </div>

                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                      <span className="font-header font-bold text-gray-700 text-sm uppercase">Item</span>
                      <span className="font-header font-bold text-gray-700 text-sm uppercase">Amount</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-sm font-semibold text-gray-800">Rang Kala Award Registration Fee (Covers 2 Artworks)</span>
                      <span className="font-body text-sm font-bold text-gray-900">₹599.00</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-xs text-green-600 font-bold">
                      <span>Shipping & Awards Delivery (If you win)</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                      <span className="font-header text-lg font-black text-gray-900 uppercase">Total Today</span>
                      <span className="font-header text-2xl font-black text-green-600">₹599.00</span>
                    </div>
                 </div>

                 {/* Simulated Payment Button */}
                <button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-header text-lg sm:text-2xl px-4 py-4 sm:py-5 rounded-xl border-b-[5px] border-green-700 active:border-b-0 active:translate-y-[5px] transition-all transform hover:scale-[1.01] shadow-[0_10px_20px_rgba(34,197,94,0.3)] flex flex-col justify-center items-center uppercase tracking-wide"
                >
                  <span className="font-black leading-tight text-center flex items-center gap-2"><Lock className="w-5 h-5"/> COMPLETING ORDER - ₹599</span>
                  <span className="font-body text-[10px] sm:text-xs font-bold text-green-100 mt-1 uppercase tracking-widest text-center">100% Secure Encrypted Payment via Cashfree</span>
                </button>

                <button onClick={() => setStep(1)} className="w-full text-center mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
                  &lt; Back to Details
                </button>
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPI-Logo.png/1200px-UPI-Logo.png" alt="UPI" className="h-4 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain grayscale" />
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: The "Order Bump" / Value Stack Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#111827] text-white rounded-2xl p-6 sm:p-8 shadow-2xl sticky top-24 border-[3px] border-gray-800">
            <h3 className="font-header text-xl font-bold uppercase text-amber-500 mb-6 text-center tracking-wide">
              Summary Of What You Get Today
            </h3>
            
            <ul className="space-y-4 mb-8">
              {[
                { text: "Entry into the strictly capped 350-artist competition pool." },
                { text: "Up to 2 premium artwork submissions allowed." },
                { text: "Chance to win Golden Trophy, Medal, and ₹50,000+ in media exposure." },
                { text: "Guaranteed Certificate & Appreciation Letter for every single entry." },
                { text: "100% Free Shipping on all physical awards for winners." },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="font-body text-sm font-medium text-gray-300 leading-snug">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="bg-black/50 border border-amber-500/30 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2 text-amber-500">
                ★★★★★
              </div>
              <p className="font-body italic text-gray-400 text-xs sm:text-sm mb-3">
                "Finally, an art award that doesn't scam you on delivery fees. Daami Event focuses strictly on the art and the prestige. So glad I claimed my spot."
              </p>
              <p className="font-header font-bold text-white text-sm tracking-widest uppercase">— Verified Applicant</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-gray-500" />
              <div className="text-left">
                <p className="font-header text-sm font-bold text-gray-400 uppercase">Daami Event Guarantee</p>
                <p className="font-body text-[10px] text-gray-500">Safe, secure, and authentic art competitions.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
