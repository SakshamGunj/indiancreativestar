
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Certificate, Star } from "lucide-react";

export function PrizeSection() {
  return (
    <section className="section-padding bg-muted/20" id="prizes">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">Get Rewarded</Badge>
          <h2 className="text-5xl font-bold text-gradient mb-4">What's in it for YOU?</h2>
          <p className="text-muted-foreground text-xl">
            We believe in recognizing and rewarding creativity. Here's what you can win when you participate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* First Prize */}
          <Card className="prize-card border-creative-yellow/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-yellow/20 rounded-full -mt-10 -mr-10 blur-2xl" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-yellow/20 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-creative-yellow" />
                </div>
                <Badge className="bg-creative-yellow text-black">1st Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold">₹10,000</CardTitle>
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
                  <Certificate className="h-4 w-4 text-creative-yellow" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Second Prize */}
          <Card className="prize-card border-creative-blue/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-blue/20 rounded-full -mt-10 -mr-10 blur-2xl" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-creative-blue" />
                </div>
                <Badge className="bg-creative-blue">2nd Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold">₹5,000</CardTitle>
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
                  <Certificate className="h-4 w-4 text-creative-blue" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Third Prize */}
          <Card className="prize-card border-creative-pink/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-creative-pink/20 rounded-full -mt-10 -mr-10 blur-2xl" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-creative-pink/20 flex items-center justify-center">
                  <Medal className="h-5 w-5 text-creative-pink" />
                </div>
                <Badge className="bg-creative-pink">3rd Prize</Badge>
              </div>
              <CardTitle className="text-3xl font-bold">₹2,000</CardTitle>
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
                  <Certificate className="h-4 w-4 text-creative-pink" />
                  <span>Digital Certificate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional prizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="creative-card p-6">
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
          
          <Card className="creative-card p-6">
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
      </div>
    </section>
  );
}
