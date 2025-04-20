<script>
export default {
  name: "CelestialQuoteHistory",
  props: {
    celestial: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShown: false
    };
  },
  computed: {
    color() {
      return this.celestial === "laitela" ? `var(--color-laitela--accent)` : `var(--color-${this.celestial}--base)`;
    },
    possessiveForm() {
      return Celestials[this.celestial].possessiveName;
    },
    name() {
      return Celestials[this.celestial].displayTitle;
    },
    symbol() {
      return Celestials[this.celestial].symbol;
    },
    celestialOf() {
      return Celestials[this.celestial].celestialOf;
    }
  },
  methods: {
    update() {
      this.isShown = Celestials[this.celestial].quotes.all.some(x => x.isUnlocked);
    },
    showQuotes() {
      Quote.showHistory(Celestials[this.celestial].quotes.all);
    },
    showInfo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.name === Celestials[this.celestial].displayName)[0];
      Modal.h2p.show();
    },
    showPortraits() {
      Modal.celestialPortraits.show({
        name: this.celestial,
        celestial: Celestials[this.celestial] }
      );
    },
  }
};
</script>

<template>
  <div v-if="isShown">
    <div 
      class="c-celestial-title--header"
      :style="{
      '--scoped-cel-color': color
      }">
      <span class="c-celestial-title--header-symbol" v-html="symbol"/>
      {{ name }}
      <span class="c-celestial-title--header-symbol" v-html="symbol"/>
      <div class="c-celestial-title--header-small">
        Celestial of {{ celestialOf }}
      </div>
    </div>
  <button
    class="c-celestial-quote-history--button"
    :style="{
      '--scoped-cel-color': color
    }"
    @click="showInfo"
  >
    Info
  </button>
  <button
    class="c-celestial-quote-history--button"
    :style="{
      '--scoped-cel-color': color
    }"
    @click="showQuotes"
  >
    Quotes
  </button>
  <button
    class="c-celestial-quote-history--button"
    :style="{
      '--scoped-cel-color': color
    }"
    @click="showPortraits"
  >
    Portrait
  </button>
  </div>
</template>

<style scope>
.c-celestial-title--header{
  font-family: cambria;
  font-weight:bold;
  font-size:2rem;
  line-height: 1.1;
  background: linear-gradient(90deg,transparent,color-mix(in srgb,var(--scoped-cel-color) 40%,transparent),transparent);
  border-top:0.1rem solid;
  border-bottom:0.1rem solid;
  border-image: linear-gradient(90deg,transparent,var(--scoped-cel-color),transparent) 1;
  padding:0.2rem 15rem;
  margin-bottom: 0.5rem;
  color:var(--color-text)
}
.c-celestial-title--header-small{
  font-size:1.5rem
}
.c-celestial-title--header-symbol{
  font-family: Typewriter;
  font-weight: normal;
  padding: 0 0.5rem;
}
.c-celestial-quote-history--button {
  align-self: center;
  font-family: Typewriter;
  font-size: 1.3rem;
  width:10rem;
  color: var(--color-text);
  text-shadow: var(--text-shadow);
  background: var(--lighting),linear-gradient(transparent -100%,var(--scoped-cel-color) 200%), var(--leg-base-render);
  --lighting:linear-gradient(#ffffff88 -100%,transparent 49%, #00000022 50%, transparent 75%);
  border: var(--var-border-width, 0.1rem) solid var(--scoped-cel-color);
  box-shadow: 0 0 1rem black inset, 0 0 0 0.2rem var(--scoped-cel-color) inset;
  border-radius: var(--var-border-radius, 0.5rem);
  margin: 0 0.5rem 1.5rem;
  padding: 0.5rem;
  transition: 0.2s;
  transition-property: color, background-color;
  cursor: pointer;
}

.c-celestial-quote-history--button:hover {
  background: var(--lighting),linear-gradient(transparent -100%,var(--scoped-cel-color) 100%), var(--leg-base-render);
}
.s-base--dark .c-celestial-quote-history--button{
  --lighting:linear-gradient(#ffffff88 -100%,transparent 49%, #00000044 50%, transparent)
}
</style>
