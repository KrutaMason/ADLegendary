<script>
import FillBar from "@/components/FillBar";

export default {
  name: "ModernDimensionBoostRow",
  components: {
    FillBar
  },
  data() {
    return {
      requirement: {
        tier: 1,
        amount: 0
      },
      previousrequirement: {
        tier: 1,
        amount: 0
      },
      dimamount:0,
      isBuyable: false,
      purchasedBoosts: 0,
      imaginaryBoosts: 0,
      lockText: null,
      unlockedByBoost: null,
      creditsClosed: false,
      requirementText: null,
      hasTutorial: false,
      fillwidth:0
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      if (player.options.naming.dimensions) return `${AntimatterDimension(this.requirement.tier).uniqueName}s 
      (${AntimatterDimension(this.requirement.tier).shortDisplayName})`
      return `${AntimatterDimension(this.requirement.tier).shortDisplayName} Antimatter D`;
    },
    boostCountText() {
      if (this.requirementText) return this.requirementText;
      const parts = [this.purchasedBoosts];
      if (this.imaginaryBoosts !== 0) {
        parts.push(this.imaginaryBoosts);
      }
      const sum = parts.map(formatInt).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${formatInt(parts.sum())}`;
      }
      return sum;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.isBuyable && this.hasTutorial,
        "o-primary-btn--disabled": !this.isBuyable,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      const requirement = DimBoost.requirement;
      this.requirement.tier = requirement.tier;
      this.requirement.amount = requirement.amount;
      this.previousrequirement.amount = player.dimensionBoosts>4?DimBoost.bulkRequirement(-1).amount:0;
      this.isBuyable = requirement.isSatisfied && DimBoost.canBeBought;
      this.purchasedBoosts = DimBoost.purchasedBoosts;
      this.imaginaryBoosts = DimBoost.imaginaryBoosts;
      this.lockText = DimBoost.lockText;
      this.unlockedByBoost = DimBoost.unlockedByBoost;
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.dimamount = Laitela.continuumUnlocked&&Laitela.continuumActive?AntimatterDimension(this.requirement.tier).continuumAmount:AntimatterDimension(this.requirement.tier).bought
      if (this.isDoomed) this.requirementText = formatInt(this.purchasedBoosts);
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.DIMBOOST);
      this.fillwidth = this.fillProgress()
    },
    dimensionBoost(bulk) {
      if (!DimBoost.requirement.isSatisfied || !DimBoost.canBeBought) return;
      manualRequestDimensionBoost(bulk);
    },
    fillProgress() {
      let normalFill = formatPercents(Math.max((this.dimamount-this.previousrequirement.amount) / (this.requirement.amount-this.previousrequirement.amount),0),2);
      if (NormalChallenge(8).isRunning) return player.dimensionBoosts >= (InfinityChallenge(1).isRunning?2:5) ? "0%" : normalFill
      if (Ra.isRunning) return player.dimensionBoosts >= 4 ? "0%" : normalFill
      return normalFill
    }
  }
};
</script>

<template>
  <div class="reset-container dimboost">
    <h4>Dimension Boost ({{ boostCountText }})</h4>
    <span>Requires: {{ formatInt(requirement.amount) }} {{ dimName }}</span>
    <button
      :class="classObject"
      @click.exact="dimensionBoost(true)"
      @click.shift.exact="dimensionBoost(false)"
    >
    <div style="z-index: 1;position: relative;">{{ unlockedByBoost }}</div>
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
      <div class="o-fill-container o-fill-container-full">
          <FillBar
          class="o-fill-bar--dimboost"
          :width="fillwidth"
          />
      </div>
    </button>
  </div>
</template>
<style scoped>
.o-fill-container-full{
  opacity:1
}
.o-fill-bar--dimboost {
  box-shadow: 0 0 1rem #ffffff44 inset;
  background: linear-gradient(transparent -25%,#00ee0044 200%);
  transition-duration:0.1s
}
</style>