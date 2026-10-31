<script>
export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = Math.min((GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 8,1);
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "None (will choose randomly)";
    },
    startNewGame() {
      NG.startNewGame();
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    }
  }
};
</script>

<template>
  <div
    class="c-new-game-container"
    :style="style"
  >
    <h2>
      Reset the entire game, but keep Automator Scripts, Study Presets, Secret Themes, Secret Achievements, Options,
      and Companion Glyph.
    </h2>
    <h3>You can use the button in the top-right to view the game as it is right now.</h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        @click="startNewGame"
      >
        Start over?
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      For completing the game, you also unlock a new cosmetic set of your choice for Glyphs. These are freely
      modifiable once you reach Reality again, but are purely visual and offer no gameplay bonuses.
      <br>
      <button
        class="c-new-game-button"
        @click="openSelectionModal"
      >
        Choose Cosmetic Set
      </button>
      <br>
      <br>
      Selected Set: {{ selectedSetName }}
    </h3>
    <h3 v-else>
      You have unlocked all Glyph cosmetic sets!
    </h3>
    <br>
    <h3>
      You can also import "speedrun" to start the game again with additional tracking for speedrunning purposes.
    </h3>
  </div>
</template>

<style scoped>
.c-new-game-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  color:white;
  font-family: var(--var-secondary-font);
  font-size: 125%;
  background: linear-gradient(90deg,transparent, color-mix(in srgb, #00ffaa 25%, transparent), transparent);
  border-top: 0.1rem solid;
  border-bottom: 0.1rem solid;
  border-image: linear-gradient(90deg, transparent, #00ffaa, transparent) 1;
  padding: 3rem 1rem;
}

.t-s12 .c-new-game-container {
  color: white;
}
.c-new-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-new-game-button {
  font-family: var(--var-secondary-font);
  font-weight: bold;
  font-size: 2rem;
  width: 25rem;
  color: white;
  text-shadow: var(--var-text-shadow, var(--text-shadow));
  background: var(--leg-shading), linear-gradient(#00442d,#008357);
  border: var(--var-border-width, 0.1rem) solid #00ffaa;
  box-shadow: var(--var-box-shadow, 0 0 1rem black inset, 0 0 0 0.2rem #00ffaa inset);
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.c-new-game-button:hover {
  background: var(--leg-shading), linear-gradient(#00442d,#00ffaa);
}
</style>
