import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MateriBab6 } from './MateriBab6';
import { Kuis1Bab6 } from './Kuis1Bab6';
import { Kuis2Bab6 } from './Kuis2Bab6';
import { Kuis3Bab6 } from './Kuis3Bab6';
import { Kuis4Bab6 } from './Kuis4Bab6';
import { HasilBab6 } from './HasilBab6';

export const Bab6Renderer = ({ theme, username, userClass, title, onComplete }: any) => {
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState<number[]>([]);

  const handleNext = (score?: number) => {
    if (score !== undefined) setScores(prev => [...prev, score]);
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch(step) {
      case 0: return <MateriBab6 onNext={() => handleNext()} title={title} />;
      case 1: return <Kuis1Bab6 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 2: return <Kuis2Bab6 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 3: return <Kuis3Bab6 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 4: return <Kuis4Bab6 theme={theme} onSuccess={handleNext} onRetry={() => {}} />;
      case 5: return <HasilBab6 scores={scores} username={username} userClass={userClass} onKirim={onComplete} />;
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
