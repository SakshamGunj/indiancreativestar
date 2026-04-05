import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake } from 'lucide-react';

export const IntroSnowfall = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500); // Snows for 2.5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
                >
                    {/* Generate 50 snowflakes */}
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                y: -20,
                                x: Math.random() * window.innerWidth,
                                opacity: Math.random() * 0.5 + 0.3,
                                scale: Math.random() * 0.5 + 0.5,
                                rotate: Math.random() * 360,
                            }}
                            animate={{
                                y: window.innerHeight + 100,
                                x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
                                rotate: Math.random() * 360 + 360,
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2, // 2-5 seconds duration
                                ease: "linear",
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                            className="absolute top-0 text-white/80 blur-[0.5px]"
                        >
                            <Snowflake
                                size={Math.random() * 20 + 10}
                                strokeWidth={1.5}
                            />
                        </motion.div>
                    ))}

                    {/* Additional fuzzy round snow particles for depth */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            initial={{
                                y: -10,
                                x: Math.random() * window.innerWidth,
                                opacity: Math.random() * 0.8,
                            }}
                            animate={{
                                y: window.innerHeight + 50,
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                ease: "linear",
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                            className="absolute top-0 bg-white rounded-full blur-[1px]"
                            style={{
                                width: Math.random() * 6 + 2 + 'px',
                                height: Math.random() * 6 + 2 + 'px',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
