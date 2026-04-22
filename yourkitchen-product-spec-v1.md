# YourKitchen — Product Spec v1.0
**Founder:** Marques Moore  
**Date:** April 2025  
**Launch Target:** July 2026  
**Stack:** Next.js · Supabase · Vercel · Stripe Connect · Twilio · DoorDash Drive API

---

## 1. Product Vision

YourKitchen is a meal coordination platform that enables a family's personal support network — their "village" — to send home-delivered meals from restaurants the family loves. The recipient confirms each delivery via SMS with a simple Y or N. DoorDash handles fulfillment.

**Tagline:** *Your kitchen, covered.*

**Origin:** Built for Danielle Moore, whose husband Marques leaves for graduate school in July 2026, leaving her home in Waller, TX with two young kids and a new baby due June 2026.

---

## 2. Target Users

### MVP Launch (July 2026)
| User Type | Trigger | Need |
|-----------|---------|------|
| New parents | New baby, hectic life | Nutritious meals, time saved, stress reduced |
| Military deployment spouses | Spouse activated | Support during solo parenting |
| Short/long-term health needs | Illness, surgery, treatment | Meals when self-care is impossible |
| Grief & bereavement | Death in family | Community support during loss |

### Post-Launch Roadmap
- College students (parents sending care meals)
- Self users (pre-planning personal meal deliveries)
- Home health aides / hospitals (B2B)
- Nonprofits (food insecurity, financial stress)

---

## 3. Roles

| Role | Description |
|------|-------------|
| **Organizer** | Creates the Kitchen. Can be the recipient or someone acting on their behalf. |
| **Recipient** | The family receiving meals. Must accept the Kitchen if they didn't create it. Owns Y/N confirmation by default. |
| **Coordinator** | A friend or family member who claims a date and sends a meal. Can be a guest (no account required). |
| **Confirmation Proxy** | A trusted person (spouse, parent, relative) delegated by the recipient to confirm meals on their behalf. Set in Kitchen settings. |

---

## 4. Tiers & Pricing

| Feature | Free Trial (Days 1–30) | Free (Day 31+) | Care+ ($9.99/mo) | Premium (future) |
|---------|----------------------|----------------|------------------|-----------------|
| Calendar duration | Full | 60 days | 12 months | Perpetual |
| Restaurants | 5 | 2 | 5 | Unlimited |
| Notifications | SMS + Push | Push only | SMS + Push | SMS + Push |
| Date adoption | ✅ | ✅ | ✅ | ✅ |
| Social share | ✅ | ✅ | ✅ | ✅ |

**Platform fee:** 3% on all transactions across all tiers.  
**Trial conversion trigger:** Day 25 SMS — *"Your SMS notifications expire in 5 days — upgrade to Care+ to keep them."*

---

## 5. Core Flows

### 5.1 Kitchen Creation (Organizer)

1. Organizer signs up / logs in
2. Enters recipient details: name, delivery address, household size, dietary restrictions
3. Selects restaurants (up to tier limit; can swap anytime)
4. Picks favorite menu items from each restaurant
5. Sets calendar dates and preferred delivery window
6. System auto-generates a slug from recipient name (e.g. `danielle-moore`)
   - Organizer can edit slug **once** before Kitchen goes live
   - Slug locks permanently upon activation
7. If organizer ≠ recipient → system sends recipient an SMS/email invite

### 5.2 Kitchen Acceptance (Recipient)

1. Recipient receives SMS/email: *"[Name] set up a Kitchen for you. Tap to review and accept."*
2. Recipient reviews: address, dietary restrictions, restaurants, calendar
3. Recipient accepts → Kitchen status changes to `active` → share link activates
4. If recipient does not accept → reminders sent at intervals → Kitchen stays locked
5. Recipient can delegate confirmation to a Confirmation Proxy in settings

### 5.3 Kitchen Share

Three share methods available to recipient and organizer:

- **Direct link** — `yourkitchen.app/k/[slug]` — shareable anywhere
- **Social share** — one-tap post to Facebook, Instagram, iMessage with pre-written copy
- **Mass contact invite** — upload or manually enter contacts; system sends personalized SMS/email invite

### 5.4 Date Claiming (Coordinator)

Three claim types:

| Type | Description |
|------|-------------|
| **One-time** | Claim any single available date |
| **Recurring (Date Adoption)** | Adopt a repeating slot (e.g. "the 5th of every month", weekly) |
| **14-day window** | Browse and claim any open date within the next two weeks |

**Calendar view:** Monthly view showing all dates as `available`, `claimed`, `confirmed`, or `not_needed`.

**Guest coordinators:** No account required to claim a date. Coordinators provide name, email, and payment method only. After sending their first meal, they receive a low-pressure account creation nudge via email.

**Claim recovery:**
- If coordinator claims a date but meal is not confirmed within a 4–5 hour window → date returns to `available`
- Village receives push notification: *"A dinner slot just opened on [Recipient]'s Kitchen — tap to claim it"*

**Recurring date auto-generation:**
- System auto-generates `calendar_date` rows on a rolling basis
- Free tier: 60 days ahead
- Care+: 12 months ahead

### 5.5 Meal Proposal (Coordinator)

1. Coordinator opens Kitchen link
2. Selects an available date
3. Selects a restaurant from recipient's approved list
4. Selects a menu item (recipient's favorites are starred)
5. Optionally adds a personal note
6. Submits proposal — **no charge fires yet**
7. Recipient (or Proxy) receives SMS + in-app notification

### 5.6 Meal Confirmation (Recipient / Proxy)

1. Recipient receives SMS: *"[Name] wants to send you dinner on [date] — [meal] from [restaurant]. Reply Y to confirm or N to decline."*
2. **Y → confirmed:**
   - Coordinator's card is charged
   - Order fires to DoorDash Drive API
   - Both parties receive SMS confirmation with DoorDash tracking link
3. **N → declined:**
   - Recipient sees default decline messages or writes custom message (like call decline screen)
   - Default options: *"We're going out tonight"* / *"We already have dinner covered"* / *"Can you try a different date?"*
   - No charge. Coordinator is notified with the decline message.
   - Date returns to `available` on the calendar

### 5.7 Order Lifecycle

```
Proposal submitted
  → Recipient confirms (Y)
    → Stripe charges coordinator's card
      → DoorDash Drive API order placed
        → Restaurant receives order
          → Dasher assigned
            → Pickup → In transit → Delivered
              → SMS confirmation to both parties
              → Coordinator thank-you notification
```

---

## 6. Notifications

| Event | Free Tier | Care+ |
|-------|-----------|-------|
| Meal proposed | Push | SMS + Push |
| Meal confirmed | Push | SMS + Push |
| Meal declined | Push | SMS + Push |
| Date claimed | Push | SMS + Push |
| Date released (slot reopened) | Push | SMS + Push |
| Village slot available | Push | SMS + Push |
| Trial expiring (day 25) | SMS + Push | — |
| Kitchen invite | SMS + Email | SMS + Email |

**SMS provider:** Twilio  
**Push provider:** To be determined (Expo for mobile / web push for PWA)

---

## 7. Kitchen Settings

| Setting | Description |
|---------|-------------|
| Confirmation Proxy | Delegate Y/N confirmation to a trusted person |
| Delivery window | Preferred delivery time range (e.g. 5:30–7:00 PM) |
| Dietary restrictions | Allergies and preferences shown to coordinators |
| Restaurant management | Add/remove restaurants (up to tier limit) |
| Favorite items | Mark preferred menu items per restaurant |
| Notifications | Manage push and SMS preferences |
| Calendar | Mark dates as `not_needed`, add new open dates |

---

## 8. Payment Model

- **Coordinator pays** for each meal at confirmation
- **Platform fee:** 3% retained by YourKitchen on every order
- **Stripe Connect** handles all payment processing
- **Guest coordinators:** Card saved at claim time via Stripe, charged only on Y confirmation
- **No charge ever fires** until recipient hits Y

---

## 9. Restaurants (MVP)

For MVP launch, YourKitchen will hardcode 5–8 restaurants in the Houston / Waller, TX area connected via DoorDash Drive. National chain expansion and broader DoorDash restaurant catalog access planned for post-launch.

**Restaurant-to-day-of-week mapping:** Roadmap item for Care+ tier post-MVP (e.g. "pizza Fridays"). Not in MVP scope.

---

## 10. Tech Stack

| Layer | Tool |
|-------|------|
| Frontend / App | Next.js (App Router) |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS) |
| Hosting | Vercel |
| Payments | Stripe Connect |
| SMS | Twilio |
| Delivery | DoorDash Drive API v2 (Node.js SDK) |
| Analytics | PostHog (free tier) |
| Email | Resend |
| Domain | yourkitchen.app |

---

## 11. Database Tables (Summary)

| Table | Purpose |
|-------|---------|
| `profiles` | Registered user accounts |
| `guest_coordinators` | Coordinators who act without an account |
| `kitchens` | The central entity — one per family in need |
| `kitchen_restaurants` | Restaurants attached to a Kitchen |
| `menu_items` | Recipient's saved favorites |
| `calendar_dates` | Every date slot on the Kitchen calendar |
| `claims` | Coordinator's claim on a date (one-time or recurring) |
| `meal_proposals` | Coordinator's meal selection awaiting Y/N |
| `orders` | Confirmed orders — Stripe + DoorDash records |
| `subscriptions` | Tier management per Kitchen |
| `notifications` | Full log of every push, SMS, and email sent |

---

## 12. Out of Scope for MVP

- Grocery delivery (Instacart / DoorDash grocery)
- Self-use ordering (no coordinator)
- Restaurant-to-day-of-week preferences
- B2B hospital / nonprofit accounts
- College student use case
- International / non-US delivery
- Native mobile app (PWA first)

---

## 13. Success Metrics (Launch)

| Milestone | Target Date |
|-----------|-------------|
| Full end-to-end order in staging | July 4, 2026 |
| Danielle's Kitchen live | July 8, 2026 |
| App public launch | July 28, 2026 |
| 10 active Kitchens | August 8, 2026 |
| First non-family order | August 2026 |
| $500 GMV | August 15, 2026 |
| $1K MRR · 50 active Kitchens | December 2026 |
| $1M ARR | 2027 |

---

*Built by Marques Moore · yourkitchen.app · marques@yourkitchen.app*  
*"Your kitchen, covered."*
