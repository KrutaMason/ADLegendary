<script>
export default {
  name: "AutomatorButton"
};
</script>

<template>
  <button
    class="c-automator__button l-automator__button fas"
    @click="emitClick"
  />
</template>

<style scoped>
.c-automator__button {
  width: 3.3rem;
  border: var(--var-border-width, 0.2rem) solid var(--color-automator-controls-border);
  text-shadow: var(--var-text-shadow, 0.1rem 0.1rem 0.3rem var(--color-blockmator-block-background));
  background-image: linear-gradient(#ffffff88 -100%,transparent 49%, #00000022 50%, transparent 75%);
  border-radius: var(--var-border-radius, 0.3rem);
  margin: 0.4rem;
  cursor: pointer;
  color: var(--color-automator-docs-font);
  background-color: var(--color-automator-controls-inactive);
}
.s-base--dark .c-automator__button {
  background-image: linear-gradient(#ffffff88 -100%,transparent 49%, #00000044 50%, transparent);
}
</style>
