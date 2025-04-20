<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "NamingOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    PrimaryButton,
    PrimaryToggleButton,
  },
  data() {
    return {
      challengesUnlocked: false,
      celestiaLUnlocked: false,
      dimensions: true,
      achievement: true,
      challenges: true,
      celestial: true,
    };
  },
  watch: {
    dimensions(newValue) {
      player.options.naming.dimensions = newValue;
    },
    achievement(newValue) {
      player.options.naming.achievement = newValue;
    },
    challenges(newValue) {
      player.options.naming.challenges = newValue;
    },
    celestial(newValue) {
      player.options.naming.celestial = newValue;
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
    this.achievement = options.achievement;
    this.challenges = options.challenges;
    this.celestial = options.celestial;
    },
  }
};
</script>

<template>
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      Naming Options
    </template>
    This mod introduces new names to various mechanics. <br>
    Turning them off will make them display their former names.
    <div class="c-modal-options__button-container">
        <ModalOptionsToggleButton
          v-model="dimensions"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Unique Dimension Names:"
        />
        <ModalOptionsToggleButton
          v-model="achievement"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Achievements:"
        />
        <ModalOptionsToggleButton
          v-if="challengesUnlocked"
          v-model="challenges"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Challenges:"
        />
        <ModalOptionsToggleButton
          v-if="celestialUnlocked"
          v-model="celestial"
          class="o-primary-btn o-primary-btn--option-wide"
          text="Celestial Realities:"
        />
    </div>
  </ModalWrapperOptions>
</template>
