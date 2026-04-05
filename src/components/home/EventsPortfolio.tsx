"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from 'next/navigation';

const EventsPortfolio = () => {
    const router = useRouter();

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-black font-lato" id="events-portfolio">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#121212]/50 to-transparent z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* 1. PREVIOUS SEASONS — The Legacy */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-[1px] bg-white/20" />
                            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40">Previous Seasons</span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <h2 className="font-playfair text-4xl md:text-5xl text-white">The Legacy</h2>
                            <p className="text-white/30 text-sm max-w-xs md:text-right leading-relaxed font-lato">
                                Discover the champions who started their journey with us. Explore the gallery of excellence.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sikkim S1 */}
                        <div
                            onClick={() => router.push('/hall-of-fame/sikkim-creative-star-1')}
                            className="group relative border border-white/6 hover:border-[#D4AF37]/30 bg-white/[0.012] hover:bg-white/[0.022] transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                                <img src="https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775292600/THE_Shakespeare_Poetry_Award_2025_3_-compressed_en8pt3.webp" alt="Season 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-green-900/40 text-green-400 border-green-500/20">COMPLETED</span>
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-blue-900/40 text-blue-400 border-blue-500/20">STATE LEVEL</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <h3 className="font-playfair text-2xl text-white mb-2 underline decoration-[#D4AF37]/30">Sikkim Creative Star</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">Season 1 • Regional Excellence</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artists Joined</p>
                                        <p className="text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#D4AF37]" /> 220</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Prize Pool</p>
                                        <p className="text-white font-medium">₹50,000</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artworks</p>
                                        <p className="text-white font-medium">400+</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Satisfaction</p>
                                        <p className="text-white font-medium text-green-400">90%</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="text-[9px] tracking-widest uppercase font-black text-[#D4AF37]/50 group-hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors">
                                        View Highlights <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ICS S1 */}
                        <div
                            onClick={() => router.push('/hall-of-fame/indian-creative-star-2')}
                            className="group relative border border-white/6 hover:border-[#D4AF37]/30 bg-white/[0.012] hover:bg-white/[0.022] transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                                <img src="https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290486/THE_Shakespeare_Poetry_Award_2025_1_-compressed_twejlf.webp" alt="ICS Season 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-green-900/40 text-green-400 border-green-500/20">COMPLETED</span>
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-purple-900/40 text-purple-400 border-purple-500/20">NATIONAL LEVEL</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <h3 className="font-playfair text-2xl text-white mb-2 underline decoration-[#D4AF37]/30">Indian Creative Star</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">Season 1 • National Phenomenon</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artists Joined</p>
                                        <p className="text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#D4AF37]" /> 475</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Prize Pool</p>
                                        <p className="text-white font-medium">₹50,000</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artworks</p>
                                        <p className="text-white font-medium">725</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Satisfaction</p>
                                        <p className="text-white font-medium text-green-400">92%</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="text-[9px] tracking-widest uppercase font-black text-[#D4AF37]/50 group-hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors">
                                        View Highlights <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Winter Art Royale */}
                        <div
                            onClick={() => router.push('/hall-of-fame/winter-art-royale')}
                            className="group relative border border-white/6 hover:border-[#D4AF37]/30 bg-white/[0.012] hover:bg-white/[0.022] transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                                <img src="https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290829/THE_Shakespeare_Poetry_Award_2025_2_-compressed_poypn2.webp" alt="Winter Art Royale" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-green-900/40 text-green-400 border-green-500/20">COMPLETED</span>
                                    <span className="px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border bg-blue-900/40 text-blue-400 border-blue-500/20">NATIONAL LEVEL</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <h3 className="font-playfair text-2xl text-white mb-2 underline decoration-[#D4AF37]/30">Winter Art Royale</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">W.A.R • Winter Showdown</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artists Joined</p>
                                        <p className="text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#D4AF37]" /> 325</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Prize Pool</p>
                                        <p className="text-white font-medium">₹1.5 Lakh</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Artworks</p>
                                        <p className="text-white font-medium">620</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-white/40 tracking-wider">Satisfaction</p>
                                        <p className="text-white font-medium text-green-400">93%</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="text-[9px] tracking-widest uppercase font-black text-[#D4AF37]/50 group-hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors">
                                        View Highlights <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsPortfolio;
