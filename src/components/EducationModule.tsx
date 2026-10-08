import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Lock, 
  Key, 
  PhoneCall, 
  Camera, 
  FileText, 
  ShieldOff, 
  Smartphone, 
  CreditCard,
  ExternalLink,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { EDUCATIONAL_ARTICLES, FAQS_DATA, INFOGRAPHIC_WORKFLOWS } from '../data/educationalContent';
import { EduArticle, UILanguage } from '../types/scam';

interface EducationModuleProps {
  currentLang: UILanguage;
}

export const EducationModule: React.FC<EducationModuleProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'infographics' | 'faqs'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<EduArticle | null>(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(FAQS_DATA[0].id);

  const getArticleTitle = (article: EduArticle) => {
    if (currentLang === 'ur') return article.titleUrdu;
    if (currentLang === 'roman_urdu') return article.titleRomanUrdu;
    return article.title;
  };

  const getArticleSummary = (article: EduArticle) => {
    if (currentLang === 'ur') return article.summaryUrdu;
    if (currentLang === 'roman_urdu') return article.summaryRomanUrdu;
    return article.summary;
  };

  const filteredFaqs = FAQS_DATA.filter(f => {
    const q = faqSearch.toLowerCase();
    return (
      f.question.toLowerCase().includes(q) ||
      f.questionRomanUrdu.toLowerCase().includes(q) ||
      f.questionUrdu.includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.answerRomanUrdu.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Module Hero */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Pakistan Cyber Academy &amp; Defense Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {currentLang === 'ur' ? (
            <span className="font-urdu leading-normal">ڈیجیٹل دھوکہ دہی سے آگاہی اور بچاؤ گائیڈ</span>
          ) : currentLang === 'roman_urdu' ? (
            'Pakistan Scam Defense & Educational Center'
          ) : (
            'Comprehensive Cyber Defense & Scam Academy'
          )}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'ur' ? (
            <span className="font-urdu text-sm">
              پاکستان میں روزمرہ کے فراڈ (آن لائن نوکری، جعلی لاٹری، انویسٹمنٹ اور بینک کے نام پر دھوکہ دہی) کو سمجھیں اور خود کو محفوظ رکھیں۔
            </span>
          ) : currentLang === 'roman_urdu' ? (
            'Pakistan mein aam frauds (jobs, lottery, investment aur bank impersonation) ko samajhein aur unse bachne k tareeqay seekhein.'
          ) : (
            'Master the psychology, common Pakistani tactics (Easypaisa/JazzCash, BISP, Courier Phishing, Job Scams), and learn the critical steps to protect your finances.'
          )}
        </p>

        {/* Sub-tab navigation */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => { setActiveTab('articles'); setSelectedArticle(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'articles'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{currentLang === 'ur' ? 'تحقیقی مضامین (Articles)' : 'Threat Articles'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('infographics'); setSelectedArticle(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'infographics'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{currentLang === 'ur' ? 'حفاظتی چارٹس (Infographics)' : 'Defense Checklists & Infographics'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('faqs'); setSelectedArticle(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{currentLang === 'ur' ? 'اکثر پوچھے گئے سوالات (FAQs)' : 'Frequently Asked Questions (FAQs)'}</span>
          </button>
        </div>
      </div>

      {/* 1. ARTICLES TAB */}
      {activeTab === 'articles' && !selectedArticle && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATIONAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                    {article.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className={`text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                  {getArticleTitle(article)}
                </h3>

                <p className={`text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3 ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                  {getArticleSummary(article)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Read Full Investigation &amp; Defense</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ARTICLE FULL DETAIL VIEW */}
      {activeTab === 'articles' && selectedArticle && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-fadeIn">
          <button
            type="button"
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <span>&larr; Back to all educational articles</span>
          </button>

          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                {selectedArticle.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono">{selectedArticle.readTime}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black text-white ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
              {getArticleTitle(selectedArticle)}
            </h2>
            <p className={`text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
              {getArticleSummary(selectedArticle)}
            </p>
          </div>

          {/* How It Works Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>How the Scam Syndicate Operates</span>
            </h4>
            <div className="space-y-2">
              {(currentLang === 'ur'
                ? selectedArticle.howItWorksUrdu
                : currentLang === 'roman_urdu'
                ? selectedArticle.howItWorksRomanUrdu
                : selectedArticle.howItWorks
              ).map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800/50 text-amber-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className={`leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags & Warning Signs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Critical Red Flags to Spot</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(currentLang === 'ur'
                ? selectedArticle.redFlagsUrdu
                : currentLang === 'roman_urdu'
                ? selectedArticle.redFlagsRomanUrdu
                : selectedArticle.redFlags
              ).map((flag, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-red-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                  <span className={`leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real SMS Examples */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Real Pakistani Scam Message Patterns:
            </div>
            {selectedArticle.realExamples.map((ex, idx) => (
              <div key={idx} className="font-mono text-xs text-slate-200 bg-slate-900 p-2.5 rounded border border-slate-800 break-words">
                {ex}
              </div>
            ))}
          </div>

          {/* Defense Rules */}
          <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>How To Defend Yourself</span>
            </h4>
            <div className="space-y-2">
              {(currentLang === 'ur'
                ? selectedArticle.defenseTipsUrdu
                : currentLang === 'roman_urdu'
                ? selectedArticle.defenseTipsRomanUrdu
                : selectedArticle.defenseTips
              ).map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-emerald-100/90 leading-relaxed">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span className={currentLang === 'ur' ? 'font-urdu' : ''}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. INFOGRAPHICS & CHECKLISTS TAB */}
      {activeTab === 'infographics' && (
        <div className="space-y-8">
          {INFOGRAPHIC_WORKFLOWS.map((guide) => (
            <div key={guide.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  Infographic Checklist
                </span>
                <h3 className={`text-xl sm:text-2xl font-black text-white mt-1 ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                  {currentLang === 'ur' ? guide.titleUrdu : currentLang === 'roman_urdu' ? guide.titleRomanUrdu : guide.title}
                </h3>
                <p className={`text-xs text-slate-400 mt-1 ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                  {currentLang === 'ur' ? guide.subtitleUrdu : currentLang === 'roman_urdu' ? guide.subtitleRomanUrdu : guide.subtitle}
                </p>
              </div>

              {/* Numbered Step Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {guide.steps.map((st) => (
                  <div key={st.step} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 relative group hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono font-bold text-xs flex items-center justify-center">
                          {st.step}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Step {st.step}</span>
                      </div>

                      <h4 className={`text-xs font-bold text-white group-hover:text-emerald-300 transition-colors ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                        {currentLang === 'ur' ? st.titleUrdu : currentLang === 'roman_urdu' ? st.titleRomanUrdu : st.title}
                      </h4>

                      <p className={`text-[11px] text-slate-400 mt-1.5 leading-relaxed ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                        {currentLang === 'ur' ? st.descriptionUrdu : currentLang === 'roman_urdu' ? st.descriptionRomanUrdu : st.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-900 text-[10px] text-emerald-500 font-mono">
                      Action Required
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. FAQS TAB */}
      {activeTab === 'faqs' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {currentLang === 'ur' ? 'عام سوالات اور جوابات' : 'Frequently Asked Questions (FAQs)'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Straight answers to the most common questions regarding fraud in Pakistan.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;

              const questionText = currentLang === 'ur' ? faq.questionUrdu : currentLang === 'roman_urdu' ? faq.questionRomanUrdu : faq.question;
              const answerText = currentLang === 'ur' ? faq.answerUrdu : currentLang === 'roman_urdu' ? faq.answerRomanUrdu : faq.answer;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-slate-950/70 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {faq.category}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold text-white ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
                        {questionText}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/30 whitespace-pre-line">
                      <p className={currentLang === 'ur' ? 'font-urdu' : ''}>{answerText}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
