<script>
import { GlyphInfo } from "../../src/components/modals/options/SelectGlyphInfoDropdown";

import GlyphTooltip from "@/components/GlyphTooltip";

// We generate the border effects with CSS gradients; for the sake of flexibility and for dynamically using
// the glyph color instead of the fixed rarity color, the border patterns are stored below and then parsed
// into the relevant CSS on a per-glyph basis
const rarityBorderStyles = {
  common: [],
  uncommon: [
    {
      lineType: "linear",
      angles: [45],
      colorSplit: [14, 16, 84, 86],
    }
  ],
  rare: [
    {
      lineType: "linear",
      angles: [45, 135],
      colorSplit: [14, 16, 84, 86],
    }
  ],
  epic: [
    {
      lineType: "linear",
      angles: [45, 135],
      colorSplit: [12, 14, 16, 18, 82, 84, 86, 88],
    }
  ],
  legendary: [
    {
      lineType: "bump",
      colorSplit: [18, 25],
    }
  ],
  mythical: [
    {
      lineType: "bump",
      colorSplit: [18, 25],
    },
    {
      lineType: "linear",
      angles: [45, 135],
      colorSplit: [10, 13, 87, 90],
    }
  ],
  transcendent: [
    {
      lineType: "bump",
      colorSplit: [18, 35],
    },
    {
      lineType: "linear",
      angles: [45, 135],
      colorSplit: [10, 12, 14, 16, 84, 86, 88, 90],
    }
  ],
  celestial: [
    {
      lineType: "bump",
      colorSplit: [18, 35],
    },
    {
      lineType: "radial",
      colorSplit: [65, 75],
    },
  ],
  cursed: [
    {
      lineType: "spike",
      center: [40, 40],
      angles: [305, 325],
    },
    {
      lineType: "spike",
      center: [60, 40],
      angles: [35, 55],
    },
    {
      lineType: "spike",
      center: [60, 60],
      angles: [125, 145],
    },
    {
      lineType: "spike",
      center: [40, 60],
      angles: [215, 235],
    },
  ],
  companion: [
    {
      lineType: "companion",
    },
  ],
};

// This function does all the parsing of the above gradient specifications
// eslint-disable-next-line max-params
function generateGradient(data, color, glyph, isCircular) {
  // The undefined declarations here are mostly to make ESLint happy, and aren't necessarily used in all cases
  let borders, scaleFn, centers, specialData, isColor = false;
  const entries = [], elements = [];
  switch (data.lineType) {
    case "linear":
      // Produces stripes at the specified angle, where color sharply switches between the specified color and
      // transparent at each percentage in lines
      borders = [0, ...data.colorSplit, 100];
      scaleFn = perc => (isCircular ? 50 + 0.7 * (perc - 50) : perc);
      for (const angle of data.angles) {
        for (let i = 0; i < borders.length - 1; i++) {
          entries.push(`${isColor ? color : "transparent"} ${scaleFn(borders[i])}% ${scaleFn(borders[i + 1])}%`);
          isColor = !isColor;
        }
        elements.push(`repeating-linear-gradient(${angle}deg, ${entries.join(",")})`);
      }
      return elements.join(",");
    case "bump":
      // Produces four bumps on the cardinal directions of the glyph border, with specified color fade distances.
      // These bumps overlap some dots on effarig glyphs, so we conditionally make them more transparent (effectively
      // shrinking them so they don't overlap)
      specialData = glyph.type === "effarig"
        ? `${color}80`
        : color;
      centers = ["50% -25%", "50% 125%", "-25% 50%", "125% 50%"];
      scaleFn = perc => (isCircular ? perc : 0.9 * perc);
      for (let i = 0; i < 4; i++) {
        entries.push(`radial-gradient(at ${centers[i]}, transparent, ${specialData} ${scaleFn(data.colorSplit[0])}%,
          transparent ${scaleFn(data.colorSplit[1])}%)`);
      }
      return entries.join(",");
    case "radial":
      // Produces a centered circle that only shades within a certain radial distance
      borders = [50, ...data.colorSplit, 100];
      scaleFn = perc => (isCircular ? 0.9 * perc : 100 - (100 - perc) / 2);
      for (const border of borders) {
        entries.push(`${isColor ? color : "transparent"} ${scaleFn(border)}%`);
        isColor = !isColor;
      }
      return `radial-gradient(${entries.join(",")})`;
    case "spike":
      // Produces a single spike at the specified center, spanning between the specified angles with 5deg blur
      entries.push(`transparent ${data.angles[0] - 5}deg`);
      entries.push(`${color}b0 ${data.angles[0] + 5}deg`);
      entries.push(`${color}b0 ${data.angles[1] - 5}deg`);
      entries.push(`transparent ${data.angles[1] + 5}deg`);
      return `conic-gradient(from 0deg at ${data.center[0]}% ${data.center[1]}%, ${entries.join(",")})`;
    case "companion":
      // Special case to make the companion border look like a heart
      borders = [0, 30, 330, 360];
      specialData = [color, "transparent", "transparent", color];
      for (let i = 0; i < 4; i++) {
        entries.push(`${specialData[i]} ${borders[i]}deg`);
      }
      elements.push(`conic-gradient(${entries.join(",")})`);

      centers = ["125% 125%", "-25% 125%"];
      scaleFn = perc => (isCircular ? 0.9 * (perc + 10) : perc);
      for (let i = 0; i < 2; i++) {
        elements.push(`radial-gradient(at ${centers[i]}, transparent, ${color} ${scaleFn(30)}%,
          transparent ${scaleFn(50)}%)`);
      }
      return elements.join(",");
    default:
      throw new Error("Unrecognized glyph border data");
  }
}

export default {
  name: "GlyphComponent",
  components: {
    GlyphTooltip
  },
  props: {
    glyph: {
      type: Object,
      required: true
    },
    isInModal: {
      type: Boolean,
      required: false,
      default: false
    },
    isNew: {
      type: Boolean,
      required: false,
      default: false
    },
    isUnequipped: {
      type: Boolean,
      required: false,
      default: false
    },
    showSacrifice: {
      type: Boolean,
      required: false,
      default: false
    },
    ignoreModifiedLevel: {
      type: Boolean,
      required: false,
      default: false
    },
    realityGlyphBoost: {
      type: Number,
      required: false,
      default: 0
    },
    isInventoryGlyph: {
      type: Boolean,
      required: false,
      default: false
    },
    isActiveGlyph: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: "5rem",
    },
    glowBlur: {
      type: String,
      required: false,
      default: "1rem"
    },
    glowSpread: {
      type: String,
      required: false,
      default: "0.2rem"
    },
    bottomPadding: {
      type: String,
      required: false,
      default: "0.3rem"
    },
    textProportion: {
      type: Number,
      required: false,
      default: 0.5
    },
    circular: {
      type: Boolean,
      required: false,
      default: false,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false,
    },
    flipTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
    disableTooltip: {
      type: Boolean,
      required: false
    },
    hasCrate: {
      type: Number,
      required: false,
      default: 0
    },
    needsZindex: {
      type: Boolean,
      required: false,
      default: true
    },
    group: {
      type: String,
      required: false,
      default:""
    }
  },
  data() {
    return {
      componentID: UIID.next(),
      isDragging: false,
      // This flag is used to prevent the tooltip from being shown in some touch event sequences
      suppressTooltip: false,
      isTouched: false,
      tooltipEnabled: false,
      sacrificeReward: 0,
      uncappedRefineReward: 0,
      refineReward: 0,
      displayLevel: 0,
      // We use this to not create a ton of tooltip components as soon as the glyph tab loads.
      tooltipLoaded: false,
      logTotalSacrifice: 0,
      realityColor: "",
      realitydirection:0,
      animationenabled:false
    };
  },
  computed: {
    hasTooltip() {
      return Boolean(this.glyph.effects) && !this.disableTooltip;
    },
    typeConfig() {
      return GlyphTypes[this.glyph.type];
    },
    cosmeticConfig() {
      return CosmeticGlyphTypes[this.glyph.cosmetic ?? this.glyph.type];
    },
    isBlobHeart() {
      return this.$viewModel.theme === "S11" && this.glyph.type === "companion";
    },
    symbol() {
      const symbol = this.glyph.symbol;
      // \uE019 = :blobheart:
      if (this.isBlobHeart) return "\uE019";
      if (symbol) return symbol;
      return (this.$viewModel.theme === "S4" && !this.glyph.cosmetic)
        ? CANCER_GLYPH_SYMBOLS[this.glyph.type]
        : this.cosmeticConfig.currentSymbol.symbol;
    },
    symbolBlur() {
      if (this.isBlobHeart) return false;
      if (!this.glyph.symbol) return this.cosmeticConfig.currentSymbol.blur;
      return !GlyphAppearanceHandler.unblurredSymbols.includes(this.symbol);
    },
    zIndexStyle() {
      return { "z-index": this.isInModal ? 7 : 6 };
    },
    colorObj() {
      let overrideColor;
      let doomedGlyphs = ["power","infinity","replication","time","dilation"]
      if (this.glyph.color) overrideColor = GlyphAppearanceHandler.getColorProps(this.glyph.color);
      if (this.glyph.cosmetic) {
        if (this.glyph.cosmetic === this.glyph.type) {
          overrideColor = this.glyph.type === "cursed"
            ? GlyphAppearanceHandler.getBaseColor(true)
            : this.cosmeticConfig.currentColor;
        } else {
          overrideColor = this.cosmeticConfig.currentColor;
        }
      }

      let symbolColor;
      if (this.isRealityGlyph && this.realityColor) symbolColor = this.realityColor;
      else {
        symbolColor = this.cosmeticConfig.ignoreRarityColor
          ? GlyphAppearanceHandler.getBorderColor(this.glyph.type)
          : GlyphAppearanceHandler.getRarityColor(this.glyph.strength, this.glyph.type);
      }

      return {
        border: overrideColor?.border ?? GlyphAppearanceHandler.getBorderColor(this.glyph.type),
        symbol: (Pelle.isDoomed&&doomedGlyphs.includes(this.glyph.type)) ? overrideColor?.border ?? "#ed143d" : overrideColor?.border ?? symbolColor,
        bg: overrideColor?.bg ?? this.cosmeticConfig.currentColor.bg
      };
    },
    symbolColor() {
      return player.options.swapGlyphColors ? this.colorObj.border : this.colorObj.symbol;
    },
    borderColor() {
      return player.options.swapGlyphColors ? this.colorObj.symbol : this.colorObj.border;
    },
    bgColor() {
      return this.colorObj.bg;
    },
    overStyle() {
      return {
        width: `calc(${this.size} - ${this.isRealityGlyph&&this.animationenabled?0.4:0.2}rem)`,
        height: `calc(${this.size} - ${this.isRealityGlyph&&this.animationenabled?0.4:0.2}rem)`,
        position: "absolute",
        "background-color": "rgba(0, 0, 0, 0)",
        "box-shadow": `0 0 ${this.isRealityGlyph&&this.animationenabled?"0.5rem":"1rem"} 
        ${this.bgColor === "black"?"black":"#00000080"} inset ,0 0 0 0.2rem ${this.borderColor} inset`,
        "border-radius": this.circular ? "50%" : "15%",
      };
    },
    outerStyle() {
      return {
        width: this.size,
        height: this.size,
        "--crate-size":this.hasCrate>0?`calc(${this.size} * ${this.hasCrate===2?1.2:1.4})`:undefined,
        //"--crate-position":this.hasCrate>0?`calc(-${this.size} * ${this.hasCrate===2?1.1:1.2} + ${this.size})`:undefined,
        "background": this.isRealityGlyph&&this.animationenabled?
        `linear-gradient(${this.realitydirection}deg,${this.borderColor} -50%,white,${this.borderColor} 150%)`:this.borderColor,
        "box-shadow": `0 0 ${this.glowBlur} ${this.glowSpread} ${this.borderColor}`,
        "border-radius": this.circular ? "50%" : "15%",
        "-webkit-user-drag": this.draggable ? "" : "none",
        "z-index":this.hasCrate>=1&&this.needsZindex?1:undefined
      };
    },
    innerStyle() {
      const color = this.symbolColor;
      //const bgimg = getRarity(this.glyph.strength).name !== "Celestial" ? "url(../images/glyphs-alchemy/glyph-pattern.png)" : "url(../images/glyphs-alchemy/glyph-pattern-celestial.png)"
      return {
        width: `calc(${this.size} - ${this.isRealityGlyph&&this.animationenabled?0.4:0.2}rem)`,
        height: `calc(${this.size} - ${this.isRealityGlyph&&this.animationenabled?0.4:0.2}rem)`,
        "font-size": `calc( ${this.size} * ${this.textProportion} )`,
        color:this.isRealityGlyph&&this.animationenabled?(this.bgColor==="white"?"black":"white"):color,
        "text-shadow": this.symbolBlur ? (this.isRealityGlyph&&this.animationenabled?`0 0 0.3rem 
        ${(this.bgColor==="white"?"black":"white")},0 0 0.3em ${color},0 0 0.3em ${color},0 0 0.3em ${color}`:
        `0.1rem 0.2rem 0.3rem ${this.isCursedGlyph?"black":this.bgColor}, -0.04em 0.04em 0.08em ${color}`) : undefined,
        "border-radius": this.circular ? "50%" : "15%",
        "padding-bottom": this.bottomPadding,
        "background-image": `url(images/glyphs-alchemy/glyph-${this.bgColor === `black`?`pattern`:`pattern-light`}.png),
        linear-gradient(${this.bgColor} -20%,${this.borderColor} 200%)`,
        //"background-image": `${bgimg},linear-gradient(${this.bgColor} -20%,${this.borderColor} 250%)`,
        //"animation": getRarity(this.glyph.strength).name === "Celestial" ? "10s infinite linear a-celglyph": undefined,
        "background-position":"center"
      };
    },
    crateStyle(){
      if (this.hasCrate < 0) return;
      const fullDots = this.glyphEffects.length >= (this.glyph.type === "effarig" ? 7 : 4)
      let posID = 1;
      switch (this.glyph.type) {
        case "effarig":
          posID = fullDots ? 5 : 4;
          break;
        case "reality":
          posID = fullDots ? 7 : 6;
          break;
        case "cursed":
          posID = 8;
          break;
        case "companion":
          posID = 9;
          break;
        case "helios":
          posID = 10;
          break;
        default:
          posID = fullDots ? 3 : 2;
      }
      if (Pelle.isDoomed) return posID = 8
      return posID
    },
    hasAlteredCrate(){
      const blacklist = ["companion", "cursed","helios"];
      if (this.hasCrate < 0 || blacklist.includes(this.glyph.type) || Pelle.isDoomed) return false;
      if (player.reality.glyphs.sac[this.glyph.type] >= GlyphAlteration.boostingThreshold) return true
    },
    mouseEventHandlers() {
      const handlers = this.hasTooltip ? {
        mouseenter: this.mouseEnter,
        "&mousemove": this.mouseMove,
        mouseleave: this.mouseLeave,
        mousedown: this.mouseDown,
        touchstart: this.touchStart,
        touchend: this.touchEnd
      } : {};
      if (this.hasTooltip || this.draggable) {
        handlers.touchmove = this.touchMove;
      }
      return handlers;
    },
    isCurrentTooltip() {
      return this.$viewModel.tabs.reality.currentGlyphTooltip === this.componentID;
    },
    tooltipDirectionClass() {
      let directionID = this.$viewModel.tabs.reality.glyphTooltipDirection;
      if (this.flipTooltip) directionID += 1;
      switch (directionID) {
        case -1:
          return "l-glyph-tooltip--down-left";
        case 0:
          return "l-glyph-tooltip--down-right";
        case 1:
          return "l-glyph-tooltip--up-left";
        case 2:
          return "l-glyph-tooltip--up-right";
        default:
          return "";
      }
    },
    // This finds all the effects of a glyph and shifts all their IDs so that type's lowest-ID effect is 0 and all
    // other effects count up to 3 (or 6 for effarig). Used to add dots in unique positions on glyphs to show effects.
    glyphEffects() {
      let minEffectID = 0;
      switch (this.glyph.type) {
        case "time":
        case "cursed":
        case "helios":
        case "companion":
          minEffectID = 0;
          break;
        case "dilation":
        case "reality":
          minEffectID = 4;
          break;
        case "replication":
          minEffectID = 8;
          break;
        case "infinity":
          minEffectID = 12;
          break;
        case "power":
          minEffectID = 16;
          break;
        case "effarig":
          minEffectID = 20;
          break;
        default:
          throw new Error(`Unrecognized glyph type "${this.glyph.type}" in glyph effect icons`);
      }
      const effectIDs = [];
      let remainingEffects = this.glyph.effects >> minEffectID;
      for (let id = 0; remainingEffects > 0; id++) {
        if ((remainingEffects & 1) === 1) effectIDs.push(id);
        remainingEffects >>= 1;
      }
      if (this.glyph.effects >> 27 === 1) effectIDs.pop(28)
      return effectIDs;
    },
    isRealityGlyph() {
      return this.glyph.type === "reality";
    },
    isCursedGlyph() {
      return this.glyph.type === "cursed";
    },
    isCompanionGlyph() {
      return this.glyph.type === "companion";
    },
    isHeliosGlyph() {
      return this.glyph.type === "helios";
    },
    showGlyphEffectDots() {
      return player.options.showHintText.glyphEffectDots;
    },
    displayedInfo() {
      const blacklist = ["companion", "cursed","helios"];
      if (!this.isInventoryGlyph || blacklist.includes(this.glyph.type)) return null;

      const options = player.options.showHintText;
      if (options.glyphInfoType === GlyphInfo.types.NONE ||
        (!options.showGlyphInfoByDefault && !this.$viewModel.shiftDown)) {
        return null;
      }

      const typeEnum = GlyphInfo.types;
      switch (options.glyphInfoType) {
        case typeEnum.LEVEL:
          this.updateDisplayLevel();
          return formatInt(this.displayLevel === 0 ? this.glyph.level : this.displayLevel);
        case typeEnum.RARITY:
          return formatRarity(strengthToRarity(Pelle.isDoomed ? Pelle.glyphStrength : this.glyph.strength));
        case typeEnum.SAC_VALUE:
          return format(this.sacrificeReward, 2, 2);
        case typeEnum.FILTER_SCORE:
          return format(AutoGlyphProcessor.filterValue(this.glyph), 1, 1);
        case typeEnum.CURRENT_REFINE:
          return `${format(this.refineReward, 2, 2)} ${this.symbol}`;
        case typeEnum.MAX_REFINE:
          return `${format(this.uncappedRefineReward, 2, 2)} ${this.symbol}`;
        default:
          throw new Error("Unrecognized Glyph info type in info text");
      }
    },
    showBorders() {
      return player.options.glyphBorders;
    }
  },
  watch: {
    logTotalSacrifice() {
      this.tooltipLoaded = false;
      if (this.isCurrentTooltip) this.showTooltip();
    }
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("typeConfig");
      this.$recompute("cosmeticConfig");
      this.$recompute("innerStyle");
      this.$recompute("overrideColor");
      this.$recompute("showGlyphEffectDots");
      this.$recompute("displayedInfo");
      this.$recompute("showBorders");
    });
    this.on$("tooltip-touched", () => this.hideTooltip());
    this.on$(GAME_EVENT.TAB_CHANGED, () => this.hideTooltip());

    // There are a few situations where a tooltip could attempt to render immediately upon component creation,
    // which causes it to be placed in an odd "default" corner spot due to mouse position not being set properly.
    // This is essentially a hack that force-suppresses tooltips from being shown in strange spots due to on-load
    // events firing, but has the side effect that the mouse must leave and enter an element which was created
    // underneath it in order to make the tooltip appear
    setTimeout(() => this.tooltipEnabled = true, 10);
  },
  beforeDestroy() {
    if (this.isCurrentTooltip) this.hideTooltip();
    if (this.$viewModel.draggingUIID === this.componentID) this.$viewModel.draggingUIID = -1;
  },
  methods: {
    update() {
      this.logTotalSacrifice = GameCache.logTotalGlyphSacrifice.value;
      // This needs to be reactive in order to animate while using our low-lag workaround, but we also need to make
      // sure it only animates when that color is actually active
      this.realityColor = player.reality.glyphs.cosmetics.colorMap.reality
        ? null
        : GlyphAppearanceHandler.realityColor;
      this.sacrificeReward = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph);
      this.uncappedRefineReward = ALCHEMY_BASIC_GLYPH_TYPES.includes(this.glyph.type)
        ? GlyphSacrificeHandler.glyphRawRefinementGain(this.glyph)
        : 0;
      this.refineReward = ALCHEMY_BASIC_GLYPH_TYPES.includes(this.glyph.type)
        ? GlyphSacrificeHandler.glyphRefinementGain(this.glyph)
        : 0;
      this.animationenabled = player.options.realityglyphAnimation
      this.realitydirection = this.animationenabled ? (Date.now()/(10000/180))%360 : 180
      if (this.tooltipLoaded) this.updateDisplayLevel();
    },
    updateDisplayLevel() {
      if (this.ignoreModifiedLevel) {
        this.displayLevel = 0;
        return;
      }
      // We have to consider some odd interactions in order to properly show level. The getAdjustedGlyphLevel() function
      // returns a modified level using celestial effects and reality glyphs based on the CURRENT game state, meaning
      // that applying this globally will cause lots of glyphs to show altered levels even if they shouldn't. So:
      // - Active glyphs should apply ALL adjusted effects based on the current game state, since they are guaranteed
      //   to always be affected by them and this is exactly the purpose of getAdjustedGlyphLevel() as-is
      // - Inventory glyphs should show the same current-state effects as active, but it should NEVER apply reality
      //   glyph boosts. This allows for easier comparison when celestial effects are changing both active and
      //   inventory glyphs, even though strictly speaking the inventory ones shouldn't be affected until equipped
      // - All other glyphs should never apply effects from the current game state, and should in fact only apply the
      //   reality glyph boost based on the rest of its existing set (which is passed in via realityGlyphBoost) and
      //   nothing else. This case applies to glyphs appearing in presets, records, and previews.
      if (this.isActiveGlyph) this.displayLevel = getAdjustedGlyphLevel(this.glyph);
      else if (this.isInventoryGlyph) this.displayLevel = getAdjustedGlyphLevel(this.glyph, 0);
      else {
        this.displayLevel = this.glyph.level +
          (BASIC_GLYPH_TYPES.includes(this.glyph.type) ? this.realityGlyphBoost : 0);
      }
    },
    hideTooltip() {
      this.tooltipLoaded = false;
      this.$viewModel.tabs.reality.mouseoverGlyphInfo.type = "";
      this.$viewModel.tabs.reality.mouseoverGlyphInfo.inInventory = false;
      this.$viewModel.tabs.reality.currentGlyphTooltip = -1;
    },
    showTooltip() {
      if (!this.tooltipEnabled) return;
      Glyphs.removeVisualFlag("unseen", this.glyph);
      Glyphs.removeVisualFlag("unequipped", this.glyph);
      this.tooltipLoaded = true;
      this.$viewModel.tabs.reality.mouseoverGlyphInfo.inInventory = !this.circular;
      const glyphInfo = this.$viewModel.tabs.reality.mouseoverGlyphInfo;
      glyphInfo.type = this.glyph.type;
      glyphInfo.sacrificeValue = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph);
      glyphInfo.refineValue = GlyphSacrificeHandler.glyphRawRefinementGain(this.glyph);
      this.$viewModel.tabs.reality.currentGlyphTooltip = this.componentID;
      if (
        AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.SACRIFICE ||
        (AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE_TO_CAP && this.refineReward === 0)
      ) {
        this.currentAction = "sacrifice";
      } else {
        this.currentAction = "refine";
      }
      this.scoreMode = AutoGlyphProcessor.scoreMode;
    },
    moveTooltipTo(x, y) {
      // If we are just creating the tooltip now, we can't move it yet.
      if (!this.$refs.tooltip) return;
      const tooltipEl = this.$refs.tooltip.$el;
      if (tooltipEl) {
        const rect = document.body.getBoundingClientRect();
        tooltipEl.style.left = `${x - rect.left}px`;
        tooltipEl.style.top = `${y - rect.top}px`;
        if (this.$viewModel.tabs.reality.glyphTooltipDirection === 1) {
          // In case of a really short screen, don't flicker back and forth
          if (y - tooltipEl.offsetHeight <= 0 && y + tooltipEl.offsetHeight < rect.height) {
            this.$viewModel.tabs.reality.glyphTooltipDirection = -1;
          }
        } else if (y + tooltipEl.offsetHeight >= rect.height) {
          this.$viewModel.tabs.reality.glyphTooltipDirection = 1;
        }
      }
    },
    mouseEnter(ev) {
      if (this.$viewModel.draggingUIID !== -1) return;
      this.moveTooltipTo(ev.clientX, ev.clientY);
      this.showTooltip();
    },
    mouseLeave() {
      if (this.isCurrentTooltip) {
        this.hideTooltip();
      }
    },
    mouseDown() {
      if (this.isTouched) return;
      this.hideTooltip();
    },
    mouseMove(ev) {
      if (this.isTouched) return;
      this.moveTooltipTo(ev.clientX, ev.clientY);
    },
    dragStart(ev) {
      this.hideTooltip();
      this.isDragging = true;
      this.suppressTooltip = true;
      ev.dataTransfer.setData(GLYPH_MIME_TYPE, this.glyph.id.toString());
      ev.dataTransfer.dropEffect = "move";
      const rect = this.$refs.over.getBoundingClientRect();
      ev.dataTransfer.setDragImage(this.$refs.over, ev.clientX - rect.left, ev.clientY - rect.top);
      this.$viewModel.draggingUIID = this.componentID;
      const dragInfo = this.$viewModel.tabs.reality.draggingGlyphInfo;
      dragInfo.id = this.glyph.id;
      dragInfo.type = this.glyph.type;
      dragInfo.sacrificeValue = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph);
    },
    dragEnd() {
      this.isDragging = false;
      this.suppressTooltip = false;
      this.$viewModel.scrollWindow = 0;
      const dragInfo = this.$viewModel.tabs.reality.draggingGlyphInfo;
      dragInfo.id = -1;
      dragInfo.type = "";
      if (this.$viewModel.draggingUIID === this.componentID) this.$viewModel.draggingUIID = -1;
    },
    drag(ev) {
      // It looks like dragging off the bottom of the window sometimes fires these
      // odd events
      if (ev.screenX === 0 && ev.screenY === 0) {
        this.$viewModel.scrollWindow = 0;
        return;
      }
      const boundary = 100;
      if (ev.clientY < boundary) {
        this.$viewModel.scrollWindow = -1 + 0.9 * ev.clientY / boundary;
      } else if (ev.clientY > window.innerHeight - boundary) {
        this.$viewModel.scrollWindow = 1 - 0.9 * (window.innerHeight - ev.clientY) / boundary;
      } else {
        this.$viewModel.scrollWindow = 0;
      }
    },
    touchStart() {
      this.isTouched = true;
    },
    touchEnd(e) {
      if (this.isCurrentTooltip) {
        e.preventDefault();
        this.hideTooltip();
      } else if (!this.suppressTooltip) {
        e.preventDefault();
        this.showTooltip();
        this.moveTooltipTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
      this.suppressTooltip = false;
      this.isTouched = false;
    },
    touchMove(e) {
      const t = e.changedTouches[0];
      const r = this.$refs.over.getBoundingClientRect();
      if (t.clientX < r.left || t.clientY < r.top || t.clientX > r.left + r.width || t.clientY > r.top + r.height) {
        this.suppressTooltip = true;
      }
      if (this.isDragging) {
        // DragDropTouch doesn't seem to send drag events.
        this.drag(t);
      }
    },
    // Translates 0...3 into equally-spaced coordinates around a circle 90deg apart (0...6 and 45deg for effarig)
    effectIconPos(id) {
      // Place dots clockwise starting from the bottom left
      const realdots = this.glyphEffects.length
      const angle = this.glyph.type === "effarig"
        ? (Math.PI / 4) * (id + 1)
        : this.glyph.type === "reality" 
        ? (Math.PI / (0.5*realdots)) * (id + (this.isRealityGlyph&&this.animationenabled?this.realitydirection/(360/realdots):0.5))
        : (Math.PI / 2) * (id + 0.5)
      const scale = 0.28 * this.size.replace("rem", "");
      const dx = -scale * Math.sin(angle);
      const dy = scale * (Math.cos(angle) + 0.15);
      return { dx, dy };
    },
    glyphEffectDots(id) {
      if (["companion", "cursed","helios"].includes(this.glyph.type)) return {};
      const pos = this.effectIconPos(id);

      return {
        position: "absolute",
        width: "0.3rem",
        height: "0.3rem",
        "border-radius": "50%",
        background: this.isRealityGlyph&&this.animationenabled?(this.bgColor==="white"?"black":"white"):this.symbolColor,
        transform: `translate(${pos.dx - 0.15 * 0.3}rem, ${pos.dy - 0.15 * 0.3}rem)`,
        opacity: Theme.current().name === "S9" ? 0 : 0.8,
        //"box-shadow": this.isRealityGlyph&&this.animationenabled?`0 0 0.2rem 0.1rem ${this.bgColor}, 0 0 0.25rem 0.15rem ${this.symbolColor}`:`0 0 0.2rem 0.1rem ${this.bgColor}`
      };
    },
    glyphBorderStyle() {
      if (!this.showBorders) return null;
      let borderAttrs;
      if (this.isCursedGlyph||this.isHeliosGlyph) borderAttrs = rarityBorderStyles.cursed;
      else if (this.isCompanionGlyph) borderAttrs = rarityBorderStyles.companion;
      else borderAttrs = rarityBorderStyles[getRarity(this.glyph.strength).name.toLowerCase()];
      const lines = borderAttrs.map(attr => generateGradient(attr, this.borderColor, this.glyph, this.circular));

      return {
        position: "absolute",
        left: "2%",
        width: "96%",
        height: "96%",
        "border-radius": this.circular ? "50%" : "15%",
        // Some cases will have undefined lines which need to be removed to combine everything together properly
        background: lines.filter(l => l).join(","),
        "transform":(this.isRealityGlyph&&this.circular&&this.animationenabled)?`rotate(-${this.realitydirection}deg)`:undefined
      };
    },
  }
};
</script>

<template>
  <!--
    The naive approach with a border and box-shadow seems to have problems with
    weird seams/artifacts at the edges. This makes for a rather complex workaround
  -->
  <div
    :style="[outerStyle, {'--crate-posx': crateStyle}]"
    :class="['l-glyph-component', 
    {'c-glyph-component--dragging': isDragging}, 
    {'c-glyph-component-hascrate': hasCrate>=1}]"
    :draggable="draggable"
    v-on="draggable ? { dragstart: dragStart, dragend: dragEnd, drag: drag } : {}"
  >
    <div
      ref="glyph"
      :style="innerStyle"
      :class="['l-glyph-component', 'c-glyph-component']"
    >
      {{ symbol }}
      <template v-if="$viewModel.shiftDown || showGlyphEffectDots">
        <div
          v-for="x in glyphEffects"
          :key="x"
          :style="glyphEffectDots(x)"
        />
      </template>
    </div>
    <div :style="glyphBorderStyle()" />
    <GlyphTooltip
      v-if="hasTooltip && tooltipLoaded"
      v-show="isCurrentTooltip"
      ref="tooltip"
      v-bind="glyph"
      :class="tooltipDirectionClass"
      :style="zIndexStyle"
      :sacrifice-reward="sacrificeReward"
      :refine-reward="refineReward"
      :uncapped-refine-reward="uncappedRefineReward"
      :current-action="currentAction"
      :score-mode="scoreMode"
      :show-deletion-text="showSacrifice"
      :display-level="displayLevel"
      :component="componentID"
      :change-watcher="logTotalSacrifice"
      :glyph="glyph"
    />
    <div
      v-if="isNew"
      class="l-corner-icon l-new-glyph"
    >
      New!
    </div>
    <div
      v-else-if="isUnequipped"
      class="l-corner-icon l-unequipped-glyph fas fa-arrow-up-from-bracket"
    />
    <div
      v-if="displayedInfo"
      class="l-glyph-info"
    >
      {{ displayedInfo }}
    </div>
    <div
      ref="over"
      :style="overStyle"
      v-on="mouseEventHandlers"
      @click.shift.exact="$emit('shiftClicked', glyph.id)"
      @click.ctrl.shift.exact="$emit('ctrlShiftClicked', glyph.id)"
      @click.meta.shift.exact="$emit('ctrlShiftClicked', glyph.id)"
      @click.exact="$emit('clicked', glyph.id)"
    />
  </div>
</template>

<style scoped>
.l-corner-icon {
  position: absolute;
  z-index: 5;
  color: black;
  border-radius: var(--var-border-radius, 0.2rem);
  padding: 0.2rem;
}

.l-new-glyph {
  position: absolute;
  top: -0.5rem;
  z-index: 5;
  color: white;
  line-height: 1.1;
  text-shadow: 1px 1px black,-1px 1px black,1px -1px black,-1px -1px black;
  background: linear-gradient(#aa9675,yellow);
  border: solid #caba9b 1px;
  border-top: none;
  border-radius: 0px 0px 5px 5px;
  padding: 0 0.5rem;
}

.l-unequipped-glyph {
  position: absolute;
  top: -0.5rem;
  z-index: 5;
  color: white;
  line-height: 1.1;
  text-shadow: 1px 1px black,-1px 1px black,1px -1px black,-1px -1px black;
  background: linear-gradient(#aa8175,orange);
  border: solid #d36d29 1px;
  border-top: none;
  border-radius: 0px 0px 5px 5px;
  padding: 0 0.5rem;
}
</style>
