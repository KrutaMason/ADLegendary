<script>
import GlyphTooltipEffect from "@/components/GlyphTooltipEffect";
import { Pelle } from "../core/globals";

export default {
  name: "GlyphTooltip",
  components: {
    GlyphTooltipEffect,
    GlyphComponent: () => import("@/components/GlyphComponent")
  },
  props: {
    type: {
      type: String,
      required: true
    },
    glyph: {
      type: Object,
      required: true
    },
    strength: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    effects: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: false,
      default: 0,
    },
    sacrificeReward: {
      type: Number,
      required: false,
      default: 0,
    },
    refineReward: {
      type: Number,
      required: false,
      default: 0,
    },
    uncappedRefineReward: {
      type: Number,
      required: false,
      default: 0,
    },
    currentAction: {
      type: String,
      required: true
    },
    scoreMode: {
      type: Number,
      required: true
    },
    showDeletionText: {
      type: Boolean,
      required: false,
      default: true,
    },
    displayLevel: {
      type: Number,
      required: false,
      default: 0,
    },
    changeWatcher: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      showChaosText: false,
      chaosDescription: ""
    };
  },
  computed: {
    onTouchDevice() {
      return GameUI.touchDevice;
    },
    effectiveLevel() {
      return this.displayLevel ? this.displayLevel : this.level;
    },
    sortedEffects() {
      return getGlyphEffectValuesFromBitmask(this.effects, this.effectiveLevel, this.strength, this.type)
        .filter(effect =>
          GlyphEffects[effect.id].isGenerated === generatedTypes.includes(this.type));
    },
    diacriticDisplay() {
      return `${quantify("Diacritic",this.sortedEffects.length)}`
    },
    rarityInfo() {
      return getRarity(this.strength);
    },
    // Values for baseColor and textColor will only ever be black or white
    baseColor() {
      return CosmeticGlyphTypes[this.type].currentColor.bg;
    },
    textColor() {
      return this.baseColor === "black" ? "white" : "black";
    },
    mainBorderColor() {
      return GlyphAppearanceHandler.getBorderColor(this.type);
    },
    specialGlyph(){
      if (this.type === "companion"||this.type === "helios")return true
      else return false
    },
    descriptionStyle() {
      const color = !player.celestials.pelle.doomed ? GlyphAppearanceHandler.getRarityColor(this.strength, this.type) : "crimson";
      const cursedColor = GlyphAppearanceHandler.isLightBG ? "white" : "black";
      return {
        //color: this.type === "cursed" ? cursedColor : color,
        "border-bottom": !this.specialGlyph ? "solid 1px" : "none",
        "border-image": !this.specialGlyph ? `linear-gradient(90deg,transparent,${"cursed" === this.type ? cursedColor : "reality" === this.type ? "currentcolor" : color},transparent) 1` : undefined,
        animation: this.type === "reality" ? "a-reality-glyph-name-cycle 10s infinite" : undefined
      };
    },
    description() {
      const glyphName = `${this.type.capitalize()}`;
      //const glyphTitles = ["Letter","Symbol","Mark","Rune","Talisman"]
      //!player.celestials.pelle.doomed ? glyphTitles[Math.min(Math.floor(Math.log10(this.level)),5)]
      switch (this.type) {
        case "helios":
          return "Helios Glyph";
        case "companion":
          return "Companion Glyph";
        case "cursed":
          return "Cursed Glyph";
        case "reality":
          return `Glyph of ${glyphName}`;
        default:
          return `${!Pelle.isDoomed ? "Glyph" : "Fragment"} of ${glyphName}`;
      }
    },
    rarityDescriptionStyle() {
      const color = player.celestials.pelle.doomed ? "crimson" : GlyphAppearanceHandler.getRarityColor(this.strength, this.type);
      const bg = this.baseColor === "white";
      return {
        color: color,
        "background": `linear-gradient(90deg,transparent,${bg?"#ffffff80":"#00000080"},transparent)`,
        animation: this.type === "reality" ? "a-reality-glyph-name-cycle 10s infinite" : undefined
      };
    },
    rarityDescription() {
      switch (this.type) {
        case "helios":
        break;
        case "companion":
        break;
        case "cursed":
          break;
        case "reality":
          return `PURE`;
        default:
          return `${!Pelle.isDoomed ? this.rarityInfo.name : "DOOMED"}`;
      }
    },
    isLevelCapped() {
      return this.displayLevel && this.displayLevel < this.level;
    },
    isLevelBoosted() {
      return this.displayLevel && this.displayLevel > this.level;
    },
    rarityText() {
      if (!GlyphTypes[this.type].hasRarity) return "";
      const bg = this.baseColor === "white"?"#ffffff":"#000000";
      const color = !player.celestials.pelle.doomed ? GlyphAppearanceHandler.getRarityColor(this.strength, this.type) : "crimson";
      const strength = Pelle.isDoomed ? Pelle.glyphStrength : this.strength;
      return `<div class="c-glyph-tooltip__stat-name">Quality</div>\n
        <div style="text-shadow: 0.1rem 0.1rem 0.3rem ${bg},-0.1rem -0.1rem 0.3rem ${bg};background:linear-gradient(90deg,transparent,${color}88,transparent);">${formatRarity(strengthToRarity(strength))}</div>`;
    },
    levelText() {
      if (this.type === "companion" || this.type === "helios") return "";
      // eslint-disable-next-line no-nested-ternary
      const arrow = this.isLevelCapped
        ? "<i class='fas fa-sort-down'></i>"
        : (this.isLevelBoosted ? "<i class='fas fa-sort-up'></i>" : "");
      // eslint-disable-next-line no-nested-ternary
      const color = this.isLevelCapped
        ? "#ff4444"
        : (this.isLevelBoosted ? "#44FF44" : undefined);
      return `<div class="c-glyph-tooltip__stat-name">Level</div><span style="color: ${color}">
              ${arrow}${formatInt(this.effectiveLevel)}${arrow}
              </span>`;
    },
    eventHandlers() {
      return GameUI.touchDevice ? {
        touchstart: this.touchStart,
        dragstart: this.dragStart,
        dragEnd: this.dragEnd,
      } : {};
    },
    glyphTooltipStyle() {
      // With computer mice, it's nice to just totally disable mouse events on the tooltip,
      // which reduces the chances for stupidity
      const borderColor = this.type === "cursed" ? this.textColor : GlyphAppearanceHandler.getBorderColor(this.type);
      const bg = this.baseColor === "white";
      const isReality = this.type === "reality";
      return {
        "pointer-events": this.onTouchDevice ? undefined : "none",
        "border-image-source":isReality ?"var(--leg-border-reality-render)":"var(--leg-border-render)",
        //"border-image":`linear-gradient(${!isReality?borderColor:"var(--color-reality)"},white) 1`,
        //"box-shadow":`0 0 0 0.2rem ${this.baseColor} inset,0 0 0 0.4rem ${borderColor}44 inset`,
        color: this.textColor,
        "--cover-border":"#808080a0",
        "--cover":bg?"#ffffff80":"#00000080",
        "--effect-color":bg?"#1c751c":"#76EE76",
        "background-position":"center",
        "background-image": 
        `url(images/glyphs-alchemy/background-glyph_${bg?`transparentlight`:`transparentdark`}.png),
        linear-gradient(${bg?"#ffffff":"#000000"} 25%,
        ${!isReality?borderColor:"var(--color-reality)"} 200%)`,
      };
    },
    glyphHeaderStyle() {
      const isCursed = this.type === "cursed";
      const isReality = this.type === "reality";
      const bg = this.baseColor === "white";
      let color = !player.celestials.pelle.doomed ? GlyphAppearanceHandler.getRarityColor(this.strength, this.type) : "crimson";
      if (isCursed) color = this.textColor;
      if (this.type === "companion" || this.type === "helios") color = GlyphAppearanceHandler.getBorderColor(this.type);
      return {
        "border": `${color}aa 0.4rem double`,
        //"box-shadow": `0 0 0.5rem 0.1rem ${color}, 0 0 0.8rem ${color} inset`,
        animation: isReality ? "a-reality-glyph-tooltip-header-cycle 10s infinite" : undefined,
        color: this.textColor,
        background: `url(images/glyphs-alchemy/glyph-${bg?`pattern-light`:`pattern`}.png),
        linear-gradient(${!isReality?color:"var(--color-reality)"} -125%, var(--cover) 125%)`,
        "background-position":"center",
        "background-origin": "border-box",
        "--cover-border--rarity":`${color}aa`
      };
    }
  },
  watch: {
    changeWatcher() {
      this.$recompute("sortedEffects");
    }
  },
  mounted() {
    // By attaching the tooltip to the body element, we make sure it ends up on top of anything
    // else, with no z order shenanigans
    document.body.appendChild(this.$el);
  },
  destroyed() {
    try {
      document.body.removeChild(this.$el);
    } catch (e) {
      // If the tooltip isn't visible, then it can't be removed on account of not being there in the first place.
      // Trying to remove it anyway causes an exception to be thrown but otherwise nothing seems to actually affect
      // the game. Nevertheless, including this try/catch no-op suppresses console error spam.
    }
  },
  methods: {
    update() {
      this.showChaosText = Pelle.specialGlyphEffect.isUnlocked;
      if (this.showChaosText) {
        this.chaosDescription = Pelle.getSpecialGlyphEffectDescription(this.type);
      }
    },
    touchStart() {
      // We _don't_ preventDefault here because we want the event to turn into a local
      // dragstart that we can intercept
      this.$parent.$emit("tooltip-touched");
    },
    dragStart(ev) {
      // Prevent dragging by tooltip on mobile
      ev.preventDefault();
      ev.stopPropagation();
    },
    dragEnd(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    },
    removeGlyph() {
      GlyphSacrificeHandler.removeGlyph(Glyphs.findById(this.id), false);
      if(!player.options.confirmations.glyphSacrifice)AudioManagement.playSound("glyph_sacrifice",undefined,[0.95,1.05])
    },
    getFontColor() {
      return Theme.current().isDark() ? "#cccccc" : "black";
    },
    sacrificeText() {
      const bg = this.baseColor === "white"?"#00000044":"#ffffff44";
      if (this.type === "companion" || this.type === "cursed" || this.type === "helios") return `<span style="font-style:italic;">No Sacrifice bonus</span>`;
      const powerText = `${format(this.sacrificeReward, 2, 2)}`;
      const isCurrentAction = this.currentAction === "sacrifice";
      return `<div style="font-style: ${isCurrentAction ? "italic" : ""}">
              <div class="c-glyph-tooltip__stat-name" style="background: ${isCurrentAction ? `linear-gradient(90deg,transparent,${bg},transparent)` : ""}">Sacrifice</div>${GLYPH_SYMBOLS[this.type]} ${powerText}
              </div>`;
    },
    refineText() {
      const bg = this.baseColor === "white"?"#00000044":"#ffffff44";
      if (this.type === "companion" || this.type === "cursed" || this.type === "reality" || this.type === "helios") return "";
      if (!AlchemyResource[this.type].isUnlocked) return "";
      let refinementText = `${format(this.uncappedRefineReward, 2, 2)} ${GLYPH_SYMBOLS[this.type]}`;
      if (this.uncappedRefineReward !== this.refineReward) {
        refinementText += ` (${format(this.refineReward, 2, 2)})`;
      }
      const isCurrentAction = this.currentAction === "refine";
      return `<div style="font-style: ${isCurrentAction ? "italic" : ""}">
              <div class="c-glyph-tooltip__stat-name" style="background: ${isCurrentAction ? `linear-gradient(90deg,transparent,${bg},transparent)` : ""}">Refine</div>${refinementText}
              </div>`;
    },
    scoreText() {
      if (this.type === "companion" || this.type === "cursed" || this.type === "reality" || this.type === "helios") return "";
      const showFilterScoreModes = [AUTO_GLYPH_SCORE.SPECIFIED_EFFECT, AUTO_GLYPH_SCORE.EFFECT_SCORE];
      if (!showFilterScoreModes.includes(this.scoreMode)) return "";
      return `<div class="c-glyph-tooltip__stat-name">Score</div>
      ${format(AutoGlyphProcessor.filterValue(this.$parent.glyph), 1, 1)}`;
    }
  }
};
</script>

<template>
  <div
    class="l-glyph-tooltip c-glyph-tooltip"
    :style="glyphTooltipStyle"
    v-on="eventHandlers"
  >
    <div
      class="c-glyph-tooltip__header"
      :style="glyphHeaderStyle"
    >
    <div class="c-glyph-tooltip__g-container">
      <GlyphComponent
    :disableTooltip="true"
    :glyph="glyph"
    :show-sacrifice="false"
    :circular="true"
    :hasCrate="1"
    :needsZindex="false"
    />
    </div>
      <span
        class="c-glyph-tooltip__description"
        :style="descriptionStyle"
        v-html="description"
      />
      <span
        class="l-glyph-tooltip__rarity"
        :style="rarityDescriptionStyle"
        v-html="rarityDescription"
        v-if="rarityDescription"
      />
      <span class="l-glyph-tooltip__info">
        <span v-html="levelText" />
        <span v-if="rarityText" v-html="rarityText"/>
        <span v-if="scoreText()" v-html="scoreText()" />
      </span>
    </div>
    <div class="l-glyph-tooltip__effects">
      <div v-if='!specialGlyph' class="c-glyph-tooltip__effect c-glyph-tooltip__effect-start" v-html="diacriticDisplay"/>
      <GlyphTooltipEffect
        v-for="e in sortedEffects"
        :key="e.id + changeWatcher"
        :effect="e.id"
        :value="e.value"
      />
      <div
        v-if="showChaosText"
        class="pelle-current-glyph-effects c-glyph-tooltip__effect"
        v-html="chaosDescription"
      />
    </div>
        <div v-if="showDeletionText"
          class="c-glyph-tooltip__sacrifice"
          v-on="onTouchDevice ? { click: removeGlyph } : {}"
        >
          <span v-if="sacrificeText()" v-html="sacrificeText()" />
          <span v-if="refineText()" v-html="refineText()" />
  </div>
</div>
</template>

<style scoped>
.c-glyph-tooltip__effect-start{
  background:linear-gradient(90deg,var(--cover-border),transparent,var(--cover-border));
  border-radius: .8rem .8rem 0 0;
  padding: 0 0.5rem;
  font-weight: bold;
  font-family:Cambria;
  font-size:1.3rem
}
.c-glyph-tooltip__sacrifice {
  width: 100%;
  padding: .3rem 0;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: normal;
  display: flex;
  background: var(--cover);
  border-radius: 1rem;
  border: var(--cover-border) 1px solid;
  box-shadow: 0.1rem 0.1rem 0.3rem #00000088;
}
.pelle-current-glyph-effects{
  color:#ed143d;
  font-weight: bold;
  background: Linear-gradient(90deg,transparent -10%, #ed143d40 10%,transparent, #ed143d40 90%,transparent 110%)
}
</style>
