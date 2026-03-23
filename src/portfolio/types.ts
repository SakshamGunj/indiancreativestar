export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  text: string;
  avatarUrl?: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  gallery?: string[];
  category: string;
  featured: boolean;
  year?: string;
  projectUrl?: string;
  client?: string;
  role?: string;
  accentColor?: string;
  isPrivate?: boolean;
  password?: string;
  beforeAfter?: BeforeAfter;
  testimonial?: Testimonial;
  duration?: string;
  tags?: string[];
  tools?: string[];
  deliverables?: string[];
}

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface ArtistProfile {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp?: string;
  resumeUrl?: string;
  availableForFreelance: boolean;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    dribbble?: string;
    linkedin?: string;
  };
  heroImage: string;
  skills: string[];
  services: Service[];
  testimonials?: Testimonial[];
}

export interface PortfolioData {
  profile: ArtistProfile;
  works: Work[];
}
