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
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
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
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
        // Check if user has already registered
        const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
        setHasRegistered(userDoc.exists());
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
    if (!selectedImage) {
      toast({
        title: "Image required",
        description: "Please upload your profile image",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);
    setIsUploading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedImage);

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

  // Show success message after registration
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center p-4">
        <Card className="w-full max-w-md glassmorphism border-white/10">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-white">Registration Complete!</h2>
            <p className="text-white/70 mb-6">
              Thank you for registering with Sikkim Creative Star! Your account has been created successfully.
            </p>
            <div className="space-y-3 text-sm text-white/60">
              <p>✅ Account created successfully</p>
              <p>✅ Profile image uploaded</p>
              <p>✅ Admin will review your application</p>
              <p>✅ Certificate and ID card will appear here soon</p>
            </div>
            <p className="text-creative-blue text-sm mt-4">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show dashboard if user is logged in and has registered
  if (currentUser && hasRegistered) {
    return <UserDashboard user={currentUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sikkim Creative Star
          </h1>
          <p className="text-white/70 text-lg">
            Join the creative community and showcase your talent
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card className="glassmorphism border-white/10">
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
                    <Label className="text-white">Profile Image *</Label>
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
                            <p className="text-white/70">Click to upload your photo</p>
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
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter your full name"
                            className="bg-white/5 border-white/10 text-white"
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
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/5 border-white/10 text-white"
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
                        <FormLabel className="text-white">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel"
                            placeholder="Enter your phone number"
                            className="bg-white/5 border-white/10 text-white"
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
                        <FormLabel className="text-white">Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter your complete address"
                            className="bg-white/5 border-white/10 text-white min-h-[80px]"
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
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              className="bg-white/5 border-white/10 text-white pr-10"
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
                        <FormLabel className="text-white">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="bg-white/5 border-white/10 text-white pr-10"
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
                    className="w-full creative-btn" 
                    disabled={isRegistering || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading Image...
                      </>
                    ) : isRegistering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card className="glassmorphism border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-creative-purple" />
                Sign In
              </CardTitle>
              <CardDescription className="text-white/60">
                Already have an account? Sign in here
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
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/5 border-white/10 text-white"
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
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="bg-white/5 border-white/10 text-white pr-10"
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
                    className="w-full bg-gradient-to-r from-creative-purple to-creative-blue" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-creative-blue/10 to-transparent border border-creative-blue/20">
            <CheckCircle className="h-8 w-8 text-creative-blue mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Free Registration</h3>
            <p className="text-white/60 text-sm">Join our creative community at no cost</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-creative-purple/10 to-transparent border border-creative-purple/20">
            <Upload className="h-8 w-8 text-creative-purple mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Easy Upload</h3>
            <p className="text-white/60 text-sm">Upload your profile image securely</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-creative-pink/10 to-transparent border border-creative-pink/20">
            <User className="h-8 w-8 text-creative-pink mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Personal Dashboard</h3>
            <p className="text-white/60 text-sm">Track your progress and certificates</p>
          </div>
        </div>
      </div>
    </div>
  );
}