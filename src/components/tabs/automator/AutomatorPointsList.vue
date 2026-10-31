<script>
export default {
  name: "AutomatorPointsList",
  data() {
    return {
      totalPoints: 0,
    };
  },
  computed: {
    pointsForAutomator: () => AutomatorPoints.pointsForAutomator,
    fromPerks: () => AutomatorPoints.pointsFromPerks,
    fromUpgrades: () => AutomatorPoints.pointsFromUpgrades,
    perkSources: () => AutomatorPoints.perks,
    upgradeSources: () => AutomatorPoints.upgrades,
    otherSources: () => GameDatabase.reality.automator.otherAutomatorPoints,
    automatorInterval: () => AutomatorBackend.currentInterval,
  },
  methods: {
    update() {
      this.totalPoints = AutomatorPoints.totalPoints;
    },
    textColor(hasBought, hasTop = true) {
      let color = hasBought ? Theme.current().isDark() ? "var(--color-good)" : "var(--color-good-dark)" : "var(--color-bad)"
      return {
        color,
        "border-bottom" : "1px solid",
        "border-top" : hasTop ? "1px solid" : "",
        "border-image" : `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 50%, transparent) 10%, transparent) 1`,
        background : `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 25%, transparent) 10%, transparent)`
      };
    }
  }
};
</script>

<template>
  <div class="l-automator-points-container">
    <div class="l-header">
      You have 
        <span :class="diffFont(totalPoints)">
          {{ formatInt(totalPoints) }}
        </span> /
        <span :class="diffFont(pointsForAutomator)">
          {{ formatInt(pointsForAutomator) }}
        </span>
      Automator Points towards unlocking the Automator.
      <br>
      You gain Automator Points from the following sources:
    </div>
    <div class="l-automator-points-list-container">
      <div class="l-automator-points-list-side-col c-automator-points-list-col">
        <span class="c-automator-points-list-symbol fas fa-project-diagram" />
        <span class="c-automator-points-list-ap--large">
          <span :class="diffFont(fromPerks)">
            {{ formatInt(fromPerks) }}
          </span>
           AP
        </span>
        <span class="l-large-text">
          Perks
        </span>
        <div
          v-for="perk in perkSources"
          :key="perk.id"
          class="c-automator-points-list-single-entry"
          :style="textColor(perk.isBought, perk.id == 14 ? true : false)"
        >
          <span class="c-automator-points-list-perk-label">{{ perk.label }}</span>
          - {{ perk.shortDescription }}
          <span class="c-automator-points-list-ap">{{ formatInt(perk.automatorPoints) }} AP</span>
        </div>
      </div>
      <div class="l-automator-points-list-center-col">
        <div
          v-for="source in otherSources"
          :key="source.name"
          class="c-automator-points-list-cell"
        >
          <span class="c-automator-points-list-ap--large">
            <span :class="diffFont(source.automatorPoints())">
              {{ formatInt(source.automatorPoints()) }}
            </span>
             AP
          </span>
          <span class="l-large-text">
            {{ source.name }}
          </span>
          <br>
          <br>
          <span 
          style="display: block; width: 100%"
          :style="textColor(source.automatorPoints() > 0)">
            {{ source.shortDescription() }}
          </span>
          <span
            class="c-automator-points-list-symbol"
            v-html="source.symbol"
          />
        </div>
      </div>
      <div class="l-automator-points-list-side-col c-automator-points-list-col">
        <span class="c-automator-points-list-symbol fas fa-arrow-up" />
        <span class="c-automator-points-list-ap--large">
          <span :class="diffFont(fromUpgrades)">
            {{ formatInt(fromUpgrades) }}
          </span>
           AP
        </span>
        <span class="l-large-text">
          Reality Upgrades
        </span>
        <div
          v-for="upgrade in upgradeSources"
          :key="upgrade.id"
          class="c-automator-points-list-single-entry l-upgrade-list"
          :style="textColor(upgrade.isBought)"
        >
          <b style="font-family: var(--var-secondary-font); font-size:1.7rem; line-height: 1.1;">{{ upgrade.name }}</b>
          <span class="c-automator-points-list-ap">{{ formatInt(upgrade.automatorPoints) }} AP</span>
          <br>
          {{ upgrade.shortDescription }}
          <span class="c-automator-points-list-ap"><i class="fas fa-check" v-if="upgrade.isBought"/></span>
        </div>
      </div>
    </div>
    <div class="l-infos">
      The Automator allows (amongst other things) buying full Time Study Trees, entering Eternity Challenges,
      or starting Dilation.
      <br>
      It can also force prestige events on certain conditions independently from your Autobuyers or modify
      some of your Autobuyer settings.
      <br>
      The speed of the Automator gradually increases as you get more Realities. If unlocked right now,
      it would run {{ format(1000 / automatorInterval, 2, 2) }} commands per real-time second.
    </div>
  </div>
</template>

<style scoped>
.l-automator-points-container {
  color: var(--color-text);
  background-image: var(--leg-base-render);
  box-shadow: var(--var-box-shadow, 0 0 2rem var(--color-background) inset);
  border: 1.2rem solid;
  border-image-source: url(../../../../public/images/frames/automation-light.png);
  border-image-repeat: round;
  border-image-slice: 12;
  padding: 1rem
}
.s-base--metro .l-automator-points-container  {
  border: 0.3rem solid;
  border-image-slice: 3;
}
.s-base--dark .l-automator-points-container {
  background-image: var(--leg-base-render);
  border-image-source:url(../../../../public/images/frames/automation.png);
  background-position: center;
}
.l-automator-points-list-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0rem;
  -webkit-user-select: none;
  user-select: none;
}

.c-automator-points-list-col {
  position: relative;
  text-align: left;
  border: 0.4rem double color-mix(in srgb, var(--color-reality) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  background: linear-gradient(transparent, var(--color-reality) 500%);
  background-origin: border-box;
  padding: 1rem;
}

.l-automator-points-list-side-col {
  display: flex;
  flex-direction: column;
  width: 35%;
  justify-content: space-between;
}

.l-automator-points-list-center-col {
  display: flex;
  flex-direction: column;
  width: calc(30% - 2rem);
  justify-content: space-between;
}

.c-automator-points-list-cell {
  overflow: hidden;
  width: 100%;
  height: calc(50% - 0.5rem);
  position: relative;
  text-align: left;
  border: 0.4rem double color-mix(in srgb, var(--color-reality) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  background: linear-gradient(transparent, var(--color-reality) 500%);
  background-origin: border-box;
  padding: 1rem;
}

.c-automator-points-list-symbol {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 15rem;
  opacity: 0.2;
  text-shadow: 0 0 2rem;
  pointer-events: none;
  color: var(--color-reality);
}

.c-automator-points-list-perk-label {
  display: inline-block;
  width: 3rem;
  max-width: 3rem;
  font-weight: bold;
  font-style: italic;
}

.c-automator-points-list-single-entry {
  position: relative;
}

.c-automator-points-list-ap {
  position: absolute;
  right: 0;
  opacity: 0.8;
}

.c-automator-points-list-ap--large {
  position: absolute;
  right: 1rem;
  font-size: 2rem;
  font-family: var(--var-secondary-font);
  font-weight: bold;
  opacity: 0.6;
}

.l-header {
  font-size: 2rem;
  border: 0.4rem double color-mix(in srgb, var(--color-reality) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  background: linear-gradient(transparent, var(--color-reality) 500%);
  background-origin: border-box;
  font-family: var(--var-secondary-font);
  font-weight: bold;
}

.l-large-text {
  font-size: 2rem;
  font-family: var(--var-secondary-font);
  font-weight: bold;
}

.l-upgrade-list {
  font-size: 1.3rem;
}

.l-infos {
  border: 0.4rem double color-mix(in srgb, var(--color-reality) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  background: linear-gradient(transparent, var(--color-reality) 500%);
  background-origin: border-box;
  padding: 0.5rem;
}
</style>
