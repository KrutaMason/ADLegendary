<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import GalaxyGeneratorPanel from "./PelleGalaxyGeneratorPanel";
import PelleBarPanel from "./PelleBarPanel";
import PelleUpgradePanel from "./PelleUpgradePanel";

export default {
  name: "PelleTab",
  components: {
    PelleBarPanel,
    PelleUpgradePanel,
    GalaxyGeneratorPanel,
    CelestialQuoteHistory
  },
  data() {
    return {
      isDoomed: false,
      canEnterPelle: false,
      completedRows: 0,
      cappedResources: 0,
      hasStrike: false,
      hasGalaxyGenerator: false
    };
  },
  computed: {
    symbol() {
      return Pelle.symbol;
    },
    totalRows() {
      return Achievements.prePelleRows.length;
    },
    totalAlchemyResources() {
      return AlchemyResources.all.length;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      if (!this.isDoomed) {
        this.completedRows = Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked));
        this.cappedResources = AlchemyResources.all.countWhere(r => r.capped);
        this.canEnterPelle = this.completedRows === this.totalRows &&
          this.cappedResources === this.totalAlchemyResources;
      }
      this.hasStrike = PelleStrikes.all.some(s => s.hasStrike);
      this.hasGalaxyGenerator = PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies > 0;
    },
    toggleBought() {
      Pelle.cel.showBought = !Pelle.cel.showBought;
      this.$recompute("upgrades");
    },
    showModal() {
      Modal.pelleEffects.show();
    },
    enterDoomModal() {
      Modal.armageddon.show();
    }
  }
};
</script>

<template>
  <div class="l-pelle-celestial-tab">
    <div
      v-if="isDoomed"
      class="l-pelle-all-content-container"
    >
      <CelestialQuoteHistory celestial="pelle" />
      <div class="button-container">
        <button
          class="o-pelle-button"
          @click="showModal"
        >
          Show effects in Doomed Reality
        </button>
      </div>
      <br>
      <GalaxyGeneratorPanel v-if="hasGalaxyGenerator" />
      <PelleBarPanel v-if="hasStrike" />
      <PelleUpgradePanel />
    </div>
    <button
      v-else-if="canEnterPelle"
      class="pelle-doom-button"
      id="pelle-button"
      @click="enterDoomModal"
    >
    <div class="pelle-title" id="pelle-title">DOOM YOUR REALITY</div>
      <div class="pelle-icon-container">
        <span class="pelle-icon">{{ symbol }}</span>
      </div>
    </button>
    <div
      v-else
      class="pelle-unlock-requirements"
    >
      You must have {{ formatInt(totalRows) }} rows of Achievements
      and all of your Glyph Alchemy Resources capped to unlock <br><b><i style="font-size: 2rem;">Pelle, Celestial of Antimatter.</i></b>
      <br>
      <br>
      {{ formatInt(completedRows) }} / {{ formatInt(totalRows) }} Achievement rows completed
      <br>
      {{ formatInt(cappedResources) }} / {{ formatInt(totalAlchemyResources) }} capped Alchemy Resources
    </div>
  </div>
</template>

<style scoped>
.l-pelle-celestial-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-pelle-all-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.o-pelle-button {
  font-family: Typewriter;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  margin-bottom: 1rem;
  padding: 1rem;
  transition-duration: 0.12s;
  cursor: pointer;
}

.o-pelle-button:hover {
  box-shadow: 0.1rem 0.1rem 0.3rem var(--color-pelle--base);
}

.o-pelle-quotes-button {
  display: flex;
  width: 7rem;
  height: 7rem;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 900;
  color: var(--color-pelle--base);
}

.pelle-unlock-requirements {
  width: 85rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: var(--color-pelle--base);
  border: var(--var-border-width, 0.1rem) solid var(--color-pelle--base);
  box-shadow: var(--var-box-shadow, 0 0 2rem black inset ,0 0 0 0.3rem var(--color-pelle--base) inset);
  background: linear-gradient(#00000040,#ed143d60), var(--leg-base);
  border-radius: var(--var-border-radius, 0.5rem);
}
.s-base--dark .pelle-unlock-requirements {
  background: url(../../../../public/images/upgrades/pelle.png),linear-gradient(#00000060,#ed143d60), var(--leg-base);
  background-position: center;
}
.pelle-doom-button {
  /*width: 20rem;*/
  align-self: center;
  font-family: Typewriter;
  color: var(--color-pelle--base);
  background: url(../../../../public/images/celestials/pelle-doom-bg.png);
  border: var(--var-border-width, 0.3rem) solid;
  border-image: url(../../../../public/images/frames/base-retro.png) 3;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  transition-duration: 0.4s;
  cursor: pointer;
}
.pelle-doom-button:hover {
  box-shadow: 0 0 2rem var(--color-pelle--base);
}
.pelle-icon-container {
  display: flex;
  width: 15rem;
  height: 15rem;
  justify-content: center;
  align-items: center;
  font-size: 10rem;
  text-shadow: 0 0 1.5rem #9b0101;
  background: black;
  background-position: center;
  border: var(--var-border-width, 0.1rem) solid var(--color-pelle--base);
  border-radius: 50%;
  box-shadow: var(--var-box-shadow, 0 0 1rem black inset,0 0 0 0.3rem inset var(--color-pelle--base),0 0 1rem #9b0101 inset,0 0 1.5rem #9b0101);
  margin: auto;
  margin-top: 3rem;
  transition-duration: 0.4s;
  position: relative;
  z-index: 1;
}

.pelle-icon-container::before {
  content: '';
  display: block;
  position: absolute;
  background: url(../../../../public/images/celestials/pelle-button-bg.png);
  transition-duration: 0.4s;
  width: 15rem;
  height: 15rem;
  animation: a-spin 10s infinite linear;
}
.pelle-doom-button:hover .pelle-icon-container::before,
.pelle-doom-button.pelle-active .pelle-icon-container::before{
  background: url(../../../../public/images/celestials/pelle-button-bg-hover.png);
}
.pelle-icon-container::after {
  content: '';
  display: block;
  position: absolute;
  background: #ff000000;
  transition-duration: 0.4s;
  width: 17rem;
  height: 17rem;
  left: -1rem;
  top: -1rem;
}
@keyframes a-spin {
100%{transform: rotate(360deg);}
}
.pelle-doom-button:hover .pelle-icon-container,
.pelle-doom-button.pelle-active .pelle-icon-container{
  color: var(--color-pelle--base);
  border-color: white;
  box-shadow: 0 0 1rem black inset,0 0 0 0.3rem inset var(--color-pelle--base),0 0 3rem var(--color-pelle--base) inset,0 0 3rem 0.5rem #9b0101;
  text-shadow: 0 0 1.5rem var(--color-pelle--base),0 0 1.5rem var(--color-pelle--base);
  color:white;
  background: black;
}

@keyframes a-roll {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
.pelle-icon {
  animation: a-roll infinite 8s linear;
  z-index: 1;
}
.pelle-doom-button.pelle-active .pelle-icon-container > .pelle-icon {
  animation: none;
}
.pelle-title{
  transition-duration: 0.4s;
  border: var(--var-border-width, 0.1rem) solid var(--color-pelle--base);
  box-shadow: 0 0 1rem black inset,0 0 0 0.2rem inset var(--color-pelle--base),0 0 1rem #9b0101 inset,0 0 0.5rem #9b0101;
  background: black;
  font-size: 2rem;
  border-radius: 2rem;
  padding: .5rem;
  width: 30rem;
  font-family: cambria;
font-weight: bold;
}
.pelle-doom-button:hover .pelle-title,
.pelle-doom-button.pelle-active .pelle-title{
  color:white;
  text-shadow: -0.2rem -0.2rem 0.5rem var(--color-pelle--base),0.2rem 0.2rem 0.5rem var(--color-pelle--base);
  box-shadow: 0 0 1rem black inset,0 0 0 0.2rem inset var(--color-pelle--base),0 0 1rem var(--color-pelle--base) inset,0 0 3rem #9b0101;
}
</style>
