<script>
import { CatchupResources } from "@/core/storage/progress-checker";

import CatchupEntry from "@/components/modals/catchup/CatchupEntry";

export default {
  name: "CatchupGroup",
  components: {
    CatchupEntry,
  },
  props: {
    group: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    shownResources() {
      return CatchupResources.all.filter(r => r.requiredStage === this.group);
    },
    dropDownIconClass() {
      return this.collapsed ? "far fa-plus-square" : "far fa-minus-square";
    },
  }
};
</script>

<template>
  <div v-if="shownResources.length !== 0">
    <div
      class="o-catchup-group-title"
      :class="{'o-catchup-group-title-open' : !collapsed}"
      @click="collapsed = !collapsed"
    >
      <i :class="dropDownIconClass" /> <span class="o-catchup-group-title-font">{{ name }}</span>
  </div>
    <div v-if="!collapsed">
      <CatchupEntry
        v-for="(resource, i) of shownResources"
        :key="i"
        class="l-left"
        :info="resource"
      />
    </div>
  </div>
</template>

<style scoped>
.o-catchup-group-title {
  font-size: 1.5rem;
  cursor: pointer;
}
.o-catchup-group-title-open {
border-bottom: 1px solid;
padding-bottom:0.3rem;
margin-bottom:0.5rem;
border-image: linear-gradient(90deg, currentcolor, transparent) 1;
background: linear-gradient(90deg, currentcolor -500%, transparent);
}
.o-catchup-group-title-font{
  font-family: var(--var-secondary-font);
    font-weight: bold;
    font-size: 1.8rem;
    line-height: 0;
}
.l-left {
  text-align: left;
}
</style>
