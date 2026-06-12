// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const S = {
  page: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#e6edf3",
    fontFamily: "'Inter', sans-serif",
  },
  // Nav
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #21262d",
    position: "sticky",
    top: 0,
    background: "rgba(13,17,23,0.95)",
    backdropFilter: "blur(8px)",
    zIndex: 100,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: "-0.3px",
  },
  navLogoIcon: {
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, #1f6feb, #388bfd)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  navCta: {
    padding: "9px 20px",
    background: "linear-gradient(135deg, #1f6feb, #388bfd)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  // Hero
  hero: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "80px 24px 72px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    color: "#388bfd",
    background: "rgba(56,139,253,0.1)",
    border: "1px solid rgba(56,139,253,0.2)",
    padding: "4px 12px",
    borderRadius: 20,
    marginBottom: 24,
    letterSpacing: "0.5px",
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: "clamp(32px, 5vw, 54px)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-1.5px",
    marginBottom: 20,
  },
  h1Accent: {
    background: "linear-gradient(135deg, #388bfd, #79c0ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subheadline: {
    fontSize: 18,
    color: "#8b949e",
    lineHeight: 1.65,
    maxWidth: 560,
    margin: "0 auto 36px",
  },
  heroCtas: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #1f6feb, #388bfd)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "14px 28px",
    background: "transparent",
    border: "1px solid #30363d",
    borderRadius: 10,
    color: "#c9d1d9",
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  freeNote: {
    marginTop: 14,
    fontSize: 13,
    color: "#484f58",
  },
  // Demo preview
  demoWrap: {
    maxWidth: 760,
    margin: "0 auto 80px",
    padding: "0 24px",
  },
  demoBox: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 14,
    overflow: "hidden",
  },
  demoTopBar: {
    background: "#21262d",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    borderBottom: "1px solid #30363d",
  },
  dot: (c) => ({
    width: 11,
    height: 11,
    borderRadius: "50%",
    background: c,
  }),
  demoTitle: {
    marginLeft: 8,
    fontSize: 12,
    color: "#8b949e",
    fontFamily: "'JetBrains Mono', monospace",
  },
  demoContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
  },
  demoPane: {
    padding: "20px 24px",
  },
  demoPaneLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: 10,
    fontFamily: "'JetBrains Mono', monospace",
  },
  demoRough: {
    fontSize: 13,
    color: "#6e7681",
    lineHeight: 1.6,
    fontStyle: "italic",
  },
  demoDivider: {
    width: 1,
    background: "#21262d",
    alignSelf: "stretch",
  },
  demoReport: {
    fontSize: 12,
    color: "#c9d1d9",
    lineHeight: 1.75,
    fontFamily: "'JetBrains Mono', monospace",
  },
  demoScoreBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    padding: "6px 12px",
    background: "rgba(63,185,80,0.1)",
    border: "1px solid rgba(63,185,80,0.2)",
    borderRadius: 20,
    fontSize: 12,
    color: "#3fb950",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
  },
  // Features
  features: {
    maxWidth: 900,
    margin: "0 auto 80px",
    padding: "0 24px",
  },
  sectionLabel: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 600,
    color: "#388bfd",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: 12,
    fontFamily: "'JetBrains Mono', monospace",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "clamp(24px, 3vw, 34px)",
    fontWeight: 700,
    letterSpacing: "-0.8px",
    marginBottom: 48,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
  },
  featureCard: {
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: 12,
    padding: "24px",
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 14,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 13,
    color: "#8b949e",
    lineHeight: 1.65,
  },
  // Pricing
  pricing: {
    maxWidth: 760,
    margin: "0 auto 80px",
    padding: "0 24px",
    textAlign: "center",
  },
  pricingCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginTop: 40,
  },
  pricingCard: (highlighted) => ({
    background: highlighted ? "rgba(56,139,253,0.08)" : "#161b22",
    border: highlighted ? "1px solid rgba(56,139,253,0.4)" : "1px solid #21262d",
    borderRadius: 14,
    padding: "28px 24px",
    textAlign: "left",
    position: "relative",
  }),
  pricingBadge: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#388bfd",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 12px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    letterSpacing: "0.5px",
  },
  planName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#8b949e",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  planPrice: {
    fontSize: 38,
    fontWeight: 800,
    letterSpacing: "-1px",
    marginBottom: 4,
  },
  planPer: {
    fontSize: 13,
    color: "#8b949e",
    marginBottom: 20,
  },
  planFeatureList: {
    listStyle: "none",
    padding: 0,
    marginBottom: 24,
  },
  planFeatureItem: {
    fontSize: 13,
    color: "#c9d1d9",
    padding: "5px 0",
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  planFeatureCheck: {
    color: "#3fb950",
    flexShrink: 0,
    marginTop: 1,
  },
  planCta: (highlighted) => ({
    width: "100%",
    padding: "12px",
    background: highlighted ? "linear-gradient(135deg, #1f6feb, #388bfd)" : "transparent",
    border: highlighted ? "none" : "1px solid #30363d",
    borderRadius: 8,
    color: highlighted ? "#fff" : "#c9d1d9",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
  }),
  // Social proof
  proof: {
    maxWidth: 900,
    margin: "0 auto 80px",
    padding: "0 24px",
  },
  proofGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
    marginTop: 40,
  },
  proofCard: {
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: 12,
    padding: "20px",
  },
  proofStars: {
    color: "#d29922",
    fontSize: 14,
    marginBottom: 10,
  },
  proofText: {
    fontSize: 13,
    color: "#c9d1d9",
    lineHeight: 1.65,
    marginBottom: 14,
    fontStyle: "italic",
  },
  proofAuthor: {
    fontSize: 12,
    color: "#8b949e",
    fontWeight: 600,
  },
  // Footer
  footer: {
    borderTop: "1px solid #21262d",
    padding: "28px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 12,
    color: "#484f58",
  },
};

export default function Landing() {
  const [hoverPrimary, setHoverPrimary] = useState(false);

  return (
    <>
      <Head>
        <title>SIA Pro Writer — Professional Report Generator for Security Officers</title>
        <meta name="description" content="Turn rough security notes into professional incident reports in seconds. Built for SIA-licensed door staff and security officers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={S.page}>
        {/* Nav */}
        <nav style={S.nav}>
          <div style={S.navLogo}>
            <div style={S.navLogoIcon}>🛡️</div>
            SIA Pro Writer
          </div>
          <Link href="/app">
            <button style={S.navCta}>Try free →</button>
          </Link>
        </nav>

        {/* Hero */}
        <section style={S.hero}>
          <div style={S.badge}>Built for SIA-licensed professionals</div>
          <h1 style={S.h1}>
            Your incident reports,<br />
            <span style={S.h1Accent}>written professionally.</span>
          </h1>
          <p style={S.subheadline}>
            Type your rough notes. Get a polished, legally-appropriate report in seconds —
            ready to hand to management, police, or your client.
          </p>
          <div style={S.heroCtas}>
            <Link href="/app">
              <button style={S.btnPrimary}>Write my first report free</button>
            </Link>
            <Link href="#how-it-works">
              <button style={S.btnSecondary}>See how it works</button>
            </Link>
          </div>
          <p style={S.freeNote}>3 free reports · No account needed · Upgrade anytime</p>
        </section>

        {/* Demo preview */}
        <div style={S.demoWrap}>
          <div style={S.demoBox}>
            <div style={S.demoTopBar}>
              <div style={S.dot("#ff5f57")} />
              <div style={S.dot("#febc2e")} />
              <div style={S.dot("#28c840")} />
              <span style={S.demoTitle}>sia-pro-writer — Incident Report</span>
            </div>
            <div style={S.demoContent}>
              <div style={S.demoPane}>
                <div style={S.demoPaneLabel}>Your rough notes</div>
                <div style={S.demoRough}>
                  "Two guys fighting near main door around 11:30, we stepped in,
                  one got a bit aggressive with staff, police came and took the
                  one bloke away, small cut on my hand"
                </div>
              </div>
              <div style={S.demoDivider} />
              <div style={S.demoPane}>
                <div style={S.demoPaneLabel}>Professional report</div>
                <div style={S.demoReport}>
                  <strong>INCIDENT DETAILS</strong>{"\n"}
                  Date/Time: 14/06/2025 23:31{"\n"}
                  Location: Main Entrance{"\n\n"}
                  <strong>DESCRIPTION OF EVENTS</strong>{"\n"}
                  At approximately 23:30 hours, two male subjects
                  were observed engaged in a physical altercation
                  in the vicinity of the main entrance...{"\n\n"}
                  <strong>ACTIONS TAKEN</strong>{"\n"}
                  Security personnel intervened to separate the
                  subjects. Police were contacted and responded...
                </div>
                <div style={S.demoScoreBadge}>
                  ✓ Quality score: 94%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section style={S.features} id="how-it-works">
          <div style={S.sectionLabel}>What you get</div>
          <h2 style={S.sectionTitle}>Everything a security officer needs</h2>
          <div style={S.featureGrid}>
            {[
              { icon: "📋", title: "5 report types", desc: "Incident reports, handover logs, refusal of entry, ejection reports, and suspicious activity — all covered." },
              { icon: "⚖️", title: "Legally appropriate language", desc: "Reports use precise, factual wording suitable for police submissions, management review, or legal proceedings." },
              { icon: "⚡", title: "Seconds, not minutes", desc: "Paste your rough notes and your professional report is ready before you've finished your tea." },
              { icon: "📊", title: "Quality score", desc: "See how professional your report is before you submit it. Fix gaps instantly." },
              { icon: "📱", title: "Works on your phone", desc: "Write reports on shift from any device. No app download needed." },
              { icon: "🔒", title: "Your data stays private", desc: "Reports aren't stored or shared. What happens on shift, stays on shift." },
            ].map((f) => (
              <div key={f.title} style={S.featureCard}>
                <div style={S.featureIcon}>{f.icon}</div>
                <div style={S.featureTitle}>{f.title}</div>
                <div style={S.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section style={S.pricing} id="pricing">
          <div style={S.sectionLabel}>Pricing</div>
          <h2 style={S.sectionTitle}>Less than a round of drinks</h2>
          <div style={S.pricingCards}>
            <div style={S.pricingCard(false)}>
              <div style={S.planName}>Free</div>
              <div style={S.planPrice}>£0</div>
              <div style={S.planPer}>forever</div>
              <ul style={S.planFeatureList}>
                {["3 reports per month", "All 5 report types", "Copy to clipboard"].map(f => (
                  <li key={f} style={S.planFeatureItem}>
                    <span style={S.planFeatureCheck}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/app">
                <button style={S.planCta(false)}>Get started</button>
              </Link>
            </div>
            <div style={S.pricingCard(true)}>
              <div style={S.pricingBadge}>MOST POPULAR</div>
              <div style={S.planName}>Pro</div>
              <div style={S.planPrice}>£4.99</div>
              <div style={S.planPer}>per month · cancel anytime</div>
              <ul style={S.planFeatureList}>
                {[
                  "Unlimited reports",
                  "All 5 report types",
                  "Quality score",
                  "Priority support",
                  "New features first",
                ].map(f => (
                  <li key={f} style={S.planFeatureItem}>
                    <span style={S.planFeatureCheck}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL || "#pricing"}>
                <button style={S.planCta(true)}>Upgrade to Pro →</button>
              </a>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section style={S.proof}>
          <div style={S.sectionLabel}>Early users</div>
          <h2 style={S.sectionTitle}>Door staff love it</h2>
          <div style={S.proofGrid}>
            {[
              { text: "Used to dread writing up incidents at the end of a long shift. This takes 30 seconds now and my manager said my reports have never been better.", author: "Door Supervisor, London" },
              { text: "Got pulled up on my handover notes last year. Started using this and the venue manager actually commented on how professional they'd become.", author: "Security Officer, Manchester" },
              { text: "Going for a supervisor role and needed my paperwork to look the part. This makes me sound like I've been writing reports for 20 years.", author: "SIA Door Supervisor, Birmingham" },
            ].map((p, i) => (
              <div key={i} style={S.proofCard}>
                <div style={S.proofStars}>★★★★★</div>
                <div style={S.proofText}>"{p.text}"</div>
                <div style={S.proofAuthor}>{p.author}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={S.footer}>
          <div>© 2025 SIA Pro Writer · Built for security professionals</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/app" style={{ color: "#8b949e" }}>App</Link>
            <a href="mailto:hello@siaprowriter.co.uk" style={{ color: "#8b949e" }}>Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}
