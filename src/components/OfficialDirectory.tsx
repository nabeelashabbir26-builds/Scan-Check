import React, { useState } from 'react';
import { Landmark, Search, ShieldCheck, ExternalLink, PhoneCall, CheckCircle } from 'lucide-react';
import { PAKISTAN_OFFICIAL_DIRECTORY } from '../utils/pakistanScamEngine';
import { UILanguage } from '../types/scam';

interface OfficialDirectoryProps {
  currentLang: UILanguage;
}

export const OfficialDirectory: React.FC<OfficialDirectoryProps> = ({ currentLang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const entries = Object.values(PAKISTAN_OFFICIAL_DIRECTORY);

  const filtered = entries.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.officialNumberOrCode.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.notes.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Verified Registry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {currentLang === 'ur' ? 'پاکستان کے باضابطہ شارٹ کوڈز اور ہیلپ لائنز' : 'Official Pakistani Shortcodes & Helplines'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official banking, telecom, and government identifiers registered with PTA and the State Bank of Pakistan.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code or bank..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 font-semibold">
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  <span>PTA Verified</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-1">
                {item.name}
              </h4>

              <div className="mt-2 text-base font-black font-mono text-emerald-400 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 flex items-center justify-between">
                <span>{item.officialNumberOrCode}</span>
                <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              </div>

              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                {item.notes}
              </p>
            </div>

            {item.officialWebsite && (
              <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Official Portal</span>
                <a
                  href={item.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>{item.officialWebsite.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
