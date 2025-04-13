import type React from 'react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';

const Hero: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const bannerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      {/* Launch Special Banner */}
      <motion.div
        className="max-w-4xl mx-auto mb-8 px-4"
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-blue-50 text-blue-600 p-3 rounded-full flex items-center justify-center text-sm md:text-base"
          whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Launch Special: First 500 users get 50% extra video credits - 43 spots remaining
        </motion.div>
      </motion.div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Transform Static Product Images Into{' '}
          <motion.span
            className="text-blue-500"
            animate={{
              color: ["#3B82F6", "#2563EB", "#1D4ED8", "#2563EB", "#3B82F6"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse"
            }}
          >
            Sales-Converting Videos
          </motion.span>
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          In Seconds
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Boost your conversion rates by up to 23% with AI-generated product videos. No video editing skills required.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center w-full sm:w-auto justify-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Boost Your Sales With Video Now
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 1 }}
            >
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>

          <motion.button
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-md flex items-center w-full sm:w-auto justify-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Watch Demo
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            >
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* File Upload Component */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <FileUpload />
        </motion.div>

        {/* Trusted By */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <p className="text-gray-500 mb-4">Trusted by 2,743+ e-commerce stores</p>
          <div className="flex justify-center space-x-6">
            {/* Placeholder for actual store logos */}
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="w-12 h-12 bg-gray-200 rounded-md"
                whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 500 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
