"use client";

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const KitSection = () => {
    const router = useRouter();

    const row1Images = [
        "https://i.ibb.co/bjVyrwd0/Whats-App-Image2026-01-08at5-26-11-PM.jpg",
        "https://i.ibb.co/21GKJVbk/Whats-App-Image2026-01-08at5-26-11-PM1.jpg",
        "https://i.ibb.co/4RKjQd5N/Whats-App-Image2026-01-08at5-26-12-PM.jpg",
        "https://i.ibb.co/PsTc3vV5/Whats-App-Image2026-01-08at5-26-12-PM1.jpg",
        "https://i.ibb.co/WN5X2zcY/Whats-App-Image2026-01-08at5-26-13-PM.jpg",
        "https://i.ibb.co/WvRt0Rs9/Whats-App-Image2026-01-08at5-26-13-PM1.jpg"
    ];

    const row2Images = [
        "https://i.ibb.co/DD6kbDc0/Whats-App-Image2026-01-08at5-26-12-PM2.jpg",
        "https://i.ibb.co/wn4ZXbL/Whats-App-Image2026-01-08at5-26-15-PM.jpg",
        "https://i.ibb.co/bMZDJTgm/Whats-App-Image2026-01-08at5-26-14-PM1.jpg",
        "https://i.ibb.co/d0QdtvLp/Whats-App-Image2026-01-08at5-26-14-PM.jpg",
        "https://i.ibb.co/FLHwZM4r/Whats-App-Image2026-01-08at5-26-13-PM2.jpg"
    ];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden z-10">
            {/* Top/bottom gradient masks to blend into page bg */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-20">

                {/* Section eyebrow */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">The Creative Star Kit</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <h2 className="font-playfair font-black leading-[1.1] text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        We gave to our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]">artists.</span>
                    </h2>
                    <p className="text-white/35 font-lato text-sm leading-relaxed border-l-2 border-[#D4AF37]/20 pl-4 max-w-lg">
                        The official competition kit for{' '}
                        <span className="text-[#D4AF37]/70 font-bold">Indian Creative Star</span> — everything an artist needs to compete with confidence.
                    </p>
                </motion.div>
            </div>

            {/* Gallery rows */}
            <div className="space-y-5 relative">
                {/* Edge fades */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-black/60 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-black/60 to-transparent z-20 pointer-events-none" />

                {/* ROW 1 — left to right */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-3 w-max items-center"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" as any }}
                    >
                        {[...row1Images, ...row1Images, ...row1Images, ...row1Images].map((img, i) => (
                            <div key={`row1-${i}`} className="w-[140px] md:w-[200px] aspect-square overflow-hidden border border-white/8 group hover:border-[#D4AF37]/30 transition-all flex-shrink-0 bg-black/40 relative">
                                <img src={img} alt={`Kit Item ${i % row1Images.length}`} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500 block" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ROW 2 — right to left */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-3 w-max items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 45, ease: "linear" as any }}
                    >
                        {[...row2Images, ...row2Images, ...row2Images, ...row2Images].map((img, i) => (
                            <div key={`row2-${i}`} className="w-[140px] md:w-[200px] aspect-square overflow-hidden border border-white/8 group hover:border-[#D4AF37]/30 transition-all flex-shrink-0 bg-black/40 relative">
                                <img src={img} alt={`Kit Item ${i % row2Images.length}`} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500 block" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 mt-10 relative z-20">
                <button
                    onClick={() => router.push('/winterartroyale/v2')}
                    className="group flex items-center gap-3 px-6 py-3 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300"
                >
                    Register Now &amp; Get Your Kit
                    <span className="text-white/20 group-hover:text-[#D4AF37] transition-colors">→</span>
                </button>
            </div>
        </section>
    );
};

export default KitSection;
