import React, { useState } from 'react';
import { X, Flag, CheckCircle2, ShieldAlert, Send } from 'lucide-react';
import { CheckType, UILanguage } from '../types/scam';
import { submitCommunityReport } from '../utils/aiAnalysis';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTarget: string;
  initialType: CheckType;
  currentLang: UILanguage;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  initialTarget,
  initialType,
  currentLang,
}) => {
  const [target, setTarget] = useState(initialTarget);
  const [targetType, setTargetType] = useState<CheckType>(initialType);
  const [category, setCategory] = useState('Fake BISP 8171 Lottery');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'Fake BISP 8171 Lottery Call',
    'Easypaisa / JazzCash Account Block Phishing',
    'Fake Courier Address Update Link (TCS/Leopard)',
    'Part-Time YouTube Like / Telegram Task Scam',
    'PTA SIM Block / FBR Legal Threat',
    'Jeeto Pakistan / Tariq Jamil Gold Scheme',
    'WhatsApp Account Hijack / OTP Stealing',
    'Bank Impersonation Call',
    'Other Suspicious Fraud'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) return;

    setIsSubmitting(true);
    await submitCommunityReport({
      target: target.trim(),
      targetType,
      category,
      notes: notes.trim(),
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {currentLang === 'ur' ? 'کمیونٹی فراڈ ڈیٹا بیس میں رپورٹ کریں' : 'Report Indicator to Community Radar'}
            </h3>
            <p className="text-xs text-slate-400">
              Help warn fellow Pakistani citizens about active scams &amp; fraud numbers.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              Report Successfully Recorded!
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              This indicator will now be flagged as "reported/suspicious" in the community radar to safeguard other citizens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Indicator / Target (Phone Number, URL, or Sender ID)
              </label>
              <input
                type="text"
                required
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. 0308-4928172 or bit.ly/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Scam Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                What did the scammer do or say? (Brief details)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Claimed to be from Easypaisa asking for my 4-digit PIN because my account was locked..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              <strong>Community Reporting Policy:</strong> Submitted indicators are aggregated and displayed as community warnings. ScamCheck PK does not publish private personal information.
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !target.trim()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-950"
              >
                {isSubmitting ? (
                  <span>Recording...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
