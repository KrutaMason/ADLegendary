<script>
export default {
  name: "CurrentGlyphEffect",
  props: {
    isColored: {
      type: Boolean,
      default: true
    },
    effect: {
      type: Object,
      required: true
    }
  },
  computed: {
    effectConfig() {
      return GlyphEffects[this.effect.id];
    },
    formatValue() {
      const baseValue = this.effect.value.value;
      const value1 = this.effectConfig.formatEffect(baseValue);
      const value2 = this.effectConfig.conversion === undefined
        ? ""
        : this.effectConfig.formatSecondaryEffect(this.effectConfig.conversion(baseValue));
      let desc = this.effectConfig.totalDesc;
      if (this.effectConfig.isDisabledByDoomed) desc = `<span style="text-decoration: line-through;">${desc}</span>`
      return desc
        .replace("{value}", value1)
        .replace("{value2}", value2);
    },
    formatSymbol() {
      const typeObject = this.effectConfig.id === "timeshardpow"
        ? CosmeticGlyphTypes.time
        : CosmeticGlyphTypes[this.effectConfig.glyphTypes];

      if (typeObject.id === "cursed") glyphColor = "var(--color-celestials)";
      let symbol = GLYPH_SYMBOLS[this.effectConfig.glyphTypes]
      return symbol
    },
    textColor() {
      if (!this.isColored) return { };
      const typeObject = this.effectConfig.id === "timeshardpow"
        ? CosmeticGlyphTypes.time
        : CosmeticGlyphTypes[this.effectConfig.glyphTypes];

      let glyphColor = typeObject.currentColor.border;
      if (typeObject.id === "cursed") glyphColor = "var(--color-celestials)";

      return {
        color: glyphColor,
        "text-shadow": `-1px 1px 1px var(--color-text-base), 1px 1px 1px var(--color-text-base),
                            -1px -1px 1px var(--color-text-base), 1px -1px 1px var(--color-text-base),
                            0 0 3px ${typeObject.currentColor.border}`,
        animation: typeObject.id === "reality" ? "a-reality-glyph-description-cycle 10s infinite" : undefined,
      };
    },
    backgroundColor(){
      const typeObject = this.effectConfig.id === "timeshardpow"
        ? CosmeticGlyphTypes.time
        : CosmeticGlyphTypes[this.effectConfig.glyphTypes];

      let glyphColor = typeObject.currentColor.border;
      if (typeObject.id === "cursed") glyphColor = "#5151ec";
      if (typeObject.id === "reality") glyphColor = "#0ba00e";
      return{
        "--bg":`${this.isColored ? glyphColor : "#0ba00e"}55`
      }
    },
    valueClass() {
      return this.effect.value.capped ? "c-current-glyph-effects__effect--capped" : "";
    },
    formatText(){
      return `${this.formatValue}`
      //return `${this.formatSymbol} ${this.formatValue}`
    }

  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("effectConfig");
    });
  },
};
</script>

<template>
  <div class="Current-glyph_effect" 
  :style="backgroundColor"
  >
    <span
      :style="textColor"
      :class="valueClass"
      v-html="formatText"
    />
  </div>
</template>

<style scoped>
.Current-glyph_effect{
  border-bottom: 1px solid ;
  border-image: linear-gradient(90deg,#80808040,#808080a0,#80808040) 1;
  background: linear-gradient(90deg,transparent,var(--bg),transparent);
  text-shadow: var(--var-text-shadow, 0.05rem 0.05rem 0.1rem #000000aa);
}
.Current-glyph_effect:last-child{
  border-bottom: none;
}
</style>
