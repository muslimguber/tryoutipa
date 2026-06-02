import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { DUMMY_BAB${bab}_QUESTIONS } from '../data/KuisBab${bab}';
import { Theme } from '../types';

export const Kuis${i}Bab${bab} = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB ${bab} KUIS ${i}"
      quizNumber={${i}}
      questions={DUMMY_BAB${bab}_QUESTIONS}
      storageKey="bab${bab}_kuis${i}"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
