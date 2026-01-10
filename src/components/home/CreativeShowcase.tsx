import { Star, Quote, User } from "lucide-react";

const CreativeShowcase = () => {
    const artworks = [
        "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578321272152-32a26c04z?q=80&w=300&auto=format&fit=crop"
    ];

    const testimonials = [
        {
            text: "This platform gave me the confidence to pursue art full-time.",
            author: "Priya S.",
            role: "Winner Season 1"
        },
        {
            text: "The exposure I got from Daami Event was unlike any other competition.",
            author: "Rohan M.",
            role: "Finalist"
        },
        {
            text: "Professional, transparent, and truly encouraging for young artists.",
            author: "Anjali K.",
            role: "Teacher"
        },
        {
            text: "Winning the certificate helped me apply for art college!",
            author: "Dev P.",
            role: "Student"
        },
        {
            text: "A wonderful initiative for the North East art community.",
            author: "Sikkim Art House",
            role: "Partner"
        }
    ];

    return (
        <section className="py-24 bg-[#0F0F0F] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10 px-6">
                <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">Community Voices</p>
                <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6">
                    Our Creative Stars <span className="text-[#D4AF37]">& Testimonials</span>
                </h2>
                <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
            </div>

            {/* Row 1: Artworks (Left to Right) */}
            <div className="mb-8 relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0F0F0F] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0F0F0F] to-transparent z-20 pointer-events-none"></div>

                <div className="flex w-max animate-scroll-reverse hover:[animation-play-state:paused] gap-6">
                    {[...artworks, ...artworks, ...artworks].map((src, i) => (
                        <div key={`art-${i}`} className="w-64 h-48 rounded-xl overflow-hidden border border-white/10 group/card relative">
                            <img src={src} alt="Artwork" className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 opacity-70 group-hover/card:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-4">
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Featured Art</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2: Testimonials (Right to Left) */}
            <div className="relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0F0F0F] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0F0F0F] to-transparent z-20 pointer-events-none"></div>

                <div className="flex w-max animate-scroll hover:[animation-play-state:paused] gap-6">
                    {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
                        <div key={`test-${i}`} className="w-96 bg-[#151515] p-6 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors group/card">
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
                            </div>
                            <p className="text-white/70 italic font-playfair text-lg mb-6 leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{item.author}</p>
                                    <p className="text-white/40 text-xs uppercase tracking-wide">{item.role}</p>
                                </div>
                                <Quote className="ml-auto w-8 h-8 text-[#D4AF37]/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default CreativeShowcase;
