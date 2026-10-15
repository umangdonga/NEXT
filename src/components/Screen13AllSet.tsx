import React from 'react';
import { Check, CreditCard, Globe, ShieldCheck } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { audio } from '../audioService';

interface Screen13Props {
  language: Language;
  userData: UserKioskData;
  onFinish: () => void;
  onHelp: () => void;
}

export const Screen13AllSet: React.FC<Screen13Props> = ({
  language,
  userData,
  onFinish,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s13;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* Step Badge and Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            <Check className="w-7 h-7 stroke-[3]" />
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

        {/* Central Card */}
        <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-7">
          {/* Completion Checklist */}
          <ul className="space-y-4">
            <li className="flex items-center gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">
                {t.done1}
              </span>
            </li>

            <li className="flex items-center gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">
                {t.done2}
              </span>
            </li>

            <li className="flex items-center gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">
                {t.done3}
              </span>
            </li>
          </ul>

          {/* Next steps: Debit card & Net banking */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {t.nextAsk}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {userData.wantDebitCard ? `${userData.debitCardType} Ordered` : t.debitCard}
                  </div>
                  <div className="text-xs text-slate-500">
                    {userData.wantDebitCard ? 'Dispatched to home address' : 'Ask counter or apply in YONO'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.netBanking}</div>
                  <div className="text-xs text-slate-500">
                    {userData.wantNetBanking ? 'YONO setup SMS sent to your phone' : 'Available anytime online'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-slate-400 text-center font-medium">
            {t.removeNotice}
          </p>
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

        <button
          onClick={() => {
            audio.playTap();
            onFinish();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <ShieldCheck className="w-4 h-4 stroke-[3]" />
          <span>{t.finishBtn}</span>
        </button>
      </footer>
    </div>
  );
};
