import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, DollarSign, LogIn, UserPlus, Loader2, Trophy, Award, Link as LinkIcon } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import GuruDashboard from '@/components/guru/GuruDashboard';

const GuruArtProgram = () => {
  const [user, setUser] = useState(null);
  const [guruData, setGuruData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('guruUser');
    const storedGuruData = localStorage.getItem('guruData');
    
    if (storedUser && storedGuruData) {
      setUser(JSON.parse(storedUser));
      setGuruData(JSON.parse(storedGuruData));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "gurus", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGuruData(data);
          localStorage.setItem('guruUser', JSON.stringify({
            uid: user.uid,
            email: user.email
          }));
          localStorage.setItem('guruData', JSON.stringify(data));
        }
      } else {
        localStorage.removeItem('guruUser');
        localStorage.removeItem('guruData');
        setGuruData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (user) {
        const q = query(collection(db, "gurus", user.uid, "students"));
        const querySnapshot = await getDocs(q);
        setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchStudents();
  }, [user]);

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (isRegistering) {
        if (!teacherName || !schoolName || !phoneNumber) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const guruInfo = {
          email: userCredential.user.email,
          teacherName,
          schoolName,
          phoneNumber,
          createdAt: new Date(),
          totalEarnings: 0,
          totalStudents: 0,
        };
        await setDoc(doc(db, "gurus", userCredential.user.uid), guruInfo);
        setGuruData(guruInfo);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('guruUser');
      localStorage.removeItem('guruData');
      setUser(null);
      setGuruData(null);
      setEmail('');
      setPassword('');
      setTeacherName('');
      setSchoolName('');
      setPhoneNumber('');
      setError('');
      setStudents([]);
    } catch (error) {
      setError('Error logging out. Please try again.');
    }
  };

  const renderAuth = () => (
    <div className="max-w-md mx-auto font-['Inter']">
      <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
        <CardHeader className="relative space-y-3 pb-6">
          <CardTitle className="text-2xl text-center font-semibold tracking-tight text-white">
            {isRegistering ? 'Partner with Us' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-center text-white/60 text-sm">
            {isRegistering ? 'Join the Guru Art Program' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 relative">
          {isRegistering && (
            <>
              <div className="space-y-2">
                <Label htmlFor="teacher-name" className="text-white/90 text-sm font-medium">Full Name</Label>
                <Input
                  id="teacher-name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-name" className="text-white/90 text-sm font-medium">School / Institute</Label>
                <Input
                  id="school-name"
                  type="text"
                  placeholder="ABC International School"
                  className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90 text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@school.com"
              className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 text-sm font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <Button 
            onClick={handleAuth} 
            className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all duration-200" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isRegistering ? (
              <><UserPlus className="mr-2 h-4 w-4" />Create Account</>
            ) : (
              <><LogIn className="mr-2 h-4 w-4" />Sign In</>
            )}
          </Button>
          <div className="text-center pt-2">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <span className="text-purple-400 font-medium">
                {isRegistering ? 'Sign In' : 'Register'}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter']">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 md:p-8 font-['Inter']">
      {user ? (
        <GuruDashboard user={user} guruData={guruData} students={students} handleLogout={handleLogout} />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
                <img
                  src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).webp"
                  alt="Indian Creative Star"
                  className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl shadow-2xl ring-2 ring-white/10"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Guru Art Program
                </h1>
                <p className="text-xs sm:text-sm text-white/50 mt-0.5">by Indian Creative Star</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-normal">
              Empowering Art Educators, Nurturing Creative Talent
            </p>
            <div className="mt-6 sm:mt-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none" />
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 text-white relative">
                <Trophy className="h-5 w-5 text-yellow-400" />
                National Art Contest – Season 2
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-sm text-white/70 relative">
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg">
                    <p className="text-green-300/80 font-medium text-xs uppercase tracking-wide mb-1">Prize Pool</p>
                    <p className="text-green-400 font-bold text-xl sm:text-2xl">₹50,000</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-300/80 font-medium text-xs uppercase tracking-wide mb-1">Entry Fee</p>
                    <p className="text-blue-400 font-bold text-base sm:text-lg">₹249</p>
                    <p className="text-blue-300/60 text-xs mt-0.5">(2 artworks)</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg">
                    <p className="text-purple-300/80 font-medium text-xs uppercase tracking-wide mb-1">Age Limit</p>
                    <p className="text-purple-400 font-bold text-base sm:text-lg">No age limit</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-lg">
                    <p className="text-pink-300/80 font-medium text-xs uppercase tracking-wide mb-1">Theme</p>
                    <p className="text-pink-400 font-bold text-base sm:text-lg">Open theme</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 relative">
                <h4 className="text-white font-semibold mb-2 sm:mb-3 text-center text-sm sm:text-base">Rewards for Everyone</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
                  <div className="p-2.5 sm:p-3 bg-white/[0.03] rounded-lg text-center">
                    <p className="text-white/90">Certificate by Culture Minister</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                    <p className="text-white/90">ICS Certified Artist ID Card</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                    <p className="text-white/90">Trophies & Medals for Winners</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 relative">
                <p className="text-center text-sm">
                  <span className="text-white/60">Your Commission:</span> <span className="text-green-400 font-bold text-lg">₹75 (30%)</span>
                  <span className="text-white/40 mx-2">•</span>
                  <span className="text-white/50 text-xs">Organized by Daami Event</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Join India's Premier Art Platform
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Partner with Indian Creative Star and earn revenue while empowering young artists. Manage student registrations and artwork submissions seamlessly.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                  <div className="p-2.5 bg-purple-500/10 rounded-lg shrink-0">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Manage Students</h3>
                    <p className="text-sm text-white/60">Register students & generate personalized portals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                  <div className="p-2.5 bg-green-500/10 rounded-lg shrink-0">
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Earn Revenue</h3>
                    <p className="text-sm text-white/60">₹75 per student (30% commission on ₹249)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                  <div className="p-2.5 bg-blue-500/10 rounded-lg shrink-0">
                    <LinkIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Student Portals</h3>
                    <p className="text-sm text-white/60">Generate secure links for students to submit directly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                  <div className="p-2.5 bg-yellow-500/10 rounded-lg shrink-0">
                    <Award className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Recognition</h3>
                    <p className="text-sm text-white/60">Certificates, ID cards & prizes for participants</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              {renderAuth()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuruArtProgram;