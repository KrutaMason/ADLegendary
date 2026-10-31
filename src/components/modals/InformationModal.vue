<script>
import InformationModalButton from "@/components/modals/InformationModalButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";
import LogoHolder from "@/components/LogoHolder";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton,
    LogoHolder
  },
};
</script>

<template>
  <div class="l-information-modal c-information-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        About the game / mod
      </div>
    </div>
    <LogoHolder/>
    <div class="c-info-body">
      Antimatter Dimensions is an Idle Incremental game created by Finnish developer Hevipelle. 
      Originating as a solo project in 2016, it was expanded upon by a large team of developers and testers from then on.
      <br>
      <br>
      The game has unfolding gameplay and multiple prestige layers. The "How to Play" button contains useful
      information about progressing.
      <br>
      <br>
      AD: Legendary is a modified version of the game created by MrKrutaman, 
      which overhauls the game's graphics and visuals completely and features 
      small additional non-gameplay content. This mod is still intended for mature audiences, even
      when the mod has the lack of graphic content.
    </div>
    <div class="l-socials">
      <InformationModalButton
        name="GitHub repository"
        icon="fa-brands fa-github"
        link="https://github.com/KrutaMason/ADLegendary"
      />
      <InformationModalButton
        name="Credits"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        name="Game Changelog"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
      <InformationModalButton
        name="Original Version"
        icon="fa-solid fa-ice-cream"
        link="https://ivark.github.io/AntimatterDimensions/"
      />
    </div>
  </div>
</template>

<style scoped>
.l-information-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 50vh);
  justify-content: space-around;
}

.c-information-modal {
  margin: 0.5rem;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.6rem;
  background: linear-gradient(transparent, var(--base) 500%);
  background-origin: border-box;
  --base: #00ffaa;
}

.c-info-body {
  text-align: center;
  font-family: var(--var-secondary-font);
  font-weight: bold;
  font-size: 1.75rem;
  margin: 1rem;
  padding: 0.5rem;
}

.t-s12 .c-info-body {
  text-align: left;
  font-style: normal;
  font-size: 1.3rem;
  margin: 0;
}

.l-socials {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 5rem;
}

.t-s12 .l-socials {
  width: 100%;
  align-self: center;
}
</style>
