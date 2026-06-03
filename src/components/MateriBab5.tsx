import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const MateriBab5 = ({ onNext }: any) => (
  <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
    <div className="w-full relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/40">
      <img 
        src="https://i.ibb.co.com/GfppkCn4/Gemini-Generated-Image-vjmx9vjmx9vjmx9v-1.png" 
        alt="Cover Bab 5" 
        className="w-full h-auto object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onNext} 
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-black text-xl lg:text-2xl shadow-[0_10px_30px_-10px_rgba(5,150,105,0.5)] transition-colors inline-flex items-center gap-4"
    >
      MULAI TRYOUT <ChevronRight size={28} />
    </motion.button>
  </div>
);
