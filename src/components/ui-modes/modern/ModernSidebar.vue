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
      amount: 0,
      fade: 1,
    };
  },
  computed: {
    tabs: () => Tabs.newUI
  },
  methods: {
    update() {
      this.amount = player.options.sidebar.amount;
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => x.isAvailable);
      this.fade = GameEnd.endState>1&&GameEnd.endState<END_STATE_MARKERS.CREDITS_START?Math.clamp((1-(GameEnd.endState-2)),0,1):1;
    },
    showH2P() {
      Modal.h2p.show();
    },
    showInfo() {
      Modal.information.show();
    },
    showOptions() {
      Modal.optionsModal.show();
    }
  },
};
</script>

<template>
  <div
    v-if="!isHidden"
    class="c-modern-sidebar"
    :class="[
      {'c-modern-sidebar-switched': $viewModel.sidebar.rightSide},
      {'c-modern-sidebar-full': $viewModel.sidebar.fullHeight}
    ]"
    :style="{'opacity':fade}"
  >
    <div class="c-modern-sidebar--sub">
      <ModernSidebarCurrency 
        v-for="n in this.amount"
        :key="n"
        :id="n-1"
      />
    </div>
    <div class="o-divider" />
    <div class="c-modern-sidebar--sub c-modern-sidebar--tabs">
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
    <!--
    <div class="o-divider" />
    <div class="c-modern-sidebar--sub">
      <div class="c-modern-sidebar--help-me">
        <button
          class="o-primary-btn o-primary-btn--help-me"
          @click="showH2P"
        >
          ?
        </button>
        <button
          class="o-primary-btn o-primary-btn--help-me"
          @click="showInfo"
        >
          i
        </button>
        <button
          v-if="$viewModel.newOptionsUI"
          class="o-primary-btn o-primary-btn--help-me"
          @click="showOptions"
        >
          <i class="fas fa-cog"/>
        </button>
      </div>
    </div>
    -->
  </div>
</template>

<style scoped>
.c-modern-sidebar-switched {
  left: unset;
  right: 0;
}

.c-modern-sidebar--help-me {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.c-modern-sidebar--help-me {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.o-primary-btn--help-me {
  width: 100%;
  margin: 0.3rem;
  height: 4rem;
  font-size: calc(0.5rem + var(--sidebar-width) / 16);
}
</style>
