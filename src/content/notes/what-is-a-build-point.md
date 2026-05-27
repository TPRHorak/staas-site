---
title: "What is a build point, really"
slug: "what-is-a-build-point"
author: "Tom Horak"
authorRole: "Co-founder, All Shapes"
authorPhoto: "/team/tom.jpg"
publishedAt: "2026-03-19"
readingTime: "3 min"
excerpt: "Why we don't bill by the hour, and why 'a feature' is the wrong unit. The build point as a contract between scope and reality."
---

We don't bill by the hour. Two reasons.

First, hourly billing aligns the agency to spending more hours. The longer it takes, the more they make. Every founder learns this the second time they hire an agency. Some agencies are honest about it; the incentive is still rotten.

Second, "a feature" is the wrong unit. "Add a paywall" is a sentence. The actual work is: choose a billing provider, design the screen, write the App Store review note, handle restore-purchases, build the entitlement check on every paid feature, write the backend webhook, test the eight failure modes, ship it. One sentence on a roadmap. Two weeks of work.

So we use build points. A build point is roughly half a day of senior engineering work, with AI agents handling the parts they're good at. It's not a perfect unit — no unit is — but it's much closer to the truth than "a feature" or "an hour."

Some calibration:

- A new onboarding screen — usually 1 point.
- A subscription paywall with App Store integration, restore purchases, and three plans — usually 2–3 points.
- A new tab in the app with placeholder content and basic navigation — 1 point.
- A multi-tenant permission system (admins, members, viewers, with proper role-based UI hiding) — 6–8 points.
- A migration from one database to another with zero downtime — 4–6 points and a lot of nerve.
- A redesign of an existing screen with new components — 1–2 points.
- App Store submission with a marketing screenshot pack — 2 points.

A typical month of subscription work runs to a couple of dozen points — enough for 4–8 shipped features, depending on shape. Not "started." Shipped. On staging by Wednesday, on production by Friday or the following Tuesday, used by real users the week after.

Two things to know about how points work in practice.

**They don't roll over.** Unused points expire at the end of the month. This is intentional. We'd rather ship something — even something small — than bank IOUs. If you have a quiet month, pause; we'd rather you do that than feel like you wasted a payment.

**They're a conversation, not a contract.** If a feature looks like 3 points at the start of the sprint and turns out to be 5, we tell you on Tuesday, not on Friday. You decide whether to drop scope, pull from next sprint, or rescope. We've never had this conversation go badly, because nobody likes a surprise invoice and we know it.

The build point isn't a perfect unit. But it makes scope conversations honest, and honesty is most of what's missing in this industry.
