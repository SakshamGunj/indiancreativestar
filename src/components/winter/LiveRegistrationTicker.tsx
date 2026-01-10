import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Palette, CheckCircle } from 'lucide-react';

const DUMMY_REGISTRATIONS = [
    // THREE WORD NAMES (20)
    { name: "Aarav Kumar Sharma", age: 22, count: 2 },
    { name: "Zara Fatima Khan", age: 21, count: 3 },
    { name: "Priya Rose Thomas", age: 20, count: 1 },
    { name: "Mohammed Arif Hassan", age: 23, count: 2 },
    { name: "Ananya Dev Patel", age: 19, count: 3 },
    { name: "Joshua David Kumar", age: 24, count: 1 },
    { name: "Ishaan Roy Choudhury", age: 21, count: 2 },
    { name: "Aisha Noor Ahmed", age: 20, count: 3 },
    { name: "Sarah Grace Fernandes", age: 22, count: 1 },
    { name: "Rohan Singh Rajput", age: 23, count: 2 },
    { name: "Fatima Zahra Sheikh", age: 19, count: 3 },
    { name: "Daniel John D'Souza", age: 21, count: 1 },
    { name: "Advait Mohan Desai", age: 20, count: 2 },
    { name: "Zainab Malik Siddiqui", age: 22, count: 3 },
    { name: "Michelle Anne George", age: 23, count: 1 },
    { name: "Arjun Pratap Singh", age: 19, count: 2 },
    { name: "Ayesha Bi Pathan", age: 21, count: 3 },
    { name: "Rachel Mary Joseph", age: 20, count: 1 },
    { name: "Kabir Dev Mehta", age: 22, count: 2 },
    { name: "Safiya Khan Rizvi", age: 24, count: 3 },

    // TWO WORD NAMES (100)
    { name: "Aditya Verma", age: 21, count: 2 },
    { name: "Mariam Sheikh", age: 19, count: 1 },
    { name: "Kevin Thomas", age: 23, count: 3 },
    { name: "Diya Sharma", age: 20, count: 2 },
    { name: "Imran Ali", age: 22, count: 1 },
    { name: "Priyanka Nair", age: 21, count: 3 },
    { name: "Abdul Rahman", age: 19, count: 2 },
    { name: "Jessica Mathew", age: 24, count: 1 },
    { name: "Vihaan Gupta", age: 20, count: 3 },
    { name: "Sana Qureshi", age: 22, count: 2 },
    { name: "Ryan Gomes", age: 21, count: 1 },
    { name: "Kavya Reddy", age: 19, count: 3 },
    { name: "Farhan Khan", age: 23, count: 2 },
    { name: "Natasha D'Cruz", age: 20, count: 1 },
    { name: "Aryan Malhotra", age: 22, count: 3 },
    { name: "Nida Ansari", age: 21, count: 2 },
    { name: "Aaron Samuel", age: 19, count: 1 },
    { name: "Saanvi Iyer", age: 24, count: 2 },
    { name: "Rehan Ahmed", age: 20, count: 3 },
    { name: "Lisa Francis", age: 22, count: 1 },
    { name: "Vivaan Kapoor", age: 21, count: 2 },
    { name: "Aliya Mirza", age: 19, count: 3 },
    { name: "Joel Peter", age: 23, count: 1 },
    { name: "Anaya Banerjee", age: 20, count: 2 },
    { name: "Zaid Malik", age: 22, count: 3 },
    { name: "Stella Rodrigues", age: 21, count: 1 },
    { name: "Dhruv Joshi", age: 19, count: 2 },
    { name: "Amina Begum", age: 24, count: 3 },
    { name: "Austin Varghese", age: 20, count: 1 },
    { name: "Myra Chatterjee", age: 22, count: 2 },
    { name: "Yusuf Ibrahim", age: 21, count: 3 },
    { name: "Natalie James", age: 19, count: 1 },
    { name: "Aadhya Pillai", age: 23, count: 2 },
    { name: "Hamza Siddiqui", age: 20, count: 3 },
    { name: "Emma Wilson", age: 22, count: 1 },
    { name: "Shivansh Pandey", age: 21, count: 2 },
    { name: "Riya Khan", age: 19, count: 3 },
    { name: "Brandon Pereira", age: 24, count: 1 },
    { name: "Kiara Rao", age: 20, count: 2 },
    { name: "Aamir Hassan", age: 22, count: 3 },
    { name: "Chloe D'Silva", age: 21, count: 1 },
    { name: "Reyansh Saxena", age: 19, count: 2 },
    { name: "Samira Patel", age: 23, count: 3 },
    { name: "Nathan Philip", age: 20, count: 1 },
    { name: "Navya Menon", age: 22, count: 2 },
    { name: "Bilal Sheikh", age: 21, count: 3 },
    { name: "Grace Anthony", age: 19, count: 1 },
    { name: "Atharv Mishra", age: 24, count: 2 },
    { name: "Zoya Shaikh", age: 20, count: 3 },
    { name: "Ethan Paul", age: 22, count: 1 },
    { name: "Ira Bose", age: 21, count: 2 },
    { name: "Faizan Akhtar", age: 19, count: 3 },
    { name: "Olivia Fernandez", age: 23, count: 1 },
    { name: "Ayaan Agarwal", age: 20, count: 2 },
    { name: "Hiba Ansari", age: 22, count: 3 },
    { name: "Samuel John", age: 21, count: 1 },
    { name: "Shanaya Kaur", age: 19, count: 2 },
    { name: "Mustafa Ali", age: 24, count: 3 },
    { name: "Isabella Mathews", age: 20, count: 1 },
    { name: "Arnav Dubey", age: 22, count: 2 },
    { name: "Laiba Qureshi", age: 21, count: 3 },
    { name: "Lucas George", age: 19, count: 1 },
    { name: "Pari Sinha", age: 23, count: 2 },
    { name: "Ayan Khan", age: 20, count: 3 },
    { name: "Maya Thomas", age: 22, count: 1 },
    { name: "Rudra Bhatt", age: 21, count: 2 },
    { name: "Noor Fatima", age: 19, count: 3 },
    { name: "Joshua Matthew", age: 24, count: 1 },
    { name: "Tara Chopra", age: 20, count: 2 },
    { name: "Adil Ahmad", age: 22, count: 3 },
    { name: "Sophie Martin", age: 21, count: 1 },
    { name: "Veer Khanna", age: 19, count: 2 },
    { name: "Isha Mohammed", age: 23, count: 3 },
    { name: "Andrew Simon", age: 20, count: 1 },
    { name: "Avni Srivastava", age: 22, count: 2 },
    { name: "Arham Sheikh", age: 21, count: 3 },
    { name: "Rebecca David", age: 19, count: 1 },
    { name: "Krishna Patel", age: 24, count: 2 },
    { name: "Maira Hassan", age: 20, count: 3 },
    { name: "Jason Christopher", age: 22, count: 1 },
    { name: "Anika Yadav", age: 21, count: 2 },
    { name: "Ibrahim Rizvi", age: 19, count: 3 },
    { name: "Hannah Joseph", age: 23, count: 1 },
    { name: "Vedant Jain", age: 20, count: 2 },
    { name: "Samaira Ali", age: 22, count: 3 },
    { name: "Daniel Mark", age: 21, count: 1 },
    { name: "Siya Mehrotra", age: 19, count: 2 },
    { name: "Fahad Sheikh", age: 24, count: 3 },
    { name: "Emily Rose", age: 20, count: 1 },
    { name: "Shaurya Tiwari", age: 22, count: 2 },
    { name: "Rabia Khan", age: 21, count: 3 },
    { name: "Benjamin Luke", age: 19, count: 1 },
    { name: "Mira Deshmukh", age: 23, count: 2 },
    { name: "Salman Ahmed", age: 20, count: 3 },
    { name: "Sophia Anna", age: 22, count: 1 },
    { name: "Aarush Singhal", age: 21, count: 2 },
    { name: "Dania Hussain", age: 19, count: 3 },
    { name: "Gabriel Thomas", age: 24, count: 1 },
    { name: "Ishita Bajaj", age: 20, count: 2 },

    // ONE WORD NAMES (50)
    { name: "Kabir", age: 22, count: 1 },
    { name: "Zara", age: 19, count: 2 },
    { name: "Joel", age: 21, count: 3 },
    { name: "Ananya", age: 20, count: 1 },
    { name: "Ayaan", age: 23, count: 2 },
    { name: "Rachel", age: 22, count: 3 },
    { name: "Arjun", age: 19, count: 1 },
    { name: "Aisha", age: 24, count: 2 },
    { name: "Nathan", age: 21, count: 3 },
    { name: "Diya", age: 20, count: 1 },
    { name: "Imran", age: 22, count: 2 },
    { name: "Sarah", age: 19, count: 3 },
    { name: "Vihaan", age: 23, count: 1 },
    { name: "Noor", age: 21, count: 2 },
    { name: "Ryan", age: 20, count: 3 },
    { name: "Kavya", age: 22, count: 1 },
    { name: "Farhan", age: 19, count: 2 },
    { name: "Emma", age: 24, count: 3 },
    { name: "Rohan", age: 21, count: 1 },
    { name: "Zoya", age: 20, count: 2 },
    { name: "Aaron", age: 22, count: 3 },
    { name: "Myra", age: 19, count: 1 },
    { name: "Rehan", age: 23, count: 2 },
    { name: "Maya", age: 21, count: 3 },
    { name: "Ethan", age: 20, count: 1 },
    { name: "Saanvi", age: 22, count: 2 },
    { name: "Yusuf", age: 19, count: 3 },
    { name: "Sophia", age: 24, count: 1 },
    { name: "Advait", age: 21, count: 2 },
    { name: "Aliya", age: 20, count: 3 },
    { name: "Samuel", age: 22, count: 1 },
    { name: "Navya", age: 19, count: 2 },
    { name: "Hamza", age: 23, count: 3 },
    { name: "Grace", age: 21, count: 1 },
    { name: "Shivansh", age: 20, count: 2 },
    { name: "Hiba", age: 22, count: 3 },
    { name: "Joshua", age: 19, count: 1 },
    { name: "Kiara", age: 24, count: 2 },
    { name: "Adil", age: 21, count: 3 },
    { name: "Hannah", age: 20, count: 1 },
    { name: "Dhruv", age: 22, count: 2 },
    { name: "Laiba", age: 19, count: 3 },
    { name: "Benjamin", age: 23, count: 1 },
    { name: "Shanaya", age: 21, count: 2 },
    { name: "Bilal", age: 20, count: 3 },
    { name: "Olivia", age: 22, count: 1 },
    { name: "Arnav", age: 19, count: 2 },
    { name: "Maira", age: 24, count: 3 },
    { name: "Daniel", age: 21, count: 1 },
    { name: "Ira", age: 20, count: 2 },

    // INITIAL FORMAT NAMES (30)
    { name: "A. Manish", age: 22, count: 3 },
    { name: "K. Kumar", age: 19, count: 1 },
    { name: "S. Mohammed", age: 21, count: 2 },
    { name: "P. Fernandes", age: 20, count: 3 },
    { name: "R. Sharma", age: 23, count: 1 },
    { name: "F. Khan", age: 22, count: 2 },
    { name: "J. Thomas", age: 19, count: 3 },
    { name: "N. Patel", age: 24, count: 1 },
    { name: "M. Ahmed", age: 21, count: 2 },
    { name: "D. George", age: 20, count: 3 },
    { name: "V. Reddy", age: 22, count: 1 },
    { name: "Z. Hussain", age: 19, count: 2 },
    { name: "L. Matthew", age: 23, count: 3 },
    { name: "B. Gupta", age: 21, count: 1 },
    { name: "I. Qureshi", age: 20, count: 2 },
    { name: "C. D'Souza", age: 22, count: 3 },
    { name: "H. Mishra", age: 19, count: 1 },
    { name: "A. Sheikh", age: 24, count: 2 },
    { name: "E. Joseph", age: 21, count: 3 },
    { name: "T. Singh", age: 20, count: 1 },
    { name: "Y. Malik", age: 22, count: 2 },
    { name: "G. Samuel", age: 19, count: 3 },
    { name: "S. Iyer", age: 23, count: 1 },
    { name: "R. Ali", age: 21, count: 2 },
    { name: "O. Rodrigues", age: 20, count: 3 },
    { name: "W. Rao", age: 22, count: 1 },
    { name: "U. Ansari", age: 19, count: 2 },
    { name: "X. Peter", age: 24, count: 3 },
    { name: "Q. Kapoor", age: 21, count: 1 },
    { name: "M. Siddiqui", age: 20, count: 2 }
];

interface LiveRegistrationTickerProps {
    isVisible?: boolean;
}

export const LiveRegistrationTicker = ({ isVisible = true }: LiveRegistrationTickerProps) => {
    const [currentReg, setCurrentReg] = useState<typeof DUMMY_REGISTRATIONS[0] | null>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;

        const showNext = () => {
            const randomReg = DUMMY_REGISTRATIONS[Math.floor(Math.random() * DUMMY_REGISTRATIONS.length)];
            setCurrentReg(randomReg);

            // Hide after 4 seconds
            timeoutId = setTimeout(() => {
                setCurrentReg(null);

                // Schedule next show after a random delay (3-10 seconds)
                const nextDelay = Math.random() * 7000 + 3000; // 3000ms to 10000ms
                intervalId = setTimeout(showNext, nextDelay);
            }, 4000);
        };

        // Initial delay
        const initialTimer = setTimeout(showNext, 2000);

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(timeoutId);
            clearTimeout(intervalId);
        };
    }, []);

    return createPortal(
        <div className={`fixed top-24 left-6 z-[9999] pointer-events-none transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <AnimatePresence mode="wait">
                {isVisible && currentReg && (
                    <motion.div
                        key={currentReg.name}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="group relative"
                    >
                        {/* Outer Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-yellow-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                        <div className="bg-[#050510]/80 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3 min-w-[240px] max-w-[280px] pointer-events-auto relative overflow-hidden">
                            {/* Animated Border Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-yellow-500/10 opacity-30"></div>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-shimmer"></div>

                            {/* Avatar Section */}

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                                            <CheckCircle className="w-3 h-3 text-blue-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Verified</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">via Daami</span>
                                    </div>

                                    {/* Pulsating Live Dot */}
                                    <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                        <span className="text-[8px] font-bold text-red-400 uppercase tracking-wider">Live</span>
                                    </div>
                                </div>

                                <h4 className="text-white text-base font-bilderberg tracking-wide leading-none mb-2">
                                    {currentReg.name}
                                </h4>

                                <div className="flex items-center gap-2">
                                    <span className="text-white/40 text-[10px] tabular-nums font-mono">{currentReg.age} YRS</span>
                                    <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                    <p className="text-blue-100/60 text-[11px] font-medium">
                                        Registered for <span className="text-yellow-400 font-bold">{currentReg.count}</span> {currentReg.count > 1 ? 'Artworks' : 'Artwork'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>,
        document.body
    );
};
