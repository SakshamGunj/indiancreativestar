import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Star, Palette, Users, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrizeSection() {
  return (
    <section className="section-padding bg-muted/20" id="prizes">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge variant="outline" className="mb-2">Get Rewarded</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">What's in it for YOU?</h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            We believe in recognizing and rewarding creativity. Here are the exciting prizes available in our competitions.
          </p>
          <div className="mt-6 inline-block">
            <Badge className="bg-gradient-to-r from-creative-yellow to-creative-orange text-black font-bold px-4 py-2 text-lg animate-pulse">
              Total Prize Pool: ₹50,000
            </Badge>
          </div>
        </div>
        
        {/* Top 100 E-Magazine Feature */}
        <div className="mb-8 creative-card p-4 sm:p-6 bg-gradient-to-r from-creative-purple/40 to-creative-pink/40 border-creative-purple/30 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="h-6 w-6 text-white" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">Top 100 Feature</h3>
          </div>
          <p className="text-white/90 text-sm sm:text-base">
            <span className="font-bold text-creative-yellow">Top 100 participants</span> who make it to the next round will be featured in our exclusive 
            <span className="font-bold"> Sikkim Creative Star e-Magazine</span> - reaching thousands of art enthusiasts nationwide!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Adult Art Competition Prizes */}
          <div className="creative-card p-4 sm:p-6 bg-gradient-to-br from-black/80 to-creative-blue/20 border-creative-blue/30">
            <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-creative-blue/20 flex items-center justify-center">
                <Palette className="h-5 sm:h-6 w-5 sm:w-6 text-creative-blue" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Adult Art Competition</h3>
                <p className="text-sm text-white/70">18+ Years | Prize Pool: ₹30,000</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <Card className="prize-card border-creative-yellow/30 bg-gradient-to-br from-black/60 to-creative-yellow/10 hover:scale-102 transition-all duration-300 min-h-[200px] flex flex-col">
                <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4 text-center">
                  <Badge className="bg-creative-yellow text-black w-fit mx-auto mb-2">1st Prize</Badge>
                  <div className="py-2">
                    <CardTitle className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-creative-yellow to-creative-orange bg-clip-text text-transparent drop-shadow-sm leading-tight">₹15,000</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-3 sm:p-4">
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-creative-yellow shrink-0" />
                      <span>National Recognition</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-3 w-3 text-creative-yellow shrink-0" />
                      <span>e-Magazine Feature</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Gift className="h-3 w-3 text-creative-yellow shrink-0" />
                      <span>Surprise Hamper</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-creative-yellow shrink-0" />
                      <span>Mystery Gift</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="prize-card border-creative-blue/30 bg-gradient-to-br from-black/60 to-creative-blue/10 hover:scale-102 transition-all duration-300 min-h-[160px] flex flex-col">
                  <CardHeader className="pb-1 pt-3 text-center">
                    <Badge className="bg-creative-blue text-white w-fit mx-auto mb-1">2nd Prize</Badge>
                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-creative-blue to-creative-purple bg-clip-text text-transparent leading-tight">₹10,000</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-2 sm:p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1">
                        <BookOpen className="h-2 w-2 text-creative-blue shrink-0" />
                        <span>e-Magazine</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Gift className="h-2 w-2 text-creative-blue shrink-0" />
                        <span>Surprise Hamper</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Sparkles className="h-2 w-2 text-creative-blue shrink-0" />
                        <span>Mystery Gift</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="prize-card border-creative-pink/30 bg-gradient-to-br from-black/60 to-creative-pink/10 hover:scale-102 transition-all duration-300 min-h-[160px] flex flex-col">
                  <CardHeader className="pb-1 pt-3 text-center">
                    <Badge className="bg-creative-pink text-white w-fit mx-auto mb-1">3rd Prize</Badge>
                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-creative-pink to-creative-purple bg-clip-text text-transparent leading-tight">₹5,000</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-2 sm:p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1">
                        <BookOpen className="h-2 w-2 text-creative-pink shrink-0" />
                        <span>e-Magazine</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Gift className="h-2 w-2 text-creative-pink shrink-0" />
                        <span>Surprise Hamper</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Sparkles className="h-2 w-2 text-creative-pink shrink-0" />
                        <span>Mystery Gift</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Kids Art Competition Prizes */}
          <div className="creative-card p-4 sm:p-6 bg-gradient-to-br from-black/80 to-creative-purple/20 border-creative-purple/30">
            <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-creative-purple/20 flex items-center justify-center">
                <Users className="h-5 sm:h-6 w-5 sm:w-6 text-creative-purple" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Kids Art Competition</h3>
                <p className="text-sm text-white/70">5-17 Years | Prize Pool: ₹20,000</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Group A: 5-8 years */}
              <Card className="prize-card border-creative-yellow/30 bg-gradient-to-br from-black/60 to-creative-yellow/10 hover:scale-102 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 text-center">
                  <Badge className="bg-creative-yellow text-black w-fit mx-auto mb-1">Group A (5-8 years)</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-creative-yellow to-creative-orange bg-clip-text text-transparent">₹5,000</CardTitle>
                  <p className="text-xs text-white/70 mb-2">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <BookOpen className="h-3 w-3 text-creative-yellow" />
                    <span>e-Magazine Feature</span>
                    <Gift className="h-3 w-3 text-creative-yellow" />
                    <span>Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
              
              {/* Group B: 9-12 years */}
              <Card className="prize-card border-creative-blue/30 bg-gradient-to-br from-black/60 to-creative-blue/10 hover:scale-102 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 text-center">
                  <Badge className="bg-creative-blue text-white w-fit mx-auto mb-1">Group B (9-12 years)</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-creative-blue to-creative-purple bg-clip-text text-transparent">₹5,000</CardTitle>
                  <p className="text-xs text-white/70 mb-2">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <BookOpen className="h-3 w-3 text-creative-blue" />
                    <span>e-Magazine Feature</span>
                    <Gift className="h-3 w-3 text-creative-blue" />
                    <span>Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
              
              {/* Group C: 13-17 years */}
              <Card className="prize-card border-creative-pink/30 bg-gradient-to-br from-black/60 to-creative-pink/10 hover:scale-102 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 text-center">
                  <Badge className="bg-creative-pink text-white w-fit mx-auto mb-1">Group C (13-17 years)</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-creative-pink to-creative-purple bg-clip-text text-transparent">₹10,000</CardTitle>
                  <p className="text-xs text-white/70 mb-2">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <BookOpen className="h-3 w-3 text-creative-pink" />
                    <span>e-Magazine Feature</span>
                    <Gift className="h-3 w-3 text-creative-pink" />
                    <span>Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Benefits for All Categories */}
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
        <div className="space-y-6">
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
              <h4 className="font-bold text-sm sm:text-base">Future Opportunities</h4>
              <p className="text-xs text-white/60">Priority access to upcoming contests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
