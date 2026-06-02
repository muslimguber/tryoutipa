import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

export const MateriBab5 = ({ onNext, title }: any) => (
  <div className="bg-white/95 p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-4xl mx-auto">
    <BookOpen size={60} className="text-indigo-300 mb-4" />
    <h1 className="text-xl text-indigo-600 font-bold uppercase mb-2">PENGANTAR MATERI BAB 5</h1>
    <h2 className="text-3xl font-black text-slate-800 mb-8">{title}</h2>
    <div className="text-slate-600 font-medium mb-12 space-y-4">
      <p>Selamat datang di Tryout Bab 5.</p>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
        <h4 className="font-bold text-blue-800 mb-2">Peraturan Tryout:</h4>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>4 tahap kuis @20 soal.</li>
          <li>Syarat lulus minimal per kuis adalah nilai <b>90</b>. Harus mengulang bila gagal.</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black inline-flex items-center gap-3">
      Mulai Kuis 1 <ChevronRight size={20} />
    </button>
  </div>
);
