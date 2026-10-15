import React from 'react';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface KioskFooterProps {
  language: Language;
  onBack?: () => void;
  onHome?: () => void;
  onHelp?: () => void;
  children?: React.ReactNode;
  showBack?: boolean;
  showHome?: boolean;
  showHelp?: boolean;
}

export const KioskFooter: React.FC<KioskFooterProps> = ({
  language,
  onBack,
  onHome,
  onHelp,
  children,
  showBack = true,
  showHome = true,
  showHelp = false,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="w-full bg-white border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Left side standard kiosk helpers */}
      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <button
            onClick={() => {
              audio.playTap();
              onBack();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 hover:border-blue-400 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-blue-700" />
            <span>{t.back}</span>
          </button>
        )}

        {showHome && onHome && (
          <button
            onClick={() => {
              audio.playTap();
              onHome();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 hover:border-blue-400 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Home className="w-4 h-4 text-blue-700" />
            <span>{t.home}</span>
          </button>
        )}

        {showHelp && onHelp && (
          <button
            onClick={() => {
              audio.playTap();
              onHelp();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 hover:border-blue-400 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{t.needHelp}</span>
          </button>
        )}
      </div>

      {/* Right side contextual action buttons */}
      <div className="flex items-center gap-3 ml-auto">
        {children}
      </div>
    </footer>
  );
};
