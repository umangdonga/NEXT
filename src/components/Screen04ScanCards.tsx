import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, AlertCircle, ScanLine, CreditCard } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen04Props {
  language: Language;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
  onScannerError: () => void;
}

export const Screen04ScanCards: React.FC<Screen04Props> = ({
  language,
  onNext,
  onBack,
  onHome,
  onHelp,
  onScannerError,
}) => {
  const t = TRANSLATIONS[language].s4;
  const [isPanScanning, setIsPanScanning] = useState(true);
  const [panScanned, setPanScanned] = useState(false);

  // Auto-scan PAN card with realistic delay and beep sound
  useEffect(() => {
    const timer = setTimeout(() => {
      audio.playBeep();
      setIsPanScanning(false);
      setPanScanned(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scanner Glass Hardware + Card scan statuses */}
          <div className="lg:col-span-7 space-y-4">
            {/* Scanner Glass Box */}
            <div className="relative bg-slate-900 rounded-2xl p-6 text-white overflow-hidden shadow-md border border-slate-800">
              {/* Laser animation */}
              {isPanScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 shadow-[0_0_15px_#38bdf8] animate-pulse top-1/2 -translate-y-1/2"></div>
              )}

              <div className="flex items-center justify-center gap-3 py-6 relative z-10">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <ScanLine className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm font-semibold text-slate-300">
                    {t.scannerGlass}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Hardware Scanner Slot · Active sensor
                  </div>
                </div>
              </div>
            </div>

            {/* Aadhaar Card Status: Scanned */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{t.aadhaarScanned}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {t.aadhaarSub}
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                OK
              </span>
            </div>

            {/* PAN Card Status: Scanning or Done */}
            {panScanned ? (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">
                    {t.panScanned}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    ABCPK••••F · {t.panSubDone}
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  OK
                </span>
              </div>
            ) : (
              <div className="bg-blue-50/70 border border-blue-300 rounded-2xl p-4 flex items-center gap-4 shadow-2xs animate-pulse">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-blue-900">
                    {t.panPrompt}
                  </div>
                  <div className="text-xs text-blue-700 mt-0.5">
                    {t.panSub}
                  </div>
                </div>
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Right Column: How to place your card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t.howToPlace}
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.instruction1}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.instruction2}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {t.instruction3}
                </span>
              </li>
            </ul>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-start gap-2.5 text-xs text-slate-500 font-medium">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{t.notReadingTip}</span>
              </div>
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
          type="button"
          onClick={() => {
            audio.playTap();
            onScannerError();
          }}
          className="px-4 py-3 rounded-xl border border-blue-300 hover:border-blue-400 text-blue-700 bg-white hover:bg-blue-50/50 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          {t.scannerTroubleBtn}
        </button>

        <button
          disabled={!panScanned}
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold shadow-md transition-all ${
            panScanned
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white cursor-pointer active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.continueBtn}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
