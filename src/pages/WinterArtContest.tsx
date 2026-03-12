import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Trophy,
    Calendar,
    Users,
    ArrowRight,
    Star,
    Zap,
    Target,
    Award,
    CheckCircle2,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Play,
    Sparkles,
    Palette,
    Monitor,
    PenTool
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import warLogo from "@/assets/optimized_assets/war_logo_v2.webp";
import daamiLogo from "@/assets/optimized_assets/daami_logo.webp";
import founderPhoto from "@/assets/optimized_assets/founder_photo.webp";

// --- Retro Components ---

const RetroButton = ({ children, onClick, className = "", variant = "primary" }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" | "outline" }) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-bold uppercase tracking-wider transition-all transform active:translate-y-1 active:translate-x-1 focus:outline-none";

    const variants = {
        primary: "bg-[#FF90E8] text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1",
        secondary: "bg-[#23F0C7] text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1",
        outline: "bg-transparent text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0)]"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const RetroCard = ({ children, className = "", color = "bg-white" }: { children: React.ReactNode, className?: string, color?: string }) => {
    return (
        <div className={`${color} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 ${className}`}>
            {children}
        </div>
    );
};

const RetroHeading = ({ children, className = "", level = 1 }: { children: React.ReactNode, className?: string, level?: 1 | 2 | 3 }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizes = {
        1: "text-4xl md:text-6xl",
        2: "text-3xl md:text-5xl",
        3: "text-2xl md:text-3xl"
    };

    return (
        <Tag className={`font-black uppercase tracking-tight ${sizes[level]} ${className}`} style={{ fontFamily: '"Courier Prime", monospace' }}>
            {children}
        </Tag>
    );
};

const GlitchText = ({ text }: { text: string }) => {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#FF90E8] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-200 select-none block">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#23F0C7] opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200 select-none block">{text}</span>
        </div>
    );
};

// --- Page Layout ---

const WinterArtContest = () => {
    const navigate = useNavigate();

    // Asset Loading
    const miscAssets = import.meta.glob('@/assets/optimized_assets/*.webp', { eager: true, import: 'default' });
    const getAsset = (filename: string) => {
        const key = Object.keys(miscAssets).find(k => k.endsWith(filename));
        return key ? (miscAssets[key] as string) : filename;
    };

    // Scroll to section helper
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };



    const artistAvatars = [
        "avatar_v2_1.webp", "avatar_v2_2.webp", "avatar_v2_3.webp",
        "avatar_v2_4.webp", "avatar_v2_5.webp"
    ];

    // Fix for white flash on scroll (Mobile)
    useEffect(() => {
        // Save original styles
        const originalBg = document.body.style.backgroundColor;
        const originalOverscroll = document.body.style.overscrollBehaviorY;

        // Apply page-specific styles
        document.body.style.backgroundColor = "#FFFAF0"; // Match the page background
        document.body.style.overscrollBehaviorY = "none"; // Prevent elastic scrolling revealing white background

        return () => {
            // Restore original styles
            document.body.style.backgroundColor = originalBg;
            document.body.style.overscrollBehaviorY = originalOverscroll;
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFAF0] text-black font-sans selection:bg-[#FF90E8]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;700;900&display=swap');
                .font-mono { font-family: 'Courier Prime', monospace; }
                .font-sans { font-family: 'Inter', sans-serif; }
            `}</style>

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-[#FFFAF0] border-b-4 border-black h-20 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-4">
                    <img src={getAsset("daami_logo.webp")} alt="Daami Event" className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-black object-cover shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                    <div className="leading-none">
                        <div className="font-black text-xl md:text-2xl tracking-tighter uppercase font-mono">DAAMI EVENT</div>
                        <div className="font-bold text-[10px] md:text-sm bg-[#FF90E8] px-1 md:px-2 inline-block border border-black transform -rotate-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            WINTER EDITION
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['The Battle', 'Prizes', 'Legacy'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                            className="font-mono font-bold text-lg hover:text-[#FF90E8] hover:underline decoration-4 underline-offset-4 uppercase tracking-widest transition-all"
                        >
                            {item}
                        </button>
                    ))}
                    <RetroButton onClick={() => navigate('/winterartroyale/artcontest/register')}>
                        Enter W.A.R
                    </RetroButton>
                </div>

                <div className="md:hidden">
                    <RetroButton onClick={() => navigate('/winterartroyale/artcontest/register')} className="px-3 py-2 text-xs">
                        Enter W.A.R
                    </RetroButton>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 container mx-auto text-center overflow-x-hidden">
                <div className="absolute top-32 left-4 md:left-20 w-12 h-12 md:w-16 md:h-16 bg-[#FFC900] rounded-full border-4 border-black animate-bounce z-0"></div>
                <div className="absolute bottom-20 right-4 md:right-32 w-16 h-16 md:w-24 md:h-24 bg-[#23F0C7] transform rotate-12 border-4 border-black z-0"></div>

                <div className="relative z-10 inline-block mb-4 px-3 py-1 md:px-4 md:py-2 bg-black text-white font-mono text-xs md:text-base font-bold transform -rotate-2 shadow-[2px_2px_0px_rgba(255,144,232,1)]">
                    THE W.A.R EDITION
                </div>

                <RetroHeading level={1} className="mb-4 leading-tight relative z-10">
                    <span className="block text-4xl md:text-6xl mb-2"><GlitchText text="Winter Art Royale" /></span>
                    <span className="block text-[#FFC900] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-4xl md:text-8xl leading-none">
                        Art Competition
                    </span>
                </RetroHeading>

                <p className="text-base md:text-2xl font-bold max-w-2xl mx-auto mb-8 leading-relaxed border-l-4 md:border-l-8 border-[#FF90E8] pl-4 md:pl-6 text-left md:text-center relative z-10 bg-white/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 rounded-r-lg md:p-0 md:rounded-none">
                    India's National Art Contest is back. <br className="hidden md:block" />
                    Celebrate the winter season by creating art and joining the Winter Art Royale.
                </p>

                {/* Verified Artists Element (Real Images) */}
                <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-4 mb-8 bg-white/80 md:bg-transparent p-4 rounded-xl md:p-0 backdrop-blur-sm md:backdrop-blur-none inline-block mx-auto">
                    <div className="flex -space-x-3 md:-space-x-4">
                        {artistAvatars.map((img, i) => (
                            <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                                <img src={getAsset(img)} alt="Artist" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-[10px] md:text-xs font-bold">
                            +200
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="flex justify-center md:justify-start items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={14} className="fill-[#FFC900] text-[#FFC900]" />
                            ))}
                        </div>
                        <p className="text-xs md:text-sm font-bold flex items-center gap-1 justify-center md:justify-start">
                            4.9 • Verified by Google <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className="w-3 h-3 md:w-4 md:h-4" />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <RetroButton onClick={() => navigate('/winterartroyale/artcontest/register')} variant="primary" className="w-full md:w-auto text-xl">
                        Register Now
                    </RetroButton>
                    <RetroButton onClick={() => scrollToSection('prizes')} variant="outline" className="w-full md:w-auto text-xl">
                        See The Prizes
                    </RetroButton>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 px-4 bg-[#FF90E8] border-y-4 border-black">
                <div className="container mx-auto text-center mb-8">
                    <RetroHeading level={2} className="inline-block bg-black text-[#23F0C7] px-4 py-2 transform -rotate-1 mb-6">
                        OFFICIAL TRANSMISSION
                    </RetroHeading>
                </div>
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto bg-black p-4 md:p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] relative">
                        {/* Monitor Controls Decoration */}
                        <div className="absolute top-4 right-8 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border-4 border-gray-800 shadow-inner">
                            <iframe
                                src="https://player.vimeo.com/video/1148449886?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                title="Winter Art Royale Intro"
                                loading="lazy"
                            ></iframe>
                            {/* CRT Scanline Overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 pointer-events-none"></div>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-gray-500 font-mono text-xs md:text-sm">
                            <span>COMMS_LINK_ESTABLISHED</span>
                            <span className="flex items-center gap-2"><Monitor size={16} /> SYSTEM_READY</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="p-6 border-2 border-gray-800 hover:border-[#23F0C7] transition-colors">
                        <h3 className="text-[#23F0C7] text-3xl md:text-6xl font-black mb-2 font-mono" style={{ textShadow: "4px 4px 0 #000" }}>₹1.5L+</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-base">Prize Pool</p>
                    </div>
                    <div className="p-6 border-2 border-gray-800 hover:border-[#FF90E8] transition-colors">
                        <h3 className="text-[#FF90E8] text-4xl md:text-6xl font-black mb-2 font-mono" style={{ textShadow: "4px 4px 0 #000" }}>3</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-base">Categories</p>
                    </div>
                    <div className="p-6 border-2 border-gray-800 hover:border-[#FFC900] transition-colors">
                        <h3 className="text-[#FFC900] text-4xl md:text-6xl font-black mb-2 font-mono" style={{ textShadow: "4px 4px 0 #000" }}>9</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-base">Winners</p>
                    </div>
                    <div className="p-6 border-2 border-gray-800 hover:border-white transition-colors">
                        <h3 className="text-white text-4xl md:text-6xl font-black mb-2 font-mono" style={{ textShadow: "4px 4px 0 #000" }}>4</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-base">Guaranteed Rewards</p>
                    </div>
                </div>
            </section>

            {/* ⚔️ THE BATTLE PLAN (Stages) - Retro Style */}
            <section id="battle-plan" className="py-16 md:py-24 px-4 container mx-auto bg-[#FFFAF0] border-b-4 border-black">
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#FF90E8] border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 transform rotate-2">
                        Tactical Roadmap
                    </div>
                    <RetroHeading level={2}>
                        THE BATTLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#23F0C7] to-blue-600">PLAN</span>
                    </RetroHeading>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-2 bg-black z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
                        {[
                            { step: "01", title: "Register", desc: "Enlist for the competition.", icon: Users, color: "bg-[#FF90E8]" },
                            { step: "02", title: "Alliance", desc: "Join the War Room (WhatsApp).", icon: Users, color: "bg-[#23F0C7]" },
                            { step: "03", title: "Briefing", desc: "Get info & submission link in group.", icon: Monitor, color: "bg-[#FFC900]" },
                            { step: "04", title: "Submit", desc: "Submit your artworks.", icon: Palette, color: "bg-white" },
                            { step: "05", title: "Result", desc: "Champions Crowned.", icon: Trophy, color: "bg-[#FF90E8]" }
                        ].map((stage, i) => (
                            <div key={i} className="flex flex-row md:flex-col items-center gap-6 md:gap-0 group">
                                {/* Node Marker */}
                                <div className={`w-24 h-24 md:w-24 md:h-24 flex-shrink-0 rounded-none border-4 border-black ${stage.color} flex items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-none transition-all`}>
                                    <stage.icon className="w-8 h-8 md:w-10 md:h-10 text-black stroke-[3px]" />
                                    <div className="absolute -top-3 -right-3 bg-black text-white text-xs font-mono px-2 py-0.5 border border-white">
                                        {stage.step}
                                    </div>
                                </div>

                                <div className="md:text-center md:mt-8 pt-2">
                                    <h3 className="text-xl font-black uppercase mb-1">{stage.title}</h3>
                                    <p className="text-gray-600 font-bold text-sm leading-tight max-w-[150px] md:mx-auto">{stage.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📜 ABOUT: DAAMI EVENT - Retro Newspaper Style */}
            <section id="about" className="py-16 md:py-24 px-4 bg-gray-100 border-b-4 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] opacity-30"></div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-6xl mx-auto bg-[#FFFAF0] border-4 border-black p-4 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                        {/* Header */}
                        <div className="border-b-4 border-black pb-8 mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <h4 className="font-mono text-sm font-bold text-gray-500 mb-2">EST. 2024 • SIKKIM, INDIA</h4>
                                <RetroHeading level={2} className="text-5xl md:text-7xl">
                                    DAAMI EVENT
                                </RetroHeading>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-sm font-bold bg-black text-white inline-block px-2 py-1 rotate-2">OFFICIAL ORGANIZERS</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Column 1: Text */}
                            {/* Column 1: Text */}
                            <div className="space-y-6">
                                <p className="text-2xl font-bold leading-tight">
                                    "We are discovering the Creative Stars of India."
                                </p>
                                <p className="font-mono text-sm md:text-base leading-relaxed text-justify">
                                    Daami Event is an emerging event firm and proud organizers of <strong className="bg-[#FFC900] px-1">Indian Creative Star</strong> (Art Competition). Our mission is to unearth talent from every corner of the nation and provide them with the recognition they deserve.
                                </p>
                                <p className="font-bold flex items-center gap-3">
                                    <Sparkles className="fill-black" />
                                    Officially supported by the Government of Sikkim.
                                </p>

                                {/* New Quote Section */}
                                <div className="p-6 bg-[#23F0C7] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative mt-8">
                                    <div className="absolute -top-3 -left-3 bg-black text-white px-2 font-mono text-xs transform -rotate-2">
                                        WORDS FROM THE MINISTER
                                    </div>
                                    <p className="font-bold italic text-sm leading-relaxed mb-4">
                                        "Daami Event is doing a commendable job for society and the artistic community. Initiatives like these are crucial for preserving and promoting our rich cultural heritage."
                                    </p>
                                    <div className="text-right font-mono text-xs font-bold border-t-2 border-black pt-2">
                                        - GT DHUNGEL SIR
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Photo */}
                            <div className="relative">
                                <div className="aspect-[4/3] bg-gray-300 border-4 border-black relative transition-all duration-500">
                                    <img src={founderPhoto} alt="Founder" className="w-full h-full object-cover" />
                                    {/* Tape effect */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 transform -rotate-2 border border-yellow-300/50 shadow-sm"></div>
                                </div>
                                <div className="mt-4 font-mono text-xs border-l-4 border-black pl-4">
                                    <p className="font-black uppercase text-lg">GT Dhungel Sir</p>
                                    <p className="font-bold text-[#FF90E8] bg-black inline-block px-1 mb-1">Founder & Patron</p>
                                    <p className="text-gray-600 font-bold">Hon'ble Culture Minister, Sikkim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prizes Section - The Spoils of War */}
            <section id="prizes" className="py-16 md:py-24 px-4 container mx-auto">
                <RetroHeading level={2} className="text-center mb-16">The <span className="bg-[#FFC900] px-2">Spoils</span> of War</RetroHeading>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end">
                    {/* 2nd Prize */}
                    <RetroCard className="h-full flex flex-col items-center text-center order-2 md:order-1 lg:translate-y-8" color="bg-white">
                        <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-black mb-6 flex items-center justify-center">
                            <span className="text-3xl font-black text-gray-400">2</span>
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-2">2nd Prize</h3>
                        <p className="text-4xl font-black text-gray-500 mb-6">₹25,000</p>
                        <ul className="text-left w-full space-y-2 text-sm font-bold opacity-80">
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0" /> Cash Prize</li>
                            <li className="flex items-start gap-2"><Trophy size={16} className="mt-1 flex-shrink-0" /> Trophy & Medal Delivered to Home</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0" /> Certificate of Excellence</li>
                        </ul>
                    </RetroCard>

                    {/* 1st Prize */}
                    <RetroCard className="h-full flex flex-col items-center text-center order-1 md:order-2 z-10 scale-105" color="bg-[#FF90E8]">
                        <div className="absolute -top-6">
                            <Trophy size={64} className="text-black fill-[#FFC900] drop-shadow-[4px_4px_0px_white]" />
                        </div>
                        <div className="mt-12 mb-6">
                            <span className="bg-black text-[#FFC900] px-4 py-1 text-sm font-bold uppercase tracking-widest border-2 border-white">Champion</span>
                        </div>
                        <h3 className="text-3xl font-black uppercase mb-2">1st Prize</h3>
                        <p className="text-5xl font-black text-black mb-6">₹35,000</p>
                        <ul className="text-left w-full space-y-3 text-sm font-bold">
                            <li className="flex items-start gap-2"><Star size={16} className="mt-1 flex-shrink-0 fill-black" /> Grand Cash Prize</li>
                            <li className="flex items-start gap-2"><Trophy size={16} className="mt-1 flex-shrink-0 fill-black" /> Trophy & Medal Delivered to Home</li>
                            <li className="flex items-start gap-2"><Star size={16} className="mt-1 flex-shrink-0 fill-black" /> Exclusive Media Feature</li>
                        </ul>
                    </RetroCard>

                    {/* 3rd Prize */}
                    <RetroCard className="h-full flex flex-col items-center text-center order-3 md:order-3 lg:translate-y-8" color="bg-white">
                        <div className="w-20 h-20 bg-[#D4A574] rounded-full border-4 border-black mb-6 flex items-center justify-center relative overflow-hidden">
                            <span className="text-3xl font-black text-[#8B5A2B] z-10">3</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-2">3rd Prize</h3>
                        <p className="text-4xl font-black text-[#D4A574] mb-6">₹15,000</p>
                        <ul className="text-left w-full space-y-2 text-sm font-bold opacity-80">
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0" /> Cash Prize</li>
                            <li className="flex items-start gap-2"><Trophy size={16} className="mt-1 flex-shrink-0" /> Trophy & Medal Delivered to Home</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0" /> Social Shoutout</li>
                        </ul>
                    </RetroCard>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl font-bold mb-6">Plus <span className="bg-[#23F0C7] px-2 text-black border-2 border-black">15+ Category Awards</span> & Certificates for ALL participants!</p>
                    <RetroButton onClick={() => navigate('/winterartroyale/submission/intro')} variant="secondary">
                        See All Prizes
                    </RetroButton>
                </div>
            </section>

            {/* 🎖️ CAREER MILESTONE - Retro Style */}
            <section className="py-16 md:py-24 px-4 container mx-auto border-t-4 border-black bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>

                <div className="text-center mb-16 relative z-10">
                    <div className="inline-block bg-[#23F0C7] border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        CAREER MILESTONE
                    </div>
                    <RetroHeading level={2} className="mb-4">
                        GUARANTEED <span className="text-[#FF90E8] bg-black px-2">REWARDS</span>
                    </RetroHeading>
                    <p className="text-xl font-bold max-w-2xl mx-auto border-l-4 border-[#FFC900] pl-4 text-left md:text-center md:border-l-0 md:pl-0">
                        What You Get When You Join Winter Art Royale
                    </p>
                    <div className="mt-8 inline-block bg-black text-white p-4 border-4 border-[#FFC900] shadow-[8px_8px_0px_0px_rgba(35,240,199,1)] transform rotate-1">
                        <p className="font-mono font-bold text-sm md:text-lg">
                            4 Official Recognition Documents you will receive <span className="text-[#FFC900]">in 3 Days</span> after submission.
                        </p>
                    </div>
                </div>



                <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10 mb-16">
                    {/* COL 1: CERTIFICATES */}
                    <RetroCard className="flex flex-col gap-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300" color="bg-[#FFFAF0]">
                        <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-2">Certificates</h3>
                        <p className="font-bold text-sm text-gray-600 mb-4">Digitally verifiable proofs of your artistic valor.</p>

                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="fill-[#FFC900] text-black w-6 h-6" />
                                    <span className="font-black uppercase text-lg">Excellence</span>
                                </div>
                                <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                    <img src={getAsset("cert_excellence.webp")} alt="Certificate of Creative Excellence" className="w-full transition-all duration-300" />
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="fill-[#23F0C7] text-black w-6 h-6" />
                                    <span className="font-black uppercase text-lg">Participation</span>
                                </div>
                                <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                    <img src={getAsset("cert_participation.webp")} alt="Certificate of Participation" className="w-full transition-all duration-300" />
                                </div>
                            </div>
                        </div>
                    </RetroCard>

                    {/* COL 2: ID & LETTER */}
                    <div className="flex flex-col gap-8">
                        {/* ARTIST ID */}
                        <RetroCard className="flex-1 transform rotate-1 hover:rotate-0 transition-transform duration-300" color="bg-[#e0f2fe]">
                            <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-2">Artist ID</h3>
                            <p className="font-bold text-sm text-gray-600 mb-4">Your professional identity.</p>

                            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                                <img src={getAsset("artist_id_card.webp")} alt="Artist ID Card" className="w-full" />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center font-mono text-xs font-bold">
                                <span className="bg-black text-white px-2 py-1">NATIONAL LEVEL</span>
                                <span className="bg-[#FF90E8] text-black border border-black px-2 py-1">LIFETIME VALIDITY</span>
                            </div>
                        </RetroCard>

                        {/* APPRECIATION LETTER */}
                        <RetroCard className="flex-1 bg-black text-white relative overflow-hidden" color="bg-black">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto bg-[#FFC900] rounded-full border-2 border-white flex items-center justify-center text-2xl mb-4">✍️</div>
                                <h3 className="text-xl font-black uppercase text-[#FFC900] mb-4">Letter of Appreciation</h3>
                                <p className="font-mono text-sm leading-relaxed mb-6 italic opacity-90">
                                    "An exclusive honor signed by the <span className="text-[#FFC900] font-bold">Culture Minister</span>. A powerful endorsement of your contribution."
                                </p>
                                <div className="inline-block border-2 border-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                                    Signed & Sealed W.A.R
                                </div>
                            </div>
                        </RetroCard>
                    </div>
                </div>

                <div className="bg-[#FF90E8] border-4 border-black p-4 text-center font-bold text-sm md:text-lg uppercase tracking-tight shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
                    Every Participant Receives Official Certificate, Artist ID Card & Appreciation Letter.
                </div>

                {/* MOCKUP MARQUEE */}
                <div className="mt-16 -mx-4 md:-mx-20 overflow-hidden bg-black py-8 border-y-4 border-black transform -rotate-1">
                    <motion.div
                        className="flex gap-8 whitespace-nowrap pl-4"
                        animate={{ x: "-50%" }}
                        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                    >
                        {[
                            "recognition_1.webp", "recognition_2.webp", "recognition_3.webp",
                            "recognition_1.webp", "recognition_2.webp", "recognition_3.webp"
                        ].map((img, i) => (
                            <div key={i} className="w-64 md:w-80 border-4 border-white transition-all duration-300">
                                <img src={getAsset(img)} alt="Mockup" className="w-full h-auto" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ART IS WAR - Categories */}
            <section className="py-16 md:py-24 px-4 container mx-auto bg-[#FFFAF0] border-t-4 border-black">
                <div className="text-center mb-16">
                    <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1 mb-4 inline-block transform rotate-2">
                        CHOOSE YOUR ARENA
                    </span>
                    <RetroHeading level={2}>
                        ART IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">WAR</span>
                    </RetroHeading>
                    <p className="text-lg font-bold mt-4">The battlefield is open for all forms of visual expression.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Traditional Art", icon: Palette, color: "bg-[#FF90E8]", desc: "Oil, Acrylic, Watercolor, Charcoal. The classic masters' approach." },
                        { title: "Sketch & Mixed", icon: PenTool, color: "bg-[#23F0C7]", desc: "Ink, Doodling, Mandala, Mixed Media." },
                        { title: "Digital Art", icon: Monitor, color: "bg-[#FFC900]", desc: "2D/3D Illustrations, Concept Art." }
                    ].map((cat, i) => (
                        <RetroCard key={i} className="text-center group hover:-translate-y-2 transition-transform" color="bg-white">
                            <div className={`w-20 h-20 mx-auto ${cat.color} border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all`}>
                                <cat.icon size={40} className="stroke-[2.5px]" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4">{cat.title}</h3>
                            <p className="font-bold text-gray-600 leading-relaxed">{cat.desc}</p>
                        </RetroCard>
                    ))}
                </div>
            </section>

            {/* ELIGIBILITY & GUIDELINES */}
            <section className="py-16 md:py-24 px-4 bg-black text-white border-y-4 border-[#23F0C7]">
                <div className="container mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <RetroHeading level={3} className="text-[#23F0C7] mb-8">Who Can Participate?</RetroHeading>
                        <p className="text-xl font-bold mb-8 text-gray-300">The Winter Art Royale is open to all Indian citizens.</p>

                        <div className="space-y-6">
                            <div className="bg-gray-900 border-2 border-gray-700 p-6 shadow-[8px_8px_0px_0px_#23F0C7]">
                                <h4 className="text-xl font-black uppercase mb-2 text-[#23F0C7] flex items-center gap-2"><div className="w-3 h-3 bg-[#23F0C7]"></div> Junior Category</h4>
                                <p className="font-mono text-sm leading-relaxed">Artists aged under 18 years.</p>
                            </div>
                            <div className="bg-gray-900 border-2 border-gray-700 p-6 shadow-[8px_8px_0px_0px_#FF90E8]">
                                <h4 className="text-xl font-black uppercase mb-2 text-[#FF90E8] flex items-center gap-2"><div className="w-3 h-3 bg-[#FF90E8]"></div> Senior Category</h4>
                                <p className="font-mono text-sm leading-relaxed">Professional & Amateur artists aged 18+.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <RetroHeading level={3} className="text-[#FFC900] mb-8">Submission Guidelines</RetroHeading>
                        <p className="text-lg font-bold mb-8 text-gray-300">Ensure your artwork aligns with the "Winter" theme.</p>

                        <ul className="space-y-4">
                            {[
                                "High-resolution images (JPEG/PNG) required.",
                                "Max file size: 10MB per submission.",
                                "Original works only. Plagiarism leads to disqualification."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 font-mono font-bold text-sm bg-gray-900 p-4 border border-gray-700">
                                    <CheckCircle className="text-[#FFC900] shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ENTRY FEE DETAILS */}
            <section id="entry-fee" className="py-16 md:py-24 px-4 bg-[#FFFAF0] border-b-4 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1 mb-4 inline-block transform -rotate-2">
                            INVEST IN YOUR LEGACY
                        </span>
                        <RetroHeading level={2}>
                            ENTRY <span className="text-[#23F0C7] bg-black px-2">FEE</span> DETAILS
                        </RetroHeading>
                        <p className="text-lg font-bold mt-4 max-w-2xl mx-auto">Choose your path to glory. Small investment, massive returns.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* ₹299 Plan */}
                        <div className="relative group">
                            <RetroCard className="h-full flex flex-col relative z-10 hover:-translate-y-2 transition-transform duration-300" color="bg-white">
                                <div className="bg-black text-white p-4 -mx-6 -mt-6 mb-6 border-b-4 border-black flex justify-between items-center">
                                    <h3 className="text-2xl font-black uppercase">Standard</h3>
                                    <span className="font-mono text-[#23F0C7] font-bold">STARTER</span>
                                </div>

                                <div className="mb-6 text-center">
                                    <span className="text-5xl font-black font-mono">₹299</span>
                                    <span className="text-gray-600 font-bold ml-2">/ Entry</span>
                                </div>

                                <ul className="space-y-4 flex-grow mb-8">
                                    {[
                                        "Submit 1 Artwork",
                                        "Participation Certificate (Digital)",
                                        "Creative Excellence Certificate (Digital)",
                                        "Artist ID Card (Digital)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 font-mono font-bold text-sm">
                                            <CheckCircle className="text-black shrink-0 fill-[#23F0C7]" size={20} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className="w-full bg-black text-white hover:bg-[#23F0C7] hover:text-black border-2 border-black font-bold uppercase py-6 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                    onClick={() => navigate('/winterartroyale/submission/intro')}
                                >
                                    Select Standard
                                </Button>
                            </RetroCard>
                        </div>

                        {/* ₹499 Plan */}
                        <div className="relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 bg-[#FFC900] border-4 border-black px-4 py-1 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2">
                                Best Value ✅
                            </div>
                            <RetroCard className="h-full flex flex-col relative z-10 border-[#FFC900] hover:-translate-y-2 transition-transform duration-300" color="bg-[#FFFAF0]">
                                <div className="bg-black text-white p-4 -mx-6 -mt-6 mb-6 border-b-4 border-black flex justify-between items-center">
                                    <h3 className="text-2xl font-black uppercase text-[#FFC900]">Premium</h3>
                                    <span className="font-mono text-[#FFC900] font-bold">PRO</span>
                                </div>

                                <div className="mb-6 text-center">
                                    <span className="text-5xl font-black font-mono">₹499</span>
                                    <span className="text-gray-600 font-bold ml-2">/ Entry</span>
                                </div>

                                <ul className="space-y-4 flex-grow mb-8">
                                    {[
                                        "Submit 2 Artworks",
                                        "Participation Certificate (Home Delivered)",
                                        "Creative Excellence Certificate (Home Delivered)",
                                        "Personal Artist Portfolio Website",
                                        "Artist ID Card (Digital)",
                                        "Appreciation Letter (Home Delivered)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 font-mono font-bold text-sm">
                                            <CheckCircle className="text-black shrink-0 fill-[#FFC900]" size={20} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-center font-bold text-xs bg-[#FF90E8] border-2 border-black p-2 mb-4 transform -rotate-1">
                                    No Extra Charges. All Inclusive.
                                </div>

                                <Button
                                    className="w-full bg-[#FFC900] text-black hover:bg-black hover:text-[#FFC900] border-2 border-black font-bold uppercase py-6 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                    onClick={() => navigate('/winterartroyale/submission/intro')}
                                >
                                    Select Premium
                                </Button>
                            </RetroCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artist Recognition - Retro Marquee */}
            <section className="py-16 bg-[#FF90E8] border-y-4 border-black overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>

                <div className="relative mb-8 text-center">
                    <RetroHeading level={2} className="text-black bg-white inline-block px-4 py-2 border-4 border-black transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        JOIN THE HALL OF FAME
                    </RetroHeading>
                </div>

                <div className="flex overflow-hidden relative z-10 bg-black py-4 border-y-4 border-black transform rotate-1 scale-105">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: "-50%" }}
                        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                <span className="text-[#23F0C7] font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-4">
                                    <Star className="fill-[#23F0C7]" /> Official Certificate
                                </span>
                                <span className="text-[#FFC900] font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-4">
                                    <Trophy className="fill-[#FFC900]" /> National Recognition
                                </span>
                                <span className="text-white font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-4">
                                    <Users className="fill-white" /> Artist Community
                                </span>
                                <span className="text-[#FF90E8] font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-4">
                                    <Award className="fill-[#FF90E8]" /> Cash Prizes
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="container mx-auto grid md:grid-cols-2 gap-8 mt-16 px-4">
                    <RetroCard className="text-left" color="bg-[#23F0C7]">
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                            <Award size={32} />
                            CERTIFIED EXCELLENCE
                        </h3>
                        <p className="font-bold text-lg mb-4">Every participant receives verifiable proof of their artistic journey.</p>
                        <ul className="space-y-2 font-mono text-sm">
                            <li className="border-b-2 border-black pb-1">1. Certificate of Excellence</li>
                            <li className="border-b-2 border-black pb-1">2. Letter of Appreciation</li>
                            <li className="border-b-2 border-black pb-1">3. Official Artist ID Card</li>
                        </ul>
                    </RetroCard>

                    <RetroCard className="text-left" color="bg-white">
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                            <Users size={32} />
                            LIFETIME COMMUNITY
                        </h3>
                        <p className="font-bold text-lg mb-4">Join an elite network of creators.</p>
                        <ul className="space-y-2 font-mono text-sm">
                            <li className="border-b-2 border-black pb-1">★ Networking Opportunities</li>
                            <li className="border-b-2 border-black pb-1">★ Future Event Discounts</li>
                            <li className="border-b-2 border-black pb-1">★ Skill Building Workshops</li>
                        </ul>
                    </RetroCard>
                </div>
            </section>

            {/* TESTIMONIALS - Retro Grid */}
            <section className="py-16 md:py-24 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <RetroHeading level={2} className="mb-4">
                        FROM <span className="bg-[#23F0C7] px-2 text-black">SEASON 1</span>
                    </RetroHeading>
                    <div className="inline-block bg-black text-[#FFC900] px-4 py-2 text-xl font-bold font-mono rotate-1 border-2 border-[#FFC900]">
                        4.9/5 from 300+ Artists
                    </div>
                </div>

                <div className="bg-[#FF90E8] p-4 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <motion.div
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }}
                    >
                        {[
                            { name: "Ananya R.", role: "Verified Artist", text: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google", initial: "A" },
                            { name: "Rahul V.", role: "Verified Artist", text: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified", initial: "R" },
                            { name: "Simran K.", role: "Verified Artist", text: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google", initial: "S" },
                            { name: "Vikram S.", role: "Verified Artist", text: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified", initial: "V" },
                            { name: "Priya M.", role: "Verified Artist", text: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google", initial: "P" },
                            { name: "Arjun D.", role: "Verified Artist", text: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified", initial: "A" },
                            { name: "Neha G.", role: "Verified Artist", text: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google", initial: "N" },
                            { name: "Kabir J.", role: "Verified Artist", text: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified", initial: "K" },
                            { name: "Rohan M.", role: "Verified Artist", text: "The best platform for emerging artists. The exposure is unmatched.", source: "Google", initial: "R" },
                            { name: "Sneha P.", role: "Verified Artist", text: "Loved the transparency and fair judging process. Felt truly valued.", source: "Verified", initial: "S" },
                            { name: "Aditya K.", role: "Verified Artist", text: "Got my certificate on time. Very professional team and smooth workflow.", source: "Google", initial: "A" },
                            { name: "Meera S.", role: "Verified Artist", text: "A great confidence booster for my daughter. She loved participating!", source: "Verified", initial: "M" },
                            { name: "Varun T.", role: "Verified Artist", text: "The prize money is real! Amazing experience to be rewarded for my passion.", source: "Google", initial: "V" },
                            { name: "Ishita B.", role: "Verified Artist", text: "Seamless submission process. Highly recommend to all my artist friends.", source: "Verified", initial: "I" },
                            { name: "Karan L.", role: "Verified Artist", text: "The community support is fantastic. I learned so much from other participants.", source: "Google", initial: "K" },
                            { name: "Pooja R.", role: "Verified Artist", text: "Winter Art Royale is a game changer for the Indian art scene.", source: "Verified", initial: "P" },
                            { name: "Dev N.", role: "Verified Artist", text: "Showcased my work to a national audience. Thank you Daami Event!", source: "Google", initial: "D" },
                            { name: "Sanya G.", role: "Verified Artist", text: "Can't wait for the next season! Already preparing my entry.", source: "Verified", initial: "S" }
                        ].map((t, i) => (
                            <div key={i} className="min-w-[300px] bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xl border-2 border-white">
                                            {t.initial}
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase">{t.name}</h4>
                                            <p className="text-[10px] bg-[#23F0C7] px-1 inline-block border border-black font-bold">VERIFIED ARTIST</p>
                                        </div>
                                    </div>
                                    {t.source === "Google" && <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 grayscale opacity-50" />}
                                </div>
                                <p className="font-mono text-sm font-bold leading-relaxed">"{t.text}"</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* RAW SNAPSHOTS */}
            <section className="py-16 bg-[#FFC900] border-y-4 border-black overflow-hidden">
                <div className="text-center mb-8">
                    <RetroHeading level={2} className="inline-block bg-white px-4 py-2 border-4 border-black transform -rotate-1">
                        RAW SNAPSHOTS
                    </RetroHeading>
                    <p className="font-bold mt-2">Unfiltered love from our community</p>
                </div>

                <div className="columns-2 md:columns-4 gap-4 px-4 container mx-auto space-y-4">
                    {[
                        "snapshot_1.webp", "snapshot_2.webp", "snapshot_3.webp", "snapshot_4.webp",
                        "snapshot_5.webp", "snapshot_6.webp", "snapshot_7.webp"
                    ].map((img, i) => (
                        <div key={i} className="break-inside-avoid border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                            <img src={getAsset(img)} alt={`Snapshot ${i}`} className="w-full h-auto object-cover transition-all" />
                            <div className="bg-black text-white text-[10px] font-mono text-center mt-2 py-1 uppercase font-bold">
                                User Review Snapshot {i}
                            </div>
                        </div>
                    ))}
                    <div className="break-inside-avoid border-4 border-black bg-[#FF90E8] flex items-center justify-center p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[200px]">
                        <div className="text-center">
                            <h4 className="font-black text-2xl mb-2">YOU?</h4>
                            <p className="font-mono text-xs font-bold">Join us and be part of the legacy.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 px-4 container mx-auto bg-white border-y-4 border-black relative overflow-hidden">
                <div className="text-center mb-16 relative z-10">
                    <div className="inline-block bg-[#FF90E8] px-3 py-1 font-mono font-bold border-2 border-black rotate-3 mb-4">
                        EXCLUSIVE LOOT
                    </div>
                    <RetroHeading level={2}>
                        CREATIVE STAR <span className="text-outline-black text-[#23F0C7]">KIT</span>
                    </RetroHeading>
                    <p className="font-bold text-lg mt-4 max-w-2xl mx-auto">
                        The ultimate arsenal for every artist. Delivered to your doorstep (for winners) or digital access for all.
                    </p>
                </div>

                <div className="space-y-8 relative z-10">
                    {/* ROW 1: Left to Right */}
                    <div className="relative overflow-hidden group border-y-2 border-black bg-gray-100 py-4 transform -rotate-1">
                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: "-50%" }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        >
                            {[
                                "kit_1.webp", "kit_2.webp", "kit_3.webp", "kit_4.webp", "kit_5.webp", "kit_6.webp"
                            ].concat([
                                "kit_1.webp", "kit_2.webp", "kit_3.webp", "kit_4.webp", "kit_5.webp", "kit_6.webp"
                            ]).concat([
                                "kit_1.webp", "kit_2.webp", "kit_3.webp", "kit_4.webp", "kit_5.webp", "kit_6.webp"
                            ]).concat([
                                "kit_1.webp", "kit_2.webp", "kit_3.webp", "kit_4.webp", "kit_5.webp", "kit_6.webp"
                            ]).map((img, i) => (
                                <div key={i} className="w-[200px] aspect-square border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 relative group/item">
                                    <img src={getAsset(img)} alt={`Kit Item ${i}`} className="w-full h-full object-cover transition-all" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ROW 2: Right to Left */}
                    <div className="relative overflow-hidden group border-y-2 border-black bg-gray-100 py-4 transform rotate-1 mt-8">
                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: "-50%" }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        >
                            {[
                                "kit_7.webp", "kit_8.webp", "kit_9.webp", "kit_10.webp", "kit_11.webp"
                            ].concat([
                                "kit_7.webp", "kit_8.webp", "kit_9.webp", "kit_10.webp", "kit_11.webp"
                            ]).concat([
                                "kit_7.webp", "kit_8.webp", "kit_9.webp", "kit_10.webp", "kit_11.webp"
                            ]).concat([
                                "kit_7.webp", "kit_8.webp", "kit_9.webp", "kit_10.webp", "kit_11.webp"
                            ]).map((img, i) => (
                                <div key={i} className="w-[200px] aspect-square border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 relative group/item">
                                    <img src={getAsset(img)} alt={`Kit Item ${i}`} className="w-full h-full object-cover transition-all" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="text-center mt-12 relative z-10">
                    <div className="inline-block bg-[#FFC900] border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-mono font-bold text-xl">
                            "I received my kit and it's absolutely DAAMI!" - <span className="italic">Past Winner</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* PRIZE CEREMONY HIGHLIGHT */}
            <section className="py-16 md:py-24 px-4 bg-black text-white border-y-4 border-[#23F0C7] overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="container mx-auto text-center mb-16 relative z-10">
                    <span className="font-mono text-xs font-bold bg-[#FF90E8] text-black px-2 py-1 mb-4 inline-block transform rotate-2">
                        GRAND EVENT
                    </span>
                    <RetroHeading level={2} className="text-[#23F0C7]">
                        PRIZE <span className="text-white">CEREMONY</span> HIGHLIGHT
                    </RetroHeading>
                    <p className="text-xl font-bold mt-4 text-gray-400">Moments of glory. Where talent meets its reward.</p>
                </div>

                {/* Marquee Gallery */}
                <div className="relative">
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

                    <div className="flex overflow-hidden relative z-0">
                        <motion.div
                            className="flex gap-8 whitespace-nowrap"
                            animate={{ x: "-50%" }}
                            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        >
                            {[
                                "ceremony_1.webp", "ceremony_2.webp", "ceremony_3.webp",
                                "ceremony_4.webp", "ceremony_5.webp", "ceremony_6.webp"
                            ].concat([
                                "ceremony_1.webp", "ceremony_2.webp", "ceremony_3.webp",
                                "ceremony_4.webp", "ceremony_5.webp", "ceremony_6.webp"
                            ]).concat([
                                "ceremony_1.webp", "ceremony_2.webp", "ceremony_3.webp",
                                "ceremony_4.webp", "ceremony_5.webp", "ceremony_6.webp"
                            ]).concat([
                                "ceremony_1.webp", "ceremony_2.webp", "ceremony_3.webp",
                                "ceremony_4.webp", "ceremony_5.webp", "ceremony_6.webp"
                            ]).map((img, i) => (
                                <div key={i} className="h-[250px] md:h-[400px] w-auto border-4 border-white grayscale-0 transition-all duration-300 hover:scale-105 relative group shrink-0">
                                    <img src={getAsset(img)} alt={`Ceremony Moment ${i}`} className="w-auto h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-mono p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        Celebrating Excellence
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="text-center mt-12 relative z-10">
                    <p className="font-mono text-[#23F0C7] text-sm md:text-base blinking-cursor">
                        &gt; CELEBRATING_EXCELLENCE_
                    </p>
                </div>
            </section>

            {/* PREVIOUS WINNERS - Statistics & Collage */}
            <section className="py-16 md:py-24 px-4 container mx-auto bg-[#FFFAF0] relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
                                <img src={getAsset("previous_winners_collage.jpg")} alt="Previous Winners Collage" className="relative z-10 border-4 border-black w-full" />
                            </div>
                        </div>
                        <div className="order-1 md:order-2 text-center md:text-left">
                            <RetroHeading level={2} className="mb-6">
                                OUR PREVIOUS <span className="bg-[#FFC900] px-2">WINNERS</span>
                            </RetroHeading>
                            <p className="font-bold text-lg md:text-xl leading-relaxed mb-8">
                                Last year, we hosted two art contests with <span className="bg-black text-white px-1">455 artists</span>, awarded <span className="bg-[#FF90E8] px-1 border-2 border-black">9 winners</span>, distributed a total prize pool of <span className="text-[#FFC900] bg-black px-1">₹1,10,000</span>, and provided certificates to all participants.
                            </p>
                            <div className="inline-block bg-[#23F0C7] border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
                                <span className="font-black uppercase tracking-wider">View Hall of Fame</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MASTERPIECES - Scrolling Gallery */}
            <section className="py-16 md:py-24 bg-black border-y-4 border-[#23F0C7] overflow-hidden relative">
                <div className="text-center mb-16 relative z-10 px-4">
                    <RetroHeading level={2} className="text-[#23F0C7] mb-4">
                        AMAZING ARTWORKS <br className="md:hidden" /> SUBMITTED BY OUR ARTISTS
                    </RetroHeading>
                    <div className="inline-block bg-[#FF90E8] border-4 border-white px-6 py-2 transform -rotate-2 mb-6">
                        <h3 className="text-2xl font-black uppercase text-black">Masterpieces</h3>
                    </div>
                    <p className="text-gray-300 font-bold text-lg max-w-2xl mx-auto">
                        A glimpse into the incredible talent from previous seasons of Indian Creative Star.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{ x: "-50%" }}
                        transition={{ ease: "linear", duration: 120, repeat: Infinity }}
                    >
                        {/* Loop twice for seamless infinite scroll */}
                        {[...Array(2)].map((_, loopIdx) => (
                            <div key={loopIdx} className="flex gap-6">
                                {Array.from({ length: 78 }).map((_, i) => (
                                    <div key={i} className="group relative shrink-0">
                                        <div className="w-[300px] h-[225px] border-4 border-white bg-gray-900 shadow-[8px_8px_0px_0px_#23F0C7] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                            {/* Using existing snapshots as placeholders if masterpiece images are missing, cycling through them */}
                                            <img
                                                src={getAsset(`masterpiece_${i}.webp`) === `masterpiece_${i}.webp` ? getAsset(`snapshot_${(i % 7) + 1}.webp`) : getAsset(`masterpiece_${i}.webp`)}
                                                alt={`Masterpiece ${i}`}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 border-t-2 border-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-[#23F0C7] font-mono text-xs font-bold text-center">
                                                    Masterpiece {i}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section - Retro Accordion */}
            <section id="faq" className="py-16 md:py-24 px-4 container mx-auto mb-16">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <RetroHeading level={2} className="mb-6 static md:sticky top-24">
                            FREQUENTLY <br /> ASKED <br /> <span className="text-[#FF90E8] bg-black px-2">QUESTIONS</span>
                        </RetroHeading>
                    </div>
                    <div className="md:w-2/3 space-y-6">
                        {[
                            { q: "Who can participate?", a: "Anyone! There are no age limits or restrictions. We classify entries based on age groups to ensure fair judging." },
                            { q: "What is the theme?", a: "Open Theme. You have complete creative freedom to submit your best work in any medium (Sketch, Painting, Digital)." },
                            { q: "Is there an entry fee?", a: "Yes, a small registration fee is required to confirm your slot and cover the cost of the certificate and ID card processing." },
                            { q: "How do I submit my art?", a: "After registration, you will be directed to our submission portal where you can upload high-quality photos of your artwork." },
                            { q: "When are results declared?", a: "Results will be announced on the final day of the event calendar. Stay tuned to our WhatsApp group for updates." }
                        ].map((item, i) => (
                            <details key={i} className="group relative">
                                <summary className="list-none flex justify-between items-center bg-white border-4 border-black p-6 cursor-pointer hover:bg-[#FFFAF0] transition-colors relative z-10">
                                    <span className="text-xl font-bold font-mono pr-8">{item.q}</span>
                                    <span className="transform transition-transform group-open:rotate-180">
                                        <ChevronDown size={28} className="bg-black text-white rounded-full p-1" />
                                    </span>
                                </summary>
                                <div className="bg-black text-white p-6 border-x-4 border-b-4 border-black -mt-1 pt-8 relative z-0">
                                    <p className="font-mono text-sm md:text-base leading-relaxed">{item.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-16 md:py-24 bg-black text-white text-center px-4 border-t-8 border-[#23F0C7] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-[#23F0C7]"></div>

                <div className="relative z-10">
                    <RetroHeading level={2} className="text-[#FF90E8] mb-8 leading-tight">
                        READY TO MAKE <br /> <span className="text-white">HISTORY?</span>
                    </RetroHeading>
                    <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-300 font-mono">
                        Join 200+ artists in the ultimate creative showdown. <br />
                        <span className="text-[#FFC900]">Registration closes soon.</span>
                    </p>
                    <RetroButton onClick={() => navigate('/winterartroyale/submission/intro')} variant="primary" className="text-xl md:text-2xl py-6 px-12 animate-pulse hover:animate-none">
                        REGISTER NOW
                    </RetroButton>
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20 pointer-events-none"></div>
            </section>

        </div>
    );
};

export default WinterArtContest;
