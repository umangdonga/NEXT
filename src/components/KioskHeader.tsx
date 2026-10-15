import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language, ScreenId } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface KioskHeaderProps {
  currentScreen: ScreenId;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onVoiceRead: () => void;
  isVoiceActive: boolean;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  currentScreen,
  language,
  onLanguageChange,
  onVoiceRead,
  isVoiceActive,
}) => {
  const t = TRANSLATIONS[language];

  // Determine stage (1 to 5)
  // Step 1: 01-before-start (Check)
  // Step 2: 02-aadhaar, 03-otp, 04-scan-cards, 05-checking (Verify)
  // Step 3: 06-confirm-details, 07-more-details, 08-review-agree (Details)
  // Step 4: 09-signature, 10-bank-verifying (Approval)
  // Step 5: 11-account-ready, 12-print-passbook, 13-all-set (Passbook)
  let stageNumber = 1;
  let stageKey = 'check';

  if (currentScreen === '01-before-start' || currentScreen === 'E1-docs-missing') {
    stageNumber = 1;
    stageKey = 'check';
  } else if (
    ['02-aadhaar', '03-otp', '04-scan-cards', '05-checking', 'E2-otp-problem', 'E3-scanner-error'].includes(currentScreen)
  ) {
    stageNumber = 2;
    stageKey = 'verify';
  } else if (['06-confirm-details', '07-more-details', '08-review-agree', '08b-services'].includes(currentScreen)) {
    stageNumber = 3;
    stageKey = 'details';
  } else if (['09-signature', '10-bank-verifying'].includes(currentScreen)) {
    stageNumber = 4;
    stageKey = 'approval';
  } else if (['11-account-ready', '12-print-passbook', '13-all-set', 'E5-session-cleared'].includes(currentScreen)) {
    stageNumber = 5;
    stageKey = 'passbook';
  }

  const isEdgeCaseWithNoStage = currentScreen === 'E6-help-coming' || currentScreen === 'E5-session-cleared';

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-3 select-none flex items-center justify-between shadow-xs">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
          <div className="grid grid-cols-2 gap-1 p-1">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-blue-200"></span>
            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
          </div>
        </div>
        <div>
          <div className="text-slate-900 font-bold text-base leading-tight tracking-tight">
            Information
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold text-xs tracking-wide">Kiosk</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-700 bg-blue-50 px-1 rounded">
              NEXT
            </span>
          </div>
        </div>
      </div>

      {/* Center: Simplified, Clean Stage Tracker */}
      {!isEdgeCaseWithNoStage ? (
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Step {stageNumber} of 5 ·</span>
            <span className="text-blue-600 font-extrabold capitalize">
              {t.stepStages[stageKey]}
            </span>
          </div>
          {/* Minimal 5-segment progress bar */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  num === stageNumber
                    ? 'w-7 sm:w-9 bg-blue-600'
                    : num < stageNumber
                    ? 'w-4 sm:w-5 bg-blue-300'
                    : 'w-4 sm:w-5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm font-semibold text-slate-600">
          State Bank Self-Service Portal
        </div>
      )}

      {/* Right: Language switch + Voice Narration button */}
      <div className="flex items-center gap-3">
        {/* Language selector pill */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <div className="px-2 text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
              <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
            </svg>
          </div>
          <button
            onClick={() => {
              audio.playTap();
              onLanguageChange('en');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              audio.playTap();
              onLanguageChange('hi');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              language === 'hi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => {
              audio.playTap();
              onLanguageChange('gu');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              language === 'gu'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            ગુજરાતી
          </button>
        </div>

        {/* Voice Readout button */}
        <button
          onClick={() => {
            audio.playTap();
            onVoiceRead();
          }}
          title="Listen to this screen instructions"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isVoiceActive
              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400'
              : 'bg-white hover:bg-slate-50 text-blue-700 border-blue-200 hover:border-blue-300'
          }`}
        >
          {isVoiceActive ? (
            <>
              <VolumeX className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>{t.voiceBtn}</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
