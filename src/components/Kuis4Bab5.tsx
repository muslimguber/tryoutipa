import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS4_BAB5_QUESTIONS } from '../data/Kuis4Bab5';
import { Theme } from '../types';

export const Kuis4Bab5 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 5: UNSUR, SENYAWA, CAMPURAN"
      quizNumber={4}
      questions={KUIS4_BAB5_QUESTIONS}
      storageKey="bab5_kuis4"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
