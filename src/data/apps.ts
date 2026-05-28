/**
 * Apps built by All Shapes — used as a 3×3 logo grid in the hero.
 * Five Minute Journal sits in the centre (index 4).
 *
 * `icon` is the local path inside /public/apps/. Names match the
 * brand spelling. URLs are the canonical product link.
 */

export type App = {
  name: string;
  url?: string;
  icon?: string;
  /** A ghost tile — empty placeholder that suggests "and many more." */
  placeholder?: boolean;
};

// Three vertical columns, 16 tiles total: 10 real + 6 ghosts. The
// ghosts are empty placeholder tiles — they imply "and many more"
// without faking specific apps. Combined with the oversized tilted
// plane in Hero.astro, the half-tiles that bleed off the section
// edge make the wall feel endless. Five Minute Journal anchors the
// centre of column 1.
//
// COL 0 (5)         COL 1 (6)             COL 2 (5)
// Doctor's K.       (ghost top)           (ghost top)
// (ghost)           Get Closer            Unapp
// Habits            Five Minute Journal   Food Medic
// RNT Pro           Mindful Affirms       MyGearVault
// (ghost bottom)    MB                    (ghost)
//                   (ghost bottom)

const G = (): App => ({ name: "ghost", placeholder: true });

export const APPS: App[] = [
  // -- Column 0 --
  {
    name: "The Doctor's Kitchen",
    url: "https://apps.apple.com/us/app/the-doctors-kitchen/id1568122827",
    icon: "/apps/doctors-kitchen.png",
  },
  G(),
  {
    name: "Intelligent Change Habits",
    url: "https://apps.apple.com/us/app/intelligent-change-habits/id1594401415",
    icon: "/apps/habits.png",
  },
  {
    name: "RNT Pro",
    url: "https://apps.apple.com/us/app/rnt-pro/id6444022902",
    icon: "/apps/rnt-pro.png",
  },
  G(),
  // -- Column 1 — FMJ central, MB trailing --
  G(),
  {
    name: "Get Closer",
    url: "https://apps.apple.com/us/app/get-closer-question-games/id1595567160",
    icon: "/apps/get-closer.png",
  },
  {
    name: "Five Minute Journal",
    url: "https://apps.apple.com/us/app/5-minute-journal-daily-diary/id1062945251",
    icon: "/apps/five-minute-journal.png",
  },
  {
    name: "Mindful Daily Affirmations",
    url: "https://apps.apple.com/us/app/mindful-daily-affirmations/id1627457758",
    icon: "/apps/affirmations.png",
  },
  {
    name: "MB",
    icon: "/apps/mb.png",
  },
  G(),
  // -- Column 2 --
  G(),
  {
    name: "Unapp",
    icon: "/apps/unapp.jpeg",
  },
  {
    name: "The Food Medic Hub",
    url: "https://hub.thefoodmedic.co.uk/",
    icon: "/apps/food-medic.png",
  },
  {
    name: "MyGearVault",
    url: "https://apps.apple.com/us/app/mygearvault/id1106860868",
    icon: "/apps/mygearvault.png",
  },
  G(),
];

/** Index in the flat list that gets the featured styling (FMJ). */
export const FEATURED_INDEX = 7;

/** Per-column slicing. APPS is ordered to flow into these directly. */
export const COL_LENGTHS = [5, 6, 5] as const;
