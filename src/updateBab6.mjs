import fs from 'fs';

[1, 2, 3, 4].forEach(i => {
  const content = `import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS${i}_BAB6_QUESTIONS } from '../data/Kuis${i}Bab6';
import { Theme } from '../types';

export const Kuis${i}Bab6 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 6: STRUKTUR BUMI"
      quizNumber={${i}}
      questions={KUIS${i}_BAB6_QUESTIONS}
      storageKey="bab6_kuis${i}"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
`;
  fs.writeFileSync(process.cwd() + `/src/components/Kuis${i}Bab6.tsx`, content);
});

console.log("Updated Kuis files for bab 6.");
