<script>
import FillBar from "@/components/FillBar";

export default {
  name: "EternityButton",
  components: {
    FillBar
  },
  data() {
    return {
      isVisible: false,
      type: EP_BUTTON_DISPLAY_TYPE.FIRST_TIME,
      gainedEP: new Decimal(0),
      currentEP: new Decimal(0),
      currentEPRate: new Decimal(0),
      peakEPRateVal: new Decimal(0),
      peakEPRate: new Decimal(0),
      currentTachyons: new Decimal(0),
      gainedTachyons: new Decimal(0),
      challengeCompletions: 0,
      gainedCompletions: 0,
      fullyCompleted: false,
      failedRestriction: undefined,
      hasMoreCompletions: false,
      nextGoalAt: new Decimal(0),
      nextGoalAtminus: new Decimal(0),
      canEternity: false,
      eternityGoal: new Decimal(0),
      hover: false,
      wobbly: false,
      headerTextColored: true,
      creditsClosed: false,
      showEPRate: false,
      isDilation: false,
      currentIP: new Decimal(0),
      CompletionWidth:"",
      BulkCompletionWidth:"",
      autobuyerWidth:"",
      autobuyer:{
        value: 0,
        nextValue:0,
        time: 0,
        nextTime:0,
        highestPrevPrestige:0,
        mode:0,
        isActive:false,
      },
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-eternity-button": !this.isDilation,
        "o-eternity-button--dilation": this.isDilation,
        "o-eternity-button--unavailable": !this.canEternity,
        "o-pelle-disabled-pointer": this.creditsClosed,
        "a-wobble-multi": this.wobbly
      };
    },
    // Show EP/min below this threshold, color the EP number above it (1e40 is roughly when TS181 is attainable)
    rateThreshold: () => 1e40,
    amountStyle() {
      if (!this.headerTextColored || this.currentEP.lt(this.rateThreshold)) return {
        "transition-duration": "0s"
      };
      if (this.hover) return {
        //color: "black",
        "transition-duration": "0.2s"
      };

      // Dynamically generate red-text-green based on the CSS entry for text color, returning a raw 6-digit hex color
      // code. stepRGB is an array specifying the three RGB codes, which are then interpolated between in order to
      // generate the final color; only ratios between 0.9-1.1 give a color gradient
      const textHexCode = getComputedStyle(document.body).getPropertyValue("--color-text").split("#")[1];
      const stepRGB = [
        [255, 0, 0],
        [
          parseInt(textHexCode.substring(0, 2), 16),
          parseInt(textHexCode.substring(2, 4), 16),
          parseInt(textHexCode.substring(4), 16)
        ],
        [0, 255, 0]
      ];
      const ratio = this.gainedEP.log10() / this.currentEP.log10();
      const interFn = index => {
        if (ratio < 0.9) return stepRGB[0][index];
        if (ratio < 1) {
          const r = 10 * (ratio - 0.9);
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio < 1.1) {
          const r = 10 * (ratio - 1);
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        color: `rgb(${rgb.join(",")})`,
        "transition-duration": "0.2s"
      };
    },
    tachyonAmountStyle() {
      // Hovering over the button makes all the text on the button black; this text inherits that
      // without us needing to specify a color.
      if (!this.headerTextColored || this.hover) return {
        "transition-duration": "0s"
      };
      // Note that Infinity and 0 can show up here. We have a special case for
      // this.currentTachyons being 0 because dividing a Decimal by 0 returns 0.
      let ratio;
      if (this.currentTachyons.eq(0)) {
        // In this case, make it always red or green.
        // (Is it possible to gain 0 tachyons? Probably somehow it is.)
        ratio = this.gainedTachyons.eq(0) ? 0 : Infinity;
      } else {
        ratio = this.gainedTachyons.div(this.currentTachyons).toNumber();
      }

      const rgb = [
        Math.round(Math.clampMax(1 / ratio, 1) * 255),
        Math.round(Math.clampMax(ratio, 1) * 255),
        Math.round(Math.clampMax(ratio, 1 / ratio) * 255),
      ];
      return { color: `rgb(${rgb.join(",")})` };
    }
  },
  methods: {
    update() {
      this.wobbly = player.options.animations.wobbly
      this.isVisible = Player.canEternity ||
        EternityMilestone.autoUnlockID.isReached || InfinityDimension(8).isUnlocked;
      this.isDilation = player.dilation.active;
      if (!this.isVisible) return;
      this.canEternity = Player.canEternity;
      this.eternityGoal.copyFrom(Player.eternityGoal);
      this.currentIP.copyFrom(Currency.infinityPoints);
      this.headerTextColored = player.options.headerTextColored;
      this.CompletionWidth = this.ChallengeProgress()
      this.BulkCompletionWidth = this.BulkChallengeProgress()
      if (!this.canEternity) {
        this.type = EP_BUTTON_DISPLAY_TYPE.CANNOT_ETERNITY;
        return;
      }

      if (!PlayerProgress.eternityUnlocked()) {
        this.type = EP_BUTTON_DISPLAY_TYPE.FIRST_TIME;
        return;
      }

      if (EternityChallenge.isRunning) {
        if (!Perk.studyECBulk.isBought) {
          this.type = EP_BUTTON_DISPLAY_TYPE.CHALLENGE;
          return;
        }
        this.type = EP_BUTTON_DISPLAY_TYPE.CHALLENGE_RUPG;
        this.updateChallengeWithRUPG();
        return;
      }
      const gainedEP = gainedEternityPoints();
      this.currentEP.copyFrom(Currency.eternityPoints);
      this.gainedEP.copyFrom(gainedEP);
      const hasNewContent = !PlayerProgress.realityUnlocked() &&
        Currency.eternityPoints.exponent >= 4000 &&
        !TimeStudy.reality.isBought;
      if (this.isDilation) {
        this.type = hasNewContent
          ? EP_BUTTON_DISPLAY_TYPE.DILATION_EXPLORE_NEW_CONTENT
          : EP_BUTTON_DISPLAY_TYPE.DILATION;
        this.currentTachyons.copyFrom(Currency.tachyonParticles);
        this.gainedTachyons.copyFrom(getTachyonGain(true));
        return;
      }
      this.type = hasNewContent
        ? EP_BUTTON_DISPLAY_TYPE.NORMAL_EXPLORE_NEW_CONTENT
        : EP_BUTTON_DISPLAY_TYPE.NORMAL;
      this.currentEPRate.copyFrom(gainedEP.dividedBy(
        TimeSpan.fromMilliseconds(player.records.thisEternity.realTime).totalMinutes));
      this.peakEPRateVal.copyFrom(player.records.thisEternity.bestEPminVal);
      this.peakEPRate.copyFrom(player.records.thisEternity.bestEPmin);
      this.showEPRate = this.peakEPRate.lte(this.rateThreshold);
      this.creditsClosed = GameEnd.creditsEverClosed;

      const autobuyer = Autobuyer.eternity;
      this.autobuyer.value = new Decimal(autobuyer.amount)
      this.autobuyer.time = autobuyer.time;
      this.autobuyer.nextTime = autobuyer.timeToNextTick;
      this.autobuyer.highestPrevPrestige = new Decimal(autobuyer.highestPrevPrestige);
      this.autobuyer.nextValue = new Decimal(autobuyer.highestPrevPrestige).times(autobuyer.xHighest);
      this.autobuyer.isActive = autobuyer.isActive;
      this.autobuyer.mode = autobuyer.mode;
      this.autobuyerWidth = this.AutobuyerProgress();
    },
    updateChallengeWithRUPG() {
      const ec = EternityChallenge.current;
      this.fullyCompleted = ec.isFullyCompleted;
      if (this.fullyCompleted) return;
      const status = ec.gainedCompletionStatus;
      this.gainedCompletions = status.gainedCompletions;
      this.failedRestriction = status.failedRestriction;
      this.hasMoreCompletions = status.hasMoreCompletions;
      this.nextGoalAt.copyFrom(status.nextGoalAt);
      this.nextGoalAtminus.copyFrom(status.nextGoalAtminus);
    },
    ChallengeProgress() {
      const progress = this.currentIP.add(1).log10() / this.eternityGoal.log10();
      if (progress > 1) return `${formatPercents(1)}`;
      return `${formatPercents(progress, 2, 2)}`;
    },
    BulkChallengeProgress() {
      const progress = (this.currentIP.add(1).log10()-this.nextGoalAtminus.log10()) / (this.nextGoalAt.log10()-this.nextGoalAtminus.log10());
      if (progress > 1 || this.fullyCompleted) return `${formatPercents(1)}`;
      return `${formatPercents(progress, 2, 2)}`;
    },
    AutobuyerProgress() {
      let progress = 1
      if (this.autobuyer.mode===0) progress = this.gainedEP.div(this.autobuyer.value).toNumber();
      if (this.autobuyer.mode===1) progress = ( this.autobuyer.time - this.autobuyer.nextTime ) / this.autobuyer.time;
      if (this.autobuyer.mode===2) progress = Math.max(( this.gainedEP.add(1).log10() - this.autobuyer.highestPrevPrestige.add(1).log10() ) / ( this.autobuyer.nextValue.add(1).log10() - this.autobuyer.highestPrevPrestige.add(1).log10() ),0);
      if (progress > 1) return `${formatPercents(1)}`;
      return `${formatPercents(progress, 2, 2)}`;
    },
  },
};

const EP_BUTTON_DISPLAY_TYPE = {
  CANNOT_ETERNITY: -1,
  FIRST_TIME: 0,
  NORMAL: 1,
  CHALLENGE: 2,
  DILATION: 3,
  NORMAL_EXPLORE_NEW_CONTENT: 4,
  DILATION_EXPLORE_NEW_CONTENT: 5,
  CHALLENGE_RUPG: 6
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button"
    onclick="eternityResetRequest()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
  <div style="z-index: 1;position: relative;">
    <template v-if="type >= 1">
      <div class="o-prestige-description">Go Eternal</div>
    </template>
    <!-- Cannot Eternity -->
    <template v-if="type === -1">
      Reach {{ format(eternityGoal, 2, 2) }}
      <br>
      Infinity Points
    </template>

    <!-- First time -->
    <template v-else-if="type === 0">
      Other times await... I need to become Eternal
    </template>

    <!-- Normal -->
    <template v-else-if="type === 1">
      Gain
      <span :style="amountStyle">{{ format(gainedEP, 2) }}</span>
      <span v-if="showEPRate"> EP</span>
      <span v-else><br> Eternity {{ pluralize("Point", gainedEP) }}</span>
      <br>
      <template v-if="showEPRate">
        Current: {{ format(currentEPRate, 2, 2) }} EP/min
        <br>
        Peak: {{ format(peakEPRate, 2, 2) }} EP/min at {{ format(peakEPRateVal, 2, 2) }} EP
      </template>
    </template>

    <!-- Challenge -->
    <template v-else-if="type === 2 || (type === 6 && !canEternity)">
      Other challenges await... I need to become Eternal
    </template>

    <!-- Dilation -->
    <template v-else-if="type === 3">
      Gain <span :style="tachyonAmountStyle">{{ format(gainedTachyons, 2, 1) }}</span>
      {{ pluralize("Tachyon", gainedTachyons) }}
    </template>

    <!-- New content available -->
    <template v-else-if="type === 4 || type === 5">
      <template v-if="type === 4">
        Gain <span :style="amountStyle">{{ format(gainedEP, 2, 2) }}</span> EP
      </template>
      <template v-else>
        Gain <span :style="tachyonAmountStyle">{{ format(gainedTachyons, 2, 1) }}</span> Tachyons
      </template>
      <br>
      You should explore a bit and look at new content before clicking me!
    </template>

    <!-- Challenge with multiple completions -->
    <template v-else-if="type === 6">
      Other challenges await...
      <template v-if="fullyCompleted">
        <br>
        ( Already fully completed )
      </template>
      <template v-else>
        <br>
        {{ quantifyInt("completion", gainedCompletions) }} on Eternity
        <template v-if="failedRestriction">
          <br>
          {{ failedRestriction }}
        </template>
        <template v-else-if="hasMoreCompletions">
          <br>
          Next goal at {{ format(nextGoalAt) }} IP
        </template>
      </template>
    </template></div>
    <div class="o-fill-container">
        <template v-if="type === -1">
          <FillBar
          class="o-fill-bar--eternity"
          :class="{ 'o-fill-bar--dilated': isDilation }"
          :width="CompletionWidth"
          style="position: absolute;"
          />
        </template>
        <template v-if="type === 1">
          <FillBar
          v-if="autobuyer.isActive"
          class="o-fill-bar--eternity"
          :width="autobuyerWidth"
          style="position: absolute;transition-duration:0.05s"
          />
        </template>
        <template v-if="type === 6">
          <FillBar
          class="o-fill-bar--eternity"
          :class="{ 'o-fill-bar--dilated': isDilation }"
          :width="BulkCompletionWidth"
          style="position: absolute;"
          />
        </template>
    </div>
  </button>
</template>

<style scoped>
.o-fill-bar--dilated {
  background: linear-gradient(transparent -100%,var(--color-dilation) 250%);
  box-shadow: 0 0 1rem white inset;
}
.o-prestige-button:hover>.o-fill-container>.o-fill-bar--eternity{
  background: linear-gradient(transparent -100%,var(--color-text) 300%);
}
.o-prestige-button:hover>.o-fill-container>.o-fill-bar--dilated{
  background: linear-gradient(transparent -100%,white 300%);
}
</style>
