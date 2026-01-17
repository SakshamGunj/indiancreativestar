
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronRight, ArrowLeft, ShieldCheck, BadgeCheck, Flame } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function WarRegistrationPageV2() {
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

    // 🦁 Dynamic Metadata Manager (Favicon, Title, social Preview)
    React.useEffect(() => {
        // 1. Update Title
        const originalTitle = document.title;
        document.title = "Register Now | Winter Art Royale V2";

        // 2. Update Favicon
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        let originalIcon = '';
        if (link) {
            originalIcon = link.href;
            link.href = 'https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg';
        }

        // 3. Update Meta Tags (Open Graph)
        const metaTags = {
            'og:title': "Register for Winter Art Royale | India's National Art Competition",
            'og:description': "Secure your spot in India's most prestigious art battle. Sign up now!",
            'og:image': "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
            'twitter:title': "Register for Winter Art Royale",
            'twitter:description': "Secure your spot in India's most prestigious art battle. Sign up now!",
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

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row font-sans selection:bg-blue-100">
            {/* Left Side - Visual & Context (Hidden on mobile) */}
            <div className="hidden md:flex w-1/2 bg-slate-50 relative flex-col justify-between p-12 border-r border-slate-200">
                <div className="absolute inset-0 bg-white/50"></div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-600 text-xs font-bold tracking-wider mb-6 shadow-sm">
                            Daami Event Presents
                        </div>
                        <h1 className="text-6xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900">
                            Winter<br />
                            <span className="text-blue-600">Art Royale</span>
                        </h1>
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
                                    alt="W.A.R Logo"
                                    className="w-20 h-20 rounded-full border-4 border-white shadow-xl"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Join Season 2</h3>
                                    <p className="text-slate-500 font-medium">National Art Championship</p>
                                </div>
                            </div>

                            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                                <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">37% of seats</span> already filled! Secure your spot in India's most prestigious art battle.
                            </p>

                            <div className="flex flex-wrap gap-3 text-sm font-medium">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-slate-700">
                                    <BadgeCheck className="w-5 h-5 text-blue-500" /> Verified
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-slate-700">
                                    <ShieldCheck className="w-5 h-5 text-green-500" /> Trusted
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-slate-700">
                                    <Flame className="w-5 h-5 text-orange-500" /> Trending
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative bg-white">
                <button
                    onClick={() => navigate('/winterartroyale/v2')}
                    className="absolute top-6 left-6 md:top-12 md:left-12 z-50 text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Event
                </button>

                <div className="w-full max-w-md space-y-8 relative z-10 mt-12 md:mt-0">
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest">Step {step} of 2</span>
                            <span className="text-xs font-mono font-bold text-slate-400">{Math.round((step / 2) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-600"
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
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Personal Details</h3>
                                    <p className="text-slate-500 text-sm">Let's get you registered.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-slate-500 uppercase font-bold tracking-wide">Full Name</Label>
                                        <Input
                                            value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 h-12 rounded-lg"
                                            placeholder="Enter your full name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-slate-500 uppercase font-bold tracking-wide">Email</Label>
                                        <Input
                                            value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 h-12 rounded-lg"
                                            placeholder="your@email.com" type="email"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-slate-500 uppercase font-bold tracking-wide">WhatsApp Number</Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-2">
                                                <span className="text-slate-600 font-bold text-sm">+91</span>
                                            </div>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    handleInputChange("phone", val);
                                                }}
                                                className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 h-12 rounded-lg pl-16 tracking-widest font-mono text-lg"
                                                placeholder="XXXXXXXXXX"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={() => {
                                    if (formData.phone.length !== 10) {
                                        toast({ title: "Invalid Phone", description: "Please enter a 10-digit number.", variant: "destructive" });
                                        return;
                                    }
                                    handleNext();
                                }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 rounded-xl shadow-lg shadow-slate-900/10">
                                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>

                                {/* MOBILE URGENCY FOOTER (V2 Light Theme) */}
                                <div className="md:hidden pt-6 mt-6 border-t border-slate-200 flex flex-col items-center text-center space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
                                        <img
                                            src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
                                            alt="W.A.R Logo"
                                            className="w-16 h-16 rounded-full border-2 border-white shadow-lg relative z-10"
                                        />
                                    </div>

                                    <p className="text-sm leading-tight text-slate-600 max-w-xs mx-auto">
                                        <span className="text-blue-600 font-extrabold block mb-1">Join Now!</span>
                                        <span className="font-bold text-red-500">37% of seats</span> are already filled due to huge demand !!
                                    </p>

                                    <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                            <BadgeCheck className="w-3.5 h-3.5 text-blue-500" /> Verified
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Trusted
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                            <Flame className="w-3.5 h-3.5 text-orange-500" /> Trending
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-900" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Back</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Select Category</h3>
                                    <p className="text-slate-500 text-sm">Choose your level and medium.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => handleInputChange("category", "Student")}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${formData.category === "Student" ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        <div className="font-bold text-base mb-1 text-slate-900">Student</div>
                                        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Under 18 Years</div>
                                        {formData.category === "Student" && <div className="absolute top-2 right-2"><CheckCircle className="w-4 h-4 text-blue-600" /></div>}
                                    </div>
                                    <div
                                        onClick={() => handleInputChange("category", "Professional")}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${formData.category === "Professional" ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        <div className="font-bold text-base mb-1 text-slate-900">Professional</div>
                                        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">18+ Years</div>
                                        {formData.category === "Professional" && <div className="absolute top-2 right-2"><CheckCircle className="w-4 h-4 text-blue-600" /></div>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs text-slate-500 uppercase font-bold tracking-wide">Art Form</Label>
                                    <Select onValueChange={(val) => handleInputChange("artType", val)}>
                                        <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 h-12 rounded-lg">
                                            <SelectValue placeholder="Select Art Form" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="traditional">Traditional (Paint/Sketch)</SelectItem>
                                            <SelectItem value="digital">Digital Art</SelectItem>
                                            <SelectItem value="mixed">Mixed Media</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={async () => {
                                        if (!formData.category || !formData.artType) {
                                            toast({ title: "Required", description: "Please complete selection.", variant: "destructive" });
                                            return;
                                        }

                                        setIsLoading(true);

                                        try {
                                            const PERISKOPE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYTBhZWFmMDUtNWIyZC00ZjEyLWIxN2MtYTU3ZDY4ZWRhNTA3IiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiZGFhbWlldmVudCIsICJleHAiIDogMjA4Mzg0MTkzMSwgImlhdCIgOiAxNzY4MzA5MTMxLCAic3ViIiA6ICJlYTU1NzRhNC0wM2QyLTQzNzktODRjMC0zOTAxYTdkOGQwZTAiLCAiaXNzIiA6ICJwZXJpc2tvcGUuYXBwIiwgIm1ldGFkYXRhIiA6IHsic2NvcGVzIjogWyI5MTk2MzU5MDgzNThAYy51cyJdfX0.jeLLE6lEEztv1krpler0MKy9HrA3y6KT5tD8CbMJlMs";
                                            const senderPhone = "919635908358"; // Source number
                                            const recipientPhone = `91${formData.phone}`; // Recipient number with code

                                            console.log("SENDING WHATSAPP...", { recipientPhone });

                                            // Send WhatsApp via Periskope
                                            const waRes = await fetch("https://api.periskope.app/v1/message/send", {
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
                                            const waData = await waRes.json();
                                            console.log("WHATSAPP SENT SUCCESS:", waData);
                                        } catch (e) {
                                            console.error("WhatsApp Error", e);
                                        }

                                        try {
                                            // Make.com Webhook
                                            console.log("SENDING WEBHOOK DATA...", formData);
                                            const WEBHOOK_API_KEY = "A7fQ3ZLJ9X8T2C5sM4B6NPRDYEwWmKHVdG";
                                            const hookRes = await fetch("https://hook.eu2.make.com/s5mj9oty5l53yjoguhjjpne8c20a9tay", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    api_key: WEBHOOK_API_KEY,
                                                    ...formData,
                                                    phone: `91${formData.phone}`,
                                                    date: new Date().toISOString(),
                                                    source: "Winter Art Royale V2"
                                                })
                                            });
                                            const hookText = await hookRes.text();
                                            console.log("WEBHOOK SUCCESS:", hookText);
                                        } catch (e) {
                                            console.error("Webhook Error", e);
                                        }

                                        // 🟢 GTM DATA LAYER PUSH
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
                                            console.log("GTM Data Layer Pushed");
                                        } catch (e) {
                                            console.error("GTM Error", e);
                                        }

                                        // Store Data
                                        const regData = { ...formData, id: `WAR2-${Math.floor(Math.random() * 90000) + 10000}`, date: new Date().toISOString() };
                                        localStorage.setItem('war_v2_registration', JSON.stringify(regData));

                                        // 🦁 SUPABASE INTEGRATION
                                        try {
                                            const { registerWinterArtUser } = await import('@/lib/db');
                                            const dbRes = await registerWinterArtUser({
                                                name: formData.name,
                                                email: formData.email,
                                                phone: formData.phone,
                                                category: formData.category,
                                                artType: formData.artType, // Will be mapped to 'art_form' in db.ts
                                                registration_date: new Date().toISOString()
                                            });

                                            if (dbRes.success) {
                                                console.log("Supabase Registration Success:", dbRes.id);
                                            } else {
                                                console.error("Supabase Registration Failed:", dbRes.error);
                                                // Optional: Show toast or handle error
                                            }
                                        } catch (dbError) {
                                            console.error("Supabase Import/Execution Error:", dbError);
                                        }

                                        // Wait a bit
                                        await new Promise(r => setTimeout(r, 1000));

                                        navigate('/winterartroyale/v2/thank-you');
                                    }}
                                    disabled={isLoading}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold h-14 rounded-xl shadow-lg shadow-green-900/10"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Registration"}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div >
    );
}
