// pages/api/webhook.js
import crypto from "crypto";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function addPaidEmail(email) {
  await fetch(`${REDIS_URL}/set/paid:${encodeURIComponent(email)}/1`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
}

export async function removePaidEmail(email) {
  await fetch(`${REDIS_URL}/del/paid:${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
}

export async function isPaidEmail(email) {
  const res = await fetch(`${REDIS_URL}/get/paid:${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result === "1";
}

function verifySignature(rawBody, signature) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  const hmac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return hmac === signature;
}

export const config = { api: { bodyParser: false } };

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

  if (["subscription_created", "subscription_resumed", "order_created"].includes(eventName)) {
    if (email) await addPaidEmail(email.toLowerCase());
  }

  if (["subscription_cancelled", "subscription_expired"].includes(eventName)) {
    if (email) await removePaidEmail(email.toLowerCase());
  }

  res.status(200).json({ received: true });
}
