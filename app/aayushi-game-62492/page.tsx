'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DogSprite from '@/components/DogSprite';
import type { DogAction } from '@/components/dogSpriteData';

type ActionButton = {
  key: DogAction;
  label: string;
  icon: string;
  description: string;
};

const ACTIONS: ActionButton[] = [
  { key: 'idle', label: 'Idle Bounce', icon: '😌', description: 'Buddy does a happy bounce' },
  { key: 'sitIdle', label: 'Sit Idle', icon: '🪑', description: 'Buddy sits patiently' },
  { key: 'walk', label: 'Walk', icon: '🚶‍♂️', description: 'Buddy takes a stroll' },
  { key: 'run', label: 'Run', icon: '🏃‍♀️', description: 'Buddy zoomies!' },
  { key: 'bark', label: 'Bark', icon: '🐶', description: 'Buddy woofs lovingly' },
  { key: 'sleepIdle', label: 'Sleep Idle', icon: '💤', description: 'Buddy naps peacefully' },
];

const SPECIAL_MESSAGE = `Hi Aayushi! 💕

This is Buddy, and I have a very special message from Arjun for you:

You are his FAVORITE person in the whole world! 🌟

He wants you to know that no matter what happens, he's ALWAYS got your back. You mean absolutely everything to him, and you deserve all the love and happiness in the world.

You're precious, amazing, and incredibly special. Never forget that!

With all the love,
Buddy & Arjun 💕🐾`;

export default function BuddyWorld() {
  const [dogAction, setDogAction] = useState<DogAction>('idle');
  const [showMessage, setShowMessage] = useState(false);

  const activeInfo = useMemo(() => ACTIONS.find((action) => action.key === dogAction), [dogAction]);

  return (
    <div className="relative flex min-h-[100dvh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/room-bg.png"
          alt="Pet room"
          fill
          className="object-cover pixelated"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-blue-50/30 to-purple-50/30" />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between px-4 pb-5 pt-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xs rounded-3xl border-4 border-purple-500 bg-white/95 px-6 py-3 text-center shadow-xl backdrop-blur-sm"
          >
            <p className="text-lg text-purple-700 font-bold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
              Hi Aayushi! 💕
            </p>
            <p className="text-base text-purple-600 font-bold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
              I'm Buddy! Arjun made me just for you.
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMessage(true)}
            className="rounded-full border-2 border-yellow-500 bg-yellow-300/90 px-4 py-2 font-bold text-purple-900 shadow-lg"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            💌 Tap to see Arjun's note
          </motion.button>
        </div>

        {/* Dog viewport */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            key={dogAction}
            animate={dogAction === 'idle' ? { y: [0, -10, 0] } : { y: 0 }}
            transition={
              dogAction === 'idle'
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3, ease: 'easeOut' }
            }
            className="rounded-[28px] bg-white/55 px-6 py-4 shadow-[0_18px_34px_rgba(88,48,176,0.28)] backdrop-blur-sm"
          >
            <DogSprite action={dogAction} className="drop-shadow-[0_12px_24px_rgba(128,64,255,0.35)]" targetHeight={210} />
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-3">
          {activeInfo && (
            <div className="text-center font-bold text-purple-800" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
              {activeInfo.icon} {activeInfo.description}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2 rounded-3xl border-4 border-purple-400 bg-white/95 px-3 py-3 shadow-2xl backdrop-blur-sm">
            {ACTIONS.map((action) => {
              const isActive = action.key === dogAction;
              return (
                <motion.button
                  key={action.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDogAction(action.key)}
                  className={`min-w-[110px] px-3 py-2 rounded-full font-bold text-sm shadow-md transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white border-2 border-white'
                      : 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                  }`}
                  style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                >
                  <span className="mr-1">{action.icon}</span>
                  {action.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Special Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-purple-500 max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">💌</div>
                <h2 className="text-2xl font-bold text-purple-800 mb-2" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                  A Special Message from Arjun
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
              </div>
              <div className="bg-white/85 rounded-2xl p-5 mb-4">
                <p
                  className="text-purple-900 text-base leading-relaxed whitespace-pre-line font-semibold"
                  style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                >
                  {SPECIAL_MESSAGE}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMessage(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-bold text-lg shadow-lg"
                style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
              >
                Close 💕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
