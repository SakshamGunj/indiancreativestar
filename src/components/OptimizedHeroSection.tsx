import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, Gift, Globe, Users, Star, Award, CheckCircle } from 'lucide-react';
import LazyImage from './LazyImage';
import { heroBackgroundImage } from '@/data/artworkImages';

interface OptimizedHeroSectionProps {
  onRegisterClick: () => void;
}

const OptimizedHeroSection = memo(({ onRegisterClick }: OptimizedHeroSectionProps) => {
  return (
    <section className="relative pt-0 sm:pt-32 pb-16 sm:pb-20 px-2 sm:px-4 overflow-hidden min-h-screen">
      {/* Single Blurred Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={heroBackgroundImage}
            alt="Featured Artwork Background"
            className="w-full h-full object-cover blur-sm scale-110"
            priority={true}
          />
        </div>
        {/* Optimized overlay - using simple gradient instead of complex effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl h-full flex items-center">
        <div className="w-full">
          {/* Top section - Registration closing soon */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg">
              <span className="animate-pulse">🚨</span>
              <span>Registration Closing Soon - Only 15 Days Left!</span>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                  Unleash Your Inner{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                    Creative Star
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  "They told your dreams don't pay, but your brush had more to say. What you create alone — the nation will now celebrate. 
                  <span className="font-semibold text-yellow-300"> Sikkim has millions of stories. Let yours rise today."</span>
                </p>
              </div>

              {/* Key highlights */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                  <Users className="h-4 w-4 text-blue-300" />
                  <span className="text-white text-sm sm:text-base font-semibold">1000+ Artists</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-white text-sm sm:text-base font-semibold">₹50K Prizes</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                  <Award className="h-4 w-4 text-green-300" />
                  <span className="text-white text-sm sm:text-base font-semibold">Nationwide</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Register Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg backdrop-blur-md"
                >
                  View Gallery
                </Button>
              </div>
            </div>

            {/* Right Column - Benefits Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center text-white">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">Instant Recognition</h3>
                <p className="text-xs sm:text-sm text-gray-200">Digital certificate for all participants</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center text-white">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">Professional Exposure</h3>
                <p className="text-xs sm:text-sm text-gray-200">Featured in our national magazine</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center text-white">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 mx-auto mb-2 sm:mb-3" />
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">Amazing Prizes</h3>
                <p className="text-xs sm:text-sm text-gray-200">Cash prizes up to ₹15,000</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center text-white">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 mx-auto mb-2 sm:mb-3" />
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">National Platform</h3>
                <p className="text-xs sm:text-sm text-gray-200">Connect with artists nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedHeroSection.displayName = 'OptimizedHeroSection';

export default OptimizedHeroSection;