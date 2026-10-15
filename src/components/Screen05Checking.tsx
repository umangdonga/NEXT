import React, { useEffect, useState } from 'react';
import { Check, X, RotateCw } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface Screen05Props {
  language: Language;
  onDone: () => void;
  onCancelAndClear: () => void;
  onHelp: () => void;
}

export const Screen05Checking: React.FC<Screen05Props> = ({
  language,
  onDone,
  onCancelAndClear,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s5;
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep1Done(true);
      audio.playTap();
    }, 1200);

    const t2 = setTimeout(() => {
      setStep2Done(true);
      audio.playTap();
    }, 2500);

    const t3 = setTimeout(() => {
      setStep3Done(true);
      audio.playSuccess();
    }, 4000);

    const tEnd = setTimeout(() => {
      onDone();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            2
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

        {/* Central checking card */}
        <div className="max-w-xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col items-center text-center space-y-6 my-4">
          {/* Circular Spinner */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-600">
              <RotateCw className="w-7 h-7 animate-spin" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.doNotRemove}
          </h2>

          {/* Verification steps */}
          <div className="w-full space-y-3.5 text-left max-w-sm pt-2">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              {step1Done ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 shrink-0"></div>
              )}
              <span
                className={`text-sm sm:text-base font-semibold ${
                  step1Done ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {t.check1}
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              {step2Done ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 shrink-0"></div>
              )}
              <span
                className={`text-sm sm:text-base font-semibold ${
                  step2Done ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {t.check2}
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              {step3Done ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0"></div>
              )}
              <span
                className={`text-sm sm:text-base font-semibold ${
                  step3Done ? 'text-slate-800' : 'text-blue-600'
                }`}
              >
                {t.check3}
              </span>
            </div>
          </div>

          {/* Animated subtle progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-blue-600 h-full transition-all duration-700 ease-out rounded-full"
              style={{
                width: step3Done ? '100%' : step2Done ? '65%' : step1Done ? '35%' : '15%',
              }}
            ></div>
          </div>

          {/* Quick manual advance for fast testing */}
          <button
            type="button"
            onClick={() => {
              audio.playSuccess();
              onDone();
            }}
            className="text-xs text-slate-400 hover:text-blue-600 font-medium cursor-pointer"
          >
            Skip waiting →
          </button>
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
            onCancelAndClear();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>{TRANSLATIONS[language].cancelAndClear}</span>
        </button>
      </footer>
    </div>
  );
};
