
import { useEffect, useState, memo, useCallback } from "react";

const colors = [
  "#8B5CF6", // creative-purple
  "#EC4899", // creative-pink
  "#3B82F6", // creative-blue
  "#FCD34D", // creative-yellow
  "#F97316", // creative-orange
];

export const Confetti = memo(() => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const createConfetti = useCallback(() => {
    const confettiElements = [];
    
    // Further reduced for better performance
    for (let i = 0; i < 12; i++) {
      const left = Math.random() * 100;
      const width = Math.random() * 8 + 4;
      const height = width * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 2;
      const rotation = Math.random() * 360;
      
      confettiElements.push(
        <div
          key={i}
          className="confetti absolute will-change-transform"
          style={{
            left: `${left}%`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    
    setConfetti(confettiElements);
    
    // Auto-hide after animation completes
    setTimeout(() => {
      setIsVisible(false);
      setConfetti([]);
    }, 5000);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      createConfetti();
    }
    
    return () => {
      setConfetti([]);
    };
  }, [createConfetti]);

  if (!isVisible || confetti.length === 0) return null;

  return <div className="fixed inset-0 pointer-events-none z-20 no-select">{confetti}</div>;
});

Confetti.displayName = 'Confetti';
