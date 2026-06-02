import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS4_BAB4_QUESTIONS } from '../data/Kuis4Bab4';
import { Theme } from '../types';

export const Kuis4Bab4 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 4: GETARAN, GELOMBANG DAN CAHAYA"
      quizNumber={4}
      questions={KUIS4_BAB4_QUESTIONS}
      storageKey="bab4_kuis4"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
