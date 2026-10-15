import React from 'react';
import { Lock, ShieldCheck, Check, AlertTriangle, User } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen06Props {
  language: Language;
  userData: UserKioskData;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp?: () => void;
  onSomethingWrong?: () => void;
}

export const Screen06ConfirmDetails: React.FC<Screen06Props> = ({
  language,
  userData,
  onNext,
  onBack,
  onHome,
}) => {
  const t = TRANSLATIONS[language].s6;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Personal details with lock icons */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Your details
              </h2>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.verifiedBadge}</span>
              </div>
            </div>

            {/* Field Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.fullName}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-900">
                    {userData.fullName}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.dob}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-900">
                    {userData.dob}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.gender}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-900">
                    {t.genderVal}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Father/Spouse */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.fatherName}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-900">
                    {userData.fatherName}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Address (Span 2) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.address}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-900 leading-relaxed">
                    {userData.address}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </div>
              </div>

              {/* PAN */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.pan}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono">
                  <span className="text-sm font-bold text-slate-900">
                    ABCPK••••F
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Aadhaar */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.aadhaar}
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono">
                  <span className="text-sm font-bold text-slate-900">
                    XXXX XXXX 7714
                  </span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Aadhaar Photo + Information note */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                {t.photoTitle}
              </h3>

              {/* Clean official Aadhaar photo box */}
              <div className="relative w-28 h-32 rounded-2xl bg-gradient-to-b from-blue-50 to-slate-100 border-2 border-blue-200 flex flex-col items-center justify-center shadow-inner overflow-hidden mb-3">
                <User className="w-16 h-16 text-blue-400" />
                <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-white text-[10px] font-bold py-0.5 tracking-wider uppercase">
                  UIDAI RECORD
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {t.photoSub}
              </div>

              <div className="border-t border-slate-100 w-full mt-4 pt-3 text-xs text-slate-500">
                {t.alertsTo}
                <div className="font-bold text-slate-800 text-sm mt-0.5 font-mono">
                  {userData.mobile}
                </div>
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
        showHelp={false}
      >
        <button
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.yesCorrect}</span>
        </button>
      </KioskFooter>
    </div>
  );
};
