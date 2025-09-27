import React, { memo } from 'react';
import OptimizedImageGallery from './OptimizedImageGallery';
import { prizeDistributionImages } from '@/data/artworkImages';

const OptimizedPrizeDistributionSection = memo(() => {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Prize Distribution Ceremony 🏆
          </h2>
          <p className="text-lg text-gray-600">Season 1 - Celebrating our Creative Stars</p>
        </div>
        
        <OptimizedImageGallery 
          images={prizeDistributionImages}
          title="Prize Distribution"
          className="columns-2 md:columns-2 lg:columns-3"
          maxVisible={7}
        />
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-lg">
            <span className="text-2xl">🎉</span>
            <div className="text-left">
              <p className="font-bold text-gray-900">Season 2 Registration Open</p>
              <p className="text-sm text-gray-600">Join 1000+ artists nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedPrizeDistributionSection.displayName = 'OptimizedPrizeDistributionSection';

export default OptimizedPrizeDistributionSection;