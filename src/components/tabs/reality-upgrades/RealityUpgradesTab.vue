<script>
import RealityUpgradeButton from "./RealityUpgradeButton";

export default {
  name: "RealityUpgradesTab",
  components: {
    RealityUpgradeButton
  },
  computed: {
    upgrades: () => RealityUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e30)} RM and then even faster
      above ${format(Decimal.NUMBER_MAX_VALUE, 1)} RM`,
    possibleTooltip: () => `Checkered upgrades are impossible to unlock this Reality. Striped upgrades are
      still possible.`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
    categoryText: () => [
      `Amplifier Rebuyables`,
      `Cost: ${quantify("Reality Machine", 15, 2)}`,
      `Cost: ${quantify("Reality Machine", 50, 2)}`,
      `Cost: ${quantify("Reality Machine", 1500, 2)}`,
      `Cost: ${quantify("Reality Machine", 100000, 2)}`]
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div class="c-reality-upgrade-infotext">
      Mouseover <i class="fas fa-question-circle" /> icons for additional information.
      <br>
      The first row of upgrades can be purchased endlessly for increasing costs
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      and the rest are single-purchase.
      <br>
      Single-purchase upgrades also have requirements which, once completed, permanently unlock the ability
      to purchase the upgrades at any point.
      <span :ach-tooltip="possibleTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      Locked upgrades show their requirement and effect by default; unlocked ones show
      their effect, current bonus, and cost. Hold shift to swap this behavior.
      <br>
      You can shift-click upgrades with <i class="fas fa-lock-open" /> to make the game prevent you
      from doing anything this Reality which would cause you to fail their unlock condition.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      Every completed row of purchased upgrades increases your Glyph level by {{ formatInt(1) }}.
    </div>
    <div class="l-reality-upgrade-actual-grid">
      <div
      v-for="row in 5"
      :key="row"
    >
    <div class="c-reality-upgrade-row-title">Row {{row}} - {{ categoryText[row-1] }}</div>
    <div class="l-reality-upgrade-grid__row">
      <RealityUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.c-reality-upgrade-infotext {
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
.c-reality-upgrade-row-title{
  border-bottom: 0.1rem solid;
  border-top: 0.1rem solid;
  border-image: linear-gradient(90deg,transparent,var(--color-reality),transparent) 1;
  background: linear-gradient(90deg,transparent,color-mix(in srgb, var(--color-reality) 33%, transparent),transparent);
  color:var(--color-text);
  margin-bottom:1rem;
  font-family:cambria;
  font-weight: bold;
  line-height: 1.1;
  font-size: 1.5rem;
}
</style>
