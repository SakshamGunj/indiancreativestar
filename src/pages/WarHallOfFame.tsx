import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, X, Trophy, Crown, ArrowLeft, Star, Snowflake, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { warHallOfFameData, HallOfFameEntry } from "@/data/warHallOfFameData";

// Assets
import warLogo from "@/assets/optimized_assets/war_logo_v2.webp";
import companyLogo from "@/assets/images/company-logo.webp";

const WarHallOfFame = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEntry, setSelectedEntry] = useState<HallOfFameEntry | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return warHallOfFameData;
        const query = searchQuery.toLowerCase();
        return warHallOfFameData.filter(entry => 
            entry.name.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Handle Title & Meta
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Hall of Fame | Winter Art Royale";
        document.body.style.backgroundColor = "#ffffff";
        return () => {
            document.title = originalTitle;
        };
    }, []);

    // Handle Native Opening - Fastest & Most Reliable Cross-Device Method
    const handleDownload = (entry: HallOfFameEntry) => {
        // Open the high-res image directly in a new secure tab. 
        // This instantly bypasses corsproxy/fetch delays (the "taking too late" issue)
        // Users can easily right-click or long-press to save the image.
        window.open(entry.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                body, .font-sans { font-family: 'Plus Jakarta Sans', sans-serif !important; }
                h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Outfit', sans-serif !important; }
            `}</style>

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <Link to="/winterartroyale/v2" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img src={companyLogo} alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-slate-200 shadow-sm" />
                            <Snowflake className="absolute -top-1 -right-1 w-3.5 h-3.5 text-blue-500 animate-spin-slow bg-white rounded-full p-0.5 shadow-sm" />
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-lg md:text-xl tracking-tight text-slate-900 leading-none">
                                DAAMI EVENT
                            </h1>
                            <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-blue-600 font-bold flex items-center gap-1">
                                Winter Edition
                            </p>
                        </div>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 md:px-6 overflow-hidden bg-slate-900 rounded-b-[3rem] shadow-2xl mx-2 md:mx-4 mt-2 border border-slate-800">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"></div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
                    <img src={warLogo} alt="W.A.R Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-800 shadow-2xl mx-auto object-cover" />
                    <div className="space-y-2">
                        <p className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm flex items-center justify-center gap-2">
                            <Crown className="w-4 h-4 text-yellow-500" /> Official Recognition
                        </p>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
                            The Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Fame</span>
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic border-t border-slate-800 pt-6">
                        Honoring the top Creative Stars of the Winter Art Royale. Explore the verified certificates of our distinguished participants.
                    </p>
                </div>
            </section>

            {/* Main Content (Search & Grid) */}
            <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto min-h-[50vh]">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
                    <div className="relative relative flex items-center">
                        <Search className="absolute left-6 text-slate-400 w-6 h-6" />
                        <Input 
                            type="text"
                            placeholder="Search by artist name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-8 text-lg md:text-xl rounded-2xl border-slate-200 bg-white/80 backdrop-blur-xl shadow-xl focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all font-medium text-slate-800 placeholder:text-slate-400 h-auto"
                        />
                    </div>
                </div>

                {/* Results List */}
                {filteredData.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm"
                    >
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No artists found</h3>
                        <p className="text-slate-500">Try adjusting your search criteria.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredData.map((entry, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={entry.id}
                                    onClick={() => setSelectedEntry(entry)}
                                    className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                                    
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border-2 border-white shadow-md relative group-hover:border-blue-100 transition-colors">
                                        <Trophy className="w-8 h-8 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <ShieldCheck className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">{entry.name}</h3>
                                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1 mt-auto pt-2">
                                        <Star className="w-3 h-3 fill-slate-300 group-hover:fill-blue-400 group-hover:text-blue-400 transition-colors" /> Certificate Verified
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>

            {/* Certificate Modal */}
            <Dialog open={!!selectedEntry} onOpenChange={(open) => !open && setSelectedEntry(null)}>
                <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 bg-transparent border-none shadow-none overflow-hidden flex flex-col items-center justify-center min-h-[50vh] focus:outline-none focus:ring-0">
                    {selectedEntry && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-full relative z-50 flex flex-col"
                        >
                            <div className="p-4 md:p-6 bg-slate-900 flex items-center justify-between border-b border-slate-800">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                        {selectedEntry.name}
                                    </h2>
                                    <p className="text-xs md:text-sm text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                                        <ShieldCheck className="w-4 h-4" /> Officially Verified 
                                    </p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setSelectedEntry(null)}
                                    className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="p-4 md:p-12 bg-slate-50 flex flex-col items-center justify-center relative inner-shadow min-h-[300px]">
                                {/* Animated Background pattern */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 point-events-none"></div>

                                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-xl">
                                        <Download className="w-12 h-12 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">Your Certificate is Ready</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">Click below to open the securely hosted high-resolution copy, then save it to your device.</p>
                                    </div>
                                    <a
                                        href={selectedEntry.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-2xl transform hover:-translate-y-1 transition-all text-lg px-10 py-5 h-auto w-full md:w-auto"
                                    >
                                        <Download className="w-6 h-6 mr-3" />
                                        Open Full-Res Certificate
                                    </a>
                                    <p className="text-xs text-slate-400 font-medium max-w-[250px]">Tip: Long-press on mobile or Right-click on desktop to "Save Image"</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WarHallOfFame;
