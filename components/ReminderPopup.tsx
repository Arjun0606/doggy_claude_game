'use client';

import { motion } from 'framer-motion';

const reminders = [
  "btw Aayushi 💭 just a silly reminder — you're loved and you make everything cuter!",
  "psst Aayushi ✨ remember you're literally my favourite chaos-ball",
  "hey you 💫 just wanted to say you're doing amazing",
  "Aayushi! 🌟 reminder that you're the most precious goofball",
  "hi Aayushi 💕 don't forget you're absolutely adorable",
];

export default function ReminderPopup() {
  const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-sm mx-4"
    >
      <div className="bg-gradient-to-r from-doodle-pink to-doodle-purple text-gray-800 px-6 py-4 rounded-2xl border-3 border-black shadow-xl doodle-outline">
        <p className="text-sm font-medium text-center">{randomReminder}</p>
      </div>
    </motion.div>
  );
}

