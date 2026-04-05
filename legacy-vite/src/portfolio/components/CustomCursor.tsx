import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices that support hover
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
        
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block no-print"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}
