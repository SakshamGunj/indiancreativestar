"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Users, Globe, Sparkles, Award, Heart, Star } from "lucide-react";
import AboutSection from "@/components/home/AboutSection";

const About = () => {
    return (
        <div className="min-h-screen text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden"
            style={{ background: 'linear-gradient(160deg, #0a0800 0%, #0f0c00 15%, #080508 40%, #050010 65%, #0a0602 85%, #000000 100%)' }}>

            {/* Pattern + Gradient Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 10% 15%, rgba(212,175,55,0.13) 0%, transparent 65%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 55% at 90% 80%, rgba(180,100,20,0.10) 0%, transparent 60%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.72) 100%)' }} />

            {/* Navbar */}
            <nav className="sticky top-0 z-50 px-4 md:px-6 py-4 border-b border-[#D4AF37]/15 backdrop-blur-md bg-black/50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/company-logo.webp" alt="Daami Event" className="h-9 w-9 md:h-11 md:w-11 object-cover rounded-full border border-[#D4AF37]/40" />
                        <div className="hidden sm:block">
                            <p className="font-playfair text-base tracking-wider text-[#D4AF37]">DAAMI EVENT</p>
                            <p className="text-[8px] tracking-[0.25em] uppercase text-white/30">Event Management</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4 text-[10px] tracking-widest uppercase font-bold">
                        <Link href="/about" className="hidden md:block text-[#D4AF37] hover:text-white transition-colors">About Us</Link>
                        <Link href="/#events-portfolio" className="hidden md:block text-white/50 hover:text-[#D4AF37] transition-colors">Events</Link>
                        <Link href="/contact" className="hidden md:block text-white/50 hover:text-[#D4AF37] transition-colors">Contact</Link>
                        <Link href="/#events-portfolio" className="flex items-center gap-2 text-black px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow">
                            Participate <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pb-24">

                {/* ── EDITORIAL HERO ── */}
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-20 mb-20">
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-10 origin-left" />
                    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex flex-col items-center flex-shrink-0">
                            <span className="font-playfair font-black text-[110px] lg:text-[140px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent select-none">∞</span>
                        </motion.div>
                        <div className="hidden md:block w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent flex-shrink-0 self-stretch" />
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="flex-1 flex flex-col justify-center gap-4 md:gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[2px] bg-[#D4AF37]" />
                                <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-black text-[#D4AF37]/70">Daami Event — Our Story</span>
                            </div>
                            <h1 className="font-playfair font-black leading-[1.0] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                                Empowering<br /><span className="italic">Creativity.</span>
                            </h1>
                            <p className="text-white/45 font-lato text-sm md:text-base leading-relaxed max-w-xl border-l-2 border-[#D4AF37]/25 pl-4 font-light">
                                Since 2023, Daami Event has been India's premier platform for discovering and celebrating raw artistic talent. We provide the stage — you bring the magic.
                            </p>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                                <span className="text-[10px] tracking-widests uppercase font-bold text-[#D4AF37]/70 flex items-center gap-1.5"><Heart className="w-3 h-3" /> Est. 2023</span>
                                <span className="text-white/10 text-xs">|</span>
                                <span className="text-[10px] tracking-widest uppercase font-bold text-white/40 flex items-center gap-1.5"><Users className="w-3 h-3" /> 1000+ Artists Empowered</span>
                                <span className="text-white/10 text-xs">|</span>
                                <span className="text-[10px] tracking-widest uppercase font-bold text-white/40 flex items-center gap-1.5"><Globe className="w-3 h-3" /> Pan-India Reach</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-10 origin-right" />
                </div>

                {/* ── TRUST PILLARS ── */}
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Why We Exist</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Shield, title: "100% Verified", desc: "Every event is independently verified and judged by credentialed industry professionals." },
                            { icon: Users, title: "Artist-First", desc: "We design every touchpoint to maximize the artist's experience, from registration to award delivery." },
                            { icon: Globe, title: "National Reach", desc: "From Sikkim to Kerala, we connect artists across every region of India under one prestigious umbrella." },
                            { icon: Award, title: "Meaningful Awards", desc: "Physical certificates, trophies, and Artist IDs that matter — not just digital badges." },
                            { icon: Star, title: "Transparent Judging", desc: "Clear rubrics, category-specific judges, and published rankings with zero hidden criteria." },
                            { icon: Sparkles, title: "Career Platform", desc: "A Hall of Fame and public archive that becomes a searchable career credential for every participant." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-row md:flex-col items-start gap-4 p-6 border border-white/5 hover:border-[#D4AF37]/25 bg-white/[0.012] hover:bg-white/[0.025] transition-all duration-500 group"
                            >
                                <div className="w-10 h-10 flex-shrink-0 border border-[#D4AF37]/20 flex items-center justify-center group-hover:border-[#D4AF37]/50 transition-colors">
                                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-white text-base mb-2 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                                    <p className="text-white/45 font-lato text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── ABOUT SECTION COMPONENT ── */}
                <div className="relative z-10">
                    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-10">
                        <div className="flex items-center gap-4 mb-0">
                            <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                            <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">The Full Story</span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                        </div>
                    </div>
                    <AboutSection hideButton={true} />
                </div>

                {/* ── FOOTER ── */}
                <footer className="relative z-10 mt-20 pt-16 pb-10 px-6 border-t border-white/5 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-8 h-[1px] bg-white/15" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">Navigate</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-10 text-white/40 text-sm mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="/company-logo.webp" alt="Daami Event" className="h-8 w-8 object-cover rounded-full border border-[#D4AF37]/20" />
                                <span className="font-playfair text-base text-white tracking-widest">DAAMI EVENT</span>
                            </div>
                            <p className="text-xs leading-relaxed text-white/30 max-w-xs">Redefining the art of competition. We provide the stage, you bring the magic.</p>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-bold mb-4">Navigation</p>
                            {[['/', 'Home'], ['/#events-portfolio', 'Events'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                                <Link key={href} href={href} className="block text-xs text-white/30 hover:text-[#D4AF37] transition-colors">{label}</Link>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-bold mb-4">Direct Contact</p>
                            <Link href="https://wa.me/919635908358" target="_blank" className="block text-xs text-white/30 hover:text-[#D4AF37] transition-colors">WhatsApp: +91 96359 08358</Link>
                            <Link href="mailto:daamievent@gmail.com" className="block text-xs text-white/30 hover:text-[#D4AF37] transition-colors">daamievent@gmail.com</Link>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/5 text-center text-[9px] tracking-[0.25em] uppercase text-white/15">
                        © 2025 Daami Event. All Rights Reserved.
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default About;
