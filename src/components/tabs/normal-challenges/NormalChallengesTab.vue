<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import NormalChallengeBox from "./NormalChallengeBox";

export default {
  name: "NormalChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    NormalChallengeBox
  },
  data() {
    return {
      timeSum: null,
    };
  },
  computed: {
    challenges() {
      return NormalChallenges.all;
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    }
  },
  methods: {
    timeDisplayShort,
    update() {
      this.timeSum = player.challenge.normal.bestTimes.sum()
    },
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      Some Normal Challenges have requirements to be able to run that challenge.
    </div>
    <div>
      If you have an active Big Crunch Autobuyer, it will attempt to Crunch
      as soon as possible when reaching Infinite antimatter.
    </div>
    <br>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
    >
      <NormalChallengeBox :challenge="challenge" />
    </ChallengeGrid>
    <div class="c-challenge-sum"  v-if="completedAllChallenges">
      Sum of Normal Challenge record times: {{ timeDisplayShort(timeSum) }}
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
  border-image: linear-gradient(90deg, transparent, var(--color-accent), transparent) 1;
  background: linear-gradient(90deg, transparent,color-mix(in srgb, var(--color-accent) 30%, transparent), transparent);
}
</style>
