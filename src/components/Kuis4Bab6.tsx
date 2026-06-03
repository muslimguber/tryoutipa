import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS4_BAB6_QUESTIONS } from '../data/Kuis4Bab6';
import { Theme } from '../types';

export const Kuis4Bab6 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 6: STRUKTUR BUMI"
      quizNumber={4}
      questions={KUIS4_BAB6_QUESTIONS}
      storageKey="bab6_kuis4"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
