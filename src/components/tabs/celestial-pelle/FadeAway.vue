<script>
export default {
  name: "FadeAway",
  data() {
    return {
      opacity: 0,
      bgopacity:0,
      flashdecay:0,
      state:0
    };
  },
  computed:{
    flashstyle(){
      return {
        //"opacity":1 - this.flashdecay,
        background:`radial-gradient(circle,white ${`${this.flashdecay<0.45?100-this.flashdecay*200:10-(this.flashdecay-0.45)*15}%`},#0088ff,transparent ${`${150-this.flashdecay*100}%`})`
        //"box-shadow":`inset 0 0 100px ${this.flashdecay*500}px var(--color-text-inverted)`,
      }
    },
  },
  methods: {
    update() {
      this.state = GameEnd.endState
      this.opacity = Math.min((this.state - END_STATE_MARKERS.SCREEN_FLASH) * 30,1);
      this.bgopacity = this.state<(END_STATE_MARKERS.SHOW_NEW_GAME-1)?Math.min((this.state - END_STATE_MARKERS.CREDITS_START)*2,1):Math.max(1-(this.state - (END_STATE_MARKERS.SHOW_NEW_GAME-1))*2,0);
      this.flashdecay = (this.state - (END_STATE_MARKERS.SCREEN_FLASH+0.25)) * 4;
    },
  }

};
</script>

<template>
  <div
    class="c-background-overlay"
    :style="{
      opacity,
      pointerEvents: opacity > 1 ? 'auto' : 'none'
    }"
  >
  <div v-if="flashdecay<2"
    class="c-flash-overlay"
    :style="flashstyle"
  />
  <div
    class="c-background-overlay_credits"
    :style="{
      opacity:bgopacity
    }"
  />
  </div>
</template>

<style scoped>
.c-flash-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: #ffffff;
}
.c-background-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  background: black;
}
.c-background-overlay_credits {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background-image: url(../../../../public/images/background/credits_souls.png),
  url(../../../../public/images/background/credits_souls-2.png),
  url(../../../../public/images/background/credits.png);
  background-position: center 0, center 0, center;
  animation: a-credits-flow 120s infinite linear;
  background-size: 51.2rem 51.2rem, 51.2rem 51.2rem, 100%;
  pointer-events: auto;
}
@keyframes a-credits-flow {
  from{background-position:center 0,center 0,center}
  to{background-position:center -51.2rem,center -102.4rem,center}
}
/*
.t-dark .c-background-overlay,
.t-dark-metro .c-background-overlay {
  background-image: url("../../../../public/images/background/dark-bg.png");
  background-position: center;
}

.t-retro .c-background-overlay,
.t-legendary .c-background-overlay,
.t-hex .c-background-overlay,
.t-inverted .c-background-overlay,
.t-inverted-metro .c-background-overlay,
.t-amoled .c-background-overlay,
.t-amoled-metro .c-background-overlay,
.t-s11 .c-background-overlay,
.t-s13 .c-background-overlay {
  background-color: black;
}

.t-s1 .c-background-overlay {
  background: url("../../../../public/images/s1-bg.svg") no-repeat;
  background-attachment: fixed;
  background-color: #d72621;
  background-position: center bottom;
  background-size: 100%;
}
*/
.t-s1 .c-background-overlay::before {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("../../../../public/images/background/snow1.png"),
  url("../../../../public/images/background/snow2.png"),
  url("../../../../public/images/background/snow3.png");
  animation: a-snow 10s linear infinite, a-snow-fade 10s cubic-bezier(0, 0.3, 1, 0.7) infinite;
}
/*
.t-s2 .c-background-overlay {
  background: url("../../../../public/images/s2-bg.svg") no-repeat;
  background-color: white;
  background-position-x: 50%;
  background-position-y: 50%;
  background-size: 50%;
}

.t-s4 .c-background-overlay {
  background: #ff00ff;
  border-radius: 0 !important;
}

.t-s4 .c-background-overlay::after {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #0fff0f;
  border-radius: 40%;
}

.t-s5 .c-background-overlay {
  background: url("../../../../public/images/s5-bg.jpg");
  background-position-x: 50%;
  background-position-y: 50%;
  background-size: 150%;
}

.t-s6 .c-background-overlay,
.t-s10 .c-background-overlay {
  background: black;
  background-image: url("../../../../public/images/stars-bg.png");
  background-position: center;
  background-size: 100%;
}

.t-s8 .c-background-overlay {
  background: url("../../../../public/images/s8-bg.jpg") no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
*/
.t-s12 .c-background-overlay {
  background: url("../../../../public/images/background/s12-bg.jpg") no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.5);
}
</style>
