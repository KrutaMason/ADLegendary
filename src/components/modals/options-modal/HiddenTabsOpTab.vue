<script>
import HiddenTabGroup from "@/components/modals/options/hidden-tabs/HiddenTabGroup";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "HiddenTabsOpTab",
  components: {
    HiddenTabGroup,
    PrimaryButton,
  },
  data() {
    return {
      isEnslaved: false,
      isAlmostEnd: false,
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isEnslaved = Enslaved.isRunning;
      this.isAlmostEnd = Pelle.hasGalaxyGenerator;
    },
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab();
        for (const subtab of tab.subtabs)
          subtab.unhideTab();
      }
    }
  },
};
</script>

<template>
  <div class="c-optionmodal--section">
    <div class="l-optionmodal--option c-optionmodal--option l-optionmodal--option-info">
      Click a button to toggle showing a tab on/off.
      <br>
      Some tabs cannot be hidden, and you cannot hide your current tab.
      <br>
      Unhiding a tab in which all subtabs are hidden will also unhide all subtabs,
      and hiding all subtabs will also hide the tab.
    </div>
    <div 
      class="l-optionmodal--option c-optionmodal--option l-optionmodal--option-info"
      v-if="isAlmostEnd || isEnslaved"
    >
      <div v-if="isAlmostEnd">
        You cannot hide your tabs after unlocking the Galaxy Generator.
      </div>
      <div v-if="isEnslaved">
        <i>You must... see everywhere...</i>
        <br>
        (You cannot hide your tabs within this Reality)
      </div>
    </div>
    <div 
      class="l-optionmodal--option c-optionmodal--option"
      style="flex-direction: column; text-align: center;"
    >
      <PrimaryButton
        class="o-primary-btn--optionmodal"
        @click="showAllTabs"
      >
        Show all tabs
      </PrimaryButton>
    </div>
    <HiddenTabGroup
      v-for="(tab, index) in tabs"
      :key="index"
      :tab="tab"
      :change-enabled="!isEnslaved && !isAlmostEnd"
      class="l-hide-modal-tab-container"
    />
  </div>
</template>

<style scoped>
.l-hide-modal-tab-container{
  width: unset;
  margin: 0.4rem;
}

.l-wrapper {
  width: 65rem;
}

.t-s12 .l-wrapper {
  width: 65rem;
}
</style>