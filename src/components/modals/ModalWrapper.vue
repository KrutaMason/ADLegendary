<script>
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "ModalWrapper",
  components: {
    ModalCloseButton,
  },
  methods: {
    closeModal() {
      EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    }
  }
};
</script>

<template>
  <div class="c-modal__inner">
    <div class="c-modal__header">
      <ModalCloseButton @click="closeModal" />
      <span
        v-if="$slots.header"
        class="c-modal__title"
      >
        <slot name="header" />
      </span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.c-modal__inner {
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.6rem;
  background: linear-gradient(transparent,var(--base) 500%);
  background-origin: border-box;
  --base: var(--color-accent)
}

.c-modal__header {
  margin-bottom: 0.5rem;
  margin-top: -0.6rem;
}
</style>