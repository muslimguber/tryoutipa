import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS1_BAB6_QUESTIONS } from '../data/Kuis1Bab6';
import { Theme } from '../types';

export const Kuis1Bab6 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 6: STRUKTUR BUMI"
      quizNumber={1}
      questions={KUIS1_BAB6_QUESTIONS}
      storageKey="bab6_kuis1"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
