import { isPaidEmail, getFreeUsage } from "./webhook";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required." });
  }

  const normalized = email.trim().toLowerCase();
  const [isPaid, freeUsage] = await Promise.all([
    isPaidEmail(normalized),
    getFreeUsage(normalized),
  ]);

  return res.status(200).json({ isPaid, freeUsage });
}
