import React, { useState } from 'react';
import { Save, CheckCircle2, Loader2, Award, ExternalLink } from 'lucide-react';

export const HasilBab5 = ({ scores, username, userClass, onKirim }: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isGuru = username?.toLowerCase() === 'gurusmp';

  const handleKirim = () => {
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("entry.1357613309", username || "");
    formData.append("entry.179734801", userClass || "");
    formData.append("entry.724666537", (scores[0] || 0).toString());
    formData.append("entry.785433519", (scores[1] || 0).toString());
    formData.append("entry.1989871815", (scores[2] || 0).toString());
    formData.append("entry.2076904742", (scores[3] || 0).toString());

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSfgyRBInr9fjVyjQEihcOV-oA3SKPGp7tWI7zvooMK5f4CMEw/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    })
    .then(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(onKirim, 2000);
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Terjadi kesalahan saat mengirim nilai.");
    });
  };

  return (
    <div className="bg-white/95 p-8 rounded-[2rem] shadow-2xl max-w-2xl mx-auto text-center">
      <Award size={80} className="text-indigo-400 mx-auto mb-4" />
      <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">Hasil Tryout Bab 5</h2>
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
        <button onClick={handleKirim} disabled={loading} className="w-full py-4 rounded-xl bg-blue-600 text-white font-black uppercase flex items-center justify-center gap-2 mb-4 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
          {loading ? <Loader2 size={24} className="animate-spin"/> : <><Save size={20} /> KIRIM NILAI</>}
        </button>
      )}

      {isGuru && (
        <div className="mt-8 pt-6 border-t-2 border-slate-100">
          <a
            href="https://docs.google.com/spreadsheets/d/1igKlBex1-P1KnMctXGLJ-FyUZ1x5CNX-4GPZs5gYat4/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-colors focus:ring-4 focus:ring-indigo-100"
          >
            <ExternalLink size={20} />
            Buka Spreadsheet Rekap Nilai Bab 5
          </a>
        </div>
      )}
    </div>
  );
};
