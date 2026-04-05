"use client";

import { ArrowRight, Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const AboutSection = ({ hideButton = false }: { hideButton?: boolean }) => {
    const router = useRouter();

    return (
        <section id="about-daami" className="py-16 md:py-24 px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">

                {/* Section eyebrow */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Government Recognized</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden border border-white/8 group">
                            <img
                                src="/WhatsApp Image 2025-09-09 at 11.03.00.jpeg"
                                alt="Honorable Culture Minister with Daami Team"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[15%] group-hover:grayscale-0"
                            />
                            {/* Overlay caption strip */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-5 pt-10 pb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                                        <Award className="w-4 h-4 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-playfair text-sm font-bold leading-tight">Recognized Excellence</p>
                                        <p className="text-[#D4AF37]/70 text-[10px] tracking-widest uppercase font-bold">Supported by Ministry of Culture</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-2 self-start">
                            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span className="text-[9px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/70">Government Backed Initiative</span>
                        </div>

                        {/* Title */}
                        <h2 className="font-playfair font-black leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                            Honoring Art with<br />
                            <span className="italic">National Pride.</span>
                        </h2>

                        {/* Content */}
                        <div className="flex flex-col gap-4 border-l-2 border-[#D4AF37]/20 pl-5">
                            <p className="text-white/45 font-lato text-sm md:text-base leading-[1.9] font-light">
                                Daami Event is more than a platform; it is a movement officially recognized by the{' '}
                                <span className="text-white/70 font-medium">Honorable Culture Minister</span>.
                                We are dedicated to unearthing the hidden gems of India&apos;s artistic landscape.
                            </p>
                            <p className="text-white/40 font-lato text-sm md:text-base leading-[1.9] font-light">
                                With the blessing of national leaders, we bridge the gap between local talent and global stages.
                                Our mission aligns with the vision of a culturally vibrant India, empowering artists to claim their spotlight.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="h-[1px] bg-white/5" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-white/5 bg-white/[0.012]">
                                <h4 className="font-playfair font-black text-2xl md:text-3xl text-white mb-1">50+</h4>
                                <p className="text-[9px] tracking-[0.25em] uppercase font-black text-[#D4AF37]/60">Districts Covered</p>
                            </div>
                            <div className="p-4 border border-white/5 bg-white/[0.012]">
                                <h4 className="font-playfair font-black text-2xl md:text-3xl text-white mb-1">Govt.</h4>
                                <p className="text-[9px] tracking-[0.25em] uppercase font-black text-[#D4AF37]/60">Backed Initiative</p>
                            </div>
                        </div>
                        <div className="h-[1px] bg-white/5" />

                        {!hideButton && (
                            <button
                                onClick={() => router.push('/about')}
                                className="group self-start flex items-center gap-3 px-6 py-3 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300"
                            >
                                READ OUR STORY
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
