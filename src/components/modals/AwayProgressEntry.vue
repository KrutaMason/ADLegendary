<script>
export default {
  name: "AwayProgressEntry",
  props: {
    name: {
      type: String,
      required: true
    },
    playerBefore: {
      type: Object,
      required: true
    },
    playerAfter: {
      type: Object,
      required: true
    },
    isTableHead: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      removed: false,
    };
  },
  computed: {
    item() {
      return AwayProgressTypes.all[this.name];
    },
    before() {
      return this.item.navigateTo(this.playerBefore);
    },
    after() {
      return this.item.navigateTo(this.playerAfter);
    },
    formatBefore() {
      return this.formatPseudo(this.before);
    },
    formatAfter() {
      return this.formatPseudo(this.after);
    },
    classObject() {
      return {
        "c-modal-away-progress__head": this.isTableHead,
        "c-modal-away-progress__flex": this.isBlackHole,
        [this.item.classObject]: !this.removed && !this.isTableHead,
        "c-modal-away-progress__disabled": this.removed && !this.isTableHead,
      };
    },
    formattedName() {
      return this.item.formatName;
    },
    increased() {
      // If they would visually display as the same number, they shouldn't be treated as if they increased
      if (this.formatAfter === this.formatBefore) return false;
      // Both Decimals and numbers may be passed in. This code handles both.
      const before = this.before;
      const after = this.after;

      return after instanceof Decimal
        ? after.gt(before)
        : after > before;
    },
    gain() {
      if (this.formatAfter === this.formatBefore) return 0;
      const before = new Decimal(this.before);
      const after = new Decimal(this.after);

      if (this.isVeryLarge) return Math.floor(after.log10()) - Math.floor(before.log10());
      if (before.gte(1e15) && after.gte(before.times(11))) return after.div(before);
      if (before.gte(1e15)) return (after.sub(before)).div(before).times(100);
      if (Decimal.lt(after.sub(before), 1e9)) Decimal.floor(after.sub(before));
      return after.sub(before)
    },
    formatGain() {
      const before = new Decimal(this.before);
      const after = new Decimal(this.after);
      const gain = Decimal.max(this.gain, 0);

      if (this.isVeryLarge) return `+${formatInt(gain)}`;
      if (before.gte(1e15) && after.gte(before.times(11))) return formatX(gain, 2, 2);
      if (before.gte(1e15)) return `+${format(gain, 2, 2)}%`
      if (Decimal.lt(after.sub(before), 1e9)) return `+${formatInt(gain)}`;
      return `+${format(gain, 2, 2)}`
    },
    show() {
      if (this.isTableHead) return true;
      if (!this.item.appearsInAwayModal) return false;
      const show = this.increased && this.item.option && this.item.isUnlocked();
      // For the achievement and display, we need to emit if something happened to the parent
      if (show && !this.isTableHead) this.$emit("something-happened");
      return show;
    },
    isBlackHole() {
      // If its a Black Hole we need different formatting, so find that
      return this.item.name.includes("BlackHole");
    },
    formatBlackHoleActivations() {
      const activations = this.after - this.before;
      return activations;
    },
    isVeryLarge() {
      return this.isBlackHole
        ? false
        : Decimal.gt(this.before, Decimal.pow10(1e9));
    }
  },
  methods: {
    // We want different formatting above and below 1e9 to improve readability
     pseudo(number) {
      if (number === undefined) return "";
      if (this.isVeryLarge) return Math.floor(number.log10());
      if (Decimal.lt(number, 1e9)) {
        const numberAsDecimal = new Decimal(number);
        return numberAsDecimal.floor();
      }
      return number;
    },
    formatPseudo(number) {
      // Sometimes it's undefined and that throws errors, because this method is also used to determine whether or
      // not any text is even shown at all and sometimes this gets checked on variables which don't have values yet
      if (number === undefined) return "";
      // Surrounding text is formatted differently to specify that this is log10
      if (this.isVeryLarge) return formatInt(Math.floor(number.log10()));
      if (Decimal.lt(number, 1e9)) {
        // Both numbers and decimals get passed in here so this is needed
        // Not a fan of this solution but whatever
        const numberAsDecimal = new Decimal(number);
        return formatInt(numberAsDecimal.floor());
      }
      return format(number, 2, 2);
    },
    hideEntry() {
      if (!this.isTableHead) {
        this.removed = !this.removed;
        this.item.option = !this.item.option;
      }
    }
  }
};
</script>

<template>
  <div
    v-if="show"
    class="c-modal-away-progress__resources"
    :class="classObject"
    @click="hideEntry"
  >
    <template v-if="isBlackHole">
      <span style="width: 100%">
        Your
        <b>{{ formattedName }}</b>
        activated
        <span
          :class="diffFont(formatBlackHoleActivations)"
        >
          {{ formatInt(formatBlackHoleActivations) }}
        </span>
        {{ pluralize("time", formatBlackHoleActivations) }}
      </span>
    </template>
    <template v-else-if="isTableHead">
      <div class="c-modal-away-progress__resources--cell">
        Resource
      </div>
      <div class="c-modal-away-progress__resources--cell">
        Before
      </div>
      ➜
      <div class="c-modal-away-progress__resources--cell">
        After
      </div>
      <div class="c-modal-away-progress__resources--cell">
        Increased by
      </div>
    </template>
    <template v-else>
      <div class="c-modal-away-progress__resources--cell">
        <b>{{ formattedName }}</b>
        <i v-if="isVeryLarge"> exponent</i>
      </div>
      <div 
        class="c-modal-away-progress__resources--cell"
        :class="diffFont(pseudo(before))"
      >
        {{ formatBefore }}
      </div>
      ➜
      <div 
        class="c-modal-away-progress__resources--cell"
        :class="diffFont(pseudo(after))"
      >
        {{ formatAfter }}
      </div>
      <div 
        class="c-modal-away-progress__resources--cell"
        :class="diffFont(gain)"
      >
        {{ formatGain }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.c-modal-away-progress__resources {
  display: grid;
  grid-template-columns: 18rem 18rem 2rem 18rem 18rem;
  align-items: center;
  border-bottom: 0.1rem solid;
  border-image: linear-gradient(90deg, transparent, currentcolor, transparent) 1;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, transparent, currentcolor 10%), transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.5rem 1rem;
  font-family: var(--var-secondary-font);
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
}

.c-modal-away-progress__resources:nth-child(even) {
  background: linear-gradient(90deg, color-mix(in srgb, transparent, currentcolor 10%), 
  color-mix(in srgb, transparent, currentcolor 25%), 
  color-mix(in srgb, transparent, currentcolor 10%));
}

.c-modal-away-progress__flex {
  display: flex;
}

.c-modal-away-progress__resources:last-child {
  border: none;
}

.c-modal-away-progress__resources--cell:first-child {
  text-align: left;
}

.c-modal-away-progress__resources--cell:last-child {
  text-align: right;
}

.c-modal-away-progress__head {
  color: var(--color-text);
  border-image: linear-gradient(90deg, transparent, var(--color-accent), transparent) 1;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 25%, transparent), 
  color-mix(in srgb, var(--color-accent) 50%, transparent), 
  color-mix(in srgb, var(--color-accent) 25%, transparent));
  cursor: unset;
}

.c-modal-away-progress__dimension-boosts,
.c-modal-away-progress__antimatter-galaxies,
.c-modal-away-progress__antimatter {
  color: var(--color-antimatter);
}

.t-dark .c-modal-away-progress__antimatter,
.t-s6 .c-modal-away-progress__antimatter,
.t-s10 .c-modal-away-progress__antimatter {
  animation: a-game-header__antimatter--glow 25s infinite;
}

.c-modal-away-progress__infinities,
.c-modal-away-progress__infinity-points {
  color: var(--color-infinity);
}

.c-modal-away-progress__eternities,
.c-modal-away-progress__eternity-points,
.c-modal-away-progress__time-theorems {
  color: var(--color-eternity);
}

.c-modal-away-progress__tachyon-particles,
.c-modal-away-progress__tachyon-galaxies,
.c-modal-away-progress__dilated-time {
  color: var(--color-dilation);
  filter: brightness(0.8);
}

.t-dark .c-modal-away-progress__tachyon-particles,
.t-dark .c-modal-away-progress__tachyon-galaxies,
.t-dark .c-modal-away-progress__dilated-time {
  filter: none;
}

.c-modal-away-progress__realities,
.c-modal-away-progress__achievement-amount,
.c-modal-away-progress__reality-machines {
  color: var(--color-reality);
}

.c-modal-away-progress__imaginary-machines {
  color: var(--color-ra--base);
}

.c-modal-away-progress__dark-matter b,
.c-modal-away-progress__dark-energy b,
.c-modal-away-progress__singularities b,
.c-modal-away-progress__dark-matter,
.c-modal-away-progress__dark-energy,
.c-modal-away-progress__singularities {
  color: var(--color-laitela--base);
  text-shadow:
    0.1rem 0.1rem 0.1rem var(--color-laitela--accent),
    -0.1rem 0.1rem 0.1rem var(--color-laitela--accent),
    0.1rem -0.1rem 0.1rem var(--color-laitela--accent),
    -0.1rem -0.1rem 0.1rem var(--color-laitela--accent);
}

.c-modal-away-progress__replicanti-galaxies,
.c-modal-away-progress__replicanti {
  color: var(--color-replicanti);
}

.c-modal-away-progress__orias-memories {
  color: var(--color-ra-pet--teresa);
}

.c-modal-away-progress__relic-shards,
.c-modal-away-progress__effarig-memories {
  color: var(--color-ra-pet--effarig);
}

.c-modal-away-progress__enslaved-memories {
  color: var(--color-ra-pet--enslaved);
}

.c-modal-away-progress__v-memories {
  color: var(--color-ra-pet--v);
}

.c-modal-away-progress__orias-memories,
.c-modal-away-progress__effarig-memories,
.c-modal-away-progress__enslaved-memories,
.c-modal-away-progress__v-memories {
  filter: brightness(0.8);
}

.t-dark .c-modal-away-progress__teresa-memories,
.t-dark .c-modal-away-progress__effarig-memories,
.t-dark .c-modal-away-progress__enslaved-memories,
.t-dark .c-modal-away-progress__v-memories {
  filter: none;
}

.c-modal-away-progress__black-hole b,
.c-modal-away-progress__black-hole {
  color: black;
  text-shadow:
    0 0 0.2rem #e67919,
    0 0 0.3rem #e67919;
}

.s-base--dark .c-modal-away-progress__black-hole b,
.s-base--dark .c-modal-away-progress__black-hole {
  color: #de5a1d;
  text-shadow:
    0 0 0.2rem black,
    0 0 0.3rem black;
}

.c-modal-away-progress__reality-shards {
  color: var(--color-pelle--base);
}

.c-modal-away-progress__disabled b,
.c-modal-away-progress__disabled {
  font-style: italic;
  color: #303030;
  text-shadow: 0 0 0.3rem #303030;
  text-decoration: line-through;
  animation: none;
}

.s-base--dark .c-modal-away-progress__disabled b,
.s-base--dark .c-modal-away-progress__disabled {
  color: #c0c0c0;
  text-shadow: 0 0 0.3rem #c0c0c0;
}

</style>
