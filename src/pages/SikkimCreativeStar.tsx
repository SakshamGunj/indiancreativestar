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
import { supabase } from "@/lib/supabase";
import { uploadToSupabase } from "@/lib/storage";
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
  const [currentUser, setCurrentUser] = useState<any | null>(null);
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
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSession = async (session: any) => {
    setCurrentUser(session?.user || null);
    setIsLoading(false);

    if (session?.user) {
      try {
        const { data: userData, error } = await supabase
          .from('participants')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (userData) {
          // Check if all required fields are filled
          const hasCompleteProfile = userData.name &&
            userData.phone &&
            userData.address;

          if (hasCompleteProfile) {
            setHasRegistered(true);
          } else {
            // Incomplete profile
            setupProfileCompletion(session.user, userData);
          }
        } else {
          // No profile found for user
          setupProfileCompletion(session.user, null);
        }
      } catch (error) {
        console.error("Error checking user registration:", error);
      }
    }
  };

  const setupProfileCompletion = (user: any, existingData: any) => {
    setGoogleUserData({
      uid: user.id,
      name: existingData?.name || user.user_metadata?.full_name || '',
      email: existingData?.email || user.email || '',
      phone: existingData?.phone || '',
      address: existingData?.address || '',
      profileImage: existingData?.profile_image || user.user_metadata?.avatar_url || '',
      authProvider: 'google' // Simplified Assumption for now
    });
    setShowGoogleProfileCompletion(true);
  };

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle registration
  const handleRegistration = async (data: RegistrationFormData) => {
    setIsRegistering(true);
    setIsUploading(true);

    try {
      // 1. Sign Up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user created");

      // 2. Upload Image
      let imageUrl = '';
      if (selectedImage) {
        imageUrl = await uploadToSupabase(selectedImage, 'avatars');
      }

      // 3. Create Profile in DB
      const { error: dbError } = await supabase
        .from('participants')
        .insert([{
          user_id: authData.user.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profile_image: imageUrl, // Mapping to snake_case column ideally
          status: 'registered',
          // device_id: await getDeviceId() // Omitted for brevity/privacy unless critical
        }]);

      if (dbError) throw dbError;

      // 4. Success State
      setHasRegistered(true);
      setIsUploading(false);
      setIsRegistering(false);
      setShowSuccessMessage(true);

      toast({
        title: "Registration Successful!",
        description: "Welcome to Sikkim Creative Star!",
      });

      setTimeout(() => setShowSuccessMessage(false), 3000);

    } catch (error: any) {
      setIsUploading(false);
      setIsRegistering(false);
      console.error(error);

      toast({
        title: "Registration Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin // Redirect back to this page
        }
      });

      if (error) throw error;

      // Note: This will redirect away, so subsequent code won't run immediately.
      // The useEffect will catch the session on return.

    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Google Sign-In Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsGoogleSigningIn(false);
    }
  };

  // Handle Google Profile Completion
  const handleGoogleProfileCompletion = async (data: { name: string; phone: string; address: string }) => {
    if (!googleUserData) return;

    // Validate
    if (!data.name.trim() || !data.phone.trim() || !data.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload image if selected
      let profileImageUrl = googleUserData.profileImage;
      if (selectedImage) {
        toast({ title: "Uploading photo..." });
        profileImageUrl = await uploadToSupabase(selectedImage, 'avatars');
      }

      // Upsert profile
      const { error } = await supabase
        .from('participants')
        .upsert({
          user_id: googleUserData.uid,
          name: data.name.trim(),
          email: googleUserData.email,
          phone: data.phone.trim(),
          address: data.address.trim(),
          profile_image: profileImageUrl,
          status: 'registered'
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setHasRegistered(true);
      setShowGoogleProfileCompletion(false);
      setGoogleUserData(null);
      setShowSuccessMessage(true);

      toast({
        title: "Profile Completed!",
        description: "Welcome!",
      });

      setTimeout(() => setShowSuccessMessage(false), 3000);

    } catch (error: any) {
      console.error("Profile completion error:", error);
      toast({
        title: "Profile Completion Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Handle login
  const handleLogin = async (data: LoginFormData) => {
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });

    } catch (error: any) {
      setIsLoggingIn(false);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials.",
        variant: "destructive",
      });
    }
  };

  // Device ID function - kept as is if needed or removed.
  // ... (getDeviceId implementation could remain if strictly needed, but suppressing for brevity in this refactor unless critical)


  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-creative-purple mx-auto mb-4" />
          <p className="text-whnoite/70">Loading Indian Creative Star...</p>
        </div>
      </div>
    );
  }

  // Show Google Profile Completion Form
  if (showGoogleProfileCompletion && googleUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-2xl relative z-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-lg sm:text-2xl font-bold">✅</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
              Complete Your Profile
            </h1>

            <p className="text-white/80 text-sm sm:text-lg max-w-xl mx-auto px-2">
              {googleUserData?.authProvider === 'google'
                ? "Great! You've signed in with Google. To ensure a complete profile, please provide all required information below."
                : "Please complete your profile with all required information to access your dashboard."
              }
            </p>
          </div>

          {/* Profile Completion Form */}
          <Card className="bg-black/80 border-white/20 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 sm:border-4 border-white/20">
                  <AvatarImage src={googleUserData.profileImage} alt={googleUserData.name} />
                  <AvatarFallback className="text-lg sm:text-2xl bg-gradient-to-br from-creative-blue to-creative-purple">
                    {googleUserData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold text-base sm:text-lg">{googleUserData.name}</h3>
                  <p className="text-white/60 text-xs sm:text-sm">{googleUserData.email}</p>
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl text-white">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-white/60 text-sm">
                Fields marked with * are required. Profile image is optional. Please complete your profile to access your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              <Form {...googleProfileForm}>
                <form onSubmit={googleProfileForm.handleSubmit(handleGoogleProfileCompletion)} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm sm:text-base">Full Name *</Label>
                    <Input
                      {...googleProfileForm.register("name", {
                        required: true,
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                      placeholder="Enter your full name"
                      defaultValue={googleUserData.name}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-white text-sm sm:text-base">Profile Image (Optional)</Label>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-4 sm:p-6 text-center hover:border-creative-blue/50 transition-colors bg-gradient-to-br from-white/5 to-white/10">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="google-image-upload"
                      />
                      <label htmlFor="google-image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="space-y-2 sm:space-y-3">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto border-2 sm:border-4 border-white/20"
                            />
                            <p className="text-xs sm:text-sm text-white/60">Click to change image</p>
                          </div>
                        ) : googleUserData.profileImage ? (
                          <div className="space-y-2 sm:space-y-3">
                            <img
                              src={googleUserData.profileImage}
                              alt="Current"
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto border-2 sm:border-4 border-white/20"
                            />
                            <p className="text-xs sm:text-sm text-white/60">Click to upload new image</p>
                          </div>
                        ) : (
                          <div className="space-y-2 sm:space-y-3">
                            <Camera className="h-10 w-10 sm:h-12 sm:w-12 text-white/40 mx-auto" />
                            <p className="text-white/70 text-sm sm:text-base">Click to upload your photo (optional)</p>
                            <p className="text-xs text-white/50">Max 10MB • JPG, PNG, GIF</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm sm:text-base">Phone Number *</Label>
                    <Input
                      {...googleProfileForm.register("phone", {
                        required: true,
                        minLength: { value: 10, message: "Phone number must be at least 10 digits" }
                      })}
                      placeholder="Enter your phone number"
                      defaultValue={googleUserData.phone}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm sm:text-base">Complete Address *</Label>
                    <Textarea
                      {...googleProfileForm.register("address", {
                        required: true,
                        minLength: { value: 10, message: "Address must be at least 10 characters" }
                      })}
                      placeholder="Enter your complete address"
                      defaultValue={googleUserData.address}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full creative-btn h-10 sm:h-12 text-base sm:text-lg font-semibold"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Completing Profile...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        </div>

        <Card className="w-full max-w-lg bg-black/80 border-white/20 backdrop-blur-sm relative z-10 mx-2">
          <CardContent className="p-6 sm:p-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
              🎉 Registration Complete!
            </h2>
            <p className="text-white/80 mb-4 sm:mb-6 text-base sm:text-lg">
              Welcome to the Sikkim Creative Star family! Your creative journey begins now.
            </p>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>Account created successfully</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>Profile information completed</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>Admin will review your application</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>Certificate and ID card will appear here soon</span>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-creative-blue/20 to-creative-purple/20 rounded-xl border border-creative-blue/30">
              <p className="text-creative-blue font-semibold text-sm sm:text-base">
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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-creative-pink/20 to-creative-yellow/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
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


        </div>

        {/* Google Sign-In Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block p-4 sm:p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm max-w-full mx-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">Quick Start with Google</h3>
            <p className="text-white/70 mb-3 sm:mb-4 text-sm sm:text-base px-2">Sign in with Google and complete your profile to get your artist ID card</p>
            <Button
              onClick={handleGoogleSignIn}
              disabled={isGoogleSigningIn}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              {isGoogleSigningIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
              <p className="text-green-400 text-xs sm:text-sm font-medium">✨ No password required • Secure authentication • Profile completion required</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2">
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-creative-blue/20 to-transparent border border-creative-blue/30 backdrop-blur-sm hover:border-creative-blue/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-creative-blue to-creative-indigo rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Artist ID Card & Certificate</h3>
            <p className="text-white/70 text-sm sm:text-base">Get your official artist ID card and participation certificate</p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-creative-purple/20 to-transparent border border-creative-purple/30 backdrop-blur-sm hover:border-creative-purple/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-creative-purple to-creative-pink rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Secure Upload</h3>
            <p className="text-white/70 text-sm sm:text-base">Upload your profile image securely with Cloudinary</p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-creative-pink/20 to-transparent border border-creative-pink/30 backdrop-blur-sm hover:border-creative-pink/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-creative-pink to-creative-orange rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Personal Dashboard</h3>
            <p className="text-white/70 text-sm sm:text-base">Track your progress and access certificates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
