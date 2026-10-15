import React, { useState } from 'react';
import { ShieldCheck, Check, UserCheck, Sparkles, PenTool } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { SignaturePad } from './SignaturePad';
import { audio } from '../audioService';

interface Screen09Props {
  language: Language;
  userData: UserKioskData;
  onUpdateSignature: (dataUrl: string | null) => void;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
}

export const Screen09Signature: React.FC<Screen09Props> = ({
  language,
  userData,
  onUpdateSignature,
  onNext,
  onBack,
  onHome,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s9;
  const [signature, setSignature] = useState<string | null>(userData.signatureDataUrl);

  const handleSignatureChange = (dataUrl: string | null) => {
    setSignature(dataUrl);
    onUpdateSignature(dataUrl);
  };

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
          {/* Left Column: Reassurance that official photo is already fetched from Aadhaar & PAN */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t.photoNoticeTitle}</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                {t.photoNoticeSub}
              </p>

              <div className="pt-2 flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-emerald-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{userData.fullName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Aadhaar verified · UIDAI</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{t.photoMatchReassurance}</span>
            </div>
          </div>

          {/* Right Column: Clean, Spacious Signature Pad */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-blue-600" />
                  <span>{t.yourSignature}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.chequeHint}
                </p>
              </div>
            </div>

            {/* Interactive Signature Canvas */}
            <SignaturePad
              initialSignature={signature}
              onSave={handleSignatureChange}
              clearLabel={t.clearBtn}
              sampleLabel={t.trySample}
              hintText={t.signHint}
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
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.saveAndContinue}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
