import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Star, Palette, Users, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function PrizeSectionV2() {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const top100Ref = useRef(null);
  const competitionsRef = useRef(null);
  const certificateRef = useRef(null);
  const benefitsRef = useRef(null);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-20px" });
  const isTop100InView = useInView(top100Ref, { once: true, margin: "-50px" });
  const isCompetitionsInView = useInView(competitionsRef, { once: true, margin: "-50px" });
  const isCertificateInView = useInView(certificateRef, { once: true, margin: "-50px" });
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-50px" });

  // Debug logging
  console.log("PrizeSectionV2 Animation States:", {
    isInView,
    isHeaderInView,
    isTop100InView,
    isCompetitionsInView,
    isCertificateInView,
    isBenefitsInView
  });

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

  const prizeCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8, rotateY: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.9, 
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

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="py-20 px-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30"
      id="prizes"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            variants={scaleIn}
            className="mb-6"
          >
            <Badge className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
              🏆 Get Rewarded
            </Badge>
          </motion.div>
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            <motion.span variants={wordVariants}>What's in it for </motion.span>
            <motion.span 
              variants={wordVariants}
              className="text-gradient"
            >
              YOU
            </motion.span>
            <motion.span variants={wordVariants}>?</motion.span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 leading-relaxed"
          >
            We believe in recognizing and rewarding creativity. Here are the exciting prizes available in our competitions.
          </motion.p>
          <motion.div 
            variants={scaleIn}
            className="mt-8 inline-block"
          >
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-3 text-lg animate-pulse shadow-lg">
              Total Prize Pool: ₹50,000
            </Badge>
          </motion.div>
        </motion.div>
        
        {/* Top 100 E-Magazine Feature */}
        <motion.div 
          ref={top100Ref}
          variants={scaleIn}
          initial="hidden"
          animate={isTop100InView ? "visible" : "hidden"}
          className="glassmorphism-card p-8 mb-16 text-center"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-12 w-12 text-purple-600" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900">Top 100 Feature</h3>
          </motion.div>
          <motion.p 
            variants={textVariants}
            className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto"
          >
            <motion.span variants={wordVariants} className="font-bold text-purple-600">Top 100 participants</motion.span>
            <motion.span variants={wordVariants}> who make it to the next round will be featured in our exclusive </motion.span>
            <motion.span variants={wordVariants} className="font-bold"> Sikkim Creative Star e-Magazine</motion.span>
            <motion.span variants={wordVariants}> - reaching thousands of art enthusiasts nationwide!</motion.span>
          </motion.p>
        </motion.div>
        
        <motion.div
          ref={competitionsRef}
          initial="hidden"
          animate={isCompetitionsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.3,
                delayChildren: 0.2
              } 
            },
          }}
        >
          {/* Adult Art Competition Prizes */}
          <motion.div 
            variants={slideInLeft} 
            className="glassmorphism-card p-8"
            whileHover={{ 
              scale: 1.02, 
              rotateY: 2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-8 flex items-center gap-4"
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Palette className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Adult Art Competition</h3>
                <p className="text-gray-600">18+ Years | Prize Pool: ₹30,000</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={textVariants}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div variants={prizeCardVariants}>
                <Card className="prize-card border-orange-300 bg-gradient-to-br from-white to-orange-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-2 pt-6 text-center">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-fit mx-auto mb-3">1st Prize</Badge>
                    <CardTitle className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹15,000
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-700">National Recognition</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-700">e-Magazine Feature</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Gift className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-700">Surprise Hamper</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-700">Mystery Gift</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                variants={textVariants}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div variants={prizeCardVariants}>
                  <Card className="prize-card border-blue-300 bg-gradient-to-br from-white to-blue-50/50 hover:scale-105 transition-all duration-300">
                    <CardHeader className="pb-2 pt-4 text-center">
                      <Badge className="bg-blue-500 text-white w-fit mx-auto mb-2">2nd Prize</Badge>
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        ₹10,000
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700">e-Magazine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Gift className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700">Surprise Hamper</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700">Mystery Gift</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={prizeCardVariants}>
                  <Card className="prize-card border-pink-300 bg-gradient-to-br from-white to-pink-50/50 hover:scale-105 transition-all duration-300">
                    <CardHeader className="pb-2 pt-4 text-center">
                      <Badge className="bg-pink-500 text-white w-fit mx-auto mb-2">3rd Prize</Badge>
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₹5,000
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-pink-500 flex-shrink-0" />
                          <span className="text-gray-700">e-Magazine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Gift className="h-3 w-3 text-pink-500 flex-shrink-0" />
                          <span className="text-gray-700">Surprise Hamper</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3 w-3 text-pink-500 flex-shrink-0" />
                          <span className="text-gray-700">Mystery Gift</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

          {/* Kids Art Competition Prizes */}
          <motion.div 
            variants={slideInRight} 
            className="glassmorphism-card p-8"
            whileHover={{ 
              scale: 1.02, 
              rotateY: -2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-8 flex items-center gap-4"
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Kids Art Competition</h3>
                <p className="text-gray-600">5-17 Years | Prize Pool: ₹20,000</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={textVariants}
              className="space-y-6"
            >
              {/* Group A: 5-8 years */}
              <motion.div variants={prizeCardVariants}>
                <Card className="prize-card border-orange-300 bg-gradient-to-br from-white to-orange-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3 pt-4 text-center">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-fit mx-auto mb-2">Group A (5-8 years)</Badge>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹5,000
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <BookOpen className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-700">e-Magazine Feature</span>
                      <Gift className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-700">Gift Hamper</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Group B: 9-12 years */}
              <motion.div variants={prizeCardVariants}>
                <Card className="prize-card border-blue-300 bg-gradient-to-br from-white to-blue-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3 pt-4 text-center">
                    <Badge className="bg-blue-500 text-white w-fit mx-auto mb-2">Group B (9-12 years)</Badge>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ₹5,000
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">e-Magazine Feature</span>
                      <Gift className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">Gift Hamper</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Group C: 13-17 years */}
              <motion.div variants={prizeCardVariants}>
                <Card className="prize-card border-pink-300 bg-gradient-to-br from-white to-pink-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3 pt-4 text-center">
                    <Badge className="bg-pink-500 text-white w-fit mx-auto mb-2">Group C (13-17 years)</Badge>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ₹10,000
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <BookOpen className="h-4 w-4 text-pink-500" />
                      <span className="text-gray-700">e-Magazine Feature</span>
                      <Gift className="h-4 w-4 text-pink-500" />
                      <span className="text-gray-700">Gift Hamper</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Benefits for All Categories */}
        <motion.div 
          ref={certificateRef}
          variants={scaleIn}
          initial="hidden"
          animate={isCertificateInView ? "visible" : "hidden"}
          className="glassmorphism-card p-10 text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <motion.div 
              className="h-24 w-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-12 w-12 text-white" />
            </motion.div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Digital Excellence Certificate</h3>
              <p className="text-gray-700 text-lg max-w-3xl">
                Every participant receives a beautifully designed digital certificate recognizing their creativity and participation in Sikkim's premier art competition.
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Participation Benefits */}
        <motion.div 
          ref={benefitsRef}
          initial="hidden"
          animate={isBenefitsInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            Even if You Don't Win...
          </motion.h3>
          <motion.div 
            variants={{
              visible: { 
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                } 
              },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div 
              variants={cardVariants}
              className="glassmorphism-card p-6 text-center"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-900 mb-2">Recognition</h4>
              <p className="text-sm text-gray-600">National exposure for your talent</p>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="glassmorphism-card p-6 text-center"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-900 mb-2">Participation Certificate</h4>
              <p className="text-sm text-gray-600">Digital certificate for all entrants</p>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="glassmorphism-card p-6 text-center"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mx-auto flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-900 mb-2">Network Access</h4>
              <p className="text-sm text-gray-600">Connect with other creative artists</p>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="glassmorphism-card p-6 text-center"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-900 mb-2">Future Opportunities</h4>
              <p className="text-sm text-gray-600">Priority access to upcoming contests</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export { PrizeSectionV2 };
export default PrizeSectionV2;

