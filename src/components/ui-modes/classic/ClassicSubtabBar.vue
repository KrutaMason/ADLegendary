<script>
import ClassicSubtabButton from "./ClassicSubtabButton";

export default {
  name: "ClassicSubtabBar",
  components: {
    ClassicSubtabButton
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    tab: () => Tabs.current,
    classObject() {
      return {
        [`c-subtab-button-container--${this.tab.config.UIClassOther}`]: this.tab.config.UIClassOther
      };
    },
    subtabs() {
      return this.tab.subtabs;
    }
  },
  methods: {
    update() {
      this.isVisible = this.subtabs.countWhere(subtab => subtab.isAvailable) > 1;
    }
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    :class="classObject"
    class="c-subtab-button-container"
  >
    <ClassicSubtabButton
      v-for="(subtab, i) in subtabs"
      :key="i"
      :subtab="subtab"
      :parent-name="tab.name"
    />
  </div>
</template>

<style scoped>

</style>
