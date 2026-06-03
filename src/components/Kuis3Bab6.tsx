import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS3_BAB6_QUESTIONS } from '../data/Kuis3Bab6';
import { Theme } from '../types';

export const Kuis3Bab6 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 6: STRUKTUR BUMI"
      quizNumber={3}
      questions={KUIS3_BAB6_QUESTIONS}
      storageKey="bab6_kuis3"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
