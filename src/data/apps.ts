/**
 * Apps built by All Shapes — used as a 3×3 logo grid in the hero.
 * Five Minute Journal sits in the centre (index 4).
 *
 * `icon` is the local path inside /public/apps/. Names match the
 * brand spelling. URLs are the canonical product link.
 */

export type App = {
  name: string;
  url: string;
  icon: string;
};

// Grid is laid out as three columns. Tom asked for an additional "MB"
// tile at the bottom of the middle column so the wall feels like it
// keeps going past the fade — the irregular bottom edge plus the
// edge-fade mask sells the "many more" feel.
//
// COL 0          COL 1                COL 2
// Doctor's K.    Get Closer           Unapp
// Habits         Five Minute Journal  Food Medic
// RNT Pro        Mindful Affirms      MyGearVault
//                MB

export const APPS: App[] = [
  // Column 0
  {
    name: "The Doctor's Kitchen",
    url: "https://apps.apple.com/us/app/the-doctors-kitchen/id1568122827",
    icon: "/apps/doctors-kitchen.png",
  },
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
  // Column 1 — Five Minute Journal central, MB trailing at the bottom
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
    url: "https://allshapes.io",
    icon: "/apps/mb.svg",
  },
  // Column 2
  {
    name: "Unapp",
    url: "https://www.crunchbase.com/organization/unapp",
    icon: "/apps/unapp.svg",
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
];

/** Tile that gets featured styling (Five Minute Journal). */
export const FEATURED_INDEX = 4;
