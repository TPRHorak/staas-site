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

// Two rows of five — laid out so FMJ sits in row 1, position 3 (centre).
// Surrounded by the apps with the strongest visual identity so the wall
// reads well at small tile size.
//
// Row 1: TDK     · Habits  · FMJ ★   · Affirms  · Get Closer
// Row 2: RNT Pro · Unapp   · MGV     · Food Med · MB

export const APPS: App[] = [
  // Row 1
  {
    name: "The Doctor's Kitchen",
    icon: "/apps/doctors-kitchen.png",
  },
  {
    name: "Intelligent Change Habits",
    icon: "/apps/habits.png",
  },
  {
    name: "Five Minute Journal",
    icon: "/apps/five-minute-journal.png",
  },
  {
    name: "Mindful Daily Affirmations",
    icon: "/apps/affirmations.png",
  },
  {
    name: "Get Closer",
    icon: "/apps/get-closer.png",
  },
  // Row 2
  {
    name: "RNT Pro",
    icon: "/apps/rnt-pro.png",
  },
  {
    name: "Unapp",
    icon: "/apps/unapp.jpeg",
  },
  {
    name: "MyGearVault",
    icon: "/apps/mygearvault.png",
  },
  {
    name: "The Food Medic Hub",
    icon: "/apps/food-medic.png",
  },
  {
    name: "MB",
    icon: "/apps/mb.png",
  },
];

/** Position of the featured tile (FMJ) in the flat list — row 1, col 3. */
export const FEATURED_INDEX = 2;
