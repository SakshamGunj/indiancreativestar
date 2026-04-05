import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-6 relative z-10" id="contact-us">
            <div className="max-w-5xl mx-auto">

                {/* Section eyebrow */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">Get in Touch</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                {/* Header */}
                <div className="mb-10">
                    <h2 className="font-playfair font-black text-white leading-[1.1] mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        Talk to us<br /><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]">directly.</span>
                    </h2>
                    <p className="text-white/35 font-lato text-sm leading-relaxed border-l-2 border-[#D4AF37]/20 pl-4 max-w-xl">
                        Whether you&apos;re an artist looking to compete, a school seeking partnership, or a sponsor wanting to support the arts — we&apos;re here to listen.
                    </p>
                </div>

                <div className="h-[1px] bg-white/5 mb-8" />

                {/* Contact cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <a href="mailto:daamievent@gmail.com"
                        className="group flex items-center gap-5 p-6 border border-white/6 bg-white/[0.012] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.03] transition-all duration-500">
                        <div className="w-10 h-10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37]/50 transition-colors">
                            <Mail className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                            <p className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30 mb-1">Email Us</p>
                            <p className="font-playfair font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">daamievent@gmail.com</p>
                            <p className="text-white/30 text-[11px] font-lato mt-0.5">For general inquiries &amp; support</p>
                        </div>
                    </a>

                    <a href="https://wa.me/919635908358" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-5 p-6 border border-white/6 bg-white/[0.012] hover:border-green-500/30 hover:bg-green-500/[0.03] transition-all duration-500">
                        <div className="w-10 h-10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-green-400/50 transition-colors">
                            <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30 mb-1">WhatsApp Us</p>
                            <p className="font-playfair font-bold text-white text-base group-hover:text-green-300 transition-colors">+91 96359 08358</p>
                            <p className="text-white/30 text-[11px] font-lato mt-0.5">For quick chat &amp; updates</p>
                        </div>
                    </a>
                </div>

                {/* Location strip */}
                <div className="flex items-center gap-3 border border-white/5 px-5 py-3 self-start w-fit">
                    <MapPin className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                    <span className="text-[10px] tracking-widest uppercase font-black text-white/25">Gangtok, Sikkim, India</span>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
