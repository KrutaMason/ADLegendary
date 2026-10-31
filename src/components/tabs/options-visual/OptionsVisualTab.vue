<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SelectNotationDropdown from "@/components/tabs/options-visual/SelectNotationDropdown";
import SelectThemeDropdown from "@/components/tabs/options-visual/SelectThemeDropdown";
import UpdateRateSlider from "./UpdateRateSlider";

export default {
  name: "OptionsVisualTab",
  components: {
    UpdateRateSlider,
    PrimaryButton,
    PrimaryToggleButton,
    ExpandingControlBox,
    OptionsButton,
    OpenModalHotkeysButton,
    SelectThemeDropdown,
    SelectNotationDropdown,
  },
  data() {
    return {
      theme: "",
      notation: "",
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
      return `Theme: ${Themes.find(this.theme).displayName()}`;
    },
    notationLabel() {
      return `Notation: ${this.notation}`;
    },
    UILabel() {
      return `UI: ${this.$viewModel.newUI ? "Modern" : "Classic"}`;
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
    },
    cycleShadow() {
      player.options.extraShadows = (player.options.extraShadows + 1) % Object.keys(SHADOWS_SETTING).length;
    },
    toggleOptionsUI() {
      GameOptions.toggleOptionsUI();
      Modal.optionsModal.show({showTab: "Visual"});
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
          class="o-primary-btn--option_font-large"
          onclick="GameOptions.toggleUI()"
          v-tooltip="`Choose between the classic UI layout and the modern one from the Reality update`"
        >
          {{ UILabel }}
        </OptionsButton>
        <UpdateRateSlider v-tooltip="`Change the frequency of the game rendering texts`"/>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.newsOptions.show();"
        >
          Open News Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="themeLabel"
          v-tooltip="`Change the overall appearance of the game`"
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="notationLabel"
          v-tooltip="`Change the methods of displaying numbers in the game`"
        >
          <template #dropdown>
            <SelectNotationDropdown />
          </template>
        </ExpandingControlBox>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.notation.show();"
        >
          Open Exponent Notation Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.animationOptions.show();"
        >
          Open Animation Options
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.infoDisplayOptions.show()"
        >
          Open Info Display Options
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.awayProgressOptions.show()"
        >
          Open Away Progress Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.hiddenTabs.show()"
        >
          Modify Visible Tabs
        </OptionsButton>
        <PrimaryToggleButton
          v-model="headerTextColored"
          class="o-primary-btn--option l-options-grid__button"
          label="Relative prestige gain text coloring:"
          v-tooltip="`Give the text of prestige buttons some coloring based on the amount you would get on prestige`"
        />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.namingOptions.show()"
        >
          Open Naming Convention Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <PrimaryToggleButton
          v-model="adbuyersSubtab"
          class="o-primary-btn--option l-options-grid__button"
          label="Autobuyer Toggles in AD subtab:"
          v-tooltip="`Add toggles for the Autobuyers to the Antimatter Dimensions tab`"
        />
        <PrimaryToggleButton
          v-if="canPosition"
          v-model="prestigePosition"
          class="o-primary-btn--option l-options-grid__button"
          label="Switch Prestige Button Positions:"
          v-tooltip="`The Big Crunch button will then be on the other side of the screen`"
        />
        <OptionsButton
          v-if="$viewModel.newUI"
          class="o-primary-btn--option"
          onclick="Modal.sidebar.show();"
        >
          Open Sidebar Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row"> 
        <PrimaryToggleButton
          v-model="mature"
          class="o-primary-btn--option l-options-grid__button"
          label="Mature Content:"
          v-tooltip="`Display sensitive and graphic content; Only suitable for mature audiences`"
        />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="GameOptions.toggleShadows()"
          v-tooltip="`Toggle box and text shadows from CSS; Disabling may improve performance`"
        >
          Extra CSS Shadows: {{ shadowsStr }}
        </OptionsButton>
      </div>
    </div>
    <br>
    <OpenModalHotkeysButton />
  </div>
</template>
