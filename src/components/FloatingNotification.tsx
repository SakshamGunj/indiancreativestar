
import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Award, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for notifications
const notifications = [
  { name: "Riya", location: "Delhi", type: "writing" },
  { name: "Arjun", location: "Mumbai", type: "art" },
  { name: "Priya", location: "Bangalore", type: "writing" },
  { name: "Rajiv", location: "Kolkata", type: "art" },
  { name: "Ananya", location: "Chennai", type: "writing" },
  { name: "Vikram", location: "Hyderabad", type: "art" },
  { name: "Neha", location: "Pune", type: "writing" },
  { name: "Siddharth", location: "Jaipur", type: "art" },
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
    <div className="floating-notification max-w-[85vw] sm:max-w-xs">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          {notification.type === "writing" ? (
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-creative-pink" />
          ) : (
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-creative-blue" />
          )}
        </div>
        <div>
          <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium line-clamp-2`}>
            {notification.name} from {notification.location} just registered for the {" "}
            {notification.type === "writing" ? "Poetry" : "Art"} Contest!
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">just now</p>
        </div>
      </div>
    </div>
  );
}
