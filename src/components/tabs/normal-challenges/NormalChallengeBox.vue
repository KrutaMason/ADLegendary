<script>
import ChallengeBox from "@/components/ChallengeBox";
import DescriptionDisplay from "@/components/DescriptionDisplay";

export default {
  name: "NormalChallengeBox",
  components: {
    ChallengeBox,
    DescriptionDisplay
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDoomed: false,
      isDisabled: false,
      isRunning: false,
      isCompleted: false,
      isBroken: false,
      isUnlocked: false,
      lockedAt: new Decimal(),
      reward: undefined,
    };
  },
  computed: {
    descriptionDisplayConfig() {
      if (this.isUnlocked) {
        return this.challenge.config;
      }
      return {
        description: `Infinity ${formatInt(this.challenge.config.lockedAt)} times to unlock.`
      };
    },
    name() {
      return `C${this.challenge.id}`;
    },
    label() {
      return `${this.challenge.config.label}`;
    },
    overrideLabel() {
      return this.isBroken ? "Broken" : "";
    },
  },
  created() {
    this.on$(GAME_EVENT.NAME_CHANGED, () => this.setReward());
    this.setReward();
  },
  methods: {
    update() {
      this.isDisabled = this.challenge.isDisabled;
      this.isUnlocked = this.challenge.isUnlocked;
      // This stops normal challenges from appearing like they're running during IC1
      this.isRunning = this.challenge.isOnlyActiveChallenge;
      this.lockedAt = this.challenge.config.lockedAt;
      this.isBroken = Enslaved.isRunning && Enslaved.BROKEN_CHALLENGES.includes(this.challenge.id);
      this.isCompleted = this.challenge.isCompleted && !this.isBroken;
    },
    setReward() {
      const reward = this.challenge.config.reward;
      this.reward = typeof reward === "function" ? reward() : reward;
    },
  }
};
</script>

<template>
  <ChallengeBox
    :name="name"
    :label="label"
    :is-unlocked="isUnlocked"
    :is-running="isRunning"
    :is-completed="isCompleted"
    :override-label="overrideLabel"
    :locked-at="lockedAt"
    class="c-challenge-box--normal"
    @start="challenge.requestStart()"
  >
    <template #top>
      <DescriptionDisplay :config="descriptionDisplayConfig" />
    </template>
    <template #bottom>
      <span :class="{ 'o-pelle-disabled': isDisabled }">Reward: {{ reward }}</span>
    </template>
  </ChallengeBox>
</template>

<style scoped>

</style>
