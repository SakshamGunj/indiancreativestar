import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Award,
  CheckCircle,
  Shield,
  Calendar,
  User,
  Trophy,
  Star,
  FileCheck,
  Loader2,
  Sparkles,
  Gem,
  Lock,
  Server,
  Clock,
  Award as AwardIcon
} from "lucide-react";

// Mock certificate data
const mockCertificates = [
  {
    id: "ICS2024001",
    participantName: "Ananya Sharma",
    artworkTitle: "Sunset Dreams",
    category: "Group B (9-12 years)",
    rank: "Gold Winner",
    competitionDate: "2024-03-15",
    certificateDate: "2024-03-20",
    verificationStatus: "verified",
    school: "Delhi Public School",
    age: 11,
    imageUrl: "/api/placeholder/400/300",
    competition: {
      name: "Indian Creative Star",
      season: "Season 1",
      edition: "National Art Competition 2024",
      theme: "Open Theme",
      totalParticipants: 1250,
      judgingPanel: ["Dr. Ramesh Kumar", "Ms. Priya Shah", "Mr. Amit Patel"],
      location: "National Level",
      organizedBy: "Indian Creative Foundation"
    },
    awards: {
      prizeMoney: "₹15,000",
      medal: "Gold Medal",
      certificate: "Merit Certificate",
      additionalRecognition: "Top 10 Artists Nationwide"
    }
  },
  {
    id: "ICS2024002",
    participantName: "Rahul Verma",
    artworkTitle: "Nature's Beauty",
    category: "Group C (13-17 years)",
    rank: "Silver Winner",
    competitionDate: "2024-03-15",
    certificateDate: "2024-03-20",
    verificationStatus: "verified",
    school: "Modern School",
    age: 15,
    imageUrl: "/api/placeholder/400/300",
    competition: {
      name: "Indian Creative Star",
      season: "Season 1",
      edition: "National Art Competition 2024",
      theme: "Open Theme",
      totalParticipants: 1250,
      judgingPanel: ["Dr. Ramesh Kumar", "Ms. Priya Shah", "Mr. Amit Patel"],
      location: "National Level",
      organizedBy: "Indian Creative Foundation"
    },
    awards: {
      prizeMoney: "₹10,000",
      medal: "Silver Medal",
      certificate: "Excellence Certificate",
      additionalRecognition: "Outstanding Performance"
    }
  },
  {
    id: "ICS2024003",
    participantName: "Priya Patel",
    artworkTitle: "Colorful Imagination",
    category: "Adult Category",
    rank: "Bronze Winner",
    competitionDate: "2024-03-15",
    certificateDate: "2024-03-20",
    verificationStatus: "verified",
    school: "Self-taught Artist",
    age: 28,
    imageUrl: "/api/placeholder/400/300",
    competition: {
      name: "Indian Creative Star",
      season: "Season 1",
      edition: "National Art Competition 2024",
      theme: "Open Theme",
      totalParticipants: 1250,
      judgingPanel: ["Dr. Ramesh Kumar", "Ms. Priya Shah", "Mr. Amit Patel"],
      location: "National Level",
      organizedBy: "Indian Creative Foundation"
    },
    awards: {
      prizeMoney: "₹5,000",
      medal: "Bronze Medal",
      certificate: "Achievement Certificate",
      additionalRecognition: "Creative Excellence Award"
    }
  },
  {
    id: "ICS2024004",
    participantName: "Aarav Kumar",
    artworkTitle: "My India",
    category: "Group A (5-8 years)",
    rank: "Participant",
    competitionDate: "2024-03-15",
    certificateDate: "2024-03-20",
    verificationStatus: "verified",
    school: "Kids International School",
    age: 7,
    imageUrl: "/api/placeholder/400/300",
    competition: {
      name: "Indian Creative Star",
      season: "Season 1",
      edition: "National Art Competition 2024",
      theme: "Open Theme",
      totalParticipants: 1250,
      judgingPanel: ["Dr. Ramesh Kumar", "Ms. Priya Shah", "Mr. Amit Patel"],
      location: "National Level",
      organizedBy: "Indian Creative Foundation"
    },
    awards: {
      prizeMoney: "Participation Gift",
      medal: "Participation Medal",
      certificate: "Participation Certificate",
      additionalRecognition: "Young Artist Appreciation"
    }
  }
];

const CertificateValidation = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    setIsVerifying(true);
    setError("");
    setCertificateData(null);
    setIsVerified(false);

    // Simulate API call
    setTimeout(() => {
      const found = mockCertificates.find(cert =>
        cert.id.toLowerCase() === certificateId.toLowerCase()
      );

      if (found) {
        setCertificateData(found);
        setIsVerified(true);
      } else {
        setError("Certificate not found. Please check the certificate ID and try again.");
      }
      setIsVerifying(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'gold winner':
        return 'from-yellow-400 to-orange-500';
      case 'silver winner':
        return 'from-gray-300 to-gray-500';
      case 'bronze winner':
        return 'from-orange-600 to-orange-800';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'gold winner':
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 'silver winner':
        return <Trophy className="h-6 w-6 text-gray-300" />;
      case 'bronze winner':
        return <Trophy className="h-6 w-6 text-orange-600" />;
      default:
        return <Award className="h-6 w-6 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
              <img
                src="/logo-ics.png"
                alt="Indian Creative Star Logo"
                className="w-20 h-20 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>';
                  }
                }}
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                <span className="block text-white font-light">Certificate</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-bold">
                  Validation Portal
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80">
                Indian Creative Star Official Verification
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Verify the authenticity of Indian Creative Star certificates instantly
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-10">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-4">
                    <FileCheck className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white/90">Enter Certificate ID to verify</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                      type="text"
                      placeholder="e.g., ICS2024001"
                      value={certificateId}
                      onChange={(e) => {
                        setCertificateId(e.target.value);
                        setError("");
                      }}
                      onKeyPress={handleKeyPress}
                      className="pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20 transition-all text-lg"
                    />
                  </div>
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying || !certificateId.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
                  >
                    <p className="text-red-400 text-center">{error}</p>
                  </motion.div>
                )}

                <div className="text-center">
                  <p className="text-white/60 text-sm">
                    Try: <span className="text-purple-400 font-mono cursor-pointer hover:text-purple-300 transition-colors" onClick={() => setCertificateId("ICS2024001")}>ICS2024001</span> • <span className="text-purple-400 font-mono cursor-pointer hover:text-purple-300 transition-colors" onClick={() => setCertificateId("ICS2024002")}>ICS2024002</span> • <span className="text-purple-400 font-mono cursor-pointer hover:text-purple-300 transition-colors" onClick={() => setCertificateId("ICS2024003")}>ICS2024003</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-white text-xs font-medium">Secure Storage</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Server className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-white text-xs font-medium">10+ Years Access</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <AwardIcon className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-white text-xs font-medium">Official</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-400" />
                </div>
                <p className="text-white text-xs font-medium">24/7 Available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certificate Display */}
        <AnimatePresence mode="wait">
          {isVerified && certificateData && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                {/* Certificate Header */}
                <div className="relative h-32 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        {getRankIcon(certificateData.rank)}
                        <span className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(certificateData.rank)} bg-clip-text text-transparent`}>
                          {certificateData.rank}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 font-medium">Verified Certificate</span>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-2 w-20 h-20 border-2 border-white/10 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-32 h-32 border-2 border-white/10 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/10 rotate-45"></div>
                    <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-white/10 rotate-12"></div>
                  </div>
                </div>

                <CardContent className="p-8 sm:p-10">
                  {/* Certificate Header with Logo */}
                  <div className="mb-8 text-center">
                    <div className="flex justify-center items-center gap-6 mb-6">
                      <img
                        src="/logo-ics.png"
                        alt="Indian Creative Star Logo"
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const shield = document.createElement('div');
                            shield.className = 'w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center';
                            shield.innerHTML = '<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>';
                            parent.appendChild(shield);
                          }
                        }}
                      />
                      <div>
                        <Badge className="mb-2 px-4 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                          Official Certificate
                        </Badge>
                        <h2 className="text-2xl font-bold text-white">
                          Indian Creative Star
                        </h2>
                        <p className="text-white/70">{certificateData.competition.edition}</p>
                      </div>
                    </div>
                  </div>

                  {/* Participant Highlight Section */}
                  <div className="mb-8 text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block"
                    >
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {certificateData.participantName}
                      </h2>
                      <p className="text-xl text-white/80">
                        Proud Participant of <span className="font-semibold text-purple-400">{certificateData.competition.name}</span>
                      </p>
                    </motion.div>
                  </div>

                  {/* Competition Details Banner */}
                  <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl p-6 mb-8 border border-white/10">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {certificateData.competition.season} - {certificateData.competition.edition}
                      </h3>
                      <p className="text-white/70">
                        Theme: <span className="font-semibold text-pink-400">{certificateData.competition.theme}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Total Participants</p>
                        <p className="text-white font-bold">{certificateData.competition.totalParticipants.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Competition Level</p>
                        <p className="text-white font-bold">{certificateData.competition.location}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Age</p>
                        <p className="text-white font-bold">{certificateData.age} years</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Rank Achieved</p>
                        <p className={`font-bold bg-gradient-to-r ${getRankColor(certificateData.rank)} bg-clip-text text-transparent`}>
                          {certificateData.rank}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Column 1 - Personal Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-400" />
                          Personal Information
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Full Name</p>
                          <p className="text-white font-semibold">{certificateData.participantName}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Age Category</p>
                          <p className="text-white font-semibold">{certificateData.category}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">School/Institution</p>
                          <p className="text-white font-semibold">{certificateData.school}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Artwork Submitted</p>
                          <p className="text-white font-semibold italic">"{certificateData.artworkTitle}"</p>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 - Competition Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-orange-400" />
                          Competition Details
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Competition</p>
                          <p className="text-white font-semibold">{certificateData.competition.name}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Season & Edition</p>
                          <p className="text-white font-semibold">{certificateData.competition.season}</p>
                          <p className="text-white/70 text-sm">{certificateData.competition.edition}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Organized By</p>
                          <p className="text-white font-semibold">{certificateData.competition.organizedBy}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Judging Panel</p>
                          <p className="text-white font-semibold text-sm">
                            {certificateData.competition.judgingPanel.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Column 3 - Awards & Recognition */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-400" />
                          Awards & Recognition
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className={`bg-gradient-to-r ${getRankColor(certificateData.rank)} bg-opacity-10 rounded-xl p-4 border border-white/20`}>
                          <p className="text-white/60 text-xs mb-1">Achievement</p>
                          <p className={`font-bold text-lg bg-gradient-to-r ${getRankColor(certificateData.rank)} bg-clip-text text-transparent`}>
                            {certificateData.rank}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Prize Money</p>
                          <p className="text-white font-semibold text-green-400">{certificateData.awards.prizeMoney}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Medal/Certificate</p>
                          <p className="text-white font-semibold">{certificateData.awards.medal}</p>
                          <p className="text-white/70 text-sm">{certificateData.awards.certificate}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-white/60 text-xs mb-1">Special Recognition</p>
                          <p className="text-white font-semibold text-purple-400">{certificateData.awards.additionalRecognition}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Dates Section */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="h-5 w-5 text-purple-400" />
                          <h4 className="text-lg font-semibold text-white">Competition Date</h4>
                        </div>
                        <p className="text-white/80">
                          {new Date(certificateData.competitionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                          })}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="h-5 w-5 text-green-400" />
                          <h4 className="text-lg font-semibold text-white">Certificate Issued</h4>
                        </div>
                        <p className="text-white/80">
                          {new Date(certificateData.certificateDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-8">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Shield className="h-6 w-6 text-green-400" />
                        <span className="text-green-400 font-bold text-lg">Authenticity Verified</span>
                      </div>
                      <p className="text-white/90 text-center text-sm max-w-2xl mx-auto">
                        This certificate has been digitally verified and confirmed as authentic. It was officially issued to <span className="font-semibold">{certificateData.participantName}</span> for outstanding participation in {certificateData.competition.name} {certificateData.competition.season}. The certificate is securely stored on our servers and will remain accessible for 10+ years.
                      </p>
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/30">
                          <Sparkles className="h-4 w-4 text-green-400" />
                          <p className="text-green-300 text-sm font-medium">Server Secured • ID: {certificateData.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                        Download Certificate
                      </Button>
                      <Button variant="outline" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border-white/20">
                        Share Achievement
                      </Button>
                      <Button variant="outline" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border-white/20">
                        Print Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex justify-center mt-6"
              >
                <Badge className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 text-lg font-medium rounded-full">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Certificate Successfully Verified
                </Badge>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Shield className="h-5 w-5 text-purple-400" />
            <p className="text-white/70 text-sm">
              All certificates are securely stored on our servers and will stay accessible for 10+ years
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CertificateValidation;