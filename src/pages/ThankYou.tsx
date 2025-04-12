
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Download, 
  MessageSquare, 
  Calendar, 
  Users,
  ArrowRight
} from "lucide-react";
import { Confetti } from "@/components/Confetti";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const contestType = searchParams.get("type") || "art";
  const name = searchParams.get("name") || "Participant";
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBackHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-background/90 to-background flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      
      <div className="max-w-3xl w-full mx-auto">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-white/10"
          onClick={handleBackHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <div className="creative-card p-8 md:p-12 text-center">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            You're In, <span className="text-gradient">{name}!</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Your registration for the {contestType === "art" ? "Art" : "Poetry"} competition has been confirmed.
            Check your email and WhatsApp for further details.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="creative-card p-6 text-left">
              <h3 className="text-lg font-bold mb-4">Next Steps:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">1</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Check your email for confirmation details</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">2</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Join the WhatsApp community group below</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">3</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Submit your {contestType === "art" ? "artwork" : "poetry"} through the link in your email</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">4</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Await results and your digital certificate</span>
                </li>
              </ul>
            </div>
            
            <div className="creative-card p-6 text-left">
              <h3 className="text-lg font-bold mb-4">Important Dates:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-creative-purple shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block">Submission Deadline</span>
                    <span className="text-sm text-muted-foreground">April 30th, 2025</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-creative-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block">Results Announcement</span>
                    <span className="text-sm text-muted-foreground">May 15th, 2025</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-creative-pink shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block">Certificate Distribution</span>
                    <span className="text-sm text-muted-foreground">May 20th, 2025</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="creative-card p-6 mb-8 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20">
            <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-creative-yellow" />
              Join Our {contestType === "art" ? "Art" : "Poetry"} Community
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with fellow participants, share tips, and stay updated with the latest news.
            </p>
            <Button 
              className="w-full creative-btn"
              onClick={() => window.open("https://whatsapp.com", "_blank")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Join WhatsApp Group
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="creative-btn-secondary" onClick={() => window.open("#", "_blank")}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Your Achievement
            </Button>
            <Button variant="outline" className="creative-btn-secondary" onClick={() => navigate("/")}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Explore More Competitions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
