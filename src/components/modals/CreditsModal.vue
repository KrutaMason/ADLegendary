<script>
import CreditsDisplay from "@/components/CreditsDisplay";
import ModalWrapper from "@/components/modals/ModalWrapper";
import LogoHolder from "@/components/LogoHolder";

export default {
  name: "CreditsModal",
  components: {
    CreditsDisplay,
    ModalWrapper,
    LogoHolder
  },
};
</script>

<template>
  <ModalWrapper class="l-credits-modal c-credits-modal">
    <LogoHolder class="o-title--credits"/>
    <div class="c-credits-modal__body">
      <CreditsDisplay :is-modal="true" />
    </div>
  </ModalWrapper>
</template>

<style scoped>
.l-credits-modal {
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 60vh);
  min-width: 70rem;
}

.c-credits-modal {
  margin: 0.5rem;
  border: none;
  background: none;
  padding: 0;
}

.o-title--credits {
  width: 50rem
}

.c-credits-modal__body {
  overflow-y: scroll;
  /* stylelint-disable-next-line unit-allowed-list */
  height: 60vh;
  border: 0.4rem double #00ffaa;
  box-shadow: var(--var-box-shadow, 0 0 2rem var(--color-background) inset);
  border-radius: var(--var-border-radius, 1rem);
  background: var(--leg-secondary), linear-gradient(transparent, #00ffaa 500%);
  background-position: center;
  background-origin: border-box;
}
</style>