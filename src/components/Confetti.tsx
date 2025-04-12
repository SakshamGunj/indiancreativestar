
import { useEffect, useState } from "react";

const colors = [
  "#8B5CF6", // creative-purple
  "#EC4899", // creative-pink
  "#3B82F6", // creative-blue
  "#FCD34D", // creative-yellow
  "#F97316", // creative-orange
];

export function Confetti() {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);

  useEffect(() => {
    createConfetti();
    // Cleanup function to avoid memory leaks
    return () => {
      setConfetti([]);
    };
  }, []);

  const createConfetti = () => {
    const confettiElements = [];
    
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100;
      const width = Math.random() * 10 + 5;
      const height = width * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 3;
      const rotation = Math.random() * 360;
      
      confettiElements.push(
        <div
          key={i}
          className="confetti absolute"
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
  };

  return <div className="fixed inset-0 pointer-events-none z-20">{confetti}</div>;
}
