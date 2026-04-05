import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

export const TestimonialsSectionV3 = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const testimonials = [
    {
      name: "Anjali Sharma",
      quote: "Very professional management! My daughter participated and felt so motivated. Finally, an art platform that respects young talent.",
      avatar: "A",
      rating: 5
    },
    {
      name: "Rizwan Khan", 
      quote: "As an artist, I joined Sikkim Creative Star Season 1 and now I'm here again for Season 2. The team keeps improving every year.",
      avatar: "R",
      rating: 5
    },
    {
      name: "Priya Das",
      quote: "Honestly, I didn't expect such smooth coordination. From registration to updates, everything was managed really well.",
      avatar: "P", 
      rating: 5
    },
    {
      name: "Arvind Mehta",
      quote: "This competition is not just about prizes, it's about recognition. Artists finally have a stage where their creativity is valued.",
      avatar: "A",
      rating: 5
    },
    {
      name: "Meera Kapoor",
      quote: "My son participated, and I was amazed at the exposure he got. It really boosts children's confidence.",
      avatar: "M",
      rating: 5
    },
    {
      name: "Sana Fatima",
      quote: "I joined this competition because I believe art needs recognition. The organizers actually care about artists.",
      avatar: "S",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Artists Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community of talented artists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};