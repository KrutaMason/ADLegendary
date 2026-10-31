<script>
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import OptionsModalSet from "@/components/OptionsModalSet"
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "GameplayOpTab",
  components: {
    OpenModalHotkeysButton,
    OptionsButton,
    OptionsModalSet,
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
    }
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">General</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="'Toggle keyboard shortcuts for performing various actions; Check the Hotkey list for more info'"
    >
      <template #label>Hotkeys</template>
      <template #config>
        <PrimaryToggleButton
          v-model="hotkeys"
          class="o-primary-btn--optionmodal"
          label=""
          on="Enabled"
          off="Disabled"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Allow certain actions to automatically switch tabs upon performing them; e.g. entering challenges'"
    >
      <template #label>Switch tabs on some events</template>
      <template #config>
        <PrimaryToggleButton
          v-model="automaticTabSwitching"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Change the capacity of the event and error logs in the Automator'"
      :showValue="true"
      :value="automatorLogSize"
      :displayValue="formatInt(parseInt(automatorLogSize))"
      v-if="automatorUnlocked"
    >
      <template #label>Automator Log Max</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsAutomatorLogSize"
          :value="automatorLogSize"
          @input="adjustSliderValueAutomatorLogSize($event)"
        />
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section-name">Offline</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="'Toggle the ability to have the game progress while being away'"
    >
      <template #label>Offline Progress</template>
      <template #config>
        <PrimaryToggleButton
          v-model="offlineProgress"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Adjust how many ticks the offline progress should run; Higher amounts yield more accurate 
      results but requires more time to complete`"
      :showValue="true"
      :value="offlineTicks"
      :displayValue="formatInt(offlineTicks)"
    >
      <template #label>Offline Ticks</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsOfflineTicks"
          :value="offlineSlider"
          @input="adjustSliderValueOfflineTicks($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Have the game run offline while the tab is not being currently used'"
    >
      <template #label>Run suspended time as offline</template>
      <template #config>
        <PrimaryToggleButton
          v-model="hibernationCatchup"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>

<style scoped>
.l-toggle-button {
  font-size: 12px;
}
</style>
