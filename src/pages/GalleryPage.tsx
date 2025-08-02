import { useState } from 'react';
import imageUrls from '../../image.json'; // Import the JSON file

export function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold font-playfair text-creative-yellow">Artwork Gallery</h1>
        <p className="text-white/80 mt-2">Art Collection</p>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imageUrls.map((url, i) => (
            <div 
              key={i} 
              className="glassmorphism p-4 rounded-lg border border-white/10 flex flex-col justify-between cursor-pointer"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <div className="mb-4 overflow-hidden rounded-md">
                <img 
                  src={url} 
                  alt={`Artwork ${i + 1}`} 
                  className="w-full h-auto object-cover aspect-square transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-semibold truncate text-center">View Artwork</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}