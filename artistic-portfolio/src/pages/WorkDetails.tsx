import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowLeft, ExternalLink, Calendar, User, Briefcase, Tag, Lock, Download, Printer, Clock, Wrench, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SEO } from '../components/SEO';

export function WorkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const work = data.works.find(w => w.id === id);
  
  // Find next and previous works
  const currentIndex = data.works.findIndex(w => w.id === id);
  const prevWork = currentIndex > 0 ? data.works[currentIndex - 1] : null;
  const nextWork = currentIndex < data.works.length - 1 ? data.works[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!work) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <SEO title="Project Not Found" description="This project could not be found." name={data.profile.name} />
        <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full brutal-border">
          Return Home
        </Link>
      </div>
    );
  }

  if (work.isPrivate && !isAuthenticated) {
    const handlePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === work.password) {
        setIsAuthenticated(true);
        setPasswordError('');
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    };

    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 grid-pattern">
        <SEO title={`Private Project | ${data.profile.name}`} description="This project is under NDA." name={data.profile.name} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-8 md:p-12 rounded-[2rem] brutal-border brutal-shadow max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-6 brutal-border">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase mb-2">Private Project</h1>
          <p className="opacity-70 mb-8">This project is under NDA. Please enter the password to view the case study.</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Password" 
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-center font-mono text-lg"
              />
              {passwordError && <p className="text-red-500 text-sm mt-2 font-bold">{passwordError}</p>}
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all">
              Unlock Case Study
            </button>
          </form>
          
          <Link to="/" className="inline-block mt-6 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            ← Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  const dynamicStyle = work.accentColor ? { '--color-primary': work.accentColor } as React.CSSProperties : {};

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": work.title,
    "description": work.description,
    "author": {
      "@type": "Person",
      "name": data.profile.name
    },
    "image": work.imageUrl,
    "url": window.location.href,
    "datePublished": work.year ? `${work.year}-01-01` : undefined,
    "keywords": work.tags?.join(", ")
  };

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 grid-pattern" style={dynamicStyle}>
      <SEO 
        title={`${work.title} | ${data.profile.name}`}
        description={work.description}
        name={data.profile.name}
        image={work.imageUrl}
        url={window.location.href}
        schema={workSchema}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        
        <div className="flex justify-between items-center mb-8 no-print">
          <Link to="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-accent dark:hover:text-primary transition-colors bg-card px-4 py-2 rounded-full brutal-border">
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
          <button 
            onClick={() => window.print()} 
            className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-accent dark:hover:text-primary transition-colors bg-card px-4 py-2 rounded-full brutal-border"
          >
            <Printer size={20} /> Download PDF
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-[2rem] p-4 sm:p-8 brutal-border brutal-shadow mb-12"
        >
          <div className="aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden mb-8 brutal-border bg-black">
            <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 leading-tight">
                {work.title}
              </h1>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl font-medium leading-relaxed mb-6 text-accent dark:text-primary">
                  {work.description}
                </p>
                
                {work.tags && work.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {work.tags.map((tag, idx) => (
                      <span key={idx} className="px-4 py-2 bg-secondary/20 text-sm font-bold uppercase tracking-widest rounded-full brutal-border">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {work.content && (
                  <div className="text-lg opacity-80 leading-relaxed whitespace-pre-wrap space-y-6">
                    {work.content}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-72 flex-shrink-0 space-y-6">
              <div className="bg-secondary/10 p-6 rounded-2xl brutal-border">
                <h3 className="font-bold uppercase tracking-widest mb-4 border-b-2 border-border pb-2">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-1"><Tag size={14}/> Category</span>
                    <p className="font-medium">{work.category}</p>
                  </div>
                  
                  {work.year && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-1"><Calendar size={14}/> Year</span>
                      <p className="font-medium">{work.year}</p>
                    </div>
                  )}
                  
                  {work.client && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-1"><User size={14}/> Client</span>
                      <p className="font-medium">{work.client}</p>
                    </div>
                  )}
                  
                  {work.role && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-1"><Briefcase size={14}/> My Role</span>
                      <p className="font-medium">{work.role}</p>
                    </div>
                  )}
                  
                  {work.duration && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-1"><Clock size={14}/> Duration</span>
                      <p className="font-medium">{work.duration}</p>
                    </div>
                  )}
                </div>

                {work.deliverables && work.deliverables.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-border">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-3"><Layers size={14}/> Deliverables</span>
                    <ul className="list-disc list-inside font-medium space-y-1">
                      {work.deliverables.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {work.tools && work.tools.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-border">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 mb-3"><Wrench size={14}/> Tools Used</span>
                    <div className="flex flex-wrap gap-2">
                      {work.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-card border-2 border-border rounded-full text-xs font-bold uppercase tracking-wider">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {work.projectUrl && (
                  <a 
                    href={work.projectUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold uppercase tracking-widest brutal-border brutal-shadow-hover transition-all text-sm"
                  >
                    Live Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        {work.beforeAfter && (
          <div className="mb-16 print-break-inside-avoid">
            <h2 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
              <span className="w-6 h-6 bg-primary rounded-full inline-block brutal-border" style={{ backgroundColor: work.accentColor || 'var(--color-primary)' }}></span>
              Process: Before & After
            </h2>
            <BeforeAfterSlider beforeImage={work.beforeAfter.before} afterImage={work.beforeAfter.after} />
          </div>
        )}

        {work.gallery && work.gallery.length > 0 && (
          <div className="mb-16 print-break-inside-avoid">
            <h2 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
              <span className="w-6 h-6 bg-primary rounded-full inline-block brutal-border" style={{ backgroundColor: work.accentColor || 'var(--color-primary)' }}></span>
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.gallery.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-[1.5rem] overflow-hidden brutal-border brutal-shadow ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}
                >
                  <img src={img} alt={`${work.title} gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Project Testimonial */}
        {work.testimonial && (
          <div className="mb-16 print-break-inside-avoid">
            <div className="bg-card p-8 md:p-12 rounded-[2rem] brutal-border brutal-shadow relative overflow-hidden">
              <div className="text-8xl text-black dark:text-primary font-display absolute top-4 right-8 opacity-20" style={{ color: work.accentColor || 'var(--color-primary)' }}>"</div>
              <p className="text-xl md:text-3xl italic font-medium mb-8 relative z-10 leading-relaxed">"{work.testimonial.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                {work.testimonial.avatarUrl ? (
                  <img src={work.testimonial.avatarUrl} alt={work.testimonial.clientName} className="w-16 h-16 rounded-full brutal-border object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-2xl brutal-border">
                    {work.testimonial.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-lg">{work.testimonial.clientName}</h4>
                  {work.testimonial.company && <p className="text-sm opacity-70 uppercase tracking-widest">{work.testimonial.company}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next / Prev Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2 border-border no-print">
          {prevWork ? (
            <Link to={`/work/${prevWork.id}`} className="flex-1 w-full group bg-card p-6 rounded-2xl brutal-border brutal-shadow-hover transition-all">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2 block">Previous Project</span>
              <span className="text-xl font-display font-bold uppercase group-hover:text-accent dark:group-hover:text-primary transition-colors">{prevWork.title}</span>
            </Link>
          ) : <div className="flex-1 w-full"></div>}
          
          {nextWork ? (
            <Link to={`/work/${nextWork.id}`} className="flex-1 w-full group bg-card p-6 rounded-2xl brutal-border brutal-shadow-hover transition-all text-right">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2 block">Next Project</span>
              <span className="text-xl font-display font-bold uppercase group-hover:text-accent dark:group-hover:text-primary transition-colors">{nextWork.title}</span>
            </Link>
          ) : <div className="flex-1 w-full"></div>}
        </div>

      </div>
    </div>
  );
}
