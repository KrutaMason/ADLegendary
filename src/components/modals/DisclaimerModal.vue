<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import OptionsButton from "@/components/OptionsButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "DisclaimerModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperChoice,
    OptionsButton,
    SliderComponent
  },
  data() {
    return {
      volume: 0,
      mature: false,
      originalTab: undefined,
      originalSwitchState: undefined,
    }
  },
  computed: {
    sliderPropsVolume() {
      return {
        min: 0,
        max: 2,
        interval: 0.01,
        width: "100%",
        tooltip: false
      };
    },
    listEntries() {
      return [
        `Legendary is generally intended for mature audiences. As with the original AD, this contains violence, 
        nihilism, annihilation and the destruction of self. The mod extends this to graphic content, which can 
        be hidden in the Visual options tab. What is considered mature content is explained further in the Mod 
        Overview entry in the How To Play modal.`,
        `This mod adds sound effects to the game. For those who prefer playing muted, use the slider below to set the 
        master volume to ${formatPercents(0)}. Sounds are adjustable in the Gameplay Options tab.`,
        `The mod features a new layout for general options UI which replaces the tabs with a modal. The new options 
        modal can be accessed under the How To Play and Information buttons. You can still choose to use the old options 
        tabs without having to interact with the new modal.`,
        `There are several minor balance changes throughout the game. A mode where you can play with the original 
        balancing is planned for future updates. The list of changes is located in the Mod Overview entry.`,
        `This modal also shows up when you import a save from the original versions.`,
      ];
    },
    OptionsUILabel() {
      return this.$viewModel.newOptionsUI ? "Modal" : "Tabs";
    },
  },
  created(){
    this.originalTab = Tabs.current.key;
    this.originalSwitchState = player.options.automaticTabSwitching;
  },
  watch: {
    mature(newValue) {
      player.options.mature = newValue;
    },
    volume(newValue) {
      player.options.audio.volume = newValue;
    },
  },
  methods: {
    update() {
      this.mature = player.options.mature;
      this.volume = player.options.audio.volume;
    },
    adjustSliderValue(value) {
      this.volume = value;
      player.options.audio.volume = this.volume;
    },
    optionsUI() {
      GameOptions.toggleOptionsUI(true);
      // The code below forces the game to switch tabs without having to close the modal.
      // This should only apply if the player was originally in the options tab.
      if (this.originalTab == "options") {
        if (!player.options.automaticTabSwitching) {
          player.options.automaticTabSwitching = !player.options.automaticTabSwitching
        };
        if (ui.view.newOptionsUI) {
          Tab.dimensions.antimatter.show(false)
        }
        else Tab[this.originalTab].show(false);
        if (player.options.automaticTabSwitching != this.originalSwitchState) {
          player.options.automaticTabSwitching = !player.options.automaticTabSwitching
        };
      }
      GameStorage.save();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice 
    option="disclaimerModal"
    style="--base: #00ffaa;"
  >
    <template #header>
      Welcome to Legendary!
    </template>
    <div>
      Antimatter Dimensions: Legendary introduces new things which may impact the way you play the game:
      <div class="c-visual-change-list">
        <div
          v-for="(entry, i) in listEntries"
          :key="i"
          class="c-visual-change-list-entry o-descriptionBlock"
        >
          <b>&bull;</b>
          {{ entry }}
        </div>
      </div>
      These additions can be used at any time. You can change these {{ formatInt(3) }} options here and now.
    </div>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-model="mature"
        class="o-primary-btn o-primary-btn--option-wide"
        text="Mature Content:"
      />
      <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
      <b>Master Volume: {{ formatPercents(parseFloat(volume)) }}</b>
        <SliderComponent
          class="o-primary-btn--slider__slider"
          v-bind="sliderPropsVolume"
          :value="volume"
          @input="adjustSliderValue($event)"
        />
      </div>
      <OptionsButton
        class="o-primary-btn o-primary-btn--option-wide"
        @click="optionsUI()"
      >
        Options UI: {{ OptionsUILabel }}
      </OptionsButton>
    </div>
    <template #cancel-text />
    <template #confirm-text />
  </ModalWrapperChoice>
</template>

<style scoped>
.c-visual-change-list {
  overflow-y: scroll;
  display: inline-block;
  text-align: left;
  margin: 0.5rem;
  padding: 0.5rem;
  border: var(--var-border-width, 0.4rem) double color-mix(in srgb, var(--base) 50%, transparent);
  border-radius: var(--var-border-radius, 0.4rem);
  height: 35rem;
}

.c-visual-change-list-entry {
  display: flex;
  margin-bottom: 0.5rem;
  gap: 1rem;
}
</style>
