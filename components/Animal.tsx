'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimalProps {
  type: 'cat' | 'bunny' | 'frog' | 'bear';
  fullness: number;
  hasBurped: boolean;
  hasPooped: boolean;
  onFeed: () => void;
  isDraggingFood: boolean;
}

const animalColors = {
  cat: '#FFB6D9',
  bunny: '#D5AAFF',
  frog: '#B4F1A8',
  bear: '#FFE17B',
};

const animalEmojis = {
  cat: '🐱',
  bunny: '🐰',
  frog: '🐸',
  bear: '🐻',
};

export default function Animal({
  type,
  fullness,
  hasBurped,
  hasPooped,
  onFeed,
  isDraggingFood,
}: AnimalProps) {
  const [showBurp, setShowBurp] = useState(false);
  const [showPoop, setShowPoop] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEating, setIsEating] = useState(false);

  useEffect(() => {
    if (hasBurped && !showBurp) {
      setShowBurp(true);
      setShowThankYou(true);
      setTimeout(() => setShowBurp(false), 2000);
      setTimeout(() => setShowThankYou(false), 3000);
    }
  }, [hasBurped, showBurp]);

  useEffect(() => {
    if (hasPooped) {
      setShowPoop(true);
      setTimeout(() => setShowPoop(false), 1500);
    }
  }, [hasPooped]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (fullness < 100) {
      setIsEating(true);
      onFeed();
      setTimeout(() => setIsEating(false), 500);
    }
  };

  const handleClick = () => {
    if (isDraggingFood && fullness < 100) {
      setIsEating(true);
      onFeed();
      setTimeout(() => setIsEating(false), 500);
    }
  };

  const scale = 1 + (fullness / 100) * 0.8; // Grows up to 1.8x size

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className="relative flex flex-col items-center"
      whileHover={fullness < 100 && isDraggingFood ? { scale: 1.05 } : {}}
    >
      {/* Animal Body - Hand-drawn Doodle Style */}
      <motion.div
        animate={{
          scale: isEating ? [1, 1.1, scale] : scale,
          rotate: isEating ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="140"
          height="160"
          viewBox="0 0 140 160"
          className="filter drop-shadow-lg"
        >
          <defs>
            <filter id="roughen">
              <feTurbulence baseFrequency="0.05" numOctaves="2" result="noise" seed="2" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </defs>
          
          {type === 'cat' && (
            <>
              {/* Cat Body - wobbly hand-drawn */}
              <path
                d={`M 70 ${80 - fullness * 0.2} 
                   Q 85 ${75 - fullness * 0.3} 95 ${85 - fullness * 0.25}
                   Q 100 ${100 - fullness * 0.3} 95 ${115 - fullness * 0.35}
                   Q 90 ${125 - fullness * 0.4} 70 ${125 - fullness * 0.4}
                   Q 50 ${125 - fullness * 0.4} 45 ${115 - fullness * 0.35}
                   Q 40 ${100 - fullness * 0.3} 45 ${85 - fullness * 0.25}
                   Q 55 ${75 - fullness * 0.3} 70 ${80 - fullness * 0.2} Z`}
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roughen)"
              />
              {/* Head */}
              <path
                d="M 70 50 Q 90 45 98 55 Q 100 65 95 75 Q 85 82 70 82 Q 55 82 45 75 Q 40 65 42 55 Q 50 45 70 50 Z"
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Cat Ears - pointy */}
              <path d="M 48 52 L 35 30 L 52 45 Z" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <path d="M 92 52 L 105 30 L 88 45 Z" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              {/* Eyes */}
              <ellipse cx="58" cy="62" rx="5" ry="7" fill="#000" />
              <ellipse cx="82" cy="62" rx="5" ry="7" fill="#000" />
              <circle cx="60" cy="60" r="2" fill="#fff" />
              <circle cx="84" cy="60" r="2" fill="#fff" />
              {/* Whiskers */}
              <line x1="35" y1="68" x2="48" y2="67" stroke="#000" strokeWidth="2" />
              <line x1="35" y1="72" x2="48" y2="72" stroke="#000" strokeWidth="2" />
              <line x1="92" y1="67" x2="105" y2="68" stroke="#000" strokeWidth="2" />
              <line x1="92" y1="72" x2="105" y2="72" stroke="#000" strokeWidth="2" />
              {/* Nose */}
              <path d="M 70 68 L 66 73 L 70 75 L 74 73 Z" fill="#000" />
              {/* Mouth */}
              <path
                d={fullness >= 100 ? "M 66 75 Q 70 82 74 75" : "M 66 75 Q 70 78 74 75"}
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
              {/* Legs */}
              <rect x="50" y="120" width="15" height="30" rx="7" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <rect x="75" y="120" width="15" height="30" rx="7" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
            </>
          )}

          {type === 'bunny' && (
            <>
              {/* Bunny Body */}
              <ellipse
                cx="70"
                cy={90 - fullness * 0.3}
                rx={35 + fullness * 0.25}
                ry={38 + fullness * 0.35}
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Head */}
              <ellipse
                cx="70"
                cy="55"
                rx="28"
                ry="30"
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Long Bunny Ears */}
              <ellipse cx="55" cy="22" rx="10" ry="28" fill={animalColors[type]} stroke="#000" strokeWidth="3" transform="rotate(-15 55 22)" />
              <ellipse cx="85" cy="22" rx="10" ry="28" fill={animalColors[type]} stroke="#000" strokeWidth="3" transform="rotate(15 85 22)" />
              <ellipse cx="55" cy="25" rx="5" ry="18" fill="#ffb6d9" stroke="#000" strokeWidth="2" transform="rotate(-15 55 25)" />
              <ellipse cx="85" cy="25" rx="5" ry="18" fill="#ffb6d9" stroke="#000" strokeWidth="2" transform="rotate(15 85 25)" />
              {/* Eyes */}
              <circle cx="60" cy="52" r="6" fill="#000" />
              <circle cx="80" cy="52" r="6" fill="#000" />
              <circle cx="62" cy="50" r="3" fill="#fff" />
              <circle cx="82" cy="50" r="3" fill="#fff" />
              {/* Nose */}
              <ellipse cx="70" cy="62" rx="4" ry="3" fill="#ff69b4" />
              {/* Mouth */}
              <path
                d={fullness >= 100 ? "M 65 68 Q 70 75 75 68" : "M 65 68 Q 70 72 75 68"}
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
              <line x1="70" y1="62" x2="70" y2="68" stroke="#000" strokeWidth="2" />
              {/* Legs */}
              <ellipse cx="55" cy="125" rx="12" ry="18" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <ellipse cx="85" cy="125" rx="12" ry="18" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
            </>
          )}

          {type === 'frog' && (
            <>
              {/* Frog Body - round and chubby */}
              <ellipse
                cx="70"
                cy={95 - fullness * 0.3}
                rx={38 + fullness * 0.3}
                ry={35 + fullness * 0.35}
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Head merged with body */}
              <ellipse
                cx="70"
                cy="70"
                rx="42"
                ry="35"
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Big Frog Eyes on top */}
              <circle cx="55" cy="52" r="18" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <circle cx="85" cy="52" r="18" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <circle cx="55" cy="55" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
              <circle cx="85" cy="55" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
              <circle cx="57" cy="53" r="6" fill="#000" />
              <circle cx="87" cy="53" r="6" fill="#000" />
              <circle cx="59" cy="51" r="3" fill="#fff" />
              <circle cx="89" cy="51" r="3" fill="#fff" />
              {/* Smile */}
              <path
                d={fullness >= 100 ? "M 50 85 Q 70 98 90 85" : "M 50 85 Q 70 92 90 85"}
                stroke="#000"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Belly spot */}
              <ellipse cx="70" cy="95" rx="20" ry="18" fill="#9ce88e" opacity="0.6" />
              {/* Front legs */}
              <ellipse cx="45" cy="115" rx="15" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <ellipse cx="95" cy="115" rx="15" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
            </>
          )}

          {type === 'bear' && (
            <>
              {/* Bear Body */}
              <ellipse
                cx="70"
                cy={92 - fullness * 0.3}
                rx={36 + fullness * 0.28}
                ry={40 + fullness * 0.38}
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Head */}
              <circle
                cx="70"
                cy="55"
                r="32"
                fill={animalColors[type]}
                stroke="#000"
                strokeWidth="3"
                filter="url(#roughen)"
              />
              {/* Round Bear Ears */}
              <circle cx="48" cy="35" r="14" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <circle cx="92" cy="35" r="14" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <circle cx="48" cy="37" r="8" fill="#ffa" stroke="#000" strokeWidth="2" />
              <circle cx="92" cy="37" r="8" fill="#ffa" stroke="#000" strokeWidth="2" />
              {/* Eyes */}
              <circle cx="58" cy="52" r="5" fill="#000" />
              <circle cx="82" cy="52" r="5" fill="#000" />
              <circle cx="60" cy="50" r="2" fill="#fff" />
              <circle cx="84" cy="50" r="2" fill="#fff" />
              {/* Snout */}
              <ellipse cx="70" cy="65" rx="18" ry="14" fill="#ffebb3" stroke="#000" strokeWidth="3" />
              {/* Nose */}
              <ellipse cx="70" cy="62" rx="6" ry="5" fill="#000" />
              {/* Mouth */}
              <path
                d={fullness >= 100 ? "M 62 70 Q 70 78 78 70" : "M 62 70 Q 70 74 78 70"}
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
              {/* Legs */}
              <ellipse cx="52" cy="130" rx="13" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
              <ellipse cx="88" cy="130" rx="13" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="3" />
            </>
          )}
        </svg>
      </motion.div>

      {/* Fullness Bar */}
      <div className="w-full max-w-[100px] h-2 bg-gray-300 rounded-full mt-2 border-2 border-black overflow-hidden">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${fullness}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Burp Animation */}
      <AnimatePresence>
        {showBurp && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1.5, y: -40 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-0 text-3xl"
          >
            💨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Message */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ scale: 0, y: 0, opacity: 0 }}
            animate={{ scale: 1, y: -50, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-0 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-bold whitespace-nowrap"
          >
            Thank you Aayushi! 💕
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poop Animation */}
      <AnimatePresence>
        {showPoop && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 20 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-0 text-3xl"
          >
            💩
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

