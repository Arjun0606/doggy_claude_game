'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function BuddyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dogAction, setDogAction] = useState<'idle' | 'happy' | 'excited'>('idle');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentBuddyMessage, setCurrentBuddyMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setDogAction('excited');

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

      if (data.error) {
        const errorMsg = 'Woof! Sorry dear, I had trouble understanding that. Can you try again? 🐾';
        setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        setCurrentBuddyMessage(errorMsg);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setCurrentBuddyMessage(data.response);
      }
      
      // Show speech bubble
      setShowSpeechBubble(true);
      setDogAction('happy');
      
      // Hide speech bubble after message is read
      setTimeout(() => {
        setShowSpeechBubble(false);
        setDogAction('idle');
      }, 8000);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Woof! Something went wrong. Let\'s try that again! 🐾';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      setCurrentBuddyMessage(errorMsg);
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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-blue-100 to-purple-100">
      
      {/* Isometric Room Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="text-9xl">🏠</div>
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
            Hi Aayushi! 💕
          </h1>
          <p className="text-xl md:text-2xl text-purple-600" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
            I'm Buddy! Arjun made me just for you! 🐕
          </p>
        </motion.div>
      )}

      {/* Animated Dog */}
      <motion.div
        animate={{
          y: dogAction === 'happy' ? [0, -10, 0] : dogAction === 'excited' ? [0, -20, -10, -20, 0] : [0, -5, 0],
          rotate: dogAction === 'excited' ? [-2, 2, -2, 2, 0] : 0,
        }}
        transition={{
          duration: dogAction === 'excited' ? 0.5 : 2,
          repeat: dogAction === 'idle' ? Infinity : dogAction === 'excited' ? 3 : 0,
          repeatType: 'reverse',
        }}
        className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="relative">
          {/* Dog */}
          <div className="text-9xl">🐕</div>
          
          {/* Speech Bubble from Dog */}
          <AnimatePresence>
            {showSpeechBubble && currentBuddyMessage && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 max-w-[90vw]"
              >
                <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-purple-500 relative">
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-purple-500" />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-white" />
                  
                  <p className="text-purple-900 text-lg font-bold leading-relaxed" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                    {currentBuddyMessage}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg border-3 border-purple-400">
            <p className="text-purple-700 font-bold animate-pulse" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
              Buddy is thinking... 🐾
            </p>
          </div>
        </motion.div>
      )}

      {/* Chat History (minimized at bottom) */}
      {messages.length > 0 && (
        <div className="absolute bottom-28 left-4 right-4 max-h-32 overflow-y-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-300 shadow-lg">
          <div className="space-y-2">
            {messages.slice(-3).map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm ${msg.role === 'user' ? 'text-right text-purple-800' : 'text-left text-purple-600'} font-semibold`}
                style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
              >
                {msg.role === 'user' ? '💬 ' : '🐕 '}{msg.content}
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Box (fixed at bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-30">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
          <div className="bg-white rounded-full px-6 py-4 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Talk to Buddy, dear..."
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-purple-900 placeholder-purple-400 text-lg font-bold"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              Send 💕
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 text-6xl opacity-50"
      >
        🐾
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 text-5xl opacity-50"
      >
        💕
      </motion.div>

    </div>
  );
}
