import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Users,
  MessageSquare, 
  Calendar, 
  ArrowRight,
  Mail
} from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const contestType = searchParams.get("type") || "art";
  const name = searchParams.get("name") || "Participant";
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Referral state
  const [showReferralDialog, setShowReferralDialog] = useState(false);
  const [referralEmails, setReferralEmails] = useState(["", ""]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBackHome = () => {
    navigate("/");
  };
  
  const handleReferralEmailChange = (index: number, value: string) => {
    const newEmails = [...referralEmails];
    newEmails[index] = value;
    setReferralEmails(newEmails);
  };
  
  const handleSendReferrals = () => {
    // Simulate sending referrals
    toast({
      title: "Referrals Sent!",
      description: "Your friends have been invited to join Sikkim Creative Star!",
    });
    setShowReferralDialog(false);
    
    // Show bonus entry notification
    setTimeout(() => {
      toast({
        title: "Bonus Entry Unlocked! 🎉",
        description: "You've earned an additional submission for the competition!",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-background/90 to-background flex items-center justify-center p-3 sm:p-4">
      {showConfetti && <Confetti />}
      
      <div className="max-w-3xl w-full mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 sm:mb-8 hover:bg-white/10 text-sm sm:text-base"
          onClick={handleBackHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <div className="creative-card p-5 sm:p-8 md:p-12 text-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            You're In, <span className="text-gradient">{name}!</span>
          </h1>
          
          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Your registration for the {contestType === "art" ? "Art" : "Poetry"} competition has been confirmed.
            Check your email and WhatsApp for further details.
          </p>
          
          {/* WhatsApp Group CTA - Emphasized */}
          <div className="creative-card p-4 sm:p-6 mb-8 sm:mb-10 bg-gradient-to-r from-creative-purple/30 to-creative-pink/30 border-creative-purple/40 animate-pulse-slow">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-creative-yellow" />
              Join Our {contestType === "art" ? "Art" : "Poetry"} Community
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Connect with fellow participants, share tips, and stay updated with all important announcements.
              <span className="block mt-2 text-white/90 font-medium">This is where you'll receive submission instructions!</span>
            </p>
            <Button 
              className="w-full creative-btn py-3 sm:py-4 text-base"
              onClick={() => window.open("https://chat.whatsapp.com/G8JA8VYNvXR2KsW1Depn1j", "_blank")}
            >
              <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Join WhatsApp Group Now
            </Button>
          </div>
          
          {/* New Referral CTA */}
          <div className="creative-card p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-r from-creative-yellow/20 to-creative-orange/20 border-creative-yellow/30">
            <h3 className="text-base sm:text-lg font-bold mb-2">Unlock a Bonus Submission! 🎁</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Refer two friends to join the {contestType === "art" ? "Art" : "Poetry"} competition and get an additional submission opportunity!
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold py-3"
              onClick={() => setShowReferralDialog(true)}
            >
              <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Refer Friends & Get Bonus Entry
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="creative-card p-4 sm:p-6 text-left">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Next Steps:</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">1</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Check your email for confirmation details</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">2</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Join the WhatsApp community group</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">3</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Submit your {contestType === "art" ? "artwork" : "poetry"} through the link in your email</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-creative-yellow/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-xs font-bold text-creative-yellow">4</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Await results and your digital certificate</span>
                </li>
              </ul>
            </div>
            
            <div className="creative-card p-4 sm:p-6 text-left">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Important Dates:</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-creative-purple shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">Submission Deadline</span>
                    <span className="text-xs text-muted-foreground">July 15th, 2025</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">Results Announcement</span>
                    <span className="text-xs text-muted-foreground">May 15th, 2025</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-creative-pink shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">Certificate Distribution</span>
                    <span className="text-xs text-muted-foreground">May 20th, 2025</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button variant="outline" className="creative-btn-secondary py-2.5 sm:py-3 text-sm sm:text-base" onClick={() => window.open("#", "_blank")}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Your Achievement
            </Button>
            <Button variant="outline" className="creative-btn-secondary py-2.5 sm:py-3 text-sm sm:text-base mt-3 sm:mt-0" onClick={() => navigate("/")}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Explore More Competitions
            </Button>
          </div>
        </div>
      </div>
      
      {/* Referral Dialog */}
      <AlertDialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <AlertDialogContent className="glassmorphism border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Refer Friends & Get Bonus Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Invite two friends to join the {contestType === "art" ? "Art" : "Poetry"} competition and unlock an additional submission!
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Friend 1 Email</label>
              <Input 
                type="email" 
                placeholder="friend1@example.com" 
                value={referralEmails[0]} 
                onChange={(e) => handleReferralEmailChange(0, e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Friend 2 Email</label>
              <Input 
                type="email" 
                placeholder="friend2@example.com" 
                value={referralEmails[1]} 
                onChange={(e) => handleReferralEmailChange(1, e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowReferralDialog(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold"
              onClick={handleSendReferrals}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Invitations
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
