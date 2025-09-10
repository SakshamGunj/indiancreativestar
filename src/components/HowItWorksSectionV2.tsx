import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users, Upload, Award, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HowItWorksSectionV2Props {
  onRegistrationClick?: () => void;
}

export function HowItWorksSectionV2({ onRegistrationClick }: HowItWorksSectionV2Props) {
  const navigate = useNavigate();
  
  const handleEnterCompetitions = () => {
    if (onRegistrationClick) {
      onRegistrationClick();
    } else {
      navigate("/competitions");
    }
  };
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-purple-50/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            🛤️ How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple <span className="text-gradient">Step-by-Step Journey</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From registration to winning - your path to statewide recognition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Step 1: Register & Join */}
          <div className="glassmorphism-card p-8 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              1
            </div>
            <div className="mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Register & Join
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">
                Complete the simple registration form, and you'll be added to our WhatsApp group for all competition updates and guidance.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Simple one-time payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Direct support via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2: Submit Your Artwork */}
          <div className="glassmorphism-card p-8 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              2
            </div>
            <div className="mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Submit Your Artwork
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">
                You'll receive a portal link where you can easily upload photos of your artwork and provide details about your creative process.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">User-friendly submission system</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Submit any art medium or style</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3: Judging & Voting */}
          <div className="glassmorphism-card p-8 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              3
            </div>
            <div className="mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Judging & Voting
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">
                Expert judges will evaluate all entries while live public voting takes place. This dual process ensures the most deserving artists rise to the top.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Professional jury assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Public voting opportunity</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4: Results & Recognition */}
          <div className="glassmorphism-card p-8 relative group hover:scale-105 transition-all duration-300">
            <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              4
            </div>
            <div className="mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Results & Recognition
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">
                Winners are announced with great fanfare! Receive your prizes, certificates, and get featured in our exclusive e-magazine.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Prize distribution ceremony</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">e-Magazine feature</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glassmorphism-card p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Creative Journey?
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join thousands of artists who have already discovered their potential through Sikkim Creative Star. 
              It's time to showcase your talent to the world!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleEnterCompetitions}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-4 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Learn More
                <Star className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

