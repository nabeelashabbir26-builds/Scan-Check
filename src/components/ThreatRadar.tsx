import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  AlertTriangle, 
  Wallet, 
  Gift, 
  Briefcase, 
  Truck, 
  Smartphone, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { UILanguage } from '../types/scam';

interface ThreatRadarProps {
  currentLang: UILanguage;
}

export const ThreatRadar: React.FC<ThreatRadarProps> = ({ currentLang }) => {
  const [selectedThreat, setSelectedThreat] = useState<number>(0);

  const threats = [
    {
      id: 0,
      title: 'Easypaisa & JazzCash Account Block Phishing',
      titleUrdu: 'ایزی پیسہ اور جاز کیش اکاؤنٹ بلاک فراڈ',
      tag: 'Financial Phishing',
      icon: Wallet,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      summary: 'Victim receives an SMS from an ordinary 03XX number alleging that their wallet will be blocked within 24 hours due to unverified biometrics.',
      summaryUrdu: 'صارف کو عام موبائل نمبر سے میسج آتا ہے کہ بائیو میٹرک نہ ہونے کی وجہ سے اکاؤنٹ 24 گھنٹے میں بلاک ہو جائے گا۔',
      tactic: 'Creates artificial panic and demands that the user call back or provide their 4-digit MPIN or 6-digit SMS OTP code.',
      goldenRule: 'Easypaisa ONLY sends SMS from 3737. JazzCash ONLY sends from 8558. They NEVER ask for your MPIN, and biometric verification can only be done at authorized retail franchises.',
      goldenRuleUrdu: 'ایزی پیسہ صرف 3737 اور جاز کیش صرف 8558 سے میسج بھیجتے ہیں۔ وہ کبھی بھی فون پر پن یا او ٹی پی نہیں مانگتے۔',
      example: 'Moazziz Sarif, apka Easypaisa account biometric na hone ki waja se block kar dia gaya hai. Bahali k liye rabta karein: 0304-XXXXXXX'
    },
    {
      id: 1,
      title: 'Fake BISP 8171 / Ehsaas 25,000 PKR Grant',
      titleUrdu: 'بینظیر انکم سپورٹ 8171 جعلی مالی امداد',
      tag: 'Govt Impersonation',
      icon: Gift,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      summary: 'Messages falsely declaring that the recipient has been granted Rs. 25,000 or 35,000 under the Benazir Income Support Programme.',
      summaryUrdu: 'جعلی میسج جس میں دعویٰ کیا جاتا ہے کہ آپ کو بینظیر پروگرام سے 25 ہزار یا 35 ہزار روپے کی امداد مل گئی ہے۔',
      tactic: 'Victim is told to call a WhatsApp number or deposit an advance "registration fee" or buy easyload cards before collecting the money.',
      goldenRule: 'BISP disbursements are conveyed EXCLUSIVELY via shortcode 8171. BISP staff never use WhatsApp or personal numbers, and registration is 100% free.',
      goldenRuleUrdu: 'بی آئی ایس پی کے تمام پیغامات صرف 8171 سے آتے ہیں۔ عملہ کبھی بھی واٹس ایپ یا ایڈوانس فیس کا مطالبہ نہیں کرتا۔',
      example: 'Mubarak ho! BISP ki janib se apka 25,000 ka wazifa manzoor ho gaya hai. Parchi no 9182. WhatsApp rabta karein: 0308-XXXXXXX'
    },
    {
      id: 2,
      title: 'Courier Address Failed Phishing (TCS, Leopard, PakPost)',
      titleUrdu: 'پارسل ڈیلیوری فیلڈ اور ایڈریس اپڈیٹ فشنگ',
      tag: 'Phishing URL',
      icon: Truck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      summary: 'SMS claiming an undeliverable parcel due to an incomplete street address, with an urgent link to "reschedule".',
      summaryUrdu: 'ایس ایم ایس جس میں کہا جاتا ہے کہ پتے کی خرابی کی وجہ سے آپ کا پارسل ڈیلیور نہیں ہو سکا، فوری لنک پر کلک کریں۔',
      tactic: 'Directs the victim to a lookalike domain (e.g. tcs-parcel-pk.top) where they are tricked into entering debit card numbers to pay a nominal "re-delivery fee" of Rs. 50.',
      goldenRule: 'Couriers never require credit card details to correct an address via unverified links. Check tracking numbers directly inside the official TCS or Leopards mobile apps.',
      goldenRuleUrdu: 'کوریئر کمپنیاں پتے کی درستی کے لیے کارڈ کی تفصیلات یا نامعلوم لنکس استعمال نہیں کرتیں۔',
      example: 'TCS Express: Delivery suspended due to missing house number. Update within 12 hours: https://tcs-delivery-pak.xyz/address'
    },
    {
      id: 3,
      title: 'YouTube Video Like / Telegram Daily Earning Tasks',
      titleUrdu: 'یوٹیوب ویڈیو لائک کر کے روزانہ کمانے کا جھانسہ',
      tag: 'Online Job Fraud',
      icon: Briefcase,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      summary: 'Unsolicited WhatsApp messages promising 3,000 to 5,000 PKR daily for liking YouTube videos or completing simple online reviews.',
      summaryUrdu: 'واٹس ایپ پر پیغام کہ روزانہ صرف یوٹیوب ویڈیوز لائک کر کے گھر بیٹھے 3 سے 5 ہزار کمائیں۔',
      tactic: 'Scammers pay a small Rs. 500 initial incentive, then ask the victim to deposit Rs. 10,000 - 50,000 for "VIP task upgrades" on Telegram, after which the money disappears.',
      goldenRule: 'Never deposit upfront money to earn money. No legitimate enterprise charges registration fees for part-time microtasks.',
      goldenRuleUrdu: 'پیسے کمانے کے لیے پہلے اپنی جیب سے رقم یا رجسٹریشن فیس کبھی جمع نہ کروائیں۔',
      example: 'Earn 3000-5000 Rs daily from home! Like 3 YouTube videos and get paid immediately on JazzCash. Send screenshot to start.'
    },
    {
      id: 4,
      title: 'PTA SIM Deactivation & FBR Tax Threats',
      titleUrdu: 'پی ٹی اے سم بلاک اور ایف بی آر ٹیکس نوٹس فراڈ',
      tag: 'Extortion Tactic',
      icon: Smartphone,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      summary: 'Threatening phone calls or messages claiming the user’s SIM cards are used in terrorism or illegal PTA non-tax calls and will be terminated in 2 hours.',
      summaryUrdu: 'دھمکی آمیز کال یا میسج کہ آپ کی سم غیر قانونی سرگرمیوں میں ملوث ہے اور 2 گھنٹے میں بلاک ہو جائے گی۔',
      tactic: 'Criminals masquerade as PTA officers or police inspectors, threatening arrest unless a "fine" is wired immediately via Easypaisa.',
      goldenRule: 'PTA device verification is strictly done via 8484 or DIRBS portal. Law enforcement never asks for immediate mobile wallet fines over the phone.',
      goldenRuleUrdu: 'پی ٹی اے ڈیوائس کی تصدیق صرف 8484 سے ہوتی ہے۔ پولیس یا پی ٹی اے فون پر ایزی پیسہ کے ذریعے جرمانہ نہیں مانگتے۔',
      example: 'PTA Final Warning: Your SIM cards are involved in illegal activity. Call 0312-XXXXXXX immediately to clear fine or face arrest.'
    },
    {
      id: 5,
      title: 'Jeeto Pakistan / Tariq Jamil / Fahad Mustafa Gold Lottery',
      titleUrdu: 'جیتو پاکستان اور انعام گھر جعلی لاٹری',
      tag: 'Lottery Trap',
      icon: Gift,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      summary: 'Messages falsely congratulating the recipient on winning 10 tola gold or a brand new car from ARY Digital or Bol TV.',
      summaryUrdu: 'مبارکباد کا جعلی میسج کہ آپ نے جیتو پاکستان سے 10 تولہ سونا یا نئی گاڑی جیت لی ہے۔',
      tactic: 'Victim is told the prize is ready, but they must first pay "customs clearance", "FBR withholding tax", or send Rs. 3,000 mobile load to register the delivery vehicle.',
      goldenRule: 'Legitimate television programs never run random SMS lotteries. If you did not buy an official ticket or participate on live television, you have not won.',
      goldenRuleUrdu: 'کوئی بھی ٹی وی پروگرام بغیر شرکت کے ایس ایم ایس پر لاٹری نہیں دیتا۔ پہلے ٹیکس مانگنا صریحاً فراڈ ہے۔',
      example: 'Mubarak ho! Apka Jeeto Pakistan se 50 lakh inam nikla hai. Tax ada karne k liye Tariq Jamil sahab k manager se rabta karein.'
    }
  ];

  return (
    <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Pakistan Cyber Threat Radar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {currentLang === 'ur' ? 'پاکستان میں سب سے عام فراڈ اور ان سے بچاؤ کے طریقے' : 'Common Pakistani Scams Explained'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Understanding the psychological tactics, fake messages, and defense strategies for Pakistan's most common digital threats.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation list on the left */}
        <div className="lg:col-span-5 space-y-2">
          {threats.map((threat) => {
            const isSelected = selectedThreat === threat.id;
            const Icon = threat.icon;

            return (
              <button
                key={threat.id}
                type="button"
                onClick={() => setSelectedThreat(threat.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${threat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                      {currentLang === 'ur' ? threat.titleUrdu : threat.title}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {threat.tag}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected threat deep dive on the right */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${threats[selectedThreat].color}`}>
                {threats[selectedThreat].tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Threat Dossier #{selectedThreat + 1}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white mb-3">
              {currentLang === 'ur' ? threats[selectedThreat].titleUrdu : threats[selectedThreat].title}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  How Scammers Target Victims:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentLang === 'ur' ? threats[selectedThreat].summaryUrdu : threats[selectedThreat].summary}
                </p>
                <p className="text-slate-400 mt-1 leading-relaxed italic">
                  Tactic: {threats[selectedThreat].tactic}
                </p>
              </div>

              {/* Sample SMS */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>Real Pakistani Scam SMS Pattern:</span>
                </div>
                <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800 break-words">
                  "{threats[selectedThreat].example}"
                </div>
              </div>

              {/* Golden Rule Defense */}
              <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-3.5">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>The Golden Defense Rule:</span>
                </div>
                <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
                  {currentLang === 'ur' ? threats[selectedThreat].goldenRuleUrdu : threats[selectedThreat].goldenRule}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Encountered this threat?</span>
            <span className="font-semibold text-emerald-400">
              Call FIA Cyber Crime: 1991
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
