
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronRight, Upload, Trophy, ShieldCheck, Crown, Star, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { uploadToSupabase } from "@/lib/storage";
import { addArtworkSubmission } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { storeStartFiles, getStoredFiles, clearStoredFiles } from "@/lib/fileStore";

// Pricing Plans
// Pricing Plans
const PLANS = [
    {
        id: "RisingStar",
        name: "Rising Star",
        price: 299,
        maxArtworks: 1,
        features: ["Submit 1 Masterpiece", "Digital Artist Certificate", "Participation Badge", "Official Entry"],
        color: "blue",
        badge: "Entry Level"
    },
    {
        id: "EliteArtist",
        name: "Elite Artist",
        price: 499,
        maxArtworks: 2,
        features: ["Submit 2 Masterpieces", "Hardcopy Certificate (Sent Home)", "Verified Artist Batch", "Priority Jury Review", "Double Winning Chances"],
        color: "yellow",
        badge: "Best Value"
    }
];

export default function WarSubmission() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Processing...");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        planId: ""
    });
    const [files, setFiles] = useState<File[]>([]);

    const selectedPlan = PLANS.find(p => p.id === formData.planId);

    // --- Step 1: Identity ---
    const handleNextStep1 = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            toast({ title: "Details Missing", description: "Please fill in all details.", variant: "destructive" });
            return;
        }
        if (formData.phone.length !== 10) {
            toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit Indian mobile number.", variant: "destructive" });
            return;
        }
        setStep(2);
    };

    // --- Step 2: Plan Selection ---
    const handleSelectPlan = (planId: string) => {
        setFormData(prev => ({ ...prev, planId }));
        setStep(3);
    };

    // --- Step 3: Artwork Upload ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const max = selectedPlan?.maxArtworks || 1;

            if (files.length + newFiles.length > max) {
                toast({ title: "Limit Exceeded", description: `You can only upload ${max} artworks for this plan.`, variant: "destructive" });
                return;
            }

            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handlePayment = async () => {
        if (!selectedPlan) return;
        if (files.length === 0) {
            toast({ title: "No Artwork", description: "Please upload at least one artwork.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        setLoadingText("Securing Payment...");

        try {
            // 🛑 1. STORE FILES LOCALLY (IndexedDB)
            // We do NOT upload yet. We save them to browser DB so we can retrieve them after redirect.
            await storeStartFiles(files);

            // 2. SECURE SERVER-SIDE PAYMENT (Via Supabase Edge Function)
            const edgeFuncUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-cashfree-order`;
            const returnUrlBase = `${window.location.origin}/winterartroyale/submission`;

            const response = await fetch(edgeFuncUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderAmount: selectedPlan.price,
                    customerName: formData.name,
                    customerPhone: formData.phone,
                    customerEmail: formData.email,
                    returnUrlBase: returnUrlBase
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Payment initiation failed at server.");
            }

            const orderData = await response.json();

            if (orderData.payment_session_id) {
                // 💾 SAVE METADATA TO LOCAL STORAGE (Persists across tab closes)
                localStorage.setItem("war_submission_pending", JSON.stringify({
                    formData,
                    planId: formData.planId,
                    orderId: orderData.order_id
                }));

                // Initialize Cashfree
                const cashfree = new (window as any).Cashfree({
                    mode: "sandbox" // Change to "production" when live
                });

                cashfree.checkout({
                    paymentSessionId: orderData.payment_session_id,
                    redirectTarget: "_self"
                });
            } else {
                console.error("Cashfree Error:", orderData);
                toast({ title: "Payment Init Failed", description: "Invalid session ID received.", variant: "destructive" });
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Submission Error:", error);
            toast({ title: "Error", description: "Something went wrong. Check console.", variant: "destructive" });
            setIsLoading(false);
        }
    };

    // --- Validation & Final Submission on Return ---
    React.useEffect(() => {
        // 1. Check for Existing Completion (Welcome Back)
        const previousSuccess = localStorage.getItem("war_completed_submission");
        if (previousSuccess) {
            const data = JSON.parse(previousSuccess);
            // Re-hydrate state to show success screen
            setFormData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                planId: data.planId
            });
            // We can add a new state for "viewing existing" if needed, 
            // but for now, we can piggyback on paymentSuccess or a similar state.
            // Let's store the artworks to display them.
            // We need a state for "existingArtworks" or similar.
            setExistingArtworks(data.artworks || []);
            setExistingOrderId(data.orderId);
            setPaymentSuccess(true);
            return;
        }

        // 2. Check for Pending Payment Return
        const query = new URLSearchParams(window.location.search);
        const orderId = query.get("order_id");

        if (orderId) {
            const pendingData = localStorage.getItem("war_submission_pending");
            if (pendingData) {
                const parsed = JSON.parse(pendingData);
                // Security Check: Match Order IDs
                if (parsed.orderId === orderId) {
                    finalizeSubmission(orderId, parsed);
                }
            } else {
                // Potential Recovery: Check if files persist in IDB but metadata lost?
                // For now, if metadata lost, we can't link plan/user.
            }
        }
    }, []);

    const [existingArtworks, setExistingArtworks] = useState<string[]>([]);
    const [existingOrderId, setExistingOrderId] = useState<string>("");

    const [isVerifying, setIsVerifying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [finalizingStep, setFinalizingStep] = useState(0); // 0: Verify, 1: Submit DB, 2: Done

    const finalizeSubmission = async (orderId: string, savedData: any) => {
        setIsVerifying(true);
        setFinalizingStep(0); // Verifying Payment

        try {
            // 1. Verify Payment (Simulation or Edge Function)
            // Here we assume Success if redirected. In Prod, call /verify endpoint.
            await new Promise(r => setTimeout(r, 800)); // UX Delay

            setFinalizingStep(1); // Submitting Artworks (Animation)

            // 1.5 UPLOAD FILES FROM INDEXED DB
            // The files are waiting in IndexedDB. We need to upload them now.
            const files = await getStoredFiles();
            let uploadedUrls: string[] = [];

            if (files && files.length > 0) {
                uploadedUrls = await Promise.all(files.map(file => uploadToSupabase(file)));
            } else {
                console.warn("No files found in IndexedDB for upload.");
            }

            // 2. Create DB Record NOW
            const selectedPlanDetails = PLANS.find(p => p.id === savedData.planId);

            const submissionRes = await addArtworkSubmission({
                name: savedData.formData.name,
                email: savedData.formData.email,
                phone: savedData.formData.phone,
                plan_type: savedData.planId,
                amount_paid: selectedPlanDetails?.price || 0,
                // We create it with PAID status immediately since we verified
            });

            if (!submissionRes.success || !submissionRes.id) {
                throw new Error("Failed to create submission record.");
            }

            // 3. Link Artworks & Order ID & Status
            const { error: updateError } = await supabase
                .from('artwork_submissions')
                .update({
                    payment_status: 'PAID',
                    order_id: orderId,
                    artworks: uploadedUrls
                })
                .eq('id', submissionRes.id);

            if (updateError) throw updateError;

            // Clear Session
            sessionStorage.removeItem("war_submission_pending");

            // 💾 SAVE SUCCESS STATE PERMANENTLY (For "Welcome Back" Dashboard)
            const completedData = {
                name: savedData.formData.name,
                email: savedData.formData.email, // Added email
                phone: savedData.formData.phone, // Added phone
                orderId: orderId,
                planId: savedData.planId,
                artworks: uploadedUrls, // Save the actual URLs
                timestamp: new Date().toISOString()
            };
            localStorage.setItem("war_completed_submission", JSON.stringify(completedData));

            setFinalizingStep(2); // Done

            // ⚡ UPDATE STATE FOR IMMEDIATE VIEW (Fixes generic placeholders)
            setExistingArtworks(uploadedUrls || []);
            setExistingOrderId(orderId);
            // formData is already set, so name/plan will work fine.

            setPaymentSuccess(true);

            // 🛡️ Fix Back Button Issue: Clean URL & Push State
            // 1. Clean the URL first
            const cleanUrl = window.location.pathname;
            window.history.replaceState(null, "", cleanUrl);

            // 2. Push state multiple times to "trap" the back button on this success page
            window.history.pushState(null, "", cleanUrl);
            window.history.pushState(null, "", cleanUrl);

            // 3. Add listener to force stay on page if they try to go back
            window.onpopstate = function () {
                window.history.pushState(null, "", cleanUrl);
            };

            toast({ title: "Submission Complete!", description: "See you in the Arena.", className: "bg-green-600 text-white" });

        } catch (e) {
            console.error("Finalization Error", e);
            toast({ title: "Submission Failed", description: "Payment was successful but submission failed. Please contact support with Order ID: " + orderId, variant: "destructive" });
        } finally {
            setIsVerifying(false); // Only set false if we error or finish. 
            // If success, we render success screen which handles UI
        }
    };

    // 1. Verifying / Submitting Loader
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
                <div className="bg-slate-900 text-white py-12 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="Logo" className="w-16 h-16 rounded-full border-2 border-white mx-auto mb-4 shadow-xl" />
                        <h1 className="text-3xl md:text-5xl font-black mb-2">Submit Your Masterpiece</h1>
                        <p className="text-slate-400 text-lg">Winter Art Royale • Official Submission Portal</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto -mt-8 relative z-20 px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                            <h2 className="text-2xl font-black text-slate-900 mb-2">
                                {finalizingStep === 0 ? "Verifying Payment..." : "Submitting Artworks..."}
                            </h2>
                            <p className="text-slate-500 text-center max-w-xs">
                                {finalizingStep === 0
                                    ? "Confirming transaction with the bank."
                                    : "Storing your masterpieces in the vault."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Premium Success / Dashboard Screen
    if (paymentSuccess) {
        // Fallback: If formData.planId is empty (rare), try to get it from storage or params
        const effectivePlanId = formData.planId || (localStorage.getItem("war_completed_submission") ? JSON.parse(localStorage.getItem("war_completed_submission")!).planId : null);
        const planName = PLANS.find(p => p.id === effectivePlanId)?.name || "Participant";

        const displayOrderId = new URLSearchParams(window.location.search).get("order_id") || existingOrderId;

        return (
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
                <div className="bg-slate-900 text-white py-12 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto pt-6">
                        <p className="tracking-[0.2em] uppercase text-xs md:text-sm font-bold text-blue-400 mb-3 animate-pulse">Daami Event Presents</p>
                        <h1 className="text-3xl md:text-6xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
                            Winter Art Royale
                        </h1>
                        <p className="text-slate-400 text-sm md:text-lg font-medium">Official Submission Portal • Season 2</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto -mt-8 relative z-20 px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full max-w-lg"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
                                    <Crown className="w-12 h-12 text-white fill-white" />
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
                                    {existingArtworks.length > 0 ? `Welcome Back, ${formData.name.split(' ')[0]}!` : "ENTRY CONFIRMED"}
                                </h2>
                                <p className="text-slate-500 text-lg mb-8">
                                    {existingArtworks.length > 0 ? "Here is your warrior profile and submissions." : "Your artwork has been submitted to the vault."}
                                </p>

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 text-left space-y-3">
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <span className="text-slate-500 text-sm uppercase font-bold tracking-wider">Status</span>
                                        <span className="text-green-600 font-bold flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full text-xs"><CheckCircle className="w-3 h-3" /> PAID & SUBMITTED</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <span className="text-slate-500 text-sm uppercase font-bold tracking-wider">Plan</span>
                                        <span className="text-slate-900 font-bold">{planName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 text-sm uppercase font-bold tracking-wider">Order ID</span>
                                        <span className="text-slate-900 font-mono text-sm">{displayOrderId || "WAR_XXXX"}</span>
                                    </div>
                                </div>

                                {/* Show Submitted Artworks */}
                                {(existingArtworks.length > 0) && (
                                    <div className="mb-8">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Your Vault Assets</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {existingArtworks.map((url, idx) => (
                                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-square">
                                                    <img src={url} alt={`Submission ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <a href={url} target="_blank" rel="noreferrer" className="text-white text-xs font-bold border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">View</a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <Button onClick={() => window.location.href = "/winterartroyale/v2"} className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white">
                                        Return to Arena
                                    </Button>
                                    <Button variant="ghost" className="w-full text-slate-400 hover:text-red-500 text-xs" onClick={() => {
                                        if (confirm("Are you sure? This will verify a new submission.")) {
                                            localStorage.removeItem("war_completed_submission");
                                            window.location.reload();
                                        }
                                    }}>
                                        Submit Another Entry (Reset)
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-12 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto pt-6">
                    <p className="tracking-[0.2em] uppercase text-xs md:text-sm font-bold text-blue-400 mb-3 animate-pulse">Daami Event Presents</p>
                    <img src="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white mx-auto mb-4 shadow-xl" />
                    <h1 className="text-3xl md:text-6xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
                        Winter Art Royale
                    </h1>
                    <p className="text-slate-400 text-sm md:text-lg font-medium">Official Submission Portal • Season 2</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto -mt-8 relative z-20 px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">

                    {/* Progress Bar (Mobile Optimized) */}
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 overflow-x-auto scrollbar-hide">
                        <div className={`flex items-center gap-1 md:gap-2 whitespace-nowrap ${step >= 1 ? 'text-blue-600' : ''}`}>
                            <span className="bg-slate-200 text-slate-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] md:hidden">1</span>
                            <span className="hidden md:inline">1. Identity</span>
                        </div>
                        <div className={`h-px w-4 md:w-8 flex-1 bg-slate-200 mx-2 ${step >= 2 ? 'bg-blue-600' : ''}`}></div>

                        <div className={`flex items-center gap-1 md:gap-2 whitespace-nowrap ${step >= 2 ? 'text-blue-600' : ''}`}>
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] md:hidden ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                            <span className="hidden md:inline">2. Battle Plan</span>
                        </div>
                        <div className={`h-px w-4 md:w-8 flex-1 bg-slate-200 mx-2 ${step >= 3 ? 'bg-blue-600' : ''}`}></div>

                        <div className={`flex items-center gap-1 md:gap-2 whitespace-nowrap ${step >= 3 ? 'text-blue-600' : ''}`}>
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] md:hidden ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                            <span className="hidden md:inline">3. Arsenal</span>
                        </div>
                        <div className={`h-px w-4 md:w-8 flex-1 bg-slate-200 mx-2 ${step >= 4 ? 'bg-blue-600' : ''}`}></div>

                        <div className={`flex items-center gap-1 md:gap-2 whitespace-nowrap ${step >= 4 ? 'text-blue-600' : ''}`}>
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] md:hidden ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
                            <span className="hidden md:inline">4. Treasury</span>
                        </div>
                    </div>

                    <div className="p-4 md:p-8">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: IDENTITY */}
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">Who are you, Artist?</h2>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" className="h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email Address</Label>
                                            <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" type="email" className="h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone Number</Label>
                                            <div className="flex items-center border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-slate-900 focus-within:ring-offset-2 transition-all">
                                                <div className="bg-slate-100 px-3 py-3 flex items-center gap-2 border-r border-slate-200">
                                                    <span className="text-xl">🇮🇳</span>
                                                    <span className="font-bold text-slate-700">+91</span>
                                                </div>
                                                <Input
                                                    value={formData.phone}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                        setFormData({ ...formData, phone: val });
                                                    }}
                                                    placeholder="Enter 10-digit mobile number"
                                                    type="tel"
                                                    className="h-12 border-none focus-visible:ring-0 rounded-none px-4 text-lg tracking-wide"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={handleNextStep1} className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800">
                                        Next: Choose Plan <ChevronRight className="ml-2" />
                                    </Button>
                                </motion.div>
                            )}

                            {/* STEP 2: PLANS */}
                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">Select Your Tier</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {PLANS.map(plan => (
                                            <div key={plan.id} onClick={() => handleSelectPlan(plan.id)}
                                                className={`cursor-pointer border-2 rounded-xl p-6 transition-all hover:scale-[1.01] relative overflow-hidden group
                                                ${plan.color === 'yellow' ? 'border-yellow-400 bg-yellow-50/50 hover:bg-yellow-50' :
                                                        plan.color === 'purple' ? 'border-purple-400 bg-purple-50/50 hover:bg-purple-50' :
                                                            'border-blue-200 bg-white hover:border-blue-400'}`}>

                                                {plan.badge && (
                                                    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-bl-lg
                                                        ${plan.color === 'yellow' ? 'bg-yellow-600' : plan.color === 'purple' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                                                        {plan.badge}
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                                        <div className="text-sm text-slate-500 font-medium">{plan.maxArtworks} Artwork Submission(s)</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-slate-900">₹{plan.price}</div>
                                                        <div className="text-[10px] text-slate-400 uppercase">per entry</div>
                                                    </div>
                                                </div>
                                                <ul className="space-y-2">
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                                            <CheckCircle className={`w-4 h-4 ${plan.color === 'yellow' ? 'text-yellow-600' : plan.color === 'purple' ? 'text-purple-600' : 'text-blue-500'}`} />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 & 4: UPLOAD & PAY */}
                            {step === 3 && selectedPlan && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <h2 className="text-2xl font-bold text-slate-900">Upload Arsenal</h2>
                                        <span onClick={() => setStep(2)} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Change Plan ({selectedPlan.name})</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {/* Hidden Input Triggered by Cards */}
                                        <Input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />

                                        {[...Array(selectedPlan.maxArtworks || 1)].map((_, index) => {
                                            const file = files[index];
                                            return (
                                                <div key={index} className="aspect-square relative group">
                                                    {file ? (
                                                        // FILLED SLOT
                                                        <div className="w-full h-full rounded-xl overflow-hidden border-2 border-slate-200 relative bg-slate-900">
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                                className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-75"
                                                            />
                                                            <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 flex items-center justify-between">
                                                                <div className="overflow-hidden">
                                                                    <p className="text-white text-xs font-bold truncate">{file.name}</p>
                                                                    <p className="text-slate-400 text-[10px] uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                                                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                                Artwork {index + 1}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // EMPTY SLOT
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="w-full h-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-slate-400"
                                                        >
                                                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                                                                <Upload className="w-6 h-6" />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-sm font-bold group-hover:text-blue-600">Upload Artwork {index + 1}</p>
                                                                <p className="text-[10px] uppercase tracking-wider opacity-60">Click to Select</p>
                                                            </div>
                                                        </label>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-slate-600 font-medium">Total Payable</span>
                                            <span className="text-3xl font-black text-slate-900">₹{selectedPlan.price}</span>
                                        </div>
                                        <Button onClick={handlePayment} disabled={isLoading || files.length === 0} className="w-full h-16 text-xl font-bold bg-green-600 hover:bg-green-500 shadow-xl shadow-green-900/10 rounded-xl">
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    {loadingText}
                                                </div>
                                            ) : `Pay ₹${selectedPlan.price} & Submit`}
                                        </Button>
                                        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> Secure Payment via Cashfree
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
