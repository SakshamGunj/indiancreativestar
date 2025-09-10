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
  Mail,
  Sparkles,
  Trophy,
  Star
} from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { HeaderV2 } from "@/components/HeaderV2";
import { Footer } from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderV2 variant="gradient" showJoinButton={false} basePath="/indiancreativestar/v2" />
      {showConfetti && <Confetti />}
      
      {/* Spacer to avoid header overlap */}
      <div className="h-16" />

      {/* Hero Ribbon (neutral) */}
      <div className="px-3 sm:px-6 mt-2">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-700 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-gray-600" /> Registration Confirmed
                </p>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                  Welcome, {name}! You’re officially in the {contestType === "art" ? "Art" : "Poetry"} competition
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-gray-700">
                <Trophy className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Indian Creative Star</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-start sm:items-center justify-center p-3 sm:p-6">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <Button 
              variant="ghost" 
              className="hover:bg-gray-100 text-sm sm:text-base"
              onClick={handleBackHome}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <div className="sm:hidden" />
          </div>
          
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 md:p-12 text-center shadow-xl">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              You're In, {name}!
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Your registration for the {contestType === "art" ? "Art" : "Poetry"} competition has been confirmed.
              Check your email and WhatsApp for further details.
            </p>
            
            {/* WhatsApp CTA (neutral) */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6 mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-gray-900">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                Join Our {contestType === "art" ? "Art" : "Poetry"} Community
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-4">
                Connect with fellow participants, share tips, and stay updated with all important announcements.
                <span className="block mt-2 text-gray-900 font-medium">This is where you'll receive submission instructions!</span>
              </p>
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 text-base"
                onClick={() => window.open("https://chat.whatsapp.com/G8JA8VYNvXR2KsW1Depn1j", "_blank")}
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join WhatsApp Group Now
              </Button>
            </div>
            
            {/* Referral CTA (keep warm tones) */}
            <div className="rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">Unlock a Bonus Submission! 🎁</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-4">
                Refer two friends to join the {contestType === "art" ? "Art" : "Poetry"} competition and get an additional submission opportunity!
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-3"
                onClick={() => setShowReferralDialog(true)}
              >
                <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Refer Friends & Get Bonus Entry
              </Button>
            </div>
            
            {/* Two Column: Steps + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 text-left shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
                  <Star className="h-4 w-4 text-yellow-500" /> Next Steps
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-xs font-bold text-yellow-600">1</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">Check your email for confirmation details</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-xs font-bold text-yellow-600">2</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">Join the WhatsApp community group</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-xs font-bold text-yellow-600">3</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">Submit your {contestType === "art" ? "artwork" : "poetry"} through the link in your email</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-xs font-bold text-yellow-600">4</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">Await results and your digital certificate</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 text-left shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
                  <Calendar className="h-4 w-4 text-gray-700" /> Important Dates
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-0.5 shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">1</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-medium block text-gray-900">Submission Deadline</span>
                      <span className="text-xs text-gray-600">July 15th, 2025</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-0.5 shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">2</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-medium block text-gray-900">Results Announcement</span>
                      <span className="text-xs text-gray-600">May 15th, 2025</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-0.5 shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">3</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-medium block text-gray-900">Certificate Distribution</span>
                      <span className="text-xs text-gray-600">May 20th, 2025</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button className="py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-300 hover:bg-gray-50 text-gray-800" onClick={() => window.open("#", "_blank")}> 
                <Share2 className="mr-2 h-4 w-4" />
                Share Your Achievement
              </Button>
              <Button className="py-2.5 sm:py-3 text-sm sm:text-base mt-3 sm:mt-0 bg-gray-900 hover:bg-black text-white" onClick={() => navigate("/")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Explore More Competitions
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Referral Dialog */}
      <AlertDialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <AlertDialogContent className="bg-white border border-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-gray-900">Refer Friends & Get Bonus Entry</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              Invite two friends to join the {contestType === "art" ? "Art" : "Poetry"} competition and unlock an additional submission!
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Friend 1 Email</label>
              <Input 
                type="email" 
                placeholder="friend1@example.com" 
                value={referralEmails[0]} 
                onChange={(e) => handleReferralEmailChange(0, e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Friend 2 Email</label>
              <Input 
                type="email" 
                placeholder="friend2@example.com" 
                value={referralEmails[1]} 
                onChange={(e) => handleReferralEmailChange(1, e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>
          </div>
          
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowReferralDialog(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold hover:from-yellow-500 hover:to-orange-500"
              onClick={handleSendReferrals}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Invitations
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
