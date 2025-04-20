<script>
import ChallengeRecordsList from "./ChallengeRecordsList";

export default {
  name: "ChallengeRecordsTab",
  components: {
    ChallengeRecordsList
  },
  data() {
    return {
      infinityChallengesUnlocked: false,
      normalChallenges: [],
      infinityChallenges: []
    };
  },
  methods: {
    update() {
      this.infinityChallengesUnlocked = PlayerProgress.infinityChallengeCompleted() ||
        PlayerProgress.eternityUnlocked();
      this.normalChallenges = player.challenge.normal.bestTimes.slice(0);
      this.infinityChallenges = player.challenge.infinity.bestTimes.slice(0);
    }
  }
};
</script>

<template>
  <div class="c-stats-tab">
    <div class="l-challenge-records-tab">
    <ChallengeRecordsList
      :start="2"
      :times="normalChallenges"
      name="Normal Challenge"
    />
    <ChallengeRecordsList
      v-if="infinityChallengesUnlocked"
      :start="1"
      :times="infinityChallenges"
      name="Infinity Challenge"
      class="l-challenge-records-tab__infinity_challenges"
    />
  </div>
  </div>
</template>
