
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewCard = ({ testo }: { testo: { name: string, role: string, review: string, source: string } }) => (
    <div className="w-[300px] md:w-[400px] p-6 rounded-2xl bg-[#151515] border border-white/5 flex-shrink-0 hover:border-blue-500/30 transition-colors group cursor-default">
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${testo.source === 'Google Review' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>
                {testo.source}
            </span>
        </div>
        <p className="text-white/80 italic font-playfair text-lg mb-6 leading-relaxed">"{testo.review}"</p>
        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {testo.name.charAt(0)}
            </div>
            <div>
                <p className="text-white font-bold text-sm">{testo.name}</p>
                <p className="text-blue-400 text-[10px] uppercase tracking-wide flex items-center gap-1">
                    {testo.role}
                    {testo.role === 'Verified Artist' && <span className="w-1 h-1 bg-blue-500 rounded-full"></span>}
                </p>
            </div>
        </div>
    </div>
);

const HomeTestimonials = () => {
    return (
        <section className="py-24 px-0 bg-[#0F0F0F] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

            {/* REAL FEEDBACK HEADER */}
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
                <h4 className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold uppercase mb-2">Real Feedback</h4>
                <h2 className="text-3xl md:text-5xl font-playfair text-white mb-4">Authentic feedback from Season 1 participants</h2>
                <div className="flex items-center justify-center gap-2 text-white/60">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                    </div>
                    <span className="text-lg font-medium">4.9/5 from 300+ Artists</span>
                </div>
            </div>

            {/* MARQUEE REVIEWS */}
            <div className="relative w-full overflow-hidden flex flex-col gap-8 mb-24">
                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

                {/* ROW 1: Left Scroll */}
                <motion.div
                    className="flex gap-6 w-max pl-6"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                    {[
                        { name: "Ananya R.", role: "Verified Artist", review: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google Review" },
                        { name: "Rahul V.", role: "Verified Artist", review: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified Artist" },
                        { name: "Simran K.", role: "Verified Artist", review: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google Review" },
                        { name: "Vikram S.", role: "Verified Artist", review: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified Artist" },
                        { name: "Priya M.", role: "Verified Artist", review: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google Review" },
                        // Duplicates for smooth loop
                        { name: "Ananya R.", role: "Verified Artist", review: "This was an amazing experience! The team really cares about artists. Can't wait for Season 2! 🔥", source: "Google Review" },
                        { name: "Rahul V.", role: "Verified Artist", review: "Winning here changed my career path. The recognition is real and the community is supportive.", source: "Verified Artist" },
                        { name: "Simran K.", role: "Verified Artist", review: "Winter Art Royale sets a new standard for Indian art competitions. The talent pool is incredible.", source: "Google Review" },
                        { name: "Vikram S.", role: "Verified Artist", review: "Organized, professional, and truly inspiring. A must for every serious artist.", source: "Verified Artist" },
                        { name: "Priya M.", role: "Verified Artist", review: "The platform gave me visibility I couldn't get anywhere else. Highly recommended!", source: "Google Review" }
                    ].map((testi, i) => (
                        <ReviewCard key={`row1-${i}`} testo={testi} />
                    ))}
                </motion.div>

                {/* ROW 2: Right Scroll */}
                <motion.div
                    className="flex gap-6 w-max pl-6"
                    initial={{ x: "-50%" }}
                    animate={{ x: "0%" }}
                    transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                >
                    {[
                        { name: "Arjun D.", role: "Verified Artist", review: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified Artist" },
                        { name: "Neha G.", role: "Verified Artist", review: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google Review" },
                        { name: "Kabir J.", role: "Verified Artist", review: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified Artist" },
                        { name: "Riya S.", role: "Verified Artist", review: "The prize money is genuine, but the recognition is the real reward.", source: "Google Review" },
                        { name: "Aditya P.", role: "Verified Artist", review: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified Artist" },
                        // Duplicates for smooth loop
                        { name: "Arjun D.", role: "Verified Artist", review: "Finally a competition that respects the artist. The minimal entry fee is worth every penny.", source: "Verified Artist" },
                        { name: "Neha G.", role: "Verified Artist", review: "The networking opportunities are gold. I met my current mentor through this event.", source: "Google Review" },
                        { name: "Kabir J.", role: "Verified Artist", review: "Seamless registration and transparent judging. Daami Event is doing great work.", source: "Verified Artist" },
                        { name: "Riya S.", role: "Verified Artist", review: "The prize money is genuine, but the recognition is the real reward.", source: "Google Review" },
                        { name: "Aditya P.", role: "Verified Artist", review: "Loved the formatting and the themes. It really pushes you to be creative.", source: "Verified Artist" }
                    ].map((testi, i) => (
                        <ReviewCard key={`row2-${i}`} testo={testi} />
                    ))}
                </motion.div>
            </div>

            {/* VISUAL PROOF SNAPSHOTS */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 relative z-10">
                    <h4 className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold uppercase mb-4">Visual Proof</h4>
                    <h2 className="text-3xl md:text-5xl font-playfair text-white">Review Snapshots</h2>
                    <p className="text-white/40 mt-4">Unfiltered love from our community.</p>
                </div>

                <div className="columns-2 md:columns-4 gap-4 space-y-4">
                    {[
                        "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
                        "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
                        "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
                        "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
                        "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
                        "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
                        "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
                    ].map((imgUrl, i) => (
                        <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group relative hover:border-[#D4AF37]/50 transition-all">
                            <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors z-10 pointer-events-none"></div>
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
