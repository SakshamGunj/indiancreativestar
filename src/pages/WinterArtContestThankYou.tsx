import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Download, Copy, MessageCircle, ArrowLeft, Star, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useToast } from "@/components/ui/use-toast";

// --- Retro Components (Reused) ---
const RetroHeading = ({ children, level = 1, className = "" }: { children: React.ReactNode, level?: 1 | 2 | 3, className?: string }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizeClasses = {
        1: "text-4xl md:text-6xl",
        2: "text-3xl md:text-5xl",
        3: "text-2xl md:text-3xl"
    };
    return (
        <Tag className={`${sizeClasses[level]} font-black tracking-tighter uppercase ${className}`} style={{ fontFamily: '"Courier Prime", monospace' }}>
            {children}
        </Tag>
    );
};

const RetroButton = ({ children, onClick, variant = "primary", className = "", disabled = false }: { children: React.ReactNode, onClick?: () => void, variant?: "primary" | "secondary" | "outline", className?: string, disabled?: boolean }) => {
    const variants = {
        primary: "bg-black text-white hover:bg-[#23F0C7] hover:text-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]",
        secondary: "bg-[#FF90E8] text-black hover:bg-black hover:text-[#FF90E8] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]",
        outline: "bg-transparent border-4 border-black text-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 font-bold uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none border-2 border-transparent ${variants[variant]} ${className}`}
            style={{ fontFamily: '"Courier Prime", monospace' }}
        >
            {children}
        </button>
    );
};

const WinterArtContestThankYou = () => {
    // 🦁 Dynamic Metadata Manager
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Enlistment Confirmed | Winter Art Royale";
        return () => { document.title = originalTitle; };
    }, []);

    const navigate = useNavigate();
    const { toast } = useToast();
    const [regData, setRegData] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('war_v2_registration');
        if (stored) {
            setRegData(JSON.parse(stored));
        }

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FF90E8', '#23F0C7', '#FFC900', '#000000'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FF90E8', '#23F0C7', '#FFC900', '#000000'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const orderId = regData?.id || "WAR-RETRO-PENDING";

    const handleDownloadSlip = async () => {
        try {
            const loadImage = (src: string): Promise<HTMLImageElement> => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            };

            const [jsPDF] = await Promise.all([import("jspdf")]);
            const doc = new jsPDF.default();
            const name = regData?.name || "Combatant";
            const id = regData?.id || orderId;

            // Load Images
            const warLogo = await loadImage("/optimized_assets/war_logo_v2.webp");
            const daamiLogo = await loadImage("/company-logo.webp");

            // 🎨 CANVAS DESIGN (Retro Style Adjustment)
            doc.setFillColor(255, 250, 240); // Beige Background
            doc.rect(0, 0, 210, 297, 'F');

            // Border
            doc.setDrawColor(0, 0, 0); // Black
            doc.setLineWidth(2);
            doc.rect(10, 10, 190, 130);

            // Header Background
            doc.setFillColor(0, 0, 0); // Black
            doc.rect(10, 10, 190, 35, 'F');

            // Logos in Header
            doc.addImage(daamiLogo, 'WEBP', 15, 15, 20, 20); // Left Logo
            doc.addImage(warLogo, 'WEBP', 175, 15, 16, 26); // Right Logo

            // Title
            doc.setTextColor(255, 201, 0); // Yellow
            doc.setFont("courier", "bold");
            doc.setFontSize(24);
            doc.text("WINTER ART ROYALE", 105, 28, { align: 'center' });

            doc.setFont("courier", "normal");
            doc.setFontSize(12);
            doc.setTextColor(35, 240, 199); // Cyan
            doc.text("OFFICIAL ENLISTMENT PASS", 105, 38, { align: 'center' });

            // Body
            doc.setTextColor(0, 0, 0);
            doc.setFont("courier", "bold");
            doc.setFontSize(16);
            doc.text("COMBATANT IDENTITY", 20, 65);

            doc.setDrawColor(0, 0, 0);
            doc.line(20, 68, 190, 68);

            // Details Grid
            doc.setFont("courier", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);

            let y = 80;
            const labelX = 20;
            const valueX = 70;

            doc.text("NAME:", labelX, y);
            doc.setFont("courier", "bold");
            doc.text(name.toUpperCase(), valueX, y);

            y += 12;
            doc.setFont("courier", "normal");
            doc.text("ID:", labelX, y);
            doc.setTextColor(255, 0, 100); // Pinkish Red (Simulated Neon)
            doc.text(id, valueX, y);
            doc.setTextColor(0, 0, 0);

            y += 12;
            doc.setFont("courier", "normal");
            doc.text("DIVISION:", labelX, y);
            doc.setFont("courier", "bold");
            doc.text((regData?.category || "Standard").toUpperCase(), valueX, y);

            y += 12;
            doc.setFont("courier", "normal");
            doc.text("WEAPON:", labelX, y);
            doc.setFont("courier", "bold");
            doc.text((regData?.artType || "Not Specified").toUpperCase(), valueX, y);

            // Footer / Verification
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.setFont("courier", "italic");
            doc.text("Authorized by Daami Event Command.", 105, 125, { align: 'center' });
            doc.text("Present this pass at the gates.", 105, 130, { align: 'center' });

            // Save
            doc.save(`WAR_Mission_Pass_${id}.pdf`);
            toast({ title: "Slip Downloaded", description: "Mission pass secured." });

        } catch (e) {
            console.error("PDF Generation Error", e);
            alert("Could not generate PDF. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFAF0] text-black font-sans flex flex-col relative overflow-hidden selection:bg-[#FF90E8]">
            {/* Retro Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5 pointer-events-none"></div>

            {/* Header */}
            <nav className="px-6 py-4 border-b-4 border-black bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="font-bold text-lg md:text-xl tracking-tight flex items-center gap-2 font-mono">
                        <div className="w-8 h-8 bg-black text-[#FFC900] border-2 border-black flex items-center justify-center font-black rotate-3">W</div>
                        WINTER ART ROYALE
                    </span>
                    <button
                        onClick={() => navigate('/winterartroyale/artcontest')}
                        className="font-bold font-mono text-sm hover:text-[#FF90E8] uppercase tracking-wider flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> HQ Return
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-10 my-8">
                <div className="max-w-3xl w-full text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <div className="inline-block relative">
                            <div className="w-24 h-24 bg-[#23F0C7] border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <CheckCircle className="w-12 h-12 text-black" />
                            </div>
                            <Star className="absolute -top-4 -right-4 w-10 h-10 text-[#FF90E8] fill-[#FF90E8] animate-spin-slow" />
                        </div>

                        <RetroHeading level={1} className="mb-4 text-4xl md:text-6xl">
                            MISSION <span className="text-[#FF90E8] bg-black px-2">ACCEPTED</span>
                        </RetroHeading>
                        <p className="text-lg md:text-xl font-bold font-mono max-w-lg mx-auto border-l-4 border-black pl-4 text-left md:text-center md:border-l-0 md:pl-0">
                            Welcome to the arena. Your enlistment is confirmed.
                        </p>
                    </motion.div>

                    {/* Ticket Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-left mx-auto max-w-2xl"
                    >
                        {/* Decorative Tape */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFC900] border-2 border-black transform -rotate-2 opacity-90"></div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8 mt-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest mb-1 font-mono text-gray-500">Combatant ID</p>
                                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { navigator.clipboard.writeText(orderId); toast({ description: "ID Copied to Clipboard" }); }}>
                                    <p className="font-mono text-2xl md:text-3xl font-black bg-gray-100 px-2 py-1 border-2 border-transparent group-hover:border-black transition-all truncate">{orderId}</p>
                                    <Copy className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest mb-1 font-mono text-gray-500">Status</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#23F0C7] border-2 border-black text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span> Confirmed
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* WhatsApp Section */}
                            <div className="bg-black text-white p-6 border-4 border-white outline outline-4 outline-black relative">
                                <div className="absolute -top-3 -left-3 bg-[#FF90E8] text-black text-xs font-black px-2 py-0.5 border-2 border-black rotate-3">
                                    MANDATORY ACTION
                                </div>
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-lg font-mono text-[#23F0C7]">
                                    <MessageCircle className="w-5 h-5" /> JOIN THE WAR ROOM
                                </h4>
                                <p className="text-sm mb-6 font-mono leading-relaxed opacity-90">
                                    You <b>MUST</b> join the WhatsApp group to receive your mission briefings and submission links.
                                </p>
                                <RetroButton
                                    onClick={() => window.open('https://chat.whatsapp.com/invite/FadPzypQUPiBSXr4CiqzoT', '_blank')}
                                    className="w-full bg-[#25D366] text-black border-white hover:bg-white hover:border-[#25D366] hover:text-[#25D366]"
                                >
                                    JOIN WHATSAPP GROUP
                                </RetroButton>
                            </div>

                            {/* Download Section */}
                            <div className="pt-4 border-t-4 border-dashed border-gray-300">
                                <p className="text-xs font-mono font-bold mb-3 text-center uppercase text-gray-500">Proof of Enlistment</p>
                                <button
                                    onClick={handleDownloadSlip}
                                    className="w-full flex items-center justify-center gap-3 bg-white border-4 border-black hover:bg-black hover:text-white transition-all py-4 font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none"
                                >
                                    <FileText className="w-5 h-5" /> Download Mission Pass
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default WinterArtContestThankYou;
