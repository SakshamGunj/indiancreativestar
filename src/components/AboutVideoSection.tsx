import { Badge } from "@/components/ui/badge";
import { BookOpen, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import firstPlaceBadgeAnimation from "../../public/lottiejson/first-place-badge.json";

export function AboutVideoSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/80" id="about-video">
      <div className="container">
        <div className="relative text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1">
              About Us
            </Badge>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center md:text-left flex-1 order-2 md:order-1">
              <h2 className="text-4xl font-bold text-gradient mb-4">What is Indian Creative Star?</h2>
              <p className="text-muted-foreground text-xl">
                India's premier platform for discovering, recognizing and celebrating visual artists from across the nation.
              </p>
            </div>
            
            <div className="w-40 h-40 md:w-44 md:h-44 mx-auto shrink-0 order-1 md:order-2 border border-white/10 rounded-lg overflow-hidden">
              <Lottie 
                animationData={firstPlaceBadgeAnimation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
        
        <div className="creative-card p-4 md:p-6 bg-gradient-to-br from-black/80 to-creative-purple/20 border-creative-purple/30 mb-12 max-w-4xl mx-auto">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/OZjsl-Of4lg?si=t-BLmymsOQTwPq1Z&autoplay=1&mute=1&loop=1&playlist=OZjsl-Of4lg" 
              title="Indian Creative Star - Season 1" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-blue/10 text-center">
            <h3 className="text-xl font-bold mb-3">Discover Your Potential</h3>
            <p className="text-muted-foreground">
              Indian Creative Star provides a platform for both emerging and established artists and poets to showcase their talent on a national stage.
            </p>
          </div>
          
          <div className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-pink/10 text-center">
            <h3 className="text-xl font-bold mb-3">Expert Jury</h3>
            <p className="text-muted-foreground">
              Your work will be reviewed by our panel of industry experts, giving you valuable feedback and recognition.
            </p>
          </div>
          
          <div className="creative-card p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-black/80 to-creative-yellow/10 text-center">
            <h3 className="text-xl font-bold mb-3">National Exposure</h3>
            <p className="text-muted-foreground">
              Get featured in our digital gallery, eMagazine, and across our social media platforms reaching thousands of art enthusiasts.
            </p>
          </div>
        </div>
        
        {/* Premium eMagazine Feature */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="creative-card p-6 sm:p-8 bg-gradient-to-br from-black/80 to-creative-purple/20 border-creative-purple/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="text-left mb-6">
                  <h3 className="text-3xl font-bold text-gradient mb-3">Get Published in Our Hall of Fame</h3>
                  <p className="text-lg text-white/80">
                    Top entries will be featured in our exclusive India's Creative Star Magazine Volume 1, 
                    showcasing exceptional artwork to thousands across the country.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-creative-purple/20 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-creative-purple" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">Professional Publishing</h4>
                      <p className="text-sm text-white/70">Your work professionally edited and beautifully presented</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-creative-yellow/20 flex items-center justify-center shrink-0">
                      <Globe className="h-5 w-5 text-creative-yellow" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">Digital Distribution</h4>
                      <p className="text-sm text-white/70">Available on multiple platforms for maximum exposure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-creative-blue/20 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-creative-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">Artist Profile</h4>
                      <p className="text-sm text-white/70">Includes your bio and contact information for opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-full flex items-center justify-center">
                <div className="relative w-full max-w-[280px] mx-auto">
                  <img 
                    src="/images/Indiancreativestarmagazine.png" 
                    alt="India's Creative Star Magazine Volume 1" 
                    className="w-full h-auto object-cover rounded-lg shadow-xl" 
                  />
                  <div className="absolute -top-4 -right-4 bg-creative-yellow text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                    Volume 1
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1 rounded-full text-xs border border-white/20">
                    Limited Edition Publication
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button className="creative-btn group text-base font-bold py-2.5 px-6 h-auto">
                Enter the Competition
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
