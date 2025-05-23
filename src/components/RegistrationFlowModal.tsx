import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

interface RegistrationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestType?: "art";
}

export function RegistrationFlowModal({ isOpen, onClose, contestType = "art" }: RegistrationFlowModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
      whatsapp: "",
      email: "",
    }
  });

  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Registration Successful!",
        description: "You've registered for the Art competition.",
      });
      
      // Reset form after 1 second and redirect to thank you page
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        
        // Navigate to thank you page with query params
        navigate(`/thank-you?name=${encodeURIComponent(values.name)}`);
      }, 1000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'max-w-[92%] p-4' : 'sm:max-w-[500px] p-6'} glassmorphism border-white/10 overflow-y-auto max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-playfair text-center">
            Join Sikkim Creative Art Competition
          </DialogTitle>
        </DialogHeader>
        
        {!isSuccess ? (
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
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Registration fee: Free</span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full creative-btn py-2 sm:py-3 h-auto" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Now"} 
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto" />
            <h3 className="text-lg sm:text-xl font-medium">Registration Successful!</h3>
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation on your WhatsApp and Email soon.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
