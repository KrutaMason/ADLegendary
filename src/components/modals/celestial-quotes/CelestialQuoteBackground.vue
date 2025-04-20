<script>
export default {
  name: "CelestialQuoteBackground",
  props: {
    celestialSymbols: {
      // Array elements are String
      type: Array,
      required: true
    },
    celestials: {
      // Array elements are [String, Number]
      type: Array,
      required: true
    },
    primary: {
      type: Boolean,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    modalClass() {
      return {
        "l-modal-celestial-quote": true,
      };
    },
    imageDisplay() {
      return {
        "background-image": `url(images/quotes/${this.image}.png)`,
        //"image-rendering": "pixelated"
}},
  },
  methods: {
    styleObject(celEntry, opac, isText) {
      const baseCol = `var(--color-${celEntry[0]}--base)`;
      if (celEntry[0] === "laitela") {
        return {
          color: `white`,
          "--scoped-cel-color":`white`,
          // color: `var(--color-${celEntry[0]}--accent)`,
          //background: isText ? undefined : baseCol,
          opacity: opac * celEntry[1]
        };
      }
      return {
        color: baseCol,
        "--scoped-cel-color":baseCol,
        opacity: opac * celEntry[1]
      };
    },
  },
};
</script>

<template>
  <div :class="modalClass">
    <span
      v-for="(celestial, index) in celestials"
      :key="index"
      class="c-modal-celestial-quote c-modal-celestial-quote__symbol"
      :style="styleObject(celestial, .2, true)"
      v-html="celestialSymbols[index]"
    />
    <span
      v-for="(celestial, index) in celestials"
      :key="index + 10"
      class="c-modal-celestial-quote c-modal-celestial-quote__shadow"
      :style="styleObject(celestial, 1, false)"
    />
    <span class="c-modal-celestial-quote c-modal-celestial-quote__image">
    <div class="c-modal-celestial-image-container" :style="imageDisplay"/>
    </span>
    <span
      v-for="(celestial, index) in celestials"
      :key="index + 20"
      class="c-modal-celestial-quote c-modal-celestial-quote__text"
      :style="styleObject(celestial, 1, true)"
    >
      <slot />
    </span>
  </div>
</template>

<style scoped>
.l-modal-celestial-quote {
  display: flex;
  flex-direction: row;
  width: 64rem;
  height: 48rem;
  position: absolute;
  /* stylelint-disable-next-line unit-allowed-list */
  top: 50vh;
  /* stylelint-disable-next-line unit-allowed-list */
  left: 50vw;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--var-border-radius, 1rem);
  transform: translate(-50%, -50%);
  box-shadow:0 0 2rem black inset;
  text-shadow: 0.1rem 0.1rem 0.3rem black,-0.1rem -0.1rem 0.3rem black;
  background: url(../../../../public/images/glyphs-alchemy/background-glyph_transparentdark.png),
  linear-gradient(transparent,black 75%),var(--leg-base-render);
  background-position: center;
}

.c-modal-celestial-quote {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border-radius: var(--var-border-radius, 1rem);
}

.c-modal-celestial-quote__symbol {
  z-index: 1;
  font-size: 13rem;
  text-shadow: 0 0 2rem;
  height: 0;
  bottom: 8rem;
}

.c-modal-celestial-quote__shadow {
  border-radius: var(--var-border-radius, 1rem);
  box-shadow: 0 0 0 0.1rem inset,0 0 1rem black inset,0 0 0 0.4rem inset,0 0 1.5rem 0.1rem, 0 0 1.5rem 0.2rem inset;
}

.s-base--metro .c-modal-celestial-quote__shadow {
  box-shadow: 0 0 0 0.1rem inset,0 0 1rem black inset,0 0 0 0.4rem inset,0 0 1rem 0.2rem, 0 0 1.5rem 0.1rem inset
}

.c-modal-celestial-quote__image {
  flex-direction: column;
  bottom: 4rem;
  z-index: 1;
}
.c-modal-celestial-quote__text {
  z-index: 2;
  padding: 0 2.5rem;
  flex-direction: column;
  height:0;
  bottom:8.5rem;
}
.c-modal-celestial-image-container {
  width: 54rem;
  height: 30rem;
  margin-bottom: 1rem;
  border: var(--var-border-width, 0.3rem) solid;
  border-image: var(--leg-border-render) 3 round;
  background-size: 54rem 30rem;
  background-position: center;
  box-sizing: content-box;
}
.t-s9 .c-modal-celestial-image-container{
  background-image: none !important
}
</style>
