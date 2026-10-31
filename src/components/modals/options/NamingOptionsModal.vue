<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "NamingOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapper,
    PrimaryButton,
    PrimaryToggleButton,
  },
  data() {
    return {
      challengesUnlocked: false,
      celestialUnlocked: false,
      dimensions: true,
      customDimensions: true,
      challenges: true,
      celestial: true,
      showHelp: true,
      dimensionNames: [null, "", "", "", "", "", "", "", ""]
    };
  },
  computed: {
    defaultUniqueNames: () => [null, "Digon", "Polygon", "Polyhedron", "Polychoron", "Polyteron", "Polypeton", "Polyexon", "Polyzetton"],
    defaultNames: () => [null, "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    inputInfo() {
      if (!this.customDimensions) return "Unique dimension tiers or custom dimension names are disabled!"
      return `Set a custom name (up to 16 alphanumeric characters, including space and hyphen)`;
    }
  },
  watch: {
    dimensions(newValue) {
      player.options.naming.dimensions = newValue;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
    },
    customDimensions(newValue) {
      player.options.naming.customDimensions = newValue;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
    },
    challenges(newValue) {
      player.options.naming.challenges = newValue;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
    },
    celestial(newValue) {
      player.options.naming.celestial = newValue;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
    },
    showHelp(newValue) {
      player.options.naming.showHelp = newValue;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
    },
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.challengesUnlocked = this.fullCompletion || progress.isInfinityUnlocked
      || progress.isEternityUnlocked || progress.isRealityUnlocked;
      this.celestialUnlocked = Achievement(147).isUnlocked;

      const options = player.options.naming;
      this.dimensions = options.dimensions;
      this.customDimensions = options.customDimensions;
      this.challenges = options.challenges;
      this.celestial = options.celestial;
      this.showHelp = options.showHelp;
      for (let i = 0; i < 8; i++) {
        this.dimensionNames[i+1] = options.dimensionNames[i+1];
      };
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(tier, event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.naming.dimensionNames[tier] = event.target.value == "" ? this.defaultUniqueNames[tier] : newName;
      event.target.value = newName;
      EventHub.dispatch(GAME_EVENT.NAME_CHANGED);
      if (player.options.naming.dimensionNames.filter(num => num !== null).every((val, i, arr) => val === arr[0]) &&
      player.options.naming.customDimensions) SecretAchievement(53).unlock();
    }
  }
};
</script>

<template>
  <ModalWrapper class="l-wrapper">
    <template #header>
      Naming Convention Options
    </template>
      This mod introduces new naming conventions for various mechanics. <br>
      Disabling them will display their former names.
      <div class="c-modal-options__button-container">
        <ModalOptionsToggleButton
          v-model="dimensions"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Dimension Tiers:"
          v-tooltip="'Named after the polytope of its respective Dimension'"
        />
        <ModalOptionsToggleButton
          v-model="customDimensions"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Custom Dimension Names:"
          v-tooltip="'Customize the names of the Dimension tiers; Unique Dimension Tiers must be enabled first'"
        />
        <ModalOptionsToggleButton
          v-if="challengesUnlocked"
          v-model="challenges"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Challenges:"
          v-tooltip="'Give challenges unique names'"
        />
        <ModalOptionsToggleButton
          v-if="celestialUnlocked"
          v-model="celestial"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Celestial Realities:"
          v-tooltip="'Give Celestials names for their Realities'"
        />
        <ModalOptionsToggleButton
          v-if="celestialUnlocked"
          v-model="showHelp"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Display classic abbverations:"
          v-tooltip="'Recommended for those who are unfamilliar with the new naming conventions'"
        />
      </div>
      <div v-if="!customDimensions || !dimensions">
        Enable the first 2 naming convention options to fully customize them!!
      </div>
      <br v-else>
      <div class="c-modal-options__button-container">
        <div class="c-custom-dim-name"
          v-for="i in 8"
          :key="i"
          >
            {{ defaultNames[i] }} Dimension:
            <span :ach-tooltip="inputInfo">
            <input
              class="c-custom-dim-name__input"
              type="text"
              maxlength="16"
              :placeholder="defaultUniqueNames[i]"
              :disabled="!customDimensions || !dimensions"
              :value="customDimensions && dimensions ? dimensionNames[i] : defaultUniqueNames[i]"
              @change="handleChange(i, $event)"
            >
            </span>
        </div>
      </div>
  </ModalWrapper>
</template>
<style scoped>
.l-wrapper {
  width: 75rem;
}
.c-custom-dim-name {
  margin: 0.5rem;
}
.c-custom-dim-name__input {
  text-align: center;
  font-family: Typewriter;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0.1rem solid black;
  border-radius: var(--var-border-radius, 0.3rem);
}
</style>