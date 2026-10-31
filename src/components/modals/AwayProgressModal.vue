<script>
import AwayProgressEntry from "@/components/modals/AwayProgressEntry";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "AwayProgressModal",
  components: {
    AwayProgressEntry,
    ModalWrapper,
  },
  props: {
    playerBefore: {
      type: Object,
      required: true,
    },
    playerAfter: {
      type: Object,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      somethingHappened: false,
    };
  },
  computed: {
    nothingHappened() {
      return Theme.current().name === "S9";
    },
    offlineStats() {
      return AwayProgressTypes.appearsInAwayModal;
    },
    headClass() {
      return {
        "c-modal-away-progress__resources": this.somethingHappened,
        "c-modal--short": true,
      };
    },
    headerText() {
      const timeDisplay = TimeSpan.fromSeconds(this.seconds).toString();
      if (this.nothingHappened || !this.somethingHappened) {
        return `While you were away for ${timeDisplay}... Nothing happened.`;
      }
      return `While you were away for ${timeDisplay}: `;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // After all the children have been loaded, check if somethingHappened - if not, give them the achievement!
      if (this.nothingHappened || !this.somethingHappened) SecretAchievement(36).unlock();
    });
  },
};
</script>

<template>
  <ModalWrapper class="c-modal-away-progress">
    <template #header>
      Offline Progress Rewards
    </template>
    <div>
      {{ headerText }}
    </div>
    <div 
      class="o-divider"
      v-if="!nothingHappened && somethingHappened"
    />
    <div
      v-if="!nothingHappened && somethingHappened"
      class="c-modal-away-progress__resources c-modal--short"
      style="margin: -1rem 0rem 1rem 0rem;"
    >
      <AwayProgressEntry
        name="antimatter"
        :player-before="playerBefore"
        :player-after="playerAfter"
        :isTableHead="true"
      />
    </div>
    <div
      v-if="!nothingHappened"
      :class="{'c-modal-away-progress__resources c-modal--short' : somethingHappened}"
    >
      <AwayProgressEntry
        v-for="name of offlineStats"
        :key="name"
        :name="name"
        :player-before="playerBefore"
        :player-after="playerAfter"
        @something-happened="somethingHappened = true"
      />
    </div>
    <div 
      class="o-divider"
      v-if="!nothingHappened && somethingHappened"
    />
    <span v-if="!nothingHappened && somethingHappened">Note: Click an entry to hide it in the future.</span>
  </ModalWrapper>
</template>

<style scoped>

.c-modal-away-progress__resources.c-modal--short {
  margin: -1rem 0;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-background) 40%, transparent) 10% 90%, transparent);
}

/*.c-modal-away-progress__resources div {
  min-width: 73rem;
  display: flex;
  border-bottom: 0.1rem solid;
  border-image: linear-gradient(90deg, transparent, currentcolor, transparent) 1;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, transparent, currentcolor 15%), transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.c-modal-away-progress__resources div > span {
  display: flex;
}

.c-modal-away-progress__resources div:nth-child(even) {
  background: linear-gradient(90deg, color-mix(in srgb, transparent, currentcolor 10%), 
  color-mix(in srgb, transparent, currentcolor 25%), 
  color-mix(in srgb, transparent, currentcolor 10%));
}

.c-modal-away-progress__resources div:last-child {
  border: none;
}*/

</style>
