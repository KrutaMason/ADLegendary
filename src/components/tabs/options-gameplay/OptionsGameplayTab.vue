<script>
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "OptionsGameplayTab",
  components: {
    OpenModalHotkeysButton,
    OptionsButton,
    PrimaryButton,
    PrimaryToggleButton,
    SliderComponent
  },
  data() {
    return {
      offlineProgress: false,
      hibernationCatchup: false,
      hotkeys: false,
      offlineSlider: 0,
      offlineTicks: 0,
      automaticTabSwitching: false,
      infinityUnlocked: false,
      automatorUnlocked: false,
      automatorLogSize: 0,
    };
  },
  computed: {
    sliderPropsOfflineTicks() {
      return {
        min: 22,
        max: 54,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
    sliderPropsAutomatorLogSize() {
      return {
        min: 50,
        max: 500,
        interval: 50,
        width: "100%",
        tooltip: false
      };
    }
  },
  watch: {
    offlineProgress(newValue) {
      player.options.offlineProgress = newValue;
    },
    hibernationCatchup(newValue) {
      player.options.hibernationCatchup = newValue;
    },
    hotkeys(newValue) {
      player.options.hotkeys = newValue;
    },
    offlineSlider(newValue) {
      player.options.offlineTicks = this.parseOfflineSlider(newValue);
    },
    automaticTabSwitching(newValue) {
      player.options.automaticTabSwitching = newValue;
    },
    automatorLogSize(newValue) {
      player.options.automatorEvents.maxEntries = parseInt(newValue, 10);
    },
  },
  // This puts the slider in the right spot on initialization
  created() {
    const ticks = player.options.offlineTicks;
    const exponent = Math.floor(Math.log10(ticks));
    const mantissa = (ticks / Math.pow(10, exponent)) - 1;
    this.offlineSlider = 9 * exponent + mantissa;
  },
  methods: {
    update() {
      const options = player.options;
      this.offlineProgress = options.offlineProgress;
      this.hibernationCatchup = options.hibernationCatchup;
      this.hotkeys = options.hotkeys;
      this.offlineTicks = player.options.offlineTicks;
      this.automaticTabSwitching = options.automaticTabSwitching;
      this.infinityUnlocked = PlayerProgress.current.isInfinityUnlocked;
      this.automatorUnlocked = Player.automatorUnlocked;
      this.automatorLogSize = options.automatorEvents.maxEntries;
    },
    // Given the endpoints of 22-54, this produces 500, 600, ... , 900, 1000, 2000, ... , 1e6 ticks
    // It's essentially 10^(x/10) but with the mantissa spaced linearly instead of logarithmically
    parseOfflineSlider(str) {
      const value = parseInt(str, 10);
      return (1 + value % 9) * Math.pow(10, Math.floor(value / 9));
    },
    adjustSliderValueOfflineTicks(value) {
      this.offlineSlider = value;
      player.options.offlineTicks = this.parseOfflineSlider(value);
    },
    adjustSliderValueAutomatorLogSize(value) {
      this.automatorLogSize = value;
      player.options.automatorEvents.maxEntries = this.automatorLogSize;
    },
    toggleOptionsUI() {
      GameOptions.toggleOptionsUI();
      Modal.optionsModal.show({showTab: "Gameplay"});
    }
  }
};
</script>

<template>
  <div class="l-options-tab">
    <div class="c-subtab-option-container c-subtab-option-container--border">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="toggleOptionsUI"
      >
        Use options modal
      </PrimaryButton>
    </div>
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.confirmationOptions.show()"
        >
          Open Confirmation Options
        </OptionsButton>
        <PrimaryToggleButton
          v-model="hotkeys"
          class="o-primary-btn--option l-options-grid__button"
          label="Hotkeys:"
          on="Enabled"
          off="Disabled"
          v-tooltip="'Toggle keyboard shortcuts for performing various actions; Check the Hotkey list for more info'"
        />
        <PrimaryToggleButton
          v-model="automaticTabSwitching"
          class="o-primary-btn--option l-options-grid__button l-toggle-button"
          label="Switch tabs on some events (e.g. entering challenges):"
          v-tooltip="'Allow certain actions to automatically switch tabs upon performing them'"
        />
      </div>
      <div class="l-options-grid__row">
        <PrimaryToggleButton
          v-model="offlineProgress"
          class="o-primary-btn--option l-options-grid__button"
          label="Offline progress:"
          v-tooltip="'Toggle the ability to have the game progress while being away'"
        />
        <div 
          class="o-primary-btn o-primary-btn--option o-primary-btn--slider l-options-grid__button"
          v-tooltip="`Adjust how many ticks the offline progress should run; Higher amounts yield more accurate 
          results but requires more time to complete`"
        >
          <b>Offline ticks: {{ formatInt(offlineTicks) }}</b>
          <SliderComponent
            class="o-primary-btn--slider__slider"
            v-bind="sliderPropsOfflineTicks"
            :value="offlineSlider"
            @input="adjustSliderValueOfflineTicks($event)"
          />
        </div>
        <PrimaryToggleButton
          v-model="hibernationCatchup"
          class="o-primary-btn--option l-options-grid__button"
          label="Run suspended time as offline:"
          v-tooltip="'Have the game run offline while the tab is not being currently used'"
        />
      </div>
      <div class="l-options-grid__row">
        <div
          v-if="automatorUnlocked"
          class="o-primary-btn o-primary-btn--option o-primary-btn--slider l-options-grid__button"
          v-tooltip="'Change the capacity of the event and error logs in the Automator'"
        >
          <b>Automator Log Max: {{ formatInt(parseInt(automatorLogSize)) }}</b>
          <SliderComponent
            class="o-primary-btn--slider__slider"
            v-bind="sliderPropsAutomatorLogSize"
            :value="automatorLogSize"
            @input="adjustSliderValueAutomatorLogSize($event)"
          />
        </div>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.audioOptions.show();"
        >
          Open Audio Options
        </OptionsButton>
      </div>
    </div>
    <br>
    <OpenModalHotkeysButton />
  </div>
</template>

<style scoped>
.l-toggle-button {
  font-size: 12px;
}
</style>
