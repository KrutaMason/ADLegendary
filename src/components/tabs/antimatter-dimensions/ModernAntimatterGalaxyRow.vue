<script>
import FillBar from "@/components/FillBar";

export default {
  name: "ModernAntimatterGalaxyRow",
  components: {
    FillBar
  },
  data() {
    return {
      type: GALAXY_TYPE.NORMAL,
      galaxies: {
        normal: 0,
        replicanti: 0,
        dilation: 0
      },
      requirement: {
        tier: 1,
        amount: 0
      },
      previousrequirement: {
        tier: 1,
        amount: 0
      },
      dimamount:0,
      canBeBought: false,
      distantStart: 0,
      remoteStart: 0,
      lockText: null,
      canBulkBuy: false,
      creditsClosed: false,
      scalingText: {
        distant: null,
        remote: null,
      },
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
    buttonText() {
      if (this.lockText !== null) return this.lockText;
      const reset = [];
      if (!Achievement(111).isEffectActive) reset.push("Dimensions");
      if (!Achievement(143).isEffectActive) reset.push("Dimension Boosts");
      return reset.length === 0
        ? `Increase the power of Tickspeed upgrades`
        : `Reset your ${makeEnumeration(reset)} to increase the power of Tickspeed upgrades`;
    },
    sumText() {
      const parts = [Math.max(this.galaxies.normal, 0)];
      if (this.galaxies.replicanti > 0) parts.push(this.galaxies.replicanti);
      if (this.galaxies.dilation > 0) parts.push(this.galaxies.dilation);
      const sum = parts.map(this.formatGalaxies).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${this.formatGalaxies(parts.sum())}`;
      }
      return sum;
    },
    typeName() {
      switch (this.type) {
        case GALAXY_TYPE.NORMAL: return "Antimatter Galaxies";
        case GALAXY_TYPE.DISTANT: return "Distant Antimatter Galaxies";
        case GALAXY_TYPE.REMOTE: return "Remote Antimatter Galaxies";
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case GALAXY_TYPE.DISTANT:
          return `Each Galaxy is more expensive past ${quantifyInt("Galaxy", this.distantStart)}`;
        case GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "distant", function: "quadratic", amount: this.distantStart },
            { type: "remote", function: "exponential", amount: this.remoteStart }
          ];
          return `Increased Galaxy cost scaling: ${scalings.sort((a, b) => a.amount - b.amount)
            .map(scaling => `${scaling.function} scaling past ${this.formatGalaxies(scaling.amount)} (${scaling.type})`)
            .join(", <br>").capitalize()}`;
        }
      }
      return undefined;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.canBeBought && this.hasTutorial,
        "o-primary-btn--disabled": !this.canBeBought,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      this.type = Galaxy.type;
      this.galaxies.normal = player.galaxies + GalaxyGenerator.galaxies;
      this.galaxies.replicanti = Replicanti.galaxies.total;
      this.galaxies.dilation = player.dilation.totalTachyonGalaxies;
      const requirement = Galaxy.requirement;
      this.requirement.amount = requirement.amount;
      this.requirement.tier = requirement.tier;
      this.previousrequirement.amount = player.galaxies>0?Galaxy.requirementAt(player.galaxies-1).amount:0;
      this.canBeBought = requirement.isSatisfied && Galaxy.canBeBought;
      this.distantStart = EternityChallenge(5).isRunning ? 0 : Galaxy.costScalingStart;
      this.remoteStart = Galaxy.remoteStart;
      this.lockText = Galaxy.lockText;
      this.canBulkBuy = EternityMilestone.autobuyMaxGalaxies.isReached;
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.dimamount = Laitela.continuumUnlocked&&Laitela.continuumActive?AntimatterDimension(this.requirement.tier).continuumAmount:AntimatterDimension(this.requirement.tier).bought
      if (this.isDoomed) {
        this.scalingText = {
          distant: this.formatGalaxies(this.distantStart),
          remote: this.formatGalaxies(Galaxy.remoteStart),
        };
      }
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.GALAXY);
      this.fillwidth = this.fillProgress()
    },
    buyGalaxy(bulk) {
      if (!this.canBeBought) return;
      manualRequestGalaxyReset(this.canBulkBuy && bulk);
    },
    formatGalaxies(num) {
      return num > 1e8 ? format(num, 2) : formatInt(num);
    },
    fillProgress() {
      let normalFill = formatPercents(Math.max(((this.dimamount-this.previousrequirement.amount) / (this.requirement.amount-this.previousrequirement.amount)),0),2)
      if (NormalChallenge(8).isRunning||InfinityChallenge(7).isRunning||EternityChallenge(6).isRunning) return "0%"
      return normalFill
    }
  }
};
</script>

<template>
  <div class="reset-container galaxy">
    <h4>{{ typeName }} ({{ sumText }})</h4>
    <span>Requires: {{ formatInt(requirement.amount) }} {{ dimName }}</span>
    <span v-if="hasIncreasedScaling" v-html="costScalingText"/>
    <button
      :class="classObject"
      @click.exact="buyGalaxy(true)"
      @click.shift.exact="buyGalaxy(false)"
    >
    <div style="z-index: 1;position: relative;">{{ buttonText }}</div>
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
      <div class="o-fill-container o-fill-container-full">
          <FillBar
          class="o-fill-bar--galaxy"
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
.o-fill-bar--galaxy {
  background: linear-gradient(transparent -25%,var(--color-celestials) 300%);
  box-shadow: 0 0 1rem #ffffff44 inset;
  transition-duration:0.1s
}
</style>