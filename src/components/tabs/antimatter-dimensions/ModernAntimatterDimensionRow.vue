<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ModernAntimatterDimensionRow",
  components: {
    GenericDimensionRowText,
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
      buyUntil10: true,
      isAutobuyerUnlocked: false,
      isAutobuyerOn: false,
      visibleAutobuyers:false,
      howManyCanBuy: 0,
      isContinuumActive: false,
      continuumValue: 0,
      isDestabilized:false,
      isShown: false,
      isCostsAD: false,
      amountDisplay: "",
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
    costDisplay() {
      return this.buyUntil10 ? format(this.until10Cost) : format(this.singleCost);
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
    buttonPrefix() {
      if (!this.isUnlocked) return "Locked";
      if (this.isCapped) return "Shattered by Nameless";
      if (this.isContinuumActive) return "Continuum: ";
      return `Buy ${formatInt(this.howManyCanBuy)}`;
    },
    buttonValue() {
      if (this.isCapped) return "";
      if (this.isContinuumActive) return this.continuumString;
      const prefix = this.showCostTitle(this.buyUntil10 ? this.until10Cost : this.singleCost) ? "Cost: " : "";
      const suffix = this.isCostsAD ? this.costUnit : "AM";
      return `${prefix}${this.costDisplay} ${suffix}`;
    },
    hasLongText() {
      return this.buttonValue.length > 26;
    },
  },
  watch:{
    isAutobuyerOn(newValue) {
      Autobuyer.antimatterDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      if (tier > DimBoost.maxDimensionsUnlockable && !this.isDoomed) return;
      const dimension = AntimatterDimension(tier);
      this.isUnlocked = dimension.isAvailableForPurchase;
      const buyUntil10 = player.buyUntil10;
      this.isCapped = tier === 8 && Enslaved.isRunning && dimension.bought >= 1;
      this.multiplier.copyFrom(AntimatterDimension(tier).multiplier);
      this.amount.copyFrom(dimension.totalAmount);
      this.bought = dimension.bought;
      this.boughtBefore10 = dimension.boughtBefore10;
      this.howManyCanBuy = buyUntil10 ? dimension.howManyCanBuy : Math.min(dimension.howManyCanBuy, 1);
      this.singleCost.copyFrom(dimension.cost);
      this.until10Cost.copyFrom(dimension.cost.times(Math.max(dimension.howManyCanBuy, 1)));
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.isAffordable = dimension.isAffordable;
      this.buyUntil10 = buyUntil10;
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
      this.amountDisplay = this.tier < 8 ? format(this.amount, 2) : formatInt(this.amount);
      this.hasTutorial = (tier === 1 && Tutorial.isActive(TUTORIAL_STATE.DIM1)) ||
        (tier === 2 && Tutorial.isActive(TUTORIAL_STATE.DIM2));
    },
    buy() {
      if (this.isContinuumActive) return;
      if (this.howManyCanBuy === 1) {
        buyOneDimension(this.tier, true);
      } else {
        buyAsManyAsYouCanBuy(this.tier, true);
      }
    },
    showCostTitle(value) {
      return value.exponent < 1000000;
    },
    buttonClass() {
      return {
        "o-primary-btn o-primary-btn--new": true,
        "o-primary-btn--disabled": (!this.isAffordable && !this.isContinuumActive) || !this.isUnlocked || this.isCapped,
        "o-non-clickable o-continuum": this.isContinuumActive
      };
    },
    containerClass() {
      return {
        "c-modern-dim-purchase-count-tooltip": true,
        "multi-buttons": (this.isAutobuyerUnlocked && !this.isContinuumActive) && this.visibleAutobuyers,
      };
    },
    buttonTextClass() {
      return {
        "button-content l-modern-buy-ad-text": true,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    }
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-antimatter-dim c-antimatter-dim-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked,'c-dim-row--unstable': isDestabilized }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="!isDestabilized?formatX(multiplier, 2, 2) : 'Destabilized'"
      :amount-text="amountDisplay"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container c-modern-dim-tooltip-container">
      <div 
      :class="containerClass()"
      >
        {{ boughtTooltip }}
      </div>
      <button
        :class="buttonClass()"
        @click="buy"
      >
        <div :class="buttonTextClass()">
          <div>
            {{ buttonPrefix }}
          </div>
          <div :class="{ 'l-dim-row-small-text': hasLongText }">
            {{ buttonValue }}
          </div>
          <div
            v-if="hasTutorial"
            class="fas fa-circle-exclamation l-notification-icon"
          />
        </div>
        <div
          v-if="!isContinuumActive && isUnlocked && !isCapped"
          class="fill"
        >
          <div
            class="fill-purchased"
            :style="{ 'width': boughtBefore10*10 + '%' }"
          />
          <div
            class="fill-possible"
            :style="{ 'width': howManyCanBuy*10 + '%' }"
          />
        </div>
      </button>
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
.l-modern-buy-ad-text {
  display: flex;
  flex-direction: column;
}

.o-non-clickable {
  cursor: auto;
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
  background-position-y: center;
  box-shadow: var(--var-box-shadow, 0 0 0 0.1rem var(--color-laitela--base) inset, 0 0 1rem -0.2rem inset var(--color-laitela--base));
  background-image: url(../../../../public/images/upgrades/button-continuum.png);
}

.c-modern-dim-tooltip-container .c-modern-dim-purchase-count-tooltip.multi-buttons {
  transform: translate(calc(-175% - 1rem), -50%);
}
</style>
