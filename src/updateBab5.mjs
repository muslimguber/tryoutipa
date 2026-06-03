import fs from 'fs';

[1, 2, 3, 4].forEach(i => {
  const content = `import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { KUIS${i}_BAB5_QUESTIONS } from '../data/Kuis${i}Bab5';
import { Theme } from '../types';

export const Kuis${i}Bab5 = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB 5: UNSUR, SENYAWA, CAMPURAN"
      quizNumber={${i}}
      questions={KUIS${i}_BAB5_QUESTIONS}
      storageKey="bab5_kuis${i}"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
`;
  fs.writeFileSync(process.cwd() + `/src/components/Kuis${i}Bab5.tsx`, content);
});

console.log("Updated Kuis files for bab 5.");
