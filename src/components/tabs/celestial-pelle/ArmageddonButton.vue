<script>
export default {
  name: "ArmageddonButton",
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      remnantsGain: 0,
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
      hasGalaxyGenerator:false,
      wobbly: false
    };
  },
  computed: {
    remnants() {
      return format(this.remnantsGain, 2, this.remnantsGain > 1 ? 0 : 2);
    },
    buttonClassObject() {
      return {
        "c-armageddon-button": true,
        "l-armageddon-button": !this.isHeader,
        "l-reality-button": this.isHeader,
        "l-armageddon-button--header": this.isHeader,
        "c-armageddon-button--unavailable": !this.canArmageddon,
        "a-wobble-multi": this.wobbly
      };
    }
  },
  methods: {
    update() {
      this.wobbly = player.options.animations.wobbly
      this.remnantsGain = Pelle.remnantsGain;
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
      this.hasGalaxyGenerator = Pelle.hasGalaxyGenerator;
    },
    manualArmageddon() {
      if (!this.canArmageddon) return;

      if (player.options.confirmations.armageddon) Modal.armageddon.show();
      else Pelle.armageddon(true);
    }
  }
};
</script>

<template>
  <button
    :class="buttonClassObject"
    @click="manualArmageddon"
  >
    <div v-if="isHeader" class="o-prestige-description">{{hasGalaxyGenerator?"You cannot escape a Doomed Reality?":"You cannot escape a Doomed Reality!"}}<br></div>
    <span class="c-remnant-gain-display">
      Armageddon for
      <span class="c-remnant-gain">{{ remnants }}</span>
      Remnants
    </span>
    <br>
    Reality Shards
    <span class="c-reality-shard-gain">{{ format(realityShardGain, 2, 2) }}</span>/s ➜
    <span class="c-reality-shard-gain">{{ format(nextRealityShardGain, 2, 2) }}</span>/s
  </button>
</template>

<style scoped>
.c-armageddon-button {
  display: block;
  font-family: Typewriter;
  color: var(--color-text);
  text-shadow: var(--var-text-shadow, -0.1rem -0.1rem 0.3rem black,0.1rem 0.1rem 0.3rem black);
  background: url(../../../../public/images/prestige/armageddon-1.png),url(../../../../public/images/prestige/armageddon-2.png),linear-gradient(black,var(--bg-dark) var(--distance));
  --bg-dark:var(--color-pelle--base);
  color:var(--color-pelle--base);
  box-shadow: 0 0 1rem inset, 0 0 2rem;
  border: 0.1rem solid;
  border-radius: var(--var-border-radius, 0.5rem);
  --distance:400%;
  animation: a-pbtn-arma 35s infinite linear;
  transition-duration: 0.12s;
}
@keyframes a-pbtn-arma{
  0%{background-position: 0 0, 0 0, 0;}
  100%{background-position: -256px -256px,128px 128px,0;}
}
.s-base--metro .c-armageddon-button {
  box-shadow: 0.1rem 0.1rem 0.1rem 0 #9e9e9e;
}

.l-armageddon-button {
  width: 100%;
  padding: 1.5rem;
}

.l-armageddon-button--header {
  font-size: 1rem;
  font-weight: bold;
  padding: 0rem;
}

.c-armageddon-button:hover {
  --distance:150%;
  color:white;
  box-shadow: 0 0 1rem inset, 0 0 2rem var(--color-text);
  cursor: pointer;
}

.c-armageddon-button--unavailable {
  opacity: 0.5;
  cursor: default !important;
}

.c-remnant-gain {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-pelle--base);
}

.c-remnant-gain-display {
  vertical-align: middle;
}

.c-reality-shard-gain {
  font-weight: bold;
  color: var(--color-pelle--base);
}

.a-wobble-multi:hover{
  animation: wobble 0.2s ease-out, a-pbtn-arma 35s infinite linear
}
@keyframes wobble
{
	0% {transform:scale(1,1);}
	10% {transform:scale(1.075,0.9);}
	20% {transform:scale(1.1,0.9);}
	50% {transform:scale(0.875,1.125);}
	70% {transform:scale(1.025,0.975);}
	90% {transform:scale(0.975,1.025);}
	100% {transform:scale(1,1);}
}
</style>
