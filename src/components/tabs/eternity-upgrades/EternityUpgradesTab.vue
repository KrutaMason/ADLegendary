<script>
import EPMultiplierButton from "./EPMultiplierButton";
import EternityUpgradeButton from "./EternityUpgradeButton";

export default {
  name: "EternityUpgradesTab",
  components: {
    EternityUpgradeButton,
    EPMultiplierButton
  },
  computed: {
    grid() {
      return [
        [
          EternityUpgrade.idMultEP,
          EternityUpgrade.idMultEternities,
          EternityUpgrade.idMultICRecords
        ],
        [
          EternityUpgrade.tdMultAchs,
          EternityUpgrade.tdMultTheorems,
          EternityUpgrade.tdMultRealTime,
        ]
      ];
    },
    costIncreases: () => EternityUpgrade.epMult.costIncreaseThresholds.map(x => new Decimal(x))
  },
  methods: {
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-eternity-upgrades-grid">
    <div class="l-eternity-upgrades-actual-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-eternity-upgrades-grid__row"
    >
      <EternityUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-eternity-upgrades-grid__cell"
      />
    </div>
    <EPMultiplierButton /></div><br>
    <div>
      The cost for the {{ formatX(5) }} multiplier jumps at {{ format(costIncreases[0]) }},
      {{ formatPostBreak(costIncreases[1], 2) }}, and {{ formatPostBreak(costIncreases[2]) }} Eternity Points.
      <br>
      The cost increases super-exponentially after {{ formatPostBreak(costIncreases[3]) }} Eternity Points.
    </div>
  </div>
</template>

<style scoped>
.l-eternity-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc(1rem + var(--padding))
}
.l-eternity-upgrades-actual-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.l-eternity-upgrades-grid__row {
  display: flex;
  flex-direction: row;
  border-bottom:1px solid;
  border-image:linear-gradient(90deg,transparent,var(--color-eternity),transparent) 1
}
.l-eternity-upgrades-grid__row:last-child {
border-bottom:none
}
.l-eternity-upgrades-grid__cell {
  margin: 1rem 0.8rem;
}
</style>
