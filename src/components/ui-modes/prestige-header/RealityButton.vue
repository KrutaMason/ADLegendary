<script>
import FillBar from "@/components/FillBar";

export default {
  name: "RealityButton",
  components: {
    FillBar
  },
  data() {
    return {
      canReality: false,
      showSpecialEffect: false,
      isIMUnlocked: false,
      hasRealityStudy: false,
      machinesGained: new Decimal(),
      projectedRM: new Decimal(),
      newIMCap: 0,
      realityTime: 0,
      glyphLevel: 0,
      nextGlyphPercent: 0,
      nextGlyphPercentWidth: 0,
      nextMachineEP: 0,
      shardsGained: 0,
      currentShardsRate: 0,
      bestShardRate: 0,
      bestShardRateVal: 0,
      ppGained: 0,
      celestialRunText: ["", "", "", "", ""],
      wobbly: false,
    };
  },
  computed: {
    formatMachinesGained() {
      if (this.machinesGained.gt(0)) return `Machines gained: ${format(this.machinesGained, 2)}`;
      return "No Machines gained";
    },
    formatMachineStats() {
      if (!PlayerProgress.realityUnlocked() && this.nextMachineEP.gt("1e8000")) {
        return `(Capped this Reality!)`;
      }
      if (this.machinesGained.gt(0) && this.machinesGained.lt(100)) {
        return `(Next at ${format(this.nextMachineEP, 2)} EP)`;
      }
      if (this.machinesGained.eq(0) && this.newIMCap === 0) {
        return `(Projected: ${format(this.projectedRM, 2)} RM)`;
      }
      if (this.newIMCap !== 0) {
        return `(iM Cap: ${formatMachines(0, this.newIMCap)})`;
      }
      if (this.machinesGained.lt(Number.MAX_VALUE)) {
        return `(${format(this.machinesGained.divide(this.realityTime), 2, 2)} RM/min)`;
      }
      return "";
    },
    formatGlyphLevel() {
      if (this.glyphLevel >= 10000) return `Glyph level: ${formatInt(this.glyphLevel)}`;
      return `Glyph level: ${formatInt(this.glyphLevel)} <i>(${this.nextGlyphPercent} to next)</i>`;
    },
    showShardsRate() {
      return this.currentShardsRate;
    },
    shardsGainedText() {
      return quantify("Relic Shard", this.shardsGained, 2);
    },
    classObject() {
      return {
        "c-reality-button--unlocked": this.canReality,
        "c-reality-button--imaginary": this.isIMUnlocked,
        "c-reality-button--locked": !this.canReality,
        "c-reality-button--special": this.showSpecialEffect,
        "a-wobble-multi": this.wobbly
      };
    }
  },
  methods: {
    percentToNextGlyphLevelText(unfixed) {
      const glyphState = getGlyphLevelInputs();
      let level = glyphState.actualLevel;
      if (!isFinite(level)) level = 0;
      const decimalPoints = unfixed ? 2 : this.glyphLevel > 1000 ? 0 : 1;
      return `${formatPercents(Math.min(((level - Math.floor(level))), 0.999), decimalPoints)}`;
    },
    update() {
      this.hasRealityStudy = TimeStudy.reality.isBought;
      this.canReality = isRealityAvailable();
      this.showSpecialEffect = this.hasSpecialReward();
      this.isIMUnlocked = MachineHandler.isIMUnlocked;
      if (!this.canReality) {
        this.shardsGained = 0;
        return;
      }
      function EPforRM(rm) {
        const adjusted = Decimal.divide(rm, MachineHandler.realityMachineMultiplier);
        if (adjusted.lte(1)) return Decimal.pow10(4000);
        if (adjusted.lte(10)) return Decimal.pow10(4000 / 27 * (adjusted.toNumber() + 26));
        let result = Decimal.pow10(4000 * (adjusted.log10() / 3 + 1));
        if (!PlayerProgress.realityUnlocked() && result.gte("1e6000")) {
          result = result.div("1e6000").pow(4).times("1e6000");
        }
        return result;
      }

      const multiplier = simulatedRealityCount(false) + 1;
      this.projectedRM = MachineHandler.gainedRealityMachines.times(multiplier)
        .clampMax(MachineHandler.hardcapRM);
      this.newIMCap = MachineHandler.projectedIMCap;
      this.machinesGained = this.projectedRM.clampMax(MachineHandler.distanceToRMCap);
      this.realityTime = Time.thisRealityRealTime.totalMinutes;
      this.glyphLevel = gainedGlyphLevel().actualLevel;
      this.nextGlyphPercent = this.percentToNextGlyphLevelText(false);
      this.nextGlyphPercentWidth = this.glyphLevel > 10000 ?"0%":this.percentToNextGlyphLevelText(true);
      this.nextMachineEP = EPforRM(this.machinesGained.plus(1));
      this.ppGained = multiplier;
      this.shardsGained = Effarig.shardsGained * multiplier;
      this.currentShardsRate = (this.shardsGained / Time.thisRealityRealTime.totalMinutes);
      this.bestShardRate = player.records.thisReality.bestRSmin * multiplier;
      this.bestShardRateVal = player.records.thisReality.bestRSminVal * multiplier;
      this.wobbly = player.options.animations.wobbly;

      const teresaReward = this.formatScalingMultiplierText(
        "Glyph Sacrifice",
        Teresa.runRewardMultiplier,
        Math.max(Teresa.runRewardMultiplier, Teresa.rewardMultiplier(Currency.antimatter.value)));
      const teresaThreshold = this.formatThresholdText(
        Teresa.rewardMultiplier(Currency.antimatter.value) > Teresa.runRewardMultiplier,
        player.celestials.teresa.bestRunAM,
        "antimatter");
      this.celestialRunText = [
        [Teresa.isRunning, teresaReward, teresaThreshold]];
    },
    handleClick() {
      if (this.canReality) {
        requestManualReality();
      }
    },
    formatScalingMultiplierText(resource, before, after) {
      return `${resource} ${formatX(before, 2, 2)} ➜ ${formatX(after, 2, 2)}`;
    },
    formatThresholdText(condition, threshold, resourceName) {
      if (condition) return "";
      return `(${format(threshold, 2, 2)} ${resourceName} to improve)`;
    },
    // Make the button have a visual animation if Realitying will give a reward
    hasSpecialReward() {
      if (Teresa.isRunning && Teresa.rewardMultiplier(Currency.antimatter.value) > Teresa.runRewardMultiplier) {
        return true;
      }
      return Currency.eternityPoints.value.exponent > 4000 &&
        ((Effarig.isRunning && !EffarigUnlock.reality.isUnlocked) || (Enslaved.isRunning && !Enslaved.isCompleted));
    }
  }
};
</script>

<template>
  <div class="l-reality-button">
    <button
      class="c-reality-button infotooltip"
      :class="classObject"
      @click="handleClick"
    >
      <div class="l-reality-button__contents">
        <template v-if="canReality">
          <div style="z-index: 1;position: relative;">
            <div class="o-prestige-description c-reality-button__header">
              Make a new Reality
            </div>
            <div>{{ formatMachinesGained }} {{ formatMachineStats }}</div>
            <div v-html="formatGlyphLevel"/>
          </div>
          <div class="o-fill-container">
            <FillBar
            class="o-fill-bar--reality"
            :width="nextGlyphPercentWidth"
          />
        </div>
        </template>
        <template v-else-if="hasRealityStudy">
          <div>Get {{ format("1e4000") }} Eternity Points to unlock a new Reality</div>
        </template>
        <template v-else>
          <div>Purchase the study in the Eternity tab to unlock a new Reality</div>
        </template>
        <div
          v-if="canReality"
          class="infotooltiptext"
        >
          <div>Other resources gained:</div>
          <div class="o-descriptionBlock">{{ quantifyInt("Perk Point", ppGained) }}</div>
          <div v-if="shardsGained !== 0" class="o-descriptionBlock">
            {{ shardsGainedText }} ({{ format(currentShardsRate, 2) }}/min)
            <br>
            Peak: {{ format(bestShardRate, 2) }}/min at {{ format(bestShardRateVal, 2) }} RS
          </div>
          <div
            v-for="(celestialInfo, i) in celestialRunText"
            v-if="celestialInfo[0]"
            :key="i"
          >
            <div v-if="celestialInfo[0]" class="o-descriptionBlock">
              {{ celestialInfo[1] }}
              <br>
              {{ celestialInfo[2] }}
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.c-reality-button--unlocked:hover>.l-reality-button__contents>.o-fill-containerl > .o-fill-bar--reality,
.c-reality-button--special>.l-reality-button__contents>.o-fill-container > .o-fill-bar--reality {
  background: linear-gradient(transparent -100%,var(--color-text) 300%);
}
</style>
