
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, ArrowRight } from "lucide-react";

export function CertificateSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-creative-purple/10 to-creative-blue/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="outline" className="mb-2 bg-white border border-creative-purple/20 text-creative-purple">Official Recognition</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-6">
              All Participants Receive a Digital Certificate
            </h2>
            <p className="text-xl text-creative-purple/80 mb-8">
              Our professionally designed digital certificate is perfect for:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Resume Enhancement</h3>
                  <p className="text-creative-purple/70">Add creative credentials to your professional profile</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Portfolio Building</h3>
                  <p className="text-creative-purple/70">Demonstrate your commitment to your craft</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Social Media Sharing</h3>
                  <p className="text-creative-purple/70">Share your achievement with friends and followers</p>
                </div>
              </li>
            </ul>
            
            <Button 
              className="creative-btn"
              onClick={() => window.location.href = "#register"}
            >
              Get Your Certificate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="creative-card p-8 relative overflow-hidden group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-white to-indigo-50/30">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-creative-blue/20 rounded-full blur-3xl group-hover:bg-creative-blue/30 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-creative-purple/20 rounded-full blur-3xl group-hover:bg-creative-purple/30 transition-all duration-500" />
            
            <div className="relative bg-white/90 backdrop-blur-sm border border-white/80 rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-creative flex items-center justify-center">
                    <span className="font-bold text-white">ICS</span>
                  </div>
                  <div>
                    <span className="font-playfair font-bold text-gradient text-xl">
                      India Creative Star
                    </span>
                  </div>
                </div>
                <Award className="h-12 w-12 text-creative-yellow" />
              </div>
              
              <div className="text-center py-8">
                <h3 className="text-2xl font-playfair font-bold mb-2">Certificate of Participation</h3>
                <p className="text-creative-purple/70 mb-4">This certifies that</p>
                <p className="text-xl font-bold border-b border-creative-purple/20 pb-1 mb-4">[Your Name]</p>
                <p className="text-creative-purple/70 mb-6">
                  has successfully participated in the India Creative Star Challenge
                  <br />in the category of [Art/Poetry] for the theme "Colors of Emotions"
                </p>
                <div className="flex justify-center">
                  <div className="border-2 border-creative-yellow px-4 py-2 rounded-full text-creative-yellow text-xs font-bold">
                    OFFICIALLY VERIFIED
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-xs text-creative-purple/60">
                <span>April 2025</span>
                <span>Certificate ID: ICS-2025-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
