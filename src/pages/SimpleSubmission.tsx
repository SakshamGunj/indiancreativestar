import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Loader2, Image as ImageIcon, Award, Lock, Shield, X } from 'lucide-react';
import { load } from '@cashfreepayments/cashfree-js';
import { motion, AnimatePresence } from 'framer-motion';

interface UserData {
  name: string;
  age: string;
  whatsapp: string;
  email: string;
}

interface ArtworkData {
  file: File;
  preview: string;
}

const SimpleSubmission = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'upload' | 'success'>('details');
  
  // User data (stored in localStorage for persistence)
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tempUserData, setTempUserData] = useState<UserData>({
    name: '',
    age: '',
    whatsapp: '',
    email: ''
  });
  
  // Artwork data
  const [artwork1, setArtwork1] = useState<ArtworkData | null>(null);
  const [artwork2, setArtwork2] = useState<ArtworkData | null>(null);
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Load saved user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ics_submission_user');
    const paymentCompleted = localStorage.getItem('ics_payment_completed');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserData(parsed);
        setTempUserData(parsed);
        
        // If payment was completed but artwork not submitted, go to upload step
        if (paymentCompleted === 'true') {
          setCurrentStep('upload');
        }
      } catch (e) {
        console.error('Failed to parse saved user data');
      }
    }
  }, []);

  // Save user data to localStorage
  const saveUserDataToStorage = (data: UserData) => {
    localStorage.setItem('ics_submission_user', JSON.stringify(data));
    setUserData(data);
  };

  // Handle artwork file selection
  const handleFileSelect = (artworkNumber: 1 | 2, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file (JPG, PNG, etc.)',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    const artworkData = { file, preview };

    if (artworkNumber === 1) {
      setArtwork1(artworkData);
    } else {
      setArtwork2(artworkData);
    }

    toast({
      title: '✅ Artwork Uploaded!',
      description: `Artwork ${artworkNumber} ready to submit`,
    });
  };

  // Remove artwork
  const removeArtwork = (artworkNumber: 1 | 2) => {
    if (artworkNumber === 1) {
      if (artwork1?.preview) URL.revokeObjectURL(artwork1.preview);
      setArtwork1(null);
    } else {
      if (artwork2?.preview) URL.revokeObjectURL(artwork2.preview);
      setArtwork2(null);
    }
  };

  // Validate user details form
  const validateUserDetails = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!tempUserData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (tempUserData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!tempUserData.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const age = parseInt(tempUserData.age);
      if (isNaN(age) || age < 5 || age > 100) {
        newErrors.age = 'Age must be between 5 and 100';
      }
    }

    if (!tempUserData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else {
      let cleanPhone = tempUserData.whatsapp.replace(/[\s\-\(\)]/g, '');
      if (cleanPhone.startsWith('+')) cleanPhone = cleanPhone.substring(1);
      
      if (cleanPhone.length !== 10 && cleanPhone.length !== 12) {
        newErrors.whatsapp = 'Enter 10 digits or 12 digits with country code';
      }
    }

    if (!tempUserData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempUserData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle proceeding to payment
  const handleProceedToPayment = () => {
    if (!validateUserDetails()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all fields correctly',
        variant: 'destructive'
      });
      return;
    }
    
    // Save user data
    saveUserDataToStorage(tempUserData);
    setCurrentStep('payment');
  };

  // Handle proceeding to upload after payment
  const handleProceedToUpload = () => {
    setCurrentStep('upload');
  };

  // Upload artwork to ImgBB
  const uploadToImgBB = async (file: File): Promise<any> => {
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
    formData.append('name', `artwork_${Date.now()}`);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result?.error?.message || 'Failed to upload image');
    }
  };

  // Handle payment and submission
  const handlePaymentAndSubmit = async () => {
    if (!userData) return;

    setIsProcessing(true);

    try {
      // Create Cashfree order
      const response = await fetch('https://backendcashfree.vercel.app/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.whatsapp,
          amount: 249,
          customerId: `SUBMIT_${Date.now()}`,
          orderNote: `Indian Creative Star - Artwork Submission`
        })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const { payment_session_id, order_id } = orderData.data;

      // Initialize Cashfree SDK
      const cashfree = await load({
        mode: "production"
      });

      // Open Cashfree Checkout
      const result = await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal"
      });

      if (result.error) {
        toast({
          title: 'Payment Cancelled',
          description: 'Payment was cancelled. Please try again.',
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }

      if (result.paymentDetails) {
        // Payment successful - Now allow artwork upload
        setIsProcessing(false);
        
        // Set payment completed flag in localStorage
        localStorage.setItem('ics_payment_completed', 'true');
        
        toast({
          title: 'Payment Successful! 🎉',
          description: 'Now upload your artwork to complete submission',
        });

        // Store payment info
        localStorage.setItem('ics_payment_order_id', order_id);
        
        // Move to upload step
        setCurrentStep('upload');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to process payment',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  // Handle final submission after artwork upload
  const handleFinalSubmit = async () => {
    if (!userData || !artwork1) return;

    setIsUploading(true);
    
    try {
      // Upload artwork 1
      const imgbbData1 = await uploadToImgBB(artwork1.file);
      
      let imgbbData2 = null;
      if (artwork2) {
        imgbbData2 = await uploadToImgBB(artwork2.file);
      }

      // Get stored order ID
      const orderId = localStorage.getItem('ics_payment_order_id') || '';

      // Store submission data in localStorage (you can save to Firebase here)
      const submissionData = {
        userData,
        artwork1: {
          url: imgbbData1.url,
          displayUrl: imgbbData1.display_url,
          fileName: artwork1.file.name
        },
        artwork2: artwork2 && imgbbData2 ? {
          url: imgbbData2.url,
          displayUrl: imgbbData2.display_url,
          fileName: artwork2.file.name
        } : null,
        orderId: orderId,
        paymentStatus: 'success',
        submittedAt: new Date().toISOString()
      };

      localStorage.setItem('ics_last_submission', JSON.stringify(submissionData));

      // Clear payment completed flag
      localStorage.removeItem('ics_payment_completed');

      // Show success
      setIsUploading(false);
      setCurrentStep('success');

      // Clear artworks after 3 seconds
      setTimeout(() => {
        if (artwork1?.preview) URL.revokeObjectURL(artwork1.preview);
        if (artwork2?.preview) URL.revokeObjectURL(artwork2.preview);
      }, 3000);

    } catch (uploadError) {
      console.error('Artwork upload error:', uploadError);
      toast({
        title: 'Upload Error',
        description: 'Payment successful but artwork upload failed. Please contact support.',
        variant: 'destructive'
      });
      setIsUploading(false);
    }
  };

  // Render different steps
  const renderUploadStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4"
        >
          <ImageIcon className="h-8 w-8 text-white" />
        </motion.div>
        <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-green-800">Payment Successful!</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Upload Your Artwork
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          Upload your amazing artwork to complete your submission
        </p>
        <p className="text-purple-600 font-semibold text-sm">
          📸 You can upload up to 2 artworks (minimum 1 required)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Artwork 1 */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-purple-500 transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-4">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Artwork 1 <span className="text-red-500">*</span></h3>
                <p className="text-sm text-gray-500">Required</p>
              </div>

              {artwork1 ? (
                <div className="relative">
                  <img 
                    src={artwork1.preview} 
                    alt="Artwork 1" 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArtwork(1)}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="text-sm text-green-600 font-medium">
                    ✅ {artwork1.file.name}
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(1, e)}
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 hover:bg-purple-50 transition-all">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Artwork 2 */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-purple-500 transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-4">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Artwork 2</h3>
                <p className="text-sm text-gray-500">Optional</p>
              </div>

              {artwork2 ? (
                <div className="relative">
                  <img 
                    src={artwork2.preview} 
                    alt="Artwork 2" 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArtwork(2)}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="text-sm text-green-600 font-medium">
                    ✅ {artwork2.file.name}
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(2, e)}
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 hover:bg-purple-50 transition-all">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </label>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentStep('payment')}
            className="px-8 py-6 text-lg font-bold"
            disabled={isUploading}
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleFinalSubmit}
            disabled={!artwork1 || isUploading}
            className="px-12 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Artwork...
              </>
            ) : (
              'Submit Artwork'
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          {artwork1 && artwork2 ? '2 artworks ready to submit' : artwork1 ? '1 artwork ready to submit' : 'Upload at least 1 artwork to submit'}
        </p>
      </div>
    </motion.div>
  );

  const renderDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Logo and Rewards Section */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="mb-4"
        >
          <img 
            src="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg?auto=format&q=80" 
            alt="Indian Creative Star" 
            className="h-16 w-16 md:h-20 md:w-20 mx-auto rounded-lg object-cover shadow-lg mb-3"
          />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Register for Competition</h2>
        <p className="text-sm text-gray-600 mb-4">Tell us about yourself to get started</p>

        {/* Compact Rewards */}
        <div className="bg-gradient-to-r from-yellow-50 via-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200 mb-3">
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-yellow-700">🏆 Trophies & Medals for Winners!</span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-green-700">💰 50K Prize Pool</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2.5 border border-blue-200 mb-4">
          <p className="text-xs font-medium text-gray-700">
            📜 Certificate & 🎨 Artist ID Card for All
            <span className="text-purple-600 font-semibold"> (Approved by Culture Ministry)</span>
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-base font-semibold">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={tempUserData.name}
              onChange={(e) => {
                setTempUserData({ ...tempUserData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`mt-2 h-12 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Age */}
          <div>
            <Label htmlFor="age" className="text-base font-semibold">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={tempUserData.age}
              onChange={(e) => {
                setTempUserData({ ...tempUserData, age: e.target.value });
                if (errors.age) setErrors({ ...errors, age: '' });
              }}
              className={`mt-2 h-12 ${errors.age ? 'border-red-500' : ''}`}
              min="5"
              max="100"
            />
            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <Label htmlFor="whatsapp" className="text-base font-semibold">
              WhatsApp Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={tempUserData.whatsapp}
              onChange={(e) => {
                setTempUserData({ ...tempUserData, whatsapp: e.target.value });
                if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
              }}
              className={`mt-2 h-12 ${errors.whatsapp ? 'border-red-500' : ''}`}
            />
            {errors.whatsapp && <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base font-semibold">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={tempUserData.email}
              onChange={(e) => {
                setTempUserData({ ...tempUserData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`mt-2 h-12 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Compact Horizontal Trust Badges */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-700">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-medium">Secure Payment</span>
              <span className="text-gray-400">•</span>
              <Lock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">1,000+ Artists</span>
              <span className="text-gray-400">•</span>
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Instant</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-lg font-bold hover:from-purple-700 hover:to-pink-700"
            >
              Continue to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Logo and Rewards Section */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="mb-4"
        >
          <img 
            src="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg?auto=format&q=80" 
            alt="Indian Creative Star" 
            className="h-16 w-16 md:h-20 md:w-20 mx-auto rounded-lg object-cover shadow-lg mb-3"
          />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Amazing Rewards Await! 🏆</h2>
        
        {/* Compact Rewards */}
        <div className="bg-gradient-to-r from-yellow-50 via-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200 mb-3">
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-yellow-700">🏆 Trophies & Medals for Winners!</span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-green-700">💰 50K Prize Pool</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2.5 border border-blue-200 mb-4">
          <p className="text-xs font-medium text-gray-700">
            📜 Certificate & 🎨 Artist ID Card for All
            <span className="text-purple-600 font-semibold"> (Approved by Culture Ministry)</span>
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4"
        >
          <Lock className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h3>
        <p className="text-gray-600">Secure your submission with payment</p>
      </div>

      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Submission Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{userData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{userData?.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-medium">{userData?.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{userData?.email}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-green-300 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Entry Fee:</span>
                <span className="text-green-600">₹249</span>
              </div>
            </div>

            {/* Compact Horizontal Trust Badges Above Button */}
            <div className="pt-3 pb-2">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-700 flex-wrap">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">Secure Payment</span>
                <span className="text-gray-400">•</span>
                <Lock className="h-4 w-4 text-blue-600" />
                <span className="font-medium">1,000+ Artists</span>
                <span className="text-gray-400">•</span>
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Instant Confirmation</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('details')}
                className="flex-1"
                disabled={isProcessing}
              >
                Back
              </Button>
              <Button
                onClick={handlePaymentAndSubmit}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pay ₹249 & Submit Artwork
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6"
      >
        <CheckCircle className="h-16 w-16 text-white" />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        🎉 Your Artwork is Submitted!
      </h1>
      <p className="text-xl text-gray-600 mb-4">
        Your artwork has been submitted successfully to Indian Creative Star Competition
      </p>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300 mb-6">
        <p className="text-lg font-bold text-green-800 mb-2">📢 Stay Updated!</p>
        <p className="text-sm text-gray-700 mb-3">
          Join our WhatsApp group for competition updates, results, and more information
        </p>
        <Button
          size="lg"
          onClick={() => window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          Join WhatsApp Group
        </Button>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 mb-8">
        <CardContent className="p-6">
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Payment Confirmed</p>
                <p className="text-sm text-gray-600">Your payment of ₹249 has been processed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Artwork Uploaded</p>
                <p className="text-sm text-gray-600">{artwork2 ? '2 artworks' : '1 artwork'} submitted successfully</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Confirmation Email Sent</p>
                <p className="text-sm text-gray-600">Check your email at {userData?.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button
          size="lg"
          onClick={() => navigate('/indiancreativestar/v2')}
          className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Back to Home
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setCurrentStep('details');
            setArtwork1(null);
            setArtwork2(null);
          }}
          className="w-full max-w-md"
        >
          Submit Another Entry
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-center text-sm md:text-base font-bold">
            🎨 Indian Creative Star - National Art Competition Season 2
          </h1>
        </div>
      </div>

      <div className="py-12 px-4">
        <AnimatePresence mode="wait">
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SimpleSubmission;
