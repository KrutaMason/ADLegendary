<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import wordShift from "@/core/word-shift";
export default {
  name: "ArmageddonModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      remnantsGain: 0,
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
      doomtext:undefined,
    };
  },
  computed: {
    topLabel() {
      if (!this.isDoomed) return `You are about to ${this.doomtext[0]}`;
      return `You are about to perform an Armageddon reset`;
    },
    message() {
      const isFirstReset = (Currency.remnants.eq(0))
        ? `which will produce ${format(this.nextRealityShardGain, 2, 2)} Reality Shards/s`
        : `which will increase your Reality Shards gain from ${format(this.realityShardGain, 2, 2)}/s
          to ${format(this.nextRealityShardGain, 2, 2)}/s`;

      return `Armageddon will start a new Doomed Reality. You will gain
      ${quantify("Remnant", this.remnantsGain, 2, 0)} ${isFirstReset}`;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.remnantsGain = Pelle.remnantsGain;
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
      this.doomtext = [
      Date.now() % 4000 > 750 ? "Doom your Reality" : wordShift.randomCrossWords("Doom your Reality"),
      Date.now() % 5000 > 500 ? "Are you sure you want to do this?" : "You are sure you want to do this!",
      Date.now() % 5555 > 222 ? "reset" : "SAVE"
    ]
    },
    handleYesClick() {
      if (!this.isDoomed) return initializeDoom();
      return Pelle.initializeRun()
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="isDoomed ? 'armageddon' : undefined"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isDoomed"
      class="c-modal-message__text"
    >
      Dooming your Reality will {{ doomtext[2] }} everything except Challenge records, Celestial progress and anything under
      the General and Reality header on the Statistics tab. You will not gain any rewards from your progress
      in your current Reality. Dooming your Reality will also purge most of your unprotected Glyphs and disable
      certain game mechanics.
      <br>
      <br>
      {{ doomtext[1] }}
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
