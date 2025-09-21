import React from "react";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";

export const GallerySectionV3 = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const artworkImages = [
    "https://i.ibb.co/WvDdnrrp/ba50688142d1.jpg",
    "https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg",
    "https://i.ibb.co/1tfb4qTq/1753870691007.jpg",
    "https://i.ibb.co/hRF9fSgq/IMG-20250710-133728.jpg",
    "https://i.ibb.co/5g7k8VTJ/4ae89184da7e.jpg",
    "https://i.ibb.co/tM7Z9mXc/4ee7930e6f86.jpg",
    "https://i.ibb.co/HLdJDyP2/770cb2e47d9d.jpg",
    "https://i.ibb.co/TqvgmCQL/eb8f3507b6a6.jpg",
    "https://i.ibb.co/hJZLG60Z/c64f6f4adcec.jpg",
    "https://i.ibb.co/67YkzZH5/1000077583.jpg",
    "https://i.ibb.co/GQT1152P/1000076355.jpg",
    "https://i.ibb.co/wN8gm9Zh/1000077393.jpg"
  ];

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Previous Winners Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating incredible talent from our past competitions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworkImages.map((image, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              <LazyImage
                src={image}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600">Artists participated in previous seasons</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};