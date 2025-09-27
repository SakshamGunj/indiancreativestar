// Preload critical images for better perceived performance
export const preloadCriticalImages = (images: string[] = []) => {
  if (typeof window === 'undefined' || images.length === 0) return;

  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy preload non-critical images when browser is idle
export const preloadImagesOnIdle = (images: string[], priority: 'low' | 'high' = 'low') => {
  if (typeof window === 'undefined') return;

  const preloadImages = () => {
    images.slice(0, 5).forEach((src) => { // Only preload first 5
      const img = new Image();
      img.loading = 'lazy';
      img.src = src;
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadImages, { timeout: 2000 });
  } else {
    setTimeout(preloadImages, priority === 'high' ? 100 : 1000);
  }
};

// Check if image is already cached
export const isImageCached = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
    
    // If image loads immediately, it's cached
    if (img.complete) {
      resolve(true);
    }
  });
};