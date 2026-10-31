<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicInfinityDimensionRow",
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
      hasPrevTier: false,
      isUnlocked: false,
      canUnlock: false,
      multiplier: new Decimal(0),
      baseAmount: 0,
      amount: new Decimal(0),
      purchases: 0,
      rateOfChange: new Decimal(0),
      isAutobuyerUnlocked: false,
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capIP: new Decimal(0),
      isAutobuyerOn: false,
      isEC8Running: false,
      hardcap: InfinityDimensions.HARDCAP_PURCHASES,
      eternityReached: false,
      enslavedRunning: false,
      isDestabilized:false,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return InfinityDimension(this.tier).fullName(...[,,], false);
    },
    costDisplay() {
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "Capped";
        return this.showCostTitle ? `Cost: ${format(this.cost)} IP` : `${format(this.cost)} IP`;
      }

      if (this.canUnlock) {
        return "Unlock";
      }

      return `Reach ${formatPostBreak(InfinityDimension(this.tier).amRequirement)} AM`;
    },
    hasLongText() {
      return this.costDisplay.length > 25;
    },
    hardcapPurchases() {
      return format(this.hardcap, 1, 1);
    },
    capTooltip() {
      if (this.enslavedRunning) return `Nameless prevents the purchase of more than ${format(10)} Infinity Dimensions`;
      if (this.isCapped) return `Cap reached at ${format(this.capIP)} IP`;
      return `Purchased ${quantifyInt("time", this.purchases)}`;
    },
    showRow() {
      return this.eternityReached || this.isUnlocked || this.canUnlock || this.amount.gt(0) ||
        this.hasPrevTier;
    },
    showCostTitle() {
      return this.cost.exponent < 1e5;
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.infinityDimension(this.tier).isActive = newValue;
    }
  },
  created() {
    this.on$(GAME_EVENT.NAME_CHANGED, () => this.$recompute("name"));
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = InfinityDimension(tier);
      this.hasPrevTier = tier === 1 || InfinityDimension(tier - 1).isUnlocked;
      const autobuyer = Autobuyer.infinityDimension(tier);
      this.isUnlocked = dimension.isUnlocked;
      this.canUnlock = dimension.canUnlock;
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount = dimension.baseAmount;
      this.purchases = dimension.purchases;
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.isAutobuyerUnlocked = autobuyer.isUnlocked;
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isCapped = dimension.isCapped;
      if (this.isCapped) {
        this.capIP.copyFrom(dimension.hardcapIPAmount);
        this.hardcap = dimension.purchaseCap;
      }
      this.isEC8Running = EternityChallenge(8).isRunning;
      this.isAutobuyerOn = autobuyer.isActive;
      this.eternityReached = PlayerProgress.eternityUnlocked();
      this.enslavedRunning = Enslaved.isRunning;
      if (tier > 8-Laitela.difficultyTier) {
        this.isDestabilized = Laitela.isRunning ? true : false
      }
    },
    buySingleInfinityDimension() {
      InfinityDimension(this.tier).buySingle(true);
    },
    buyMaxInfinityDimension() {
      InfinityDimension(this.tier).buyMax(false, true);
    },
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row c-infinity-dim-row l-dimension-single-row "
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !canUnlock,'c-dim-row--unstable': isDestabilized  }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="!isDestabilized?formatX(multiplier, 2, 1) : 'Destabilized'"
      :amount-text="format(amount, 2)"
      :amount-font="!isInaccessible(amount)"
      :amount-value="amount"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container">
      <PrimaryButton
        :enabled="isAvailableForPurchase || (!isUnlocked && canUnlock)"
        class="o-primary-btn--buy-id o-primary-btn--buy-dim c-dim-tooltip-container"
        :class="{ 'l-dim-row-small-text': hasLongText, 'o-primary-btn--infcapped': isCapped&&!enslavedRunning }"
        @click="buySingleInfinityDimension"
      >
        {{ costDisplay }}
        <div class="c-dim-purchase-count-tooltip">
          {{ capTooltip }}
        </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked && !isEC8Running"
        v-model="isAutobuyerOn"
        class="o-primary-btn--id-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && isUnlocked"
        class="o-primary-btn--id-auto"
        @click="buyMaxInfinityDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>
