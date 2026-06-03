import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS1_BAB4_QUESTIONS } from '../data/Kuis1Bab4';
import { Theme } from '../types';

export const Kuis1Bab4 = ({ theme, onSuccess, onRetry, isGuru }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void, isGuru?: boolean }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 4: GETARAN, GELOMBANG DAN CAHAYA"
      quizNumber={1}
      questions={KUIS1_BAB4_QUESTIONS}
      storageKey="bab4_kuis1"
      onSuccess={onSuccess}
      onRetry={onRetry}
      isGuru={isGuru}
    />
  );
};
