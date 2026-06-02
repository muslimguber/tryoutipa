import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS3_BAB4_QUESTIONS } from '../data/Kuis3Bab4';
import { Theme } from '../types';

export const Kuis3Bab4 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 4: GETARAN, GELOMBANG DAN CAHAYA"
      quizNumber={3}
      questions={KUIS3_BAB4_QUESTIONS}
      storageKey="bab4_kuis3"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
