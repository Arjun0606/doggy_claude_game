'use client';

import { motion } from 'framer-motion';

export default function Bird() {
  return (
    <motion.div
      initial={{ x: '100vw', y: 50 }}
      animate={{ x: '50vw', y: 100 }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
      className="fixed top-0 pointer-events-none z-50"
    >
      <svg width="80" height="80" viewBox="0 0 80 80" className="doodle-outline">
        {/* Bird Body */}
        <ellipse cx="40" cy="45" rx="20" ry="25" fill="#A8D8EA" stroke="#000" strokeWidth="2" />
        
        {/* Bird Head */}
        <circle cx="40" cy="25" r="15" fill="#A8D8EA" stroke="#000" strokeWidth="2" />
        
        {/* Eye */}
        <circle cx="43" cy="23" r="3" fill="#000" />
        
        {/* Beak */}
        <path d="M 52 25 L 62 23 L 52 28 Z" fill="#FFE17B" stroke="#000" strokeWidth="2" />
        
        {/* Wings - animated */}
        <motion.path
          d="M 25 40 Q 10 35 15 50"
          fill="#A8D8EA"
          stroke="#000"
          strokeWidth="2"
          animate={{ d: ["M 25 40 Q 10 35 15 50", "M 25 40 Q 10 45 15 55", "M 25 40 Q 10 35 15 50"] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.path
          d="M 55 40 Q 70 35 65 50"
          fill="#A8D8EA"
          stroke="#000"
          strokeWidth="2"
          animate={{ d: ["M 55 40 Q 70 35 65 50", "M 55 40 Q 70 45 65 55", "M 55 40 Q 70 35 65 50"] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Envelope in beak */}
        <rect x="50" y="15" width="25" height="18" rx="2" fill="#fff" stroke="#000" strokeWidth="2" />
        <path d="M 50 15 L 62.5 25 L 75 15" stroke="#000" strokeWidth="2" fill="none" />
        <text x="56" y="28" fontSize="10" fill="#FF6B9D">💌</text>
      </svg>
    </motion.div>
  );
}

