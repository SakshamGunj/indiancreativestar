import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, ArrowRight } from "lucide-react";

interface CertificateSectionProps {
  onRegistrationClick?: () => void;
}

export function CertificateSection({ onRegistrationClick }: CertificateSectionProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-creative-purple/20 to-black">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="outline" className="mb-2 bg-black/50 border border-creative-purple/20 text-creative-purple">Official Recognition</Badge>
            <h2 className="text-4xl font-bold text-gradient mb-6">
              All Participants Receive a Digital Certificate
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Our professionally designed digital certificate is perfect for:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-white">Resume Enhancement</h3>
                  <p className="text-white/70">Add creative credentials to your professional profile</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-white">Portfolio Building</h3>
                  <p className="text-white/70">Demonstrate your commitment to your craft</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-white">Social Media Sharing</h3>
                  <p className="text-white/70">Share your achievement with friends and followers</p>
                </div>
              </li>
            </ul>
            
            <Button 
              className="creative-btn"
              onClick={onRegistrationClick}
            >
              Get Your Certificate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="creative-card p-4 sm:p-6 relative overflow-hidden group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-black/80 to-creative-purple/20">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-creative-blue/20 rounded-full blur-3xl group-hover:bg-creative-blue/30 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-creative-purple/20 rounded-full blur-3xl group-hover:bg-creative-purple/30 transition-all duration-500" />
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/certificate-template-new.png" 
                alt="Sikkim Creative Star Certificate" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <span className="text-white font-bold text-lg px-4 py-2 bg-creative-purple/80 rounded-full">Your Certificate Awaits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
