import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets } from 'lucide-react';

interface WeatherBackgroundProps {
  weatherType: 'wet' | 'dry' | 'mixed';
  children?: React.ReactNode;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherType, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Weather configurations
  const weatherConfigs = {
    wet: {
      gradient: 'from-slate-900 via-blue-900 to-slate-800',
      opacity: 0.9,
      cloudColor: 'from-gray-700 to-gray-900',
      rainIntensity: 'heavy',
      bgAnimation: 'bg-rain'
    },
    dry: {
      gradient: 'from-yellow-600 via-orange-500 to-red-500',
      opacity: 0.8,
      cloudColor: 'from-white to-gray-200',
      rainIntensity: 'none',
      bgAnimation: 'bg-sunny'
    },
    mixed: {
      gradient: 'from-purple-900 via-blue-800 to-gray-800',
      opacity: 0.85,
      cloudColor: 'from-gray-600 to-gray-800',
      rainIntensity: 'light',
      bgAnimation: 'bg-mixed'
    }
  };

  const currentWeather = weatherConfigs[weatherType];

  // Cloud components
  const Clouds = () => (
    <>
      {/* Floating clouds */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: [0, 100, 0], opacity: [0, 0.7, 0.7, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-0"
      >
        <Cloud className="h-20 w-20 text-white/20" />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: [0, -100, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-32 right-0"
      >
        <Cloud className="h-32 w-32 text-white/15" />
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, 30, 0], opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4"
      >
        <Cloud className="h-24 w-24 text-white/10" />
      </motion.div>

      {/* Weather-specific clouds */}
      {weatherType === 'wet' && (
        <>
          <motion.div
            animate={{ x: [0, 50, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-1/4"
          >
            <CloudRain className="h-16 w-16 text-gray-400/30" />
          </motion.div>
          <motion.div
            animate={{ x: [0, -30, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/3"
          >
            <CloudRain className="h-20 w-20 text-gray-500/25" />
          </motion.div>
        </>
      )}

      {weatherType === 'mixed' && (
        <>
          <motion.div
            animate={{ x: [0, 40, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/3"
          >
            <div className="relative">
              <Cloud className="h-28 w-28 text-gray-400/20" />
              <motion.div
                animate={{ y: [0, 20, 40] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <Droplets className="h-4 w-4 text-blue-400/40" />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}

      {weatherType === 'dry' && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-16"
          >
            <Sun className="h-24 w-24 text-yellow-300/40" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 100, 0], opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-0"
          >
            <Cloud className="h-16 w-16 text-white/10" />
          </motion.div>
        </>
      )}
    </>
  );

  // Rain effect
  const RainEffect = ({ intensity }: { intensity: 'heavy' | 'light' }) => {
    if (intensity === 'none') return null;

    const drops = intensity === 'heavy' ? 50 : 20;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(drops)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: intensity === 'heavy' ? 1 : 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <div className={`h-4 w-0.5 ${intensity === 'heavy' ? 'bg-blue-400/40' : 'bg-blue-300/20'} rounded-full`} />
          </motion.div>
        ))}
      </div>
    );
  };

  // Background particles for dry weather
  const SunnyParticles = () => {
    if (weatherType !== 'dry') return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`
            }}
          >
            <div className="h-1 w-1 bg-yellow-300/30 rounded-full" />
          </motion.div>
        ))}
      </div>
    );
  };

  // Wind effect for mixed weather
  const WindEffect = () => {
    if (weatherType !== 'mixed') return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: [-100, window.innerWidth + 100] }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 60}%`
            }}
          >
            <Wind className="h-8 w-16 text-gray-400/10 transform" style={{ transform: `rotate(${Math.random() * 30 - 15}deg)` }} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${currentWeather.gradient} transition-all duration-1000 overflow-hidden`}>
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Weather effects */}
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key={weatherType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Clouds />
            <RainEffect intensity={currentWeather.rainIntensity as 'heavy' | 'light' | 'none'} />
            <SunnyParticles />
            <WindEffect />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes bg-rain {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes bg-sunny {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes bg-mixed {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-rain {
          background-size: 400% 400%;
          animation: bg-rain 15s ease infinite;
        }

        .bg-sunny {
          background-size: 200% 200%;
          animation: bg-sunny 20s ease infinite;
        }

        .bg-mixed {
          background-size: 300% 300%;
          animation: bg-mixed 18s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherBackground;