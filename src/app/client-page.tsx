"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote, ChevronRight, Play, Award, Menu, Users, Gavel, CheckCircle, Snowflake } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import TrustSection from "@/components/home/TrustSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedOn from "@/components/home/FeaturedOn";
import EventsPortfolio from "@/components/home/EventsPortfolio";
import ContactSection from "@/components/home/ContactSection";
import KitSection from "@/components/home/KitSection";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { useRef } from "react";
import companyLogo from "@/assets/images/company-logo.webp";

// ... existing code ...

const Index = () => {
    const router = useRouter();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

    return (
        <div className="min-h-screen text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden"
            style={{ background: 'linear-gradient(160deg, #0a0800 0%, #0f0c00 15%, #080508 40%, #050010 65%, #0a0602 85%, #000000 100%)' }}>

            {/* Pattern Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.030'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            {/* Gold orbs */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 15% 20%, rgba(212,175,55,0.13) 0%, transparent 65%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 55% at 85% 75%, rgba(168,85,247,0.07) 0%, transparent 60%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.65) 100%)' }} />

            {/* Navigation */}
            <nav className="relative z-50 px-4 md:px-6 py-4 border-b border-[#D4AF37]/15 backdrop-blur-md sticky top-0 bg-black/50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                        <img src={companyLogo.src} alt="Daami Event" className="h-9 w-9 md:h-11 md:w-11 object-cover rounded-full border border-[#D4AF37]/40" />
                        <div className="hidden sm:block">
                            <h1 className="font-playfair text-base md:text-lg tracking-wider text-[#D4AF37]">DAAMI EVENT</h1>
                            <p className="text-[8px] tracking-[0.25em] uppercase text-white/30">Event Management</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest uppercase text-white/50 font-bold">
                        <button onClick={() => document.getElementById('about-daami')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors">About Us</button>
                        <button onClick={() => document.getElementById('events-portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors">Events</button>
                        <button onClick={() => router.push('/hall-of-fame')} className="hover:text-[#D4AF37] transition-colors">Hall of Fame</button>
                        <button onClick={() => router.push('/gallery')} className="hover:text-[#D4AF37] transition-colors">Gallery</button>
                        <button onClick={() => router.push('/contact')} className="hover:text-[#D4AF37] transition-colors">Contact</button>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <Button
                            onClick={() => router.push('/indiancreativestar/v2')}
                            className="hidden sm:flex bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-none px-4 md:px-5 text-[10px] tracking-widest font-black transition-shadow"
                        >
                            LATEST EVENT
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden text-white hover:text-[#D4AF37]">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-white/10 border border-white/10">
                                        <Menu className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="bg-black/95 border-l border-[#D4AF37]/15 text-white w-[280px] backdrop-blur-xl">
                                    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                                    <div className="flex flex-col gap-8 mt-10">
                                        <div className="space-y-5 text-base tracking-wider font-playfair">
                                            <button onClick={() => document.getElementById('about-daami')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left hover:text-[#D4AF37] transition-colors">About Us</button>
                                            <button onClick={() => document.getElementById('events-portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Events</button>
                                            <button onClick={() => router.push('/hall-of-fame')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Hall of Fame</button>
                                            <button onClick={() => router.push('/gallery')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Gallery</button>
                                            <button onClick={() => router.push('/contact')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Contact</button>

                                            {/* Live Events Special Buttons */}
                                            <div className="pt-4 border-t border-white/10 space-y-3">
                                                <div
                                                    className="w-full text-left group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 p-4 transition-all"
                                                >
                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div>
                                                            <span className="block text-[10px] uppercase tracking-widest text-purple-300 font-bold mb-1">Upcoming Event</span>
                                                            <span className="block text-xl font-bold text-white">ICS Season 3</span>
                                                        </div>
                                                        <Award className="w-5 h-5 text-purple-400" />
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-full text-left group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-900/50 to-orange-800/50 border border-orange-500/30 p-4 transition-all"
                                                >
                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div>
                                                            <span className="block text-[10px] uppercase tracking-widest text-orange-300 font-bold mb-1">Upcoming Event</span>
                                                            <span className="block text-xl font-bold text-white">Rang Kala Award</span>
                                                        </div>
                                                        <Star className="w-5 h-5 text-orange-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div >
            </nav >

            {/* ══════════════════════════════════════════ */}
            {/* EDITORIAL HERO — Homepage Edition         */}
            {/* ══════════════════════════════════════════ */}
            <header ref={targetRef} className="relative z-10 min-h-[100vh] flex flex-col justify-center px-4 md:px-6 pt-6 pb-0 overflow-hidden">
                {/* Parallax fade wrapper */}
                <motion.div style={{ opacity, scale }} className="w-full max-w-7xl mx-auto relative z-20">

                    {/* Top editorial rule */}
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-10 origin-left" />

                    <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-16">

                        {/* LEFT COLUMN — decorative typographic anchor */}
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.1 }}
                            className="hidden lg:flex flex-col items-center flex-shrink-0 self-stretch">
                            <span className="font-playfair font-black text-[120px] xl:text-[160px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/35 to-transparent select-none tracking-tighter">
                                DE
                            </span>
                            <div className="w-[1px] flex-1 bg-gradient-to-b from-[#D4AF37]/30 to-transparent min-h-[60px]" />
                        </motion.div>

                        {/* Vertical Divider */}
                        <div className="hidden lg:block w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent flex-shrink-0 self-stretch" />

                        {/* CENTER — main content */}
                        <div className="flex-1 flex flex-col gap-6 md:gap-8 pt-2">

                            {/* Live event eyebrow */}
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                                className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2 px-0">
                                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40" />
                                    <span className="text-[10px] tracking-[0.35em] uppercase font-black text-[#D4AF37]/60">Upcoming Events</span>
                                </div>
                                <div className="w-4 h-[1px] bg-white/20" />
                                <span className="text-[10px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/60">Daami Event — India&apos;s Premier Art Stage</span>
                            </motion.div>

                            {/* Main Title */}
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
                                className="font-playfair font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60 leading-[1.0]"
                                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)' }}>
                                Where Passion<br />Meets <span className="italic">Prestige.</span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-white/45 font-lato font-light text-sm md:text-base leading-relaxed max-w-xl border-l-2 border-[#D4AF37]/25 pl-4">
                                Daami Event is the bridge between raw talent and national recognition. We curate premium artistic experiences that honour the creator in you.
                            </motion.p>

                            {/* ── LIVE EVENT CARDS ── flat editorial style */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
                                className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">

                                {/* Rang Kala — flat editorial card */}
                                <div className="group relative flex items-center gap-4 p-4 md:p-5 border border-orange-500/10 bg-orange-500/[0.02] transition-all duration-500 text-left flex-1 overflow-hidden">
                                    {/* Upcoming badge — editorial inline */}
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-orange-600/80 text-white text-[8px] tracking-widest uppercase font-black">
                                        UPCOMING
                                    </div>
                                    <img src="https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775321998/Rang_Kala_Logo_4_-compressed_at7c5d.webp" alt="Rang Kala" className="w-12 h-12 object-cover border border-orange-400/20 flex-shrink-0" />
                                    <div>
                                        <span className="block text-[9px] tracking-[0.3em] uppercase font-black text-orange-400/50 mb-1">National Level</span>
                                        <span className="font-playfair font-bold text-lg text-white/80">Rang Kala Award</span>
                                    </div>
                                </div>

                                {/* ICS S3 — flat editorial card */}
                                <div className="group relative flex items-center gap-4 p-4 md:p-5 border border-purple-500/10 bg-purple-500/[0.02] transition-all duration-500 text-left flex-1 overflow-hidden">
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-purple-600/80 text-white text-[8px] tracking-widest uppercase font-black">
                                        UPCOMING
                                    </div>
                                    <img src="https://i.ibb.co/qL29ZCrV/THE-Shakespeare-Poetry-Award-2025-2.webp" alt="ICS S3" className="w-12 h-12 object-cover border border-purple-400/20 flex-shrink-0" />
                                    <div>
                                        <span className="block text-[9px] tracking-[0.3em] uppercase font-black text-purple-400/50 mb-1">National Level</span>
                                        <span className="font-playfair font-bold text-lg text-white/80">ICS Season 3</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── STATS META STRIP ── */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
                                className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                                {[
                                    { icon: Star, label: '4.8/ 5 Reviews', fill: true },
                                    { icon: Users, label: '1550+ Artists' },
                                    { icon: CheckCircle, label: '65k+ Votes' },
                                    { icon: Gavel, label: '15+ Judges' },
                                ].map(({ icon: Icon, label, fill }, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Icon className={`w-3.5 h-3.5 text-[#D4AF37] ${fill ? 'fill-[#D4AF37]' : ''}`} />
                                        <span className="text-[10px] tracking-widest uppercase font-bold text-white/40">{label}</span>
                                        {i < 3 && <span className="text-white/10 text-xs ml-3">|</span>}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN — archive signal */}
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
                            className="hidden xl:flex flex-col items-end justify-between flex-shrink-0 min-w-[100px] self-stretch pb-4">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-white/15 font-bold whitespace-nowrap">DAAMI EVENT</span>
                            <div className="flex flex-col items-end gap-2">
                                <button onClick={() => router.push('/hall-of-fame')}
                                    className="w-9 h-9 border border-[#D4AF37]/20 flex items-center justify-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                                    <Award className="w-4 h-4 text-[#D4AF37]/40 group-hover:text-[#D4AF37]" />
                                </button>
                                <span className="text-[8px] tracking-[0.25em] uppercase text-white/12 font-bold">Hall of Fame</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom editorial rule */}
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-10 mb-0 origin-right" />
                </motion.div>

                {/* Subtle background art image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
                    <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                        alt="Background art" className="w-full h-full object-cover opacity-10" />
                </div>
            </header>

            {/* ── PHILOSOPHY / IDENTITY SECTION ── */}
            <section id="about-section" className="py-16 md:py-24 px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* Section eyebrow */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">The Daami Event Philosophy</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    {/* Full-width pull quote */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="font-playfair text-2xl md:text-3xl lg:text-4xl italic leading-[1.5] text-white/80 border-l-2 border-[#D4AF37]/40 pl-5 md:pl-8 mb-12 md:mb-16 max-w-4xl"
                    >
                        &ldquo;They told your dreams don&apos;t pay, but your brush had more to say.
                        India has millions of stories.{' '}
                        <span className="text-[#D4AF37]">Let yours rise today.</span>&rdquo;
                    </motion.p>

                    {/* Thin divider */}
                    <div className="h-[1px] bg-white/5 mb-10" />

                    {/* Mission + Promise 2-col grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-6 md:p-8 border border-white/5 bg-white/[0.012] hover:border-[#D4AF37]/20 hover:bg-white/[0.022] transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-4 h-[2px] bg-[#D4AF37]" />
                                <span className="font-playfair font-bold text-[#D4AF37] text-base">Our Mission</span>
                            </div>
                            <p className="text-white/45 text-sm md:text-base leading-[1.9] font-lato font-light">
                                To democratize artistic recognition in India. Every artist, regardless of location or background, deserves a platform that treats their work with professional reverence.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-6 md:p-8 border border-white/5 bg-white/[0.012] hover:border-[#D4AF37]/20 hover:bg-white/[0.022] transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-4 h-[2px] bg-[#D4AF37]" />
                                <span className="font-playfair font-bold text-[#D4AF37] text-base">Our Promise</span>
                            </div>
                            <p className="text-white/45 text-sm md:text-base leading-[1.9] font-lato font-light">
                                Transparency, Fairness, and Opportunity. From expert jury panels to government-verified certificates — every layer of Daami Event is built to build your trust.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 2.5 TRUST SIGNALS */}
            < TrustSection />

            {/* 3. ABOUT & LEGACY */}
            < AboutSection />

            {/* 3.5 FEATURED ON */}
            < FeaturedOn />

            {/* 4. EVENTS PORTFOLIO (Upcoming & Ongoing) */}
            < EventsPortfolio />

            {/* 5. CURRENT EVENT SPOTLIGHT: Conversion */}
            < section id="events-section" className="py-32 px-6 relative overflow-hidden" >
                {/* Background Glow */}
                < div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" ></div >

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 order-2 lg:order-1">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                                    <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">Upcoming Events</span>
                                </div>
                                <h2 className="font-playfair text-5xl md:text-6xl text-white leading-tight">
                                    Indian Creative Star <br />
                                    <span className="text-purple-400">Season 3</span>
                                </h2>
                                <p className="text-xl text-white/60 leading-relaxed max-w-lg">
                                    The ultimate national art stage is returning soon. Plus, explore our upcoming <strong>Rang Kala Award</strong>!
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-white/80">
                                    <Star className="w-6 h-6 text-[#D4AF37]" />
                                    <span className="text-lg">Massive National Recognition</span>
                                </div>
                                <div className="flex items-center gap-4 text-white/80">
                                    <Award className="w-6 h-6 text-[#D4AF37]" />
                                    <span className="text-lg">Direct Access to the Portfolios</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="bg-white/10 text-white/40 border border-white/5 px-6 py-4 text-sm font-black tracking-widest uppercase cursor-default">
                                    Registration Opening Soon
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative group cursor-pointer" onClick={() => router.push('/winterartroyale/v2')}>
                            <div className="absolute inset-0 bg-blue-600 transform rotate-6 rounded-2xl opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                                <img
                                    src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
                                    alt="Winter Art Royale Season 2"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
                                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                                    </div>
                                    <p className="font-playfair text-2xl text-white">Watch Trailer</p>
                                    <p className="text-white/60 text-sm mt-2">Witness the glory of Season 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* 6. CREATIVE SHOWCASE & TESTIMONIALS */}
            {/* 5.5 CREATIVE STAR KIT */}
            <KitSection />

            {/* 6. AUTHENTIC FEEDBACK & TESTIMONIALS */}
            <HomeTestimonials />

            {/* 7. CONTACT SECTION */}
            <ContactSection />

            {/* ── FOOTER ── */}
            <footer className="relative z-10 border-t border-white/5 pt-14 pb-10 px-4 md:px-6 font-lato">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-8 h-[1px] bg-white/15" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">Daami Event</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                    <div className="grid md:grid-cols-4 gap-10 text-white/35 mb-12">
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={companyLogo.src} alt="Daami Event" className="h-8 w-8 object-cover rounded-full border border-[#D4AF37]/20" />
                                <span className="font-playfair text-base text-white/70 tracking-widest">DAAMI EVENT</span>
                            </div>
                            <p className="text-xs leading-relaxed text-white/25 max-w-sm">
                                Redefining artistic excellence through curated competition and events. Empowering the next generation of creators across India.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-bold mb-4">Navigation</p>
                            {[['/', 'Home'], ['/indiancreativestar/v2', 'Competitions'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                                <button key={href} onClick={() => router.push(href)} className="block text-xs text-white/25 hover:text-[#D4AF37] transition-colors">{label}</button>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-bold mb-4">Legal</p>
                            {[['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions'], ['Refund Policy', '/refund-and-cancellation']].map(([label, href]) => (
                                <button key={href} onClick={() => router.push(href)} className="block text-xs text-white/25 hover:text-[#D4AF37] transition-colors">{label}</button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[1px] bg-white/5 mb-6" />
                    <div className="text-center text-[9px] tracking-[0.25em] uppercase text-white/12">
                        © 2025 Daami Event. All Rights Reserved.
                    </div>
                </div>
            </footer>

            <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}</style>
        </div >
    );
};

export default Index;