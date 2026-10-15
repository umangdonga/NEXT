import React, { useState } from 'react';
import { Fingerprint, Printer, ArrowLeft, Home, HelpCircle, Check, ArrowRight, RotateCw, ShieldCheck, X } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface ScreenE2Props {
  language: Language;
  userData: UserKioskData;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
  onFingerprintSuccess: () => void;
}

export const ScreenE2OTPProblem: React.FC<ScreenE2Props> = ({
  language,
  userData,
  onBack,
  onHome,
  onHelp,
  onFingerprintSuccess,
}) => {
  const t = TRANSLATIONS[language].e2;
  const [showBiometricScanner, setShowBiometricScanner] = useState(false);
  const [biometricState, setBiometricState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printStage, setPrintStage] = useState<'printing' | 'ready'>('printing');

  const startFingerprintScan = () => {
    audio.playTap();
    setShowBiometricScanner(true);
    setBiometricState('idle');
  };

  const handleSimulateFingerTouch = () => {
    if (biometricState === 'scanning' || biometricState === 'success') return;
    audio.playTap();
    setBiometricState('scanning');

    setTimeout(() => {
      audio.playBeep();
      setBiometricState('success');
      audio.playSuccess();
    }, 2200);
  };

  const handleStartPrintSlip = () => {
    audio.playPrintWhir();
    setShowPrintModal(true);
    setPrintStage('printing');

    setTimeout(() => {
      setPrintStage('ready');
      audio.playSuccess();
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Warning Icon and Title */}
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

        {/* 2 Clear, Direct Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch pt-2">
          {/* Option 1: Verify with fingerprint */}
          <div className="bg-white rounded-3xl p-7 border-2 border-blue-500 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full">
                  {t.c1Badge}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">{t.c1Title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {t.c1Sub}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={startFingerprintScan}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <Fingerprint className="w-5 h-5" />
              <span>{t.c1Btn}</span>
            </button>
          </div>

          {/* Option 2: Come back later & Print reference slip */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs">
                  <Printer className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {t.c2Badge}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">{t.c2Title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {t.c2Sub}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartPrintSlip}
              className="w-full py-4 px-6 rounded-2xl border-2 border-slate-300 hover:border-blue-500 text-slate-800 hover:text-blue-700 bg-white hover:bg-blue-50/50 text-sm font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <Printer className="w-5 h-5 text-slate-600" />
              <span>{t.c2Btn}</span>
            </button>
          </div>
        </div>

        {/* Biometric Scanner Interactive Modal */}
        {showBiometricScanner && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-7 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-slate-100 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-600" />
                  <span>{t.scannerModalTitle}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBiometricScanner(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Glowing Interactive Biometric Pad */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={handleSimulateFingerTouch}
                  className={`w-36 h-44 mx-auto rounded-3xl border-3 flex flex-col items-center justify-center cursor-pointer transition-all shadow-md relative overflow-hidden select-none active:scale-95 ${
                    biometricState === 'success'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-emerald-200'
                      : biometricState === 'scanning'
                      ? 'border-cyan-500 bg-slate-950 text-cyan-400 shadow-cyan-200'
                      : 'border-blue-400 bg-gradient-to-b from-blue-50 to-slate-100 text-blue-600 hover:border-blue-600'
                  }`}
                >
                  {biometricState === 'scanning' && (
                    <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-[0_0_15px_#38bdf8] animate-bounce top-1/3"></div>
                  )}

                  {biometricState === 'success' ? (
                    <Check className="w-16 h-16 stroke-[3] animate-scale-in" />
                  ) : (
                    <Fingerprint className={`w-20 h-20 ${biometricState === 'scanning' ? 'animate-pulse' : ''}`} />
                  )}

                  <span className="text-[11px] font-bold mt-2 uppercase tracking-wider">
                    {biometricState === 'success'
                      ? 'MATCHED'
                      : biometricState === 'scanning'
                      ? 'SCANNING...'
                      : 'TOUCH SENSOR'}
                  </span>
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-800">
                  {biometricState === 'success'
                    ? t.scannerSuccess
                    : biometricState === 'scanning'
                    ? t.scannerScanning
                    : t.scannerModalSub}
                </div>
                {biometricState === 'idle' && (
                  <p className="text-xs text-slate-400">
                    Tap the sensor above to simulate placing your finger.
                  </p>
                )}
              </div>

              {biometricState === 'success' ? (
                <button
                  type="button"
                  onClick={() => {
                    audio.playSuccess();
                    setShowBiometricScanner(false);
                    onFingerprintSuccess();
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.scannerProceedBtn}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateFingerTouch}
                  disabled={biometricState === 'scanning'}
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  {biometricState === 'scanning' ? 'Verifying...' : 'Place Finger on Scanner'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Physical Print Slip Animation Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-7 max-w-sm w-full text-center space-y-5 shadow-2xl border border-slate-100 animate-scale-in">
              <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
                <Printer className="w-5 h-5 text-blue-600" />
                <span>
                  {printStage === 'printing' ? t.slipPrinting : t.slipDone}
                </span>
              </h3>

              {/* Realistic Bank Printed Slip */}
              <div className="w-full bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-2xl p-5 text-left font-mono space-y-3 shadow-inner transform rotate-[-0.5deg]">
                <div className="text-center border-b border-amber-300 pb-2">
                  <div className="font-bold text-xs tracking-wider text-slate-900 uppercase">
                    STATE BANK OF INDIA
                  </div>
                  <div className="text-[10px] text-slate-500">
                    BRANCH KIOSK SELF-SERVICE DESK
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">REF NO:</span>
                    <span className="font-bold text-blue-700 text-sm">VK-482917</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">APPLICANT:</span>
                    <span className="font-bold text-slate-800">{userData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DATE:</span>
                    <span className="font-semibold text-slate-700">14 OCT 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">VALIDITY:</span>
                    <span className="font-bold text-emerald-700">5 DAYS</span>
                  </div>
                </div>

                {/* Barcode Graphic */}
                <div className="pt-2 text-center border-t border-amber-200">
                  <div className="h-8 bg-slate-900/80 rounded-xs flex items-center justify-around px-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-full bg-white"
                        style={{ width: `${(i % 3) + 1}px` }}
                      />
                    ))}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1">
                    *VK-482917-AADHAAR-PENDING*
                  </div>
                </div>
              </div>

              {printStage === 'printing' ? (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                  <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Dispensing slip from slot...</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    setShowPrintModal(false);
                    onHome();
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.slipCollectBtn}</span>
                </button>
              )}
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
