
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Star, User, Quote, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

const EventDrawer = ({ isOpen, onClose, event }: EventDrawerProps) => {
    if (!event) return null;

    const isNational = event.title.includes("Indian");

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-xl bg-[#0F0F0F] border-white/10 text-white p-0 overflow-hidden flex flex-col focus:outline-none outline-none ring-0">
                <SheetTitle className="sr-only">{event.title} Details</SheetTitle>

                {/* Header Image Area */}
                <div className="relative aspect-video w-full shrink-0 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/20 to-transparent z-10"></div>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Close Button */}
                    <div className="absolute top-4 right-4 z-50">
                        <SheetClose asChild>
                            <Button size="icon" variant="secondary" className="bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-colors h-8 w-8">
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </Button>
                        </SheetClose>
                    </div>

                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <Badge className="backdrop-blur-md border-0 bg-green-900/60 text-green-400 font-bold uppercase tracking-widest text-[10px]">
                            {event.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED SEASON'}
                        </Badge>
                        <Badge className={`backdrop-blur-md border-0 font-bold uppercase tracking-widest text-[10px] ${isNational ? 'bg-purple-900/60 text-purple-400' : 'bg-blue-900/60 text-blue-400'}`}>
                            {isNational ? 'NATIONAL LEVEL' : 'STATE LEVEL'}
                        </Badge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-[#0F0F0F] to-transparent pt-20">
                        <h2 className="font-playfair text-3xl md:text-4xl text-white mb-2 leading-tight">{event.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 font-lato uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-[#D4AF37]" /> {event.date}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4AF37]" /> {event.location || (isNational ? "Online, India" : "Sikkim, India")}</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <ScrollArea className="flex-1">
                    <div className="px-4 md:px-6 py-6 pb-24 space-y-8 md:space-y-10">

                        {/* Overview */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                                <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Overview</h3>
                            </div>
                            <p className="text-white/80 leading-relaxed font-lato text-sm md:text-base">
                                {event.description}
                                {event.status === 'upcoming' && " Get ready for an experience larger than life. Registrations opening soon."}
                            </p>
                        </div>

                        {/* Hall of Fame (Mock Data for Demo) */}
                        {event.status !== 'upcoming' && (
                            <>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                                            <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Hall of Fame</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="bg-[#151515] border border-white/5 rounded-lg overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                                                <div className="h-28 md:h-32 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1544531586-fde5298cdd40' : '1561839561-b13bcfe95249'}?q=80&w=500&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Winner" />
                                                    <div className="absolute top-2 right-2 z-20">
                                                        <Badge className="bg-[#D4AF37] text-black hover:bg-[#D4AF37] text-[8px] md:text-[9px] font-bold px-1.5 h-4 md:h-5">WINNER</Badge>
                                                    </div>
                                                    <div className="absolute bottom-2 left-2 right-2 z-20">
                                                        <p className="text-white font-playfair text-xs md:text-sm truncate">Winner Name {i}</p>
                                                        <p className="text-[8px] md:text-[9px] text-white/60 truncate">Oil Painting • Category A</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Impact Stats */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-[#151515] p-3 md:p-4 rounded-lg border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-colors">
                                        <p className="text-[#D4AF37] font-playfair font-bold text-lg md:text-2xl mb-1 group-hover:scale-110 transition-transform">{isNational ? '12k+' : '500+'}</p>
                                        <p className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">Artists</p>
                                    </div>
                                    <div className="bg-[#151515] p-3 md:p-4 rounded-lg border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-colors">
                                        <p className="text-[#D4AF37] font-playfair font-bold text-lg md:text-2xl mb-1 group-hover:scale-110 transition-transform">{isNational ? '₹5L+' : '₹50k'}</p>
                                        <p className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">Prizes</p>
                                    </div>
                                    <div className="bg-[#151515] p-3 md:p-4 rounded-lg border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-colors">
                                        <p className="text-[#D4AF37] font-playfair font-bold text-lg md:text-2xl mb-1 group-hover:scale-110 transition-transform">{isNational ? 'Natl.' : '20+'}</p>
                                        <p className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">{isNational ? 'Reach' : 'Cities'}</p>
                                    </div>
                                </div>

                                {/* Highlights Marquee */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                                        <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Season Highlights</h3>
                                    </div>
                                    <div className="relative w-full overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10 pointer-events-none"></div>
                                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10 pointer-events-none"></div>

                                        <div className="flex w-max animate-scroll gap-3">
                                            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                                                <div key={idx} className="w-24 h-16 md:w-32 md:h-20 rounded-md overflow-hidden bg-white/5 border border-white/5 shrink-0">
                                                    <img
                                                        src={`https://images.unsplash.com/photo-${['1579783902614-a3fb39279c0f', '1544531586-fde5298cdd40', '1561839561-b13bcfe95249', '1605721911519-3dfeb3be25e7', '1513364776144-60967b0f800f'][i - 1]}?q=80&w=300&auto=format&fit=crop`}
                                                        className="w-full h-full object-cover"
                                                        alt="Highlight"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Jury's Verdict */}
                                <div className="relative bg-gradient-to-br from-[#151515] to-[#1a1a1a] p-4 md:p-6 rounded-xl border border-[#D4AF37]/20">
                                    <Quote className="absolute top-4 right-4 text-[#D4AF37]/10 w-8 h-8 md:w-10 md:h-10" />
                                    <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Jury's Verdict</p>
                                    <p className="text-white/90 file:font-playfair text-base md:text-lg italic leading-relaxed mb-6">
                                        "The sheer diversity of talent we saw in Season 1 was overwhelming. It proves that art in India is not just alive; it's thriving in every corner."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/30" alt="Juror" />
                                        <div>
                                            <p className="text-white font-medium text-sm">Amitabh Das</p>
                                            <p className="text-[#D4AF37]/60 text-xs">Head Jury, Season 1</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verified Reviews - Dual Marquee */}
                                <div className="space-y-6 overflow-hidden">
                                    <div className="flex items-center gap-2 px-6">
                                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                                        <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Participant Reviews</h3>
                                    </div>

                                    {/* Row 1: Left to Right (Reverse Scroll actually moves content L->R visually if set up right, or we use standard scroll)
                                        Standard 'animate-scroll' moves content Left. 'animate-scroll-reverse' moves content Right.
                                        User asked for one L->R and one R->L.
                                    */}

                                    {/* Top Row: Scrolls Left (Right to Left) */}
                                    <div className="relative w-full overflow-hidden group">
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                                        <div className="flex w-max animate-scroll gap-4 hover:[animation-play-state:paused] py-2">
                                            {(event.reviews ? event.reviews.slice(0, Math.ceil(event.reviews.length / 2)) : [1, 2, 3, 4, 5]).map((review: any, idx: number) => (
                                                <div key={`row1-${idx}`} className="w-80 h-32 bg-[#151515] p-4 rounded-xl border border-white/5 shrink-0 flex gap-4 items-start hover:border-[#D4AF37]/30 transition-colors">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                                        <User className="w-5 h-5 text-white/50" />
                                                    </div>
                                                    <div className="min-w-0 flex-1 flex flex-col h-full">
                                                        <div className="flex text-[#D4AF37] gap-0.5 mb-2">
                                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= (review.rating || 5) ? 'fill-current' : 'text-gray-800'}`} />)}
                                                        </div>
                                                        <p className="text-white/90 text-xs italic line-clamp-3 leading-relaxed flex-1">"{review.comment || "Amazing experience with this event!"}"</p>
                                                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5 w-full">
                                                            <span className="text-[10px] text-[#D4AF37] font-medium truncate max-w-[120px]">{review.name || "Artist Name"}</span>
                                                            {review.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Row: Scrolls Right (Left to Right) */}
                                    <div className="relative w-full overflow-hidden group">
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
                                        <div className="flex w-max animate-scroll-reverse gap-4 hover:[animation-play-state:paused] py-2">
                                            {(event.reviews ? event.reviews.slice(Math.ceil(event.reviews.length / 2)) : [1, 2, 3, 4, 5]).map((review: any, idx: number) => (
                                                <div key={`row2-${idx}`} className="w-80 h-32 bg-[#151515] p-4 rounded-xl border border-white/5 shrink-0 flex gap-4 items-start hover:border-[#D4AF37]/30 transition-colors">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                                        <User className="w-5 h-5 text-white/50" />
                                                    </div>
                                                    <div className="min-w-0 flex-1 flex flex-col h-full">
                                                        <div className="flex text-[#D4AF37] gap-0.5 mb-2">
                                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= (review.rating || 5) ? 'fill-current' : 'text-gray-800'}`} />)}
                                                        </div>
                                                        <p className="text-white/90 text-xs italic line-clamp-3 leading-relaxed flex-1">"{review.comment || "Highly recommended event for everyone."}"</p>
                                                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5 w-full">
                                                            <span className="text-[10px] text-[#D4AF37] font-medium truncate max-w-[120px]">{review.name || "Artist Name"}</span>
                                                            {review.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t border-white/10 bg-[#0F0F0F] shrink-0">
                    <SheetClose asChild>
                        <Button className="w-full bg-[#D4AF37] text-black hover:bg-white transition-colors font-bold tracking-widest rounded-sm py-6">
                            CLOSE DETAILS
                        </Button>
                    </SheetClose>
                </div>

            </SheetContent>
        </Sheet>
    );
};

export default EventDrawer;
