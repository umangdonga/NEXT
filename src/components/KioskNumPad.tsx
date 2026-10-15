import React from 'react';
import { Delete } from 'lucide-react';
import { audio } from '../audioService';

interface KioskNumPadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  clearLabel?: string;
}

export const KioskNumPad: React.FC<KioskNumPadProps> = ({
  onDigit,
  onClear,
  onBackspace,
  clearLabel = 'Clear',
}) => {
  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  return (
    <div className="w-full max-w-[320px] bg-slate-50/70 p-3 rounded-2xl border border-slate-200 shadow-xs">
      <div className="grid grid-cols-3 gap-2.5">
        {digits.map((row) =>
          row.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                audio.playTap();
                onDigit(d);
              }}
              className="h-14 sm:h-16 bg-white hover:bg-blue-50 active:bg-blue-100 border border-slate-200 hover:border-blue-300 text-slate-800 text-2xl font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center cursor-pointer select-none active:scale-95"
            >
              {d}
            </button>
          ))
        )}

        {/* Clear Button */}
        <button
          type="button"
          onClick={() => {
            audio.playTap();
            onClear();
          }}
          className="h-14 sm:h-16 bg-red-50/80 hover:bg-red-100/90 active:bg-red-200 border border-red-200 text-red-600 font-bold text-base rounded-xl transition-all flex items-center justify-center cursor-pointer select-none active:scale-95"
        >
          {clearLabel}
        </button>

        {/* Zero */}
        <button
          type="button"
          onClick={() => {
            audio.playTap();
            onDigit('0');
          }}
          className="h-14 sm:h-16 bg-white hover:bg-blue-50 active:bg-blue-100 border border-slate-200 hover:border-blue-300 text-slate-800 text-2xl font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center cursor-pointer select-none active:scale-95"
        >
          0
        </button>

        {/* Backspace Button */}
        <button
          type="button"
          onClick={() => {
            audio.playTap();
            onBackspace();
          }}
          className="h-14 sm:h-16 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 text-slate-700 rounded-xl transition-all flex items-center justify-center cursor-pointer select-none active:scale-95"
          title="Backspace"
        >
          <Delete className="w-6 h-6 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
