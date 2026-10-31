<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";

export const AUTOTHEMES = {
  AUTO: 0,
  LIGHT: 1,
  DARK: 2,
  BACKGROUND: 3
};

export default {
  name: "AutomatorVisuals",
  components: {
    ExpandingControlBox,
    PrimaryToggleButton,
    SliderComponent
  },
  data() {
    return {
      scriptPane: {
        theme: 0,
        color: 0,
        gradient: 0,
      },
      infoPane: {
        theme: 0,
        color: 0,
        gradient: 0,
      },
      scriptCustomColor: "#888888",
      infoCustomColor: "",
      animatedScanLine: false,
      scanLineSize: 3,
      opacityLineSize: 0,
    };
  },
  watch: {
    animatedScanLine(newValue) {
      player.options.automatorAppearance.scanLine.animated = newValue;
    },
    scanLineSize(newValue) {
      player.options.automatorAppearance.scanLine.size = newValue;
    },
    opacityLineSize(newValue) {
      player.options.automatorAppearance.scanLine.opacity = newValue;
    },
    scriptCustomColor(newValue) {
      player.options.automatorAppearance.scriptPane.customColor = newValue;
    },
    infoCustomColor(newValue) {
      player.options.automatorAppearance.infoPane.customColor = newValue;
    },
  },
  computed: {
    availableChoices: () => AUTOMATOR_APPEARANCE,
    sizeSliderProps() {
      return {
        min: 1,
        max: 20,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
    opacitySliderProps() {
      return {
        min: 0,
        max: 1,
        interval: 0.01,
        width: "100%",
        tooltip: false
      };
    },
  },
  methods: {
    update() {
      const options = player.options.automatorAppearance;
      this.scriptPane = {
        theme: options.scriptPane.theme,
        color: options.scriptPane.color,
        gradient: options.scriptPane.gradient,
      };
      this.infoPane = {
        theme: options.infoPane.theme,
        color: options.infoPane.color,
        gradient: options.infoPane.gradient,
      };
      this.scriptCustomColor = options.scriptPane.customColor;
      this.infoCustomColor = options.infoPane.customColor;
      this.animatedScanLine = options.scanLine.animated;
      this.scanLineSize = options.scanLine.size;
      this.scanLineOpacity = options.scanLine.opacity;
    },
    infoString(type, id) {
      return AUTOMATOR_APPEARANCE[type][id]
    },
    themeString(pane) {
      switch (this[pane].theme) {
        case AUTOTHEMES.AUTO:
          return "Auto";
        case AUTOTHEMES.LIGHT:
          return "Light";
        case AUTOTHEMES.DARK:
          return "Dark";
        case AUTOTHEMES.BACKGROUND:
          return "Background";
        default:
          throw new Error("Unrecognized Pane Theme setting");
      }
    },
    cycleTheme(x) {
      player.options.automatorAppearance[x].theme = (player.options.automatorAppearance[x].theme + 1) % 
      (x == "infoPane" ? Object.keys(AUTOTHEMES).length : Object.keys(AUTOTHEMES).length - 1)
    },
    setAppearance(pane, type, id) {
      player.options.automatorAppearance[pane][type] = id
    },
    adjustSizeSliderValue(value) {
      this.scanLineSize = value;
      player.options.automatorAppearance.scanLine.size = this.scanLineSize;
    },
    adjustOpacitySliderValue(value) {
      this.scanLineOpacity = value;
      player.options.automatorAppearance.scanLine.opacity = this.scanLineOpacity;
    },
    adjustColor(vueType, ref, playerType) {
      this[vueType] = this.$refs[ref].value;
      player.options.automatorAppearance[playerType].customColor = this[vueType]
    }
  }
};
</script>

<template>
  <div  class="c-automator-docs-page">
    Added as one of the many exclusive features in the mod, this panel allows you to modify the appearance
    of the Automator.
    <br>
    <br>
    Note: Any customizations made to the script pane do not apply when on the block editor mode. The script pane
    will instead display the background from your current general theme.
    <br>
    <br>
    <div class="l-autoptions-row l-autoptions-row--short">
      <br>
      <span><b>Script Pane</b></span>
      <span><b>Document Pane</b></span>
    </div>
    <div class="l-autoptions-row">
      <b>Theme</b>
      <button 
        class="c-automator-visuals-dropdown c-automator-visuals-select" 
        @click="cycleTheme('scriptPane')"
        v-html="themeString('scriptPane')"
      />
      <button 
        class="c-automator-visuals-dropdown c-automator-visuals-select" 
        @click="cycleTheme('infoPane')"
        v-html="themeString('infoPane')"
      />
    </div>
    <div class="l-autoptions-row">
      <b>Gradient</b>
      <ExpandingControlBox
        class="c-automator-visuals-dropdown"
        style="z-index: 4;"
      >
        <template #header>
          <div 
            class="c-automator-visuals-select"
            v-html="`▼ ${infoString('GRAD_LABELS', scriptPane.gradient)} ▼`"
          />
        </template>
        <template #dropdown>
          <div class="c-automator-visuals-select-button__inner">
            <div
              v-for="id in availableChoices.GRAD"
              :key="id"
              v-html="infoString('GRAD_LABELS', id)"
              class="o-primary-btn l-select-theme__item c-select-theme__item c-automator-visuals-select__item"
              @click="setAppearance('scriptPane', 'gradient', id)"
            />
          </div>
        </template>
      </ExpandingControlBox>
      <ExpandingControlBox
        class="c-automator-visuals-dropdown"
        style="z-index: 4;"
      >
        <template #header>
          <div 
            class="c-automator-visuals-select"
            v-html="`▼ ${infoString('GRAD_LABELS', infoPane.gradient)} ▼`"
          />
        </template>
        <template #dropdown>
          <div class="c-automator-visuals-select-button__inner">
            <div
              v-for="id in availableChoices.GRAD"
              :key="id"
              v-html="infoString('GRAD_LABELS', id)"
              class="o-primary-btn l-select-theme__item c-select-theme__item c-automator-visuals-select__item"
              @click="setAppearance('infoPane', 'gradient', id)"
            />
          </div>
        </template>
      </ExpandingControlBox>      
    </div>
    <div class="l-autoptions-row">
      <b>Color</b>
      <ExpandingControlBox
        class="c-automator-visuals-dropdown"
        style="z-index: 3;"
      >
        <template #header>
          <div 
            class="c-automator-visuals-select"
            v-html="`▼ ${infoString('COLOR_LABELS', scriptPane.color)} ▼`"
          />
        </template>
        <template #dropdown>
          <div class="c-automator-visuals-select-button__inner">
            <div
              v-for="id in availableChoices.COLOR"
              :key="id"
              v-html="infoString('COLOR_LABELS', id)"
              class="o-primary-btn l-select-theme__item c-select-theme__item c-automator-visuals-select__item"
              @click="setAppearance('scriptPane', 'color', id)"
            />
          </div>
        </template>
      </ExpandingControlBox>
      <ExpandingControlBox
        class="c-automator-visuals-dropdown"
        style="z-index: 3;"
      >
        <template #header>
          <div 
            class="c-automator-visuals-select"
            v-html="`▼ ${infoString('COLOR_LABELS', infoPane.color)} ▼`"
          />
        </template>
        <template #dropdown>
          <div class="c-automator-visuals-select-button__inner">
            <div
              v-for="id in availableChoices.COLOR"
              :key="id"
              v-html="infoString('COLOR_LABELS', id)"
              class="o-primary-btn l-select-theme__item c-select-theme__item c-automator-visuals-select__item"
              @click="setAppearance('infoPane', 'color', id)"
            />
          </div>
        </template>
      </ExpandingControlBox>
    </div>
    <div class="l-autoptions-row">
      <b>Custom Color</b>
      <div 
        class="c-automator-visuals-dropdown c-automator-visuals-select"
        v-if="scriptPane.color == availableChoices.COLOR.CUSTOM"
      >
        {{ scriptCustomColor }}
        <input
          ref="scriptColorInput"
          type="color"
          v-model="scriptCustomColor"
          @input="adjustColor('scriptCustomColor', 'scriptColorInput', 'scriptPane')"
        />
      </div>
      <span v-else />
      <div 
        class="c-automator-visuals-dropdown c-automator-visuals-select"
        v-if="infoPane.color == availableChoices.COLOR.CUSTOM"
      >
        {{ infoCustomColor }}
        <input
          ref="infoColorInput"
          type="color"
          v-model="infoCustomColor"
          @input="adjustColor('infoCustomColor', 'infoColorInput', 'infoPane')"
        />
      </div>
      <span v-else />
    </div>
    <div class="l-autoptions-row l-autoptions-row--short">
      <br>
      <span/>
      <span><b>Scan Lines</b></span>
    </div>
    <div class="l-autoptions-row">
      <b>Animation</b>
      <br>
      <PrimaryToggleButton
        v-model="animatedScanLine"
        class="c-automator-visuals-dropdown c-automator-visuals-select"
        label=""
      />
    </div>
    <div class="l-autoptions-row l-autoptions-row--slider">
      <b>Line Size</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sizeSliderProps"
        :value="scanLineSize"
        @input="adjustSizeSliderValue($event)"
      />
      <span><b>{{ formatInt(parseInt(scanLineSize)) }}pt</b></span>
    </div>
    <div class="l-autoptions-row l-autoptions-row--slider">
      <b>Line Opacity</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="opacitySliderProps"
        :value="scanLineOpacity"
        @input="adjustOpacitySliderValue($event)"
      />
      <span><b>{{ formatPercents(scanLineOpacity) }}</b></span>
    </div>
  </div>
</template>

<style scoped>
.l-autoptions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem .5rem;
}

.l-autoptions-row {
  height: 4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 21rem 21rem;
  align-items: center;
}

.l-autoptions-row--slider {
  grid-template-columns: 1fr 21rem 21rem;
}

.l-autoptions-row--short {
  height: 2.5rem;
}

.l-autoptions-row > span {
  text-align: center;
}

.c-automator-visuals-dropdown {
  margin: 0.5rem;
  width: 20rem;
  user-select: none;
}

.c-automator-visuals-select__inner {
  overflow-y: auto;
  flex-direction: column;
  max-height: 15rem;
  scrollbar-color: var(--color-automator-background-accent) var(--color-disabled);
  scrollbar-width: thin;
}

.c-automator-visuals-select {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Typewriter, serif;
  background-color: var(--color-automator-controls-inactive);
  background-image: linear-gradient(#ffffff88 -100%,transparent 49%, #00000022 50%, transparent 75%);
  border: 0.1rem solid var(--color-automator-controls-border);
  box-shadow: var(--var-box-shadow, 0 0 0.5rem var(--color-automator-controls-shadow) inset, 0 0 0 0.1rem var(--color-automator-controls-border) inset);
  border-radius: var(--var-border-radius, 0.5rem);
  font-size: 1.2rem;
  color: var(--color-automator-docs-font) !important;
  text-shadow: none;
  cursor: pointer;
  transition: none;
}

.c-automator-visuals-select__item {
  --bg: linear-gradient(var(--color-automator-controls-inactive), var(--color-automator-controls-inactive));
  background: var(--leg-shading), var(--bg);
  border: 0.1rem solid var(--color-automator-controls-border);
  border-radius: 0;
  border-bottom: 0;
  box-shadow: var(--var-box-shadow, 0 0 0.5rem var(--color-automator-controls-shadow) inset, 0 0 0 0.1rem var(--color-automator-controls-border) inset);
  text-shadow: none;
  color: var(--color-automator-docs-font) !important;
  transition: none;
}

.c-automator-visuals-select__item:hover {
  --bg: linear-gradient(var(--color-automator-controls-inactive), var(--color-automator-active-line-outline));
}
</style>
