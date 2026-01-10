import { ShieldCheck, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const TrustSection = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Govt. Recognized",
            description: "Officially registered and recognized entity.",
            details: "Daami Event is a fully registered entity with the Government of India (UDYAM-SK-02-0001095). We operate with full transparency and adherence to all national regulations."
        },
        {
            icon: Award,
            title: "ISO 9001:2015",
            description: "Certified for Quality Management Systems.",
            details: "Our commitment to quality is validated by our ISO 9001:2015 certification, ensuring that our event management processes meet international standards of excellence."
        },
        {
            icon: Users,
            title: "Expert Jury Panel",
            description: "Judged by India's leading art educators.",
            details: "Every submission is evaluated by a curated panel of distinguished artists and art educators from top institutions like J.J. School of Art and Shantiniketan."
        },
        {
            icon: CheckCircle,
            title: "Verified Certs",
            description: "Tap to View Certificate",
            details: "Every certificate issued is cryptographically signed and verifiable on our blockchain ledger."
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="text-center mb-12 relative z-10 px-6">
                <h2 className="text-3xl md:text-5xl font-playfair text-white mb-4">
                    We are trusted by the <span className="text-[#D4AF37]">major bodies</span> ❤️
                </h2>
                <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden group">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                <div className="flex w-max animate-scroll hover:[animation-play-state:paused] py-10">
                    {/* First Set */}
                    {[...features, ...features].map((item, index) => (
                        <Dialog key={`${item.title}-${index}`}>
                            <DialogTrigger asChild>
                                <div className="mx-4 w-[280px] bg-[#121212] border border-white/5 rounded-xl p-6 relative group/card cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all duration-300">
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                                    </div>

                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300">
                                        <item.icon className="w-6 h-6 text-[#D4AF37]" />
                                    </div>

                                    <h3 className="text-xl font-playfair text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-white/40 mb-4">{item.description}</p>

                                    <div className="flex items-center text-[#D4AF37] text-xs font-bold tracking-wider uppercase opacity-60 group-hover/card:opacity-100 transition-opacity">
                                        <span>Tap to View Certificate</span>
                                        <ArrowRight className="w-3 h-3 ml-2 group-hover/card:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="bg-[#0F0F0F] border-white/10 text-white sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="font-playfair text-2xl text-[#D4AF37] flex items-center gap-2">
                                        <item.icon className="w-6 h-6" />
                                        {item.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-white/60">
                                        Official verification and accreditation details.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 p-6 bg-white/5 rounded-lg border border-white/5 flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                        <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <p className="font-playfair text-lg text-white">Certificate Preview</p>
                                        <p className="text-sm text-white/40">ID: DEMO-8829-2025</p>
                                    </div>
                                    <div className="text-xs text-white/30 bg-black/40 px-3 py-1 rounded-full">
                                        Verified & Active
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
