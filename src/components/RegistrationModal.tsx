
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle } from "lucide-react";

interface RegistrationModalProps {
  contestType: "art" | "poetry";
  buttonText?: string;
  buttonClassName?: string;
}

export function RegistrationModal({ contestType, buttonText = "Enter Now", buttonClassName }: RegistrationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    whatsapp: "",
    email: "",
    instagram: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Registration Successful!",
        description: `You've registered for the ${contestType === "art" ? "Art" : "Poetry"} competition.`,
      });
      
      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          name: "",
          whatsapp: "",
          email: "",
          instagram: "",
        });
        setIsOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName || "creative-btn"}>
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glassmorphism border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            Register for {contestType === "art" ? "Art" : "Poetry"} Contest
          </DialogTitle>
        </DialogHeader>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                placeholder="Your WhatsApp number"
                value={formState.whatsapp}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={formState.email}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram ID (optional)</Label>
              <Input
                id="instagram"
                name="instagram"
                placeholder="Your Instagram handle"
                value={formState.instagram}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full creative-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Now"}
            </Button>
          </form>
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
