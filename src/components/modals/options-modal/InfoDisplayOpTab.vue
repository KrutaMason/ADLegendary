<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import OptionsModalSet from "@/components/OptionsModalSet"

export default {
  name: "InfoDisplayOpTab",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    OptionsModalSet,
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
  <div>
    <div class="c-optionmodal--section-name">Info Display</div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="`Show the increase in dimensions in percentages every second`"
    >
      <template #label>Show % gain</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="showPercentage"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display IDs over the achievements; Ordered in rows and columns`"
    >
      <template #label>Achievement IDs</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="achievements"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Add icons to the achievements based on their current states; Adds accessibility`"
    >
      <template #label>Achievement unlock state indicators</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="achievementUnlockStates"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display IDs for challenges`"
      v-if="infinityUnlocked"
    >
      <template #label>Challenge IDs</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="challenges"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display extra statistics for completing challenges`"
      v-if="infinityUnlocked"
    >
      <template #label>Challenge completion statistics</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="challengeStats"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display IDs under Time Studies; Helpful for tree sets and makes the guides more understandable`"
      v-if="eternityUnlocked"
    >
      <template #label>Time Study IDs</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="studies"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display dots that represent individual diacritics in the glyph`"
      v-if="realityUnlocked"
    >
      <template #label>Diacritic dots</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="glyphEffectDots"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="realityUpgradeInfo"
      v-if="realityUnlocked"
    >
      <template #label>Reality Upgrade names</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="realityUpgrades"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display IDs under the Perk nodes`"
      v-if="realityUnlocked"
    >
      <template #label>Perk IDs</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="perks"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display the levels under the Perk Shop upgrades`"
      v-if="perkShopUnlocked"
    >
      <template #label>Perk Shop levels</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="perkShop"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Display counters under Glyph Alchemy resources`"
      v-if="alchemyUnlocked"
    >
      <template #label>Alchemy resource amounts</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn--optionmodal"
          v-model="alchemy"
          text=""
        />
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section">
      <div class="l-optionmodal--option c-optionmodal--option l-optionmodal--option-info">
        Note: All types of additional info above will always display when holding shift.
      </div>
    </div>
  </div>
</template>