export type CheckType = 'message' | 'url' | 'phone';

export type RiskLevel = 'LOW_RISK' | 'SUSPICIOUS' | 'HIGH_RISK';

export type UILanguage = 'en' | 'roman_urdu' | 'ur';

export interface WarningSign {
  id: string;
  title: string;
  titleUrdu?: string;
  category: 'urgency' | 'financial' | 'domain' | 'impersonation' | 'lottery' | 'credential' | 'job' | 'courier' | 'threat';
  severity: 'high' | 'medium' | 'low';
  description: string;
  descriptionUrdu?: string;
  detectedExcerpt?: string;
}

export interface OfficialContact {
  name: string;
  type: string;
  officialNumberOrCode: string;
  officialWebsite?: string;
  notes: string;
}

export interface CommunityReport {
  id: string;
  target: string;
  targetType: CheckType;
  category: string;
  reportCount: number;
  lastReportedDate: string;
  commonNotes: string;
  verifiedOfficial?: boolean;
}

export interface ScamAnalysisResult {
  id: string;
  timestamp: number;
  inputContent: string;
  inputType: CheckType;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  summary: string;
  summaryUrdu?: string;
  detectedLanguage: 'English' | 'Roman Urdu' | 'Urdu' | 'Mixed';
  indicators: WarningSign[];
  pakistanContext: string;
  pakistanContextUrdu?: string;
  recommendations: string[];
  recommendationsUrdu?: string[];
  officialChannels?: OfficialContact[];
  communityData?: {
    isReported: boolean;
    reportCount: number;
    statusLabel: string;
    categoriesReported: string[];
    cautionNote: string;
  };
  hasSensitiveInputWarning?: boolean;
  sensitiveWarningMessage?: string;
}

export interface ScamPreset {
  id: string;
  title: string;
  titleUrdu: string;
  type: CheckType;
  expectedRisk: RiskLevel;
  tag: string;
  content: string;
}

// User Authentication & Saved Checks
export interface User {
  id: string;
  email: string;
  name: string;
  authProvider: 'email' | 'google' | 'demo';
  avatar?: string;
  createdAt: string;
}

export interface SavedCheck extends ScamAnalysisResult {
  savedAt: number;
  userNotes?: string;
  reportedByCurrentUser?: boolean;
}

// Educational Content Types
export interface EduArticle {
  id: string;
  title: string;
  titleRomanUrdu: string;
  titleUrdu: string;
  category: 'job' | 'investment' | 'lottery' | 'impersonation' | 'courier';
  badge: string;
  readTime: string;
  summary: string;
  summaryRomanUrdu: string;
  summaryUrdu: string;
  howItWorks: string[];
  howItWorksRomanUrdu: string[];
  howItWorksUrdu: string[];
  redFlags: string[];
  redFlagsRomanUrdu: string[];
  redFlagsUrdu: string[];
  realExamples: string[];
  defenseTips: string[];
  defenseTipsRomanUrdu: string[];
  defenseTipsUrdu: string[];
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  questionRomanUrdu: string;
  questionUrdu: string;
  answer: string;
  answerRomanUrdu: string;
  answerUrdu: string;
}

export interface InfographicGuide {
  id: string;
  title: string;
  titleRomanUrdu: string;
  titleUrdu: string;
  subtitle: string;
  subtitleRomanUrdu: string;
  subtitleUrdu: string;
  steps: {
    step: number;
    title: string;
    titleRomanUrdu: string;
    titleUrdu: string;
    description: string;
    descriptionRomanUrdu: string;
    descriptionUrdu: string;
    icon: string;
  }[];
}
