import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS2_BAB6_QUESTIONS } from '../data/Kuis2Bab6';
import { Theme } from '../types';

export const Kuis2Bab6 = ({ theme, onSuccess, onRetry, isGuru }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void, isGuru?: boolean }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 6: STRUKTUR BUMI"
      quizNumber={2}
      questions={KUIS2_BAB6_QUESTIONS}
      storageKey="bab6_kuis2"
      onSuccess={onSuccess}
      onRetry={onRetry}
      isGuru={isGuru}
    />
  );
};
