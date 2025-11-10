'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DogSprite from '@/components/DogSprite';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function BuddyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dogAction, setDogAction] = useState<'idle' | 'bark'>('idle');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentBuddyMessage, setCurrentBuddyMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setShowWelcome(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setDogAction('bark');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();
      const buddyResponse = data.response || 'Woof! 🐾';
      
      setMessages(prev => [...prev, { role: 'assistant', content: buddyResponse }]);
      setCurrentBuddyMessage(buddyResponse);
      setShowSpeechBubble(true);
      
      setTimeout(() => {
        setShowSpeechBubble(false);
        setDogAction('idle');
      }, 8000);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Woof! *tail wagging* Hi dear! Arjun wanted me to remind you: you\'re his most favorite person in the whole world and he\'s ALWAYS got your back! 💕🐾';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      setCurrentBuddyMessage(errorMsg);
      setShowSpeechBubble(true);
      setDogAction('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      
      {/* Room Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/room-bg.png"
          alt="room"
          fill
          className="object-cover pixelated"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/60 via-blue-50/60 to-purple-50/60" />
      </div>

      {/* Content Container - Fixed Height */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Section - Welcome or Speech Bubble */}
        <div className="flex-shrink-0 pt-4 px-4 min-h-[20vh] flex items-center justify-center">
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-2xl border-4 border-purple-500 max-w-md"
            >
              <h1 className="text-3xl font-bold text-purple-800 text-center mb-1" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                Hi Aayushi! 💕
              </h1>
              <p className="text-lg text-purple-700 text-center font-bold" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                I'm Buddy! Arjun made me just for you! 🐕
              </p>
            </motion.div>
          )}
          
          {!showWelcome && showSpeechBubble && currentBuddyMessage && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl px-4 py-3 shadow-2xl border-4 border-purple-500 max-w-md"
            >
              <p className="text-purple-900 text-sm font-bold leading-relaxed" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                {currentBuddyMessage}
              </p>
            </motion.div>
          )}
        </div>

        {/* Middle Section - Dog */}
        <div className="flex-1 flex items-end justify-center pb-4">
          <div className="relative">
            <DogSprite 
              action={dogAction}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Bottom Section - Input (Fixed) */}
        <div className="flex-shrink-0 p-4 bg-gradient-to-t from-white/98 via-white/95 to-transparent backdrop-blur-sm">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-2xl max-w-2xl mx-auto">
            <div className="bg-white rounded-full px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Talk to Buddy, dear..."
                disabled={isLoading}
                className="flex-1 bg-transparent outline-none text-purple-900 placeholder-purple-400 text-base font-bold"
                style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-base shadow-lg flex-shrink-0"
                style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
              >
                {isLoading ? '...' : 'Send'}
              </motion.button>
            </div>
          </div>
          
          {/* Chat History Preview (if messages exist) */}
          {messages.length > 0 && (
            <div className="mt-2 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-2 max-h-24 overflow-y-auto">
              <div className="space-y-1 text-xs">
                {messages.slice(-3).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`${msg.role === 'user' ? 'text-purple-800 text-right' : 'text-purple-600 text-left'} font-semibold`}
                    style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                  >
                    {msg.role === 'user' ? '💬 ' : '🐕 '}{msg.content.substring(0, 60)}{msg.content.length > 60 ? '...' : ''}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
