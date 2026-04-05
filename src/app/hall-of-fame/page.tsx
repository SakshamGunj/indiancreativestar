"use client";
import Link from 'next/link';
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, Sparkles, Trophy } from "lucide-react";
import { hallOfFameData } from "@/data/hallOfFameWinners";
import companyLogo from "@/assets/images/company-logo.webp";

const HallOfFameHub = () => {
    const router = useRouter();

    const allTimeChampions = hallOfFameData.flatMap(event =>
        event.winners
            .filter(w => w.rank <= 3)
            .map(w => ({ ...w, eventName: event.eventName, eventId: event.eventId }))
    ).sort((a, b) => a.rank - b.rank);

    const allWinnersTicker = hallOfFameData.flatMap(event =>
        event.winners.map(w => ({ ...w, eventName: event.eventName }))
    );

    useEffect(() => {
        document.title = "Hall of Fame | Daami Event";
    }, []);

    return (
        <div className="min-h-screen text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pb-24 relative"
            style={{ background: 'linear-gradient(160deg, #0a0800 0%, #0f0c00 15%, #080508 40%, #050010 65%, #0a0602 85%, #000000 100%)' }}>

            {/* Pattern + Gradient Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 15% 20%, rgba(212,175,55,0.15) 0%, transparent 65%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 55% at 85% 75%, rgba(180,100,20,0.12) 0%, transparent 60%)' }} />
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4 border-b border-[#D4AF37]/15 backdrop-blur-md bg-black/50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src={companyLogo.src} alt="Daami Event" className="h-9 w-9 md:h-11 md:w-11 object-cover rounded-full border border-[#D4AF37]/40" />
                        <div className="hidden sm:block">
                            <p className="font-playfair text-base md:text-lg tracking-wider text-[#D4AF37]">DAAMI EVENT</p>
                            <p className="text-[8px] tracking-[0.25em] uppercase text-white/30">Hall of Fame Hub</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-3">
                        <Link href="/contact" className="hidden md:flex text-[10px] tracking-widest uppercase text-white/50 font-bold hover:text-white transition-colors gap-1.5 items-center px-3 py-2 border border-white/8 hover:border-white/20">Get In Touch</Link>
                        <Link href="/" className="text-[10px] tracking-widest uppercase font-black text-black flex items-center gap-2 px-3 md:px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow">
                            <span className="hidden sm:inline">Join Ongoing Event</span>
                            <span className="inline sm:hidden">Join Now</span>
                            <Sparkles className="w-3 h-3" />
                        </Link>
                        <Link href="/" className="text-[10px] tracking-widest uppercase text-white/60 font-bold hover:text-[#D4AF37] flex items-center gap-1.5 border border-white/10 hover:border-[#D4AF37]/30 px-3 py-2 transition-all">
                            <ArrowLeft className="w-3 h-3" /><span className="hidden sm:inline">Back</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto">

                {/* ── EDITORIAL HERO ── */}
                <div className="w-full max-w-6xl mx-auto mb-20 md:mb-28">
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-10 origin-left" />
                    <div className="flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-12">
                        {/* Index Number */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex flex-col items-center flex-shrink-0">
                            <span className="font-playfair font-black text-[100px] lg:text-[130px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent select-none">★</span>
                        </motion.div>
                        <div className="hidden md:block w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent flex-shrink-0" />
                        {/* Title */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="flex-1 flex flex-col justify-center gap-4 md:gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[2px] bg-[#D4AF37]" />
                                <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-black text-[#D4AF37]/70">Daami Event — Official Archives</span>
                            </div>
                            <h1 className="font-playfair font-black leading-[1.0] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                                Hall of<br /><span className="italic">Fame.</span>
                            </h1>
                            <p className="text-white/45 font-lato text-sm md:text-base leading-relaxed max-w-xl border-l-2 border-[#D4AF37]/25 pl-4 font-light">
                                Explore the prestigious archives of Daami Event. Select an event to view recognized artists, or browse all-time champions below.
                            </p>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                                <span className="text-[10px] tracking-widest uppercase font-bold text-[#D4AF37]/70 flex items-center gap-1.5"><Trophy className="w-3 h-3" /> {hallOfFameData.length} Event Archives</span>
                                <span className="text-white/10 text-xs">|</span>
                                <span className="text-[10px] tracking-widest uppercase font-bold text-white/40">{allTimeChampions.length}+ Champions Recognized</span>
                            </div>
                        </motion.div>
                        {/* Right label */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="hidden lg:flex flex-col items-end justify-between flex-shrink-0 min-w-[100px] self-stretch pb-2">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-white/15 font-bold whitespace-nowrap">HALL OF FAME</span>
                            <div className="flex flex-col items-end gap-1.5">
                                <div className="w-8 h-8 border border-[#D4AF37]/25 flex items-center justify-center">
                                    <Award className="w-4 h-4 text-[#D4AF37]/50" />
                                </div>
                                <span className="text-[8px] tracking-[0.25em] uppercase text-white/15 font-bold">Daami Event</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-10 origin-right" />
                </div>

                {/* ── WINNERS TICKER ── */}
                <div className="w-full max-w-[100vw] overflow-hidden bg-[#D4AF37]/[0.015] border-y border-[#D4AF37]/15 py-8 mb-24 relative select-none -mx-4 md:-mx-6 flex">
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    <div className="flex items-center animate-scroll w-max z-0">
                        {[...allWinnersTicker, ...allWinnersTicker].map((winner, idx) => (
                            <div key={idx} className="flex min-w-[280px] md:min-w-[380px] h-[120px] md:h-[150px] mx-2 md:mx-3 border border-white/8 hover:border-[#D4AF37]/30 bg-white/[0.015] transition-all duration-500 relative group overflow-hidden">
                                <div className="relative w-[38%] h-full bg-black/60 overflow-hidden flex-shrink-0 flex items-center justify-center p-2 border-r border-[#D4AF37]/8">
                                    {winner.imageUrl ? <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" /> : <Award className="w-10 h-10 text-[#D4AF37]/20" />}
                                </div>
                                <div className="flex flex-col justify-center w-[62%] px-4 py-3">
                                    <span className="text-[8px] tracking-widest uppercase font-black text-[#D4AF37]/60 mb-1">Rank {winner.rank}</span>
                                    <span className="font-playfair font-bold text-white text-sm md:text-base truncate block group-hover:text-[#D4AF37] transition-colors">{winner.name}</span>
                                    <div className="mt-auto">
                                        <span className="text-[7px] tracking-[0.2em] uppercase text-white/30 font-bold">{winner.eventName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── EVENT ARCHIVES GRID ── */}
                <div className="w-full mb-24">
                    <div className="flex items-center gap-4 mb-10 md:mb-14">
                        <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                        <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Event Archives</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                        <span className="text-[8px] tracking-[0.2em] uppercase text-white/20 font-bold hidden md:block">{hallOfFameData.length} Seasons</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {hallOfFameData.map((event, index) => (
                            <motion.div
                                key={event.eventId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.7 }}
                                onClick={() => router.push(`/hall-of-fame/${event.eventId}`)}
                                className="group relative border border-white/8 hover:border-[#D4AF37]/40 bg-white/[0.01] overflow-hidden cursor-pointer flex flex-col h-[360px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                            >
                                {/* Archive index */}
                                <div className="absolute top-4 left-4 z-20 text-[8px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/60">{String(index + 1).padStart(2, '0')}</div>
                                <div className="absolute top-4 right-4 z-20 bg-[#D4AF37] text-black text-[8px] tracking-widest uppercase font-bold px-2.5 py-1">{event.eventDate}</div>
                                <div className="h-[58%] w-full overflow-hidden relative bg-black">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10" />
                                    <img src={event.coverImage} alt={event.eventName} className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent relative z-20">
                                    <div>
                                        <h3 className="font-playfair text-lg md:text-xl text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-2">{event.eventName}</h3>
                                        <p className="text-[11px] text-white/35 line-clamp-2 font-light leading-relaxed border-l border-white/10 pl-3">{event.description}</p>
                                    </div>
                                    <div className="flex items-center text-[#D4AF37]/70 text-[10px] tracking-widest uppercase font-bold mt-3 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all">
                                        Enter Archive <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── WINNERS BY EVENT ── */}
                <div className="w-full space-y-20">
                    {hallOfFameData.map((event, eventIdx) => {
                        // For WAR group by category; for others show flat list
                        const categories = event.eventId === "winter-art-royale"
                            ? [...new Set(event.winners.map(w => w.category).filter(Boolean))]
                            : null;

                        return (
                            <div key={event.eventId}>
                                {/* Event eyebrow + title */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-6 h-[1px] bg-[#D4AF37]/60" />
                                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">
                                        Season {String(eventIdx + 1).padStart(2, '0')} · Art Contest
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/5" />
                                    <button
                                        onClick={() => router.push(`/hall-of-fame/${event.eventId}`)}
                                        className="text-[9px] tracking-widest uppercase font-black text-white/20 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                                    >
                                        Full Archive <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>

                                <h3 className="font-playfair font-black text-white leading-[1.1] mb-8"
                                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                                    {event.eventName}
                                </h3>

                                {categories ? (
                                    /* WAR: group by category */
                                    <div className="space-y-10">
                                        {categories.map((cat) => {
                                            const catWinners = event.winners.filter(w => w.category === cat);
                                            return (
                                                <div key={cat}>
                                                    <div className="flex items-center gap-3 mb-5">
                                                        <div className="w-4 h-[1px] bg-white/20" />
                                                        <span className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30">{cat}</span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {catWinners.map((w, i) => (
                                                            <WinnerCard key={w.id} winner={w} index={i} eventId={event.eventId} router={router} />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* SCS1 + ICS2: flat list */
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                        {event.winners.map((w, i) => (
                                            <WinnerCard key={w.id} winner={w} index={i} eventId={event.eventId} router={router} />
                                        ))}
                                    </div>
                                )}

                                {eventIdx < hallOfFameData.length - 1 && (
                                    <div className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

/* ── Small reusable winner card ── */
const WinnerCard = ({ winner, index, eventId, router }: { winner: any; index: number; eventId: string; router: any }) => {
    const rankColor = winner.rank === 1 ? "text-[#D4AF37] border-[#D4AF37]/40" : winner.rank === 2 ? "text-white/60 border-white/20" : "text-amber-700 border-amber-900/40";
    const rankLabel = winner.rank === 1 ? "🥇" : winner.rank === 2 ? "🥈" : winner.rank === 3 ? "🥉" : `#${winner.rank}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => router.push(`/hall-of-fame/${eventId}`)}
            className="group bg-white/[0.015] border border-white/5 hover:border-[#D4AF37]/25 p-5 flex items-start gap-4 cursor-pointer transition-all duration-300 hover:bg-white/[0.025]"
        >
            {/* Avatar or rank badge */}
            {winner.imageUrl ? (
                <div className="w-12 h-12 border border-white/10 overflow-hidden flex-shrink-0">
                    <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                </div>
            ) : (
                <div className={`w-12 h-12 border flex-shrink-0 flex items-center justify-center text-lg ${rankColor}`}>
                    {rankLabel}
                </div>
            )}
            <div className="min-w-0">
                <h4 className="font-playfair text-base text-white group-hover:text-[#D4AF37] transition-colors truncate">{winner.name}</h4>
                <p className="text-[9px] tracking-widest uppercase text-[#D4AF37]/60 mt-0.5">{winner.title}</p>
            </div>
        </motion.div>
    );
};

export default HallOfFameHub;
