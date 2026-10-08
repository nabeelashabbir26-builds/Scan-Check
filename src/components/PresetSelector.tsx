import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, Globe, MessageSquare, Phone } from 'lucide-react';
import { PAKISTAN_SCAM_PRESETS } from '../utils/pakistanScamEngine';
import { ScamPreset, UILanguage } from '../types/scam';

interface PresetSelectorProps {
  onSelectPreset: (preset: ScamPreset) => void;
  currentLang: UILanguage;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  currentLang,
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{currentLang === 'ur' ? 'پاکستان میں عام فراڈ کے نمونے (ایک کلک سے ٹیسٹ کریں)' : currentLang === 'roman_urdu' ? 'Pakistan Common Scam Examples (Click to test)' : 'Popular Pakistan Real-World Scenarios (1-Click Test)'}</span>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Click any preset to auto-fill &amp; test
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {PAKISTAN_SCAM_PRESETS.map((preset) => {
          const isHigh = preset.expectedRisk === 'HIGH_RISK';
          const isSafe = preset.expectedRisk === 'LOW_RISK';

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all group flex items-start justify-between gap-2"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {preset.type === 'message' && <MessageSquare className="w-3 h-3 text-slate-400" />}
                  {preset.type === 'url' && <Globe className="w-3 h-3 text-slate-400" />}
                  {preset.type === 'phone' && <Phone className="w-3 h-3 text-slate-400" />}
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {preset.tag}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200 group-hover:text-emerald-300 truncate transition-colors">
                  {currentLang === 'ur' ? preset.titleUrdu : preset.title}
                </div>
              </div>

              <div className="shrink-0 mt-0.5">
                {isHigh ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950/80 text-red-300 border border-red-800/40">
                    Threat
                  </span>
                ) : isSafe ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                    Safe
                  </span>
                ) : (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/40">
                    Review
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
