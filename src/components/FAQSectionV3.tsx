import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQSectionV3 = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const faqs = [
    {
      question: "Who can participate in Indian Creative Star?",
      answer: "Anyone aged 5 and above can participate. We have separate categories for different age groups: Group A (5-8 years), Group B (9-12 years), Group C (13-17 years), and Adult (18+ years)."
    },
    {
      question: "What is the entry fee?",
      answer: "The entry fee is ₹249 for all categories. This covers registration, judging, certificate, and participation in the competition."
    },
    {
      question: "What types of art can I submit?",
      answer: "We accept all forms of visual art including paintings, drawings, digital art, sketches, and mixed media. The theme is open, so you can create anything that showcases your artistic talent."
    },
    {
      question: "How will the judging be done?",
      answer: "Judging will be done by a panel of expert artists and art educators. We use a combination of technical skill, creativity, originality, and overall impact as judging criteria."
    },
    {
      question: "When will the results be announced?",
      answer: "Results will be announced within 2-3 weeks after the submission deadline. All participants will be notified via WhatsApp and email."
    },
    {
      question: "What do winners receive?",
      answer: "Winners receive cash prizes from our ₹50,000 prize pool, official certificates, recognition on our platforms, and feature in our digital magazine. All participants receive participation certificates."
    },
    {
      question: "How do I submit my artwork?",
      answer: "After registration, you'll receive a portal link where you can upload high-quality photos of your artwork along with details about your creative process."
    },
    {
      question: "Is this competition legitimate?",
      answer: "Yes, we are a registered event management company with government partnerships. Our certificates are officially recognized and we have successfully conducted previous seasons with 500+ participants."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Indian Creative Star
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};