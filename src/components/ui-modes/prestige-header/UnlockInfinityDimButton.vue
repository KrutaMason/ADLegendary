<script>
import FillBar from "@/components/FillBar";

export default {
  name: "UnlockInfinityDimButton",
  components: {
    FillBar
  },
  data() {
    return {
      isVisible: false,
      canUnlock: false,
      hasIPUnlock: true,
      amRequirement: new Decimal(0),
      ipRequirement: 0,
      antimatter: new Decimal(0),
      infinitypoints: new Decimal(0),
      dimensionProgress:"",
      wobbly:false,
    };
  },
  computed: {
    text() {
      const dimensionText = `a new ${this.hasIPUnlock ? "type of Dimension" : "Infinity Dimension"}.`;
      if (this.canUnlock) {
        return `Unlock ${dimensionText}`;
      }
      const amDisplay = format(this.amRequirement);
      const ipDisplay = format(this.ipRequirement);
      if (this.hasIPUnlock) {
        return `Reach ${ipDisplay} Infinity Points and ${amDisplay} antimatter to unlock ${dimensionText}`;
      }
      return `Reach ${amDisplay} antimatter to unlock ${dimensionText}`;
    },
    buttonClassObject() {
      return {
        "o-prestige-button": true,
        "o-infinity-button": true,
        "o-infinity-button--unavailable": !this.canUnlock,
        "a-wobble-multi": this.wobbly
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.break && !InfinityDimension(8).isUnlocked && !Player.canEternity &&
        !EternityMilestone.autoUnlockID.isReached;
      if (!this.isVisible) return;
      const nextDimension = InfinityDimensions.next();
      this.canUnlock = nextDimension.canUnlock;
      this.hasIPUnlock = nextDimension.hasIPUnlock;
      this.amRequirement = nextDimension.amRequirement;
      this.ipRequirement = nextDimension.ipRequirement;

      this.infinitypoints.copyFrom(Currency.infinityPoints);
      this.antimatter.copyFrom(Currency.antimatter);
      this.dimensionProgress = this.Progress()
      this.wobbly = player.options.animations.wobbly
    },
    tryUnlockNextInfinityDimension() {
      InfinityDimensions.unlockNext();
    },
    Progress() {
      const progress = !this.hasIPUnlock ? this.antimatter.add(1).log10() / this.amRequirement.add(1).log10() : Math.min((this.antimatter.add(1).log10() / this.amRequirement.add(1).log10())/2,0.5) + Math.min((this.infinitypoints.add(1).log10() / Math.log10(this.ipRequirement+1))/2,0.5);
      if (progress > 1 || this.canUnlock) return `100%`;
      return `${progress * 100}%`;
    },
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    @click="tryUnlockNextInfinityDimension"
  >
    {{ text }}
    <div class="o-fill-container">
        <FillBar
          class="o-fill-bar--infinity"
          :width="dimensionProgress"
        />
    </div>
  </button>
</template>

<style scoped>

</style>
