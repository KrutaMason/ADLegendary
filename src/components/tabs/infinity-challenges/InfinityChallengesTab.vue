<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import InfinityChallengeBox from "./InfinityChallengeBox";

export default {
  name: "InfinityChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    InfinityChallengeBox
  },
  data() {
    return {
      nextIC: 0,
      showAllChallenges: false,
      timeSum: null,
    };
  },
  computed: {
    challenges() {
      return InfinityChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextIC?.id === 1;
      const next = InfinityChallenges.nextICUnlockAM;

      if (first) return `The first Infinity Challenge unlocks at ${format(next)} antimatter.`;
      return next === undefined
        ? "All Infinity Challenges unlocked"
        : `Next Infinity Challenge unlocks at ${format(next)} antimatter.`;
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    }
  },
  methods: {
    timeDisplayShort,
    update() {
      this.nextIC = InfinityChallenges.nextIC;
      this.showAllChallenges = player.options.showAllChallenges;
      this.timeSum = player.challenge.infinity.bestTimes.sum()
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      An active Big Crunch Autobuyer will Crunch immediately when
      reaching an Infinity Challenge's antimatter goal, regardless of settings.
    </div>
    <div>{{ nextAtDisplay }}</div>
    <br>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <InfinityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
    <div class="c-challenge-sum"  v-if="completedAllChallenges">
      Sum of Infinity Challenge record times: {{ timeDisplayShort(timeSum) }}
    </div>
  </div>
</template>

<style scoped>
.c-challenge-sum {
  font-size: 1.8rem;
  font-family: cambria;
  font-weight: bold;
  line-height: 1.1;
  border-bottom: 0.1rem solid;
  border-top: 0.1rem solid;
  padding: 0.5rem;
  border-image: linear-gradient(90deg, transparent, var(--color-infinity), transparent) 1;
  background: linear-gradient(90deg, transparent,color-mix(in srgb, var(--color-infinity) 30%, transparent), transparent);
}
</style>
