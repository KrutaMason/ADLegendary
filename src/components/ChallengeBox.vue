<script>
import HintText from "@/components/HintText";

export default {
  name: "ChallengeBox",
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
      required: true
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
    lockedAt: {
      type: Decimal,
      required: false,
      default: undefined
    },
    overrideLabel: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      inC1: Boolean,
      infinities: new Decimal(0),
      bestTime: 0,
      hasName: false,
      showHintText: false,
    };
  },
  computed: {
    buttonClassObject() {
      const challengeLocked = !(this.isCompleted || this.isRunning || this.inC1 || this.isUnlocked);
      // It's important to disable the cursor for Normal Challenge 1, challenges that are running, or
      // for challenges unable to be unlocked and not unlocked.
      const challengeNotEnterable = !this.isUnlocked || this.isRunning || this.name === "C1";
      return {
        "o-challenge-btn": true,
        "o-challenge-btn--broken": this.overrideLabel.length > 0 && this.name !== "C10",
        "o-challenge-btn--broken-alt": this.overrideLabel.length > 0 && this.name === "C10",
        "o-challenge-btn--running": this.isRunning || this.inC1,
        "o-challenge-btn--completed": this.isCompleted && this.isUnlocked,
        "o-challenge-btn--unlocked": !this.isCompleted && this.isUnlocked,
        "o-challenge-btn--locked": challengeLocked,
        "o-challenge-btn--unenterable": challengeNotEnterable,
      };
    },
    buttonText() {
      if (this.overrideLabel.length > 0) return this.overrideLabel;
      if (this.isRunning || this.inC1) return "Running";
      if (this.isCompleted) return "Completed";
      if (this.isUnlocked) return "Start";
      const currentInfs = isInaccessible(this.infinities) 
        ? `<span class="c-font--fixed">${formatInt(this.infinities)}</span>`
        : formatInt(this.infinities);
      const requiredInfs = isInaccessible(this.lockedAt) 
        ? `<span class="c-font--fixed">${formatInt(this.lockedAt)}</span>`
        : formatInt(this.lockedAt);
      const lockedText = this.lockedAt === undefined
        ? ""
        : ` (${currentInfs}/${requiredInfs})`;
      return `Locked${lockedText}`;
    },
    challengeName() {
      if (this.hasName && this.showHintText) return `${this.name} : ${this.label}`;
      if (this.hasName) return this.label;
      if (this.showHintText) return this.name;
      return "";
    },
  },
  methods: {
    timeDisplayShort,
    update() {
      this.inC1 = this.name === "C1" && !this.isCompleted && !Player.isInAntimatterChallenge;
      this.infinities.copyFrom(Currency.infinities);
      this.bestTime = this.completionString(this.name);
      this.hasName = player.options.naming.challenges;
      this.showHintText = player.options.showHintText.challenges || this.$viewModel.shiftDown;
    },
    completionString(id) {
      if (id === "C1") return "";
      let type = id.includes("IC") ? player.challenge.infinity.bestTimes.slice(0) : player.challenge.normal.bestTimes.slice(0)
      let time = type[id.replace(/C|IC/,"") - (id.includes("IC") ? 1 : 2)]
      return time < Number.MAX_VALUE ? `${timeDisplayShort(time)}` : "--:--:--";
    },
    completionvalue(id) {
      if (id === "C1") return 0;
      let type = id.includes("IC") ? player.challenge.infinity.bestTimes.slice(0) : player.challenge.normal.bestTimes.slice(0)
      let time = type[id.replace(/C|IC/,"") - (id.includes("IC") ? 1 : 2)]
      return time < Number.MAX_VALUE ? time : Number.MAX_VALUE;
    }
  }
};
</script>

<template>
  <div class="c-challenge-box l-challenge-box">
    <HintText
      type="challenges"
      :secondaryRequirement="hasName"
      class="l-hint-text--challenge"
      :data-text="challengeName"
    >
      {{ challengeName }}
    </HintText>
    <HintText
      type="challengeStats"
      class="l-hint-text--challenge l-hint-text--challenge-secondary"
      :class="diffFont(completionvalue(name))"
      :data-text="bestTime"
      v-html="displayGradientText(bestTime, completionvalue(name))"
    />

    <slot name="top" />
    <div class="l-challenge-box__fill" />
    <button
      :class="buttonClassObject"
      @click="$emit('start')"
      v-html="buttonText"
    />
    <slot name="bottom" />
  </div>
</template>

<style scoped>
.o-challenge-btn--broken {
  --bg-dark: var(--color-enslaved--base);
  --bg-bright: #7b4423;
  --border: #ff6000;
  clip-path: polygon(0% 0%, 25% 20%, 95% 0%, 100% 25%, 80% 70%, 95% 50%, 100% 100%, 45% 95%,
    65% 70%, 15% 95%, 0% 45%, 10% 50%);
}

.o-challenge-btn--broken-alt {
  --bg-dark: var(--color-enslaved--base);
  --bg-bright: #7b4423;
  --border: #ff6000;
  clip-path: polygon(0% 0%, 15% 0%, 25% 40%, 30% 0%, 55% 0%, 85% 30%, 75% 0%, 100% 0%,
    90% 40%, 100% 65%, 90% 95%, 45% 45%, 70% 100%, 25% 100%, 5% 90%, 10% 60%);
}
</style>
