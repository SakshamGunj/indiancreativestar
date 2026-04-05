
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CreditCard, Loader2, ChevronRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WarRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useNavigate } from "react-router-dom";

// ... existing imports

export const WarRegistrationModal = ({ isOpen, onClose }: WarRegistrationModalProps) => {
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

    // Reset form when modal closes
    const handleClose = () => {
        setStep(1);
        setFormData({ name: "", email: "", phone: "", category: "", artType: "" });
        onClose();
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
                amount: formData.category === 'Student' ? '299' : '499', // Simplified logic, can be refined
                status: 'Paid',
                date: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem('war_registrations') || '[]');
            localStorage.setItem('war_registrations', JSON.stringify([registration, ...existing]));

            // Redirect to Thank You Page on success
            handleClose(); // Close and reset modal
            navigate('/winter-art-royale/thank-you');
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md md:max-w-lg bg-[#0F0F15] border border-blue-500/20 text-white p-0 overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.1)]">

                {/* Top Progress Bar */}
                {/* Top Progress Bar */}
                <div className="bg-[#0a0a1a] px-6 py-5 border-b border-white/5 pr-14 relative">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Registration Process</span>
                            <span className="text-xs font-bold text-white/50 font-mono tracking-wider">{Math.round((step / 3) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>
                </div>

                {/* Minimal Header */}
                <div className="px-6 pt-6 pb-2">
                    <h2 className="font-bilderberg text-3xl text-white">ENLIST FOR W.A.R</h2>
                    <p className="text-blue-400/60 text-sm">Winter Art Royale · Season 2</p>
                </div>

                {/* Form Body */}
                <div className="p-6 pt-2">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: Personal Details */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-5"
                            >
                                <div className="space-y-1 mb-4">
                                    <h3 className="text-lg font-bold text-white">Identity Verification</h3>
                                    <p className="text-xs text-white/50">Enter your official details for the roster.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/60 uppercase font-bold tracking-wide">Full Name</Label>
                                        <Input
                                            value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg transition-all font-medium" placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/60 uppercase font-bold tracking-wide">Email Address</Label>
                                        <Input
                                            value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg transition-all font-medium" placeholder="your@email.com" type="email"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-white/60 uppercase font-bold tracking-wide">Phone Number</Label>
                                        <Input
                                            value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-blue-500 focus:bg-blue-500/5 text-white h-12 rounded-lg transition-all font-medium" placeholder="+91 XXXXX XXXXX" type="tel"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleNext} className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 text-base rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Next Phase <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 2: Category Selection */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center gap-2 mb-2 cursor-pointer text-white/40 hover:text-white transition-colors w-fit" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4" /> <span className="text-xs uppercase font-bold">Back</span>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <h3 className="text-lg font-bold text-white">Choose Your Weapon</h3>
                                    <p className="text-xs text-white/50">Select your artistic discipline.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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

                                <div className="space-y-1.5 mt-2">
                                    <Label className="text-xs text-white/60 uppercase font-bold tracking-wide">Art Form</Label>
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

                                <Button onClick={handleNext} className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 text-base rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Proceed to Payment <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 3: Payment */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 mb-2 cursor-pointer text-white/40 hover:text-white transition-colors w-fit" onClick={() => setStep(2)}>
                                    <ArrowLeft className="w-4 h-4" /> <span className="text-xs uppercase font-bold">Back</span>
                                </div>

                                <div className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Registration Fee</span>
                                        <span className="font-mono">₹499.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Category</span>
                                        <span className="font-bold text-blue-300">{formData.category || "Standard"}</span>
                                    </div>
                                    <div className="h-px bg-white/10 w-full my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-white uppercase tracking-wide text-sm">Total Payable</span>
                                        <span className="font-mono text-2xl text-green-400 font-bold">₹499<span className="text-sm text-green-400/60">.00</span></span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold h-14 text-base rounded-xl shadow-[0_0_30px_rgba(22,163,74,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</>
                                    ) : (
                                        <><CreditCard className="w-5 h-5 mr-2" /> Pay & Join The Battle</>
                                    )}
                                </Button>
                                <div className="flex flex-col items-center justify-center gap-2 mt-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest font-medium">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Secure Payment Gateway
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-3" />
                                        <span className="text-[10px] text-white/60">Verified Merchant</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6 space-y-6"
                            >
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bilderberg text-white mb-2">Welcome to the Frontlines!</h3>
                                    <p className="text-white/60 max-w-xs mx-auto text-sm leading-relaxed">Your registration for Winter Art Royale is confirmed. A confirmation email has been dispatched.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl mx-auto max-w-xs border border-white/5">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Combatant ID</p>
                                    <p className="font-mono text-xl text-blue-400 font-bold tracking-wider">WAR-{Math.floor(Math.random() * 10000)}</p>
                                </div>
                                <Button onClick={onClose} className="bg-white text-black hover:bg-blue-50 font-bold rounded-xl px-10 h-12 shadow-lg hover:shadow-white/20 transition-all">
                                    Return to Base
                                </Button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};
