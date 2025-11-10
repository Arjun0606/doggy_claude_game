'use client';

import { useState, useEffect } from 'react';

interface SpriteAnimationProps {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  fps?: number;
  scale?: number;
}

export default function SpriteAnimation({
  spriteSheet,
  frameWidth,
  frameHeight,
  totalFrames,
  fps = 8,
  scale = 4,
}: SpriteAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [totalFrames, fps]);

  const xOffset = -(currentFrame * frameWidth);

  return (
    <div
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${spriteSheet})`,
          backgroundPosition: `${xOffset}px 0`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${totalFrames * frameWidth}px ${frameHeight}px`,
          width: totalFrames * frameWidth,
          height: frameHeight,
          imageRendering: 'pixelated',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
        }}
      />
    </div>
  );
}

