import React, { memo, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Star, Gift, ArrowRight } from 'lucide-react';

const OptimizedSuccessSection = memo(() => {
  const [activeTab, setActiveTab] = useState(0);

  const successData = [
    {
      title: "Season 1 Winners",
      stats: [
        { label: "Total Participants", value: "300+", icon: Users },
        { label: "Prize Pool", value: "₹30K", icon: Trophy },
        { label: "Average Rating", value: "4.9⭐", icon: Star },
        { label: "Certificates Issued", value: "300+", icon: Gift }
      ]
    }
  ];

  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Simple background effect */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
            Success Stories ✨
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how Indian Creative Star has transformed the artistic journey of hundreds of creators across the nation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
          {successData[activeTab].stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/20"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Winners Podium - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* 1st Place */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 sm:p-8 text-center text-white order-2 md:order-1 md:transform md:scale-105">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">1st Prize</h3>
            <p className="text-2xl sm:text-3xl font-black mb-2">₹15,000</p>
            <p className="text-sm sm:text-base opacity-90">Champion</p>
          </div>

          {/* 2nd Place */}
          <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl p-6 sm:p-8 text-center text-white order-1 md:order-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">2nd Prize</h3>
            <p className="text-2xl sm:text-3xl font-black mb-2">₹10,000</p>
            <p className="text-sm sm:text-base opacity-90">Runner-up</p>
          </div>

          {/* 3rd Place */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 sm:p-8 text-center text-white order-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">3rd Prize</h3>
            <p className="text-2xl sm:text-3xl font-black mb-2">₹5,000</p>
            <p className="text-sm sm:text-base opacity-90">Third Place</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Be Part of Season 2</h3>
            <p className="text-gray-300 mb-6">Join the next generation of creative stars and showcase your talent on a national platform.</p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl">
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedSuccessSection.displayName = 'OptimizedSuccessSection';

export default OptimizedSuccessSection;