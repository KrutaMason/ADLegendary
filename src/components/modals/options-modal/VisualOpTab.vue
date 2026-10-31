<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import OptionsButton from "@/components/OptionsButton";
import OptionsModalSet from "@/components/OptionsModalSet";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SelectNotationDropdown from "@/components/tabs/options-visual/SelectNotationDropdown";
import SelectThemeDropdown from "@/components/tabs/options-visual/SelectThemeDropdown";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "VisualOpTab",
  components: {
    PrimaryToggleButton,
    ExpandingControlBox,
    OptionsButton,
    OptionsModalSet,
    SelectThemeDropdown,
    SelectNotationDropdown,
    SliderComponent,
  },
  data() {
    return {
      theme: "",
      notation: "",
      updateRate: 0,
      shadows: 0,
      headerTextColored: true,
      prestigePosition: true,
      adbuyersSubtab: true,
      canPosition: true,
      mature: true,
    };
  },
  computed: {
    themeLabel() {
      return Themes.find(this.theme).displayName();
    },
    notationLabel() {
      return this.notation;
    },
    UILabel() {
      return this.$viewModel.newUI ? "Modern" : "Classic";
    },
    shadowsStr() {
      switch (this.shadows) {
        case SHADOWS_SETTING.FULL:
          return "Full";
        case SHADOWS_SETTING.BOX:
          return "Boxes only";
        case SHADOWS_SETTING.TEXT:
          return "Texts only";
        case SHADOWS_SETTING.NONE:
          return "None";
        default:
          throw new Error("Unrecognized extra shadow setting");
      }
    },
    sliderProps() {
      return {
        min: 33,
        max: 200,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    }
  },
  watch: {
    headerTextColored(newValue) {
      player.options.headerTextColored = newValue;
    },
    prestigePosition(newValue) {
      player.options.prestigePosition = newValue;
    },
    adbuyersSubtab(newValue) {
      player.options.adbuyersSubtab = newValue;
    },
    mature(newValue) {
      player.options.mature = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.theme = Theme.currentName();
      this.shadows = options.extraShadows;
      this.notation = options.notation;
      this.headerTextColored = options.headerTextColored;
      this.prestigePosition = options.prestigePosition;
      this.adbuyersSubtab = options.adbuyersSubtab;
      this.canPosition = PlayerProgress.hasBroken;
      this.mature = options.mature;
      this.updateRate = options.updateRate;
    },
    cycleShadow() {
      player.options.extraShadows = (player.options.extraShadows + 1) % Object.keys(SHADOWS_SETTING).length;
    },
    adjustSliderValue(value) {
      this.updateRate = value;
      player.options.updateRate = this.updateRate;
      GameOptions.refreshUpdateRate();
    },
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">General</div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="`Choose between the classic UI layout and the modern one from the Reality update`"
    >
      <template #label>User Interface</template>
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          onclick="GameOptions.toggleUI()"
        >
          {{ UILabel }}
        </OptionsButton>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Change the overall appearance of the game`"
    >
      <template #label>Theme</template>
      <template #config>
        <ExpandingControlBox
          class="o-primary-btn--modal-option o-primary-btn--optionmodal"
          button-class="o-primary-btn o-primary-btn--optionmodal-select"
          :label="themeLabel"
          style="z-index: 4"
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Change the methods of displaying numbers in the game`"
    >
      <template #label>Notation</template>
      <template #config>
        <ExpandingControlBox
          class="o-primary-btn--modal-option o-primary-btn--optionmodal"
          button-class="o-primary-btn o-primary-btn--optionmodal-select"
          :label="notationLabel"
          style="z-index: 3"
        >
          <template #dropdown>
            <SelectNotationDropdown />
          </template>
        </ExpandingControlBox>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Change the frequency of the game rendering texts`"
      :showValue="true"
      :value="updateRate"
      :displayValue="`${formatInt(updateRate)} ms`"
    >
      <template #label>Update Rate</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderProps"
          :value="updateRate"
          @input="adjustSliderValue($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Give the text of prestige buttons some coloring based on the amount you would get on prestige`"
    >
      <template #label>Relative prestige gain text coloring</template>
      <template #config>
        <PrimaryToggleButton
          v-model="headerTextColored"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Add toggles for the Autobuyers to the Antimatter Dimensions tab`"
    >
      <template #label>Autobuyer Toggles in AD subtab</template>
      <template #config>
        <PrimaryToggleButton
          v-model="adbuyersSubtab"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`The Big Crunch button will then be on the other side of the screen`"
      v-if="canPosition"
    >
      <template #label>Switch Prestige Button Positions</template>
      <template #config>
        <PrimaryToggleButton
          v-model="prestigePosition"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display sensitive and graphic content; Only suitable for mature audiences`"
    >
      <template #label>Mature Content</template>
      <template #config>
        <PrimaryToggleButton
          v-model="mature"
          class="o-primary-btn--optionmodal"
          label=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Toggle box and text shadows from CSS; Disabling may improve performance`"
    >
      <template #label>Extra CSS Shadows</template>
      <template #config>
        <OptionsButton
          class="o-primary-btn--optionmodal"
          onclick="GameOptions.toggleShadows()"
        >
          {{ shadowsStr }}
        </OptionsButton>
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>
