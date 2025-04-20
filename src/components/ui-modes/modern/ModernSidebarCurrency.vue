<script>
export default {
  name: "ModernSidebarCurrency",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sidebarID: 0,
      resourceName: "",
      resourceValue: new Decimal(0),
      sidebarWidth:0,
    };
  },
  computed: {
    resourceDB: () => GameDatabase.sidebarResources,
    numDBEntries() {
      return this.resourceDB.length;
    },
    resource() {
      // With "default" sorting, return the latest unlocked resource - otherwise, return the specified one
      return this.sidebarID === 0
        ? this.resourceDB.filter(e => e.isAvailable()).sort((a, b) => b.id - a.id)[0]
        : this.resourceDB.find(e => e.id === this.sidebarID);
    },
    displayValue() {
      // RM + iM seems to cause strange, undesirable linebreaks
      return Pelle.transitionText(this.resource.formatValue(this.resourceValue).replace(" + ", "+"),"ERROR",Math.clamp(GameEnd.endState**2,0,1));
    }
  },
  methods: {
    update() {
      this.sidebarWidth = player.options.sidebarWidth
      this.sidebarID = player.options.sidebarResourceType[this.id];
      this.resourceName = Pelle.transitionText(this.resource.resourceName ?? this.resource.optionName,"UNDEFINED",Math.clamp(GameEnd.endState**2,0,1));
      this.resourceValue.copyFrom(this.resource.value());
    },
    cycleResource(dir) {
      const oldID = this.sidebarID;
      this.sidebarID = (this.sidebarID + this.numDBEntries + dir) % this.numDBEntries;
      while (this.sidebarID !== oldID) {
        if (this.resource.isAvailable()) break;
        this.sidebarID = (this.sidebarID + this.numDBEntries + dir) % this.numDBEntries;
      }
      player.options.sidebarResourceType[this.id] = this.sidebarID;
    },
    containerClass() {
      return {
        "c-sidebar-resource": true,
        "c-sidebar-resource-default": this.sidebarID === 0,
      };
    },
    containerStyle() {
      return {
        "height": `${7 - (this.sidebarWidth/12.8)+1}rem`,
        "padding": `${1 - (this.sidebarWidth/25.6)+.5}rem`,
      };
    },
    styleObject() {
      const strLen = this.displayValue.length;
      const ScaleRatio = this.sidebarWidth / 1.28
      return {
        transform: `scale(${strLen < Math.floor(ScaleRatio) ? 1 : (ScaleRatio / strLen)**Math.clamp(1-GameEnd.endState,0,1)})`,
      };
    }
  },
};
</script>

<template>
<div
    :class="containerClass()"
    :style="containerStyle()"
    @click.exact="cycleResource(1)"
    @click.shift.exact="cycleResource(-1)"
  >
    <h2
      :class="resource.formatClass"
      :style="styleObject()"
      v-html="displayValue"
    >
    </h2>
    <div class="c-sidebar-resource__information">
      <span class="c-sidebar-resource__name">{{ resourceName }}</span>
    </div>
  </div>
</template>

<style scoped>
.c-sidebar-resource {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 7rem;
  justify-content: center;
  align-items: center;
  background-color: var(--color-base);
  text-shadow: 0.1rem 0.1rem 0.3rem var(--color-text-inverted),-0.1rem -0.1rem 0.3rem var(--color-text-inverted);
  box-shadow: var(--box-shadow);
  background: linear-gradient(-90deg, transparent,var(--color-accent) 400%),var(--leg-base-render);
  border-right: 0.1rem solid var(--color-accent);
  border-bottom: 0.1rem solid var(--color-accent);
  padding: 1rem;
  user-select: none;
  font-style: italic;
  line-height: normal;
  overflow: hidden;
}
.c-modern-sidebar-switched > .c-sidebar-resource {
  border-right: none;
  border-left: 0.1rem solid var(--color-accent)
}
.c-sidebar-resource-default {
  box-shadow: var(--box-shadow), 0 0 0 0.3rem var(--color-accent) inset;
}
.c-sidebar-resource:last-child {
  border-bottom-right-radius: var(--var-border-radius, 0.5rem);
}
.c-sidebar-resource h2 {
  z-index: 1;
  font-size: 1.8rem;
  margin: 0;
}
.t-dark .c-sidebar-resource h2,
.t-dark-metro .c-sidebar-resource h2 {
  text-shadow: 0 0 0.1rem rgba(0, 0, 0, 50%), -0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 80%);
}
.c-sidebar-resource__information {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.5rem;
  color: var(--color-text);
}
.c-sidebar-resource__name {
  font-size: 1.4rem;
  font-family: cambria;
  font-weight: bold;
  font-style: normal;
}
.o-sidebar-currency--antimatter {
  color: black;
}
.t-normal .o-sidebar-currency--antimatter,
.t-legacy .o-sidebar-currency--antimatter,
.t-legendary .o-sidebar-currency--antimatter,
.t-hex .o-sidebar-currency--antimatter,
.t-s14 .o-sidebar-currency--antimatter,
.t-s15 .o-sidebar-currency--antimatter {
  color: var(--color-accent);
}
.t-dark .o-sidebar-currency--antimatter,
.t-amoled .o-sidebar-currency--antimatter,
.t-s6 .o-sidebar-currency--antimatter,
.t-s10 .o-sidebar-currency--antimatter {
  animation: a-game-header__antimatter--glow 25s infinite;
}
.t-s11 .o-sidebar-currency--antimatter {
  animation: a-game-header__antimatter--glow-blob 25s infinite;
}
.t-dark-metro .o-sidebar-currency--antimatter,
.t-amoled-metro .o-sidebar-currency--antimatter,
.t-legendary-metro .o-sidebar-currency--antimatter {
  color: #e0e0e0;
}
.o-sidebar-currency--infinity {
  color: var(--color-infinity);
}
.o-sidebar-currency--replicanti {
  color: var(--color-replicanti);
}
.o-sidebar-currency--eternity {
  color: var(--color-eternity);
}
.o-sidebar-currency--dilation {
  color: var(--color-dilation);
}
.o-sidebar-currency--reality {
  color: var(--color-reality);
}
.o-sidebar-currency--effarig {
  color: var(--color-effarig--base);
}
.o-sidebar-currency--v {
  color: var(--color-v--base);
}
.o-sidebar-currency--ra {
  color: var(--color-ra--base);
}
.o-sidebar-currency--laitela {
  color: var(--color-laitela--base);
  text-shadow: 0.1rem 0.1rem 0.1rem var(--color-laitela--accent), 0.1rem -0.1rem 0.1rem var(--color-laitela--accent), -0.1rem 0.1rem 0.1rem var(--color-laitela--accent), -0.1rem -0.1rem 0.1rem var(--color-laitela--accent) !important;
}
.o-sidebar-currency--pelle {
  color: var(--color-pelle--base);
}
</style>
