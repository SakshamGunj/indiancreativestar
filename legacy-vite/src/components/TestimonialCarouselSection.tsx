import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { addReview } from "@/lib/firebase";

export function TestimonialCarouselSection() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit review to Firebase
      const result = await addReview({
        name: formData.name,
        location: formData.location,
        message: formData.message,
        rating: formData.rating
      });
      
      if (result.success) {
        toast({
          title: "Review Submitted!",
          description: "Thank you for sharing your experience. Your review will be reviewed and featured soon!",
        });
        
        // Reset form
        setFormData({
          name: "",
          location: "",
          message: "",
          rating: 5
        });
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30" id="testimonial-carousel">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Voices of Our Community</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">Share Your Creative Journey</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            We'd love to hear about your experience with Sikkim Creative Star. Your story inspires others!
          </p>
        </div>
        
        {/* Review Submission Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="creative-card p-6 sm:p-8 bg-gradient-to-br from-black/60 to-creative-purple/20 border-primary/20">
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Share Your Review</h3>
                  <p className="text-sm text-muted-foreground">Help others discover the magic of creative competition</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Gangtok, Sikkim"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Experience</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your creative journey with Sikkim Creative Star..."
                    className="bg-white/5 border-white/10 min-h-[120px] resize-none"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate Your Experience</label>
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleRatingChange(i + 1)}
                        className="transition-colors hover:scale-110 transform duration-200"
                      >
                        <Star 
                          className={`h-6 w-6 ${i < formData.rating ? 'text-creative-yellow fill-creative-yellow' : 'text-muted-foreground'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full creative-btn group" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Quote className="h-4 w-4" />
                  <span>Your review will help inspire future participants and may be featured on our website</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 