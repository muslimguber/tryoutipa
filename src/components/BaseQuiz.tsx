import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Trophy, 
  RefreshCw, 
  Zap, 
  Loader2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Theme } from '../types';
import { ThemeButton } from './ThemeButton';

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
}

export interface BaseQuizProps {
  theme: Theme;
  title: string;
  quizNumber: number;
  questions: Question[];
  storageKey: string;
  onSuccess: (score: number) => void;
  onRetry: () => void;
  isGuru?: boolean;
}

export const BaseQuiz: React.FC<BaseQuizProps> = ({ 
  theme, 
  title, 
  quizNumber,
  questions, 
  storageKey,
  onSuccess,
  onRetry,
  isGuru
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  
  // Persistence keys
  const KEY_INDEX = `ipa_quiz_${storageKey}_currentIndex`;
  const KEY_ANSWERS = `ipa_quiz_${storageKey}_answers`;
  const KEY_SHUFFLED = `ipa_quiz_${storageKey}_shuffledQuestions`;
  const KEY_SHOW_RESULT = `ipa_quiz_${storageKey}_showResult`;

  const shuffleAndSet = () => {
    if (!questions || questions.length === 0) return;
    const shuffled = questions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    setShuffledQuestions(shuffled);

    if (isGuru) {
      const idealAnswers: Record<number, string> = {};
      shuffled.forEach((q: any) => {
        idealAnswers[q.id] = q.correctId;
      });
      setAnswers(idealAnswers);
    }
  };

  useEffect(() => {
    const savedIndex = localStorage.getItem(KEY_INDEX);
    const savedAnswers = localStorage.getItem(KEY_ANSWERS);
    const savedShuffled = localStorage.getItem(KEY_SHUFFLED);
    const savedShowResult = localStorage.getItem(KEY_SHOW_RESULT);

    if (savedIndex) setCurrentIndex(parseInt(savedIndex, 10));
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
    if (savedShowResult) setShowResult(savedShowResult === 'true');
    
    if (savedShuffled) {
      try {
        setShuffledQuestions(JSON.parse(savedShuffled));
        if (isGuru) {
            const parsed = JSON.parse(savedShuffled);
            const idealAnswers: Record<number, string> = {};
            parsed.forEach((q: any) => {
              idealAnswers[q.id] = q.correctId;
            });
            setAnswers(idealAnswers);
        }
      } catch (e) {
        shuffleAndSet();
      }
    } else {
      shuffleAndSet();
    }
  }, [questions, isGuru]);

  useEffect(() => {
    localStorage.setItem(KEY_INDEX, currentIndex.toString());
  }, [currentIndex, KEY_INDEX]);

  useEffect(() => {
    localStorage.setItem(KEY_ANSWERS, JSON.stringify(answers));
  }, [answers, KEY_ANSWERS]);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      localStorage.setItem(KEY_SHUFFLED, JSON.stringify(shuffledQuestions));
    }
  }, [shuffledQuestions, KEY_SHUFFLED]);

  useEffect(() => {
    localStorage.setItem(KEY_SHOW_RESULT, showResult.toString());
  }, [showResult, KEY_SHOW_RESULT]);

  if (shuffledQuestions.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
        <p className="text-lg font-black text-slate-800">Menyiapkan Soal Kuis {quizNumber}...</p>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion?.id]: optionId }));
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach(q => {
      if (answers[q.id] === q.correctId) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinish = async () => {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    setShowResult(true);
    
    if (percentage >= 90) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
    }
  };

  const handleReset = () => {
    localStorage.removeItem(KEY_INDEX);
    localStorage.removeItem(KEY_ANSWERS);
    localStorage.removeItem(KEY_SHUFFLED);
    localStorage.removeItem(KEY_SHOW_RESULT);
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
    shuffleAndSet();
    onRetry();
  };

  const handleSuccess = () => {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    localStorage.removeItem(KEY_INDEX);
    localStorage.removeItem(KEY_ANSWERS);
    localStorage.removeItem(KEY_SHUFFLED);
    localStorage.removeItem(KEY_SHOW_RESULT);
    onSuccess(percentage);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  if (showResult) {
    const passed = percentage >= 90;
    return (
      <div className="w-full max-w-2xl mx-auto py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-4"
          style={{ borderColor: theme.accent + '30' }}
        >
          <div className="p-8 text-center text-white space-y-2" style={{ backgroundColor: theme.bgSidebar }}>
            <Trophy size={64} className="mx-auto mb-4" style={{ color: theme.accent }} />
            <h2 className="text-3xl font-black">Hasil Kuis {quizNumber}</h2>
            <p className="font-bold opacity-80 uppercase tracking-widest text-xs">{title}</p>
          </div>

          <div className="p-10 text-center space-y-8">
            <div className="text-9xl font-black" style={{ color: passed ? '#10b981' : theme.bgMain }}>
              {percentage}
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100">
              {passed ? (
                <>
                  <div className="flex justify-center text-emerald-500 mb-4"><CheckCircle2 size={48} /></div>
                  <h3 className="text-2xl font-black mb-2 text-emerald-600">Luar Biasa!</h3>
                  <p className="text-slate-600 font-bold">Kamu lulus kuis ini dengan nilai memuaskan.</p>
                </>
              ) : (
                <>
                  <div className="flex justify-center text-rose-500 mb-4"><XCircle size={48} /></div>
                  <h3 className="text-2xl font-black mb-2 text-rose-600">Belum Lulus</h3>
                  <p className="text-slate-600 font-bold">Syarat minimal nilai adalah 90. Jangan menyerah, ulangi lagi dan pastikan kamu bisa menjawab dengan benar.</p>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
              {passed ? (
                <ThemeButton 
                  theme={theme}
                  onClick={handleSuccess}
                  fullWidth
                  style={{ backgroundColor: theme.bgMain, background: theme.bgMain, color: '#ffffff' }}
                >
                  <span>Lanjut</span>
                  <ArrowRight size={20} />
                </ThemeButton>
              ) : (
                <ThemeButton 
                  theme={theme}
                  onClick={handleReset}
                  fullWidth
                  style={{ backgroundColor: '#f43f5e', background: '#f43f5e', color: '#ffffff' }}
                >
                  <RefreshCw size={20} />
                  <span>Ulangi Kuis</span>
                </ThemeButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction * 50, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -direction * 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-[2rem] shadow-xl p-4 md:p-8 border-4 space-y-4 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            style={{ borderColor: theme.accent + '30' }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: theme.accent }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: theme.bgMain }} />
            
            <h3 className="text-base md:text-lg font-bold text-slate-800 leading-snug text-justify whitespace-pre-line relative z-10">
              {currentQuestion?.question}
            </h3>

            <div className="grid grid-cols-1 gap-2 sm:gap-3 relative z-10">
              {currentQuestion?.options.map((option: any, index: number) => {
                const isSelected = answers[currentQuestion?.id] === option.id;
                const labels = ['A', 'B', 'C', 'D'];
                return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.id)}
                      className={`w-full text-left flex items-start sm:items-center p-2 sm:p-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                        isSelected 
                          ? 'shadow-md text-white scale-[1.01]' 
                          : 'bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 border-slate-100 hover:shadow-sm'
                      }`}
                      style={isSelected ? { 
                        backgroundColor: theme.bgMain,
                        borderColor: theme.accent
                      } : {}}
                    >
                      <div className={`w-6 h-6 text-sm rounded-full flex items-center justify-center font-bold mr-2 shrink-0 shadow-sm transition-colors ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {labels[index]}
                      </div>
                      <span className="leading-snug text-sm sm:text-base">{option.text}</span>
                    </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center gap-4 pt-2">
        <ThemeButton
          theme={theme}
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`${currentIndex === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''} flex items-center gap-2 px-5 py-3 rounded-xl`}
          style={currentIndex > 0 
            ? { backgroundColor: theme.bgMain, color: '#ffffff' } 
            : { color: '#94a3b8', border: '2px solid #e2e8f0', backgroundColor: '#f1f5f9' }
          }
        >
          <ChevronLeft size={18} />
          <span className="font-bold text-sm sm:text-base hidden sm:inline">Sebelumnya</span>
        </ThemeButton>

        {currentIndex === totalQuestions - 1 ? (
          <ThemeButton
            theme={theme}
            onClick={handleFinish}
            disabled={answeredCount < totalQuestions}
            fullWidth
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold"
            style={answeredCount < totalQuestions ? {
               color: '#94a3b8', border: '2px solid #e2e8f0', backgroundColor: '#f1f5f9' 
            } : { 
               backgroundColor: theme.accent, color: '#ffffff',
               boxShadow: `0 10px 25px -5px ${theme.accent}60`
            }}
          >
            <span>Selesaikan Kuis</span>
            <CheckCircle2 size={20} />
          </ThemeButton>
        ) : (
          <ThemeButton
            theme={theme}
            onClick={nextQuestion}
            fullWidth
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold"
            style={{ backgroundColor: theme.bgMain, color: '#ffffff' }}
          >
            <span>Selanjutnya</span>
            <ChevronRight size={20} />
          </ThemeButton>
        )}
      </div>

      {/* Navigation Grid */}
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-[2rem] border-4 shadow-xl mt-4" style={{ borderColor: theme.accent + '20' }}>
        <h4 className="text-center font-black text-slate-400 mb-4 tracking-widest text-sm">PETA KUIS</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {shuffledQuestions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const isAnswered = !!answers[q.id];
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-14 sm:h-16 rounded-xl font-black text-base sm:text-lg transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                  isCurrent 
                    ? 'text-white scale-[1.05] shadow-lg z-10 ring-4' 
                    : isAnswered 
                      ? 'text-white shadow-md hover:scale-105' 
                      : 'bg-white text-slate-400 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-300'
                }`}
                style={isCurrent ? { 
                  backgroundColor: theme.accent,
                  ringColor: theme.accent + '50'
                } : isAnswered ? {
                  backgroundColor: theme.bgMain, opacity: 0.9
                } : {}}
              >
                {isCurrent && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                <span className="relative z-10">{idx + 1}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};
