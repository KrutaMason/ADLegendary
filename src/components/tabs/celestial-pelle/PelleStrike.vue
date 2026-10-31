<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";

export default {
  name: "PelleStrike",
  components: {
    ExpandingControlBox
  },
  props: {
    strike: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      strikeReward: ""
    };
  },
  computed: {
    requirementText() {
      return `▼ ${this.strike.requirement} ▼`
    }
  },
  methods: {
    update() {
      this.strikeReward = this.strike.reward();
    }
  }
};
</script>

<template>
  <div class="c-pelle-strike-container">
    <ExpandingControlBox container-class="c-pelle-strike">
      <template #header>
        <div class="c-pelle-strike-header" v-html="requirementText"/>
      </template>
      <template #dropdown>
        <div class="c-pelle-strike-dropdown">
          <span>Penalty: {{ strike.penalty }}</span>
          <br>
          <span>Reward: {{ strikeReward }}</span>
        </div>
      </template>
    </ExpandingControlBox>
  </div>
</template>

<style>
.c-pelle-strike {
  min-height: 3.8rem;
  z-index: 3;
  font-size: 1.3rem;
  color: var(--color-text);
  background: linear-gradient(var(--color-background),var(--color-pelle--base) 300%);
  border: var(--var-border-width, 0.1rem) solid var(--color-pelle--base);
  box-shadow: var(--var-box-shadow, 0 0 1rem var(--color-background) inset ,0 0 0 0.2rem var(--color-pelle--base) inset);
  border-radius: var(--var-border-radius, 0.5rem);
}

.s-base--dark .c-pelle-strike {
  background: url(../../../../public/images/patterns/cel_7.png), linear-gradient(var(--color-background),var(--color-pelle--base) 300%);
  background-position: center;
}

.c-pelle-strike-container {
  width: 33rem;
  height: 5rem;
  z-index: 3;
  padding: 0.5rem 0.5rem 2rem;
}

.c-pelle-strike-header {
  color: var(--color-pelle--base);
  padding: 0.7rem;
  font-family: var(--var-secondary-font);
  font-weight: bold;
  font-size: 1.6rem;
  cursor: pointer;
}

.c-pelle-strike-header .c-font-fixed {
  font-size: 1.5rem;
}

.c-pelle-strike-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.05rem;
  padding: 0.7rem;
}
</style>
