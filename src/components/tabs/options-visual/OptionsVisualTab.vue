<script>

import ExpandingControlBox from "@/components/ExpandingControlBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SelectNotationDropdown from "@/components/tabs/options-visual/SelectNotationDropdown";
import SelectThemeDropdown from "@/components/tabs/options-visual/SelectThemeDropdown";
import UpdateRateSlider from "./UpdateRateSlider";

export default {
  name: "OptionsVisualTab",
  components: {
    UpdateRateSlider,
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
      sidebarResource: "",
      shadows: 0,
      headerTextColored: true,
      prestigePosition: true,
      adbuyersSubtab: true,
      canPosition: true,
      mature: true,
    };
  },
  computed: {
    sidebarDB: () => GameDatabase.sidebarResources,
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
  }
};
</script>

<template>
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-large"
          onclick="GameOptions.toggleUI()"
        >
          {{ UILabel }}
        </OptionsButton>
        <UpdateRateSlider />
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
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="notationLabel"
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
        />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.namingOptions.show()"
        >
          Open Naming Options
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <PrimaryToggleButton
          v-model="adbuyersSubtab"
          class="o-primary-btn--option l-options-grid__button"
          label="Autobuyer Toggles in AD subtab:"
        />
        <PrimaryToggleButton
          v-if="canPosition"
          v-model="prestigePosition"
          class="o-primary-btn--option l-options-grid__button"
          label="Switch Prestige Button Positions:"
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
        />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="GameOptions.toggleShadows()"
        >
          Extra Shadows: {{ shadowsStr }}
        </OptionsButton>
      </div>
    </div>
    <br>
    <OpenModalHotkeysButton />
  </div>
</template>
