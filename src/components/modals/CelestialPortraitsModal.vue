<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
name: "CelestialPortraitsModal",
  components: {
    ModalWrapper
  },
  props: {
    name: {
      type: String,
      required: true
    },
    celestial: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        portraitName: undefined,
        hasMatureContent: false,
    };
  },
  computed: {
    symbol() {
      return this.celestial.symbol;
    },
    hasAdultDesigns: () => "laitela",
    color() {
      return this.name === "laitela" ? `var(--color-laitela--accent)` : `var(--color-${this.name}--base)`;
    },
    imageUrl() {
      if (!this.hasMatureContent && this.name === this.hasAdultDesigns) return `images/celestials/portrait_${this.name}_safe.png`
      return `images/celestials/portrait_${this.name}.png`;
    },
  },
  methods: {
    update() {
      this.portraitName = this.celestial.displayName
      this.hasMatureContent = player.options.mature
    },
  },
}
</script>

<template>
  <ModalWrapper
  :style="{'--base':color}"
  >
    <template #header>
      <span v-html="symbol" style="font-family: Typewriter; font-weight: normal" /> 
       Portrait of {{ portraitName }} 
      <span v-html="symbol" style="font-family: Typewriter; font-weight: normal" />
    </template>
      <div
      class="o-celportrait--display" 
      :style="{'--scoped-cel-color':color}"
      >
      <img
      class="o-celportrait--image" 
      :src="imageUrl"
      />
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-celportrait--display{
  background-image: linear-gradient(#666666,#333333 75%,#444444 80%,#333333);
  background-size: contain;
  overflow: hidden;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--var-border-radius,1rem);
  border: 0.1px solid black;
  width: 65vh;
  height: 65vh;
  max-width: 1024px;
  max-height: 1024px;
  margin: 0.5rem;
}
.o-celportrait--display > img{
  z-index: 1;
}
</style>
