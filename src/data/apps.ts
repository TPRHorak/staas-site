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

export const APPS: App[] = [
  // Row 1
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
  // Row 2 — Five Minute Journal in the centre
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
  // Row 3
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

/** Index in the grid that gets featured styling (Five Minute Journal). */
export const FEATURED_INDEX = 4;
