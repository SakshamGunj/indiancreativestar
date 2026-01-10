import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "How do I send my art?",
    answer: "Just upload a photo of your art. It's easy!"
  },
  {
    question: "Can kids join?",
    answer: "Yes! Kids 5+ can join. Parents just need to help sign up."
  },
  {
    question: "What if I don't win?",
    answer: "You still get a certificate and might be featured on our page!"
  },
  {
    question: "Can I submit multiple artworks?",
    answer: "You can submit up to 3 artworks in a single registration. Additional artworks can also be submitted."
  },
  {
    question: "How do you pick winners?",
    answer: "Expert artists judge based on creativity and skill."
  },
  {
    question: "When will the results be announced?",
    answer: "Results will be announced within 4 weeks after the submission deadline. All participants will be notified via email and WhatsApp."
  },
  {
    question: "Is there a fee?",
    answer: "Yes, a small fee of ₹249 to support the platform and prizes."
  },
  {
    question: "What art is allowed?",
    answer: "Paintings, sketches, digital art, photos... anything creative!"
  },
];

export function FAQSectionV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  console.log("FAQSectionV2 isInView:", isInView);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
      id="faq"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            ❓ FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Common <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know.
          </p>
        </div>

        <motion.div
          className="glassmorphism-card p-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="border-gray-200/50">
                  <AccordionTrigger className="text-lg font-semibold hover:text-purple-600 text-left text-gray-900 py-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Help Section */}
        <div className="text-center mt-12">
          <div className="glassmorphism-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help! Reach out to us via WhatsApp or email for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">WhatsApp Support</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

