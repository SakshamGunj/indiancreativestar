"use client";

import { useState, useCallback, useRef, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon, Menu } from "lucide-react";
import { galleryData } from "@/data/galleryData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import companyLogo from "@/assets/images/company-logo.webp";

// ─────────────────────────────────────────────────────────────────────────────
// Lazy image tile — mounts only when near the viewport, fades in after load
// ─────────────────────────────────────────────────────────────────────────────
const GalleryTile = memo(function GalleryTile({
    url,
    index,
    onClick,
}: {
    url: string;
    index: number;
    onClick: () => void;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [shouldMount, setShouldMount] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldMount(true);
                    io.disconnect();
                }
            },
            { rootMargin: "500px 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={wrapRef}
            onClick={onClick}
            className="break-inside-avoid mb-1.5 relative group cursor-pointer overflow-hidden"
            style={{
                /* gold border that animates on hover */
                outline: "1px solid rgba(255,255,255,0.04)",
                transition: "outline-color 0.4s ease",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.outlineColor = "rgba(212,175,55,0.35)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.outlineColor = "rgba(255,255,255,0.04)")
            }
        >
            {/* Skeleton shown until image loads */}
            {!loaded && (
                <div
                    className="w-full bg-white/[0.025]"
                    style={{
                        paddingBottom: "70%",
                        backgroundImage:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.6s infinite linear",
                    }}
                />
            )}

            {/* Image — only added to DOM when near viewport */}
            {shouldMount && (
                <img
                    src={url}
                    alt={`Artwork ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    className="w-full h-auto block"
                    style={{
                        display: "block",
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 0.55s ease",
                        /* push img on top of skeleton */
                        marginTop: loaded ? 0 : "-70%",
                        position: loaded ? "static" : "absolute",
                        inset: 0,
                        width: "100%",
                    }}
                />
            )}

            {/* Glow overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    boxShadow:
                        "inset 0 0 28px rgba(212,175,55,0.14), inset 0 0 0 1px rgba(212,175,55,0.22)",
                    background:
                        "radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.07) 0%, transparent 70%)",
                }}
            />
            {/* Dim overlay */}
            <div className="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/18 transition-colors duration-500" />

            {/* Index badge */}
            <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="text-[7px] tracking-widest uppercase font-black text-white/60 bg-black/70 px-1.5 py-0.5">
                    {String(index + 1).padStart(3, "0")}
                </span>
            </div>
        </div>
    );
});

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({
    images,
    index,
    onClose,
    onPrev,
    onNext,
}: {
    images: string[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
            onClick={onClose}
        >
            <button
                className="absolute top-4 right-4 w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
                onClick={onClose}
            >
                <X className="w-4 h-4" />
            </button>
            <div className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase font-black text-white/25">
                {String(index + 1).padStart(3, "0")} / {String(images.length).padStart(3, "0")}
            </div>
            <button
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.img
                key={index}
                src={images[index]}
                alt={`Artwork ${index + 1}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
                className="max-h-[88vh] max-w-[88vw] object-contain border border-white/8"
                onClick={(e) => e.stopPropagation()}
                style={{
                    boxShadow: "0 0 80px rgba(212,175,55,0.08)",
                }}
            />
            <button
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
    const router = useRouter();
    const [activeEvent, setActiveEvent] = useState<string>("all");
    const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const [navHeight, setNavHeight] = useState(65);

    // measure nav so sticky filter sits exactly below it
    useEffect(() => {
        const nav = document.querySelector("nav") as HTMLElement | null;
        if (nav) setNavHeight(nav.offsetHeight);
    }, []);

    const allImages = galleryData.flatMap((e) =>
        e.artworks.map((url) => ({ url, eventId: e.id }))
    );

    const visibleImages =
        activeEvent === "all"
            ? allImages
            : (galleryData.find((e) => e.id === activeEvent)?.artworks.map((url) => ({
                url,
                eventId: activeEvent,
            })) ?? []);

    const openLightbox = useCallback(
        (idx: number) => setLightbox({ images: visibleImages.map((i) => i.url), index: idx }),
        [visibleImages]
    );
    const closeLightbox = () => setLightbox(null);
    const prevImage = () =>
        setLightbox((lb) =>
            lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null
        );
    const nextImage = () =>
        setLightbox((lb) =>
            lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null
        );

    const tabs = [
        { id: "all", label: "All", count: allImages.length },
        ...galleryData.map((e) => ({ id: e.id, label: e.shortName, count: e.artworks.length })),
    ];

    return (
        <div className="min-h-screen text-white font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden relative">
            {/* shimmer keyframe */}
            <style>{`
                @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-lato { font-family: 'Lato', sans-serif; }
            `}</style>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 z-0" style={{ background: "linear-gradient(160deg,#0a0a0f 0%,#0f0a05 25%,#080808 50%,#0a050f 75%,#050a0a 100%)" }} />
            <div className="fixed inset-0 z-0 opacity-[0.027]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23D4AF37' stroke-width='0.4'/%3E%3C/svg%3E")` }} />
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[120px] pointer-events-none z-0" style={{ background: "radial-gradient(circle,#D4AF37,transparent 70%)" }} />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[150px] pointer-events-none z-0" style={{ background: "radial-gradient(circle,#9B59B6,transparent 70%)" }} />

            {/* ── STICKY NAVBAR ── */}
            <nav className="relative z-50 px-4 md:px-6 py-4 border-b border-[#D4AF37]/15 backdrop-blur-md bg-black/55 sticky top-0">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                        <img src={companyLogo.src} alt="Daami" className="h-8 w-8 object-cover border border-[#D4AF37]/30" />
                        <div>
                            <span className="font-playfair text-sm tracking-[0.2em] text-[#D4AF37] font-bold">DAAMI EVENT</span>
                            <p className="text-[8px] tracking-[0.2em] uppercase text-white/25">Art Gallery</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-black text-white/40">
                        <button onClick={() => router.push("/")} className="hover:text-[#D4AF37] transition-colors">Home</button>
                        <button onClick={() => router.push("/hall-of-fame")} className="hover:text-[#D4AF37] transition-colors">Hall of Fame</button>
                        <button onClick={() => router.push("/blog")} className="hover:text-[#D4AF37] transition-colors">Journal</button>
                        <span className="text-[#D4AF37] border-b border-[#D4AF37]/50 pb-0.5">Gallery</span>
                    </div>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white"><Menu className="w-5 h-5" /></Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#0a0a0a] border-l border-white/8 text-white w-[280px]">
                                <SheetTitle className="sr-only">Navigation</SheetTitle>
                                <div className="flex flex-col gap-5 mt-10">
                                    {([["Home", "/"], ["Hall of Fame", "/hall-of-fame"], ["Journal", "/blog"]] as const).map(([l, h]) => (
                                        <button key={h} onClick={() => router.push(h)} className="text-left text-sm font-playfair text-white/60 hover:text-[#D4AF37] transition-colors">{l}</button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <header className="relative z-10 pt-12 pb-8 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent mb-8" />
                    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
                        <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                            <span className="font-playfair font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/28 to-transparent select-none" style={{ fontSize: "100px" }}>G</span>
                        </div>
                        <div className="hidden lg:block w-[1px] bg-gradient-to-b from-[#D4AF37]/35 via-[#D4AF37]/08 to-transparent flex-shrink-0 self-stretch" />
                        <div className="flex-1 pt-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-[1px] bg-[#D4AF37]/60" />
                                <span className="text-[9px] tracking-[0.35em] uppercase font-black text-[#D4AF37]/60">Official Art Collection</span>
                            </div>
                            <h1 className="font-playfair font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60 leading-[1.0] mb-4" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)" }}>
                                Art <span className="italic">Gallery.</span>
                            </h1>
                            <p className="text-white/32 font-lato text-sm leading-[1.9] max-w-lg border-l-2 border-[#D4AF37]/20 pl-4 mb-3">
                                Every artwork submitted across all Daami Event seasons — preserved, celebrated, and displayed with the reverence each piece deserves.
                            </p>
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-3 h-3 text-[#D4AF37]/40" />
                                <span className="text-[9px] tracking-widest uppercase font-black text-white/18">{allImages.length} Artworks · {galleryData.length} Seasons</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/18 to-transparent mt-8" />
                </div>
            </header>

            {/* ── STICKY FILTER BAR ── */}
            <div
                ref={filterRef}
                className="sticky z-40 px-4 md:px-6 py-0"
                style={{ top: `${navHeight}px` }}
            >
                {/* glass pill container */}
                <div
                    className="max-w-7xl mx-auto"
                    style={{
                        background: "rgba(5,5,8,0.88)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        borderBottom: "1px solid rgba(212,175,55,0.12)",
                        borderTop: "1px solid rgba(212,175,55,0.06)",
                    }}
                >
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3 px-1">
                        {tabs.map((tab) => {
                            const isActive = activeEvent === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveEvent(tab.id)}
                                    className="relative flex-shrink-0 flex items-center gap-2 px-4 py-2 transition-all duration-300 group"
                                    style={{
                                        background: isActive ? "rgba(212,175,55,0.1)" : "transparent",
                                        border: isActive
                                            ? "1px solid rgba(212,175,55,0.4)"
                                            : "1px solid transparent",
                                    }}
                                >
                                    {/* active left accent */}
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4"
                                            style={{ background: "#D4AF37" }}
                                        />
                                    )}
                                    <span
                                        className="text-[9px] tracking-[0.28em] uppercase font-black whitespace-nowrap transition-colors duration-300"
                                        style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.35)" }}
                                    >
                                        {tab.label}
                                    </span>
                                    <span
                                        className="text-[8px] font-black tabular-nums transition-colors duration-300 px-1.5 py-0.5"
                                        style={{
                                            color: isActive ? "rgba(212,175,55,0.8)" : "rgba(255,255,255,0.18)",
                                            background: isActive ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                                        }}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}

                        {/* right side count */}
                        <div className="ml-auto flex-shrink-0 pl-4 flex items-center gap-2 border-l border-white/8">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 animate-pulse" />
                            <span className="text-[8px] tracking-widest uppercase font-black text-white/15 whitespace-nowrap">
                                {visibleImages.length} works
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MASONRY GRID ── */}
            <main className="relative z-10 px-4 md:px-6 pt-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    {/* key forces full remount when event changes — clears all previous tiles */}
                    <div
                        key={activeEvent}
                        className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6"
                        style={{ columnGap: "6px" }}
                    >
                        {visibleImages.map(({ url }, idx) => (
                            <GalleryTile
                                key={`${activeEvent}-${idx}`}
                                url={url}
                                index={idx}
                                onClick={() => openLightbox(idx)}
                            />
                        ))}
                    </div>

                    {visibleImages.length === 0 && (
                        <div className="py-32 text-center border border-white/5 flex flex-col items-center gap-4">
                            <ImageIcon className="w-8 h-8 text-white/10" />
                            <p className="text-white/20 text-xs tracking-widest uppercase font-black">No artworks yet</p>
                        </div>
                    )}
                </div>
            </main>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightbox && (
                    <Lightbox
                        images={lightbox.images}
                        index={lightbox.index}
                        onClose={closeLightbox}
                        onPrev={prevImage}
                        onNext={nextImage}
                    />
                )}
            </AnimatePresence>

            {/* ── FOOTER ── */}
            <footer className="relative z-10 border-t border-white/5 pt-10 pb-8 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src={companyLogo.src} alt="Daami Event" className="h-5 w-5 object-cover border border-[#D4AF37]/20" />
                        <span className="font-playfair text-xs text-white/30 tracking-widest">DAAMI EVENT</span>
                    </div>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/12 font-black">
                        © {new Date().getFullYear()} Daami Event · Official Art Gallery
                    </span>
                </div>
            </footer>
        </div>
    );
}
