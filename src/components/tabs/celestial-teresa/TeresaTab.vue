<script>
import { DC } from "@/core/constants";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PerkShopUpgradeButton from "./PerkShopUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";
import PseudoChargeButton from "@/components/PseudoChargeButton";

export default {
  name: "TeresaTab",
  components: {
    GlyphSetPreview,
    PerkShopUpgradeButton,
    CelestialQuoteHistory,
    CustomizeableTooltip,
    PrimaryButton,
    PseudoChargeButton
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      pouredAmount: 0,
      isPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: "",
      possibleFillPercentage: "",
      rmMult: 0,
      bestAM: new Decimal(0),
      bestAMSet: [],
      lastMachines: new Decimal(0),
      runReward: 0,
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasPerkShop: false,
      raisedPerkShop: false,
      isRunning: false,
      canUnlockNextPour: false,
      newname: undefined,
      chargeUnlocked: false,
      autoswitch:false,
      totalCharges: 0,
      chargesUsed: 0,
      disCharge: false,
      labelmode:false,
    };
  },
  computed: {
    grid() {
      return [
        [
          InfinityUpgrade.dim18mult,
          InfinityUpgrade.dim27mult,
          InfinityUpgrade.dim36mult,
          InfinityUpgrade.dim45mult
        ],
        [
          InfinityUpgrade.buy10Mult,
          InfinityUpgrade.resetBoost,
          InfinityUpgrade.galaxyBoost,
          InfinityUpgrade.dimboostMult
        ],
        [
          InfinityUpgrade.totalTimeMult,
          InfinityUpgrade.thisInfinityTimeMult,
          InfinityUpgrade.unspentIPMult,
          InfinityUpgrade.ipGen
        ],
        [
          InfinityUpgrade.skipReset1,
          InfinityUpgrade.skipReset2,
          InfinityUpgrade.skipReset3,
          InfinityUpgrade.skipResetGalaxy
        ]
      ];
    },
    unlockInfos: () => TeresaUnlocks.all,
    pouredAmountCap: () => Teresa.pouredAmountCap,
    showRunReward() {
      return this.bestAM.gt(1);
    },
    upgrades() {
      const upgrades = [
        PerkShopUpgrade.glyphLevel,
        PerkShopUpgrade.rmMult,
        PerkShopUpgrade.bulkDilation,
        PerkShopUpgrade.autoSpeed,
        PerkShopUpgrade.musicGlyph,
      ];
      if (this.raisedPerkShop) upgrades.push(PerkShopUpgrade.fillMusicGlyph);
      return upgrades;
    },
    runButtonClassObject() {
      return {
        "c-teresa-run-button__icon": true,
        "c-teresa-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    pourButtonClassObject() {
      return {
        "o-teresa-shop-button": true,
        "c-teresa-pour": true,
        "o-teresa-shop-button--available": !this.isPouredAmountCapped,
        "o-teresa-shop-button--capped": this.isPouredAmountCapped,
        "c-teresa-pour--unlock-available": this.canUnlockNextPour,
        "c-disabled-pour": this.isPouredAmountCapped
      };
    },
    pourText() {
      return this.isPouredAmountCapped ? "Filled" : "Pour RM";
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[0].effects();
    },
    lastMachinesString() {
      return this.lastMachines.lt(DC.E10000)
        ? `${quantify("Reality Machine", this.lastMachines, 2)}`
        : `${quantify("Imaginary Machine", this.lastMachines.dividedBy(DC.E10000), 2)}`;
    },
    isDoomed: () => Pelle.isDoomed,
    disChargeClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--charged-respec-active": this.disCharge
      };
    },
  },
  watch: {
    disCharge(newValue) {
      player.celestials.ra.disCharge = newValue;
    }
  },
  methods: {
    update() {
      const now = new Date().getTime();
      if (this.pour) {
        const diff = (now - this.time) / 1000;
        Teresa.pourRM(diff);
      } else {
        Teresa.timePoured = 0;
      }
      this.time = now;
      this.pouredAmount = player.celestials.teresa.pouredAmount;
      this.isPouredAmountCapped = this.pouredAmount === this.pouredAmountCap;
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`;
      this.rmMult = Teresa.rmMultiplier;
      this.hasReality = TeresaUnlocks.run.isUnlocked;
      this.hasEPGen = TeresaUnlocks.epGen.isUnlocked;
      this.hasPerkShop = TeresaUnlocks.shop.isUnlocked;
      this.raisedPerkShop = Ra.unlocks.perkShopIncrease.canBeApplied;
      this.bestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.bestAMSet = Glyphs.copyForRecords(player.celestials.teresa.bestAMSet);
      this.lastMachines.copyFrom(player.celestials.teresa.lastRepeatedMachines);
      this.runReward = Teresa.runRewardMultiplier;
      this.perkPoints = Currency.perkPoints.value;
      this.rm.copyFrom(Currency.realityMachines);
      this.isRunning = Teresa.isRunning;
      this.canUnlockNextPour = TeresaUnlocks.all
        .filter(unlock => this.rm.plus(this.pouredAmount).gte(unlock.price) && !unlock.isUnlocked).length > 0;
      this.newname = Teresa.RealityName,
      this.chargeUnlocked = Ra.unlocks.chargedInfinityUpgrades.canBeApplied && !Pelle.isDoomed;
      this.totalCharges = Ra.totalCharges;
      this.chargesUsed = Ra.totalCharges - Ra.chargesLeft;
      this.disCharge = player.celestials.ra.disCharge;
      this.autoswitch = player.options.automaticTabSwitching;
      this.labelmode = !player.options.naming.celestial
    },
    clickHandler() {
    Tab.infinity.upgrades.show();
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Teresa's", number: 0, celestial: Teresa });
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = TeresaUnlocks[Teresa.lastUnlock].price;
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice);
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-teresa-unlock-description": true,
        "c-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    },
    unlockInfoTooltipArrowStyle(unlockInfo) {
      if (this.hasUnlock(unlockInfo)) return {
        borderRight: "0.5rem solid #8d8dff"
      }
      else return {
        borderRight: "0.5rem solid var(--color-teresa--base)"
      };
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="teresa" />
    <div>
      You have {{ quantify("Reality Machine", rm, 2, 2) }}.
    </div>
    <div class="l-mechanics-container">
      <div style="display: flex;flex-direction: column;justify-content: center;"
        v-if="hasReality"
        class="l-teresa-mechanic-container"
      >
        <div class="c-teresa-run-button c-teresa-container">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            {{`${labelmode?"Start Teresa's Reality":"Enter Teresa's "+newname}.`}}
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun()"
          >
            Ϟ
          </div>
          {{ runDescription }}
          <br><br>
          <div>
            This Reality can be repeated for a stronger reward based on the antimatter gained within it.
            <br><br>
            <span v-if="showRunReward">
              Your record antimatter in {{`${labelmode?"Teresa's Reality":newname}`}} is {{ format(bestAM, 2) }},
              achieved with {{ lastMachinesString }}.
              <br><br>
              Glyph Set used:
              <GlyphSetPreview
                text="Teresa's Best Glyph Set"
                :text-hidden="true"
                :force-name-color="false"
                :glyphs="bestAMSet"
                :needsCrates="2"
                marginsize="0.2rem 0.4rem"
              />
            </span>
            <span v-else>
              You have not completed {{`${labelmode?"Teresa's Reality":"the "+newname}`}} yet.
            </span>
          </div>
        </div>
        <div
          v-if="showRunReward"
          class="c-teresa-unlock"
        >
        {{`${labelmode?"Teresa's Reality":newname}`}} reward: <br> Glyph Sacrifice power {{ formatX(runReward, 2, 2) }}
        </div>
        <div
          v-if="hasEPGen"
          class="c-teresa-unlock"
        >
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            Every second, you gain {{ formatPercents(0.01) }} of your peaked Eternity Points per minute this Reality.
          </span>
        </div>
      </div>
      <div class="l-container-container c-teresa-container">
        <button
          :class="pourButtonClassObject"
          @mousedown="pour = true"
          @touchstart="pour = true"
          @mouseup="pour = false"
          @touchend="pour = false"
          @mouseleave="pour = false"
        >
          {{ pourText }}
        </button>
      <div class="l-rm-container l-teresa-mechanic-container">
        <div class="c-rm-store">
          <div
            class="c-rm-store-inner c-rm-store-inner--light"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            class="c-rm-store-inner"
            :style="{ height: percentage}"
          >
          </div>
          <CustomizeableTooltip
            v-for="unlockInfo in unlockInfos"
            :key="unlockInfo.id"
            content-class="c-teresa-unlock-description--hover-area"
            :bottom="unlockDescriptionHeight(unlockInfo)"
            right="0"
            mode="right"
            :show="true"
            :tooltip-arrow-style="unlockInfoTooltipArrowStyle(unlockInfo)"
            :tooltip-class="unlockInfoTooltipClass(unlockInfo)"
          >
            <template #mainContent>
              <div
                class="c-teresa-milestone-line"
                :class="{ 'c-teresa-milestone-line--unlocked': hasUnlock(unlockInfo) }"
              >{{ format(unlockInfo.price, 2, 2) }}</div>
            </template>
            <template #tooltipContent>
              <span :class="{ 'o-pelle-disabled': unlockInfo.pelleDisabled }">
                {{ unlockInfo.description }}
              </span>
            </template>
          </CustomizeableTooltip>
        </div>
      </div>
      <div class="c-rm-store-label">
              {{ formatX(rmMult, 2, 2) }} RM gain
              <br>
              {{ format(pouredAmount, 2, 2) }} / {{ format(pouredAmountCap, 2, 2) }}
        </div>
      <!-- v-if="pouredAmount < pouredAmountCap"
      <div class="l-rm-container-labels l-teresa-mechanic-container"/> -->        
      </div>
      <div style="display: flex;flex-direction: column;justify-content: center;">
        <div
        v-if="hasPerkShop"
        class="c-teresa-shop c-teresa-container"
      >
      <div class="c-shop-title c-teresa-shop-title">Ϟ <span style="font-family:cambria;font-size:2rem;line-height:1.2;font-weight:bold">Teresa's Perk shop</span> Ϟ</div>
        <span class="o-teresa-pp">
          You have {{ quantifyInt("Perk Point", perkPoints, 2, 0) }}.
        </span> <br>
        <div style="display:flex;flex-wrap:wrap;justify-content:center">
          <PerkShopUpgradeButton
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
        </div>
        You can now modify the appearance of your Glyphs to look like Music Glyphs.
      </div>
        <div
        v-if="chargeUnlocked"
        class="c-teresa-charger c-teresa-container"
        >
        <div class="c-subtab-option-container">
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
      >
        Respec Charged Infinity Upgrades on next Reality
      </PrimaryButton>
      <PrimaryButton
      v-if="this.autoswitch"
      class="o-primary-btn--subtab-option" 
      @click="clickHandler()"
      >
        <i class="fas fa-expand-arrows-alt"/>
      </PrimaryButton>
      </div>
          You have charged {{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }} Infinity Upgrades.
       <div class="l-pseudo-charger-grid">
        <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-pseudo-charger__column"
      >
        <PseudoChargeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
      </div>
       </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-disabled-pour {
  pointer-events: none;
}
.c-teresa-shop-title {
    /* stylelint-disable-next-line unit-allowed-list */
    min-width: 11ch;
    text-align: center;
    font-weight: bold;
    border-top: solid 1px;
    border-bottom: solid 1px;
    padding: .2rem;
    margin:0.5rem;
    border-image: linear-gradient(90deg,transparent,var(--color-teresa--base),transparent) 1;
    background: linear-gradient(90deg,transparent,#5151ec60,transparent);
}
</style>
