<script>
export default {
  name: "ChallengeRecordsList",
  props: {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      return this.times.sum();
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    }
  },
  methods: {
    timeDisplayShort,
    completionString(time) {
      return time < Number.MAX_VALUE
        ? `record time: ${timeDisplayShort(time)}`
        : "has not yet been completed";
    }
  }
};
</script>

<template>
  <div class="c-challenge-records-tab_category">
    <div class="c-challenge-records-tab_header">
      {{ name }} Records
    </div>
    <div class="c-challenge-records-tab_details">
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ name }} {{ start + i }} {{ completionString(time) }}</span>
    </div>
    <br>
    <div v-if="completedAllChallenges">
      Sum of {{ name }} record times: {{ timeDisplayShort(timeSum) }}
    </div>
    <div v-else>
      You have not completed all {{ name }}s yet.
    </div>
  </div>
  </div>
</template>
<style scoped>
.c-challenge-records-tab_category {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.6rem 2rem;
  margin: 0.5rem;
  background: linear-gradient(transparent, var(--base) 500%);
  background-origin: border-box;
  --base: var(--color-accent);
}
.c-challenge-records-tab_header {
  display: inline-block;
  width: 90%;
  font-size: 1.8rem;
  font-family: cambria;
  font-weight: bold;
  line-height: 1.1;
  padding: 0.2rem 0.5rem;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-top: none;
  border-radius: 0 0 var(--var-border-radius, 1rem) var(--var-border-radius, 1rem);
  background-image: linear-gradient(90deg, 
  color-mix(in srgb, var(--base) 10%, transparent), 
  color-mix(in srgb, var(--base) 35%, transparent), 
  color-mix(in srgb, var(--base) 10%, transparent));
  background-origin: border-box;
  margin-bottom: 0.5rem;
  margin-top: -0.6rem;
}
.l-challenge-records-tab__infinity_challenges {
  --base: var(--color-infinity);
}
.c-challenge-records-tab_details{
  margin-top: auto;
}
</style>