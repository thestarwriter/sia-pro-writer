// pages/app.js
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const REPORT_TYPES = [
  { id: "incident", label: "Incident Report" },
  { id: "handover", label: "Handover Log" },
  { id: "refusal", label: "Refusal of Entry" },
  { id: "ejection", label: "Ejection Report" },
  { id: "suspicious", label: "Suspicious Activity" },
];

const PLACEHOLDERS = {
  incident: "e.g. Two males fighting outside main entrance around 11:30pm. Staff intervened, police called, one male arrested. Minor injury to door staff.",
  handover: "e.g. Quiet shift overall. Two noise complaints from residents. Fire alarm tested at 10pm, all clear. CCTV working. One lost property item logged.",
  refusal: "e.g. Male approx 25, visibly drunk, aggressive at entry. Refused entry under Challenge 25. Became verbally abusive, moved on after 5 mins.",
  ejection: "e.g. Female became aggressive inside, threw a drink at another customer. Escorted out by two officers, no injuries, police not required.",
  suspicious: "e.g. Male loitering outside rear exit 30+ mins, kept looking at staff. Approached and asked to move on. CCTV noted.",
};

const FREE_LIMIT = 3;
const LEMON_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL || "https://your-store.lemonsqueezy.com/checkout/buy/your-variant-id";

function getScore(text) {
  if (!text || text.length < 50) return 0;
  let score = 40;
  if (text.length > 200) score += 15;
  if (text.length > 400) score += 10;
  if (/\d{1,2}[:.]\d{2}/.test(text)) score += 8;
  if (/officer|security|subject|individual/i.test(text)) score += 8;
  if (/actions taken|outcome|procedure/i.test(text)) score += 10;
  if (/police|cctv|management|supervisor/i.test(text)) score += 5;
  if (text.split("\n").length > 4) score += 4;
  return Math.min(score, 99);
}

function getScoreColor(score) {
  if (score >= 85) return "#3fb950";
  if (score >= 65) return "#d29922";
  return "#388bfd";
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function App() {
  const [reportType, setReportType] = useState("incident");
  const [roughNotes, setRoughNotes] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState(0);

  // Email & access state
  const [email, setEmail] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [usedCount, setUsedCount] = useState(0);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Modals
  const [showEmailGate, setShowEmailGate] = useState(false); // first-time email capture
  const [showPaywall, setShowPaywall] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Email input fields
  const [emailGateInput, setEmailGateInput] = useState("");
  const [emailGateError, setEmailGateError] = useState("");
  const [paywallEmailInput, setPaywallEmailInput] = useState("");
  const [unlockEmailInput, setUnlockEmailInput] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlockNotFound, setUnlockNotFound] = useState(false);

  const outputRef = useRef("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("sia_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setUnlockEmailInput(savedEmail);
      loadEmailStatus(savedEmail);
    }
  }, []);

  useEffect(() => {
    setScore(getScore(output));
  }, [output]);

  async function loadEmailStatus(emailToCheck) {
    setCheckingEmail(true);
    try {
      const res = await fetch("/api/check-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToCheck }),
      });
      const data = await res.json();
      setIsPaid(!!data.isPaid);
      setUsedCount(data.freeUsage || 0);
    } catch {
      setIsPaid(false);
    } finally {
      setCheckingEmail(false);
    }
  }

  // Called when user submits email for the first time (email gate)
  async function handleEmailGateSubmit() {
    const trimmed = emailGateInput.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setEmailGateError("Please enter a valid email address.");
      return;
    }
    setEmailGateError("");
    setEmail(trimmed);
    localStorage.setItem("sia_email", trimmed);
    setShowEmailGate(false);
    await loadEmailStatus(trimmed);
  }

  // Called when existing subscriber enters email to unlock
  async function handleUnlockSubmit() {
    const trimmed = unlockEmailInput.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setUnlockError("Please enter a valid email address.");
      return;
    }
    setUnlockError("");
    setUnlockNotFound(false);
    setCheckingEmail(true);
    try {
      const res = await fetch("/api/check-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (data.isPaid) {
        setEmail(trimmed);
        localStorage.setItem("sia_email", trimmed);
        setIsPaid(true);
        setUsedCount(data.freeUsage || 0);
        setShowUnlockModal(false);
        setShowPaywall(false);
      } else {
        setUnlockNotFound(true);
      }
    } catch {
      setUnlockError("Something went wrong. Please try again.");
    } finally {
      setCheckingEmail(false);
    }
  }

  async function generateReport() {
    if (!roughNotes.trim()) return;

    // If no email yet, show the email gate first
    if (!email) {
      setShowEmailGate(true);
      return;
    }

    // Check free limit
    if (!isPaid && usedCount >= FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    setError("");
    setOutput("");
    setStreaming(true);
    outputRef.current = "";

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roughNotes, reportType, officerName, location, dateTime, email }),
      });

      if (res.status === 402) {
        setShowPaywall(true);
        setStreaming(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      // Update usage count
      setUsedCount((prev) => prev + 1);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed?.delta?.text || "";
            if (delta) {
              outputRef.current += delta;
              setOutput(outputRef.current);
            }
          } catch {}
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }

  function copyReport() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const reportsLeft = Math.max(0, FREE_LIMIT - usedCount);
  const scoreColor = getScoreColor(score);

  return (
    <>
      <Head>
        <title>SIA Pro Writer — Write Your Report</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #0d1117; color: #e6edf3; }
        .app { max-width: 860px; margin: 0 auto; padding: 32px 20px 80px; }

        /* Header */
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #21262d; flex-wrap: wrap; gap: 12px; }
        .logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 17px; letter-spacing: -0.3px; text-decoration: none; color: #e6edf3; }
        .logo-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #1f6feb, #388bfd); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

        /* Pills */
        .usage-pill { font-size: 12px; color: #8b949e; background: #161b22; border: 1px solid #30363d; padding: 5px 12px; border-radius: 20px; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
        .usage-pill.warn { color: #d29922; border-color: rgba(210,153,34,0.3); background: rgba(210,153,34,0.08); }
        .usage-pill.out { color: #f85149; border-color: rgba(248,81,73,0.3); background: rgba(248,81,73,0.08); }
        .usage-pill.unlimited { color: #3fb950; border-color: rgba(63,185,80,0.3); background: rgba(63,185,80,0.08); }

        .link-btn { background: none; border: none; color: #8b949e; font-size: 12px; font-family: inherit; cursor: pointer; text-decoration: underline; padding: 0; white-space: nowrap; }
        .link-btn:hover { color: #c9d1d9; }

        /* Tabs */
        .tabs { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
        .tab { padding: 8px 14px; border-radius: 6px; border: 1px solid #30363d; background: #161b22; color: #8b949e; font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .tab:hover { border-color: #388bfd; color: #e6edf3; }
        .tab.active { background: rgba(56,139,253,0.1); border-color: #388bfd; color: #388bfd; }

        /* Form fields */
        .meta-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        @media (max-width: 600px) { .meta-row { grid-template-columns: 1fr; } }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .label { font-size: 11px; font-weight: 600; color: #8b949e; text-transform: uppercase; letter-spacing: 0.8px; }
        .meta-input { background: #161b22; border: 1px solid #30363d; border-radius: 8px; color: #e6edf3; font-size: 13px; font-family: inherit; padding: 10px 12px; outline: none; transition: border-color 0.15s; }
        .meta-input:focus { border-color: #388bfd; }
        .meta-input::placeholder { color: #484f58; }
        .textarea { width: 100%; background: #161b22; border: 1px solid #30363d; border-radius: 10px; color: #e6edf3; font-size: 14px; font-family: inherit; padding: 16px; resize: vertical; min-height: 130px; line-height: 1.6; outline: none; transition: border-color 0.15s; }
        .textarea:focus { border-color: #388bfd; }
        .textarea::placeholder { color: #484f58; }

        /* Generate button */
        .generate-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #1f6feb, #388bfd); border: none; border-radius: 10px; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; margin-top: 16px; transition: opacity 0.15s, transform 0.1s; }
        .generate-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Output */
        .output-section { margin-top: 32px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .output-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .output-label { font-size: 11px; font-weight: 600; color: #8b949e; text-transform: uppercase; letter-spacing: 0.8px; }
        .score-badge { display: flex; align-items: center; gap: 8px; }
        .score-text { font-size: 11px; color: #8b949e; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; }
        .score-track { width: 90px; height: 5px; background: #21262d; border-radius: 3px; overflow: hidden; }
        .score-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease, background 0.6s ease; }
        .score-num { font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; min-width: 32px; text-align: right; }
        .output-box { background: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 24px; font-size: 14px; line-height: 1.75; color: #c9d1d9; white-space: pre-wrap; font-family: 'Inter', sans-serif; min-height: 180px; }
        .output-box.streaming { border-color: #1f6feb; }
        .cursor { display: inline-block; width: 2px; height: 15px; background: #388bfd; margin-left: 2px; vertical-align: middle; animation: blink 0.8s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .copy-btn { margin-top: 12px; padding: 9px 18px; background: #21262d; border: 1px solid #30363d; border-radius: 8px; color: #c9d1d9; font-size: 13px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.15s; }
        .copy-btn:hover { background: #30363d; }
        .copy-btn.copied { border-color: #2ea043; color: #3fb950; }

        /* Error */
        .error-box { background: rgba(248,81,73,0.08); border: 1px solid rgba(248,81,73,0.25); border-radius: 8px; padding: 12px 16px; color: #f85149; font-size: 13px; margin-top: 14px; }

        /* Modals */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 20px; }
        .modal { background: #161b22; border: 1px solid #30363d; border-radius: 16px; padding: 36px; max-width: 420px; width: 100%; text-align: center; }
        .modal-icon { font-size: 40px; margin-bottom: 16px; }
        .modal-title { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 10px; color: #e6edf3; }
        .modal-desc { font-size: 14px; color: #8b949e; line-height: 1.65; margin-bottom: 24px; }
        .modal-price { font-size: 32px; font-weight: 800; color: #e6edf3; margin-bottom: 4px; }
        .modal-per { font-size: 13px; color: #8b949e; margin-bottom: 20px; }
        .modal-features { list-style: none; text-align: left; margin-bottom: 24px; padding: 0 8px; }
        .modal-feature { font-size: 13px; color: #c9d1d9; padding: 5px 0; display: flex; gap: 8px; }
        .modal-feature-check { color: #3fb950; flex-shrink: 0; }
        .modal-input { width: 100%; background: #0d1117; border: 1px solid #30363d; border-radius: 8px; color: #e6edf3; font-size: 14px; font-family: inherit; padding: 12px 14px; outline: none; margin-bottom: 12px; transition: border-color 0.15s; }
        .modal-input:focus { border-color: #388bfd; }
        .modal-input::placeholder { color: #484f58; }
        .modal-error { color: #f85149; font-size: 12px; margin: -6px 0 12px; text-align: left; }
        .modal-not-found { background: rgba(210,153,34,0.08); border: 1px solid rgba(210,153,34,0.25); border-radius: 8px; padding: 10px 14px; color: #d29922; font-size: 13px; margin-bottom: 12px; text-align: left; }
        .modal-primary-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #1f6feb, #388bfd); border: none; border-radius: 10px; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; margin-bottom: 12px; transition: opacity 0.15s; }
        .modal-primary-btn:hover:not(:disabled) { opacity: 0.9; }
        .modal-primary-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .modal-secondary-btn { width: 100%; padding: 11px; background: transparent; border: 1px solid #30363d; border-radius: 10px; color: #8b949e; font-size: 14px; font-family: inherit; cursor: pointer; transition: border-color 0.15s; }
        .modal-secondary-btn:hover { border-color: #8b949e; color: #c9d1d9; }
        .modal-link-row { margin-top: 16px; font-size: 13px; color: #8b949e; }
        .modal-link-btn { background: none; border: none; color: #388bfd; font-size: 13px; font-family: inherit; cursor: pointer; text-decoration: underline; padding: 0; }
        .modal-small { font-size: 12px; color: #484f58; margin-top: 12px; }

        /* Footer */
        .footer { margin-top: 56px; padding-top: 20px; border-top: 1px solid #21262d; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #484f58; flex-wrap: wrap; gap: 8px; }
        .footer a { color: #484f58; text-decoration: none; }
        .footer a:hover { color: #8b949e; }
      `}</style>

      {/* EMAIL GATE MODAL — shown before first report if no email saved */}
      {showEmailGate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🛡️</div>
            <div className="modal-title">Get your free reports</div>
            <div className="modal-desc">
              Enter your email to get started. You'll get 3 free reports —
              no card needed, no spam.
            </div>
            <input
              className="modal-input"
              type="email"
              placeholder="your@email.com"
              value={emailGateInput}
              onChange={(e) => setEmailGateInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailGateSubmit()}
              autoFocus
            />
            {emailGateError && <div className="modal-error">{emailGateError}</div>}
            <button className="modal-primary-btn" onClick={handleEmailGateSubmit}>
              Get 3 free reports →
            </button>
            <p className="modal-small">We'll never share your email or send you spam.</p>
          </div>
        </div>
      )}

      {/* PAYWALL MODAL — shown after 3 free reports */}
      {showPaywall && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🛡️</div>
            <div className="modal-title">Upgrade to Unlimited</div>
            <div className="modal-desc">
              You've used your 3 free reports.<br />
              Unlock unlimited reports with SIA Pro Writer Unlimited.
            </div>
            <div className="modal-price">£4.99</div>
            <div className="modal-per">per month · cancel anytime</div>
            <ul className="modal-features">
              {["Unlimited reports", "All 5 report types", "Quality score", "Priority support"].map(f => (
                <li key={f} className="modal-feature">
                  <span className="modal-feature-check">✓</span> {f}
                </li>
              ))}
            </ul>
            <input
              className="modal-input"
              type="email"
              placeholder="Your email address (for checkout)"
              value={paywallEmailInput}
              onChange={(e) => setPaywallEmailInput(e.target.value)}
            />
            <a
              href={paywallEmailInput.trim()
                ? `${LEMON_URL}?checkout[email]=${encodeURIComponent(paywallEmailInput.trim())}`
                : LEMON_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (paywallEmailInput.trim()) {
                  const e = paywallEmailInput.trim().toLowerCase();
                  localStorage.setItem("sia_email", e);
                  setEmail(e);
                }
              }}
            >
              <button className="modal-primary-btn">Upgrade now →</button>
            </a>
            <button className="modal-secondary-btn" onClick={() => setShowPaywall(false)}>
              Maybe later
            </button>
            <div className="modal-link-row">
              Already upgraded?{" "}
              <button className="modal-link-btn" onClick={() => { setShowPaywall(false); setShowUnlockModal(true); }}>
                Enter your email to unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNLOCK MODAL — for returning subscribers */}
      {showUnlockModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">✉️</div>
            <div className="modal-title">Unlock Unlimited</div>
            <div className="modal-desc">
              Enter the email address you used when you subscribed.
            </div>
            <input
              className="modal-input"
              type="email"
              placeholder="your@email.com"
              value={unlockEmailInput}
              onChange={(e) => { setUnlockEmailInput(e.target.value); setUnlockNotFound(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlockSubmit()}
              autoFocus
            />
            {unlockError && <div className="modal-error">{unlockError}</div>}
            {unlockNotFound && (
              <div className="modal-not-found">
                ⚠️ No active subscription found for that email. Please check the email you used to subscribe, or <a href={LEMON_URL} target="_blank" rel="noopener noreferrer" style={{color:"#388bfd"}}>upgrade here</a>.
              </div>
            )}
            <button
              className="modal-primary-btn"
              onClick={handleUnlockSubmit}
              disabled={checkingEmail}
            >
              {checkingEmail ? "Checking…" : "Unlock my account →"}
            </button>
            <button className="modal-secondary-btn" onClick={() => { setShowUnlockModal(false); setUnlockError(""); setUnlockNotFound(false); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="app">
        <header className="header">
          <Link href="/" className="logo">
            <div className="logo-icon">🛡️</div>
            SIA Pro Writer
          </Link>
          <div className="header-right">
            {checkingEmail && <div className="usage-pill">Checking…</div>}
            {!checkingEmail && isPaid && (
              <div className="usage-pill unlimited">✓ Unlimited</div>
            )}
            {!checkingEmail && !isPaid && email && (
              <>
                <button className="link-btn" onClick={() => setShowUnlockModal(true)}>
                  Already subscribed?
                </button>
                <div className={`usage-pill${reportsLeft === 0 ? " out" : reportsLeft === 1 ? " warn" : ""}`}>
                  {reportsLeft === 0 ? "0 free reports left" : `${reportsLeft} free report${reportsLeft !== 1 ? "s" : ""} left`}
                </div>
              </>
            )}
            {!checkingEmail && !email && (
              <div className="usage-pill">3 free reports</div>
            )}
          </div>
        </header>

        <div className="tabs">
          {REPORT_TYPES.map((t) => (
            <button
              key={t.id}
              className={`tab${reportType === t.id ? " active" : ""}`}
              onClick={() => { setReportType(t.id); setOutput(""); setError(""); }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="meta-row">
          <div className="field">
            <label className="label">Officer name</label>
            <input className="meta-input" placeholder="e.g. J. Smith" value={officerName} onChange={e => setOfficerName(e.target.value)} />
          </div>
          <div className="field">
            <label className="label">Location / Venue</label>
            <input className="meta-input" placeholder="e.g. Main Entrance" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div className="field">
            <label className="label">Date & Time</label>
            <input className="meta-input" placeholder="e.g. 14/06/2025 23:15" value={dateTime} onChange={e => setDateTime(e.target.value)} />
          </div>
        </div>

        <div className="field" style={{ marginBottom: 16 }}>
          <label className="label">Your rough notes</label>
          <textarea
            className="textarea"
            placeholder={PLACEHOLDERS[reportType]}
            value={roughNotes}
            onChange={e => setRoughNotes(e.target.value)}
          />
        </div>

        <button
          className="generate-btn"
          onClick={generateReport}
          disabled={streaming || !roughNotes.trim()}
        >
          {streaming ? "Generating report…" : "Generate professional report →"}
        </button>

        {error && <div className="error-box">{error}</div>}

        {(output || streaming) && (
          <div className="output-section">
            <div className="output-header">
              <span className="output-label">Professional Report</span>
              {output && (
                <div className="score-badge">
                  <span className="score-text">Quality</span>
                  <div className="score-track">
                    <div className="score-fill" style={{ width: `${score}%`, background: scoreColor }} />
                  </div>
                  <span className="score-num" style={{ color: scoreColor }}>{score}%</span>
                </div>
              )}
            </div>
            <div className={`output-box${streaming ? " streaming" : ""}`}>
              {output}
              {streaming && <span className="cursor" />}
            </div>
            {!streaming && output && (
              <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copyReport}>
                {copied ? "✓ Copied" : "Copy report"}
              </button>
            )}
          </div>
        )}

        <footer className="footer">
          <span>SIA Pro Writer · Built for security professionals</span>
          <Link href="/">← Back to home</Link>
        </footer>
      </div>
    </>
  );
}
