<script>
export default {
  name: "HowToPlay",
  data() {
    return {
      hasTutorial: false,
      isModern: false,
      sidebarSideSwitch:false,
      fade:0,
    };
  },
  computed: {
    h2pClassObject() {
      return {
        "o-tab-btn l-help-me": true,
        "l-help-me-switched": this.sidebarSideSwitch,
      };
    },
    topMargin() {
      return {
        "margin-top": this.isModern ? "4.5rem" : "1rem",
      };
    }
  },
  methods: {
    update() {
      this.sidebarSideSwitch = Theme.currentName() !== "S12"&&player.options.sidebarSideSwitch && ui.newUI
      this.hasTutorial = Tutorial.emphasizeH2P();
      this.isModern = player.options.newUI;
      this.fade = GameEnd.endState>1&&GameEnd.endState<END_STATE_MARKERS.CREDITS_START? Math.clamp(1-(GameEnd.endState-3),0,1):1
    },
    showH2P() {
      Modal.h2p.show();
    },
    showInfo() {
      Modal.information.show();
    }
  }
};
</script>

<template>
  <div :style="{'opacity':fade}">
    <div
      :class="h2pClassObject"
      :style="topMargin"
      @click="showH2P"
    >
      ?
      <div
        v-if="hasTutorial"
        class="h2p-tooltip"
      >
        Click for info
      </div>
    </div>
    <div
      v-if="hasTutorial"
      class="h2p-tutorial--glow"
      :style="topMargin"
    />
    <div
      class="o-tab-btn l-information l-help-me"
      :class="{'l-help-me-switched': sidebarSideSwitch}"
      @click="showInfo"
    >
      i
    </div>
  </div>
</template>

<style scoped>
.l-help-me {
  position: absolute;
  width: 2rem;
  height: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.9rem;
  border-radius: var(--var-border-radius, 50%);
  pointer-events: auto;
  cursor: pointer;
  transition-delay: 0s;
  transition:right 0s;
  z-index: 1;
  font-family:typewriter
}
.l-help-me-switched {
  right: calc(2rem + var(--sidebar-width));
}
.h2p-tutorial--glow {
  position: absolute;
  top: 0;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: var(--var-border-radius, 50%);
  background: gold;
  animation: a-opacity 3s infinite;
  z-index: 2;
}

.h2p-tooltip {
  width: fit-content;
  position: absolute;
  top: 0;
  right: 100%;
  color: white;
  background: black;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-width, 0.5rem);
  transform: translate(-0.7rem, -0.4rem);
  padding: 0.2rem 0.4rem;
}

.h2p-tooltip::after {
  content: "";
  position: absolute;
  top: 0.6rem;
  left: 100%;
  border-top: 0.5rem solid transparent;
  border-left: 0.5rem solid var(--color-text);
  border-bottom: 0.5rem solid transparent;
}
</style>