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

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                                Start Your <span className="text-[#D4AF37]">Journey</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Whether you're an artist looking to compete, a school seeking partnership, or a sponsor wanting to support the arts—we're here to listen.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
                                    <Mail className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-widest">Email Us</p>
                                    <p className="text-white font-playfair text-lg">support@daamievent.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
                                    <Phone className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-widest">Call Us</p>
                                    <p className="text-white font-playfair text-lg">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
                                    <MapPin className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-widest">Visit Us</p>
                                    <p className="text-white font-playfair text-lg">Gangtok, Sikkim, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-purple-600 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-[#121212] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 uppercase tracking-wider">Your Name</label>
                                        <Input type="text" placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 uppercase tracking-wider">Phone Number</label>
                                        <Input type="tel" placeholder="+91 ..." className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] h-12" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 uppercase tracking-wider">Email Address</label>
                                    <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] h-12" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 uppercase tracking-wider">Message</label>
                                    <Textarea placeholder="How can we help you?" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] min-h-[120px] resize-none" />
                                </div>

                                <Button className="w-full bg-[#D4AF37] hover:bg-white text-black font-playfair text-lg h-14 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    Send Message <Send className="ml-2 w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
