<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import OptionsButton from "@/components/OptionsButton";
import OptionsModalSet from "@/components/OptionsModalSet";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "SavingOpTab",
  components: {
    ModalOptionsToggleButton,
    OptionsButton,
    OptionsModalSet,
    SliderComponent
  },
  data() {
    return {
      creditsClosed: false,
      saveFileName: "",
      sliderInterval: 10,
      showTimeSinceSave: false,
      canSpeedrun: false,
      inSpeedrun: false,
      creditsClosed: false,
      canModifySeed: false,
    };
  },
  computed: {
    sliderProps() {
      return {
        min: 10,
        max: 60,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
  },
  watch: {
    showTimeSinceSave(newValue) {
      player.options.showTimeSinceSave = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.saveFileName = options.saveFileName;
      this.sliderInterval = options.autosaveInterval / 1000;
      this.showTimeSinceSave = options.showTimeSinceSave;
      this.canSpeedrun = player.speedrun.isUnlocked;
      this.inSpeedrun = player.speedrun.isActive;
      this.canModifySeed = Speedrun.canModifySeed();
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleSavefileChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    },
    importAsFile(event) {
      if (event.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = function() {
        GameStorage.offlineEnabled = player.options.offlineProgress;
        GameStorage.offlineTicks = player.options.offlineTicks;
        GameStorage.import(reader.result);
      };
      reader.readAsText(event.target.files[0]);
    },
    adjustSliderValue(value) {
      this.sliderInterval = value;
      player.options.autosaveInterval = this.sliderInterval * 1000;
      GameOptions.refreshAutosaveInterval();
    },
    openSeedModal() {
      if (this.canModifySeed) {
        Modal.modifySeed.show();
      } else {
        Modal.message.show(`You cannot modify your seed any more. Glyph RNG has already been used to generate
          at least one Glyph on this run.`);
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">General</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="'Set a custom name for your save file (up to 16 alphanumeric characters, including space and hyphen)'"
    >
      <template #label>Save File Name</template>
      <template #config>
        <span class="c-custom-save-name">
          <input
            class="c-custom-save-name__input"
            type="text"
            maxlength="16"
            placeholder="Custom save name"
            :value="saveFileName"
            @change="handleSavefileChange"
          >
        </span>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Click the button to save the game now'"
    >
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.save(false, true)"
        >
          Save Manually
        </OptionsButton>
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="'Copy your save file into your clipboard or save it as a file'"
      class="l-optionmodal--option-save"
    >
      <template #label>Export Save</template>
      <template #config>
        <div class="l-optionmodal--config-save">
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.export()"
        >
          To Clipboard
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.exportAsFile()"
        >
          As File
        </OptionsButton>
        </div>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Paste a save text into the prompt or use a save file'"
      class="l-optionmodal--option-save"
    >
      <template #label>Import Save</template>
      <template #config>
        <div class="l-optionmodal--config-save">
          <OptionsButton
            class="o-primary-btn--optionmodal"
            :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
            onclick="Modal.import.show()"
          >
            From Prompt
          </OptionsButton>
          <OptionsButton
            class="o-primary-btn--optionmodal c-file-import-button"
            :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          >
            <input
              class="c-file-import"
              type="file"
              accept=".txt"
              @change="importAsFile"
            >
            <label for="file">From File</label>
          </OptionsButton>
        </div>
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="'Choose different saves from all 5 slots'"
    >
      <template #label>Save Selection</template>
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.loadGame.show()"
        >
          Open Menu
        </OptionsButton>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Open a menu of automatic backups'"
    >
      <template #label>Automatic Backup Saves</template>
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.backupWindows.show()"
        >
          Open Menu
        </OptionsButton>
      </template>
    </OptionsModalSet>   
    </div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="`Adjust the length of the automatic saving interval`"
      :showValue="true"
      :value="sliderInterval"
      :displayValue="`${formatInt(sliderInterval)}s`"
    >
      <template #label>Autosave interval</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderProps"
          :value="sliderInterval"
          @input="adjustSliderValue($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Display a timer since your last save on the bottom left of the screen'"
    >
      <template #label>Display time since save</template>
      <template #config>
        <ModalOptionsToggleButton
          v-model="showTimeSinceSave"
          class="o-primary-btn o-primary-btn--optionmodal"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Perform a hard reset that will wipe all of your progress'"
    >
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.hardReset.show()"
        >
          RESET THE GAME
        </OptionsButton>
      </template>
    </OptionsModalSet>
    </div>
    <div 
      class="c-optionmodal--section-name"
      v-if="canSpeedrun"
    >
      Speedrun
    </div>
    <div 
      class="c-optionmodal--section-multicolumn"
      v-if="canSpeedrun"
    >
      <OptionsModalSet
        :tooltip="'Open a new save with the speedrun mode enabled'"
      >
        <template #label>Start Speedrun</template>
        <template #config>
          <OptionsButton
            class="o-primary-btn--optionmodal"
            :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
            onclick="Modal.enterSpeedrun.show()"
          >
            Open Menu
          </OptionsButton>
        </template>
      </OptionsModalSet>
      <OptionsModalSet
        :tooltip="'Change the outcome of your future Glyph choices by changing the seed'"
        v-if="inSpeedrun"
      >
        <template #label>Change Glyph RNG Seed</template>
        <template #config>
          <OptionsButton
            class="o-primary-btn--optionmodal"
            :class="{
              'o-pelle-disabled-pointer': creditsClosed,
              'o-primary-btn--disabled': !canModifySeed
            }"
            @click="openSeedModal()"
          >
            Open Menu
          </OptionsButton>
        </template>
      </OptionsModalSet>
    </div>   
  </div>
</template>
<style scoped>
.l-optionmodal--option-save {
  height: 10rem
}

.l-optionmodal--config-save {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.c-custom-save-name {
  width: 100%;
  max-width: 25rem;
  height: 3rem;
  margin: 0.3rem;
}

.c-custom-save-name__input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: Typewriter;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0.1rem solid var(--color-accent);
  border-radius: var(--var-border-radius, 0.3rem);
}
</style>