
import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  endValue,
  duration = 2000,
  label,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * endValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [endValue, duration, isVisible]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground mt-2">{label}</div>
    </div>
  );
}
