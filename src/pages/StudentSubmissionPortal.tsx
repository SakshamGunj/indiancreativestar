import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Check, AlertCircle, Award, Lock, Image as ImageIcon, CreditCard } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const IMGBB_API_KEY = '91acddc60c0c58dde66ca6509d4e9fd9';

const uploadToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload image to ImgBB');
  }
  
  const data = await response.json();
  
  if (data.success) {
    return data.data.url; // Returns the direct image URL
  } else {
    throw new Error('ImgBB upload failed');
  }
};

const StudentSubmissionPortal = () => {
  const { academySlug, studentSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState<any>(null);
  const [instructorId, setInstructorId] = useState<string>('');
  const [artwork1, setArtwork1] = useState<File | null>(null);
  const [artwork2, setArtwork2] = useState<File | null>(null);
  const [artwork1Preview, setArtwork1Preview] = useState<string>('');
  const [artwork2Preview, setArtwork2Preview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const generateCleanSlug = (text: string, uniqueId?: string) => {
    const baseSlug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return uniqueId ? `${baseSlug}-${uniqueId}` : baseSlug;
  };

  const extractBaseSlug = (slug: string) => {
    // Remove the unique ID suffix (last 6 digits after final hyphen)
    const parts = slug.split('-');
    if (parts.length > 1 && /^\d{6}$/.test(parts[parts.length - 1])) {
      // If last part is 6 digits, remove it to get base name
      return parts.slice(0, -1).join('-');
    }
    return slug;
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!academySlug || !studentSlug) {
        setError('Invalid link. Please check with your instructor.');
        setLoading(false);
        return;
      }

      try {
        // Query all gurus to find matching academy and student
        const gurusSnapshot = await getDocs(collection(db, "gurus"));
        let found = false;

        for (const guruDoc of gurusSnapshot.docs) {
          const guruData = guruDoc.data();
          const guruAcademySlug = generateCleanSlug(guruData.schoolName || '');
          
          // Check if academy slug matches
          if (guruAcademySlug === academySlug) {
            const studentsSnapshot = await getDocs(
              collection(db, "gurus", guruDoc.id, "students")
            );
            
            // Find student by matching slug (with or without unique ID)
            for (const studentDoc of studentsSnapshot.docs) {
              const studentData = studentDoc.data();
              
              // Try to extract the actual student link from stored data
              if (studentData.studentLink) {
                const storedSlug = studentData.studentLink.split('/').pop();
                
                // Direct match with stored slug
                if (storedSlug === studentSlug) {
                  setStudentData({ ...studentData, docId: studentDoc.id });
                  setInstructorId(guruDoc.id);
                  found = true;
                  
                  // Check payment status
                  setPaymentStatus(studentData.paymentStatus || 'pending');
                  
                  // Check if already submitted
                  if (studentData.artworksSubmitted >= 2) {
                    setSubmitted(true);
                    setAuthenticated(true);
                  }
                  break;
                }
              } else {
                // Fallback: match by base name (for older entries without unique ID)
                const studentNameSlug = generateCleanSlug(studentData.name || '');
                const baseStudentSlug = extractBaseSlug(studentSlug);
                
                if (studentNameSlug === baseStudentSlug) {
                  setStudentData({ ...studentData, docId: studentDoc.id });
                  setInstructorId(guruDoc.id);
                  found = true;
                  
                  // Check payment status
                  setPaymentStatus(studentData.paymentStatus || 'pending');
                  
                  // Check if already submitted
                  if (studentData.artworksSubmitted >= 2) {
                    setSubmitted(true);
                    setAuthenticated(true);
                  }
                  break;
                }
              }
            }
          }
          
          if (found) break;
        }

        if (!found) {
          setError('Student not found. Please check your link or contact your instructor.');
        }
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [academySlug, studentSlug]);

  // Handle payment success from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');

    if (payment === 'success' && authenticated && studentData && instructorId) {
      // Update payment status in Firebase
      const studentRef = doc(db, "gurus", instructorId, "students", studentData.docId);
      updateDoc(studentRef, {
        paymentStatus: 'paid',
        paidBy: 'student',
        paymentDate: new Date(),
        lastUpdated: new Date()
      }).then(() => {
        setPaymentStatus('paid');
        alert('Payment successful! You can now submit your artworks.');
        
        // Clear URL parameters
        window.history.replaceState({}, '', window.location.pathname);
      }).catch(err => {
        console.error('Error updating payment status:', err);
        setError('Payment recorded but failed to update. Please contact support.');
      });
    }
  }, [authenticated, studentData, instructorId]);

  const handlePinSubmit = () => {
    if (!studentData) return;

    if (pin === studentData.pin) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again or contact your instructor.');
    }
  };

  const handleFileChange = (file: File | null, artworkNumber: number) => {
    if (file) {
      // Check file size (32MB max for ImgBB)
      if (file.size > 32 * 1024 * 1024) {
        setError('File size must be less than 32MB');
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPG, PNG, GIF, WEBP)');
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      if (artworkNumber === 1) {
        setArtwork1(file);
        setArtwork1Preview(previewUrl);
      } else {
        setArtwork2(file);
        setArtwork2Preview(previewUrl);
      }
      setError('');
    }
  };

  // Handle Cashfree Payment for Student
  const handleStudentPayment = async () => {
    if (!studentData || !instructorId) {
      setError('Student data not found. Please try again.');
      return;
    }

    setProcessingPayment(true);
    setError('');

    try {
      const response = await fetch('https://indiancreativestarbackend.vercel.app/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_amount: '249',
          order_currency: 'INR',
          customer_details: {
            customer_name: studentData.name,
            customer_email: `${studentData.name.toLowerCase().replace(/\s+/g, '')}@student.ics.com`,
            customer_phone: studentData.phone
          },
          order_meta: {
            return_url: `${window.location.origin}${window.location.pathname}?payment=success`,
            student_id: studentData.docId,
            student_name: studentData.name,
            instructor_id: instructorId,
            payment_mode: 'student'
          },
          order_note: `Indian Creative Star - Entry Fee for ${studentData.name} (Paid by Student)`
        })
      });

      const data = await response.json();

      if (data.success && data.data?.payment_session_id) {
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => {
          const cashfree = (window as any).Cashfree({
            mode: 'production'
          });
          
          const checkoutOptions = {
            paymentSessionId: data.data.payment_session_id,
            redirectTarget: '_modal'
          };
          
          cashfree.checkout(checkoutOptions).then((result: any) => {
            if (result.paymentDetails) {
              window.location.href = `${window.location.pathname}?payment=success`;
            } else if (result.error) {
              console.error('Payment error:', result.error);
              alert('Payment failed. Please try again.');
              setProcessingPayment(false);
            }
          });
        };
        document.head.appendChild(script);
      } else {
        console.error('Failed to create order:', data);
        alert('Failed to create payment order. Please try again.');
        setProcessingPayment(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setProcessingPayment(false);
    }
  };

  const handleSubmit = async () => {
    if (!artwork1 || !artwork2) {
      setError('Please upload both artworks before submitting.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload artwork 1 to ImgBB
      setUploadProgress('Uploading Artwork #1...');
      const artwork1Url = await uploadToImgBB(artwork1);
      
      // Upload artwork 2 to ImgBB
      setUploadProgress('Uploading Artwork #2...');
      const artwork2Url = await uploadToImgBB(artwork2);
      
      // Update Firestore with the ImgBB URLs
      setUploadProgress('Saving submission...');
      const studentRef = doc(db, "gurus", instructorId, "students", studentData.docId);
      await updateDoc(studentRef, {
        artworksSubmitted: 2,
        submittedAt: new Date(),
        artwork1: {
          name: artwork1.name,
          url: artwork1Url,
          size: artwork1.size,
          type: artwork1.type,
        },
        artwork2: {
          name: artwork2.name,
          url: artwork2Url,
          size: artwork2.size,
          type: artwork2.type,
        },
      });

      setSubmitted(true);
      setUploading(false);
      setUploadProgress('');
    } catch (err) {
      console.error('Error submitting artworks:', err);
      setError('Failed to upload artworks. Please check your internet connection and try again.');
      setUploading(false);
      setUploadProgress('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter']">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading submission portal...</p>
        </div>
      </div>
    );
  }

  if (error && !studentData) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter'] p-4">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Access Error</h2>
            <p className="text-white/60">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter'] p-4">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Submission Complete!</h2>
            <p className="text-white/70 mb-6">
              Your artworks have been successfully submitted to the Indian Creative Star Competition.
            </p>
            <div className="bg-white/[0.03] rounded-lg p-4 mb-6">
              <p className="text-sm text-white/60 mb-2">Student Name</p>
              <p className="text-white font-semibold">{studentData?.name}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-4">
              <p className="text-sm text-white/60 mb-2">Academy / Instructor</p>
              <p className="text-white font-semibold">{studentData?.academyName}</p>
              <p className="text-white/70 text-sm">{studentData?.instructorName}</p>
            </div>
            <p className="text-xs text-white/50 mt-6">
              Good luck with the competition! Results will be announced soon.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter'] p-4">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl pointer-events-none" />
          <CardHeader className="relative text-center pb-6">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-semibold text-white">
              Student Submission Portal
            </CardTitle>
            <CardDescription className="text-white/60">
              Enter your PIN to access your submission portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="bg-white/[0.03] rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/60">Student Name</p>
              <p className="text-white font-semibold">{studentData?.name}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/60">Academy / Instructor</p>
              <p className="text-white font-semibold">{studentData?.academyName}</p>
              <p className="text-white/70 text-sm">{studentData?.instructorName}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-white/90 text-sm font-medium">
                6-Digit PIN
              </Label>
              <Input
                id="pin"
                type="password"
                maxLength={6}
                placeholder="Enter your PIN"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-12 rounded-lg text-center text-2xl tracking-widest font-mono focus:bg-white/[0.08] focus:border-purple-500/50 transition-all"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Button
              onClick={handlePinSubmit}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={pin.length !== 6}
            >
              <Lock className="mr-2 h-4 w-4" />
              Access Portal
            </Button>
            <p className="text-xs text-white/50 text-center">
              Don't have your PIN? Contact your instructor.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment Required Screen for Student Mode
  if (authenticated && paymentStatus !== 'paid' && studentData?.submissionMode === 'student') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter'] p-4">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-2xl pointer-events-none" />
          <CardHeader className="relative text-center pb-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-semibold text-white">
              Payment Required
            </CardTitle>
            <CardDescription className="text-white/60">
              Complete payment to submit your artworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="bg-white/[0.03] rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/60">Student Name</p>
              <p className="text-white font-semibold">{studentData?.name}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/60">Academy / Instructor</p>
              <p className="text-white font-semibold">{studentData?.academyName}</p>
              <p className="text-white/70 text-sm">{studentData?.instructorName}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-green-300/80 mb-2">Competition Entry Fee</p>
                <p className="text-3xl font-bold text-green-400 mb-1">₹249</p>
                <p className="text-xs text-green-300/60">For 2 artwork submissions</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2 text-sm">What's Included</h4>
              <ul className="text-xs text-blue-200/70 space-y-1">
                <li>• Submit 2 artworks to the competition</li>
                <li>• Certificate by Culture Minister</li>
                <li>• ICS Certified Artist ID Card</li>
                <li>• Chance to win ₹50,000 prize pool</li>
                <li>• Trophy & medals for winners</li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleStudentPayment}
              disabled={processingPayment}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {processingPayment ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay ₹249 & Submit Artworks
                </>
              )}
            </Button>
            <p className="text-xs text-white/50 text-center">
              Secure payment powered by Cashfree
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if instructor needs to pay
  if (authenticated && paymentStatus !== 'paid' && studentData?.submissionMode === 'instructor') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Inter'] p-4">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Payment Pending</h2>
            <p className="text-white/70 mb-6">
              Your instructor needs to complete the payment before you can submit artworks.
            </p>
            <div className="bg-white/[0.03] rounded-lg p-4 mb-6">
              <p className="text-sm text-white/60 mb-2">Student Name</p>
              <p className="text-white font-semibold">{studentData?.name}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-4">
              <p className="text-sm text-white/60 mb-2">Instructor</p>
              <p className="text-white font-semibold">{studentData?.instructorName}</p>
              <p className="text-white/70 text-sm">{studentData?.academyName}</p>
            </div>
            <p className="text-xs text-white/50 mt-6">
              Please contact your instructor to complete the payment process.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 md:p-8 font-['Inter']">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
              <img
                src="/Daami Presents (1920 x 1080 px) (1000 x 1000 px).webp"
                alt="Indian Creative Star"
                className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl shadow-2xl ring-2 ring-white/10"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Artwork Submission
              </h1>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5">Indian Creative Star - Season 2</p>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl mb-4 sm:mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl pointer-events-none" />
          <CardHeader className="relative pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold text-white">Your Details</CardTitle>
          </CardHeader>
          <CardContent className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">Student Name</p>
              <p className="text-white font-semibold text-sm sm:text-base">{studentData?.name}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">Age</p>
              <p className="text-white font-semibold text-sm sm:text-base">{studentData?.age} years</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">Academy</p>
              <p className="text-white font-semibold text-sm sm:text-base">{studentData?.academyName}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">Instructor</p>
              <p className="text-white font-semibold text-sm sm:text-base">{studentData?.instructorName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Card */}
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              <Award className="h-5 w-5 text-yellow-400" />
              Upload Your Artworks
            </CardTitle>
            <CardDescription className="text-white/60">
              Submit 2 artworks for the competition (Max 10MB each)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 relative">
            {/* Artwork 1 */}
            <div className="space-y-3">
              <Label className="text-white/90 text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-purple-400" />
                Artwork #1
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null, 1)}
                  className="bg-white/[0.05] border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 h-12 rounded-lg cursor-pointer"
                  disabled={uploading}
                />
                {artwork1 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <Check className="h-4 w-4" />
                      <span className="truncate">{artwork1.name}</span>
                      <span className="text-white/50 text-xs">({(artwork1.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    {artwork1Preview && (
                      <div className="relative w-full h-40 bg-white/[0.03] rounded-lg overflow-hidden border border-white/10">
                        <img
                          src={artwork1Preview}
                          alt="Artwork 1 Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Artwork 2 */}
            <div className="space-y-3">
              <Label className="text-white/90 text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-blue-400" />
                Artwork #2
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null, 2)}
                  className="bg-white/[0.05] border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 h-12 rounded-lg cursor-pointer"
                  disabled={uploading}
                />
                {artwork2 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <Check className="h-4 w-4" />
                      <span className="truncate">{artwork2.name}</span>
                      <span className="text-white/50 text-xs">({(artwork2.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    {artwork2Preview && (
                      <div className="relative w-full h-40 bg-white/[0.03] rounded-lg overflow-hidden border border-white/10">
                        <img
                          src={artwork2Preview}
                          alt="Artwork 2 Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
              <h4 className="text-blue-300 font-semibold mb-2 text-xs sm:text-sm">Submission Guidelines</h4>
              <ul className="text-xs text-blue-200/70 space-y-0.5 sm:space-y-1">
                <li>• Upload high-quality images of your artworks</li>
                <li>• Maximum file size: 32MB per artwork</li>
                <li>• Accepted formats: JPG, PNG, GIF, WEBP</li>
                <li>• Ensure artworks are clear and well-lit</li>
                <li>• Images will be securely stored and accessible anytime</li>
              </ul>
            </div>

            {uploading && uploadProgress && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                  <div className="flex-1">
                    <p className="text-purple-300 font-medium text-sm">{uploadProgress}</p>
                    <p className="text-purple-400/60 text-xs mt-1">Please wait, do not close this page...</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!artwork1 || !artwork2 || uploading}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  {uploadProgress || 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Submit Artworks to Competition
                </>
              )}
            </Button>

            <p className="text-center text-xs text-white/50">
              By submitting, you agree to the competition terms and conditions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSubmissionPortal;