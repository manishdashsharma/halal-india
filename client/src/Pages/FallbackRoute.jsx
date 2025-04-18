import React from 'react'
import { motion } from 'motion/react';

const FallbackRoute = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    }
  };

  const decorationVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: 'easeInOut',
        delay: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-16 right-16 w-32 h-32 rounded-full border-4 border-teal-100"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.div 
          className="absolute bottom-16 left-16 w-48 h-48 rounded-full border-4 border-teal-100"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-teal-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      </div>
      
      <motion.div 
        className="max-w-md w-full text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with animation */}
        <motion.h1 
          className="text-9xl font-bold text-teal-500 relative"
          variants={numberVariants}
        >
          404
          <motion.span 
            className="absolute -top-4 -right-4 text-sm font-normal bg-teal-100 text-teal-600 px-2 py-1 rounded-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Error
          </motion.span>
        </motion.h1>
        
        {/* Message */}
        <motion.h2 
          className="text-3xl font-semibold text-gray-800 mt-6 mb-2"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>
        
        {/* Animated separator */}
        <motion.div 
          className="w-32 h-1 bg-teal-500 mx-auto my-6 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        
        {/* Brief description */}
        <motion.p 
          className="text-gray-600 mb-8"
          variants={itemVariants}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        {/* Button with hover animation */}
        <motion.button 
          className="px-8 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          Go Back
        </motion.button>
        
       
      </motion.div>
    </div>
  );
}

export default FallbackRoute