<script>
import NormalAchievement from "./NormalAchievement";

export default {
  name: "NormalAchievementRow",
  components: {
    NormalAchievement
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    isObscured: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isCompleted: false,
      isHidden: false,
      styleOfRowBg: undefined
    };
  },
  computed: {
    classObject() {
      return {
        "l-achievement-grid__row": true,
        "c-achievement-grid__row--completed": this.isCompleted
      };
    },
    isPreRealityAchievement() {
      return PlayerProgress.realityUnlocked() && this.row <= 13;
    },
  },
  created() {
    this.on$(GAME_EVENT.ACHIEVEMENT_UNLOCKED, () => this.setStyleOfRowBg());
    this.setStyleOfRowBg()
  },
  methods: {
    update() {
      this.isCompleted = this.row.every(a => a.isUnlocked);
      this.isHidden = this.isCompleted && player.options.hideCompletedAchievementRows;
    },
    getRowColor(location) {
      if (location.isDisabled) return `#ed143d60`;
      if (location.isUnlocked) return `${Theme.isDark?"#406b5c80":"#183b2de6"}`;
      if (!location.isUnlocked && (location.isPreReality&&PlayerProgress.realityUnlocked()) && !location.isDisabled) return "#acac3960";
      return "transparent";
    },
    setStyleOfRowBg() {
      this.styleOfRowBg = {
        background:
          `linear-gradient(to right,
          ${this.getRowColor(this.row[0])} 7.5%,
          ${this.getRowColor(this.row[1])} 17.5% 20%,
          ${this.getRowColor(this.row[2])} 30% 32.5%,
          ${this.getRowColor(this.row[3])} 42.5% 45%,
          ${this.getRowColor(this.row[4])} 55% 57.5%,
          ${this.getRowColor(this.row[5])} 67.5% 70%,
          ${this.getRowColor(this.row[6])} 80% 82.5%,
          ${this.getRowColor(this.row[7])} 92.5% 100%)`
      };
    },
  }
};
</script>

<template>
  <div
    v-if="!isHidden"
    :class="classObject"
    :style="styleOfRowBg"
  >
    <normal-achievement
      v-for="(achievement, i) in row"
      :key="i"
      :achievement="achievement"
      :is-obscured="isObscured"
      class="l-achievement-grid__cell"
    />
  </div>
</template>
