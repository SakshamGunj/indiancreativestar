import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Star, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrizeSection() {
  return (
    <section className="section-padding bg-muted/20" id="prizes">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge variant="outline" className="mb-2">Get Rewarded</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">What's in it for YOU?</h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            We believe in recognizing and rewarding creativity. Here are the exciting prizes available in our Art competition.
          </p>
          <div className="mt-6 inline-block">
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold px-4 py-2 text-lg animate-pulse">
              Total Prize Pool: ₹30,000
            </Badge>
          </div>
        </div>
        
        <div className="mx-auto max-w-full mb-12 sm:mb-16">
          {/* Art Competition Prizes */}
          <div className="creative-card p-4 sm:p-6 bg-gradient-to-br from-black/80 to-creative-blue/20 border-creative-blue/30">
            <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-creative-blue/20 flex items-center justify-center">
                <Palette className="h-5 sm:h-6 w-5 sm:w-6 text-creative-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Art Competition Prizes</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-3">
              <Card className="prize-card border-creative-yellow/30 bg-gradient-to-br from-black/60 to-creative-yellow/10 hover:scale-102 transition-all duration-300 min-h-[220px] sm:min-h-[240px] flex flex-col">
                <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-5 text-center">
                  <Badge className="bg-creative-yellow text-black w-fit mx-auto mb-2">1st Prize</Badge>
                  <div className="py-2 sm:py-3">
                    <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-creative-yellow to-creative-orange bg-clip-text text-transparent drop-shadow-sm leading-tight">₹15,000</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-3 pb-3 sm:pb-5 flex-grow">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-creative-yellow shrink-0" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-creative-yellow shrink-0" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-blue/30 bg-gradient-to-br from-black/60 to-creative-blue/10 hover:scale-102 transition-all duration-300 min-h-[220px] sm:min-h-[240px] flex flex-col">
                <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-5 text-center">
                  <Badge className="bg-creative-blue text-white w-fit mx-auto mb-2">2nd Prize</Badge>
                  <div className="py-2 sm:py-3">
                    <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-creative-blue to-creative-purple bg-clip-text text-transparent drop-shadow-sm leading-tight">₹10,000</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-3 pb-3 sm:pb-5 flex-grow">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-creative-blue shrink-0" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-creative-blue shrink-0" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="prize-card border-creative-pink/30 bg-gradient-to-br from-black/60 to-creative-pink/10 hover:scale-102 transition-all duration-300 min-h-[220px] sm:min-h-[240px] flex flex-col">
                <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-5 text-center">
                  <Badge className="bg-creative-pink text-white w-fit mx-auto mb-2">3rd Prize</Badge>
                  <div className="py-2 sm:py-3">
                    <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-creative-pink to-creative-purple bg-clip-text text-transparent drop-shadow-sm leading-tight">₹5,000</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-3 pb-3 sm:pb-5 flex-grow">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-creative-pink shrink-0" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-creative-pink shrink-0" />
                      <span>Featured in eMagazine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Additional Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <Card className="creative-card p-4 sm:p-6 hover:scale-102 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-blue/10">
            <div className="h-14 w-14 rounded-full bg-creative-blue/20 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <BookOpen className="h-7 w-7 text-creative-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">eMagazine Feature</h3>
            <p className="text-muted-foreground text-center text-sm sm:text-base">
              Featured in "Sikkim's Creative Star 2025" Official eMagazine (Top 100 entries) - distributed nationwide to art communities.
            </p>
          </Card>
          
          <Card className="creative-card p-4 sm:p-6 hover:scale-102 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-purple/10">
            <div className="h-14 w-14 rounded-full bg-creative-purple/20 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <Star className="h-7 w-7 text-creative-purple" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">Digital Gallery</h3>
            <p className="text-muted-foreground text-center text-sm sm:text-base">
              Featured in a Statewide Digital Gallery with lifetime listing - your work will be showcased to thousands of art enthusiasts.
            </p>
          </Card>
          
          <Card className="creative-card p-4 sm:p-6 hover:scale-102 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-yellow/10">
            <div className="h-14 w-14 rounded-full bg-creative-yellow/20 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <Award className="h-7 w-7 text-creative-yellow" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">Artist ID Card</h3>
            <p className="text-muted-foreground text-center text-sm sm:text-base">
              Receive a custom SCS Artist ID Card featuring your name, title & personal artist quote - perfect for networking.
            </p>
          </Card>
        </div>
        
        {/* Certificate Banner */}
        <div className="mb-10 sm:mb-12 creative-card p-5 sm:p-6 md:p-10 text-center bg-gradient-to-r from-creative-purple/40 to-creative-pink/40 group hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="h-16 sm:h-20 w-16 sm:w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
              <Trophy className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Digital Excellence Certificate</h3>
              <p className="text-white/80 max-w-2xl text-sm sm:text-base">
                Every participant receives a beautifully designed digital certificate recognizing their creativity and participation in Sikkim's premier art competition.
              </p>
            </div>
          </div>
        </div>
        
        {/* Participation Benefits */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Even if You Don't Win...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="creative-card p-3 sm:p-4 bg-gradient-to-br from-black/80 to-creative-purple/5 border-creative-purple/20">
              <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-creative-purple/20 mx-auto flex items-center justify-center mb-2">
                <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-creative-purple" />
              </div>
              <h4 className="font-bold text-sm sm:text-base">Recognition</h4>
              <p className="text-xs text-white/60">National exposure for your talent</p>
            </div>
            
            <div className="creative-card p-3 sm:p-4 bg-gradient-to-br from-black/80 to-creative-blue/5 border-creative-blue/20">
              <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-creative-blue/20 mx-auto flex items-center justify-center mb-2">
                <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-creative-blue" />
              </div>
              <h4 className="font-bold text-sm sm:text-base">Participation Certificate</h4>
              <p className="text-xs text-white/60">Digital certificate for all entrants</p>
            </div>
            
            <div className="creative-card p-3 sm:p-4 bg-gradient-to-br from-black/80 to-creative-yellow/5 border-creative-yellow/20">
              <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-creative-yellow/20 mx-auto flex items-center justify-center mb-2">
                <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-creative-yellow" />
              </div>
              <h4 className="font-bold text-sm sm:text-base">Network Access</h4>
              <p className="text-xs text-white/60">Connect with other creative artists</p>
            </div>
            
            <div className="creative-card p-3 sm:p-4 bg-gradient-to-br from-black/80 to-creative-pink/5 border-creative-pink/20">
              <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-creative-pink/20 mx-auto flex items-center justify-center mb-2">
                <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-creative-pink" />
              </div>
              <h4 className="font-bold text-sm sm:text-base">Feedback</h4>
              <p className="text-xs text-white/60">Valuable insights on your artwork</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="mx-auto mb-4 sm:mb-6 p-2 sm:p-3 rounded-full inline-flex items-center gap-2 bg-white/5 border border-white/10">
            <div className="h-3 sm:h-4 w-3 sm:w-4 rounded-full bg-green-500/20 border border-green-500 animate-pulse"></div>
            <span className="text-xs text-white/70">Limited Time: Free Registration</span>
          </div>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Ready to showcase your artistic talents to the nation? Enter now
            and take your art to the next level.
          </p>
          <Button className="creative-btn group text-base font-bold py-2 sm:py-3 px-6 sm:px-8 h-auto">
            Register For Free
          </Button>
        </div>
      </div>
    </section>
  );
}
