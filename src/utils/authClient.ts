import { User, SavedCheck, ScamAnalysisResult } from '../types/scam';

const TOKEN_KEY = 'scamcheck_auth_token';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {}
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data.user || null;
    } else {
      setStoredToken(null);
      return null;
    }
  } catch {
    return null;
  }
}

export async function loginWithEmail(email: string, password: string): Promise<{ user: User; token: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to login');
  }

  setStoredToken(data.token);
  return data;
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to register');
  }

  setStoredToken(data.token);
  return data;
}

export async function loginWithGoogle(email?: string, name?: string, avatar?: string): Promise<{ user: User; token: string }> {
  const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, avatar }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Google login failed');
  }

  setStoredToken(data.token);
  return data;
}

export async function loginAsDemoGuest(): Promise<{ user: User; token: string }> {
  const res = await fetch('/api/auth/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Guest demo access failed');
  }

  setStoredToken(data.token);
  return data;
}

export async function logoutUser(): Promise<void> {
  const token = getStoredToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }
  setStoredToken(null);
}

// User Checks Operations
export async function fetchUserChecks(): Promise<SavedCheck[]> {
  const token = getStoredToken();
  if (!token) return [];

  try {
    const res = await fetch('/api/checks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      return data.checks || [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function saveCheckToHistory(checkResult: ScamAnalysisResult, userNotes?: string): Promise<SavedCheck | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/checks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ checkResult, userNotes }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.check;
    }
    return null;
  } catch {
    return null;
  }
}

export async function deleteCheckFromHistory(id: string): Promise<boolean> {
  const token = getStoredToken();
  if (!token) return false;

  try {
    const res = await fetch(`/api/checks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function clearAllUserChecks(): Promise<boolean> {
  const token = getStoredToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/checks', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Authenticated Phone Reporting
export async function reportPhoneNumberAsUser(params: {
  phone: string;
  category: string;
  notes?: string;
  checkId?: string;
}): Promise<{ success: boolean; reports: number; statusLabel: string; message: string }> {
  const token = getStoredToken();
  if (!token) throw new Error('You must be signed in to contribute a community phone report.');

  const res = await fetch('/api/report-phone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit report');
  }
  return data;
}
