<script>
import CelestialQuoteBackground from "./CelestialQuoteBackground";

export default {
  name: "CelestialQuoteLine",
  components: {
    CelestialQuoteBackground
  },
  props: {
    quote: {
      type: Object,
      required: true
    },
    currentLine: {
      type: Number,
      required: true
    },
    primary: {
      type: Boolean,
      required: false,
      default: false,
    },
    leftVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    rightVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    closeVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    skipVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    hasTypeEffect: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  data() {
    return {
      message: "",
      celestialSymbols: [],
      celestials: [],
      celestialName: "",
      image: undefined,
      rolled:0,
    };
  },
  computed: {
    line() {
      return this.quote.line(this.currentLine);
    },
    noTalkies() {
      return [" ",".","!",":",";","?"]
    },
    Ends() {
      return [".","!","?"]
    },
    talk() {
      if (!this.noTalkies.includes(this.line.line.charAt(this.rolled))
      &&this.rolled<this.line.line.length) AudioManagement.speakQuote(this.line._parent.celestial)
      //`quote_${this.line._parent.celestial}`
    },
    pauseSystem(){
      let speed = 1
      if (this.line.line.slice(Math.floor(this.rolled),this.line.line.length).startsWith("<br>")) return speed=4
      if (this.line.line.slice(Math.floor(this.rolled)-1,this.line.line.length).startsWith("$")) return speed=2
      if (this.line.line.slice(Math.floor(this.rolled)-1,this.line.line.length).startsWith(",")||
      this.line.line.slice(Math.floor(this.rolled)-1,this.line.line.length).startsWith(";")) return speed=1/2
      if (this.Ends.includes(this.line.line.charAt(Math.floor(this.rolled)-1))) return speed=1/8
      return speed
    },
    leftClass() {
      return {
        "c-modal-celestial-quote__arrow": true,
        "c-modal-celestial-quote__arrow-left": true,
        "fas": true,
        "fa-chevron-circle-left": true,
      };
    },
    rightClass() {
      return {
        "c-modal-celestial-quote__arrow": true,
        "c-modal-celestial-quote__arrow-right": true,
        "fas": true,
        "fa-chevron-circle-right": true,
      };
    },
  },
  created() {
    const oldRate = player.options.updateRate;
    if (this.hasTypeEffect) {
    player.options.updateRate = 33;
    GameOptions.refreshUpdateRate();
    player.options.updateRate = oldRate;
    }
    else this.rolled=this.line.line.length+1
  },
  destroyed() {
    GameOptions.refreshUpdateRate();
  },
  methods: {
    update() {
      const line = this.line;
      this.celestialSymbols = line.celestialSymbols;
      this.message = this.hasTypeEffect ? line.line.slice(0,this.rolled):  line.line;
      this.celestials = line.celestials;
      this.celestialName = line.celestialName;
      this.image = line.image
      this.updateTyping()
    },
    
    updateTyping() {
      if (this.hasTypeEffect&&this.rolled<this.line.line.length){
      this.rolled += this.pauseSystem
      this.talk
    }
    }
  },
};
</script>

<template>
  <CelestialQuoteBackground
    :celestial-symbols="celestialSymbols"
    :celestials="celestials"
    :primary="primary"
    :image="image"
  >
    <span
      v-if="line.showCelestialName"
      class="c-modal-celestial-name"
    >
      {{ celestialName }}
    </span>
    <br v-if="!line.showCelestialName">
    <i
      v-if="leftVisible"
      :class="leftClass"
      @click="$emit('progress-in', 'left');rolled=0"
    />

    <span class="l-modal-celestial-quote__text"
      v-html="this.message"
    />

    <i
      v-if="rightVisible"
      :class="rightClass"
      @click="$emit('progress-in', 'right');rolled=0"
    />
    <i
      v-if="closeVisible"
      class="c-modal-celestial-quote__end fas fa-check-circle"
      @click="emitClose"
    />
    <i
      v-if="skipVisible"
      class="c-modal-celestial-quote__skip fa-solid fa-forward"
      @click="emitClose"
    />
  </CelestialQuoteBackground>
</template>

<style scoped>
.c-modal-celestial-name {
  /*position: absolute;
  top: 1rem;
  right: 0;
  left: 0;*/
  width: 100%;
  font-weight: bold;
  font-family:cambria;
  line-height:1.2;
  font-size:1.8rem;
  border-bottom: 0.1rem solid;
  border-top: 0.1rem solid;
  border-image: linear-gradient(90deg, transparent, currentcolor, transparent) 1;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb,var(--scoped-cel-color) 20%,transparent), transparent);
}

.c-modal-celestial-quote__arrow {
  font-size: 150%;
  margin: 0.5rem;
  cursor: pointer;
  bottom: 14rem;
  text-shadow:0.1rem 0.1rem 0.1rem black,-0.1rem 0.1rem 0.1rem black,0.1rem -0.1rem 0.1rem black,-0.1rem -0.1rem 0.1rem black
}
.c-modal-celestial-quote__arrow-left {
  position: absolute;
  left: 1rem;
}

.c-modal-celestial-quote__arrow-right {
  position: absolute;
  right: 1rem;
}

.c-modal-celestial-quote__end {
  position: absolute;
  bottom: -7rem;
  left: calc(50% - 1rem);
  font-size: 150%;
  cursor: pointer;
}
.c-modal-celestial-quote__skip {
  position: absolute;
  top: -38rem;
  left: calc(100% - 3.5rem);
  font-size: 150%;
  cursor: pointer;
}
.l-modal-celestial-quote__text {
  display: flex;
  flex-direction: column;
  min-height: 6rem;
  justify-content: center;
  font-size: 1.3rem;
  font-style:italic
}

.l-modal-celestial-quote__buttons {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.c-modal-celestial-quote__arrow-invisible {
  visibility: hidden;
}
</style>
