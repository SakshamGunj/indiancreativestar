import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Share2, Play, Pause, ArrowRight, Palette, Brush, Trophy, Users, Star, Crown, MapPin, Heart, Clock, Award, MoveRight, Map } from "lucide-react";
import confetti from "canvas-confetti";

// --- Real Event Data ---
const WRAPPED_DATA = {
  journey: {
    origin: "We started in January. The winter was heavy, so we named it Winter Art Royale. Hosted by Daami Event all India.",
    artists: "325",
    types: ["Painting", "Sketching", "Creative Lens", "Craft"],
    categories: ["Kids", "Adults"]
  },
  highlights: {
    topCities: ["Kolkata", "Chennai", "Lucknow"],
    ages: { min: "3", max: "73" },
    hours: "11,000",
    farthest: { city: "Srinagar", distance: "2200km" },
    theme: "Gods & Goddesses",
    certificates: ["Certificate of Participation", "Certificate of Creative Excellence"],
    mentions: [
      { highlight: "6 Art Teachers", desc: "Guided their amazing students to participate!" },
      { highlight: "A Mother & 2 Daughters", desc: "From Nagpur, participated and created art together!" }
    ]
  },
  winners: {
    painting: ["Rehanpreet Singh", "Manimala P.", "Anwesha"],
    sketching: ["Kabir Armaan", "Zaid", "Rekha Kar"],
    craft: ["Devendra Yeshwant Waghmare", "M. Hemkumar", "Libitha Senthil", "Devangi Nishikant Chavan", "Aakash"],
    lens: ["Saugata Sen", "Shreya Patwardhan", "Pravat Chaki", "Dr. Indraneel Saha", "Athul Pradeep"],
    kids: [
      { rank: "1st", name: "Nivaan Samip Kewalramani" },
      { rank: "2nd", name: "S. Haja Fathima" },
      { rank: "3rd", name: "Sahana Radhakrishnan" },
      { rank: "4th", name: "Sanjana Sunil Bamnolkar" },
      { rank: "5th", name: "Aarya Nair & Gracy" }
    ]
  }
};

// --- Animations ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

// --- Shared Elements ---
const SVGNoiseOverlay = () => (
  <div 
    className="absolute inset-0 z-50 pointer-events-none mix-blend-multiply opacity-[0.35]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// --- Component ---
const WinterArtRoyaleWrapped = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const slidesCount = 12; // Expanded to 12 slides
  const slideDuration = 6000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isPlaying) {
      const tick = 50; 
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + (tick / slideDuration) * 100;
        });
      }, tick);

      timer = setTimeout(() => {
        if (currentSlide < slidesCount - 1) {
          nextSlide();
        } else {
          setIsPlaying(false);
        }
      }, slideDuration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentSlide, isPlaying]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 20, 
      spread: 60,
      origin: { y: 0.2 },
      colors: ["#1A1A1A", "#FF007F", "#9DFF00", "#00E5FF"],
      disableForReducedMotion: true
    });
  };

  useEffect(() => {
    // Fire confetti on Winners Slides
    if (currentSlide >= 8 && currentSlide <= 10) {
      triggerConfetti();
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slidesCount - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      setProgress(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    const { clientX } = e;
    const { innerWidth } = window;
    
    if (clientX > innerWidth / 2) {
      if (currentSlide === slidesCount - 1) {
          setIsPlaying(!isPlaying)
      } else {
          nextSlide();
      }
    } else {
      prevSlide();
    }
  };

  const slideScrollClasses = "overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <>
      <Helmet>
        <title>Winter Art Royale 2026 - Wrapped</title>
        <link rel="icon" type="image/jpeg" href="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg" />
        <meta property="og:title" content="Winter Art Royale 2026 - Wrapped" />
        <meta property="og:description" content="Discover the journey, top artists, and amazing stats from India's most passionate art contest. 325 artists, 11,000 hours of creativity, and unforgettable masterpieces." />
        <meta property="og:type" content="website" />
        {/* Important: Replace this URL with your actual ImgBB/Imgur screenshot of the Wrapped page to show on WhatsApp! */}
        <meta property="og:image" content="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Winter Art Royale 2026 - Wrapped" />
        <meta name="twitter:description" content="Discover the journey, top artists, and amazing stats from India's most passionate art contest. 325 artists, 11,000 hours of creativity, and unforgettable masterpieces." />
        <meta name="twitter:image" content="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg" />
      </Helmet>
      
      <div className="flex bg-[#0A0A0A] min-h-screen items-center justify-center font-sans tracking-tight py-4 md:py-8">
      
      <div 
        className="relative w-full h-[100dvh] md:h-[95vh] md:max-w-[420px] md:rounded-[40px] bg-[#F4F2EB] text-[#1A1A1A] overflow-hidden shadow-2xl z-10 flex flex-col cursor-pointer select-none"
        onClick={handleScreenTap}
        onPointerDown={() => setIsPlaying(false)}
        onPointerUp={() => setIsPlaying(true)}
        onPointerLeave={() => setIsPlaying(true)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <SVGNoiseOverlay />

        {/* --- GLOBAL HEADER --- */}
        <div className="absolute top-0 left-0 right-0 z-[60] p-4 pt-4 flex flex-col gap-3 pointer-events-none">
          <div className="flex justify-center w-full">
            <span className="font-black font-heading tracking-[0.2em] text-[10px] uppercase text-[#1A1A1A] bg-[#F4F2EB] px-3 py-0.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0_#9DFF00]">
              DAAMI EVENT
            </span>
          </div>

          <div className="flex gap-1 w-full">
            {Array.from({ length: slidesCount }).map((_, idx) => (
              <div key={idx} className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1A1A1A]"
                  initial={{ width: "0%" }}
                  animate={{
                    width: idx < currentSlide ? "100%" : idx === currentSlide ? `${progress}%` : "0%",
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center pointer-events-auto mt-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} 
              onPointerDown={(e) => e.stopPropagation()}
              className="p-1.5 flex items-center justify-center bg-[#F4F2EB]/50 backdrop-blur-sm rounded-full text-[#1A1A1A] hover:bg-black/10 transition-colors border border-transparent hover:border-[#1A1A1A]/20"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" strokeWidth={0} /> : <Play size={20} fill="currentColor" strokeWidth={0} />}
            </button>
          </div>
        </div>

        {/* --- MAIN SLIDES CONTENT --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            
            {/* SLIDE 0: INTRO */}
            {currentSlide === 0 && (
              <motion.div
                key="slide0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 flex flex-col items-center bg-[#F4F2EB] ${slideScrollClasses}`}
              >
                <svg className="absolute top-[10%] left-[-20%] w-[140%] h-[40%] text-[#00E5FF] opacity-30 mix-blend-multiply pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path d="M-50,150 Q100,50 200,100 T450,50 L450,250 L-50,250 Z" fill="currentColor" />
                </svg>

                <svg className="absolute top-[25%] right-[-10px] w-32 h-32 opacity-80 pointer-events-none" viewBox="0 0 200 200" fill="none">
                  <path d="M20,100 Q60,20 120,60 T180,80" stroke="#FF007F" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>

                <div className="absolute top-[0%] right-[-10%] w-48 h-32 rotate-12 opacity-90 pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A), repeating-linear-gradient(45deg, #1A1A1A 25%, #F4F2EB 25%, #F4F2EB 75%, #1A1A1A 75%, #1A1A1A)",
                  backgroundPosition: "0 0, 10px 10px",
                  backgroundSize: "20px 20px",
                  clipPath: "polygon(10% 0%, 100% 20%, 90% 100%, 0% 80%)"
                }}></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-20 pb-10 text-center w-full min-h-max">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6 border-[4px] border-[#1A1A1A] relative overflow-hidden"
                  >
                    <Brush className="text-[#9DFF00] w-10 h-10 absolute -rotate-12 translate-x-1" strokeWidth={2} />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-full relative flex flex-col items-center"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#FF007F] blur-2xl opacity-20 rounded-full mix-blend-multiply"></div>
                    
                    <h1 className="relative font-extrabold text-[#1A1A1A] text-[3.2rem] leading-[0.85] uppercase font-heading flex flex-col items-center w-full">
                      <span className="text-[0.65em] mb-2 tracking-widest text-[#1A1A1A]/80">WINTER ART ROYALE</span>
                      <span className="text-[1.3em] tracking-tighter">WRAPPED</span>
                      <span className="text-[0.45em] mt-4 tracking-widest text-[#1A1A1A] bg-[#00E5FF] px-3 py-1 shadow-[4px_4px_0_#1A1A1A] border-2 border-[#1A1A1A]">ART CONTEST</span>
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 border-4 border-[#1A1A1A] p-3 w-[100%] flex flex-col justify-center bg-[#9DFF00] shadow-[6px_6px_0_#1A1A1A] rotate-[-2deg]"
                  >
                    <p className="font-black uppercase tracking-tight text-[#1A1A1A] text-xl leading-none mb-1">Winners Details</p>
                    <p className="font-black uppercase tracking-tight text-[#1A1A1A] text-xl leading-none">+ The Journey</p>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", damping: 20 }}
                  className="absolute bottom-[-10%] left-[-10%] right-[-10%] flex justify-center items-end overflow-hidden mix-blend-multiply h-56 pointer-events-none"
                >
                  <span className="text-[#00E5FF] font-black italic text-[200px] leading-[0.75] tracking-tighter mix-blend-hard-light opacity-80">
                    2026
                  </span>
                  <span className="absolute text-transparent font-black italic text-[200px] leading-[0.75] tracking-tighter" style={{ WebkitTextStroke: "3px #1A1A1A" }}>
                    2026
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 1: THE JOURNEY */}
            {currentSlide === 1 && (
              <motion.div
                key="slide1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-28 px-6 pb-12 ${slideScrollClasses}`}
              >
                <div className="absolute top-[20%] right-[-20%] w-64 h-64 bg-[#00E5FF] blur-3xl opacity-30 rounded-full mix-blend-multiply pointer-events-none" />

                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full z-10 mt-6"
                >
                  <Star className="w-10 h-10 text-[#1A1A1A] mb-3 fill-[#FF007F]" />
                  <h2 className="font-black text-[3.5rem] md:text-6xl uppercase tracking-tighter leading-[0.85] mb-2 text-[#1A1A1A] font-heading">
                    HOW IT<br/>STARTED.
                  </h2>
                </motion.div>

                <div className="flex-1 flex flex-col justify-center z-10 w-full relative min-h-max py-4">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#F4F2EB] text-[#1A1A1A] p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] relative z-20"
                  >
                    <p className="font-black text-xl italic leading-tight uppercase tracking-tight mb-4 text-[#1A1A1A]/40">
                      "We started in <span className="text-[#FF007F]">January</span>. Focus was on the cold."
                    </p>
                    <p className="font-bold text-lg leading-tight">
                      This year the winter was incredibly heavy, so we named it:
                    </p>
                    <p className="font-black font-heading text-[2.5rem] mt-4 leading-none text-[#00E5FF]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>WINTER<br/>ART ROYALE</p>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 ml-auto w-max bg-[#9DFF00] border-4 border-[#1A1A1A] p-3 rotate-3 shadow-[8px_8px_0_#1A1A1A] z-30"
                  >
                    <p className="font-black uppercase tracking-tight text-[#1A1A1A] leading-none text-xl">Hosted All India</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 2: THE STATS & AGES */}
            {currentSlide === 2 && (
              <motion.div
                key="slide2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-24 px-6 pb-12 ${slideScrollClasses}`}
              >
                <svg className="absolute top-[10%] left-[-20%] w-64 h-64 text-[#FF007F] opacity-80 mix-blend-multiply pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100,20 C140,10 180,40 190,80 C195,130 150,180 100,190 C50,195 10,150 15,100 C20,60 60,30 100,20 Z" filter="url(#displacement)" />
                </svg>

                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full mt-6 z-10 shrink-0"
                >
                  <p className="font-black text-6xl font-heading uppercase tracking-tighter leading-none mb-1 text-[#1A1A1A]">
                    AND YOU<br/>SHOWED<br/>UP.
                  </p>
                </motion.div>

                <div className="flex-1 flex flex-col justify-center gap-4 z-10 w-full mt-4 min-h-max py-4">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#9DFF00] text-[#1A1A1A] p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A]"
                  >
                    <Users className="w-8 h-8 mb-2" />
                    <p className="font-black font-heading text-[5.5rem] tracking-tighter leading-none">{WRAPPED_DATA.journey.artists}</p>
                    <p className="font-black uppercase tracking-widest text-lg mt-1">Artists Joined</p>
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="bg-[#1A1A1A] text-[#F4F2EB] p-5 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#00E5FF] relative text-center"
                  >
                    <p className="font-bold uppercase tracking-widest text-xs mb-1 text-white/50">Generations of Art</p>
                    <p className="font-black text-2xl uppercase tracking-tighter">
                      Youngest: <span className="text-[#00E5FF]">{WRAPPED_DATA.highlights.ages.min} years</span>
                    </p>
                    <p className="font-black text-2xl uppercase tracking-tighter">
                      Oldest: <span className="text-[#FF007F]">{WRAPPED_DATA.highlights.ages.max} years</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 3: CITIES */}
            {currentSlide === 3 && (
              <motion.div
                key="slide3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#00E5FF] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)",
                  backgroundPosition: "0 0, 20px 20px",
                  backgroundSize: "40px 40px"
                }}></div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="z-10 mb-8 pt-4 shrink-0"
                >
                  <MapPin className="w-12 h-12 text-[#1A1A1A] mb-2" />
                  <h2 className="font-black font-heading text-[4rem] text-[#1A1A1A] uppercase tracking-tighter leading-[0.85]">
                    CITIES OF<br/>ART
                  </h2>
                  <p className="font-black uppercase tracking-widest text-[#1A1A1A] bg-[#9DFF00] inline-block px-2 py-1 mt-4 shadow-[4px_4px_0_#1A1A1A] border-2 border-[#1A1A1A] text-sm md:text-base">
                    Maximum Participation From:
                  </p>
                </motion.div>

                <div className="flex-1 w-full space-y-4 z-10 flex flex-col justify-center min-h-max py-4">
                  {WRAPPED_DATA.highlights.topCities.map((city, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.15), type: "spring", stiffness: 200 }}
                      className="bg-[#F4F2EB] border-4 border-[#1A1A1A] p-4 flex items-center shadow-[6px_6px_0_#1A1A1A] transform -rotate-1 relative overflow-hidden"
                    >
                      <div className="absolute inset-y-0 left-0 w-4 bg-[#FF007F] border-r-4 border-[#1A1A1A]"></div>
                      <p className="font-black font-heading text-5xl md:text-6xl uppercase tracking-tighter text-[#1A1A1A] leading-none ml-6 group-hover:text-white transition-colors">
                            {city}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SLIDE 4: HOURS & DISTANCE */}
            {currentSlide === 4 && (
              <motion.div
                key="slide4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-24 px-6 pb-12 ${slideScrollClasses}`}
              >
                <div className="absolute top-[30%] left-[-10%] w-80 h-80 bg-[#FF007F] rounded-full mix-blend-multiply blur-2xl opacity-40 pointer-events-none" />

                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full mt-6 z-10 shrink-0"
                >
                  <p className="font-black text-[3.8rem] font-heading uppercase tracking-tighter leading-[0.85] mb-1 text-[#1A1A1A]">
                    TIME &<br/>DISTANCE
                  </p>
                </motion.div>

                <div className="flex-1 flex flex-col justify-center gap-6 z-10 w-full mt-4 min-h-max py-4">
                  {/* Hours Block */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#1A1A1A] text-[#F4F2EB] p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#00E5FF] relative"
                  >
                    <Clock className="w-8 h-8 mb-2 text-[#00E5FF]" />
                    <p className="font-bold uppercase tracking-widest text-xs mb-1 text-white/50">Total Time Created</p>
                    <p className="font-black font-heading text-[4.5rem] tracking-tighter leading-none text-[#9DFF00]">{WRAPPED_DATA.highlights.hours}</p>
                    <p className="font-black uppercase tracking-widest text-lg mt-1">Passionate Hours</p>
                  </motion.div>

                  {/* Distance Block */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="bg-[#FF007F] text-[#1A1A1A] p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] relative"
                  >
                    <Map className="w-8 h-8 mb-2 text-[#F4F2EB] fill-[#F4F2EB]" />
                    <p className="font-bold uppercase tracking-widest text-xs mb-1 text-[#F4F2EB]">Farthest Participant</p>
                    <p className="font-black font-heading text-4xl tracking-tighter mb-4 text-[#F4F2EB]" style={{ WebkitTextStroke: "1px #1A1A1A" }}>{WRAPPED_DATA.highlights.farthest.city}</p>
                    <div className="bg-[#1A1A1A] text-[#9DFF00] inline-block px-3 py-1.5 border-2 border-[#1A1A1A] font-black tracking-widest uppercase text-xs md:text-sm">
                      ~ {WRAPPED_DATA.highlights.farthest.distance} AWAY
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 5: TOP THEME */}
            {currentSlide === 5 && (
              <motion.div
                key="slide5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#1A1A1A] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #00E5FF 25%, transparent 25%, transparent 75%, #00E5FF 75%, #00E5FF), repeating-linear-gradient(45deg, #00E5FF 25%, transparent 25%, transparent 75%, #00E5FF 75%, #00E5FF)",
                  backgroundPosition: "0 0, 10px 10px",
                  backgroundSize: "20px 20px"
                }}></div>

                <div className="flex-1 w-full space-y-6 z-10 flex flex-col justify-center items-center text-center min-h-max py-4">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-[#FF007F] border-4 border-[#F4F2EB] flex items-center justify-center rounded-full mb-6 z-10 relative overflow-hidden shrink-0"
                  >
                    <div className="w-full h-full absolute bg-[radial-gradient(circle,_#9DFF00_0%,_transparent_70%)] animate-pulse opacity-50"></div>
                    <Palette className="w-10 h-10 text-[#F4F2EB]" />
                  </motion.div>

                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-black font-heading text-[2.5rem] tracking-tighter uppercase leading-[0.9] text-[#F4F2EB]"
                  >
                    THE MOST LOVED
                    <br/><span className="text-[#00E5FF]">SUBJECT TO PAINT</span> 
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, rotate: -5 }}
                    animate={{ opacity: 1, rotate: -2 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="bg-[#9DFF00] text-[#1A1A1A] border-4 border-[#F4F2EB] p-6 mt-8 shadow-[8px_8px_0_#FF007F]"
                  >
                    <p className="font-black font-heading text-[3rem] md:text-6xl uppercase tracking-tighter leading-none mb-2">
                      {WRAPPED_DATA.highlights.theme}
                    </p>
                    <p className="font-bold text-sm uppercase tracking-widest border-t-2 border-[#1A1A1A] pt-3 mt-4">
                      The Divine Took Over The Canvas
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 6: SPECIAL MENTIONS */}
            {currentSlide === 6 && (
              <motion.div
                key="slide6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#FF007F] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="z-10 mb-8 pt-4 w-full flex flex-col items-center text-center shrink-0"
                >
                  <Heart className="w-12 h-12 text-[#1A1A1A] mb-2 fill-[#F4F2EB]" />
                  <h2 className="font-black font-heading text-[3.5rem] text-[#F4F2EB] uppercase tracking-tighter leading-[0.85]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>
                    BEYOND<br/>THE CANVAS
                  </h2>
                </motion.div>

                <div className="flex-1 w-full space-y-6 z-10 flex flex-col justify-center min-h-max py-4">
                  {WRAPPED_DATA.highlights.mentions.map((mention, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.15), type: "spring", stiffness: 200 }}
                      className="bg-[#1A1A1A] text-[#F4F2EB] border-4 border-[#1A1A1A] p-6 flex flex-col shadow-[8px_8px_0_#9DFF00] transform rotate-1 relative"
                    >
                      <p className="font-black font-heading text-4xl mb-2 uppercase tracking-tighter text-[#00E5FF] leading-none">
                            {mention.highlight}
                      </p>
                      <p className="font-bold text-base md:text-lg uppercase tracking-tight text-[#F4F2EB] leading-tight">
                        {mention.desc}
                      </p>
                    </motion.div>
                  ))}
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mt-4 bg-[#F4F2EB] border-2 border-[#1A1A1A] py-2 px-4 shadow-[4px_4px_0_#1A1A1A] w-max mx-auto"
                  >
                    <p className="font-black uppercase text-[#1A1A1A] tracking-widest text-sm">Grateful for the passion.</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 7: CERTIFICATES & PRIZES */}
            {currentSlide === 7 && (
              <motion.div
                key="slide7"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute top-[30%] right-[-10%] w-64 h-64 bg-[#9DFF00] rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />

                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full mt-6 z-10 shrink-0"
                >
                  <Award className="w-12 h-12 text-[#1A1A1A] mb-3 fill-[#00E5FF]" />
                  <h2 className="font-black text-[3.8rem] md:text-6xl uppercase tracking-tighter leading-[0.85] mb-2 text-[#1A1A1A] font-heading">
                    EVERYONE<br/>WINS.
                  </h2>
                </motion.div>

                <div className="flex-1 w-full space-y-4 z-10 flex flex-col justify-center mt-4 min-h-max py-4">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#1A1A1A] text-[#F4F2EB] p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#FF007F] relative z-20"
                  >
                    <p className="font-black uppercase tracking-tight text-[#9DFF00] mb-3 text-lg md:text-xl">Every Single Artist Got 2 Certificates:</p>
                    <ul className="space-y-3 font-bold text-[13px] md:text-base uppercase tracking-widest text-[#F4F2EB]">
                      {WRAPPED_DATA.highlights.certificates.map((cert, idx) => (
                        <li key={idx} className="flex gap-2 items-start border-b border-white/20 pb-2">
                          <MoveRight className="w-5 h-5 text-[#00E5FF] shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#00E5FF] border-4 border-[#1A1A1A] p-4 shadow-[8px_8px_0_#1A1A1A] z-30"
                  >
                    <p className="font-black uppercase tracking-tight text-[#1A1A1A] leading-tight text-base md:text-lg">
                      + Home Delivery Provided for those who opted for physical copies!
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 8: ADULT WINNERS 1 (Painting & Sketching) */}
            {currentSlide === 8 && (
              <motion.div
                key="slide8"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute top-[30%] right-[-10%] w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="z-10 mb-4 pt-2 shrink-0"
                >
                  <span className="bg-[#FF007F] text-white font-black uppercase tracking-widest px-2 py-1 text-[10px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] mb-2 inline-block">Adult Category</span>
                  <h2 className="font-black font-heading text-[3.2rem] text-[#1A1A1A] uppercase tracking-tighter leading-[0.85]">
                    WINNERS:<br/><span className="text-[#00E5FF]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>PAINT</span> & LORDS OF <span className="text-[#9DFF00]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>SKETCH</span>
                  </h2>
                </motion.div>

                <div className="flex-1 w-full flex flex-col gap-4 z-10 min-h-max py-2 pb-6">
                  
                  {/* Painting Winners */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-white border-4 border-[#1A1A1A] p-4 shadow-[4px_4px_0_#1A1A1A]"
                  >
                    <p className="font-black bg-[#1A1A1A] text-[#00E5FF] inline-block px-2 py-0.5 text-xs uppercase tracking-widest mb-3">Top Painters</p>
                    <ol className="list-decimal list-inside space-y-2">
                      {WRAPPED_DATA.winners.painting.map((name, i) => (
                        <li key={i} className="font-bold text-base md:text-lg leading-tight uppercase tracking-tight border-b-2 border-black/10 pb-1">{name}</li>
                      ))}
                    </ol>
                  </motion.div>

                  {/* Sketching Winners */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="bg-[#9DFF00] border-4 border-[#1A1A1A] p-4 shadow-[4px_4px_0_#1A1A1A]"
                  >
                    <p className="font-black bg-[#1A1A1A] text-white inline-block px-2 py-0.5 text-xs uppercase tracking-widest mb-3">Top Sketch Artists</p>
                    <ol className="list-decimal list-inside space-y-2">
                      {WRAPPED_DATA.winners.sketching.map((name, i) => (
                        <li key={i} className="font-bold text-base md:text-lg leading-tight uppercase tracking-tight border-b-2 border-black/10 pb-1 text-[#1A1A1A]">{name}</li>
                      ))}
                    </ol>
                  </motion.div>

                </div>
              </motion.div>
            )}

            {/* SLIDE 9: ADULT WINNERS 2 (Craft & Lens) */}
            {currentSlide === 9 && (
              <motion.div
                key="slide9"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute top-[30%] left-[-10%] w-64 h-64 bg-[#FF007F] rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="z-10 mb-4 pt-2 shrink-0"
                >
                  <span className="bg-[#9DFF00] text-[#1A1A1A] font-black uppercase tracking-widest px-2 py-1 text-[10px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] mb-2 inline-block">Adult Category</span>
                  <h2 className="font-black font-heading text-[3.2rem] text-[#1A1A1A] uppercase tracking-tighter leading-[0.85]">
                    WINNERS:<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px #1A1A1A" }}>CRAFT</span> & CREATIVE <span className="text-[#FF007F]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>LENS</span>
                  </h2>
                </motion.div>

                <div className="flex-1 w-full flex flex-col gap-4 z-10 min-h-max py-2 pb-6">
                  
                  {/* Craft Winners */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#1A1A1A] text-[#F4F2EB] border-4 border-[#1A1A1A] p-4 shadow-[4px_4px_0_#FF007F]"
                  >
                    <p className="font-black bg-[#FF007F] text-white inline-block px-2 py-0.5 text-xs uppercase tracking-widest mb-3">Top Craft Masters</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {WRAPPED_DATA.winners.craft.map((name, i) => (
                        <li key={i} className="font-bold text-sm md:text-base leading-tight uppercase tracking-tight border-b border-white/20 pb-1">{name}</li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Lens Winners */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="bg-white border-4 border-[#1A1A1A] p-4 shadow-[4px_4px_0_#1A1A1A]"
                  >
                    <p className="font-black bg-[#1A1A1A] text-white inline-block px-2 py-0.5 text-xs uppercase tracking-widest mb-3">Top Creative Lens</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {WRAPPED_DATA.winners.lens.map((name, i) => (
                        <li key={i} className="font-bold text-sm md:text-base leading-tight uppercase tracking-tight border-b border-black/10 pb-1 text-[#1A1A1A]">{name}</li>
                      ))}
                    </ul>
                  </motion.div>

                </div>
              </motion.div>
            )}

            {/* SLIDE 10: KIDS WINNERS */}
            {currentSlide === 10 && (
              <motion.div
                key="slide10"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#F4F2EB] flex flex-col pt-28 px-5 pb-10 ${slideScrollClasses}`}
              >
                <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-[#9DFF00] rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="z-10 mb-6 pt-2 flex flex-col items-center text-center shrink-0"
                >
                   <span className="bg-[#00E5FF] text-[#1A1A1A] font-black uppercase tracking-widest px-2 py-1 text-[10px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] mb-4">Kids Category</span>
                  <h2 className="font-black font-heading text-[3.2rem] text-[#1A1A1A] uppercase tracking-tighter leading-[0.85]">
                    WINNERS:<br/><span className="text-[#9DFF00]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>FUTURE</span> STARS
                  </h2>
                </motion.div>

                <div className="flex-1 w-full flex flex-col justify-center gap-3 z-10 min-h-max py-2 pb-6">
                  <div className="mb-2 w-full text-center">
                    <p className="font-extrabold uppercase tracking-wide text-[#1A1A1A] text-lg border-b-4 border-[#1A1A1A] inline-block mb-2">TOP 5 CHAMPIONS</p>
                  </div>

                  {WRAPPED_DATA.winners.kids.map((winner, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1), type: "spring" }}
                      className="group border-b-4 border-[#1A1A1A] pb-2 relative flex items-end gap-3"
                    >
                      <div className="font-heading font-black text-4xl text-[#00E5FF]" style={{ WebkitTextStroke: "2px #1A1A1A" }}>
                        {winner.rank.replace(/\D/g,'')}
                      </div>
                      <div className="flex-1 pb-1">
                        <p className="font-black text-lg md:text-xl uppercase tracking-tighter text-[#1A1A1A] leading-none mb-0.5">
                          {winner.name}
                        </p>
                        <p className="text-[#1A1A1A]/50 text-[10px] font-black uppercase tracking-widest">{winner.rank} Place</p>
                      </div>
                      {idx === 4 && <div className="absolute -right-2 top-0 bg-[#FF007F] text-white text-[8px] font-black p-1 rotate-12 uppercase border border-black leading-none text-center shadow-[2px_2px_0_#1A1A1A] z-10">Tied<br/>Position!</div>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SLIDE 11: OUTRO */}
            {currentSlide === 11 && (
              <motion.div
                key="slide11"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute inset-0 bg-[#00E5FF] flex flex-col pt-24 px-6 ${slideScrollClasses}`}
              >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)",
                  backgroundPosition: "0 0, 20px 20px",
                  backgroundSize: "40px 40px"
                }}></div>

                <div className="absolute top-16 left-[-10%] right-[-10%] overflow-hidden w-[120%] bg-[#9DFF00] border-y-4 border-[#1A1A1A] shadow-[0_4px_0_#1A1A1A] transform rotate-[3deg] z-[10] pointer-events-none">
                  <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex whitespace-nowrap py-2 items-center"
                  >
                    {[...Array(12)].map((_, i) => (
                      <span key={i} className="font-black font-heading text-lg text-[#1A1A1A] uppercase tracking-widest leading-none mx-2">
                        KEEP CREATING • WE WILL BE BACK • DAAMI EVENT • 
                      </span>
                    ))}
                  </motion.div>
                </div>

                <svg className="absolute top-[20%] right-[-30px] w-64 h-64 opacity-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
                  <path d="M10,190 C40,40 160,10 190,120 C195,140 180,180 140,190" stroke="#FF007F" strokeWidth="20" strokeLinecap="round" />
                  <path d="M40,170 C70,70 140,40 160,110" stroke="#1A1A1A" strokeWidth="10" strokeLinecap="round" />
                </svg>

                <div className="flex-1 flex flex-col justify-center items-center text-center mt-20 z-10 w-full relative min-h-max py-4">
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="bg-[#1A1A1A] text-[#F4F2EB] px-6 py-2 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#FF007F] mb-6 transform -rotate-3"
                  >
                    <p className="font-black uppercase tracking-[0.2em] text-sm md:text-base">That's a Wrap!</p>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                    className="font-black font-heading text-[#1A1A1A] text-[4.5rem] leading-[0.85] tracking-tighter uppercase mb-6"
                  >
                    THANK<br/>YOU<br/>FOR<br/>ART
                  </motion.h2>

                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full flex justify-center mt-2"
                  >
                    <div className="bg-[#F4F2EB] border-4 border-[#1A1A1A] p-5 text-left shadow-[8px_8px_0_#1A1A1A] w-full max-w-[300px] relative">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#9DFF00] border-2 border-[#1A1A1A] rounded-full flex justify-center items-center">
                        <Palette className="w-4 h-4 text-[#1A1A1A]" />
                      </div>
                      <p className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A]/50 mb-1">Winter Art Royale</p>
                      <p className="font-black font-heading text-[2.5rem] leading-none text-[#1A1A1A] tracking-tighter text-[#00E5FF]" style={{ WebkitTextStroke: "1px #1A1A1A" }}>{WRAPPED_DATA.journey.artists} ARTISTS</p>
                      <p className="font-bold text-sm uppercase text-[#1A1A1A] mt-2 tracking-wider">Across the Nation</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full pb-8 z-[70] flex flex-col gap-3 pointer-events-auto mt-6 shrink-0"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to share!");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-full bg-[#1A1A1A] text-[#9DFF00] border-4 border-[#1A1A1A] py-4 font-black uppercase tracking-[0.1em] text-sm hover:bg-[#F4F2EB] hover:text-[#1A1A1A] transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={18} strokeWidth={2.5} />
                    Share Wrap
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(0);
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-full bg-[#F4F2EB] text-[#1A1A1A] border-4 border-[#1A1A1A] py-4 font-black uppercase tracking-[0.1em] text-sm hover:bg-[#1A1A1A] hover:text-[#00E5FF] transition-colors flex items-center justify-center"
                  >
                    Replay
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop UI Hint */}
        <div className="absolute bottom-[-30px] left-0 right-0 hidden md:flex justify-center text-white/50 text-xs tracking-widest uppercase pointer-events-none font-bold">
          Click Left / Right to Navigate
        </div>
      </div>
    </div>
    </>
  );
};

export default WinterArtRoyaleWrapped;
