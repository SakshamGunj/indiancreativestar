import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Heart, Gift } from "lucide-react";

export const PrizeSectionV3 = () => {
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
    <section id="prizes" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prizes & Recognition
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            ₹50,000 total prize pool across different categories
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Adult Competition */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Adult Competition</h3>
                <p className="text-gray-600">18+ Years | Prize Pool: ₹30,000</p>
              </div>
            </div>

            <div className="flex items-end justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-20 bg-gray-300 rounded-t-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="text-lg font-bold text-gray-700">₹10,000</div>
                <div className="text-xs text-gray-500">Silver</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-28 bg-yellow-400 rounded-t-lg flex items-center justify-center mb-2 relative">
                  <span className="text-white font-bold text-xl">1</span>
                  <Trophy className="absolute -top-2 -right-2 h-4 w-4 text-orange-500" />
                </div>
                <div className="text-xl font-bold text-orange-600">₹15,000</div>
                <div className="text-xs text-gray-500">Gold</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-400 rounded-t-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-lg font-bold text-orange-600">₹5,000</div>
                <div className="text-xs text-gray-500">Bronze</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-3 text-center">All Winners Receive</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-green-500" />
                  <span>National Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-blue-500" />
                  <span>e-Magazine Feature</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-purple-500" />
                  <span>Surprise Hamper</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-orange-500" />
                  <span>Mystery Gift</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kids Competition */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Kids Competition</h3>
                <p className="text-gray-600">5-17 Years | Prize Pool: ₹20,000</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Group A (5-8 years)</h4>
                      <p className="text-sm text-gray-600">Little Artists</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">₹5,000</p>
                    <p className="text-xs text-gray-500">Winner</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Group B (9-12 years)</h4>
                      <p className="text-sm text-gray-600">Young Creators</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">₹5,000</p>
                    <p className="text-xs text-gray-500">Winner</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Group C (13-17 years)</h4>
                      <p className="text-sm text-gray-600">Teen Artists</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">₹10,000</p>
                    <p className="text-xs text-gray-500">Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};