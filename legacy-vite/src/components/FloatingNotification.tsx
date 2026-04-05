import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Palette, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for notifications - Updated with Sikkim names and places
const notifications = [
  { name: "Tenzin", location: "Gangtok" },
  { name: "Pema", location: "Namchi" },
  { name: "Karma", location: "Pelling" },
  { name: "Dolma", location: "Yuksom" },
  { name: "Norbu", location: "Mangan" },
  { name: "Sangay", location: "Ravangla" },
  { name: "Choden", location: "Singtam" },
  { name: "Phurba", location: "Gyalshing" },
  { name: "Lhamu", location: "Rangpo" },
  { name: "Tenzing", location: "Jorethang" },
  { name: "Pemba", location: "Nayabazar" },
  { name: "Yangchen", location: "Rhenock" },
];

interface FloatingNotificationProps {
  delay?: number;
}

export function FloatingNotification({ delay = 5000 }: FloatingNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState(notifications[0]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initial delay before showing the first notification
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const showRandomNotification = () => {
    // Hide current notification
    setIsVisible(false);
    
    // Wait a bit before showing a new one
    setTimeout(() => {
      // Pick a random notification
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setNotification(notifications[randomIndex]);
      
      // Show the new notification
      setIsVisible(true);
      
      // Set timeout to hide and show the next notification
      const timeout = setTimeout(() => {
        showRandomNotification();
      }, delay);
      
      return () => clearTimeout(timeout);
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={`floating-notification ${isMobile ? 'max-w-[240px] p-2' : 'sm:max-w-xs sm:p-4'}`}>
      <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'sm:gap-3'}`}>
        <div className={`${isMobile ? 'h-6 w-6' : 'sm:h-8 sm:w-8'} rounded-full bg-primary/20 flex items-center justify-center shrink-0`}>
          <Palette className={`${isMobile ? 'h-3 w-3' : 'sm:h-4 sm:w-4'} text-creative-blue`} />
        </div>
        <div>
          <p className={`${isMobile ? 'text-[11px]' : 'sm:text-sm'} font-medium line-clamp-2`}>
            {notification.name} from {notification.location} just registered for the Art Competition!
          </p>
          <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground mt-0.5`}>just now</p>
        </div>
      </div>
    </div>
  );
}
