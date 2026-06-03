import React from 'react';
import { motion } from 'motion/react';
import { GardenDecorations } from './GardenDecorations';
import { User, Trash2, History } from 'lucide-react';

interface LoginProps {
  username: string;
  setUsername: (name: string) => void;
  userClass: string;
  setUserClass: (className: string) => void;
  onLogin: (e: React.FormEvent) => void;
  userHistory?: Array<{ username: string; userClass: string }>;
  onQuickLogin?: (username: string, userClass: string) => void;
  onDeleteHistory?: (username: string, userClass: string) => void;
}

/**
 * Login component for the name input screen.
 */
export const Login: React.FC<LoginProps> = ({ 
  username, 
  setUsername, 
  userClass, 
  setUserClass, 
  onLogin,
  userHistory = [],
  onQuickLogin,
  onDeleteHistory
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const classes = ['8A', '8B', '8C', '8D', '8E', '8F', '8G', '8H', '8I'];

  return (
    <div id="app-wrapper" className="w-full h-screen overflow-hidden relative leaf-pattern" style={{ background: '#0a018e', fontFamily: "'Nunito', sans-serif" }}>
      <GardenDecorations />
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="bg-black/20 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl max-w-xl w-full flex flex-col items-center">
          {/* Title */}
          <div className="fade-up-d1 flex flex-col items-center gap-3 mb-4">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ perspective: 1000 }}
            >
              <img 
                src="https://i.ibb.co.com/kVLW5n61/logo-smpn-1-bengkalis-kecil-Copy.png" 
                alt="Logo SMPN 1 Bengkalis" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <h1 id="hero-title" className="text-xl md:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#f3e8ff' }}>
              Selamat Datang <br/> di Aplikasi Tryout IPA
            </h1>
          </div>

          {/* Decorative line */}
          <div className="fade-up-d1 flex items-center gap-3 my-2">
            <div style={{ background: '#d8b4fe', height: '2px', width: '40px', borderRadius: '2px' }}></div>
            <span className="text-lg">🍇</span>
            <div style={{ background: '#d8b4fe', height: '2px', width: '40px', borderRadius: '2px' }}></div>
          </div>

          {/* Subtitle */}
          <div className="fade-up-d2 space-y-1">
            <p id="hero-subtitle" className="text-sm md:text-base max-w-md leading-relaxed mx-auto" style={{ color: '#d8b4fe', opacity: 0.8 }}>
              "Banyak Latihan Banyak dapat Ilmu"
            </p>
          </div>

          {/* Name & Class Input Section */}
          <div className="fade-up-d3 mt-4 w-full max-w-xs md:max-w-sm">
            <form onSubmit={onLogin} className="flex flex-col gap-3">
              <div className="relative w-full">
                <input 
                  type="text" 
                  value={username}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => {
                    // Slight delay to allow clicking deletion button if needed, 
                    // although onMouseDown handles item selection instantly.
                    setTimeout(() => setShowDropdown(false), 200);
                  }}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setUsername(val);
                    setShowDropdown(true);
                    if (val.toLowerCase() === 'gurusmp') {
                      setUserClass('guru');
                    } else if (userClass === 'guru') {
                      setUserClass('');
                    }
                  }}
                  placeholder="MASUKKAN NAMA ANDA" 
                  className="w-full px-5 py-3.5 rounded-md text-center text-base md:text-lg font-bold border-2 transition-all outline-none" 
                  style={{ background: 'rgba(255,255,255,0.95)', borderColor: '#bfdbfe', color: '#0a018e' }}
                  required
                /> 

                {/* Dropdown for Student History */}
                {showDropdown && userHistory && userHistory.length > 0 && (
                  <div className="absolute left-0 right-0 bottom-full mb-1.5 bg-white border-2 border-indigo-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-56 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-bottom-1 duration-150">
                    {(() => {
                      const filtered = userHistory;

                      if (filtered.length === 0) {
                        return (
                          <div className="px-4 py-3.5 text-xs text-slate-400 font-bold text-center">
                            Nama Tidak Ditemukan di Riwayat
                          </div>
                        );
                      }

                      return filtered.map((item, idx) => {
                        const initials = item.username
                          .trim()
                          .split(/\s+/)
                          .map(word => word[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase();

                        return (
                          <div 
                            key={`${item.username}-${item.userClass}-${idx}`}
                            onMouseDown={(e) => {
                              // Don't trigger blur
                              e.preventDefault();
                              setUsername(item.username.toUpperCase());
                              setUserClass(item.userClass);
                              setShowDropdown(false);
                            }}
                            className="flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50 transition-colors pointer-events-auto cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-2 max-w-[70%] min-w-0">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-shrink-0 items-center justify-center font-bold text-[10px] text-white shadow-inner">
                                {initials || <User size={10} />}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{item.username}</h4>
                                <p className="text-[10px] font-semibold text-slate-400">Kelas {item.userClass}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md border border-indigo-100">
                                Pilih
                              </span>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  onDeleteHistory?.(item.username, item.userClass);
                                }}
                                className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                                title="Hapus dari riwayat"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              <select
                value={userClass}
                onChange={(e) => setUserClass(e.target.value)}
                className={`w-full px-6 py-4 rounded-md text-center text-lg font-semibold border-2 transition-all outline-none appearance-none cursor-pointer ${username.toLowerCase() === 'gurusmp' ? 'opacity-80' : ''}`}
                style={{ background: 'rgba(255,255,255,0.95)', borderColor: '#bfdbfe', color: '#0a018e' }}
                required
                disabled={username.toLowerCase() === 'gurusmp'}
              >
                <option value="" disabled>Pilih Kelas</option>
                {userClass === 'guru' && <option value="guru">Guru</option>}
                {classes.map(c => (
                  <option key={c} value={c}>Kelas {c}</option>
                ))}
              </select>

              <button 
                type="submit" 
                className="btn-garden pulse-glow inline-flex items-center justify-center gap-3 px-10 py-5 rounded-md text-xl font-bold tracking-wide mt-2 w-full" 
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)', color: '#fff', border: 'none', cursor: 'pointer' }}
              > 
                <span>MASUK</span> 
              </button>
            </form>
          </div>

          {/* Tagline */}
          <p id="tagline" className="fade-up-d3 mt-8 text-sm tracking-widest uppercase" style={{ color: '#d8b4fe', opacity: 0.6 }}>
            🍇 RAJIN PANGKAL PANDAI 🍇
          </p>
          <p className="fade-up-d3 mt-2 text-[10px] font-bold tracking-wide" style={{ color: '#d8b4fe' }}>
            Copyright SMPN 1 BENGKALIS
          </p>
        </div>
      </main>
    </div>
  );
};
