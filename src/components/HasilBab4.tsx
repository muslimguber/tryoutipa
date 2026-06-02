import React, { useState } from 'react';
import { Save, CheckCircle2, Loader2, Award } from 'lucide-react';

export const HasilBab4 = ({ scores, username, userClass, onKirim }: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleKirim = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(onKirim, 2000); }, 1500);
  };

  return (
    <div className="bg-white/95 p-8 rounded-[2rem] shadow-2xl max-w-2xl mx-auto text-center">
      <Award size={80} className="text-indigo-400 mx-auto mb-4" />
      <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">Hasil Tryout Bab 4</h2>
      <p className="text-slate-500 font-bold mb-8">{username} - {userClass}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[1, 2, 3, 4].map((quiz, idx) => (
           <div key={quiz} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase">Kuis {quiz}</p>
             <p className="text-2xl font-black text-indigo-600">{scores[idx] || 0}</p>
           </div>
        ))}
      </div>

      {success ? (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold flex flex-col items-center"><CheckCircle2 size={32}/>Berhasil Dikirim!</div>
      ) : (
        <button onClick={handleKirim} disabled={loading} className="w-full py-4 rounded-xl bg-blue-600 text-white font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 size={24} className="animate-spin"/> : <><Save size={20} /> KIRIM NILAI</>}
        </button>
      )}
    </div>
  );
};
