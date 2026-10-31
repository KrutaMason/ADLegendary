<script>
import ConfirmationOptionsEntry from "@/components/modals/options/ConfirmationOptionsEntry";
import OptionsModalSet from "@/components/OptionsModalSet";

export default {
  name: "ConfirmationOpTab",
  components: {
    ConfirmationOptionsEntry,
    OptionsModalSet
  },
  computed: {
    count() {
      return ConfirmationTypes.index.length;
    },
    name() {
      return ConfirmationTypes.index;
    },
    noConfirmations() {
      return ConfirmationTypes.index.every(x => !x.isUnlocked());
    }
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">Confirmations</div>
    <div 
      class="l-optionmodal--option c-optionmodal--option l-optionmodal--option-info"
      v-if="noConfirmations"
    >
      You do not have anything that requires confirmation, 
      but if you did it would appear here.
    </div>
    <div class="c-optionmodal--section-multicolumn">
      <OptionsModalSet
        v-for="entryNumber in count"
        :key="entryNumber"
        v-if="name[entryNumber - 1].isUnlocked()"
        :tooltip="''"
        :hideInfo="true"
        class="l-optionmodal--option-awayprogress"
      >
        <template #label>{{ name[entryNumber - 1].name }}</template>
        <template #config>
          <ConfirmationOptionsEntry
            class="o-primary-btn--optionmodal"
            :index="entryNumber - 1"
            :isinOptionsModal="true"
          />
        </template>
      </OptionsModalSet>  
    </div>
    
  </div>
</template>

<style scoped>
.l-optionmodal--option-awayprogress {
  flex: 40rem;
}

.o-primary-btn--optionmodal {
  width: 100%;
}
</style>