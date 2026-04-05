const features = [
    "FastandFast Sikkim",
    "Sikkim Daily News",
    "Artist Club Society",
    "Culture Minister Interview",
    "FastandFast Sikkim",
    "Sikkim Daily News",
    "Artist Club Society",
    "Culture Minister Interview"
];

const FeaturedOn = () => {
    return (
        <section className="border-y border-white/5 py-7 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Eyebrow */}
            <div className="flex items-center gap-4 max-w-5xl mx-auto px-4 md:px-6 mb-6 relative z-20">
                <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/50">Featured In</span>
                <div className="flex-1 h-[1px] bg-white/5" />
            </div>

            {/* Scrolling ticker */}
            <div className="flex items-center gap-10 animate-scroll whitespace-nowrap w-max relative z-0">
                {[...features, ...features].map((feature, index) => (
                    <div key={index} className="flex items-center gap-6 group cursor-default">
                        <div className="w-1 h-1 bg-[#D4AF37]/30 flex-shrink-0" />
                        <span className="text-lg md:text-xl font-playfair font-bold text-white/20 group-hover:text-[#D4AF37]/70 transition-colors duration-500 tracking-wide">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            <style>{`
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
            `}</style>
        </section>
    );
};

export default FeaturedOn;
