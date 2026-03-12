
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Search, Download, Trash2, ArrowLeft, RefreshCw, Loader2, Image as ImageIcon, ExternalLink, LayoutGrid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getArtworkSubmissions } from "@/lib/db";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function WinterAdmin() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    const fetchData = async () => {
        setIsLoading(true);
        const result = await getArtworkSubmissions();
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
        r.phone?.includes(searchTerm) ||
        r.order_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats Calculation
    const totalRevenue = registrations.reduce((acc, curr) => {
        if (curr.payment_status === 'PAID' || curr.payment_status === 'SUCCESS') {
            return acc + (Number(curr.amount_paid) || 0);
        }
        return acc;
    }, 0);

    const successCount = registrations.filter(r => r.payment_status === 'PAID' || r.payment_status === 'SUCCESS').length;

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
        <div className="min-h-screen bg-[#050510] text-white p-6 md:p-12 pb-24">
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
                            <CardTitle className="text-sm font-medium text-white/60">Total Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">{registrations.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0F0F20] border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/60">Paid Entries</CardTitle>
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
                            <CardTitle className="text-sm font-medium text-white/60">Latest Artist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold text-yellow-400 truncate">
                                {registrations[0]?.name || "N/A"}
                            </div>
                            <div className="text-xs text-white/40">
                                {registrations[0]?.created_at ? new Date(registrations[0].created_at).toLocaleDateString() : "-"}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0F0F20] p-4 rounded-xl border border-white/10">
                    <div className="flex w-full md:w-auto flex-1 items-center gap-2">
                        <Search className="w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search by Name, Email, Order ID..."
                            className="bg-transparent border-none text-white placeholder:text-white/20 focus-visible:ring-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-end">
                        <div className="bg-white/5 p-1 rounded-lg flex items-center border border-white/10">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`px-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="w-4 h-4 mr-2" /> Judging View
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`px-3 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                                onClick={() => setViewMode('table')}
                            >
                                <List className="w-4 h-4 mr-2" /> Table View
                            </Button>
                        </div>
                        <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                            <Download className="w-4 h-4 mr-2" /> Export CSV
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20 text-white/40">
                        <Loader2 className="w-8 h-8 animate-spin mr-3 text-blue-500" /> Loading data...
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="text-center py-20 text-white/40 bg-[#0F0F20] rounded-xl border border-white/10">
                        No submissions found.
                    </div>
                ) : viewMode === 'table' ? (
                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0F0F20]">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-white/5">
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="text-white/60">Date</TableHead>
                                        <TableHead className="text-white/60">Artist Details</TableHead>
                                        <TableHead className="text-white/60">Plan</TableHead>
                                        <TableHead className="text-white/60">Status</TableHead>
                                        <TableHead className="text-white/60">Artworks</TableHead>
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
                                                No submissions found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredData.map((reg) => (
                                            <TableRow key={reg.id} className="border-white/10 hover:bg-white/5 group">
                                                <TableCell className="text-white/80 text-sm">
                                                    {reg.created_at ? new Date(reg.created_at).toLocaleDateString() : "N/A"}
                                                    <div className="text-[10px] text-white/40">
                                                        {reg.created_at ? new Date(reg.created_at).toLocaleTimeString() : ""}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">{reg.name}</div>
                                                    <div className="text-xs text-white/40">{reg.email}</div>
                                                    <div className="text-xs text-white/40">{reg.phone}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-white/20 text-white/80 capitalize">
                                                        {reg.plan_type || "Standard"}
                                                    </Badge>
                                                    <div className="text-[10px] text-white/40 mt-1">₹{reg.amount_paid}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={`${reg.payment_status === 'PAID' || reg.payment_status === 'SUCCESS'
                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                        : reg.payment_status === 'FAILED'
                                                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                        } uppercase text-[10px]`}>
                                                        {reg.payment_status || 'PENDING'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {reg.artworks && reg.artworks.length > 0 ? (
                                                        <div className="flex items-center gap-2">
                                                            {reg.artworks.map((url: string, index: number) => (
                                                                <Dialog key={index}>
                                                                    <DialogTrigger>
                                                                        <div className="w-10 h-10 rounded bg-white/10 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                                                                            <img src={url} alt={`Art ${index + 1}`} className="w-full h-full object-cover" />
                                                                        </div>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 p-0 overflow-hidden">
                                                                        <img src={url} alt="Full view" className="w-full h-auto max-h-[80vh] object-contain" />
                                                                        <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-sm absolute bottom-0 w-full">
                                                                            <span className="text-white font-bold">{reg.name}'s Artwork</span>
                                                                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                                                                                <ExternalLink className="w-4 h-4" /> Open Original
                                                                            </a>
                                                                        </div>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            ))}
                                                            <span className="text-xs text-white/40">({reg.artworks.length})</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-white/20 text-xs italic">No Artworks</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-mono text-xs text-white/40">
                                                    {reg.order_id || "-"}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ) : (
                    /* Judging Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((reg) => (
                            <div key={reg.id} className="bg-[#0F0F20] border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-blue-500/30 transition-colors">
                                <div className="p-4 bg-black/40 border-b border-white/5 flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-lg text-white">{reg.name}</h3>
                                        <p className="text-sm text-white/60">{reg.email} • {reg.phone}</p>
                                    </div>
                                    <Badge className={`${reg.payment_status === 'PAID' || reg.payment_status === 'SUCCESS'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : reg.payment_status === 'FAILED'
                                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        } uppercase text-[10px]`}>
                                        {reg.payment_status || 'PENDING'}
                                    </Badge>
                                </div>
                                <div className="p-0 flex-1 flex flex-col">
                                    {reg.artworks && reg.artworks.length > 0 ? (
                                        <div className="flex flex-col gap-px bg-white/5 relative">
                                            {reg.artworks.map((url: string, index: number) => (
                                                <Dialog key={index}>
                                                    <DialogTrigger asChild>
                                                        <div className="relative group cursor-pointer overflow-hidden bg-black flex flex-col justify-center items-center min-h-[300px]">
                                                            <img
                                                                src={url}
                                                                alt={`Artwork ${index + 1} by ${reg.name}`}
                                                                className="w-full h-auto object-cover max-h-[400px] transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                                <ImageIcon className="w-10 h-10 text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300" />
                                                            </div>
                                                            <div className="absolute top-3 left-3 bg-black/70 border border-white/10 text-white text-xs px-2.5 py-1 rounded backdrop-blur-sm shadow-xl font-medium tracking-wider uppercase">
                                                                {reg.artworks.length > 1 ? `Artwork ${index + 1} of ${reg.artworks.length}` : 'Artwork'}
                                                            </div>
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-5xl bg-slate-900 border-slate-800 p-0 overflow-hidden rounded-xl">
                                                        <div className="flex justify-center items-center bg-black min-h-[60vh]">
                                                            <img src={url} alt="Full view" className="w-full h-auto max-h-[85vh] object-contain" />
                                                        </div>
                                                        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border-t border-slate-800 gap-4">
                                                            <div>
                                                                <h2 className="text-xl text-white font-bold">{reg.name}'s Artwork</h2>
                                                                <p className="text-slate-400 text-sm mt-1">{reg.email} • {reg.phone}</p>
                                                            </div>
                                                            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors font-medium">
                                                                <ExternalLink className="w-4 h-4" /> Open Full Resolution
                                                            </a>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-white/20 bg-black/20 min-h-[300px]">
                                            <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                                            <p className="font-medium text-sm">No artworks uploaded</p>
                                        </div>
                                    )}
                                    <div className="p-4 bg-white/5 border-t border-white/5 mt-auto flex justify-between items-center text-xs">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/40 uppercase tracking-wider font-bold text-[10px]">Plan</span>
                                            <Badge variant="outline" className="border-white/20 text-white/80 capitalize w-fit text-xs">
                                                {reg.plan_type || "Standard"}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-col gap-1 text-right">
                                            <span className="text-white/40 uppercase tracking-wider font-bold text-[10px]">Submitted Date</span>
                                            <span className="text-white/80 font-medium">
                                                {reg.created_at ? new Date(reg.created_at).toLocaleDateString() : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-right">
                                            <span className="text-white/40 uppercase tracking-wider font-bold text-[10px]">Order ID</span>
                                            <span className="text-white/60 font-mono">
                                                {reg.order_id || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
