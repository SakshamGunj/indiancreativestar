import React, { memo, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  timestamp: string;
}

// Reduced dataset for better performance - only showing top reviews
const topReviews: Review[] = [
  {
    id: 1,
    name: "Nimesh Rai",
    review: "This competition was a wonderful experience for me. I not only got a chance to showcase my art but also learned so much throughout the journey. Winning in Group C (13–17) feels truly special, and I'm grateful to the organisers for giving us this platform.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 2,
    name: "Gracy Kami (Ghimiray)",
    review: "Thank you for giving us this opportunity 🙏🙏 I really enjoyed it ☺️ I want to participate in future also 🙏🙏🙏.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 3,
    name: "Shashi Bhusan Thakur",
    review: "I got excellent platform for my Art work and recognise with all. Thank you so much.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 4,
    name: "Ananya Sharma",
    review: "Incredible platform for artists! The feedback was constructive and the entire process was smooth. Highly recommend to all creative minds.",
    rating: 5,
    timestamp: "08/09/2025"
  },
  {
    id: 5,
    name: "Rajesh Kumar",
    review: "Best art competition I've participated in. Professional organization and fair judging. Looking forward to next season!",
    rating: 5,
    timestamp: "08/09/2025"
  }
];

const OptimizedReviewsCarousel = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % topReviews.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + topReviews.length) % topReviews.length);
  }, []);

  const currentReview = topReviews[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            What Our Artists Say 💬
          </h2>
          <p className="text-lg text-gray-600">Hear from our Season 1 participants</p>
        </div>

        {/* Optimized carousel */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-64">
            <div className="text-center">
              {/* Star rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                "{currentReview.review}"
              </blockquote>

              {/* Reviewer info */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-gray-900">{currentReview.name}</p>
                <p className="text-sm text-gray-500">Verified Participant • {currentReview.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="rounded-full p-2 h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {topReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="rounded-full p-2 h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="text-2xl font-black text-gray-900">4.9⭐</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-gray-900">300+</div>
            <div className="text-sm text-gray-600">Happy Artists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedReviewsCarousel.displayName = 'OptimizedReviewsCarousel';

export default OptimizedReviewsCarousel;