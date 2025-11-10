'use client';

import { useEffect, useMemo, useState } from 'react';
import { DogAction, rawDogSpriteData } from './dogSpriteData';

type Props = {
  action: DogAction;
  targetHeight?: number;
  className?: string;
};

export default function DogSprite({ action, targetHeight = 220, className = '' }: Props) {
  const [frameIndex, setFrameIndex] = useState(0);

  const data = rawDogSpriteData[action] ?? rawDogSpriteData.idle;
  const frames = data.frames;

  const { maxFrameWidth, maxFrameHeight } = useMemo(() => {
    let maxWidth = 0;
    let maxHeight = 0;
    for (const frame of frames) {
      if (frame.width > maxWidth) maxWidth = frame.width;
      if (frame.height > maxHeight) maxHeight = frame.height;
    }
    return { maxFrameWidth: maxWidth, maxFrameHeight: maxHeight };
  }, [frames]);

  const scale = targetHeight / maxFrameHeight;
  const containerWidth = maxFrameWidth * scale;
  const containerHeight = maxFrameHeight * scale;

  useEffect(() => {
    setFrameIndex(0);
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1000 / 12);

    return () => clearInterval(interval);
  }, [frames]);

  const frame = frames[frameIndex];

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      <div
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          backgroundImage: `url(${data.sprite})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${data.sheetWidth * scale}px ${data.sheetHeight * scale}px`,
          backgroundPosition: `-${frame.x * scale}px -${frame.y * scale}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
