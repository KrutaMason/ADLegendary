<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";
import ExpandingControlBox from "@/components/ExpandingControlBox";
import SelectSidebarDropdown from "@/components/tabs/options-visual/SelectSidebarDropdown";
export default {
  name: "SidebarModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    PrimaryButton,
    PrimaryToggleButton,
    SliderComponent,
    ExpandingControlBox,
    SelectSidebarDropdown
  },
  data() {
    return {
      amount: 1,
      width: 12.8,
      switchCount: 0,
      id: [0, 0, 0, 0],
      resource: ["", "", "", ""],
      rightSide: false,
      arrowMode: false,
      fullHeight: false,
    };
  },
  computed: {
    sidebarDB: () => GameDatabase.sidebarResources,
    sliderPropsAmount() {
      return {
        min: 1,
        max: 4,
        width: "100%",
        tooltip: false
    }
    },
    sliderPropsWidth() {
      return {
        min: 12.8,
        max: 25.6,
        interval: 0.1,
        width: "100%",
        tooltip: false
    }
    }
  },
  watch: {
    amount(newValue) {
      player.options.sidebar.amount = newValue;
    },
    width(newValue) {
      player.options.sidebar.width = newValue;
    },
    rightSide(newValue) {
      player.options.sidebar.rightSide = newValue;
      ui.view.sidebar.rightSide = newValue;
      if (++this.switchCount > 49) SecretAchievement(52).unlock();
    },
    arrowMode(newValue) {
      player.options.sidebar.arrowMode = newValue;
    },
    fullHeight(newValue) {
      player.options.sidebar.fullHeight = newValue;
      this.$viewModel.sidebar.fullHeight = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options.sidebar;
      this.amount = options.amount;
      this.width = options.width;
      this.rightSide = options.rightSide;
      this.fullHeight = options.fullHeight;
      this.id = [options.resourceID[0], options.resourceID[1], options.resourceID[2], options.resourceID[3]]
      // For whatever reason it doesn't re-render when it's written in a loop
      this.resource = [
        this.id[0] === 0 ? "Latest Resource" : this.sidebarDB.find(e => e.id === this.id[0]).optionName, 
        this.id[1] === 0 ? "Latest Resource" : this.sidebarDB.find(e => e.id === this.id[1]).optionName,
        this.id[2] === 0 ? "Latest Resource" : this.sidebarDB.find(e => e.id === this.id[2]).optionName,
        this.id[3] === 0 ? "Latest Resource" : this.sidebarDB.find(e => e.id === this.id[3]).optionName
      ];
      this.arrowMode = options.arrowMode;
    },
    adjustSliderValue(value) {
      this.amount = value;
      player.options.sidebar.amount = this.amount;
    },
    adjustSliderWidth(value) {
      this.width = value;
      player.options.sidebar.width = this.width;
    },
    sidebarLabel(i) {
      return `#${i+1}: ${this.resource[i]}`;
    },
  }
};
</script>

<template>
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      Sidebar Options 
    </template>
    <div class="c-modal-options__button-container">
      <div 
        class="o-primary-btn o-primary-btn--option o-primary-btn--slider l-options-grid__button"
        v-tooltip="`Change the width of the sidebar; Shortens the currency display(s) when the sidebar is wider`"
      >
       Sidebar Width: {{ width }}rem
       <SliderComponent
         class="o-primary-btn--slider__slider"
         v-bind="sliderPropsWidth"
         :value="width"
         @input="adjustSliderWidth($event)"
        />
      </div>
      <div 
        class="o-primary-btn o-primary-btn--option o-primary-btn--slider l-options-grid__button"
        v-tooltip="`Display the amount of currencies you want to show in the sidebar`"
      >
        Display {{ quantify("Resource", amount) }}
        <SliderComponent
          class="o-primary-btn--slider__slider"
          v-bind="sliderPropsAmount"
          :value="amount"
          @input="adjustSliderValue($event)"
        />
      </div>
      <PrimaryToggleButton
          v-model="rightSide"
          class="o-primary-btn--option l-options-grid__button"
          label="Sidebar on the Right:"
          v-tooltip="`Display the sidebar on the opposite side of the screen`"
      />
      <PrimaryToggleButton
          v-model="fullHeight"
          class="o-primary-btn--option l-options-grid__button"
          label="Maximize Sidebar:"
          v-tooltip="`Have the sidebar use all of the height`"
      />
      <PrimaryToggleButton
          v-model="arrowMode"
          class="o-primary-btn--option l-options-grid__button"
          label="Switch currencies with arrows:"
          v-tooltip="`Change the interactives to 2 arrows for switching currencies; 
          Avoids clicking on the currencies on accident`"
      />
    </div>
    <div class="c-modal-options__button-container c-modal-options__button-container-fixed">
      <ExpandingControlBox
        v-for="n in 4"
        :key="n"
        class="l-options-grid__button c-options-grid__notations"
        button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header o-primary-btn--option-nomargin"
        :style="{'z-index':n < 3 ? 4 : 3}"
        :label="sidebarLabel(n-1)"
        v-tooltip="`Change the currency you want to show`"
      >
        <template #dropdown>
          <SelectSidebarDropdown :id="n-1"/>
        </template>
      </ExpandingControlBox>
    </div>
  </ModalWrapperOptions>
</template>
<style scoped>
.c-modal-options__button-container-fixed{
  height:13rem
}
</style>