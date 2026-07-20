// pages/privacy.js
import SeoHead from "../components/SeoHead";
import Link from "next/link";

const S = {
  page: { minHeight: "100vh", background: "#0d1117", color: "#e6edf3", fontFamily: "'Inter', sans-serif" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #21262d", position: "sticky", top: 0, background: "rgba(13,17,23,0.95)", backdropFilter: "blur(8px)", zIndex: 100 },
  navLogo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px" },
  navLogoIcon: { width: 32, height: 32, background: "linear-gradient(135deg, #1f6feb, #388bfd)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  navCta: { padding: "9px 20px", background: "linear-gradient(135deg, #1f6feb, #388bfd)", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" },
  main: { maxWidth: 760, margin: "0 auto", padding: "56px 24px 100px" },
  h1: { fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 },
  updated: { fontSize: 13, color: "#484f58", marginBottom: 40 },
  h2: { fontSize: 19, fontWeight: 700, marginTop: 40, marginBottom: 14, color: "#e6edf3" },
  p: { fontSize: 14.5, color: "#8b949e", lineHeight: 1.75, marginBottom: 14 },
  ul: { paddingLeft: 22, marginBottom: 14 },
  li: { fontSize: 14.5, color: "#8b949e", lineHeight: 1.75, marginBottom: 8 },
  link: { color: "#388bfd", textDecoration: "underline" },
  footer: { borderTop: "1px solid #21262d", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#484f58" },
};

export default function Privacy() {
  return (
    <>
      <SeoHead
        title="Privacy Policy — SIA Pro Writer"
        description="How SIA Pro Writer collects, uses, and protects your data, including what our third-party providers do with your information."
        path="/privacy"
      />

      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={S.navLogo}>
              <div style={S.navLogoIcon}>🛡️</div>
              SIA Pro Writer
            </div>
          </Link>
          <Link href="/app"><button style={S.navCta}>Try free →</button></Link>
        </nav>

        <main style={S.main}>
          <h1 style={S.h1}>Privacy Policy</h1>
          <p style={S.updated}>Last updated: 20 July 2026</p>

          <p style={S.p}>
            SIA Pro Writer ("we", "us", "our") provides an AI-powered tool that helps
            security professionals turn rough notes into formal written reports. This
            page explains what information we collect, how it's used, and how it's
            protected.
          </p>

          <h2 style={S.h2}>1. What information we collect</h2>
          <p style={S.p}>We collect the minimum needed to run the service:</p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Your email address</strong> — collected when you use your first free report, or when you subscribe. Used to track your free report usage and to recognise you as a paying subscriber.</li>
            <li style={S.li}><strong>The report content you enter</strong> — your rough notes, officer name, location, and date/time fields, which are sent to our AI provider to generate your report (see Section 3 below).</li>
            <li style={S.li}><strong>Payment information</strong> — if you subscribe, payment is handled entirely by our payment processor, Lemon Squeezy. We never see or store your card details.</li>
            <li style={S.li}><strong>Basic technical data</strong> — such as IP address and browser type, collected automatically by our hosting provider (Vercel) for security and performance purposes.</li>
          </ul>

          <h2 style={S.h2}>2. What we don't do</h2>
          <ul style={S.ul}>
            <li style={S.li}>We do not sell your personal information to anyone.</li>
            <li style={S.li}>We do not store the content of your reports or rough notes in a database after they're generated and shown to you.</li>
            <li style={S.li}>We do not use your report content to train any AI models.</li>
          </ul>

          <h2 style={S.h2}>3. Third-party services we use</h2>
          <p style={S.p}>
            To provide SIA Pro Writer, we rely on a small number of trusted third-party
            services. Each only receives the minimum data needed to do its job:
          </p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Anthropic (Claude AI)</strong> — the text you enter (your rough notes and any names/details you include) is sent to Anthropic's API to generate your formal report. Anthropic processes this data to return the result to you and does not use it to train their models. If your notes reference real people, incidents, or alleged offences, please be aware this information is processed by this third party in order to generate your report.</li>
            <li style={S.li}><strong>Lemon Squeezy</strong> — handles all subscription payments and billing. We never see your full card details.</li>
            <li style={S.li}><strong>Upstash</strong> — a database used only to remember your email address, your free report count, and whether you have an active subscription.</li>
            <li style={S.li}><strong>Vercel</strong> — hosts our website and application infrastructure.</li>
          </ul>

          <h2 style={S.h2}>4. How long we keep your data</h2>
          <p style={S.p}>
            Your email address and usage count are kept for as long as you use the
            service, so we can recognise you as a free or paying user. If you'd like
            your email and usage data deleted entirely, email us at{" "}
            <a href="mailto:hello@siaprowriter.co.uk" style={S.link}>hello@siaprowriter.co.uk</a>{" "}
            and we'll remove it within 7 days. Report content itself is not retained —
            it exists only for the moment it takes to generate and display your report.
          </p>

          <h2 style={S.h2}>5. Your rights</h2>
          <p style={S.p}>
            Under UK GDPR, you have the right to access, correct, or delete your
            personal data, and to ask what data we hold about you. To exercise any of
            these rights, email <a href="mailto:hello@siaprowriter.co.uk" style={S.link}>hello@siaprowriter.co.uk</a>.
          </p>

          <h2 style={S.h2}>6. Sensitive content in reports</h2>
          <p style={S.p}>
            Because SIA Pro Writer is designed for incident reporting, the notes you
            enter may reference real names, alleged offences, or descriptions of
            physical altercations. You are responsible for ensuring your use of the
            tool complies with your employer's data protection policies and any
            applicable law (such as GDPR) when handling this information. We recommend
            avoiding entering more personal detail than necessary for the report to be
            useful, and always following your organisation's official incident
            reporting and data retention procedures alongside this tool.
          </p>

          <h2 style={S.h2}>7. Changes to this policy</h2>
          <p style={S.p}>
            We may update this policy from time to time. Material changes will be
            reflected on this page with an updated "last updated" date.
          </p>

          <h2 style={S.h2}>8. Contact</h2>
          <p style={S.p}>
            Questions about this policy? Email{" "}
            <a href="mailto:hello@siaprowriter.co.uk" style={S.link}>hello@siaprowriter.co.uk</a>.
          </p>
        </main>

        <footer style={S.footer}>
          <div>© 2025 SIA Pro Writer · Built for security professionals</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/app" style={{ color: "#8b949e" }}>App</Link>
            <Link href="/support" style={{ color: "#8b949e" }}>Support</Link>
            <Link href="/terms" style={{ color: "#8b949e" }}>Terms</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
