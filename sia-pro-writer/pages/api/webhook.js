// pages/api/webhook.js
// Lemon Squeezy calls this URL when someone subscribes or cancels.
// Set this as your webhook URL in Lemon Squeezy dashboard:
// https://your-domain.com/api/webhook

import crypto from "crypto";

// Simple in-memory paid users store.
// In production, use Vercel KV or a database.
export const paidEmails = new Set();

function verifySignature(rawBody, signature) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return hmac === signature;
}

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody = await getRawBody(req);
  const signature = req.headers["x-signature"];

  if (!verifySignature(rawBody, signature)) {
    console.warn("Invalid webhook signature");
    return res.status(401).json({ error: "Invalid signature" });
  }

  const event = JSON.parse(rawBody.toString());
  const eventName = event.meta?.event_name;
  const email = event.data?.attributes?.user_email;

  console.log(`Webhook received: ${eventName} for ${email}`);

  if (
    eventName === "subscription_created" ||
    eventName === "subscription_resumed" ||
    eventName === "order_created"
  ) {
    if (email) paidEmails.add(email.toLowerCase());
  }

  if (
    eventName === "subscription_cancelled" ||
    eventName === "subscription_expired"
  ) {
    if (email) paidEmails.delete(email.toLowerCase());
  }

  res.status(200).json({ received: true });
}
