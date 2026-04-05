import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { client, urlFor } from "@/lib/sanity";
import { Snowflake, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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
  const navigate = useNavigate();

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
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5DC] font-lato selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
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
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/40 flex items-center gap-1">
                        Event Management <span className="text-blue-400">• Winter Edition</span>
                    </p>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-white/80 font-medium">
                <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Home</button>
                <button onClick={() => navigate('/indiancreativestar/v2')} className="hover:text-[#D4AF37] transition-colors duration-300 relative group">Events</button>
                <button onClick={() => navigate('/blog')} className="text-[#D4AF37] transition-colors duration-300 relative group border-b border-[#D4AF37]">Journal</button>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={() => navigate('/winterartroyale/v2')}
                    className="hidden sm:flex bg-[#D4AF37] text-black hover:bg-[#B59530] font-playfair rounded-none px-4 md:px-6 tracking-wide text-xs md:text-sm"
                >
                    LATEST EVENT
                </Button>

                {/* Mobile Menu Trigger */}
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
                                    <button onClick={() => navigate('/indiancreativestar/v2')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Events</button>
                                    <button onClick={() => navigate('/contact-us')} className="block w-full text-left hover:text-[#D4AF37] transition-colors">Contact</button>
                                    
                                    <div className="pt-4 border-t border-white/10">
                                        <button
                                            onClick={() => navigate('/winterartroyale/v2')}
                                            className="w-full text-left group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-4 transition-all hover:bg-blue-900"
                                        >
                                            <div className="relative z-10 flex items-center justify-between">
                                                <div>
                                                    <span className="block text-[10px] uppercase tracking-widest text-blue-300 font-bold mb-1">Live Now</span>
                                                    <span className="block text-xl font-bold text-white">Winter Art Royale</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
      </nav>

      <Helmet>
        <title>Journal | Daami Event</title>
        <meta name="description" content="Insights, announcements, and artistic inspiration from the Daami Event community." />
      </Helmet>
      
      <main className="relative z-10 flex-grow pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Header Title Matching Daami Event Grand Welcome */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 px-6 py-2 bg-[#D4AF37]/5 backdrop-blur-md rounded-full mb-8">
            <span className="text-[#D4AF37] text-xs md:text-sm tracking-[0.2em] font-bold uppercase">The Official Publication</span>
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
            Daami Event <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] italic">
              Journal.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Stories, tips, announcements, and artistic inspiration straight from the core of the Daami Event community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug.current}`}
                className="group relative bg-[#1A1A1A] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] block"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).width(800).height(600).url()}
                      alt={post.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-in-out opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0F0F0F] flex items-center justify-center border-b border-white/10">
                      <Snowflake className="w-12 h-12 text-[#D4AF37]/20" />
                    </div>
                  )}
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-center text-[10px] text-[#D4AF37] mb-4 font-bold tracking-[0.2em] uppercase">
                    <span>{post.authorName || "Daami Editorial"}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-playfair text-2xl md:text-3xl text-[#F5F5DC] mb-4 leading-[1.3] group-hover:text-[#D4AF37] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/50 line-clamp-3 text-sm leading-relaxed mb-8 font-light">
                    {post.metaDescription}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold tracking-widest text-white uppercase group-hover:text-[#D4AF37] transition-colors">
                    Read Article 
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer matching Index.tsx */}
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
                      <li><button onClick={() => navigate('/indiancreativestar/v2')} className="hover:text-[#D4AF37]">Competitions</button></li>
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
