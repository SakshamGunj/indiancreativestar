
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
            We believe in recognizing and rewarding creativity. Here are the exciting prizes available in both our Art and Poetry competitions.
          </p>
          <div className="mt-6 inline-block">
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold px-4 py-2 text-lg animate-pulse">
              Total Prize Pool: ₹1,00,000
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Art Competition Prizes */}
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-blue/20 border-creative-blue/30">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-creative-blue/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-creative-blue" />
              </div>
              <h3 className="text-2xl font-bold">Art Competition Prizes</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="prize-card border-creative-yellow/30 bg-gradient-to-br from-black/60 to-creative-yellow/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-yellow text-black w-fit mb-1">1st Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹25,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-yellow" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-yellow" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-blue/30 bg-gradient-to-br from-black/60 to-creative-blue/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-blue text-white w-fit mb-1">2nd Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹15,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-blue" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-blue" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-pink/30 bg-gradient-to-br from-black/60 to-creative-pink/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-pink text-white w-fit mb-1">3rd Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹10,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-pink" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-pink" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Poetry Competition Prizes */}
          <div className="creative-card p-6 bg-gradient-to-br from-black/80 to-creative-pink/20 border-creative-pink/30">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-creative-pink/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-creative-pink" />
              </div>
              <h3 className="text-2xl font-bold">Poetry Competition Prizes</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="prize-card border-creative-yellow/30 bg-gradient-to-br from-black/60 to-creative-yellow/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-yellow text-black w-fit mb-1">1st Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹25,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-yellow" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-yellow" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-blue/30 bg-gradient-to-br from-black/60 to-creative-blue/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-blue text-white w-fit mb-1">2nd Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹15,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-blue" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-blue" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-pink/30 bg-gradient-to-br from-black/60 to-creative-pink/10 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2">
                  <Badge className="bg-creative-pink text-white w-fit mb-1">3rd Prize</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient-creative">₹10,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-pink" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-creative-pink" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Additional Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-blue/10">
            <div className="h-16 w-16 rounded-full bg-creative-blue/20 flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="h-8 w-8 text-creative-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">eMagazine Feature</h3>
            <p className="text-muted-foreground text-center">
              Featured in "India's Creative Star 2025" Official eMagazine (Top 100 entries) - distributed nationwide to art communities.
            </p>
          </Card>
          
          <Card className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-purple/10">
            <div className="h-16 w-16 rounded-full bg-creative-purple/20 flex items-center justify-center mb-4 mx-auto">
              <Star className="h-8 w-8 text-creative-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Digital Gallery</h3>
            <p className="text-muted-foreground text-center">
              Featured in a Pan-India Digital Gallery with lifetime listing - your work will be showcased to thousands of art enthusiasts.
            </p>
          </Card>
          
          <Card className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-yellow/10">
            <div className="h-16 w-16 rounded-full bg-creative-yellow/20 flex items-center justify-center mb-4 mx-auto">
              <Award className="h-8 w-8 text-creative-yellow" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Artist ID Card</h3>
            <p className="text-muted-foreground text-center">
              Receive a custom ICS Artist ID Card featuring your name, title & personal artist quote - perfect for networking.
            </p>
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
                <h3 className="text-xl font-bold mb-2">Jury Review</h3>
                <p className="text-muted-foreground">
                  Get personalized feedback from our panel of expert judges, helping you refine your skills
                  and take your art or poetry to the next level.
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
