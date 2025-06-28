<script>
import wordShift from "@/core/word-shift";

import PelleRiftBar from "./PelleRiftBar";
import PelleStrike from "./PelleStrike";

export default {
  name: "PelleRift",
  components: {
    PelleStrike,
    PelleRiftBar
  },
  props: {
    strike: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      hasStrike: false,
      isActive: false,
      isMaxed: false,
      totalFill: new Decimal(),
      resource: new Decimal(),
      hasEffectiveFill: false,
      effects: []
    };
  },
  computed: {
    rift() {
      return this.strike.rift;
    },
    // We treat the 3rd rift slightly differently because it drains the 2nd rift, meaning it needs the word cycle
    // and a bit of additional UI info
    specialRift() {
      return this.rift.id === 3;
    },
    infoTooltip() {
      return `The Replicanti requirement for the 2nd Rift is based on the total amount you have ever filled, including
        any amount drained to fill this Rift.`;
    }
  },
  methods: {
    update() {
      this.hasStrike = this.strike.hasStrike;
      if (!this.hasStrike) return;
      const rift = this.rift;
      this.effects = this.rift.effects;
      this.isActive = rift.isActive;
      this.isMaxed = rift.isMaxed || Pelle.hasGalaxyGenerator;
      this.setValue("totalFill", rift.totalFill);
      this.setValue("resource", rift.fillCurrency.value);
      this.hasEffectiveFill = rift.key === "decay" && PelleRifts.chaos.milestones[0].canBeApplied;
    },
    // One rift has a number and the others are all Decimals; this reduces boilerplate for setting multiple values
    setValue(key, value) {
      if (typeof value === "number") this[key] = value;
      else this[key].copyFrom(value);
    },
    // One-off formatting function; needs to format large Decimals and a small number assumed to be a percentage
    formatRift(value) {
      return typeof value === "number" ? `${formatInt(100 * value)}%` : format(value, 2);
    },
    riftName() {
      return wordShift.wordCycle(this.rift.name, true);
    },
    drainResource() {
      return this.specialRift
        ? wordShift.wordCycle(this.rift.drainResource)
        : this.rift.drainResource;
    }
  },
};
</script>

<template>
  <div
    v-if="hasStrike"
    class="c-pelle-single-bar"
  >
    <div class="c-pelle-rift">
      <div class="c-pelle-rift-row">
        <div class="c-pelle-rift-status">
          <h2 class="c-pelle-rift-name-header">
            {{ riftName() }}
          </h2>
          <div class="c-pelle-rift-rift-info-container">
            <div
              v-for="(effect, idx) in effects"
              :key="idx"
            >
              {{ effect || "" }}
            </div>
          </div>
        </div>
        <div class="c-pelle-rift-column">
          <PelleStrike :strike="strike" />
          <PelleRiftBar :rift="rift" />
        </div>
        <div class="c-pelle-rift-status">
          <div class="c-pelle-rift-fill-status">
            <h2 class="c-pelle-rift-name-header">
              {{ riftName() }}
            </h2>
            <div class="c-pelle-rift-rift-info-container">
              Drains {{ drainResource() }} to fill.
              <span
                v-if="specialRift"
                :ach-tooltip="infoTooltip"
              >
                <i class="fas fa-question-circle" />
              </span>
              <br>
              <template v-if="!isMaxed">
                Current Amount: {{ formatRift(resource) }}
              </template>
              <br>
              Total Filled: {{ formatRift(rift.totalFill) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-pelle-single-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.c-pelle-rift {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--var-border-width, 0.1rem) solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  background: linear-gradient(90deg, var(--color-pelle--base) -200%,#ffffff40 25% 75%,var(--color-pelle--base) 300%);;
  /* transparent crimson */
  box-shadow: var(--var-box-shadow, 0 0 1rem var(--color-background) inset, 0 0 0 0.2rem var(--color-pelle--base) inset), 
  inset 0 0 1rem 0.1rem #ed143d73, 0 0 1rem 0.1rem #ed143d73;
  margin-top: 1.2rem;
}
.s-base--dark .c-pelle-rift{
  background: linear-gradient(90deg, var(--color-pelle--base) -200%,#00000060 25% 75%,var(--color-pelle--base) 300%);
}
.t-s1 .c-pelle-rift {
  box-shadow: none;
}

.c-pelle-rift-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-pelle-rift-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:0 1rem;
  border-left: 0.1rem solid var(--color-pelle--base);
  border-right: 0.1rem solid var(--color-pelle--base);
  box-shadow: 0 0 1rem var(--color-background) inset, 0 0 0 0.2rem var(--color-pelle--base) inset;
}
.s-base--dark .c-pelle-rift-column {
  background:#00000080
}
.c-pelle-rift-rift-info-container {
  height: 5rem;
  font-weight: 400;
  color: var(--color-text);
}

.c-pelle-rift-status {
  display: flex;
  flex-direction: column;
  width: 28rem;
  align-items: center;
}

.c-pelle-rift-name-header {
  font-weight: bold;
  width:28rem;
  color: var(--color-pelle--base);
  padding: 0.2rem;
  border-bottom:0.1rem solid;
  border-image:linear-gradient(90deg,transparent,currentcolor,transparent)1
}
</style>
