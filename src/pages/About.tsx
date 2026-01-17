import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import AboutSection from "@/components/home/AboutSection";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">

            {/* Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}></div>

            {/* Navigation */}
            <nav className="relative z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm sticky top-0 bg-[#0F0F0F]/80">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/company-logo.webp" alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                        <div>
                            <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37]">DAAMI EVENT</h1>
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40">Event Management</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-white/80 font-medium">
                        <button onClick={() => navigate('/about')} className="text-[#D4AF37] transition-colors duration-300 relative group">About Us</button>
                        <button onClick={() => navigate('/#events-portfolio')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Events</button>
                        <button onClick={() => navigate('/contact-us')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Contact</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate('/#events-portfolio')} className="hidden md:flex bg-[#D4AF37] text-black hover:bg-white border border-[#D4AF37] rounded-none px-6 tracking-widest text-xs font-bold transition-all duration-300">
                            PARTICIPATE NOW <ArrowRight className="ml-2 w-3 h-3" />
                        </Button>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-[#D4AF37] hover:bg-[#D4AF37]/10">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="bg-[#0F0F0F] border-l border-[#D4AF37]/20 text-white">
                                    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                                    <div className="flex flex-col gap-6 mt-8">
                                        <button onClick={() => navigate('/about')} className="text-xl font-playfair text-[#D4AF37] text-left">About Us</button>
                                        <button onClick={() => navigate('/#events-portfolio')} className="text-xl font-playfair hover:text-[#D4AF37] text-left transition-colors">Events</button>
                                        <button onClick={() => navigate('/contact-us')} className="text-xl font-playfair hover:text-[#D4AF37] text-left transition-colors">Contact</button>
                                        <Button onClick={() => navigate('/#events-portfolio')} className="mt-4 bg-[#D4AF37] text-black hover:bg-white border border-[#D4AF37] rounded-none w-full tracking-widest">
                                            PARTICIPATE NOW
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-16 pb-24">
                <div className="text-center px-4 mb-16">
                    <h1 className="font-playfair text-5xl md:text-7xl text-white mb-6">Our Story</h1>
                    <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-sm">Empowering Creativity Since 2023</p>
                </div>

                <AboutSection hideButton={true} />
            </main>

            {/* Footer */}
            <footer className="relative bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-white/60">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/company-logo.webp" alt="Daami Event" className="h-10 w-10 object-cover rounded-full border border-[#D4AF37]/30" />
                            <span className="font-playfair text-xl text-white tracking-widest">DAAMI EVENT</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Redefining the art of competition. We provide the stage, you bring the magic. Join India's fastest growing creative community.
                        </p>
                    </div>

                    <div>
                        <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Navigation</h6>
                        <ul className="space-y-4 text-sm">
                            <li><button onClick={() => navigate('/')} className="hover:text-[#D4AF37]">Home</button></li>
                            <li><button onClick={() => navigate('/indiancreativestar/v2')} className="hover:text-[#D4AF37]">Competitions</button></li>
                            <li><button onClick={() => navigate('/contact-us')} className="hover:text-[#D4AF37]">Contact</button></li>
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

export default About;
