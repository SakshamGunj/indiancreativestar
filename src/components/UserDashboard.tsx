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
  Clock,
  Eye
} from "lucide-react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc as firestoreDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { GeneratePassModal } from "@/components/GeneratePassModal";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  registrationDate: Date;
  status: string;
  deviceId: string;
  certificateUrl?: string;
  artistIdUrl?: string;
}

interface UserDashboardProps {
  user: FirebaseUser;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratePassModalOpen, setIsGeneratePassModalOpen] = useState(false);
  const [generatedPasses, setGeneratedPasses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userDoc = await getDoc(firestoreDoc(db, "participantdetailspersonal", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            ...data,
            registrationDate: data.registrationDate.toDate()
          } as UserData);
        }

        const passesRef = collection(db, 'eventPasses');
        const q = query(passesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const passes = querySnapshot.docs.map(doc => doc.data());

        const passesWithQr = await Promise.all(passes.map(async (pass) => {
          if (pass.token) {
            const qrCodeUrl = await QRCode.toDataURL(pass.token);
            return { ...pass, qrCodeUrl };
          }
          return pass;
        }));
        setGeneratedPasses(passesWithQr);

      } catch (error) {
        console.error("Error fetching user data or passes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/sikkimcreativestar');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const downloadPasses = async () => {
    try {
      const pdfDoc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 54],
      });

      for (let i = 0; i < generatedPasses.length; i++) {
        const pass = generatedPasses[i];
        const qrCodeData = await QRCode.toDataURL(pass.token);

        if (i > 0) {
          pdfDoc.addPage();
        }

        // Add gradient background
        pdfDoc.setFillColor(30, 30, 30); // Dark background
        pdfDoc.rect(0, 0, 85.6, 54, "F");

        // Add colorful header background
        pdfDoc.setFillColor(139, 92, 246); // Purple
        pdfDoc.rect(0, 0, 85.6, 12, "F");

        // Add secondary color stripe
        pdfDoc.setFillColor(236, 72, 153); // Pink
        pdfDoc.rect(0, 10, 85.6, 2, "F");

        // Add main title - Sikkim Creative Star
        pdfDoc.setTextColor(255, 255, 255); // White text
        pdfDoc.setFontSize(10);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("SIKKIM CREATIVE STAR", 42.8, 7, { align: "center" });

        // Add subtitle - Art Competition
        pdfDoc.setFontSize(8);
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.text("Art Competition", 42.8, 9.5, { align: "center" });

        // Add event title with background
        pdfDoc.setFillColor(251, 191, 36); // Yellow background
        pdfDoc.rect(5, 14, 75.6, 6, "F");
        
        pdfDoc.setTextColor(0, 0, 0); // Black text
        pdfDoc.setFontSize(9);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("INVITE ONLY - PRIZE DISTRIBUTION CEREMONY", 42.8, 17.5, { align: "center" });

        // Add decorative border
        pdfDoc.setDrawColor(139, 92, 246); // Purple border
        pdfDoc.setLineWidth(0.5);
        pdfDoc.rect(2, 2, 81.6, 50);

        // Add pass details with styling
        pdfDoc.setTextColor(255, 255, 255); // White text
        pdfDoc.setFontSize(7);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("PASS HOLDER:", 8, 25);
        
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.setFontSize(6);
        pdfDoc.text(`${pass.name}`, 8, 27);
        
        if (pass.phone) {
          pdfDoc.setFont("helvetica", "bold");
          pdfDoc.setFontSize(7);
          pdfDoc.text("PHONE:", 8, 30);
          pdfDoc.setFont("helvetica", "normal");
          pdfDoc.setFontSize(6);
          pdfDoc.text(`${pass.phone}`, 8, 32);
        }

        // Add decorative elements
        pdfDoc.setFillColor(236, 72, 153); // Pink
        pdfDoc.circle(75, 8, 1.5, "F");
        pdfDoc.circle(10, 8, 1.5, "F");
        
        pdfDoc.setFillColor(251, 191, 36); // Yellow
        pdfDoc.circle(75, 6, 1, "F");
        pdfDoc.circle(10, 6, 1, "F");

        // Add QR code with border
        pdfDoc.setFillColor(255, 255, 255); // White background for QR
        pdfDoc.rect(55, 22, 25, 25, "F");
        pdfDoc.addImage(qrCodeData, "JPEG", 56, 23, 23, 23);

        // Add QR label
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.setFontSize(5);
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.text("SCAN QR CODE", 67.5, 49, { align: "center" });

        // Add event details
        pdfDoc.setTextColor(251, 191, 36); // Yellow
        pdfDoc.setFontSize(5);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("Event Date: 14th September 2025", 8, 36);
        pdfDoc.text("Time: 11:00 AM", 8, 38);
        pdfDoc.text("Venue: Sundar Resort, Majitar, Sikkim - 737136", 8, 40);
        
        // Add footer
        pdfDoc.setTextColor(200, 200, 200);
        pdfDoc.setFontSize(4);
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.text("Valid for Prize Distribution Ceremony Only", 42.8, 51, { align: "center" });
      }
      pdfDoc.save("event-passes.pdf");
    } catch (error) {
      console.error("Error downloading passes:", error);
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
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-black border border-gray-700">
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
                <div className="flex items-center gap-3 text-white p-2.5 sm:p-3 rounded-lg bg-gray-900">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white p-2.5 sm:p-3 rounded-lg bg-gray-900">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-white p-2.5 sm:p-3 rounded-lg bg-gray-900">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-creative-blue mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">{userData.address}</span>
                </div>
                <div className="flex items-center gap-3 text-white p-2.5 sm:p-3 rounded-lg bg-gray-900">
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

            {/* Generate Pass Section */}
            <Card className="bg-black border border-gray-700">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-creative-yellow" />
                  Event Pass
                </CardTitle>
                <CardDescription className="text-white/60 text-sm">
                  Prize Distribution Ceremony - Sikkim Creative Star
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                {/* Event Details */}
                <div className="bg-gradient-to-r from-creative-yellow/10 to-creative-orange/10 rounded-xl p-4 mb-6 border border-creative-yellow/20">
                  <h4 className="text-white font-semibold text-lg mb-3 text-center">Event Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-black/50 rounded-lg p-3">
                      <p className="text-creative-yellow font-semibold text-sm mb-1">Event Date</p>
                      <p className="text-white text-sm">14th September 2025</p>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3">
                      <p className="text-creative-yellow font-semibold text-sm mb-1">Time</p>
                      <p className="text-white text-sm">11:00 AM</p>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3">
                      <p className="text-creative-yellow font-semibold text-sm mb-1">Venue</p>
                      <p className="text-white text-sm">Sundar Resort, Majitar, Sikkim - 737136</p>
                    </div>
                  </div>
                </div>

                {generatedPasses.length === 0 ? (
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                      Generate your pass for the upcoming "Prize Distribution Ceremony" event. You can generate up to 4 additional passes for guests.
                    </p>
                    <Button
                      onClick={() => setIsGeneratePassModalOpen(true)}
                      className="bg-gradient-to-r from-creative-yellow to-creative-orange hover:from-creative-orange hover:to-creative-yellow text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Generate Passes
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                      Your passes have been generated successfully! You can download them below.
                    </p>
                    <Button
                      onClick={downloadPasses}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Passes
                    </Button>
                  </div>
                )}
                {generatedPasses.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-white font-semibold text-lg mb-4">Generated Passes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedPasses.map((pass, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                          <p className="text-white font-semibold">Pass #{index + 1}: {pass.name}</p>
                          <p className="text-white/70">{pass.phone}</p>
                          {pass.qrCodeUrl && (
                            <img src={pass.qrCodeUrl} alt="QR Code" className="mx-auto mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certificates & ID Cards */}
            <Card className="bg-black border border-gray-700">
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
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  {/* Certificate Section */}
                  <div className={`p-4 sm:p-6 rounded-2xl bg-black text-center ${
                    userData.certificateUrl ? 'border-2 border-green-500/30' : 'border-2 border-dashed border-gray-700'
                  }`}>
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            userData.certificateUrl ? 'bg-green-500/20' : 'bg-creative-purple/20'
                        }`}>
                            {userData.certificateUrl ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                                <FileText className="h-6 w-6 text-creative-purple" />
                            )}
                        </div>
                        <h3 className="text-white font-semibold text-lg sm:text-xl">Participation Certificate</h3>
                    </div>
                    <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                        {userData.certificateUrl
                            ? "Your certificate is ready for download! You can preview it or download it directly."
                            : "Your certificate is not yet available. It will appear here once your application is approved by the admin."
                        }
                    </p>

                    {userData.certificateUrl ? (
                        <div className="flex flex-col items-center">
                            <div className="relative w-full max-w-lg h-auto bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center border border-green-500/30 mb-4">
                                <img
                                    src={userData.certificateUrl}
                                    alt="Certificate Preview"
                                    className="w-full h-auto object-contain rounded-lg"
                                />
                            </div>
                            <div className="w-full max-w-lg flex flex-col sm:flex-row gap-3 mt-4">
                                <Button
                                    onClick={() => window.open(userData.certificateUrl, '_blank')}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Download
                                </Button>
                                <Button
                                    onClick={() => window.open(userData.certificateUrl, '_blank')}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                                >
                                    <Eye className="h-5 w-5 mr-2" />
                                    Preview
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button disabled variant="outline" className="border-gray-600 text-gray-400 px-6 py-3 rounded-lg text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            Not Available Yet
                        </Button>
                    )}
                  </div>

                  {/* Artist ID Card Section */}
                  <div className={`p-4 sm:p-6 rounded-2xl bg-black text-center ${
                    userData.artistIdUrl ? 'border-2 border-green-500/30' : 'border-2 border-dashed border-gray-700'
                  }`}>
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            userData.artistIdUrl ? 'bg-green-500/20' : 'bg-creative-purple/20'
                        }`}>
                            {userData.artistIdUrl ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                                <User className="h-6 w-6 text-creative-purple" />
                            )}
                        </div>
                        <h3 className="text-white font-semibold text-lg sm:text-xl">Artist ID Card</h3>
                    </div>
                    <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                        {userData.artistIdUrl
                            ? "Your Artist ID card is ready for download! You can preview it or download it directly."
                            : "Your Artist ID card is not yet available. It will appear here once your application is approved by the admin."
                        }
                    </p>

                    {userData.artistIdUrl ? (
                        <div className="flex flex-col items-center">
                            <div className="relative w-full max-w-lg h-auto bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center border border-green-500/30 mb-4">
                                <img
                                    src={userData.artistIdUrl}
                                    alt="Artist ID Card Preview"
                                    className="w-full h-auto object-contain rounded-lg"
                                />
                            </div>
                            <div className="w-full max-w-lg flex flex-col sm:flex-row gap-3 mt-4">
                                <Button
                                    onClick={() => window.open(userData.artistIdUrl, '_blank')}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Download
                                </Button>
                                <Button
                                    onClick={() => window.open(userData.artistIdUrl, '_blank')}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                                >
                                    <Eye className="h-5 w-5 mr-2" />
                                    Preview
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button disabled variant="outline" className="border-gray-600 text-gray-400 px-6 py-3 rounded-lg text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            Not Available Yet
                        </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      {isGeneratePassModalOpen && (
        <GeneratePassModal
          isOpen={isGeneratePassModalOpen}
          onClose={() => setIsGeneratePassModalOpen(false)}
          user={{
            uid: user.uid,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
          }}
          onPassesGenerated={async (passes) => {
            const passesWithQr = await Promise.all(passes.map(async (pass) => {
              if (pass.token) {
                const qrCodeUrl = await QRCode.toDataURL(pass.token);
                return { ...pass, qrCodeUrl };
              }
              return pass;
            }));
            setGeneratedPasses(passesWithQr);
          }}
        />
      )}
    </div>
  );
}