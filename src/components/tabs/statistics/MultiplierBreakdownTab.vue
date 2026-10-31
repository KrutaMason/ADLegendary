<script>
import { createEntryInfo } from "./breakdown-entry-info";
import MultiplierBreakdownEntry from "./MultiplierBreakdownEntry";

const MULT_TAB_OPTIONS = [
  { id: 0, key: "AM", text: "Antimatter Production", style: "var(--color-antimatter)" },
  { id: 1, key: "tickspeed", text: "Tickspeed", style: "var(--color-eternity)" },
  { id: 2, key: "AD", text: "Antimatter Dimensions", style: "var(--color-antimatter)" },
  { id: 3, key: "IP", text: "Infinity Points", style: "var(--color-infinity)" },
  { id: 4, key: "ID", text: "Infinity Dimensions", style: "var(--color-infinity)" },
  { id: 5, key: "infinities", text: "Infinities", style: "var(--color-infinity)" },
  { id: 6, key: "replicanti", text: "Replicanti Speed", style: "var(--color-replicanti)" },
  { id: 7, key: "EP", text: "Eternity Points", style: "var(--color-eternity)" },
  { id: 8, key: "TD", text: "Time Dimensions", style: "var(--color-eternity)" },
  { id: 9, key: "eternities", text: "Eternities", style: "var(--color-eternity)" },
  { id: 10, key: "DT", text: "Dilated Time", style: "var(--color-dilation)" },
  { id: 11, key: "gamespeed", text: "Game Speed", style: "var(--color-reality)" },
];

export default {
  name: "MultiplierBreakdownTab",
  components: {
    MultiplierBreakdownEntry
  },
  data() {
    return {
      availableOptions: [],
      currentID: player.options.multiplierTab.currTab,
    };
  },
  computed: {
    allOptions() {
      return MULT_TAB_OPTIONS;
    },
    currentKey() {
      return MULT_TAB_OPTIONS.find(opt => opt.id === this.currentID).key;
    },
    resource() {
      return createEntryInfo(`${this.currentKey}_total`);
    },
    resourceSymbols() {
      return GameDatabase.multiplierTabValues[this.currentKey].total.overlay;
    }
  },
  methods: {
    update() {
      this.availableOptions = MULT_TAB_OPTIONS.map(opt => ({
        ...opt,
        isActive: this.checkActiveKey(opt.key)
      })).filter(opt => opt.isActive);
    },
    checkActiveKey(key) {
      const act = GameDatabase.multiplierTabValues[key].total.isActive;
      return typeof act === "function" ? act() : act;
    },
    accessProp(prop) {
      return typeof prop === "function" ? prop() : prop;
    },
    subtabClassObject(option) {
      return {
        "c-multiplier-subtab-btn": true,
        "c-multiplier-subtab-btn--active": option.key === this.currentKey,
      };
    },
    clickSubtab(index) {
      this.currentID = this.availableOptions[index].id;
      player.options.multiplierTab.currTab = MULT_TAB_OPTIONS.find(opt => opt.key === this.currentKey).id;
    }
  }
};
</script>

<template>
  <div class="c-stats-tab">
    <div class="l-multiplier-subtab-btn-container">
      <button
        v-for="(option, index) in availableOptions"
        :key="option.key + option.isActive"
        :class="subtabClassObject(option)"
        :style="[{'--color' : option.style}]"
        @click="clickSubtab(index)"
      >
        {{ option.text }}
      </button>
    </div>
    <div class="c-list-container">
      <span
        v-for="symbol in resourceSymbols"
        :key="symbol"
      >
        <span
          class="c-symbol-overlay"
          v-html="symbol"
          :style="[{'--color' : allOptions[currentID].style}]"
        />
      </span>
      <MultiplierBreakdownEntry
        :key="resource.key"
        :resource="resource"
        :is-root="true"
        :style="[{'--color' : allOptions[currentID].style}]"
      />
      <div class="c-multiplier-tab-text-line">
        Note: Entries are only expandable if they contain multiple sources which can be different values.
        For example, any effects which affect all Dimensions of any type equally will not expand into a
        list of eight identical numbers.
        <br>
        <b>
          Some entries may cause lag if expanded out fully. Resizing happens over 200 ms (instead of instantly)
          in order to reduce possible adverse effects due to photosensitivity. This may cause some visual weirdness
          after prestige events.
        </b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-list-container {
  position: relative;
  width: 100rem;
}

.l-multiplier-subtab-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100rem;
  height: calc(4rem - 0.2rem);
}

.c-multiplier-subtab-btn {
  width: 100%;
  height: 4rem;
  margin: 0rem 0.5rem -0.1rem;
  text-align: center;
  font-family: var(--var-secondary-font);
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-text);
  background: linear-gradient(var(--color) -150%,transparent),var(--leg-base-render);
  border: 0.1rem solid var(--color);
  border-radius: var(--var-border-radius, .5rem) var(--var-border-radius, .5rem) 0 0;
  cursor: pointer;
  box-shadow: var(--var-box-shadow, 0 0 1rem var(--color-background) inset, 0 0 0 0.2rem var(--color) inset);
  text-shadow: var(--var-text-shadow, 0.1rem 0.1rem 0.3rem var(--color-text-inverted), -0.1rem -0.1rem 0.3rem var(--color-text-inverted));
  position: relative;
  top: .5rem;
  transition-duration: 0.15s;
}
.c-multiplier-subtab-btn:hover {
  top: -0.1rem;
  box-shadow: var(--var-box-shadow, 0 0 1rem var(--color-background) inset, 0 0.2rem 0 0.2rem var(--color) inset);
  background: linear-gradient(var(--color) -50%, transparent 125%),var(--leg-base-render);
}
.c-multiplier-subtab-btn--active {
  top: -0.1rem;
  z-index: 1;
  box-shadow: var(--var-box-shadow, 0 0.2rem 1rem color-mix(in srgb, var(--color-background) 50%, transparent) inset, 
  0 0.2rem 0 0.2rem var(--color) inset);
  background: linear-gradient(var(--color), transparent 200%),var(--leg-base-render);
  border-bottom: none;
  padding-bottom: 0.2rem;
  cursor: default;
  pointer-events: none;
}

.c-multiplier-tab-text-line {
  color: var(--color-text);
  font-size: 1.3rem;
}

.c-symbol-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  top: -5%;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 40rem;
  color: var(--color-text);
  text-shadow: 0 0 .75rem var(--color),0 0 .75rem var(--color),0 0 3rem;
  pointer-events: none;
  user-select: none;
  opacity: 0.15;
  z-index: 1;
}
</style>
