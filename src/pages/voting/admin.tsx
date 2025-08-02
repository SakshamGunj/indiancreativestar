import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Image {
  url: string;
  id: number;
  votes: number;
}

const AdminPage: React.FC = () => {

  const [images, setImages] = useState<Image[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      fetch('/image.json')
        .then(response => response.json())
        .then((data: string[]) => {
          const formattedImages = data.map((url, index) => ({ url, id: index, votes: 0 }));
          // Fetch vote counts from Firestore
          getDocs(collection(db, "votes")).then(snapshot => {
            const votesCount: { [key: number]: number } = {};
            let totalVoteCount = 0;
            snapshot.forEach(doc => {
              const { votedImages } = doc.data();
              totalVoteCount++;
              votedImages.forEach((id: number) => {
                if (votesCount[id]) {
                  votesCount[id]++;
                } else {
                  votesCount[id] = 1;
                }
              });
            });
            const augmentedImages = formattedImages.map(image => ({
              ...image,
              votes: votesCount[image.id] || 0,
            }));
            // Sort by votes (highest first)
            augmentedImages.sort((a, b) => b.votes - a.votes);
            setImages(augmentedImages);
            setTotalVotes(totalVoteCount);
            setLoading(false);
          });
        })
        .catch(error => {
          console.error('Error loading images:', error);
          setLoading(false);
        });
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (password === 'daamieventss1234@@89') {
      setAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const openImagePreview = (index: number) => {
    setCurrentImageIndex(index);
    setShowImagePreview(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeImagePreview = () => {
    setShowImagePreview(false);
    document.body.style.overflow = '';
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    } else {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600 text-sm">Enter password to view voting results</p>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="glassmorphism p-4 rounded-lg border border-white/10 flex flex-col justify-between"
            >
              <div className="mb-4 overflow-hidden rounded-md">
                <img 
                  src={image.url} 
                  alt={`Artwork ${image.id}`} 
                  className="w-full h-auto object-cover aspect-square transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-semibold truncate text-center mb-1">
                  Votes: {image.votes}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

