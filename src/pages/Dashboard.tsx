import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Eye, EyeOff, Upload, CheckCircle, CreditCard, Image as ImageIcon, Settings, LogOut, Trophy, Star, Camera, Sparkles, Home, Plus, User, X } from 'lucide-react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import WhatsAppModal from '@/components/WhatsAppModal';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [isSubmittingArtwork, setIsSubmittingArtwork] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [previewUrl2, setPreviewUrl2] = useState<string | null>(null);
  const [isSubmittingArtwork2, setIsSubmittingArtwork2] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isUpdatingWhatsApp, setIsUpdatingWhatsApp] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check authentication state and payment status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      
      if (user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
        
        try {
          const userDoc = await getDoc(doc(db, 'indiancreativestar_accounts', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setName(data.name || user.displayName || '');
            setEmail(data.email || user.email || '');
            setWhatsapp(data.whatsapp || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle payment status from URL
  
  useEffect(() => {
    const payment = searchParams.get('payment');
    console.log('Payment status from URL:', payment);
    console.log('Current user:', currentUser);
    
    if (payment === 'success' && currentUser) {
      // Handle successful payment
      console.log('Processing successful payment...');
      updateDoc(doc(db, 'indiancreativestar_accounts', currentUser.uid), {
        name: name || currentUser.displayName || '',
        email: email || currentUser.email || '',
        whatsapp: whatsapp || userData?.whatsapp || '',
        hasPaid: true,
        paymentDate: new Date(),
        paymentStatus: 'success',
        paymentMethod: 'cashfree',
        paymentAmount: 249,
        paymentCurrency: 'INR',
        lastUpdated: new Date()
      }).then(() => {
        console.log('Payment updated in Firebase');
        setUserData(prev => ({ 
          ...prev, 
          hasPaid: true,
          paymentStatus: 'success',
          name: name || currentUser.displayName || '',
          email: email || currentUser.email || '',
          whatsapp: whatsapp || userData?.whatsapp || ''
        }));
        // Clear URL parameters after processing
        window.history.replaceState({}, '', '/indiancreativestar/dashboard');
      });
    } else if (payment === 'pending' && currentUser) {
      // Handle pending payment
      console.log('Processing pending payment...');
      updateDoc(doc(db, 'indiancreativestar_accounts', currentUser.uid), {
        paymentStatus: 'pending',
        lastPaymentAttempt: new Date(),
        lastUpdated: new Date()
      }).then(() => {
        setUserData(prev => ({ 
          ...prev, 
          paymentStatus: 'pending'
        }));
        alert('Payment is pending. Please wait for confirmation or try again.');
        window.history.replaceState({}, '', '/indiancreativestar/dashboard');
      });
    } else if (payment === 'user_dropped' && currentUser) {
      // Handle user dropped payment
      console.log('Processing user dropped payment...');
      updateDoc(doc(db, 'indiancreativestar_accounts', currentUser.uid), {
        paymentStatus: 'user_dropped',
        lastPaymentAttempt: new Date(),
        lastUpdated: new Date()
      }).then(() => {
        setUserData(prev => ({ 
          ...prev, 
          paymentStatus: 'user_dropped'
        }));
        alert('Payment was cancelled. You can try again anytime.');
        window.history.replaceState({}, '', '/indiancreativestar/dashboard');
      });
    } else if (payment === 'failed' && currentUser) {
      // Handle failed payment
      console.log('Processing failed payment...');
      updateDoc(doc(db, 'indiancreativestar_accounts', currentUser.uid), {
        paymentStatus: 'failed',
        lastPaymentAttempt: new Date(),
        lastUpdated: new Date()
      }).then(() => {
        setUserData(prev => ({ 
          ...prev, 
          paymentStatus: 'failed'
        }));
        alert('Payment failed. Please try again or contact support.');
        window.history.replaceState({}, '', '/indiancreativestar/dashboard');
      });
    }
  }, [searchParams, currentUser]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user already exists
      const userDoc = await getDoc(doc(db, 'indiancreativestar_accounts', user.uid));
      const existingData = userDoc.exists() ? userDoc.data() : null;
      
      await setDoc(doc(db, 'indiancreativestar_accounts', user.uid), {
        name: user.displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        whatsapp: existingData?.whatsapp || '',
        authProvider: 'google',
        createdAt: existingData?.createdAt || new Date(),
        lastLogin: new Date(),
        hasPaid: existingData?.hasPaid || false
      }, { merge: true });
      
      // If no WhatsApp number exists, show modal after login
      if (!existingData?.whatsapp) {
        setTimeout(() => {
          setShowWhatsAppModal(true);
        }, 1000);
      }
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      alert('Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  // Handle Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Email/Password Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsAuthenticating(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'indiancreativestar_accounts', userCredential.user.uid), {
        name: name,
        email: email,
        whatsapp: whatsapp,
        authProvider: 'email',
        createdAt: new Date(),
        lastLogin: new Date(),
        hasPaid: false
      });
      
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      }
      alert(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle WhatsApp number submission
  const handleWhatsAppSubmit = async (whatsappNumber: string) => {
    setIsUpdatingWhatsApp(true);
    try {
      await updateDoc(doc(db, 'indiancreativestar_accounts', currentUser!.uid), {
        whatsapp: whatsappNumber,
        lastUpdated: new Date()
      });
      
      setUserData(prev => ({ ...prev, whatsapp: whatsappNumber }));
      setWhatsapp(whatsappNumber);
      setShowWhatsAppModal(false);
    } catch (error) {
      console.error('Error updating WhatsApp number:', error);
      alert('Failed to save WhatsApp number. Please try again.');
    } finally {
      setIsUpdatingWhatsApp(false);
    }
  };

  // Handle Cashfree Hosted Checkout
  const handleCashfreeCheckout = async () => {
    // Check if WhatsApp number is required
    const currentWhatsApp = whatsapp || userData?.whatsapp;
    if (!currentWhatsApp) {
      setShowWhatsAppModal(true);
      return;
    }

    setIsProcessingCheckout(true);

    try {
      // Create order using our dedicated payment server
      const response = await fetch('https://indiancreativestarbackend.vercel.app/create-order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_amount: '249',
          order_currency: 'INR',
          customer_details: {
            customer_name: name || currentUser!.displayName || 'Artist',
            customer_email: email || currentUser!.email || '',
            customer_phone: currentWhatsApp
          },
          order_meta: {
            return_url: `${window.location.origin}/indiancreativestar/dashboard?payment=success`
          },
          order_note: 'Indian Creative Star - Entry Fee'
        })
      });

      const data = await response.json();

      if (data.success && data.data?.payment_session_id) {
        // Load Cashfree SDK and open checkout
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => {
          const cashfree = (window as any).Cashfree({
            mode: 'production' // Using production for live payments
          });
          
          const checkoutOptions = {
            paymentSessionId: data.data.payment_session_id,
            redirectTarget: '_modal'
          };
          
          cashfree.checkout(checkoutOptions).then((result: any) => {
            if (result.paymentDetails) {
              // Payment completed, redirect to success
              window.location.href = '/indiancreativestar/dashboard?payment=success';
            } else if (result.error) {
              console.error('Payment error:', result.error);
              alert('Payment failed. Please try again.');
            }
          });
        };
        document.head.appendChild(script);
      } else {
        console.error('Failed to create order:', data);
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Cashfree checkout error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingCheckout(false);
    }
  };


  // Handle File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File too large. Please select an image under 10MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileSelect2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File too large. Please select an image under 10MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      setSelectedFile2(file);
      setPreviewUrl2(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file: File, uid: string) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(',')[1]);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  
    const formData = new FormData();
    formData.append('key', '91acddc60c0c58dde66ca6509d4e9fd9');
    formData.append('image', base64);
    formData.append('name', `artwork_${uid}_${Date.now()}`);
  
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });
  
    const result = await response.json();
  
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result?.error?.message || 'Failed to upload image to ImgBB');
    }
  };
  
  // Handle Artwork Submission
  const handleArtworkSubmission = async () => {
    if (!selectedFile) {
      alert('Please select an artwork image.');
      return;
    }

    if (userData?.paymentStatus !== 'success') {
      alert('Please complete payment successfully first.');
      return;
    }

    setIsSubmittingArtwork(true);
    try {
      const imgbbData = await uploadToImgBB(selectedFile, currentUser!.uid);
      
      const artworkData: any = {
        hasSubmittedArtwork: true,
        submissionDate: new Date(),
        artworkFileName: selectedFile.name,
        artworkFileSize: selectedFile.size,
        artworkFileType: selectedFile.type,
        artworkUrl: imgbbData.url,
        artworkDisplayUrl: imgbbData.display_url,
        artworkViewerUrl: imgbbData.url_viewer,
        artworkDeleteUrl: imgbbData.delete_url,
        artworkId: imgbbData.id,
        submissionStatus: 'submitted',
        lastUpdated: new Date()
      };

      if (selectedFile2) {
        const imgbbData2 = await uploadToImgBB(selectedFile2, currentUser!.uid);
        artworkData.hasSubmittedArtwork2 = true;
        artworkData.submissionDate2 = new Date();
        artworkData.artworkFileName2 = selectedFile2.name;
        artworkData.artworkFileSize2 = selectedFile2.size;
        artworkData.artworkFileType2 = selectedFile2.type;
        artworkData.artworkUrl2 = imgbbData2.url;
        artworkData.artworkDisplayUrl2 = imgbbData2.display_url;
        artworkData.artworkViewerUrl2 = imgbbData2.url_viewer;
        artworkData.artworkDeleteUrl2 = imgbbData2.delete_url;
        artworkData.artworkId2 = imgbbData2.id;
        artworkData.submissionStatus2 = 'submitted';
      }

      await updateDoc(doc(db, 'indiancreativestar_accounts', currentUser!.uid), artworkData);

      setUserData(prev => ({
        ...prev,
        ...artworkData
      }));
      setSelectedFile(null);
      setPreviewUrl(null);
      if (selectedFile2) {
        setSelectedFile2(null);
        setPreviewUrl2(null);
      }
      
      setActiveTab('dashboard');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmittingArtwork(false);
    }
  };

  // Handle 2nd Artwork Submission (Festival Offer)
  const handleArtworkSubmission2 = async () => {
    if (!selectedFile2) {
      alert('Please select your second artwork to submit.');
      return;
    }

    if (!userData?.hasSubmittedArtwork) {
      alert('Please submit your first artwork before submitting the second one.');
      return;
    }

    setIsSubmittingArtwork2(true);
    try {
      const imgbbData = await uploadToImgBB(selectedFile2, currentUser!.uid);

      const artworkData2 = {
        hasSubmittedArtwork2: true,
        submissionDate2: new Date(),
        artworkFileName2: selectedFile2.name,
        artworkFileSize2: selectedFile2.size,
        artworkFileType2: selectedFile2.type,
        artworkUrl2: imgbbData.url,
        artworkDisplayUrl2: imgbbData.display_url,
        artworkViewerUrl2: imgbbData.url_viewer,
        artworkDeleteUrl2: imgbbData.delete_url,
        artworkId2: imgbbData.id,
        submissionStatus2: 'submitted',
        lastUpdated: new Date()
      };

      await updateDoc(doc(db, 'indiancreativestar_accounts', currentUser!.uid), artworkData2);

      setUserData(prev => ({
        ...prev,
        ...artworkData2
      }));
      setSelectedFile2(null);
      setPreviewUrl2(null);
      
      setActiveTab('dashboard');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);

    } catch (error) {
      console.error('Second artwork submission error:', error);
      alert('Second artwork submission failed. Please try again.');
    } finally {
      setIsSubmittingArtwork2(false);
    }
  };

  const safeFormatDate = (date: any) => {
    if (!date) return 'N/A';
    if (date.toDate) return new Date(date.toDate()).toLocaleDateString('en-IN');
    return new Date(date).toLocaleDateString('en-IN');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }


  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-purple-500/20 overflow-hidden">
              <img 
                src="https://www.daamievent.com/Daami%20Presents%20(1920%20x%201080%20px)%20(1000%20x%201000%20px).png" 
                alt="Daami Presents" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-1 tracking-tight leading-tight">
              Indian Creative Star
            </h1>
            <p className="text-gray-300 text-sm font-medium mb-3">India's biggest art competition</p>
            
            {/* Compact Stats */}
            <div className="flex justify-center gap-3 text-xs bg-white/5 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10">
              <span className="text-purple-300 font-semibold">10K+ Artists</span>
              <span className="text-gray-500">•</span>
              <span className="text-pink-300 font-semibold">₹50K Prizes</span>
              <span className="text-gray-500">•</span>
              <span className="text-orange-300 font-semibold">4.9★</span>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              {/* Google Sign-In */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isGoogleSigningIn}
                className="w-full bg-white/95 hover:bg-white text-gray-800 border-0 py-3 mb-4 font-semibold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isGoogleSigningIn ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-transparent text-gray-300 font-medium">or</span>
                </div>
              </div>

              {/* Toggle Login/Register */}
              <div className="flex mb-6 bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isLoginMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-[1.02]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    !isLoginMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-[1.02]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Forms */}
              {isLoginMode ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 h-11 font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01] border-0"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Log In'
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (min 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 bg-white/15 border-white/25 text-white placeholder:text-gray-300 rounded-xl text-sm font-medium backdrop-blur-sm focus:bg-white/25 focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 h-11 font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01] border-0"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>
              )}
              
              {/* Footer */}
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  By continuing, you agree to our{' '}
                  <span className="text-purple-300 hover:text-purple-200 cursor-pointer">Terms</span>
                  {' '}and{' '}
                  <span className="text-purple-300 hover:text-purple-200 cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Trust Indicators */}
          <div className="text-center mt-8">
            <div className="flex justify-center items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Trusted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src="https://www.daamievent.com/Daami%20Presents%20(1920%20x%201080%20px)%20(1000%20x%201000%20px).png" 
                alt="Daami Presents" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div>
              <h1 className="font-bold text-gray-900 text-lg">Indian Creative Star</h1>
              <p className="text-xs text-purple-600 font-medium">🇮🇳 National Art Competition</p>
            </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar 
              className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-purple-300 transition-all"
              onClick={() => setActiveTab('profile')}
            >
              <AvatarImage src={currentUser.photoURL || ''} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-lg overflow-y-auto" style={{maxHeight: 'calc(100vh - 140px)'}}>
        
        {/* Success Message Banner */}
        {showSuccessMessage && (
          <Card className="mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-white border-0 rounded-3xl shadow-2xl animate-bounce">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Trophy className="h-6 w-6 animate-pulse" />
                  <span className="font-bold text-lg">🏆 Masterpiece Submitted!</span>
                  <Trophy className="h-6 w-6 animate-pulse" />
                </div>
                <p className="text-white/95 text-sm font-medium mb-3 drop-shadow">Congratulations! You're now competing in India's most prestigious art competition!</p>
                <div className="flex items-center justify-center gap-2 text-xs text-white/80">
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></span>
                  <span>Expert jury evaluation begins now</span>
                </div>
                <Button
                  onClick={() => setShowSuccessMessage(false)}
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-white hover:bg-white/20 rounded-full"
                >
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome Card */}
            <Card className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-3 border-white/20">
                    <AvatarImage src={currentUser.photoURL || ''} />
                    <AvatarFallback className="bg-white/20 text-white text-lg">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold">Welcome, {currentUser.displayName || 'Creative Artist'}!</h2>
                    <p className="text-white/80 text-sm">
                      {userData?.hasSubmittedArtwork 
                        ? '🎨 Your masterpiece awaits judgment!' 
                        : userData?.hasPaid 
                        ? '✨ Time to showcase your talent!' 
                        : '🌟 Join India\'s most prestigious art competition!'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status Banner */}
            {userData?.paymentStatus === 'success' && (
              <Card className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-2xl">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Payment Successful!</p>
                      <p className="text-green-600 text-sm">Entry fee paid • Competition access unlocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {userData?.paymentStatus === 'pending' && (
              <Card className="mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 rounded-2xl">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Loader2 className="h-5 w-5 text-white animate-spin" />
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-800">Payment Pending</p>
                      <p className="text-yellow-600 text-sm">Please wait for confirmation or try again</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {userData?.paymentStatus === 'user_dropped' && (
              <Card className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-2xl">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Payment Cancelled</p>
                      <p className="text-blue-600 text-sm">You can try again anytime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {userData?.paymentStatus === 'failed' && (
              <Card className="mb-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-200 rounded-2xl">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">Payment Failed</p>
                      <p className="text-red-600 text-sm">Please try again or contact support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress Steps */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3 bg-white rounded-xl p-3 shadow-sm">
                <div className={`flex items-center gap-2 ${userData?.paymentStatus === 'success' ? 'text-green-600' : 'text-purple-600'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData?.paymentStatus === 'success' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    {userData?.paymentStatus === 'success' ? <CheckCircle className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                  </div>
                  <span className="font-medium text-sm">Pay Entry Fee</span>
                </div>
                <div className={`w-12 h-1 ${userData?.paymentStatus === 'success' ? 'bg-green-200' : 'bg-gray-200'} rounded`}></div>
                <div className={`flex items-center gap-2 ${userData?.hasSubmittedArtwork ? 'text-green-600' : userData?.paymentStatus === 'success' ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData?.hasSubmittedArtwork ? 'bg-green-100' : userData?.paymentStatus === 'success' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {userData?.hasSubmittedArtwork ? <CheckCircle className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                  </div>
                  <span className="font-medium text-sm">Submit Artwork</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <>
            {/* Profile Header */}
            <Card className="mb-4 bg-white border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-3 border-4 border-purple-100">
                  <AvatarImage src={currentUser.photoURL || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{currentUser.displayName || 'Artist'}</h2>
                <p className="text-gray-600 text-sm mb-3">{currentUser.email}</p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-purple-600">{userData?.hasPaid ? '✓' : '○'}</div>
                    <div className="text-gray-500">Paid</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">
                      {userData?.hasSubmittedArtwork2 ? '2/2' : userData?.hasSubmittedArtwork ? '1/2' : '0/2'}
                    </div>
                    <div className="text-gray-500">Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">★</div>
                    <div className="text-gray-500">Artist</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Update Profile Section */}
            <Card className="mb-4 bg-white border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">Update Profile</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <Input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="h-10 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>
                </div>

                <Button
                  onClick={async () => {
                    if (!name || !email || !whatsapp) {
                      alert('Please fill in all fields');
                      return;
                    }
                    try {
                      await updateDoc(doc(db, 'indiancreativestar_accounts', currentUser!.uid), {
                        name: name,
                        email: email,
                        whatsapp: whatsapp,
                        lastUpdated: new Date()
                      });
                      setUserData(prev => ({ ...prev, name, email, whatsapp }));
                      alert('Profile updated successfully!');
                    } catch (error) {
                      console.error('Error updating profile:', error);
                      alert('Failed to update profile. Please try again.');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-10 font-medium rounded-xl mt-4"
                >
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className={`border-0 rounded-2xl ${userData?.hasPaid ? 'bg-green-50' : 'bg-gray-50'}`}>
                <CardContent className="p-3 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${userData?.hasPaid ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <CreditCard className={`h-4 w-4 ${userData?.hasPaid ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Entry Fee</p>
                  <p className={`text-sm font-bold ${userData?.hasPaid ? 'text-green-600' : 'text-gray-400'}`}>
                    {userData?.hasPaid ? 'Paid ₹249' : 'Pending'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className={`border-0 rounded-2xl ${userData?.hasSubmittedArtwork ? 'bg-green-50' : 'bg-gray-50'}`}>
                <CardContent className="p-3 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${userData?.hasSubmittedArtwork ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Upload className={`h-4 w-4 ${userData?.hasSubmittedArtwork ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Artwork</p>
                  <p className={`text-sm font-bold ${userData?.hasSubmittedArtwork ? 'text-green-600' : 'text-gray-400'}`}>
                    {userData?.hasSubmittedArtwork ? 'Submitted' : 'Pending'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Account Actions */}
            <Card className="mb-4 bg-white border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">Account</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Joined</span>
                    <span className="text-sm text-gray-900">{safeFormatDate(userData?.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Status</span>
                    <span className="text-sm font-medium text-purple-600">Active Artist</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Competition</span>
                    <span className="text-sm text-gray-900">Season 2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sign Out Button */}
            <Button
              onClick={() => auth.signOut()}
              variant="outline"
              className="w-full h-11 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </>
        )}

        {/* Step 1: Payment */}
        {activeTab === 'dashboard' && userData?.paymentStatus !== 'success' && (
          <>
            {/* Payment Card */}
            <Card className="mb-4 shadow-lg border-0 rounded-3xl bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">🎨 Join the Competition</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Unlock your creative potential in India's most prestigious art competition</p>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 mb-6 border border-green-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700 mb-1">₹249</div>
                    <div className="text-sm font-medium text-green-600">Competition Entry Fee</div>
                    <div className="text-xs text-green-500 mt-1">✨ Instant Access • Secure Payment</div>
                  </div>
                </div>

                <Button
                  onClick={handleCashfreeCheckout}
                  disabled={isProcessingCheckout}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  {isProcessingCheckout ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-3 h-5 w-5" />
                      Pay & Submit Your Artwork
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Step 2: Artwork Submission */}
        {activeTab === 'submit' && (
          <Card className="mb-4 shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4">
              {userData?.paymentStatus !== 'success' ? (
                <>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">🌟 Unlock Your Potential</h3>
                    <p className="text-gray-600 text-sm">Complete payment to showcase your artistic brilliance</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">₹249</div>
                      <div className="text-xs text-green-700">Entry Fee Required</div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCashfreeCheckout}
                    disabled={isProcessingCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {isProcessingCheckout ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-3 h-5 w-5" />
                        Pay & Submit Your Artwork
                      </>
                    )}
                  </Button>
                </>
              ) : userData?.hasSubmittedArtwork ? (
                <>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🏆 Artwork Submitted!</h3>
                    <p className="text-gray-600 mb-4 text-sm">Your first masterpiece is in the competition!</p>
                  </div>

                  {userData?.artworkDisplayUrl && (
                    <div className="mb-4">
                      <div className="bg-white rounded-xl p-3 border border-green-200">
                        <img
                          src={userData.artworkDisplayUrl}
                          alt="Submitted Artwork"
                          className="w-full max-w-xs mx-auto rounded-lg shadow-sm"
                          style={{maxHeight: '200px', objectFit: 'contain'}}
                        />
                      </div>
                    </div>
                  )}

                  {!userData?.hasSubmittedArtwork2 ? (
                    <div className="mt-6 border-t pt-6">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 mb-2">🎉 Festival Week Offer! 🎉</h3>
                        <p className="text-gray-600 text-sm">Submit a second artwork for FREE and double your chances of winning!</p>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center mb-4 hover:border-purple-400 transition-colors">
                        <input type="file" accept="image/*" onChange={handleFileSelect2} className="hidden" id="artwork-upload-festival" />
                        <label htmlFor="artwork-upload-festival" className="cursor-pointer">
                          {previewUrl2 ? (
                            <div className="space-y-3">
                              <img src={previewUrl2} alt="Preview 2" className="w-24 h-24 object-cover rounded-xl mx-auto" />
                              <p className="text-sm text-gray-600">Second Artwork (Click to change)</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                              <div>
                                <p className="text-base font-medium text-gray-700">Upload Second Artwork</p>
                                <p className="text-sm text-gray-500">Don't miss this chance!</p>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>

                      <Button
                        onClick={handleArtworkSubmission2}
                        disabled={isSubmittingArtwork2 || !selectedFile2}
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 h-11 font-medium rounded-xl text-white"
                      >
                        {isSubmittingArtwork2 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        Submit 2nd Artwork (Festival Offer)
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-bold text-green-600 mb-2">🚀 Both Artworks Submitted!</h3>
                      <p className="text-gray-600 text-sm">You've made the most of the Festival Week Offer. Best of luck!</p>
                      {userData?.artworkDisplayUrl2 && (
                        <div className="mt-4">
                          <div className="bg-white rounded-xl p-3 border border-green-200">
                            <img
                              src={userData.artworkDisplayUrl2}
                              alt="Submitted Artwork 2"
                              className="w-full max-w-xs mx-auto rounded-lg shadow-sm"
                              style={{maxHeight: '200px', objectFit: 'contain'}}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">🎭 Share Your Vision</h3>
                    <p className="text-gray-600 text-sm">Upload your masterpiece and inspire thousands</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Artwork 1 Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors">
                      <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="artwork-upload-1" />
                      <label htmlFor="artwork-upload-1" className="cursor-pointer">
                        {previewUrl ? (
                          <div className="space-y-3">
                            <img src={previewUrl} alt="Preview 1" className="w-24 h-24 object-cover rounded-xl mx-auto" />
                            <p className="text-sm text-gray-600">Artwork 1 (Click to change)</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-base font-medium text-gray-700">Upload Artwork 1</p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Artwork 2 Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors">
                      <input type="file" accept="image/*" onChange={handleFileSelect2} className="hidden" id="artwork-upload-2" />
                      <label htmlFor="artwork-upload-2" className="cursor-pointer">
                        {previewUrl2 ? (
                          <div className="space-y-3">
                            <img src={previewUrl2} alt="Preview 2" className="w-24 h-24 object-cover rounded-xl mx-auto" />
                            <p className="text-sm text-gray-600">Artwork 2 (Click to change)</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-base font-medium text-gray-700">Upload Artwork 2 (Optional)</p>
                              <p className="text-sm text-gray-500">Festival Week Offer!</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleArtworkSubmission}
                    disabled={isSubmittingArtwork || !selectedFile}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-11 font-medium rounded-xl"
                  >
                    {isSubmittingArtwork ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    Submit Artwork
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dashboard Artwork Submission */}
        {activeTab === 'dashboard' && userData?.paymentStatus === 'success' && !userData?.hasSubmittedArtwork && (
          <Card className="mb-4 shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Submit Your Artwork</h3>
                <p className="text-gray-600 text-sm">Upload your masterpiece and join the competition</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Artwork 1 Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="artwork-upload-dashboard-1" />
                  <label htmlFor="artwork-upload-dashboard-1" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="space-y-3">
                        <img src={previewUrl} alt="Preview 1" className="w-24 h-24 object-cover rounded-xl mx-auto" />
                        <p className="text-sm text-gray-600">Artwork 1 (Click to change)</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-base font-medium text-gray-700">Upload Artwork 1</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Artwork 2 Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileSelect2} className="hidden" id="artwork-upload-dashboard-2" />
                  <label htmlFor="artwork-upload-dashboard-2" className="cursor-pointer">
                    {previewUrl2 ? (
                      <div className="space-y-3">
                        <img src={previewUrl2} alt="Preview 2" className="w-24 h-24 object-cover rounded-xl mx-auto" />
                        <p className="text-sm text-gray-600">Artwork 2 (Click to change)</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-base font-medium text-gray-700">Upload Artwork 2 (Optional)</p>
                          <p className="text-sm text-gray-500">Festival Week Offer!</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button
                onClick={handleArtworkSubmission}
                disabled={isSubmittingArtwork || !selectedFile}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-11 font-medium rounded-xl"
              >
                {isSubmittingArtwork ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Submit Artwork
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {activeTab === 'dashboard' && userData?.paymentStatus === 'success' && userData?.hasSubmittedArtwork && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              {/* Celebration Header */}
              <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <Trophy className="h-10 w-10 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">🏆 Masterpiece Submitted!</h3>
                  <p className="text-white/90 text-sm font-medium drop-shadow">Congratulations! You're now competing among India's finest artists</p>
                </div>
              </div>

              <div className="p-6">
                {/* Submitted Artwork Preview */}
                {userData?.artworkDisplayUrl && (
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">🎨 Your Creative Vision</h4>
                      <p className="text-sm text-gray-600">Now part of India's most prestigious art competition</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-inner border border-gray-100">
                        <img
                          src={userData.artworkDisplayUrl}
                          alt="Your Masterpiece 1"
                          className="w-full max-w-sm mx-auto rounded-xl shadow-lg border-2 border-white"
                          style={{maxHeight: '250px', objectFit: 'contain'}}
                        />
                      </div>
                      {userData.artworkDisplayUrl2 ? (
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-inner border border-gray-100">
                          <img
                            src={userData.artworkDisplayUrl2}
                            alt="Your Masterpiece 2"
                            className="w-full max-w-sm mx-auto rounded-xl shadow-lg border-2 border-white"
                            style={{maxHeight: '250px', objectFit: 'contain'}}
                          />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-inner border border-gray-100 flex flex-col justify-center">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 mb-2">🎉 Festival Week Offer! 🎉</h3>
                            <p className="text-gray-600 text-sm mb-4">Submit a second artwork for FREE!</p>
                            <Button onClick={() => setActiveTab('submit')} className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 h-11 font-medium rounded-xl text-white">
                              Submit 2nd Artwork
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Status Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 text-center border border-green-200">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-sm font-semibold text-green-800">Verified</div>
                    <div className="text-xs text-green-600">Submission Confirmed</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 text-center border border-blue-200">
                    <div className="text-2xl mb-1">🏅</div>
                    <div className="text-sm font-semibold text-blue-800">Competing</div>
                    <div className="text-xs text-blue-600">For National Recognition</div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border border-purple-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-800 mb-2">🌟 What's Next?</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 text-purple-700">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Expert jury evaluation in progress</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-purple-700">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Results announcement coming soon</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-purple-700">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Winners will be contacted directly</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="mt-4 text-center flex flex-col items-center gap-2">
                  <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-600">
                      Artwork 1: {safeFormatDate(userData?.submissionDate)}
                    </span>
                  </div>
                  {userData?.hasSubmittedArtwork2 && (
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-600">
                        Artwork 2: {safeFormatDate(userData?.submissionDate2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
      </div>
      
      {/* Instagram-style Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50">
        <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Home className={`h-5 w-5 ${activeTab === 'dashboard' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 ${
              activeTab === 'submit' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${
              activeTab === 'submit' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gray-100'
            }`}>
              <Plus className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">Submit</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 ${
              activeTab === 'profile' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <User className={`h-5 w-5 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onSubmit={handleWhatsAppSubmit}
        isLoading={isUpdatingWhatsApp}
      />
    </div>
  );
};

export default Dashboard;