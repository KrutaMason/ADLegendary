<script>
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "ChangelogModal",
  components: {
    ModalCloseButton,
  },
  data() {
    return {
      entryId: 0,
    };
  },
  computed: {
    shownEntry: {
      get() {
        return GameDatabase.changelog[this.entryId];
      },
      set(entry) {
        this.entryId = entry.id;
      }
    },
    entries() {
      return GameDatabase.changelog;
    }
  },
  methods: {
    setShownEntry(tab) {
      this.shownEntry = tab;
      this.$refs.changelogBody.scrollTop = 0;
    },
    formatDate(date) {
      return date.map(n => (Math.log10(n) >= 2 ? n : `0${n}`.slice(-2))).join("-");
    }
  },
};
</script>

<template>
  <div class="l-changelog-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        Changelog
      </div>
    </div>
    <div class="l-h2p-container">
      <div class="l-changelog-search-tab">
        <div class="l-h2p-tab-list c-h2p-tab-list">
          <div
            v-for="entry in entries"
            :key="entry.id"
            class="o-h2p-tab-button o-changelog-tab-button"
            :class="{
              'o-h2p-tab-button--legendary': entry.isLegendary,
              'o-h2p-tab-button--selected': entry === shownEntry
            }"
            @click="setShownEntry(entry)"
          >
            <div class="c-font--fixed">{{ entry.isLegendary ? "🜾" : "" }}</div>
            {{ formatDate(entry.date) }}
            <div class="c-font--fixed">{{ entry.isLegendary ? "🜾" : "" }}</div>
          </div>
        </div>
      </div>
      <div class="l-h2p-info">
        <div class="c-h2p-body--title">
          {{ formatDate(shownEntry.date) }}<span v-if="shownEntry.name">: "{{ shownEntry.name }}" update</span>
        </div>
        <div
          ref="changelogBody"
          class="l-h2p-body c-changelog-body"
          v-html="shownEntry.info"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-changelog-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 20vh);
  /* stylelint-disable-next-line unit-allowed-list */
  height: 80vh;
  margin: 0.5rem;
}

.l-changelog-search-tab {
  display: flex;
  flex-direction: column;
  width: 15vw;
  min-width: 15rem;
  max-width: 20rem;
}

.c-changelog-body {
  text-align: left;
  font-size: 1.6rem;
}

.t-s12 .l-changelog-body {
  font-size: 1.3rem;
}

.o-changelog-tab-button {
  padding: 0.5rem 0.5rem 0.5rem 0;
  transition: all 0.2s;
}

.o-h2p-tab-button--legendary {
  --color-accent: #00ffaa
}

.o-h2p-tab-button--legendary .c-font--fixed {
  padding: 0 0.5rem;
}
</style>

<style>
.c-changelog-body li {
  margin: 0.5rem 0;
}
</style>
