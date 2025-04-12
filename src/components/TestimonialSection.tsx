
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya",
    role: "Mom of a 12-year-old",
    content: "My daughter won 3rd place — her poem got published in an eBook! She's more confident than ever.",
    avatar: "P",
    rating: 5,
  },
  {
    id: 2,
    name: "Ramesh",
    role: "Hobby Artist",
    content: "I've joined 3 times. The process is smooth, the judging is fair, and the team is very supportive.",
    avatar: "R",
    rating: 5,
  },
  {
    id: 3,
    name: "Saba",
    role: "College Student",
    content: "I never thought my Urdu poetry would reach thousands. This contest changed that.",
    avatar: "S",
    rating: 5,
  },
];

export function TestimonialSection() {
  return (
    <section className="section-padding" id="testimonials">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">Testimonials</Badge>
          <h2 className="text-4xl font-bold text-gradient mb-4">What People Are Saying</h2>
          <p className="text-muted-foreground">
            Hear from our past participants and winners about their experience with the India Creative Star challenge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>
                
                <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                
                <div>
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-creative-yellow fill-creative-yellow' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
