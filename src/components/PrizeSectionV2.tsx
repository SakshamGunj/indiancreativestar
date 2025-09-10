import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, BookOpen, Star, Palette, Users, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrizeSectionV2() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30" id="prizes">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            🏆 Get Rewarded
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What's in it for <span className="text-gradient">YOU</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe in recognizing and rewarding creativity. Here are the exciting prizes available in our competitions.
          </p>
          <div className="mt-8 inline-block">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-3 text-lg animate-pulse shadow-lg">
              Total Prize Pool: ₹50,000
            </Badge>
          </div>
        </div>
        
        {/* Top 100 E-Magazine Feature */}
        <div className="glassmorphism-card p-8 mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <BookOpen className="h-12 w-12 text-purple-600" />
            <h3 className="text-3xl font-bold text-gray-900">Top 100 Feature</h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            <span className="font-bold text-purple-600">Top 100 participants</span> who make it to the next round will be featured in our exclusive 
            <span className="font-bold"> Sikkim Creative Star e-Magazine</span> - reaching thousands of art enthusiasts nationwide!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Adult Art Competition Prizes */}
          <div className="glassmorphism-card p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Adult Art Competition</h3>
                <p className="text-gray-600">18+ Years | Prize Pool: ₹30,000</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="prize-card border-orange-300 bg-gradient-to-br from-white to-orange-50/50 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-2 pt-6 text-center">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-fit mx-auto mb-3">1st Prize</Badge>
                  <CardTitle className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ₹15,000
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">National Recognition</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">e-Magazine Feature</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Gift className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">Surprise Hamper</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">Mystery Gift</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="prize-card border-blue-300 bg-gradient-to-br from-white to-blue-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-2 pt-4 text-center">
                    <Badge className="bg-blue-500 text-white w-fit mx-auto mb-2">2nd Prize</Badge>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ₹10,000
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">e-Magazine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Gift className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">Surprise Hamper</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">Mystery Gift</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="prize-card border-pink-300 bg-gradient-to-br from-white to-pink-50/50 hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-2 pt-4 text-center">
                    <Badge className="bg-pink-500 text-white w-fit mx-auto mb-2">3rd Prize</Badge>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ₹5,000
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3 text-pink-500 flex-shrink-0" />
                        <span className="text-gray-700">e-Magazine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Gift className="h-3 w-3 text-pink-500 flex-shrink-0" />
                        <span className="text-gray-700">Surprise Hamper</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-pink-500 flex-shrink-0" />
                        <span className="text-gray-700">Mystery Gift</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Kids Art Competition Prizes */}
          <div className="glassmorphism-card p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Kids Art Competition</h3>
                <p className="text-gray-600">5-17 Years | Prize Pool: ₹20,000</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Group A: 5-8 years */}
              <Card className="prize-card border-orange-300 bg-gradient-to-br from-white to-orange-50/50 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3 pt-4 text-center">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-fit mx-auto mb-2">Group A (5-8 years)</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ₹5,000
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">e-Magazine Feature</span>
                    <Gift className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
              
              {/* Group B: 9-12 years */}
              <Card className="prize-card border-blue-300 bg-gradient-to-br from-white to-blue-50/50 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3 pt-4 text-center">
                  <Badge className="bg-blue-500 text-white w-fit mx-auto mb-2">Group B (9-12 years)</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    ₹5,000
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">e-Magazine Feature</span>
                    <Gift className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
              
              {/* Group C: 13-17 years */}
              <Card className="prize-card border-pink-300 bg-gradient-to-br from-white to-pink-50/50 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3 pt-4 text-center">
                  <Badge className="bg-pink-500 text-white w-fit mx-auto mb-2">Group C (13-17 years)</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ₹10,000
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-3">1st Prize Winner</p>
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <BookOpen className="h-4 w-4 text-pink-500" />
                    <span className="text-gray-700">e-Magazine Feature</span>
                    <Gift className="h-4 w-4 text-pink-500" />
                    <span className="text-gray-700">Gift Hamper</span>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Benefits for All Categories */}
        <div className="glassmorphism-card p-10 text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="h-24 w-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Digital Excellence Certificate</h3>
              <p className="text-gray-700 text-lg max-w-3xl">
                Every participant receives a beautifully designed digital certificate recognizing their creativity and participation in Sikkim's premier art competition.
              </p>
            </div>
          </div>
        </div>
        
        {/* Participation Benefits */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Even if You Don't Win...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glassmorphism-card p-6 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Recognition</h4>
              <p className="text-sm text-gray-600">National exposure for your talent</p>
            </div>
            
            <div className="glassmorphism-card p-6 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Participation Certificate</h4>
              <p className="text-sm text-gray-600">Digital certificate for all entrants</p>
            </div>
            
            <div className="glassmorphism-card p-6 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Network Access</h4>
              <p className="text-sm text-gray-600">Connect with other creative artists</p>
            </div>
            
            <div className="glassmorphism-card p-6 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Future Opportunities</h4>
              <p className="text-sm text-gray-600">Priority access to upcoming contests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

