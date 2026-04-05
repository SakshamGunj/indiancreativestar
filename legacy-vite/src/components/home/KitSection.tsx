
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const KitSection = () => {
    const navigate = useNavigate();

    // Kit Images (From Winter Art Royale)
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
        <section className="py-24 px-6 bg-[#050510] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <h4 className="text-blue-400 tracking-[0.2em] text-xs font-bold uppercase mb-4">The Creative Star Kit</h4>
                    <h2 className="text-3xl md:text-5xl font-playfair text-white leading-tight mb-6">
                        We gave to our artists <br />
                        <span className="text-white/60 text-lg md:text-2xl font-normal font-lato block mt-4">
                            Kit for Our Previous Art Competition called <span className="text-[#D4AF37] font-bold">Indian Creative Star</span>
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-8"></div>
                </div>

                <div className="space-y-8 relative">
                    {/* Gradient Fades for Infinite Look */}
                    <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#050510] to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#050510] to-transparent z-20 pointer-events-none"></div>

                    {/* ROW 1: Left to Right */}
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        >
                            {[...row1Images, ...row1Images, ...row1Images, ...row1Images].map((img, i) => (
                                <div key={`row1-${i}`} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-white/10 group hover:border-blue-500/50 transition-all flex-shrink-0 bg-black/40 relative">
                                    <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider">Kit Item {i % row1Images.length}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ROW 2: Right to Left */}
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex gap-4 w-max items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                        >
                            {[...row2Images, ...row2Images, ...row2Images, ...row2Images].map((img, i) => (
                                <div key={`row2-${i}`} className="w-[160px] md:w-[240px] aspect-square rounded-2xl overflow-hidden border border-white/10 group hover:border-blue-500/50 transition-all flex-shrink-0 bg-black/40 relative">
                                    <img src={img} alt={`Kit Item ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider">Kit Item {i % row2Images.length}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* KIT CTA */}
                <div className="mt-16 text-center">
                    <Button
                        onClick={() => navigate('/winterartroyale/v2')}
                        className="bg-[#D4AF37] text-black hover:bg-[#B59530] font-playfair font-bold py-6 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:scale-105 transition-all"
                    >
                        Register Now & Get Your Kit
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default KitSection;
