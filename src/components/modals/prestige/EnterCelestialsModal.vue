<script>
import EnterCelestialsRaPet from "@/components/modals/prestige/EnterCelestialsRaPet";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import { Ra } from "../../../core/globals";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    celestial: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
      laitelaTier: 0,
      labelmode:false,
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.labelmode ? this.name+" Reality" : this.name+" "+this.celestial.RealityName}`;
    },
    message() {
      return `Perform a Reality reset and enter ${this.labelmode ? this.name+" Reality" : this.name+" "+this.celestial.RealityName}, in which:`;
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? `You have not unlocked the reward for Teresa's Reality yet. Unlocking the reward requires
              purchasing the Reality study and completing the Reality for the first time.`
            : `Your highest Teresa completion was for ${format(this.teresaBestAM, 2, 2)} antimatter,
              gaining you a ${formatX(this.teresaRunMult, 2)} multiplier to Glyph Sacrifice power.`;
        case 1: return this.effarigDone
          ? "Effarig is completed!"
          : `You are currently on the ${this.effarigLayer} Layer.`;
        case 2: return this.enslavedDone
          ? "Have... we... not helped enough..."
          : "We... can help... Let us... help...";
        case 3: return "";
        case 4: return `Within ${this.labelmode?"Ra's Reality":"the "+Ra.RealityName}, some resources will generate Memory Chunks
          for Celestial Memories based on their amounts:`;
        case 5: return this.laitelaTier >= 8?"Lai'tela is fully destabilized." : this.laitelaFastest >= 300
          ? "You have not completed Lai'tela at this tier."
          : `Your fastest completion on this tier is ${this.laitelaTime}.`;
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "Infinity", "Eternity", "Reality"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
      this.laitelaTier = Laitela.difficultyTier
      this.labelmode =  !player.options.naming.celestial
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      AudioManagement.playSound("reset_reality-enter")
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br>
      <br>
      <div class="c-modal-celestial__run-effects">
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      Begin
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-celestial__run-effects {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}
.c-modal-celestial__run-effects__line {
  display: flex;
  margin-bottom: 0.5rem;
}

.reality-description {
  padding: 0 2rem;
}
</style>