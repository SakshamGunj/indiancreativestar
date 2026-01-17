import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CreditCard, Loader2, ChevronRight, ArrowLeft, ShieldCheck, BadgeCheck, Flame } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function WarRegistrationPage() {
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
            setStep(3);
        }
    };

    const handlePayment = async () => {
        setIsLoading(true);
        // Simulate payment gateway
        setTimeout(() => {
            setIsLoading(false);

            // SAVE DATA (Simulation)
            const registration = {
                id: `war_${Date.now()}`,
                ...formData,
                amount: formData.category === 'Student' ? '299' : '499',
                status: 'Paid',
                date: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem('war_registrations') || '[]');
            localStorage.setItem('war_registrations', JSON.stringify([registration, ...existing]));

            // Redirect to Thank You Page
            navigate('/winter-art-royale/thank-you');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white flex flex-col md:flex-row font-inter-display">
            {/* Left Side - Visual & Context (Hidden on mobile) */}
            <div className="hidden md:flex w-1/2 bg-[#050510] relative flex-col justify-between p-12 border-r border-white/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-900/10 mix-blend-overlay"></div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-200 text-xs font-bilderberg tracking-wider mb-6">
                            Daami Event Presents
                        </div>
                        <h1 className="font-bilderberg text-7xl leading-tight mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Winter</span><br />
                            <span className="text-white">Art Royale</span>
                        </h1>
                        {/* URGENCY CONTENT (Replaces old content) */}
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                                <img
                                    src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
                                    alt="W.A.R Logo"
                                    className="w-24 h-24 rounded-full border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] relative z-10"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-bilderberg text-white">
                                    <span className="text-yellow-400">Join Now!</span>
                                </h3>
                                <p className="text-xl text-white/90 max-w-md leading-relaxed">
                                    <span className="font-bold text-red-400">37% of seats</span> are already filled due to huge demand !!
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-blue-200/80 font-medium uppercase tracking-wider">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <BadgeCheck className="w-5 h-5 text-blue-400" /> Verified
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <ShieldCheck className="w-5 h-5 text-green-400" /> Trusted
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <Flame className="w-5 h-5 text-orange-400" /> Trending
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        {/* Empty or minimal footer if needed */}
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative overflow-hidden">
                {/* Back Button - Fixed Position in Container */}
                <button
                    onClick={() => navigate('/winter-art-royale')}
                    className="absolute top-6 left-6 md:top-12 md:left-12 z-50 text-white/50 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 hover:border-white/20"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {/* Mobile Background Effects */}
                <div className="absolute inset-0 bg-[#050510] md:hidden -z-10"></div>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="w-full max-w-md space-y-8 relative z-10 mt-12 md:mt-0">
                    {/* Header for Mobile */}
                    <div className="md:hidden mb-8 text-center">
                        <h2 className="font-bilderberg text-3xl text-white mb-2">Enlist for W.A.R</h2>
                        <p className="text-white/50 text-sm">Season 2 · Registration Phase</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Step {step} of 2</span>
                            <span className="text-xs font-mono font-bold text-white/50">{Math.round((step / 2) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 2) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* STEP 1: Personal Details */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bilderberg text-white mb-2">Identity Verification</h3>
                                    <p className="text-white/50 text-sm">Official roster details.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/50 uppercase font-bold tracking-wide">Full Name</Label>
                                        <Input
                                            value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg"
                                            placeholder="Enter your full name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/50 uppercase font-bold tracking-wide">Email</Label>
                                        <Input
                                            value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg"
                                            placeholder="your@email.com" type="email"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/50 uppercase font-bold tracking-wide">WhatsApp Number</Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-2">
                                                <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-auto rounded-sm" />
                                                <span className="text-blue-200 font-bold text-sm">+91</span>
                                            </div>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    handleInputChange("phone", val);
                                                }}
                                                className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg pl-20 tracking-widest font-mono text-lg"
                                                placeholder="XXXXXXXXXX"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={() => {
                                    if (formData.phone.length !== 10) {
                                        toast({
                                            title: "Invalid Phone Number",
                                            description: "Please type a 10 digit number.",
                                            variant: "destructive"
                                        });
                                        return;
                                    }
                                    handleNext();
                                }} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 rounded-xl shadow-lg shadow-blue-900/20">
                                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>

                                {/* MOBILE URGENCY FOOTER */}
                                <div className="md:hidden pt-6 mt-6 border-t border-white/10 flex flex-col items-center text-center space-y-4 animate-fade-in-up">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                                        <img
                                            src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
                                            alt="W.A.R Logo"
                                            className="w-16 h-16 rounded-full border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] relative z-10"
                                        />
                                    </div>

                                    <p className="text-sm leading-tight text-white/90 max-w-xs mx-auto">
                                        <span className="text-yellow-400 font-bold block mb-1">Join Now!</span>
                                        <span className="font-bold text-red-400">37% of seats</span> are already filled due to huge demand !!
                                    </p>

                                    <div className="flex items-center justify-center gap-4 text-[10px] text-blue-200/60 font-medium uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                            <BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> Verified
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Trusted
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                            <Flame className="w-3.5 h-3.5 text-orange-400" /> Trending
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Category */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-white" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Back</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bilderberg text-white mb-2">Choose Your Weapon</h3>
                                    <p className="text-white/50 text-sm">Select your battlefield.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => handleInputChange("category", "Student")}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${formData.category === "Student" ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/40' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                                    >
                                        <div className="font-bold text-base mb-1">Student</div>
                                        <div className={`text-[10px] uppercase tracking-wider font-bold ${formData.category === "Student" ? 'text-blue-200' : 'text-white/40'}`}>Under 18 Years</div>
                                        {formData.category === "Student" && <div className="absolute top-2 right-2"><CheckCircle className="w-4 h-4 text-white" /></div>}
                                    </div>
                                    <div
                                        onClick={() => handleInputChange("category", "Professional")}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${formData.category === "Professional" ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/40' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                                    >
                                        <div className="font-bold text-base mb-1">Professional</div>
                                        <div className={`text-[10px] uppercase tracking-wider font-bold ${formData.category === "Professional" ? 'text-blue-200' : 'text-white/40'}`}>18+ Years</div>
                                        {formData.category === "Professional" && <div className="absolute top-2 right-2"><CheckCircle className="w-4 h-4 text-white" /></div>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs text-white/50 uppercase font-bold tracking-wide">Art Form</Label>
                                    <Select onValueChange={(val) => handleInputChange("artType", val)}>
                                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-blue-500 text-white h-12 rounded-lg">
                                            <SelectValue placeholder="Select Art Form" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0f0f1a] border-white/10 text-white">
                                            <SelectItem value="traditional">Traditional (Paint/Sketch)</SelectItem>
                                            <SelectItem value="digital">Digital Art</SelectItem>
                                            <SelectItem value="mixed">Mixed Media</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={async () => {
                                        if (!formData.category || !formData.artType) {
                                            toast({
                                                title: "Selection Required",
                                                description: "Please select your category and art form.",
                                                variant: "destructive"
                                            });
                                            return;
                                        }

                                        setIsLoading(true);

                                        // 🟢 PERISKOPE WHATSAPP NOTIFICATION
                                        try {
                                            const PERISKOPE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYTBhZWFmMDUtNWIyZC00ZjEyLWIxN2MtYTU3ZDY4ZWRhNTA3IiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiZGFhbWlldmVudCIsICJleHAiIDogMjA4Mzg0MTkzMSwgImlhdCIgOiAxNzY4MzA5MTMxLCAic3ViIiA6ICJlYTU1NzRhNC0wM2QyLTQzNzktODRjMC0zOTAxYTdkOGQwZTAiLCAiaXNzIiA6ICJwZXJpc2tvcGUuYXBwIiwgIm1ldGFkYXRhIiA6IHsic2NvcGVzIjogWyI5MTk2MzU5MDgzNThAYy51cyJdfX0.jeLLE6lEEztv1krpler0MKy9HrA3y6KT5tD8CbMJlMs";
                                            const senderPhone = "919635908358";
                                            const recipientPhone = `91${formData.phone}`;

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
                                            console.log("WhatsApp notification sent via Periskope");
                                        } catch (error) {
                                            console.error("Failed to send WhatsApp notification:", error);
                                        }

                                        // 🔵 MAKE.COM WEBHOOK (EMAIL & DATA)
                                        try {
                                            const WEBHOOK_URL = "https://hook.eu2.make.com/s5mj9oty5l53yjoguhjjpne8c20a9tay";
                                            const WEBHOOK_API_KEY = "A7fQ3ZLJ9X8T2C5sM4B6NPRDYEwWmKHVdG";

                                            await fetch(WEBHOOK_URL, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    api_key: WEBHOOK_API_KEY,
                                                    name: formData.name,
                                                    email: formData.email,
                                                    phone: `91${formData.phone}`,
                                                    category: formData.category,
                                                    artType: formData.artType,
                                                    registrationDate: new Date().toISOString(),
                                                    source: "Winter Art Royale Web"
                                                })
                                            });
                                            console.log("Data sent to Make.com Webhook");
                                        } catch (error) {
                                            console.error("Failed to send data to Make.com:", error);
                                        }


                                        // Simulate minimal processing delay
                                        await new Promise(resolve => setTimeout(resolve, 1000));

                                        // Save registration data
                                        const pendingRegistration = { ...formData, id: `WAR-${Math.floor(Math.random() * 100000)}`, date: new Date().toISOString() };
                                        const existing = JSON.parse(localStorage.getItem('war_registrations') || '[]');
                                        localStorage.setItem('war_registrations', JSON.stringify([pendingRegistration, ...existing]));

                                        // Navigate directly to Thank You page
                                        navigate('/winter-art-royale/thank-you');
                                        setIsLoading(false);
                                    }}
                                    disabled={isLoading}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold h-14 rounded-xl shadow-lg shadow-green-900/20"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Finalizing...</>
                                    ) : (
                                        <><CheckCircle className="ml-2 w-4 h-4 mr-2" /> Submit & Join Battle</>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div >
    );
}
