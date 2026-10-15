import React, { useEffect, useState } from 'react';
import { Check, Clock, Home, HelpCircle, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface ScreenE5Props {
  language: Language;
  onHome: () => void;
  onHelp: () => void;
}

export const ScreenE5SessionCleared: React.FC<ScreenE5Props> = ({
  language,
  onHome,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].e5;
  const [returnCountdown, setReturnCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setReturnCountdown((prev) => {
        if (prev <= 1) {
          onHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onHome]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Success Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-0.5">
              {t.sub}
            </p>
          </div>
        </div>

        {/* Central Card */}
        <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 my-4">
          <ul className="space-y-5">
            <li className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800">
                {t.item1}
              </span>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                {t.item2}
              </span>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                This kiosk goes back to the Home screen in {returnCountdown} seconds.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => {
            audio.playTap();
            onHelp();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          {TRANSLATIONS[language].needHelp}
        </button>

        <button
          onClick={() => {
            audio.playTap();
            onHome();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>{t.btn}</span>
        </button>
      </footer>
    </div>
  );
};
