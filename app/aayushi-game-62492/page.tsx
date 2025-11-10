'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DogSprite from '@/components/DogSprite';

export default function BuddyWorld() {
  const [dogAction, setDogAction] = useState<'idle' | 'bark'>('idle');
  const [showMessage, setShowMessage] = useState(false);
  const [showActions, setShowActions] = useState(true);

  const handleAction = (action: string) => {
    setDogAction('bark');
    setTimeout(() => setDogAction('idle'), 2000);
  };

  const specialMessage = `Hi Aayushi! 💕

This is Buddy, and I have a very special message from Arjun for you:

You are his FAVORITE person in the whole world! 🌟

He wants you to know that no matter what happens, he's ALWAYS got your back. You mean absolutely everything to him, and you deserve all the love and happiness in the world.

You're precious, amazing, and incredibly special. Never forget that!

Happy early birthday (March 7th)! And say hi to your twin sister for me! 🎂

With all the love,
Buddy & Arjun 💕🐾`;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      
      {/* Room Background */}
      <div className="absolute inset-0">
        <Image
          src="/room-bg.png"
          alt="room"
          fill
          className="object-cover pixelated"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-blue-50/50 to-purple-50/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8">
        
        {/* Top - Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-3 shadow-2xl border-4 border-purple-500"
        >
          <h1 className="text-2xl font-bold text-purple-800 text-center" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
            Hi Aayushi! 💕
          </h1>
          <p className="text-base text-purple-700 text-center font-bold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
            I'm Buddy! Arjun made me for you! 🐕
          </p>
        </motion.div>

        {/* Middle - Buddy */}
        <div className="flex-1 flex items-center justify-center">
          <DogSprite 
            action={dogAction}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Bottom - Floating Action Bar */}
        {showActions && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl px-6 py-4 flex items-center gap-4 mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('pet')}
              className="bg-white text-purple-700 px-5 py-2 rounded-full font-bold text-sm shadow-lg"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              🐾 Pet
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('play')}
              className="bg-white text-purple-700 px-5 py-2 rounded-full font-bold text-sm shadow-lg"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              🎾 Play
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('treat')}
              className="bg-white text-purple-700 px-5 py-2 rounded-full font-bold text-sm shadow-lg"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              🦴 Treat
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMessage(true)}
              className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-full font-bold text-sm shadow-lg border-2 border-yellow-600"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              💌 Message
            </motion.button>
          </motion.div>
        )}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-purple-500 max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">💌</div>
                <h2 className="text-2xl font-bold text-purple-800 mb-2" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                  A Special Message
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
              </div>
              
              <div className="bg-white/80 rounded-2xl p-5 mb-4">
                <p className="text-purple-900 text-base leading-relaxed whitespace-pre-line font-semibold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                  {specialMessage}
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
