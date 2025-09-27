import React, { memo } from 'react';
import { CheckCircle, Star, Award, Users, Trophy, Zap, Target, Gift, Globe, Calendar, Clock, Lightbulb } from 'lucide-react';

const OptimizedBenefitsSection = memo(() => {
  const benefits = [
    {
      icon: Trophy,
      title: "Cash Prizes Worth ₹30,000",
      description: "Win exciting cash rewards and recognition for your artistic talent",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      title: "Your Spotlight Moment",
      description: "Featured in our Artist Showcase reaching 50,000+ art lovers across India",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Official Creative Badge",
      description: "Digital certificate + Artist ID that you can proudly display on LinkedIn & social media",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Exclusive Artist Circle",
      description: "Join our private community of 1,000+ verified artists for collaborations & opportunities",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "VIP Early Access",
      description: "Be the first to know about new competitions, workshops, and exclusive artist events",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Target,
      title: "Professional Feedback",
      description: "Get constructive feedback from established artists and industry professionals",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
            Why Join Indian Creative Star? 🌟
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            More than just a competition - it's your gateway to the national art scene. Here's what makes us special:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 sm:mb-6`}>
                  <benefit.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{benefit.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">₹30K</div>
            <div className="text-sm sm:text-base text-gray-600">Total Prizes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">1000+</div>
            <div className="text-sm sm:text-base text-gray-600">Artists Joined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">4.9⭐</div>
            <div className="text-sm sm:text-base text-gray-600">Participant Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">100%</div>
            <div className="text-sm sm:text-base text-gray-600">Get Certificate</div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedBenefitsSection.displayName = 'OptimizedBenefitsSection';

export default OptimizedBenefitsSection;