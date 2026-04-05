import { useRef, useEffect, useState } from "react";

const features = [
    "FastandFast Sikkim",
    "Sikkim Daily News",
    "Artist Club Society",
    "Culture Minister Interview",
    "FastandFast Sikkim",
    "Sikkim Daily News",
    "Artist Club Society",
    "Culture Minister Interview" // Repeated for smooth looping
];

const FeaturedOn = () => {
    return (
        <section className="bg-[#0a0a0a] border-y border-white/5 py-8 overflow-hidden relative">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>

            <div className="text-center mb-8 relative z-20">
                <h3 className="text-[#D4AF37] tracking-[0.3em] text-[10px] font-bold uppercase opacity-70">Featured In</h3>
            </div>

            <div className="flex items-center gap-12 animate-scroll whitespace-nowrap w-max relative z-0">
                {/* First Set */}
                {features.map((feature, index) => (
                    <div key={`a-${index}`} className="flex items-center gap-4 group cursor-default">
                        <span className="text-2xl font-playfair text-white/30 group-hover:text-[#D4AF37] transition-colors duration-500">
                            {feature}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#D4AF37]/50 transition-colors"></div>
                    </div>
                ))}

                {/* Second Set (Duplicate for seamless loop) */}
                {features.map((feature, index) => (
                    <div key={`b-${index}`} className="flex items-center gap-4 group cursor-default">
                        <span className="text-2xl font-playfair text-white/30 group-hover:text-[#D4AF37] transition-colors duration-500">
                            {feature}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#D4AF37]/50 transition-colors"></div>
                    </div>
                ))}
            </div>

            <style>
                {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>
        </section>
    );
};

export default FeaturedOn;
