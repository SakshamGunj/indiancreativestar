import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-black" id="contact-us">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <div className="space-y-6 mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair text-white">
                        Get in <span className="text-[#D4AF37]">Touch</span>
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
                        Whether you're an artist looking to compete, a school seeking partnership, or a sponsor wanting to support the arts—we're here to listen.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Email Card */}
                    <a
                        href="mailto:daamievent@gmail.com"
                        className="group relative bg-[#121212] border border-white/10 p-10 rounded-2xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col items-center gap-6 hover:-translate-y-1"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
                            <Mail className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white font-playfair text-2xl">Email Us</h3>
                            <p className="text-white/60">For general inquiries & support</p>
                        </div>
                        <p className="text-[#D4AF37] text-xl font-medium tracking-wide">daamievent@gmail.com</p>
                    </a>

                    {/* WhatsApp Card */}
                    <a
                        href="https://wa.me/919635908358"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-[#121212] border border-white/10 p-10 rounded-2xl hover:border-[#25D366]/50 transition-all duration-300 flex flex-col items-center gap-6 hover:-translate-y-1"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-300">
                            <Phone className="w-8 h-8 text-[#25D366] group-hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white font-playfair text-2xl">WhatsApp Us</h3>
                            <p className="text-white/60">For quick chat & updates</p>
                        </div>
                        <p className="text-[#25D366] text-xl font-medium tracking-wide">+91 96359 08358</p>
                    </a>
                </div>

                <div className="mt-16 inline-flex items-center gap-2 text-white/40 text-sm uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full hover:border-white/30 transition-colors cursor-default">
                    <MapPin className="w-4 h-4" /> Gangtok, Sikkim, India
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
