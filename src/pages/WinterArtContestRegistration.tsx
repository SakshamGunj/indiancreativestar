
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronRight, ArrowLeft, Star, Monitor, Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// --- Retro Components (Reused for consistency) ---
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
            className={`px-8 py-3 font-bold uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none border-2 border-transparent ${variants[variant]} ${className}`}
            style={{ fontFamily: '"Courier Prime", monospace' }}
        >
            {disabled ? <Loader2 className="animate-spin mx-auto" /> : children}
        </button>
    );
};

export default function WinterArtContestRegistration() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        artType: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // 🦁 Dynamic Metadata Manager
    React.useEffect(() => {
        const originalTitle = document.title;
        document.title = "Enlist Now | Winter Art Royale";

        // Logic for metadata could be enhanced here similar to V2

        return () => {
            document.title = originalTitle;
        };
    }, []);

    const handleNext = () => {
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.phone) {
                toast({
                    title: "Missing Details",
                    description: "Please fill in all your personal details.",
                    variant: "destructive"
                });
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!formData.category || !formData.artType) {
                toast({
                    title: "Selection Required",
                    description: "Please select your category and art form.",
                    variant: "destructive"
                });
                return;
            }
            setStep(3); // Although logic below handles submission on step 2 button click, keeping flow consistent
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFAF0] text-black font-sans selection:bg-[#FF90E8] flex flex-col md:flex-row overflow-x-hidden">

            {/* Left Side - Retro Visuals (Hidden on mobile) */}
            <div className="hidden md:flex w-1/2 bg-[#FF90E8] relative flex-col justify-between p-12 border-r-4 border-black">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>

                <div className="relative z-10">
                    <div className="inline-block bg-black text-[#23F0C7] px-4 py-2 font-mono font-bold transform -rotate-2 mb-8 border-2 border-white">
                        OFFICIAL ENLISTMENT
                    </div>
                    <RetroHeading level={1} className="text-7xl mb-6">
                        JOIN THE <br /> W.A.R.
                    </RetroHeading>
                    <p className="text-2xl font-bold border-l-8 border-black pl-6">
                        Secure your spot in the <span className="bg-[#FFC900] px-1">Winter Art Royale</span>. <br />
                        Victory awaits the bold.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                <Star className="text-[#FFC900] fill-[#FFC900]" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl">37% SEATS FILLED</h3>
                                <p className="font-mono text-sm text-gray-600">High Demand Alert</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 h-4 border-2 border-black rounded-full overflow-hidden">
                            <div className="bg-[#FFC900] h-full w-[37%] border-r-2 border-black"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 py-8 md:p-12 relative bg-[#FFFAF0] min-h-screen md:min-h-auto">
                <button
                    onClick={() => navigate('/winterartroyale/artcontest')}
                    className="absolute top-4 left-4 md:top-12 md:left-12 z-50 text-black hover:text-[#FF90E8] flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors font-mono bg-white/80 p-2 rounded border-2 border-black md:border-none md:bg-transparent"
                >
                    <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Abort Mission</span><span className="sm:hidden">Exit</span>
                </button>

                <div className="w-full max-w-md space-y-6 md:space-y-8 relative z-10 mt-14 md:mt-0">
                    <div className="mb-6 md:mb-8">
                        <div className="flex justify-between items-end mb-2 font-mono font-bold">
                            <span className="text-[10px] md:text-xs uppercase">Step {step} of 2</span>
                            <span className="text-[10px] md:text-base">{Math.round((step / 2) * 100)}% COMPLETE</span>
                        </div>
                        <div className="w-full h-3 md:h-4 bg-white border-2 border-black rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#23F0C7] border-r-2 border-black"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 2) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4 md:space-y-6 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">Identify Yourself</h3>
                                    <p className="font-mono text-xs md:text-sm text-gray-600">Enter your credentials to proceed.</p>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] md:text-xs font-bold uppercase tracking-wide font-mono">Full Name</Label>
                                        <Input
                                            value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="bg-gray-100 border-2 border-black focus:border-[#FF90E8] focus:ring-0 rounded-none h-10 md:h-12 font-bold text-sm md:text-base"
                                            placeholder="ENTER FULL NAME"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] md:text-xs font-bold uppercase tracking-wide font-mono">Email</Label>
                                        <Input
                                            value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="bg-gray-100 border-2 border-black focus:border-[#FF90E8] focus:ring-0 rounded-none h-10 md:h-12 font-bold text-sm md:text-base"
                                            placeholder="YOUR@EMAIL.COM" type="email"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] md:text-xs font-bold uppercase tracking-wide font-mono">WhatsApp Number</Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r-2 border-black pr-2">
                                                <span className="font-bold text-xs md:text-sm">+91</span>
                                            </div>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    handleInputChange("phone", val);
                                                }}
                                                className="bg-gray-100 border-2 border-black focus:border-[#FF90E8] focus:ring-0 rounded-none h-10 md:h-12 pl-16 tracking-widest font-mono text-base md:text-lg font-bold"
                                                placeholder="XXXXXXXXXX"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <RetroButton onClick={() => {
                                    if (formData.phone.length !== 10) {
                                        toast({ title: "Invalid Phone", description: "Please enter a 10-digit number.", variant: "destructive" });
                                        return;
                                    }
                                    handleNext();
                                }} className="w-full text-sm md:text-base py-3 md:py-3">
                                    PROCEED <ChevronRight className="ml-2 w-4 h-4 inline" />
                                </RetroButton>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4 md:space-y-6 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex items-center gap-2 cursor-pointer hover:text-[#FF90E8] transition-colors" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4" /> <span className="text-[10px] md:text-xs font-bold uppercase font-mono">Back</span>
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">Classify Skill</h3>
                                    <p className="font-mono text-xs md:text-sm text-gray-600">Select your division and weapon of choice.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div
                                        onClick={() => handleInputChange("category", "Student")}
                                        className={`p-4 md:p-5 border-4 transition-all relative cursor-pointer ${formData.category === "Student" ? 'bg-[#23F0C7] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-100 border-gray-300 hover:border-black'}`}
                                    >
                                        <div className="font-black text-sm md:text-base mb-1 uppercase">Student</div>
                                        <div className="text-[10px] uppercase tracking-wider font-bold font-mono">Under 18 Years</div>
                                        {formData.category === "Student" && <div className="absolute top-2 right-2"><CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-black fill-white" /></div>}
                                    </div>
                                    <div
                                        onClick={() => handleInputChange("category", "Professional")}
                                        className={`p-4 md:p-5 border-4 transition-all relative cursor-pointer ${formData.category === "Professional" ? 'bg-[#FF90E8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-100 border-gray-300 hover:border-black'}`}
                                    >
                                        <div className="font-black text-sm md:text-base mb-1 uppercase">Professional</div>
                                        <div className="text-[10px] uppercase tracking-wider font-bold font-mono">18+ Years</div>
                                        {formData.category === "Professional" && <div className="absolute top-2 right-2"><CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-black fill-white" /></div>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-[10px] md:text-xs font-bold uppercase tracking-wide font-mono">Art Form</Label>
                                    <Select onValueChange={(val) => handleInputChange("artType", val)}>
                                        <SelectTrigger className="bg-gray-100 border-2 border-black rounded-none h-10 md:h-12 font-bold focus:ring-0 text-sm md:text-base">
                                            <SelectValue placeholder="SELECT ART FORM" />
                                        </SelectTrigger>
                                        <SelectContent className="border-2 border-black rounded-none">
                                            <SelectItem value="traditional" className="font-mono font-bold text-sm md:text-base">Traditional (Paint/Sketch)</SelectItem>
                                            <SelectItem value="digital" className="font-mono font-bold text-sm md:text-base">Digital Art</SelectItem>
                                            <SelectItem value="mixed" className="font-mono font-bold text-sm md:text-base">Mixed Media</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <RetroButton
                                    onClick={async () => {
                                        if (!formData.category || !formData.artType) {
                                            toast({ title: "Required", description: "Please complete selection.", variant: "destructive" });
                                            return;
                                        }

                                        setIsLoading(true);

                                        try {
                                            const PERISKOPE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYTBhZWFmMDUtNWIyZC00ZjEyLWIxN2MtYTU3ZDY4ZWRhNTA3IiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiZGFhbWlldmVudCIsICJleHAiIDogMjA4Mzg0MTkzMSwgImlhdCIgOiAxNzY4MzA5MTMxLCAic3ViIiA6ICJlYTU1NzRhNC0wM2QyLTQzNzktODRjMC0zOTAxYTdkOGQwZTAiLCAiaXNzIiA6ICJwZXJpc2tvcGUuYXBwIiwgIm1ldGFkYXRhIiA6IHsic2NvcGVzIjogWyI5MTk2MzU5MDgzNThAYy51cyJdfX0.jeLLE6lEEztv1krpler0MKy9HrA3y6KT5tD8CbMJlMs";
                                            const senderPhone = "919635908358";
                                            const recipientPhone = `91${formData.phone}`;

                                            // Send WhatsApp
                                            await fetch("https://api.periskope.app/v1/message/send", {
                                                method: "POST",
                                                headers: {
                                                    "Authorization": `Bearer ${PERISKOPE_API_KEY}`,
                                                    "x-phone": senderPhone,
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    chat_id: recipientPhone,
                                                    message: `*Winter Art Royale Registration Confirmed* ❄️\n\nThanks for joining *Winter Art Royale*! You have made a great choice. 🔥\n\n*Your Details:*\n• Name: ${formData.name}\n• Category: ${formData.category}\n• Art Form: ${formData.artType}\n\n👇 *JOIN THE OFFICIAL GROUP NOW:*\nhttps://chat.whatsapp.com/invite/FadPzypQUPiBSXr4CiqzoT\n\nJoin to get updates & your submission link. See you on the battlefield! ⚔️`
                                                })
                                            });
                                        } catch (e) {
                                            console.error("WhatsApp Error", e);
                                        }

                                        try {
                                            // Webhook
                                            const WEBHOOK_API_KEY = "A7fQ3ZLJ9X8T2C5sM4B6NPRDYEwWmKHVdG";
                                            await fetch("https://hook.eu2.make.com/s5mj9oty5l53yjoguhjjpne8c20a9tay", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    api_key: WEBHOOK_API_KEY,
                                                    ...formData,
                                                    phone: `91${formData.phone}`,
                                                    date: new Date().toISOString(),
                                                    source: "Winter Art Royale Retro"
                                                })
                                            });
                                        } catch (e) {
                                            console.error("Webhook Error", e);
                                        }

                                        // GTM & Storage
                                        try {
                                            const nameParts = formData.name.trim().split(' ');
                                            const firstName = nameParts[0] || '';
                                            const lastName = nameParts.slice(1).join(' ') || '';
                                            const ageRange = formData.category === "Student" ? "Under 18" : "18+";

                                            (window as any).dataLayer = (window as any).dataLayer || [];
                                            (window as any).dataLayer.push({
                                                'event': 'war_registration_complete',
                                                'customer_first_name': firstName,
                                                'customer_last_name': lastName,
                                                'customer_email': formData.email,
                                                'customer_phone': `91${formData.phone}`,
                                                'customer_age': ageRange,
                                                'registration_category': formData.category,
                                                'art_form': formData.artType
                                            });
                                        } catch (e) {
                                            console.error("GTM Error", e);
                                        }

                                        const regData = { ...formData, id: `WAR2-${Math.floor(Math.random() * 90000) + 10000}`, date: new Date().toISOString() };
                                        localStorage.setItem('war_v2_registration', JSON.stringify(regData));

                                        // Supabase
                                        try {
                                            const { registerWinterArtUser } = await import('@/lib/db');
                                            await registerWinterArtUser({
                                                name: formData.name,
                                                email: formData.email,
                                                phone: formData.phone,
                                                category: formData.category,
                                                artType: formData.artType,
                                                registration_date: new Date().toISOString()
                                            });
                                        } catch (dbError) {
                                            console.error("Supabase Import/Execution Error:", dbError);
                                        }

                                        await new Promise(r => setTimeout(r, 1000));
                                        navigate('/winterartroyale/artcontest/thank-you');
                                    }}
                                    disabled={isLoading}
                                    className="w-full"
                                    variant="primary"
                                >
                                    CONFIRM ENLISTMENT
                                </RetroButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
