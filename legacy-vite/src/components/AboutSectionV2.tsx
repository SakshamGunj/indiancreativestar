import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, PenLine, Palette, Trophy, Award, Star, Users, Globe, Heart, BookOpen } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSectionV2() {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const videoRef = useRef(null);
  const storyRef = useRef(null);
  const featuresRef = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -80, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80, rotateY: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 lg:py-24 xl:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
      id="about"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 lg:top-20 xl:top-24 left-6 lg:left-10 xl:left-16 w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 lg:bottom-20 xl:bottom-24 right-6 lg:right-10 xl:right-16 w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-60 lg:h-60 xl:w-80 xl:h-80 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-2xl"></div>
        {/* Additional desktop-only elements */}
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-20 h-20 xl:w-24 xl:h-24 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-lg"></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-16 h-16 xl:w-20 xl:h-20 bg-gradient-to-r from-pink-400/15 to-orange-400/15 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center mb-12 lg:mb-16 xl:mb-20"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-200 mb-6"
          >
            <span className="text-sm font-semibold text-purple-700">About Us</span>
          </motion.div>
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6"
          >
            <motion.span variants={wordVariants}>What is </motion.span>
            <motion.span
              variants={wordVariants}
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Indian Creative Star
            </motion.span>
            <motion.span variants={wordVariants}>?</motion.span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            India's best platform to find and celebrate artists like you.
          </motion.p>
        </motion.div>

        {/* YouTube Video Section */}
        <motion.div
          ref={videoRef}
          variants={scaleIn}
          initial="hidden"
          animate={isVideoInView ? "visible" : "hidden"}
          className="mb-12 lg:mb-16 xl:mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            variants={scaleIn}
            className="aspect-video w-full overflow-hidden rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/IkDZIkiXIj4?si=zodG0oz-mVjeul-P&autoplay=1&loop=1&playlist=IkDZIkiXIj4&mute=1"
              title="Indian Creative Star - Season 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          ref={storyRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isStoryInView ? "visible" : "hidden"}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-6 lg:p-8 xl:p-10 shadow-xl border border-white/30 mb-12 lg:mb-16 xl:mb-20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image */}
            <motion.div
              variants={slideInLeft}
              className="w-full lg:w-1/3"
            >
              <motion.img
                src="/WhatsApp Image 2025-09-09 at 11.03.00.jpeg"
                alt="Indian Creative Star team"
                className="rounded-3xl shadow-2xl w-full h-auto"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {/* Content */}
            <motion.div
              variants={slideInRight}
              className="flex-1"
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 lg:gap-6 mb-6"
              >
                <motion.div
                  variants={scaleIn}
                  className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">Our Story</h3>
                  <p className="text-purple-600 font-medium text-sm lg:text-base">Discover what makes us special</p>
                </div>
              </motion.div>
              <motion.div
                variants={textVariants}
                className="space-y-2 lg:space-y-4 text-xs lg:text-base xl:text-lg leading-tight lg:leading-relaxed mb-4 lg:mb-6"
              >
                <motion.p variants={wordVariants} className="text-gray-700">
                  We are <span className="font-bold text-purple-600">Daami Event</span>, an emerging event firm, and proud organizers of <span className="font-bold text-blue-600">Indian Creative Star ( Art Competition ) – Season 2</span>.
                </motion.p>
                <motion.p variants={wordVariants} className="text-gray-700">
                  Our journey began with <span className="font-semibold text-orange-600">Sikkim Creative Star ( Art Competition ) – Season 1</span>, where <span className="font-bold text-green-600">300+ artists</span> registered and we discovered <span className="font-bold text-red-600">6 Creative Stars</span>.
                </motion.p>
                <motion.p variants={wordVariants} className="text-gray-700">
                  We are <span className="font-bold text-indigo-600">officially supported by Government of Sikkim</span>, which adds credibility to our events.
                </motion.p>
                <motion.p variants={wordVariants} className="text-gray-700">
                  Our mission: <span className="font-bold text-pink-600">discover and celebrate Creative Stars across India</span>.
                </motion.p>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <motion.img
                      src="/images.jpeg"
                      alt="Government of Sikkim Logo"
                      className="w-12 h-12 lg:w-16 lg:h-16 object-contain rounded-lg shadow-sm bg-white p-1"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-base lg:text-lg font-bold text-green-600 mb-1">Officially Supported by</div>
                    <div className="text-sm lg:text-base text-gray-600 leading-tight">Culture Department, Government of Sikkim</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            },
          }}
        >
          {/* Nationwide Platform */}
          <motion.div
            variants={cardVariants}
            className="bg-white/50 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg border border-white/30 hover:scale-105 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3 lg:gap-4">
              <motion.div
                className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Globe className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </motion.div>
              <div>
                <h4 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">Seen by Everyone</h4>
                <p className="text-gray-600 leading-tight lg:leading-relaxed text-xs lg:text-base">
                  Show your talent to the whole country.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Exciting Prizes */}
          <motion.div
            variants={cardVariants}
            className="bg-white/50 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg border border-white/30 hover:scale-105 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3 lg:gap-4">
              <motion.div
                className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </motion.div>
              <div>
                <h4 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">Win Big</h4>
                <p className="text-gray-600 leading-tight lg:leading-relaxed text-xs lg:text-base">
                  Win cash, get famous, and be seen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Official Certification */}
          <motion.div
            variants={cardVariants}
            className="bg-white/50 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg border border-white/30 hover:scale-105 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3 lg:gap-4">
              <motion.div
                className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </motion.div>
              <div>
                <h4 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">Get Certified</h4>
                <p className="text-gray-600 leading-tight lg:leading-relaxed text-xs lg:text-base">
                  Get a verified certificate for your career.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
