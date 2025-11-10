'use client';

import { motion } from 'framer-motion';

interface FoodItemProps {
  type: string;
  emoji: string;
  onDragStart: (type: string) => void;
  onDragEnd: () => void;
}

export default function FoodItem({ type, emoji, onDragStart, onDragEnd }: FoodItemProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative w-20 h-20 flex items-center justify-center"
        style={{
          filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute">
          <defs>
            <filter id="wobble">
              <feTurbulence baseFrequency="0.03" numOctaves="3" result="noise" seed="5" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>
          {/* Hand-drawn rounded square */}
          <path
            d="M 15 20 Q 15 15 20 15 L 60 15 Q 65 15 65 20 L 65 60 Q 65 65 60 65 L 20 65 Q 15 65 15 60 Z"
            fill="#fff"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#wobble)"
          />
        </svg>
        <span className="text-4xl relative z-10">{emoji}</span>
      </div>
    </motion.div>
  );
}

