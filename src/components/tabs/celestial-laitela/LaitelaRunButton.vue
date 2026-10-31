<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";

export default {
  name: "LaitelaRunButton",
  components: {
    GlyphSetPreview
  },
  data() {
    return {
      realityTime: 0,
      maxDimTier: 0,
      isRunning: false,
      realityReward: 1,
      singularitiesUnlocked: false,
      bestSet: [],
      tierNotCompleted: true,
    };
  },
  computed: {
    completionTime() {
      if (this.tierNotCompleted) return "Not completed at this tier";
      return `Fastest Completion: ${TimeSpan.fromSeconds(this.realityTime).toStringShort()}`;
    },
    runEffects() {
      return GameDatabase.celestials.descriptions[5].effects().split("\n");
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[5].description();
    },
    isDoomed: () => Pelle.isDoomed,
  },
  created() {
    this.on$(GAME_EVENT.NAME_CHANGED, () => this.$recompute("runEffects"));
  },
  methods: {
    update() {
      this.realityTime = player.celestials.laitela.fastestCompletion;
      this.maxDimTier = Laitela.maxAllowedDimension;
      this.realityReward = Laitela.realityReward;
      this.isRunning = Laitela.isRunning;
      this.singularitiesUnlocked = Currency.singularities.gt(0);
      this.bestSet = Glyphs.copyForRecords(player.records.bestReality.laitelaSet);
      this.tierNotCompleted = this.realityTime === 3600 || (this.realityTime === 300 && this.maxDimTier < 8);
    },
    runVerb() {
      return player.options.naming.celestial ? `Enter`: "Start"
    },
    runName(needsName, the,  altName = false) {
      let name = altName ? Laitela.dynamicRealityName : Laitela.realityName
      return Laitela.displayRealityName(needsName, the, name)
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Lai'tela's", number: 5, celestial: Laitela });
    },
    classObject() {
      return {
        "o-laitela-run-button": true,
        "o-laitela-run-button--large": !this.singularitiesUnlocked
      };
    },
    runButtonClassObject() {
      return {
        "o-laitela-run-button__icon": true,
        "o-laitela-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
  }
};
</script>

<template>
  <button :class="classObject()">
    <span 
      style="font-family: var(--var-secondary-font);font-size:1.8rem"
      :class="{ 'o-pelle-disabled': isDoomed }"
    >
      <b>
        {{ runVerb() }}
        {{ runName(...[,,], true) }}
      </b>
    </span>
    <div
      :class="runButtonClassObject()"
      @click="startRun"
    />
    <div v-if="realityReward > 1">
      <b>
        All Dark Matter multipliers are {{ formatX(realityReward, 2, 2) }} higher.
      </b>
      <span v-if="maxDimTier > 0">
        <br><br>
        {{ completionTime }}
        <br>
        <span v-if="maxDimTier <= 7">
          <b>Highest active dimension: {{ formatInt(maxDimTier) }}</b>
        </span>
        <br><br>
        Glyph Set:
        <GlyphSetPreview
          text="Fastest Destabilization Glyph Set"
          :text-hidden="true"
          :force-name-color="false"
          :glyphs="bestSet"
          :needsCrates="2"
          marginsize="0.2rem 0.4rem"
        />
      </span>
      <span v-else>
        <br>
        <b>
          You also gain an additional {{ formatX(8) }} Dark Energy.
        </b>
        <br><br>
        {{ runName(false, "The") }} has been fully destabilized and cannot have its reward further improved.
      </span>
      <br>
    </div>
    <div
      v-for="(line, lineId) in runEffects"
      :key="lineId + '-laitela-run-desc' + maxDimTier"
    >
      {{ line }} <br>
    </div>
    <br>
    <div>{{ runDescription }}</div>
  </button>
</template>