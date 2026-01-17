import { ArrowRight, Trophy, Palette, Users, User, Star, Snowflake, Calendar, MapPin, CheckCircle, Flame, Brush, Monitor, PenTool, HelpCircle, ChevronDown, Award, Quote, Play, Camera, Sun, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

import { useSpring, useInView } from "framer-motion";

const ReviewCard = ({ testo }: { testo: any }) => (
    <div className="w-[300px] md:w-[400px] bg-[#0F0F20] p-6 md:p-8 rounded-2xl border border-white/5 relative flex-shrink-0 group hover:border-blue-500/30 transition-all">
        <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-900 absolute top-6 right-6 opacity-50" />
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
                {testo.name.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-white text-sm md:text-base">{testo.name}</h4>
                <p className="text-[10px] md:text-xs text-blue-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {testo.role}
                </p>
            </div>
        </div>
        <p className="text-white/70 text-sm italic leading-relaxed">"{testo.review}"</p>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-wider">{testo.source}</span>
        </div>
    </div>
);

const CountUp = ({ end, duration = 2, separator = "," }: { end: number, duration?: number, separator?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;

        const node = ref.current;
        const controls = { value: 0 };

        let startTimestamp: number | null = null;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(easeProgress * end);

            if (node) {
                node.textContent = current.toLocaleString('en-US');
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [inView, end, duration]);

    return <span ref={ref}>0</span>;
};

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WarRegistrationModal } from "@/components/winter/WarRegistrationModal";
import { IntroSnowfall } from '../components/winter/IntroSnowfall';
import { LiveRegistrationTicker } from '../components/winter/LiveRegistrationTicker';


const WinterArtRoyale = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [showStickyCTA, setShowStickyCTA] = useState(false);

    // Sticky CTA Logic
    const [timeLeft, setTimeLeft] = useState(86400); // 24 hours
    const [slotsFilled, setSlotsFilled] = useState(110);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 86400);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlotsFilled(prev => prev < 550 ? prev + Math.floor(Math.random() * 3) : 550);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    // Toggle Sticky CTA based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8; // Show after 80% of viewport height
            if (window.scrollY > heroHeight) {
                setShowStickyCTA(true);
            } else {
                setShowStickyCTA(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 📜 Parallax Scroll Hook
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '30%']);

    // Dynamic Favicon Manager
    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) return;

        const originalIcon = link.href;
        link.href = 'https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg';

        return () => {
            link.href = originalIcon;
        };
    }, []);

    const handleRegisterClick = () => {
        navigate('/winter-art-royale/register');
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050510] text-blue-50 font-lato selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
            <LiveRegistrationTicker isVisible={!isRegistrationOpen} />

            <WarRegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />

            {/* ❄️ Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-blue-900/20 via-blue-900/5 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full"></div>
                <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse"></div>
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full opacity-20 animate-float"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: Math.random() * 10 + 10 + 's',
                            animationDelay: Math.random() * 5 + 's'
                        }}
                    ></div>
                ))}
            </div>

            {/* 🧭 Navbar */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/30 sticky top-0">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                    <div className="relative">
                        <img src="/company-logo.webp" alt="Daami Event" className="h-10 w-10 rounded-full border border-blue-500/50 group-hover:border-blue-400 transition-colors" />
                        <Snowflake className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 animate-spin-slow bg-black/50 rounded-full p-0.5" />
                    </div>
                    <div>
                        <h1 className="font-bilderberg text-lg tracking-wider text-blue-200 group-hover:text-white transition-colors">DAAMI EVENT</h1>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-blue-400 transition-colors">Winter Edition</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {['The Battle', 'Prizes', 'Legacy'].map((item) => (
                        <button
                            key={item}
                            onClick={() => document.getElementById(item.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                    <Button
                        className="bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all rounded-full px-6"
                        onClick={handleRegisterClick}
                    >
                        Enter W.A.R
                    </Button>
                </div>

                {/* Mobile Hamburger */}
                <button className="md:hidden p-2 text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* 📱 Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#050510] border-l border-white/10 z-[101] p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="font-bilderberg text-xl text-white">Menu</h2>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/60 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {['The Battle', 'Prizes', 'Legacy'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            document.getElementById(item.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' });
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-left text-2xl font-bilderberg text-white/80 hover:text-blue-400 transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-lg relative overflow-hidden group"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleRegisterClick();
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Enter W.A.R <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="relative z-10 font-inter-display">
                {/* ❄️ INTRO SNOWFALL EFFECT */}
                <IntroSnowfall />

                {/* ⚔️ HERO SECTION */}
                {/* ⚔️ HERO SECTION */}
                <section className="min-h-screen relative flex flex-col items-center justify-start md:justify-center text-center px-4 md:px-6 overflow-hidden pt-24 md:pt-20">

                    {/* 🎨 Background Parallax Frame (Cinematic Winter Landscape) */}
                    <div className="absolute inset-x-4 top-4 bottom-4 md:inset-x-8 md:top-8 md:bottom-8 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] z-0">
                        {/* Parallax Background Image */}
                        <motion.div
                            style={{ y: backgroundY }}
                            className="absolute inset-0 -top-20 -bottom-20 bg-[url('/winter-hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-80"
                        />

                        {/* Cinematic Overlay (Inside Frame) - Darker for readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/90 via-[#050510]/60 to-[#050510]/90"></div>

                        {/* Tint Overlay */}
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto space-y-8 mt-0 md:mt-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-block relative"
                        >
                            <div className="absolute inset-0 bg-blue-500/30 blur-[60px] rounded-full animate-pulse"></div>
                            <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="W.A.R Logo" className="w-40 h-40 md:w-52 md:h-52 rounded-full border-[4px] border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.3)] relative z-10" />
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-950/90 backdrop-blur-md border border-blue-500/50 px-4 py-1 rounded-full whitespace-nowrap z-20">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-blue-300 uppercase">Season 2 Live</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-200 text-xs font-bilderberg tracking-wider">
                                <Brush className="w-3 h-3 text-blue-400" /> Daami Event Presents
                            </div>

                            <h1 className="font-bilderberg text-6xl md:text-9xl text-white leading-[0.9] drop-shadow-2xl tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Winter</span>{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Art</span>{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Royale</span>
                                <span className="block text-3xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300 mt-4 italic tracking-normal">
                                    Art Competition
                                </span>
                            </h1>

                            <div className="flex items-center justify-center gap-4 text-blue-500/80 font-bold uppercase tracking-[0.4em] text-sm md:text-base mt-4">
                                <span className="w-8 h-[1px] bg-blue-500/50"></span>
                                The W.A.R Edition
                                <span className="w-8 h-[1px] bg-blue-500/50"></span>
                            </div>

                            <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl mx-auto font-light leading-relaxed pt-4">
                                <span className="text-white font-semibold">India's National Art Contest is back.</span> <br className="hidden md:block" />
                                Celebrate the winter season by creating art and joining the <span className="text-blue-300 font-normal">Winter Art Royale</span>.
                            </p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                            <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 border-t border-white/20">
                                Register For W.A.R <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            {/* Trust Badge Card */}
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-full pl-2 pr-6 py-2 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-default">
                                <div className="flex -space-x-3">
                                    {[
                                        "https://i.ibb.co/0p96CVsn/IMG-239111.jpg",
                                        "https://i.ibb.co/pvyvcj7T/Whats-App-Image2025-11-18at4-29-02-PM.jpg",
                                        "https://i.ibb.co/tMgcSf4W/Whats-App-Image2025-12-03at3-09-33-PM.jpg",
                                        "https://i.ibb.co/GvZFfdkc/Whats-App-Image2025-11-29at3-57-35-PM.jpg",
                                        "https://i.ibb.co/HTDFrHHW/Whats-App-Image2025-11-26at6-56-04-PM.jpg",
                                        "https://i.ibb.co/5xcftjt1/Whats-App-Image2025-11-29at3-10-34-PM.jpg"
                                    ].map((img, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050510] overflow-hidden">
                                            <img src={img} className="w-full h-full object-cover" alt="Artist" />
                                        </div >
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-[#050510] bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">243+</div>
                                </div >
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        <p className="font-bold text-white text-sm">4.9</p>
                                        <div className="flex text-yellow-500"><Star className="w-3 h-3 fill-yellow-500" /></div>
                                    </div>
                                    <p className="text-[10px] text-white/50 uppercase tracking-wide">Verified by Google</p>
                                </div>
                            </div >
                        </div >

                        {/* 🎥 VSL VIDEO CONTAINER */}
                        <div className="w-full max-w-4xl mx-auto mt-12 mb-8 relative z-30 px-4">
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(37,99,235,0.25)] bg-black/80 backdrop-blur-md group hover:border-blue-500/40 transition-colors">
                                <iframe
                                    src="https://player.vimeo.com/video/1148449886?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                    title="Winter Art Royale Intro"
                                ></iframe>
                            </div>
                        </div>
                    </div >

                    <div className="absolute bottom-10 animate-bounce text-blue-500/50 cursor-pointer z-20" onClick={() => document.getElementById('fees')?.scrollIntoView({ behavior: 'smooth' })}>
                        <ChevronDown className="w-8 h-8" />
                    </div>
                </section >



                {/* 🏆 PRIZES: THE SPOILS OF WAR - PODIUM GRAPH */}
                <section id="prizes" className="py-24 px-4 md:px-6 bg-[#050510] relative">
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-12 md:mb-16 space-y-4">
                            <h4 className="text-blue-400 tracking-[0.2em] text-xs font-bold uppercase">The Spoils of War</h4>
                            <h2 className="font-bilderberg text-4xl md:text-7xl text-white">Prize Pool ₹2 Lakhs+</h2>
                            <p className="text-white/40 max-w-2xl mx-auto">Claim your rightful place on the throne.</p>

                            {/* PREMIUM INFO CARD */}
                            <div className="mt-8 relative z-20">
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] group hover:border-purple-500/50 transition-all">
                                    <div className="p-1.5 rounded-full bg-purple-500/20 text-purple-400">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm md:text-base text-purple-100 font-medium tracking-wide">
                                        <span className="text-purple-400 font-bold">Note:</span> Each Category (Traditional, Sketch, Digital) has its own <span className="text-white font-bold">Prize Pool & Winners</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bar Chart Container */}
                        <div className="relative h-auto md:h-[850px] max-w-5xl mx-auto pt-10">

                            {/* Chart Grid Lines (Desktop Only) */}
                            <div className="absolute inset-0 flex-col justify-between pointer-events-none hidden md:flex opacity-20 z-0 pl-12 pb-8">
                                <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50 relative"><span className="absolute -left-12 -top-2 text-xs text-white/50">100%</span></div>
                                <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50 relative"><span className="absolute -left-12 -top-2 text-xs text-white/50">75%</span></div>
                                <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50 relative"><span className="absolute -left-12 -top-2 text-xs text-white/50">50%</span></div>
                                <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50 relative"><span className="absolute -left-12 -top-2 text-xs text-white/50">25%</span></div>
                                <div className="w-full h-[1px] bg-white border-t border-white/50 relative"><span className="absolute -left-12 -top-2 text-xs text-white/50">0%</span></div>
                            </div>

                            {/* Bars Container - FLEX ROW ON MOBILE TOO for Graph effect */}
                            <div className="relative z-10 flex flex-row items-end justify-center gap-2 md:gap-8 h-[500px] md:h-full pb-8 md:pb-12">

                                {/* 🥈 RUNNER UP (Height: 65%) - Order 1 on Mobile (Left) */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    whileInView={{ height: '65%', opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                                    className="w-[30%] md:w-1/3 flex flex-col justify-end group relative"
                                >
                                    <div className="bg-gradient-to-t from-gray-900 to-[#0F0F1A]/90 backdrop-blur-md border border-white/10 rounded-t-xl p-2 md:p-8 text-center relative overflow-hidden flex flex-col justify-end md:justify-between h-full hover:border-gray-400/50 transition-all shadow-[0_0_30px_rgba(156,163,175,0.1)] hover:shadow-gray-400/20">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                                        <div className="pt-2">
                                            {/* Rank Badge */}
                                            <div className="inline-block bg-gray-500/20 text-gray-300 text-[10px] md:text-sm font-bold px-2 md:px-4 py-1 rounded-full uppercase tracking-widest mb-3 border border-gray-500/30">2nd</div>


                                            <div className="hidden md:block">
                                                <h3 className="text-gray-300 font-bold tracking-widest uppercase mb-1 text-sm">Silver</h3>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Prove Your Valor</p>
                                            </div>
                                            <div className="text-xl md:text-5xl font-bilderberg text-white font-bold tracking-tight">
                                                ₹<CountUp end={50000} duration={2.5} separator="," />
                                            </div>
                                            <div className="md:hidden text-sm text-gray-400 uppercase font-bold mt-1">Silver</div>
                                        </div>
                                        <div className="hidden md:block text-xs text-white/40 space-y-1 mt-4 pt-4 border-t border-white/5">
                                            <p>National Recognition</p>
                                            <p>Certificate of Excellence</p>
                                        </div>
                                    </div>
                                    {/* Base Refl */}
                                    <div className="absolute -bottom-4 left-0 w-full h-4 bg-gray-500/30 blur-xl rounded-full"></div>
                                </motion.div>

                                {/* 🏆 GRAND CHAMPION (Height: 100%) - Order 2 (Center) */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    whileInView={{ height: '100%', opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0, type: "spring", bounce: 0.3 }}
                                    className="w-[38%] md:w-1/3 flex flex-col justify-end group z-20 shadow-[0_0_50px_rgba(234,179,8,0.2)] relative"
                                >
                                    <div className="bg-gradient-to-t from-yellow-900/20 via-[#15152a] to-[#0F0F1A] border-x border-t border-yellow-500/50 rounded-t-xl p-3 md:p-8 text-center relative overflow-hidden flex flex-col justify-end md:justify-between h-full shadow-[0_-10px_60px_rgba(234,179,8,0.2)]">
                                        {/* Glow Effects */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_#EAB308]"></div>
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-yellow-500/10 to-transparent"></div>

                                        <div className="relative pt-4">
                                            {/* Rank Badge */}
                                            <div className="inline-block bg-yellow-500 text-black text-[10px] md:text-xl font-black px-3 md:px-6 py-1 md:py-2 rounded-full uppercase tracking-widest mb-3 md:mb-8 shadow-[0_0_25px_rgba(234,179,8,0.6)] animate-pulse-slow">1st</div>

                                            <div className="relative w-14 h-14 md:w-28 md:h-28 mx-auto bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 rounded-full flex items-center justify-center mb-2 md:mb-10 border border-yellow-400/40 text-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.3)]">
                                                {/* Floating Crown Animation */}

                                                <Trophy className="w-7 h-7 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                                            </div>

                                            <h3 className="hidden md:block text-yellow-400 font-bold tracking-[0.2em] uppercase mb-1 text-2xl">Gold Trophy</h3>
                                            <p className="hidden md:block text-xs text-yellow-500/70 uppercase tracking-widest mb-4">Define Your Legacy</p>

                                            <div className="text-3xl md:text-8xl font-bilderberg text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-yellow-200 mb-2 md:mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] font-bold tracking-tight">
                                                ₹<CountUp end={1} duration={3} /> <span className="text-2xl md:text-6xl">Lakh</span>
                                            </div>
                                            <div className="md:hidden text-lg text-white/60 mb-3">Champion</div>
                                        </div>

                                        <div className="relative w-full">
                                            <ul className="hidden md:block text-white/80 space-y-3 mb-8 text-sm font-medium">
                                                <li className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400" /> Rank #1 Champion</li>
                                                <li className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400" /> Premium Features & Fame</li>
                                            </ul>
                                            <Button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black font-black h-8 md:h-16 text-[8px] md:text-xl shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all uppercase tracking-normal md:tracking-widest relative overflow-hidden group transform hover:scale-105 active:scale-95 px-1 md:px-4">
                                                <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">Claim Throne <ArrowRight className="w-3 h-3 md:w-5 md:h-5" /></span>
                                                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Base Refl */}
                                    <div className="absolute -bottom-6 left-0 w-full h-8 bg-yellow-500/30 blur-2xl rounded-full"></div>
                                </motion.div>

                                {/* 🥉 2nd RUNNER UP (Height: 45%) - Order 3 (Right) */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    whileInView={{ height: '45%', opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4, type: "spring" }}
                                    className="w-[30%] md:w-1/3 flex flex-col justify-end group"
                                >
                                    <div className="bg-gradient-to-t from-gray-900 to-[#0F0F1A]/90 backdrop-blur-md border border-white/10 rounded-t-xl p-2 md:p-8 text-center relative overflow-hidden flex flex-col justify-end md:justify-between h-full hover:border-orange-500/50 transition-all shadow-[0_0_30px_rgba(194,65,12,0.1)] hover:shadow-orange-500/20">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-700 to-transparent"></div>
                                        <div className="pt-2">
                                            {/* Rank Badge */}
                                            <div className="inline-block bg-orange-700/20 text-orange-400 text-[10px] md:text-sm font-bold px-2 md:px-4 py-1 rounded-full uppercase tracking-widest mb-3 border border-orange-700/30">3rd</div>


                                            <div className="hidden md:block">
                                                <h3 className="text-orange-400 font-bold tracking-widest uppercase mb-1 text-sm">Bronze</h3>
                                                <p className="text-[10px] text-orange-500/70 uppercase tracking-wider mb-2">Start Your Journey</p>
                                            </div>
                                            <div className="text-xl md:text-5xl font-bilderberg text-white font-bold tracking-tight">
                                                ₹<CountUp end={25000} duration={2.5} separator="," />
                                            </div>
                                            <div className="md:hidden text-sm text-gray-500 uppercase font-bold mt-1">Bronze</div>
                                        </div>
                                        <div className="hidden md:block text-xs text-white/40 space-y-1 mt-4 pt-4 border-t border-white/5">
                                            <p>Make Your Mark</p>
                                            <p>Certificate of Excellence</p>
                                        </div>
                                    </div>
                                    {/* Base Refl */}
                                    <div className="absolute -bottom-4 left-0 w-full h-4 bg-orange-700/30 blur-xl rounded-full"></div>
                                </motion.div>

                            </div>

                            {/* THE STAGE BASE */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-gradient-to-t from-purple-900/50 to-transparent blur-xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>

                        {/* 🏆 4th - 7th Place Announcement */}
                        <div className="mt-20 relative z-20">
                            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/50 transition-all">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none"></div>

                                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                    <div className="w-20 h-20 bg-[#050510] rounded-full border-2 border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)] flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                        <Trophy className="w-10 h-10 text-yellow-500 animate-pulse-slow" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl md:text-3xl font-bilderberg text-white mb-2">Glory Beyond the Podium</h3>
                                        <p className="text-blue-100/80 text-lg leading-relaxed">
                                            <span className="text-yellow-400 font-bold">Ranks 4th to 7th</span> also receive <span className="text-white font-bold decoration-blue-500 underline decoration-2 underline-offset-4">Physical Trophy Medals</span> delivered home.
                                        </p>
                                        <p className="text-sm text-white/40 mt-2 font-mono uppercase tracking-wider">
                                            (Top 3 included)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>






                {/* 🎁 PARTICIPANT BENEFITS: LEGACY OF HONOR */}
                <section className="py-24 px-6 bg-[#050510] relative overflow-hidden">
                    {/* Background Ambience */}
                    <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto relative z-10 space-y-20">
                        <div className="text-center space-y-6">
                            <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Career Milestone</span>
                            <h2 className="text-4xl md:text-6xl font-bilderberg text-white leading-tight">
                                Guranteed rewards for every artist
                            </h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                                What You Get When You Join Winter Art Royale
                            </p>

                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] mt-6 animate-pulse-slow">
                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60A5FA]"></div>
                                <p className="text-xs md:text-base font-bold text-blue-100 tracking-wide">
                                    <span className="text-white">4 Official Recognition Documents</span> you will receive just <span className="text-yellow-400">1 Hour</span> after submission of your Artworks
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* COL 1: CERTIFICATES (LEFT) */}
                            <div className="h-full group relative p-8 rounded-3xl bg-gradient-to-br from-[#0F0F20] to-[#050510] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Award className="w-32 h-32 rotate-12" />
                                </div>
                                <h3 className="text-xl font-bilderberg text-white mb-2 flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-500" /> Creative Excellence Certificate
                                </h3>
                                <p className="text-white/50 mb-6 text-sm">
                                    Digitally verifiable proofs of your artistic valor.
                                </p>
                                <div className="grid grid-cols-1 gap-6 mt-auto">
                                    <div className="space-y-2">
                                        <p className="text-yellow-500/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <Star className="w-3 h-3 text-yellow-500" /> Excellence
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-yellow-500/20 shadow-[0_0_15px_rgba(255,215,0,0.1)] relative group/cert-exc">
                                            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover/cert-exc:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                            <img src="https://i.ibb.co/ZszCb1b/WAR-Certificate-of-creative-excellence.jpg" alt="WAR Certificate of Creative Excellence" className="w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-blue-400/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <CheckCircle className="w-3 h-3 text-blue-400" /> Participation Certificate
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group/cert-part">
                                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/cert-part:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                            <img src="https://i.ibb.co/gb5mrRYw/WAR-Certificate-of-participation.jpg" alt="WAR Certificate of Participation" className="w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COL 2: STACKED (ID + LETTER) (RIGHT) */}
                            <div className="flex flex-col gap-8 h-full">
                                {/* ARTIST ID CARD */}
                                <div className="flex-1 group relative p-8 rounded-3xl bg-gradient-to-br from-[#0F0F20] to-[#050510] border border-white/5 hover:border-purple-500/30 transition-all overflow-hidden flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
                                        <User className="w-6 h-6 text-purple-400" /> Artist ID
                                    </h3>
                                    <p className="text-white/50 text-sm mb-4">Your professional identity within the Daami ecosystem.</p>

                                    <div className="my-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group/idcard">
                                        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover/idcard:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                        <img src="https://i.ibb.co/nN3YSwdB/Winter-art-riyal-ID-card.jpg" alt="Winter art riyal ID card" className="w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 scale-100 group-hover/idcard:scale-105" />
                                    </div>
                                    <div className="flex gap-2 flex-wrap mt-4">
                                        <div className="py-2 px-3 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/60 uppercase tracking-wider">National Level</div>
                                        <div className="py-2 px-3 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/60 uppercase tracking-wider">Lifetime Validity</div>
                                    </div>
                                </div>

                                {/* MINISTER'S LETTER */}
                                <div className="flex-1 relative p-8 rounded-3xl bg-[#0F0F15] border border-yellow-500/20 group hover:border-yellow-500/40 transition-all overflow-hidden flex flex-col items-center justify-center text-center">
                                    {/* Golden Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-50"></div>
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>

                                    <div className="relative z-10 flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-[2px] mb-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                            <div className="w-full h-full bg-[#0F0F15] rounded-full flex items-center justify-center">
                                                <PenTool className="w-6 h-6 text-yellow-500" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bilderberg text-white mb-4">Letter of Appreciation</h3>
                                        <div className="w-12 h-0.5 bg-yellow-500/30 mx-auto mb-6"></div>

                                        <p className="text-white/70 text-base italic mb-8 leading-relaxed">
                                            "An exclusive honor signed by the <span className="text-yellow-400 font-bold">Culture Minister</span>. This isn't just a paper; it's a powerful endorsement of your contribution to Indian Art."
                                        </p>

                                        <div className="inline-flex items-center justify-center gap-3 mx-auto py-3 px-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                                            <Star className="w-4 h-4 fill-yellow-300" /> Signed & Sealed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* 🏆 COMPACT BENEFITS STRIP (Moved Below Pricing) */}
                        <section className="mt-8 py-6 bg-gradient-to-r from-[#FFD700]/10 via-[#FFD700]/20 to-[#FFD700]/10 border-y border-[#FFD700]/20 relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            <div className="max-w-5xl mx-auto px-6 grid grid-cols-[auto_1fr] items-center gap-6 relative z-10">
                                {/* Col 1: Logo */}
                                <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="W.A.R" className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] object-cover" />

                                {/* Col 2: Text */}
                                <div className="text-left">
                                    <p className="text-white/90 font-inter text-sm md:text-2xl leading-tight">
                                        Every Participant Receives <span className="text-[#FFD700]">Official Certificate, Artist ID Card & Appreciation Letter</span> signed by Subculture Minister.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                {/* 🎠 SLIDING RECOGNITION MARQUEE (New) */}
                <section className="py-12 bg-[#050510] relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none"></div>

                    <motion.div
                        className="flex gap-6 w-max pl-6"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    >
                        {/* Duplicate items for infinite scroll (3 Unique x 4) */}
                        {[
                            "https://i.ibb.co/WmzSWRc/Sliding-recognition-1-2.jpg",
                            "https://i.ibb.co/tTbmdXzR/Sliding-recognition-1-1.jpg",
                            "https://i.ibb.co/HpL7cQKS/Sliding-recognition-1.jpg",
                            "https://i.ibb.co/WmzSWRc/Sliding-recognition-1-2.jpg",
                            "https://i.ibb.co/tTbmdXzR/Sliding-recognition-1-1.jpg",
                            "https://i.ibb.co/HpL7cQKS/Sliding-recognition-1.jpg",
                            "https://i.ibb.co/WmzSWRc/Sliding-recognition-1-2.jpg",
                            "https://i.ibb.co/tTbmdXzR/Sliding-recognition-1-1.jpg",
                            "https://i.ibb.co/HpL7cQKS/Sliding-recognition-1.jpg",
                            "https://i.ibb.co/WmzSWRc/Sliding-recognition-1-2.jpg",
                            "https://i.ibb.co/tTbmdXzR/Sliding-recognition-1-1.jpg",
                            "https://i.ibb.co/HpL7cQKS/Sliding-recognition-1.jpg"
                        ].map((imgUrl, i) => (
                            <div key={i} className="w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group hover:border-blue-500/50 transition-all flex-shrink-0">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                <img src={imgUrl} alt={`Recognition Mockup ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* 🎒 CREATIVE STAR KIT SECTION (New) */}
                <section className="py-24 px-6 bg-[#050510] relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

                    <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                            <Star className="w-3 h-3" /> Exclusive Bonus
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bilderberg text-white leading-tight">
                            The Creative Star Kit <br /><span className="italic text-blue-400">We gave to our artists</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                            Kit for Our Previous Art Competition called Indian Creative Star
                        </p>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Gradient Fades for Infinite Look */}


                        {/* ROW 1: Left to Right */}
                        <div className="relative overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max items-center"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                            >
                                {[
                                    "https://i.ibb.co/bjVyrwd0/Whats-App-Image2026-01-08at5-26-11-PM.jpg",
                                    "https://i.ibb.co/21GKJVbk/Whats-App-Image2026-01-08at5-26-11-PM1.jpg",
                                    "https://i.ibb.co/4RKjQd5N/Whats-App-Image2026-01-08at5-26-12-PM.jpg",
                                    "https://i.ibb.co/PsTc3vV5/Whats-App-Image2026-01-08at5-26-12-PM1.jpg",
                                    "https://i.ibb.co/WN5X2zcY/Whats-App-Image2026-01-08at5-26-13-PM.jpg",
                                    "https://i.ibb.co/WvRt0Rs9/Whats-App-Image2026-01-08at5-26-13-PM1.jpg"
                                ].concat([
                                    "https://i.ibb.co/bjVyrwd0/Whats-App-Image2026-01-08at5-26-11-PM.jpg",
                                    "https://i.ibb.co/21GKJVbk/Whats-App-Image2026-01-08at5-26-11-PM1.jpg",
                                    "https://i.ibb.co/4RKjQd5N/Whats-App-Image2026-01-08at5-26-12-PM.jpg",
                                    "https://i.ibb.co/PsTc3vV5/Whats-App-Image2026-01-08at5-26-12-PM1.jpg",
                                    "https://i.ibb.co/WN5X2zcY/Whats-App-Image2026-01-08at5-26-13-PM.jpg",
                                    "https://i.ibb.co/WvRt0Rs9/Whats-App-Image2026-01-08at5-26-13-PM1.jpg"
                                ]).map((img, i) => (
                                    <div key={i} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-white/10 group hover:border-blue-500/50 transition-all flex-shrink-0 bg-black/40 relative">
                                        <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 block" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ROW 2: Right to Left */}
                        <div className="relative overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max items-center"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                            >
                                {[
                                    "https://i.ibb.co/DD6kbDc0/Whats-App-Image2026-01-08at5-26-12-PM2.jpg",
                                    "https://i.ibb.co/wn4ZXbL/Whats-App-Image2026-01-08at5-26-15-PM.jpg",
                                    "https://i.ibb.co/bMZDJTgm/Whats-App-Image2026-01-08at5-26-14-PM1.jpg",
                                    "https://i.ibb.co/d0QdtvLp/Whats-App-Image2026-01-08at5-26-14-PM.jpg",
                                    "https://i.ibb.co/FLHwZM4r/Whats-App-Image2026-01-08at5-26-13-PM2.jpg"
                                ].concat([
                                    "https://i.ibb.co/DD6kbDc0/Whats-App-Image2026-01-08at5-26-12-PM2.jpg",
                                    "https://i.ibb.co/wn4ZXbL/Whats-App-Image2026-01-08at5-26-15-PM.jpg",
                                    "https://i.ibb.co/bMZDJTgm/Whats-App-Image2026-01-08at5-26-14-PM1.jpg",
                                    "https://i.ibb.co/d0QdtvLp/Whats-App-Image2026-01-08at5-26-14-PM.jpg",
                                    "https://i.ibb.co/FLHwZM4r/Whats-App-Image2026-01-08at5-26-13-PM2.jpg"
                                ]).map((img, i) => (
                                    <div key={i} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-white/10 group hover:border-blue-500/50 transition-all flex-shrink-0 bg-black/40 relative">
                                        <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 block" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 🎯 KIT CTA */}
                <div className="py-12 bg-[#050510] text-center border-b border-white/5 relative z-10 flex flex-col items-center gap-6">
                    <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="W.A.R Logo" className="w-20 h-20 rounded-full border-2 border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.4)] object-cover" />
                    <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-6 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] transform hover:scale-105 transition-all">
                        Register Now & Get Your Kit
                    </Button>
                </div>



                {/* 📜 ABOUT: THE BATTLE */}
                <section id="about" className="py-24 px-6 bg-gradient-to-b from-[#050510] to-[#0a0a1a] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold tracking-widest uppercase">
                                <Flame className="w-3 h-3 text-orange-400" /> The Challenge
                            </div>
                            <img src="https://simgbb.com/avatar/FqL3vsz54HvL.jpg" alt="Daami Event Logo" className="w-16 h-16 rounded-full border-2 border-blue-500/50 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse-slow object-cover" />
                            <h2 className="text-4xl md:text-6xl font-bilderberg text-white leading-tight mb-6">
                                We are <span className="text-blue-400">Daami Event</span>
                            </h2>
                            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                                <p>
                                    An emerging event firm, and proud organizers of <strong className="text-white">Indian Creative Star ( Art Competition ) – Season 2</strong>.
                                </p>
                                <p>
                                    Our journey began with <span className="italic text-white/80">Sikkim Creative Star ( Art Competition ) – Season 1</span>, where 300+ artists registered and we discovered 6 Creative Stars.
                                </p>
                                <p>
                                    We are officially supported by <span className="text-yellow-400 font-bold">Government of Sikkim</span>, which adds credibility to our events.
                                </p>
                                <p className="font-bold text-white/80 border-l-2 border-blue-500 pl-3">
                                    Our mission: Discover and celebrate Creative Stars across India.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <h4 className="text-2xl font-bold text-white mb-1">Open</h4>
                                    <p className="text-sm text-white/40">Theme & Medium</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <h4 className="text-2xl font-bold text-white mb-1">National</h4>
                                    <p className="text-sm text-white/40">Recognition</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 group">
                            <img src="https://www.daamievent.com/WhatsApp%20Image%202025-09-09%20at%2011.03.00.jpeg" alt="GT Dhungel Sir" className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                                <Quote className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mb-2 md:mb-4 opacity-80" />
                                <p className="text-sm md:text-xl text-white font-bilderberg italic leading-relaxed">"Daami Event is doing a commendable job for society and the artistic community. Initiatives like these are crucial for preserving and promoting our rich cultural heritage."</p>
                                <div className="mt-3 md:mt-4">
                                    <p className="text-base md:text-lg font-bold text-yellow-400 uppercase tracking-widest">GT Dhungel Sir</p>
                                    <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-widest">Hon'ble Culture Minister, Sikkim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ⚔️ CONTEST FLOW: THE BATTLE PLAN */}
                <section className="py-24 px-6 bg-[#0a0a1a] relative overflow-hidden">
                    <div className="max-w-6xl mx-auto space-y-20">
                        <div className="text-center space-y-4">
                            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">The Battle Plan</span>
                            <h2 className="text-4xl md:text-6xl font-bilderberg text-white">Stages of the Winter Art Royale</h2>
                            <p className="text-white/40 max-w-xl mx-auto text-lg">From the first brushstroke to the final ceremony. Your roadmap to becoming a National Creative Star.</p>
                        </div>

                        <div className="relative">
                            {/* Animated Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden z-0">
                                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer opacity-50"></div>
                            </div>

                            {/* Connecting Line (Mobile) */}
                            <div className="md:hidden absolute top-0 left-[28px] h-full w-1 bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20 z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
                                {[
                                    { step: "01", title: "Register", desc: "Click Register to begin your campaign.", icon: Users, color: "text-blue-400" },
                                    { step: "02", title: "Join Alliance", desc: "Join our WhatsApp War Room immediately after registration.", icon: Users, color: "text-purple-400" },
                                    { step: "03", title: "Submit & Earn", desc: "Upload artwork & pay entry fee. Get Certificates & Gifts within 1 Hour.", icon: Brush, color: "text-yellow-400" },
                                    { step: "04", title: "Voting", desc: "Public Voting followed by Jury Evaluation.", icon: Users, color: "text-pink-400" },
                                    { step: "05", title: "Results", desc: "Final Results Declared. Champions crowned.", icon: Trophy, color: "text-green-400" }
                                ].map((stage, i) => (
                                    <div key={i} className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 group relative cursor-default">

                                        {/* Node Marker */}
                                        <div className="relative flex-shrink-0">
                                            {/* Pulse Effect */}
                                            <div className={`absolute inset-0 rounded-full bg-current opacity-20 animate-ping group-hover:opacity-40 ${stage.color}`}></div>
                                            <div className={`w-14 h-14 md:w-32 md:h-32 rounded-full bg-[#0a0a1a] border-2 border-white/10 group-hover:border-current transition-colors flex items-center justify-center relative z-10 shadow-xl ${stage.color}`}>
                                                <stage.icon className="w-6 h-6 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            {/* Connector Dot (Desktop) */}
                                            <div className={`hidden md:block absolute top-1/2 -right-[50%] w-full h-1 bg-gradient-to-r from-current to-transparent opacity-0 group-hover:opacity-50 transition-opacity ${i === 4 ? 'hidden' : ''} ${stage.color}`}></div>
                                        </div>

                                        <div className="md:text-center md:mt-8 pt-2">
                                            <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity ${stage.color}`}>Phase {stage.step}</div>
                                            <h3 className="text-2xl font-bilderberg text-white mb-2 group-hover:text-blue-200 transition-colors">{stage.title}</h3>

                                            {i === 2 ? (
                                                <div className="relative group/highlight">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-md rounded-lg group-hover/highlight:opacity-100 opacity-50 transition-opacity"></div>
                                                    <p className="relative bg-gradient-to-r from-purple-900/80 to-blue-900/80 border border-purple-500/50 rounded-lg p-3 text-sm leading-relaxed max-w-[180px] md:mx-auto text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] transform group-hover/highlight:scale-105 transition-all duration-300">
                                                        <span className="block text-[10px] text-purple-300 font-bold uppercase tracking-wider mb-1">Fast Reward</span>
                                                        {stage.desc}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-white/40 text-sm leading-relaxed max-w-[150px] md:mx-auto group-hover:text-white/60 transition-colors">{stage.desc}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Details (Moved Here) */}
                        <div className="grid md:grid-cols-2 gap-12 pt-20 border-t border-white/5 mt-20">
                            <div>
                                <h3 className="text-xl font-bilderberg text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> Who Can Participate?</h3>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    The Winter Art Royale is open to all Indian citizens.
                                </p>
                                <ul className="space-y-2 text-sm text-white/50">
                                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <b>Junior Category:</b> Artists aged under 18 years.</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <b>Senior Category:</b> Professional & Amateur artists aged 18+.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bilderberg text-white mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-blue-400" /> Submission Guidelines</h3>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    Ensure your artwork aligns with the "Winter" theme.
                                </p>
                                <ul className="space-y-2 text-sm text-white/50">
                                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span> High-resolution images (JPEG/PNG) required.</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Max file size: 10MB per submission.</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Original works only. Plagiarism leads to disqualification.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 🎨 CATEGORIES: RADIAL ORBIT */}
                <section className="py-24 px-6 bg-[#0a0a1a] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center space-y-4 mb-16 md:mb-32">
                            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Choose Your Weapon</span>
                            <h2 className="text-3xl md:text-5xl font-bilderberg text-white">Categories you can choose for</h2>
                            <p className="text-white/40 max-w-xl mx-auto">The battlefield is open for all forms of visual expression. Select your arena.</p>
                        </div>

                        {/* Orbit Container */}
                        <div className="relative w-full max-w-5xl mx-auto min-h-[500px] md:min-h-[600px] block">

                            {/* Connecting Lines (Desktop only - Triangle Radial) */}
                            <div className="absolute inset-0 pointer-events-none hidden md:block opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 1000 600">
                                    {/* Center (500,300) to 3 Points */}
                                    {/* 1. Top (Traditional): 500, 100 */}
                                    <path d="M500 300 L500 120" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="5,5" />
                                    {/* 2. Bottom Right (Sketch): ~750, 450 */}
                                    <path d="M500 300 L750 450" stroke="url(#grad2)" strokeWidth="2" strokeDasharray="5,5" />
                                    {/* 3. Bottom Left (Digital): ~250, 450 */}
                                    <path d="M500 300 L250 450" stroke="url(#grad3)" strokeWidth="2" strokeDasharray="5,5" />

                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#A855F7" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
                                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#EC4899" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
                                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* CENTRAL HUB: MASTER BRUSH */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity animate-pulse"></div>
                                    <div className="w-24 h-24 md:w-40 md:h-40 bg-[#0F0F20] rounded-full border-4 border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] relative z-10 group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 rounded-full"></div>
                                        <Palette className="w-10 h-10 md:w-16 md:h-16 text-white animate-spin-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    </div>
                                    <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-blue-300 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        Categories you can choose for
                                    </div>
                                </div>
                            </div>

                            {/* ITEM 1: Traditional (Top - 12 o'clock) */}
                            <div className="absolute top-0 md:top-[5%] left-1/2 -translate-x-1/2 w-[90%] md:w-80 text-center group">
                                <div className="p-4 md:p-6 rounded-2xl bg-[#0F0F20]/80 backdrop-blur-sm border border-white/5 hover:border-purple-500/50 transition-all hover:-translate-y-2 hover:bg-[#0F0F20]">
                                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-3 md:mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <Brush className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div className="mb-2">
                                        <h4 className="text-blue-400 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-1">Art Is War</h4>
                                        <h3 className="text-lg md:text-xl font-bold text-white">Traditional Art</h3>
                                    </div>
                                    <p className="text-white/50 text-xs md:text-sm">Oil, Acrylic, Watercolor, Charcoal. The classic masters' approach.</p>
                                </div>
                            </div>

                            {/* ITEM 2: Sketch & Mixed (Bottom Right - 4 o'clock) */}
                            <div className="absolute bottom-[0%] right-0 md:bottom-[10%] md:right-[5%] w-[48%] md:w-80 text-center group">
                                <div className="p-4 md:p-6 rounded-2xl bg-[#0F0F20]/80 backdrop-blur-sm border border-white/5 hover:border-pink-500/50 transition-all hover:-translate-y-2 hover:bg-[#0F0F20] h-full flex flex-col items-center justify-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-3 md:mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                        <PenTool className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 text-nowrap md:whitespace-normal">Sketch & Mixed</h3>
                                    <p className="text-white/50 text-xs md:text-sm leading-tight">Ink, Doodling, Mandala, Mixed Media.</p>
                                </div>
                            </div>

                            {/* ITEM 3: Digital Art (Bottom Left - 8 o'clock) */}
                            <div className="absolute bottom-[0%] left-0 md:bottom-[10%] md:left-[5%] w-[48%] md:w-80 text-center group">
                                <div className="p-4 md:p-6 rounded-2xl bg-[#0F0F20]/80 backdrop-blur-sm border border-white/5 hover:border-green-500/50 transition-all hover:-translate-y-2 hover:bg-[#0F0F20] h-full flex flex-col items-center justify-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-3 md:mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <Monitor className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Digital Art</h3>
                                    <p className="text-white/50 text-xs md:text-sm leading-tight">2D/3D Illustrations, Concept Art.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-[#050510] relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bilderberg text-white">Entry & Eligibility</h2>
                            <p className="text-white/40 max-w-2xl mx-auto">Join the ranks of elite artists. Select your level of engagement.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* Tier 1 */}
                            <div className="p-6 rounded-2xl bg-[#0F0F20] border border-white/5 hover:border-blue-500/30 transition-all text-center group relative overflow-visible mt-6">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600/20 border border-blue-500/50 backdrop-blur-md px-6 py-2 rounded-full whitespace-nowrap z-20 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                    <p className="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-wider animate-pulse flex items-center gap-1">
                                        ⚡ Get 2 Certificates in 1 Hour
                                    </p>
                                </div>
                                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4 mt-2">Student</h3>
                                <div className="text-4xl font-bilderberg text-white mb-2">₹299</div>
                                <p className="text-blue-400 text-sm mb-6">Single Entry</p>
                                <ul className="text-white/60 text-base space-y-4 mb-8 text-left w-full">
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" /> 1 Artwork Submission</li>
                                    <li className="flex flex-col gap-1">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" />
                                            <span>Get 2 E-Certificates</span>
                                        </div>
                                        <ul className="pl-8 space-y-1 text-white/40 text-xs list-disc italic">
                                            <li>Culture Minister Approved Participation Certificate</li>
                                            <li>Creative Excellence Certificate</li>
                                        </ul>
                                    </li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" /> Artist ID Card</li>
                                </ul>
                                <Button onClick={handleRegisterClick} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 text-base">Select Plan</Button>
                            </div>

                            {/* Tier 2 */}
                            <div className="p-6 rounded-2xl bg-[#0F0F20] border border-white/5 hover:border-blue-500/30 transition-all text-center group relative overflow-visible mt-6">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600/20 border border-blue-500/50 backdrop-blur-md px-6 py-2 rounded-full whitespace-nowrap z-20 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                    <p className="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-wider animate-pulse flex items-center gap-1">
                                        ⚡ Get 2 Certificates in 1 Hour
                                    </p>
                                </div>
                                <h3 className="text-blue-300 font-bold uppercase tracking-widest text-sm mb-4 mt-2">Warrior</h3>
                                <div className="text-5xl font-bilderberg text-white mb-2">₹499</div>
                                <p className="text-blue-400 text-sm mb-6">Double Strike</p>
                                <ul className="text-white/80 text-base space-y-4 mb-8 text-left w-full">
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" /> Submit 2 Artworks</li>
                                    <li className="flex flex-col gap-1">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                                            <span>Get 2 E-Certificates</span>
                                        </div>
                                        <ul className="pl-8 space-y-1 text-white/40 text-xs list-disc italic">
                                            <li>Culture Minister Approved Participation Certificate</li>
                                            <li>Creative Excellence Certificate</li>
                                        </ul>
                                    </li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" /> Artist ID Card</li>
                                </ul>
                                <Button onClick={handleRegisterClick} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 text-base">Select Plan</Button>
                            </div>

                            {/* Tier 3 (Popular) */}
                            <div className="p-6 rounded-2xl bg-gradient-to-b from-yellow-500/10 via-[#0F0F20] to-[#0F0F20] border border-yellow-500/40 transition-all text-center relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(234,179,8,0.15)] group mt-6">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full">
                                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-black uppercase py-1 px-4 rounded-full tracking-[0.2em] shadow-lg animate-pulse z-20">Very Popular</div>
                                    <div className="bg-yellow-500/20 border border-yellow-500/50 backdrop-blur-md px-6 py-2 rounded-full whitespace-nowrap z-10 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                        <p className="text-xs md:text-sm font-bold text-yellow-300 uppercase tracking-wider animate-pulse flex items-center gap-1">
                                            ⚡ Get Certificate + Physical Delivery
                                        </p>
                                    </div>
                                </div>

                                {/* Inner Glow Effect */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.1),transparent)] opacity-50"></div>

                                <h3 className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 relative z-10">Warlord</h3>
                                <div className="text-6xl font-bilderberg text-white mb-2 relative z-10">₹599</div>
                                <p className="text-yellow-500/60 text-base mb-6 font-bold tracking-widest relative z-10">Triple Threat</p>

                                <ul className="text-white/80 text-base space-y-6 mb-8 text-left w-full relative z-10">
                                    <li className="flex items-center gap-3 text-base">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500 shrink-0">
                                            <Trophy className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-white">Submit 3 Artworks</span>
                                    </li>

                                    <li className="flex items-center gap-3 text-base">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500 shrink-0">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-white">Artist ID Card</span>
                                    </li>

                                    <li className="flex items-center gap-3 text-base">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500 shrink-0">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-white">Get your Official Artist Portfolio Website</span>
                                    </li>

                                    <li className="relative group/physical">
                                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl opacity-20 group-hover/physical:opacity-40 transition-opacity"></div>
                                        <div className="flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <Flame className="w-12 h-12 text-yellow-500" />
                                            </div>

                                            <div className="flex items-center gap-2 text-yellow-400 mb-1">
                                                <Flame className="w-4 h-4 text-yellow-500 animate-pulse" />
                                                <span className="font-black text-xs uppercase tracking-[0.15em]">Premium Physical Kit</span>
                                            </div>

                                            <ul className="space-y-2.5">
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                                                    <span className="text-white font-medium leading-tight">Framed Physical Certificate</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                                                    <span className="text-white font-medium leading-tight">Official Appreciation Letter</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                                                    <span className="text-white font-medium leading-tight">Exclusive Event Medal</span>
                                                </li>
                                            </ul>

                                            <div className="mt-2 flex items-center justify-center gap-2 py-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/10">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">⚡ Free Home Delivery</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <Button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black font-black uppercase tracking-widest text-xs py-6 shadow-[0_10px_30px_rgba(234,179,8,0.2)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.3)] transition-all duration-300 relative z-10">
                                    Claim Your Throne
                                </Button>
                            </div>
                        </div>

                        {/* Additional Details */}

                    </div>
                </section>



                {/* 💬 REAL FEEDBACK: MARQUEE */}
                <section className="py-24 px-0 bg-[#050510] overflow-hidden border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                        <h4 className="text-blue-400 tracking-[0.2em] text-xs font-bold uppercase mb-2">Real Feedback</h4>
                        <h2 className="text-3xl md:text-5xl font-bilderberg text-white mb-4">Authentic feedback from Season 1 participants</h2>
                        <div className="flex items-center justify-center gap-2 text-white/60">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <span className="text-lg font-medium">4.9/5 from 300+ Artists</span>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden flex flex-col gap-8">
                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none"></div>

                        {/* ROW 1: Left Scroll */}
                        <motion.div
                            className="flex gap-6 w-max pl-6"
                            animate={{ x: "-50%" }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        >
                            {[
                                { name: "Ananya R.", role: "Verified Artist", review: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google Review" },
                                { name: "Rahul V.", role: "Verified Artist", review: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified Artist" },
                                { name: "Simran K.", role: "Verified Artist", review: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google Review" },
                                { name: "Vikram S.", role: "Verified Artist", review: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified Artist" },
                                { name: "Priya M.", role: "Verified Artist", review: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google Review" },
                                // Duplicates for smooth loop
                                { name: "Ananya R.", role: "Verified Artist", review: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google Review" },
                                { name: "Rahul V.", role: "Verified Artist", review: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified Artist" },
                                { name: "Simran K.", role: "Verified Artist", review: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google Review" },
                                { name: "Vikram S.", role: "Verified Artist", review: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified Artist" },
                                { name: "Priya M.", role: "Verified Artist", review: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google Review" }
                            ].map((testi, i) => (
                                <ReviewCard key={`row1-${i}`} testo={testi} />
                            ))}
                        </motion.div>

                        {/* ROW 2: Right Scroll */}
                        <motion.div
                            className="flex gap-6 w-max pl-6"
                            initial={{ x: "-50%" }}
                            animate={{ x: "0%" }}
                            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                        >
                            {[
                                { name: "Arjun D.", role: "Verified Artist", review: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified Artist" },
                                { name: "Neha G.", role: "Verified Artist", review: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google Review" },
                                { name: "Kabir J.", role: "Verified Artist", review: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified Artist" },
                                { name: "Riya S.", role: "Verified Artist", review: "The prize money is genuine, but the recognition is the real reward.", source: "Google Review" },
                                { name: "Aditya P.", role: "Verified Artist", review: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified Artist" },
                                // Duplicates for smooth loop
                                { name: "Arjun D.", role: "Verified Artist", review: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified Artist" },
                                { name: "Neha G.", role: "Verified Artist", review: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google Review" },
                                { name: "Kabir J.", role: "Verified Artist", review: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified Artist" },
                                { name: "Riya S.", role: "Verified Artist", review: "The prize money is genuine, but the recognition is the real reward.", source: "Google Review" },
                                { name: "Aditya P.", role: "Verified Artist", review: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified Artist" }
                            ].map((testi, i) => (
                                <ReviewCard key={`row2-${i}`} testo={testi} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 📸 REAL REVIEWS GALLERY (New) */}
                <section className="py-24 px-6 bg-[#050510] border-t border-white/5 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h4 className="text-blue-400 tracking-[0.2em] text-xs font-bold uppercase mb-4">Visual Proof</h4>
                            <h2 className="text-3xl md:text-5xl font-bilderberg text-white">Review Snapshots</h2>
                            <p className="text-white/40 mt-4">Unfiltered love from our community.</p>
                        </div>

                        {/* MASONRY-STYLE GRID */}
                        <div className="columns-2 md:columns-4 gap-4 space-y-4">
                            {[
                                "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
                                "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
                                "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
                                "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
                                "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
                                "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
                                "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
                            ].map((imgUrl, i) => (
                                <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group relative hover:border-blue-500/50 transition-all">
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors z-10 pointer-events-none"></div>
                                    <img
                                        src={imgUrl}
                                        alt={`User Review Snapshot ${i + 1}`}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🎯 SNAPSHOTS CTA */}
                <div className="py-12 bg-[#050510] text-center border-b border-white/5 relative z-10 flex flex-col items-center gap-6">
                    <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="W.A.R Logo" className="w-20 h-20 rounded-full border-2 border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.4)] object-cover" />
                    <Button onClick={handleRegisterClick} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-6 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] transform hover:scale-105 transition-all">
                        Register Now For Winter Art Royale
                    </Button>
                </div>

                {/* 🎨 PREVIOUS SEASON ARTWORKS: COLLAGE GALLERY */}
                <section className="py-24 px-6 bg-[#020205] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="max-w-7xl mx-auto mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                            <Brush className="w-3 h-3" /> Masterpieces
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bilderberg text-white mb-6">Amazing Artworks Submitted by Our Artists</h2>
                        <p className="text-white/40 max-w-2xl mx-auto">A glimpse into the incredible talent from previous seasons of Indian Creative Star.</p>
                    </div>

                    {/* Sliding Marquee Gallery */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Row 1: Left to Right */}
                        <div className="relative overflow-hidden w-full">
                            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none"></div>

                            <motion.div
                                className="flex gap-4 w-max"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                            >
                                {[
                                    "/optimized_gallery/gallery_1.webp",
                                    "/optimized_gallery/gallery_2.webp",
                                    "/optimized_gallery/gallery_3.webp",
                                    "/optimized_gallery/gallery_4.webp",
                                    "/optimized_gallery/gallery_5.webp",
                                    "/optimized_gallery/gallery_6.webp",
                                    "/optimized_gallery/gallery_7.webp",
                                    "/optimized_gallery/gallery_8.webp",
                                    "/optimized_gallery/gallery_9.webp",
                                    "/optimized_gallery/gallery_10.webp",
                                    "/optimized_gallery/gallery_11.webp",
                                    "/optimized_gallery/gallery_12.webp",
                                    "/optimized_gallery/gallery_13.webp",
                                    // Duplicate for infinite loop
                                    "/optimized_gallery/gallery_1.webp",
                                    "/optimized_gallery/gallery_2.webp",
                                    "/optimized_gallery/gallery_3.webp",
                                    "/optimized_gallery/gallery_4.webp",
                                    "/optimized_gallery/gallery_5.webp",
                                    "/optimized_gallery/gallery_6.webp",
                                    "/optimized_gallery/gallery_7.webp",
                                    "/optimized_gallery/gallery_8.webp",
                                    "/optimized_gallery/gallery_9.webp",
                                    "/optimized_gallery/gallery_10.webp",
                                    "/optimized_gallery/gallery_11.webp",
                                    "/optimized_gallery/gallery_12.webp",
                                    "/optimized_gallery/gallery_13.webp"
                                ].map((img, i) => (
                                    <div key={i} className="w-[200px] md:w-[300px] aspect-[4/3] rounded-xl overflow-hidden border border-white/5 relative group flex-shrink-0">
                                        <img
                                            src={img}
                                            alt={`Gallery Artwork ${i}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 backface-hidden"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Row 2: Right to Left */}
                        <div className="relative overflow-hidden w-full">
                            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none"></div>

                            <motion.div
                                className="flex gap-4 w-max"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                            >
                                {[
                                    "/optimized_gallery/gallery_14.webp",
                                    "/optimized_gallery/gallery_15.webp",
                                    "/optimized_gallery/gallery_16.webp",
                                    "/optimized_gallery/gallery_17.webp",
                                    "/optimized_gallery/gallery_18.webp",
                                    "/optimized_gallery/gallery_19.webp",
                                    "/optimized_gallery/gallery_20.webp",
                                    "/optimized_gallery/gallery_21.webp",
                                    "/optimized_gallery/gallery_22.webp",
                                    "/optimized_gallery/gallery_23.webp",
                                    "/optimized_gallery/gallery_24.webp",
                                    "/optimized_gallery/gallery_25.webp",
                                    "/optimized_gallery/gallery_26.webp",
                                    // Duplicate for infinite loop
                                    "/optimized_gallery/gallery_14.webp",
                                    "/optimized_gallery/gallery_15.webp",
                                    "/optimized_gallery/gallery_16.webp",
                                    "/optimized_gallery/gallery_17.webp",
                                    "/optimized_gallery/gallery_18.webp",
                                    "/optimized_gallery/gallery_19.webp",
                                    "/optimized_gallery/gallery_20.webp",
                                    "/optimized_gallery/gallery_21.webp",
                                    "/optimized_gallery/gallery_22.webp",
                                    "/optimized_gallery/gallery_23.webp",
                                    "/optimized_gallery/gallery_24.webp",
                                    "/optimized_gallery/gallery_25.webp",
                                    "/optimized_gallery/gallery_26.webp"
                                ].map((img, i) => (
                                    <div key={i} className="w-[200px] md:w-[300px] aspect-[4/3] rounded-xl overflow-hidden border border-white/5 relative group flex-shrink-0">
                                        <img
                                            src={img}
                                            alt={`Gallery Artwork ${i}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 backface-hidden"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Row 3: Left to Right (New Row for More Art) */}
                        <div className="relative overflow-hidden w-full">
                            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none"></div>

                            <motion.div
                                className="flex gap-4 w-max"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                            >
                                {[
                                    "/optimized_gallery/gallery_27.webp",
                                    "/optimized_gallery/gallery_28.webp",
                                    "/optimized_gallery/gallery_29.webp",
                                    "/optimized_gallery/gallery_30.webp",
                                    "/optimized_gallery/gallery_31.webp",
                                    "/optimized_gallery/gallery_32.webp",
                                    "/optimized_gallery/gallery_33.webp",
                                    "/optimized_gallery/gallery_34.webp",
                                    "/optimized_gallery/gallery_35.webp",
                                    "/optimized_gallery/gallery_36.webp",
                                    "/optimized_gallery/gallery_37.webp",
                                    "/optimized_gallery/gallery_38.webp",
                                    "/optimized_gallery/gallery_39.webp",
                                    // Duplicate for infinite loop
                                    "/optimized_gallery/gallery_27.webp",
                                    "/optimized_gallery/gallery_28.webp",
                                    "/optimized_gallery/gallery_29.webp",
                                    "/optimized_gallery/gallery_30.webp",
                                    "/optimized_gallery/gallery_31.webp",
                                    "/optimized_gallery/gallery_32.webp",
                                    "/optimized_gallery/gallery_33.webp",
                                    "/optimized_gallery/gallery_34.webp",
                                    "/optimized_gallery/gallery_35.webp",
                                    "/optimized_gallery/gallery_36.webp",
                                    "/optimized_gallery/gallery_37.webp",
                                    "/optimized_gallery/gallery_38.webp",
                                    "/optimized_gallery/gallery_39.webp"
                                ].map((img, i) => (
                                    <div key={i} className="w-[200px] md:w-[300px] aspect-[4/3] rounded-xl overflow-hidden border border-white/5 relative group flex-shrink-0">
                                        <img
                                            src={img}
                                            alt={`Gallery Artwork ${i}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 backface-hidden"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>



                {/* 🏆 PRIZE DISTRIBUTION CEREMONY: GRAND GALLERY (New) */}
                <section className="py-24 px-6 bg-[#050510] border-t border-white/5 relative overflow-hidden">
                    {/* Background Ambience */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16 space-y-4">
                            <h4 className="text-yellow-500 tracking-[0.2em] text-xs font-bold uppercase mb-2">Hall of Fame</h4>
                            <h2 className="text-3xl md:text-5xl font-bilderberg text-white">Prize Distribution Ceremony</h2>
                            <p className="text-white/40 max-w-2xl mx-auto text-lg">
                                Moments of glory. Where talent meets its reward.
                            </p>
                        </div>

                        {/* STYLISH MOSAIC GRID */}
                        {/* STYLISH MASONRY GRID (FREE HEIGHT) */}
                        <div className="columns-2 md:columns-4 gap-4 space-y-4">
                            {/* Feature Large Item (First Image) */}
                            <div className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group relative hover:border-yellow-500/50 transition-all mb-4">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                                <img src="https://i.ibb.co/GvxDtkMB/IMG-20250914-WA0061-1-11zon.jpg" alt="Prize Ceremony Highlight" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className="inline-block px-3 py-1 bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">Grand Event</div>
                                    <h3 className="text-white font-bilderberg text-xl md:text-2xl">Celebrating Excellence</h3>
                                </div>
                            </div>

                            {/* Standard Items */}
                            {[
                                "https://i.ibb.co/gFjJ0nrD/IMG-20250915-133301-11zon.jpg",
                                "https://i.ibb.co/PRq5Y0T/IMG-20250914-WA0028-11zon.jpg",
                                "https://i.ibb.co/dsLXSzc5/IMG-20250914-WA0034-11zon.jpg",
                                "https://i.ibb.co/hFtJFDNM/IMG-20250914-WA0024-11zon.jpg",
                                "https://i.ibb.co/RxbjbPt/IMG-20250914-WA0026-11zon-2.jpg",
                                "https://i.ibb.co/6Jf9VgW9/IMG-20250914-WA0065-11zon.jpg"
                            ].map((imgUrl, i) => (
                                <div key={i} className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 group relative hover:border-yellow-500/50 transition-all">
                                    <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-colors z-10 pointer-events-none"></div>
                                    <img src={imgUrl} alt={`Ceremony Moment ${i + 1}`} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ❓ FAQ */}
                <section className="py-24 px-6 bg-[#050510]">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <h2 className="text-3xl md:text-5xl font-bilderberg text-white text-center">War Room Queries</h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {[
                                { q: "Who can participate?", a: "Open to all Indian citizens. We have specific categories for Juniors (Under 18) and Seniors (18+)." },
                                { q: "Are digital artworks accepted?", a: "Yes! We welcome Digital Art, Traditional Art (Oil, Acrylic, Watercolor), and Sketching/Mixed Media." },
                                { q: "What is the entry fee?", a: "Entries start at ₹299 (Student Plan). You can upgrade to Warrior (₹499) or Warlord (₹599) for multiple submissions and premium perks." },
                                { q: "When do I receive my certificates?", a: "Instantly! You will receive your Culture Minister Signed Participation & Excellence Certificates within 1 hour of submission." },
                                { q: "How are the winners decided?", a: "Winners are chosen through a transparent process combining Public Voting and Professional Jury Evaluation." },
                                { q: "What if I win a physical prize?", a: "Prizes like Trophies and Medals (Rank 1-7) include free home delivery across India." }
                            ].map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/5 rounded-lg px-4">
                                    <AccordionTrigger className="text-white hover:text-blue-400 text-left">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-white/60">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* 🚀 FINAL CTA */}
                {/* 🚀 FINAL CTA (Small & Motivating) */}
                <section className="py-16 px-6 text-center relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border-t border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-left">
                            <h2 className="text-3xl font-bilderberg text-white mb-2">Claim Your Destiny.</h2>
                            <p className="text-blue-200/80 text-lg">The world is waiting for your masterpiece.</p>
                        </div>
                        <Button onClick={handleRegisterClick} className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-6 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] whitespace-nowrap transform hover:scale-105 transition-all">
                            Register Now
                        </Button>
                    </div>
                </section>



            </main >

            <footer className="py-12 text-center text-white/20 text-sm border-t border-white/5 bg-[#020205]">
                <p>© 2024 Daami Event. Winter Art Royale.</p>
            </footer>

            {/* 📱 Mobile Sticky CTA - Portal to body to avoid transform issues */}
            {
                createPortal(
                    <div className={`fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-4 bg-[#020205] md:bg-[#020205]/95 md:backdrop-blur-xl border-t border-blue-500/30 md:hidden flex items-center justify-between gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] transition-all duration-500 transform ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="flex items-center gap-1 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live</span>
                            </div>
                            <div className="flex items-end gap-1.5">
                                <span className="text-white font-playfair text-base leading-none whitespace-nowrap">
                                    Join Winter Art Royale
                                </span>
                            </div>
                        </div>
                        <Button onClick={handleRegisterClick} className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full px-5 py-2.5 h-auto text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Enter Now
                        </Button>
                    </div>,
                    document.body
                )
            }
        </div >
    );
};

export default WinterArtRoyale;