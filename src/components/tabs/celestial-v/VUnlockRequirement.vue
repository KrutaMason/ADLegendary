<script>
export default {
  name: "VUnlockRequirement",
  props: {
    dbEntry: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resource: new Decimal(0),
      progress: 0,
      progress2: 0,
      color:undefined,
      symbol:""
    };
  },
  computed: {
    barProgressStyle() {
      const color = this.progress >= 1
        ? "var(--color-v--base)"
        : "#ead58460";
      return {
        "--bg-bright": color,
        "--bg-dark": `color-mix(in srgb,${this.color} ${this.progress >= 1?"100%":"35%"},transparent)`,
        width: `${100 * this.progress}%`
      };
    },
    textStyle() {
      return {
        "font-weight": this.progress >= 1
          ? "bold"
          : "normal",
        "text-shadow": this.progress >= 1
          ? "none"
          : `var(--var-text-shadow, 0.1rem 0.1rem 0.1rem black,-0.1rem -0.1rem 0.1rem black,
          0.1rem -0.1rem 0.1rem black,-0.1rem 0.1rem 0.1rem black)`,
        "color": this.progress >= 1
          ? "black"
          : "white",
      };
    },
  },
  methods: {
    update() {
      this.resource.copyFrom(new Decimal(this.dbEntry.resource()));
      this.progress = Math.clampMax(this.dbEntry.progress(), 1);
      this.progress2 = Math.clampMax(this.dbEntry.progress2(), 1);
      this.color = this.dbEntry.color;
      this.symbol = this.dbEntry.symbol;
    }
  }
};
</script>

<template>
  <div class="c-v-unlock-category">
    <div 
      v-html="symbol"
      v-tooltip="`${dbEntry.name}<br><i>${formatPercents(progress2,2)}</i>`"
      class="c-v-unlock-resource"
      :class="{'c-v-unlock-resource-available':progress >= 1}"
      :style="{'--color':color}"
    />
  <div
    class="c-v-unlock-bar"
    :style="textStyle"
  >
    <div
      class="c-v-unlock-bar__progress"
      :style="barProgressStyle"
    />
    {{ dbEntry.format(resource) }} / {{ dbEntry.format(dbEntry.requirement) }}
  </div>
  </div>
</template>
<style scoped>
.c-v-unlock-category{
  display:flex;
  align-items: center;
  margin-bottom: 1rem;
}
.c-v-unlock-resource{
  width:3.6rem;
  height:3.6rem;
  border-radius: 50%;
  font-size:1.8rem;
  display:flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.1rem;
  padding-left: 0.1rem;
  color:var(--color);
  background:radial-gradient(var(--color-background) 40%,var(--color));
  border:0.1rem solid var(--color);
  box-shadow: var(--var-box-shadow, 0 0 .5rem var(--color-background) inset, 0 0 0 0.15rem var(--color) inset);
  margin:0 1rem 0 0;
  transition:0.15s
}
.c-v-unlock-resource:hover{
transform:scale(1.25)
}
.c-v-unlock-resource-available{
  color:white;
  box-shadow: 0.2rem 0.2rem .75rem 0.1rem black,var(--var-box-shadow, 0 0 .5rem black inset, 0 0 0 0.2rem var(--color) inset);
  text-shadow:0.1rem 0.1rem 0.3rem black,-0.1rem -0.1rem 0.3rem black;
  background:radial-gradient(at top, white -25%,var(--color), black);
}
</style>