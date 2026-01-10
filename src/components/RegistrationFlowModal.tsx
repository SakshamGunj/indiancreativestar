
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle, Palette, CreditCard, Loader2, X, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { addParticipant, registerWinterArtUser } from "@/lib/firebase";
import { load } from "@cashfreepayments/cashfree-js";

interface RegistrationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestType?: "art";
  onPaymentInitiated?: (orderId: string, registrationData: any) => void;
}

export function RegistrationFlowModal({ isOpen, onClose, contestType = "art", onPaymentInitiated }: RegistrationFlowModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
      whatsapp: "",
      email: "",
      instagram: "",
    }
  });

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    try {
      // Determine category based on age
      let category = "Adult";
      const age = parseInt(values.age);
      if (age >= 5 && age <= 8) {
        category = "Group A (5-8 years)";
      } else if (age >= 9 && age <= 12) {
        category = "Group B (9-12 years)";
      } else if (age >= 13 && age <= 17) {
        category = "Group C (13-17 years)";
      }

      // Prepare participant data for Firebase
      const participantData = {
        name: values.name,
        age: parseInt(values.age),
        whatsapp: values.whatsapp,
        email: values.email,
        instagram: values.instagram || "",
        contestType: contestType,
        category: category
      };

      // Save to Firebase first using registerWinterArtUser
      const result = await registerWinterArtUser(participantData);

      if (result.success) {
        // Store registration data for later use
        const regData = {
          id: result.id, // This is the Firebase ID
          name: values.name,
          type: contestType,
          age: String(values.age ?? ""),
          whatsapp: values.whatsapp ?? "",
          email: values.email ?? "",
          instagram: values.instagram ?? "",
          category
        };

        setRegistrationData(regData);
        setIsSubmitting(false);

        toast({
          title: "Registration Successful!",
          description: `Registration ID: ${result.id}. Now proceeding to payment...`,
        });

        // Proceed to payment after short delay
        setTimeout(() => {
          initiatePayment(values, regData);
        }, 1000);

      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Registration error:", error);

      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Payment Flow - Step 1: Create Order with Backend
  const initiatePayment = async (values: any, regData: any) => {
    console.log('🚀 [PAYMENT] Initiating payment for:', values.name);
    setIsProcessingPayment(true);

    try {
      console.log('📡 [PAYMENT] Calling backend to create order...');

      // Save registration data to sessionStorage BEFORE payment
      sessionStorage.setItem('ics_last_registration', JSON.stringify(regData));
      sessionStorage.setItem('ics_firebase_id', regData.id);
      console.log('💾 [SESSION] Registration data saved to sessionStorage');

      const API_URL = import.meta.env.VITE_API_URL || 'https://daamieventsitebackendpayment.gunj06saksham-d14.workers.dev';
      const response = await fetch(`${API_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.whatsapp,
          amount: 1, // HARDCODED PAYMENT AMOUNT FOR TESTING (₹1)
          customerId: regData.id, // Use the Firebase ID as customerId
          orderNote: `Winter Art Royale - ${regData.category} `,
          orderMeta: {
            firebaseId: regData.id // Pass this if backend supports custom meta
          }
        })
      });

      console.log('📡 [PAYMENT] Backend response status:', response.status);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}: ${response.statusText} `);
      }

      const orderData = await response.json();
      console.log('✅ [PAYMENT] Order data received:', orderData);

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const { payment_session_id, order_id } = orderData.data;
      console.log('🎫 [PAYMENT] Order ID:', order_id);
      console.log('🔑 [PAYMENT] Payment Session ID:', payment_session_id);

      // Open Cashfree Checkout
      await openCashfreeCheckout(payment_session_id, order_id, regData);

    } catch (error) {
      console.error('❌ [PAYMENT] Payment initiation error:', error);
      setIsProcessingPayment(false);

      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  // Payment Flow - Step 2: Open Cashfree Checkout
  const openCashfreeCheckout = async (payment_session_id: string, order_id: string, regData: any) => {
    try {
      console.log('🏪 [CASHFREE] Initializing Cashfree SDK...');

      // Initialize Cashfree SDK
      const cashfree = await load({
        mode: "production" // ✅ Production mode
      });

      console.log('✅ [CASHFREE] SDK loaded successfully');
      console.log('💳 [CASHFREE] Opening checkout modal...');

      // Open Cashfree Checkout in Modal
      const result = await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal" // Opens as popup
      });

      console.log('📊 [CASHFREE] Checkout result:', result);

      // Handle payment result
      if (result.error) {
        // User closed popup or payment failed
        console.error('❌ [CASHFREE] Payment error:', result.error);
        setIsProcessingPayment(false);

        toast({
          title: "Payment Cancelled",
          description: "Payment was cancelled or failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (result.paymentDetails) {
        // Payment completed - Close modal and notify parent to show verification
        console.log('✅ [CASHFREE] Payment completed:', result.paymentDetails);
        console.log('🔍 [PAYMENT] Closing modal and starting verification on landing page...');

        // Close modal first
        onClose();

        // Notify parent to show verification animation
        if (onPaymentInitiated) {
          onPaymentInitiated(order_id, regData);
        }
      }

    } catch (error) {
      console.error('❌ [CASHFREE] Checkout error:', error);
      setIsProcessingPayment(false);

      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to open payment page. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Payment Flow - Step 3: Verify Payment from Backend
  const verifyPaymentAndRedirect = async (order_id: string, regData: any) => {
    try {
      // Call YOUR backend to verify payment
      const API_URL = import.meta.env.VITE_API_URL || 'https://daamieventsitebackendpayment.gunj06saksham-d14.workers.dev';
      const response = await fetch(`${API_URL}/api/verify-payment?orderId=${order_id}`);
      const verifyData = await response.json();

      if (verifyData.success && verifyData.data.is_paid) {
        // Payment verified successfully!
        setIsProcessingPayment(false);
        setIsSuccess(true);

        toast({
          title: "Payment Successful! 🎉",
          description: "Your registration is complete. Redirecting...",
        });

        // Persist registration data
        try {
          sessionStorage.setItem(
            "ics_last_registration",
            JSON.stringify({
              ...regData,
              paymentStatus: 'success',
              orderId: order_id,
              paymentVerified: true
            })
          );
        } catch (e) {
          console.error('Session storage error:', e);
        }

        // Redirect to thank you page after short delay
        setTimeout(() => {
          onClose();

          const qp = new URLSearchParams({
            ...regData,
            payment: 'success',
            orderId: order_id
          });

          navigate(`/thank-you?${qp.toString()}`);
        }, 2000);

      } else {
        // Payment verification failed
        throw new Error('Payment verification failed');
      }

    } catch (error) {
      console.error('Payment verification error:', error);
      setIsProcessingPayment(false);

      toast({
        title: "Verification Failed",
        description: "Payment verification failed. Please contact support with Order ID: " + order_id,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'max-w-[92%] p-4' : 'sm:max-w-[500px] p-6'} glassmorphism border - white / 10 overflow - y - auto max - h - [90vh]`}>
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-playfair text-center">
            {isProcessingPayment ? "Processing Payment..." : "Join Indian Creative Star"}
          </DialogTitle>
        </DialogHeader>

        {isProcessingPayment ? (
          <div className="py-8 text-center space-y-4">
            <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-creative-purple mx-auto animate-spin" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Processing Payment</h3>
              <p className="text-sm text-muted-foreground">
                Please complete the payment in the Cashfree window.
              </p>
              <p className="text-xs text-muted-foreground">
                Do not close this window or refresh the page.
              </p>
            </div>
          </div>
        ) : !isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-creative-blue/30 to-creative-purple/20 border border-creative-blue mb-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-creative-blue" />
                  <span className="font-medium">Art Competition</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 mt-1 pl-6">Drawing, Painting, Digital Art</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...form.register("name", { required: true })}
                  placeholder="Your name"
                  className="bg-white/5 border-white/10 h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...form.register("age", { required: true })}
                  placeholder="Your age"
                  className="bg-white/5 border-white/10 h-10"
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  {...form.register("whatsapp", { required: true })}
                  placeholder="Your WhatsApp number"
                  className="bg-white/5 border-white/10 h-10"
                  type="tel"
                  inputMode="tel"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  {...form.register("email", { required: true })}
                  placeholder="Your email address"
                  className="bg-white/5 border-white/10 h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="instagram">Instagram ID (Optional)</Label>
                <Input
                  id="instagram"
                  {...form.register("instagram")}
                  placeholder="@your_instagram_handle"
                  className="bg-white/5 border-white/10 h-10"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Entry Fee: ₹249</span>
              </div>

              <Button
                type="submit"
                className="w-full creative-btn py-2 sm:py-3 h-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Register & Pay ₹249
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-2">
                You will be redirected to secure payment after registration
              </p>
            </form>
          </Form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto" />
            <h3 className="text-lg sm:text-xl font-medium">Payment Successful!</h3>
            <p className="text-sm text-muted-foreground">
              Your registration is complete. Redirecting to confirmation page...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
