import React, { memo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface OptimizedMobileBannerProps {
  onRegisterClick: () => void;
  isModalOpen: boolean;
}

const OptimizedMobileBanner = memo(({ onRegisterClick, isModalOpen }: OptimizedMobileBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 1024);
    };

    checkMobile();
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-500 to-pink-500 border-t-2 border-white/20 shadow-lg p-3 flex items-center justify-between transition-transform duration-300 ${
        isModalOpen ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).png" 
            alt="Daami Presents Logo" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm leading-tight">Indian Creative Star</h3>
          <p className="text-white/80 text-xs">Art Competition</p>
        </div>
      </div>
      
      <Button
        onClick={onRegisterClick}
        className="bg-white text-purple-600 font-bold px-5 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
      >
        Register Now
      </Button>
    </div>
  );
});

OptimizedMobileBanner.displayName = 'OptimizedMobileBanner';

export default OptimizedMobileBanner;