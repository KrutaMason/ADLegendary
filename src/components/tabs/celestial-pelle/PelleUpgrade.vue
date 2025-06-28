<script>
import CostDisplay from "@/components/CostDisplay";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import DescriptionDisplay from "@/components/DescriptionDisplay";

export default {
  name: "PelleUpgrade",
  components: {
    DescriptionDisplay,
    CostDisplay,
    CustomizeableTooltip
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    faded: {
      type: Boolean,
      required: false
    },
    galaxyGenerator: {
      type: Boolean,
      required: false,
    },
    showImprovedEstimate: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      canBuy: false,
      isBought: false,
      purchases: 0,
      currentTimeEstimate: new Decimal(0),
      projectedTimeEstimate: new Decimal(0),
      isCapped: false,
      hovering: false,
      hasRemnants: false,
      galaxyCap: 0,
      notAffordable: false
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    effectText() {
      if (!this.config.formatEffect) return false;
      const prefix = this.isCapped ? "Capped:" : "Currently:";
      const formattedEffect = x => this.config.formatEffect(this.config.effect(x));
      const value = formattedEffect(this.purchases);
      const next = (!this.isCapped && this.hovering)
        ? formattedEffect(this.purchases + 1)
        : undefined;
      return { prefix, value, next };
    },
    timeEstimate() {
      if (!this.hasTimeEstimate || !this.hasRemnants) return null;
      if (this.notAffordable) return "Never affordable due to Generated Galaxy cap";
      return this.currentTimeEstimate;
    },
    hasTimeEstimate() {
      return !(this.canBuy ||
        this.isBought ||
        this.isCapped ||
        (this.galaxyGenerator && this.config.currencyLabel !== "Galaxy")
      );
    },
    shouldEstimateImprovement() {
      return this.showImprovedEstimate && this.hasTimeEstimate;
    },
    estimateImprovement() {
      if (!this.shouldEstimateImprovement) return "";
      if (!Pelle.canArmageddon) return `${this.currentTimeEstimate}`;
      // If the improved value is still "> 1 year" then we only show it once
      if (this.projectedTimeEstimate.startsWith(">")) return this.projectedTimeEstimate;
      return `${this.currentTimeEstimate} ➜ ${this.projectedTimeEstimate}`;
    },
  },
  methods: {
    update() {
      this.canBuy = this.upgrade.canBeBought && !this.faded;
      this.isBought = this.upgrade.isBought;
      this.isCapped = this.upgrade.isCapped;
      this.purchases = player.celestials.pelle.rebuyables[this.upgrade.config.id];
      this.currentTimeEstimate = TimeSpan
        .fromSeconds(this.secondsUntilCost(this.galaxyGenerator ? GalaxyGenerator.gainPerSecond
          : Pelle.realityShardGainPerSecond).toNumber())
        .toTimeEstimate();
      this.projectedTimeEstimate = TimeSpan
        .fromSeconds(this.secondsUntilCost(Pelle.nextRealityShardGain).toNumber())
        .toTimeEstimate();
      this.hasRemnants = Pelle.cel.remnants > 0;
      this.galaxyCap = GalaxyGenerator.generationCap;
      const genDB = GameDatabase.celestials.pelle.galaxyGeneratorUpgrades;
      this.notAffordable = (this.config === genDB.additive || this.config === genDB.multiplicative) &&
        (Decimal.gt(this.upgrade.cost, this.galaxyCap - GalaxyGenerator.generatedGalaxies + player.galaxies));
    },
    secondsUntilCost(rate) {
      const value = this.galaxyGenerator ? player.galaxies + GalaxyGenerator.galaxies : Currency.realityShards.value;
      return Decimal.sub(this.upgrade.cost, value).div(rate);
    },
  }
};
</script>

<template>
  <button
    class="c-pelle-upgrade"
    :class="{
      'c-pelle-upgrade--unavailable': !canBuy && !(isBought || isCapped),
      'c-pelle-upgrade--bought': isBought || isCapped,
      'c-pelle-upgrade--faded': faded,
      'c-pelle-upgrade--galaxyGenerator': galaxyGenerator
    }"
    @click="!faded && upgrade.purchase(true)"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <CustomizeableTooltip
      :show="shouldEstimateImprovement"
      left="50%"
      top="0"
    >
      <template #tooltipContent>
        {{ estimateImprovement }}
      </template>
    </CustomizeableTooltip>
    <CustomizeableTooltip
      v-if="timeEstimate"
      left="50%"
      top="0"
      content-class="l-fill-container"
    >
      <template #tooltipContent>
        {{ timeEstimate }}
      </template>
    </CustomizeableTooltip>
    <DescriptionDisplay :config="config" />
    <div class="l-pelle-upgrade-gap" />
    <div v-if="effectText">
      {{ effectText.prefix }} {{ effectText.value }}
      <template v-if="effectText.next">
        ➜ <span
          :class="{
            'c-improved-effect': canBuy,
            'c-improved-effect--unavailable': !canBuy,
          }"
        >
          {{ effectText.next }}
        </span>
      </template>
      <div class="l-pelle-upgrade-gap" />
    </div>
    <CostDisplay
      v-if="!isCapped"
      :config="config"
      :name="galaxyGenerator ? config.currencyLabel : 'Reality Shard'"
    />
  </button>
</template>

<style scoped>
.c-pelle-upgrade {
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 9rem;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family: Typewriter;
  font-size: 0.95rem;
  color: var(--color-pelle--secondary);
  text-shadow: var(--var-text-shadow, -0.1rem -0.1rem 0.3rem black,0.1rem 0.1rem 0.3rem black);
  background: var(--bg), linear-gradient(var(--bg-bright),var(--bg-dark));
  --bg-dark:#002020;
  --bg-bright:#001111;
  border: 0.1rem solid var(--border);
  --border:var(--color-pelle--secondary);
  border-radius: var(--var-border-radius, 0.5rem);
  box-shadow: var(--var-box-shadow, var(--box-shadow),inset 0 0 1rem 0.1rem);
  margin: 0.6rem 0.55rem;
  padding: 1rem;
  cursor: pointer;
  background-position: center;
  --bg:url(../../../../public/images/upgrades/pelle-2.png)
}

.c-pelle-upgrade:hover {
  color:white;
  --border:white;
  box-shadow: inset 0 0 2rem 0.1rem;
  transition-duration: 0.3s;
  --bg-dark:#006969;
}

/* stylelint-disable-next-line selector-class-pattern */
.c-pelle-upgrade--galaxyGenerator {
  height: 10rem;
  --border:white;
  color: white;
  --bg-dark: #0b3333;
  --bg-bright: rgb(87, 22, 35);
  box-shadow: none;
  --bg:url(../../../../public/images/prestige/galgen-unlock.png),url(../../../../public/images/prestige/galgen-unlock-2.png),url(../../../../public/images/upgrades/pelle-2.png);
  animation: a-galgenunlock 10s infinite linear;
}
@keyframes a-galgenunlock{
  0%{background-position: 0 0, 0 0,center,center;}
  100%{background-position: 256px 256px, -256px -256px,center,center;}
}
.c-pelle-upgrade--galaxyGenerator:not(.c-pelle-upgrade--unavailable) {
  text-shadow:-1px -1px #ff000080, 1px 1px #00ffff80;
  box-shadow:var(--box-shadow),inset 0 0 1rem 0.1rem,0.2rem 0.2rem 0.3rem var(--color-pelle--base),-0.2rem -0.2rem 0.3rem var(--color-pelle--secondary)
}
.c-pelle-upgrade--galaxyGenerator:hover:not(.c-pelle-upgrade--unavailable) {
  --bg-dark: var(--color-pelle--secondary);
  box-shadow:var(--box-shadow),inset 0 0 1rem 0.1rem,0.5rem 0.5rem 0.3rem var(--color-pelle--base),-0.5rem -0.5rem 0.3rem var(--color-pelle--secondary)
}
.c-pelle-upgrade--unavailable {
  --border: #3b696f !important;
  color: #aaaaaa;
  --bg-dark: var(--leg-bg-dark) !important;
  --bg-bright: var(--leg-bg-bright) !important;
  box-shadow: var(--var-box-shadow, var(--box-shadow),var(--border) inset 0px 0px 0px 2px);
  cursor: default;
}
.c-pelle-upgrade--unavailable:hover {
  --bg-dark: var(--leg-bg-hover) !important;
}
.c-pelle-upgrade--faded {
  opacity: 0.3;
  box-shadow: none;
  cursor: default;
}

.c-pelle-upgrade--bought {
  color:white;
  --border:var(--color-pelle--secondary) !important;
  --bg-bright: #148585;
  --bg-dark: #0a3b43 !important;
  box-shadow: var(--var-box-shadow, var(--box-shadow),var(--border) inset 0px 0px 0px 2px);
  cursor: default;
}

/* stylelint-disable-next-line selector-class-pattern */
.c-pelle-upgrade--galaxyGenerator:hover,
.c-pelle-upgrade--unavailable:hover,
.c-pelle-upgrade--faded:hover,
.c-pelle-upgrade--bought:hover {
  box-shadow: var(--var-box-shadow, var(--box-shadow),0.1rem 0.1rem 0.5rem var(--color-pelle--secondary),var(--border) inset 0px 0px 0px 2px);
  transition-duration: 0.3s;
}

.l-pelle-upgrade-gap {
  flex-shrink: 0;
  height: 0.5rem;
}

.c-improved-effect {
  font-weight: bold;
  color: #00bb00;
}

.c-improved-effect--unavailable {
  font-weight: bold;
  color: var(--color-infinity);
}

.s-base--metro .c-pelle-upgrade--unavailable {
  background-color: #9e9e9e;
}
</style>
