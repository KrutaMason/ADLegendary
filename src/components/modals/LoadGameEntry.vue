<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "LoadGameEntry",
  components: {
    PrimaryButton
  },
  props: {
    saveId: {
      type: Number,
      required: true
    },
    input: {
      type: String,
      required: false
    }
  },
  data() {
    const save = this.saveId === -1 ? GameSaveSerializer.deserialize(this.input) : GameStorage.saves[this.saveId];
    return {
      antimatter: new Decimal(save ? save.antimatter || save.money : 10),
      fileName: save ? "" || save.options.saveFileName : "",
      gameCreatedTime: save ? save.lastUpdate - save.totalTimePlayed * 100 || save.records.gameCreatedTime : 0,
      playtime: save ? Date.now() - save.lastUpdate + save.totalTimePlayed * 100 || save.records.realTimePlayed : 0,
      achievementCount: save ? (save.achievementBits ? save.achievementBits.map(b => countValuesFromBitmask(b)).sum() : 0) : 0,
      secretAchievementCount: save ? (save.secretAchievementBits ? save.secretAchievementBits.map(b => countValuesFromBitmask(b)).sum() : 0) : 0,
      isinSpeedrun: save ? (save.speedrun ? save.speedrun.isActive : false) : false,
    };
  },
  computed: {
    isEmptySlot() {
      const save = this.saveId === -1 ? GameSaveSerializer.deserialize(this.input) : GameStorage.saves[this.saveId]
      if (save) return false;
      return true;
    },
    player() {
      if (this.saveId === -1) return GameSaveSerializer.deserialize(this.input)
      return GameStorage.saves[this.saveId]
    },
    isSelected() {
      return GameStorage.currentSlot === this.saveId;
    },
    totalAchievements: () => Achievements.all.length,
    gameMode() {
      let name = true ? "Legendary" : "Classic"
      if (this.isinSpeedrun) name += " Speedrun"
      return name
    },
    startDate() {
      if (this.isEmptySlot) return "Empty Slot";
      return Time.toDateTimeString(this.gameCreatedTime);
    },
  },
  created() {
    if (this.player && this.player.version < 13) {
      this.achievementCount = this.convertAchievements(false).map(b => countValuesFromBitmask(b)).sum()
      this.secretAchievementCount = this.convertAchievements(true).map(b => countValuesFromBitmask(b)).sum()
    }
  },
  methods: {
    load() {
      GameStorage.loadSlot(this.saveId);
    },
    formatAntimatter(antimatter) {
      return formatPostBreak(antimatter, 2, 1);
    },
    formatPlaytime() {
      if (this.playtime === 0) return "";
      return TimeSpan.fromMilliseconds(this.playtime).toStringShort(true, true)
    },
    lastOpened() {
      const ms = Date.now() - this.player.lastUpdate;
      if (this.isSelected) return;
      return this.player.lastUpdate > Date.now()
        ? `${TimeSpan.fromMilliseconds(-ms).toString()} in the future`
        : `Last opened: ${TimeSpan.fromMilliseconds(ms).toString()} ago`;
    },
    update() {
      if (this.isSelected) {
        this.antimatter.copyFrom(Currency.antimatter);
        this.gameCreatedTime = this.player.records.gameCreatedTime;
        this.playtime = this.player.records.realTimePlayed;
        this.achievementCount = this.player.achievementBits.map(b => countValuesFromBitmask(b)).sum();
        this.secretAchievementCount = this.player.secretAchievementBits.map(b => countValuesFromBitmask(b)).sum();
        this.isinSpeedrun = this.player.speedrun.isActive;
      }
    },
    convertAchievements(secret) {
      // This whole method is borrowed from migration.js. I wanted to show the correct count on older saves.
      let preRealityAchievements = this.player.achievements
      let preSecretRealityAchievements = new Set();
      let achievementBits = Array.repeat(0, 18);
      let secretAchievementBits = Array.repeat(0, 4);
      this.player.realities = 0;
      const swaps = { "4,3": "6,4", "6,4": "7,7", "7,7": "4,3",
      "10,1": "11,7", "11,7": "10,1", "11,3": "12,4", "12,4": "11,3" };
      if (this.player && this.player.version < 9) {
        preRealityAchievements = new Set(preRealityAchievements)
        const achs = [];
        if (preRealityAchievements.delete("r22")) achs.push("r35");
        if (preRealityAchievements.delete("r35")) achs.push("r76");
        if (preRealityAchievements.delete("r41")) achs.push("r22");
        if (preRealityAchievements.delete("r76")) achs.push("r41");
        for (const id of achs) preRealityAchievements.add(id);
      }
      if (this.player && this.player.version < 12.1) {
        preRealityAchievements = Array.from(preRealityAchievements)
        for (const achievement of preRealityAchievements) {
        if (achievement.includes("s") && achievement.length <= 3) {
          preRealityAchievements.splice(preRealityAchievements.indexOf("r36"), 1);
          break;
        }
      }
      }
      if (this.player && this.player.version < 13) {
        if (preRealityAchievements.length > 0 && preRealityAchievements.every(e => typeof e === "number")) return;
        const old = preRealityAchievements;
        // In this case, player.secretAchievements should be an empty set
        preRealityAchievements = new Set();
        preSecretRealityAchievements = new Set();
        for (const oldId of old) {
          const achByName = GameDatabase.achievements.normal.find(a => a.name === oldId);
          if (achByName !== undefined) {
          // Legacy format
          preRealityAchievements.add(achByName.id);
          continue;
        }
        const newId = parseInt(oldId.slice(1), 10);
        if (isNaN(newId)) throw new Error(`Could not parse achievement id ${oldId}`);
        if (oldId.startsWith("r")) {
          if (GameDatabase.achievements.normal.find(a => a.id === newId) === undefined) {
            throw new Error(`Unrecognized achievement ${oldId}`);
          }
          preRealityAchievements.add(newId);
        } else if (oldId.startsWith("s")) {
          if (GameDatabase.achievements.secret.find(a => a.id === newId) === undefined) {
            throw new Error(`Unrecognized secret achievement ${newId}`);
          }
          preSecretRealityAchievements.add(newId);
        }
        }
      }
      if (this.player && this.player.version < 13) {
        const convertAchievementArray = (newAchievements, oldAchievements, isSecret) => {
          for (const oldId of oldAchievements) {
          let row = Math.floor(oldId / 10);
          let column = oldId % 10;
          if (!isSecret && [row, column].join(",") in swaps) {
            [row, column] = swaps[[row, column].join(",")].split(",");
          }
          newAchievements[row - 1] |= (1 << (column - 1));
        }
        // Handle the changed achievement "No DLC Required" correctly (otherwise saves could miss it).
        if (!isSecret && (new Set(this.player.infinityUpgrades).size >= 16 
        || new Decimal(this.player.eternities).gt(0) 
        || this.player.realities > 0)) {
          newAchievements[3] |= 1;
        } else {
          newAchievements[3] &= ~1;
        }

        // "Professional Bodybuilder" (s38) was changed and shouldn't be migrated
        if (isSecret) {
         newAchievements[2] &= ~128;
        }
        };
        convertAchievementArray(achievementBits, preRealityAchievements, false);

        convertAchievementArray(secretAchievementBits, preSecretRealityAchievements, true);
      }
      return secret ? secretAchievementBits : achievementBits
    }
  },
};
</script>

<template>
  <div class="l-modal-options__save-record">
    <h3 class="c-modal-options__save-record--section c-modal-options__save-record--slot">
      <div v-if="saveId > -1">
        Slot #{{ saveId + 1 }} <span v-if="isSelected"> (selected)</span>
      </div>
      <div v-if="!isEmptySlot">
        {{ gameMode }}
      </div>
      <div>{{ startDate }}</div>
    </h3>
    <div 
      v-if="isEmptySlot"
    >
      <h1>EMPTY</h1>
    </div>
    <div 
      v-else
    >
      <span v-if="fileName">{{ fileName }}</span>
      <div>
        <i class="fas fa-trophy"/> 
        {{ formatInt(achievementCount) }}  / {{ formatInt(totalAchievements) }} 
        (+{{ formatInt(secretAchievementCount) }})
      </div>
      <div>Antimatter: {{ formatAntimatter(antimatter) }}</div>
      <div>{{ formatPlaytime() }}</div>
      <slot/>
    </div>
    <PrimaryButton
      v-if="saveId >= 0"
      class="o-primary-btn--width-medium"
      :class="{'c-modal__confirm-btn' : isSelected}"
      @click="load"
    >
      {{ isEmptySlot ? "New Save" : "Load" }}
    </PrimaryButton>
  </div>
</template>
<style scoped>
.c-modal-options__save-record--section {
  width: 100%;
  display: flex;
}

.c-modal-options__save-record--slot {
  border-bottom: 0.1rem dashed var(--color-accent);
  border-radius: var(--var-border-radius, 0.9rem) var(--var-border-radius, 0.9rem) 0 0;
  background: linear-gradient(90deg, var(--color-accent) -100%, transparent 125%);
  padding: 0.5rem 1rem;
  align-items: center;
}

.c-modal-options__save-record--section div {
  width: 100%;
  flex: 1;
}
</style>