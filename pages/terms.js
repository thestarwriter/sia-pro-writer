// pages/terms.js
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

export default function Terms() {
  return (
    <>
      <SeoHead
        title="Terms of Service — SIA Pro Writer"
        description="The terms governing your use of SIA Pro Writer, including subscriptions and acceptable use."
        path="/terms"
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
          <h1 style={S.h1}>Terms of Service</h1>
          <p style={S.updated}>Last updated: 20 July 2026</p>

          <p style={S.p}>
            These terms govern your use of SIA Pro Writer (siaprowriter.co.uk). By using
            the site or app, you agree to these terms. If you don't agree, please don't
            use the service.
          </p>

          <h2 style={S.h2}>1. What SIA Pro Writer does</h2>
          <p style={S.p}>
            SIA Pro Writer is an AI-assisted writing tool that helps you turn rough
            notes into formal, professionally worded report drafts (such as incident
            reports, handover logs, and related documents). It is a drafting aid, not
            a substitute for your professional judgement.
          </p>

          <h2 style={S.h2}>2. You are responsible for your reports</h2>
          <p style={S.p}>
            SIA Pro Writer generates a draft based on the information you provide. You
            are solely responsible for:
          </p>
          <ul style={S.ul}>
            <li style={S.li}>Checking the accuracy of any report before submitting it to your employer, a client, the police, or any other party.</li>
            <li style={S.li}>Ensuring the report meets your employer's specific policies, procedures, and format requirements.</li>
            <li style={S.li}>Ensuring the content is truthful and accurately reflects what actually happened.</li>
            <li style={S.li}>Complying with all legal and regulatory obligations relevant to your role, including data protection law when handling personal information about others.</li>
          </ul>
          <p style={S.p}>
            SIA Pro Writer is a drafting tool only. We do not verify, and cannot
            guarantee, the factual accuracy, completeness, or legal sufficiency of any
            generated report. Reports should always be reviewed by you before use.
          </p>

          <h2 style={S.h2}>3. Free tier and subscriptions</h2>
          <ul style={S.ul}>
            <li style={S.li}>New users receive 3 free report generations, tracked against the email address provided.</li>
            <li style={S.li}>The paid "Unlimited" subscription is billed monthly at the price shown at checkout, and can be cancelled at any time via the Lemon Squeezy customer portal.</li>
            <li style={S.li}>Cancelling stops future billing; you'll retain access until the end of the current billing period.</li>
            <li style={S.li}>We reserve the right to apply fair-use limits to the "Unlimited" tier if usage patterns indicate abuse or resale of access (for example, sharing a single subscription across many people). We'll always contact you first if this affects your account.</li>
          </ul>

          <h2 style={S.h2}>4. No refunds</h2>
          <p style={S.p}>
            All payments are final and non-refundable, including partial billing
            periods where you cancel part-way through the month. Cancelling stops
            future billing, but does not entitle you to a refund for the current or
            any prior billing period. Please make use of the 3 free reports to
            confirm the service meets your needs before subscribing.
          </p>

          <h2 style={S.h2}>5. Acceptable use</h2>
          <p style={S.p}>You agree not to:</p>
          <ul style={S.ul}>
            <li style={S.li}>Use the service to generate false or intentionally misleading reports.</li>
            <li style={S.li}>Attempt to circumvent free-tier limits through automated means, multiple fake accounts, or similar abuse.</li>
            <li style={S.li}>Share a paid subscription's login/email with people who have not themselves subscribed, beyond ordinary personal use.</li>
            <li style={S.li}>Use the service for any unlawful purpose.</li>
          </ul>

          <h2 style={S.h2}>6. Service availability</h2>
          <p style={S.p}>
            We aim to keep SIA Pro Writer available and reliable, but as a small,
            independently run service we cannot guarantee uninterrupted uptime. We are
            not liable for any loss arising from temporary unavailability of the
            service.
          </p>

          <h2 style={S.h2}>7. Limitation of liability</h2>
          <p style={S.p}>
            SIA Pro Writer is provided "as is." To the fullest extent permitted by
            law, we are not liable for any indirect, incidental, or consequential
            loss arising from your use of the service, including but not limited to
            any consequences arising from reliance on a generated report without your
            own review. Nothing in these terms limits liability for death, personal
            injury caused by negligence, or fraud, where such limitation would be
            unlawful.
          </p>

          <h2 style={S.h2}>8. Changes to the service or these terms</h2>
          <p style={S.p}>
            We may update these terms or change the service (including pricing and
            features) from time to time. Continued use after changes are posted means
            you accept the updated terms.
          </p>

          <h2 style={S.h2}>9. Governing law</h2>
          <p style={S.p}>
            These terms are governed by the laws of England and Wales.
          </p>

          <h2 style={S.h2}>10. Contact</h2>
          <p style={S.p}>
            Questions about these terms? Email{" "}
            <a href="mailto:hello@siaprowriter.co.uk" style={S.link}>hello@siaprowriter.co.uk</a>.
          </p>
        </main>

        <footer style={S.footer}>
          <div>© 2025 SIA Pro Writer · Built for security professionals</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/app" style={{ color: "#8b949e" }}>App</Link>
            <Link href="/support" style={{ color: "#8b949e" }}>Support</Link>
            <Link href="/privacy" style={{ color: "#8b949e" }}>Privacy</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
