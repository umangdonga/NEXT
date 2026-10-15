import React, { useState } from 'react';
import { Smartphone, Users, Clock, QrCode, ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface ScreenE1Props {
  language: Language;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
  onStaffHelp: () => void;
}

export const ScreenE1DocsMissing: React.FC<ScreenE1Props> = ({
  language,
  onBack,
  onHome,
  onHelp,
  onStaffHelp,
}) => {
  const t = TRANSLATIONS[language].e1;
  const [showQrModal, setShowQrModal] = useState(false);
  const [savedChecklist, setSavedChecklist] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Warning Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            !
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

        {/* 3 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: On my phone */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-5 hover:border-blue-400 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t.c1Badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{t.c1Title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.c1Sub}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                audio.playTap();
                setShowQrModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>{t.c1Btn}</span>
            </button>
          </div>

          {/* Option 2: Need staff help */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-5 hover:border-blue-400 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{t.c2Title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.c2Sub}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                audio.playTap();
                onStaffHelp();
              }}
              className="w-full py-3 px-4 rounded-xl border border-blue-300 hover:border-blue-400 text-blue-700 bg-white hover:bg-blue-50 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              {t.c2Btn}
            </button>
          </div>

          {/* Option 3: Come back later */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-5 hover:border-blue-400 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{t.c3Title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.c3Sub}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                audio.playTap();
                setSavedChecklist(true);
              }}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              {savedChecklist ? 'Checklist sent via SMS!' : t.c3Btn}
            </button>
          </div>
        </div>

        {/* QR Code Modal preview */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Scan with DigiLocker App
              </h3>
              <p className="text-xs text-slate-500">
                Point your phone camera to securely import Aadhaar and PAN documents.
              </p>
              <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-400 p-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=NEXT-BANK-DIGILOCKER-REF-88219"
                  alt="DigiLocker QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audio.playTap();
              onBack();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-blue-700" />
            <span>{TRANSLATIONS[language].back}</span>
          </button>

          <button
            onClick={() => {
              audio.playTap();
              onHome();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <Home className="w-4 h-4 text-blue-700" />
            <span>{TRANSLATIONS[language].home}</span>
          </button>
        </div>

        <button
          onClick={() => {
            audio.playTap();
            onHelp();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>{TRANSLATIONS[language].needHelp}</span>
        </button>
      </footer>
    </div>
  );
};
