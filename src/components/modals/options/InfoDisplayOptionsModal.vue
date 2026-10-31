<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "InfoDisplayOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
  },
  data() {
    return {
      infinityUnlocked: false,
      eternityUnlocked: false,
      realityUnlocked: false,
      alchemyUnlocked: false,
      perkShopUnlocked:false,

      showPercentage: false,
      achievements: false,
      achievementUnlockStates: false,
      challenges: false,
      challengeStats: false,
      studies: false,
      glyphEffectDots: false,
      realityUpgrades: false,
      perks: false,
      perkShop: false,
      alchemy: false,
    };
  },
  computed: {
    fullCompletion() {
      return player.records.fullGameCompletions > 0;
    },
    realityUpgradeInfo() {
      if (MachineHandler.isIMUnlocked) return `Displays the unique names over the Reality Upgrades; 
      Imaginary Upgrades are also affected by this option`;
      return "Displays the unique names over the Reality Upgrades"
    }
  },
  watch: {
    showPercentage(newValue) {
      player.options.showHintText.showPercentage = newValue;
    },
    achievements(newValue) {
      player.options.showHintText.achievements = newValue;
    },
    achievementUnlockStates(newValue) {
      player.options.showHintText.achievementUnlockStates = newValue;
    },
    challenges(newValue) {
      player.options.showHintText.challenges = newValue;
    },
    challengeStats(newValue) {
      player.options.showHintText.challengeStats = newValue;
    },
    studies(newValue) {
      player.options.showHintText.studies = newValue;
    },
    glyphEffectDots(newValue) {
      player.options.showHintText.glyphEffectDots = newValue;
    },
    realityUpgrades(newValue) {
      player.options.showHintText.realityUpgrades = newValue;
    },
    perks(newValue) {
      player.options.showHintText.perks = newValue;
    },
    perkShop(newValue) {
      player.options.showHintText.perkShop = newValue;
    },
    alchemy(newValue) {
      player.options.showHintText.alchemy = newValue;
    },
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.infinityUnlocked = this.fullCompletion || progress.isInfinityUnlocked;
      this.eternityUnlocked = this.fullCompletion || progress.isEternityUnlocked;
      this.realityUnlocked = this.fullCompletion || progress.isRealityUnlocked;
      this.perkShopUnlocked = TeresaUnlocks.shop.isUnlocked;
      this.alchemyUnlocked = this.fullCompletion || Ra.unlocks.effarigUnlock.canBeApplied;

      const options = player.options.showHintText;
      this.showPercentage = options.showPercentage;
      this.achievements = options.achievements;
      this.achievementUnlockStates = options.achievementUnlockStates;
      this.challenges = options.challenges;
      this.challengeStats = options.challengeStats;
      this.studies = options.studies;
      this.glyphEffectDots = options.glyphEffectDots;
      this.realityUpgrades = options.realityUpgrades;
      this.perks = options.perks;
      this.perkShop = options.perkShop;
      this.alchemy = options.alchemy;
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      Info Display Options
    </template>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-model="showPercentage"
        text="Show % gain:"
        v-tooltip="`Show the increase in dimensions in percentages every second`"
      />
      <ModalOptionsToggleButton
        v-model="achievements"
        text="Achievement IDs:"
        v-tooltip="`Display IDs over the achievements; Ordered in rows and columns`"
      />
      <ModalOptionsToggleButton
        v-model="achievementUnlockStates"
        text="Achievement unlock state indicators:"
        v-tooltip="`Add icons to the achievements based on their current states; Adds accessibility`"
      />
      <ModalOptionsToggleButton
        v-if="infinityUnlocked"
        v-model="challenges"
        text="Challenge IDs:"
        v-tooltip="`Display IDs for challenges`"
      />
      <ModalOptionsToggleButton
        v-if="infinityUnlocked"
        v-model="challengeStats"
        text="Challenge completion statistics:"
        v-tooltip="`Display extra statistics for completing challenges`"
      />
      <ModalOptionsToggleButton
        v-if="eternityUnlocked"
        v-model="studies"
        text="Time Study IDs:"
        v-tooltip="`Display IDs under Time Studies; Helpful for tree sets and makes the guides 
        more understandable`"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="glyphEffectDots"
        text="Diacritic dots:"
        v-tooltip="`Display dots that represent individual diacritics in the glyph`"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="realityUpgrades"
        text="Reality Upgrade names:"
        v-tooltip="realityUpgradeInfo"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="perks"
        text="Perk IDs:"
        v-tooltip="`Display IDs under the Perk nodes`"
      />
      <ModalOptionsToggleButton
        v-if="perkShopUnlocked"
        v-model="perkShop"
        text="Perk Shop Levels:"
        v-tooltip="`Display the levels under the Perk Shop upgrades`"
      />
      <ModalOptionsToggleButton
        v-if="alchemyUnlocked"
        v-model="alchemy"
        text="Alchemy resource amounts:"
        v-tooltip="`Display counters under Glyph Alchemy resources`"
      />
    </div>
    Note: All types of additional info above will always display when holding shift.
  </ModalWrapperOptions>
</template>
