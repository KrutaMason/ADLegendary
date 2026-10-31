<script>
export default {
  name: "ModernTabButton",
  props: {
    tab: {
      type: Object,
      required: true
    },
    tabPosition: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      isHidden: false,
      subtabVisibilities: [],
      showSubtabs: false,
      hasNotification: false,
      tabName: ""
    };
  },
  computed: {
    classObject() {
      return {
        "o-tab-btn": true,
        "o-tab-btn--modern-tabs": true,
        "o-tab-btn--subtabs": this.showSubtabs,
        "o-tab-btn--active": this.isCurrentTab && Theme.currentName() !== "S9"
      };
    },
    isCurrentTab() {
      return this.tab.isOpen;
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.isHidden = this.tab.isHidden;
      this.subtabVisibilities = this.tab.subtabs.map(x => x.isAvailable);
      this.showSubtabs = this.isAvailable && this.subtabVisibilities.length >= 1;
      this.hasNotification = this.tab.hasNotification;
      if (this.tabPosition < Pelle.endTabNames.length) {
        this.tabName = Pelle.transitionText(
          this.tab.name,
          Pelle.endTabNames[this.tabPosition],
          Math.clamp(GameEnd.endState - (this.tab.id % 4) / 10, 0, 1)
        );
      } else {
        this.tabName = this.tab.name;
      }
    },
    isCurrentSubtab(id) {
      return player.options.lastOpenSubtab[this.tab.id] === id && Theme.currentName() !== "S9";
    },
    hover(s=false) {
      AudioManagement.playSound("click_hover",undefined,s?1.1:undefined)
    }
  },
};
</script>

<template>
  <div
    v-if="!isHidden && isAvailable"
    :class="[classObject, tab.config.UIClass]"
    @mouseenter="hover()"
  >
    <div
      class="l-tab-btn-inner"
      @click="tab.show(true)"
    >
      {{ tabName }}
      <div
        v-if="hasNotification"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </div>
    <div
      v-if="showSubtabs"
      class="subtabs"
    >
      <template
        v-for="(subtab, index) in tab.subtabs"
      >
        <div
          v-if="subtabVisibilities[index]"
          :key="index"
          class="o-tab-btn o-tab-btn--subtab"
          :class="
            [tab.config.UIClass,
             {'o-subtab-btn--active': isCurrentSubtab(subtab.id)}]
          "
          @mouseenter="hover(true)"
          @click="subtab.show(true)"
        >
          <span v-html="subtab.symbol" />
          <div
            v-if="subtab.hasNotification"
            class="fas fa-circle-exclamation l-notification-icon"
          />
          <div class="o-subtab__tooltip">
            {{ subtab.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.o-tab-btn::before {
  content: "";
  width: 0;
  height: 100%;
  position: absolute;
  left: 0;
  --maths: calc(var(--sidebar-width) - 12.8rem);
  --color-active:var(--color-accent);
  background-image: url(../../../../public/images/visuals/active_tab.png),
  linear-gradient(90deg,var(--color-active) 50%,transparent);
  background-position-x: calc(-16px + var(--maths) / 8), 0;
  transition: width 0.15s;
}
.c-modern-sidebar-switched > .c-modern-sidebar--sub  > .o-tab-btn::before {
  left: unset;
  background-image: url(../../../../public/images/visuals/active_tab.png),
  linear-gradient(-90deg,var(--color-active) 50%,transparent);
  background-position-x: -32px, 0;
  right:0
}
.o-tab-btn--active::before {
  width: calc(var(--sidebar-width) / 8);
}

.o-tab-btn--infinity::before {
  --color-active: var(--color-infinity);
}

.o-tab-btn--eternity::before {
  --color-active: var(--color-eternity);
}

.o-tab-btn--reality::before {
  --color-active: var(--color-reality);
}

.o-tab-btn--celestial::before {
  --color-active: var(--color-celestials);
}
.o-tab-btn--armageddon::before {
  --color-active: var(--color-pelle--base);
}
.o-subtab-btn--active {
  border-bottom-width: 0.5rem;
}

.o-tab-btn--subtab:first-child {
  border-top-left-radius: var(--var-border-radius, 0.5rem);
  border-bottom-left-radius: var(--var-border-radius, 0.5rem);
  transition: border-radius 0s;
}

.o-tab-btn--subtab:last-child {
  border-top-right-radius: var(--var-border-radius, 0.5rem);
  border-bottom-right-radius: var(--var-border-radius, 0.5rem);
  transition: border-radius 0s;
}
</style>
