<script>
export default {
  name: "RealityCurrencyHeader",
  data() {
    return {
      isDoomed: false,
      isIMUnlocked: false,
      currencyValue: new Decimal(),
      currencyName: "",
      firstReality: false,
    };
  },
  methods: {
    update() {
      this.firstReality = player.realities <= 0;
      this.isIMUnlocked = MachineHandler.isIMUnlocked;
      this.isDoomed = Pelle.isDoomed;
      if (this.isDoomed) {
        const shards = Currency.realityShards.value;
        this.currencyValue = format(shards, 2, 2);
        this.currencyName = pluralize("Reality Shard", shards);
      } else {
        const rm = Currency.realityMachines.value;
        this.currencyValue = formatMachines(rm, Currency.imaginaryMachines.value);
        this.currencyName = pluralize("Reality Machine", rm);
      }
    },
    resourceClass() {
      return {
        "c-reality-tab__reality-machines": true,
        "c-imaginary-color": this.isIMUnlocked,
        "c-shard-color": this.isDoomed
      };
    }
  }
};
</script>

<template>
  <div class="c-reality-currency" v-if="!this.firstReality">
    You have
    <b :class="resourceClass()">
      {{ currencyValue }}
    </b>
    {{ currencyName }}.
  </div>
  <div class="c-reality-currency c-reality-tab__reality-machines" v-else>A new Reality shall be made from the ashes of the old.</div>
</template>

<style scoped>
.c-reality-currency {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.c-imaginary-color {
  color: var(--color-ra--base);
}

.c-shard-color {
  color: var(--color-pelle--base);
}
</style>
