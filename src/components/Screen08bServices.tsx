import React from 'react';
import { CreditCard, Globe, BookOpen, Check, ArrowRight, ShieldCheck, Wifi } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen08bProps {
  language: Language;
  userData: UserKioskData;
  onUpdate: (data: Partial<UserKioskData>) => void;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
}

export const Screen08bServices: React.FC<Screen08bProps> = ({
  language,
  userData,
  onUpdate,
  onNext,
  onBack,
  onHome,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s8b;

  const cardVariants: { key: 'RuPay Classic' | 'Visa Platinum' | 'MasterCard Global'; label: string }[] = [
    { key: 'RuPay Classic', label: t.cardVariant1 },
    { key: 'Visa Platinum', label: t.cardVariant2 },
    { key: 'MasterCard Global', label: t.cardVariant3 },
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: ATM / Debit Card Options + Live Card Preview */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {t.debitTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t.debitDesc}
                  </p>
                </div>
              </div>

              {/* Master toggle for debit card */}
              <button
                type="button"
                onClick={() => {
                  audio.playTap();
                  onUpdate({ wantDebitCard: !userData.wantDebitCard });
                }}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  userData.wantDebitCard ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    userData.wantDebitCard ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {userData.wantDebitCard ? (
              <div className="space-y-4 animate-fade-in">
                {/* Visual Card Mockup */}
                <div className="w-full h-44 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-blue-800 p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden border border-slate-700">
                  {/* Subtle card chip & contactless icon */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded-md bg-gradient-to-r from-amber-300 to-yellow-500 border border-yellow-200/50 shadow-inner flex items-center justify-center">
                        <div className="w-6 h-5 border border-amber-700/40 rounded-xs"></div>
                      </div>
                      <Wifi className="w-5 h-5 text-slate-300 rotate-90" />
                    </div>
                    <span className="font-extrabold text-xs tracking-wider text-blue-200 uppercase">
                      State Bank of India
                    </span>
                  </div>

                  {/* Card Number display */}
                  <div className="font-mono text-base tracking-widest text-slate-200 relative z-10">
                    •••• •••• •••• 7781
                  </div>

                  {/* Card Holder & Type */}
                  <div className="flex items-end justify-between relative z-10">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        CARD HOLDER
                      </span>
                      <span className="font-bold text-sm tracking-wide text-white">
                        {userData.fullName}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-xs tracking-wider text-amber-300 block">
                        {userData.debitCardType}
                      </span>
                    </div>
                  </div>

                  {/* Background graphic circle */}
                  <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-blue-500/10 blur-xl"></div>
                </div>

                {/* Card Variant selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    {t.cardTypeLabel}
                  </label>
                  <div className="space-y-2">
                    {cardVariants.map((v) => {
                      const isSelected = userData.debitCardType === v.key;
                      return (
                        <button
                          key={v.key}
                          type="button"
                          onClick={() => {
                            audio.playTap();
                            onUpdate({ debitCardType: v.key });
                          }}
                          className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center justify-between border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span>{v.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  {t.deliveryInfo}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 font-medium">
                Debit card skipped. You can request a card anytime from your branch or YONO SBI.
              </div>
            )}
          </div>

          {/* Right Column: Net Banking & Cheque Book */}
          <div className="lg:col-span-6 space-y-5">
            {/* Net Banking & YONO SBI Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {t.netBankingTitle}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t.netBankingDesc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    onUpdate({ wantNetBanking: !userData.wantNetBanking });
                  }}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    userData.wantNetBanking ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      userData.wantNetBanking ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {userData.wantNetBanking ? (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>{t.netBankingFeature1}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>{t.netBankingFeature2}</span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Provisional login credentials and setup link will be sent via SMS to {userData.mobile}.
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-500 font-medium">
                  Digital banking not enabled.
                </div>
              )}
            </div>

            {/* Cheque Book Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {t.chequeTitle}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t.chequeDesc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audio.playTap();
                    onUpdate({ wantChequeBook: !userData.wantChequeBook });
                  }}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    userData.wantChequeBook ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      userData.wantChequeBook ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {userData.wantChequeBook && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free 10-leaf cheque book selected. Sent via registered post.</span>
                </div>
              )}
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
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </KioskFooter>
    </div>
  );
};
