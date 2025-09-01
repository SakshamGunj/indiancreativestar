import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowRight, 
  CheckCircle, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { UserDashboard } from "@/components/UserDashboard";

// Form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your complete address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export default function SikkimCreativeStar() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [showGoogleProfileCompletion, setShowGoogleProfileCompletion] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);
  const [isLoginMode, setIsLoginMode] = useState(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('sikkim-creative-star-mode');
    return savedMode === 'login';
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle mode toggle and save to localStorage
  const handleModeToggle = (mode: boolean) => {
    setIsLoginMode(mode);
    localStorage.setItem('sikkim-creative-star-mode', mode ? 'login' : 'signup');
  };

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    }
  });

  const googleProfileForm = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    }
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      
      if (user) {
        // Check if user has already registered with complete profile
        try {
          const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Check if all required fields are filled
            const hasCompleteProfile = userData.name && 
                                     userData.phone && 
                                     userData.address;
            
            if (hasCompleteProfile) {
              setHasRegistered(true);
            } else {
              // Incomplete profile - show completion form
              setGoogleUserData({
                uid: user.uid,
                name: userData.name || user.displayName || '',
                email: userData.email || user.email || '',
                phone: userData.phone || user.phoneNumber || '',
                address: userData.address || '',
                profileImage: userData.profileImage || user.photoURL || '',
                authProvider: userData.authProvider || 'email'
              });
              setShowGoogleProfileCompletion(true);
            }
          }
        } catch (error) {
          console.error("Error checking user registration:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  // Handle registration
  const handleRegistration = async (data: RegistrationFormData) => {
    // Image is optional, so no validation needed here

    setIsRegistering(true);
    setIsUploading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Upload image to Cloudinary if selected, otherwise use empty string
      let imageUrl = '';
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }

      // Save user details to Firestore
      await setDoc(doc(db, "participantdetailspersonal", userCredential.user.uid), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        profileImage: imageUrl,
        registrationDate: new Date(),
        status: 'registered',
        deviceId: await getDeviceId(), // Track device
      });

      setHasRegistered(true);
      setIsUploading(false);
      setIsRegistering(false);
      setShowSuccessMessage(true);

      toast({
        title: "Registration Successful!",
        description: "Welcome to Sikkim Creative Star! Your dashboard is now available.",
      });

      // Hide success message after 3 seconds and show dashboard
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

    } catch (error: any) {
      setIsUploading(false);
      setIsRegistering(false);
      
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      }

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user already exists in our database
      const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
      
      if (!userDoc.exists()) {
        // New Google user - ALWAYS show profile completion form to ensure all data is collected
        setGoogleUserData({
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          phone: user.phoneNumber || '',
          address: '',
          profileImage: user.photoURL || '',
          authProvider: 'google'
        });
        setShowGoogleProfileCompletion(true);
        setIsGoogleSigningIn(false);
        return;
      } else {
        // Existing user - check if profile is complete
        const existingData = userDoc.data();
        const hasCompleteProfile = existingData.name && 
                                 existingData.phone && 
                                 existingData.address;
        
        if (!hasCompleteProfile) {
          // Incomplete profile - show completion form
          setGoogleUserData({
            uid: user.uid,
            name: existingData.name || user.displayName || '',
            email: existingData.email || user.email || '',
            phone: existingData.phone || user.phoneNumber || '',
            address: existingData.address || '',
            profileImage: existingData.profileImage || user.photoURL || '',
            authProvider: 'google'
          });
          setShowGoogleProfileCompletion(true);
          setIsGoogleSigningIn(false);
          return;
        }
        
        // Complete profile - show dashboard
        setHasRegistered(true);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in with Google.",
        });
      }
      
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Google Sign-In Failed",
        description: "Please try again or use email registration.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  // Handle Google Profile Completion
  const handleGoogleProfileCompletion = async (data: { name: string; phone: string; address: string }) => {
    if (!googleUserData) return;
    
    // Validate all required fields
    if (!data.name.trim() || !data.phone.trim() || !data.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields: Name, Phone, and Address.",
        variant: "destructive",
      });
      return;
    }
    

    
    try {
      // Upload image if selected
      let imageUrl = googleUserData.profileImage;
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }
      
      // Update user profile with complete data
      await setDoc(doc(db, "participantdetailspersonal", googleUserData.uid), {
        name: data.name.trim(),
        email: googleUserData.email,
        phone: data.phone.trim(),
        address: data.address.trim(),
        profileImage: imageUrl,
        registrationDate: googleUserData.authProvider === 'google' ? new Date() : undefined,
        status: 'registered',
        deviceId: await getDeviceId(),
        authProvider: googleUserData.authProvider
      });
      
      setHasRegistered(true);
      setShowGoogleProfileCompletion(false);
      setGoogleUserData(null);
      
      toast({
        title: "Profile Completed!",
        description: "Welcome to Sikkim Creative Star!",
      });
      
    } catch (error: any) {
      console.error("Profile completion error:", error);
      toast({
        title: "Profile Completion Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle login
  const handleLogin = async (data: LoginFormData) => {
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to Sikkim Creative Star!",
      });

    } catch (error: any) {
      setIsLoggingIn(false);
      
      let errorMessage = "Login failed. Please check your credentials.";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Get device ID for tracking
  const getDeviceId = async (): Promise<string> => {
    // Simple device fingerprinting
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('device-fingerprint', 10, 10);
    const fingerprint = canvas.toDataURL();
    
    // Combine with user agent and screen info
    const deviceInfo = `${navigator.userAgent}-${screen.width}x${screen.height}-${fingerprint}`;
    
    // Simple hash
    let hash = 0;
    for (let i = 0; i < deviceInfo.length; i++) {
      const char = deviceInfo.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-creative-purple mx-auto mb-4" />
          <p className="text-white/70">Loading Sikkim Creative Star...</p>
        </div>
      </div>
    );
  }

  // Show Google Profile Completion Form
  if (showGoogleProfileCompletion && googleUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-8 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-creative-pink/20 to-creative-yellow/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-2xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl font-bold">✅</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Complete Your Profile
            </h1>
            
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {googleUserData?.authProvider === 'google' 
                ? "Great! You've signed in with Google. To ensure a complete profile, please provide all required information below."
                : "Please complete your profile with all required information to access your dashboard."
              }
            </p>
          </div>

          {/* Profile Completion Form */}
          <Card className="glassmorphism border-white/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border-4 border-white/20">
                  <AvatarImage src={googleUserData.profileImage} alt={googleUserData.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-creative-blue to-creative-purple">
                    {googleUserData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg">{googleUserData.name}</h3>
                  <p className="text-white/60 text-sm">{googleUserData.email}</p>
                </div>
              </div>
              <CardTitle className="text-xl text-white">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-white/60">
                Fields marked with * are required. Profile image is optional. Please complete your profile to access your dashboard.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...googleProfileForm}>
                <form onSubmit={googleProfileForm.handleSubmit(handleGoogleProfileCompletion)} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label className="text-white text-base">Full Name *</Label>
                    <Input 
                      {...googleProfileForm.register("name", { 
                        required: true,
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })} 
                      placeholder="Enter your full name"
                      defaultValue={googleUserData.name}
                      className="bg-white/5 border-white/20 text-white h-12 text-base"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-white text-base">Profile Image (Optional)</Label>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-creative-blue/50 transition-colors bg-gradient-to-br from-white/5 to-white/10">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="google-image-upload"
                      />
                      <label htmlFor="google-image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="space-y-3">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-white/20"
                            />
                            <p className="text-sm text-white/60">Click to change image</p>
                          </div>
                        ) : googleUserData.profileImage ? (
                          <div className="space-y-3">
                            <img 
                              src={googleUserData.profileImage} 
                              alt="Current" 
                              className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-white/20"
                            />
                            <p className="text-sm text-white/60">Click to upload new image</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Camera className="h-12 w-12 text-white/40 mx-auto" />
                            <p className="text-white/70">Click to upload your photo (optional)</p>
                            <p className="text-xs text-white/50">Max 10MB • JPG, PNG, GIF</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label className="text-white text-base">Phone Number *</Label>
                    <Input 
                      {...googleProfileForm.register("phone", { 
                        required: true,
                        minLength: { value: 10, message: "Phone number must be at least 10 digits" }
                      })} 
                      placeholder="Enter your phone number"
                      defaultValue={googleUserData.phone}
                      className="bg-white/5 border-white/20 text-white h-12 text-base"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label className="text-white text-base">Complete Address *</Label>
                    <Textarea 
                      {...googleProfileForm.register("address", { 
                        required: true,
                        minLength: { value: 10, message: "Address must be at least 10 characters" }
                      })} 
                      placeholder="Enter your complete address"
                      defaultValue={googleUserData.address}
                      className="bg-white/5 border-white/20 text-white min-h-[100px] text-base"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full creative-btn h-12 text-lg font-semibold" 
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Completing Profile...
                      </>
                    ) : (
                      <>
                        Complete Profile & Join SCS
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show success message after registration
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <Card className="w-full max-w-lg glassmorphism border-white/20 backdrop-blur-sm relative z-10">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              🎉 Registration Complete!
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Welcome to the Sikkim Creative Star family! Your creative journey begins now.
            </p>
            <div className="space-y-3 text-sm text-white/70 mb-6">
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Account created successfully</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Profile information completed</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Admin will review your application</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Certificate and ID card will appear here soon</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-creative-blue/20 to-creative-purple/20 rounded-xl border border-creative-blue/30">
              <p className="text-creative-blue font-semibold">
                🚀 Redirecting to your dashboard...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show dashboard if user is logged in and has registered with complete profile
  if (currentUser && hasRegistered && !showGoogleProfileCompletion) {
    return <UserDashboard user={currentUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-creative-pink/20 to-creative-yellow/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-full mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-creative-purple to-creative-pink rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">⭐</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-creative-purple via-creative-pink to-creative-blue bg-clip-text text-transparent">
            Congratulations! You are a Creative Star
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Daami Event Presents
          </h2>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sikkim Creative Star Season 1
          </h3>
          
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Join the most prestigious creative competition in Sikkim and showcase your artistic brilliance to the world
          </p>
        </div>

        {/* Google Sign-In Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Quick Start with Google</h3>
            <p className="text-white/70 mb-4 text-base">Sign in with Google and complete your profile to join SCS</p>
            <Button 
              onClick={handleGoogleSignIn}
              disabled={isGoogleSigningIn}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isGoogleSigningIn ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
              <p className="text-green-400 text-sm font-medium">✨ No password required • Secure authentication • Profile completion required</p>
            </div>
          </div>
        </div>

        {/* Toggle System for Sign Up and Login */}
        <div className="max-w-md mx-auto">
          {/* Toggle Buttons */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-6 backdrop-blur-sm">
            <button
              onClick={() => handleModeToggle(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isLoginMode 
                  ? 'bg-gradient-to-r from-creative-blue to-creative-purple text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => handleModeToggle(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isLoginMode 
                  ? 'bg-gradient-to-r from-creative-purple to-creative-blue text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form Container */}
          <Card className="glassmorphism border-white/20 backdrop-blur-sm">
            {!isLoginMode ? (
              /* Registration Form */
              <>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-creative-blue" />
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Join Sikkim Creative Star and start your creative journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registrationForm}>
                    <form onSubmit={registrationForm.handleSubmit(handleRegistration)} className="space-y-4">
                      {/* Image Upload */}
                      <div className="space-y-2">
                        <Label className="text-white">Profile Image (Optional)</Label>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-creative-blue/50 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            {imagePreview ? (
                              <div className="space-y-2">
                                <img 
                                  src={imagePreview} 
                                  alt="Preview" 
                                  className="w-24 h-24 object-cover rounded-full mx-auto"
                                />
                                <p className="text-sm text-white/60">Click to change image</p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Camera className="h-12 w-12 text-white/40 mx-auto" />
                                <p className="text-white/70">Click to upload your photo (optional)</p>
                                <p className="text-xs text-white/50">Max 10MB • JPG, PNG, GIF</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Name */}
                      <FormField
                        control={registrationForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter your full name"
                                className="bg-white/5 border-white/20 text-white h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={registrationForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/20 text-white h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone */}
                      <FormField
                        control={registrationForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="tel"
                                placeholder="Enter your phone number"
                                className="bg-white/5 border-white/20 text-white h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Address */}
                      <FormField
                        control={registrationForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Address *</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Enter your complete address"
                                className="bg-white/5 border-white/20 text-white min-h-[80px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        control={registrationForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Password *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  {...field} 
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a password"
                                  className="bg-white/5 border-white/20 text-white pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Confirm Password */}
                      <FormField
                        control={registrationForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Confirm Password *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  {...field} 
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="Confirm your password"
                                  className="bg-white/5 border-white/20 text-white pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                                >
                                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full creative-btn h-12 text-lg font-semibold" 
                        disabled={isRegistering || isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Uploading Image...
                          </>
                        ) : isRegistering ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </>
            ) : (
              /* Login Form */
              <>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Mail className="h-5 w-5 text-creative-purple" />
                    Sign In
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Welcome back! Sign in to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/20 text-white h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Password *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  {...field} 
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter your password"
                                  className="bg-white/5 border-white/20 text-white pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-creative-purple to-creative-blue h-12 text-lg font-semibold" 
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </>
            )}
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-creative-blue/20 to-transparent border border-creative-blue/30 backdrop-blur-sm hover:border-creative-blue/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-creative-blue to-creative-indigo rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Free Registration</h3>
            <p className="text-white/70 text-base">Join our prestigious creative community at absolutely no cost</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-creative-purple/20 to-transparent border border-creative-purple/30 backdrop-blur-sm hover:border-creative-purple/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-creative-purple to-creative-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Secure Upload</h3>
            <p className="text-white/70 text-base">Upload your profile image securely with Cloudinary</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-creative-pink/20 to-transparent border border-creative-pink/30 backdrop-blur-sm hover:border-creative-pink/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-creative-pink to-creative-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Personal Dashboard</h3>
            <p className="text-white/70 text-base">Track your progress and access certificates</p>
          </div>
        </div>
      </div>
    </div>
  );
}