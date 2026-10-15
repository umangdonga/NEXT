import React, { useState, useEffect } from 'react';
import { BookOpen, Check, ShieldCheck, HelpCircle, RotateCcw, ArrowDown } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface Screen12Props {
  language: Language;
  userData: UserKioskData;
  onNext: () => void;
  onHelp: () => void;
}

export const Screen12PrintPassbook: React.FC<Screen12Props> = ({
  language,
  userData,
  onNext,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s12;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    audio.playPrintWhir();
    const p1 = setTimeout(() => {
      setCurrentPage(2);
      audio.playPrintWhir();
    }, 2200);

    const pDone = setTimeout(() => {
      setIsDone(true);
      audio.playSuccess();
    }, 4200);

    return () => {
      clearTimeout(p1);
      clearTimeout(pDone);
    };
  }, []);

  const handlePrintAgain = () => {
    audio.playPrintWhir();
    setIsDone(false);
    setCurrentPage(1);
    setTimeout(() => {
      setCurrentPage(2);
      audio.playPrintWhir();
    }, 2000);
    setTimeout(() => {
      setIsDone(true);
      audio.playSuccess();
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            5
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
          {/* Left Column: Passbook Booklet Graphic & Slot */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xs flex flex-col items-center justify-center space-y-5">
            {/* Blue Passbook Cover Graphic */}
            <div className="w-64 sm:w-72 bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-xl p-5 shadow-lg border border-blue-600 transform transition-transform hover:scale-102">
              <div className="border border-blue-400/40 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-blue-400/30 pb-2">
                  <span className="font-extrabold text-xs tracking-wider uppercase text-blue-100">
                    State Bank of India
                  </span>
                  <BookOpen className="w-4 h-4 text-blue-200" />
                </div>
                <div className="text-sm font-bold text-white pt-1">
                  {userData.fullName}
                </div>
                <div className="text-xs text-blue-200 font-mono">
                  A/c {userData.accountNumber}
                </div>
              </div>
            </div>

            {/* Down arrow pointing towards dispenser slot */}
            <ArrowDown className="w-6 h-6 text-blue-500 animate-bounce mt-1" />

            {/* Dispenser Slot Graphic */}
            <div className="w-full max-w-md bg-slate-900 h-8 rounded-full shadow-inner border-2 border-slate-700 flex items-center justify-center relative overflow-hidden">
              <div className="w-48 h-1 bg-cyan-400/60 rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
            </div>

            {/* Status indicator */}
            <div className="text-center w-full max-w-md pt-2">
              <div className="text-sm font-bold text-slate-800 mb-2">
                {isDone ? (
                  <span className="text-emerald-600 flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    {t.printingDone}
                  </span>
                ) : (
                  <span>
                    {t.printingPage} {currentPage} of 2
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-700"
                  style={{
                    width: isDone ? '100%' : currentPage === 2 ? '75%' : '35%',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column: Before you leave checklist */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">
              {t.beforeYouLeave}
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.tip1}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.tip2}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.tip3}
                </span>
              </li>
            </ul>
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

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintAgain}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>{t.printAgain}</span>
          </button>

          <button
            onClick={() => {
              audio.playSuccess();
              onNext();
            }}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{t.haveMyPassbook}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
