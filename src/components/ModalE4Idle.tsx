import React, { useEffect, useState } from 'react';
import { Clock, Check, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface ModalE4IdleProps {
  language: Language;
  onStay: () => void;
  onExit: () => void;
}

export const ModalE4Idle: React.FC<ModalE4IdleProps> = ({
  language,
  onStay,
  onExit,
}) => {
  const t = TRANSLATIONS[language].e4;
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown <= 0) {
      onExit();
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center space-y-6 shadow-2xl border border-slate-100 animate-scale-in">
        {/* Yellow Clock Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
          <Clock className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">
            {t.sub}
          </p>
        </div>

        {/* Big circular countdown ring */}
        <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-600 flex items-center justify-center text-4xl font-extrabold text-blue-600 shadow-inner">
          {countdown}
        </div>

        {/* 2 Big Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              audio.playTap();
              onStay();
            }}
            className="flex-1 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{t.yesHere}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              audio.playTap();
              onExit();
            }}
            className="flex-1 py-3.5 px-5 rounded-xl border border-red-300 hover:border-red-400 text-red-600 hover:bg-red-50 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>{t.clearExit}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
