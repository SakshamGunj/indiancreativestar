import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewCard = ({ testo }: { testo: { name: string, role: string, review: string, source: string } }) => (
    <div className="w-[260px] md:w-[340px] p-5 border border-white/6 bg-white/[0.015] flex-shrink-0 hover:border-[#D4AF37]/20 hover:bg-white/[0.025] transition-all duration-500 group cursor-default">
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border ${testo.source === 'Google Review' ? 'border-blue-500/20 text-blue-400/70' : 'border-green-500/20 text-green-400/70'}`}>
                {testo.source}
            </span>
        </div>
        <p className="text-white/65 italic font-playfair text-sm md:text-base mb-5 leading-[1.7]">&ldquo;{testo.review}&rdquo;</p>
        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
            <div className="w-8 h-8 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-playfair font-bold text-sm flex-shrink-0">
                {testo.name.charAt(0)}
            </div>
            <div>
                <p className="text-white/70 font-bold text-xs font-lato">{testo.name}</p>
                <p className="text-white/25 text-[9px] uppercase tracking-widest font-bold">{testo.role}</p>
            </div>
        </div>
    </div>
);

const TESTIMONIALS_ROW1 = [
    { name: "Ananya R.", role: "Verified Artist", review: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google Review" },
    { name: "Rahul V.", role: "Verified Artist", review: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified Artist" },
    { name: "Simran K.", role: "Verified Artist", review: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google Review" },
    { name: "Vikram S.", role: "Verified Artist", review: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified Artist" },
    { name: "Priya M.", role: "Verified Artist", review: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google Review" },
];
const TESTIMONIALS_ROW2 = [
    { name: "Arjun D.", role: "Verified Artist", review: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified Artist" },
    { name: "Neha G.", role: "Verified Artist", review: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google Review" },
    { name: "Kabir J.", role: "Verified Artist", review: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified Artist" },
    { name: "Riya S.", role: "Verified Artist", review: "The prize money is genuine, but the recognition is the real reward.", source: "Google Review" },
    { name: "Aditya P.", role: "Verified Artist", review: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified Artist" },
];

const SNAPSHOTS = [
    "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
    "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
    "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
    "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
    "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
    "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
    "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
];

const HomeTestimonials = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden z-10">

            {/* ── REVIEWS HEADER ── */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 mb-10 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Real Feedback</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <h2 className="font-playfair font-black text-white leading-[1.1]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                        Authentic feedback<br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]">from Season 1.</span>
                    </h2>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />)}
                        </div>
                        <span className="text-[10px] tracking-widest uppercase font-black text-white/30">4.9/5 · 300+ Artists</span>
                    </div>
                </div>
            </div>

            {/* ── MARQUEE REVIEWS ── */}
            <div className="relative w-full overflow-hidden flex flex-col gap-5 mb-16">
                <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-black/70 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-black/70 to-transparent z-10 pointer-events-none" />

                <motion.div className="flex gap-4 w-max pl-4" animate={{ x: "-50%" }} transition={{ repeat: Infinity, duration: 40, ease: "linear" as any }}>
                    {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((t, i) => <ReviewCard key={`r1-${i}`} testo={t} />)}
                </motion.div>

                <motion.div className="flex gap-4 w-max pl-4" initial={{ x: "-50%" }} animate={{ x: "0%" }} transition={{ repeat: Infinity, duration: 45, ease: "linear" as any }}>
                    {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => <ReviewCard key={`r2-${i}`} testo={t} />)}
                </motion.div>
            </div>

            {/* ── VISUAL PROOF ── */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-[1px] bg-white/20" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">Visual Proof — Review Snapshots</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                <p className="text-white/25 font-lato text-xs mb-8 border-l border-white/10 pl-3">Unfiltered love from our community.</p>

                <div className="columns-2 md:columns-4 gap-3 space-y-3">
                    {SNAPSHOTS.map((imgUrl, i) => (
                        <div key={i} className="break-inside-avoid overflow-hidden border border-white/6 group relative hover:border-[#D4AF37]/25 transition-all">
                            <img
                                src={imgUrl}
                                alt={`User Review Snapshot ${i + 1}`}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;
