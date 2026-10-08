import React from 'react';
import { ShieldCheck, AlertCircle, PhoneCall, Globe, Lock, ExternalLink } from 'lucide-react';
import { UILanguage } from '../types/scam';

interface DisclaimerFooterProps {
  currentLang: UILanguage;
}

export const DisclaimerFooter: React.FC<DisclaimerFooterProps> = ({ currentLang }) => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Prominent Legal & Safety Disclaimer Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>National Cybersecurity Advisory &amp; Legal Disclaimer</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Informational Only
              </span>
            </div>
            <p className="text-xs text-slate-400">
              ScamCheck PK provides automated pattern recognition, threat heuristic scoring, and public registry lookups for awareness purposes. <strong className="text-slate-200">Results are informational and cannot guarantee that any message, website, or phone number is 100% safe or fraudulent.</strong> Fraud syndicates continually alter their tactics. Always independently verify suspicious communications directly through your bank or official organizational channels.
            </p>
            <p className="text-xs text-slate-400">
              <strong className="text-emerald-400">Privacy Guarantee:</strong> ScamCheck PK operates on a zero-knowledge principle for credentials. Never input active PINs, passwords, or full credit/debit card numbers into any online tool.
            </p>
          </div>
        </div>

        {/* Directory of Emergency Pakistani Hotlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="font-bold text-white text-xs mb-1">FIA Cyber Crime Wing</div>
            <div className="text-emerald-400 font-mono font-bold text-sm">Helpline: 1991</div>
            <p className="text-[11px] text-slate-400 mt-1">For extortion, hacking, financial theft &amp; cyber fraud.</p>
            <a
              href="https://complaint.fia.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>complaint.fia.gov.pk</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="font-bold text-white text-xs mb-1">PTA Consumer Protection</div>
            <div className="text-emerald-400 font-mono font-bold text-sm">0800-55055 / SMS 9000</div>
            <p className="text-[11px] text-slate-400 mt-1">Report spam SMS or unauthorized cellular numbers.</p>
            <a
              href="https://pta.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>pta.gov.pk</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="font-bold text-white text-xs mb-1">Banking Mohtasib Pakistan</div>
            <div className="text-emerald-400 font-mono font-bold text-sm">021-99217334</div>
            <p className="text-[11px] text-slate-400 mt-1">Resolution of unresolved bank disputes &amp; unauthorized debits.</p>
            <a
              href="https://bankingmohtasib.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>bankingmohtasib.gov.pk</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="font-bold text-white text-xs mb-1">BISP Official Verification</div>
            <div className="text-emerald-400 font-mono font-bold text-sm">0800-26477 / SMS 8171</div>
            <p className="text-[11px] text-slate-400 mt-1">Verify genuine Ehsaas / Benazir welfare registration.</p>
            <a
              href="https://bisp.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>bisp.gov.pk</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>ScamCheck PK &copy; {new Date().getFullYear()} &bull; Built for Pakistani Cyber Resilience</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3 text-emerald-400" /> Client-Side Privacy First
            </span>
            <span>Supporting Urdu, Roman Urdu &amp; English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
