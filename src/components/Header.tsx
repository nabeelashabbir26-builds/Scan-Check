import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  User as UserIcon, 
  LogOut, 
  History, 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  ChevronDown, 
  Landmark,
  Download
} from 'lucide-react';
import { UILanguage, User } from '../types/scam';

interface HeaderProps {
  currentLang: UILanguage;
  onLanguageChange: (lang: UILanguage) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  activeSection: string;
  onNavigateSection: (section: 'scanner' | 'myChecks' | 'education' | 'directory') => void;
  savedChecksCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentLang, 
  onLanguageChange,
  currentUser,
  onOpenAuth,
  onLogout,
  activeSection,
  onNavigateSection,
  savedChecksCount = 0
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top emergency hotline ticker */}
      <div className="bg-emerald-950/70 border-b border-emerald-800/40 px-4 py-1.5 text-xs text-emerald-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-emerald-200">FIA Cyber Crime Wing Helpline:</span>
          <a href="tel:1991" className="underline hover:text-white font-bold bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-100 flex items-center gap-1">
            <PhoneCall className="w-3 h-3 inline" /> 1991
          </a>
          <span className="hidden sm:inline text-emerald-400/60">|</span>
          <span className="hidden sm:inline">PTA Spam Report:</span>
          <span className="hidden sm:inline font-mono font-bold text-emerald-200">SMS 9000</span>
        </div>
        <div className="text-[11px] text-emerald-400/80 flex items-center gap-1.5 font-medium">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          <span>Active Alerts: Fake BISP 8171 &amp; Easypaisa Block SMS Surge</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => onNavigateSection('scanner')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-900 border border-emerald-400/50 rounded-full px-1 text-[9px] font-black font-mono text-emerald-200">
              PK
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                ScamCheck <span className="text-emerald-400">PK</span>
              </span>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Cyber Defense Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Pakistan Cyber Threat, SMS, URL &amp; Phone Fraud Scanner
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigateSection('scanner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSection === 'scanner'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('education')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSection === 'education'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learn &amp; FAQs</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('myChecks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSection === 'myChecks'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>My Checks</span>
            {savedChecksCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                {savedChecksCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('directory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSection === 'directory'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Directory</span>
          </button>
        </nav>

        {/* Right Action Bar (Language Switcher + User Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language selector */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentLang === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('roman_urdu')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentLang === 'roman_urdu'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Roman Urdu"
            >
              Roman
            </button>
            <button
              onClick={() => onLanguageChange('ur')}
              className={`px-2 py-1 rounded-md font-urdu text-sm transition-all ${
                currentLang === 'ur'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Urdu (اردو)"
            >
              اردو
            </button>
          </div>

          {/* Download App ZIP Button */}
          <a
            href="/api/download-zip"
            download="scamcheck-pk-source.zip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800/80 text-slate-300 hover:text-emerald-300 transition-all shadow-sm"
            title="Download full project source code as a ZIP folder"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Download ZIP</span>
          </a>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all text-xs"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-lg object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-[11px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-slate-200 max-w-[90px] truncate hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-1.5 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 text-xs z-50 animate-fadeIn"
                >
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <div className="font-bold text-white truncate">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigateSection('myChecks');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>My Checks History</span>
                    {savedChecksCount > 0 && (
                      <span className="ml-auto text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full font-mono text-emerald-400">
                        {savedChecksCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-950"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
