import { CheckType, RiskLevel, ScamAnalysisResult, WarningSign, OfficialContact, ScamPreset } from '../types/scam';

// Pakistan official telecommunication & banking shortcodes directory
export const PAKISTAN_OFFICIAL_DIRECTORY: Record<string, OfficialContact> = {
  '3737': {
    name: 'Easypaisa (Telenor Microfinance Bank)',
    type: 'Official SMS Shortcode',
    officialNumberOrCode: '3737',
    officialWebsite: 'https://easypaisa.com.pk',
    notes: 'Official Easypaisa SMS will ONLY originate from 3737 or sender ID "Easypaisa". They NEVER use 11-digit mobile numbers.'
  },
  '8558': {
    name: 'JazzCash Official Notification',
    type: 'Official SMS Shortcode',
    officialNumberOrCode: '8558 / 4444',
    officialWebsite: 'https://jazzcash.com.pk',
    notes: 'Official JazzCash transaction alerts come exclusively from 8558. Helpline is 4444 (from Jazz) or 021-111-124-444.'
  },
  '8171': {
    name: 'BISP / Ehsaas Kafalat Official',
    type: 'Official Government Shortcode',
    officialNumberOrCode: '8171',
    officialWebsite: 'https://bisp.gov.pk',
    notes: 'BISP and Ehsaas government cash transfers are issued SOLELY through shortcode 8171. ANY other number claiming BISP funds is 100% fraudulent.'
  },
  '8484': {
    name: 'PTA DIRBS (Device Verification)',
    type: 'Official Regulator Shortcode',
    officialNumberOrCode: '8484',
    officialWebsite: 'https://dirbs.pta.gov.pk',
    notes: 'PTA device IMEI registration checks are processed exclusively through 8484 or official website.'
  },
  '8500': {
    name: 'NADRA Citizen Verification',
    type: 'Official Regulator Shortcode',
    officialNumberOrCode: '8500',
    officialWebsite: 'https://nadra.gov.pk',
    notes: 'NADRA citizen CNIC verification service. NADRA never sends threats of CNIC cancellation via WhatsApp.'
  },
  '1991': {
    name: 'FIA Cyber Crime Wing Helpline',
    type: 'National Law Enforcement Hotline',
    officialNumberOrCode: '1991',
    officialWebsite: 'https://complaint.fia.gov.pk',
    notes: 'National helpline for reporting online scams, financial fraud, WhatsApp hacking, and harassment.'
  },
  '080055055': {
    name: 'PTA Consumer Protection Toll-Free',
    type: 'Regulator Helpline',
    officialNumberOrCode: '0800-55055',
    officialWebsite: 'https://pta.gov.pk',
    notes: 'Call to report fraudulent SMS senders, spam SIMs, and unsolicited marketing.'
  },
  '4250': {
    name: 'Habib Bank Limited (HBL)',
    type: 'Official Bank Shortcode',
    officialNumberOrCode: '4250 / 021-111-111-425',
    officialWebsite: 'https://hbl.com',
    notes: 'HBL official alerts come from shortcode 4250 or sender ID "HBL".'
  },
  '8222': {
    name: 'Meezan Bank Limited',
    type: 'Official Bank Shortcode',
    officialNumberOrCode: '8222 / 021-111-331-331',
    officialWebsite: 'https://meezanbank.com',
    notes: 'Meezan Bank transaction alerts originate from 8222 or "MeezanBank".'
  },
  '8080': {
    name: 'Muslim Commercial Bank (MCB)',
    type: 'Official Bank Shortcode',
    officialNumberOrCode: '8080 / 021-111-000-622',
    officialWebsite: 'https://mcb.com.pk',
    notes: 'MCB official SMS alerts.'
  },
  '8870': {
    name: 'NayaPay',
    type: 'Official Digital Wallet Shortcode',
    officialNumberOrCode: '8870',
    officialWebsite: 'https://nayapay.com',
    notes: 'NayaPay transaction and OTP notifications originate from 8870.'
  },
  '8770': {
    name: 'SadaPay',
    type: 'Official Digital Wallet Shortcode',
    officialNumberOrCode: '8770',
    officialWebsite: 'https://sadapay.pk',
    notes: 'SadaPay OTP notifications originate from 8770.'
  }
};

// Seeded community intelligence for Pakistan phone numbers & domains
export const COMMUNITY_REPORTS_DATABASE: Record<string, {
  reports: number;
  category: string;
  notes: string;
  firstReported: string;
}> = {
  '03084928172': {
    reports: 58,
    category: 'Fake BISP 8171 Lottery Call',
    notes: 'Caller claims victim won Rs. 25,000 from Benazir program, asks for Rs. 2,000 load/advance fee.',
    firstReported: '2025-01-14'
  },
  '03049182341': {
    reports: 42,
    category: 'Easypaisa Account Block Phishing',
    notes: 'Sends SMS claiming Easypaisa account will be locked, asks to call back to verify biometric.',
    firstReported: '2025-02-01'
  },
  '03125549012': {
    reports: 89,
    category: 'Jeeto Pakistan / Tariq Jamil Gold Scheme',
    notes: 'Impersonates ARY Digital Jeeto Pakistan coordinator demanding tax fee before prize delivery.',
    firstReported: '2024-11-20'
  },
  '03458129034': {
    reports: 34,
    category: 'Fake Courier Delivery Address Phishing',
    notes: 'Sends link claiming Leopard / TCS parcel address is missing, asks to click suspicious link.',
    firstReported: '2025-02-18'
  },
  '03217734891': {
    reports: 27,
    category: 'Part-time YouTube Like Task Scam',
    notes: 'Directs victim to Telegram channel promising Rs 4,000/day, asks for VIP deposit fee.',
    firstReported: '2025-02-25'
  },
  '+447911123456': {
    reports: 63,
    category: 'Overseas WhatsApp Investment / Job Scam',
    notes: 'UK virtual number posing as global recruiter offering remote data entry.',
    firstReported: '2025-01-10'
  }
};

// Common Pakistani scam presets for users to test with 1-click
export const PAKISTAN_SCAM_PRESETS: ScamPreset[] = [
  {
    id: 'easypaisa-fake-block',
    title: 'Easypaisa Account Block Alert (SMS from 0304...)',
    titleUrdu: 'ایزی پیسہ اکاؤنٹ بلاک الرٹ (جعلی ایس ایم ایس)',
    type: 'message',
    expectedRisk: 'HIGH_RISK',
    tag: 'Mobile Wallet Scam',
    content: `Moazziz Sarif, apka Easypaisa account biometric na honay ki waja se 24 ghante mein block ho jaega. Account bahal karwane k liye fauran is number par call karein: 0304-9182341 ya apna OTP code share karein.`
  },
  {
    id: 'bisp-8171-fake-prize',
    title: 'Fake BISP 8171 Rs. 25,000 Grant (Roman Urdu)',
    titleUrdu: 'بینظیر انکم سپورٹ 25,000 روپے جعلی میسج',
    type: 'message',
    expectedRisk: 'HIGH_RISK',
    tag: 'BISP / Ehsaas Scam',
    content: `Mubarak ho! Benazir Income Support Program (BISP) ki janib se apka 25,000 rupay ka wazifa manzoor ho gaya hai. Parchi number 8829. Apni raqam hasil karne k liye fauran is WhatsApp number 0308-4928172 par rabta karein.`
  },
  {
    id: 'tcs-courier-failed',
    title: 'TCS Parcel Delivery Failed Link (SMS)',
    titleUrdu: 'ٹی سی ایس پارسل فیلڈ لنک فراڈ',
    type: 'message',
    expectedRisk: 'HIGH_RISK',
    tag: 'Courier Phishing',
    content: `TCS Express: Apka parcel delivery address ghalat honay ki waja se deliver nahi ho saka. Barah-e-karam 12 ghante k andar is link par click kar ke address update karein: https://tcs-courier-pakistan.top/track warna parcel wapis chala jaega.`
  },
  {
    id: 'fake-online-job',
    title: 'Part-Time YouTube Like & Earn 4,000/Day (WhatsApp)',
    titleUrdu: 'یوٹیوب ویڈیوز لائک کر کے پیسے کمانے کا فراڈ',
    type: 'message',
    expectedRisk: 'HIGH_RISK',
    tag: 'Online Task Scam',
    content: `Assalam o Alaikum! Hamari company ko YouTube videos like aur subscribe karne k liye part-time workers darkar hain. Daily 3000 se 5000 PKR kamayein ghar bethay. Kam shuru karne k liye registration fee 1500 JazzCash karein aur Telegram join karein.`
  },
  {
    id: 'pta-sim-block',
    title: 'PTA SIM Deactivation Notice (Threat)',
    titleUrdu: 'پی ٹی اے سم بلاک کی جعلی دھمکی',
    type: 'message',
    expectedRisk: 'HIGH_RISK',
    tag: 'Regulator Impersonation',
    content: `PTA Final Notice: Aapke naam par registered SIMs ghair qanooni activities mein mulawis payi gayi hain. Apki tamam SIMs 2 ghante mein block kar di jayengi. Jurmana se bachne k liye helpline 0312-5549012 par call karein.`
  },
  {
    id: 'safe-jazzcash-sms',
    title: 'Official JazzCash 8558 Bill Paid (Safe Example)',
    titleUrdu: 'جاز کیش 8558 کا تصدیق شدہ اصل میسج',
    type: 'message',
    expectedRisk: 'LOW_RISK',
    tag: 'Official Notification',
    content: `Dear Customer, your electricity bill of Rs. 4,320 for Consumer No. 041122334455 has been paid successfully via JazzCash. TID: 0928374619. Available balance is Rs. 1,480. Helpline 4444.`
  },
  {
    id: 'safe-meezan-bank',
    title: 'Legitimate Meezan Bank ATM Alert (Safe Example)',
    titleUrdu: 'میزان بینک کا اصل اے ٹی ایم الرٹ',
    type: 'message',
    expectedRisk: 'LOW_RISK',
    tag: 'Legitimate Bank Alert',
    content: `Dear Customer, PKR 10,000 has been debited from your Account **3481 on 08-Oct-2026 at ATM F-7 Islamabad. Remaining balance: PKR 48,200. If this was not you, call 021-111-331-331 immediately.`
  },
  {
    id: 'typosquat-url',
    title: 'Suspicious Domain: easypaisa-verify-bonus.top',
    titleUrdu: 'مشکوک ویب سائٹ: easypaisa-verify-bonus.top',
    type: 'url',
    expectedRisk: 'HIGH_RISK',
    tag: 'Phishing URL',
    content: `https://easypaisa-verify-bonus.top/claim-reward`
  },
  {
    id: 'reported-bisp-phone',
    title: 'Reported Phone: 0308-4928172 (Fake BISP caller)',
    titleUrdu: 'رپورٹ شدہ نمبر: 0308-4928172',
    type: 'phone',
    expectedRisk: 'HIGH_RISK',
    tag: 'Community Flagged Number',
    content: `0308-4928172`
  }
];

// Helper to sanitize and check for sensitive personal information
export function checkSensitiveInput(text: string): { hasSensitive: boolean; message?: string } {
  // Check for 16-digit credit/debit card numbers
  const cardRegex = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13})\b/;
  // Check for 13 digit CNIC with or without dashes: 35201-1234567-1
  const cnicRegex = /\b\d{5}[-\s]?\d{7}[-\s]?\d{1}\b/;
  // Explicit mention of full password or MPIN
  const pinKeyword = /\b(my pin is|mera pin|password hai|my otp is|mera otp)\s*[:=]?\s*\w+/i;

  if (cardRegex.test(text)) {
    return {
      hasSensitive: true,
      message: 'Sensitive Alert: You seem to have entered a credit or debit card number. ScamCheck PK never asks for sensitive financial cards or secrets. Please redact card numbers!'
    };
  }

  if (cnicRegex.test(text) && (text.toLowerCase().includes('pin') || text.toLowerCase().includes('password'))) {
    return {
      hasSensitive: true,
      message: 'Sensitive Alert: You seem to have included personal CNIC alongside a password or PIN. Please remove sensitive credentials.'
    };
  }

  if (pinKeyword.test(text)) {
    return {
      hasSensitive: true,
      message: 'Sensitive Alert: Please do not paste your actual secret MPIN, passwords, or active OTP codes.'
    };
  }

  return { hasSensitive: false };
}

// Detection for language
export function detectLanguage(text: string): 'English' | 'Roman Urdu' | 'Urdu' | 'Mixed' {
  // Check for Arabic/Urdu unicode range
  const urduCharRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  const hasUrduChars = urduCharRegex.test(text);

  const romanUrduKeywords = [
    'apka', 'aapka', 'aap ka', 'karein', 'kare', 'rabta', 'fauran', 'mubarak', 'inaam', 'inam',
    'raqam', 'hisaab', 'hoga', 'ho jaega', 'bhejein', 'bhejo', 'wazifa', 'sarif', 'moazziz',
    'hukoomat', 'waja', 'ghantay', 'bahal', 'band', 'pehlay', 'kamayein', 'bethay', 'ghar',
    'parchi', 'bisp', 'ehsaas', 'mil gaya', 'jeeto', 'sona', 'tola', 'bataen', 'batao'
  ];

  const lower = text.toLowerCase();
  let romanUrduMatches = 0;
  for (const kw of romanUrduKeywords) {
    if (lower.includes(kw)) {
      romanUrduMatches++;
    }
  }

  if (hasUrduChars && romanUrduMatches > 0) return 'Mixed';
  if (hasUrduChars) return 'Urdu';
  if (romanUrduMatches >= 2) return 'Roman Urdu';
  return 'English';
}

// Deep Pakistan Rule & Threat Intelligence Engine
export function analyzePakistanScam(input: string, explicitType?: CheckType): ScamAnalysisResult {
  const trimmed = input.trim();
  const sensitiveCheck = checkSensitiveInput(trimmed);
  const lang = detectLanguage(trimmed);

  // Determine type if not forced
  let type: CheckType = explicitType || 'message';
  if (!explicitType) {
    if (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(trimmed) && !trimmed.includes(' ')) {
      type = 'url';
    } else if (/^(\+?92|0)?\s?3\d{2}[-\s]?\d{7}$/.test(trimmed.replace(/\s+/g, '')) || /^\d{4,5}$/.test(trimmed)) {
      type = 'phone';
    }
  }

  if (type === 'phone') {
    return analyzePhoneNumber(trimmed, sensitiveCheck.hasSensitive ? sensitiveCheck.message : undefined);
  } else if (type === 'url') {
    return analyzeUrl(trimmed, sensitiveCheck.hasSensitive ? sensitiveCheck.message : undefined);
  } else {
    return analyzeMessage(trimmed, lang, sensitiveCheck.hasSensitive ? sensitiveCheck.message : undefined);
  }
}

// 1. Phone number analysis
function analyzePhoneNumber(rawPhone: string, sensitiveMsg?: string): ScamAnalysisResult {
  // Clean phone
  const clean = rawPhone.replace(/[\s\-\(\)]/g, '');
  const indicators: WarningSign[] = [];
  const channels: OfficialContact[] = [];
  let score = 15; // baseline neutral

  // Check against official directory first
  const officialMatch = PAKISTAN_OFFICIAL_DIRECTORY[clean] || PAKISTAN_OFFICIAL_DIRECTORY[rawPhone.trim()];
  if (officialMatch) {
    return {
      id: 'res-' + Date.now(),
      timestamp: Date.now(),
      inputContent: rawPhone,
      inputType: 'phone',
      riskLevel: 'LOW_RISK',
      riskScore: 5,
      summary: `Verified Official Service: "${officialMatch.name}" is an authentic registered shortcode/number in Pakistan.`,
      summaryUrdu: `تصدیق شدہ سرکاری سروس: "${officialMatch.name}" پاکستان میں باضابطہ رجسٹرڈ شارٹ کوڈ ہے۔`,
      detectedLanguage: 'English',
      indicators: [
        {
          id: 'official-registered',
          title: 'Official Telecommunication Shortcode',
          titleUrdu: 'باضابطہ ٹیلی کام شارٹ کوڈ',
          category: 'impersonation',
          severity: 'low',
          description: `This number is verified in the Pakistan telecom registry as the official communication channel for ${officialMatch.name}.`,
          descriptionUrdu: `یہ نمبر پاکستان ٹیلی کام اتھارٹی کے تحت باضابطہ چینل کے طور پر تصدیق شدہ ہے۔`,
          detectedExcerpt: clean
        }
      ],
      pakistanContext: officialMatch.notes,
      pakistanContextUrdu: `یہ باضابطہ کوڈ ہے اور اس سے آنے والے پیغامات پر بھروسہ کیا جا سکتا ہے۔ تاہم، اپنا پن (PIN) یا او ٹی پی کسی کو نہ بتائیں۔`,
      recommendations: [
        'Legitimate communications from this entity will arrive through this verified identifier.',
        'Remember that even official organizations will NEVER ask you to speak your 4-digit MPIN or OTP out loud.',
        'Use the official mobile app or visit your local branch for any sensitive requests.'
      ],
      recommendationsUrdu: [
        'اس باضابطہ کوڈ سے موصول ہونے والے میسجز محفوظ ہیں۔',
        'یاد رکھیں کہ باضابطہ بینک بھی آپ سے فون پر پن کوڈ یا او ٹی پی نہیں مانگتے۔'
      ],
      officialChannels: [officialMatch]
    };
  }

  // Check community database
  // Match without country code or with
  const normalizedPk = clean.startsWith('+92') ? '0' + clean.slice(3) : clean.startsWith('92') ? '0' + clean.slice(2) : clean;
  const communityHit = COMMUNITY_REPORTS_DATABASE[clean] || COMMUNITY_REPORTS_DATABASE[normalizedPk];

  let communityData: ScamAnalysisResult['communityData'] = {
    isReported: false,
    reportCount: 0,
    statusLabel: 'No community complaints recorded yet',
    categoriesReported: [],
    cautionNote: 'Lack of reports does not guarantee safety. Stay cautious of callers asking for money or codes.'
  };

  if (communityHit) {
    score += 65;
    indicators.push({
      id: 'comm-report',
      title: 'Reported in Citizen Fraud Intelligence',
      titleUrdu: 'شہریوں کی جانب سے فراڈ رپورٹ شدہ',
      category: 'impersonation',
      severity: 'high',
      description: `This number has been reported ${communityHit.reports} times by Pakistani citizens under the category "${communityHit.category}".`,
      descriptionUrdu: `اس نمبر کو پاکستانی شہریوں کی جانب سے ${communityHit.reports} بار "${communityHit.category}" کے زمرے میں رپورٹ کیا گیا ہے۔`,
      detectedExcerpt: communityHit.notes
    });

    communityData = {
      isReported: true,
      reportCount: communityHit.reports,
      statusLabel: 'Reported / Suspicious (Community Reports)',
      categoriesReported: [communityHit.category],
      cautionNote: `Reported multiple times by citizens. We present this as reported/suspicious data from community reports; exercise extreme vigilance.`
    };
  }

  // Check for international virtual numbers commonly used in WhatsApp scams
  if (clean.startsWith('+447') || clean.startsWith('+234') || clean.startsWith('+18') || clean.startsWith('+966')) {
    score += 35;
    indicators.push({
      id: 'intl-voip',
      title: 'International / Virtual Prefix',
      titleUrdu: 'بین الاقوامی یا ورچوئل نمبر',
      category: 'impersonation',
      severity: 'medium',
      description: 'Frequently used by organized fraud syndicates operating fake job schemes, lottery scams, or investment fraud targeting Pakistani WhatsApp users.',
      descriptionUrdu: 'فراڈ گینگ اکثر بیرون ملک کے ورچوئل نمبرز کے ذریعے واٹس ایپ پر جعلی نوکری یا انعامات کی پیشکش کرتے ہیں۔',
      detectedExcerpt: clean.substring(0, 5)
    });
  }

  // Check if standard 11-digit Pakistani SIM pretending to be authority
  if (/^03\d{9}$/.test(normalizedPk)) {
    indicators.push({
      id: 'personal-sim-format',
      title: 'Individual Mobile SIM Number (11-Digit)',
      titleUrdu: 'انفرادی 11 ہندسوں والا موبائل نمبر',
      category: 'impersonation',
      severity: 'low',
      description: 'This is a standard consumer cellular SIM (Jazz, Zong, Telenor, or Ufone). Note that banks, Easypaisa, JazzCash, and government agencies NEVER reach out from individual 11-digit SIMs.',
      descriptionUrdu: 'یہ ایک عام صارف کا موبائل سم نمبر ہے۔ باضابطہ بینک اور ادارے کبھی عام موبائل نمبر سے کال یا ایس ایم ایس نہیں کرتے۔',
      detectedExcerpt: normalizedPk
    });
  }

  // Determine risk level
  score = Math.min(100, Math.max(0, score));
  let riskLevel: RiskLevel = 'LOW_RISK';
  if (score >= 70) riskLevel = 'HIGH_RISK';
  else if (score >= 35) riskLevel = 'SUSPICIOUS';

  channels.push(PAKISTAN_OFFICIAL_DIRECTORY['1991'], PAKISTAN_OFFICIAL_DIRECTORY['080055055']);

  const summary = riskLevel === 'HIGH_RISK'
    ? `High Risk Alert: This phone number has verified community fraud reports (${communityData.reportCount} reports). Treat calls or messages from this number as suspicious.`
    : riskLevel === 'SUSPICIOUS'
    ? `Caution Advised: This number shows patterns or international routing commonly used in unsolicited outreach. Verify the caller before acting.`
    : `Low Risk / Unreported: No complaints found in our database for this number. However, always exercise normal precautions.`;

  const summaryUrdu = riskLevel === 'HIGH_RISK'
    ? `ہائی رسک انتباہ: اس نمبر کو شہریوں نے ${communityData.reportCount} بار فراڈ کی اطلاع کے تحت رپورٹ کیا ہے۔ احتیاط برتیں۔`
    : riskLevel === 'SUSPICIOUS'
    ? `محتاط رہیں: یہ نمبر مشکوک سرگرمیوں سے ملتا جلتا ہے۔ ذاتی معلومات فراہم نہ کریں۔`
    : `کم رسک: اس نمبر کے خلاف فی الحال کوئی شکایت درج نہیں۔`;

  return {
    id: 'res-' + Date.now(),
    timestamp: Date.now(),
    inputContent: rawPhone,
    inputType: 'phone',
    riskLevel,
    riskScore: score,
    summary,
    summaryUrdu,
    detectedLanguage: 'English',
    indicators,
    pakistanContext: 'In Pakistan, all legal commercial entities and financial service providers (Banks, JazzCash, Easypaisa, BISP) use PTA-licensed shortcodes (4-5 digits) or alphanumeric sender masks. They will never contact you from regular 11-digit phone numbers (like 0300-XXXXXXX).',
    pakistanContextUrdu: 'پاکستان میں بینک، ایزی پیسہ، جاز کیش اور بی آئی ایس پی صرف 4 ہندسوں والے رجسٹرڈ شارٹ کوڈز سے ایس ایم ایس بھیجتے ہیں۔ عام 03XX نمبرز سے آنے والے دعوے جعلی ہوتے ہیں۔',
    recommendations: [
      'Do not transfer money via Easypaisa, JazzCash, or bank transfer upon this caller\'s request.',
      'Never reveal your CNIC number, mother\'s maiden name, ATM PIN, or WhatsApp 6-digit registration code.',
      'Report abusive or fraudulent calls to PTA Helpline 0800-55055 or send an SMS with the spammer\'s number to 9000.',
      'Report serious cyber fraud or extortion to FIA Cyber Crime Wing via helpline 1991.'
    ],
    recommendationsUrdu: [
      'کال کرنے والے کے کہنے پر ایزی پیسہ یا جاز کیش سے کوئی رقم نہ بھیجیں۔',
      'اپنا شناختی کارڈ، پن کوڈ، یا واٹس ایپ کا 6 ہندسوں والا کوڈ ہرگز نہ بتائیں۔',
      'پی ٹی اے کی ہیلپ لائن 0800-55055 پر یا ایف آئی اے سائبر کرائم 1991 پر اطلاع دیں۔'
    ],
    officialChannels: channels,
    communityData,
    hasSensitiveInputWarning: !!sensitiveMsg,
    sensitiveWarningMessage: sensitiveMsg
  };
}

// 2. URL analysis
function analyzeUrl(rawUrl: string, sensitiveMsg?: string): ScamAnalysisResult {
  const urlLower = rawUrl.toLowerCase().trim();
  const indicators: WarningSign[] = [];
  let score = 20;

  // Extract hostname
  let hostname = '';
  try {
    const formatted = urlLower.startsWith('http://') || urlLower.startsWith('https://') ? urlLower : 'https://' + urlLower;
    const parsed = new URL(formatted);
    hostname = parsed.hostname;
  } catch {
    hostname = urlLower.split('/')[0].split('?')[0];
  }

  // 1. Check for Free / Cheap Suspicious TLDs
  const suspiciousTlds = ['.top', '.xyz', '.tk', '.ml', '.ga', '.cf', '.gq', '.icu', '.buzz', '.vip', '.rest', '.cfd', '.work', '.click', '.cc'];
  const matchedTld = suspiciousTlds.find(tld => hostname.endsWith(tld));
  if (matchedTld) {
    score += 35;
    indicators.push({
      id: 'suspicious-tld',
      title: `High-Risk Top-Level Domain (${matchedTld})`,
      titleUrdu: `مشکوک ڈومین ایکسٹینشن (${matchedTld})`,
      category: 'domain',
      severity: 'high',
      description: `Domains ending in ${matchedTld} are heavily exploited in Pakistan phishing campaigns due to low acquisition costs and lack of verification.`,
      descriptionUrdu: `اس قسم کی سستی ڈومینز پاکستان میں اکثر جعلی پیجز اور فریب کاری کے لیے استعمال کی جاتی ہیں۔`,
      detectedExcerpt: hostname
    });
  }

  // 2. Typosquatting / Brand Misuse
  const brands = [
    { name: 'Easypaisa', official: 'easypaisa.com.pk', terms: ['easypaisa', 'easy-paisa', 'easypaisa-login', 'easypaisareward'] },
    { name: 'JazzCash', official: 'jazzcash.com.pk', terms: ['jazzcash', 'jazz-cash', 'jazzcash-reward', 'jazzcashverify'] },
    { name: 'BISP / Ehsaas', official: 'bisp.gov.pk', terms: ['bisp', 'ehsaas', 'ehsas', '8171', 'benazir-income'] },
    { name: 'NADRA', official: 'nadra.gov.pk', terms: ['nadra', 'pak-identity', 'nadra-cnic', 'nadra-portal'] },
    { name: 'FBR', official: 'fbr.gov.pk', terms: ['fbr', 'iris-fbr', 'fbr-tax'] },
    { name: 'PTA', official: 'pta.gov.pk', terms: ['pta', 'dirbs-pta', 'pta-device'] },
    { name: 'TCS Courier', official: 'tcsexpress.com', terms: ['tcs', 'tcs-express', 'tcs-courier', 'tcs-tracking'] },
    { name: 'Leopard Courier', official: 'leopardscourier.com', terms: ['leopard', 'leopardscourier'] },
    { name: 'Pakistan Post', official: 'pakpost.gov.pk', terms: ['pakpost', 'pakistanpost'] },
    { name: 'HBL', official: 'hbl.com', terms: ['hbl-login', 'hbl-alert', 'hbl-banking'] },
    { name: 'Meezan Bank', official: 'meezanbank.com', terms: ['meezan-login', 'meezan-secure'] }
  ];

  for (const b of brands) {
    const isBrandMentioned = b.terms.some(t => hostname.includes(t));
    if (isBrandMentioned) {
      // Check if it's NOT the genuine official domain
      const isOfficial = hostname === b.official || hostname.endsWith('.' + b.official);
      if (!isOfficial) {
        score += 45;
        indicators.push({
          id: `impersonation-${b.name.toLowerCase()}`,
          title: `Brand Impersonation: Fake ${b.name} Domain`,
          titleUrdu: `جعلی ویب سائٹ: ${b.name} کا روپ دھارا گیا`,
          category: 'impersonation',
          severity: 'high',
          description: `This website mimics "${b.name}" but is hosted at an unauthorized domain (${hostname}). The real official website is ${b.official}.`,
          descriptionUrdu: `یہ ویب سائٹ ${b.name} کی نقل کر رہی ہے۔ سرکاری اور اصل ویب سائٹ ${b.official} ہے۔`,
          detectedExcerpt: hostname
        });
      }
    }
  }

  // 3. URL shorteners hiding destination
  const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 'rb.gy', 'cutt.ly', 't.co', 'ow.ly', 'shorturl.at'];
  if (shorteners.some(s => hostname.includes(s))) {
    score += 25;
    indicators.push({
      id: 'url-shortener',
      title: 'Hidden URL Shortener Masking Target',
      titleUrdu: 'مختصر لنک (اصلی منزل پوشیدہ ہے)',
      category: 'domain',
      severity: 'medium',
      description: 'URL shorteners are routinely deployed by SMS scammers to conceal the final phishing destination and evade telecom filters.',
      descriptionUrdu: 'شارٹ لنکس کا استعمال اصل خطرناک ویب سائٹ کو چھپانے کے لیے کیا جاتا ہے۔',
      detectedExcerpt: hostname
    });
  }

  // 4. IP address as host
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    score += 40;
    indicators.push({
      id: 'raw-ip',
      title: 'Raw IP Address Instead of Domain Name',
      titleUrdu: 'ڈومین کے بجائے براہ راست آئی پی ایڈریس',
      category: 'domain',
      severity: 'high',
      description: 'Legitimate banks and organizations never direct customers to raw IP addresses.',
      descriptionUrdu: 'کوئی بھی معتبر بینک یا سرکاری ادارہ آئی پی ایڈریس پر مشتمل لنک نہیں بھیجتا۔',
      detectedExcerpt: hostname
    });
  }

  // 5. Phishing keywords in URL path
  const phishingKeywords = ['login', 'verify', 'update', 'claim', 'bonus', 'reward', 'secure', 'banking', 'otp', 'password', 'free-recharge', 'wazifa'];
  const matchedKeywords = phishingKeywords.filter(k => urlLower.includes(k));
  if (matchedKeywords.length > 0 && indicators.length > 0) {
    score += 15;
    indicators.push({
      id: 'phishing-lure-keywords',
      title: 'Suspicious Action Lures in URL',
      titleUrdu: 'لنک میں مشکوک الفاظ کا استعمال',
      category: 'financial',
      severity: 'medium',
      description: `The URL contains credential collection triggers (${matchedKeywords.join(', ')}), commonly placed on fake phishing portals.`,
      descriptionUrdu: `اس لنک میں حساس ڈیٹا اور لالچ والے الفاظ (${matchedKeywords.join(', ')}) موجود ہیں۔`,
      detectedExcerpt: matchedKeywords.join(', ')
    });
  }

  score = Math.min(100, Math.max(0, score));
  let riskLevel: RiskLevel = 'LOW_RISK';
  if (score >= 65) riskLevel = 'HIGH_RISK';
  else if (score >= 35) riskLevel = 'SUSPICIOUS';

  const summary = riskLevel === 'HIGH_RISK'
    ? `High Risk Phishing Alert: This URL matches known cyber criminal campaigns impersonating Pakistani services. Do NOT open or enter credentials.`
    : riskLevel === 'SUSPICIOUS'
    ? `Suspicious URL: Contains characteristics such as URL shorteners or unfamiliar domains. Exercise caution before clicking.`
    : `Low Risk: No prominent phishing or typosquatting markers detected on this URL.`;

  const summaryUrdu = riskLevel === 'HIGH_RISK'
    ? `انتہائی خطرناک فشنگ الرٹ: یہ لنک پاکستانی اداروں کے نام پر بنایا گیا جعلی پیج معلوم ہوتا ہے۔ اسے نہ کھولیں اور نہ ہی پاس ورڈ درج کریں۔`
    : riskLevel === 'SUSPICIOUS'
    ? `مشکوک لنک: احتیاط کی ضرورت ہے۔ نامعلوم لنکس پر کلک کرنے سے گریز کریں۔`
    : `کم رسک: اس لنک میں کوئی واضح خطرہ نہیں ملا۔`;

  return {
    id: 'res-' + Date.now(),
    timestamp: Date.now(),
    inputContent: rawUrl,
    inputType: 'url',
    riskLevel,
    riskScore: score,
    summary,
    summaryUrdu,
    detectedLanguage: 'English',
    indicators,
    pakistanContext: 'Pakistani government websites always use the official `.gov.pk` domain extension. Commercial banks use `.com.pk` or `.com` with high-tier SSL certificates. Genuine institutions will never host account recovery pages on free domain extensions like .xyz, .top, or free hosting platforms.',
    pakistanContextUrdu: 'پاکستانی سرکاری اداروں کی ویب سائٹس کے آخر میں ہمیشہ gov.pk ہوتا ہے۔ بینک کبھی بھی .top یا .xyz والی ویب سائٹس استعمال نہیں کرتے۔',
    recommendations: [
      'Do not click this link, and never enter your phone number, password, or PIN on this page.',
      'If you already opened it and entered bank credentials, contact your bank immediately to freeze your account/cards.',
      'Report malicious phishing links to PTA Web Analysis via pta.gov.pk or FIA Cybercrime Wing.'
    ],
    recommendationsUrdu: [
      'اس لنک پر کلک نہ کریں اور اپنا شناختی کارڈ یا پاس ورڈ درج نہ کریں۔',
      'اگر غلطی سے ڈیٹا درج کر دیا ہے تو فوری طور پر اپنے بینک سے رابطہ کر کے اکاؤنٹ عارضی طور پر بلاک کروائیں۔'
    ],
    officialChannels: [PAKISTAN_OFFICIAL_DIRECTORY['1991'], PAKISTAN_OFFICIAL_DIRECTORY['080055055']],
    hasSensitiveInputWarning: !!sensitiveMsg,
    sensitiveWarningMessage: sensitiveMsg
  };
}

// 3. Message analysis (SMS, WhatsApp, Email, Roman Urdu, Urdu, English)
function analyzeMessage(message: string, lang: 'English' | 'Roman Urdu' | 'Urdu' | 'Mixed', sensitiveMsg?: string): ScamAnalysisResult {
  const lower = message.toLowerCase();
  const indicators: WarningSign[] = [];
  const channels: OfficialContact[] = [];
  let score = 10;

  // Pattern categories

  // A. BISP / Ehsaas / Govt cash relief scams
  const bispTerms = ['bisp', 'benazir', 'ehsaas', 'ehsas', '8171', 'kafalat', 'imdad', 'wazifa', 'بینظیر', 'احساس', 'کفالت', 'امداد'];
  const hasBisp = bispTerms.some(t => lower.includes(t) || message.includes(t));
  const hasPrizeMoney = /\b(25,?000|35,?000|50,?000|10,?000|7,?000|25000|35000)\b/.test(message);

  if (hasBisp) {
    channels.push(PAKISTAN_OFFICIAL_DIRECTORY['8171']);
    // Check if it's sent from an unofficial mobile number or contains contact instructions
    const mentionsCallOrWhatsApp = /rabta|call|whatsapp|contact|parchi|رابطہ|کال|واٹس ایپ/.test(lower) || /[\u0600-\u06FF]/.test(message);
    if (mentionsCallOrWhatsApp || hasPrizeMoney) {
      score += 55;
      indicators.push({
        id: 'bisp-cash-scam',
        title: 'Benazir / Ehsaas Cash Grant Scam Pattern',
        titleUrdu: 'بینظیر / احساس مالی امداد کا جعلی میسج',
        category: 'lottery',
        severity: 'high',
        description: 'BISP communications NEVER direct citizens to call an individual mobile number or WhatsApp for disbursements. All official BISP funds are registered strictly via shortcode 8171.',
        descriptionUrdu: 'بی آئی ایس پی کبھی بھی واٹس ایپ یا عام موبائل نمبر پر رابطہ کرنے کا نہیں کہتا۔ تمام اصل پیغامات صرف 8171 سے آتے ہیں۔',
        detectedExcerpt: 'BISP / Ehsaas cash grant claims'
      });
    }
  }

  // B. Easypaisa / JazzCash / Mobile Wallet Account Block Threats
  const walletTerms = ['easypaisa', 'easy paisa', 'jazzcash', 'jazz cash', 'nayapay', 'sadapay', 'ایزی پیسہ', 'جاز کیش', 'نیا پے', 'سادہ پے'];
  const hasWallet = walletTerms.some(t => lower.includes(t) || message.includes(t));
  const hasBlockUrgency = /block|band|suspend|deactivate|expire|freeze|biometric|بلاک|بند|معطل|بایومیٹرک/.test(lower) || /بلاک|بند/.test(message);

  if (hasWallet && hasBlockUrgency) {
    if (lower.includes('easypaisa') || message.includes('ایزی پیسہ')) channels.push(PAKISTAN_OFFICIAL_DIRECTORY['3737']);
    if (lower.includes('jazzcash') || message.includes('جاز کیش')) channels.push(PAKISTAN_OFFICIAL_DIRECTORY['8558']);

    score += 50;
    indicators.push({
      id: 'wallet-block-phishing',
      title: 'Mobile Wallet Account Suspension Tactic',
      titleUrdu: 'اکاؤنٹ بلاک ہونے کی جھوٹی دھمکی',
      category: 'urgency',
      severity: 'high',
      description: 'Fraudsters routinely create false panic claiming your wallet will be blocked in 24 hours to coerce you into calling them or divulging your MPIN/OTP.',
      descriptionUrdu: 'دھوکہ دہی کرنے والے صارفین کو خوفزدہ کر کے ان کا او ٹی پی یا پن حاصل کرنے کے لیے اکاؤنٹ بند ہونے کی جھوٹی دھمکی دیتے ہیں۔',
      detectedExcerpt: 'Threat of immediate account block / biometric verification'
    });
  }

  // C. Credential / PIN / OTP Solicitation
  const credentialTerms = [
    'otp', 'pin', 'mpin', 'password', 'code share', 'code send', 'code batao', 'code bhejo', '4-digit', '6-digit',
    'او ٹی پی', 'پن کوڈ', 'پاس ورڈ', 'کوڈ بتائیں'
  ];
  const asksCredentials = credentialTerms.some(t => lower.includes(t) || message.includes(t));
  if (asksCredentials) {
    score += 45;
    indicators.push({
      id: 'credential-harvesting',
      title: 'Direct Request for OTP, PIN, or Password',
      titleUrdu: 'او ٹی پی یا پاس ورڈ بتانے کا مطالبہ',
      category: 'credential',
      severity: 'high',
      description: 'CRITICAL DANGER: Legitimate Pakistani financial institutions and telecom operators NEVER ask for your OTP or PIN under any circumstances.',
      descriptionUrdu: 'انتہائی خطرناک: پاکستان کا کوئی بھی بینک یا ادارہ کبھی بھی آپ سے فون پر پن کوڈ یا او ٹی پی نہیں مانگتا۔',
      detectedExcerpt: 'Request for OTP / PIN / Secret verification code'
    });
  }

  // D. Jeeto Pakistan / Inam Ghar / Gold / Car Lottery Scams
  const lotteryTerms = [
    'mubarak ho', 'mubarik ho', 'jeeto pakistan', 'fahad mustafa', 'tariq jamil', 'inaam', 'inam nikla',
    'lottery', 'sona', 'tola sona', 'car nikli', 'lucky draw', 'cash prize', '50 lakh', '25 lakh',
    'مبارک ہو', 'جیتو پاکستان', 'انعام نکلا', 'لاٹری'
  ];
  const hasLottery = lotteryTerms.some(t => lower.includes(t) || message.includes(t));
  if (hasLottery) {
    score += 55;
    indicators.push({
      id: 'lottery-gold-scam',
      title: 'Fake Prize / Jeeto Pakistan Lottery Scheme',
      titleUrdu: 'جیتو پاکستان یا انعام نکلنے کا جھوٹا جھانسہ',
      category: 'lottery',
      severity: 'high',
      description: 'Classic Pakistani advance-fee scam. Fraudsters claim you won gold, a vehicle, or millions, but demand "registration fees" or "tax fees" to be deposited first via mobile load or JazzCash.',
      descriptionUrdu: 'انعام کا جھانسہ دے کر پہلے ٹیکس یا رجسٹریشن فیس کے نام پر پیسے لوٹنے کا روایتی فراڈ۔',
      detectedExcerpt: 'Unsolicited prize or lottery claim'
    });
  }

  // E. Fake Job / YouTube Like / Online Earning Scams
  const jobTerms = [
    'daily 3000', 'daily 5000', 'ghar bethay kamayein', 'ghar bethay kamao', 'youtube like', 'subscribe karein',
    'online task', 'telegram channel', 'part-time job', 'part time job', 'registration fee', 'advance deposit',
    'گھر بیٹھے پیسے کمائیں', 'آن لائن نوکری', 'یوٹیوب لائک'
  ];
  const hasJobScam = jobTerms.some(t => lower.includes(t) || message.includes(t));
  if (hasJobScam) {
    score += 40;
    indicators.push({
      id: 'online-task-scam',
      title: 'Fake Online Task / YouTube Like Job Scam',
      titleUrdu: 'آن لائن ٹاسک / یوٹیوب لائک جعلی نوکری',
      category: 'job',
      severity: 'high',
      description: 'Scammers offer unrealistic daily wages (Rs 3,000 - 5,000) for simple video liking or typing tasks, then lure victims into paying "VIP deposit fees" or "security fees" on Telegram.',
      descriptionUrdu: 'آسان کام کے بدلے روزانہ ہزاروں روپے کا لالچ دے کر فیس یا انویسٹمنٹ کے نام پر رقم ہتھیانے کا فراڈ۔',
      detectedExcerpt: 'High-income task lure with upfront fee'
    });
  }

  // F. Courier Delivery Failed Phishing
  const courierTerms = ['tcs', 'leopard', 'postex', 'pakistan post', 'trax', 'delivery failed', 'address incomplete', 'custom fee', 'پارسل', 'ڈلیوری'];
  const hasCourier = courierTerms.some(t => lower.includes(t) || message.includes(t));
  const hasLinkInMsg = /https?:\/\/|bit\.ly|tinyurl|\.top|\.xyz|\.click/.test(lower);
  if (hasCourier && hasLinkInMsg) {
    score += 45;
    indicators.push({
      id: 'courier-phishing',
      title: 'Fake Courier Parcel Redelivery Trap',
      titleUrdu: 'پارسل ڈیلیوری فیل کا جعلی میسج',
      category: 'courier',
      severity: 'high',
      description: 'Impersonating TCS, Leopard, or Pakistan Post. Scammers send phishing links alleging an incomplete address to capture debit card numbers or phone numbers.',
      descriptionUrdu: 'ٹی سی ایس یا کوریئر کا نام استعمال کر کے پتے کی تصدیق کے بہانے کارڈ کی معلومات چوری کرنے کی کوشش۔',
      detectedExcerpt: 'Courier delivery alert combined with external link'
    });
  }

  // G. PTA SIM Block / FBR Tax Arrest Threat
  const regulatorTerms = ['pta', 'fbr', 'nadra', 'police', 'fia', 'پی ٹی اے', 'ایف بی آر', 'نادرا'];
  const hasRegulator = regulatorTerms.some(t => lower.includes(t) || message.includes(t));
  const hasThreat = /arrest|fine|penalty|court|legal action|jurmana|giraftari|جرمانہ|گرفتاری|عدالت/.test(lower) || /جرمانہ|گرفتاری/.test(message);
  if (hasRegulator && (hasThreat || hasBlockUrgency)) {
    channels.push(PAKISTAN_OFFICIAL_DIRECTORY['8484'], PAKISTAN_OFFICIAL_DIRECTORY['8500']);
    score += 45;
    indicators.push({
      id: 'regulator-threat-scam',
      title: 'Law Enforcement / Regulator Threat Extortion',
      titleUrdu: 'سرکاری ادارے کی جانب سے قانونی کارروائی کی دھمکی',
      category: 'threat',
      severity: 'high',
      description: 'Impersonating PTA, FBR, or police claiming non-compliance or illegal SIM activity to induce panic and force settlement payments.',
      descriptionUrdu: 'پی ٹی اے یا پولیس کے نام پر گرفتاری یا سم بلاک کی دھمکی دے کر تاوان یا جرمانے کا مطالبہ۔',
      detectedExcerpt: 'Legal threat claiming regulator enforcement'
    });
  }

  // H. Embedded Phone Numbers or Links
  const phoneNumbersFound = message.match(/03\d{2}[-\s]?\d{7}/g);
  if (phoneNumbersFound && (hasWallet || hasBisp || hasLottery)) {
    score += 20;
    indicators.push({
      id: 'unofficial-mobile-sender',
      title: 'Ordinary Mobile Number Provided for Official Support',
      titleUrdu: 'سرکاری کام کے لیے عام موبائل نمبر کا استعمال',
      category: 'impersonation',
      severity: 'medium',
      description: `Official Pakistani institutions do not conduct affairs via personal mobile numbers (${phoneNumbersFound[0]}). Official services use registered 4-digit shortcodes.`,
      descriptionUrdu: `باضابطہ ادارے عام موبائل نمبرز کے بجائے 4 ہندسوں والے مخصوص شارٹ کوڈز استعمال کرتے ہیں۔`,
      detectedExcerpt: phoneNumbersFound[0]
    });
  }

  // I. Urdu & Roman Urdu Urgency Phrases
  const romanUrduUrgency = ['fauran rabta', 'fauran call', 'jaldi karein', 'akri moqa', 'akhri notice', 'فوری رابطہ', 'فوری کال', 'آخری نوٹس'];
  const hasUrgency = romanUrduUrgency.some(u => lower.includes(u) || message.includes(u));
  if (hasUrgency) {
    score += 15;
    indicators.push({
      id: 'psychological-urgency',
      title: 'Urgency Pressure (Social Engineering)',
      titleUrdu: 'فوری کارروائی کا نفسیاتی دباؤ',
      category: 'urgency',
      severity: 'medium',
      description: 'High-pressure wording ("Fauran rabta karein" / "فوری رابطہ") designed to trigger hasty action before the victim can verify authenticity.',
      descriptionUrdu: 'صارف کو سوچنے کا موقع دیے بغیر جلدی میں فیصلہ کروانے کے لیے فوری رابطے کا دباؤ ڈالا گیا ہے۔',
      detectedExcerpt: 'Urgent compliance language'
    });
  }

  // Check if it's a legitimate pattern (e.g. standard bank receipt, no phishing links, no call back to 03XX, etc.)
  const isLikelyLegitimate = (lower.includes('tid:') || lower.includes('paid successfully') || lower.includes('debited from your account'))
    && !asksCredentials && !hasLottery && !hasJobScam && (!hasLinkInMsg || lower.includes('.gov.pk') || lower.includes('jazzcash.com.pk') || lower.includes('easypaisa.com.pk'));

  if (isLikelyLegitimate && indicators.length === 0) {
    score = 10;
  }

  score = Math.min(100, Math.max(0, score));
  let riskLevel: RiskLevel = 'LOW_RISK';
  if (score >= 65) riskLevel = 'HIGH_RISK';
  else if (score >= 35) riskLevel = 'SUSPICIOUS';

  // Add default safety helplines
  channels.push(PAKISTAN_OFFICIAL_DIRECTORY['1991']);

  const summary = riskLevel === 'HIGH_RISK'
    ? `High Risk Scam Alert: This message exhibits multiple classic fraud markers recognized in Pakistani cybercrime (impersonation, false urgency, or credential theft). Do not reply or send money.`
    : riskLevel === 'SUSPICIOUS'
    ? `Suspicious Communication: Contains cautionary elements such as unofficial contact channels or pressure tactics. Verify with the organization independently before responding.`
    : `Low Risk Message: No common scam patterns, credential lures, or known threat indicators were detected.`;

  const summaryUrdu = riskLevel === 'HIGH_RISK'
    ? `انتہائی خطرناک فراڈ الرٹ: اس پیغام میں پاکستان میں عام فراڈ کے متعدد واضح اشارے پائے گئے ہیں۔ کوئی رقم نہ بھیجیں اور نہ ہی جواب دیں۔`
    : riskLevel === 'SUSPICIOUS'
    ? `مشکوک پیغام: اس میسج میں کچھ غیر معمولی اور مشکوک باتیں ہیں۔ جواب دینے سے پہلے متعلقہ ادارے سے تصدیق کریں۔`
    : `کم رسک: اس پیغام میں دھوکہ دہی کے کوئی واضح اشارے نہیں ملے۔`;

  return {
    id: 'res-' + Date.now(),
    timestamp: Date.now(),
    inputContent: message,
    inputType: 'message',
    riskLevel,
    riskScore: score,
    summary,
    summaryUrdu,
    detectedLanguage: lang,
    indicators,
    pakistanContext: getPakistanContextForMessage(hasBisp, hasWallet, hasLottery, hasJobScam, hasCourier),
    pakistanContextUrdu: getPakistanContextUrduForMessage(hasBisp, hasWallet, hasLottery, hasJobScam, hasCourier),
    recommendations: [
      'NEVER share your 4-digit or 6-digit MPIN, OTP, or passwords with anyone over the phone or SMS.',
      'Do not click unknown links or call any mobile phone numbers provided in the message.',
      'If you have already transferred money, report immediately to your bank and call the FIA Cyber Crime Wing helpline at 1991.',
      'Forward spam SMS to the PTA spam reporting shortcode 9000 (format: Spammer Number <space> Message).'
    ],
    recommendationsUrdu: [
      'اپنا پن (PIN) کوڈ، او ٹی پی یا پاس ورڈ کبھی کسی کے ساتھ شیئر نہ کریں۔',
      'میسج میں دیے گئے کسی بھی لنک یا موبائل نمبر پر رابطہ نہ کریں۔',
      'اگر رقم منتقل ہو چکی ہے تو فوری طور پر بینک اور ایف آئی اے 1991 پر اطلاع دیں۔',
      'اسپام میسج کی اطلاع پی ٹی اے کے شارٹ کوڈ 9000 پر دیں۔'
    ],
    officialChannels: channels,
    hasSensitiveInputWarning: !!sensitiveMsg,
    sensitiveWarningMessage: sensitiveMsg
  };
}

function getPakistanContextForMessage(bisp: boolean, wallet: boolean, lottery: boolean, job: boolean, courier: boolean): string {
  if (bisp) {
    return 'Official BISP (Benazir Income Support Programme) cash disbursements are strictly conveyed via shortcode 8171. BISP representatives NEVER initiate contact via personal WhatsApp accounts or 11-digit mobile SIMs. Verification is free at official Tehsil offices.';
  }
  if (wallet) {
    return 'Easypaisa ONLY broadcasts alerts via shortcode 3737. JazzCash broadcasts alerts via shortcode 8558 or 4444. Bank staff will NEVER ask for your biometric or MPIN via phone calls, as biometric verification is strictly done at registered franchise biometric machines.';
  }
  if (lottery) {
    return 'ARY Jeeto Pakistan, Bol Inam Ghar, and prominent TV programs NEVER conduct lotteries via random SMS broadcasts. Demanding upfront "tax money" or "advance load" is the signature hallmark of advance-fee lottery fraud.';
  }
  if (job) {
    return 'Legitimate employers and platforms never ask applicants to deposit an initial "training fee" or "VIP registration fee" via JazzCash/Easypaisa to unlock simple typing or YouTube tasks.';
  }
  if (courier) {
    return 'TCS, Leopard Courier, and Pakistan Post do not charge re-delivery fees via strange domain links or ask for card OTPs to re-route parcels. Always track directly on their official verified applications or helplines.';
  }
  return 'In Pakistan, telecom authorities require all corporate communications to use registered alphanumeric sender IDs or licensed shortcodes. Any institutional notice received from an unverified mobile SIM should be treated with heightened scrutiny.';
}

function getPakistanContextUrduForMessage(bisp: boolean, wallet: boolean, lottery: boolean, job: boolean, courier: boolean): string {
  if (bisp) {
    return 'بینظیر انکم سپورٹ پروگرام کے تمام پیغامات صرف 8171 سے آتے ہیں۔ عملہ کبھی بھی واٹس ایپ یا پرائیویٹ نمبر سے رابطہ نہیں کرتا۔';
  }
  if (wallet) {
    return 'ایزی پیسہ کا سرکاری کوڈ 3737 اور جاز کیش کا 8558 ہے۔ کوئی بھی بینک عملہ فون پر بائیو میٹرک یا پن کوڈ نہیں مانگتا۔';
  }
  if (lottery) {
    return 'جیتو پاکستان یا کوئی بھی ٹی وی شو ایس ایم ایس پر انعامات نہیں بانٹتا۔ پہلے ٹیکس یا فیس مانگنا 100 فیصد فراڈ کی نشانی ہے۔';
  }
  if (job) {
    return 'کوئی بھی معتبر ادارہ نوکری دینے کے لیے جاز کیش یا ایزی پیسہ کے ذریعے رجسٹریشن فیس کا مطالبہ نہیں کرتا۔';
  }
  return 'پاکستان میں باضابطہ ادارے ہمیشہ رجسٹرڈ شارٹ کوڈز استعمال کرتے ہیں۔ عام موبائل سم سے آنے والے میسجز پر فوری بھروسہ نہ کریں۔';
}
