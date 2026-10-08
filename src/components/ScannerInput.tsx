import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Link as LinkIcon, 
  Phone, 
  Search, 
  Clipboard, 
  Trash2, 
  AlertCircle, 
  ShieldAlert,
  Sparkles,
  Lock
} from 'lucide-react';
import { CheckType, UILanguage } from '../types/scam';
import { checkSensitiveInput } from '../utils/pakistanScamEngine';

interface ScannerInputProps {
  currentTab: CheckType;
  onTabChange: (tab: CheckType) => void;
  inputText: string;
  onInputChange: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  currentLang: UILanguage;
}

export const ScannerInput: React.FC<ScannerInputProps> = ({
  currentTab,
  onTabChange,
  inputText,
  onInputChange,
  onAnalyze,
  isLoading,
  currentLang,
}) => {
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);

  // Live sensitive input check
  useEffect(() => {
    if (inputText.trim().length > 0) {
      const check = checkSensitiveInput(inputText);
      setSensitiveWarning(check.hasSensitive ? (check.message || null) : null);
    } else {
      setSensitiveWarning(null);
    }
  }, [inputText]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onInputChange(text);
      }
    } catch {
      // Fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || currentTab !== 'message')) {
      e.preventDefault();
      if (inputText.trim().length > 0 && !isLoading) {
        onAnalyze();
      }
    }
  };

  // Placeholders based on language & tab
  const getPlaceholder = () => {
    if (currentLang === 'ur') {
      if (currentTab === 'message') return 'یہاں مشکوک میسج (ایس ایم ایس، واٹس ایپ، یا ای میل) پیسٹ کریں... (اردو، رومن اردو، یا انگلش)';
      if (currentTab === 'url') return 'مشکوک ویب سائٹ لنک درج کریں، مثلاً: https://easypaisa-login.xyz یا bit.ly/...';
      return 'مشکوک موبائل نمبر درج کریں، مثلاً: 0308-4928172 یا +923...';
    }
    if (currentLang === 'roman_urdu') {
      if (currentTab === 'message') return 'Yahan suspicious SMS, WhatsApp message ya email paste karein (Roman Urdu, Urdu ya English)...';
      if (currentTab === 'url') return 'Suspicious website link enter karein, maslan: easypaisa-verify.top ya bit.ly/...';
      return 'Suspicious mobile number enter karein, maslan: 0308-4928172 ya +92...';
    }
    if (currentTab === 'message') return 'Paste suspicious SMS, WhatsApp message, or email here (English, Roman Urdu, or Urdu)...';
    if (currentTab === 'url') return 'Paste website link or domain, e.g., https://easypaisa-login.xyz or bit.ly/claim-bisp...';
    return 'Enter phone number or sender ID, e.g., 0304-9182341 or +92 308 4928172...';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative backdrop-blur-xl">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 pb-3 mb-4 gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => onTabChange('message')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            currentTab === 'message'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>{currentLang === 'ur' ? 'ایس ایم ایس / واٹس ایپ' : currentLang === 'roman_urdu' ? 'Message (SMS/WhatsApp)' : 'Message / SMS / WhatsApp'}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('url')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            currentTab === 'url'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <LinkIcon className="w-4 h-4 text-teal-400" />
          <span>{currentLang === 'ur' ? 'ویب سائٹ لنک / URL' : currentLang === 'roman_urdu' ? 'Website URL / Link' : 'Website URL / Link'}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('phone')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            currentTab === 'phone'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>{currentLang === 'ur' ? 'فون نمبر / شارٹ کوڈ' : currentLang === 'roman_urdu' ? 'Phone Number / Code' : 'Phone Number / Sender ID'}</span>
        </button>
      </div>

      {/* Sensitive Data Guard Alert */}
      {sensitiveWarning && (
        <div className="mb-4 p-3.5 rounded-xl bg-amber-950/70 border border-amber-600/50 text-amber-200 text-xs flex items-start gap-2.5 animate-fadeIn">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-300">Privacy Safeguard Triggered</div>
            <p className="mt-0.5 leading-relaxed">{sensitiveWarning}</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="relative">
        {currentTab === 'message' ? (
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={5}
            placeholder={getPlaceholder()}
            dir={currentLang === 'ur' ? 'rtl' : 'ltr'}
            className={`w-full bg-slate-950/80 border border-slate-700/70 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm sm:text-base leading-relaxed transition-all resize-y ${
              currentLang === 'ur' ? 'font-urdu text-base' : ''
            }`}
          />
        ) : (
          <div className="relative">
            <input
              type={currentTab === 'phone' ? 'tel' : 'text'}
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl py-3.5 pl-4 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm sm:text-base transition-all font-mono"
            />
          </div>
        )}

        {/* Input Utilities Floating Row */}
        <div className="flex items-center justify-between mt-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 hover:text-slate-200 transition-colors text-slate-300"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-slate-400" />
              <span>Paste</span>
            </button>
            {inputText.length > 0 && (
              <button
                type="button"
                onClick={() => onInputChange('')}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-400 hover:text-red-400 transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-500">
              {inputText.length} chars
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400/80">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>Never logs passwords/PINs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Supports English, Roman Urdu &amp; Urdu text</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isLoading || inputText.trim().length === 0}
          className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg ${
            isLoading || inputText.trim().length === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40 hover:shadow-emerald-700/40 border border-emerald-400/40 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Scanning Pakistan Cyber Threat Signals...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 text-emerald-200" />
              <span>{currentLang === 'ur' ? 'خطرے کی جانچ کریں' : currentLang === 'roman_urdu' ? 'Check Scam Risk' : 'Analyze Risk Now'}</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
