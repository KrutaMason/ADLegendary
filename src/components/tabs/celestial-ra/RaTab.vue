<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import RaPet from "./RaPet";
import RaPetRemembranceButton from "./RaPetRemembranceButton";
import { Ra } from "../../../core/globals";

export default {
  name: "RaTab",
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory
  },
  data() {
    return {
      memoriesPerChunk: 0,
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: "",
      isRunning: false,
      memoryBoosts: "",
    };
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => `You can Charge ${quantifyInt("Infinity Upgrade", Ra.totalCharges)}.`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter(r => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter(r => r.isUnlocked).length;
          return `You have unlocked ${quantifyInt("Alchemy Resource", resources)}.`;
        },
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () => `Stored game time
          ${formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2)} and real time
          +${formatInt(Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600))} hours`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0);
          return `You have unlocked ${quantifyInt("Triad Study", triadCount)}.`;
        },
      }
    ],
    petStyle() {
      return {
        color: (this.petWithRemembrance === "")
          ? "white"
          : this.pets.find(pet => pet.pet.name === this.petWithRemembrance).pet.color,
      };
    },
    runButtonClassObject() {
      return {
        "c-ra-run-button__icon": true,
        "c-ra-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().replace(/^\w/u, c => c.toUpperCase()).split("\n");
    },
    memoryDescription() {
      return `Within ${this.labelmode?"Ra's Reality":"the "+Ra.RealityName}, Memory Chunks for Celestial Memories
        will be generated based on certain resource amounts.`;
    },
    realityTitle() {
      return player.options.naming.celestial ? `Ra's ${Ra.RealityName}`
       : "Ra's Reality"
    },
    realityVerb() {
      return player.options.naming.celestial ? "Enter" : "Start"
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.memoriesPerChunk = Ra.productionPerMemoryChunk;
      this.isRaCapped = Ra.totalPetLevel === 100;
      this.totalLevels = Ra.totalPetLevel;
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied;
      this.hasRemembrance = Ra.remembrance.isUnlocked;
      this.remembranceReq = Ra.remembrance.requiredLevels;
      this.remembranceMult = Ra.remembrance.multiplier;
      this.remembranceNerf = Ra.remembrance.nerf;
      this.petWithRemembrance = Ra.petWithRemembrance;
      this.isRunning = Ra.isRunning;
      this.memoryBoosts = Ra.memoryBoostResources;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Ra's", number: 4 , celestial: Ra});
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
};
</script>

<template>
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        Each Memory Chunk generates a base of one Memory per second<span v-if="memoriesPerChunk > 1">,
          which has been increased to {{ quantify("Memory", memoriesPerChunk, 2, 3) }} per second</span>.
        <br>
        Storing real time prevents Memory Chunk generation, but Memories will still be gained normally.
        <span v-if="memoriesPerChunk > 1">
          <br>
          This is being increased due to {{ memoryBoosts }}.
        </span>
      </div>
      <div v-else>
        All Memories have been returned.
      </div>
    </div>
    <div>
      Mouse-over the icons below the bar to see descriptions of upgrades,
      <br>
      and mouse-over <i class="fas fa-question-circle" /> icons for specific resource information.
    </div>
    <div class="l-mechanics-container">
      <div class="l-ra-button-mechanics-container">
    <div class="c-ra-run-button">
        <h2 
        style="font-family: cambria;"
        :class="{ 'o-pelle-disabled': isDoomed }"
        >
          <span v-if="isRunning">You are in </span>
          <span v-else>{{ realityVerb }}</span>
          {{ realityTitle }}.
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </div>
    <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h2 :style="petStyle" class="c-ra-shop-title">
          <span class="fas fa-sun"/> 
          <span style="font-family: cambria;font-size: 2rem;line-height: 1.2;font-weight: bold;padding:0.5rem">Remembrance</span> 
          <span class="fas fa-sun"/>
        </h2>
        <span :style="petStyle">
          Whichever Celestial has Remembrance will get {{ formatX(remembranceMult) }} Memory Chunk gain, while the other
          Celestials will get {{ formatX(remembranceNerf, 1, 1) }} Memory Chunk gain.
        </span>
        <br v-if="hasRemembrance"><span v-if="hasRemembrance" :style="petStyle">{{ petWithRemembrance!==""?"Remembrance given to " + petWithRemembrance : "No Remembrance given" }}
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
        <br>
          Unlocked by getting {{ formatInt(remembranceReq) }} total Celestial Memory levels
          (you need {{ formatInt(remembranceReq - totalLevels) }} more)
        </div>
    </div>      
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
    />
    </div>
    </div>
  </div>
</template>
<style scoped>
.c-ra-shop-title {
    /* stylelint-disable-next-line unit-allowed-list */
    min-width: 11ch;
    text-align: center;
    font-weight: bold;
    border-top: solid 1px;
    border-bottom: solid 1px;
    width:100%;
    border-image: linear-gradient(90deg,transparent,var(--color-ra--base),transparent) 1;
    background: linear-gradient(90deg,transparent,#9575cd60,transparent);
}
.l-ra-button-mechanics-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
@media screen and (max-width: 82.5rem) {
.l-ra-button-mechanics-container{
    flex-direction: row;
}
.l-mechanics-container{
  flex-wrap: wrap;
  flex-direction: column-reverse;
  align-items: center;
}
.c-ra-run-button,.c-ra-remembrance-unlock{
  width:34.5rem;
  margin: 0.5rem;
}
}
</style>