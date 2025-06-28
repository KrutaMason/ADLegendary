<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import AutomatorVisualsDropdown from "./AutomatorVisualsDropdown";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
export const AUTOTHEMES = {
        AUTO:0,
        LIGHT:1,
        DARK:2,
        BACKGROUND:3
};
export default {
  name: "AutomatorVisuals",
  components: {
    ExpandingControlBox,
    AutomatorVisualsDropdown,
    PrimaryToggleButton
  },
  data() {
    return {
      panelTheme: [0,0],
      panelColor: [0,0],
      panelGradient: [0,0],
      scanimation:false
    };
  },
  watch: {
    scanimation(newValue) {
      player.options.automator.animation = newValue;
    }
  },
  computed: {
    disabledClass(){
      return {
        "c-automator-visuals-select--disabled":this.panelTheme[1] === 3,
      }
    }
  },
  methods: {
    update() {
      const options = player.options.automator;
      this.panelTheme = [options.theme[0],options.theme[1]]
      this.panelColor = [options.color[0],options.color[1]]
      this.panelGradient = [options.gradient[0],options.gradient[1]]
      this.scanimation = options.animation
    },
    infoLabel(type,panel) {
      if (type === "color") return AutomatorVisuals.COLOR_LABELS[this.panelColor[panel]];
      if (type === "grad") return AutomatorVisuals.GRAD_LABELS[this.panelGradient[panel]];
    },
    AutoBGStr(panel) {
      switch (this.panelTheme[panel]) {
        case AUTOTHEMES.AUTO:
          return "Auto";
        case AUTOTHEMES.LIGHT:
          return "Light";
        case AUTOTHEMES.DARK:
          return "Dark";
        case AUTOTHEMES.BACKGROUND:
          return "Background";
        default:
          throw new Error("Unrecognized Panel Theme setting");
      }
    },
    cycleTheme(x) {
      player.options.automator.theme[x] = (player.options.automator.theme[x] + 1) % (Object.keys(AUTOTHEMES).length-(1-x));
    },
  }
};
</script>

<template>
  <div>
    This panel allows you to customize the layout of your Automator. Note that Block Editor only has the background theme.
    <br>
    <br>
    <div class="l-autoptions-container o-descriptionBlock">
    <div style="display: flex;flex-wrap: wrap;justify-content: center;">
      <div class="l-autoptions-column">
        <div style="text-align: center;" class="o-hint-text">Script Panel</div>
        <button class="c-automator-visuals-dropdown c-automator-visuals-select" 
        @click="cycleTheme(0)"> Theme: {{ AutoBGStr(0) }}</button>
        <ExpandingControlBox class="c-automator-visuals-dropdown" style="z-index:4;">
          <template #header>
            <div class="c-automator-visuals-select">▼ Color: ▼<br>{{ infoLabel("color",0) }}</div>
          </template>
          <template #dropdown>
            <AutomatorVisualsDropdown :optionType="'color'" :panel="0"/>
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox class="c-automator-visuals-dropdown">
          <template #header>
            <div class="c-automator-visuals-select ">
              ▼ Gradient: ▼<br>{{ infoLabel("grad",0) }}
            </div>
          </template>
          <template #dropdown>
            <AutomatorVisualsDropdown :optionType="'grad'" :panel="0"/>
          </template>
        </ExpandingControlBox>
      </div>
      <div class="l-autoptions-column">
        <div style="text-align: center;" class="o-hint-text">Info Panel</div>
        <button class="c-automator-visuals-dropdown c-automator-visuals-select" 
        @click="cycleTheme(1)"> Theme: {{ AutoBGStr(1) }}</button>
        <ExpandingControlBox class="c-automator-visuals-dropdown" style="z-index:4;" 
        :class="{'c-automator-visuals-dropdown--disabled':panelTheme[1] === 3}">
          <template #header>
            <div class="c-automator-visuals-select" 
            :class="{'c-automator-visuals-select--disabled':panelTheme[1] === 3}">
              ▼ Color: ▼<br>{{ infoLabel("color",1) }}
            </div>
          </template>
          <template #dropdown>
            <AutomatorVisualsDropdown :optionType="'color'" :panel="1"/>
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox class="c-automator-visuals-dropdown" 
        :class="{'c-automator-visuals-dropdown--disabled':panelTheme[1] === 3}">
          <template #header>
            <div class="c-automator-visuals-select" 
            :class="{'c-automator-visuals-select--disabled':panelTheme[1] === 3}">
              ▼ Gradient: ▼<br>{{ infoLabel("grad",1) }}
            </div>
          </template>
          <template #dropdown>
            <AutomatorVisualsDropdown :optionType="'grad'" :panel="1"/>
          </template>
        </ExpandingControlBox>
      </div>
      <div class="l-autoptions-column">
        <div style="text-align: center;" class="o-hint-text">Miscellaneous</div>
        <PrimaryToggleButton
          v-model="scanimation"
          class="c-automator-visuals-dropdown c-automator-visuals-select"
          label="Scanline Animation:"
          style="color: var(--color-automator-docs-font);"
        />
      </div>
    </div>
    </div>    
  </div>
</template>

<style scoped>
.l-autoptions-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem .5rem;
}
.l-autoptions-column{
  display: flex;
  flex-direction: column;
}
.c-automator-visuals-dropdown{
  margin: 0.5rem 0.8rem;
  user-select: none;
}
.c-automator-visuals-dropdown--disabled{
  pointer-events: none;
}
.c-automator-visuals-select{
  width: 20rem;
  height:5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-align-last: center;
  font-family: Typewriter, serif;
  background-color: var(--color-automator-controls-inactive);
  background-image: linear-gradient(#ffffff88 -100%,transparent 49%, #00000022 50%, transparent 75%);
  border: 0.1rem solid var(--color-automator-controls-border);
  box-shadow: var(--var-box-shadow, 0 0 0.5rem #000000 inset, 0 0 0 0.2rem var(--color-automator-controls-border) inset);
  border-radius: var(--var-border-radius, 0.5rem);
  font-size: 1.2rem;
  color: var(--color-automator-docs-font);
  text-shadow: none;
  cursor: pointer;
  transition: none;
}
.c-automator-visuals-select--disabled{
  background-color: var(--color-automator-controls-border);
}
</style>
