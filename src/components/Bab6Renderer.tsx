import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MateriBab6 } from './MateriBab6';
import { Kuis1Bab6 } from './Kuis1Bab6';
import { Kuis2Bab6 } from './Kuis2Bab6';
import { Kuis3Bab6 } from './Kuis3Bab6';
import { Kuis4Bab6 } from './Kuis4Bab6';
import { HasilBab6 } from './HasilBab6';

const TABS = ["Materi", "Kuis 1", "Kuis 2", "Kuis 3", "Kuis 4", "Hasil"];

export const Bab6Renderer = ({ theme, username, userClass, title, onComplete }: any) => {
  const isGuru = username?.toLowerCase() === 'gurusmp';
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState<number[]>(isGuru ? [100, 100, 100, 100] : [0, 0, 0, 0]);
  const [highestStep, setHighestStep] = useState(0);

  const handleNextMateri = () => {
    setStep(1);
    setHighestStep(prev => Math.max(prev, 1));
  };

  const handleKuisSuccess = (quizIndex: number, score: number) => {
    setScores(prev => {
      const newScores = [...prev];
      newScores[quizIndex] = score;
      return newScores;
    });
    setStep(quizIndex + 2);
    setHighestStep(prev => Math.max(prev, quizIndex + 2));
  };

  const handleTabClick = (index: number) => {
    if (isGuru || index <= highestStep) {
      setStep(index);
      setHighestStep(prev => Math.max(prev, index));
    }
  };

  const renderStep = () => {
    switch(step) {
      case 0: return <MateriBab6 onNext={handleNextMateri} title={title} />;
      case 1: return <Kuis1Bab6 theme={theme} isGuru={isGuru} onSuccess={(s: number) => handleKuisSuccess(0, s)} onRetry={() => {}} />;
      case 2: return <Kuis2Bab6 theme={theme} isGuru={isGuru} onSuccess={(s: number) => handleKuisSuccess(1, s)} onRetry={() => {}} />;
      case 3: return <Kuis3Bab6 theme={theme} isGuru={isGuru} onSuccess={(s: number) => handleKuisSuccess(2, s)} onRetry={() => {}} />;
      case 4: return <Kuis4Bab6 theme={theme} isGuru={isGuru} onSuccess={(s: number) => handleKuisSuccess(3, s)} onRetry={() => {}} />;
      case 5: return <HasilBab6 scores={scores} username={username} userClass={userClass} onKirim={onComplete} />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start py-8 px-4">
      {/* Tabs Menu */}
      <div className="w-full max-w-5xl mb-8 flex justify-between sm:justify-center items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
        {TABS.map((tab, idx) => {
          const isUnlocked = isGuru || idx <= highestStep;
          const isActive = step === idx;
          return (
            <button
              key={idx}
              onClick={() => handleTabClick(idx)}
              disabled={!isUnlocked}
              className={`min-w-[100px] py-3 px-6 rounded-2xl text-sm font-black transition-all duration-300 whitespace-nowrap shadow-sm border-b-4 ${
                isActive 
                  ? 'bg-orange-500 text-white border-orange-700 transform -translate-y-1 scale-105' 
                  : isUnlocked
                    ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full max-w-4xl">
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
