import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

interface Image { 
  url: string;
  id: number;
}

const VotingPage: React.FC = () => {
  // Initialize Firebase
  
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [voteLimit, setVoteLimit] = useState<number>(3);
  const [votesRemaining, setVotesRemaining] = useState<number>(3);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [votingCompleted, setVotingCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Load images from image.json with cache busting
    fetch(`/image.json?v=${Date.now()}`)
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.get('content-type'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: string[]) => {
        console.log('Loaded images:', data.length);
        const formattedImages = data.map((url, index) => ({ url, id: index }));
        setImages(formattedImages);
      })
      .catch(error => {
        console.error('Error loading images:', error);
        console.error('Error details:', error.message);
      });

    // Load votes from local storage
    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      const parsedVotes = JSON.parse(storedVotes);
      setSelectedImages(parsedVotes);
      setVotesRemaining(voteLimit - parsedVotes.length);
    }
    
    // Check if voting is completed
    const votingCompleted = localStorage.getItem('votingCompleted');
    if (votingCompleted === 'true') {
      setVotingCompleted(true);
    }
  }, []);
  
  // Function to clear all votes from local storage
  const clearAllVotes = () => {
    localStorage.removeItem('userVotes');
    setSelectedImages([]);
    setVotesRemaining(voteLimit);
  };

  const handleImageClick = (imageId: number, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const newSelection = selectedImages.filter(id => id !== imageId);
      setSelectedImages(newSelection);
      localStorage.setItem('userVotes', JSON.stringify(newSelection));
      setVotesRemaining(voteLimit - newSelection.length);
    } else if (action === 'add') {
      if (selectedImages.length < voteLimit) {
        const newSelection = [...selectedImages, imageId];
        setSelectedImages(newSelection);
        localStorage.setItem('userVotes', JSON.stringify(newSelection));
        setVotesRemaining(voteLimit - newSelection.length);
      } else {
        alert(`You can only vote for up to ${voteLimit} images.`);
      }
    }
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };
  
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);

  const openImagePreview = (index: number) => {
    setCurrentImageIndex(index);
    setShowImagePreview(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeImagePreview = () => {
    setShowImagePreview(false);
    document.body.style.overflow = '';
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    } else {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handleSubmitVotes = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to vote.');
      return;
    }
    try {
      await addDoc(collection(db, "votes"), {
        timestamp: new Date(),
        votedImages: selectedImages,
        deviceIdentifier: getDeviceIdentifier()
      });
      alert('Votes submitted successfully!');
      localStorage.setItem('votingCompleted', 'true');
      localStorage.removeItem('userVotes');
      setSelectedImages([]);
      setVotesRemaining(voteLimit);
      setVotingCompleted(true);
      closeModal(); // Close modal after submission
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error submitting votes. Please try again.');
    }
  };

  const getDeviceIdentifier = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  return (
    <div className="container mx-auto p-2 pt-20"> {/* Adjusted padding-top for navbar */}
      {/* Black Navbar with Animation */}
      <div className="sticky top-0 left-0 right-0 backdrop-blur-md bg-black/90 z-40 transition-all duration-500 animate-fadeIn px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">Art Gallery</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {votingCompleted ? (
            <div className="font-medium px-4 py-2 bg-green-600/80 text-white rounded-lg text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">Voting Done</span>
            </div>
          ) : (
            <>
              <div className="font-medium px-3 py-2 bg-black/60 text-white rounded text-sm">
                <span className="text-gray-400">Votes: </span>
                <span className="font-bold text-pink-400">{votesRemaining}/{voteLimit}</span>
              </div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group text-sm"
                onClick={() => setShowModal(true)}
                disabled={selectedImages.length === 0}
              >
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Vote
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                {selectedImages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-bounce">
                    {selectedImages.length}
                  </span>
                )}
              </button>
            </>
          )}
          </div>
        </div>
      </div>
      
      <div className="text-center mb-4 animate-fadeIn" style={{animationDelay: '0.2s'}}>
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Vote for Your Favorite Artworks</h1>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">Select up to {voteLimit} images you like best!</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 animate-fadeIn bg-black/40 backdrop-blur-sm" 
            style={{animationDelay: `${0.1 + index * 0.05}s`}}
          >
            <div className="relative group">
              <img
                src={image.url}
                alt={`Artwork ${image.id}`}
                className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                onClick={() => openImagePreview(index)}
              />
            </div>
            {!votingCompleted && (
              <div className="p-2 bg-black/60">
                <div className="flex justify-between items-center">
                  <button
                    className={`px-2 py-1 rounded-full text-white text-xs font-medium transition-all duration-300 transform hover:scale-105 ${selectedImages.includes(image.id) 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-sm' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-sm'}`}
                    onClick={() => handleImageClick(image.id, selectedImages.includes(image.id) ? 'remove' : 'add')}
                    disabled={votesRemaining <= 0 && !selectedImages.includes(image.id)}
                  >
                    <span className="flex items-center">
                      {selectedImages.includes(image.id) ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Remove
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Vote
                        </>
                      )}
                    </span>
                  </button>
                  {/* Removed ID display to focus on artwork */}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Button removed from here and moved to navbar */}

      {/* Image Preview Modal with Glassmorphism */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fadeIn p-4">
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white/90 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl z-20 shadow-lg transform transition-transform hover:scale-105 hover:rotate-90"
              onClick={closeImagePreview}
            >
              &times;
            </button>
            
            {/* Image ID badge */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md z-20">
              Image ID: {images[currentImageIndex]?.id}
            </div>
            
            {/* Image container - takes up most of the space */}
            <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
              {images.length > 0 && (
                <img 
                  src={images[currentImageIndex]?.url} 
                  alt={`Artwork ${currentImageIndex}`} 
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300" 
                />
              )}
            </div>
            
            {/* Control buttons at the bottom - separated from image */}
            <div className="flex justify-center items-center space-x-4 bg-black/20 backdrop-blur-sm rounded-2xl p-4">
              <button
                className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center group font-medium"
                onClick={() => navigateModal('prev')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <button
                className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center group font-medium"
                onClick={() => navigateModal('next')}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Selected Images Modal with Glassmorphism */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl transform transition-all duration-500">
            <div className="p-5 flex justify-between items-center border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Selected Images
                <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {selectedImages.length} selected
                </span>
              </h2>
              <button
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 transform hover:rotate-90"
                onClick={() => setShowModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-auto p-6 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
              {selectedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xl text-gray-500 mb-2">No images selected yet</p>
                  <p className="text-gray-400">Browse the gallery and vote for your favorite artworks</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {selectedImages.map((imageId, index) => {
                    const image = images.find(img => img.id === imageId);
                    if (!image) return null;
                    
                    return (
                      <div 
                        key={image.id} 
                        className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn bg-white/80 backdrop-blur-sm" 
                        style={{animationDelay: `${0.1 + index * 0.05}s`}}
                      >
                        <div className="relative group">
                          <img
                            src={image.url}
                            alt={`Selected Artwork ${image.id}`}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button 
                              className="px-4 py-2 bg-red-500/90 text-white rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600/90"
                              onClick={() => handleImageClick(image.id, 'remove')}
                            >
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove Vote
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Artwork #{index + 1}</span>
                          <span className="text-sm text-gray-500 font-medium">ID: {image.id}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="p-5 border-t border-gray-200/50 flex justify-between items-center bg-gradient-to-r from-blue-50/80 to-purple-50/80">
              <button
                className="px-5 py-2.5 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                onClick={() => setShowModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Gallery
              </button>
              <div className="text-sm text-gray-500">
                {selectedImages.length > 0 ? 
                  `You've selected ${selectedImages.length} ${selectedImages.length === 1 ? 'image' : 'images'}` : 
                  'No images selected'}
              </div>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                onClick={handleSubmitVotes}
                disabled={selectedImages.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit All Votes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;