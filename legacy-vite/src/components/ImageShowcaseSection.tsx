import { Badge } from "@/components/ui/badge";

const showcaseImages = [
  {
    id: 1,
    imageUrl: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    alt: "Abstract colorful painting by a happy artist",
  },
  {
    id: 2,
    imageUrl: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1",
    alt: "Close-up of a sculpture by a happy artist",
  },
  {
    id: 3,
    imageUrl: "https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    alt: "Person writing poetry, a happy artist",
  },
  {
    id: 4,
    imageUrl: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
    alt: "Art supplies and canvas of a happy artist",
  },
  {
    id: 5,
    imageUrl: "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    alt: "Digital art on a tablet by a happy artist",
  },
  {
    id: 6,
    imageUrl: "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1",
    alt: "Handwritten poem on paper by a happy artist",
  },
  {
    id: 7,
    imageUrl: "https://images.pexels.com/photos/269362/pexels-photo-269362.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    alt: "Artist painting outdoors, a happy artist",
  },
  {
    id: 8,
    imageUrl: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
    alt: "Close-up of a typewriter with paper, by a happy artist",
  },
];

export function ImageShowcaseSection() {
  return (
    <section className="section-padding bg-muted/20" id="image-showcase">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Our Creative Community</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient from-creative-indigo via-creative-purple to-creative-pink mb-4">Some of our happy artists</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore a collection of inspiring visuals from our talented community members.
          </p>
        </div>

        <div 
          className="columns-2 sm:columns-3 md:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
        >
          {showcaseImages.map((image) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-lg shadow-lg group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 break-inside-avoid"
            >
              <img 
                src={image.imageUrl} 
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 