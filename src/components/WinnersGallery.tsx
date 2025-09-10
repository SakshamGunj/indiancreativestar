import React, { useState } from 'react';
import { Star, Trophy, Award, Crown, Medal } from 'lucide-react';

interface Winner {
  id: number;
  name: string;
  category: string;
  position: string;
  image: string;
  artwork: string;
  year: string;
}

const winners: Winner[] = [
  {
    id: 1,
    name: "Yog Raj Gurung",
    category: "Adult Category",
    position: "1st Place",
    image: "/WhatsApp Image 2025-09-08 at 20.31.58.jpeg",
    artwork: "/ba50688142d1 (1).jpg",
    year: "2025"
  },
  {
    id: 2,
    name: "Chogyal Lama Grangdan",
    category: "Adult Category",
    position: "2nd Place",
    image: "/image.dslr2.jpg",
    artwork: "/1.jpg",
    year: "2025"
  },
  {
    id: 3,
    name: "Shashi Bhusan Thakur",
    category: "Adult Category",
    position: "3rd Place",
    image: "/WhatsApp Image 2025-09-08 at 17.20.43.jpeg",
    artwork: "/1753870691007 (5).jpg",
    year: "2025"
  },
  {
    id: 4,
    name: "Akshita Sunwar",
    category: "Kids & Teenage Category - Group B (9-12 years)",
    position: "Winner",
    image: "/IMG-20250909-WA0115(1).jpg",
    artwork: "/WhatsApp Image 2025-09-01 at 21.39.37.jpg",
    year: "2025"
  },
  {
    id: 5,
    name: "Nimesh Rai",
    category: "Kids & Teenage Category - Group C (13-17 years)",
    position: "Winner",
    image: "/WhatsApp Image 2025-09-08 at 21.35.50.jpeg",
    artwork: "/WhatsApp Image 2025-09-01 at 21.47.11.jpg",
    year: "2025"
  },
  {
    id: 6,
    name: "Aakriti Thakur",
    category: "Kids & Teenage Category - Group A (5-8 years)",
    position: "Winner",
    image: "/WhatsApp Image 2025-09-08 at 17.41.27.jpeg",
    artwork: "/WhatsApp Image 2025-09-01 at 21.27.20.jpg",
    year: "2025"
  }
];

const WinnersGallery: React.FC = () => {
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);

  const getPositionIcon = (position: string) => {
    if (position.includes("1st")) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (position.includes("2nd")) return <Medal className="w-6 h-6 text-gray-400" />;
    if (position.includes("3rd")) return <Award className="w-6 h-6 text-amber-600" />;
    return <Star className="w-6 h-6 text-purple-500" />;
  };

  const getPositionColor = (position: string) => {
    if (position.includes("1st")) return "from-yellow-400 to-yellow-600";
    if (position.includes("2nd")) return "from-gray-300 to-gray-500";
    if (position.includes("3rd")) return "from-amber-500 to-amber-700";
    return "from-purple-500 to-pink-500";
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-200 mb-4 sm:mb-6">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-purple-600" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700">Past Winners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Champions</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Meet the talented artists who have won our competitions and see their incredible artwork that captured the judges' hearts.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {winners.map((winner) => (
            <div
              key={winner.id}
              className="group transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 hover:bg-white">
                {/* Position Badge - Top Middle */}
                <div className="absolute top-2 sm:top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r ${getPositionColor(winner.position)} text-white shadow-2xl font-bold text-sm sm:text-base`}>
                    {getPositionIcon(winner.position)}
                    <span className="ml-2 sm:ml-2.5">
                      {winner.position}
                    </span>
                  </div>
                </div>

                {/* Enhanced Winner Image and Artwork Side by Side */}
                <div className="grid grid-cols-2 gap-0">
                  {/* Winner Photo */}
                  <div className="relative h-56 sm:h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30"></div>
                    <img
                      src={winner.image}
                      alt={winner.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 right-1">
                      <div className="bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-0.5 shadow-sm">
                        <p className="text-xs font-medium text-gray-800 text-center">Artist</p>
                      </div>
                    </div>
                  </div>

                  {/* Artwork */}
                  <div className="relative h-56 sm:h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30"></div>
                    <img
                      src={winner.artwork}
                      alt={`${winner.name}'s Artwork`}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 right-1">
                      <div className="bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-0.5 shadow-sm">
                        <p className="text-xs font-medium text-gray-800 text-center">Artwork</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Winner Info */}
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {winner.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                      {winner.category}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full font-medium shadow-sm">
                        Season {winner.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be Our Next Champion!
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of artists and showcase your talent. Your masterpiece could be the next winner!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">₹50,000 Prize Pool</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-pink-500" />
                <span className="text-sm text-gray-600">National Recognition</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">Digital Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default WinnersGallery;
