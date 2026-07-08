import { isPaidEmail, getFreeUsage, incrementFreeUsage } from "./webhook";

const SYSTEM_PROMPTS = {
  incident: `You are an expert security report writer. Convert the rough notes below into a formal, professional Incident Report. Use clear paragraphs with these sections: INCIDENT DETAILS, DESCRIPTION OF EVENTS, ACTIONS TAKEN, OUTCOME. Use past tense, third person where appropriate, precise language. Include Officer Name, Date/Time, Location if provided. Keep it factual, legally appropriate, and professional — suitable for submission to management or police.`,
  handover: `You are an expert security report writer. Convert the rough notes into a formal Handover / Daily Occurrence Log. Structure it clearly with: SHIFT SUMMARY, KEY EVENTS, MAINTENANCE/EQUIPMENT NOTES, ACTIONS OUTSTANDING. Professional tone, concise but complete, suitable for the incoming shift officer.`,
  refusal: `You are an expert security report writer. Convert the rough notes into a formal Refusal of Entry Record. Sections: SUBJECT DESCRIPTION, REASON FOR REFUSAL, BEHAVIOUR OBSERVED, ACTIONS TAKEN, OUTCOME. Factual, legally defensible language — could be used as evidence if challenged.`,
  ejection: `You are an expert security report writer. Convert the rough notes into a formal Ejection Report. Sections: SUBJECT DESCRIPTION, REASON FOR EJECTION, EVENTS LEADING TO EJECTION, EJECTION PROCEDURE FOLLOWED, OUTCOME. Use of force (if any) must be described proportionally and factually.`,
  suspicious: `You are an expert security report writer. Convert the rough notes into a formal Suspicious Activity Report. Sections: SUBJECT/VEHICLE DESCRIPTION, BEHAVIOUR OBSERVED, DURATION AND LOCATION, ACTIONS TAKEN, REFERRALS MADE. Objective language, no assumptions — just observable facts.`,
};

const FREE_LIMIT = 3;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { roughNotes, reportType, officerName, location, dateTime, email } = req.body;

  if (!roughNotes?.trim()) return res.status(400).json({ error: "Rough notes are required." });
  if (!SYSTEM_PROMPTS[reportType]) return res.status(400).json({ error: "Invalid report type." });
  if (!email?.trim()) return res.status(400).json({ error: "Email is required." });

  const normalizedEmail = email.trim().toLowerCase();

  // Check paid status first
  const isPaid = await isPaidEmail(normalizedEmail);

  // If not paid, check and enforce free limit via Upstash
  if (!isPaid) {
    const used = await getFreeUsage(normalizedEmail);
    if (used >= FREE_LIMIT) {
      return res.status(402).json({
        error: "free_limit_reached",
        message: `You've used your ${FREE_LIMIT} free reports. Upgrade to Unlimited for unlimited reports.`,
      });
    }
    // Increment usage before generating (prevents abuse on slow connections)
    await incrementFreeUsage(normalizedEmail);
  }

  const meta = [
    officerName && `Officer: ${officerName}`,
    location && `Location: ${location}`,
    dateTime && `Date/Time: ${dateTime}`,
  ].filter(Boolean).join(" | ");

  const userContent = `${meta ? meta + "\n\n" : ""}Rough notes:\n${roughNotes}`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        stream: true,
        system: SYSTEM_PROMPTS[reportType],
        messages: [{ role: "user", content: userContent }],
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "AI service error. Please try again." });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = anthropicRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value));
    }

    res.end();
  } catch (err) {
    console.error("Generate error:", err);
    if (!res.headersSent) res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
