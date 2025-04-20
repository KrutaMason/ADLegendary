import { DC } from "../../constants";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    label: "Beginner's Infinity",
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "reach Infinity for the first time outside of a challenge."
        : "reach Infinity for the first time.";
    },
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(1).uniqueName}` : "1st Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(1).uniqueName}` : "1st Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 2,
    label: "Aggregational Confinement",
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => "buying Antimatter Dimensions or Tickspeed upgrades halts production of all Antimatter Dimensions. " +
      `Production gradually returns to normal over ${formatInt(3)} minutes.`,
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(2).uniqueName}` : "2nd Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(2).uniqueName}` : "2nd Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 3,
    label: "Primal Acceleration",
    legacyId: 3,
    isQuickResettable: false,
    description: 
      () => `the ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(1).uniqueName}`
       : "1st Antimatter Dimension"} is heavily weakened, but gets an uncapped exponentially increasing multiplier. 
      This multiplier resets after Dimension Boosts and Antimatter Galaxies.`,
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(3).uniqueName}` : "3rd Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(3).uniqueName}` : "3rd Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 4,
    label: "Polynomial Bloodbath",
    legacyId: 8,
    isQuickResettable: false,
    description: "buying an Antimatter Dimension automatically erases all lower tier Antimatter Dimensions, " +
      "like a sacrifice without the boost.",
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(4).uniqueName}` : "4th Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(4).uniqueName}` : "4th Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 5,
    label: "Chronial Moribund",
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `the Tickspeed purchase multiplier starts at ${formatX(1.080, 0, 3)} instead of ${formatX(1.1245, 0, 3)}.`,
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(5).uniqueName}` : "5th Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(5).uniqueName}` : "5th Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 6,
    label: "Interdimensional Exchange",
    legacyId: 10,
    isQuickResettable: false,
    description: () => `upgrading each Antimatter Dimension costs the Antimatter Dimension ${formatInt(2)} tiers ` +
      "below it instead of antimatter. Antimatter Dimension prices are modified.",
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(6).uniqueName}` : "6th Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(6).uniqueName}` : "6th Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 7,
    label: "Expanding Modulation",
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `the multiplier from buying ${formatInt(10)} Antimatter Dimensions is reduced to ${formatX(1)}. This increases by
        ${formatX(0.2, 1, 1)} per Dimension Boost, to a maximum of ${formatX(2)}, and is unaffected by any upgrades.`,
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(7).uniqueName}` : "7th Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(7).uniqueName}` : "7th Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 8,
    label: "Blind Slaughter",
    legacyId: 11,
    isQuickResettable: false,
    description: `Dimension Boosts provide no multiplier and Antimatter Galaxies cannot be bought. Dimensional
      Sacrifice resets antimatter and all Antimatter Dimensions, but also gives a significantly stronger multiplier.`,
    name: () => `${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(8).uniqueName}` : "8th Antimatter Dimension"} Autobuyer`,
    reward: () => `Upgradeable ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(8).uniqueName}` : "8th Antimatter Dimension"} Autobuyer`,
    lockedAt: DC.D0,
  },
  {
    id: 9,
    label: "Augmented Demand",
    legacyId: 5,
    isQuickResettable: true,
    description: () => `whenever you buy Tickspeed upgrades or ${formatInt(10)} of an Antimatter Dimension, ` +
      "everything else of equal cost will increase to its next cost step.",
    name: () => "Tickspeed Autobuyer",
    reward: "Upgradeable Tickspeed Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    label: "Contrasting Construct",
    legacyId: 4,
    isQuickResettable: false,
    description: () => `there are only ${formatInt(6)} Antimatter Dimensions. Dimension Boost ` +
      "and Antimatter Galaxy costs are modified.",
    name: () => "Automated Dimension Boosts",
    reward: "Dimension Boosts Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    label: "Subatomic Renegade",
    legacyId: 12,
    isQuickResettable: true,
    description: () => `there is normal matter which rises once you have at least ${formatInt(1)} 2nd Antimatter ` +
      "Dimension. If it exceeds your antimatter, it will Dimension Boost without giving the bonus.",
    name: () => "Automated Antimatter Galaxies",
    reward: "Antimatter Galaxies Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    label: "Subsequent Assembly",
    legacyId: 7,
    isQuickResettable: false,
    description: () => `each Antimatter Dimension produces the Dimension ${formatInt(2)} tiers below it
      instead of ${formatInt(1)}. Both ${player.options.naming.dimensions ? `${AntimatterDimension(1).uniqueName}s and ${AntimatterDimension(2).uniqueName}s`
       : "1st and 2nd Dimensions"} produce antimatter. 
      The ${player.options.naming.dimensions ? `${AntimatterDimension(2).uniqueName}s, ${AntimatterDimension(4).uniqueName}s 
        and ${AntimatterDimension(6).uniqueName}s` : "2nd, 4th and 6th Dimensions"} are made stronger to compensate.`,
    name: () => "Automated Big Crunches",
    reward: "Big Crunches Autobuyer",
    lockedAt: DC.D16,
  }
];
