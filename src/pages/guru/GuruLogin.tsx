import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus, LogIn } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const GuruLogin = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [institute, setInstitute] = useState('');

    const handleAuth = async () => {
        if (!email || !password) {
            toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
            return;
        }

        if (isRegistering && (!name || !phone)) {
            toast({ title: "Error", description: "Name and Phone are required for registration", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            if (isRegistering) {
                // REGISTER
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const guruData = {
                    uid: userCredential.user.uid,
                    name,
                    email,
                    phone,
                    institute: institute || 'Independent',
                    createdAt: new Date().toISOString(),
                    totalEarnings: 0,
                    totalStudents: 0
                };

                await setDoc(doc(db, "gurus", userCredential.user.uid), guruData);
                toast({ title: "Welcome, Guru!", description: "Your account has been created." });
            } else {
                // LOGIN
                await signInWithEmailAndPassword(auth, email, password);
                toast({ title: "Welcome back!", description: "Successfully logged in." });
            }

            navigate('/guru/dashboard');
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Authentication Failed",
                description: error.message || "Something went wrong",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0f] to-[#0a0a0f] pointer-events-none"></div>

            <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl relative z-10">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-white tracking-tight">
                        {isRegistering ? 'Become a Guru' : 'Guru Portal'}
                    </CardTitle>
                    <CardDescription className="text-white/50">
                        {isRegistering ? 'Join the network of elite art educators' : 'Login to manage your students & commissions'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isRegistering && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-white/80">Full Name</Label>
                                <Input
                                    value={name} onChange={e => setName(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500/50"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/80">Phone Number</Label>
                                <Input
                                    value={phone} onChange={e => setPhone(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500/50"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/80">Institute Name (Optional)</Label>
                                <Input
                                    value={institute} onChange={e => setInstitute(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500/50"
                                    placeholder="Art School / Academy"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label className="text-white/80">Email Address</Label>
                        <Input
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500/50"
                            placeholder="guru@example.com"
                            type="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Password</Label>
                        <Input
                            value={password} onChange={e => setPassword(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500/50"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>

                    <Button
                        onClick={handleAuth}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold h-11"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? 'Register as Guru' : 'Login Dashboard')}
                    </Button>

                    <p className="text-xs text-center text-white/40 mt-4 cursor-pointer hover:text-white transition-colors" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Can't find it?"}
                        <span className="text-purple-400 ml-1 font-bold">{isRegistering ? 'Login' : 'Join Now'}</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuruLogin;
