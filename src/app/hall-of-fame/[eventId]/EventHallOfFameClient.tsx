"use client";
import Link from 'next/link';
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, ArrowRight, Award, Crown, CheckCircle2, Shield, Users, Globe, Sparkles, Mail, Trophy } from "lucide-react";
import { Winner } from "@/data/hallOfFameWinners";

// Assets
import companyLogo from "@/assets/images/company-logo.webp";

interface EventHallOfFameClientProps {
    currentEvent: any;
    eventId: string;
    allEvents: any[];
}

const EventHallOfFameClient = ({ currentEvent, eventId, allEvents }: EventHallOfFameClientProps) => {
    
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

    // Helper to group winners by category
    const groupedWinners = currentEvent.winners.reduce((acc: any, winner: Winner) => {
        const cat = winner.category || 'General';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(winner);
        return acc;
    }, {} as Record<string, Winner[]>);

    const categories = Object.keys(groupedWinners);

    const getMedalColor = (rank: number) => {
        if (rank === 1) return "text-[#D4AF37]"; // Gold
        if (rank === 2) return "text-[#C0C0C0]"; // Silver
        if (rank === 3) return "text-[#CD7F32]"; // Bronze
        return "text-[#F5F5DC]/60";
    };

    const getPodiumOrder = (winners: Winner[]) => {
        const first = winners.find(w => w.rank === 1);
        const second = winners.find(w => w.rank === 2);
        const third = winners.find(w => w.rank === 3);
        return [second, first, third].filter(Boolean) as Winner[];
    };

    return (
        <div className="min-h-screen text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pb-24 relative" style={{ background: 'linear-gradient(160deg, #0a0800 0%, #0f0c00 15%, #080508 40%, #050010 65%, #0a0602 85%, #000000 100%)' }}>
            
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 15% 20%, rgba(212,175,55,0.18) 0%, transparent 65%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 55% at 85% 75%, rgba(180,100,20,0.14) 0%, transparent 60%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 30% 30% at 50% 50%, rgba(70,20,120,0.12) 0%, transparent 80%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.75) 100%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.04) 0%, transparent 50%, rgba(100,60,10,0.06) 100%)' }} />
            
            <style>{`
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-lato { font-family: 'Lato', sans-serif; }
                @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti-fall { animation: confetti-fall linear forwards; }
                @keyframes bg-crawl {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-bg-crawl { animation: bg-crawl 60s linear infinite; }
            `}</style>

            {/* Falling Gold Confetti */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[60]">
                {[...Array(60)].map((_, i) => (
                    <div key={i} className="absolute -top-10 animate-confetti-fall" style={{
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: Math.random() > 0.5 ? '#D4AF37' : '#F2D06B',
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 12 + 6}px`,
                        opacity: Math.random() * 0.5 + 0.5,
                    }}></div>
                ))}
            </div>

            {/* Cinematic Background Text */}
            <div className="fixed top-1/3 left-0 right-0 overflow-hidden pointer-events-none z-0 opacity-10 mix-blend-overlay">
                <div className="flex animate-bg-crawl whitespace-nowrap text-[#D4AF37] font-playfair font-black text-[150px] md:text-[250px] leading-none tracking-widest">
                    CHAMPIONS • LEGENDS • VICTORS • CHAMPIONS • LEGENDS • VICTORS • 
                </div>
            </div>

            <nav className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm bg-[#0F0F0F]/80 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src={companyLogo.src} alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                        <div className="hidden sm:block">
                            <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37]">DAAMI EVENT</h1>
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40">Event Archives</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link href="/contact" className="flex items-center justify-center text-[10px] md:text-xs tracking-widest uppercase text-white/60 font-medium hover:text-white transition-colors duration-300 gap-1.5 p-2 md:px-2 md:py-2 border border-white/10 rounded bg-white/5 md:bg-transparent">
                            <Mail className="w-4 h-4 md:w-3.5 md:h-3.5" />
                            <span className="hidden md:inline">Get In Touch</span>
                        </Link>
                        <Link href="/" className="text-[10px] md:text-xs tracking-widest uppercase font-black text-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-300 flex items-center gap-2 border border-[#D4AF37]/50 px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5">
                            <span className="hidden sm:inline">Join Ongoing Event</span>
                            <span className="inline sm:hidden">Join Now</span>
                            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Link>
                        <Link href="/hall-of-fame" className="text-[10px] md:text-xs tracking-widest uppercase text-white/80 font-medium hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 border border-white/10 hover:border-[#D4AF37]/50 px-3 md:px-4 py-2 md:py-2.5 rounded-none bg-white/5 shadow-md ml-1 md:ml-2">
                            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Back To Hub</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full flex flex-col items-center relative">
                        
                        {/* 1. HERO HEADER */}
                        <div className="w-full max-w-6xl mx-auto px-4 pt-10 mb-16 md:mb-28 relative">
                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mb-10 origin-left" />
                            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                                <div className="hidden md:flex flex-col items-center pt-2">
                                    <span className="font-playfair font-black text-[100px] lg:text-[140px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/50 to-[#D4AF37]/05 select-none tracking-tighter">
                                        {String(allEvents.findIndex(e => e.eventId === eventId) + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-[2px] bg-[#D4AF37]" />
                                        <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-black text-[#D4AF37]/70">Daami Event — Hall of Legends</span>
                                    </div>
                                    <h1 className="font-playfair font-black leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/70" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}>
                                        {currentEvent.eventName}
                                    </h1>
                                    <p className="text-white/50 font-lato font-light text-base leading-relaxed max-w-xl border-l-2 border-[#D4AF37]/30 pl-4 italic">
                                        {currentEvent.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                                        <span className="flex items-center gap-1.5 text-[10px] md:text-[11px] tracking-widest uppercase font-bold text-[#10B981]"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>
                                        <span className="flex items-center gap-1.5 text-[10px] md:text-[11px] tracking-widest uppercase font-bold text-[#D4AF37]/80"><Crown className="w-3.5 h-3.5" /> {currentEvent.eventDate}</span>
                                        <span className="flex items-center gap-1.5 text-[10px] md:text-[11px] tracking-widest uppercase font-bold text-[#60A5FA]/80"><Shield className="w-3.5 h-3.5" /> Daami Verified</span>
                                    </div>
                                </div>
                            </div>
                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-10 origin-right" />
                        </div>

                        {/* 2. WINNERS TICKER */}
                        {currentEvent.winners && (
                            <div className="w-full overflow-hidden bg-[#D4AF37]/[0.02] border-y border-[#D4AF37]/20 py-8 mb-24 relative select-none">
                                <div className="flex items-center animate-scroll w-max gap-4 px-4">
                                    {[...currentEvent.winners, ...currentEvent.winners].map((winner, idx) => (
                                        <div key={idx} className="flex min-w-[320px] md:min-w-[420px] h-[140px] md:h-[160px] border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-2xl relative group overflow-hidden">
                                            <div className="relative w-[40%] h-full bg-[#050505]/80 overflow-hidden flex items-center justify-center p-2 border-r border-[#D4AF37]/10">
                                                {winner.imageUrl && <img src={winner.imageUrl} alt={`${winner.name} - ${winner.title} Winner at Daami Event`} className="w-full h-full object-contain" />}
                                            </div>
                                            <div className="flex flex-col justify-center w-[60%] px-4 md:px-5">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Award className="w-3 h-3 text-[#D4AF37]" />
                                                    <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-black">Rank {winner.rank}</span>
                                                </div>
                                                <span className="font-playfair font-bold text-white text-lg block truncate">{winner.name}</span>
                                                <div className="mt-auto flex flex-col gap-1">
                                                    <div className="max-w-max px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-[8px] tracking-[0.2em] uppercase rounded">{winner.title}</div>
                                                    <span className="text-white/40 font-bold text-[8px] tracking-[0.3em] uppercase">{winner.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. LEGACY & IMPACT (Full editorial reproduction) */}
                        {(currentEvent.aboutParagraphs || currentEvent.trustPillars || currentEvent.valueStack || currentEvent.stats) && (
                            <div className="w-full max-w-7xl mx-auto px-4 mb-32 flex flex-col gap-12 md:gap-20 relative z-10">
                                {currentEvent.aboutParagraphs && currentEvent.aboutParagraphs[0] && (
                                    <div className="w-full max-w-5xl mx-auto">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                                            <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Event Chronicle</span>
                                        </div>
                                        <p className="text-white/75 font-lato leading-[2] text-base md:text-lg font-light border-l border-[#D4AF37]/20 pl-6">
                                            {renderHighlightedText(currentEvent.aboutParagraphs[0], 1)}
                                        </p>
                                    </div>
                                )}

                                {currentEvent.trustPillars && (
                                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {currentEvent.trustPillars.map((pillar: any, i: number) => {
                                            const Icon = pillar.icon === 'Shield' ? Shield : pillar.icon === 'Users' ? Users : pillar.icon === 'Globe' ? Globe : Trophy;
                                            return (
                                                <div key={i} className="p-6 border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] transition-all group">
                                                    <Icon className="w-10 h-10 text-[#D4AF37] mb-4" />
                                                    <h3 className="font-playfair text-xl text-white mb-2">{pillar.title}</h3>
                                                    <p className="text-white/50 text-sm">{pillar.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {currentEvent.stats && (
                                    <div className="w-full max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: "Artists Joined", value: currentEvent.stats.artistsJoined },
                                            { label: "Artworks", value: currentEvent.stats.artworksSubmitted },
                                            { label: "Prize Pool", value: currentEvent.stats.prizePool },
                                            { label: "Satisfaction", value: currentEvent.stats.satisfactionRate, highlight: true }
                                        ].map((stat, i) => (
                                            <div key={i} className={`p-6 border ${stat.highlight ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/5 bg-white/[0.015]'} flex flex-col items-center text-center`}>
                                                <span className={`text-2xl md:text-3xl font-playfair font-black mb-1 ${stat.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>{stat.value}</span>
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. HONORS BY CATEGORY */}
                        {categories.map((category) => {
                            const categoryWinners = groupedWinners[category];
                            const topThree = categoryWinners.filter((w: Winner) => w.rank <= 3).sort((a: Winner, b: Winner) => a.rank - b.rank);
                            const honorableMentions = categoryWinners.filter((w: Winner) => w.rank > 3);
                            const podiumWinners = getPodiumOrder(topThree);

                            return (
                                <div key={category} className="w-full mb-32">
                                    <div className="w-full max-w-6xl mx-auto px-4 mb-20 pt-16 border-t border-[#D4AF37]/20">
                                        <h2 className="font-playfair font-black text-4xl md:text-7xl text-white opacity-80">{category}</h2>
                                    </div>
                                    
                                    <div className="flex items-end justify-center gap-2 md:gap-8 mb-24 px-1 md:px-4 h-[300px] md:h-[500px]">
                                        {podiumWinners.map((winner) => (
                                            <div key={winner.id} className="w-1/3 flex flex-col items-center relative">
                                                <div className={`w-16 h-16 md:w-56 md:h-56 rounded-full border border-[#D4AF37] overflow-hidden mb-4 p-1 bg-black ${winner.rank === 1 ? 'border-4' : ''}`}>
                                                    {winner.imageUrl && <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="text-center p-2 md:p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md w-full mb-[-1px]">
                                                    <h3 className="font-playfair text-[8px] md:text-2xl font-bold truncate tracking-wide">{winner.name}</h3>
                                                    <p className={`text-[6px] md:text-sm uppercase tracking-[0.2em] font-black ${getMedalColor(winner.rank)}`}>{winner.title}</p>
                                                </div>
                                                <div className={`w-full border-x border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/[0.15] to-transparent flex items-center justify-center ${winner.rank === 1 ? 'h-40 md:h-72' : winner.rank === 2 ? 'h-28 md:h-56' : 'h-20 md:h-40'}`}>
                                                    <span className="text-3xl md:text-9xl font-playfair font-black opacity-15">{winner.rank}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
                                        {honorableMentions.map((winner: Winner) => (
                                            <div key={winner.id} className="p-5 border border-white/5 bg-white/[0.01] hover:border-[#D4AF37]/40 transition-all flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-black flex-shrink-0">
                                                    {winner.imageUrl && <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-playfair text-lg text-white truncate">{winner.name}</h4>
                                                    <p className="text-[10px] text-[#D4AF37]/50 uppercase tracking-widest truncate">{winner.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default EventHallOfFameClient;
