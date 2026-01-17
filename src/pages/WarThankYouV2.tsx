
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Download, ExternalLink, Copy, MessageCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const WarThankYouV2 = () => {
    // 🦁 Dynamic Metadata Manager (Favicon, Title, social Preview)
    useEffect(() => {
        // 1. Update Title
        const originalTitle = document.title;
        document.title = "Registration Successful | Winter Art Royale V2";

        // 2. Update Favicon
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        let originalIcon = '';
        if (link) {
            originalIcon = link.href;
            link.href = 'https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg';
        }

        // 3. Update Meta Tags (Open Graph)
        const metaTags = {
            'og:title': "I've Joined Winter Art Royale! 🎨",
            'og:description': "I just registered for India's National Art Competition. Can you beat me?",
            'og:image': "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
            'twitter:title': "I've Joined Winter Art Royale!",
            'twitter:description': "I just registered for India's National Art Competition. Can you beat me?",
            'twitter:image': "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
        };

        const originalMeta: Record<string, string> = {};

        Object.entries(metaTags).forEach(([property, content]) => {
            let element = document.querySelector(`meta[property='${property}']`) || document.querySelector(`meta[name='${property}']`);
            if (element) {
                originalMeta[property] = element.getAttribute('content') || '';
                element.setAttribute('content', content);
            } else {
                const isProperty = property.startsWith('og:');
                const newMeta = document.createElement('meta');
                newMeta.setAttribute(isProperty ? 'property' : 'name', property);
                newMeta.setAttribute('content', content);
                document.getElementsByTagName('head')[0].appendChild(newMeta);
            }
        });

        return () => {
            document.title = originalTitle;
            if (link && originalIcon) link.href = originalIcon;
            Object.entries(originalMeta).forEach(([property, content]) => {
                let element = document.querySelector(`meta[property='${property}']`) || document.querySelector(`meta[name='${property}']`);
                if (element) element.setAttribute('content', content);
            });
        };
    }, []);
    const navigate = useNavigate();
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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const orderId = regData?.id || "WAR-V2-PENDING";

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col relative overflow-hidden">
            {/* Header */}
            <nav className="px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="font-bold text-lg tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">W</span>
                        Winter Art Royale
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Back to Home</Button>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <div className="max-w-2xl w-full space-y-8 text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Registration Complete!</h1>
                        <p className="text-xl text-slate-500 max-w-lg mx-auto">
                            Welcome to the <span className="text-blue-600 font-bold">Winter Art Royale</span>. Your journey begins now.
                        </p>
                    </motion.div>

                    {/* Ticket Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                        <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Combatant ID</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-mono text-2xl text-slate-900 font-bold tracking-tight">{orderId}</p>
                                    <Copy className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigator.clipboard.writeText(orderId)} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Status</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide border border-green-100">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Confirmed
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-left">
                                <h4 className="text-green-800 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <MessageCircle className="w-5 h-5" /> Mandatory Step
                                </h4>
                                <p className="text-green-700/80 text-sm mb-4 leading-relaxed">
                                    You <b>MUST</b> join the WhatsApp group to receive your artwork submission link and event updates.
                                </p>
                                <Button
                                    onClick={() => window.open('https://chat.whatsapp.com/invite/FadPzypQUPiBSXr4CiqzoT', '_blank')}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-green-600/20 text-lg"
                                >
                                    Join WhatsApp Group
                                </Button>
                            </div>

                            <Button
                                onClick={async () => {
                                    // Helper to load image
                                    const loadImage = (src: string): Promise<HTMLImageElement> => {
                                        return new Promise((resolve, reject) => {
                                            const img = new Image();
                                            img.src = src;
                                            img.onload = () => resolve(img);
                                            img.onerror = reject;
                                        });
                                    };

                                    try {
                                        const [jsPDF] = await Promise.all([import("jspdf")]);
                                        const doc = new jsPDF.default();
                                        const name = regData?.name || "Combatant";
                                        const id = regData?.id || orderId;

                                        // Load Images
                                        // Use optimized assets or public path
                                        const warLogo = await loadImage("/optimized_assets/war_logo_v2.webp");
                                        const daamiLogo = await loadImage("/company-logo.webp");

                                        // 🎨 CANVAS DESIGN
                                        doc.setFillColor(255, 255, 255);
                                        doc.rect(0, 0, 210, 297, 'F'); // White bg

                                        // Border
                                        doc.setDrawColor(15, 23, 42); // Slate 900
                                        doc.setLineWidth(1.5);
                                        doc.rect(10, 10, 190, 120); // Ticket dimensions

                                        // Header Background
                                        doc.setFillColor(15, 23, 42); // Slate 900
                                        doc.rect(10, 10, 190, 30, 'F');

                                        // Logos in Header
                                        doc.addImage(daamiLogo, 'WEBP', 15, 12, 20, 20); // Left Logo
                                        doc.addImage(warLogo, 'WEBP', 175, 12, 16, 26); // Right Logo

                                        // Title
                                        doc.setTextColor(255, 255, 255);
                                        doc.setFont("times", "bold");
                                        doc.setFontSize(22);
                                        doc.text("WINTER ART ROYALE", 105, 25, { align: 'center' });

                                        doc.setFont("helvetica", "normal");
                                        doc.setFontSize(10);
                                        doc.setTextColor(200, 200, 200);
                                        doc.text("OFFICIAL ENTRY PASS • SEASON 2", 105, 33, { align: 'center' });

                                        // Body
                                        doc.setTextColor(15, 23, 42);
                                        doc.setFont("helvetica", "bold");
                                        doc.setFontSize(14);
                                        doc.text("COMBATANT PROFILE", 20, 60);

                                        doc.setDrawColor(200, 200, 200);
                                        doc.line(20, 63, 190, 63);

                                        // Details Grid
                                        doc.setFont("helvetica", "normal");
                                        doc.setFontSize(12);
                                        doc.setTextColor(80, 80, 80);

                                        let y = 75;
                                        const labelX = 20;
                                        const valueX = 60;

                                        doc.text("NAME:", labelX, y);
                                        doc.setFont("helvetica", "bold");
                                        doc.setTextColor(15, 23, 42);
                                        doc.text(name.toUpperCase(), valueX, y);

                                        y += 12;
                                        doc.setFont("helvetica", "normal");
                                        doc.setTextColor(80, 80, 80);
                                        doc.text("ID:", labelX, y);
                                        doc.setFont("mono", "normal"); // Monospaced for ID
                                        doc.setTextColor(37, 99, 235); // Blue for ID
                                        doc.text(id, valueX, y);

                                        y += 12;
                                        doc.setFont("helvetica", "normal");
                                        doc.setTextColor(80, 80, 80);
                                        doc.text("CATEGORY:", labelX, y);
                                        doc.setFont("helvetica", "bold");
                                        doc.setTextColor(15, 23, 42);
                                        doc.text((regData?.category || "Standard").toUpperCase(), valueX, y);

                                        y += 12;
                                        doc.setFont("helvetica", "normal");
                                        doc.setTextColor(80, 80, 80);
                                        doc.text("ART FORM:", labelX, y);
                                        doc.setFont("helvetica", "bold");
                                        doc.setTextColor(15, 23, 42);
                                        doc.text((regData?.artType || "Not Specified").toUpperCase(), valueX, y);

                                        // Footer / Verification
                                        doc.setFontSize(10);
                                        doc.setTextColor(100, 100, 100);
                                        doc.setFont("times", "italic");
                                        doc.text("This document serves as proof of registration for the Winter Art Royale.", 105, 115, { align: 'center' });
                                        doc.text("Present this ID for all official communications.", 105, 120, { align: 'center' });

                                        // Save
                                        doc.save("WAR_V2_Entry_Pass.pdf");

                                    } catch (e) {
                                        console.error("PDF Generation Error", e);
                                        alert("Could not generate PDF. Please try again or disable popup blockers.");
                                    }
                                }}
                                className="w-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-bold py-4 rounded-xl"
                            >
                                <Download className="w-4 h-4 mr-2" /> Download Registration Slip
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default WarThankYouV2;
