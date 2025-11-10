'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBox({ isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Woof! Sorry, I had trouble understanding that. Can you try again? 🐾',
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Woof! Something went wrong. Let\'s try that again! 🐾',
      }]);
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Chat Box */}
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[32rem] bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-8 border-purple-600 shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-5xl">🐕</span>
                <div>
                  <h3 className="text-white text-2xl font-bold">Buddy</h3>
                  <p className="text-purple-200 text-sm">Your loving companion</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white text-3xl hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-purple-700 text-lg mt-8">
                  <p className="text-5xl mb-4">🐾</p>
                  <p className="font-bold">Woof! Talk to me, Aayushi!</p>
                  <p className="text-sm mt-2">I'm here to chat and cheer you up! 💕</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-900 border-2 border-purple-300'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <span className="text-2xl mr-2">🐕</span>
                    )}
                    <span className="text-base leading-relaxed">{msg.content}</span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-purple-900 border-2 border-purple-300 px-4 py-3 rounded-2xl">
                    <span className="text-2xl mr-2">🐕</span>
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t-4 border-purple-300 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-full border-3 border-purple-400 focus:border-purple-600 focus:outline-none text-purple-900 font-bold text-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-bold text-lg"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

