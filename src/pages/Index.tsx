import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote, ChevronRight, Play, Award, Menu, Users, Gavel, CheckCircle, Snowflake } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import TrustSection from "@/components/home/TrustSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedOn from "@/components/home/FeaturedOn";
import EventsPortfolio from "@/components/home/EventsPortfolio";
import ContactSection from "@/components/home/ContactSection";
import KitSection from "@/components/home/KitSection";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { useRef } from "react";





const Index = () => {
    const navigate = useNavigate();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">

            {/* Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}></div>

            {/* Navigation */}
            <nav className="relative z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm sticky top-0 bg-[#0F0F0F]/80">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="relative">
                            <img src="/company-logo.webp" alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                            <Snowflake className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 animate-spin-slow bg-black/50 rounded-full p-0.5" />
                        </div>
                        <div>
                            <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37] flex items-center gap-2">
                                DAAMI EVENT
                            </h1>
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 flex items-center gap-1">
                                Event Management <span className="text-blue-400">• Winter Edition</span>
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-white/80 font-medium">
                        <button onClick={() => document.getElementById('about-daami')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">About Us</button>
                        <button onClick={() => document.getElementById('events-portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Events</button>
                        <button onClick={() => navigate('/marketplace')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Art Shop</button>
                        <button onClick={() => navigate('/contact-us')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Contact</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => navigate('/indiancreativestar/v2')}
                            className="hidden sm:flex bg-[#D4AF37] text-black hover:bg-[#B59530] font-playfair rounded-none px-4 md:px-6 tracking-wide text-xs md:text-sm"
                        >
                            LATEST EVENT
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden text-white hover:text-[#D4AF37]">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-white/10">
                                        <Menu className="w-6 h-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="bg-[#0F0F0F] border-l border-white/10 text-white w-[300px]">
                                    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                                    <div className="flex flex-col gap-8 mt-10">
                                        <div className="space-y-6 text-lg tracking-wider font-playfair">
                                            <button onClick={() => document.getElementById('about-daami')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left hover:text-[#D4AF37] transition-colors">About Us</button>
                                            <button onClick={() => document.getElementById('events-portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Events</button>
                                            <button onClick={() => navigate('/marketplace')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Art Shop</button>
                                            <button onClick={() => navigate('/contact-us')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Contact</button>

                                            {/* Winter Art Royale Special Button */}
                                            <div className="pt-4 border-t border-white/10">
                                                <button
                                                    onClick={() => navigate('/winter-art-royale')}
                                                    className="w-full text-left group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-4 transition-all hover:bg-blue-900"
                                                >
                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div>
                                                            <span className="block text-[10px] uppercase tracking-widest text-blue-300 font-bold mb-1">Live Now</span>
                                                            <span className="block text-xl font-bold text-white">Winter Art Royale</span>
                                                        </div>
                                                        <Snowflake className="w-5 h-5 text-blue-400 animate-spin-slow" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 1. HERO SECTION: Grand Welcome */}
            <header ref={targetRef} className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 md:px-6 overflow-hidden pt-12 md:pt-0">
                <motion.div style={{ opacity, scale }} className="text-center space-y-8 max-w-5xl mx-auto relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 border border-blue-500/30 px-6 py-2 bg-blue-900/10 backdrop-blur-md rounded-full mt-4 md:mt-0"
                    >
                        <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-300 text-xs md:text-sm tracking-[0.2em] font-bold uppercase">Current Event: Winter Art Royale - W.A.R</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-playfair text-5xl sm:text-7xl lg:text-9xl leading-[1.1] text-white"
                    >
                        Where Passion Meets <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] italic">
                            Prestige.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Daami Event is the bridge between raw talent and national recognition. We curate premium artistic experiences that honor the creator in you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6"
                    >
                        {/* W.A.R Button */}
                        <Button
                            onClick={() => navigate('/winter-art-royale')}
                            className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white hover:text-blue-200 border border-blue-500/50 rounded-xl px-4 py-3 h-auto min-w-[320px] transition-all duration-300 relative overflow-visible group shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-950 mt-4 md:mt-0"
                        >
                            {/* Live Badge - Top Left Border */}
                            <div className="absolute -top-2 left-3 bg-red-600 text-white text-[8px] font-bold px-3 py-[2px] rounded-sm flex items-center gap-1 animate-pulse border border-red-400/50 shadow-sm z-30 tracking-widest uppercase transform -skew-x-12">
                                <div className="w-1 h-1 bg-white rounded-full"></div> LIVE
                            </div>

                            <div className="relative z-10 flex items-center gap-4 text-left">
                                <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" className="w-16 h-16 rounded-full border-2 border-blue-400/50 shadow-lg group-hover:scale-110 transition-transform duration-300 object-cover" alt="W.A.R Logo" />
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-[10px] font-bold tracking-widest uppercase mb-0.5">Join Current Live Event</span>
                                    <span className="font-playfair font-bold text-2xl tracking-tight leading-none text-white">Winter Art Royale</span>
                                </div>
                            </div>

                            {/* Shiny Effect Overlay - Wrapped to prevent overflow ghosting */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
                            </div>
                        </Button>

                        {/* Standard Go To Event Button */}
                        <Button
                            onClick={() => document.getElementById('events-portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-xl px-10 py-6 h-auto text-sm font-bold tracking-[0.2em] transition-all duration-300 uppercase relative group overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Go To Event <ChevronRight className="w-4 h-4" />
                            </span>
                        </Button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap justify-center gap-4 pt-10"
                    >
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                            <span className="text-sm font-medium">4.8/5 Reviews</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                            <Users className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm font-medium">1550+ Artists</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                            <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm font-medium">65k+ Votes</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                            <Gavel className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm font-medium">15+ Judges</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-transparent to-[#0F0F0F] z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
            </header>

            {/* 2. IDENTITY SECTION: Who We Are */}
            <section id="about-section" className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="font-playfair text-3xl md:text-4xl text-white">The Daami Event Philosophy</h2>
                        <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
                    </div>

                    <div className="relative">
                        <Quote className="absolute -top-8 -left-8 w-16 h-16 text-[#D4AF37]/10" />
                        <p className="text-2xl md:text-4xl font-playfair italic leading-relaxed text-white/90">
                            "They told your dreams don't pay, but your brush had more to say. India has millions of stories. <span className="text-[#D4AF37]">Let yours rise today.</span>"
                        </p>
                        <Quote className="absolute -bottom-8 -right-8 w-16 h-16 text-[#D4AF37]/10 rotate-180" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 pt-12 text-left">
                        <div className="space-y-4">
                            <h3 className="font-playfair text-2xl text-[#D4AF37]">Our Mission</h3>
                            <p className="text-white/60 leading-relaxed">
                                To democratize artistic recognition in India. We believe every artist, regardless of their location or background, deserves a platform that treats their work with professional reverence and respect.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-playfair text-2xl text-[#D4AF37]">Our Promise</h3>
                            <p className="text-white/60 leading-relaxed">
                                Transparency, Fairness, and Opportunity. From our expert jury panels to our government-verified certificates, every building block of Daami Event is designed to build your trust and your career.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2.5 TRUST SIGNALS */}
            <TrustSection />

            {/* 3. ABOUT & LEGACY */}
            <AboutSection />

            {/* 3.5 FEATURED ON */}
            <FeaturedOn />

            {/* 4. EVENTS PORTFOLIO (Upcoming & Ongoing) */}
            <EventsPortfolio />

            {/* 5. CURRENT EVENT SPOTLIGHT: Conversion */}
            <section id="events-section" className="py-32 px-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 order-2 lg:order-1">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-green-500 text-sm font-bold tracking-widest uppercase">Live Now</span>
                                </div>
                                <h2 className="font-playfair text-5xl md:text-6xl text-white leading-tight">
                                    Indian Creative Star <br />
                                    <span className="text-[#D4AF37]">Season 2</span>
                                </h2>
                                <p className="text-xl text-white/60 leading-relaxed max-w-lg">
                                    The stage is bigger, the stakes are higher. Submit your artwork today and compete for India's most prestigious title.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-white/80">
                                    <Star className="w-6 h-6 text-[#D4AF37]" />
                                    <span className="text-lg">₹50,000 Prize Pool</span>
                                </div>
                                <div className="flex items-center gap-4 text-white/80">
                                    <Award className="w-6 h-6 text-[#D4AF37]" />
                                    <span className="text-lg">National Certificate for All Participants</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    onClick={() => navigate('/indiancreativestar/v2')}
                                    className="bg-white text-black hover:bg-[#D4AF37] hover:text-white rounded-none px-8 py-6 text-lg font-playfair min-w-[200px] transition-all"
                                >
                                    I am an Artist
                                </Button>
                                <Button
                                    onClick={() => navigate('/indiancreativestar/v2')}
                                    className="bg-transparent border border-white/20 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black rounded-none px-8 py-6 text-lg font-playfair min-w-[200px] transition-all"
                                >
                                    I am a Parent
                                </Button>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative group cursor-pointer" onClick={() => navigate('/indiancreativestar/v2')}>
                            <div className="absolute inset-0 bg-[#D4AF37] transform rotate-6 rounded-2xl opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
                                    alt="Season 2 Poster"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-8">
                                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#D4AF37]/30">
                                        <Play className="w-6 h-6 text-black fill-current ml-1" />
                                    </div>
                                    <p className="font-playfair text-2xl text-white">Watch Trailer</p>
                                    <p className="text-white/60 text-sm mt-2">Discover what awaits you in Season 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CREATIVE SHOWCASE & TESTIMONIALS */}
            {/* 5.5 CREATIVE STAR KIT */}
            <KitSection />

            {/* 6. AUTHENTIC FEEDBACK & TESTIMONIALS */}
            <HomeTestimonials />

            {/* 7. CONTACT SECTION */}
            <ContactSection />

            {/* 8. FOOTER */}
            <footer className="bg-[#050505] text-white/40 py-16 px-6 border-t border-white/5 font-lato">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
                    <div className="space-y-6">
                        <h5 className="font-playfair text-2xl text-[#D4AF37]">Daami Event</h5>
                        <p className="text-sm leading-relaxed">
                            Redefining artistic excellence through curated competition and events. Empowering the next generation of creators.
                        </p>
                    </div>

                    <div>
                        <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Navigation</h6>
                        <ul className="space-y-4 text-sm">
                            <li><button onClick={() => navigate('/')} className="hover:text-[#D4AF37]">Home</button></li>
                            <li><button onClick={() => navigate('/indiancreativestar/v2')} className="hover:text-[#D4AF37]">Competitions</button></li>
                            <li><button onClick={() => navigate('/marketplace')} className="hover:text-[#D4AF37]">Art Shop</button></li>
                            <li><button onClick={() => navigate('/contact-us')} className="hover:text-[#D4AF37]">Contact</button></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Legal</h6>
                        <ul className="space-y-4 text-sm">
                            <li><button onClick={() => navigate('/privacy-policy')} className="hover:text-[#D4AF37]">Privacy Policy</button></li>
                            <li><button onClick={() => navigate('/terms-and-conditions')} className="hover:text-[#D4AF37]">Terms & Conditions</button></li>
                            <li><button onClick={() => navigate('/refund-and-cancellation')} className="hover:text-[#D4AF37]">Refund Policy</button></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Connect</h6>
                        <Button onClick={() => navigate('/contact-us')} variant="outline" className="border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]">
                            Contact Support
                        </Button>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-[10px] tracking-[0.2em] uppercase">
                    © 2025 Daami Event. All Rights Reserved.
                </div>
            </footer>

            <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}</style>
        </div>
    );
};

export default Index;