<script>
import LoadGameEntry from "@/components/modals/LoadGameEntry";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "LoadGameModal",
  components: {
    ModalWrapperOptions,
    LoadGameEntry
  }
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      Save Selection
    </template>
    <div class="c-entry-container c-modal--short">
    <LoadGameEntry
      v-for="id in 5"
      :key="id"
      :save-id="id - 1"
      class="c-entry-border o-descriptionBlock"
    />      
    </div>
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 60rem
}
.c-entry-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.c-entry-border {
  padding: 0 0 0.5rem 0;
  margin: 0.5rem;
}

</style>
