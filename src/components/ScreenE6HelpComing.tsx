import React from 'react';
import { Users, Clock, Lock, ShieldCheck, Check, ArrowRight, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface ScreenE6Props {
  language: Language;
  onCancelHelp: () => void;
  onContinueOnMyOwn: () => void;
}

export const ScreenE6HelpComing: React.FC<ScreenE6Props> = ({
  language,
  onCancelHelp,
  onContinueOnMyOwn,
}) => {
  const t = TRANSLATIONS[language].e6;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Help Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            <Users className="w-7 h-7" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Big Token Card */}
          <div className="lg:col-span-6 bg-blue-50/70 border border-blue-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
              {t.tokenTitle}
            </span>

            <div className="text-6xl sm:text-7xl font-black text-blue-700 tracking-tight font-mono">
              {t.tokenNumber}
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-800">
                {t.kioskInfo}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{t.eta}</span>
              </div>
            </div>
          </div>

          {/* Right Column: While you wait privacy assurances */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {t.whileWait}
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.w1}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.w2}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.w3}
                </span>
              </li>
            </ul>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-400 text-center font-medium">
              Token H-27 has been broadcasted to the branch floor assistant.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => {
            audio.playTap();
            onCancelHelp();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <X className="w-4 h-4" />
          <span>{t.cancelHelpBtn}</span>
        </button>

        <button
          onClick={() => {
            audio.playTap();
            onContinueOnMyOwn();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
