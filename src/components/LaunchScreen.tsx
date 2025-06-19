import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Palette } from "lucide-react";

interface LaunchScreenProps {
  onLaunch: () => void;
}

export function LaunchScreen({ onLaunch }: LaunchScreenProps) {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    // Delay to show animation before calling onLaunch
    setTimeout(() => {
      onLaunch();
    }, 800); // Reduced delay for smoother transition
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-out ${
      isLaunching 
        ? 'opacity-0 scale-125 blur-sm transform-gpu' 
        : 'opacity-100 scale-100 blur-0 transform-gpu'
    }`}>
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-black via-creative-purple/40 to-creative-blue/30 transition-all duration-1000 ${
        isLaunching ? 'scale-110 brightness-150' : 'scale-100 brightness-100'
      }`}>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float transition-all duration-1000 ${
                isLaunching ? 'scale-150 opacity-30' : 'scale-100 opacity-100'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              <Star 
                className="h-2 w-2 sm:h-3 sm:w-3 text-creative-yellow/30" 
                style={{ 
                  transform: `rotate(${Math.random() * 360}deg)` 
                }} 
              />
            </div>
          ))}
        </div>

        {/* Gradient orbs with launch animation */}
        <div className={`absolute top-10 sm:top-20 left-10 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-creative-purple/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isLaunching ? 'scale-150 opacity-50' : 'scale-100 opacity-100'
        }`} />
        <div className={`absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-creative-blue/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isLaunching ? 'scale-150 opacity-50' : 'scale-100 opacity-100'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-creative-yellow/10 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isLaunching ? 'scale-150 opacity-30' : 'scale-100 opacity-100'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto transition-all duration-1000 ${
        isLaunching ? 'scale-110 blur-sm opacity-80' : 'scale-100 blur-0 opacity-100'
      }`}>
        {/* Logo/Icon */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className={`relative mx-auto w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4 sm:mb-6 transition-all duration-1000 ${
            isLaunching ? 'scale-125 rotate-180' : 'scale-100 rotate-0'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-creative-purple to-creative-blue rounded-full animate-spin-slow" />
            <div className="absolute inset-1 sm:inset-2 bg-black rounded-full flex items-center justify-center">
              <Palette className="h-6 w-6 sm:h-10 sm:w-10 md:h-14 md:w-14 text-creative-yellow animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-creative-purple via-creative-blue to-creative-yellow bg-clip-text text-transparent animate-gradient">
              SIKKIM
            </span>
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-creative-yellow via-creative-pink to-creative-purple bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '0.5s' }}>
              Creative Star
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light">
            Art Competition 2025
          </p>
        </div>

        {/* Subtitle */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Celebrating 50 Years of Sikkim Statehood
            <br />
            <span className="text-creative-yellow font-medium">₹50,000 Prize Pool</span>
          </p>
        </div>

        {/* Launch Button */}
        <div className="relative">
          <Button
            onClick={handleLaunch}
            disabled={isLaunching}
            className={`group relative px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-creative-purple via-creative-blue to-creative-yellow hover:from-creative-yellow hover:via-creative-pink hover:to-creative-purple transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isLaunching ? 'scale-110 animate-pulse' : 'scale-100'
            }`}
            style={{
              borderRadius: '50px',
              minWidth: '200px',
              height: '50px',
              '@media (min-width: 640px)': {
                minWidth: '280px',
                height: '70px'
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-creative-purple/20 via-creative-blue/20 to-creative-yellow/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            <div className="relative flex items-center justify-center gap-2 sm:gap-3">
              {isLaunching ? (
                <>
                  <div className="animate-spin">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <span className="text-xs sm:text-base md:text-lg lg:text-xl">Launching...</span>
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-xs sm:text-base md:text-lg lg:text-xl whitespace-nowrap">Launch Sikkim Creative Star</span>
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </div>
          </Button>

          {/* Button glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-creative-purple/30 via-creative-blue/30 to-creative-yellow/30 rounded-full blur-2xl animate-pulse -z-10 transition-all duration-1000 ${
            isLaunching ? 'scale-150 opacity-80' : 'scale-100 opacity-100'
          }`} />
        </div>

        {/* Bottom text */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <p className="text-xs sm:text-sm md:text-base text-white/50 animate-pulse">
            Click to enter the world of creativity
          </p>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
} 