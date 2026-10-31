<script>
export default {
  name: "PrimaryButton",
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: true
    },
    sound: {
      type: Function,
      required: false,
      default: () => AudioManagement.playSound("click_light")
    }
  },
  computed: {
    classObject() {
      return {
        "o-primary-btn--disabled": !this.enabled,
      };
    }
  }
};
</script>

<template>
  <button
    class="o-primary-btn"
    :class="classObject"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

