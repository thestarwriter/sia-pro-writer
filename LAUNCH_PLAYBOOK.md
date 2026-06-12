# SIA Pro Writer — Launch Playbook
*Your complete guide from code to paying customers*

---

## PART 1: DEPLOYMENT (GitHub + Vercel)
*Estimated time: 30–45 minutes*

### Step 1 — Create a GitHub repository

1. Go to https://github.com and sign in (or create a free account)
2. Click **New repository**
3. Name it `sia-pro-writer`
4. Set it to **Private**
5. Click **Create repository**

### Step 2 — Push your code to GitHub

Open Terminal (Mac) or Command Prompt (Windows) in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sia-pro-writer.git
git push -u origin main
```

### Step 3 — Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Select your `sia-pro-writer` repository
4. Click **Deploy** (Vercel auto-detects Next.js)
5. Your site goes live at `https://sia-pro-writer.vercel.app`

### Step 4 — Add environment variables in Vercel

In your Vercel project dashboard:
1. Go to **Settings → Environment Variables**
2. Add these one by one:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your key from console.anthropic.com |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | From Lemon Squeezy dashboard |
| `NEXT_PUBLIC_LEMON_SQUEEZY_URL` | Your checkout link (see Part 2) |

3. Click **Redeploy** after adding variables

### Step 5 — Custom domain (optional but recommended)

1. Buy `siaprowriter.co.uk` at Namecheap (~£10/yr)
2. In Vercel: **Settings → Domains → Add Domain**
3. Follow the DNS instructions Vercel gives you
4. SSL is automatic

---

## PART 2: SET UP PAYMENTS (Lemon Squeezy)
*Estimated time: 20 minutes*

Lemon Squeezy handles payments, VAT, and subscriptions. Free to set up.

### Step 1 — Create your store

1. Go to https://app.lemonsqueezy.com and create an account
2. Click **Create a store**
3. Store name: `SIA Pro Writer`
4. Store URL: `siaprowriter`

### Step 2 — Create your product

1. **Products → New Product**
2. Name: `SIA Pro Writer Pro`
3. Description: `Unlimited AI-powered security reports. Cancel anytime.`
4. Type: **Subscription**
5. Price: **£4.99/month**
6. Click **Save**

### Step 3 — Get your checkout link

1. Click on your product → **Variants**
2. Copy the **Checkout URL** — it looks like:
   `https://your-store.lemonsqueezy.com/checkout/buy/VARIANT_ID`
3. Add this as `NEXT_PUBLIC_LEMON_SQUEEZY_URL` in Vercel

### Step 4 — Set up webhook

1. In Lemon Squeezy: **Settings → Webhooks → Add webhook**
2. URL: `https://your-domain.com/api/webhook`
3. Events to select:
   - `subscription_created`
   - `subscription_cancelled`
   - `subscription_expired`
   - `order_created`
4. Copy the **Signing Secret** → add as `LEMON_SQUEEZY_WEBHOOK_SECRET` in Vercel

---

## PART 3: LAUNCH COPY
*Ready to copy-paste*

---

### Facebook Group Post
*(Post in: SIA Door Staff UK, Security Industry Workers UK, Door Supervisors Network)*

---

**Finally made a thing I wish existed when I started in security 👇**

Any of you dread writing up incident reports at the end of a long shift?

I built a free tool that turns your rough notes into a proper professional report in about 10 seconds flat.

You just type what happened — as rough as you like — and it spits out a report that looks like you've been writing them for 20 years. Incident reports, handover notes, refusal of entry, ejections, suspicious activity — all covered.

Completely free to try (3 reports, no card needed).

🔗 siaprowriter.co.uk

Would love to know what you think — especially if anything could be improved for how you actually work on the door.

---

### Reddit Post
*(r/securityguards, r/SIA)*

**Title: Built a free tool for security officers who hate writing reports**

Long story short — I've worked in security and couldn't find anything built specifically for SIA-licensed staff when it came to report writing.

So I built one. You paste in your rough notes and it generates a proper formal report — incident reports, handover logs, refusals, ejections, suspicious activity.

The language is appropriate for police submissions and management review. There's also a "quality score" so you can see how complete your report is before you submit it.

It's free to try at **siaprowriter.co.uk** (3 reports, no sign-up needed).

Feedback very welcome — especially from people who write these every shift.

---

### LinkedIn Post

**I built a tool for security officers. Here's why.**

I've spent time working alongside door supervisors and security managers, and one thing always stood out: the gap between how good someone is at the actual job, and how professional their paperwork looks.

Incident reports that took 30 minutes to write and still didn't hold up. Handover notes that missed crucial details. Refusal records that wouldn't stand up if challenged.

It's not a skills problem. It's a writing problem.

So I built SIA Pro Writer — an AI tool that turns rough notes into professional, legally-appropriate security reports in seconds. Incident reports, handover logs, refusal records, ejection reports, suspicious activity reports.

Free to try. No account needed.

If you work in or alongside the security industry — I'd love your thoughts.

🔗 siaprowriter.co.uk

#SecurityIndustry #SIA #DoorSupervisor #SecurityManagement

---

### WhatsApp Message
*(Send to any security industry contacts)*

Oi, made something you might find useful — free tool that writes proper professional incident reports from your rough notes. No more staying late writing up. Try it free at siaprowriter.co.uk

---

## PART 4: REVENUE PROJECTIONS

| Subscribers | Monthly Revenue |
|-------------|----------------|
| 50 | £250 |
| 100 | £499 |
| 200 | £998 |
| 500 | £2,495 |

**The security industry in the UK has ~400,000 SIA-licensed individuals.**
Even 0.1% = 400 subscribers = ~£2,000/month. 

---

## PART 5: GROWTH LEVERS (after launch)

1. **SEO** — Target "incident report template security" (high volume, low competition)
2. **YouTube** — 60-second demo video posted in security groups
3. **Affiliate programme** — Pay security trainers 30% for referrals
4. **B2B** — Pitch to security companies for team licences at £20–50/month
5. **Integrations** — Add PDF export, then charge for it

---

*Good luck, Navin. You've got the insider knowledge that most SaaS builders don't — use it.*
