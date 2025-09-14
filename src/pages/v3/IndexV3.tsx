import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Confetti } from "@/components/Confetti";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Palette, 
  Users, 
  Star, 
  Award, 
  Trophy, 
  BookOpen, 
  Heart, 
  Camera, 
  Brush, 
  Music, 
  Lightbulb, 
  Clock, 
  Calendar, 
  Gift, 
  Globe, 
  Zap, 
  Target, 
  X, 
  Shield, 
  Loader2,
  ChevronDown,
  Play,
  Sparkles
} from "lucide-react";

interface IndexV3Props {
  onRegistrationClick?: () => void;
}

const IndexV3 = ({ onRegistrationClick }: IndexV3Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRegistrationDrawer, setShowRegistrationDrawer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const prizesRef = useRef(null);
  const galleryRef = useRef(null);
  const faqRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    category: 'adult'
  });

  // Apple-style animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleRegisterClick = () => {    
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      setShowRegistrationDrawer(true);
    }
  };

  const handleCloseModal = () => {
    setShowRegistrationDrawer(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determine category based on age
      let category = "Adult";
      const age = parseInt(formData.age);
      if (age >= 5 && age <= 8) {
        category = "Group A (5-8 years)";
      } else if (age >= 9 && age <= 12) {
        category = "Group B (9-12 years)";
      } else if (age >= 13 && age <= 17) {
        category = "Group C (13-17 years)";
      }

      // Prepare participant data for Firebase
      const participantData = {
        name: formData.name,
        age: parseInt(formData.age),
        whatsapp: formData.phone,
        email: formData.email,
        instagram: "",
        contestType: "art",
        category: category
      };

      // Save to Firebase
      const { addParticipant } = await import("@/lib/firebase");
      const result = await addParticipant(participantData);

      if (result.success) {
        setShowRegistrationDrawer(false);

        // Navigate to thank you page
        const qp = new URLSearchParams({
          name: formData.name,
          type: "art",
          id: result.id,
          age: String(formData.age ?? ""),
          whatsapp: formData.phone ?? "",
          email: formData.email ?? "",
          instagram: "",
          category
        });

        // Persist locally as fallback
        try {
          sessionStorage.setItem(
            "ics_last_registration",
            JSON.stringify({
              id: result.id,
              name: formData.name,
              type: "art",
              age: String(formData.age ?? ""),
              whatsapp: formData.phone ?? "",
              email: formData.email ?? "",
              instagram: "",
              category
            })
          );
        } catch (e) {
          // ignore
        }

        navigate(`/thank-you?${qp.toString()}`);
      } else {
        console.error("Registration failed:", result);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      alert("Registration failed. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {showConfetti && <Confetti />}
      
      {/* Apple-style Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Indian Creative Star</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection(prizesRef)}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  Prizes
                </button>
                <button 
                  onClick={() => scrollToSection(galleryRef)}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => scrollToSection(faqRef)}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  FAQ
                </button>
              </div>
            </div>
            
            <Button 
              onClick={handleRegisterClick}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Register Now
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Apple Style */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                Season 1 • Limited Time
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-tight">
                Indian Creative Star
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
                India's most prestigious art competition. 
                <br className="hidden md:block" />
                Where creativity meets recognition.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 py-8">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900">₹50,000</div>
                <div className="text-sm text-gray-500 font-medium">Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900">1,000+</div>
                <div className="text-sm text-gray-500 font-medium">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900">Nationwide</div>
                <div className="text-sm text-gray-500 font-medium">Platform</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <Button 
                onClick={handleRegisterClick}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-500">Entry Fee: ₹249 • All participants receive certificates</p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              variants={fadeInUp}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-gray-400"
              >
                <span className="text-xs font-medium mb-2">Scroll to explore</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft} className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Your creative journey starts here
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Join thousands of artists across India in this nationwide art movement. 
                  Whether you're an established artist or just starting out, this is your 
                  platform to showcase talent and gain recognition.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Community</h3>
                    <p className="text-sm text-gray-600">Connect with like-minded artists nationwide</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Recognition</h3>
                    <p className="text-sm text-gray-600">Official certificates and digital badges</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Opportunities</h3>
                    <p className="text-sm text-gray-600">Featured in e-magazine and exhibitions</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={slideInRight} className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8">
                <div className="h-full bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">Open Theme</h3>
                    <p className="text-gray-600">Express your creativity freely</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Prizes Section */}
      <motion.section 
        ref={prizesRef}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Win amazing prizes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compete for a share of our ₹50,000 prize pool across multiple categories
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Adult Competition */}
            <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Adult Competition</h3>
                <p className="text-gray-600">18+ Years • Prize Pool: ₹30,000</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-semibold text-sm">1</span>
                    </div>
                    <span className="font-medium text-gray-900">First Place</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹15,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">2</span>
                    </div>
                    <span className="font-medium text-gray-900">Second Place</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹10,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">3</span>
                    </div>
                    <span className="font-medium text-gray-900">Third Place</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹5,000</span>
                </div>
              </div>
            </motion.div>

            {/* Kids Competition */}
            <motion.div variants={scaleIn} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Kids Competition</h3>
                <p className="text-gray-600">5-17 Years • Prize Pool: ₹20,000</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">A</span>
                    </div>
                    <span className="font-medium text-gray-900">Group A (5-8 years)</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹5,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">B</span>
                    </div>
                    <span className="font-medium text-gray-900">Group B (9-12 years)</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹5,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">C</span>
                    </div>
                    <span className="font-medium text-gray-900">Group C (13-17 years)</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">₹10,000</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                How it works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple steps to participate in India's premier art competition
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Register",
                description: "Complete the simple registration form and join our community",
                icon: Users
              },
              {
                step: "02", 
                title: "Submit Artwork",
                description: "Upload your masterpiece through our easy submission portal",
                icon: Camera
              },
              {
                step: "03",
                title: "Judging & Voting",
                description: "Expert judges and public voting determine the winners",
                icon: Star
              },
              {
                step: "04",
                title: "Winners Announced",
                description: "Celebrate the winners and receive your certificates",
                icon: Trophy
              }
            ].map((item, index) => (
              <motion.div key={index} variants={scaleIn} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-2">{item.step}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        ref={galleryRef}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Featured artwork
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the incredible talent from our community of artists
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=400&auto=format&fit=crop", 
              "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1536924940846-222b320bb0b6?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop"
            ].map((image, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                className="aspect-square bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="py-24 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Frequently asked questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about the competition
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              {
                question: "What is the theme of the competition?",
                answer: "The competition has an open theme, allowing you to express your creativity freely. We encourage all forms of artistic expression."
              },
              {
                question: "Who can participate?",
                answer: "The competition is open to all artists across India, of all ages and skill levels. We have separate categories for different age groups."
              },
              {
                question: "What are the submission guidelines?",
                answer: "You can submit up to three artworks in any medium (painting, drawing, digital art, etc.). Please ensure your submissions are in high resolution."
              },
              {
                question: "How is the judging process?",
                answer: "We have a dual judging process with expert judges and public voting to ensure the most deserving artists are recognized."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Ready to showcase your talent?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of artists and be part of India's premier art competition
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Button 
                onClick={handleRegisterClick}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Registration Modal */}
      {!onRegistrationClick && (
        <Dialog open={showRegistrationDrawer} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
          <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light text-center mb-2">
                Join Indian Creative Star
              </DialogTitle>
              <p className="text-gray-600 text-center">
                Register for India's premier art competition
              </p>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">WhatsApp Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your WhatsApp number"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min={1}
                    max={120}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-full font-medium transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Register Now
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900">Indian Creative Star</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-1">
                © 2025 Daami Event. All rights reserved.
              </p>
              <p className="text-xs text-gray-500">
                Empowering artists nationwide through creative competitions
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexV3;