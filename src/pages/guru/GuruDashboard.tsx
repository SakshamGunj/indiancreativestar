import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, Users, Wallet, Copy, LogOut } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const GuruDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [guruData, setGuruData] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Fetch Guru Data
                const docRef = doc(db, "gurus", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setGuruData(docSnap.data());
                }

                // Fetch Students
                try {
                    const q = query(collection(db, `gurus/${currentUser.uid}/students`), orderBy('createdAt', 'desc'));
                    const querySnapshot = await getDocs(q);
                    const studentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setStudents(studentList);
                } catch (err) {
                    console.error("Error fetching students", err);
                }
            } else {
                navigate('/guru/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/guru/login');
    };

    const copyReferralLink = () => {
        const link = `${window.location.origin}/winter-art-royale/register?ref=${user?.uid}`;
        navigator.clipboard.writeText(link);
        toast({ title: "Copied!", description: "Referral link copied to clipboard." });
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-500 animate-spin" /></div>;
    }

    const totalCommission = students.length * 75; // ₹75 per student (30% of ₹249)

    return (
        <div className="min-h-screen bg-[#020205] text-white font-['Inter'] selection:bg-purple-500/30">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 border-b border-white/5 bg-[#020205]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <span className="font-bilderberg font-bold text-white text-lg">G</span>
                            </div>
                            <div>
                                <h1 className="font-bilderberg text-xl text-white tracking-wide">Daami Event <span className="text-white/40 font-sans font-light">| Guru</span></h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right mr-2">
                                <p className="text-sm font-medium text-white">{guruData?.name}</p>
                                <p className="text-xs text-white/40">{guruData?.institute || 'Independent Guru'}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/5"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h2>
                        <p className="text-white/60">Manage your students and track your earnings.</p>
                    </div>
                    <Button
                        className="bg-white text-black hover:bg-white/90 font-medium px-6 h-12 rounded-full shadow-xl shadow-white/5 transition-all hover:scale-105 active:scale-95"
                        onClick={() => navigate('/guru/onboard')}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add New Student
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-[#0A0A0F] border-white/5 hover:border-purple-500/20 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full group-hover:bg-purple-600/20 transition-all"></div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/60 uppercase tracking-wider">Total Earnings</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-4xl font-bold text-white flex items-baseline gap-1 mt-1">
                                <span className="text-2xl text-white/40">₹</span>{totalCommission}
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md w-fit">
                                <Wallet className="w-3 h-3" />
                                <span>Pending Payout</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0A0A0F] border-white/5 hover:border-blue-500/20 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/60 uppercase tracking-wider">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-4xl font-bold text-white mt-1">
                                {students.length}
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md w-fit">
                                <Users className="w-3 h-3" />
                                <span>Registered</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0A0A0F] border-white/5 hover:border-green-500/20 transition-all duration-300 group overflow-hidden relative cursor-pointer" onClick={copyReferralLink}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 blur-[50px] rounded-full group-hover:bg-green-600/20 transition-all"></div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/60 uppercase tracking-wider">Referral Link</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex items-center justify-between gap-3 mt-1 group-hover:border-green-500/30 transition-colors">
                                <span className="text-sm text-white/80 font-mono truncate">winterart.../reg?ref={user?.uid?.slice(0, 6)}</span>
                                <Copy className="w-4 h-4 text-white/40 group-hover:text-green-400 transition-colors" />
                            </div>
                            <p className="text-[10px] text-white/40 mt-3 text-center uppercase tracking-widest">Click to copy link</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Students List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Recent Enrollments</h3>
                    <Card className="bg-[#0A0A0F] border-white/5 overflow-hidden">
                        <CardContent className="p-0">
                            {students.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-8 h-8 text-white/20" />
                                    </div>
                                    <h4 className="text-lg font-medium text-white mb-1">No students yet</h4>
                                    <p className="text-white/40 mb-6 max-w-sm mx-auto">Start building your roster by adding students manually or sharing your referral link.</p>
                                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5" onClick={() => navigate('/guru/onboard')}>
                                        Add First Student
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs uppercase bg-white/5 text-white/40 border-b border-white/5">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Student Name</th>
                                                <th className="px-6 py-4 font-medium">Contact</th>
                                                <th className="px-6 py-4 font-medium">Joined Date</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {students.map((student) => (
                                                <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-white">{student.name}</div>
                                                        <div className="text-xs text-white/40">{student.school}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-white/80">{student.parentPhone}</div>
                                                        <div className="text-xs text-white/40">{student.email || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-white/60">
                                                        {new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${student.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${student.paymentStatus === 'paid' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
                                                            {student.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-white/60"
                                                            onClick={() => {
                                                                const link = student.studentLink || `${window.location.origin}/student/${student.academySlug || 'academy'}/${student.studentSlug || 'student'}`;
                                                                navigator.clipboard.writeText(link);
                                                                toast({ title: "Link Copied", description: `Link for ${student.name} copied.` });
                                                            }}
                                                        >
                                                            <Copy className="w-3 h-3 mr-2" /> Link
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GuruDashboard;
