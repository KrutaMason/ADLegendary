<script>
export default {
  name: "RaUpgradeIcon",
  props: {
    unlock: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      level: 0,
      description: "",
      wobbly: false,
    };
  },
  computed: {
    petID() {
      return this.unlock.pet.id;
    },
    petName() {
      return this.unlock.pet.name;
    },
    upgradeName() {
      return this.unlock.name;
    },
    icon() {
      return this.unlock.displayIcon;
    },
    classObject() {
      return {
        "c-ra-upgrade-icon": true,
        "c-ra-upgrade-icon--inactive": !this.isUnlocked,
        [`c-ra-upgrade-icon--${this.petID}`]: true,
        "a-wobble": this.wobbly
      };
    },
    isUseless() {
      return this.unlock.disabledByPelle;
    }
  },
  methods: {
    update() {
      const unlock = this.unlock;
      this.isUnlocked = unlock.isUnlocked;
      this.level = unlock.level;
      this.description = unlock.reward;
      this.wobbly = player.options.animations.wobbly
    },
    hover() {
      AudioManagement.playSound("click_hover")
    }
  }
};
</script>

<template>
  <div :class="classObject"  @mouseenter="hover()">
    <div
      v-html="icon"
    />
    <div class="c-ra-pet-upgrade__tooltip">
      <div class="c-ra-pet-upgrade__tooltip__name">
        {{ petName }} Level <span :class="diffFont(level)">{{ formatInt(level) }}</span>
      </div>
      <div class="c-ra-pet-upgrade__tooltip__description"><span v-html="icon"/> {{ upgradeName }} <span v-html="icon"/></div>
      <div
        class="c-ra-pet-upgrade__tooltip__description"
        :class="{ 'o-pelle-disabled': isUseless }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-ra-upgrade-icon {
  font-weight: bold;
}
</style>
