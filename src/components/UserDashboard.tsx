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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-white/70">Your Sikkim Creative Star Dashboard</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glassmorphism border-white/10">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userData.profileImage} alt={userData.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-creative-blue to-creative-purple">
                    {userData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{userData.name}</CardTitle>
                <CardDescription className="text-white/60">
                  {getStatusBadge(userData.status)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <MapPin className="h-4 w-4 text-creative-blue mt-0.5" />
                  <span className="text-sm">{userData.address}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="h-4 w-4 text-creative-blue" />
                  <span className="text-sm">
                    Joined {userData.registrationDate.toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Updates */}
            <Card className="glassmorphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Registration Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-white font-medium">Account Created</p>
                        <p className="text-white/60 text-sm">Your account has been successfully created</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-white font-medium">Profile Image Uploaded</p>
                        <p className="text-white/60 text-sm">Your profile photo has been uploaded successfully</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500">Completed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-white font-medium">Admin Review</p>
                        <p className="text-white/60 text-sm">Your application is being reviewed by our team</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificates & ID Cards */}
            <Card className="glassmorphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-creative-purple" />
                  Certificates & ID Cards
                </CardTitle>
                <CardDescription className="text-white/60">
                  Your certificates and ID cards will appear here once approved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Certificate Placeholder */}
                  <div className="p-6 rounded-lg border-2 border-dashed border-white/20 text-center">
                    <FileText className="h-12 w-12 text-white/40 mx-auto mb-3" />
                    <h3 className="text-white font-medium mb-2">Participation Certificate</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Your certificate will be available here after admin approval
                    </p>
                    <Button disabled variant="outline" className="border-white/20 text-white/50">
                      <Download className="h-4 w-4 mr-2" />
                      Not Available Yet
                    </Button>
                  </div>

                  {/* ID Card Placeholder */}
                  <div className="p-6 rounded-lg border-2 border-dashed border-white/20 text-center">
                    <User className="h-12 w-12 text-white/40 mx-auto mb-3" />
                    <h3 className="text-white font-medium mb-2">Participant ID Card</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Your ID card will be generated here after admin approval
                    </p>
                    <Button disabled variant="outline" className="border-white/20 text-white/50">
                      <Download className="h-4 w-4 mr-2" />
                      Not Available Yet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="glassmorphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white">What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-creative-blue/20 flex items-center justify-center mt-0.5">
                      <span className="text-creative-blue text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Admin Review</p>
                      <p className="text-white/60 text-sm">Our team will review your application within 24-48 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-creative-purple/20 flex items-center justify-center mt-0.5">
                      <span className="text-creative-purple text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Certificate Generation</p>
                      <p className="text-white/60 text-sm">Once approved, your certificate and ID card will be generated</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-creative-pink/20 flex items-center justify-center mt-0.5">
                      <span className="text-creative-pink text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Download & Share</p>
                      <p className="text-white/60 text-sm">Download your certificate and ID card to share with others</p>
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