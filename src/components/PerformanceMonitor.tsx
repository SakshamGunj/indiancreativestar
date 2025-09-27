import { useEffect, memo } from 'react';

// Development performance monitoring component
const PerformanceMonitor = memo(() => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor page load performance
    const handleLoad = () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        
        console.group('🚀 Performance Metrics');
        console.log('DOM Content Loaded:', `${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`);
        console.log('Page Load Complete:', `${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`);
        
        paintEntries.forEach((entry) => {
          console.log(`${entry.name}:`, `${Math.round(entry.startTime)}ms`);
        });

        // Check largest contentful paint
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('Largest Contentful Paint:', `${Math.round(lastEntry.startTime)}ms`);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Cleanup observer after 10 seconds
        setTimeout(() => observer.disconnect(), 10000);
        
        console.groupEnd();
      }, 1000);
    };

    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;