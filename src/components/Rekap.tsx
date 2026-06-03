import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink,
  ClipboardList
} from 'lucide-react';
import { Theme } from '../types';

interface RekapProps {
  onBack: () => void;
  theme: Theme;
}

const darkenColor = (hex: string, amount: number = 0.25) => {
  if (!hex || !hex.startsWith('#')) return hex;
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const Rekap: React.FC<RekapProps> = ({ theme }) => {
  const MODULES_CONFIG = [
    {
      id: 4,
      title: "Bab 4",
      fullTitle: "Nilai Tryout Bab 4",
      subtitle: "Getaran, Gelombang, dan Cahaya",
      sheetUrl: "https://docs.google.com/spreadsheets/d/17X97yKtPfO_I2BKtlDyQiFuGE6891b-SJWZ7Z2xE-g0/edit?usp=sharing",
      embedUrl: "https://docs.google.com/spreadsheets/d/17X97yKtPfO_I2BKtlDyQiFuGE6891b-SJWZ7Z2xE-g0/preview",
      available: true
    },
    {
      id: 5,
      title: "Bab 5",
      fullTitle: "Nilai Tryout Bab 5",
      subtitle: "Unsur, Senyawa, dan Campuran",
      sheetUrl: "https://docs.google.com/spreadsheets/d/1igKlBex1-P1KnMctXGLJ-FyUZ1x5CNX-4GPZs5gYat4/edit?usp=sharing",
      embedUrl: "https://docs.google.com/spreadsheets/d/1igKlBex1-P1KnMctXGLJ-FyUZ1x5CNX-4GPZs5gYat4/preview",
      available: true
    },
    {
      id: 6,
      title: "Bab 6",
      fullTitle: "Nilai Tryout Bab 6",
      subtitle: "Struktur Bumi dan Perkembangannya",
      sheetUrl: "https://docs.google.com/spreadsheets/d/1wmegNlkFtYoL8TSG94VoYM0KGy9sCNe7R6KADuQ5RXQ/edit?usp=sharing",
      embedUrl: "https://docs.google.com/spreadsheets/d/1wmegNlkFtYoL8TSG94VoYM0KGy9sCNe7R6KADuQ5RXQ/preview",
      available: true
    }
  ];

  const [selectedModule, setSelectedModule] = useState<number>(MODULES_CONFIG[0].id);

  const currentModuleData = MODULES_CONFIG.find(m => m.id === selectedModule) || MODULES_CONFIG[0];
  const darkThemeColor = darkenColor(theme.bgMain, 0.25);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 pb-12">
      {/* Header Card */}
      <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border-2 border-white/60 shadow-lg text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-100" style={{ color: theme.bgMain }}>
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950">
              Rekap Nilai Siswa
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="w-full bg-white/80 p-1.5 rounded-xl border border-white/60 shadow-md flex items-stretch gap-1 overflow-x-auto select-none no-scrollbar">
        {MODULES_CONFIG.map((mod) => {
          const isActive = selectedModule === mod.id;
          return (
            <div
              key={mod.id}
              onClick={() => {
                if (mod.available) {
                  setSelectedModule(mod.id);
                }
              }}
              className={`flex-1 min-w-[100px] text-center py-2.5 px-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive 
                  ? 'text-white shadow-md shadow-slate-200/50'
                  : 'bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600'
              } ${!mod.available && 'opacity-40 cursor-not-allowed'}`}
              style={
                isActive && mod.available
                  ? { background: `linear-gradient(135deg, ${theme.bgMain}, ${darkenColor(theme.bgMain, 0.2)})` }
                  : { cursor: mod.available ? 'pointer' : 'not-allowed' }
              }
            >
              {mod.title}
            </div>
          );
        })}
      </div>

      {/* INDIVIDUAL EMBED VIEW */}
      <motion.div
        key={currentModuleData.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Navigation / Info Card */}
        <div className="bg-white/85 backdrop-blur-md p-4 rounded-xl border-2 border-white/60 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left min-w-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md shrink-0 border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${theme.bgMain}, ${darkThemeColor})`
                }}
              >
                {currentModuleData.id}
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-black text-slate-800 leading-tight truncate">
                  {currentModuleData.fullTitle} 
                </h2>
                <p className="text-[11px] font-bold text-slate-500 truncate">
                  {currentModuleData.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentModuleData.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all active:scale-95 text-white flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg border border-white/20"
                style={{
                  backgroundColor: theme.bgMain,
                  background: `linear-gradient(135deg, ${theme.bgMain}, ${darkThemeColor})`
                }}
              >
                <span>Buka Google Sheets</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Embed Loader & Container */}
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border-2 border-white/60 shadow-lg overflow-hidden relative">
          <div className="relative h-[680px] w-full bg-slate-50 rounded-xl overflow-hidden border-2 border-slate-100 shadow-inner flex items-center justify-center">
            
            {/* Loader Placeholder behind the iframe */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 pointer-events-none z-0">
              <div 
                className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin"
                style={{ borderTopColor: theme.bgMain }}
              />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                Memuat Lembar Nilai...
              </p>
            </div>

            {/* Substantially sized iframe */}
            <iframe 
              src={currentModuleData.embedUrl}
              className="absolute inset-0 w-full h-full border-0 z-10 rounded-xl bg-transparent"
              allowFullScreen
              title={`Lembar Nilai ${currentModuleData.title}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
