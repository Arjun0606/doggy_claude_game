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
  { key: 'idle', label: 'Idle Bounce', icon: '😌', description: 'Buddy is vibing' },
  { key: 'sitIdle', label: 'Sit Idle', icon: '🪑', description: 'Buddy sits patiently' },
  { key: 'sit', label: 'Sit', icon: '🐕‍🦺', description: 'Buddy sits with attention' },
  { key: 'stand', label: 'Stand', icon: '🦴', description: 'Buddy is ready to go' },
  { key: 'walk', label: 'Walk', icon: '🚶‍♂️', description: 'Buddy takes a stroll' },
  { key: 'run', label: 'Run', icon: '🏃‍♀️', description: 'Buddy zoomies!' },
  { key: 'bark', label: 'Bark', icon: '🐶', description: 'Buddy woofs lovingly' },
  { key: 'sleep', label: 'Sleep', icon: '💤', description: 'Buddy naps peacefully' },
];

const SPECIAL_MESSAGE = `Hi Aayushi! 💕

This is Buddy, and I have a very special message from Arjun for you:

You are his FAVORITE person in the whole world! 🌟

He wants you to know that no matter what happens, he's ALWAYS got your back. You mean absolutely everything to him, and you deserve all the love and happiness in the world.

You're precious, amazing, and incredibly special. Never forget that!

Happy early birthday (March 7th)! And say hi to your twin sister for me! 🎂

With all the love,
Buddy & Arjun 💕🐾`;

export default function BuddyWorld() {
  const [dogAction, setDogAction] = useState<DogAction>('idle');
  const [showMessage, setShowMessage] = useState(false);

  const activeInfo = useMemo(() => ACTIONS.find((action) => action.key === dogAction), [dogAction]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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

      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 py-4 px-5 flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm border-4 border-purple-500 rounded-3xl px-6 py-3 shadow-xl text-center max-w-xs"
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
            className="bg-yellow-300/90 text-purple-900 px-4 py-2 rounded-full border-2 border-yellow-500 shadow-lg font-bold"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            💌 Tap for Arjun's love note
          </motion.button>
        </div>

        {/* Dog viewport */}
        <div className="flex-1 flex items-center justify-center">
          <DogSprite action={dogAction} className="drop-shadow-[0_12px_24px_rgba(128,64,255,0.35)]" targetHeight={230} />
        </div>

        {/* Action Bar */}
        <div className="flex-shrink-0 pb-5 px-4">
          {activeInfo && (
            <div className="mb-3 text-center text-purple-800 font-bold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
              {activeInfo.icon} {activeInfo.description}
            </div>
          )}
          <div className="bg-white/95 backdrop-blur-sm border-4 border-purple-400 rounded-3xl shadow-2xl px-3 py-3 flex flex-wrap justify-center gap-2">
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
