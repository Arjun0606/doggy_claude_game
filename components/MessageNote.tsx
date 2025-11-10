'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MessageNote() {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  if (isClosing) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Note Paper */}
      <motion.div
        className="relative bg-white rounded-3xl border-4 border-black p-8 max-w-md w-full shadow-2xl doodle-outline"
        style={{
          background: 'linear-gradient(145deg, #FFF8E7 0%, #FFF 100%)',
        }}
        whileHover={{ rotate: [0, -1, 1, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full border-3 border-black text-black font-bold text-xl transition-all hover:scale-110 z-10"
          aria-label="Close"
        >
          ×
        </button>
        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 text-4xl">🕊️</div>
        <div className="absolute -bottom-3 -left-3 text-3xl">💕</div>
        <div className="absolute top-4 right-4 text-2xl">✨</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌟</div>

        {/* Message Content */}
        <div className="space-y-4 text-gray-800">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center mb-4"
          >
            Hey Aayushi! 🕊️
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 text-center leading-relaxed"
          >
            <p className="text-lg">
              Fun fact: you're the <span className="font-bold text-doodle-pink">silliest, most adorable girl</span> in the world.
            </p>
            
            <p className="text-lg">
              I care for you <span className="font-bold italic">very deeply.</span>
            </p>
            
            <p className="text-lg">
              And I'm <span className="font-bold">always here for you</span> 💛
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="pt-4 border-t-2 border-dashed border-gray-300 text-center text-sm text-gray-600"
          >
            <p>— instagram: <span className="font-bold">capedpotato</span></p>
            <p>ph. <span className="font-bold">9403783265</span></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-500 pt-2"
          >
            literally my most precious goofball ✨
          </motion.div>
        </div>

        {/* Floating hearts animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, (i - 2) * 30],
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 1 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{ left: '50%', top: '50%' }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

