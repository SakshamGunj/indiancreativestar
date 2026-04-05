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
            icon: Users,
            title: "Expert Jury Panel",
            description: "Judged by India's leading art educators.",
            details: "Every submission is evaluated by a curated panel of distinguished artists and art educators from top institutions like J.J. School of Art and Shantiniketan."
        },
        {
            icon: CheckCircle,
            title: "Verified Certs",
            description: "Secure, blockchain-backed credentials.",
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
                    {[...features, ...features, ...features].map((item, index) => (
                        <div key={`${item.title}-${index}`} className="mx-4 w-[280px] bg-[#121212] border border-white/5 rounded-xl p-6 relative group/card hover:border-[#D4AF37]/30 hover:bg-white/[0.02] transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300">
                                <item.icon className="w-6 h-6 text-[#D4AF37]" />
                            </div>

                            <h3 className="text-xl font-playfair text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-white/40 mb-1">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
