import React, { useEffect } from 'react';
import { Check, Printer, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface Screen11Props {
  language: Language;
  userData: UserKioskData;
  onPrintPassbook: () => void;
  onHelp: () => void;
}

export const Screen11AccountReady: React.FC<Screen11Props> = ({
  language,
  userData,
  onPrintPassbook,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s11;

  useEffect(() => {
    audio.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-0.5">
              Welcome to SBI, {userData.fullName.split(' ')[0]}.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Account Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.accountNumLabel}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tracking-wider mt-0.5">
                  {userData.accountNumber}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
                <div>
                  <span className="text-slate-400 text-xs font-semibold block">
                    {t.holderLabel}
                  </span>
                  <span className="font-bold text-slate-800">
                    {userData.fullName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs font-semibold block">
                    {t.typeLabel}
                  </span>
                  <span className="font-bold text-slate-800">
                    {t.typeVal}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs font-semibold block">
                    {t.ifscLabel}
                  </span>
                  <span className="font-bold text-slate-800 font-mono">
                    {userData.ifsc}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs font-semibold block">
                    {t.branchLabel}
                  </span>
                  <span className="font-bold text-slate-800">
                    {t.branchVal}
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900 mt-4">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.paymentsNotice}</span>
            </div>
          </div>

          {/* Right Column: Collect Passbook Prompt */}
          <div className="lg:col-span-5 bg-blue-50/60 border border-blue-200 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-2xs">
            <div className="w-20 h-20 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Printer className="w-10 h-10" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {t.collectPassbookTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xs leading-relaxed font-medium">
              {t.collectPassbookSub}
            </p>
          </div>
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
            onPrintPassbook();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>{t.printPassbookBtn}</span>
        </button>
      </footer>
    </div>
  );
};
