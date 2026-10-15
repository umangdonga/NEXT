import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, RotateCcw, Clock } from 'lucide-react';
import { ScreenId } from '../types';
import { audio } from '../audioService';

interface FlowNavigatorProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onTriggerIdle: () => void;
  onReset: () => void;
}

export const FlowNavigator: React.FC<FlowNavigatorProps> = ({
  currentScreen,
  onSelectScreen,
  onTriggerIdle,
  onReset,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainFlow: { id: ScreenId; label: string }[] = [
    { id: '01-before-start', label: '01 Start' },
    { id: '02-aadhaar', label: '02 Aadhaar' },
    { id: '03-otp', label: '03 OTP' },
    { id: '04-scan-cards', label: '04 Scan Cards' },
    { id: '05-checking', label: '05 Checking' },
    { id: '06-confirm-details', label: '06 Confirm' },
    { id: '07-more-details', label: '07 Nominee' },
    { id: '08-review-agree', label: '08 Review' },
    { id: '08b-services', label: '08b Services' },
    { id: '09-signature', label: '09 Signature' },
    { id: '10-bank-verifying', label: '10 Verifying' },
    { id: '11-account-ready', label: '11 Ready' },
    { id: '12-print-passbook', label: '12 Passbook' },
    { id: '13-all-set', label: '13 Done' },
  ];

  const edgeCases: { id: ScreenId; label: string }[] = [
    { id: 'E1-docs-missing', label: 'E1 Docs Missing' },
    { id: 'E2-otp-problem', label: 'E2 OTP Problem' },
    { id: 'E3-scanner-error', label: 'E3 Scanner Issue' },
    { id: 'E5-session-cleared', label: 'E5 Cleared' },
    { id: 'E6-help-coming', label: 'E6 Help Token' },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-300">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Kiosk Flow Explorer:</span>
          </div>
          <span className="bg-blue-600/40 text-blue-300 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-blue-500/30">
            {currentScreen}
          </span>
        </div>

        {/* Center: Quick navigation scroll */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto py-0.5 max-w-2xl no-scrollbar">
          {mainFlow.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  audio.playTap();
                  onSelectScreen(step.id);
                }}
                className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Right side helper controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audio.playTap();
              onTriggerIdle();
            }}
            title="Simulate 60s idle countdown (E4)"
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 rounded text-[11px] font-semibold transition-all cursor-pointer"
          >
            <Clock className="w-3 h-3" />
            <span>Test Idle (E4)</span>
          </button>

          <button
            onClick={() => {
              audio.playTap();
              onReset();
            }}
            title="Reset flow"
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded panel for all edge cases & stages */}
      {isExpanded && (
        <div className="bg-slate-950 border-t border-slate-800 p-4 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                Primary 13 Kiosk Steps (Arrival to Passbook):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mainFlow.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      audio.playTap();
                      onSelectScreen(step.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                      currentScreen === step.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1.5">
                Edge Cases (From PDF Spec):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {edgeCases.map((edge) => (
                  <button
                    key={edge.id}
                    onClick={() => {
                      audio.playTap();
                      onSelectScreen(edge.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                      currentScreen === edge.id
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/60'
                    }`}
                  >
                    {edge.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    audio.playTap();
                    onTriggerIdle();
                  }}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/60 cursor-pointer"
                >
                  E4 Idle Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
