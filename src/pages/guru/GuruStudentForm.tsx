import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const GuruStudentForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [guruSchoolName, setGuruSchoolName] = useState<string>('');

    const [formData, setFormData] = useState({
        name: '',
        parentPhone: '',
        email: '',
        age: '',
        school: ''
    });

    useEffect(() => {
        const fetchGuruDetails = async () => {
            if (auth.currentUser) {
                setUser(auth.currentUser);
                try {
                    const guruDocRef = doc(db, "gurus", auth.currentUser.uid);
                    const guruDoc = await getDoc(guruDocRef);
                    if (guruDoc.exists()) {
                        setGuruSchoolName(guruDoc.data().schoolName || guruDoc.data().institute || 'Independent');
                    }
                } catch (error) {
                    console.error("Error fetching guru details:", error);
                }
            } else {
                navigate('/guru/login');
            }
        };
        fetchGuruDetails();
    }, [navigate]);

    const generateCleanSlug = (text: string, uniqueId?: string) => {
        const baseSlug = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return uniqueId ? `${baseSlug}-${uniqueId}` : baseSlug;
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.parentPhone || !formData.age) {
            toast({ title: "Incomplete Form", description: "Name, Phone and Age are required.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            // Generate Slugs
            const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
            const studentSlug = generateCleanSlug(formData.name, uniqueId);
            const academySlug = generateCleanSlug(guruSchoolName || 'independent-guru');

            // Construct the full link
            const studentLink = `${window.location.origin}/student/${academySlug}/${studentSlug}`;

            const studentData = {
                ...formData,
                createdAt: new Date().toISOString(),
                registeredBy: user.uid, // Guru ID
                status: 'registered',
                event: 'Winter Art Royale S2',
                fee: 249, // Fixed fee for now
                studentSlug: studentSlug,
                studentLink: studentLink,
                uniqueId: uniqueId,
                academySlug: academySlug
            };

            await addDoc(collection(db, `gurus/${user.uid}/students`), studentData);

            toast({ title: "Success!", description: "Student has been added to your roster." });
            navigate('/guru/dashboard');
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to add student.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white p-4 font-['Inter'] flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <Card className="w-full max-w-lg bg-[#0A0A0F] border-white/10 shadow-2xl relative z-10">
                <CardHeader className="border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white/50 hover:text-white hover:bg-white/5 rounded-full"
                            onClick={() => navigate('/guru/dashboard')}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <CardTitle className="text-xl font-bold text-white">Onboard New Student</CardTitle>
                            <CardDescription className="text-white/40 mt-1">Add student details manually to roster.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <Label className="text-white/80 text-sm font-medium">Student Full Name</Label>
                            <Input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/20 h-11 rounded-lg transition-all focus:bg-white/10"
                                placeholder="e.g. Aarav Patel"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label className="text-white/80 text-sm font-medium">Age</Label>
                                <Input
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/20 h-11 rounded-lg transition-all focus:bg-white/10"
                                    placeholder="e.g. 12"
                                    type="number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/80 text-sm font-medium">Parent Phone</Label>
                                <Input
                                    value={formData.parentPhone}
                                    onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/20 h-11 rounded-lg transition-all focus:bg-white/10"
                                    placeholder="+91..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white/80 text-sm font-medium">Email (Optional)</Label>
                            <Input
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/20 h-11 rounded-lg transition-all focus:bg-white/10"
                                placeholder="parent@example.com"
                                type="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white/80 text-sm font-medium">School Name</Label>
                            <Input
                                value={formData.school}
                                onChange={e => setFormData({ ...formData, school: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/20 h-11 rounded-lg transition-all focus:bg-white/10"
                                placeholder="School Name"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold h-12 rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5 mr-2" /> Add Student to Roster</>}
                        </Button>
                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40 bg-white/5 py-2 rounded-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            Wallet will be credited <span className="text-green-400 font-bold">₹75 (30%)</span> after registration.
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuruStudentForm;
