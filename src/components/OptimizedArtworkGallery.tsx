import React, { memo, useState, useCallback } from 'react';
import LazyImage from './LazyImage';
import { baseArtworkImages } from '@/data/artworkImages';

const OptimizedArtworkGallery = memo(() => {
  const [visibleSets, setVisibleSets] = useState(1); // Start with only 1 set
  
  const loadMoreSets = useCallback(() => {
    setVisibleSets(prev => Math.min(prev + 1, 3));
  }, []);

  // Only render visible sets to reduce initial load
  const imagesToShow = baseArtworkImages.slice(0, visibleSets * 5);

  return (
    <section 
      className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
      id="previous-competition"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
            Previous Competition Highlights ✨
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Witness the incredible talent from our Season 1 participants. These amazing artworks showcase the diversity and creativity of Indian artists.
          </p>
        </div>

        {/* Simplified scrolling gallery */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {imagesToShow.map((image, index) => (
              <div 
                key={`artwork-${index}`} 
                className="flex-shrink-0 w-48 h-48 md:w-80 md:h-60"
              >
                <div className="relative group overflow-hidden rounded-xl h-full">
                  <LazyImage
                    src={image}
                    alt={`Previous artwork ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-xs font-bold">🏆</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load more button */}
        {visibleSets < 3 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreSets}
              className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              View More Artworks
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">300+</div>
            <div className="text-sm sm:text-base text-gray-300">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">₹30K</div>
            <div className="text-sm sm:text-base text-gray-300">Distributed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">4.9⭐</div>
            <div className="text-sm sm:text-base text-gray-300">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedArtworkGallery.displayName = 'OptimizedArtworkGallery';

export default OptimizedArtworkGallery;