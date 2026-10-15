import React, { useEffect, useState } from 'react';
import { Check, Clock, Smartphone, RotateCw } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface Screen10Props {
  language: Language;
  userData: UserKioskData;
  onNext: () => void;
  onContinueLater: () => void;
  onHelp: () => void;
}

export const Screen10BankVerifying: React.FC<Screen10Props> = ({
  language,
  userData,
  onNext,
  onContinueLater,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s10;
  const [approving, setApproving] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      audio.playSuccess();
      setApproving(false);
      onNext();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            4
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: What is happening */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-slate-900">
              {t.whatIsHappening}
            </h2>

            <ul className="space-y-4">
              {/* Item 1 */}
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800">
                  {t.step1}
                </span>
              </li>

              {/* Item 2 */}
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800">
                  {t.step2}
                </span>
              </li>

              {/* Item 3 */}
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0"></div>
                <span className="text-sm sm:text-base font-semibold text-blue-700">
                  {t.step3}
                </span>
              </li>

              {/* Item 4 */}
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-400">
                  {t.step4}
                </span>
              </li>
            </ul>

            {/* Progress line */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6">
              <div className="bg-blue-600 h-full w-3/4 rounded-full animate-pulse"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                audio.playSuccess();
                onNext();
              }}
              className="text-xs text-slate-400 hover:text-blue-600 font-medium cursor-pointer"
            >
              Simulate approval complete →
            </button>
          </div>

          {/* Right Column: Reference Number Card */}
          <div className="lg:col-span-5 bg-blue-50/60 border border-blue-200 rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.refTitle}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono tracking-tight mt-1">
                {userData.referenceNumber}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {t.refSub}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 pt-2 border-t border-blue-200/60">
              <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{t.smsSent}</span>
            </div>
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
            onContinueLater();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <Clock className="w-4 h-4 text-slate-500" />
          <span>{t.continueLater}</span>
        </button>
      </footer>
    </div>
  );
};
