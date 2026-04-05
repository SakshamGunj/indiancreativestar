import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";
import { Snowflake, Menu, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import companyLogo from "@/assets/images/company-logo.webp";

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-12">
          <img
            alt={value.alt || "Blog Image"}
            src={urlFor(value).width(1200).url()}
            className="w-full shadow-2xl border border-white/10"
            loading="lazy"
          />
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] mt-16 mb-8 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-playfair text-3xl md:text-4xl text-[#F5F5DC] mt-12 mb-6 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-playfair text-2xl md:text-3xl text-white/90 mt-10 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 font-light tracking-wide">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#D4AF37] pl-8 py-2 my-10 font-playfair italic text-2xl md:text-3xl text-[#D4AF37] leading-relaxed">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-8 text-lg md:text-xl text-white/70 font-light space-y-4 marker:text-[#D4AF37]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 text-lg md:text-xl text-white/70 font-light space-y-4 marker:text-[#D4AF37]">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#F2D06B] underline decoration-[#D4AF37]/30 underline-offset-8 transition-colors">
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

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      .then((data) => {
        setPost(data);
        setLoading(false);
        window.scrollTo(0,0);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex justify-center items-center">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center font-lato">
        <h1 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] mb-6">Article Not Found</h1>
        <Link to="/blog" className="text-sm tracking-widest uppercase border-b border-[#D4AF37] text-white/60 hover:text-white pb-1 transition-colors">Return to Journal</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.mainImage ? urlFor(post.mainImage).url() : "",
    "author": {
      "@type": "Person",
      "name": post.name || "Daami Editorial"
    },
    "datePublished": post.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "Daami Event",
      "logo": {
        "@type": "ImageObject",
        "url": "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <Helmet>
        <title>{`${post.title} | Daami Event`}</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        {post.mainImage && <meta property="og:image" content={urlFor(post.mainImage).url()} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}></div>

      {/* Navigation matching Index.tsx */}
      <nav className="relative z-50 px-4 md:px-6 py-4 md:py-6 border-b border-[#D4AF37]/20 backdrop-blur-sm sticky top-0 bg-[#0F0F0F]/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <div className="relative">
                    <img src={companyLogo} alt="Daami Event" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-[#D4AF37]/50" />
                    <Snowflake className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 animate-spin-slow bg-black/50 rounded-full p-0.5" />
                </div>
                <div>
                    <h1 className="font-playfair text-lg md:text-xl tracking-wider text-[#D4AF37] flex items-center gap-2">
                        DAAMI EVENT
                    </h1>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-white/80 font-medium">
                <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Home</button>
                <button onClick={() => navigate('/blog')} className="text-[#D4AF37] transition-colors duration-300 relative group border-b border-[#D4AF37]">Journal</button>
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={() => navigate('/winterartroyale/v2')} className="hidden sm:flex bg-[#D4AF37] text-black hover:bg-[#B59530] font-playfair rounded-none px-4 md:px-6 tracking-wide text-xs md:text-sm">
                    LATEST EVENT
                </Button>
                <div className="md:hidden text-white hover:text-[#D4AF37]">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-white/10">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#0F0F0F] border-l border-white/10 text-white w-[300px]">
                            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                            <div className="flex flex-col gap-8 mt-10">
                                <div className="space-y-6 text-lg tracking-wider font-playfair">
                                    <button onClick={() => navigate('/')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Home</button>
                                    <button onClick={() => navigate('/blog')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Journal</button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow pt-16 pb-32 px-6 md:px-12 w-full max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-xs tracking-[0.2em] font-bold uppercase text-white/40 hover:text-[#D4AF37] mb-16 transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" />
          Back to Journal
        </Link>
        
        <article>
          <header className="mb-20 text-center">
            <div className="uppercase tracking-[0.3em] text-[#D4AF37] text-xs font-bold mb-8">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-10 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-[#D4AF37]/50" />
              <div className="flex items-center gap-3">
                {post.authorImage ? (
                  <img 
                    src={urlFor(post.authorImage).width(100).height(100).url()} 
                    alt={post.name}
                    className="w-10 h-10 rounded-full border border-[#D4AF37]/30 object-cover grayscale opacity-80"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#1A1A1A]">
                    <span className="font-playfair text-[#D4AF37] text-lg">{post.name ? post.name.charAt(0) : "D"}</span>
                  </div>
                )}
                <span className="tracking-widest uppercase text-xs text-white/50 font-bold">{post.name || "Daami Editorial"}</span>
              </div>
              <div className="w-12 h-px bg-[#D4AF37]/50" />
            </div>
          </header>

          {post.mainImage && (
            <div className="mb-20">
              <img 
                src={urlFor(post.mainImage).width(1200).url()} 
                alt={post.title}
                className="w-full h-auto object-cover border border-white/5 opacity-90 shadow-2xl"
              />
            </div>
          )}

          <div className="prose-container max-w-3xl mx-auto text-left">
            <PortableText 
              value={post.body} 
              components={ptComponents}
            />
          </div>
        </article>
      </main>

      <footer className="relative z-10 bg-[#050505] text-white/40 py-16 px-6 border-t border-white/5 font-lato">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
              <div className="space-y-6">
                  <h5 className="font-playfair text-2xl text-[#D4AF37]">Daami Event</h5>
                  <p className="text-sm leading-relaxed">
                      Redefining artistic excellence through curated competition and events. Empowering the next generation of creators.
                  </p>
              </div>

              <div>
                  <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Navigation</h6>
                  <ul className="space-y-4 text-sm">
                      <li><button onClick={() => navigate('/')} className="hover:text-[#D4AF37]">Home</button></li>
                      <li><button onClick={() => navigate('/blog')} className="hover:text-[#D4AF37]">Journal</button></li>
                      <li><button onClick={() => navigate('/contact-us')} className="hover:text-[#D4AF37]">Contact</button></li>
                  </ul>
              </div>

              <div>
                  <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Legal</h6>
                  <ul className="space-y-4 text-sm">
                      <li><button onClick={() => navigate('/privacy-policy')} className="hover:text-[#D4AF37]">Privacy Policy</button></li>
                      <li><button onClick={() => navigate('/terms-and-conditions')} className="hover:text-[#D4AF37]">Terms & Conditions</button></li>
                      <li><button onClick={() => navigate('/refund-and-cancellation')} className="hover:text-[#D4AF37]">Refund Policy</button></li>
                  </ul>
              </div>

              <div className="flex flex-col items-center md:items-start">
                  <h6 className="text-white font-medium mb-6 tracking-widest uppercase text-xs">Connect</h6>
                  <Button onClick={() => navigate('/contact-us')} variant="outline" className="border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] rounded-none px-6 tracking-widest uppercase text-xs">
                      Contact Support
                  </Button>
              </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-[10px] tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} Daami Event. All Rights Reserved.
          </div>
      </footer>

      <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}</style>
    </div>
  );
}
