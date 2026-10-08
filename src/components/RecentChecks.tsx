import React from 'react';
import { History, Trash2, ArrowUpRight, MessageSquare, Globe, Phone, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { ScamAnalysisResult, UILanguage } from '../types/scam';

interface RecentChecksProps {
  history: ScamAnalysisResult[];
  onSelectHistoryItem: (item: ScamAnalysisResult) => void;
  onClearHistory: () => void;
  currentLang: UILanguage;
}

export const RecentChecks: React.FC<RecentChecksProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
  currentLang,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {currentLang === 'ur' ? 'حالیہ چیکس (Recent Scans)' : 'Recent Scans History'}
          </h3>
          <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {history.slice(0, 6).map((item) => {
          const isHigh = item.riskLevel === 'HIGH_RISK';
          const isSuspicious = item.riskLevel === 'SUSPICIOUS';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectHistoryItem(item)}
              className="text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    {item.inputType === 'message' && <MessageSquare className="w-3 h-3 text-emerald-400" />}
                    {item.inputType === 'url' && <Globe className="w-3 h-3 text-teal-400" />}
                    {item.inputType === 'phone' && <Phone className="w-3 h-3 text-cyan-400" />}
                    <span className="text-[10px] uppercase font-mono">{item.inputType}</span>
                  </div>

                  <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    isHigh
                      ? 'bg-red-950/80 text-red-300 border border-red-800/40'
                      : isSuspicious
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                  }`}>
                    {item.riskScore}/100
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-mono truncate group-hover:text-emerald-300 transition-colors">
                  {item.inputContent}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="flex items-center gap-0.5 text-slate-400 group-hover:text-emerald-400">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
