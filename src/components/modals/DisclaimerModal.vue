<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "DisclaimerModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperChoice,
    SliderComponent
  },
  data() {
    return {
      volume: 0,
      mature:false,
    }
  },
  computed: {
    listEntries() {
      return [
        `This mod is intended for mature audiences. This means the mod has contents that may not be 
        suitable for younger audiences`,
        `The mod now has various sound effects which may be tiresome after a long time.`,
        `This modal shows up every time you open this game, which can be turned off in 
        "Open Confirmation Options" button in the Gameplay Options tab. The disclaimer also shows up 
        when you import a save from the vanilla version.`
      ];
    },
    sliderProps() {
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
    mature(newValue) {
    player.options.mature = newValue;
    },
  },
  methods: {
    update() {
    const options = player.options;
    this.volume = options.audio.volume;
    this.mature = options.mature;
    },
    adjustSliderVolume(value) {
      this.volume = value;
      player.options.audio.volume = this.volume;
    },
  },
};
</script>

<template>
  <ModalWrapperChoice>
    <template #header>
     Mod Disclaimer
    </template>
    <div class="c-modal-message__text">
      Antimatter Dimensions: Legendary introduces new things which may impact your visual gameplay.
      <br>
      <br>
      <div class="c-visual-change-list">
        <div
          v-for="(entry, i) in listEntries"
          :key="i"
          class="c-visual-change-list-entry"
        >
          <b>&bull;</b>
          {{ entry }}
        </div>
      </div>
      <br>
      <br>
      You can toggle the visibility of the mature contents in the Visuals Options tab and 
      change the volume in the Gameplay Options tab. <br>
      Would you like to change these 2 options now?
    </div>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-model="mature"
        class="o-primary-btn o-primary-btn--option-wide"
        text="Mature Content:"
      />
      <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
      <b>Volume: {{ formatPercents(parseFloat(volume)) }}</b>
        <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderProps"
        :value="volume"
        @input="adjustSliderVolume($event)"
        />
      </div>
    </div>
    <template #cancel-text />
    <template #confirm-text />
  </ModalWrapperChoice>
</template>

<style scoped>
.c-visual-change-list {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}

.c-visual-change-list-entry {
  display: flex;
  margin-bottom: 0.5rem;
  gap: 1rem;
}
</style>
