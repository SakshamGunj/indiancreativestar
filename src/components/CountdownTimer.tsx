import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

// Set the end date to July 15th, 2025
const endDate = new Date("2025-07-15T23:59:59");

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        <TimeCard value={timeLeft.days} label="Days" />
        <TimeCard value={timeLeft.hours} label="Hours" />
        <TimeCard value={timeLeft.minutes} label="Minutes" />
        <TimeCard value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

interface TimeCardProps {
  value: number;
  label: string;
}

function TimeCard({ value, label }: TimeCardProps) {
  return (
    <Card className="bg-black/40 border-white/5 p-2 sm:p-4 text-center">
      <p className="text-xl sm:text-3xl font-bold">{value.toString().padStart(2, '0')}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}
