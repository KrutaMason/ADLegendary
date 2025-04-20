<script>
import SecretAchievement from "./SecretAchievement";

export default {
  name: "SecretAchievementRow",
  components: {
    SecretAchievement
  },
  props: {
    row: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isCompleted: false,
      styleOfRowBg: undefined
    };
  },
  computed: {
    classObject() {
      return {
        "l-achievement-grid__row": true,
        "c-achievement-grid__row--completed": this.isCompleted
      };
    }
  },
  created() {
    this.on$(GAME_EVENT.ACHIEVEMENT_UNLOCKED, () => this.setStyleOfRowBg());
    this.setStyleOfRowBg()
  },
  methods: {
    update() {
      this.isCompleted = this.row.every(a => a.isUnlocked);
      this.setStyleOfRowBg()
    },
    getRowColor(location) {
      if (location.isUnlocked) return `${Theme.isDark?"#406b5c80":"#183b2de6"}`;
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
  <div :class="classObject" :style="styleOfRowBg">
    <SecretAchievement
      v-for="(achievement, i) in row"
      :key="i"
      :achievement="achievement"
      class="l-achievement-grid__cell"
    />
  </div>
</template>
