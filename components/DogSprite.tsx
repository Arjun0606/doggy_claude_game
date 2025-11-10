'use client';

import { useEffect, useState } from 'react';

interface DogSpriteProps {
  action: 'idle' | 'bark';
  className?: string;
}

export default function DogSprite({ action, className = '' }: DogSpriteProps) {
  const [frame, setFrame] = useState(0);
  
  // Sprite configurations based on actual dimensions
  const animations = {
    idle: {
      sprite: '/dog-sprites/__alsation_sit_idle.png',
      totalWidth: 3755,
      totalHeight: 2408,
      frameWidth: 751,  // 3755 / 5 columns
      frameHeight: 802, // 2408 / 3 rows
      columns: 5,
      rows: 3,
      frameCount: 15,
      fps: 8,
    },
    bark: {
      sprite: '/dog-sprites/__alsation_bark.png',
      totalWidth: 3520,
      totalHeight: 1226,
      frameWidth: 704,  // 3520 / 5 columns
      frameHeight: 1226, // Single row
      columns: 5,
      rows: 1,
      frameCount: 5,
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

  // Calculate position in sprite sheet
  const column = frame % currentAnim.columns;
  const row = Math.floor(frame / currentAnim.columns);
  
  // Display size - scaled to fit nicely in the room
  const displayWidth = 150;
  const displayHeight = (currentAnim.frameHeight / currentAnim.frameWidth) * displayWidth;
  
  // Calculate background size (total sprite sheet scaled)
  const bgWidth = (currentAnim.totalWidth / currentAnim.frameWidth) * displayWidth;
  const bgHeight = (currentAnim.totalHeight / currentAnim.frameHeight) * displayHeight;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${displayWidth}px`,
        height: `${displayHeight}px`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          backgroundImage: `url(${currentAnim.sprite})`,
          backgroundSize: `${bgWidth}px ${bgHeight}px`,
          backgroundPosition: `-${column * displayWidth}px -${row * displayHeight}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
