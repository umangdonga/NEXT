import React, { useState } from 'react';
import { Volume2, Check, ShieldCheck } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen08Props {
  language: Language;
  userData: UserKioskData;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
}

export const Screen08ReviewAgree: React.FC<Screen08Props> = ({
  language,
  userData,
  onNext,
  onBack,
  onHome,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s8;
  const [agreed, setAgreed] = useState(true);

  const handleReadAloud = () => {
    audio.playTap();
    const textToSpeak = `${t.title}. ${t.t1} ${t.t2} ${t.t3}`;
    audio.speak(textToSpeak, language);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            3
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
          {/* Left Column: You are opening */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {t.youAreOpening}
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">{t.accountLabel}</span>
                <span className="font-bold text-slate-900">{t.accountVal}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">{t.nameLabel}</span>
                <span className="font-bold text-slate-900">{userData.fullName}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">{t.branchLabel}</span>
                <span className="font-bold text-slate-900">{t.branchVal}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">{t.nomineeLabel}</span>
                <span className="font-bold text-slate-900">
                  {userData.nomineeName} ({userData.nomineeRelation})
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">{t.alertsOn}</span>
                <span className="font-bold text-slate-900 font-mono">{userData.mobile}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReadAloud}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 hover:border-blue-400 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-xs font-semibold cursor-pointer transition-all shadow-2xs active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>{t.readAloud}</span>
              </button>
            </div>
          </div>

          {/* Right Column: In simple words */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-slate-900">
              {t.inSimpleWords}
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.t1}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.t2}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.t3}
                </span>
              </li>
            </ul>

            {/* Checkbox Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  audio.playTap();
                  setAgreed(!agreed);
                }}
                className={`w-full p-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-3 border transition-all cursor-pointer ${
                  agreed
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${
                    agreed
                      ? 'border-white bg-blue-600 text-white'
                      : 'border-slate-400 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>{t.agreeCheckbox}</span>
              </button>

              <p className="text-xs text-slate-500 mt-3 text-center">
                {t.termsNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <KioskFooter
        language={language}
        onBack={onBack}
        onHome={onHome}
        onHelp={onHelp}
      >
        <button
          disabled={!agreed}
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold shadow-md transition-all ${
            agreed
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white cursor-pointer active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.agreeBtn}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
