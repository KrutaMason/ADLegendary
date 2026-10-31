<script>
import HintText from "@/components/HintText";

export default {
  name: "EternityChallengeBoxWrapper",
  components: {
    HintText
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
    },
    isUnlocked: {
      type: Boolean,
      required: true
    },
    isRunning: {
      type: Boolean,
      required: true
    },
    isCompleted: {
      type: Boolean,
      required: true
    },
    canBeUnlocked: {
      type: Boolean,
      required: true
    },
    completionCount: {
      type: Number,
      required: true
    },
    overrideLabel: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      challengeId: Number,
      stars: "",
      hasName: false,
      showHintText: false,
    };
  },
  computed: {
    buttonClassObject() {
      const challengeDone = this.isCompleted && !this.isUnlocked;
      const challengeRedo = this.isCompleted && this.isUnlocked && !this.isRunning;
      const challengeUnlock = this.isUnlocked || this.canBeUnlocked;
      const challengeLocked = !this.isCompleted && !this.isUnlocked && !this.isRunning && !this.canBeUnlocked;
      // ECs can be not unlocked and also not locked, because they're fully completed,
      // but in that case you can't enter them and so it's important to give them a property
      // that disables cursor on hover. The same thing happens if it is running.
      const challengeClickable = !this.isRunning && ((!this.isCompleted && this.canBeUnlocked) || this.isUnlocked);
      return {
        "o-challenge-btn": true,
        "o-challenge-btn--running": this.isRunning,
        "o-challenge-btn--completed": challengeDone,
        "o-challenge-btn--redo": challengeRedo,
        "o-challenge-btn--unlocked": !challengeDone && challengeUnlock,
        "o-challenge-btn--locked": challengeLocked,
        "o-challenge-btn--unenterable": !challengeClickable,
      };
    },
    goldenStars() {
      return {
        "l-hint-text--challenge-stars--complete": this.isCompleted,
      };
    },
    // Width and height attributes are copied from o-challenge-btn
    completionOverlay() {
      return {
        position: "absolute",
        width: `${25 * Math.clampMax(this.completionCount / 5, 1)}rem`,
        height: "3rem",
        background: "linear-gradient(#00ee0040,#00ee00)",
        opacity: this.completionCount >= 5 ? 0 : 0.3,
        "border-top-left-radius": "var(--var-border-radius, 1rem)",
        "border-bottom-left-radius": "var(--var-border-radius, 1rem)",
        "pointer-events": "none",
      };
    },
    buttonText() {
      if (this.overrideLabel.length) return this.overrideLabel;
      if (this.isRunning) return "Running";
      if (this.isCompleted) {
        if (this.isUnlocked) return "Redo";
        return "Completed";
      }
      if (this.isUnlocked) return "Start";
      if (this.canBeUnlocked) return "Unlock";
      return "Locked";
    },
    challengeDisplay() {
      if (this.hasName && this.showHintText) return `${this.name} : ${this.label}`;
      if (this.hasName) return this.label;
      if (this.showHintText) return this.name;
      return;
    },
  },
  methods: {
    update() {
      this.stars = this.completionStars(this.name);
      this.hasName = player.options.naming.challenges;
      this.showHintText = player.options.showHintText.challenges;
    },
    completionStars(id) {
      let text = "";
      let stars = EternityChallenge(id.replace("EC","")).completions;
      if (stars < 6) for (let i = 0; i < stars; i++) text += "★";
      if (stars === EternityChallenge(1).maxCompletions && Enslaved.isRunning) text = "★★★★★★";
      return text;
    }
  } 
};
</script>

<template>
  <div class="c-challenge-box l-challenge-box c-challenge-box--eternity">
    <HintText
      type="challenges"
      :secondaryRequirement="hasName"
      class="l-hint-text--challenge"
      :data-text="challengeDisplay"
    >
      {{ challengeDisplay }}
    </HintText>
    <HintText
      type="challengeStats"
      class="l-hint-text--challenge l-hint-text--challenge-stars"
      :data-text="stars"
      :class="goldenStars"
    >
      {{this.stars}}
    </HintText>
    <slot name="top" />
    <div class="l-challenge-box__fill" />
    <div>
      <div :style="completionOverlay" />
      <button
        :class="buttonClassObject"
        @click="$emit('start')"
      >
        {{ buttonText }}
      </button>
    </div>
    <slot name="bottom" />
  </div>
</template>

<style scoped>

</style>
