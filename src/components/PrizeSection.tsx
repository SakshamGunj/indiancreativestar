import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrizeSection() {
  return (
    <section className="section-padding bg-muted/20" id="prizes">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">Get Rewarded</Badge>
          <h2 className="text-5xl font-bold text-gradient mb-4">What's in it for YOU?</h2>
          <p className="text-muted-foreground text-xl">
            We believe in recognizing and rewarding creativity. Here's what you can win in our Art, Poetry, and Writing competitions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* First Prize */}
          <Card className="prize-card border-creative-yellow/30 relative overflow-hidden group hover:border-creative-yellow/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-yellow/20 rounded-full -mt-10 -mr-10 blur-2xl group-hover:bg-creative-yellow/30 transition-all duration-300" />
            <div className="absolute -top-4 -left-4 bg-creative-yellow text-black w-20 h-20 flex items-center justify-center rounded-full transform -rotate-12 text-xs font-bold shadow-lg">
              IN ALL<br/>CATEGORIES
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-yellow/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Trophy className="h-5 w-5 text-creative-yellow" />
                </div>
                <Badge className="bg-creative-yellow text-black">1st Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-creative">₹10,000</CardTitle>
              <CardDescription>Cash Prize</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-creative-yellow" />
                  <span>National Recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-creative-yellow" />
                  <span>Feature in eBook Anthology</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-creative-yellow" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Second Prize */}
          <Card className="prize-card border-creative-blue/30 relative overflow-hidden group hover:border-creative-blue/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-blue/20 rounded-full -mt-10 -mr-10 blur-2xl group-hover:bg-creative-blue/30 transition-all duration-300" />
            <div className="absolute -top-4 -left-4 bg-creative-blue text-white w-20 h-20 flex items-center justify-center rounded-full transform -rotate-12 text-xs font-bold shadow-lg">
              IN ALL<br/>CATEGORIES
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Award className="h-5 w-5 text-creative-blue" />
                </div>
                <Badge className="bg-creative-blue">2nd Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-creative">₹5,000</CardTitle>
              <CardDescription>Cash Prize</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-creative-blue" />
                  <span>National Recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-creative-blue" />
                  <span>Feature in eBook Anthology</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-creative-blue" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Third Prize */}
          <Card className="prize-card border-creative-pink/30 relative overflow-hidden group hover:border-creative-pink/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-pink/20 rounded-full -mt-10 -mr-10 blur-2xl group-hover:bg-creative-pink/30 transition-all duration-300" />
            <div className="absolute -top-4 -left-4 bg-creative-pink text-white w-20 h-20 flex items-center justify-center rounded-full transform -rotate-12 text-xs font-bold shadow-lg">
              IN ALL<br/>CATEGORIES
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Medal className="h-5 w-5 text-creative-pink" />
                </div>
                <Badge className="bg-creative-pink">3rd Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-creative">₹2,000</CardTitle>
              <CardDescription>Cash Prize</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-creative-pink" />
                  <span>National Recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-creative-pink" />
                  <span>Feature in eBook Anthology</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-creative-pink" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Certificate Banner */}
        <div className="mb-12 creative-card p-6 md:p-10 text-center bg-gradient-to-r from-creative-purple/40 to-creative-pink/40 group hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
              <Award className="h-10 w-10 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">All Participants Will Receive a Digital Certificate!</h3>
              <p className="text-muted-foreground max-w-xl mx-auto md:mx-0">
                Perfect for your resume, portfolio, or to show off on social media. Our certificates are professionally designed and include our official seal.
              </p>
            </div>
            <Button 
              className="shrink-0 creative-btn mt-4 md:mt-0"
              onClick={() => window.location.href = "#register"}
            >
              Get Certified
            </Button>
          </div>
        </div>
        
        {/* Additional prizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="creative-card p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
                <Star className="h-6 w-6 text-creative-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Top 50 Recognition</h3>
                <p className="text-muted-foreground">
                  Get featured in our Digital Gallery that reaches thousands of art lovers across India.
                  Your work will be showcased with your name and a brief bio.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="creative-card p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-creative-orange/20 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6 text-creative-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">eBook Publication</h3>
                <p className="text-muted-foreground">
                  All winners and selected entries will be published in our professional eBook Anthology that
                  will be distributed nationwide to art communities and literary circles.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button 
            className="creative-btn text-lg px-10 py-6 animate-pulse"
            onClick={() => window.location.href = "#register"}
          >
            Enter Now & Win Big
          </Button>
        </div>
      </div>
    </section>
  );
}
