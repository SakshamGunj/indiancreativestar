import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Work, Service } from '../types';

const defaultData: PortfolioData = {
  profile: {
    name: "Alex Rivera",
    tagline: "WHERE STYLE MEETS WAGGING TAILS... wait, no. WHERE ART MEETS DIGITAL.",
    bio: "I am a digital artist and UI/UX designer specializing in vibrant, brutalist, and highly functional interfaces. My work explores the intersection of bold typography, playful colors, and structured layouts. Based in India, I collaborate with global clients to bring their boldest visions to life.",
    email: "hello@alexrivera.art",
    whatsapp: "+919876543210",
    resumeUrl: "https://example.com/resume.pdf",
    availableForFreelance: true,
    socialLinks: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com",
      linkedin: "https://linkedin.com"
    },
    heroImage: "https://images.unsplash.com/photo-1554147090-e1221a04a025?auto=format&fit=crop&q=80&w=2000",
    skills: ["Figma", "React", "TypeScript", "UI/UX Design", "Creative Coding", "Blender 3D", "Typography", "Brutalism"],
    services: [
      {
        id: "s1",
        title: "UI/UX Design",
        price: "Starts at $500",
        description: "Full-stack product design from wireframes to high-fidelity prototypes. I focus on usability and bold aesthetics."
      },
      {
        id: "s2",
        title: "Brand Identity",
        price: "Starts at $800",
        description: "Logos, color palettes, typography, and brand guidelines that make your business stand out."
      },
      {
        id: "s3",
        title: "3D Illustration",
        price: "Starts at $300",
        description: "Custom 3D assets and illustrations for your website, app, or marketing materials."
      }
    ],
    testimonials: [
      {
        id: "t1",
        clientName: "Sarah Jenkins",
        company: "Cyberpunk Records",
        text: "Alex completely transformed our brand identity. The new website is not just a site, it's an experience. Conversion rates are up 40% since launch.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: "t2",
        clientName: "Rahul Sharma",
        company: "EduTech India",
        text: "Working with Alex was a breeze. They understood our vision immediately and delivered a dashboard that our students absolutely love using.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  works: [
    {
      id: "1",
      title: "Neon Dreams",
      description: "A brutalist exploration of neon colors and grid systems.",
      content: "This project was born out of a desire to break free from clean, minimalist corporate design. I wanted to explore how far I could push high-contrast neon colors while maintaining accessibility and usability. The result is a highly interactive web experience that feels like a digital poster.\n\nWe started with a mood board full of 90s rave flyers and early internet aesthetics. The challenge was translating that chaotic energy into a usable interface. I utilized CSS Grid extensively to create overlapping, structured chaos.",
      imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
      gallery: [
        "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000"
      ],
      category: "Web Design",
      featured: true,
      year: "2025",
      client: "Cyberpunk Records",
      role: "Lead Designer & Developer",
      projectUrl: "https://example.com/neon",
      accentColor: "#FF00FF",
      duration: "4 Weeks",
      tags: ["Brutalism", "Web Design", "Creative Coding"],
      tools: ["Figma", "React", "Tailwind CSS"],
      deliverables: ["Brand Identity", "Responsive Website", "Custom Animations"],
      beforeAfter: {
        before: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000", // Wireframe-ish
        after: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000"
      },
      testimonial: {
        id: "t1",
        clientName: "Sarah Jenkins",
        company: "Cyberpunk Records",
        text: "Alex completely transformed our brand identity. The new website is not just a site, it's an experience. Conversion rates are up 40% since launch."
      }
    },
    {
      id: "2",
      title: "Pastel Productivity",
      description: "Soft UI for a task management application.",
      content: "A concept for a to-do list app that doesn't stress you out. By utilizing a soft pastel color palette and rounded, friendly shapes, the interface encourages users to engage with their tasks without feeling overwhelmed.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      gallery: [
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000"
      ],
      category: "UI/UX",
      featured: true,
      year: "2024",
      client: "Internal Concept",
      role: "Product Designer",
      accentColor: "#A7F3D0",
      duration: "2 Weeks",
      tags: ["Productivity", "Soft UI", "Mobile App"],
      tools: ["Figma", "Protopie"],
      deliverables: ["High-Fidelity Prototypes", "Design System"]
    },
    {
      id: "3",
      title: "Learnify Dashboard",
      description: "A colorful and engaging learning management system interface.",
      content: "Education platforms are often dry and clinical. Learnify injects gamification and vibrant color coding into the learning experience, making it easier for students to track their progress and stay motivated.",
      imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000",
      category: "Dashboard",
      featured: false,
      year: "2024",
      client: "EduTech India",
      role: "UI Designer",
      accentColor: "#FBBF24",
      duration: "3 Months",
      tags: ["EdTech", "Gamification", "Dashboard"],
      tools: ["Figma", "Illustrator"],
      deliverables: ["User Research", "Wireframes", "UI Design"]
    },
    {
      id: "4",
      title: "Abstract Thoughts",
      description: "Personal exploration of 3D shapes and vibrant lighting.",
      content: "A series of daily renders exploring subsurface scattering, glass dispersion, and neon emissions in Blender. This series helped me understand lighting setups that I now apply to my 2D UI work.",
      imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000",
      category: "3D Art",
      featured: true,
      year: "2023",
      accentColor: "#8B5CF6"
    },
    {
      id: "5",
      title: "Project X (NDA)",
      description: "A highly confidential FinTech dashboard redesign for a major bank.",
      content: "Due to NDA restrictions, this project is password protected. It involves a complete overhaul of a legacy banking system, focusing on data visualization, accessibility, and modernizing the user flow for over 2 million daily active users.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      category: "UI/UX",
      featured: false,
      year: "2025",
      client: "Confidential Bank",
      role: "Lead UX Designer",
      isPrivate: true,
      password: "admin",
      accentColor: "#1E3A8A"
    }
  ]
};

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  addWork: (work: Omit<Work, 'id'>) => void;
  updateWork: (id: string, work: Partial<Work>) => void;
  deleteWork: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new arrays/fields exist for older saves
      if (!parsed.profile.skills) parsed.profile.skills = defaultData.profile.skills;
      if (!parsed.profile.services) parsed.profile.services = defaultData.profile.services;
      if (parsed.profile.availableForFreelance === undefined) parsed.profile.availableForFreelance = true;
      return parsed;
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateProfile = (profileUpdate: Partial<PortfolioData['profile']>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  const addWork = (work: Omit<Work, 'id'>) => {
    const newWork: Work = {
      ...work,
      id: Math.random().toString(36).substr(2, 9)
    };
    setData(prev => ({
      ...prev,
      works: [...prev.works, newWork]
    }));
  };

  const updateWork = (id: string, workUpdate: Partial<Work>) => {
    setData(prev => ({
      ...prev,
      works: prev.works.map(w => w.id === id ? { ...w, ...workUpdate } : w)
    }));
  };

  const deleteWork = (id: string) => {
    setData(prev => ({
      ...prev,
      works: prev.works.filter(w => w.id !== id)
    }));
  };

  return (
    <PortfolioContext.Provider value={{ data, updateProfile, addWork, updateWork, deleteWork }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
