<script>
import CostDisplay from "@/components/CostDisplay";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "DilationUpgradeButton",
  components: {
    PrimaryToggleButton,
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay,
    CustomizeableTooltip
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    isRebuyable: {
      type: Boolean,
      required: false,
      default: false
    },
    showTooltip: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isBought: false,
      isCapped: false,
      isAffordable: false,
      isAutoUnlocked: false,
      isAutobuyerOn: false,
      boughtAmount: 0,
      currentDT: new Decimal(0),
      currentDTGain: new Decimal(0),
      timeEstimate: "",
      rebuyableBoost: false,
      isHovering: false,
      hideEstimate: false,
    };
  },
  computed: {
    classObject() {
      if (this.isUseless) {
        // A lot of people did not understand the old way of handling TP mult (3) so we now permanently disable it
        // and adjust the rift formula to come up for the lack of purchasable upgrade. Therefore we mark both upgrades
        // similar to the rest of the game - as strictly disabled.
        return {
          "o-dilation-upgrade o-pelle-disabled-pointer": true,
          "o-pelle-disabled o-dilation-upgrade--useless": this.upgrade.id === 7 || this.upgrade.id === 3,
        };
      }
      return {
        "o-dilation-upgrade": true,
        "o-dilation-upgrade--rebuyable": this.isRebuyable,
        "o-dilation-upgrade--pelle": this.upgrade.id >= 11,
        "o-dilation-upgrade--available": !this.isBought && !this.isCapped && this.isAffordable,
        "o-dilation-upgrade--unavailable": !this.isBought && !this.isCapped && !this.isAffordable,
        "o-dilation-upgrade--bought": this.isBought,
        "o-dilation-upgrade--capped": this.isCapped,
      };
    },
    isUseless() {
      const tpip = this.upgrade.id === 3 || this.upgrade.id === 7;
      return Pelle.isDoomed && tpip;
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.dilationUpgrade(this.upgrade.id).isActive = newValue;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.currentDT.copyFrom(Currency.dilatedTime.value);
      this.currentDTGain.copyFrom(getDilationGainPerSecond());
      this.hideEstimate = this.isAffordable || this.isCapped || this.upgrade.isBought || this.isUseless;
      this.timeEstimate = this.hideEstimate ? null : getDilationTimeEstimate(this.upgrade.cost);
      if (this.isRebuyable) {
        this.isAffordable = upgrade.isAffordable;
        this.isCapped = upgrade.isCapped;
        const autobuyer = Autobuyer.dilationUpgrade(upgrade.id);
        this.boughtAmount = upgrade.boughtAmount;
        if (!autobuyer) return;
        this.isAutoUnlocked = autobuyer.isUnlocked;
        this.isAutobuyerOn = autobuyer.isActive;
        return;
      }
      this.isBought = upgrade.isBought;
      if (!this.isBought) {
        this.isAffordable = upgrade.isAffordable;
      }
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :ach-tooltip="timeEstimate"
      :class="classObject"
      @click="isRebuyable ? upgrade.purchase(undefined,'true') : upgrade.purchase(true)"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <CustomizeableTooltip
        v-if="timeEstimate"
        :show="showTooltip && !isHovering && !hideEstimate"
        left="50%"
        top="0"
      >
        <template #tooltipContent>
          {{ timeEstimate }}
        </template>
      </CustomizeableTooltip>
      <span>
        <DescriptionDisplay
          :config="upgrade.config"
          :length="70"
          name="o-dilation-upgrade__description"
        />
        <EffectDisplay
          :key="boughtAmount"
          br
          :config="upgrade.config"
        />
      </span>
      <CostDisplay
        v-if="!isBought && !isCapped"
        br
        :config="upgrade.config"
        name="Dilated Time"
      />
    </button>
    <PrimaryToggleButton
      v-if="isRebuyable && isAutoUnlocked"
      v-model="isAutobuyerOn"
      label="Auto:"
      class="l--spoon-btn-group__little-spoon o-primary-btn--dilation-upgrade-toggle"
    />
  </div>
</template>

<style scoped>
.o-dilation-upgrade {
  width: 19rem;
  height: 9rem;
  font-family: Typewriter, serif;
  font-size: 1rem;
  background: url(../../../../public/images/time-studies/ts-dilation.png), linear-gradient(var(--bg-bright),var(--bg-dark));
  border: 0.1rem solid;
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
  border: 0.1rem solid var(--border);
  box-shadow: 0px 0px 1rem #000000 inset,var(--border) inset 0px 0px 0px 2px;
  text-shadow: -0.1rem -0.1rem 0.3rem black,0.1rem 0.1rem 0.3rem black;
  --bg-dark: #0c0b0f;
  --bg-bright: #2b2f3b;
  background-position: center;
}

.o-dilation-upgrade--available {
  --color: transparent;
  color: var(--color-dilation);
  --border: var(--color-dilation);
  animation: a-dilation-btn-glow 10s infinite;
  cursor: pointer;
}

.o-dilation-upgrade--rebuyable.o-dilation-upgrade--available {
  color: #64ddad;
  --border: #64ddad;
}

.o-dilation-upgrade--pelle.o-dilation-upgrade--available {
  color: var(--color-pelle--secondary);
  --border:  var(--color-pelle--secondary);
}
.t-hex .o-dilation-upgrade--rebuyable.o-dilation-upgrade--available {
  color: #ddc764;
  --border: #ddc164;
  border-color: #ddc164;
}
.o-dilation-upgrade--available:hover {
  --bg-dark: #477e09;
  color:white;
}
.o-dilation-upgrade--rebuyable.o-dilation-upgrade--available:hover {
  --bg-dark: #097e65;
  color:white;
}
.o-dilation-upgrade--pelle.o-dilation-upgrade--available:hover {
  --bg-dark: #096c7e;
  color:white;
}
.t-hex .o-dilation-upgrade--available:hover {
  --bg-dark: #7e4b09;
  color:white;
}
.t-hex .o-dilation-upgrade--rebuyable.o-dilation-upgrade--available:hover {
  --bg-dark: #7e5909;
  color:white;
}

.o-dilation-upgrade--bought,
.o-dilation-upgrade--capped {
  color: #dfffab;
  --border:#9dff00;
  --bg-bright: #477e09;
  --bg-dark: #2c4603;
}

.t-hex .o-dilation-upgrade--bought,
.t-hex .o-dilation-upgrade--capped {
  color: #ffdbab;
  --border:#ffae00;
  --bg-bright: #7e4f09;
  --bg-dark: #462303;
}
.o-dilation-upgrade--useless {
  color: #f089a3;
  --border: #bb3c5c;
  --bg-bright: #341213;
  --bg-dark: #741a28;
}

.o-dilation-upgrade--unavailable {
  color: gray;
  --border: #505050;
  --bg-bright: #33382e;
  --bg-dark: #121410;
}
.t-hex .o-dilation-upgrade--unavailable {
  --bg-bright: #38332e;
  --bg-dark: #141210;
}
.o-dilation-upgrade--rebuyable.o-dilation-upgrade--unavailable {
  --bg-bright: #2e3833;
  --bg-dark: #101412;
  --border:#005a3f;
}
.o-dilation-upgrade--pelle.o-dilation-upgrade--unavailable {
  --bg-bright: #20373c;
  --bg-dark: #101314;
  --border:#003e5a;
}
.o-dilation-upgrade--rebuyable.o-dilation-upgrade--capped {
  color: #abffd8;
  --border:#00ffb3;
  --bg-bright: #097e65;
  --bg-dark: #034635;
  background-color: #64ddad;
}

.t-hex .o-dilation-upgrade--rebuyable.o-dilation-upgrade--unavailable {
  --bg-bright: #38372e;
  --bg-dark: #141310;
  --border:#5a4200;
  /*border-color: #64ddad;*/
}
.t-hex .o-dilation-upgrade--rebuyable.o-dilation-upgrade--capped {
  color: #ffebab;
  --border:#ffd900;
  --bg-bright: #7e6909;
  --bg-dark: #463a03;
}
.o-dilation-upgrade--pelle.o-dilation-upgrade--bought,
.o-dilation-upgrade--pelle.o-dilation-upgrade--capped {
  color: #ffffff;
  --border:#00bcd4;
  --bg-bright: #09767e;
  --bg-dark: #034446;
}

.o-dilation-upgrade--unavailable:hover {
  color: white;
  --bg-dark: var(--leg-bg-hover);
}

.o-dilation-upgrade__description--small-text {
  font-size: 0.95rem;
}

.s-base--metro .o-dilation-upgrade--unavailable,
.t-s1 .o-dilation-upgrade--unavailable {
  box-shadow: 0.1rem 0.1rem 0.1rem 0 black;
}

.t-dark .o-dilation-upgrade--available:hover,
.t-s6 .o-dilation-upgrade--available:hover,
.t-s10 .o-dilation-upgrade--available:hover {
  color: var(--color-dilation);
}

.t-dark .o-dilation-upgrade--rebuyable.o-dilation-upgrade--available:hover,
.t-s6 .o-dilation-upgrade--rebuyable.o-dilation-upgrade--available:hover,
.t-s10 .o-dilation-upgrade--rebuyable.o-dilation-upgrade--available:hover {
  color: #64ddad;
}

.t-s6 .o-dilation-upgrade--unavailable,
.t-s10 .o-dilation-upgrade--unavailable {
  color: gray;
}
.t-dark .o-dilation-upgrade--unavailable:hover,
.t-s6 .o-dilation-upgrade--unavailable:hover,
.t-s10 .o-dilation-upgrade--unavailable:hover {
  --border: var(--color-bad);
}

.t-s4 .o-dilation-upgrade--available {
  animation: a-dilation-btn-glow--cancer 10s infinite;
}

/*.t-s6 .o-dilation-upgrade--bought,
.t-s6 .o-dilation-upgrade--capped,
.t-s10 .o-dilation-upgrade--bought,
.t-s10 .o-dilation-upgrade--capped {
  background: var(--color-dilation);
}*/
</style>
