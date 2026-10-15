import React from 'react';
import { CreditCard, Smartphone, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen01Props {
  language: Language;
  onNext: () => void;
  onMissing: () => void;
  onHelp: () => void;
}

export const Screen01BeforeStart: React.FC<Screen01Props> = ({
  language,
  onNext,
  onMissing,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s1;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            1
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-0.5">
              {t.time}
            </p>
          </div>
        </div>

        {/* Main Grid: Left side cards needed + Missing banner; Right side "What happens next" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Cards) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-3">
                {t.keepThese}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Aadhaar card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.c1Title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.c1Sub}</p>
                  </div>
                </div>

                {/* PAN card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.c2Title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.c2Sub}</p>
                  </div>
                </div>

                {/* Mobile phone */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.c3Title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.c3Sub}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Missing documents reassurance banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
                {t.missingBanner}
              </p>
            </div>
          </div>

          {/* Right Column: What happens next */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
                {t.whatNext}
              </h2>
              <ul className="space-y-3.5">
                {[
                  t.step1,
                  t.step2,
                  t.step3,
                  t.step4,
                  t.step5,
                ].map((stepText, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {stepText}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <KioskFooter
        language={language}
        onHelp={onHelp}
        showBack={false}
        showHome={false}
      >
        <button
          onClick={() => {
            audio.playTap();
            onMissing();
          }}
          className="px-5 py-3 rounded-xl border border-blue-300 hover:border-blue-400 text-blue-700 bg-white hover:bg-blue-50/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          {t.somethingMissingBtn}
        </button>

        <button
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.startBtn}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
