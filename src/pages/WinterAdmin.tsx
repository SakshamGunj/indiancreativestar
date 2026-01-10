
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Search, Download, Trash2, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWinterArtRegistrations } from "@/lib/firebase";

export default function WinterAdmin() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const result = await getWinterArtRegistrations();
        if (result.success && result.data) {
            setRegistrations(result.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        // Check session
        const session = sessionStorage.getItem('war_admin_session');
        if (session === 'active') {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const handleLogin = () => {
        if (password === "Ranchiitech1234@@") {
            setIsAuthenticated(true);
            sessionStorage.setItem('war_admin_session', 'active');
            fetchData();
        } else {
            alert("Access Denied: Invalid Password");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('war_admin_session');
    };

    // Filter logic
    const filteredData = registrations.filter(r =>
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats Calculation
    const totalRevenue = registrations.reduce((acc, curr) => {
        if (curr.paymentStatus === 'success') {
            return acc + (Number(curr.amountPaid) || 0);
        }
        return acc;
    }, 0);

    const successCount = registrations.filter(r => r.paymentStatus === 'success').length;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-[#0F0F20] border-white/10 text-white">
                    <CardHeader className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Lock className="w-8 h-8 text-blue-500" />
                        </div>
                        <CardTitle className="text-2xl font-bilderberg">W.A.R Admin Panel</CardTitle>
                        <p className="text-white/40 text-sm">Restricted Access. Authorized Personnel Only.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Enter Access Key"
                            className="bg-black/30 border-white/10 text-white placeholder:text-white/20"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleLogin}
                        >
                            Unlock Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full text-white/40 hover:text-white" onClick={() => navigate('/')}>
                            Return to Site
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050510] text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-bilderberg text-white mb-2">Winter Art Royale <span className="text-blue-500">Database</span></h1>
                        <p className="text-white/40">Manage event registrations and participant data.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Button variant="outline" size="icon" onClick={fetchData} disabled={isLoading} className="border-white/10 text-white hover:bg-white/5">
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5" onClick={() => navigate('/')}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> View Site
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-[#0F0F20] border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Total Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">{registrations.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0F0F20] border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Success Count</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-400">{successCount}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0F0F20] border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-blue-400">₹{totalRevenue}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0F0F20] border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Latest Entry</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold text-yellow-400 truncate">
                                {registrations[0]?.name || "N/A"}
                            </div>
                            <div className="text-xs text-white/40">
                                {registrations[0]?.registrationDate ? new Date(registrations[0].registrationDate).toLocaleDateString() : "-"}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center bg-[#0F0F20] p-4 rounded-xl border border-white/10">
                    <Search className="w-5 h-5 text-white/40" />
                    <Input
                        placeholder="Search by Name, Email, Order ID..."
                        className="bg-transparent border-none text-white placeholder:text-white/20 focus-visible:ring-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0F0F20]">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-white/60">Date</TableHead>
                                    <TableHead className="text-white/60">Participant</TableHead>
                                    <TableHead className="text-white/60">Category & Type</TableHead>
                                    <TableHead className="text-white/60">Payment Status</TableHead>
                                    <TableHead className="text-white/60">Amount</TableHead>
                                    <TableHead className="text-white/60">Order ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-white/40">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" /> Loading data...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow className="border-white/10">
                                        <TableCell colSpan={6} className="text-center py-12 text-white/40">
                                            No registrations found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((reg) => (
                                        <TableRow key={reg.id} className="border-white/10 hover:bg-white/5 group">
                                            <TableCell className="text-white/80 text-sm">
                                                {reg.registrationDate ? new Date(reg.registrationDate).toLocaleDateString() : "N/A"}
                                                <div className="text-[10px] text-white/40">
                                                    {reg.registrationDate ? new Date(reg.registrationDate).toLocaleTimeString() : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-white">{reg.name}</div>
                                                <div className="text-xs text-white/40">{reg.email}</div>
                                                <div className="text-xs text-white/40">{reg.whatsapp}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant="secondary" className="w-fit bg-blue-500/10 text-blue-300 border-blue-500/20">{reg.category || "General"}</Badge>
                                                    <span className="text-xs text-white/60 capitalize">{reg.contestType || "Art"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`${reg.paymentStatus === 'success'
                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                        : reg.paymentStatus === 'failed'
                                                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    } uppercase text-[10px]`}>
                                                    {reg.paymentStatus || 'pending'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-white/80">
                                                ₹{reg.amountPaid || 0}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-white/40">
                                                {reg.orderId || "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
