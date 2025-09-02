import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  Download,
  LogOut,
  Edit,
  CheckCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  registrationDate: Date;
  status: string;
  deviceId: string;
}

interface UserDashboardProps {
  user: FirebaseUser;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            ...data,
            registrationDate: data.registrationDate.toDate()
          } as UserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/sikkimcreativestar');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return <Badge className="bg-blue-500">Registered</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending Review</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <Card className="w-full max-w-md glassmorphism border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-white/70">User data not found. Please contact support.</p>
            <Button onClick={handleSignOut} className="mt-4">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-4 sm:py-8 px-2 sm:px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-creative-pink/20 to-creative-yellow/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10 px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block p-2 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-full mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-creative-purple to-creative-pink rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-lg sm:text-2xl font-bold">⭐</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-creative-purple via-creative-pink to-creative-blue bg-clip-text text-transparent leading-tight">
            Congratulations! You are a Creative Star
          </h1>
          
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white mb-3 sm:mb-4">
            Daami Event Presents
          </h2>
          
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Sikkim Creative Star Season 1
          </h3>
          
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Welcome back, {userData.name}! Your creative journey continues here.
          </p>
          
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl backdrop-blur-sm"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center pb-4 sm:pb-6">
                <Avatar className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6 border-2 sm:border-4 border-white/20">
                  <AvatarImage src={userData.profileImage} alt={userData.name} />
                  <AvatarFallback className="text-xl sm:text-3xl bg-gradient-to-br from-creative-blue to-creative-purple">
                    {userData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-lg sm:text-2xl">{userData.name}</CardTitle>
                <CardDescription className="text-white/60">
                  {getStatusBadge(userData.status)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-6">
                <div className="flex items-center gap-3 text-white/80 p-2.5 sm:p-3 rounded-lg bg-white/5">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 p-2.5 sm:p-3 rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-white/80 p-2.5 sm:p-3 rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">{userData.address}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 p-2.5 sm:p-3 rounded-lg bg-white/5">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Joined {userData.registrationDate.toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Status Updates */}
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                  Registration Status
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">Account Created</p>
                        <p className="text-white/70 text-xs sm:text-sm">Your account has been successfully created</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm self-start sm:self-center">Completed</Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 backdrop-blur-sm gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">Profile Image Uploaded</p>
                        <p className="text-white/70 text-xs sm:text-sm">Your profile photo has been uploaded successfully</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm self-start sm:self-center">Completed</Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">Admin Review</p>
                        <p className="text-white/70 text-xs sm:text-sm">Your application is being reviewed by our team</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm self-start sm:self-center">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificates & ID Cards */}
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-creative-purple" />
                  Certificates & ID Cards
                </CardTitle>
                <CardDescription className="text-white/60 text-sm">
                  Your certificates and ID cards will appear here once approved
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Certificate Placeholder */}
                  <div className="p-4 sm:p-8 rounded-2xl border-2 border-dashed border-white/30 text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-creative-purple/20 to-creative-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-creative-purple" />
                    </div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Participation Certificate</h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6">
                      Your certificate will be available here after admin approval
                    </p>
                    <Button disabled variant="outline" className="border-white/30 text-white/50 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Not Available Yet
                    </Button>
                  </div>

                  {/* ID Card Placeholder */}
                  <div className="p-4 sm:p-8 rounded-2xl border-2 border-dashed border-white/30 text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-creative-blue/20 to-creative-indigo/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-creative-blue" />
                    </div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Participant ID Card</h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6">
                      Your ID card will be generated here after admin approval
                    </p>
                    <Button disabled variant="outline" className="border-white/30 text-white/50 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Not Available Yet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-white text-lg sm:text-xl">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-creative-blue/20 to-indigo-500/20 border border-creative-blue/30">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-creative-blue to-indigo-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base sm:text-lg">Admin Review</p>
                      <p className="text-white/70 text-sm sm:text-base">Our team will review your application within 24-48 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-creative-purple/20 to-pink-500/20 border border-creative-purple/30">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-creative-purple to-pink-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base sm:text-lg">Certificate Generation</p>
                      <p className="text-white/70 text-sm sm:text-base">Once approved, your certificate and ID card will be generated</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-creative-pink/20 to-orange-500/20 border border-creative-pink/30">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-creative-pink to-orange-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-white">3</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base sm:text-lg">Download & Share</p>
                      <p className="text-white/70 text-sm sm:text-base">Download your certificate and ID card to share with others</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}