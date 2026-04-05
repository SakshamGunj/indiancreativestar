"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { client, urlFor } from "@/lib/sanity";
import { Menu, ChevronRight, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import companyLogo from "@/assets/images/company-logo.webp";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  metaDescription: string;
  authorName: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          metaDescription,
          "authorName": author->name
        }`
      )
      .then((data) => { setPosts(data); setLoading(false); })
      .catch((err) => { console.error(err); setError(true); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen text-white font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden relative">

      {/* ── CINEMATIC BACKGROUND (same system) ── */}
      <div className="fixed inset-0 z-0" style={{ background: 'linear-gradient(160deg, #0a0a0f 0%, #0f0a05 25%, #080808 50%, #0a050f 75%, #050a0a 100%)' }} />
      <div className="fixed inset-0 z-0 opacity-[0.028]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23D4AF37' stroke-width='0.4'/%3E%3C/svg%3E")` }} />
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[150px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #9B59B6, transparent 70%)' }} />

      {/* ── NAVIGATION ── */}
      <nav className="relative z-50 px-4 md:px-6 py-4 border-b border-[#D4AF37]/15 backdrop-blur-md bg-black/50 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <img src={companyLogo.src} alt="Daami Event" className="h-8 w-8 object-cover border border-[#D4AF37]/30" />
            <div>
              <span className="font-playfair text-sm tracking-[0.2em] text-[#D4AF37] font-bold">DAAMI EVENT</span>
              <p className="text-[8px] tracking-[0.2em] uppercase text-white/25">Journal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-black text-white/40">
            <button onClick={() => router.push('/')} className="hover:text-[#D4AF37] transition-colors">Home</button>
            <button onClick={() => router.push('/indiancreativestar/v2')} className="hover:text-[#D4AF37] transition-colors">Events</button>
            <button onClick={() => router.push('/hall-of-fame')} className="hover:text-[#D4AF37] transition-colors">Hall of Fame</button>
            <button onClick={() => router.push('/about')} className="hover:text-[#D4AF37] transition-colors">About</button>
            <span className="text-[#D4AF37] border-b border-[#D4AF37]/50 pb-0.5">Journal</span>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a0a] border-l border-white/8 text-white w-[280px]">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col gap-6 mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-[1px] bg-[#D4AF37]/40" />
                    <span className="text-[9px] tracking-widest uppercase text-[#D4AF37]/50 font-black">Navigation</span>
                  </div>
                  {[['/', 'Home'], ['/indiancreativestar/v2', 'Events'], ['/hall-of-fame', 'Hall of Fame'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                    <button key={href} onClick={() => router.push(href)} className="text-left text-sm font-playfair text-white/60 hover:text-[#D4AF37] transition-colors">{label}</button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ── EDITORIAL HERO ── */}
      <header className="relative z-10 pt-16 pb-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Top rule */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-10" />

          <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-12">

            {/* LEFT — decorative anchor */}
            <div className="hidden lg:flex flex-col items-center flex-shrink-0">
              <span className="font-playfair font-black text-[100px] xl:text-[130px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/30 to-transparent select-none tracking-tighter">
                J
              </span>
              <div className="w-[1px] flex-1 bg-gradient-to-b from-[#D4AF37]/25 to-transparent min-h-[40px]" />
            </div>

            <div className="hidden lg:block w-[1px] bg-gradient-to-b from-[#D4AF37]/35 via-[#D4AF37]/08 to-transparent flex-shrink-0 self-stretch" />

            {/* CENTER — main content */}
            <div className="flex-1 flex flex-col gap-5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-[1px] bg-[#D4AF37]/60" />
                <span className="text-[9px] tracking-[0.35em] uppercase font-black text-[#D4AF37]/60">The Official Publication</span>
              </div>

              <h1 className="font-playfair font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5F5DC]/90 to-[#D4AF37]/60 leading-[1.0]"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                Daami Event<br /><span className="italic">Journal.</span>
              </h1>

              <p className="text-white/40 font-lato text-sm leading-[1.9] max-w-lg border-l-2 border-[#D4AF37]/20 pl-4">
                Stories, tips, announcements, and artistic inspiration straight from the core of the Daami Event community.
              </p>
            </div>

            {/* RIGHT — post count signal */}
            <div className="hidden xl:flex flex-col items-end justify-between flex-shrink-0 min-w-[80px] self-stretch pb-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/12 font-bold">DAAMI EVENT</span>
              <div className="flex flex-col items-end gap-1">
                <div className="w-8 h-8 border border-[#D4AF37]/20 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]/40" />
                </div>
                <span className="text-[8px] tracking-widest uppercase text-white/12 font-bold">{posts.length || '—'} Articles</span>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent mt-10" />
        </div>
      </header>

      {/* ── POSTS GRID ── */}
      <main className="relative z-10 pb-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-[#D4AF37]/60" />
            <span className="text-[9px] uppercase tracking-[0.35em] font-black text-[#D4AF37]/60">All Articles</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border border-[#D4AF37]/40 border-t-[#D4AF37] animate-spin" />
            </div>
          ) : error ? (
            <div className="py-20 text-center border border-red-500/10 bg-red-500/[0.02]">
              <p className="text-white/30 font-lato text-xs tracking-widest uppercase mb-4">Unable to load articles</p>
              <p className="text-white/15 text-[10px] font-lato mb-6">Sanity API unreachable — check your internet connection or Sanity CORS settings.</p>
              <button onClick={() => window.location.reload()}
                className="text-[9px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/50 hover:text-[#D4AF37] border border-[#D4AF37]/20 px-4 py-2 transition-colors">
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center border border-white/5">
              <p className="text-white/20 font-lato text-sm tracking-widest uppercase">No articles yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {posts.map((post, i) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col border border-white/6 bg-white/[0.012] hover:border-[#D4AF37]/30 hover:bg-white/[0.022] transition-all duration-500"
                >
                  {/* Post image */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(800).height(450).url()}
                        alt={post.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-[#D4AF37]/15" />
                      </div>
                    )}
                    {/* Issue number */}
                    <div className="absolute top-0 left-0 px-3 py-1.5 bg-black/70 border-r border-b border-white/8">
                      <span className="text-[8px] font-black tracking-widest uppercase text-[#D4AF37]/50">No. {String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[8px] font-black tracking-[0.3em] uppercase text-[#D4AF37]/60">
                        {post.authorName || "Daami Editorial"}
                      </span>
                      <span className="text-[8px] font-black tracking-widest uppercase text-white/20">
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="w-full h-[1px] bg-white/5 mb-4" />

                    <h2 className="font-playfair font-bold text-lg leading-[1.3] text-white/85 group-hover:text-[#D4AF37] transition-colors mb-3 flex-1">
                      {post.title}
                    </h2>

                    {post.metaDescription && (
                      <p className="text-white/35 text-xs font-lato leading-[1.8] line-clamp-2 mb-4">
                        {post.metaDescription}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 mt-auto">
                      <span className="text-[9px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">Read Article</span>
                      <ChevronRight className="w-3 h-3 text-[#D4AF37]/30 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 pt-14 pb-10 px-4 md:px-6 font-lato">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-white/15" />
            <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">Daami Event</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-white/25 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img src={companyLogo.src} alt="Daami Event" className="h-6 w-6 object-cover border border-[#D4AF37]/20" />
                <span className="font-playfair text-sm text-white/50 tracking-widest">DAAMI EVENT</span>
              </div>
              <p className="text-xs leading-relaxed text-white/20">Redefining artistic excellence through curated competition and events.</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/18 font-bold mb-4">Navigation</p>
              {[['/', 'Home'], ['/indiancreativestar/v2', 'Competitions'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <button key={href} onClick={() => router.push(href)} className="block text-xs text-white/20 hover:text-[#D4AF37] transition-colors mb-2">{label}</button>
              ))}
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/18 font-bold mb-4">Legal</p>
              {[['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions'], ['Refund Policy', '/refund-and-cancellation']].map(([label, href]) => (
                <button key={href} onClick={() => router.push(href)} className="block text-xs text-white/20 hover:text-[#D4AF37] transition-colors mb-2">{label}</button>
              ))}
            </div>
          </div>
          <div className="h-[1px] bg-white/5 mb-5" />
          <div className="text-center text-[9px] tracking-[0.25em] uppercase text-white/12">
            © {new Date().getFullYear()} Daami Event. All Rights Reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}</style>
    </div>
  );
}
