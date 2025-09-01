import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CheckCircle, Upload, User, Mail, Phone, MapPin, Camera, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function SikkimCreativeStar() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
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

  // Check if user already has an account
  useEffect(() => {
    const checkExistingAccount = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "participantdetailspersonal", user.uid));
        if (userDoc.exists()) {
          toast({
            title: "Account Already Exists",
            description: "You already have a Sikkim Creative Star account.",
            variant: "destructive",
          });
          navigate("/");
        }
      }
    };
    checkExistingAccount();
  }, [navigate, toast]);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image under 10MB.",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid image file.",
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



  // Handle form submission
  const handleSubmit = async (values: RegistrationFormData) => {
    if (!selectedImage) {
      toast({
        title: "Image Required",
        description: "Please upload your profile image.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload image to Cloudinary
      setUploadProgress(25);
      const imageUrl = await uploadToCloudinary(selectedImage);
      setUploadProgress(50);

      // Create Firebase user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: values.name,
        photoURL: imageUrl
      });

      setUploadProgress(75);

      // Save additional details to Firestore
      await setDoc(doc(db, "participantdetailspersonal", userCredential.user.uid), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        profileImage: imageUrl,
        registrationDate: new Date(),
        status: 'active',
        userId: userCredential.user.uid
      });

      setUploadProgress(100);
      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Account Created Successfully!",
        description: "Welcome to Sikkim Creative Star!",
      });

      // Show success message and redirect
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/");
      }, 3000);

    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Registration error:", error);
      
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e]">
      <Header onRegistrationClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-creative-blue to-creative-purple bg-clip-text text-transparent mb-4">
              Sikkim Creative Star
            </h1>
            <p className="text-xl text-white/80 mb-6">
              Join the creative community and showcase your talent
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>National Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Certificate & ID Card</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="glassmorphism border-white/10 p-6 md:p-8 rounded-2xl">
            {!isSuccess ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Profile Image</Label>
                    <div className="flex flex-col items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imagePreview ? (
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-20 h-20 rounded-full object-cover mb-2"
                            />
                          ) : (
                            <Camera className="w-8 h-8 mb-2 text-white/60" />
                          )}
                          <p className="mb-2 text-sm text-white/60">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-white/40">PNG, JPG, JPEG up to 10MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Full Name
                              </Label>
                              <Input
                                {...field}
                                placeholder="Enter your full name"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                              </Label>
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                              </Label>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="Enter your phone number"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="address" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Complete Address
                              </Label>
                              <Input
                                {...field}
                                placeholder="Enter your complete address"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                {...field}
                                type="password"
                                placeholder="Create a password"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm Password</Label>
                              <Input
                                {...field}
                                type="password"
                                placeholder="Confirm your password"
                                className="bg-white/5 border-white/10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Progress Bar */}
                  {isSubmitting && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-white/60">
                        <span>Creating your account...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-creative-blue to-creative-purple h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full creative-btn py-3 h-14 text-lg font-medium" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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

                  {/* Terms and Conditions */}
                  <p className="text-xs text-white/40 text-center">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </Form>
            ) : (
              /* Success Message */
              <div className="text-center py-12 space-y-6">
                <div className="relative">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold text-white">Welcome to Sikkim Creative Star!</h3>
                <p className="text-white/80 max-w-md mx-auto">
                  Your account has been created successfully. Admin is reviewing your request. 
                  Your certificate and ID card will appear here soon.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Account Created</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Under Review</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <button 
                className="text-creative-blue hover:text-creative-purple transition-colors"
                onClick={() => navigate("/login")}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer onRegisterClick={() => {}} />
    </div>
  );
}