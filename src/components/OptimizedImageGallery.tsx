import React, { memo, useMemo } from 'react';
import LazyImage from './LazyImage';

interface OptimizedImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
  itemClassName?: string;
  maxVisible?: number;
}

const OptimizedImageGallery = memo(({ 
  images, 
  title, 
  className = "", 
  itemClassName = "",
  maxVisible = 6 
}: OptimizedImageGalleryProps) => {
  // Only show first few images for performance, load more on demand
  const visibleImages = useMemo(() => images.slice(0, maxVisible), [images, maxVisible]);

  return (
    <div className={`columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4 ${className}`}>
      {visibleImages.map((image, i) => (
        <div 
          key={`${title}-${i}`} 
          className={`relative group break-inside-avoid mb-3 md:mb-4 ${itemClassName}`}
        >
          <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative overflow-hidden rounded-lg">
              <LazyImage 
                src={image} 
                alt={`${title} ${i + 1}`} 
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                ✓
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

OptimizedImageGallery.displayName = 'OptimizedImageGallery';

export default OptimizedImageGallery;