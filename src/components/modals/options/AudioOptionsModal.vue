<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "AudioOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    PrimaryButton,
    PrimaryToggleButton,
    SliderComponent
  },
  data() {
    return {
      volume: 0,
      infinityUnlocked: false,
      eternityUnlocked: false,
      realityUnlocked: false,
      softreset:true,
      notify:true,
      infinity:true,
      eternity:true,
      reality:true,
    };
  },
  computed: {
    sliderPropsVolume() {
      return {
        min: 0,
        max: 2,
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
    adjustSliderValueVolume(value) {
      this.volume = value;
      player.options.audio.volume = this.volume;
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
      <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
    <b>Volume: {{ formatPercents(parseFloat(volume)) }}</b>
    <SliderComponent
      class="o-primary-btn--slider__slider"
      v-bind="sliderPropsVolume"
      :value="volume"
      @input="adjustSliderValueVolume($event)"
    />
  </div>
    <ModalOptionsToggleButton
      v-model="notify"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Notification:"
    />
    <ModalOptionsToggleButton
      v-model="softreset"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Soft Resets:"
    />
    <ModalOptionsToggleButton
      v-if="infinityUnlocked"
      v-model="infinity"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Infinity:"
    />
    <ModalOptionsToggleButton
      v-if="eternityUnlocked"
      v-model="eternity"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Eternity:"
    />
    <ModalOptionsToggleButton
      v-if="realityUnlocked"
      v-model="reality"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Reality:"
    />
    </div>
  </ModalWrapperOptions>
</template>
