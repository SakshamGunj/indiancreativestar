
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, PenLine, ArrowLeft, Clock, Info, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationModal } from "@/components/RegistrationModal";
import { useNavigate } from "react-router-dom";

export default function CompetitionSelect() {
  const [selectedCompetition, setSelectedCompetition] = useState<"art" | "poetry" | null>(null);
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-background/90 to-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-white/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Competition</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the category you wish to participate in. Each category has its own unique prizes and recognition opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Art Competition Card */}
          <Card 
            className={`creative-card p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedCompetition === "art" ? "border-creative-blue ring-2 ring-creative-blue/50" : ""
            }`}
            onClick={() => setSelectedCompetition("art")}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col items-start">
                <Badge className="mb-2 bg-creative-blue">Art Competition</Badge>
                <h2 className="text-2xl font-bold mb-1">Visual Arts Challenge</h2>
                <p className="text-muted-foreground text-sm mb-4">Drawing, Painting, Digital Art</p>
              </div>
              <Palette className="h-10 w-10 text-creative-blue" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Submit photos or scans of your artwork</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Theme: Colors of Emotions</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Includes:</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Cash prizes for top 3 winners</li>
                <li>• Digital certificate for all participants</li>
                <li>• eBook anthology feature</li>
                <li>• Digital gallery showcase</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-muted-foreground line-through">₹299</span>
                <span className="text-lg font-bold ml-2">₹199</span>
                <Badge variant="outline" className="ml-2 text-creative-yellow">Early Bird</Badge>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="creative-btn">
                    Select <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glassmorphism border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-playfair">
                      Confirm Your Selection
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="py-6">
                    <p className="mb-4">You're about to enter the Art Competition with the theme "Colors of Emotions".</p>
                    <p className="mb-6 text-sm text-muted-foreground">Entry fee: ₹199 (Early Bird)</p>
                    
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
          
          {/* Poetry Competition Card */}
          <Card 
            className={`creative-card p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedCompetition === "poetry" ? "border-creative-pink ring-2 ring-creative-pink/50" : ""
            }`}
            onClick={() => setSelectedCompetition("poetry")}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col items-start">
                <Badge className="mb-2 bg-creative-pink">Poetry Competition</Badge>
                <h2 className="text-2xl font-bold mb-1">Literary Expression</h2>
                <p className="text-muted-foreground text-sm mb-4">Poems, Sonnets, Free Verse</p>
              </div>
              <PenLine className="h-10 w-10 text-creative-pink" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Submit typed PDF documents</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Theme: Colors of Emotions</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Includes:</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Cash prizes for top 3 winners</li>
                <li>• Digital certificate for all participants</li>
                <li>• eBook anthology publication</li>
                <li>• Social media feature</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-muted-foreground line-through">₹299</span>
                <span className="text-lg font-bold ml-2">₹199</span>
                <Badge variant="outline" className="ml-2 text-creative-yellow">Early Bird</Badge>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="creative-btn">
                    Select <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glassmorphism border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-playfair">
                      Confirm Your Selection
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="py-6">
                    <p className="mb-4">You're about to enter the Poetry Competition with the theme "Colors of Emotions".</p>
                    <p className="mb-6 text-sm text-muted-foreground">Entry fee: ₹199 (Early Bird)</p>
                    
                    <RegistrationModal 
                      contestType="poetry" 
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
          <p className="text-sm text-muted-foreground mb-4">
            Both competitions follow the same theme and offer similar prizes.
            <br />You can participate in both categories with separate entries.
          </p>
          
          <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
            <Clock className="h-4 w-4 text-creative-yellow animate-pulse" />
            <span className="text-sm">Early bird pricing ends soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
