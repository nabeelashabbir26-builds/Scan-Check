import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { analyzePakistanScam } from './src/utils/pakistanScamEngine';
import type { CheckType, ScamAnalysisResult } from './src/types/scam';
import {
  registerUser,
  loginUser,
  loginOrRegisterGoogle,
  loginOrRegisterDemoUser,
  getUserByToken,
  logoutToken,
  getUserChecks,
  saveCheckForUser,
  deleteUserCheck,
  clearUserChecks,
  reportPhoneNumber,
  getCommunityPhoneStatus
} from './server/authStore';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// Auth Middleware
function requireAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }
  const token = authHeader.split(' ')[1];
  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
  }
  req.user = user;
  req.token = token;
  next();
}

// Optional Auth Middleware (for anonymous or logged in users)
function optionalAuth(req: any, _res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    req.user = getUserByToken(token) || undefined;
    req.token = token;
  }
  next();
}

// Initialize Gemini SDK if API key is configured
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ================= AUTH ROUTES =================

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    const result = registerUser(name || '', email, password);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Registration failed.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const result = loginUser(email, password);
    return res.json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.message || 'Invalid credentials.' });
  }
});

app.post('/api/auth/google', (req, res) => {
  try {
    const { email, name, avatar } = req.body;
    const resolvedEmail = email || `user_${Date.now()}@accounts.google.internal`;
    const resolvedName = name || 'Google Verified User';
    const result = loginOrRegisterGoogle(resolvedEmail, resolvedName, avatar);
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ error: 'Google authentication failed.' });
  }
});

app.post('/api/auth/demo', (_req, res) => {
  try {
    const result = loginOrRegisterDemoUser();
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ error: 'Demo guest access failed.' });
  }
});

app.get('/api/auth/me', requireAuth, (req: any, res) => {
  return res.json({ user: req.user });
});

app.post('/api/auth/logout', (req: any, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    logoutToken(token);
  }
  return res.json({ success: true });
});

// Endpoint to download the full app ZIP bundle
app.get('/api/download-zip', (_req, res) => {
  const zipPath = path.resolve(__dirname, 'scamcheck-pk-source.zip');
  res.download(zipPath, 'scamcheck-pk-source.zip', (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to download zip file' });
    }
  });
});

// ================= USER CHECKS HISTORY (MY CHECKS) =================

app.get('/api/checks', requireAuth, (req: any, res) => {
  try {
    const checks = getUserChecks(req.user.id);
    return res.json({ checks });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve saved checks.' });
  }
});

app.post('/api/checks', requireAuth, (req: any, res) => {
  try {
    const { checkResult, userNotes } = req.body;
    if (!checkResult || !checkResult.inputContent) {
      return res.status(400).json({ error: 'Check result data is required.' });
    }
    const saved = saveCheckForUser(req.user.id, checkResult, userNotes);
    return res.status(201).json({ success: true, check: saved });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to save check to history.' });
  }
});

app.delete('/api/checks/:id', requireAuth, (req: any, res) => {
  try {
    const checkId = req.params.id;
    const removed = deleteUserCheck(req.user.id, checkId);
    return res.json({ success: removed });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete check.' });
  }
});

app.delete('/api/checks', requireAuth, (req: any, res) => {
  try {
    clearUserChecks(req.user.id);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to clear history.' });
  }
});

// ================= AUTHENTICATED PHONE REPORTING =================

app.post('/api/report-phone', requireAuth, (req: any, res) => {
  try {
    const { phone, category, notes, checkId } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const reportResult = reportPhoneNumber(
      req.user.id,
      phone,
      category || 'Suspicious Caller',
      notes,
      checkId
    );

    return res.json({
      success: true,
      message: 'Phone number successfully recorded in community threat intelligence radar.',
      ...reportResult
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to record phone report.' });
  }
});

// ================= CORE ANALYSIS ROUTE =================

app.post('/api/analyze', optionalAuth, async (req: any, res) => {
  try {
    const { content, type, languageHint } = req.body as {
      content?: string;
      type?: CheckType;
      languageHint?: string;
    };

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required for analysis' });
    }

    const trimmed = content.trim();

    // 1. Run local Pakistani rule-engine
    const heuristicResult = analyzePakistanScam(trimmed, type);

    // 2. Query community phone reports store
    const phoneReport = getCommunityPhoneStatus(trimmed);
    if (phoneReport) {
      heuristicResult.riskLevel = 'HIGH_RISK';
      heuristicResult.riskScore = Math.max(heuristicResult.riskScore, 75);
      heuristicResult.communityData = {
        isReported: true,
        reportCount: phoneReport.reports,
        statusLabel: 'Reported / Suspicious (Community Reports)',
        categoriesReported: [phoneReport.category],
        cautionNote: 'Flagged by community members as reported/suspicious. Always exercise caution and do not share codes.'
      };
    }

    // 3. Enhance with Gemini if key is provided
    if (ai && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const prompt = `You are ScamCheck PK, a specialized cybersecurity threat intelligence engine analyzing communications in Pakistan.
Target content to examine:
"""
${trimmed}
"""
Target Type: ${type || 'auto-detect (message, url, or phone)'}
Language Hint: ${languageHint || 'auto-detect (English, Roman Urdu, or Urdu)'}

Perform deep threat assessment focusing on Pakistani cybersecurity threats:
- Easypaisa (official code 3737), JazzCash (official code 8558/4444), Nayapay, Sadapay, Pakistani Banks (HBL, Meezan, MCB, UBL, Alfalah, etc.)
- BISP / Ehsaas Kafalat 25,000 / 35,000 PKR grant scams (official code strictly 8171)
- Courier address update phishing (TCS, Leopard, PostEx, PakPost)
- Fake online jobs / YouTube like tasks demanding advance registration deposits
- PTA SIM deactivation threats (official code 8484) or FBR arrest threats
- Fake Jeeto Pakistan / Tariq Jamil / ARY lottery scams
- Phone numbers: Note that for phone numbers, community data should be presented as "reported/suspicious" rather than declaring definitive guilt.
- Roman Urdu terms: "mubarak ho", "fauran rabta karein", "account block", "inam nikla", "otp send karein", "parchi number", "biometric"
- Urdu script phrases: "مبارک ہو", "بینظیر انکم سپورٹ", "ایزی پیسہ", "جاز کیش", "اکاؤنٹ بلاک", "او ٹی پی"

Respond with a strictly valid JSON object matching this schema:
{
  "riskLevel": "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK",
  "riskScore": number between 0 and 100,
  "summary": string (clear verdict for Pakistani citizens in English),
  "summaryUrdu": string (clear verdict in Urdu),
  "detectedLanguage": "English" | "Roman Urdu" | "Urdu" | "Mixed",
  "indicators": [
    {
      "id": string,
      "title": string,
      "titleUrdu": string,
      "category": "urgency" | "financial" | "domain" | "impersonation" | "lottery" | "credential" | "job" | "courier" | "threat",
      "severity": "high" | "medium" | "low",
      "description": string,
      "descriptionUrdu": string,
      "detectedExcerpt": string
    }
  ],
  "pakistanContext": string (explaining Pakistani official systems, real shortcodes, and procedures),
  "pakistanContextUrdu": string (same explanation in Urdu),
  "recommendations": string[] (concrete action steps),
  "recommendationsUrdu": string[] (concrete action steps in Urdu)
}
Return only JSON, no markdown codeblocks, no commentary.`;

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 4500)
        );

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const geminiResponse: any = await Promise.race([geminiCall, timeoutPromise]);

        if (geminiResponse && geminiResponse.text) {
          const parsed = JSON.parse(geminiResponse.text);
          if (parsed && parsed.riskLevel && typeof parsed.riskScore === 'number') {
            const enhancedResult: ScamAnalysisResult = {
              id: 'res-' + Date.now(),
              timestamp: Date.now(),
              inputContent: trimmed,
              inputType: heuristicResult.inputType,
              riskLevel: parsed.riskLevel,
              riskScore: parsed.riskScore,
              summary: parsed.summary || heuristicResult.summary,
              summaryUrdu: parsed.summaryUrdu || heuristicResult.summaryUrdu,
              detectedLanguage: parsed.detectedLanguage || heuristicResult.detectedLanguage,
              indicators: Array.isArray(parsed.indicators) && parsed.indicators.length > 0
                ? parsed.indicators
                : heuristicResult.indicators,
              pakistanContext: parsed.pakistanContext || heuristicResult.pakistanContext,
              pakistanContextUrdu: parsed.pakistanContextUrdu || heuristicResult.pakistanContextUrdu,
              recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
                ? parsed.recommendations
                : heuristicResult.recommendations,
              recommendationsUrdu: Array.isArray(parsed.recommendationsUrdu) && parsed.recommendationsUrdu.length > 0
                ? parsed.recommendationsUrdu
                : heuristicResult.recommendationsUrdu,
              officialChannels: heuristicResult.officialChannels,
              communityData: heuristicResult.communityData,
              hasSensitiveInputWarning: heuristicResult.hasSensitiveInputWarning,
              sensitiveWarningMessage: heuristicResult.sensitiveWarningMessage,
            };

            return res.json(enhancedResult);
          }
        }
      } catch (geminiError) {
        console.warn('Gemini AI inference fallback to heuristic engine:', geminiError);
      }
    }

    return res.json(heuristicResult);
  } catch (err: any) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Failed to analyze content. Please try again.' });
  }
});

// Setup Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ScamCheck PK server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
