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
      
      setShowSpeechBubble(true);
      setDogAction('happy');
      
      setTimeout(() => {
        setShowSpeechBubble(false);
        setDogAction('idle');
      }, 8000);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Woof! Something went wrong. Let\'s try that again! 🐾';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      setCurrentBuddyMessage(errorMsg);
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
    <div className="flex flex-col h-screen w-screen overflow-hidden relative">
      
      {/* Isometric Room Background */}
      <div className="absolute inset-0">
        <Image
          src="/room-bg.png"
          alt="room"
          fill
          className="object-cover pixelated opacity-50"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200/40 via-blue-100/40 to-purple-100/40" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-4">
          
          {/* Welcome Message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-8 px-4"
            >
              <h1 className="text-4xl font-bold text-purple-800 mb-2 drop-shadow-lg" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                Hi Aayushi! 💕
              </h1>
              <p className="text-xl text-purple-700 drop-shadow-md" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                I'm Buddy! Arjun made me just for you! 🐕
              </p>
            </motion.div>
          )}

          {/* Animated Dog */}
          <div className="flex justify-center items-end min-h-[45vh] px-4 relative">
            <motion.div
              animate={{
                y: dogAction === 'happy' ? [0, -10, 0] : dogAction === 'excited' ? [0, -20, -10, -20, 0] : [0, -5, 0],
              }}
              transition={{
                duration: dogAction === 'excited' ? 0.6 : 2,
                repeat: dogAction === 'idle' ? Infinity : dogAction === 'excited' ? 3 : 2,
                repeatType: 'reverse',
              }}
              className="relative mb-8"
            >
              
              {/* Speech Bubble - Near Mouth */}
              <AnimatePresence>
                {showSpeechBubble && currentBuddyMessage && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-[90vw] max-w-md z-20"
                  >
                    <div className="bg-white rounded-3xl p-4 shadow-2xl border-4 border-purple-500 relative">
                      {/* Tail pointing down */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-purple-500" />
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-white" />
                      
                      <p className="text-purple-900 text-base font-bold leading-relaxed" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                        {currentBuddyMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Dog Sprite */}
              <DogSprite 
                action={isLoading || showSpeechBubble ? 'bark' : 'idle'}
                className="drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Loading */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg border-3 border-purple-400">
                <p className="text-purple-700 font-bold animate-pulse" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                  Buddy is thinking... 🐾
                </p>
              </div>
            </motion.div>
          )}

          {/* Chat History */}
          {messages.length > 0 && (
            <div className="mx-4 mt-6 mb-4 max-h-48 overflow-y-auto bg-white/90 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-300 shadow-lg">
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm ${msg.role === 'user' ? 'text-right text-purple-800' : 'text-left text-purple-600'} font-semibold`}
                    style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                  >
                    {msg.role === 'user' ? '💬 ' : '🐕 '}{msg.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* Fixed Input */}
        <div className="flex-shrink-0 p-4 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
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
                Send
              </motion.button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
