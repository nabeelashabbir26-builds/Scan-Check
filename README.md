# ScamCheck PK - Pakistan Cyber Threat & Phishing Detection Tool

**ScamCheck PK** is a modern, responsive web application designed for Pakistani citizens and organizations to detect and combat digital scams, phishing SMS, WhatsApp fraud, fake URLs, and suspicious phone numbers.

---

## 🌟 Key Features

1. **Multi-Vector Risk Scanner**:
   - **Messages (SMS, WhatsApp, Email)**: Detects OTP phishing, BISP 8171 scams, lottery fraud, fake jobs, and delivery traps.
   - **Website URLs**: Analyzes lookalike domains, free/suspicious TLDs (.top, .xyz), and masked URL shorteners.
   - **Phone Numbers**: Identifies consumer cellular SIMs impersonating institutions and cross-checks community fraud intelligence.

2. **Multilingual Roman Urdu & Urdu Support**:
   - Native support for **English**, **Roman Urdu** (*"Mubarak ho"*, *"account block"*, *"fauran rabta karein"*), and **Urdu (اردو)** with authentic Noto Nastaliq typography and RTL alignment.

3. **User Authentication & 'My Checks' History**:
   - Email/password authentication with salt-based password hashing (PBKDF2).
   - One-click Google Sign-in and Instant Demo Guest access.
   - Saved scans history vault with search, filtering, and export capability.

4. **Community-Driven Phone Fraud Radar**:
   - Authenticated users can flag suspicious phone numbers to warn other citizens.
   - In compliance with cybersecurity principles, phone numbers are flagged as *"Reported / Suspicious (Community Reports)"* with report counts rather than asserting definitive legal accusations.

5. **Comprehensive Educational Defense Module**:
   - In-depth investigative articles on Job Scams, Ponzi Apps, Lottery Schemes, and Bank Impersonation.
   - Interactive Infographics (Emergency 5-Step Incident Response & What to NEVER Share).
   - Categorized FAQ guide with answers grounded in State Bank of Pakistan (SBP) and PTA rules.

6. **Verified Pakistani Directory & Emergency Hotlines**:
   - Official shortcode lookup (Easypaisa 3737, JazzCash 8558, BISP 8171, PTA 8484, NADRA 8500, HBL 4250, Meezan 8222).
   - Direct dial links to **FIA Cyber Crime Wing (1991)** and **PTA Consumer Helpline (0800-55055)**.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Installation

1. Unzip the project folder:
   ```bash
   unzip scamcheck-pk-source.zip
   cd scamcheck-pk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Gemini API Key:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional - the built-in Pakistan threat engine works 100% offline without any API key as well):
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production
```bash
npm run build
npm start
```

---

## 🛡️ Privacy & Security Best Practices
- **Zero-Knowledge MPIN/Password Policy**: ScamCheck PK never stores or requires actual MPINs, passwords, or financial credentials.
- **Client & Server Sanitization**: Sensitive inputs are automatically intercepted and flagged for user redaction.
- **Informational Disclaimer**: Risk scores are threat intelligence estimations and do not replace official regulatory confirmation.
