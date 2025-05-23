import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowLeft, Clock, Info, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationModal } from "@/components/RegistrationModal";
import { useNavigate } from "react-router-dom";

export default function CompetitionSelect() {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-creative-purple/5 via-white to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-creative-purple/5 text-creative-purple"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sikkim Creative <span className="text-gradient">Art Competition</span>
          </h1>
          <p className="text-creative-purple/80 text-lg max-w-2xl mx-auto">
            Showcase your artistic talent and win from a prize pool of ₹30,000
          </p>
        </div>
        
        <div className="flex justify-center">
          {/* Art Competition Card */}
          <Card 
            className="creative-card p-8 cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50/30 border-creative-blue max-w-xl w-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col items-start">
                <Badge className="mb-2 bg-creative-blue">Art Competition</Badge>
                <h2 className="text-2xl font-bold mb-1">Visual Arts Challenge</h2>
                <p className="text-creative-purple/70 text-sm mb-4">Drawing, Painting, Digital Art</p>
              </div>
              <Palette className="h-10 w-10 text-creative-blue" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-creative-purple/60" />
                <span className="text-sm">Submit photos or scans of your artwork</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-creative-purple/60" />
                <span className="text-sm">Theme: Colors of Emotions</span>
              </div>
            </div>
            
            <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-blue-100/30">
              <h3 className="font-medium mb-2 text-creative-blue">Includes:</h3>
              <ul className="text-sm space-y-2 text-creative-purple/80">
                <li>• Cash prizes from ₹30,000 prize pool</li>
                <li>• Digital certificate for all participants</li>
                <li>• eBook anthology feature</li>
                <li>• Digital gallery showcase</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-bold text-creative-purple">Free Entry</span>
                <Badge variant="outline" className="ml-2 text-creative-yellow border-creative-yellow/30">Limited Time</Badge>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="creative-btn">
                    Enter Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glassmorphism border-indigo-100/40">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-playfair">
                      Confirm Your Entry
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="py-6">
                    <p className="mb-4 text-creative-purple/90">You're about to enter the Art Competition with the theme "Colors of Emotions".</p>
                    <p className="mb-6 text-sm text-creative-purple/70">Entry fee: Free</p>
                    
                    <RegistrationModal 
                      contestType="art" 
                      buttonText="Proceed to Registration" 
                      buttonClassName="w-full creative-btn"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 bg-white/70 border border-indigo-100/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
            <Clock className="h-4 w-4 text-creative-yellow animate-pulse" />
            <span className="text-sm text-creative-purple/90">Free entry for a limited time!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
