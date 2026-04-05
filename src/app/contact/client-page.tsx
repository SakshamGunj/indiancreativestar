"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";

export default function ContactClient() {
    return (
        <div className="min-h-screen text-white font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden py-16 sm:py-24 px-4 relative"
            style={{ background: 'linear-gradient(160deg, #0a0800 0%, #0f0c00 15%, #080508 40%, #050010 65%, #0a0602 85%, #000000 100%)' }}>

            {/* Pattern + gradient layers */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 15% 20%, rgba(212,175,55,0.15) 0%, transparent 65%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 55% at 85% 75%, rgba(34,197,94,0.08) 0%, transparent 60%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.72) 100%)' }} />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* ── EDITORIAL HERO ── */}
                <div className="w-full mb-16 md:mb-20">
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-10 origin-left" />
                    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex flex-col items-center flex-shrink-0">
                            <span className="font-playfair font-black text-[100px] lg:text-[130px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent select-none">↗</span>
                        </motion.div>
                        <div className="hidden md:block w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent flex-shrink-0 self-stretch" />
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="flex-1 flex flex-col justify-center gap-4 md:gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[2px] bg-[#D4AF37]" />
                                <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-black text-[#D4AF37]/70">Daami Event — Direct Connect</span>
                            </div>
                            <h1 className="font-playfair font-black leading-[1.0] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                                Talk to<br /><span className="italic">Us Directly.</span>
                            </h1>
                            <p className="text-white/45 font-lato text-sm md:text-base leading-relaxed max-w-xl border-l-2 border-[#D4AF37]/25 pl-4 font-light">
                                No automated forms. No ticketing systems. Connect directly to our team via WhatsApp or Email for instant registration support and partnership inquiries.
                            </p>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                                <span className="text-[10px] tracking-widest uppercase font-bold text-[#D4AF37]/70 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Premium Support</span>
                                <span className="text-white/10 text-xs">|</span>
                                <span className="text-[10px] tracking-widest uppercase font-bold text-white/40">Mon–Sat, 10 AM – 7 PM IST</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-10 origin-right" />
                </div>

                {/* ── ACTION CARDS ── */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Reach Us Instantly</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {/* WhatsApp */}
                        <a href="https://wa.me/919635908358" target="_blank" rel="noreferrer"
                            className="group relative p-7 md:p-8 border border-green-500/15 hover:border-green-500/40 bg-green-500/[0.03] hover:bg-green-500/[0.07] transition-all duration-500 overflow-hidden scale-100 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                <ExternalLink className="w-5 h-5 text-green-400/60" />
                            </div>
                            <div className="w-12 h-12 border border-green-500/20 flex items-center justify-center mb-5 group-hover:border-green-400/50 transition-colors">
                                <Phone className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-playfair font-bold text-white mb-2 group-hover:text-green-300 transition-colors">WhatsApp Support</h3>
                            <p className="text-white/40 text-sm mb-6 leading-relaxed font-lato border-l border-white/10 pl-3">Fastest way to reach us. A live human responds instantly.</p>
                            <div className="font-mono text-sm text-green-400/80 tracking-wider">+91 96359 08358</div>
                        </a>
                        {/* Email */}
                        <a href="mailto:daamievent@gmail.com"
                            className="group relative p-7 md:p-8 border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 bg-[#D4AF37]/[0.02] hover:bg-[#D4AF37]/[0.06] transition-all duration-500 overflow-hidden scale-100 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                <ExternalLink className="w-5 h-5 text-[#D4AF37]/60" />
                            </div>
                            <div className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center mb-5 group-hover:border-[#D4AF37]/50 transition-colors">
                                <Mail className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-playfair font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">Official Email</h3>
                            <p className="text-white/40 text-sm mb-6 leading-relaxed font-lato border-l border-white/10 pl-3">For partnerships, bulk registrations & formal communications.</p>
                            <div className="font-lato text-sm text-[#D4AF37]/80 tracking-wide">daamievent@gmail.com</div>
                        </a>
                    </div>
                </div>

                {/* ── INFO STRIP ── */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-[1px] bg-white/15" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">More Ways to Reach Us</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-4 p-4 md:p-5 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                        <div className="w-9 h-9 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-amber-500/70" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-white mb-0.5">Operating Hours</h4>
                            <p className="text-white/35 text-[11px] font-lato">Mon–Sat, 10 AM – 7 PM IST</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 md:p-5 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                        <div className="w-9 h-9 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-blue-500/70" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-white mb-0.5">Headquarters</h4>
                            <p className="text-white/35 text-[11px] font-lato">Majitar, Sikkim – 737136</p>
                        </div>
                    </div>
                    <a href="https://www.instagram.com/daamievent/" target="_blank" rel="noreferrer"
                        className="flex items-center gap-4 p-4 md:p-5 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-pink-500/20 transition-all group">
                        <div className="w-9 h-9 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-pink-500/30 transition-colors">
                            <svg className="w-4 h-4 text-white/30 group-hover:text-pink-400 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-white mb-0.5">Instagram</h4>
                            <p className="text-white/35 text-[11px] font-lato">@daamievent</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
