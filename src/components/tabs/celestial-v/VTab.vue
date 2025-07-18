<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PrimaryButton from "@/components/PrimaryButton";
import { V_REDUCTION_MODE } from "@/core/secret-formula";
import VUnlockRequirement from "./VUnlockRequirement";

export default {
  name: "VTab",
  components: {
    CelestialQuoteHistory,
    VUnlockRequirement,
    PrimaryButton,
    GlyphSetPreview
  },
  data() {
    return {
      mainUnlock: false,
      canUnlockCelestial: false,
      totalUnlocks: 0,
      pp: 0,
      showReduction: false,
      runRecords: [],
      runGlyphs: [],
      isFlipped: false,
      wantsFlipped: true,
      isRunning: false,
      hasAlchemy: false,
      empty:false,
    };
  },
  computed: {
    mainUnlockDB: () => GameDatabase.celestials.v.mainUnlock,
    celestialUnlockClassObject() {
      return {
        "o-v-milestone": true,
        "o-v-milestone--unlocked": this.canUnlockCelestial,
        "c-v-unlock-button--enabled": this.canUnlockCelestial
      };
    },
    // If V is flipped, change the layout of the grid
    hexGrid() {
      return this.isFlipped && this.wantsFlipped
        ? [
          VRunUnlocks.all[6],
          { empty: true },
          {},
          { empty: true },
          { isRunButton: true },
          VRunUnlocks.all[7],
          VRunUnlocks.all[8],
          { empty: true },
          {},
        ]
        : [
          VRunUnlocks.all[0],
          VRunUnlocks.all[1],
          {},
          VRunUnlocks.all[5],
          { isRunButton: true },
          VRunUnlocks.all[2],
          VRunUnlocks.all[4],
          VRunUnlocks.all[3],
          {},
        ];
    },
    vUnlock: () => VUnlocks.vAchievementUnlock,
    runMilestones() {
      return [
        [
          VUnlocks.shardReduction,
          VUnlocks.adPow,
          VUnlocks.fastAutoEC
        ],
        [
          VUnlocks.autoAutoClean,
          VUnlocks.achievementBH,
          VUnlocks.raUnlock
        ],
      ];
    },
    runButtonClassObject() {
      return {
        "l-v-hexagon": true,
        "c-v-run-button": true,
        "c-v-run-button--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[3].effects().replace(/^\w/u, c => c.toUpperCase());
    },
    realityTitle() {
      return player.options.naming.celestial ? `V's ${V.RealityName}`
       : "V's Reality"
    },
    realityVerb() {
      return player.options.naming.celestial ? "Enter" : "Start"
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.mainUnlock = VUnlocks.vAchievementUnlock.isUnlocked;
      this.canUnlockCelestial = V.canUnlockCelestial;
      this.totalUnlocks = V.spaceTheorems;
      this.pp = Currency.perkPoints.value;
      this.showReduction = VUnlocks.shardReduction.isUnlocked;
      this.runRecords = Array.from(player.celestials.v.runRecords);
      this.runGlyphs = player.celestials.v.runGlyphs.map(gList => Glyphs.copyForRecords(gList));
      this.isFlipped = V.isFlipped;
      this.wantsFlipped = player.celestials.v.wantsFlipped;
      this.isRunning = V.isRunning;
      this.hasAlchemy = Ra.unlocks.unlockGlyphAlchemy.canBeApplied;
    },
    unlockCelestial() {
      if (V.canUnlockCelestial) V.unlockCelestial();
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "V's", number: 3, celestial: V });
    },
    has(info) {
      return info.isUnlocked;
    },
    mode(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION ? "reduced" : "divided";
    },
    reductionValue(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION
        ? formatInt(hex.reduction)
        : format(Decimal.pow10(hex.reduction));
    },
    showRecord(hex) {
      return this.runRecords[hex.id] > 0 || hex.completions > 0;
    },
    reduceGoals(hex) {
      if (!Currency.perkPoints.purchase(hex.reductionCost)) return;
      const steps = hex.config.reductionStepSize ? hex.config.reductionStepSize : 1;
      player.celestials.v.goalReductionSteps[hex.id] += steps;
      AudioManagement.playSound("purchase_regular")
      for (const unlock of VRunUnlocks.all) {
        unlock.tryComplete();
      }
      V.checkForUnlocks();
    },
    reductionTooltip(hex) {
      return `Spend ${quantify("Perk Point", hex.reductionCost, 2, 0)}
        to reduce goal by ${format(hex.config.perReductionStep)}`;
    },
    hexColor(hex,brightness) {
      const completions = hex.completions;
      const hard = hex.isHard;
      const maxed = hex.config.values.length;
      if (completions === maxed) return `rgb(${(hard?219:209)/brightness}, ${(hard?132:167)/brightness}, ${(hard?90:51)/brightness})`;
      const r = 255 - (hard?0:10) * completions;
      const g = 255 - (hard?20:13) * completions;
      const b = 255 - (hard?30:30) * completions;
      const l = 2-(Math.min(completions,6)/6)
      return `rgb(${r/l/brightness},${g/l/brightness},${b/l/brightness})`;
    },
    toggleFlipped() {
      player.celestials.v.wantsFlipped = !this.wantsFlipped;
    },
    createCursedGlyph() {
      Glyphs.giveCursedGlyph();
    },
  }
};
</script>

<template>
  <div class="l-v-celestial-tab">
    <CelestialQuoteHistory celestial="v" />
    <div
      v-if="!mainUnlock"
      class="c-v-info-text c-v-unlock-container"
    >
      <v-unlock-requirement
        v-for="req in mainUnlockDB"
        :key="req.name"
        :db-entry="req"
      />
      <div class="l-v-milestones-grid__row l-v-milestones-grid__row_unlock">
        <div
          :class="celestialUnlockClassObject"
          @click="unlockCelestial"
        >
          <p>{{ vUnlock.description }}</p>
          <i>{{ vUnlock.rewardText }}</i>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="isFlipped"
        class="c-v-info-text"
      >
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="toggleFlipped"
        >
          <span v-if="wantsFlipped">Hide</span>
          <span v-else>Show</span>
          Hard V
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option l-cursed-glyph-creation"
          @click="createCursedGlyph"
        >
          Create a Cursed Glyph
        </PrimaryButton>
        <br>
        Cursed Glyphs can be created here or in the Effarig tab.
        <br>
        Cursed Glyphs count as {{ formatInt(-3) }} Glyphs for the purposes of all requirements related to Glyph count.
        <br>
        <span v-if="!isDoomed">The Black Hole can now be used to slow down time if they are both permanent.</span>
        <br><br>
        Each Hard V-Achievement counts as two V-Achievements and will award {{ formatInt(2) }} Space Theorems
        instead of {{ formatInt(1) }}.
        <br>
        Goal reduction is significantly more expensive for Hard V-Achievements.
      </div>
      <div
        v-if="showReduction"
        class="c-v-info-text"
      >
        You have {{ quantify("Perk Point", pp, 2, 0) }}.
      </div>
      <div class="l-v-unlocks-container">
        <li
          v-for="(hex, hexId) in hexGrid"
          :key="hexId + '-v-hex'"
          :style="[hex.isRunButton ? {zIndex: 1} : {zIndex: 0}]"
        >
          <div
            v-if="hex.config"
            class="l-v-hexagon c-v-unlock"
            :class="{'c-v-unlock-hard':hex.isHard}"
            :style="'--bg-dark: ' + hexColor(hex,1)+';--bg-bright: '+ hexColor(hex,3)"
          >
            <br v-if="hex.canBeReduced && showReduction">
            <p class="o-v-unlock-name">
              {{ hex.config.name }}
            </p>
            <p
              class="o-v-unlock-desc"
              v-html="hex.formattedDescription"
            />
            <i
              v-if="has(runMilestones[0][0]) && hex.isReduced"
              class="o-v-unlock-goal-reduction"
            >
              Goal has been {{ mode(hex) }} by {{ reductionValue(hex) }}
          </i>
            <p class="o-v-unlock-amount">
              {{ formatInt(hex.completions) }}/{{ formatInt(hex.config.values.length) }} done
            </p>
            <div v-if="showRecord(hex)">
              <i class="o-v-unlock-record">
                Best: {{ hex.config.formatRecord(runRecords[hex.id]) }}
              </i>
              <p>
                <GlyphSetPreview
                  :glyphs="runGlyphs[hex.id]"
                  :text="hex.config.name"
                  :text-hidden="true"
                  :needsCrates="2"
                  marginsize="0.2rem 0.4rem"
                />
              </p>
                <button  v-if="hex.canBeReduced && showReduction"
                  class="o-primary-btn l-v-reduction"
                  :class="{ 'o-primary-btn--disabled': !hex.canBeReduced || pp < hex.reductionCost }"
                  :ach-tooltip="reductionTooltip(hex)"
                  @click="reduceGoals(hex)"
                >
                  <i class="fas fa-angle-double-down" />
                </button>
            </div>
          </div>
          <div
            v-else-if="hex.isRunButton"
            :class="runButtonClassObject"
            @click="startRun()"
          >
            <b
              class="o-v-start-text"
              :class="{ 'o-pelle-disabled': isDoomed }"
            >
              <span v-if="isRunning">You are in <br></span>
              <span v-else>{{ realityVerb }}</span>
              {{ realityTitle }}
            </b>
            <br>
            <div :style="{ 'font-size': hasAlchemy ? '1.05rem' : '1.2rem'}">
              {{ runDescription }}
            </div>
            <div class="c-v-run-button__line c-v-run-button__line--1" />
            <div class="c-v-run-button__line c-v-run-button__line--2" />
            <div class="c-v-run-button__line c-v-run-button__line--3" />
          </div>
          <div v-else-if="hex.empty" class="l-v-hexagon c-v-empty"></div>
          <div v-else>
            <div class="l-v-hexagon c-v-unlock l-placeholder-invisible" />
          </div>
        </li>
      </div>
      <div class="c-v-info-text">
        V-Achievements can only be completed within {{ realityTitle }}, but are permanent and do not reset upon leaving
        and re-entering the Reality.
      </div>
      <div class="c-v-info-text">
        You have {{ formatInt(totalUnlocks) }} V-Achievements done.
        <span v-if="!isDoomed">
          You gain {{ formatInt(1) }} Space Theorem for each completion,
          allowing you to purchase Time Studies which are normally locked.
          <br>
          Space Theorems can also be used as a Currency in the Automator.
        </span>
      </div>
      <br>
      <div class="l-v-milestones-grid">
        <div
          v-for="(row, rowId) in runMilestones"
          :key="rowId + '-v-ms-row'"
          class="l-v-milestones-grid__row"
        >
          <div
            v-for="(milestone, colId) in row"
            :key="colId + rowId*10 + '-v-ms'"
            class="o-v-milestone"
            :class="{'o-v-milestone--unlocked':
              has(milestone)}"
          >
            <div :class="{ 'o-pelle-disabled': isDoomed }">
              <p>{{ milestone.description }}</p>
              <p>Reward: {{ milestone.rewardText }}</p>
              <p v-if="milestone.formattedEffect">
                Currently: <b>{{ milestone.formattedEffect }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.o-v-start-text {
  font-size: 1.8rem;
  line-height: 1.1;
  font-family: cambria;
  font-weight: bold;
}

.l-placeholder-invisible {
  opacity: 0;
}

.l-v-goal-reduction-spacer {
  height: 0.8rem;
}

.l-cursed-glyph-creation {
  --bg-bright: var(--color-effarig--base) !important;
}
.l-v-milestones-grid__row_unlock{
  padding-top:1rem;
  border-top:0.1rem solid;
  border-image:linear-gradient(90deg,transparent,var(--color-text),transparent) 1
}
.l-v-milestones-grid__row_unlock .o-v-milestone{
  width: 35rem;
}
.l-v-milestones-grid__row_unlock .o-v-milestone--unlocked{
  color: var(--color-v--base);
  --bg-bright: #000000;
  --bg-dark: #5a4919;
  --border: #c9bb6b;
  box-shadow: var(--var-box-shadow, 0 0 1rem black inset, 0 0 0 0.2rem var(--border) inset, 0 0 1rem var(--border));
}
.l-v-milestones-grid__row_unlock .o-v-milestone--unlocked:hover{
    --bg-dark: #af8d2f;
}
</style>
