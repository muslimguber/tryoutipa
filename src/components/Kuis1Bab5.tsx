import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS1_BAB5_QUESTIONS } from '../data/Kuis1Bab5';
import { Theme } from '../types';

export const Kuis1Bab5 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 5: UNSUR, SENYAWA, CAMPURAN"
      quizNumber={1}
      questions={KUIS1_BAB5_QUESTIONS}
      storageKey="bab5_kuis1"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
