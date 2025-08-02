import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

interface Image {
  id: number;
  url: string;
}

const VotingPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [votesRemaining, setVotesRemaining] = useState<number>(3);
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [votingCompleted, setVotingCompleted] = useState<boolean>(false);

  const voteLimit = 3;

  // Fetch images and load user's votes from local storage
  useEffect(() => {
    fetch(`/image.json?v=${Date.now()}`)
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status}`)))
      .then((data: string[]) => {
        const formattedImages = data.map((url, index) => ({ url, id: index }));
        setImages(formattedImages);
      })
      .catch(error => console.error("Error loading images:", error));

    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      const parsedVotes = JSON.parse(storedVotes);
      setSelectedImages(parsedVotes);
      setVotesRemaining(voteLimit - parsedVotes.length);
    }

    if (localStorage.getItem('votingCompleted') === 'true') {
      setVotingCompleted(true);
    }
  }, []);

  // Disable body scroll when image preview is open
  useEffect(() => {
    document.body.style.overflow = showImagePreview ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImagePreview]);

  const handleImageClick = (imageId: number) => {
    if (votingCompleted) return;

    const isSelected = selectedImages.includes(imageId);
    let newSelection: number[];

    if (isSelected) {
      newSelection = selectedImages.filter(id => id !== imageId);
    } else {
      if (selectedImages.length >= voteLimit) {
        alert(`You can only vote for up to ${voteLimit} images.`);
        return;
      }
      newSelection = [...selectedImages, imageId];
    }

    setSelectedImages(newSelection);
    setVotesRemaining(voteLimit - newSelection.length);
    localStorage.setItem('userVotes', JSON.stringify(newSelection));
  };

  const openImagePreview = (index: number) => {
    setCurrentImageIndex(index);
    setShowImagePreview(true);
  };

  const closeImagePreview = () => {
    setShowImagePreview(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const getDeviceIdentifier = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const handleSubmitVotes = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to vote.');
      return;
    }

    try {
      await addDoc(collection(db, "votes"), {
        votedImages: selectedImages,
        timestamp: new Date(),
        deviceIdentifier: getDeviceIdentifier(),
      });
      alert('Votes submitted successfully!');
      localStorage.setItem('votingCompleted', 'true');
      localStorage.removeItem('userVotes');
      setVotingCompleted(true);
      setSelectedImages([]);
      setVotesRemaining(voteLimit);
    } catch (e) {
      console.error("Error submitting votes: ", e);
      alert('Error submitting votes. Please try again.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Art Gallery
          </h1>
          <div className="flex items-center space-x-4">
            {votingCompleted ? (
              <div className="px-4 py-2 bg-green-600/80 text-white rounded-lg text-sm font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voting Done
              </div>
            ) : (
              <>
                <div className="px-3 py-2 bg-gray-800/60 rounded-lg text-sm">
                  <span className="text-gray-400">Votes Left: </span>
                  <span className="font-bold text-pink-400">{votesRemaining}</span>
                </div>
                <button
                  onClick={handleSubmitVotes}
                  disabled={selectedImages.length === 0}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Submit Votes
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Vote for Your Favorite Art</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select up to {voteLimit} artworks. Click on an image to preview it.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => openImagePreview(index)}
              >
                <img
                  src={image.url}
                  alt={`Artwork ${image.id}`}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold">View</h3>
                </div>
              </div>
              {!votingCompleted && (
                <div className="p-4">
                  <button
                    onClick={() => handleImageClick(image.id)}
                    className={`w-full px-4 py-2 rounded-lg font-bold text-white transition-all duration-300
                      ${selectedImages.includes(image.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                  >
                    {selectedImages.includes(image.id) ? 'Voted' : 'Vote'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Image Preview Modal using a Portal */}
      {showImagePreview && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeImagePreview}
        >
          {/* Main container for image and controls */}
          <div
            className="relative w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={images[currentImageIndex].url}
              alt={`Preview ${images[currentImageIndex].id}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Close Button (Top Right) */}
            <button
              onClick={closeImagePreview}
              className="absolute top-4 right-4 bg-white/80 text-black w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
              aria-label="Close image preview"
            >
              &times;
            </button>

            {/* Desktop-specific controls: Previous/Next buttons on the sides */}
            <div className="hidden sm:block">
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 text-black w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-white/80 hover:scale-105 transition-all"
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 text-black w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-white/80 hover:scale-105 transition-all"
                aria-label="Next image"
              >
                &#8250;
              </button>
            </div>

            {/* Mobile-specific controls: Control bar at the bottom */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black/70 p-4 flex justify-around items-center">
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="text-white text-4xl"
                aria-label="Previous image"
              >
                &#8249;
              </button>
              {!votingCompleted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(images[currentImageIndex].id);
                  }}
                  className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 text-lg
                    ${selectedImages.includes(images[currentImageIndex].id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                  {selectedImages.includes(images[currentImageIndex].id) ? 'Voted' : 'Vote'}
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="text-white text-4xl"
                aria-label="Next image"
              >
                &#8250;
              </button>
            </div>

            {/* Vote Button for Desktop */}
            <div className="hidden sm:block">
              {!votingCompleted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(images[currentImageIndex].id);
                  }}
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300
                    ${selectedImages.includes(images[currentImageIndex].id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                  {selectedImages.includes(images[currentImageIndex].id) ? 'Voted' : 'Vote'}
                </button>
              )}
            </div>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}
    </div>
  );
};

export default VotingPage;
