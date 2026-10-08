import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, SavedCheck } from '../src/types/scam';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../.data');
const DB_FILE = path.resolve(DATA_DIR, 'scamcheck_users.json');

interface StoredUser extends User {
  passwordHash?: string;
  salt?: string;
  savedChecks: SavedCheck[];
}

interface DBData {
  users: Record<string, StoredUser>;
  sessions: Record<string, string>; // token -> userId
  communityPhoneReports: Record<string, {
    phone: string;
    reports: number;
    reporters: string[]; // userIds or ips
    category: string;
    notes: string[];
    lastReported: string;
  }>;
}

// In-memory cache synced to disk
let data: DBData = {
  users: {},
  sessions: {},
  communityPhoneReports: {
    '03084928172': {
      phone: '0308-4928172',
      reports: 58,
      reporters: ['system'],
      category: 'Fake BISP 8171 Lottery Call',
      notes: ['Caller claims victim won Rs. 25,000 from Benazir program, asks for Rs. 2,000 load/advance fee.'],
      lastReported: '2025-01-14'
    },
    '03049182341': {
      phone: '0304-9182341',
      reports: 43,
      reporters: ['system'],
      category: 'Easypaisa Account Block Phishing',
      notes: ['Sends SMS claiming Easypaisa account will be locked, asks to call back to verify biometric.'],
      lastReported: '2025-02-01'
    },
    '03125549012': {
      phone: '0312-5549012',
      reports: 89,
      reporters: ['system'],
      category: 'Jeeto Pakistan / Tariq Jamil Gold Scheme',
      notes: ['Impersonates ARY Digital Jeeto Pakistan coordinator demanding tax fee before prize delivery.'],
      lastReported: '2024-11-20'
    }
  }
};

// Ensure directory & load data from disk
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.users) data.users = { ...data.users, ...parsed.users };
    if (parsed.sessions) data.sessions = { ...data.sessions, ...parsed.sessions };
    if (parsed.communityPhoneReports) {
      data.communityPhoneReports = { ...data.communityPhoneReports, ...parsed.communityPhoneReports };
    }
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
} catch (err) {
  console.warn('Error initializing data store on disk:', err);
}

function persistToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to persist auth store to disk:', err);
  }
}

// Crypto helpers
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Auth operations
export function registerUser(name: string, email: string, password: string): { user: User; token: string } {
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check if exists
  const existing = Object.values(data.users).find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const id = 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

  const newUser: StoredUser = {
    id,
    email: normalizedEmail,
    name: name.trim() || 'Pakistani Citizen',
    authProvider: 'email',
    passwordHash,
    salt,
    createdAt: new Date().toISOString(),
    savedChecks: []
  };

  data.users[id] = newUser;
  const token = generateToken();
  data.sessions[token] = id;
  persistToDisk();

  const { passwordHash: _, salt: __, savedChecks: ___, ...sanitizedUser } = newUser;
  return { user: sanitizedUser, token };
}

export function loginUser(email: string, password: string): { user: User; token: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const user = Object.values(data.users).find(u => u.email.toLowerCase() === normalizedEmail);
  
  if (!user || !user.passwordHash || !user.salt) {
    throw new Error('Invalid email or password.');
  }

  const hash = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    throw new Error('Invalid email or password.');
  }

  const token = generateToken();
  data.sessions[token] = user.id;
  persistToDisk();

  const { passwordHash: _, salt: __, savedChecks: ___, ...sanitizedUser } = user;
  return { user: sanitizedUser, token };
}

export function loginOrRegisterGoogle(email: string, name: string, avatar?: string): { user: User; token: string } {
  const normalizedEmail = email.trim().toLowerCase();
  let user = Object.values(data.users).find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    const id = 'usr_g_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    user = {
      id,
      email: normalizedEmail,
      name: name || 'Google User',
      authProvider: 'google',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      savedChecks: []
    };
    data.users[id] = user;
  }

  const token = generateToken();
  data.sessions[token] = user.id;
  persistToDisk();

  const { passwordHash: _, salt: __, savedChecks: ___, ...sanitizedUser } = user;
  return { user: sanitizedUser, token };
}

export function loginOrRegisterDemoUser(): { user: User; token: string } {
  const id = 'usr_guest_demo';
  let user = data.users[id];

  if (!user) {
    user = {
      id,
      email: 'guest.demo@scamcheck.internal',
      name: 'Guest Defender (Demo)',
      authProvider: 'demo',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      savedChecks: []
    };
    data.users[id] = user;
  }

  const token = generateToken();
  data.sessions[token] = user.id;
  persistToDisk();

  const { passwordHash: _, salt: __, savedChecks: ___, ...sanitizedUser } = user;
  return { user: sanitizedUser, token };
}

export function getUserByToken(token: string): User | null {
  if (!token) return null;
  const userId = data.sessions[token];
  if (!userId) return null;
  const user = data.users[userId];
  if (!user) return null;

  const { passwordHash: _, salt: __, savedChecks: ___, ...sanitizedUser } = user;
  return sanitizedUser;
}

export function logoutToken(token: string): void {
  delete data.sessions[token];
  persistToDisk();
}

// User Checks History operations
export function getUserChecks(userId: string): SavedCheck[] {
  const user = data.users[userId];
  if (!user) return [];
  return [...user.savedChecks].sort((a, b) => b.savedAt - a.savedAt);
}

export function saveCheckForUser(userId: string, checkData: any, userNotes?: string): SavedCheck {
  const user = data.users[userId];
  if (!user) throw new Error('User not found');

  const newSavedCheck: SavedCheck = {
    ...checkData,
    id: checkData.id || ('chk_' + Date.now()),
    savedAt: Date.now(),
    userNotes: userNotes || ''
  };

  // Avoid duplicate if already in saved list
  user.savedChecks = user.savedChecks.filter(c => c.inputContent !== newSavedCheck.inputContent);
  user.savedChecks.unshift(newSavedCheck);
  // Keep max 50 per user
  if (user.savedChecks.length > 50) {
    user.savedChecks = user.savedChecks.slice(0, 50);
  }

  persistToDisk();
  return newSavedCheck;
}

export function deleteUserCheck(userId: string, checkId: string): boolean {
  const user = data.users[userId];
  if (!user) return false;

  const initialLen = user.savedChecks.length;
  user.savedChecks = user.savedChecks.filter(c => c.id !== checkId);
  persistToDisk();
  return user.savedChecks.length < initialLen;
}

export function clearUserChecks(userId: string): void {
  const user = data.users[userId];
  if (!user) return;
  user.savedChecks = [];
  persistToDisk();
}

// Community Phone Reporting for authenticated users
export function reportPhoneNumber(
  userId: string,
  rawPhone: string,
  category: string,
  notes?: string,
  checkId?: string
): { reports: number; category: string; statusLabel: string } {
  const cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, '');
  const normalizedPk = cleanPhone.startsWith('+92') ? '0' + cleanPhone.slice(3) : cleanPhone.startsWith('92') ? '0' + cleanPhone.slice(2) : cleanPhone;

  let report = data.communityPhoneReports[normalizedPk] || data.communityPhoneReports[cleanPhone];
  if (!report) {
    report = {
      phone: rawPhone,
      reports: 1,
      reporters: [userId],
      category: category || 'Suspicious Caller',
      notes: notes ? [notes] : ['Reported by citizen'],
      lastReported: new Date().toISOString().split('T')[0]
    };
    data.communityPhoneReports[normalizedPk] = report;
  } else {
    // Only increment if this user hasn't already reported this number
    if (!report.reporters.includes(userId)) {
      report.reports += 1;
      report.reporters.push(userId);
    }
    if (notes && !report.notes.includes(notes)) {
      report.notes.push(notes);
    }
    report.lastReported = new Date().toISOString().split('T')[0];
  }

  // Also mark the user's check as reportedByCurrentUser
  const user = data.users[userId];
  if (user) {
    user.savedChecks = user.savedChecks.map(chk => {
      if (chk.id === checkId || chk.inputContent.replace(/[\s\-\(\)]/g, '') === cleanPhone) {
        return { ...chk, reportedByCurrentUser: true };
      }
      return chk;
    });
  }

  persistToDisk();

  return {
    reports: report.reports,
    category: report.category,
    statusLabel: 'Reported / Suspicious (Community Reports)'
  };
}

export function getCommunityPhoneStatus(rawPhone: string) {
  const cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, '');
  const normalizedPk = cleanPhone.startsWith('+92') ? '0' + cleanPhone.slice(3) : cleanPhone.startsWith('92') ? '0' + cleanPhone.slice(2) : cleanPhone;
  return data.communityPhoneReports[normalizedPk] || data.communityPhoneReports[cleanPhone] || null;
}
