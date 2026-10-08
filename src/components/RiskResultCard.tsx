import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  PhoneCall, 
  Flag, 
  Info,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Landmark,
  Bookmark,
  Share2
} from 'lucide-react';
import { ScamAnalysisResult, UILanguage, User } from '../types/scam';

interface RiskResultCardProps {
  result: ScamAnalysisResult;
  currentLang: UILanguage;
  onOpenReportModal: () => void;
  onReset: () => void;
  currentUser?: User | null;
  onSaveToMyChecks?: () => void;
  isSaved?: boolean;
}

export const RiskResultCard: React.FC<RiskResultCardProps> = ({
  result,
  currentLang,
  onOpenReportModal,
  onReset,
  currentUser,
  onSaveToMyChecks,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(isSaved);

  const isHighRisk = result.riskLevel === 'HIGH_RISK';
  const isSuspicious = result.riskLevel === 'SUSPICIOUS';
  const isLowRisk = result.riskLevel === 'LOW_RISK';

  const getRiskColor = () => {
    if (isHighRisk) return {
      badgeBg: 'bg-red-500/15 border-red-500/40 text-red-400',
      gradient: 'from-red-500 to-rose-600',
      barColor: 'bg-red-500',
      textColor: 'text-red-400',
      borderColor: 'border-red-900/60',
      glowShadow: 'shadow-red-950/50',
      bgCard: 'bg-red-950/10',
      icon: ShieldAlert
    };
    if (isSuspicious) return {
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
      gradient: 'from-amber-500 to-yellow-600',
      barColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-900/60',
      glowShadow: 'shadow-amber-950/50',
      bgCard: 'bg-amber-950/10',
      icon: AlertTriangle
    };
    return {
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600',
      barColor: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-900/60',
      glowShadow: 'shadow-emerald-950/50',
      bgCard: 'bg-emerald-950/10',
      icon: ShieldCheck
    };
  };

  const colors = getRiskColor();
  const IconComponent = colors.icon;

  const getRiskTitle = () => {
    if (currentLang === 'ur') {
      if (isHighRisk) return 'ہائی رسک (انتہائی مشکوک و خطرناک)';
      if (isSuspicious) return 'مشکوک (احتیاط برتیں)';
      return 'کم رسک (محفوظ معلوم ہوتا ہے)';
    }
    if (currentLang === 'roman_urdu') {
      if (isHighRisk) return 'High Risk (Bohat Khatarnak / Fraud)';
      if (isSuspicious) return 'Suspicious (Mashkook / Ehtiyat Karein)';
      return 'Low Risk (Mehfooz Maloom Hota Hai)';
    }
    if (isHighRisk) return 'High Risk (Probable Fraud)';
    if (isSuspicious) return 'Suspicious (Caution Advised)';
    return 'Low Risk (Authentic Pattern)';
  };

  const copyAnalysisReport = () => {
    const textToCopy = `[ScamCheck PK Threat Assessment]
Target: ${result.inputContent}
Verdict: ${result.riskLevel} (Score: ${result.riskScore}/100)
Summary: ${result.summary}
Pakistan Context: ${result.pakistanContext}
Verified via ScamCheck PK (https://scamcheck.pk)`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveClick = () => {
    if (onSaveToMyChecks) {
      onSaveToMyChecks();
      setSaveSuccess(true);
    }
  };

  return (
    <div className={`mt-6 rounded-2xl border ${colors.borderColor} bg-slate-900/90 shadow-2xl ${colors.glowShadow} overflow-hidden backdrop-blur-xl transition-all`}>
      {/* Top Threat Banner */}
      <div className={`p-4 sm:p-6 border-b ${colors.borderColor} ${colors.bgCard} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shrink-0 shadow-lg shadow-black/40`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors.badgeBg} uppercase tracking-wider`}>
                {getRiskTitle()}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Type: {result.inputType.toUpperCase()}
              </span>
              {result.detectedLanguage && (
                <span className="text-xs font-mono text-emerald-400/90 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  {result.detectedLanguage}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-2 tracking-tight">
              {currentLang === 'ur' && result.summaryUrdu ? (
                <span className="font-urdu leading-relaxed">{result.summaryUrdu}</span>
              ) : (
                result.summary
              )}
            </h2>
          </div>
        </div>

        {/* Score Gauge Circular/Meter */}
        <div className="shrink-0 flex items-center gap-3 bg-slate-950/70 border border-slate-800 p-3 rounded-2xl">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Risk Score</div>
            <div className={`text-2xl sm:text-3xl font-black font-mono ${colors.textColor}`}>
              {result.riskScore}<span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={isHighRisk ? 'text-red-500' : isSuspicious ? 'text-amber-500' : 'text-emerald-500'}
                strokeDasharray={`${result.riskScore}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Scanned Input Snapshot */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Analyzed Input</span>
            <span className="font-mono text-slate-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="font-mono text-slate-300 break-all line-clamp-3 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            {result.inputContent}
          </div>
        </div>

        {/* Community Database Report Status (Especially for Phone Numbers & Links) */}
        {result.communityData && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-sm text-white">Community Fraud Intelligence</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                result.communityData.isReported
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {result.communityData.statusLabel}
              </span>
            </div>
            {result.communityData.isReported ? (
              <div className="text-xs text-slate-300 space-y-1.5 mt-2">
                <p>
                  This item has been flagged <strong className="text-amber-300">{result.communityData.reportCount} times</strong> by fellow Pakistani citizens.
                </p>
                <div className="p-2.5 bg-amber-950/30 border border-amber-900/40 rounded-lg text-amber-200/90 text-[11px] italic">
                  Note: In compliance with cybersecurity standards, community reports indicate this entity has been flagged as "reported/suspicious" by citizens rather than establishing legal guilt. Stay vigilant.
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No active complaints recorded yet. You can report this number if it targeted you to alert the community.
              </p>
            )}
          </div>
        )}

        {/* Detected Warning Signs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Detected Scam Indicators ({result.indicators.length})</span>
            </h3>
          </div>

          {result.indicators.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No known scam signatures, extortion tactics, or phishing triggers were found in this input.</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {result.indicators.map((indicator) => (
                <div
                  key={indicator.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        indicator.severity === 'high' ? 'bg-red-400' : indicator.severity === 'medium' ? 'bg-amber-400' : 'bg-slate-400'
                      }`} />
                      <span>{currentLang === 'ur' && indicator.titleUrdu ? indicator.titleUrdu : indicator.title}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                      indicator.severity === 'high'
                        ? 'bg-red-950/80 text-red-300 border border-red-800/40'
                        : indicator.severity === 'medium'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {indicator.severity} Severity
                    </span>
                  </div>

                  <p className={`text-xs text-slate-300 leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                    {currentLang === 'ur' && indicator.descriptionUrdu ? indicator.descriptionUrdu : indicator.description}
                  </p>

                  {indicator.detectedExcerpt && (
                    <div className="mt-2 text-[11px] font-mono bg-slate-900/90 text-amber-300/90 px-2.5 py-1 rounded border border-slate-800/80 flex items-center gap-1.5">
                      <span className="text-slate-500">Trigger:</span>
                      <span className="truncate">"{indicator.detectedExcerpt}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pakistan Reality Check & Institutional Context */}
        {result.pakistanContext && (
          <div className="rounded-xl border border-teal-900/60 bg-teal-950/20 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm mb-2">
              <Landmark className="w-4 h-4 text-teal-400" />
              <span>Pakistan Reality Check: How the Official System Actually Works</span>
            </div>
            <p className={`text-xs sm:text-sm text-teal-100/90 leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
              {currentLang === 'ur' && result.pakistanContextUrdu ? result.pakistanContextUrdu : result.pakistanContext}
            </p>
          </div>
        )}

        {/* Safety Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recommended Immediate Actions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {(currentLang === 'ur' && result.recommendationsUrdu ? result.recommendationsUrdu : result.recommendations).map((rec, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className={`leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Pakistani Helplines & Verified Channels */}
        {result.officialChannels && result.officialChannels.length > 0 && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Pakistani Directory for this Entity</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.officialChannels.map((channel, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs">
                  <div className="font-semibold text-slate-200">{channel.name}</div>
                  <div className="font-mono text-emerald-400 font-bold mt-0.5">
                    Code / Tel: {channel.officialNumberOrCode}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{channel.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={copyAnalysisReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Report'}</span>
            </button>

            {/* Save to My Checks Button */}
            <button
              type="button"
              onClick={handleSaveClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                saveSuccess
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saveSuccess ? 'text-emerald-400 fill-emerald-400' : ''}`} />
              <span>{saveSuccess ? 'Saved in My Checks' : 'Save to My Checks'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/50 transition-colors"
            >
              <Flag className="w-3.5 h-3.5 text-amber-400" />
              <span>Report to Community</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white transition-colors"
          >
            Check Another Item
          </button>
        </div>
      </div>
    </div>
  );
};
