/**
 * H7 — Five named sprints, grouped Design / Strategy / Build.
 *
 * Each has a single founder-voice anchor ("for the founder who says…") plus
 * a short list of "also for" scenarios so the visitor sees that the sprint
 * covers retention / engagement / scale, not just one narrow conversion
 * outcome.
 *
 * Uniform pricing — €6,250 per sprint.
 */

export type Sprint = {
  /** internal id used for form value + URL anchors */
  id: string;
  /** the bucket label */
  bucket: "Design" | "Strategy" | "Build";
  /** the public-facing punchy name */
  name: string;
  /** the primary founder-voice anchor sentence */
  anchor: string;
  /** other founder moments this sprint covers — keeps the offer broad */
  alsoFor: string[];
  /** what a founder walks away with */
  deliverables: string[];
};

export const SPRINTS: Sprint[] = [
  {
    id: "investor-ready",
    bucket: "Design",
    name: "Investor-Ready in Two Weeks",
    anchor: "I need something to show investors next month.",
    alsoFor: [
      "Closing a strategic hire who needs to see the product",
      "Validating a pivot before you commit the team",
      "Getting your board behind a new direction",
    ],
    deliverables: [
      "Clickable prototype that holds up under questioning",
      "Investor-ready one-pager / narrative",
      "Buildable roadmap they can read in five minutes",
    ],
  },
  {
    id: "quick-wins",
    bucket: "Design",
    name: "Quick Wins Audit",
    anchor: "The metric I care about is stuck, and I don't know why.",
    alsoFor: [
      "Conversion that won't move",
      "Retention dropping after week one",
      "Onboarding friction you can feel but can't pinpoint",
      "Drop-offs at a specific step in the funnel",
    ],
    deliverables: [
      "Heuristic + data audit of the friction points",
      "3–5 prioritised fixes, designed and ready to ship",
      "A short brief any engineering team could pick up",
    ],
  },
  {
    id: "roadmap",
    bucket: "Strategy",
    name: "The Roadmap Sprint",
    anchor: "I have customers — I don't know which feedback to act on.",
    alsoFor: [
      "Deciding what to build next when everything feels urgent",
      "Prioritising a year of work for an investor or board",
      "Settling internal debate about direction",
      "Aligning a team that's pulling in three directions",
    ],
    deliverables: [
      "User-research synthesis from interviews and existing data",
      "A written, prioritised 3-month roadmap stakeholders can act on",
      "A clear story for why this, not that",
    ],
  },
  {
    id: "hero-feature",
    bucket: "Build",
    name: "Ship the Hero Feature",
    anchor: "I know what to build, I just don't have the team to ship it.",
    alsoFor: [
      "Hitting a launch deadline you can't move",
      "Building the feature that justifies the next pricing tier",
      "Improving retention with one well-designed change",
      "Getting one thing right that everything else depends on",
    ],
    deliverables: [
      "One end-to-end feature designed and shipped to production",
      "Real users on it inside two weeks",
      "Clean code your team (or ours) can keep building on",
    ],
  },
  {
    id: "prototype-to-production",
    bucket: "Build",
    name: "Make the Prototype Real",
    anchor: "I've vibe-coded a prototype and it's falling over.",
    alsoFor: [
      "Turning a Lovable / Cursor / v0 prototype into something real users can use",
      "Hardening auth, data, or payments before you take live customers",
      "Getting your prototype past technical due diligence",
      "Adding the scale and security the prototype skipped",
    ],
    deliverables: [
      "One critical end-to-end flow hardened to production quality",
      "Auth, data, and payments wired safely",
      "A migration plan for the rest of the prototype",
    ],
  },
];

export const PRICE_PER_SPRINT = "€6,250";
export const SPRINT_DURATION = "two weeks";
