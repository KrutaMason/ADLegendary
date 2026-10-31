<script>
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "AudioOptionsModal",
  components: {
    ModalWrapperOptions,
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
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      Audio Options
    </template>
    <div class="c-modal-options__button-container">
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the overall volume of the game'"
    >
      <b>Master Volume: {{ formatPercents(parseFloat(volume)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsMaster"
        :value="volume"
        @input="adjustVolume($event, 'volume')"
      />
    </div>
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the volume of notification sounds'"
    >
      <b>Notification Volume: {{ formatPercents(parseFloat(notify)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRegular"
        :value="notify"
        @input="adjustVolume($event, 'notify')"
      />
    </div>
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the volume of Dimension Boosts and Galaxies'"
    >
      <b>Soft Reset Volume: {{ formatPercents(parseFloat(softreset)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRegular"
        :value="softreset"
        @input="adjustVolume($event, 'softreset')"
      />
    </div>
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the volume of Infinity resets'"
      v-if="infinityUnlocked"
    >
      <b>Infinity Volume: {{ formatPercents(parseFloat(infinity)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRegular"
        :value="infinity"
        @input="adjustVolume($event, 'infinity')"
      />
    </div>
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the volume of Eternity resets'"
      v-if="eternityUnlocked"
    >
      <b>Eternity Volume: {{ formatPercents(parseFloat(eternity)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRegular"
        :value="eternity"
        @input="adjustVolume($event, 'eternity')"
      />
    </div>
    <div
      class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider"
      v-tooltip="'Control the volume of Reality resets'"
      v-if="realityUnlocked"
    >
      <b>Reality Volume: {{ formatPercents(parseFloat(reality)) }}</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRegular"
        :value="reality"
        @input="adjustVolume($event, 'reality')"
      />
    </div>
    </div>
  </ModalWrapperOptions>
</template>
