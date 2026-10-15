import React from 'react';
import { Users, Check, ArrowRight, Edit3 } from 'lucide-react';
import { Language, UserKioskData } from '../types';
import { TRANSLATIONS } from '../translations';
import { KioskFooter } from './KioskFooter';
import { audio } from '../audioService';

interface Screen07Props {
  language: Language;
  userData: UserKioskData;
  onUpdate: (data: Partial<UserKioskData>) => void;
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  onHelp: () => void;
}

export const Screen07MoreDetails: React.FC<Screen07Props> = ({
  language,
  userData,
  onUpdate,
  onNext,
  onBack,
  onHome,
  onHelp,
}) => {
  const t = TRANSLATIONS[language].s7;

  const relationships = [
    { key: 'Spouse', label: t.relations.spouse },
    { key: 'Son', label: t.relations.son },
    { key: 'Daughter', label: t.relations.daughter },
    { key: 'Father', label: t.relations.father },
    { key: 'Mother', label: t.relations.mother },
    { key: 'Other', label: t.relations.other },
  ];

  const occupations = [
    { key: 'Salaried', label: t.occupations.salaried },
    { key: 'Self-employed', label: t.occupations.selfEmployed },
    { key: 'Business', label: t.occupations.business },
    { key: 'Student', label: t.occupations.student },
    { key: 'Homemaker', label: t.occupations.homemaker },
    { key: 'Retired', label: t.occupations.retired },
  ];

  const incomes = [
    { key: 'Below ₹1 lakh', label: t.incomes[0] },
    { key: '₹1–5 lakh', label: t.incomes[1] },
    { key: '₹5–10 lakh', label: t.incomes[2] },
    { key: 'Above ₹10 lakh', label: t.incomes[3] },
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
          {/* Left Column: Nominee required */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {t.nomineeTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.nomineeSub}
                </p>
              </div>
            </div>

            {/* Relationship selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
                {t.relationship}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {relationships.map((rel) => {
                  const isSelected = userData.nomineeRelation === rel.key;
                  return (
                    <button
                      key={rel.key}
                      type="button"
                      onClick={() => {
                        audio.playTap();
                        onUpdate({ nomineeRelation: rel.key });
                      }}
                      className={`h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{rel.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nominee Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                {t.nomineeName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userData.nomineeName}
                  onChange={(e) => onUpdate({ nomineeName: e.target.value })}
                  placeholder="Enter nominee's name"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 text-sm outline-hidden"
                />
                <Edit3 className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
              </div>
            </div>

            {/* Nominee Date of Birth */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                {t.nomineeDob}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userData.nomineeDob}
                  onChange={(e) => onUpdate({ nomineeDob: e.target.value })}
                  placeholder="e.g. 18 August 1965"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 text-sm outline-hidden"
                />
                <Edit3 className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Column: Occupation and Yearly Income */}
          <div className="lg:col-span-6 space-y-6">
            {/* Occupation Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 mb-3.5">
                {t.occupationTitle}
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {occupations.map((occ) => {
                  const isSelected = userData.occupation === occ.key;
                  return (
                    <button
                      key={occ.key}
                      type="button"
                      onClick={() => {
                        audio.playTap();
                        onUpdate({ occupation: occ.key });
                      }}
                      className={`h-12 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      <span>{occ.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Yearly Income Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 mb-3.5">
                {t.incomeTitle}
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {incomes.map((inc) => {
                  const isSelected = userData.yearlyIncome === inc.key;
                  return (
                    <button
                      key={inc.key}
                      type="button"
                      onClick={() => {
                        audio.playTap();
                        onUpdate({ yearlyIncome: inc.key });
                      }}
                      className={`h-12 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      <span>{inc.label}</span>
                    </button>
                  );
                })}
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
          onClick={() => {
            audio.playSuccess();
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <span>{t.nextBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </KioskFooter>
    </div>
  );
};
