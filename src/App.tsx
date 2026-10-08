import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Link as LinkIcon, 
  Phone, 
  BookOpen, 
  Landmark, 
  Sparkles, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Shield,
  Zap,
  PhoneCall,
  User as UserIcon
} from 'lucide-react';
import { Header } from './components/Header';
import { ScannerInput } from './components/ScannerInput';
import { PresetSelector } from './components/PresetSelector';
import { RiskResultCard } from './components/RiskResultCard';
import { ThreatRadar } from './components/ThreatRadar';
import { OfficialDirectory } from './components/OfficialDirectory';
import { RecentChecks } from './components/RecentChecks';
import { ReportModal } from './components/ReportModal';
import { DisclaimerFooter } from './components/DisclaimerFooter';
import { AuthModal } from './components/AuthModal';
import { MyChecksPage } from './components/MyChecksPage';
import { EducationModule } from './components/EducationModule';

import { CheckType, ScamAnalysisResult, ScamPreset, UILanguage, User, SavedCheck } from './types/scam';
import { checkScamRisk } from './utils/aiAnalysis';
import { 
  getCurrentUser, 
  logoutUser, 
  fetchUserChecks, 
  saveCheckToHistory 
} from './utils/authClient';

const LOCAL_STORAGE_HISTORY_KEY = 'scamcheck_pk_history_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<CheckType>('message');
  const [inputText, setInputText] = useState<string>('');
  const [currentLang, setCurrentLang] = useState<UILanguage>('en');
  const [activeSection, setActiveSection] = useState<'scanner' | 'myChecks' | 'education' | 'directory'>('scanner');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [recentChecks, setRecentChecks] = useState<ScamAnalysisResult[]>([]);
  
  // Auth & My Checks state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedChecks, setSavedChecks] = useState<SavedCheck[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement | null>(null);

  // Load user session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          const checks = await fetchUserChecks();
          setSavedChecks(checks);
        }
      } catch (err) {
        console.warn('Auth init failed:', err);
      }
    }
    initAuth();
  }, []);

  // Load local recent history
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        setRecentChecks(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read localStorage history:', e);
    }
  }, []);

  const refreshUserChecks = async () => {
    if (currentUser) {
      const checks = await fetchUserChecks();
      setSavedChecks(checks);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setSavedChecks([]);
    if (activeSection === 'myChecks') {
      setActiveSection('scanner');
    }
  };

  const saveToLocalHistory = (newResult: ScamAnalysisResult) => {
    setRecentChecks((prev) => {
      const filtered = prev.filter((p) => p.inputContent !== newResult.inputContent);
      const updated = [newResult, ...filtered].slice(0, 15);
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearLocalHistory = () => {
    setRecentChecks([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_HISTORY_KEY);
    } catch {}
  };

  const handleAnalyze = async (overrideContent?: string, overrideType?: CheckType) => {
    const textToScan = overrideContent !== undefined ? overrideContent : inputText;
    const typeToScan = overrideType !== undefined ? overrideType : currentTab;

    if (!textToScan || textToScan.trim().length === 0) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await checkScamRisk(textToScan.trim(), typeToScan, currentLang);
      setAnalysisResult(result);
      saveToLocalHistory(result);

      // Auto-save to 'My Checks' if logged in
      if (currentUser) {
        await saveCheckToHistory(result);
        refreshUserChecks();
      }

      // Scroll to result smoothly
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Scan execution error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToMyChecks = async () => {
    if (!analysisResult) return;
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    await saveCheckToHistory(analysisResult);
    refreshUserChecks();
  };

  const handleSelectPreset = (preset: ScamPreset) => {
    setCurrentTab(preset.type);
    setInputText(preset.content);
    handleAnalyze(preset.content, preset.type);
  };

  const handleSelectHistoryItem = (item: ScamAnalysisResult) => {
    setCurrentTab(item.inputType);
    setInputText(item.inputContent);
    setAnalysisResult(item);
    setActiveSection('scanner');
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectSavedCheck = (check: SavedCheck) => {
    setCurrentTab(check.inputType);
    setInputText(check.inputContent);
    setAnalysisResult(check);
    setActiveSection('scanner');
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAuthSuccess = async (user: User) => {
    setCurrentUser(user);
    const checks = await fetchUserChecks();
    setSavedChecks(checks);
    // If there was an active analysis, save it
    if (analysisResult) {
      await saveCheckToHistory(analysisResult);
      const updated = await fetchUserChecks();
      setSavedChecks(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 cyber-grid flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        activeSection={activeSection}
        onNavigateSection={setActiveSection}
        savedChecksCount={savedChecks.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Section Navigation Pills (Mobile friendly) */}
        <div className="flex md:hidden items-center justify-center mb-6 overflow-x-auto no-scrollbar">
          <div className="bg-slate-900/90 border border-slate-800 p-1 rounded-2xl flex items-center gap-1 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveSection('scanner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'scanner'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Scanner</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('education')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'education'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('myChecks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'myChecks'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>My Checks ({savedChecks.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'directory'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Codes</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: SCANNER */}
        {activeSection === 'scanner' && (
          <div className="space-y-6">
            {/* Hero Headline */}
            <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pakistan-Focused Fraud &amp; Phishing Detection Engine</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {currentLang === 'ur' ? (
                  <span className="font-urdu leading-normal">
                    مشکوک میسج یا نمبر چیک کریں اور دھوکہ دہی سے بچیں
                  </span>
                ) : currentLang === 'roman_urdu' ? (
                  <span>
                    Apna Suspicious SMS, Link ya Number <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Check Karein</span>
                  </span>
                ) : (
                  <span>
                    Stop Phishing &amp; Scams Before You <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Lose Money</span>
                  </span>
                )}
              </h1>

              <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Instantly analyze suspicious SMS, WhatsApp forwards, websites, or phone numbers targeting Pakistanis (Easypaisa, JazzCash, BISP 8171, Couriers, Banks, NADRA). Supports <strong className="text-slate-200">English, Roman Urdu, and Urdu</strong>.
              </p>
            </div>

            {/* Input Component */}
            <ScannerInput
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              inputText={inputText}
              onInputChange={setInputText}
              onAnalyze={() => handleAnalyze()}
              isLoading={isLoading}
              currentLang={currentLang}
            />

            {/* Presets */}
            <PresetSelector
              onSelectPreset={handleSelectPreset}
              currentLang={currentLang}
            />

            {/* Results Area */}
            <div ref={resultRef}>
              {analysisResult && (
                <RiskResultCard
                  result={analysisResult}
                  currentLang={currentLang}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  onReset={() => {
                    setAnalysisResult(null);
                    setInputText('');
                  }}
                  currentUser={currentUser}
                  onSaveToMyChecks={handleSaveToMyChecks}
                  isSaved={savedChecks.some(c => c.inputContent === analysisResult.inputContent)}
                />
              )}
            </div>

            {/* Recent Checks */}
            <RecentChecks
              history={recentChecks}
              onSelectHistoryItem={handleSelectHistoryItem}
              onClearHistory={handleClearLocalHistory}
              currentLang={currentLang}
            />

            {/* Quick Threat Radar Teaser & Directory */}
            <ThreatRadar currentLang={currentLang} />
            <OfficialDirectory currentLang={currentLang} />
          </div>
        )}

        {/* SECTION 2: MY CHECKS PAGE */}
        {activeSection === 'myChecks' && (
          currentUser ? (
            <MyChecksPage
              checks={savedChecks}
              onRefreshChecks={refreshUserChecks}
              onSelectCheck={handleSelectSavedCheck}
              onNavigateToScanner={() => setActiveSection('scanner')}
              currentUser={currentUser}
              currentLang={currentLang}
            />
          ) : (
            <div className="py-16 text-center bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <History className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Sign In to View 'My Checks'</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to securely save your analysis results across sessions, track threats you've analyzed, and contribute to the community phone fraud radar.
              </p>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-950"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In or Create Account</span>
              </button>
            </div>
          )
        )}

        {/* SECTION 3: COMPREHENSIVE EDUCATIONAL MODULE */}
        {activeSection === 'education' && (
          <EducationModule currentLang={currentLang} />
        )}

        {/* SECTION 4: DIRECTORY */}
        {activeSection === 'directory' && (
          <OfficialDirectory currentLang={currentLang} />
        )}
      </main>

      {/* Community Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialTarget={analysisResult?.inputContent || inputText}
        initialType={analysisResult?.inputType || currentTab}
        currentLang={currentLang}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        currentLang={currentLang}
      />

      <DisclaimerFooter currentLang={currentLang} />
    </div>
  );
}
