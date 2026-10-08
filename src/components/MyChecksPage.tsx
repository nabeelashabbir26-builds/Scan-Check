import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Search, 
  Filter, 
  Flag, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  MessageSquare, 
  Globe, 
  Phone, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Lock,
  Plus,
  StickyNote
} from 'lucide-react';
import { SavedCheck, CheckType, RiskLevel, UILanguage, User } from '../types/scam';
import { deleteCheckFromHistory, clearAllUserChecks, reportPhoneNumberAsUser } from '../utils/authClient';

interface MyChecksPageProps {
  checks: SavedCheck[];
  onRefreshChecks: () => void;
  onSelectCheck: (check: SavedCheck) => void;
  onNavigateToScanner: () => void;
  currentUser: User | null;
  currentLang: UILanguage;
}

export const MyChecksPage: React.FC<MyChecksPageProps> = ({
  checks,
  onRefreshChecks,
  onSelectCheck,
  onNavigateToScanner,
  currentUser,
  currentLang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | CheckType>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | RiskLevel>('all');
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);

  // Filtered list
  const filtered = checks.filter((c) => {
    const matchesSearch = 
      c.inputContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.userNotes && c.userNotes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || c.inputType === typeFilter;
    const matchesRisk = riskFilter === 'all' || c.riskLevel === riskFilter;
    return matchesSearch && matchesType && matchesRisk;
  });

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this scan from My Checks?')) {
      await deleteCheckFromHistory(id);
      onRefreshChecks();
    }
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to clear your entire "My Checks" history?')) {
      await clearAllUserChecks();
      onRefreshChecks();
    }
  };

  const handleReportPhone = async (e: React.MouseEvent, check: SavedCheck) => {
    e.stopPropagation();
    try {
      setReportingId(check.id);
      const res = await reportPhoneNumberAsUser({
        phone: check.inputContent,
        category: check.indicators[0]?.title || 'Suspicious Caller',
        notes: `Reported by authenticated user ${currentUser?.name || ''} via My Checks`,
        checkId: check.id,
      });
      setReportSuccessMsg(`Phone number reported! Total community flags: ${res.reports}. Marked as reported/suspicious.`);
      setTimeout(() => setReportSuccessMsg(null), 4000);
      onRefreshChecks();
    } catch (err: any) {
      alert(err.message || 'Failed to submit community report');
    } finally {
      setReportingId(null);
    }
  };

  const exportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(checks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scamcheck_pk_my_checks_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Stats calculation
  const totalCount = checks.length;
  const highRiskCount = checks.filter(c => c.riskLevel === 'HIGH_RISK').length;
  const phoneCount = checks.filter(c => c.inputType === 'phone').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Authenticated History Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            My Checks &amp; Threat Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Securely saved scans for <strong className="text-slate-200">{currentUser?.name}</strong> ({currentUser?.email}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {checks.length > 0 && (
            <>
              <button
                type="button"
                onClick={exportHistory}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Export My Checks"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onNavigateToScanner}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-950"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Scan New Item</span>
          </button>
        </div>
      </div>

      {reportSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{reportSuccessMsg}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Items Saved</div>
          <div className="text-2xl font-black font-mono text-white mt-1">{totalCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">SMS, URLs &amp; Phone numbers</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">High Risk Threats</div>
          <div className="text-2xl font-black font-mono text-red-400 mt-1">{highRiskCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Scam markers detected</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Phone Numbers Audited</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-1">{phoneCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Eligible for community reporting</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved checks or notes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="message">SMS / Message</option>
            <option value="url">Website URL</option>
            <option value="phone">Phone Number</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="HIGH_RISK">High Risk Only</option>
            <option value="SUSPICIOUS">Suspicious Only</option>
            <option value="LOW_RISK">Low Risk Only</option>
          </select>
        </div>
      </div>

      {/* Checks Grid / List */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl space-y-3">
          <History className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-slate-300">No checks found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {checks.length === 0
              ? 'You have not saved any past checks yet. Scan a message, link, or phone number and click "Save to My Checks".'
              : 'No items match your active search or filter criteria.'}
          </p>
          {checks.length === 0 && (
            <button
              type="button"
              onClick={onNavigateToScanner}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Perform Your First Scan</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((item) => {
            const isHigh = item.riskLevel === 'HIGH_RISK';
            const isSuspicious = item.riskLevel === 'SUSPICIOUS';

            return (
              <div
                key={item.id}
                onClick={() => onSelectCheck(item)}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                        {item.inputType === 'message' && <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
                        {item.inputType === 'url' && <Globe className="w-3.5 h-3.5 text-teal-400" />}
                        {item.inputType === 'phone' && <Phone className="w-3.5 h-3.5 text-cyan-400" />}
                      </span>
                      <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                        {item.inputType}
                      </span>
                      {item.detectedLanguage && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-emerald-400/90 border border-slate-800">
                          {item.detectedLanguage}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
                        isHigh
                          ? 'bg-red-950/80 text-red-300 border border-red-800/40'
                          : isSuspicious
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                      }`}>
                        {item.riskScore}/100 &bull; {item.riskLevel.replace('_', ' ')}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete check"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Input content preview */}
                  <div className="font-mono text-xs text-slate-200 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 line-clamp-2 break-all group-hover:text-emerald-300 transition-colors">
                    {item.inputContent}
                  </div>

                  {/* Verdict summary */}
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Indicators tags */}
                  {item.indicators && item.indicators.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.indicators.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 truncate max-w-[200px]"
                        >
                          &bull; {ind.title}
                        </span>
                      ))}
                      {item.indicators.length > 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                          +{item.indicators.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Community report status for phone */}
                  {item.inputType === 'phone' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                      {item.reportedByCurrentUser ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Flagged by you to Community Radar</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleReportPhone(e, item)}
                          disabled={reportingId === item.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-950/70 hover:bg-amber-900/70 text-amber-300 border border-amber-800/50 transition-colors"
                        >
                          <Flag className="w-3 h-3 text-amber-400" />
                          <span>{reportingId === item.id ? 'Reporting...' : 'Report Phone to Community'}</span>
                        </button>
                      )}

                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.communityData?.reportCount || 0} community reports
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Saved: {new Date(item.savedAt || item.timestamp).toLocaleDateString()} {new Date(item.savedAt || item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-emerald-400 group-hover:underline flex items-center gap-1 font-semibold">
                    <span>View Full Analysis</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
