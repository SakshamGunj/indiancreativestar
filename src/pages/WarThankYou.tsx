
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Download, ExternalLink, ArrowRight, Snowflake, Copy, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const WarThankYou = () => {
    const navigate = useNavigate();
    const [orderId] = useState(`WAR-${Math.floor(Math.random() * 100000)}`);

    useEffect(() => {
        // Trigger confetti on load
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // multiple confetti sources
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050510] text-white font-lato flex flex-col relative overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-blue-900/20 via-blue-900/5 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full"></div>
            </div>

            <nav className="relative z-50 px-6 py-6 flex justify-between items-center border-b border-white/5 bg-black/30">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/company-logo.webp" alt="Daami Event" className="h-10 w-10 rounded-full border border-blue-500/50" />
                    <div>
                        <h1 className="font-playfair text-lg tracking-wider text-blue-200">DAAMI EVENT</h1>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Winter Edition</p>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <div className="max-w-2xl w-full space-y-8 text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4">Welcome to the Battle!</h1>
                        <p className="text-xl text-blue-200/60 max-w-lg mx-auto">Your spot in the <span className="text-blue-300 font-bold">Winter Art Royale</span> is secured. Prepare your masterpiece.</p>
                    </motion.div>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>

                        <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Combatant ID</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-mono text-xl text-white font-bold">{orderId}</p>
                                    <Copy className="w-4 h-4 text-white/20 cursor-pointer hover:text-blue-400 transition-colors" onClick={() => navigator.clipboard.writeText(orderId)} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Status</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wide">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Confirmed
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-[#25D366]/10 border border-[#25D366]/20 p-4 rounded-xl text-left mb-4">
                                <h4 className="text-[#25D366] font-bold mb-2 flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> Stay Updated
                                </h4>
                                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                                    Join our WhatsApp group to get all further information, updates, and announcements about the competition.
                                </p>
                                <Button
                                    onClick={() => window.open('https://chat.whatsapp.com/invite/FadPzypQUPiBSXr4CiqzoT', '_blank')}
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-6 rounded-xl shadow-lg shadow-green-900/20 group"
                                >
                                    <span className="flex items-center gap-2">
                                        Join WhatsApp Group <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>
                            <Button
                                onClick={() => {
                                    import("jspdf").then((jsPDF) => {
                                        const doc = new jsPDF.default();
                                        const registrations = JSON.parse(localStorage.getItem('war_registrations') || '[]');
                                        const latest = registrations[0] || {};
                                        const name = latest.name || "Combatant";

                                        // --- PREMIUM ARTISTIC THEME --- //

                                        // 1. Background (Rich Dark Theme)
                                        doc.setFillColor(5, 5, 16); // Very Dark Navy/Black
                                        doc.rect(0, 0, 210, 297, 'F');

                                        // 2. Artistic Border (Double Layer)
                                        doc.setDrawColor(234, 179, 8); // Gold/Yellow
                                        doc.setLineWidth(1);
                                        doc.rect(10, 10, 190, 277, 'S'); // Outer Gold

                                        doc.setDrawColor(59, 130, 246); // Blue
                                        doc.setLineWidth(0.5);
                                        doc.rect(15, 15, 180, 267, 'S'); // Inner Blue

                                        // 3. Header Section
                                        // "Daami Event Presents"
                                        doc.setFontSize(10);
                                        doc.setTextColor(150, 150, 150); // Muted Text
                                        doc.setFont('helvetica', 'normal');
                                        doc.text("DAAMI EVENT PRESENTS", 105, 30, { align: 'center' });

                                        // "WINTER ART ROYALE" (Main Title)
                                        doc.setFontSize(32);
                                        doc.setTextColor(255, 255, 255); // White
                                        doc.setFont('times', 'bold'); // Serif font for premium feel
                                        doc.text("WINTER ART ROYALE", 105, 45, { align: 'center' });

                                        // "NATIONAL ART CONTEST - WINTER EDITION" (Subtitle)
                                        doc.setFontSize(12);
                                        doc.setTextColor(59, 130, 246); // Blue Highlight
                                        doc.setFont('helvetica', 'bold');
                                        doc.text("NATIONAL ART CONTEST - WINTER EDITION", 105, 55, { align: 'center' });

                                        // Separator Line
                                        doc.setDrawColor(255, 255, 255);
                                        doc.setLineWidth(0.5);
                                        doc.line(70, 60, 140, 60);

                                        // 4. "Registration Slip" Badge
                                        doc.setFillColor(59, 130, 246); // Blue Box
                                        doc.roundedRect(65, 70, 80, 10, 3, 3, 'F');
                                        doc.setTextColor(255, 255, 255);
                                        doc.setFontSize(10);
                                        doc.setFont('helvetica', 'bold');
                                        doc.text("SEASON 2 REGISTRATION SLIP", 105, 76.5, { align: 'center' });

                                        // 5. Combatant Profile Section
                                        const startY = 100;

                                        // Profile Header
                                        doc.setFontSize(14);
                                        doc.setTextColor(234, 179, 8); // Gold
                                        doc.text("COMBATANT PROFILE", 30, startY);

                                        // Profile Data Box
                                        doc.setDrawColor(255, 255, 255);
                                        doc.setLineWidth(0.2);
                                        doc.line(30, startY + 5, 85, startY + 5);

                                        doc.setFontSize(12);
                                        doc.setTextColor(200, 200, 200); // Light Grey
                                        doc.setFont('courier', 'bold'); // Monospaced for tech/data feel

                                        // Name
                                        doc.text(`NAME:`, 30, startY + 20);
                                        doc.setTextColor(255, 255, 255);
                                        doc.text(`${name.toUpperCase()}`, 70, startY + 20);

                                        // ID
                                        doc.setTextColor(200, 200, 200);
                                        doc.text(`ID:`, 30, startY + 30);
                                        doc.setTextColor(59, 130, 246); // Blue ID
                                        doc.text(`${orderId}`, 70, startY + 30);

                                        // Category
                                        doc.setTextColor(200, 200, 200);
                                        doc.text(`CATEGORY:`, 30, startY + 40);
                                        doc.setTextColor(255, 255, 255);
                                        doc.text(`${latest.category || "Standard"}`, 70, startY + 40);

                                        // 6. Artistic Elements (Abstract Shapes)
                                        doc.setDrawColor(255, 255, 255);
                                        doc.setLineWidth(0.1);
                                        doc.circle(170, 120, 15, 'S'); // Circle Top Right
                                        doc.circle(170, 120, 10, 'S'); // Inner Circle

                                        doc.rect(30, 170, 5, 5, 'F'); // Decorative Square Left
                                        doc.rect(38, 170, 5, 5, 'S'); // Decorative Square Left
                                        doc.rect(175, 170, 5, 5, 'F'); // Decorative Square Right
                                        doc.rect(167, 170, 5, 5, 'S'); // Decorative Square Right

                                        // 7. Footer / Thank You Message
                                        doc.setFont('helvetica', 'normal');

                                        // "THANK YOU FOR ENLISTING!"
                                        doc.setFontSize(18);
                                        doc.setTextColor(234, 179, 8); // Gold
                                        doc.setFont('times', 'bolditalic');
                                        doc.text('"THANK YOU FOR ENLISTING!"', 105, 200, { align: 'center' });

                                        // Motivational Quote
                                        doc.setFontSize(11);
                                        doc.setTextColor(150, 150, 150);
                                        doc.setFont('helvetica', 'italic');
                                        doc.text("Your journey to becoming a National Creative Star begins now.", 105, 215, { align: 'center' });

                                        // Official Stamp / Signature Placeholder
                                        doc.setDrawColor(59, 130, 246);
                                        doc.setLineWidth(1);
                                        doc.rect(140, 240, 40, 20, 'S');
                                        doc.setFontSize(8);
                                        doc.setTextColor(59, 130, 246);
                                        doc.text("OFFICIAL STAMP", 160, 252, { align: 'center' });

                                        doc.save("WAR_Registration_Slip.pdf");
                                    });
                                }}
                                className="w-full bg-white text-blue-900 border border-white hover:bg-gray-100 font-bold py-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.01]"
                            >
                                <Download className="w-4 h-4 mr-2" /> Download Registration Slip
                            </Button>
                        </div>
                    </motion.div>

                    <div className="flex justify-center gap-4 text-sm text-white/40">
                        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/winter-art-royale')}>Return to Event Page</span>
                        <span>•</span>
                        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Go Home</span>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default WarThankYou;
