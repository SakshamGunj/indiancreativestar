import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, AlertTriangle } from 'lucide-react';

interface CountdownSectionProps {
  onRegisterClick: () => void;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ onRegisterClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0
  });
  
  const [slotsLeft, setSlotsLeft] = useState(230);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Optimized countdown timer with reduced frequency
  useEffect(() => {
    // Set countdown to 1 hour from now
    const targetTime = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Reset to 1 hour when countdown reaches 0
        const newTargetTime = new Date().getTime() + (60 * 60 * 1000);
        setTimeLeft({ hours: 1, minutes: 0, seconds: 0 });
      }
    }, 2000); // Reduced frequency from 1000ms to 2000ms for better performance

    return () => clearInterval(timer);
  }, []);

  // Simulate decreasing slots (for demo purposes)
  useEffect(() => {
    const slotTimer = setInterval(() => {
      setSlotsLeft(prev => {
        if (prev > 1) {
          return prev - Math.floor(Math.random() * 3) - 1;
        }
        return prev;
      });
    }, 60000); // Optimized: Decrease every 60 seconds for better performance

    return () => clearInterval(slotTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-8 sm:py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-red-500 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            <span className="text-red-600 font-bold text-sm sm:text-base uppercase tracking-wide">
              Limited Time Offer
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Only <span className="text-red-600">{slotsLeft}</span> Slots Left!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Don't miss your chance to join India's premier art competition. Register now before slots fill up!
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl mb-4 sm:mb-6"
        >
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              <span className="text-red-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                Early Bird Registration Ends In
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-4">
            {/* Hours */}
            <motion.div 
              variants={pulseVariants}
              animate="pulse"
              className="text-center"
            >
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs font-medium opacity-90">
                  Hours
                </div>
              </div>
            </motion.div>

            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-400">:</div>

            {/* Minutes */}
            <motion.div 
              variants={pulseVariants}
              animate="pulse"
              className="text-center"
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs font-medium opacity-90">
                  Minutes
                </div>
              </div>
            </motion.div>

            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-400">:</div>

            {/* Seconds */}
            <motion.div 
              variants={pulseVariants}
              animate="pulse"
              className="text-center"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs font-medium opacity-90">
                  Seconds
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Urgency Message */}
        <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
          <div className="bg-red-100 border border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              <span className="text-red-800 font-semibold text-sm sm:text-base">
                {slotsLeft} slots remaining out of 230
              </span>
            </div>
            <p className="text-red-700 text-xs sm:text-sm">
              Artists are registering fast! Secure your spot now before it's too late.
            </p>
          </div>
        </motion.div>

        {/* Register Button */}
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <Button
            onClick={onRegisterClick}
            className="animated-gradient text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 text-base sm:text-lg"
          >
            <span className="flex items-center gap-2 sm:gap-3">
              <span>Register Now</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </Button>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
            Join thousands of artists who have already registered
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { CountdownSection };
