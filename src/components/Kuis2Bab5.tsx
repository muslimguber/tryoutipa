import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS2_BAB5_QUESTIONS } from '../data/Kuis2Bab5';
import { Theme } from '../types';

export const Kuis2Bab5 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 5: UNSUR, SENYAWA, CAMPURAN"
      quizNumber={2}
      questions={KUIS2_BAB5_QUESTIONS}
      storageKey="bab5_kuis2"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
