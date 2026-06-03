import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS2_BAB4_QUESTIONS } from '../data/Kuis2Bab4';
import { Theme } from '../types';

export const Kuis2Bab4 = ({ theme, onSuccess, onRetry, isGuru }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void, isGuru?: boolean }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 4: GETARAN, GELOMBANG DAN CAHAYA"
      quizNumber={2}
      questions={KUIS2_BAB4_QUESTIONS}
      storageKey="bab4_kuis2"
      onSuccess={onSuccess}
      onRetry={onRetry}
      isGuru={isGuru}
    />
  );
};
