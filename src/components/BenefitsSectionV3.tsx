import React from "react";
import { motion } from "framer-motion";
import { Star, Award, Users, Zap } from "lucide-react";

export const BenefitsSectionV3 = () => {
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

  const benefits = [
    {
      icon: Star,
      title: "Spotlight Moment",
      description: "Featured in our Artist Showcase reaching 50,000+ art lovers across India",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Award,
      title: "Official Badge",
      description: "Digital certificate + Artist ID that you can proudly display on LinkedIn & social media",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Artist Circle",
      description: "Join our private community of 1,000+ verified artists for collaborations & opportunities",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Zap,
      title: "Early Access",
      description: "First to know about exhibitions, contests & art opportunities before anyone else",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Every Artist Wins Something
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Because we believe every creative soul deserves recognition, growth, and a platform to shine.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};