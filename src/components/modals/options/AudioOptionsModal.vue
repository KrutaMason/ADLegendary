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
      softreset:true,
      notify:true,
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
  },
  methods: {
    update() {
    const options = player.options.audio;
    this.volume = options.volume;
    this.softreset = options.softreset;
    this.notify = options.notify;
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
      v-model="softreset"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Soft Resets:"
    />
    <ModalOptionsToggleButton
      v-model="notify"
      class="o-primary-btn o-primary-btn--option-wide"
      text="Notification:"
    />
    </div>
  </ModalWrapperOptions>
</template>
