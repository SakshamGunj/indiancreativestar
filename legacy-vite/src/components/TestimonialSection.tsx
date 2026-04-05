import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya",
    role: "Mom of a 12-year-old",
    content: "My daughter won 3rd place — her poem got published in an eBook! She's more confident than ever. The certificate looks amazing on her bedroom wall.",
    avatar: "P",
    imageUrl: "https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Poetry"
  },
  {
    id: 2,
    name: "Ramesh",
    role: "Hobby Artist",
    content: "I've joined 3 times. The process is smooth, the judging is fair, and the team is very supportive. Even though I didn't win the top prize, getting featured was amazing for my Instagram followers.",
    avatar: "R",
    imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Art"
  },
  {
    id: 3,
    name: "Saba",
    role: "College Student",
    content: "I never thought my Urdu poetry would reach thousands. This contest changed that. The certificate helped me gain recognition at my university's literary club.",
    avatar: "S",
    imageUrl: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Poetry"
  },
  {
    id: 4,
    name: "Aarav",
    role: "11th Grade Student",
    content: "My art teacher encouraged me to participate, and I'm so glad I did! Getting recognized boosted my confidence. I'm now pursuing art more seriously.",
    avatar: "A",
    imageUrl: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Art"
  },
  {
    id: 5,
    name: "Meera",
    role: "Working Professional",
    content: "As someone who writes poetry as a hobby, this platform gave me validation I never expected. The judges' feedback was constructive and thoughtful.",
    avatar: "M",
    imageUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 4,
    category: "Poetry"
  },
  {
    id: 6,
    name: "Vivek",
    role: "Art School Graduate",
    content: "The competition was tough but fair. Getting published in the eBook was a great addition to my portfolio when applying for jobs in the creative field.",
    avatar: "V",
    imageUrl: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    rating: 5,
    category: "Art"
  },
];

export function TestimonialSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage, 
    (currentPage + 1) * testimonialsPerPage
  );
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <section className="section-padding" id="testimonials">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">Testimonials</Badge>
          <h2 className="text-4xl font-bold text-gradient mb-4">What People Are Saying</h2>
          <p className="text-muted-foreground">
            Hear from our past participants and winners about their experience with the Sikkim Creative Star challenge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card group">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary group-hover:scale-110 transition-all duration-300">
                      <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="bg-white/10">
                      {testimonial.category}
                    </Badge>
                  </div>
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
        
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevPage}
            className="rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            {Array(pageCount).fill(0).map((_, i) => (
              <Button 
                key={i} 
                variant={i === currentPage ? "default" : "outline"} 
                size="icon" 
                onClick={() => setCurrentPage(i)}
                className="w-8 h-8 rounded-full"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextPage}
            className="rounded-full hover:bg-white/20"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Trust badges */}
        <div className="mt-16 creative-card p-8 bg-white/5">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gradient">10,000+</span>
              <span className="text-sm text-muted-foreground">Participants</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gradient">100%</span>
              <span className="text-sm text-muted-foreground">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gradient">12+</span>
              <span className="text-sm text-muted-foreground">Monthly Themes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gradient">1000+</span>
              <span className="text-sm text-muted-foreground">Published Artists</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gradient">5⭐</span>
              <span className="text-sm text-muted-foreground">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
