import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Upload, Eye, Trophy } from "lucide-react";

export const HowItWorksSectionV3 = () => {
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

  const steps = [
    {
      icon: UserPlus,
      title: "Register & Join",
      description: "Complete the simple registration form and join our WhatsApp group for updates",
      color: "bg-blue-500"
    },
    {
      icon: Upload,
      title: "Submit Artwork",
      description: "Upload photos of your artwork through our easy-to-use portal",
      color: "bg-purple-500"
    },
    {
      icon: Eye,
      title: "Judging & Voting",
      description: "Expert judges evaluate entries while public voting takes place",
      color: "bg-orange-500"
    },
    {
      icon: Trophy,
      title: "Winners Announced",
      description: "Winners receive prizes from our ₹50,000 prize pool and recognition",
      color: "bg-green-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple step-by-step journey from registration to winning
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 z-0" />
              )}
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};