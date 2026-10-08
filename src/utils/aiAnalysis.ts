import { CheckType, ScamAnalysisResult } from '../types/scam';
import { analyzePakistanScam } from './pakistanScamEngine';

export async function checkScamRisk(
  content: string,
  type: CheckType,
  languageHint?: string
): Promise<ScamAnalysisResult> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        type,
        languageHint,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data as ScamAnalysisResult;
    } else {
      console.warn('API returned non-200 status, using client fallback engine');
      return analyzePakistanScam(content, type);
    }
  } catch (err) {
    console.warn('Network call failed, using client fallback engine:', err);
    return analyzePakistanScam(content, type);
  }
}

export async function submitCommunityReport(report: {
  target: string;
  targetType: CheckType;
  category: string;
  notes?: string;
}): Promise<{ success: boolean; totalReports?: number }> {
  try {
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (res.ok) {
      return await res.json();
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}
