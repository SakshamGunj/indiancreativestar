import React, { memo } from 'react';
import OptimizedImageGallery from './OptimizedImageGallery';
import { reviewImages } from '@/data/artworkImages';

const OptimizedReviewsSection = memo(() => {
  return (
    <section className="py-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            Real Reviews 📱
          </h2>
          <p className="text-base text-gray-600">Authentic feedback from Season 1 participants</p>
        </div>
        
        <OptimizedImageGallery 
          images={reviewImages}
          title="Review"
          maxVisible={6}
        />
        
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-gray-900 text-sm">4.9/5 from 300+ Artists</span>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedReviewsSection.displayName = 'OptimizedReviewsSection';

export default OptimizedReviewsSection;