
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, Sparkles, Users, Calendar, Star, Palette, Flame, HelpCircle, Monitor, PenTool, CheckCircle, Zap, Gift, Shield, ArrowUpRight, Menu, X, Snowflake, Crown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WinterArtRoyaleV2 = () => {
    // Optimized images array (same as used in V1)
    const galleryImages = [
        "/optimized_gallery/gallery_1.webp", "/optimized_gallery/gallery_2.webp", "/optimized_gallery/gallery_3.webp",
        "/optimized_gallery/gallery_4.webp", "/optimized_gallery/gallery_5.webp", "/optimized_gallery/gallery_6.webp",
        "/optimized_gallery/gallery_7.webp", "/optimized_gallery/gallery_8.webp", "/optimized_gallery/gallery_9.webp",
        "/optimized_gallery/gallery_10.webp", "/optimized_gallery/gallery_11.webp", "/optimized_gallery/gallery_12.webp",
        "/optimized_gallery/gallery_13.webp", "/optimized_gallery/gallery_14.webp", "/optimized_gallery/gallery_15.webp",
        "/optimized_gallery/gallery_16.webp", "/optimized_gallery/gallery_17.webp", "/optimized_gallery/gallery_18.webp",
        "/optimized_gallery/gallery_19.webp", "/optimized_gallery/gallery_20.webp", "/optimized_gallery/gallery_21.webp",
        "/optimized_gallery/gallery_22.webp", "/optimized_gallery/gallery_23.webp", "/optimized_gallery/gallery_24.webp",
        "/optimized_gallery/gallery_25.webp", "/optimized_gallery/gallery_26.webp", "/optimized_gallery/gallery_27.webp",
        "/optimized_gallery/gallery_28.webp", "/optimized_gallery/gallery_29.webp", "/optimized_gallery/gallery_30.webp",
        "/optimized_gallery/gallery_31.webp", "/optimized_gallery/gallery_32.webp", "/optimized_gallery/gallery_33.webp",
        "/optimized_gallery/gallery_34.webp", "/optimized_gallery/gallery_35.webp", "/optimized_gallery/gallery_36.webp",
        "/optimized_gallery/gallery_37.webp", "/optimized_gallery/gallery_38.webp", "/optimized_gallery/gallery_39.webp"
    ];

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [showStickyCTA, setShowStickyCTA] = useState(false);

    // 🦁 Dynamic Metadata Manager (Favicon, Title, social Preview)
    useEffect(() => {
        // 1. Update Title
        const originalTitle = document.title;
        document.title = "Winter Art Royale | India's National Art Competition";

        // ⚡ Performance: Lock Background Color to White (Prevent Dark Mode Flash)
        const originalBg = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "#ffffff";

        // 2. Update Favicon
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        let originalIcon = '';
        if (link) {
            originalIcon = link.href;
            link.href = '/optimized_assets/war_logo_v2.webp';
        }

        // 3. Update Meta Tags (Open Graph for WhatsApp/Insta)
        const metaTags = {
            'og:title': "Winter Art Royale - Art Competition",
            'og:description': "Join India's National Art Contest. Prize Pool ₹2 Lakhs+. Register Now!",
            'og:image': "/optimized_assets/war_logo_v2.webp",
            'twitter:title': "Winter Art Royale - Art Competition",
            'twitter:description': "Join India's National Art Contest. Prize Pool ₹2 Lakhs+. Register Now!",
            'twitter:image': "/optimized_assets/war_logo_v2.webp"
        };

        const originalMeta: Record<string, string> = {};

        Object.entries(metaTags).forEach(([property, content]) => {
            let element = document.querySelector(`meta[property='${property}']`) || document.querySelector(`meta[name='${property}']`);
            if (element) {
                originalMeta[property] = element.getAttribute('content') || '';
                element.setAttribute('content', content);
            } else {
                // Determine if property or name (og: is property, twitter: is name usually, but standard varies)
                const isProperty = property.startsWith('og:');
                const newMeta = document.createElement('meta');
                newMeta.setAttribute(isProperty ? 'property' : 'name', property);
                newMeta.setAttribute('content', content);
                document.getElementsByTagName('head')[0].appendChild(newMeta);
            }
        });

        return () => {
            // Cleanup on Unmount
            document.title = originalTitle;
            if (link && originalIcon) link.href = originalIcon;

            // Revert Meta
            Object.entries(originalMeta).forEach(([property, content]) => {
                let element = document.querySelector(`meta[property='${property}']`) || document.querySelector(`meta[name='${property}']`);
                if (element) element.setAttribute('content', content);
            });
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past Hero (approx 100px) or just simple scroll
            if (window.scrollY > 100) {
                setShowStickyCTA(true);
            } else {
                setShowStickyCTA(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            {/* 🎨 FONT INJECTION (Clay.com Style) */}
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

body, .font-sans {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}

h1, h2, h3, h4, h5, h6, .font-heading {
    font-family: 'Outfit', sans-serif !important;
}
`}</style>

            {/* Header / Nav (Premium V2) */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img src="/company-logo.webp" alt="Daami Event" className="h-14 w-14 md:h-10 md:w-10 object-cover rounded-full border border-slate-200 shadow-sm" />
                            <Snowflake className="absolute -top-1 -right-1 w-3.5 h-3.5 text-blue-500 animate-spin-slow bg-white rounded-full p-0.5 shadow-sm" />
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-lg md:text-xl tracking-tight text-slate-900 leading-none">
                                DAAMI EVENT
                            </h1>
                            <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-blue-600 font-bold flex items-center gap-1">
                                Winter Edition
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button onClick={() => document.getElementById('battle-plan')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-slate-500 hover:text-blue-600 tracking-widest uppercase transition-colors">The Battle</button>
                        <button onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-slate-500 hover:text-blue-600 tracking-widest uppercase transition-colors">Prizes</button>
                        <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-slate-500 hover:text-blue-600 tracking-widest uppercase transition-colors">Legacy</button>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Link to="/winterartroyale/v2/register">
                            <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 h-12 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                                Enter W.A.R <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-900 hover:bg-slate-100 rounded-full">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-white border-l border-slate-100 w-[300px] p-0">
                                <div className="h-full flex flex-col">
                                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <span className="font-heading font-bold text-lg text-slate-900">Menu</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                                        <button onClick={() => document.getElementById('battle-plan')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-bold transition-all flex items-center justify-between group">
                                            <span>The Battle</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                        <button onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-bold transition-all flex items-center justify-between group">
                                            <span>Prizes & Rewards</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                        <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-bold transition-all flex items-center justify-between group">
                                            <span>Our Legacy</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                        <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-bold transition-all flex items-center justify-between group">
                                            <span>Eligibility</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                    </div>

                                    <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                                        <a href="https://wa.me/919635908358" target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="lg" className="w-full rounded-xl border-green-500 text-green-600 hover:bg-green-50 font-bold h-14 shadow-sm mb-3">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 mr-2" />
                                                Chat on WhatsApp
                                            </Button>
                                        </a>
                                        <Link to="/winterartroyale/v2/register">
                                            <Button size="lg" className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 shadow-xl">
                                                Enter W.A.R Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header >

            {/* Hero Section */}
            <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-6 relative z-10 text-center lg:text-left">
                        {/* Logo & Live Badge Row */}
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <img src="/optimized_assets/war_logo_v2.webp" alt="W.A.R Logo" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-slate-200 shadow-lg" />
                            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full animate-pulse">
                                <span className="w-2 h-2 bg-white rounded-full"></span> Registration Open
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-2">
                            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm">Daami Event Presents</p>
                            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1]">
                                Winter Art Royale <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Art Competition</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-bilderberg text-slate-400 italic">The W.A.R Edition</p>
                        </div>

                        <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                            <p className="text-xl font-bold text-slate-800">
                                India's National Art Contest is back.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Celebrate the winter season by creating art and joining the Winter Art Royale.
                            </p>
                        </div>

                        {/* CTA & Social Proof */}
                        <div className="flex flex-col items-center lg:items-start gap-6 pt-2">
                            <Link to="/winterartroyale/v2/register">
                                <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-bold rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 w-fit hover:scale-105 transition-transform">
                                    Register For W.A.R
                                </Button>
                            </Link>

                            <div className="flex items-center gap-4">
                                {/* Artist Avatar Stack */}
                                <div className="flex -space-x-4">
                                    {[
                                        "/optimized_assets/avatar_v2_1.webp",
                                        "/optimized_assets/avatar_v2_2.webp",
                                        "/optimized_assets/avatar_v2_3.webp",
                                        "/optimized_assets/avatar_v2_4.webp",
                                        "/optimized_assets/avatar_v2_5.webp",
                                        "/optimized_assets/avatar_v2_6.webp"
                                    ].map((img, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative" title="Artist">
                                            <img src={img} className="w-full h-full object-cover" alt="Artist" />
                                        </div >
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                                        243+
                                    </div>
                                </div >
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                        4.9 • Verified by Google <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className="w-3 h-3" />
                                    </span>
                                </div>
                            </div >
                        </div >
                    </div >

                    {/* Hero Visual - Abstract Composition */}
                    {/* Hero Visual - 4-Grid with Centered Logo */}
                    <div className="relative h-[400px] md:h-[600px] hidden lg:block rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-slate-100">
                        {/* 4-Image Grid */}
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                            {/* Top Left (Art 1) */}
                            <div className="relative overflow-hidden group">
                                <img src={galleryImages[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Art 1" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                            </div>
                            {/* Top Right (Art 2) */}
                            <div className="relative overflow-hidden group">
                                <img src={galleryImages[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Art 2" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                            </div>
                            {/* Bottom Left (Art 3) */}
                            <div className="relative overflow-hidden group">
                                <img src={galleryImages[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Art 3" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                            </div>
                            {/* Bottom Right (Art 4) */}
                            <div className="relative overflow-hidden group">
                                <img src={galleryImages[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Art 4" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                            </div>
                        </div>

                        {/* Centered Big Logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full shadow-2xl flex items-center justify-center p-3 border-[8px] border-white/80 backdrop-blur-sm">
                                <img
                                    src="/optimized_assets/war_logo_v2.webp"
                                    className="w-full h-full rounded-full object-cover border border-slate-100 shadow-inner"
                                    alt="Winter Art Royale Logo"
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </section>

            {/* 🎥 VSL VIDEO (Legacy from V1) - Optimized */}
            <section className="py-12 px-4 bg-white">
                <div className="w-full max-w-4xl mx-auto relative z-30">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group hover:border-blue-500/40 transition-colors">
                        <iframe
                            src="https://player.vimeo.com/video/1148449886?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            title="Winter Art Royale Intro"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>


            {/* Stats Bar (Red/Accent style inspired by reference) */}
            <section className="bg-rose-500 text-white py-8 md:py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full-translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    <div className="text-center md:text-left space-y-1">
                        <div className="text-3xl md:text-4xl font-bold">₹2 Lakhs+</div>
                        <div className="text-rose-100 text-sm font-medium uppercase tracking-wider">Total Prize Pool</div>
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <div className="text-3xl md:text-4xl font-bold">4</div>
                        <div className="text-rose-100 text-sm font-medium uppercase tracking-wider">Guaranteed Rewards</div>
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <div className="text-3xl md:text-4xl font-bold">7</div>
                        <div className="text-rose-100 text-sm font-medium uppercase tracking-wider">Winning Ranks</div>
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <div className="text-3xl md:text-4xl font-bold">3</div>
                        <div className="text-rose-100 text-sm font-medium uppercase tracking-wider">Art Categories</div>
                    </div>
                </div>
            </section >


            {/* 🏆 THE SPOILS OF WAR (Podium) */}
            < section id="prizes" className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 border-t border-slate-200 relative overflow-hidden" >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h4 className="text-blue-600 tracking-[0.2em] text-xs font-bold uppercase mb-2">The Spoils of War</h4>
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight">Prize Pool ₹2 Lakhs+</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-xl italic font-serif">
                            Claim your rightful place on the throne.
                        </p>
                        <div className="inline-block bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 mt-4">
                            <p className="text-yellow-800 text-sm font-medium">
                                <span className="font-bold">Note:</span> Each Category (Traditional, Sketch, Digital) has its own Prize Pool & Winners.
                            </p>
                        </div>
                    </div>

                    {/* PODIUM CONTAINER (Mobile: Row/Bar Chart, Desktop: Cards) */}
                    <div className="flex flex-row items-end justify-center gap-2 md:gap-0 max-w-5xl mx-auto pt-10 pb-12 md:pb-20 h-[500px] md:h-auto">

                        {/* 2nd Place (Silver) - Order 1 */}
                        <div className="order-1 w-[30%] md:w-1/3 flex flex-col items-center h-[65%] md:h-auto z-0">
                            <div className="mb-2 md:mb-4 text-center">
                                <h3 className="hidden md:block text-2xl font-bold text-slate-700">Prove Your Valor</h3>
                                <div className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-1 bg-slate-100 rounded-full px-2 py-0.5 md:bg-transparent">Silver</div>
                            </div>
                            <div className="w-full bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-lg md:rounded-t-2xl shadow-lg border-t border-white/50 relative group hover:-translate-y-2 transition-transform duration-500 h-full md:h-80 flex flex-col items-center justify-end md:justify-start pt-4 md:pt-8 px-1 md:px-6 text-center pb-4 md:pb-0">
                                <Trophy className="w-6 h-6 md:w-12 md:h-12 text-slate-500 mb-2 md:mb-4 drop-shadow-md" />
                                <div className="text-lg md:text-3xl font-black text-slate-800 mb-0 md:mb-2">₹50k</div>
                                <p className="md:hidden text-[7px] leading-tight text-slate-600 font-bold px-1 mt-1">Trophy & Medal<br />Home Delivered</p>
                                <ul className="hidden md:block text-sm text-slate-600 space-y-2 font-medium">
                                    <li>National Recognition</li>
                                    <li>Certificate of Excellence</li>
                                    <li>Trophy + Medal</li>
                                </ul>
                            </div>
                        </div>

                        {/* 1st Place (Gold) - Order 2 (Main) */}
                        <div className="order-2 w-[38%] md:w-1/3 flex flex-col items-center h-full md:h-auto z-10 -mx-0 md:-mx-4 shadow-xl md:shadow-none">
                            <div className="mb-2 md:mb-6 text-center transform md:scale-110">
                                <div className="inline-block bg-yellow-500 text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 md:py-1 rounded-full md:rounded-t-md mb-1 animate-pulse">Rank #1</div>
                                <h3 className="hidden md:block text-3xl font-black text-slate-900">Define Your Legacy</h3>
                                <div className="text-yellow-600 text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1">Gold</div>
                            </div>
                            <div className="w-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-t-xl md:rounded-t-3xl shadow-2xl shadow-yellow-500/10 border-t-4 border-yellow-400 relative group h-full md:h-[28rem] flex flex-col items-center justify-end md:justify-start pt-4 md:pt-10 px-1 md:px-6 text-center transform md:scale-105 pb-4 md:pb-0">
                                <div className="text-2xl md:text-5xl font-black text-slate-900 mb-1 md:mb-2 mt-0 md:mt-8 tracking-tight">₹1 Lakh</div>
                                <div className="w-8 md:w-16 h-1 bg-yellow-400 rounded-full mb-3 md:mb-6"></div>
                                <p className="md:hidden text-[8px] leading-tight text-yellow-900 font-bold px-1 mt-1 mb-2">Trophy & Medal<br />Home Delivered</p>
                                <ul className="hidden md:block text-base text-slate-800 space-y-3 font-semibold mb-8">
                                    <li className="flex items-center gap-2 justify-center"><Sparkles className="w-4 h-4 text-yellow-600" /> Premium Features</li>
                                    <li className="flex items-center gap-2 justify-center"><Users className="w-4 h-4 text-yellow-600" /> Fame & Glory</li>
                                    <li className="flex items-center gap-2 justify-center"><Calendar className="w-4 h-4 text-yellow-600" /> Trophy + Medal</li>
                                </ul>
                                <div className="hidden md:block w-full">
                                    <Button className="bg-slate-900 text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:bg-slate-800 hover:scale-105 transition-all w-full">
                                        Claim Throne
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 3rd Place (Bronze) - Order 3 */}
                        <div className="order-3 w-[30%] md:w-1/3 flex flex-col items-center h-[45%] md:h-auto z-0">
                            <div className="mb-2 md:mb-4 text-center">
                                <h3 className="hidden md:block text-2xl font-bold text-slate-700">Start Your Journey</h3>
                                <div className="text-amber-700 text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-1 bg-amber-50 rounded-full px-2 py-0.5 md:bg-transparent">Bronze</div>
                            </div>
                            <div className="w-full bg-gradient-to-b from-orange-100 to-orange-200 rounded-t-lg md:rounded-t-2xl shadow-lg border-t border-white/50 relative group hover:-translate-y-2 transition-transform duration-500 h-full md:h-64 flex flex-col items-center justify-end md:justify-start pt-4 md:pt-8 px-1 md:px-6 text-center pb-4 md:pb-0">
                                <Trophy className="w-6 h-6 md:w-12 md:h-12 text-amber-700 mb-2 md:mb-4 drop-shadow-md" />
                                <div className="text-lg md:text-3xl font-black text-slate-800 mb-0 md:mb-2">₹25k</div>
                                <p className="md:hidden text-[7px] leading-tight text-amber-900/80 font-bold px-1 mt-1">Trophy & Medal<br />Home Delivered</p>
                                <ul className="hidden md:block text-sm text-slate-600 space-y-2 font-medium">
                                    <li>Make Your Mark</li>
                                    <li>Certificate of Excellence</li>
                                    <li>Trophy + Medal</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Footer Note */}
                    <div className="bg-slate-900 text-white rounded-2xl p-8 max-w-3xl mx-auto text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>

                        <h3 className="text-2xl font-bold mb-2 relative z-10">Glory Beyond the Podium</h3>
                        <p className="text-slate-300 text-lg relative z-10">
                            Ranks <span className="text-white font-bold">4th to 7th</span> also receive <span className="text-yellow-400 font-bold">Physical Trophy Medals</span> delivered home.
                        </p>
                        <p className="text-slate-500 text-sm mt-4 relative z-10">(Top 3 included)</p>
                    </div>

                </div>
            </section >

            {/* 🎖️ CAREER MILESTONE (Official Recognition) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden" >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h4 className="text-blue-600 tracking-[0.2em] text-xs font-bold uppercase mb-2">Career Milestone</h4>
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight">Guranteed rewards for every artist</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-xl">
                            What You Get When You Join Winter Art Royale
                        </p>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg px-6 py-3 inline-block mt-4">
                            <p className="text-blue-800 font-bold text-sm">
                                4 Official Recognition Documents you will receive just 1 Hour after submission of your Artworks
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* COL 1: CERTIFICATES */}
                        <div className="h-full group relative p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all overflow-hidden flex flex-col">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Creative Excellence Certificate</h3>
                            <p className="text-slate-500 mb-8 italic">Digitally verifiable proofs of your artistic valor.</p>

                            <div className="grid grid-cols-1 gap-8 mt-auto">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"><Star className="w-4 h-4 fill-yellow-600" /></div>
                                        <span className="font-bold text-slate-700">Excellence</span>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md group/cert-exc relative">
                                        <img src="/optimized_assets/cert_excellence.webp" alt="WAR Certificate of Creative Excellence" className="w-full object-cover transform group-hover/cert-exc:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-2 text-center font-bold">WAR Certificate of Creative Excellence</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Trophy className="w-4 h-4" /></div>
                                        <span className="font-bold text-slate-700">Participation Certificate</span>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md group/cert-part relative">
                                        <img src="/optimized_assets/cert_participation.webp" alt="WAR Certificate of Participation" className="w-full object-cover transform group-hover/cert-part:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-2 text-center font-bold">WAR Certificate of Participation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COL 2: ID & LETTER */}
                        <div className="flex flex-col gap-8 h-full">
                            {/* ARTIST ID CARD */}
                            <div className="flex-1 group relative p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:shadow-purple-500/10 transition-all overflow-hidden flex flex-col">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Artist ID</h3>
                                <p className="text-slate-500 mb-6 italic">Your professional identity within the Daami ecosystem.</p>

                                <div className="my-auto rounded-xl overflow-hidden border border-slate-200 shadow-xl group/idcard relative w-full max-w-sm mx-auto">
                                    <img src="/optimized_assets/artist_id_card.webp" alt="Winter art riyal ID card" className="w-full object-cover transform group-hover/idcard:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex gap-3 justify-center mt-6">
                                    <div className="px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">National Level</div>
                                    <div className="px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">Lifetime Validity</div>
                                </div>
                            </div>

                            {/* MINISTER'S LETTER */}
                            <div className="flex-1 relative p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col items-center justify-center text-center">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg text-slate-900">
                                        <span className="text-2xl">✍️</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Letter of Appreciation</h3>
                                    <div className="w-16 h-1 bg-yellow-500 rounded-full mb-6"></div>
                                    <p className="text-slate-300 text-lg italic mb-6 leading-relaxed max-w-md">
                                        "An exclusive honor signed by the <span className="text-yellow-400 font-bold">Culture Minister</span>. This isn't just a paper; it's a powerful endorsement of your contribution to Indian Art."
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-bold uppercase tracking-wider">
                                        <Sparkles className="w-4 h-4 fill-yellow-400" /> Signed & Sealed W.A.R
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Strip */}
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 rounded-2xl p-6 flex items-center justify-center gap-4 text-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <p className="text-slate-700 font-bold text-sm md:text-lg">
                            Every Participant Receives <span className="text-blue-700">Official Certificate, Artist ID Card & Appreciation Letter</span> signed by Subculture Minister.
                        </p>
                    </div>

                </div>

                {/* 🎠 RECOGNITION MARQUEE */}
                <div className="mt-24 border-y border-slate-100 bg-slate-50 py-12 relative overflow-hidden">
                    <motion.div
                        className="flex gap-6 w-max pl-6"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    >
                        {[
                            "/optimized_assets/recognition_1.webp",
                            "/optimized_assets/recognition_2.webp",
                            "/optimized_assets/recognition_3.webp",
                            "/optimized_assets/recognition_1.webp",
                            "/optimized_assets/recognition_2.webp",
                            "/optimized_assets/recognition_3.webp",
                            "/optimized_assets/recognition_1.webp",
                            "/optimized_assets/recognition_2.webp",
                            "/optimized_assets/recognition_3.webp",
                            "/optimized_assets/recognition_1.webp",
                            "/optimized_assets/recognition_2.webp",
                            "/optimized_assets/recognition_3.webp"
                        ].map((imgUrl, i) => (
                            <div key={i} className="w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-lg relative group transition-all flex-shrink-0 bg-white">
                                <img src={imgUrl} alt={`Recognition Mockup ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">Mockup {i}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* 🎒 CREATIVE STAR KIT SECTION (V2 White Theme) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200" >
                <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold tracking-[0.2em] uppercase">
                        <Star className="w-3 h-3 fill-blue-700" /> Exclusive Bonus
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight">
                        The Creative Star Kit <br /><span className="italic text-blue-600 font-serif">We gave to our artists</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Kit for Our Previous Art Competition called Indian Creative Star
                    </p>
                </div>

                <div className="space-y-8 relative">
                    {/* ROW 1: Left to Right */}
                    <div className="relative overflow-hidden group">

                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        >
                            {[
                                "/optimized_assets/kit_1.webp",
                                "/optimized_assets/kit_2.webp",
                                "/optimized_assets/kit_3.webp",
                                "/optimized_assets/kit_4.webp",
                                "/optimized_assets/kit_5.webp",
                                "/optimized_assets/kit_6.webp"
                            ].concat([
                                "/optimized_assets/kit_1.webp",
                                "/optimized_assets/kit_2.webp",
                                "/optimized_assets/kit_3.webp",
                                "/optimized_assets/kit_4.webp",
                                "/optimized_assets/kit_5.webp",
                                "/optimized_assets/kit_6.webp"
                            ]).map((img, i) => (
                                <div key={i} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-lg transition-all flex-shrink-0 bg-white relative">
                                    <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 block" loading="lazy" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ROW 2: Right to Left */}
                    <div className="relative overflow-hidden group">

                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                        >
                            {[
                                "/optimized_assets/kit_7.webp",
                                "/optimized_assets/kit_8.webp",
                                "/optimized_assets/kit_9.webp",
                                "/optimized_assets/kit_10.webp",
                                "/optimized_assets/kit_11.webp"
                            ].concat([
                                "/optimized_assets/kit_7.webp",
                                "/optimized_assets/kit_8.webp",
                                "/optimized_assets/kit_9.webp",
                                "/optimized_assets/kit_10.webp",
                                "/optimized_assets/kit_11.webp"
                            ]).map((img, i) => (
                                <div key={i} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-lg transition-all flex-shrink-0 bg-white relative">
                                    <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 block" loading="lazy" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* 🎯 KIT CTA (V2 Style) */}
            < div className="py-16 bg-white border-y border-slate-100 relative z-10 flex flex-col items-center gap-8 shadow-sm" >
                <img src="/optimized_assets/war_logo_v2.webp" alt="W.A.R Logo" className="w-24 h-24 rounded-full border-4 border-slate-100 shadow-xl object-cover" />
                <Link to="/winterartroyale/v2/register">
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-8 px-12 rounded-full text-xl shadow-2xl hover:-translate-y-1 transition-all">
                        Register Now & Get Your Kit
                    </Button>
                </Link>
            </div >

            {/* 📜 ABOUT: DAAMI EVENT (V2 White Theme) */}
            < section id="about" className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 border-t border-slate-200" >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold tracking-widest uppercase">
                            <Sparkles className="w-3 h-3 fill-orange-700" /> The Organizers
                        </div>
                        <img src="/optimized_assets/daami_logo.webp" alt="Daami Event Logo" className="w-20 h-20 rounded-full border-4 border-white shadow-xl mb-6 object-cover" />
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                            We are <span className="text-blue-600">Daami Event</span>
                        </h2>
                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                            <p>
                                An emerging event firm, and proud organizers of <strong className="text-slate-900">Indian Creative Star ( Art Competition ) – Season 2</strong>.
                            </p>
                            <p>
                                Our journey began with <span className="italic text-slate-800 font-medium">Sikkim Creative Star ( Art Competition ) – Season 1</span>, where 300+ artists registered and we discovered 6 Creative Stars.
                            </p>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                            <p className="text-slate-800 font-medium italic">
                                We are officially supported by <span className="text-yellow-600 font-bold">Government of Sikkim</span>, which adds credibility to our events.
                            </p>
                        </div>

                        <p className="font-bold text-blue-700 text-lg flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-blue-600"></span>
                            Our mission: Discover and celebrate Creative Stars across India.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                                <h4 className="text-xl font-bold text-slate-900 mb-1">Open</h4>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Theme & Medium</p>
                            </div>
                            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                                <h4 className="text-xl font-bold text-slate-900 mb-1">National</h4>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Recognition</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
                        <img src="/optimized_assets/founder_photo.webp" alt="GT Dhungel Sir" className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                            <div className="mb-6">
                                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-slate-100">"Daami Event is doing a commendable job for society and the artistic community. Initiatives like these are crucial for preserving and promoting our rich cultural heritage."</p>
                            </div>
                            <div className="border-t border-white/20 pt-6">
                                <p className="text-xl font-bold text-white uppercase tracking-widest">GT Dhungel Sir</p>
                                <p className="text-sm text-blue-200 font-bold uppercase tracking-widest mt-1">Hon'ble Culture Minister, Sikkim</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ⚔️ THE BATTLE PLAN (V2) */}
            < section id="battle-plan" className="py-12 md:py-24 px-4 md:px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden" >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10 space-y-20">
                    <div className="text-center space-y-4">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">The Battle Plan</span>
                        <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">Stages of the Winter Art Royale</h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-lg">From the first brushstroke to the final ceremony. Your roadmap to becoming a National Creative Star.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-slate-800 rounded-full overflow-hidden z-0">
                            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse opacity-50"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
                            {[
                                { step: "01", title: "Register", desc: "Click Register to begin your campaign.", icon: Users, color: "text-blue-400" },
                                { step: "02", title: "Join Alliance", desc: "Join our WhatsApp War Room immediately after registration.", icon: Users, color: "text-purple-400" },
                                { step: "03", title: "Submit & Earn", desc: "Upload artwork & pay entry fee. Get Certificates & Gifts within 1 Hour.", icon: Palette, color: "text-yellow-400" },
                                { step: "04", title: "Voting", desc: "Public Voting followed by Jury Evaluation.", icon: Users, color: "text-pink-400" },
                                { step: "05", title: "Results", desc: "Final Results Declared. Champions crowned.", icon: Trophy, color: "text-green-400" }
                            ].map((stage, i) => (
                                <div key={i} className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 group relative">
                                    {/* Node Marker */}
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-14 h-14 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 border-slate-700 group-hover:border-current transition-colors flex items-center justify-center relative z-10 shadow-xl ${stage.color}`}>
                                            <stage.icon className="w-6 h-6 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    </div>

                                    <div className="md:text-center md:mt-8 pt-2">
                                        <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity ${stage.color}`}>Phase {stage.step}</div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{stage.title}</h3>

                                        {i === 2 ? (
                                            <div className="relative group/highlight">
                                                <p className="relative bg-gradient-to-r from-purple-900/80 to-blue-900/80 border border-purple-500/50 rounded-lg p-3 text-sm leading-relaxed max-w-[200px] md:mx-auto text-white shadow-lg transform group-hover/highlight:scale-105 transition-all duration-300">
                                                    <span className="block text-[10px] text-purple-300 font-bold uppercase tracking-wider mb-1">Fast Reward</span>
                                                    {stage.desc}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-slate-400 text-sm leading-relaxed max-w-[150px] md:mx-auto group-hover:text-slate-200 transition-colors">{stage.desc}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Details Grid */}
                    <div className="grid md:grid-cols-2 gap-12 pt-20 border-t border-slate-800 mt-20">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">Who Can Participate?</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                The Winter Art Royale is open to all Indian citizens.
                            </p>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span><strong className="text-white block mb-1">Junior Category:</strong> Artists aged under 18 years.</span>
                                </li>
                                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span><strong className="text-white block mb-1">Senior Category:</strong> Professional & Amateur artists aged 18+.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">Submission Guidelines</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Ensure your artwork aligns with the "Winter" theme.
                            </p>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> High-resolution images (JPEG/PNG) required.</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Max file size: 10MB per submission.</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Original works only. Plagiarism leads to disqualification.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* 🎨 CATEGORIES (V2 Clean Style) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-white relative" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Categories you can choose for</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Art Is War</h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg">The battlefield is open for all forms of visual expression. Select your arena.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Traditional */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-center group cursor-pointer hover:-translate-y-2 duration-300">
                            <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform border border-purple-100">
                                <Palette className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Traditional Art</h3>
                            <div className="w-12 h-1 bg-purple-200 rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-500 leading-relaxed">Oil, Acrylic, Watercolor, Charcoal. <br />The classic masters' approach.</p>
                        </div>

                        {/* Sketch */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-center group cursor-pointer hover:-translate-y-2 duration-300">
                            <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform border border-pink-100">
                                <PenTool className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Sketch & Mixed</h3>
                            <div className="w-12 h-1 bg-pink-200 rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-500 leading-relaxed">Ink, Doodling, Mandala, <br />Mixed Media.</p>
                        </div>

                        {/* Digital */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-center group cursor-pointer hover:-translate-y-2 duration-300">
                            <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform border border-blue-100">
                                <Monitor className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Digital Art</h3>
                            <div className="w-12 h-1 bg-blue-200 rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-500 leading-relaxed">2D/3D Illustrations, <br />Concept Art.</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* 🎟️ PRICING: ENTRY & ELIGIBILITY (V2) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 border-y border-slate-200" id="pricing" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Entry & Eligibility</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Join the ranks of elite artists</h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg">Select your level of engagement.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* PLAN 1: STUDENT */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group">
                            <div className="absolute top-0 inset-x-0 h-1 bg-blue-400 rounded-t-3xl"></div>
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3 inline mr-1 fill-blue-600" /> Get 2 Certificates in 1 Hour
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Student</h3>
                            <div className="flex items-baseline gap-1 mt-2 mb-6">
                                <span className="text-4xl font-black text-slate-900">₹299</span>
                                <span className="text-slate-400 font-medium">/entry</span>
                            </div>

                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Single Entry</p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span><strong className="text-slate-900">1 Artwork</strong> Submission</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span>Get <strong className="text-slate-900">2 E-Certificates</strong></span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span>Culture Minister Approved Participation Certificate</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span>Creative Excellence Certificate</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span>Artist ID Card</span>
                                </li>
                            </ul>

                            <Link to="/winterartroyale/v2/register">
                                <Button className="w-full bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-200 font-bold py-6 rounded-xl transition-all">
                                    Select Plan
                                </Button>
                            </Link>
                        </div>

                        {/* PLAN 2: WARRIOR (Popular) */}
                        <div className="bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-2xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 inset-x-0 h-2 bg-slate-900 rounded-t-2xl"></div>
                            <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3 inline mr-1 fill-yellow-700" /> Get 2 Certificates in 1 Hour
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Warrior</h3>
                            <div className="flex items-baseline gap-1 mt-2 mb-6">
                                <span className="text-4xl font-black text-slate-900">₹499</span>
                                <span className="text-slate-400 font-medium">/entry</span>
                            </div>

                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Double Strike</p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span><strong className="text-slate-900">Submit 2 Artworks</strong></span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Get <strong className="text-slate-900">2 E-Certificates</strong></span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Culture Minister Approved Participation Certificate</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Creative Excellence Certificate</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <CheckCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Artist ID Card</span>
                                </li>
                            </ul>

                            <Link to="/winterartroyale/v2/register">
                                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold py-6 rounded-xl shadow-lg transition-all hover:scale-105">
                                    Select Plan
                                </Button>
                            </Link>
                        </div>

                        {/* PLAN 3: WARLORD (Premium) */}
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative group text-white">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                Very Popular
                            </div>
                            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Gift className="w-3 h-3 inline mr-1 fill-yellow-400" /> Get Certificate + Physical Delivery
                            </div>
                            <h3 className="text-2xl font-bold text-white">Warlord</h3>
                            <div className="flex items-baseline gap-1 mt-2 mb-6">
                                <span className="text-4xl font-black text-white">₹599</span>
                                <span className="text-slate-400 font-medium">/entry</span>
                            </div>

                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Triple Threat</p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span><strong className="text-white">Submit 3 Artworks</strong></span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Artist ID Card</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Get your <strong className="text-white">Official Artist Portfolio Website</strong></span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Gift className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Premium Physical Kit</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Framed Physical Certificate</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Official Appreciation Letter</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <span>Exclusive Event Medal</span>
                                </li>
                            </ul>

                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6 text-center">
                                <p className="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                    <Zap className="w-3 h-3 fill-green-400" /> Free Home Delivery
                                </p>
                            </div>

                            <Link to="/winterartroyale/v2/register">
                                <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white border-none font-bold py-6 rounded-xl shadow-lg transition-all hover:scale-105">
                                    Claim Your Throne
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* 💬 TESTIMONIALS (V2) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-white border-y border-slate-100 overflow-hidden" >
                <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">from Season 1 participants</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">4.9/5 from 300+ Artists</h2>
                </div>

                {/* Marquee */}
                <div className="relative w-full">


                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
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
                            { name: "Riya S.", role: "Verified Artist", text: "The prize money is genuine, but the recognition is the real reward.", source: "Google", initial: "R" },
                            { name: "Aditya P.", role: "Verified Artist", text: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified", initial: "A" }
                        ].map((t, i) => (
                            <div key={i} className="w-[350px] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow shrink-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200">
                                            {t.initial}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {t.role}
                                            </p>
                                        </div>
                                    </div>
                                    {t.source === "Google" ? (
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 opacity-50" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    )}
                                </div>
                                <div className="flex text-yellow-400 text-xs mb-3 space-x-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed italic">"{t.text}"</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* ❓ FAQ Section (V2) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50" >
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 text-center">War Room Queries</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Who can participate?", a: "Open to all Indian citizens. We have specific categories for Juniors (Under 18) and Seniors (18+)." },
                            { q: "Are digital artworks accepted?", a: "Yes! We welcome Digital Art, Traditional Art (Oil, Acrylic, Watercolor), and Sketching/Mixed Media." },
                            { q: "What is the entry fee?", a: "Entries start at ₹299 (Student Plan). You can upgrade to Warrior (₹499) or Warlord (₹599) for multiple submissions and premium perks." },
                            { q: "When do I receive my certificates?", a: "Instantly! You will receive your Culture Minister Signed Participation & Excellence Certificates within 1 hour of submission." },
                            { q: "How are the winners decided?", a: "Winners are chosen through a transparent process combining Public Voting and Professional Jury Evaluation." },
                            { q: "What if I win a physical prize?", a: "Prizes like Trophies and Medals (Rank 1-7) include free home delivery across India." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >


            {/* 📸 RAW SNAPSHOTS (V2) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 border-t border-slate-200 overflow-hidden" >
                <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Raw Snapshots</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">Unfiltered love from our community</h2>
                </div>

                <div className="max-w-7xl mx-auto columns-2 md:columns-4 gap-4 space-y-4 px-4 overflow-visible">
                    {[
                        "/optimized_assets/snapshot_1.webp",
                        "/optimized_assets/snapshot_2.webp",
                        "/optimized_assets/snapshot_3.webp",
                        "/optimized_assets/snapshot_4.webp",
                        "/optimized_assets/snapshot_5.webp",
                        "/optimized_assets/snapshot_6.webp",
                        "/optimized_assets/snapshot_7.webp"
                    ].map((imgUrl, i) => (
                        <div key={i} className="break-inside-avoid rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all bg-white group relative">
                            <img
                                src={imgUrl}
                                alt={`User Review Snapshot ${i}`}
                                className="w-full h-auto block"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                                    View Snapshot
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section >

            {/* 🎨 MASTERPIECES (V2 Triple Marquee) */}
            < section className="py-12 md:py-24 bg-slate-900 text-white overflow-hidden border-t border-slate-800" >
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Amazing Artworks Submitted by Our Artists</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">Masterpieces</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">A glimpse into the incredible talent from previous seasons of Indian Creative Star.</p>
                </div>

                <div className="space-y-8 -rotate-1 scale-110">
                    {/* ROW 1: Left to Right */}
                    <div className="relative w-full">
                        <motion.div
                            className="flex gap-4 w-max"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
                        >
                            {[...galleryImages, ...galleryImages].map((img, i) => (
                                <div key={i} className="w-[300px] h-[200px] rounded-xl overflow-hidden relative opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer border border-slate-800">
                                    <img
                                        src={img}
                                        alt={`Masterpiece ${i}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ROW 2: Right to Left */}
                    <div className="relative w-full">
                        <motion.div
                            className="flex gap-4 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
                        >
                            {[...galleryImages].reverse().concat([...galleryImages].reverse()).map((img, i) => (
                                <div key={i} className="w-[300px] h-[200px] rounded-xl overflow-hidden relative opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer border border-slate-800">
                                    <img
                                        src={img}
                                        alt={`Masterpiece ${i}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ROW 3: Left to Right */}
                    <div className="relative w-full hidden md:block">
                        <motion.div
                            className="flex gap-4 w-max"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                        >
                            {[...galleryImages, ...galleryImages].map((img, i) => (
                                <div key={i} className="w-[300px] h-[200px] rounded-xl overflow-hidden relative opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer border border-slate-800">
                                    <img
                                        src={img}
                                        alt={`Masterpiece ${i}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* 🏆 PRIZE CEREMONY (V2 Clean Style) */}
            < section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 border-t border-slate-200" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Grand Event</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Prize Ceremony Highlight</h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg">Moments of glory. Where talent meets its reward.</p>
                    </div>

                    <div className="columns-1 md:columns-3 gap-6 space-y-6">
                        {/* Featured Large Image (First in Masonry) */}
                        <div className="break-inside-avoid relative group overflow-hidden rounded-3xl shadow-xl">
                            <img
                                src="/optimized_assets/prize_ceremony_main.webp"
                                alt="Celebrating Excellence"
                                className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-8 flex flex-col justify-end pointer-events-none">
                                <span className="text-yellow-400 font-bold uppercase tracking-wider text-xs mb-2">Grand Event</span>
                                <h3 className="text-3xl font-bold text-white">Celebrating Excellence</h3>
                            </div>
                        </div>

                        {/* Other Moments */}
                        {[
                            "/optimized_assets/prize_ceremony_1.webp",
                            "/optimized_assets/prize_ceremony_2.webp",
                            "/optimized_assets/prize_ceremony_3.webp",
                            "/optimized_assets/prize_ceremony_4.webp",
                            "/optimized_assets/prize_ceremony_5.webp",
                            "/optimized_assets/prize_ceremony_6.webp"
                        ].map((imgUrl, index) => (
                            <div key={index} className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-md">
                                <img
                                    src={imgUrl}
                                    alt={`Ceremony Moment ${index + 1}`}
                                    className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <Sparkles className="w-8 h-8 text-white/80" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Final CTA */}
            < section className="py-12 md:py-24 px-4 md:px-6 text-center bg-white" >
                <div className="max-w-3xl mx-auto space-y-8 flex flex-col items-center">
                    <img src="/optimized_assets/war_logo_v2.webp" alt="W.A.R Logo" className="w-32 h-32 rounded-full border-4 border-slate-100 shadow-2xl object-cover mb-4" />

                    <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight">
                        Ready to make history?
                    </h2>
                    <p className="text-xl text-slate-500 max-w-xl">
                        Don't let your talent freeze this winter. Unleash it in the War Room.
                    </p>
                    <Link to="/winterartroyale/v2/register">
                        <Button size="lg" className="h-20 px-12 text-2xl font-bold rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-2xl hover:-translate-y-1 transition-transform">
                            Register Now For Winter Art Royale
                        </Button>
                    </Link>
                </div>
            </section >

            {/* Footer Simple */}
            < footer className="py-8 border-t border-slate-100 text-center text-slate-400 text-sm bg-white" >
                <p>&copy; 2026 Winter Art Royale. All rights reserved.</p>
            </footer >
            {/* 📱 Sticky Mobile CTA - Portal to body to avoid transform issues */}
            {
                createPortal(
                    <AnimatePresence>
                        {showStickyCTA && (
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed bottom-0 left-0 right-0 z-[9999] bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-3 md:hidden flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Registration Open
                                    </div>
                                    <div className="text-base font-black text-slate-900 leading-none mt-0.5">Join Winter Art Royale</div>
                                </div>
                                <Link to="/winterartroyale/v2/register" className="flex-1 max-w-[140px]">
                                    <Button size="default" className="w-full rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl">
                                        Join Now
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )
            }

        </div>
    );
};

export default WinterArtRoyaleV2;
