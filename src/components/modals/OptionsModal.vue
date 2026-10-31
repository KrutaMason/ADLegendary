<script>
import ModalCloseButton from "@/components/modals/ModalCloseButton";
import OptionTabComponents from "@/components/modals/options-modal";
import OptionsModalSet from "@/components/OptionsModalSet";

export default {
  name: "OptionsModal",
  components: {
    ...OptionTabComponents,
    OptionsModalSet,
    ModalCloseButton
  },
  props: {
    showTab: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      tabId: 0,
    };
  },
  computed: {
    activeTab: {
      get() {
        return GameDatabase.optionTabs[this.tabId];
      },
      set(tab) {
        this.tabId = tab.id;
      }
    },
    unlockedTabs() {
      return GameDatabase.optionTabs.filter(tab => tab.isUnlocked());
    },
  },
  created() {
    this.activeTab = GameDatabase.optionTabs.filter(tab => tab.name === this.showTab)[0] || this.unlockedTabs[0];
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    toggleOptionsUI() {
      GameOptions.toggleOptionsUI();
      Tab[this.activeTab.onSwitch[0][0]][this.activeTab.onSwitch[0][1]].show(true);
      if (this.activeTab.onSwitch[1]) Modal[this.activeTab.onSwitch[1]].show();
      this.emitClose();
    },
    handleClick() {
      Modal.hotkeys.show();
    }
  },
}
</script>
<template>
  <div class="l-h2p-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        Options
      </div>
    </div>
    <div class="l-h2p-container">
      <div class="l-h2p-search-tab">
        <div class="l-h2p-tab-list c-h2p-tab-list">
          <div
            class="o-h2p-tab-button"
            v-for="Obj in unlockedTabs"
            :key="Obj.key"
            :class="{'o-h2p-tab-button--selected': Obj === activeTab}"
            @click="setActiveTab(Obj)"
          >
            <i :class="Obj.symbol"/>
            <div class="o-h2p-tab-button-name"> {{ Obj.name }} </div>
          </div>
          <div
            class="o-h2p-tab-button o-h2p-tab-button--toggle"
            @click="handleClick"
          >
            <kbd>?</kbd>
            <div class="o-h2p-tab-button-name"> Open Hotkey List </div>
          </div>
          <div
            class="o-h2p-tab-button"
            @click="toggleOptionsUI()"
          >
            <i class="fa-solid fa-arrows-rotate"/>
            <div class="o-h2p-tab-button-name"> Use Options Tab </div>
          </div>
        </div>
      </div>
      <div class="l-h2p-info">
        <div class="c-h2p-body--title">
          {{ activeTab.name }}
        </div>
        <div
          id="h2p-body"
          class="l-h2p-body c-h2p-body c-options-body"
        >
          <component
            v-for="sections in activeTab.components.length"
            :key="sections"
            :is="activeTab.components[sections - 1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.c-options-body {
  scrollbar-gutter: stable both-edges;
}

.o-h2p-tab-button-name {
  width: 75%;
}

.o-h2p-tab-button--toggle {
  margin-top: auto;
}
</style>