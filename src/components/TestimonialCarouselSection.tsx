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
import { useIsMobile } from "@/hooks/use-mobile";

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

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const isMobile = useIsMobile();

  return (
    <Card className={`h-full flex flex-col testimonial-card-alt group border-border/50 hover:border-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/20 ${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
      <CardContent className="pt-0 flex flex-col flex-grow">
        <div className={`flex ${isMobile ? 'flex-col items-start' : 'justify-between items-start'} mb-3`}>
          <div className={`${isMobile ? 'mb-1' : ''}`}>
            <h4 className={`font-semibold text-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>{testimonial.name}</h4>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{testimonial.role}</p>
          </div>
          <div className={`flex items-center gap-2 ${isMobile ? 'mt-1' : ''}`}>
            <Badge variant="secondary" className={`group-hover:bg-primary/20 group-hover:text-primary transition-colors ${isMobile ? 'text-[10px] px-1.5 py-0.5' : 'text-xs'}`}>
              {testimonial.category}
            </Badge>
            <Quote className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'} text-primary/30 group-hover:text-primary/50 transition-colors`} />
          </div>
        </div>
        <p className={`mb-4 text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed flex-grow`}>"{testimonial.content}"</p>
        <div className="mt-auto">
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={` ${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${i < testimonial.rating ? 'text-creative-yellow fill-creative-yellow' : 'text-muted/70'}`} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function TestimonialCarouselSection() {
  const isMobile = useIsMobile();

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
        
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-8 lg:-left-12 text-primary hover:bg-primary/10 hover:text-primary" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-8 lg:-right-12 text-primary hover:bg-primary/10 hover:text-primary" />
          </Carousel>
        )}
      </div>
    </section>
  );
} 