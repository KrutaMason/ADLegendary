<script>
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ModalOptionsToggleButton",
  components: {
    PrimaryToggleButton
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    styleObject() {
      if (this.value) return {
        "--bg-dark": "var(--color-good)",
      }
      return {
        "--bg-dark": "var(--color-gh-purple)",
        "--border": "var(--color-gh-purple)",
      };
    },
  }
};
</script>

<template>
  <PrimaryToggleButton
    :value="value"
    :label="text"
    class="o-primary-btn--modal-option"
    :style="styleObject"
    @input="emitInput"
  />
</template>
