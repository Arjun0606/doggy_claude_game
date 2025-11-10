'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface DogSpriteProps {
  action: 'idle' | 'bark';
  className?: string;
}

export default function DogSprite({ action, className = '' }: DogSpriteProps) {
  const [frame, setFrame] = useState(0);
  
  // Configuration for each animation
  const animations = {
    idle: {
      sprite: '/__alsation_sit_idle.png',
      frameCount: 15, // 5 columns x 3 rows
      frameWidth: 751,
      frameHeight: 802,
      columns: 5,
      fps: 8,
    },
    bark: {
      sprite: '/__alsation_bark.png',
      frameCount: 5, // Single row
      frameWidth: 704,
      frameHeight: 1226,
      columns: 5,
      fps: 10,
    },
  };

  const currentAnim = animations[action];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % currentAnim.frameCount);
    }, 1000 / currentAnim.fps);

    return () => clearInterval(interval);
  }, [action, currentAnim.frameCount, currentAnim.fps]);

  const column = frame % currentAnim.columns;
  const row = Math.floor(frame / currentAnim.columns);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${currentAnim.frameWidth}px`,
        height: `${currentAnim.frameHeight}px`,
        maxWidth: '40vw',
        maxHeight: '40vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(/dog-sprites${currentAnim.sprite})`,
          backgroundPosition: `-${column * currentAnim.frameWidth}px -${row * currentAnim.frameHeight}px`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${currentAnim.frameWidth * currentAnim.columns}px ${currentAnim.frameHeight * Math.ceil(currentAnim.frameCount / currentAnim.columns)}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

