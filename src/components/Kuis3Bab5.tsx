import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS3_BAB5_QUESTIONS } from '../data/Kuis3Bab5';
import { Theme } from '../types';

export const Kuis3Bab5 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 5: UNSUR, SENYAWA, CAMPURAN"
      quizNumber={3}
      questions={KUIS3_BAB5_QUESTIONS}
      storageKey="bab5_kuis3"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
