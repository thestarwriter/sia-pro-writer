# Setting Up Paid Access (Email Unlock)

This adds a simple "enter your email" system so paying customers get
unlimited reports, while free users stay limited to 3/month.

## How it works (plain English)

1. A free user generates 3 reports → sees an upgrade popup
2. They enter their email and click "Upgrade now" → goes to Lemon Squeezy checkout
3. After payment, Lemon Squeezy tells our server (via webhook) that this email has paid
4. Next time they visit, they click "Already subscribed?" → type their email → unlimited unlocked
5. Their email is saved in the browser so they don't have to re-enter it each time

## Setup: Upstash Redis (free database — no credit card needed)

### Step 1 — Create an Upstash account

1. Go to **upstash.com** → sign up (free, can use Google login)
2. Click **Create Database**
3. Name: `sia-pro-writer`
4. Type: **Regional**
5. Region: `eu-west-1` (closest to UK)
6. Click **Create**

### Step 2 — Get your connection details

1. On your new database page, scroll to **REST API** section
2. You'll see two values — copy both:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 3 — Add to Vercel

1. Go to Vercel → your project → **Settings → Environment Variables**
2. Add two new variables:
   - **Key:** `UPSTASH_REDIS_REST_URL` → **Value:** (paste from Upstash)
   - **Key:** `UPSTASH_REDIS_REST_TOKEN` → **Value:** (paste from Upstash)
3. Save, then go to **Deployments → Redeploy**

## Testing it yourself (without paying)

1. Go to Upstash → your database → **CLI** tab
2. Type this command (replace with your email):
   ```
   SET paid:youremail@example.com 1
   ```
3. Press Enter
4. On the live site, click "Already subscribed?" → enter that email
5. You should see "✓ Unlimited" appear in the header

## Known limitation

There's no password — the system trusts whatever email someone types.
This is fine for a small niche launch. If abuse becomes an issue later,
we can add email verification (we send a link to their inbox to confirm).
That's a "nice problem to have" — it means you have paying customers!
