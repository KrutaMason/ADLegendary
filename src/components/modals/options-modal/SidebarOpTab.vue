<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import OptionsModalSet from "@/components/OptionsModalSet"
import SelectSidebarDropdown from "@/components/tabs/options-visual/SelectSidebarDropdown";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "SidebarOpTab",
  components: {
    ExpandingControlBox,
    ModalOptionsToggleButton,
    OptionsModalSet,
    SliderComponent,
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
  <div>
    <div class="c-optionmodal--section-name">Layout</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="`Change the width of the sidebar; Shortens the currency display(s) when the sidebar is wider`"
      :showValue="true"
      :value="width"
      :displayValue="`${width.toFixed(1)} rem`"
    >
      <template #label>Sidebar Width</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsWidth"
          :value="width"
          @input="adjustSliderWidth($event)"
        />
      </template>
    </OptionsModalSet>
      <OptionsModalSet
        :tooltip="`Display the amount of currencies you want to show in the sidebar`"
        :showValue="true"
        :value="amount"
        :displayValue="formatInt(amount)"
      >
      <template #label>Number of Currencies</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsAmount"
          :value="amount"
          @input="adjustSliderValue($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display the sidebar on the opposite side of the screen`"
    >
      <template #label>Sidebar on the Right</template>
      <template #config>
        <ModalOptionsToggleButton
          v-model="rightSide"
          class="o-primary-btn o-primary-btn--optionmodal"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Have the sidebar use all of the height`"
    >
      <template #label>Maximize Sidebar</template>
      <template #config>
        <ModalOptionsToggleButton
          v-model="fullHeight"
          class="o-primary-btn o-primary-btn--optionmodal"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Change the interactives to 2 arrows for switching currencies; Avoids clicking on the currencies on accident`"
    >
      <template #label>Switch currencies with arrows</template>
      <template #config>
        <ModalOptionsToggleButton
          v-model="arrowMode"
          class="o-primary-btn o-primary-btn--optionmodal"
          text=""
        />
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section-name">Currencies</div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="`Change the currency you want to show`"
      v-for="n in 4"
      :key="n"
    >
      <template #label>Currency #{{ n }}</template>
      <template #config>
        <ExpandingControlBox
        class="o-primary-btn--modal-option o-primary-btn--optionmodal"
        :style="{'z-index': 5 - n }"
      >
        <template #header>
          <div class="o-primary-btn o-primary-btn--optionmodal-select">
            ▼ {{ resource[n - 1] }} ▼
          </div>
        </template>
        <template #dropdown>
          <SelectSidebarDropdown :id="n-1"/>
        </template>
      </ExpandingControlBox>     
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>
<style scoped>
</style>