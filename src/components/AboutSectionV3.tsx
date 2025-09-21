import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Award, Globe } from "lucide-react";

export const AboutSectionV3 = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Indian Creative Star
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-3xl mx-auto">
            India's premier art competition platform connecting creative minds nationwide and celebrating artistic excellence across all age groups.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              description: "To provide a national platform for artists to showcase their talent and gain recognition"
            },
            {
              icon: Users,
              title: "Community",
              description: "Building a vibrant community of 1000+ artists across India"
            },
            {
              icon: Award,
              title: "Recognition",
              description: "Official certificates and prizes worth ₹50,000 for outstanding artists"
            },
            {
              icon: Globe,
              title: "Nationwide",
              description: "Open to all artists across India, from beginners to professionals"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};