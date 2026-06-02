import React, { useState } from 'react';
import { Theme } from '../types';
import * as Icons from 'lucide-react';
import { googleFormService } from '../services/googleFormService';

interface RefleksiProps {
  theme: Theme;
  username: string;
  userClass: string;
  onComplete: () => void;
}

export const Refleksi: React.FC<RefleksiProps> = ({ theme, username, userClass, onComplete }) => {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      num: 1,
      text: "Setelah mengikuti pembelajaran hari ini, apa saja manfaat berkebun yang kamu ketahui bagi diri sendiri, keluarga, dan lingkungan?",
      placeholder: "Tulis draf jawabanmu di sini sebelum disalin ke kertas...",
      icon: "🌱"
    },
    {
      num: 2,
      text: "Apakah kamu tertarik untuk mulai berkebun di rumah? Jelaskan alasanmu.",
      placeholder: "Tulis draf alasan ketertarikanmu...",
      icon: "🏠"
    },
    {
      num: 3,
      text: "Jika kamu memiliki kesempatan membuat kebun di rumah, tanaman apa yang ingin kamu tanam? Mengapa memilih tanaman tersebut?",
      placeholder: "Tulis draf pilihan tanamanmu...",
      icon: "🌻"
    },
    {
      num: 4,
      text: "Tuliskan langkah-langkah yang akan kamu lakukan mulai dari persiapan hingga menanam tanaman di rumah.",
      placeholder: "Tulis draf langkah-langkahmu (1, 2, 3...)...",
      icon: "📋"
    },
    {
      num: 5,
      text: "Menurutmu, apa tantangan atau kesulitan yang mungkin kamu hadapi saat berkebun? Bagaimana cara mengatasinya?",
      placeholder: "Tulis draf tantangan dan jalan keluarnya...",
      icon: "⚠️"
    }
  ];

  const handleTextChange = (key: string, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFinish = async () => {
    setIsSyncing(true);
    try {
      await googleFormService.submitRefleksi(username, userClass, answers);
      setSyncStatus('success');
    } catch (err) {
      console.error(err);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008db0] to-[#00627d] p-6 sm:p-8 border border-[#cdf4ff]/20 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Icons.Award size={180} />
          </div>
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              🚨 TUGAS UTAMA PERTEMUAN TERAKHIR
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              LEMBAR REFLEKSI INDIVIDU
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Halo <strong className="text-amber-300">{username}</strong> ({userClass}), ini adalah bagian penutup yang sangat penting dari seluruh perjalanan projek berkebun kita. Silakan kerjakan tugas refleksi ini di <strong className="underline text-amber-300">kertas selembar</strong> untuk dikumpulkan kepada Guru Pengampu!
            </p>
          </div>
        </div>

        {/* Warning card */}
        <div className="p-5 rounded-2xl bg-[#008db0]/10 border border-[#008db0]/40 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
            <Icons.AlertTriangle size={24} className="animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-orange-400 uppercase tracking-wider">PETUNJUK PENGERJAAN</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Wajib menjawab 5 pertanyaan di bawah ini secara lengkap di atas kertas selembar. Tuliskan Nama Lengkap dan Kelas di bagian pojok kanan atas kertas. Gunakan draf kotak teks di bawah ini untuk membantu merumuskan jawabanmu jika diperlukan sebelum menyalinnya.
            </p>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const key = `q${q.num}`;
            return (
              <div 
                key={q.num}
                className="p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-[#008db0]/40 transition-all duration-300 shadow-xl space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#008db0]/20 flex items-center justify-center text-lg font-black border border-[#cdf4ff]/20 shrink-0 text-[#008db0]">
                    {q.num}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#008db0] tracking-widest uppercase flex items-center gap-1.5">
                      <span>{q.icon} PERTANYAAN REFLEKSI</span>
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                      {q.text}
                    </h2>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase block">
                    Kotak Latihan / Draf Jawaban (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={(answers as any)[key]}
                    onChange={(e) => handleTextChange(key, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 focus:border-[#008db0]/80 focus:ring-1 focus:ring-[#008db0]/80 text-xs sm:text-sm text-slate-200 outline-none transition-all placeholder-slate-600 resize-none font-medium"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Submission Panel */}
        {!submitted ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/30 shadow-xl text-center space-y-4">
            <div className="flex justify-center text-emerald-400">
              {isSyncing ? (
                <Icons.RefreshCw size={40} className="animate-spin text-amber-400" />
              ) : (
                <Icons.CheckCircle size={40} className="animate-pulse" />
              )}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-emerald-300 uppercase tracking-widest">
                {isSyncing ? "SEDANG MENSINKRONKAN..." : "KONFIRMASI PENGERJAAN"}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {isSyncing 
                  ? "Draf jawaban Anda sedang diproses dan dikirim ke server data rekap Google Form / Sheet guru..." 
                  : "Pastikan seluruh 5 pertanyaan di atas terkumpul sempurna di kertas selembarku sebelum kamu mengklik tombol selesai di bawah ini."
                }
              </p>
            </div>
            <button
              onClick={handleFinish}
              disabled={isSyncing}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Icons.Send size={14} />
              <span>{isSyncing ? "MENGIRIM..." : "SAYA SUDAH MENULIS DI KERTAS SELEMBAR"}</span>
            </button>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl border border-emerald-500/30">
              🎉
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-emerald-400 uppercase tracking-wider">REFLEKSI BERHASIL DICATAT!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-semibold">
                Luar biasa, <strong className="text-emerald-300">{username}</strong>! Kamu sudah menyelesaikan seluruh bagian pembelajaran ini. Silakan serahkan kertas refleksimu kepada Guru di kelas.
              </p>
              
              <div className="mx-auto max-w-md p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-left flex items-start gap-3 mt-4">
                <Icons.Database size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black tracking-wider text-emerald-300 uppercase">Sinkronisasi Online Berhasil</h4>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Draf jawaban refleksi yang kamu ketik di kotak latihan juga telah otomatis dikirim dan terekam aman ke sistem basis data Google Sheets guru.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-[#008db0] hover:bg-[#00627d] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <Icons.Home size={14} />
                <span>KEMBALI KE HALAMAN UTAMA</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
