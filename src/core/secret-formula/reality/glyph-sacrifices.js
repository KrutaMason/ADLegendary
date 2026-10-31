export const glyphSacrifice = {
  "power": {
    id: "power",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.power + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const base = Math.log10(capped + 1) / Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.floor(750 * Math.pow(base, 1.2));
    },
    description: amount => {
      const sacCap = GlyphSacrificeHandler.maxSacrificeForEffects;
      const nextDistantGalaxy = Math.pow(10, Math.pow((amount + 1) / 750, 1 / 1.2) * Math.log10(sacCap)) - 1;
      const nextGalaxyText = amount < 750
        ? ` (next at ${format(nextDistantGalaxy, 2, 2)})`
        : "";
      return `Distant Galaxy scaling starts ${formatInt(amount)} later${nextGalaxyText}`;
    },
    boostValue: added =>{
      return Math.pow(1 + GlyphAlteration.sacrificeBoost("power",added ?? 0), 3)
    },
    boostdescription: amount => `Extra Dimension boost multiplier ${formatX(amount, 2, 2)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "infinity": {
    id: "infinity",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.infinity + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      return 1 + Math.log10(1 + Math.pow(capped, 0.2) / 100);
    },
    description: amount => `${formatX(amount, 2, 2)} bigger multiplier when buying ${InfinityDimension(8).fullName()}`,
    boostValue: added =>{
      return GlyphAlteration.sacrificeBoost("infinity",added ?? 0) / 50
    },
    boostdescription: amount => `Extra Infinity Dimension power +${format(amount, 3, 3)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "time": {
    id: "time",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.time + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.pow(1 + Math.pow(capped, 0.2) / 100, 2);
    },
    description: amount => `${formatX(amount, 2, 2)} bigger multiplier when buying ${TimeDimension(8).fullName()}`,
    boostValue: added =>{
      return Math.pow(3, GlyphAlteration.sacrificeBoost("time",added ?? 0))
    },
    boostdescription: amount => `${formatX(amount, 2, 2)} extra Eternity gain`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "replication": {
    id: "replication",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.replication + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const base = Math.log10(capped + 1) / Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.floor(1500 * Math.pow(base, 1.2));
    },
    description: amount => {
      const sacCap = GlyphSacrificeHandler.maxSacrificeForEffects;
      const nextDistantGalaxy = Math.pow(10, Math.pow((amount + 1) / 1500, 1 / 1.2) * Math.log10(sacCap)) - 1;
      const nextGalaxyText = amount < 1500
        ? ` (next at ${format(nextDistantGalaxy, 2, 2)})`
        : "";
      return `Replicanti Galaxy scaling starts ${formatInt(amount)} later${nextGalaxyText}`;
    },
    boostValue: added =>{
      return GlyphAlteration.sacrificeBoost("replication",added ?? 0) * 3
    },
    boostdescription: amount => `Extra Replicanti multiplier power +${format(amount, 2, 2)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "dilation": {
    id: "dilation",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.dilation + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const exponent = 0.32 * Math.pow(Math.log10(capped + 1) /
        Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects), 0.1);
      return Math.pow(Math.clampMin(capped, 1), exponent);
    },
    description: amount => `Multiply Tachyon gain by ${formatX(amount, 2, 2)}`,
    boostValue: added =>{
      return 1 - GlyphAlteration.sacrificeBoost("dilation",added ?? 0) / 50
    },
    boostdescription: amount => `Starting Tachyonic Galaxy threshold multiplier ${formatX(amount, 3, 3)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "effarig": {
    id: "effarig",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.effarig + (added ?? 0);
      // This doesn't use the GlyphSacrificeHandler cap because it hits its cap (+100%) earlier
      const capped = Math.clampMax(sac, 1e70);
      return 2 * Math.log10(capped / 1e20 + 1);
    },
    description: amount => `+${formatPercents(amount / 100, 2)} additional Glyph quality`,
    boostValue: added =>{
      return GlyphAlteration.sacrificeBoost("effarig",added ?? 0) / 10
    },
    boostdescription: amount => `Extra Achievement multiplier power +${format(amount, 3, 3)}`,
    cap: () => 1e70
  },
  "reality": {
    id: "reality",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.reality + (added ?? 0);
      // This cap is only feasibly reached with the imaginary upgrade, but we still want to cap it at a nice number
      return Math.clampMax(1 + Math.sqrt(sac) / 15, 100);
    },
    description: amount => `Multiply Memory Chunk gain by ${formatX(amount, 2, 3)}`,
    boostValue: () => 0,
    boostdescription: () => "",
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "helios": {
    id: "helios",
    effect: added => {
      const sac = player.reality.glyphs.sac.helios + (added ?? 0);
      return Math.floor(5e5 * (1 * Math.pow(2, sac * 0.1)));
    },
    description: (amount, added) => `Helios Glyph level ${formatInt(player.reality.glyphs.sac.helios + (added ?? 0))} with a 1 in 
    ${formatInt(Math.floor(amount / (AlchemyResource.multiversal.effectValue + 1)))} chance`,
    boostValue: () => 0,
    boostdescription: () => "",
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  }
};
