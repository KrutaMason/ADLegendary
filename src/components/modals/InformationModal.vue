<script>
import InformationModalButton from "@/components/modals/InformationModalButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton
  },
};
</script>

<template>
  <div class="l-information-modal c-information-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <img class="o-title" src="images/title-holder.png" alt="">
    </div>
    <div class="c-info-body">
      Antimatter Dimensions is an Idle Incremental game created by Finnish developer Hevipelle. 
      Originating as a solo project in 2016, it was expanded upon by a large team of developers and testers from then on.
      <br>
      <br>
      The game has unfolding gameplay and multiple prestige layers. The "How to Play" button contains useful
      information about progressing.
      <br>
      <br>
      AD: Legendary is a modified version of the game, created by MrKrutaman. 
      It focuses on a complete overhaul of the game's graphics and visuals, 
      along with small additional non-gameplay content.
      <br><br>
      This mod is intended for mature audience.
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
}

.c-info-body {
  text-align: center;
  font-style: italic;
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
  font-size: 7.5rem;
}

.t-s12 .l-socials {
  width: 100%;
  align-self: center;
}
</style>
