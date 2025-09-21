import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, User } from 'lucide-react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

const ArtworkSubmission = () => {
  const [searchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Payment states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      
      if (user) {
        // Auto-fill form with user data
        setName(user.displayName || '');
        setEmail(user.email || '');
        
        // Check if user has phone number in database
        try {
          const userDoc = await getDoc(doc(db, 'indiancreativestar_accounts', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setWhatsapp(userData.whatsapp || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      setPaymentStatus('success');
    } else if (payment === 'failed') {
      setPaymentStatus('failed');
    }
  }, [searchParams]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save user to indiancreativestar_accounts collection
      await setDoc(doc(db, 'indiancreativestar_accounts', user.uid), {
        name: user.displayName || '',
        email: user.email || '',
        whatsapp: '',
        authProvider: 'google',
        createdAt: new Date(),
        lastLogin: new Date()
      }, { merge: true });
      
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
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
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

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    setIsAuthenticating(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user to indiancreativestar_accounts collection
      await setDoc(doc(db, 'indiancreativestar_accounts', userCredential.user.uid), {
        name: name,
        email: email,
        whatsapp: whatsapp,
        authProvider: 'email',
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      }
      alert(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePayment = async () => {
    // Validate form fields first
    if (!name || !email || !whatsapp) {
      alert('Please fill in all required fields before proceeding to payment.');
      return;
    }

    // Update user data in database
    if (currentUser) {
      try {
        await setDoc(doc(db, 'indiancreativestar_accounts', currentUser.uid), {
          name: name,
          email: email,
          whatsapp: whatsapp,
          lastLogin: new Date()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }

    setIsProcessingPayment(true);

    try {
      const response = await fetch('http://localhost:3001/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          mobileNumber: whatsapp,
          email: email
        })
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.paymentUrl;
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentStatus !== 'success') {
      setShowPayment(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Artwork submitted successfully! Thank you for participating in Indian Creative Star.');
      
      // Reset payment status only
      setPaymentStatus(null);
      setShowPayment(false);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit artwork. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-creative-yellow mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-creative-yellow">Indian Creative Star</h1>
        <h2 className="text-2xl font-semibold text-center mb-12">Artwork Submission</h2>

        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
          {!currentUser ? (
            <>
              <h3 className="text-xl font-semibold mb-6 text-center text-creative-yellow">Login to Submit Artwork</h3>
              
              {/* Google Sign-In */}
              <div className="mb-6">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleSigningIn}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold mb-4"
                >
                  {isGoogleSigningIn ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</>
                  ) : (
                    <>🔍 Continue with Google</>
                  )}
                </Button>
                
                <div className="text-center text-gray-400 mb-4">or</div>
              </div>

              {/* Toggle Login/Register */}
              <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    isLoginMode ? 'bg-creative-yellow text-gray-900' : 'text-gray-300'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    !isLoginMode ? 'bg-creative-yellow text-gray-900' : 'text-gray-300'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Login Form */}
              {isLoginMode ? (
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="password" className="block text-sm font-medium mb-2">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full bg-creative-yellow text-gray-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300"
                  >
                    {isAuthenticating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</> : 'Login'}
                  </Button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <Label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="whatsapp" className="block text-sm font-medium mb-2">WhatsApp Number</Label>
                    <Input
                      type="tel"
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                      placeholder="9800xxxxxx"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="password" className="block text-sm font-medium mb-2">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                        placeholder="Enter password (min 6 chars)"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full bg-creative-yellow text-gray-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300"
                  >
                    {isAuthenticating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</> : 'Create Account'}
                  </Button>
                </form>
              )}
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-6 text-center text-creative-yellow">Submit Your Artwork</h3>
              
              {/* User Info Display */}
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <User className="h-5 w-5 text-creative-yellow" />
                  <span className="text-white font-medium">Logged in as: {currentUser.displayName || currentUser.email}</span>
                </div>
                <button
                  onClick={() => auth.signOut()}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </div>

              {/* Payment Status Messages */}
              {paymentStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600 rounded-lg text-center">
                  <p className="text-white font-semibold">✅ Payment Successful!</p>
                  <p className="text-green-100 text-sm">You can now submit your artwork.</p>
                </div>
              )}
              
              {paymentStatus === 'failed' && (
                <div className="mb-6 p-4 bg-red-600 rounded-lg text-center">
                  <p className="text-white font-semibold">❌ Payment Failed!</p>
                  <p className="text-red-100 text-sm">Please try the payment again.</p>
                </div>
              )}
              
              {!paymentStatus && (
                <div className="mb-6 p-4 bg-yellow-600 rounded-lg text-center">
                  <p className="text-white font-semibold">💰 Payment Required</p>
                  <p className="text-yellow-100 text-sm">Pay ₹1 to submit your artwork and participate in the competition.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-creative-yellow"
                    placeholder="e.g. 9800xxxxxx"
                    required
                  />
                </div>

                {paymentStatus === 'success' ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : '✅ Submit Artwork'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessingPayment}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment ? 'Processing...' : '💳 Pay ₹1 & Submit'}
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkSubmission;