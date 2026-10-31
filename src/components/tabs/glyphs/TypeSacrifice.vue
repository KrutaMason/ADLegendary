<script>
export default {
  name: "TypeSacrifice",
  props: {
    type: {
      type: String,
      required: true
    },
    hasDragover: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      amount: 0,
      effectValue: 0,
      boostValue: 0,
      isColored: true,
      willSacrifice: false
    };
  },
  computed: {
    typeConfig() {
      return GlyphTypes[this.type];
    },
    sacConfig() {
      return GlyphSacrifice[this.type].config;
    },
    rarity: () => GlyphRarities.map(r => strengthToRarity(r.minStrength)).reverse(),
    maxStars() {
      if (this.type === "helios") return 8;
      return 4;
    },
    style() {
      if (!this.isColored) return {
        "border" : "1px solid color-mix(in srgb, currentcolor 50%, transparent)",
        "background": `linear-gradient(90deg, color-mix(in srgb, var(--color-reality) 33%, transparent),
        var(--fade) 10%, color-mix(in srgb, var(--color-reality) 33%, transparent), var(--fade) 90%, 
        color-mix(in srgb, var(--color-reality) 33%, transparent))`,
        "position": "relative"
      };
      const color = GlyphAppearanceHandler.getBorderColor(this.type);
      const animateReality = this.typeConfig.id === "reality" && !player.reality.glyphs.cosmetics.colorMap.reality;
      const bgcolor = animateReality 
      ? "color-mix(in srgb, currentcolor 25%, transparent)" : GlyphAppearanceHandler.getBorderColor(this.type)+"40"
      return {
        color: this.typeConfig.id === "dilation" && !Theme.current().isDark()?"#469713":color,
        "border" : "1px solid",
        "border-color": "color-mix(in srgb, currentcolor 50%, transparent)",
        "text-shadow": `var(--var-text-shadow, -1px 1px 2px var(--color-text-inverted), 1px 1px 2px var(--color-text-inverted),
                            -1px -1px 2px var(--color-text-inverted), 1px -1px 2px var(--color-text-inverted),
                            0 0 3px ${color})`,
        "--color-text-base":"var(--color-text-inverted)",
        animation: animateReality ? "a-reality-glyph-description-cycle 10s infinite" : undefined,
        "background": `linear-gradient(90deg,${bgcolor},var(--fade) 10%,${bgcolor},var(--fade) 90%,${bgcolor})`,
        "position": "relative"
      };
    },
    style2() {
      const bgcolor = this.typeConfig.id === "reality" && !player.reality.glyphs.cosmetics.colorMap.reality
       ? "color-mix(in srgb, currentcolor 25%, transparent)" : GlyphAppearanceHandler.getBorderColor(this.type)+"40"
      return {
        "border-bottom": `0.1rem solid`,
        "border-image": `linear-gradient(90deg,transparent,${this.showNewSacrifice ? "var(--color-text)":"currentcolor"},transparent) 1`,
        "background": this.showNewSacrifice && this.isColored ? `linear-gradient(90deg,transparent,${bgcolor},transparent)`:undefined,
      };
    },
    symbol() {
      return CosmeticGlyphTypes[this.type].currentSymbol.symbol;
    },
    formatAmount() {
      if (this.type === "helios") return formatInt(this.amount)
      return format(this.amount, 2, 2);
    },
    description() {
      return this.sacConfig.description(this.effectValue);
    },
    newDescription() {
      if (this.type === "helios") return this.sacConfig.description(this.sacConfig.effect(this.currentSacrifice.sacrificeValue),this.currentSacrifice.sacrificeValue)
      return this.sacConfig.description(this.sacConfig.effect(this.currentSacrifice.sacrificeValue));
    },
    boostdescription() {
      return this.sacConfig.boostdescription(this.boostValue);
    },
    newboostDescription() {
      return this.sacConfig.boostdescription(this.sacConfig.boostValue(this.currentSacrifice.sacrificeValue));
    },
    currentSacrifice() {
      const viewModel = this.$viewModel.tabs.reality;
      return viewModel.mouseoverGlyphInfo.type === ""
        ? viewModel.draggingGlyphInfo
        : viewModel.mouseoverGlyphInfo;
    },
    showNewSacrifice() {
      const matchType = this.currentSacrifice.type === this.type;
      const validSac = this.willSacrifice && this.currentSacrifice.inInventory;
      const keybindActive = ui.view.shiftDown;
      return matchType && (this.hasDragover || (keybindActive && validSac));
    },
    formatNewAmount() {
      if (this.type === "helios") return formatInt(this.currentSacrifice.sacrificeValue)
      return format(this.currentSacrifice.sacrificeValue, 2, 2);
    },
    formatTotalAmount() {
      if (this.type === "helios") return formatInt(this.amount + this.currentSacrifice.sacrificeValue)
      return format(this.amount + this.currentSacrifice.sacrificeValue, 2, 2);
    },
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("style");
    });
    this.on$(GAME_EVENT.NAME_CHANGED, () => {
      this.$recompute("description");
      this.$recompute("newDescription");
      this.$recompute("boostdescription");
      this.$recompute("newboostDescription");
    });
  },
  methods: {
    update() {
      this.amount = player.reality.glyphs.sac[this.type];
      this.effectValue = GlyphSacrifice[this.type].effectValue;
      this.boostValue = GlyphSacrifice[this.type].config.boostValue();
      this.isColored = player.options.glyphTextColors;
      this.willSacrifice = AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.SACRIFICE ||
        (AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE_TO_CAP &&
          this.currentSacrifice.refineValue === 0);
    },
    requirement(n) {
      let req;
      if (this.type === "helios") switch (n) {
        default:
          req = this.amount >= this.rarity[n]
      }
      else switch (n) {
        case 1:
          req = this.amount >= GlyphAlteration.additionThreshold && this.type !== "reality"
          break;
        case 2:
          req = this.amount >= GlyphAlteration.empowermentThreshold && this.type !== "reality"
          break;
        case 3:
          req = this.amount >= GlyphAlteration.boostingThreshold && this.type !== "reality"
          break;
        case 4:
          req = this.amount >= GlyphSacrificeHandler.maxSacrificeForEffects
          break;
      }
      return req
    },
    tooltip(n) {
      let message;
      if (this.type === "helios") switch (n) {
        case 8:
          message = `Exclusive Rarity!<br>
          Reached ${formatInt(this.rarity[n])} ${this.symbol}`
          break;
        default:
          return `${getRarity(rarityToStrength(this.rarity[n])).name} Helios Glyph <br>
          Reached ${formatInt(this.rarity[n])} ${this.symbol}`;
      }
      else switch (n) {
        case 1:
          message = `Additional effect <br>
          Reached ${format(GlyphAlteration.additionThreshold,2)} ${this.symbol}`
          break;
        case 2:
          message = `Improved formula <br>
          Reached ${format(GlyphAlteration.empowermentThreshold,2)} ${this.symbol}`
          break;
        case 3:
          message = `Sacrificial boost <br>
          Reached ${format(GlyphAlteration.boostingThreshold,2)} ${this.symbol}`
          break;
        case 4:
          message = `Effect hardcap <br>
          Reached ${format(GlyphSacrificeHandler.maxSacrificeForEffects,2)} ${this.symbol}`
          break;
      }
      return message
    },
  },
};
</script>

<template>
  <div
    v-if="amount > 0"
    :style="style"
    class="o-descriptionBlock"
    :class="{'o-descriptionBlock-glow' : showNewSacrifice}"
  >
    <div :style="style2">
      <div class="l-sacrificed-glyphs__type-symbol c-sacrificed-glyphs__type-symbol">
        {{ symbol }}
      </div>
      <div class="l-sacrificed-glyphs__type-amount c-sacrificed-glyphs__type-amount">
        <span :class="diffFont(formatAmount)">{{ formatAmount }}</span>
        <span
        :class="{'c-sacrificed-glyphs__type-new-amount-glow':showNewSacrifice}"
          class="c-sacrificed-glyphs__type-new-amount c-sacrificed-glyphs__type-new-amount-hidden"
        >
         + <span :class="diffFont(formatNewAmount)">{{ formatNewAmount }}</span>
          ➜ <span :class="diffFont(formatTotalAmount)">{{ formatTotalAmount }}</span>
        </span>
      </div>
      <div class="l-sacrificed-glyphs__type-boosts">
        <span 
          v-for="i in maxStars"
          :key="i"
          v-if="requirement(i)" 
          v-tooltip="tooltip(i)"
        >★</span>
      </div>
    </div>
    <span
      :class="{'c-sacrificed-glyphs__type-new-amount':showNewSacrifice}"
    >
      {{ showNewSacrifice ? newDescription : description }}
    </span><br>
    <span
      v-if="requirement(3) && this.type!== 'helios'"
      :class="{'c-sacrificed-glyphs__type-new-amount':showNewSacrifice}"
    >
    ★ {{ showNewSacrifice ? newboostDescription : boostdescription }} ★
    </span>
  </div>
</template>

<style scoped>
.o-descriptionBlock-glow {
  transition: 0.2s;
  border-color: var(--color-reality-dark) !important;
  box-shadow: 0 0 1.5rem inset var(--color-reality-dark), 0.1rem 0.1rem 0.3rem #00000088
}
.s-base--dark .o-descriptionBlock-glow {
  border-color: var(--color-reality-light) !important;
  box-shadow: 0 0 1.5rem inset var(--color-reality-light), 0px -1rem 1rem #00000080
}
.c-sacrificed-glyphs__type-symbol {
  margin-right: 0.7rem;
}
.c-sacrificed-glyphs__type-new-amount-hidden {
  font-size: 0rem;
  transition: 0.15s
}
.c-sacrificed-glyphs__type-new-amount-glow{
  font-size:unset;
}
.l-sacrificed-glyphs__type-boosts{
  position: absolute;
  display: flex;
  right: 0rem;
  top: 0rem;
  font-size: 1.5rem;
  line-height: 1;
  margin-right: 0.5rem;
}
.l-sacrificed-glyphs__type-boosts > span{
  cursor: pointer
}
</style>
