import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ArrowRight, Award, Sparkles } from "lucide-react";
import { hallOfFameData } from "@/data/hallOfFameWinners";

// Assets
import companyLogo from "@/assets/images/company-logo.webp";

const HallOfFameHub = () => {
    const navigate = useNavigate();

    // Aggregate all top 3 winners from all events into a unified list
    const allTimeChampions = hallOfFameData.flatMap(event => 
        event.winners
            .filter(w => w.rank <= 3)
            .map(w => ({ ...w, eventName: event.eventName, eventId: event.eventId }))
    ).sort((a, b) => a.rank - b.rank);

    // Aggregate ALL winners for the sliding ticker
    const allWinnersTicker = hallOfFameData.flatMap(event => 
        event.winners.map(w => ({ ...w, eventName: event.eventName }))
    );

    // Update Document Title
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Hall of Fame | Daami Event";
        return () => {
            document.title = originalTitle;
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pb-24">
            <style>{`
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-lato { font-family: 'Lato', sans-serif; }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 90s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}></div>

            {/* Header / Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm bg-[#0F0F0F]/80 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={companyLogo} alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                        <div>
                            <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37] flex items-center gap-2">
                                DAAMI EVENT
                            </h1>
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 flex items-center gap-1">
                                Hall Of Fame Hub
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link to="/contact" className="hidden lg:flex text-[10px] md:text-xs tracking-widest uppercase text-white/60 font-medium hover:text-white transition-colors duration-300 items-center gap-1.5 px-2 py-2">
                            Get In Touch
                        </Link>
                        
                        <Link to="/" className="text-[10px] md:text-xs tracking-widest uppercase font-black text-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-300 flex items-center gap-2 border border-[#D4AF37]/50 px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5">
                            <span className="hidden sm:inline">Join Ongoing Event</span>
                            <span className="inline sm:hidden">Join Now</span>
                            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Link>

                        <Link to="/" className="text-[10px] md:text-xs tracking-widest uppercase text-white/80 font-medium hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 border border-white/10 hover:border-[#D4AF37]/50 px-3 md:px-4 py-2 md:py-2.5 rounded-none bg-white/5 shadow-md ml-1 md:ml-2">
                            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Back</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content wrapper */}
            <main className="relative z-10 pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center">
                
                {/* Hero Title Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 mb-24 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 px-6 py-2 bg-[#D4AF37]/10 backdrop-blur-md rounded-none mb-4">
                        <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-xs md:text-sm tracking-[0.2em] font-bold uppercase">The Daami Legacy</span>
                        <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    </div>
                    <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl leading-[1.1] text-white">
                        Hall of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] italic">
                            Fame.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mt-6">
                        Explore the prestigious archives of Daami Event. Select an event to view the full list of recognized artists, or browse the all-time champions below.
                    </p>
                </motion.div>

                {/* Continuous Winners Ticker */}
                <div className="w-full max-w-[100vw] overflow-hidden bg-[#D4AF37]/[0.02] border-y border-[#D4AF37]/20 py-10 mb-32 relative select-none -mx-4 md:-mx-6 flex">
                    {/* Dark gradient blur behind the cards */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"></div>

                    {/* Shadow edges for smooth fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

                    <div className="flex items-center animate-scroll w-max relative z-0">
                        {/* Duplicate the array TWICE so it seamlessly loops when it reaches -50% translation */}
                        {[...allWinnersTicker, ...allWinnersTicker].map((winner, idx) => (
                            <div key={idx} className="flex min-w-[360px] md:min-w-[480px] h-[160px] md:h-[200px] mx-3 md:mx-4 border border-white/10 hover:border-[#D4AF37]/40 bg-white/[0.02] backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 relative group overflow-hidden">
                                
                                {/* Floating Glow Effect */}
                                <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#D4AF37]/20 blur-[50px] rounded-full group-hover:bg-[#D4AF37]/30 transition-colors z-0 pointer-events-none"></div>

                                {/* Giant elegant watermark of their rank */}
                                <div className="absolute bottom-2 right-4 text-white/[0.02] font-playfair font-black text-6xl md:text-8xl leading-none select-none pointer-events-none group-hover:text-[#D4AF37]/10 transition-colors z-0 translate-y-4">
                                    {winner.rank}
                                </div>
                                
                                {/* Image Container (Left Sidebar - ZERO Padding Parent) */}
                                <div className="relative w-[45%] h-full bg-[#050505]/80 overflow-hidden flex-shrink-0 z-10 flex items-center justify-center p-3 border-r border-[#D4AF37]/10 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
                                    {winner.imageUrl ? (
                                        <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-contain filter drop-shadow-[0_5px_15px_rgba(212,175,55,0.2)] transform group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <Award className="w-16 h-16 text-[#D4AF37]/30" />
                                    )}
                                </div>

                                {/* Text Content (Right Area) */}
                                <div className="flex flex-col justify-center h-full w-[55%] z-10 px-4 md:px-6 py-4 relative">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Award className="w-3 h-3 text-[#D4AF37]" />
                                        <span className="text-[#D4AF37] text-[9px] md:text-[10px] tracking-widest uppercase font-black truncate">WINNER</span>
                                    </div>
                                    <span className="font-playfair font-bold text-white text-lg md:text-xl xl:text-2xl tracking-wide mb-2 truncate block group-hover:text-[#D4AF37] transition-colors">{winner.name}</span>
                                    
                                    <div className="mt-auto flex flex-col gap-1.5 w-full relative z-10">
                                        <div className="inline-flex max-w-max px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-black text-[7px] md:text-[8px] tracking-[0.2em] uppercase rounded shadow-sm truncate">
                                            {winner.eventName}
                                        </div>
                                        <span className="text-white/40 font-bold text-[7px] md:text-[8px] tracking-[0.3em] uppercase pl-1">
                                            ART CONTEST
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Showcases (The Big Cards) */}
                <div className="w-full mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-2xl md:text-3xl font-playfair italic text-[#D4AF37] px-4 text-center">
                            Event Archives
                        </h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {hallOfFameData.map((event, index) => (
                            <motion.div
                                key={event.eventId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                onClick={() => navigate(`/hall-of-fame/${event.eventId}`)}
                                className="group relative rounded-none border border-white/10 hover:border-[#D4AF37] bg-[#0A0A0A] overflow-hidden cursor-pointer flex flex-col h-[400px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                            >
                                {/* Image Half */}
                                <div className="h-[60%] w-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                                    <img 
                                        src={event.coverImage} 
                                        alt={event.eventName} 
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-4 left-4 z-20 bg-[#D4AF37] text-black text-[10px] tracking-widest uppercase font-bold px-3 py-1">
                                        {event.eventDate}
                                    </div>
                                </div>
                                
                                {/* Content Half */}
                                <div className="h-[40%] p-6 flex flex-col justify-between relative z-20 bg-gradient-to-t from-[#0A0A0A] via-[#0F0F0F] to-transparent">
                                    <div>
                                        <h3 className="font-playfair text-xl md:text-2xl text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                            {event.eventName}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-2 line-clamp-2 font-light">
                                            {event.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-[#D4AF37] text-sm tracking-widest uppercase font-medium mt-4 group-hover:translate-x-2 transition-transform">
                                        Enter Archive <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* All-Time Champions Grid */}
                <div className="w-full">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-2xl md:text-3xl font-playfair italic text-[#D4AF37] px-4 text-center">
                            All-Time Grand Champions
                        </h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allTimeChampions.map((champion, idx) => (
                            <motion.div
                                key={`${champion.eventId}-${champion.id}-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => navigate(`/hall-of-fame/${champion.eventId}`)}
                                className="group bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 p-6 flex flex-col cursor-pointer transition-colors duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center font-playfair text-xl text-[#D4AF37]">
                                        #{champion.rank}
                                    </div>
                                    <Award className="w-6 h-6 text-white/20 group-hover:text-[#D4AF37]/50 transition-colors" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="font-playfair text-2xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors truncate">
                                        {champion.name}
                                    </h4>
                                    <p className="text-xs tracking-widest uppercase text-[#D4AF37] mb-1">
                                        {champion.title}
                                    </p>
                                    <p className="text-[10px] tracking-widest uppercase text-white/40 truncate">
                                        {champion.eventName}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {allTimeChampions.length === 0 && (
                        <div className="text-center py-20 text-white/40 font-playfair italic text-xl border border-white/5 bg-white/5 max-w-2xl mx-auto px-6">
                            The legends are being documented. Their names will echo here soon.
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default HallOfFameHub;
