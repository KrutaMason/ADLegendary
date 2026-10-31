<script>
import AwayProgressOptionsEntry from "@/components/modals/options/AwayProgressOptionsEntry";
import OptionsModalSet from "@/components/OptionsModalSet";

export default {
  name: "AwayProgressOpTab",
  components: {
    AwayProgressOptionsEntry,
    OptionsModalSet,
  },
  computed: {
    all() {
      return AwayProgressTypes.showOption;
    },
    allTitle() {
      return AwayProgressTypes.all;
    }
  },
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section">
      <div class="l-optionmodal--option c-optionmodal--option l-optionmodal--option-info">
        Note: Selected resources will only show if they've increased.
      </div>
    </div>
    <div class="c-optionmodal--section-multicolumn">
      <OptionsModalSet
        v-for="name of all"
        :key="name"
        v-if="allTitle[name].isUnlocked()"
        :tooltip="''"
        :hideInfo="true"
        class="l-optionmodal--option-awayprogress"
      >
        <template #label>{{ allTitle[name].formatName }}</template>
        <template #config>
          <AwayProgressOptionsEntry
            class="o-primary-btn--optionmodal"
            :name="name"
            :isinOptionsModal="true"
          />
        </template>
      </OptionsModalSet>  
    </div>
    
  </div>
</template>

<style scoped>
.l-optionmodal--awayprogress {
  display: flex;
  flex-wrap: wrap;
  margin: 0.8rem 1.6rem;
}

.l-optionmodal--option-awayprogress {
  margin: 0.4rem;
  flex: 40rem;
  text-align: center;
}

.o-primary-btn--optionmodal {
  width: 100%;
}
</style>