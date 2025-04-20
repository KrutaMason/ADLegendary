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
      sidebarDisplayAmount: 1,
      sidebarWidth:12.8,
      switchCount: 0,
      ids:[0,0,0,0],
      sidebarResource: ["","","",""],
      sidebarSideSwitch:false
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
        interval:0.1,
        width: "100%",
        tooltip: false
    }
    }
  },
  watch: {
    sidebarDisplayAmount(newValue) {
    player.options.sidebarDisplayAmount = newValue;
    },
    sidebarWidth(newValue) {
    player.options.sidebarWidth = newValue;
    },
    sidebarSideSwitch(newValue) {
    player.options.sidebarSideSwitch = newValue;
    if (++this.switchCount > 49) SecretAchievement(52).unlock();
    },
  },
  methods: {
    update() {
    const options = player.options;
    this.sidebarDisplayAmount = player.options.sidebarDisplayAmount;
    this.sidebarWidth = player.options.sidebarWidth
    this.sidebarSideSwitch=player.options.sidebarSideSwitch
    this.ids = [options.sidebarResourceType[0],options.sidebarResourceType[1],options.sidebarResourceType[2],options.sidebarResourceType[3]];
    this.sidebarResource = [options.sidebarResourceType[0] === 0? "Latest Resource": this.sidebarDB.find(e => e.id === options.sidebarResourceType[0]).optionName,
    options.sidebarResourceType[1] === 0? "Latest Resource": this.sidebarDB.find(e => e.id === options.sidebarResourceType[1]).optionName,
    options.sidebarResourceType[2] === 0? "Latest Resource": this.sidebarDB.find(e => e.id === options.sidebarResourceType[2]).optionName,
    options.sidebarResourceType[3] === 0? "Latest Resource": this.sidebarDB.find(e => e.id === options.sidebarResourceType[3]).optionName,]
    },
    adjustSliderValue(value) {
    this.sidebarDisplayAmount = value;
    player.options.sidebarDisplayAmount = this.sidebarDisplayAmount;
    },
    adjustSliderWidth(value) {
    this.sidebarWidth = value;
    player.options.sidebarWidth = this.sidebarWidth;
    },
    sidebarLabel(n) {
      return `#${n+1}: ${this.sidebarResource[n]}`;
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
      <PrimaryToggleButton
          v-model="sidebarSideSwitch"
          class="o-primary-btn--option l-options-grid__button"
          label="Sidebar on the Right:"
        />
    <div 
      class="o-primary-btn o-primary-btn--option o-primary-btn--slider" 
      style="margin:0.5rem 0.8rem"
    >
      Sidebar Width: {{ sidebarWidth }}rem
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsWidth"
        :value="sidebarWidth"
        @input="adjustSliderWidth($event)"
     />
    </div>
  <div
  class="o-primary-btn o-primary-btn--option o-primary-btn--slider"
  style="margin:0.5rem 0.8rem"
  >
    Display {{ quantify("Resource", sidebarDisplayAmount) }}
    <SliderComponent
      class="o-primary-btn--slider__slider"
      v-bind="sliderPropsAmount"
      :value="sidebarDisplayAmount"
      @input="adjustSliderValue($event)"
    />
  </div>
    </div>
    <div class="c-modal-options__button-container c-modal-options__button-container-fixed">
    <ExpandingControlBox
          v-for="n in 4"
          :key="n"
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header o-primary-btn--option-nomargin"
          :style="{'z-index':n<3?4:3}"
          :label="sidebarLabel(n-1)"
        >
        <template #dropdown><SelectSidebarDropdown :id="n-1"/></template>
    </ExpandingControlBox>
</div>
  </ModalWrapperOptions>
</template>
<style scoped>
.c-modal-options__button-container-fixed{
  height:13rem
}
</style>