<script>
import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer";
import HeaderEternityContainer from "./prestige-header/HeaderEternityContainer";
import HeaderInfinityContainer from "./prestige-header/HeaderInfinityContainer";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer,
    HeaderEternityContainer,
    HeaderInfinityContainer,
  },
  data() {
    return {
    switched: false,
    fade:1
  };
},
  methods: {
    update() {
      this.switched = player.options.prestigePosition,
      this.fade = GameEnd.endState>1&&GameEnd.endState<END_STATE_MARKERS.CREDITS_START? Math.clamp(1-(GameEnd.endState-3),0,1):1
    }
  }
};
</script>

<template>
  <div class="c-prestige-info-blocks" :style="{'opacity':fade}">
    <HeaderEternityContainer :class="{ 'l-game-header__infinity': switched, 'l-game-header__eternity': !switched }" />
    <HeaderCenterContainer class="l-game-header__center" />
    <HeaderInfinityContainer :class="{ 'l-game-header__infinity': !switched, 'l-game-header__eternity': switched }" />
  </div>
</template>

<style scoped>
.c-prestige-info-blocks {
  display: flex;
  flex-direction: row;
  height: 14rem;
  width: 100%;
  color: var(--color-text);
  text-shadow: var(--var-text-shadow, var(--text-shadow));
}

.l-game-header__eternity {
  position: absolute;
  left: calc(25% - 23.5rem);
  width: 25rem;
}

.l-game-header__center {
  position: absolute;
  right: calc(50% - 30rem);
  width: 60rem;
}

.l-game-header__infinity {
  position: absolute;
  right: calc(25% - 23.5rem);
  width: 25rem;
}
</style>
