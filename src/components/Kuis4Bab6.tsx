import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCw } from 'lucide-react';
import { Theme } from '../types';

interface KuisProps {
  theme?: Theme;
  onSuccess: (score: number) => void;
  onRetry: () => void;
}

export const Kuis4Bab6: React.FC<KuisProps> = ({ theme, onSuccess, onRetry }) => {
  const [questions] = useState(Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    text: `Contoh Soal ${idx + 1} Kuis 4 Bab 6 (Akan diganti nanti)`,
    options: [
      { id: 'a', text: 'Pilihan A' },
      { id: 'b', text: 'Pilihan B' },
      { id: 'c', text: 'Pilihan C' },
      { id: 'd', text: 'Pilihan D' }
    ],
    correctAnswer: 'a'
  })));

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentIdx].id]: optionId }));
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score += 100 / questions.length;
    });
    return Math.round(score);
  };

  const score = calculateScore();

  if (showResult) {
    const passed = score >= 90;
    return (
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl text-center shadow-xl border border-white/20">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Hasil Kuis 4 Bab 6</h2>
        <div className="text-6xl font-black my-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {score}
        </div>
        {passed ? (
          <div>
             <div className="flex justify-center text-emerald-500 mb-4"><CheckCircle2 size={48} /></div>
             <p className="text-slate-600 mb-6 font-bold">Luar Biasa!</p>
             <button onClick={() => onSuccess(score)} className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl">Lanjut <ArrowRight className="inline"/></button>
          </div>
        ) : (
          <div>
             <div className="flex justify-center text-rose-500 mb-4"><XCircle size={48} /></div>
             <p className="text-slate-600 mb-6 font-bold">Syarat minimal 90. Mari ulangi lagi.</p>
             <button onClick={() => { setAnswers({}); setCurrentIdx(0); setShowResult(false); onRetry(); }} className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-xl">
               <RotateCw className="inline mr-2"/> Ulangi Kuis
             </button>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  return (
    <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-xl w-full max-w-3xl">
      <div className="text-center mb-6"><span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold">Soal {currentIdx + 1}/{questions.length}</span></div>
      <h3 className="text-xl font-black text-slate-800 mb-8 text-center">{currentQ.text}</h3>
      <div className="space-y-3">
        {currentQ.options.map(opt => (
          <button key={opt.id} onClick={() => handleAnswer(opt.id)} className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 font-bold text-slate-700">{opt.text}</button>
        ))}
      </div>
    </div>
  );
};
