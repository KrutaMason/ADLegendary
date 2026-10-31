<script>
import OptionsModalSet from "@/components/OptionsModalSet";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "AudioOpTab",
  components: {
    OptionsModalSet,
    SliderComponent
  },
  data() {
    return {
      volume: 0,
      softreset: 0,
      notify: 0,
      infinity: 0,
      eternity: 0,
      reality: 0,
      infinityUnlocked: false,
      eternityUnlocked: false,
      realityUnlocked: false,
    };
  },
  computed: {
    sliderPropsMaster() {
      return {
        min: 0,
        max: 2,
        interval: 0.01,
        width: "100%",
        tooltip: false
      }
    },
    sliderPropsRegular() {
      return {
        min: 0,
        max: 1,
        interval: 0.01,
        width: "100%",
        tooltip: false
      }
    },
  },
  watch: {
    volume(newValue) {
      player.options.audio.volume = newValue;
    },
    softreset(newValue) {
      player.options.audio.softreset = newValue;
    },
    notify(newValue) {
      player.options.audio.notify = newValue;
    },
    infinity(newValue) {
      player.options.audio.infinity = newValue;
    },
    eternity(newValue) {
      player.options.audio.eternity = newValue;
    },
    reality(newValue) {
      player.options.audio.reality = newValue;
    },
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.infinityUnlocked = this.fullCompletion || progress.isInfinityUnlocked;
      this.eternityUnlocked = this.fullCompletion || progress.isEternityUnlocked;
      this.realityUnlocked = this.fullCompletion || progress.isRealityUnlocked;

      const options = player.options.audio;
      this.volume = options.volume;
      this.softreset = options.softreset;
      this.notify = options.notify;
      this.infinity = options.infinity;
      this.eternity = options.eternity;
      this.reality = options.reality;
    },
    adjustVolume(value, type) {
      this[type] = value;
      player.options.audio[type] = this[type];
    },
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">Volumes</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :showValue="true"
      :value="volume * 100"
      :displayValue="formatPercents(parseFloat(volume))"
      :tooltip="'Control the overall volume of the game'"
    >
      <template #label>Master Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsMaster"
          :value="volume"
          @input="adjustVolume($event, 'volume')"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :showValue="true"
      :value="notify * 100"
      :displayValue="formatPercents(parseFloat(notify))"
      :tooltip="'Control the volume of notification sounds'"
    >
      <template #label>Notification Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRegular"
          :value="notify"
          @input="adjustVolume($event, 'notify')"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :showValue="true"
      :value="softreset * 100"
      :displayValue="formatPercents(parseFloat(softreset))"
      :tooltip="'Control the volume of Dimension Boosts and Galaxies'"
    >
      <template #label>Soft Reset Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRegular"
          :value="softreset"
          @input="adjustVolume($event, 'softreset')"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :showValue="true"
      :value="infinity * 100"
      :displayValue="formatPercents(parseFloat(infinity))"
      :tooltip="'Control the volume of Infinity resets'"
      v-if="infinityUnlocked"
    >
      <template #label>Infinity Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRegular"
          :value="infinity"
          @input="adjustVolume($event, 'infinity')"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :showValue="true"
      :value="eternity * 100"
      :displayValue="formatPercents(parseFloat(eternity))"
      :tooltip="'Control the volume of Eternity resets'"
      v-if="eternityUnlocked"
    >
      <template #label>Eternity Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRegular"
          :value="eternity"
          @input="adjustVolume($event, 'eternity')"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :showValue="true"
      :value="reality * 100"
      :displayValue="formatPercents(parseFloat(reality))"
      :tooltip="'Control the volume of Reality resets'"
      v-if="realityUnlocked"
    >
      <template #label>Reality Volume</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRegular"
          :value="reality"
          @input="adjustVolume($event, 'reality')"
        />
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>
