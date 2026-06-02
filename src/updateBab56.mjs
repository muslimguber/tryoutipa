import fs from 'fs';

[5, 6].forEach(bab => {
  const dummyQuestions = Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    question: `Contoh Soal \${idx + 1} Kuis Bab \${bab} (Akan diganti nanti)`,
    options: [
      { id: 'a', text: 'Pilihan A' },
      { id: 'b', text: 'Pilihan B' },
      { id: 'c', text: 'Pilihan C' },
      { id: 'd', text: 'Pilihan D' }
    ],
    correctId: 'a'
  }));

  const dataContent = `export const DUMMY_BAB\${bab}_QUESTIONS = \${JSON.stringify(dummyQuestions, null, 2)};\n`;
  fs.writeFileSync(process.cwd() + `/src/data/KuisBab\${bab}.ts`, dataContent);

  [1, 2, 3, 4].forEach(i => {
    const content = `import React from 'react';
import { BaseQuiz } from './BaseQuiz';
import { DUMMY_BAB\${bab}_QUESTIONS } from '../data/KuisBab\${bab}';
import { Theme } from '../types';

export const Kuis\${i}Bab\${bab} = ({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }) => {
  return (
    <BaseQuiz
      theme={theme}
      title="BAB \${bab} KUIS \${i}"
      quizNumber={\${i}}
      questions={DUMMY_BAB\${bab}_QUESTIONS}
      storageKey="bab\${bab}_kuis\${i}"
      onSuccess={onSuccess}
      onRetry={onRetry}
    />
  );
};
`;
    fs.writeFileSync(process.cwd() + `/src/components/Kuis\${i}Bab\${bab}.tsx`, content);
  });
});

console.log("Updated dummy Kuis files for bab 5 and 6.");
