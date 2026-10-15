import React from 'react';
import { Eye, EyeOff, Scan, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { KioskNumPad } from './KioskNumPad';
import { audio } from '../audioService';

interface Screen02Props {
  language: Language;
  aadhaarNumber: string;
  showAadhaar: boolean;
  onUpdateAadhaar: (val: string) => void;
  onToggleShow: () => void;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
  onScanCardAlternative: () => void;
  onDigiLockerAlternative: () => void;
}

export const Screen02Aadhaar: React.FC<Screen02Props> = ({
  language,
  aadhaarNumber,
  showAadhaar,
  onUpdateAadhaar,
  onToggleShow,
  onNext,
  onBack,
  onHome,
  onHelp,
  onScanCardAlternative,
  onDigiLockerAlternative,
}) => {
  const t = TRANSLATIONS[language].s2;

  const handleDigit = (d: string) => {
    if (aadhaarNumber.length < 12) {
      onUpdateAadhaar(aadhaarNumber + d);
    }
  };

  const handleClear = () => {
    onUpdateAadhaar('');
  };

  const handleBackspace = () => {
    if (aadhaarNumber.length > 0) {
      onUpdateAadhaar(aadhaarNumber.slice(0, -1));
    }
  };

  // Format display as XXXX XXXX XXXX or •••• •••• 7714
  const formatDisplay = () => {
    const padded = aadhaarNumber.padEnd(12, ' ');
    const parts = [padded.slice(0, 4), padded.slice(4, 8), padded.slice(8, 12)];

    return parts.map((part, pIdx) => {
      return (
        <span key={pIdx} className="tracking-widest mx-1.5 font-mono">
          {part.split('').map((char, cIdx) => {
            const absoluteIdx = pIdx * 4 + cIdx;
            const hasChar = absoluteIdx < aadhaarNumber.length;
            if (!hasChar) {
              return (
                <span key={cIdx} className="text-slate-300">
                  ·
                </span>
              );
            }
            if (showAadhaar) {
              return <span key={cIdx}>{char}</span>;
            }
            // By default hide first 8 digits as bullets, show last 4
            if (absoluteIdx < 8) {
              return <span key={cIdx}>•</span>;
            }
            return <span key={cIdx}>{char}</span>;
          })}
        </span>
      );
    });
  };

  const isValid = aadhaarNumber.length === 12;

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

        {/* Content Layout: Left Input + Alternatives; Right Touch Numpad */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Aadhaar Input Display Box */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-blue-500 shadow-sm relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.label}
              </label>

              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center select-none py-1">
                  {formatDisplay()}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    onToggleShow();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  {showAadhaar ? (
                    <>
                      <EyeOff className="w-4 h-4 text-blue-600" />
                      <span>{t.hide}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span>{t.show}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-3 font-medium">
                {t.privacyNote}
              </p>
            </div>

            {/* Or use another way */}
            <div>
              <div className="text-sm font-bold text-slate-700 mb-3">
                {t.orAnotherWay}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    onScanCardAlternative();
                  }}
                  className="bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 p-4 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group shadow-2xs"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Scan className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {t.scanCardTitle}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {t.scanCardSub}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    onDigiLockerAlternative();
                  }}
                  className="bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 p-4 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group shadow-2xs"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {t.digilockerTitle}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {t.digilockerSub}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Privacy note */}
            <div className="bg-slate-100/90 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-slate-600 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.clearNote}</span>
            </div>
          </div>

          {/* Right Column: Large Touch Numpad */}
          <div className="lg:col-span-5 flex justify-center">
            <KioskNumPad
              onDigit={handleDigit}
              onClear={handleClear}
              onBackspace={handleBackspace}
              clearLabel={TRANSLATIONS[language].s9.clearBtn || 'Clear'}
            />
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
          disabled={!isValid}
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold shadow-md transition-all ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white cursor-pointer active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>{t.sendOtpBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </KioskFooter>
    </div>
  );
};
