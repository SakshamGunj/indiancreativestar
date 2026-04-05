import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, UserPlus, Loader2, Copy, Check, Phone, Upload, Image as ImageIcon, CreditCard, AlertCircle, Eye, X } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, query, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

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
    return data.data.url;
  } else {
    throw new Error('ImgBB upload failed');
  }
};

const StudentManager = ({ user, guruData, students: initialStudents }) => {
  const [students, setStudents] = useState(initialStudents);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [useInstructorPhone, setUseInstructorPhone] = useState(false);
  const [submissionMode, setSubmissionMode] = useState('instructor');
  const [studentPin, setStudentPin] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Artwork upload state
  const [uploadingStudentId, setUploadingStudentId] = useState<string | null>(null);
  const [artwork1Files, setArtwork1Files] = useState<{[key: string]: File}>({});
  const [artwork2Files, setArtwork2Files] = useState<{[key: string]: File}>({});
  const [artwork1Previews, setArtwork1Previews] = useState<{[key: string]: string}>({});
  const [artwork2Previews, setArtwork2Previews] = useState<{[key: string]: string}>({});
  const [uploadProgress, setUploadProgress] = useState<string>('');
  
  // Payment state
  const [processingPayment, setProcessingPayment] = useState<{[key: string]: boolean}>({});

  // Artwork viewing state
  const [viewingArtwork, setViewingArtwork] = useState<{studentName: string, artwork1?: any, artwork2?: any} | null>(null);

  useEffect(() => {
    setStudents(initialStudents);
  }, [initialStudents]);

  useEffect(() => {
    if (useInstructorPhone && guruData?.phoneNumber) {
      setStudentPhone(guruData.phoneNumber);
    } else if (!useInstructorPhone) {
      setStudentPhone('');
    }
  }, [useInstructorPhone, guruData]);

  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const generateStudentId = () => {
    return `STU${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const generateCleanSlug = (text: string, uniqueId?: string) => {
    const baseSlug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return uniqueId ? `${baseSlug}-${uniqueId}` : baseSlug;
  };

  const handleAddStudent = async () => {
    if (user && studentName && studentAge && studentPhone) {
      try {
        setLoading(true);
        
        const pin = submissionMode === 'student' ? (studentPin || generatePin()) : null;
        const studentId = generateStudentId();
        
        const uniqueSlugId = Date.now().toString().slice(-6);
        const studentSlug = generateCleanSlug(studentName, uniqueSlugId);
        const academySlug = generateCleanSlug(guruData?.schoolName || 'academy');
        
        const studentLink = submissionMode === 'student'
          ? `${window.location.origin}/student/${academySlug}/${studentSlug}`
          : null;

        const studentData = {
          name: studentName,
          age: studentAge,
          phone: studentPhone,
          submissionMode,
          pin,
          studentId,
          studentLink,
          instructorId: user.uid,
          instructorName: guruData?.teacherName,
          academyName: guruData?.schoolName,
          createdAt: new Date(),
          artworksSubmitted: 0,
          paymentStatus: 'pending',
          paymentMode: submissionMode === 'instructor' ? 'instructor' : 'student',
          paidBy: null,
          paymentDate: null,
        };

        await addDoc(collection(db, "gurus", user.uid, "students"), studentData);

        const guruRef = doc(db, "gurus", user.uid);
        await setDoc(guruRef, {
          ...guruData,
          totalStudents: (guruData?.totalStudents || 0) + 1,
        }, { merge: true });

        const q = query(collection(db, "gurus", user.uid, "students"));
        const querySnapshot = await getDocs(q);
        setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        setStudentName('');
        setStudentAge('');
        setStudentPhone('');
        setStudentPin('');
        setUseInstructorPhone(false);
        setSubmissionMode('instructor');
        setError('');
        setLoading(false);

        if (submissionMode === 'student' && studentLink) {
          alert(`Student registered successfully!\n\nStudent Link: ${studentLink}\nPIN: ${pin}\n\nPlease share these credentials with the student.`);
        } else {
          alert('Student registered successfully! You can now submit artworks on their behalf.');
        }

      } catch (error) {
        console.error('Error adding student:', error);
        setError('Failed to add student. Please try again.');
        setLoading(false);
      }
    } else {
      setError('Please fill in all required fields');
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const handleArtworkFileChange = (file: File | null, studentId: string, artworkNumber: number) => {
    if (file) {
      if (file.size > 32 * 1024 * 1024) {
        setError('File size must be less than 32MB');
        return;
      }
      
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPG, PNG, GIF, WEBP)');
        return;
      }
      
      const previewUrl = URL.createObjectURL(file);
      
      if (artworkNumber === 1) {
        setArtwork1Files(prev => ({ ...prev, [studentId]: file }));
        setArtwork1Previews(prev => ({ ...prev, [studentId]: previewUrl }));
      } else {
        setArtwork2Files(prev => ({ ...prev, [studentId]: file }));
        setArtwork2Previews(prev => ({ ...prev, [studentId]: previewUrl }));
      }
      setError('');
    }
  };

  const handleSubmitArtworks = async (studentId: string, studentDocId: string) => {
    const artwork1 = artwork1Files[studentId];
    const artwork2 = artwork2Files[studentId];

    if (!artwork1 || !artwork2) {
      setError('Please upload both artworks before submitting.');
      return;
    }

    setUploadingStudentId(studentId);
    setError('');

    try {
      setUploadProgress('Uploading Artwork #1...');
      const artwork1Url = await uploadToImgBB(artwork1);
      
      setUploadProgress('Uploading Artwork #2...');
      const artwork2Url = await uploadToImgBB(artwork2);
      
      setUploadProgress('Saving submission...');
      const studentRef = doc(db, "gurus", user.uid, "students", studentDocId);
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

      const q = query(collection(db, "gurus", user.uid, "students"));
      const querySnapshot = await getDocs(q);
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      setArtwork1Files(prev => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
      setArtwork2Files(prev => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
      setArtwork1Previews(prev => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
      setArtwork2Previews(prev => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });

      setUploadingStudentId(null);
      setUploadProgress('');
      alert('Artworks submitted successfully!');
    } catch (err) {
      console.error('Error submitting artworks:', err);
      setError('Failed to upload artworks. Please check your internet connection and try again.');
      setUploadingStudentId(null);
      setUploadProgress('');
    }
  };

  const handleInstructorPayment = async (studentId: string, studentDocId: string, studentData: any) => {
    setProcessingPayment(prev => ({ ...prev, [studentId]: true }));
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
            customer_name: guruData?.teacherName || 'Instructor',
            customer_email: user.email || '',
            customer_phone: guruData?.phoneNumber || studentData.phone
          },
          order_meta: {
            return_url: `${window.location.origin}/guru-program?payment=success&studentId=${studentDocId}&mode=instructor`,
            student_id: studentDocId,
            student_name: studentData.name,
            instructor_id: user.uid,
            payment_mode: 'instructor'
          },
          order_note: `Indian Creative Star - Entry Fee for ${studentData.name} (Paid by Instructor)`
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
              window.location.href = `${window.location.origin}/guru-program?payment=success&studentId=${studentDocId}&mode=instructor`;
            } else if (result.error) {
              console.error('Payment error:', result.error);
              alert('Payment failed. Please try again.');
              setProcessingPayment(prev => ({ ...prev, [studentId]: false }));
            }
          });
        };
        document.head.appendChild(script);
      } else {
        console.error('Failed to create order:', data);
        alert('Failed to create payment order. Please try again.');
        setProcessingPayment(prev => ({ ...prev, [studentId]: false }));
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setProcessingPayment(prev => ({ ...prev, [studentId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <Award className="h-5 w-5 text-yellow-400" />
            Register New Student
          </CardTitle>
          <CardDescription className="text-white/60">
            Add students for Indian Creative Star Competition - Season 2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-5 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-white/90 text-sm font-medium">Student Name *</Label>
              <Input 
                id="student-name" 
                placeholder="Enter full name" 
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all" 
                value={studentName} 
                onChange={(e) => setStudentName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-age" className="text-white/90 text-sm font-medium">Student Age *</Label>
              <Input 
                id="student-age" 
                type="number" 
                placeholder="Age" 
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all" 
                value={studentAge} 
                onChange={(e) => setStudentAge(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-phone" className="text-white/90 text-sm font-medium">Phone Number *</Label>
            <Input 
              id="student-phone" 
              type="tel" 
              placeholder="+91 98765 43210" 
              className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all" 
              value={studentPhone} 
              onChange={(e) => setStudentPhone(e.target.value)}
              disabled={useInstructorPhone}
            />
            <button
              type="button"
              onClick={() => setUseInstructorPhone(!useInstructorPhone)}
              className={`mt-2 w-full sm:w-auto flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                useInstructorPhone
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 hover:bg-purple-500/30'
                  : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.05] hover:border-white/20'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                useInstructorPhone
                  ? 'border-purple-400 bg-purple-500/30'
                  : 'border-white/30 bg-white/5'
              }`}>
                {useInstructorPhone && (
                  <Check className="h-3.5 w-3.5 text-purple-300" />
                )}
              </div>
              <span className="text-sm font-medium">
                Use my number ({guruData?.phoneNumber})
              </span>
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="submission-mode" className="text-white/90 text-sm font-medium">Who will submit artworks? *</Label>
            <Select value={submissionMode} onValueChange={setSubmissionMode}>
              <SelectTrigger className="bg-white/[0.05] border-white/10 text-white h-11 rounded-lg">
                <SelectValue placeholder="Select submission mode" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a2e] border-white/10">
                <SelectItem value="instructor" className="text-white hover:bg-white/10">
                  I will submit on behalf of student
                </SelectItem>
                <SelectItem value="student" className="text-white hover:bg-white/10">
                  Student will submit through their portal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {submissionMode === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="student-pin" className="text-white/90 text-sm font-medium">
                6-Digit PIN for Student (Optional - auto-generated if empty)
              </Label>
              <Input 
                id="student-pin" 
                type="text" 
                maxLength={6}
                placeholder="Leave empty to auto-generate" 
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:bg-white/[0.08] focus:border-purple-500/50 transition-all" 
                value={studentPin} 
                onChange={(e) => setStudentPin(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              />
              <p className="text-xs text-white/50">
                This PIN will be used by the student to access their submission portal
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleAddStudent}
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Register Student
              </>
            )}
          </Button>
          <p className="text-center text-xs text-white/50">
            Entry fee: ₹249 for 2 artworks • You earn ₹75 (30% commission)
          </p>
        </CardContent>
      </Card>

      {students.length > 0 && (
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Registered Students</CardTitle>
            <CardDescription className="text-white/60">
              Manage your students and their submission portals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <Card key={student.id} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-semibold text-white text-base">{student.name}</CardTitle>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        student.paymentStatus === 'paid'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {student.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    <CardDescription className="text-white/60 text-sm">
                      Age: {student.age}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Phone className="h-3 w-3" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="capitalize text-purple-400 text-xs">{student.submissionMode} Submission</div>

                    {student.submissionMode === 'student' && student.studentLink && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input readOnly value={student.studentLink} className="flex-1 bg-white/[0.05] border-white/10 rounded-lg p-2 text-xs text-white/70 font-mono" />
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/[0.05] border-white/10 text-white hover:bg-white/10 h-9 px-3"
                            onClick={() => copyToClipboard(student.studentLink, `link-${student.id}`)}
                          >
                            {copiedId === `link-${student.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/60">PIN:</span>
                          <div className="bg-white/[0.05] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-mono">
                            {student.pin}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/[0.05] border-white/10 text-white hover:bg-white/10 h-8 px-3"
                            onClick={() => copyToClipboard(student.pin, `pin-${student.id}`)}
                          >
                            {copiedId === `pin-${student.id}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    )}

                    {student.submissionMode === 'instructor' && student.paymentStatus !== 'paid' && student.artworksSubmitted < 2 && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                        <Button
                          onClick={() => handleInstructorPayment(student.studentId, student.id, student)}
                          disabled={processingPayment[student.studentId]}
                          className="w-full h-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm rounded-lg"
                        >
                          {processingPayment[student.studentId] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                          Pay ₹249
                        </Button>
                      </div>
                    )}
                    
                    {student.submissionMode === 'instructor' && student.paymentStatus === 'paid' && student.artworksSubmitted < 2 && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white/90 text-xs font-medium flex items-center gap-2">
                            <ImageIcon className="h-3.5 w-3.5 text-purple-400" />
                            Artwork #1
                          </Label>
                          <Input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={(e) => handleArtworkFileChange(e.target.files?.[0] || null, student.studentId, 1)}
                            className="bg-white/[0.05] border-white/10 text-white text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-purple-500/20 file:text-purple-300"
                            disabled={uploadingStudentId === student.studentId}
                          />
                          {artwork1Previews[student.studentId] && (
                            <img src={artwork1Previews[student.studentId]} alt="Preview" className="w-full h-24 object-contain rounded-lg" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white/90 text-xs font-medium flex items-center gap-2">
                            <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
                            Artwork #2
                          </Label>
                          <Input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={(e) => handleArtworkFileChange(e.target.files?.[0] || null, student.studentId, 2)}
                            className="bg-white/[0.05] border-white/10 text-white text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-500/20 file:text-blue-300"
                            disabled={uploadingStudentId === student.studentId}
                          />
                          {artwork2Previews[student.studentId] && (
                            <img src={artwork2Previews[student.studentId]} alt="Preview" className="w-full h-24 object-contain rounded-lg" />
                          )}
                        </div>
                        <Button
                          onClick={() => handleSubmitArtworks(student.studentId, student.id)}
                          disabled={!artwork1Files[student.studentId] || !artwork2Files[student.studentId] || uploadingStudentId === student.studentId}
                          className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm rounded-lg"
                        >
                          {uploadingStudentId === student.studentId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                          Submit Artworks
                        </Button>
                      </div>
                    )}

                    {student.artworksSubmitted >= 2 && (
                      <div className="mt-3 space-y-2">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                          <Check className="h-4 w-4 text-green-400 mx-auto mb-1" />
                          <span className="text-sm font-medium text-green-400">Submitted</span>
                        </div>
                        <Button
                          onClick={() => setViewingArtwork({ studentName: student.name, artwork1: student.artwork1, artwork2: student.artwork2 })}
                          className="w-full h-9 bg-blue-600 text-white font-medium text-sm rounded-lg"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Artworks
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentManager;