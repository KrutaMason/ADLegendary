<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicAntimatterDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      end: false,
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      boughtBefore10: 0,
      rateOfChange: new Decimal(0),
      singleCost: new Decimal(0),
      until10Cost: new Decimal(0),
      isAffordable: false,
      isAffordableUntil10: false,
      isAutobuyerUnlocked: false,
      isAutobuyerOn: false,
      visibleAutobuyers: false,
      isContinuumActive: false,
      continuumValue: 0,
      isDestabilized:false,
      isShown: false,
      isCostsAD: false,
      formattedAmount: null,
      hasTutorial: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    name() {
      return player.options.naming.dimensions?
      `Antimatter ${AntimatterDimension(this.tier).uniqueName}`:
      `${AntimatterDimension(this.tier).shortDisplayName} Antimatter Dimension`;
    },
    amountText() {
      if (this.formattedAmount) return this.formattedAmount;
      const amount = this.tier < 8 ? format(this.amount, 2) : formatInt(this.amount);
      return `${amount} (${this.isContinuumActive?"ᛝ":formatInt(this.boughtBefore10)})`;
    },
    singleText() {
      if (this.isCapped) return "Capped";
      const prefix = this.showCostTitle(this.singleCost) ? "Cost: " : "";
      const suffix = this.isCostsAD ? `${this.costUnit}` : "AM";
      return `${prefix} ${format(this.singleCost)} ${suffix}`;
    },
    until10Text() {
      if (this.isCapped) return "Shattered by Nameless";
      if (this.isContinuumActive) return `Continuum: ${this.continuumString}`;

      const prefix = `Until ${formatInt(10)},${this.showCostTitle(this.until10Cost) ? " Cost" : ""}`;
      const suffix = this.isCostsAD ? `${this.costUnit}` : "AM";
      return `${prefix} ${format(this.until10Cost)} ${suffix}`;
    },
    continuumString() {
      return formatFloat(this.continuumValue, 2);
    },
    showRow() {
      return this.isShown || this.isUnlocked || this.amount.gt(0);
    },
    boughtTooltip() {
      if (this.isCapped) return `Nameless prevents the purchase of more than ${format(1)} 
      ${player.options.naming.dimensions ? `Antimatter ${AntimatterDimension(8).uniqueName}` : "8th Antimatter Dimension"}`;
      if (this.isContinuumActive) return "Continuum produces all your Antimatter Dimensions";
      return `Purchased ${quantifyInt("time", this.bought)}`;
    },
    costUnit() {
      return `${AntimatterDimension(this.tier - 2).shortDisplayName} AD`;
    },
    buySingleClass() {
      return {
        "o-primary-btn--buy-ad o-primary-btn--buy-single-ad c-dim-tooltip-container": true,
        "l-dim-row-small-text": this.isLongText(this.singleText) || !this.showCostTitle(this.singleCost),
      };
    },
    buyTenClass() {
      return {
        "o-primary-btn--buy-ad o-primary-btn--buy-dim c-dim-tooltip-container": true,
        "o-primary-btn--buy-10-ad": !this.isContinuumActive,
        "o-primary-btn--continuum-ad o-continuum": this.isContinuumActive,
        "l-dim-row-small-text": this.isLongText(this.until10Text) && !this.isContinuumActive
      };
    }
  },
  watch:{
    isAutobuyerOn(newValue) {
      Autobuyer.antimatterDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      if (tier === 8 && this.isDoomed) this.formattedAmount = formatInt(this.amount);
      if (tier > DimBoost.maxDimensionsUnlockable) return;
      const dimension = AntimatterDimension(tier);
      this.isUnlocked = dimension.isAvailableForPurchase;
      this.isCapped = tier === 8 && Enslaved.isRunning && dimension.bought >= 1;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.totalAmount);
      this.totalAmount = dimension.totalAmount;
      this.bought = dimension.bought;
      this.boughtBefore10 = dimension.boughtBefore10;
      this.singleCost.copyFrom(dimension.cost);
      this.until10Cost.copyFrom(dimension.costUntil10);
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.isAffordable = dimension.isAffordable;
      this.isAffordableUntil10 = dimension.isAffordableUntil10;

      this.isAutobuyerUnlocked = Autobuyer.antimatterDimension(tier).isUnlocked;
      this.isAutobuyerOn = Autobuyer.antimatterDimension(tier).isActive;
      this.visibleAutobuyers = player.options.adbuyersSubtab
      this.isContinuumActive = Laitela.continuumActive;
      if (tier > 8-Laitela.difficultyTier) {
        this.isDestabilized = Laitela.isRunning ? true : false
      }
      if (this.isContinuumActive) this.continuumValue = dimension.continuumValue;
      this.isShown =
        (DimBoost.totalBoosts > 0 && DimBoost.totalBoosts + 3 >= tier) || PlayerProgress.infinityUnlocked();
      this.isCostsAD = NormalChallenge(6).isRunning && tier > 2 && !this.isContinuumActive;
      this.hasTutorial = (tier === 1 && Tutorial.isActive(TUTORIAL_STATE.DIM1)) ||
        (tier === 2 && Tutorial.isActive(TUTORIAL_STATE.DIM2));
    },
    buySingle() {
      if (this.isContinuumActive) return;
      buyOneDimension(this.tier, true);
    },
    buyUntil10() {
      if (this.isContinuumActive) return;
      buyManyDimension(this.tier, true);
    },
    showCostTitle(value) {
      return value.exponent < 1000000;
    },
    isLongText(str) {
      return str.length > 20;
    },
    tutorialClass() {
      return {
        "l-glow-container": true,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row c-antimatter-dim-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked,'c-dim-row--unstable': isDestabilized }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="!isDestabilized?formatX(multiplier, 2, 2) : 'Destabilized'"
      :amount-text="amountText"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container">
      <PrimaryButton
        v-if="!isContinuumActive"
        :enabled="isAffordable && !isCapped && isUnlocked"
        :class="buySingleClass"
        @click="buySingle"
      >
        <div :class="tutorialClass()">
          {{ singleText }}
        </div>
        <div class="c-dim-purchase-count-tooltip">
          {{ boughtTooltip }}
        </div>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </PrimaryButton>
      <PrimaryButton
        :enabled="(isAffordableUntil10 || isContinuumActive) && !isCapped && isUnlocked"
        :class="buyTenClass"
        @click="buyUntil10"
      >
        {{ until10Text }}
        <div class="c-dim-purchase-count-tooltip">
          {{ boughtTooltip }}
        </div>
      </PrimaryButton> 
      <PrimaryToggleButton
        v-if="(isAutobuyerUnlocked && !isContinuumActive) && visibleAutobuyers"
        v-model="isAutobuyerOn"
        class="o-primary-btn--ad-auto"
        label="Auto:"
      />
    </div>
  </div>
</template>

<style scoped>
.l-glow-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  border-radius: var(--var-border-radius, inherit);
}

.o-continuum {
  --border: var(--color-laitela--base);
  color: var(--color-laitela--accent);
  background: var(--color-laitela--base);
  box-shadow: var(--var-box-shadow, 0 0 0 0.1rem var(--color-laitela--base) inset, 0 0 1rem -0.2rem inset var(--color-laitela--accent));
  background-image: url(../../../../public/images/upgrades/button-continuum.png);
  border: 0.1rem solid var(--color-laitela--accent);
  background-position-y: center;
  animation: a-continuum 5s linear infinite
}
.t-metro .o-continuum,
.t-inverted-metro .o-continuum {
  box-shadow: var(--var-box-shadow, 0.1rem 0.1rem 0.1rem 0 #9e9e9e, var(--border) inset 0px 0px 0px 1px);
}
.t-dark-metro .o-continuum {
  box-shadow: var(--var-box-shadow, 0.1rem 0.1rem 0.1rem 0 black, var(--border) inset 0px 0px 0px 1px);
}
.o-continuum:hover {
  color: var(--color-laitela--base);
  background: var(--color-laitela--accent);
  box-shadow: var(--var-box-shadow, 0 0 0 0.1rem var(--color-laitela--base) inset, 0 0 1rem -0.2rem inset var(--color-laitela--base));
  background-position-y: center;
  background-image: url(../../../../public/images/upgrades/button-continuum.png);
}
</style>
