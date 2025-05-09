
import { Badge } from "@/components/ui/badge";

export function AboutVideoSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/80" id="about-video">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3">
            <Badge className="bg-gradient-to-r from-creative-purple to-creative-pink text-white px-3 py-1">
              About Us
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-4">What is Indian Creative Star?</h2>
          <p className="text-muted-foreground text-xl mb-8">
            India's premier platform for discovering, recognizing and celebrating visual artists and poets from across the nation.
          </p>
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
      </div>
    </section>
  );
}
