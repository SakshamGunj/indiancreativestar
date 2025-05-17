import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Re-using the same testimonial data structure and data for now
// In a real app, this might come from props or a shared data source
const testimonials = [
  {
    id: 1,
    name: "Priya",
    role: "Mom of a 12-year-old",
    content: "My daughter won 3rd place — her poem got published in an eBook! She's more confident than ever.",
    avatar: "P",
    imageUrl: "https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Poetry"
  },
  {
    id: 2,
    name: "Ramesh",
    role: "Hobby Artist",
    content: "I've joined 3 times. The process is smooth, the judging is fair, and the team is very supportive.",
    avatar: "R",
    imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Art"
  },
  {
    id: 3,
    name: "Saba",
    role: "College Student",
    content: "I never thought my Urdu poetry would reach thousands. This contest changed that.",
    avatar: "S",
    imageUrl: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Poetry"
  },
  {
    id: 4,
    name: "Aarav",
    role: "11th Grade Student",
    content: "My art teacher encouraged me to participate, and I'm so glad I did! Getting recognized boosted my confidence.",
    avatar: "A",
    imageUrl: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Art"
  },
  {
    id: 5,
    name: "Meera",
    role: "Working Professional",
    content: "As someone who writes poetry as a hobby, this platform gave me validation I never expected.",
    avatar: "M",
    imageUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 4,
    category: "Poetry"
  },
];

export function TestimonialCarouselSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30" id="testimonial-carousel">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Voices of Our Community</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">Loved by Creatives Like You</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover inspiring stories from participants who found their spark with us.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-2 sm:p-4">
                <Card className="h-full flex flex-col testimonial-card-alt group border-border/50 hover:border-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/20">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary group-hover:scale-110 transition-transform duration-300">
                          <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-br from-creative-purple to-creative-pink text-white font-semibold">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant="secondary" className="group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {testimonial.category}
                        </Badge>
                      </div>
                      <Quote className="h-8 w-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    </div>
                    
                    <p className="mb-6 text-muted-foreground text-sm leading-relaxed flex-grow">"{testimonial.content}"</p>
                    
                    <div className="mt-auto">
                      <div className="flex mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-creative-yellow fill-creative-yellow' : 'text-muted/70'}`} 
                          />
                        ))}
                      </div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 md:-left-8 lg:-left-12 text-primary hover:bg-primary/10 hover:text-primary" />
          <CarouselNext className="hidden sm:flex -right-4 md:-right-8 lg:-right-12 text-primary hover:bg-primary/10 hover:text-primary" />
        </Carousel>
      </div>
    </section>
  );
} 