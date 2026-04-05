import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, ArrowRight, Award, Crown, CheckCircle2, Shield, Users, Globe, Sparkles, Mail, Trophy } from "lucide-react";
import { hallOfFameData, Winner } from "@/data/hallOfFameWinners";

// Assets
import companyLogo from "@/assets/images/company-logo.webp";

const EventHallOfFame = () => {
    const { eventId } = useParams<{ eventId: string }>();

    const currentEvent = hallOfFameData.find((event) => event.eventId === eventId);

    const renderHighlightedText = (text: string, styleVersion: 1 | 2 | 3 = 1) => {
        return text.split(/(\b\d{4,}\+?\b|hybrid model|home-delivery service|tripled our financial backing|E-Certificate|Artist ID card|live public voting|online accessibility|offline community engagement|₹\d{1,3}(?:,\d{3})*)/i).map((chunk, index) => {
            const isHighlightRegex = /\b\d{4,}\+?\b|hybrid model|home-delivery service|tripled our financial backing|E-Certificate|Artist ID card|live public voting|online accessibility|offline community engagement|₹\d{1,3}(?:,\d{3})*/i;
            if (isHighlightRegex.test(chunk)) {
                if (styleVersion === 1) {
                    return <span key={index} className="inline-flex items-center text-[#D4AF37] font-black tracking-widest bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-0.5 rounded mx-1 shadow-[0_0_10px_rgba(212,175,55,0.1)] text-[0.85em] uppercase translate-y-[-1px]">{chunk}</span>;
                } else if (styleVersion === 2) {
                    return <span key={index} className="inline-flex items-center text-[#0F0F0F] font-black tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] px-2 py-0.5 rounded mx-1 shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[0.85em] uppercase translate-y-[-1px]">{chunk}</span>;
                } else {
                    return <span key={index} className="inline-flex items-center text-[#D4AF37] font-black tracking-widest border-b border-[#D4AF37]/50 px-1 mx-1 text-[0.85em] uppercase not-italic">{chunk}</span>;
                }
            }
            return chunk;
        });
    };

    // If event not found, handle gracefully (could redirect to 404, but just an empty state is fine)
    if (!currentEvent) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center font-playfair">
                <h1 className="text-4xl text-[#D4AF37] mb-4">Event Archive Not Found</h1>
                <Link to="/hall-of-fame" className="text-white/60 hover:text-white border border-white/20 px-6 py-2">
                    Return to Hall of Fame Hub
                </Link>
            </div>
        );
    }

    // Helper to group winners by category
    const groupedWinners = currentEvent.winners.reduce((acc, winner) => {
        const cat = winner.category || 'General';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(winner);
        return acc;
    }, {} as Record<string, Winner[]>);

    const categories = Object.keys(groupedWinners);

    // Helper to get medal color based on rank
    const getMedalColor = (rank: number) => {
        if (rank === 1) return "text-[#D4AF37]"; // Gold
        if (rank === 2) return "text-[#C0C0C0]"; // Silver
        if (rank === 3) return "text-[#CD7F32]"; // Bronze
        return "text-[#F5F5DC]/60";
    };

    const getPodiumOrder = (winners: Winner[]) => {
        // Order: 2nd, 1st, 3rd in the UI grid
        const first = winners.find(w => w.rank === 1);
        const second = winners.find(w => w.rank === 2);
        const third = winners.find(w => w.rank === 3);
        return [second, first, third].filter(Boolean) as Winner[];
    };

    // Update Document Title
    useEffect(() => {
        const originalTitle = document.title;
        document.title = `${currentEvent.eventName} - Hall of Fame | Daami Event`;
        return () => {
            document.title = originalTitle;
        };
    }, [currentEvent.eventName]);

    return (
        <div className="min-h-screen bg-black text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pb-24 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111111] via-[#050505] to-[#000000]">
            
            {/* Embedded Cover Image Backing for "Sikkim Creative Star & Indian Creative Star" */}
            {currentEvent.coverImage && (
                <div 
                    className="fixed inset-0 z-0 opacity-[0.04] mix-blend-screen bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${currentEvent.coverImage})` }}
                ></div>
            )}
            <style>{`
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-lato { font-family: 'Lato', sans-serif; }
                
                @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti-fall {
                    animation: confetti-fall linear forwards;
                }

                @keyframes bg-crawl {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-bg-crawl {
                    animation: bg-crawl 60s linear infinite;
                }
            `}</style>

            {/* Falling Gold Confetti */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[60]">
                {[...Array(60)].map((_, i) => {
                    const style = {
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: Math.random() > 0.5 ? '#D4AF37' : '#F2D06B',
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 12 + 6}px`,
                        opacity: Math.random() * 0.5 + 0.5,
                    };
                    return <div key={i} className="absolute -top-10 animate-confetti-fall" style={style}></div>
                })}
            </div>

            {/* Massive Cinematic Background Text */}
            <div className="fixed top-1/3 left-0 right-0 overflow-hidden pointer-events-none z-0 opacity-10 mix-blend-overlay">
                <div className="flex animate-bg-crawl whitespace-nowrap text-[#D4AF37] font-playfair font-black text-[150px] md:text-[250px] leading-none tracking-widest">
                    CHAMPIONS • LEGENDS • VICTORS • CHAMPIONS • LEGENDS • VICTORS • 
                </div>
            </div>

            {/* Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}></div>

            {/* Header / Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm bg-[#0F0F0F]/80 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={companyLogo} alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                        <div className="hidden sm:block">
                            <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37] flex items-center gap-2">
                                DAAMI EVENT
                            </h1>
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 flex items-center gap-1">
                                Event Archives
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link to="/contact" className="flex items-center justify-center text-[10px] md:text-xs tracking-widest uppercase text-white/60 md:text-white/60 font-medium hover:text-white transition-colors duration-300 gap-1.5 p-2 md:px-2 md:py-2 border border-white/10 md:border-transparent rounded bg-white/5 md:bg-transparent">
                            <Mail className="w-4 h-4 md:w-3.5 md:h-3.5" />
                            <span className="hidden md:inline">Get In Touch</span>
                        </Link>
                        
                        <Link to="/" className="text-[10px] md:text-xs tracking-widest uppercase font-black text-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-300 flex items-center gap-2 border border-[#D4AF37]/50 px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5">
                            <span className="hidden sm:inline">Join Ongoing Event</span>
                            <span className="inline sm:hidden">Join Now</span>
                            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Link>

                        <Link to="/hall-of-fame" className="text-[10px] md:text-xs tracking-widest uppercase text-white/80 font-medium hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 border border-white/10 hover:border-[#D4AF37]/50 px-3 md:px-4 py-2 md:py-2.5 rounded-none bg-white/5 shadow-md ml-1 md:ml-2">
                            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Back To Hub</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content wrapper */}
            <main className="relative z-10 pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center">
                
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full flex flex-col items-center relative"
                    >
                        {/* Huge background spotlight for the hero */}
                        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none z-[-1]"></div>

                        {/* Selected Event Description Header */}
                        <div className="text-center mb-16 md:mb-32 max-w-4xl mx-auto space-y-6 px-4 pt-10">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center justify-center gap-4 mb-4 border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-8 py-3 rounded-none shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                            >
                                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                                <p className="text-[#D4AF37] text-sm md:text-base tracking-[0.4em] font-black uppercase text-shadow-sm">
                                    THE HALL OF LEGENDS
                                </p>
                                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                            </motion.div>
                            
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5F5DC] to-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                {currentEvent.eventName}
                            </h1>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap items-center justify-center gap-3 py-8 w-full max-w-3xl mx-auto"
                            >
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-gradient-to-r from-[#10B981]/20 to-transparent border border-[#10B981]/40 text-[#10B981] text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 text-[#D4AF37] text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                    <Crown className="w-3.5 h-3.5" /> {currentEvent.eventDate}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-[#3B82F6]/30 bg-gradient-to-r from-[#3B82F6]/10 to-transparent text-[#60A5FA] text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                    <Shield className="w-3.5 h-3.5" /> Daami Verified
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/10 to-transparent text-[#FBBF24] text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                    <Star className="w-3.5 h-3.5 fill-[#FBBF24]" /> 4.8 Student Reviews
                                </span>
                            </motion.div>
                            
                            <p className="text-lg md:text-2xl text-[#D4AF37]/80 font-light leading-relaxed italic px-4 font-playfair tracking-wide max-w-2xl mx-auto">
                                "{currentEvent.description}"
                            </p>
                        </div>

                        {/* Continuous Winners Ticker For Current Event */}
                        {currentEvent.winners && currentEvent.winners.length > 0 && (
                            <div className="w-full max-w-[100vw] overflow-hidden bg-[#D4AF37]/[0.02] border-y border-[#D4AF37]/20 py-8 mb-24 relative select-none -mx-4 md:-mx-6 flex opacity-95">
                                {/* Dark gradient blur behind the cards */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"></div>

                                {/* Shadow edges for smooth fade */}
                                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

                                <div className="flex items-center animate-scroll w-max relative z-0">
                                    {/* Duplicate the array TWICE so it seamlessly loops */}
                                    {[...currentEvent.winners, ...currentEvent.winners, ...currentEvent.winners].map((winner, idx) => (
                                        <div key={idx} className="flex min-w-[320px] md:min-w-[420px] h-[140px] md:h-[160px] mx-2 md:mx-3 border border-white/10 hover:border-[#D4AF37]/40 bg-white/[0.02] backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 relative group overflow-hidden">
                                            
                                            {/* Floating Glow Effect */}
                                            <div className="absolute -left-10 -top-10 w-32 h-32 bg-[#D4AF37]/20 blur-[40px] rounded-full group-hover:bg-[#D4AF37]/30 transition-colors z-0 pointer-events-none"></div>

                                            {/* Giant elegant watermark of their rank */}
                                            <div className="absolute bottom-1 right-3 text-white/[0.02] font-playfair font-black text-6xl md:text-7xl leading-none select-none pointer-events-none group-hover:text-[#D4AF37]/10 transition-colors z-0 translate-y-3">
                                                {winner.rank <= 3 ? `#${winner.rank}` : null}
                                            </div>

                                            {/* Image Container */}
                                            <div className="relative w-[40%] h-full bg-[#050505]/80 overflow-hidden flex-shrink-0 z-10 flex items-center justify-center p-2 border-r border-[#D4AF37]/10 shadow-[inset_-5px_0_15px_rgba(0,0,0,0.5)]">
                                                {winner.imageUrl ? (
                                                    <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-contain filter drop-shadow-[0_5px_10px_rgba(212,175,55,0.2)] transform group-hover:scale-110 transition-transform duration-700" />
                                                ) : (
                                                    <Award className="w-12 h-12 text-[#D4AF37]/30" />
                                                )}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex flex-col justify-center h-full w-[60%] z-10 px-4 md:px-5 py-3 relative">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Award className="w-3 h-3 text-[#D4AF37]" />
                                                    <span className="text-[#D4AF37] text-[9px] md:text-[10px] tracking-widest uppercase font-black truncate">Rank {winner.rank}</span>
                                                </div>
                                                <span className="font-playfair font-bold text-white text-base md:text-lg tracking-wide mb-1.5 truncate block group-hover:text-[#D4AF37] transition-colors">{winner.name}</span>
                                                
                                                <div className="mt-auto flex flex-col gap-1 w-full relative z-10">
                                                    <div className="inline-flex max-w-max px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-[7px] md:text-[8px] tracking-[0.2em] uppercase rounded shadow-sm truncate">
                                                        {winner.title}
                                                    </div>
                                                    <span className="text-white/40 font-bold text-[7px] md:text-[8px] tracking-[0.3em] uppercase pl-1 mt-0.5">
                                                        {winner.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ==================================================== */}
                        {/* LEGACY & IMPACT SECTION */}
                        {/* ==================================================== */}
                        {(currentEvent.aboutParagraphs || currentEvent.trustPillars || currentEvent.valueStack || currentEvent.stats) && (
                            <div className="w-full max-w-7xl mx-auto px-4 mb-32 flex flex-col gap-12 md:gap-20 relative z-10">
                                
                                {/* 1. The Context (Paragraph 0) */}
                                {currentEvent.aboutParagraphs && currentEvent.aboutParagraphs[0] && (
                                    <div className="w-full max-w-4xl mx-auto space-y-6 text-center relative z-10 pt-4">
                                        <div className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)] mb-4">
                                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#D4AF37]">Verified Daami Event Archive</span>
                                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                        </div>
                                        <motion.p 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="text-white/80 font-lato leading-loose text-lg md:text-xl font-light"
                                        >
                                            {renderHighlightedText(currentEvent.aboutParagraphs[0], 1)}
                                        </motion.p>
                                    </div>
                                )}

                                {/* 2. Visual Hook: Trust Pillars (3 Columns) */}
                                {currentEvent.trustPillars && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-4 w-full max-w-6xl mx-auto">
                                        {currentEvent.trustPillars.map((pillar, i) => {
                                            const Icon = pillar.icon === 'Shield' ? Shield : pillar.icon === 'Users' ? Users : pillar.icon === 'Globe' ? Globe : Trophy;
                                            return (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                                    className="flex flex-col items-center text-center p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/[0.05] transition-all duration-500 group shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:-translate-y-2"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[inset_0_0_25px_rgba(212,175,55,0.4)]">
                                                        <Icon className="w-8 h-8 text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                                    </div>
                                                    <h3 className="font-playfair font-black tracking-wide text-white text-xl md:text-2xl mb-4 group-hover:text-[#D4AF37] transition-colors">{pillar.title}</h3>
                                                    <p className="text-white/60 font-lato leading-relaxed text-sm md:text-base">{pillar.description}</p>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* 3. The Execution (Paragraph 1) */}
                                {currentEvent.aboutParagraphs && currentEvent.aboutParagraphs[1] && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="w-full max-w-4xl mx-auto mt-4 mb-4 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border-l-4 border-[#D4AF37] shadow-xl relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,_transparent_70%)] pointer-events-none"></div>
                                        <p className="text-white/70 font-lato leading-loose text-base md:text-lg">
                                            {renderHighlightedText(currentEvent.aboutParagraphs[1], 2)}
                                        </p>
                                    </motion.div>
                                )}

                                {/* The Official Legacy Gallery (Top 6) */}
                                {currentEvent.galleryUrls && currentEvent.galleryUrls.length >= 6 && (
                                    <div className="w-full max-w-6xl mx-auto mt-16 mb-24 relative z-10 hidden md:block">
                                        <div className="flex items-center justify-center gap-4 mb-10">
                                            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/30"></div>
                                            <h3 className="font-playfair font-black text-[#D4AF37] text-2xl tracking-widest uppercase text-center">
                                                Official Event Gallery
                                            </h3>
                                            <div className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/30"></div>
                                        </div>
                                        
                                        <div className="columns-2 lg:columns-3 gap-3 md:gap-5 space-y-3 md:space-y-5">
                                            {currentEvent.galleryUrls.slice(0, 6).map((url, i) => {
                                                return (
                                                    <div key={i} className="relative overflow-hidden border border-white/10 hover:border-[#D4AF37]/80 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 rounded-lg shadow-xl break-inside-avoid inline-block w-full z-0 hover:z-10 group bg-black/20">
                                                        <img src={url} alt="Gallery image" className="w-full h-auto block" loading="lazy"/>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 4. Visual Climax: Value Stack & Impact Stats */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mt-4 w-full max-w-6xl mx-auto">
                                    
                                    {/* Left: Value Stack Checklist (7 cols) */}
                                    {currentEvent.valueStack && (
                                        <div className="lg:col-span-7 space-y-6 bg-gradient-to-r from-white/[0.03] to-transparent p-8 md:p-10 rounded-2xl border border-white/5 border-l-[3px] border-l-[#D4AF37]/50 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_left,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

                                            <h3 className="font-playfair font-black text-[#D4AF37] text-2xl md:text-3xl tracking-wide uppercase drop-shadow-sm mb-8">
                                                The Official Verdict
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 relative z-10">
                                                {currentEvent.valueStack.map((item, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                                        className="flex items-start gap-4 group"
                                                    >
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                                                        </div>
                                                        <span className="text-white/70 font-lato leading-snug text-[15px] group-hover:text-white transition-colors duration-300">{item}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Right: The Stats Grid (5 cols) */}
                                    {currentEvent.stats && (
                                        <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 w-full">
                                            {[
                                                { label: "Artists Joined", value: currentEvent.stats.artistsJoined, delay: 0.2 },
                                                { label: "Artworks", value: currentEvent.stats.artworksSubmitted, delay: 0.3 },
                                                { label: "Prize Pool", value: currentEvent.stats.prizePool, delay: 0.4 },
                                                { label: "Satisfaction", value: currentEvent.stats.satisfactionRate, highlight: true, delay: 0.5 },
                                            ].map((stat, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: stat.delay, duration: 0.5 }}
                                                    className={`flex flex-col items-center justify-center p-6 rounded-xl border ${stat.highlight ? 'border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#D4AF37]/40'} backdrop-blur-md transition-all duration-500 group hover:-translate-y-1 h-full min-h-[140px]`}
                                                >
                                                    <span className={`text-3xl md:text-4xl lg:text-5xl font-playfair font-black mb-2 ${stat.highlight ? 'text-white' : 'text-[#D4AF37] group-hover:text-white'} drop-shadow-lg transition-colors`}>
                                                        {stat.value}
                                                    </span>
                                                    <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-center ${stat.highlight ? 'text-white/90' : 'text-white/40 group-hover:text-[#D4AF37]'} transition-colors`}>
                                                        {stat.label}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 5. The Conclusion (Paragraph 2) */}
                                {currentEvent.aboutParagraphs && currentEvent.aboutParagraphs[2] && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="w-full max-w-4xl mx-auto text-center mt-8 space-y-8"
                                    >
                                        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto"></div>
                                        <p className="text-white/70 font-lato leading-loose text-base md:text-xl font-light italic">
                                            {renderHighlightedText(currentEvent.aboutParagraphs[2], 3)}
                                        </p>
                                        <div className="flex items-center justify-center gap-4 mt-8">
                                            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/30"></div>
                                            <Crown className="w-5 h-5 text-[#D4AF37]/50" />
                                            <div className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/30"></div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {categories.map((category) => {
                            const categoryWinners = groupedWinners[category];
                            const topThree = categoryWinners.filter(w => w.rank <= 3).sort((a, b) => a.rank - b.rank);
                            const honorableMentions = categoryWinners.filter(w => w.rank > 3).sort((a, b) => a.rank - b.rank);
                            const podiumWinners = getPodiumOrder(topThree);

                            return (
                                <div key={category} className="w-full mb-32 relative group">
                                    {/* Category Section Border and Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/[0.03] to-transparent pointer-events-none"></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent pointer-events-none z-20"></div>
                                    
                                    <div className="flex flex-col items-center justify-center mb-16 md:mb-24 pt-20">
                                        <motion.h2 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="text-4xl md:text-6xl font-playfair text-white text-center font-black px-4 leading-tight tracking-wider drop-shadow-lg uppercase"
                                        >
                                            {category.replace('Category', '').trim()} <br/>
                                            <span className="text-xl md:text-3xl text-[#D4AF37] italic font-medium tracking-[0.2em] block mt-4">Champions</span>
                                        </motion.h2>
                                    </div>

                                    {/* Podium Section (Top 3) */}
                                    {topThree.length > 0 && (
                                        <div className="flex flex-row items-end justify-center w-full mx-auto gap-2 md:gap-4 lg:gap-8 mb-24 min-h-[200px] md:min-h-[450px] relative px-1 md:px-4">
                                            {podiumWinners.map((winner) => {
                                                const isFirst = winner.rank === 1;
                                                const isSecond = winner.rank === 2;
                                                const isThird = winner.rank === 3;
                                                
                                                // Heights for hype cinematic stands
                                                let podiumHeight = "h-20 xs:h-24 md:h-56";
                                                if (isFirst) podiumHeight = "h-28 xs:h-32 md:h-80";
                                                if (isThird) podiumHeight = "h-16 xs:h-20 md:h-48";
                                                
                                                // Colors
                                                const medalColor = getMedalColor(winner.rank);
                                                let standBorder = "border-[#D4AF37]/20 border-t-[#D4AF37]/50";
                                                let standBg = "bg-white/[0.03] bg-gradient-to-b from-[#D4AF37]/[0.05] to-transparent";
                                                
                                                if (isFirst) {
                                                    standBorder = "border-[#D4AF37]/60 border-t-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)]";
                                                    standBg = "bg-gradient-to-b from-[#D4AF37]/30 to-transparent";
                                                }

                                                return (
                                                    <motion.div 
                                                        key={winner.id}
                                                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ delay: winner.rank * 0.2, duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
                                                        className={`w-[32%] md:w-1/3 flex flex-col items-center flex-shrink-0 relative ${isFirst ? 'z-30' : 'z-20'}`}
                                                    >
                                                        {isFirst && (
                                                            <>
                                                                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[40px] md:blur-[80px] rounded-full pointer-events-none"></div>
                                                                <motion.div 
                                                                    initial={{ scale: 0, y: -20 }}
                                                                    animate={{ scale: 1, y: 0 }}
                                                                    transition={{ delay: 1, type: "spring", stiffness: 300 }}
                                                                    className="absolute -top-10 md:-top-16 z-50 text-white font-playfair bg-[#D4AF37] px-2 md:px-6 py-0.5 md:py-1 text-[7px] xs:text-[8px] md:text-sm tracking-wider font-black uppercase shadow-[0_0_10px_rgba(212,175,55,0.5)] whitespace-nowrap"
                                                                >
                                                                    #1 OVERALL
                                                                </motion.div>
                                                                <Sparkles className="absolute -top-6 -right-4 md:-top-12 md:-right-8 w-5 h-5 md:w-10 md:h-10 text-[#D4AF37] animate-pulse pointer-events-none drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                                                <Sparkles className="absolute top-10 -left-6 md:top-16 md:-left-10 w-4 h-4 md:w-8 md:h-8 text-[#D4AF37]/70 animate-pulse delay-300 pointer-events-none" />
                                                            </>
                                                        )}
                                                        {/* Winner Avatar Area */}
                                                        <div className="flex flex-col items-center mb-4 md:mb-10 relative w-full">
                                                            {isFirst && (
                                                                <motion.div 
                                                                    initial={{ scale: 0, rotate: -30 }}
                                                                    animate={{ scale: 1, rotate: 0 }}
                                                                    transition={{ delay: 0.8, type: "spring" }}
                                                                    className="absolute -top-6 md:-top-10 z-40"
                                                                >
                                                                    <Crown className="w-8 h-8 md:w-14 md:h-14 text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,1)] fill-[#D4AF37]" />
                                                                </motion.div>
                                                            )}
                                                            
                                                            {/* Hype Avatar Ring */}
                                                            <div className={`w-14 h-14 md:w-44 md:h-44 border border-[#C0C0C0]/50 z-20 opacity-80 ${isFirst && 'w-20 h-20 md:w-56 md:h-56 shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-[0_0_50px_rgba(212,175,55,0.4)] border-2 md:border-4 border-[#D4AF37] z-30 ring-1 md:ring-2 ring-[#D4AF37]/50 opacity-100'} rounded-full mb-2 md:mb-8 flex items-center justify-center p-[2px] md:p-[4px] transition-all duration-300 bg-black`}>
                                                                <div className="w-full h-full rounded-full bg-[#0F0F0F] flex items-center justify-center overflow-hidden relative">
                                                                    {winner.imageUrl ? (
                                                                        <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <span className={`text-3xl md:text-[80px] font-playfair font-black ${medalColor} drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]`}>{winner.rank}</span>
                                                                    )}
                                                                    {/* Dark vignette inside avatar */}
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>

                                                            {/* Details */}
                                                            <div className="text-center space-y-0.5 md:space-y-3 px-1 md:px-2 w-[110%] md:w-full z-40 bg-[#050505] md:bg-black/40 backdrop-blur-sm py-1.5 md:py-4 rounded-sm md:rounded-xl border md:border border-white/10 md:border-white/5 shadow-2xl relative mb-[-2px] md:mb-0">
                                                                <h3 className={`font-playfair text-[8px] xs:text-[9px] md:text-3xl text-white truncate w-full mx-auto leading-tight ${isFirst ? 'font-black tracking-wider text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]' : ''}`} title={winner.name}>
                                                                    {winner.name}
                                                                </h3>
                                                                <p className={`text-[5px] md:text-sm tracking-widest md:tracking-[0.3em] uppercase mb-0 md:mb-1 ${medalColor} font-black drop-shadow-sm truncate`}>
                                                                    {winner.title}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Hype Cinematic Stand Pillar */}
                                                        <div className={`w-full border-t border-l border-r ${standBorder} ${standBg} relative flex flex-col items-center justify-start pt-3 md:pt-6 ${podiumHeight} relative overflow-hidden backdrop-blur-md`}>
                                                            {/* Floor light reflection */}
                                                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
                                                            
                                                            <span className={`text-4xl xs:text-5xl md:text-9xl font-playfair font-black opacity-30 md:opacity-20 ${medalColor} select-none drop-shadow-xl mt-2 md:mt-8`}>
                                                                {winner.rank}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Honorable Mentions / Rest of the Winners */}
                                    {honorableMentions.length > 0 && (
                                        <div className="w-full max-w-5xl mx-auto mt-10 md:mt-16 pt-10 md:pt-16 border-t border-white/5 relative">
                                            
                                            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                                                <div className="h-px bg-white/10 flex-1"></div>
                                                <h3 className="text-base md:text-xl font-playfair italic text-[#D4AF37] px-4 font-bold flex items-center gap-2">
                                                    <Star className="w-3 h-3 text-[#D4AF37]/50" />
                                                    Star Performers
                                                    <Star className="w-3 h-3 text-[#D4AF37]/50" />
                                                </h3>
                                                <div className="h-px bg-white/10 flex-1"></div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                                {honorableMentions.map((winner, index) => (
                                                    <motion.div
                                                        key={winner.id}
                                                        initial={{ opacity: 0, y: 15 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-20px" }}
                                                        transition={{ delay: 0.05 * (index % 3), duration: 0.5 }}
                                                        className="group border border-white/5 hover:border-[#D4AF37]/40 bg-white/[0.02] p-5 md:p-6 flex flex-col cursor-pointer transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        {/* Dynamic hover gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                        <div className="absolute -right-4 -top-6 text-[#D4AF37]/[0.03] group-hover:text-[#D4AF37]/[0.05] font-playfair font-black text-8xl md:text-9xl pointer-events-none select-none transition-colors duration-300">
                                                            {winner.rank}
                                                        </div>
                                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                                            <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] uppercase tracking-widest font-bold text-[#D4AF37]">
                                                                Rank {winner.rank}
                                                            </div>
                                                        </div>
                                                        <div className="mt-auto relative z-10">
                                                            <h4 className="font-playfair text-lg md:text-xl text-white mb-1 group-hover:text-[#D4AF37] transition-colors truncate font-medium">
                                                                {winner.name}
                                                            </h4>
                                                            <p className="text-[10px] tracking-widest uppercase text-white/50">
                                                                {winner.title}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        
                        {categories.length === 0 && (
                            <div className="py-24 text-center flex flex-col items-center border border-white/5 bg-white/5 w-full max-w-3xl mx-auto rounded-none">
                                <Award className="w-12 h-12 text-[#D4AF37]/20 mb-6" />
                                <h3 className="text-2xl font-playfair text-white/50">Winners yet to be announced</h3>
                                <p className="text-white/40 mt-2 font-light">The legacy continues. Check back soon.</p>
                            </div>
                        )}

                        {/* Continuous Infinite Gallery Ticker */}
                        {currentEvent.galleryUrls && currentEvent.galleryUrls.length > 0 && (
                            <div className="w-full mt-20 mb-0 relative select-none flex flex-col items-center">
                                <h3 className="font-playfair text-3xl md:text-5xl text-[#D4AF37]/[0.15] font-black tracking-[0.2em] uppercase mb-8 md:mb-16 text-center pointer-events-none px-4">
                                    Visual <span className="text-white/10">Legacy</span>
                                </h3>
                                
                                <div className="w-full max-w-[100vw] overflow-hidden py-4 md:py-8 relative flex">
                                    <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                                    <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                                    <div className="flex items-center animate-scroll w-max relative z-0 gap-3 md:gap-8 px-4">
                                        {[...currentEvent.galleryUrls, ...currentEvent.galleryUrls, ...currentEvent.galleryUrls].map((url, idx) => (
                                            <div key={idx} className="w-[200px] md:w-[350px] lg:w-[450px] aspect-[4/3] border border-white/10 hover:border-[#D4AF37]/80 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 relative overflow-hidden flex-shrink-0 rounded-xl shadow-2xl z-0 hover:z-10 bg-black/20">
                                                <img src={url} alt={`Highlight ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default EventHallOfFame;
