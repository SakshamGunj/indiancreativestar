import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutSection = ({ hideButton = false }: { hideButton?: boolean }) => {
    const navigate = useNavigate();

    return (
        <section id="about-daami" className="py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#0F0F0F] opacity-95 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
                        <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl">
                            <img
                                src="/WhatsApp Image 2025-09-09 at 11.03.00.jpeg"
                                alt="Honorable Culture Minister with Daami Team"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-24">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#D4AF37] p-2 rounded-full">
                                        <Award className="w-6 h-6 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-playfair text-lg">Recognized Excellence</h3>
                                        <p className="text-[#D4AF37] text-sm font-medium">Supported by Ministry of Culture</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                                <Trophy className="w-4 h-4 text-[#D4AF37]" />
                                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Government Recognized</span>
                            </div>
                            <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight">
                                Honoring Art with <br />
                                <span className="text-[#D4AF37] italic">National Pride.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                            <p>
                                Daami Event is more than a platform; it is a movement officially recognized by the
                                <span className="text-white font-medium"> Honorable Culture Minister</span>.
                                We are dedicated to unearthing the hidden gems of India's artistic landscape.
                            </p>
                            <p>
                                With the blessing of national leaders, we bridge the gap between local talent and global stages.
                                Our mission aligns with the vision of a culturally vibrant India, empowering artists to claim their spotlight.
                            </p>
                        </div>

                        {/* Engagement Stats - Mini Grid */}
                        <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                            <div>
                                <h4 className="text-3xl font-playfair text-white mb-1">50+</h4>
                                <p className="text-sm text-[#D4AF37] uppercase tracking-wider">Districts Covered</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-playfair text-white mb-1">Government</h4>
                                <p className="text-sm text-[#D4AF37] uppercase tracking-wider">Backed Initiative</p>
                            </div>
                        </div>

                        {!hideButton && (
                            <Button
                                onClick={() => navigate('/about')}
                                className="bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37] hover:border-transparent rounded-none px-8 py-6 text-base tracking-widest transition-all duration-300 group"
                            >
                                READ OUR STORY <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
