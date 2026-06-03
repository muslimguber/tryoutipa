import fs from 'fs';
import path from 'path';

const dir = process.cwd() + '/src/components';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Kuis') && f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf-8');
  
  // replace the props definition
  // from: { theme, onSuccess, onRetry }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void }
  // to: { theme, onSuccess, onRetry, isGuru }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void, isGuru?: boolean }
  
  content = content.replace(
    /({ theme, onSuccess, onRetry }: { theme: Theme, onSuccess: \(score: number\) => void, onRetry: \(\) => void })/,
    '{ theme, onSuccess, onRetry, isGuru }: { theme: Theme, onSuccess: (score: number) => void, onRetry: () => void, isGuru?: boolean }'
  );
  
  // add isGuru prop to BaseQuiz
  content = content.replace(
    /onRetry={onRetry}\n\s+\/>/,
    'onRetry={onRetry}\n      isGuru={isGuru}\n    />'
  );
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log('Updated all Kuis files to pass isGuru');
