'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SpriteAnimation from '@/components/SpriteAnimation';
import ChatBox from '@/components/ChatBox';

type CatState = 'sleeping' | 'eating' | 'playing' | 'cuddling' | 'bathing';
type TaskId = 'feed' | 'play' | 'pet' | 'bathe';

interface Task {
  id: TaskId;
  label: string;
  catState: CatState;
  icon: string;
}

interface SpriteConfig {
  sheet: string;
  frames: number;
}

const TASKS: Task[] = [
  { id: 'feed', label: 'Feed the Cat', catState: 'eating', icon: '🍖' },
  { id: 'play', label: 'Play with Toy', catState: 'playing', icon: '🎾' },
  { id: 'pet', label: 'Pet the Cat', catState: 'cuddling', icon: '💕' },
  { id: 'bathe', label: 'Bathe the Cat', catState: 'bathing', icon: '🛁' },
];

const CAT_SPRITES: Record<CatState, SpriteConfig> = {
  sleeping: { sheet: '/cat-sprites/sleep.png', frames: 4 },
  eating: { sheet: '/cat-sprites/eating.png', frames: 15 },
  playing: { sheet: '/cat-sprites/excited.png', frames: 12 },
  cuddling: { sheet: '/cat-sprites/laydown.png', frames: 12 },
  bathing: { sheet: '/cat-sprites/surprised.png', frames: 12 },
};

export default function AayushisPetCafe() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [catState, setCatState] = useState<CatState>('sleeping');
  const [completedTasks, setCompletedTasks] = useState<Set<TaskId>>(new Set());
  const [showMessage, setShowMessage] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const handleTaskClick = (task: Task) => {
    if (completedTasks.has(task.id)) return;

    const newCompleted = new Set(completedTasks).add(task.id);
    setCompletedTasks(newCompleted);
    setCatState(task.catState);
    setCelebration(true);
    setSidebarOpen(false);

    setTimeout(() => setCelebration(false), 2000);

    if (newCompleted.size === TASKS.length) {
      setTimeout(() => setShowMessage(true), 2500);
    }
  };

  const resetGame = () => {
    setCompletedTasks(new Set());
    setCatState('sleeping');
    setShowMessage(false);
  };

  const enterCafe = () => {
    setShowWelcome(false);
  };

  const allTasksComplete = completedTasks.size === TASKS.length;

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4 overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full text-center border-8 border-purple-600"
        >
          <motion.h1
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-5xl font-bold text-purple-800 mb-4"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Welcome to
          </motion.h1>
          
          <motion.h2
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl md:text-4xl font-bold text-pink-600 mb-3"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Aayushi's Pet Cafe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-6 italic"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            (that runs at a loss)
          </motion.p>

          <div className="flex justify-center gap-6 mb-6">
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl"
            >
              🐱
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="text-6xl"
            >
              💖
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="text-6xl"
            >
              ☕
            </motion.span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={enterCafe}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-2xl md:text-3xl font-bold py-4 px-10 rounded-full shadow-2xl border-4 border-white"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Enter Cafe! 🐾
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Main Game
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-green-100">
      
      {/* Room Background */}
      <div className="absolute inset-0">
        <Image
          src="/cat-rooms/room.png"
          alt="cafe room"
          fill
          className="object-cover pixelated"
          priority
        />
      </div>

      {/* Room Decorations - More Interactive & Dynamic */}
      <div className="absolute inset-0">
        {/* Bowl bottom left - bounces */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
          className="absolute left-[12%] bottom-[18%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/bowls.png" alt="bowl" width={90} height={70} className="pixelated drop-shadow-lg" />
        </motion.div>

        {/* Bed bottom right - gentle float */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
          className="absolute right-[12%] bottom-[16%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/bed.png" alt="bed" width={130} height={90} className="pixelated drop-shadow-lg" />
        </motion.div>

        {/* Animated blue ball - rotates */}
        <motion.div
          animate={{ rotate: 360, y: [0, -8, 0] }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            y: { duration: 2, repeat: Infinity }
          }}
          whileHover={{ scale: 1.2 }}
          className="absolute left-[20%] bottom-[38%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/ball.gif" alt="ball" width={60} height={60} className="pixelated drop-shadow-lg" />
        </motion.div>

        {/* Fish toy - wiggles */}
        <motion.div
          animate={{ rotate: [-5, 5, -5], x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{ scale: 1.15, rotate: 15 }}
          className="absolute right-[22%] bottom-[35%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/fish.png" alt="fish" width={50} height={50} className="pixelated drop-shadow-lg" />
        </motion.div>

        {/* Scratching post - sways */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          whileHover={{ scale: 1.08 }}
          className="absolute left-[8%] bottom-[30%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/toy.gif" alt="toy" width={55} height={55} className="pixelated drop-shadow-lg" />
        </motion.div>

        {/* Pink ball top right - bounces */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          whileHover={{ scale: 1.2 }}
          className="absolute right-[28%] top-[25%] z-10 cursor-pointer"
        >
          <Image src="/cat-items/ball.gif" alt="pink ball" width={45} height={45} className="pixelated drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Celebration Confetti */}
      {celebration && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                scale: 0 
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: [0, 2, 0],
                rotate: Math.random() * 720
              }}
              transition={{ duration: 2, delay: i * 0.02 }}
            >
              {['💖', '✨', '🌟', '💫', '💕', '🎉', '⭐', '🎊', '🐾'][Math.floor(Math.random() * 9)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated Cat with PROPER FRAME-BY-FRAME ANIMATION */}
      <motion.div
        key={catState}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: celebration ? [0, -30, 0] : 0
        }}
        transition={{
          scale: { duration: 0.5 },
          opacity: { duration: 0.5 },
          y: { duration: celebration ? 0.6 : 0 }
        }}
        className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2 z-30"
      >
        <SpriteAnimation
          spriteSheet={CAT_SPRITES[catState].sheet}
          frameWidth={32}
          frameHeight={32}
          totalFrames={CAT_SPRITES[catState].frames}
          fps={8}
          scale={4}
        />
      </motion.div>

      {/* Sidebar Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-bold py-3 px-6 rounded-full shadow-2xl border-3 border-white"
        style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
      >
        {sidebarOpen ? '✕ Close' : '☰ Tasks'} ({completedTasks.size}/{TASKS.length})
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-purple-100 to-pink-100 border-r-8 border-purple-600 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                <h2 
                  className="text-3xl font-bold text-purple-800 text-center mb-6"
                  style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                >
                  Tasks for Kitty! 🐱
                </h2>

                {TASKS.map((task) => {
                  const completed = completedTasks.has(task.id);
                  return (
                    <motion.button
                      key={task.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      whileHover={{ scale: completed ? 1 : 1.03 }}
                      whileTap={{ scale: completed ? 1 : 0.97 }}
                      onClick={() => handleTaskClick(task)}
                      disabled={completed}
                      className={`
                        w-full p-5 rounded-2xl font-bold text-xl border-4 shadow-lg transition-all
                        ${completed 
                          ? 'bg-green-400 border-green-600 text-green-900 opacity-70 cursor-default' 
                          : 'bg-gradient-to-br from-yellow-300 to-yellow-400 border-yellow-500 text-purple-900 hover:from-yellow-200 hover:to-yellow-300 cursor-pointer'
                        }
                      `}
                      style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{task.icon}</span>
                          <span>{task.label}</span>
                        </div>
                        {completed && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-3xl"
                          >
                            ✅
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chat with Buddy Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl border-4 border-white flex items-center gap-3"
        style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
      >
        <span className="text-3xl">🐕</span>
        <span>Chat with Buddy!</span>
      </motion.button>

      {/* Reset Button */}
      {allTasksComplete && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetGame}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl border-4 border-white"
          style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
        >
          🔄 Play Again!
        </motion.button>
      )}

      {/* Chat Box */}
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />

            <motion.div
              initial={{ scale: 0, rotate: -15, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 15, y: -100 }}
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-8 border-purple-700 p-8 md:p-12 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowMessage(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-3xl flex items-center justify-center border-4 border-white shadow-lg transition-transform active:scale-90 z-10"
              >
                ×
              </button>

              <motion.div 
                animate={{ rotate: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -left-8 text-6xl drop-shadow-2xl"
              >
                🕊️
              </motion.div>

              <div className="space-y-5 text-center" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
                  Hey Aayushi! 🕊️
                </h2>

                <div className="space-y-4">
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 font-bold">
                    Fun fact: you're the <span className="text-pink-600">silliest, most adorable girl</span> in the world.
                  </p>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 font-bold">
                    I care for you <span className="text-red-600 italic">very deeply.</span>
                  </p>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 font-bold">
                    And I'm <span className="text-yellow-600">always here for you</span> 💛
                  </p>
                </div>

                <div className="pt-5 border-t-4 border-dashed border-purple-300 space-y-2">
                  <p className="text-lg md:text-xl text-purple-700 font-bold">
                    — instagram: <span className="text-purple-900">capedpotato</span>
                  </p>
                  <p className="text-lg md:text-xl text-purple-700 font-bold">
                    ph. <span className="text-purple-900">9403783265</span>
                  </p>
                  <p className="text-base md:text-lg text-purple-600 mt-3 italic">
                    if you wanna reach out 💕
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-purple-500 mt-6" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                Tap X to close 💫
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
