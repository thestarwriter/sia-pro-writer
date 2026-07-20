// pages/support.js
import SeoHead from "../components/SeoHead";
import Link from "next/link";

const S = {
  page: { minHeight: "100vh", background: "#0d1117", color: "#e6edf3", fontFamily: "'Inter', sans-serif" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #21262d", position: "sticky", top: 0, background: "rgba(13,17,23,0.95)", backdropFilter: "blur(8px)", zIndex: 100 },
  navLogo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px" },
  navLogoIcon: { width: 32, height: 32, background: "linear-gradient(135deg, #1f6feb, #388bfd)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  navCta: { padding: "9px 20px", background: "linear-gradient(135deg, #1f6feb, #388bfd)", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" },
  main: { maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" },
  h1: { fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, textAlign: "center" },
  intro: { fontSize: 16, color: "#8b949e", textAlign: "center", marginBottom: 48, lineHeight: 1.6 },
  contactCard: { background: "linear-gradient(135deg, rgba(31,111,235,0.1), rgba(56,139,253,0.06))", border: "1px solid rgba(56,139,253,0.25)", borderRadius: 14, padding: "28px", marginBottom: 48, textAlign: "center" },
  contactTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  contactDesc: { fontSize: 14, color: "#8b949e", marginBottom: 20, lineHeight: 1.6 },
  emailBtn: { display: "inline-block", padding: "12px 24px", background: "linear-gradient(135deg, #1f6feb, #388bfd)", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none" },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: "#388bfd", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" },
  faqItem: { borderBottom: "1px solid #21262d", padding: "22px 0" },
  faqQ: { fontSize: 15, fontWeight: 600, marginBottom: 10, color: "#e6edf3" },
  faqA: { fontSize: 14, color: "#8b949e", lineHeight: 1.7 },
  faqA_link: { color: "#388bfd", textDecoration: "underline" },
  footer: { borderTop: "1px solid #21262d", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#484f58" },
};

const FAQS = [
  {
    q: "How do I cancel my subscription?",
    a: (<>You can cancel anytime through the <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer" style={S.faqA_link}>Lemon Squeezy customer portal</a> — use the same email you subscribed with. Cancellation takes effect at the end of your current billing period, and you won't be charged again.</>),
  },
  {
    q: "I paid but the site still shows me as a free user. What do I do?",
    a: (<>This is usually fixed by clicking "Already subscribed?" in the app and entering the exact email address you used at checkout. If it still doesn't recognise you after a few minutes, email us at <a href="mailto:hello@siaprowriter.co.uk" style={S.faqA_link}>hello@siaprowriter.co.uk</a> and we'll sort it manually — usually within a few hours.</>),
  },
  {
    q: "Can I get a refund?",
    a: "Subscriptions are non-refundable, including partial billing periods. We'd recommend using your 3 free reports first to make sure SIA Pro Writer is right for you before subscribing. You can cancel anytime to stop future billing.",
  },
  {
    q: "How do I update my card details?",
    a: (<>Head to the <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer" style={S.faqA_link}>Lemon Squeezy customer portal</a> and log in with your subscription email — you can update your payment method there directly.</>),
  },
  {
    q: "Is my report data stored or shared anywhere?",
    a: (<>We don't store the content of your notes or reports on our servers after they're generated. Your notes are sent to our AI provider (Anthropic) to generate the report text, but they aren't used to train any models. Full details are in our <a href="/privacy" style={S.faqA_link}>Privacy Policy</a>.</>),
  },
  {
    q: "What counts as a 'report' towards my free limit?",
    a: "Each time you click \"Generate professional report\" and it successfully produces a report, that counts as one use. Editing your notes and regenerating counts as a new report.",
  },
  {
    q: "Can I use this on my phone as well as my laptop?",
    a: "Yes — SIA Pro Writer works in any browser, no app download needed. If you're on the Unlimited plan, just enter the same email on any device to unlock full access.",
  },
  {
    q: "Something's not working / I found a bug. Who do I tell?",
    a: (<>Please email <a href="mailto:hello@siaprowriter.co.uk" style={S.faqA_link}>hello@siaprowriter.co.uk</a> with what happened and, if possible, a screenshot. We read every message and usually reply within 24 hours.</>),
  },
];

export default function Support() {
  return (
    <>
      <SeoHead
        title="Support & FAQ — SIA Pro Writer"
        description="Get help with your SIA Pro Writer subscription, billing, or account. Read frequently asked questions or contact us directly."
        path="/support"
      />

      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={S.navLogo}>
              <div style={S.navLogoIcon}>🛡️</div>
              SIA Pro Writer
            </div>
          </Link>
          <Link href="/app">
            <button style={S.navCta}>Try free →</button>
          </Link>
        </nav>

        <main style={S.main}>
          <h1 style={S.h1}>Support & FAQ</h1>
          <p style={S.intro}>
            Got a question about your subscription, a report, or something not working?
            Here's how to get help.
          </p>

          <div style={S.contactCard}>
            <div style={S.contactTitle}>Need to speak to a human?</div>
            <div style={S.contactDesc}>
              Email us directly — we read every message and typically reply within 24 hours.
            </div>
            <a href="mailto:hello@siaprowriter.co.uk" style={S.emailBtn}>
              ✉️ hello@siaprowriter.co.uk
            </a>
          </div>

          <div style={S.sectionLabel}>Frequently Asked Questions</div>
          <div>
            {FAQS.map((item, i) => (
              <div key={i} style={S.faqItem}>
                <div style={S.faqQ}>{item.q}</div>
                <div style={S.faqA}>{item.a}</div>
              </div>
            ))}
          </div>
        </main>

        <footer style={S.footer}>
          <div>© 2025 SIA Pro Writer · Built for security professionals</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/app" style={{ color: "#8b949e" }}>App</Link>
            <Link href="/privacy" style={{ color: "#8b949e" }}>Privacy</Link>
            <Link href="/terms" style={{ color: "#8b949e" }}>Terms</Link>
            <a href="mailto:hello@siaprowriter.co.uk" style={{ color: "#8b949e" }}>Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}
