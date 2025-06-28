<script>
export default {
  name: "SaveTimer",
  data() {
    return {
      currentTime: 0,
      cloudSaveEnabled: false,
      lastLocalSave: 0,
      lastCloudSave: 0,
      showTimeSinceSave: false,
      saveDisabled: false,
    };
  },
  computed: {
    timeString() {
      const localStr = timeDisplayShort(this.currentTime - this.lastLocalSave);
      const cloudStr = timeDisplayShort(this.currentTime - this.lastCloudSave);
      return this.cloudSaveEnabled
        ? `${localStr} (local) | ${cloudStr} (cloud)`
        : localStr;
    },
  },
  methods: {
    update() {
      this.currentTime = Date.now();
      this.cloudSaveEnabled = player.options.cloudEnabled && Cloud.loggedIn;
      this.lastLocalSave = GameStorage.lastSaveTime;
      this.lastCloudSave = GameStorage.lastCloudSave;
      this.showTimeSinceSave = player.options.showTimeSinceSave;
      this.saveDisabled = GameEnd.endState >= END_STATE_MARKERS.INTERACTIVITY_DISABLED;
    },
    save() {
      GameStorage.save(false, true);
    }
  }
};
</script>

<template>
  <div
    v-if="showTimeSinceSave"
    class="o-save-timer"
    @click="save"
  >
    <b v-if="saveDisabled">There is nothing left to save.</b>
    <span v-else>Time since last save: {{ timeString }}</span>
  </div>
</template>

<style scoped>
.o-save-timer {
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  text-align: left;
  color: var(--color-text);
  background: var(--leg-base-render);
  border-top: 0.1rem solid;
  border-right: 0.1rem solid;
  border-image: var(--leg-border-render) 3;
  box-shadow: var(--var-box-shadow, 0 0 1rem black);
  padding: 0 0.5rem;
  pointer-events: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}

.t-s2 .o-save-timer {
  filter: sepia(100%) hue-rotate(180deg) saturate(250%);
}

.t-s3 .o-save-timer {
  animation: a-glasses 7s infinite;
}
</style>
