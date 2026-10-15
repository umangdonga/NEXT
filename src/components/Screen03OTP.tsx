import React, { useState, useEffect } from 'react';
import { Smartphone, Clock, Check, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { KioskNumPad } from './KioskNumPad';
import { audio } from '../audioService';

interface Screen03Props {
  language: Language;
  otp: string;
  mobileNumber: string;
  onUpdateOtp: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
  onNoPhone: () => void;
}

export const Screen03OTP: React.FC<Screen03Props> = ({
  language,
  otp,
  mobileNumber,
  onUpdateOtp,
  onNext,
  onBack,
  onHome,
  onHelp,
  onNoPhone,
}) => {
  const t = TRANSLATIONS[language].s3;
  const [secondsLeft, setSecondsLeft] = useState(24);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleDigit = (d: string) => {
    if (otp.length < 6) {
      onUpdateOtp(otp + d);
    }
  };

  const handleClear = () => {
    onUpdateOtp('');
  };

  const handleBackspace = () => {
    if (otp.length > 0) {
      onUpdateOtp(otp.slice(0, -1));
    }
  };

  const handleResend = () => {
    audio.playTap();
    setSecondsLeft(30);
    onUpdateOtp('');
  };

  const isValid = otp.length === 6;

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
              Sent to the mobile number linked with your Aadhaar:{' '}
              <span className="font-semibold text-slate-800">{mobileNumber}</span>
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: OTP input boxes + Resend timer + No phone warning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t.label}
              </label>

              {/* 6 Digit Boxes */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-5">
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const digit = otp[index] || '';
                  const isCurrent = otp.length === index;
                  return (
                    <div
                      key={index}
                      className={`w-12 h-16 sm:w-14 sm:h-20 rounded-xl flex items-center justify-center text-3xl font-extrabold border-2 transition-all ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : digit
                          ? 'border-blue-300 bg-white text-slate-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-300'
                      }`}
                    >
                      {digit}
                    </div>
                  );
                })}
              </div>

              {/* Resend OTP timer */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                {secondsLeft > 0 ? (
                  <span>
                    {t.resendIn} 00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    {t.resendNow}
                  </button>
                )}
              </div>
            </div>

            {/* Warning Card: Don't have this phone with me */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{t.noPhoneTitle}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{t.noPhoneSub}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  audio.playTap();
                  onNoPhone();
                }}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-blue-400 text-blue-700 text-xs font-bold rounded-xl shadow-2xs whitespace-nowrap cursor-pointer transition-all active:scale-95"
              >
                {t.seeOptions}
              </button>
            </div>
          </div>

          {/* Right Column: Touch Numpad */}
          <div className="lg:col-span-5 flex justify-center">
            <KioskNumPad
              onDigit={handleDigit}
              onClear={handleClear}
              onBackspace={handleBackspace}
              clearLabel="Clear"
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
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.verifyOtpBtn}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
