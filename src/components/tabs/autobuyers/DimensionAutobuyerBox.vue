<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";
import DimensionBulkButton from "./DimensionBulkButton";

export default {
  name: "DimensionAutobuyerBox",
  components: {
    DimensionBulkButton,
    AutobuyerBox,
    AutobuyerIntervalButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE
    };
  },
  computed: {
    autobuyer() {
      return Autobuyer.antimatterDimension(this.tier);
    },
    name() {
      return `${AntimatterDimension(this.tier).fullName(...[,], false)} Autobuyer`
    },
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "Buys singles";
        case AUTOBUYER_MODE.BUY_10: return "Buys max";
      }
      throw "Unknown Dimension Autobuyer mode";
    }
  },
  created() {
    this.on$(GAME_EVENT.NAME_CHANGED, () => this.$recompute("name"));
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :name="name"
    show-interval
    class="c-autobuyer-box-dimension"
  >
    <template #intervalSlot>
      <DimensionBulkButton :autobuyer="autobuyer" />
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template #toggleSlot>
      <br>
      <button
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.c-autobuyer-box-dimension{
  width: calc(25% - 1rem);
    flex-direction: column;
    --width: none;
    height: 17rem;
}
</style>
