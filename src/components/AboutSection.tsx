import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, PenLine, Palette, Trophy, Award, Star } from "lucide-react";

export function AboutSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/80" id="about">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1">
              About Us
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-4">What is Sikkim Creative Star?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sikkim's premier platform for discovering, recognizing and celebrating visual artists and poets from across the nation.
          </p>
        </div>
        
        {/* YouTube video from AboutVideoSection moved here */}
        <div className="creative-card p-4 md:p-6 bg-gradient-to-br from-black/80 to-creative-purple/20 border-creative-purple/30 mb-12 max-w-4xl mx-auto">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/OZjsl-Of4lg?si=t-BLmymsOQTwPq1Z&autoplay=1&mute=1&loop=1&playlist=OZjsl-Of4lg" 
              title="Sikkim Creative Star - Season 1" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-creative-yellow/20 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-creative-yellow" />
            </div>
            <h3 className="text-xl font-bold mb-3">Statewide Platform</h3>
            <p className="text-muted-foreground">
              Connect with creatives from across Sikkim and showcase your talent on a national stage.
            </p>
          </Card>
          
          <Card className="creative-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-creative-purple/20 flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-creative-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Exciting Prizes</h3>
            <p className="text-muted-foreground">
              Win cash prizes, get featured in our eBook, and receive recognition across Sikkim.
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
            <span className="text-sm font-medium">Trusted by 1,000+ participants</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Palette className="h-5 w-5 text-creative-blue" />
            <span className="text-sm font-medium">Art Competition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
