
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, PenLine, Palette, Trophy, Award, Star } from "lucide-react";

export function AboutSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-2">About The Event</Badge>
          <h2 className="text-4xl font-bold text-gradient mb-4">What is India's Creative Star?</h2>
          <p className="text-xl text-muted-foreground">
            India's Creative Star is an exciting online competition platform featuring two main categories: 
            Art and Poetry/Writing. We provide a stage for young talents across India to showcase their 
            creativity, win prizes, and earn recognition!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-creative-yellow/20 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-creative-yellow" />
            </div>
            <h3 className="text-xl font-bold mb-3">Nationwide Platform</h3>
            <p className="text-muted-foreground">
              Connect with creatives from across India and showcase your talent on a national stage.
            </p>
          </Card>
          
          <Card className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-creative-purple/20 flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-creative-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Exciting Prizes</h3>
            <p className="text-muted-foreground">
              Win cash prizes, get featured in our eBook, and receive recognition across India.
            </p>
          </Card>
          
          <Card className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-creative-pink/20 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-creative-pink" />
            </div>
            <h3 className="text-xl font-bold mb-3">Official Certification</h3>
            <p className="text-muted-foreground">
              Every participant receives a digital certificate to boost their portfolio and resume.
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star className="h-5 w-5 text-creative-yellow" />
            <span className="text-sm font-medium">Trusted by 10,000+ participants</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Palette className="h-5 w-5 text-creative-blue" />
            <span className="text-sm font-medium">Art Competition</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <PenLine className="h-5 w-5 text-creative-pink" />
            <span className="text-sm font-medium">Poetry Competition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
