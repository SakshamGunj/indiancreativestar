import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MapPin, Calendar, Download, LogOut, Award, CreditCard, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  registrationDate: Date;
  status: string;
  userId: string;
}

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserProfile({
            ...data,
            registrationDate: data.registrationDate.toDate(),
          } as UserProfile);
        } else {
          toast({
            title: "Profile Not Found",
            description: "Please register for Sikkim Creative Star first.",
            variant: "destructive",
          });
          navigate("/sikkimcreativestar");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDownloadCertificate = () => {
    // This would generate and download the certificate
    toast({
      title: "Certificate Download",
      description: "Certificate download feature will be available soon.",
    });
  };

  const handleDownloadIDCard = () => {
    // This would generate and download the ID card
    toast({
      title: "ID Card Download",
      description: "ID card download feature will be available soon.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-creative-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e]">
      <Header onRegistrationClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-creative-blue to-creative-purple bg-clip-text text-transparent mb-2">
                Welcome, {userProfile.name}!
              </h1>
              <p className="text-white/80">
                Your Sikkim Creative Star Dashboard
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              disabled={isSigningOut}
              variant="outline"
              className="mt-4 md:mt-0 border-white/20 text-white hover:bg-white/10"
            >
              {isSigningOut ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Signing Out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="glassmorphism border-white/10 p-6 rounded-2xl">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={userProfile.profileImage}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-creative-blue/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mt-4">{userProfile.name}</h3>
                  <p className="text-white/60 text-sm">Sikkim Creative Star Member</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <Mail className="h-4 w-4 text-creative-blue" />
                    <span className="text-sm">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="h-4 w-4 text-creative-blue" />
                    <span className="text-sm">{userProfile.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <MapPin className="h-4 w-4 text-creative-blue mt-0.5" />
                    <span className="text-sm">{userProfile.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="h-4 w-4 text-creative-blue" />
                    <span className="text-sm">
                      Joined {userProfile.registrationDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-white/80">Account Status: Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glassmorphism border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-creative-blue to-creative-purple rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Certificate</h3>
                      <p className="text-white/60 text-sm">Your participation certificate</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDownloadCertificate}
                    className="w-full mt-4 creative-btn"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>

                <div className="glassmorphism border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-creative-pink to-creative-purple rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">ID Card</h3>
                      <p className="text-white/60 text-sm">Your member ID card</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDownloadIDCard}
                    className="w-full mt-4 creative-btn"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download ID Card
                  </Button>
                </div>
              </div>

              {/* Admin Review Status */}
              <div className="glassmorphism border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-4">Account Review Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Profile Review</span>
                    </div>
                    <span className="text-yellow-500 text-sm font-medium">Pending</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Certificate Generation</span>
                    </div>
                    <span className="text-yellow-500 text-sm font-medium">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-white/80">ID Card Generation</span>
                    </div>
                    <span className="text-yellow-500 text-sm font-medium">In Progress</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Admin is reviewing your request. Your certificate and ID card will be available for download once approved.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="glassmorphism border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => navigate("/")}
                  >
                    Visit Main Site
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => {
                      toast({
                        title: "Contact Support",
                        description: "Email us at daamievent@gmail.com for assistance.",
                      });
                    }}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer onRegisterClick={() => {}} />
    </div>
  );
}