<script>
import SplitPane from "vue-splitpane";

import AutomatorDocs from "./AutomatorDocs";
import AutomatorEditor from "./AutomatorEditor";
import AutomatorPointsList from "./AutomatorPointsList";

export default {
  name: "AutomatorTab",
  components: {
    SplitPane,
    AutomatorEditor,
    AutomatorPointsList,
    AutomatorDocs
  },
  data() {
    return {
      automatorUnlocked: false,
      interval: 0,
      currentChars: 0,
      totalChars: 0,
      withinLimit: false,
    };
  },
  created(){
    EventHub.ui.dispatch(GAME_EVENT.UPDATE)
  },
  computed: {
    fullScreen() {
      return this.$viewModel.tabs.reality.automator.fullScreen;
    },
    tabClass() {
      if (!this.fullScreen) return undefined;
      return "c-automator-tab--full-screen";
    },
    fullScreenIconClass() {
      return this.fullScreen ? "fa-compress-arrows-alt" : "fa-expand-arrows-alt";
    },
    intervalText() {
      const speedupText = `Each Reality makes it run ${formatPercents(0.006, 1)} faster, up to a maximum of
        ${formatInt(1000)} per second.`;
      return this.interval === 1
        ? `The Automator is running at max speed (${formatInt(1000)} commands per real-time second).`
        : `The Automator is running ${quantify("command", 1000 / this.interval, 2, 2)} per real-time second.
          ${speedupText}`;
    },
    maxScriptChars() {
      return AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS;
    },
    maxTotalChars() {
      return AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS;
    },
  },
  methods: {
    update() {
      this.automatorUnlocked = Player.automatorUnlocked;
      this.interval = AutomatorBackend.currentInterval;
      this.currentChars = AutomatorData.singleScriptCharacters();
      this.totalChars = AutomatorData.totalScriptCharacters();
      this.withinLimit = AutomatorData.isWithinLimit();
    }
  }
};
</script>

<template>
  <div
    :class="tabClass"
    class="c-automator-tab l-automator-tab"
  >
    <div v-if="automatorUnlocked">
      <div>
        {{ intervalText }}
      </div>
      <span :class="{ 'c-overlimit': currentChars > maxScriptChars }">
        This script: {{ formatInt(currentChars) }} / {{ formatInt(maxScriptChars) }}
      </span>
      |
      <span :class="{ 'c-overlimit': totalChars > maxTotalChars }">
        Across all scripts: {{ formatInt(totalChars) }} / {{ formatInt(maxTotalChars) }}
      </span>
      <br>
      <span
        v-if="!withinLimit"
        class="c-overlimit"
      >
        (Your changes will not be saved due to being over a character limit!)
      </span>
      <div class="c-automator-split-pane">
        <SplitPane
          :min-percent="44"
          :default-percent="50"
          split="vertical"
        >
          <template #paneL>
            <AutomatorEditor/>
          </template>
          <template #paneR>
            <AutomatorDocs/>
          </template>
        </SplitPane>
      </div>
    </div>
    <AutomatorPointsList v-else />
  </div>
</template>

<style scoped>
.c-overlimit {
  font-weight: bold;
  color: var(--color-bad);
}

.c-automator-tab {
  width: 80%;
  /*width: calc(80% + 2rem);*/
  min-width: 100rem;
}

.l-automator-tab {
  position: relative;
  align-self: center;
  margin-top: 0.5rem;
}
.c-automator-monitor{
  padding:0rem 1rem 1rem 1rem;
  border: var(--var-border-width, 0.3rem) solid;
  border-image:url(../../../../public/images/frames/automation.png) 3;
  background:url(../../../../public/images/background/automator-light.png)
}
.s-base--dark .c-automator-monitor{
  background:url(../../../../public/images/background/automator.png)
}
.c-automator-monitor-info{
  margin-bottom:1rem;
  background:var(--leg-base);
  color:var(--color-text);
  border: var(--var-border-width, 0.3rem) solid;
  border-image:url(../../../../public/images/frames/automation.png) 3;
  border-top:none;
  box-shadow: var(--var-box-shadow, 0 0 1rem #00000080 inset);
}
.c-automator-split-pane {
  width: 100%;
  height: 60rem;
  background-color: #bbbbbb;
  border: 1.2rem solid;
  border-image-source:url(../../../../public/images/frames/automation-light.png);
  border-image-repeat: round;
  border-image-slice: 12;
}
.s-base--metro .c-automator-split-pane {
  border: 0.3rem solid;
  border-image-slice: 3;
  height: 57rem;
}
.s-base--dark .c-automator-split-pane {
  width: 100%;
  background-color: #474747;
  border-image-source:url(../../../../public/images/frames/automation.png);
}

.c-automator-tab--full-screen .c-automator-split-pane {
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  z-index: 5;
  margin-top: 0;
  padding-bottom: 0;
}
</style>
