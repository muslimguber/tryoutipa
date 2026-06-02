import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MateriBab5 } from './MateriBab5';
import { Kuis1Bab5 } from './Kuis1Bab5';
import { Kuis2Bab5 } from './Kuis2Bab5';
import { Kuis3Bab5 } from './Kuis3Bab5';
import { Kuis4Bab5 } from './Kuis4Bab5';
import { HasilBab5 } from './HasilBab5';

export const Bab5Renderer = ({ theme, username, userClass, title, onComplete }: any) => {
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState<number[]>([]);

  const handleNext = (score?: number) => {
    if (score !== undefined) setScores(prev => [...prev, score]);
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch(step) {
      case 0: return <MateriBab5 onNext={() => handleNext()} title={title} />;
      case 1: return <Kuis1Bab5 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 2: return <Kuis2Bab5 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 3: return <Kuis3Bab5 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 4: return <Kuis4Bab5 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 5: return <HasilBab5 scores={scores} username={username} userClass={userClass} onKirim={onComplete} />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full max-w-4xl">
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
