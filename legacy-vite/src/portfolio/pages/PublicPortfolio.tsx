import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, ExternalLink, Calendar, Tag, Download, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PublicPortfolio() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isContactSent, setIsContactSent] = useState(false);

  const publicWorks = data.works.filter(w => !w.isPrivate);
  const categories = ['All', ...new Set(publicWorks.map(w => w.category))];

  const filteredWorks = activeCategory === 'All' 
    ? publicWorks 
    : publicWorks.filter(w => w.category === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSent(true);
    setTimeout(() => setIsContactSent(false), 3000);
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.profile.name,
    "jobTitle": "Digital Artist & UI/UX Designer",
    "description": data.profile.bio,
    "image": data.profile.heroImage,
    "url": window.location.href,
    "sameAs": Object.values(data.profile.socialLinks).filter(Boolean)
  };

  return (
    <div className="min-h-screen grid-pattern">
      <SEO 
        title={`${data.profile.name} | Portfolio`}
        description={data.profile.tagline}
        name={data.profile.name}
        image={data.profile.heroImage}
        url={window.location.href}
        schema={personSchema}
      />
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {data.profile.availableForFreelance && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-black dark:text-white rounded-full brutal-border text-sm font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Available for Freelance
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-8"
        >
          <div className="absolute -inset-3 sm:-inset-4 bg-primary rounded-[2.5rem] sm:rounded-[3rem] -z-10 transform rotate-2 brutal-border"></div>
          <img
            src={data.profile.heroImage}
            alt={data.profile.name}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-[2rem] sm:rounded-[2.5rem] brutal-border"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] mb-6"
        >
          {data.profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-3xl font-medium max-w-3xl mx-auto mb-10 text-black/80 dark:text-white/80 px-2"
        >
          {data.profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest brutal-border brutal-shadow-hover transition-all"
          >
            View Work <ArrowRight size={20} />
          </a>
          {data.profile.resumeUrl && (
            <a
              href={data.profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-card text-black dark:text-white rounded-full font-bold uppercase tracking-widest brutal-border brutal-shadow-hover transition-all"
            >
              Resume <Download size={20} />
            </a>
          )}
        </motion.div>
      </section>

      {/* Marquee Section */}
      {data.profile.skills && data.profile.skills.length > 0 && (
        <section className="py-8 border-y-2 border-border bg-secondary overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee flex gap-8 items-center">
            {[...data.profile.skills, ...data.profile.skills, ...data.profile.skills].map((skill, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl md:text-6xl font-display font-black uppercase text-black tracking-tighter">
                  {skill}
                </span>
                <span className="text-black text-2xl">✦</span>
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* Works Section */}
      <section id="work" className="py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase flex items-center gap-3 md:gap-4">
            <span className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full inline-block brutal-border"></span>
            Selected Works
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm brutal-border transition-all ${
                  activeCategory === cat 
                    ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-card hover:bg-primary/20 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.div
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-card rounded-[1.5rem] md:rounded-[2rem] p-4 brutal-border brutal-shadow-hover transition-all overflow-hidden"
              >
                <Link to={`/work/${work.id}`} className="block">
                  <div className="aspect-[4/3] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-4 md:mb-6 brutal-border relative">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-primary text-black font-bold uppercase tracking-widest px-6 py-3 rounded-full brutal-border transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Case Study
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end px-2">
                    <div className="flex-1 pr-4">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-black dark:text-white text-xs font-bold uppercase tracking-wider rounded-full brutal-border mb-2 md:mb-3">
                        {work.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold uppercase leading-tight">{work.title}</h3>
                      <p className="text-sm mt-2 opacity-80 line-clamp-2">{work.description}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center brutal-border flex-shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Services Section */}
      {data.profile.services && data.profile.services.length > 0 && (
        <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase mb-8 md:mb-12 flex items-center gap-3 md:gap-4">
            <span className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-full inline-block brutal-border"></span>
            My Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.profile.services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 md:p-8 rounded-[2rem] brutal-border brutal-shadow flex flex-col h-full"
              >
                <h3 className="text-2xl font-display font-bold uppercase mb-2">{service.title}</h3>
                <span className="inline-block px-3 py-1 bg-secondary/20 text-black dark:text-white text-sm font-bold uppercase tracking-wider rounded-full brutal-border mb-4 self-start">
                  {service.price}
                </span>
                <p className="opacity-80 leading-relaxed flex-1">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {data.profile.testimonials && data.profile.testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-secondary/30 border-y-2 border-border w-full">
          <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase mb-8 md:mb-12 flex items-center gap-3 md:gap-4 justify-center text-center">
              <span className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full inline-block brutal-border"></span>
              Client Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {data.profile.testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 md:p-8 rounded-[2rem] brutal-border brutal-shadow flex flex-col h-full relative"
                >
                  <div className="text-6xl text-black dark:text-primary font-display absolute top-4 right-6 opacity-30">"</div>
                  <p className="text-lg md:text-xl italic font-medium mb-8 relative z-10 flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.clientName} className="w-12 h-12 rounded-full brutal-border object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xl brutal-border">
                        {testimonial.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm">{testimonial.clientName}</h4>
                      {testimonial.company && <p className="text-xs opacity-70 uppercase tracking-widest">{testimonial.company}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-accent text-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 brutal-border brutal-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase mb-6 md:mb-8">About Me</h2>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-8 md:mb-12">
              {data.profile.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {data.profile.socialLinks.instagram && (
                <a href={data.profile.socialLinks.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 sm:py-3 bg-transparent border-2 border-white text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Instagram
                </a>
              )}
              {data.profile.socialLinks.twitter && (
                <a href={data.profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 sm:py-3 bg-transparent border-2 border-white text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Twitter
                </a>
              )}
              {data.profile.socialLinks.linkedin && (
                <a href={data.profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 sm:py-3 bg-transparent border-2 border-white text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
        <div className="bg-card rounded-[2rem] p-6 sm:p-8 md:p-12 brutal-border brutal-shadow">
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase mb-4">Let's Work Together</h2>
          <p className="text-lg opacity-80 mb-8">Got a project in mind? Fill out the form below or reach out directly.</p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <form onSubmit={handleContactSubmit} className="space-y-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
                  <input required type="text" className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                  <input required type="email" className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea required className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors h-32 resize-none text-base" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all flex items-center justify-center gap-2">
                {isContactSent ? 'Message Sent!' : <><Mail size={20} /> Send Message</>}
              </button>
            </form>

            <div className="w-full md:w-64 flex flex-col gap-4">
              <div className="p-6 bg-secondary/10 rounded-2xl brutal-border flex-1">
                <h3 className="font-bold uppercase tracking-widest mb-4 border-b-2 border-border pb-2">Direct Contact</h3>
                <a href={`mailto:${data.profile.email}`} className="flex items-center gap-3 font-medium hover:text-accent dark:hover:text-primary transition-colors mb-4">
                  <Mail size={18} /> Email Me
                </a>
                {data.profile.whatsapp && (
                  <a href={`https://wa.me/${data.profile.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium hover:text-accent dark:hover:text-primary transition-colors text-[#25D366]">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center font-medium uppercase tracking-widest text-xs sm:text-sm border-t-2 border-border mt-10 px-4">
        <p>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
