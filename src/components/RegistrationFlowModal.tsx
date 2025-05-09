
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface RegistrationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationFlowModal({ isOpen, onClose }: RegistrationFlowModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      instagram: "",
      contestType: "art" as "art" | "poetry"
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
        description: `You've registered for the ${values.contestType === "art" ? "Art" : "Poetry"} competition.`,
      });
      
      // Reset form after 1 second and redirect to thank you page
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        
        // Navigate to thank you page with query params
        navigate(`/thank-you?type=${values.contestType}&name=${encodeURIComponent(values.name)}`);
      }, 1000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glassmorphism border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-center">
            Join India Creative Star
          </DialogTitle>
        </DialogHeader>
        
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="contestType" className="font-medium text-lg">Choose Your Competition</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <FormField
                    control={form.control}
                    name="contestType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className={`p-4 rounded-lg cursor-pointer transition-all ${
                              field.value === 'art' 
                                ? 'bg-gradient-to-r from-creative-blue/30 to-creative-purple/20 border border-creative-blue' 
                                : 'bg-black/20 border border-white/10 hover:border-white/30'
                            }`} onClick={() => form.setValue('contestType', 'art')}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="art" id="art" />
                                <FormLabel htmlFor="art" className="font-medium cursor-pointer">Art Contest</FormLabel>
                              </div>
                              <p className="text-sm text-white/70 mt-1 pl-6">Drawing, Painting, Digital Art</p>
                            </div>
                            
                            <div className={`p-4 rounded-lg cursor-pointer transition-all ${
                              field.value === 'poetry' 
                                ? 'bg-gradient-to-r from-creative-pink/30 to-creative-purple/20 border border-creative-pink' 
                                : 'bg-black/20 border border-white/10 hover:border-white/30'
                            }`} onClick={() => form.setValue('contestType', 'poetry')}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="poetry" id="poetry" />
                                <FormLabel htmlFor="poetry" className="font-medium cursor-pointer">Poetry Contest</FormLabel>
                              </div>
                              <p className="text-sm text-white/70 mt-1 pl-6">Poems, Verses, Sonnets</p>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...form.register("name", { required: true })}
                  placeholder="Your name"
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  {...form.register("whatsapp", { required: true })}
                  placeholder="Your WhatsApp number"
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email", { required: true })}
                  placeholder="Your email address"
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram ID (optional)</Label>
                <Input
                  id="instagram"
                  {...form.register("instagram")}
                  placeholder="Your Instagram handle"
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>100% Free Registration</span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full creative-btn py-3" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Now"} 
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-medium">Registration Successful!</h3>
            <p className="text-muted-foreground">
              You will receive a confirmation on your WhatsApp and Email soon.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
