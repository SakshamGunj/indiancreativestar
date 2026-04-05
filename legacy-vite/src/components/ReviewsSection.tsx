import React, { useState, useRef } from 'react';
import { Star, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, useInView } from "framer-motion";

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  timestamp: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sunil Gurung",
    review: "Good",
    rating: 3,
    timestamp: "08/09/2025"
  },
  {
    id: 2,
    name: "Nimesh Rai",
    review: "This competition was a wonderful experience for me. I not only got a chance to showcase my art but also learned so much throughout the journey. Winning in Group C (13–17) feels truly special, and I'm grateful to the organisers for giving us this platform. Thank you to everyone who supported me!",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 3,
    name: "Gracy Kami (Ghimiray)",
    review: "Thank you for giving us this opportunity 🙏🙏 I really enjoyed it ☺️ I want to participate in future also 🙏🙏🙏.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 4,
    name: "Shashi Bhusan Thakur",
    review: "I got excellent platform for my Art work and recognise with all. Thank you so much.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 5,
    name: "Kishor Chettri",
    review: "Everything was good but the thing is painting and pencil sketches cannot compete in one stage like painting should have a different group and sketch should have a different group because painting will always have an upper hand theres no way a sketch beats a painting in a competition so i suggest u to make different groups for painting and sketch from the next time",
    rating: 4,
    timestamp: "08/09/2025"
  },
  {
    id: 6,
    name: "Aakriti Thakur",
    review: "Very good opportunity for kids, thank you.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 7,
    name: "Mngma Tamang",
    review: "It was really good ,and it can help us to next competitive level thankyou to daami events",
    rating: 4,
    timestamp: "08/09/2025"
  },
  {
    id: 8,
    name: "Pramita Pradhan",
    review: "This was my first art competition, and as a beginner who loves painting, the experience has been truly wonderful. The organisers, Daami Event, provided us with a great opportunity and an amazing platform for artists to showcase their work and be seen.",
    rating: 4,
    timestamp: "08/09/2025"
  },
  {
    id: 9,
    name: "Yonten Phuntshok Tamang",
    review: "It was too good",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 10,
    name: "Ojashwi Pakhrin",
    review: "Thank you for this wonderful opportunity to represent myself. In my opinion next time there should also be a second and third place in the kids category.With reference to the adult category.",
    rating: 4,
    timestamp: "08/09/2025"
  },
  {
    id: 11,
    name: "Kewal Rai",
    review: "You guys are doing great just keep organising competition like this so artist's can improve more",
    rating: 4,
    timestamp: "09/09/2025"
  },
  {
    id: 12,
    name: "Biswajyoti Sarma",
    review: "Good experience",
    rating: 5,
    timestamp: "09/09/2025"
  },
  {
    id: 13,
    name: "Satish Paswan",
    review: "It was a wonderful experience participating in this creative art competition. The platform gave artists like me an opportunity to express our creativity and showcase our talent to a wider audience. The organization was smooth, the guidelines were clear, and the process was well-structured. I truly appreciate the effort put in by the team to encourage and motivate artists through such events. Looking forward to more such initiatives in the future!",
    rating: 5,
    timestamp: "09/09/2025"
  }
];

const TestimonialsSection: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  console.log("TestimonialsSection isInView:", isInView);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const openReviewModal = (review: Review) => {
    setSelectedReview(review);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
  };

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Artists Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the talented artists who have participated in our competitions and experienced the magic of Indian Creative Star
          </p>
        </div>

        {/* Reviews Grid - Desktop */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              onClick={() => openReviewModal(review)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full cursor-pointer"
            >
              {/* Header with name and verification */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-lg truncate">
                    {review.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">
                      Google
                    </span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                  {review.timestamp}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                {renderStars(review.rating)}
                <span className="ml-2 text-xs sm:text-sm text-gray-600">
                  {review.rating}/5
                </span>
              </div>

              {/* Review Text */}
              <div className="flex-grow mb-3 sm:mb-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
                }}>
                  "{review.review}"
                </p>
              </div>

              {/* Google Reviews Badge */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Verified by Google Reviews
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Sliding Reviews */}
        <div className="md:hidden overflow-hidden h-[700px] relative">
          {/* Top Gradient Fade */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-50 via-pink-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 via-pink-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-slide-up-continuous">
            {/* First set of reviews */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  onClick={() => openReviewModal(review)}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-[180px] cursor-pointer"
                >
                  {/* Header with name and verification */}
                  <div className="flex flex-col mb-2 gap-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-gray-900 text-xs truncate">
                        {review.name}
                      </h3>
                      <div className="flex items-center space-x-1 bg-green-100 px-1 py-0.5 rounded-full flex-shrink-0">
                        <CheckCircle className="w-2 h-2 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">
                          G
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {review.timestamp}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-2 h-2 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow mb-2">
                    <p className="text-gray-700 leading-relaxed text-xs overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      "{review.review}"
                    </p>
                  </div>

                  {/* Google Reviews Badge */}
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {reviews.map((review) => (
                <div
                  key={`duplicate-${review.id}`}
                  onClick={() => openReviewModal(review)}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-[180px] cursor-pointer"
                >
                  {/* Header with name and verification */}
                  <div className="flex flex-col mb-2 gap-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-gray-900 text-xs truncate">
                        {review.name}
                      </h3>
                      <div className="flex items-center space-x-1 bg-green-100 px-1 py-0.5 rounded-full flex-shrink-0">
                        <CheckCircle className="w-2 h-2 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">
                          G
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {review.timestamp}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-2 h-2 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow mb-2">
                    <p className="text-gray-700 leading-relaxed text-xs overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      "{review.review}"
                    </p>
                  </div>

                  {/* Google Reviews Badge */}
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join 1000+ Satisfied Artists
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the same amazing journey that our artists have shared. Your creative story awaits!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(5)}
                </div>
                <span className="text-sm text-gray-600">4.4/5 Average Rating</span>
              </div>
              <div className="text-sm text-gray-500">
                Based on 1000+ reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Dialog open={!!selectedReview} onOpenChange={closeReviewModal}>
        <DialogContent hideClose className="sm:max-w-[600px] w-[90vw] max-h-[85vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          {selectedReview && (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {selectedReview.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                      {selectedReview.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <span className="text-xs sm:text-sm text-green-700 font-medium">
                          Google Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeReviewModal}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>

              {/* Rating and Date */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2">
                  {renderStars(selectedReview.rating)}
                  <span className="ml-2 text-base sm:text-lg font-semibold text-gray-700">
                    {selectedReview.rating}/5
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                  {selectedReview.timestamp}
                </span>
              </div>

              {/* Full Review Text */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Full Review
                </h4>
                <div className="bg-gray-50 rounded-2xl p-3 sm:p-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">
                    "{selectedReview.review}"
                  </p>
                </div>
              </div>

              {/* Google Reviews Badge */}
              <div className="flex items-center justify-center pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-blue-50 px-3 sm:px-4 py-2 rounded-full">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">G</span>
                  </div>
                  <span className="text-xs sm:text-sm text-blue-700 font-medium">
                    Verified by Google Reviews
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CSS Animation for Mobile Sliding */}
      <style>{`
        @keyframes slide-up-continuous {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        .animate-slide-up-continuous {
          animation: slide-up-continuous 30s linear infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default TestimonialsSection;
