<script>
export default {
  name: "AutomatorVisualsDropdown",
  props:{
    optionType: {
      type: String,
      required: true,
    },
    panel: {
      type: Number,
      required: true,
    }
  },
  computed: {
    availableTypes() {
      if (this.optionType=='color') return AutomatorVisuals.COLOR;
      if (this.optionType=='grad') return AutomatorVisuals.GRAD;
    }
  },
  methods: {
    setType(type,panel) {
    if (this.optionType=='color') return player.options.automator.color[panel] = type
    if (this.optionType=='grad') return player.options.automator.gradient[panel] = type
    },
    getType(type) {
    if (this.optionType=='color') return AutomatorVisuals.COLOR_LABELS[type];
    if (this.optionType=='grad') return AutomatorVisuals.GRAD_LABELS[type];
    }
  }
}
</script>
<template>
    <div class="l-select-theme__inner">
        <div
        v-for="type in availableTypes"
        :key="type"
        class="o-primary-btn l-select-theme__item c-select-theme__item c-automator-visuals-select-small"
        @click="setType(type,panel)"
      >
        {{ getType(type) }}
      </div>
      </div>
</template>
<style scoped>
.c-automator-visuals-select-small{
  --bg: linear-gradient(var(--color-automator-controls-inactive), var(--color-automator-controls-inactive));
  background: var(--leg-shading), var(--bg);
  border: 0.1rem solid var(--color-automator-controls-border);
  border-radius: 0;
  border-bottom: 0;
  box-shadow: var(--var-box-shadow, 0 0 0.5rem #000000 inset, 0 0 0 0.1rem var(--color-automator-controls-border) inset);
  text-shadow: none;
  color: var(--color-automator-docs-font) !important;
  transition: none;
}
.c-automator-visuals-select-small:hover{
  --bg: linear-gradient(var(--color-automator-controls-inactive), var(--color-automator-active-line-outline));
}
.c-automator-visuals-select-small:first-child {
  border-radius: var(--var-border-radius, 0.5rem) var(--var-border-radius, 0.5rem) 0 0;
}
.c-automator-visuals-select-small:last-child {
  border-radius: 0 0 var(--var-border-radius, 0.5rem) var(--var-border-radius, 0.5rem);
}
</style>