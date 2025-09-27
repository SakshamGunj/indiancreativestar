import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users, Upload, Award, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HowItWorksSectionV2Props {
  onRegistrationClick?: () => void;
}

function HowItWorksSectionV2({ onRegistrationClick }: HowItWorksSectionV2Props) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-20px" });
  const isStepsInView = useInView(stepsRef, { once: true, margin: "-50px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      } 
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -150, rotateY: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      } 
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 150, rotateY: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      } 
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.5, rotateX: -45 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.7, rotateX: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      } 
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    },
  };
  
  const handleEnterCompetitions = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      navigate("/competitions");
    }
  };
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="py-20 px-4 bg-gradient-to-br from-white to-purple-50/30"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          ref={headerRef}
          variants={textVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            variants={wordVariants}
            className="mb-6"
          >
            <Badge className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
              🛤️ How It Works
            </Badge>
          </motion.div>
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Simple <span className="text-gradient">Step-by-Step Journey</span>
          </motion.h2>
          <motion.p 
            variants={wordVariants}
            className="text-xl text-gray-600 leading-relaxed"
          >
            From registration to winning - your path to nationwide recognition
          </motion.p>
        </motion.div>
        
        <motion.div
          ref={stepsRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isStepsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Step 1: Register & Join */}
          <motion.div 
            variants={slideInLeft}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="glassmorphism-card p-8 relative group transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
              1
            </motion.div>
            <div className="mt-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform"
              >
                <Users className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-900 mb-4 text-center"
              >
                Register & Join
              </motion.h3>
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="text-gray-600 mb-6 leading-relaxed text-center"
              >
                Complete the simple registration form, and you'll be added to our WhatsApp group for all competition updates and guidance.
              </motion.p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Simple payment</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">WhatsApp support</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 2: Submit Your Artwork */}
          <motion.div 
            variants={scaleIn}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="glassmorphism-card p-8 relative group transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
              2
            </motion.div>
            <div className="mt-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform"
              >
                <Upload className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-900 mb-4 text-center"
              >
                Submit Your Artwork
              </motion.h3>
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="text-gray-600 mb-6 leading-relaxed text-center"
              >
                You'll receive a portal link where you can easily upload photos of your artwork and provide details about your creative process.
              </motion.p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Easy upload</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Any medium</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 3: Judging & Voting */}
          <motion.div 
            variants={scaleIn}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="glassmorphism-card p-8 relative group transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
              3
            </motion.div>
            <div className="mt-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform"
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-900 mb-4 text-center"
              >
                Judging & Voting
              </motion.h3>
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="text-gray-600 mb-6 leading-relaxed text-center"
              >
                Expert judges will evaluate all entries while live public voting takes place. This dual process ensures the most deserving artists rise to the top.
              </motion.p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Expert jury</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Public voting</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 4: Winners Announced */}
          <motion.div 
            variants={slideInRight}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="glassmorphism-card p-8 relative group transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
              4
            </motion.div>
            <div className="mt-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform"
              >
                <Trophy className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-900 mb-4 text-center"
              >
                Winners Announced
              </motion.h3>
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="text-gray-600 mb-6 leading-relaxed text-center"
              >
                Winners will be announced and awarded from our ₹50,000 prize pool across adult and kids categories, with additional recognition through our digital platforms.
              </motion.p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Cash prizes</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700">Recognition</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          variants={scaleIn}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          className="glassmorphism-card p-10 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h3 
              variants={textVariants}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Ready to Start Your Creative Journey?
            </motion.h3>
            <motion.p 
              variants={wordVariants}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Join thousands of artists who have already discovered their potential through Indian Creative Star.
              It's time to showcase your talent to the world!
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleEnterCompetitions}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Start Your Journey
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  Learn More
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export { HowItWorksSectionV2 };
export default HowItWorksSectionV2;

