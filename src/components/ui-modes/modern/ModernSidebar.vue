<script>
import ModernSidebarCurrency from "./ModernSidebarCurrency";
import ModernTabButton from "./ModernTabButton";

export default {
  name: "ModernSidebar",
  components: {
    ModernSidebarCurrency,
    ModernTabButton
  },
  data() {
    return {
      isHidden: false,
      tabVisibilities: [],
      amount:0,
      fade:1,
      sidebarSideSwitch:false
    };
  },
  computed: {
    tabs: () => Tabs.newUI
  },
  methods: {
    update() {
      this.sidebarSideSwitch = player.options.sidebarSideSwitch
      this.amount = player.options.sidebarDisplayAmount
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => x.isAvailable);
      this.fade = GameEnd.endState>1&&GameEnd.endState<END_STATE_MARKERS.CREDITS_START?Math.clamp((1-(GameEnd.endState-2)),0,1):1
    },
  },
};
</script>

<template>
  <div
    v-if="!isHidden"
    class="c-modern-sidebar"
    :class="{'c-modern-sidebar-switched':this.sidebarSideSwitch}"
    :style="{'opacity':fade}"
  >
    <ModernSidebarCurrency :id="0"/>
    <ModernSidebarCurrency :id="1" v-if="this.amount>1"/>
    <ModernSidebarCurrency :id="2" v-if="this.amount>2"/>
    <ModernSidebarCurrency :id="3" v-if="this.amount>3"/>
    <template
      v-for="(tab, tabPosition) in tabs"
    >
      <ModernTabButton
        v-if="tabVisibilities[tabPosition]"
        :key="tab.name"
        :tab="tab"
        :tab-position="tabPosition"
      />
    </template>
  </div>
</template>

<style scoped>
.c-modern-sidebar-switched{
  left: unset;
  right:0;
  background: linear-gradient(90deg, transparent,var(--color-accent) 600%),var(--leg-base);
  background-position: center;
}
</style>
