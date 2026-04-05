"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";
import { Menu, ChevronLeft, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import companyLogo from "@/assets/images/company-logo.webp";

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 md:my-14">
          <img
            alt={value.alt || "Blog Image"}
            src={urlFor(value).width(1200).url()}
            className="w-full border border-white/6"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-[10px] tracking-widest uppercase text-white/25 font-black text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-playfair font-black text-3xl md:text-5xl text-[#D4AF37] mt-14 mb-6 leading-[1.1]">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <div className="mt-12 mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-[2px] bg-[#D4AF37]" />
          <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white/90 leading-tight">{children}</h2>
        </div>
      </div>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-playfair font-bold text-xl md:text-2xl text-white/80 mt-8 mb-4 leading-tight">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-white/55 font-lato text-base md:text-lg leading-[1.95] mb-7 font-light">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#D4AF37]/50 pl-6 md:pl-8 py-1 my-10 font-playfair italic text-xl md:text-2xl text-[#D4AF37]/85 leading-[1.6]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="pl-6 mb-7 text-white/55 font-lato text-base md:text-lg font-light space-y-3 marker:text-[#D4AF37]">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="pl-6 mb-7 text-white/55 font-lato text-base md:text-lg font-light space-y-3 marker:text-[#D4AF37] list-decimal">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white/85">{children}</strong>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-[#D4AF37] hover:text-[#F2D06B] underline decoration-[#D4AF37]/30 underline-offset-4 transition-colors">
        {children}
      </a>
    ),
  },
};

interface PostData {
  title: string;
  metaDescription: string;
  name: string;
  authorImage: any;
  mainImage: any;
  publishedAt: string;
  body: any;
}

export default function BlogClient() {
  const { slug } = useParams() as { slug: string };
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          title,
          metaDescription,
          "name": author->name,
          "authorImage": author->image,
          mainImage,
          publishedAt,
          body
        }`,
        { slug }
      )
      .then((data) => { setPost(data); setLoading(false); window.scrollTo(0, 0); })
      .catch(console.error);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" style={{ background: 'linear-gradient(160deg, #0a0a0f 0%, #0f0a05 25%, #080808 50%, #0a050f 75%, #050a0a 100%)' }}>
        <div className="w-8 h-8 border border-[#D4AF37]/40 border-t-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center font-lato gap-6"
        style={{ background: 'linear-gradient(160deg, #0a0a0f, #080808)' }}>
        <h1 className="font-playfair text-3xl text-[#D4AF37]">Article Not Found</h1>
        <Link href="/blog" className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30 hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-1">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden relative">
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="fixed inset-0 z-0" style={{ background: 'linear-gradient(160deg, #0a0a0f 0%, #0f0a05 25%, #080808 50%, #0a050f 75%, #050a0a 100%)' }} />
      <div className="fixed inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23D4AF37' stroke-width='0.4'/%3E%3C/svg%3E")` }} />
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[120px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[150px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #9B59B6, transparent 70%)' }} />

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
            <button onClick={() => router.push('/blog')} className="text-[#D4AF37] border-b border-[#D4AF37]/40 pb-0.5">Journal</button>
            <button onClick={() => router.push('/hall-of-fame')} className="hover:text-[#D4AF37] transition-colors">Hall of Fame</button>
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
                <div className="flex flex-col gap-5 mt-10">
                  {[['/', 'Home'], ['/blog', 'Journal'], ['/hall-of-fame', 'Hall of Fame'], ['/contact', 'Contact']].map(([href, label]) => (
                    <button key={href} onClick={() => router.push(href)} className="text-left text-sm font-playfair text-white/60 hover:text-[#D4AF37] transition-colors">{label}</button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pb-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto pt-10">
          {/* Back link */}
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-black text-white/25 hover:text-[#D4AF37] transition-colors mb-12 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Journal
          </Link>

          <article>
            <header className="mb-12">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent mb-8" />
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {post.authorImage ? (
                    <img
                      src={urlFor(post.authorImage).width(60).height(60).url()}
                      alt={post.name}
                      className="w-7 h-7 border border-[#D4AF37]/20 object-cover grayscale"
                    />
                  ) : (
                    <div className="w-7 h-7 border border-[#D4AF37]/20 flex items-center justify-center bg-white/[0.02]">
                      <span className="font-playfair text-[#D4AF37]/60 text-xs font-bold">{(post.name || 'D').charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-[9px] tracking-[0.3em] uppercase font-black text-[#D4AF37]/55">{post.name || 'Daami Editorial'}</span>
                </div>
                <div className="w-3 h-[1px] bg-white/10" />
                <span className="text-[9px] tracking-widest uppercase font-black text-white/20">
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h1 className="font-playfair font-black text-white leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}>
                {post.title}
              </h1>
              {post.metaDescription && (
                <p className="text-white/40 font-lato text-base leading-[1.9] border-l-2 border-[#D4AF37]/25 pl-4 mb-6">
                  {post.metaDescription}
                </p>
              )}
              <div className="w-full h-[1px] bg-white/5" />
            </header>

            {post.mainImage && (
              <div className="mb-12 relative">
                <img
                  src={urlFor(post.mainImage).width(1200).url()}
                  alt={post.title}
                  className="w-full h-auto object-cover border border-white/5"
                />
                <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-[#D4AF37]/30" />
                <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-[#D4AF37]/30" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-[#D4AF37]/30" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-[#D4AF37]/30" />
              </div>
            )}

            <div className="prose-container">
              <PortableText value={post.body} components={ptComponents} />
            </div>

            <div className="mt-16 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link href="/blog"
                  className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-black text-white/25 hover:text-[#D4AF37] transition-colors group">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  More Articles
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-[1px] bg-[#D4AF37]/30" />
                  <span className="text-[9px] tracking-widest uppercase font-black text-white/20">Daami Event Journal</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 pt-14 pb-10 px-4 md:px-6 font-lato">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-white/15" />
            <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/20">Daami Event</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-white/25 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={companyLogo.src} alt="Daami Event" className="h-6 w-6 object-cover border border-[#D4AF37]/20" />
                <span className="font-playfair text-sm text-white/50 tracking-widest">DAAMI EVENT</span>
              </div>
              <p className="text-xs leading-relaxed text-white/20">Redefining artistic excellence through curated competition and events.</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/18 font-bold mb-4">Navigation</p>
              {[['/', 'Home'], ['/blog', 'Journal'], ['/hall-of-fame', 'Hall of Fame'], ['/contact', 'Contact']].map(([href, label]) => (
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
