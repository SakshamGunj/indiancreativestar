import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, Award, TrendingUp, CheckCircle, Quote } from 'lucide-react';

const stats = [
    { label: "Participants Joined", value: "500+", icon: Users },
    { label: "Prize Distributed", value: "₹25K", icon: Trophy },
    { label: "Success Rating", value: "4.9★", icon: Star },
    { label: "Featured Artists", value: "100+", icon: Award },
    { label: "Media Reach", value: "50K+", icon: TrendingUp },
    { label: "Certificates Issued", value: "500+", icon: CheckCircle },
];

const testimonials = [
    { name: "Anjali Sharma", role: "Parent", quote: "Very professional management! My daughter participated and felt so motivated. Finally, an art platform that respects young talent." },
    { name: "Rizwan Khan", role: "Artist", quote: "As an artist, I joined Sikkim Creative Star Season 1 and now I'm here again for Season 2. The team keeps improving every year. Excited!" },
    { name: "Priya Das", role: "Participant", quote: "Honestly, I didn't expect such smooth coordination. From registration to updates, everything was managed really well. Great job, Daami Event!" },
    { name: "Arvind Mehta", role: "Artist", quote: "This competition is not just about prizes, it's about recognition. Artists finally have a stage where their creativity is valued." },
    { name: "Meera Kapoor", role: "Parent", quote: "My son participated, and I was amazed at the exposure he got. It really boosts children's confidence to see their art celebrated." },
    { name: "Sana Fatima", role: "Artist", quote: "I joined this competition because I believe art needs recognition. The organizers actually care about artists, and that makes a big difference." },
    { name: "Deepak Joshi", role: "Artist", quote: "Season 1 had 300+ artists, and I was one of them. The way winners were celebrated was inspiring. Can't wait for Season 2 results!" },
    { name: "Vikram Thapa", role: "Parent", quote: "Superb initiative. The certificates are genuine and even supported by the Culture Department, which makes it feel official and prestigious." },
    { name: "Rohit Sen", role: "Artist", quote: "Good experience overall. Communication was clear, deadlines were fair, and the theme really pushed us to be creative." },
    { name: "Neha Kumari", role: "Parent", quote: "My daughter's painting was shortlisted last year. The smile on her face was priceless. Thank you for giving kids such a platform." },
    { name: "Krishna Prasad", role: "Artist", quote: "I've seen many competitions, but none managed so smoothly. From online registration to updates on dashboard, everything was top-notch." },
    { name: "Aarav Patel", role: "Artist", quote: "I joined because I wanted my art recognized at a national level. This competition gives hope to upcoming artists." },
    { name: "Lata Subba", role: "Parent", quote: "As a parent, I loved how transparent the judging was. Every child felt included, and that's the beauty of this platform." },
    { name: "Imran Ali", role: "Artist", quote: "This is not just an event — it's a movement. I participated in Sikkim Creative Star, and that experience made me return again. Truly inspiring." },
    { name: "Sunita Sharma", role: "Participant", quote: "Simple process, clear communication, and supportive team. Very rare to find this level of professionalism in art competitions." },
    { name: "Ramesh Chhetri", role: "Artist", quote: "I have been an artist for more than 10 years, but this is the first competition where I felt my work was truly valued. The management was fantastic." },
    { name: "Fatima Begum", role: "Parent", quote: "My child participated in Season 1, and though she didn't win, she gained immense confidence. She now paints daily and dreams of becoming an artist." },
    { name: "Rajendra Singh", role: "Artist", quote: "I was part of Sikkim Creative Star Season 1 and I'm amazed to see how far this initiative has come. What started with 300 artists is now national-level!" },
    { name: "Anushka Verma", role: "Teacher", quote: "As an art teacher, I encouraged my students to participate, and many did. The joy they felt in seeing their names featured officially is priceless." },
    { name: "Ganesh Lama", role: "Artist", quote: "I must say the professionalism surprised me. Most competitions are messy, but here everything was well-structured. The support team was excellent." }
];

const artworkPlaceholders = [
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549887552-93f8efb876a4?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=400&auto=format&fit=crop"
];

export const WarHighlights = () => {
    return (
        <section className="py-24 bg-[#050510] relative overflow-hidden font-inter-display">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050510] to-transparent z-10"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Artwork Gallery Marquee */}
                <div className="mb-0 overflow-hidden py-10 relative pt-20">
                    <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#050510] to-transparent z-10"></div>
                    <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#050510] to-transparent z-10"></div>
                    <div className="text-center mb-12">
                        <h3 className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">Previous Artworks Showcase</h3>
                    </div>

                    <div className="flex gap-6 animate-scroll whitespace-nowrap">
                        {[...artworkPlaceholders, ...artworkPlaceholders].map((src, i) => (
                            <div key={i} className="inline-block w-60 h-80 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group relative cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                                <img src={src} alt={`Artwork ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div>
                                        <p className="text-white font-bilderberg text-lg mb-1">Masterpiece #{i + 1}</p>
                                        <p className="text-white/60 text-xs uppercase tracking-wider">Season 1 Entry</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
