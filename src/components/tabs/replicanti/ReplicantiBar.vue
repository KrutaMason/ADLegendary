<script>
import BarTickMarks from "@/components/BarTickMarks";

export default {
  name: "ReplicantiBar",
  components: {
    BarTickMarks
  },
  data() {
    return {
      replicanti: new Decimal(),
      barStart: new Decimal(),
      barEnd: new Decimal(),
      progress: 0,
      width: 0,
    };
   },
  computed: {
    test1: () => new Decimal(3e12),
    test2: () => new Decimal(4e12),
  },
  methods: {
    update() {
      this.replicanti.copyFrom(Replicanti.amount);
      this.barStart.copyFrom(Replicanti.barStart);
      this.barEnd.copyFrom(Replicanti.barEnd);
      this.progress = Math.min(
        Decimal.log10(this.replicanti.divide(this.barStart)) / Decimal.log10(this.barEnd.divide(this.barStart)), 1)
      this.width = `${this.progress * 100}%`
    },
  }
}
</script>

<template>
  <div class="c-replicanti-bar--container">
    <div class="c-replicanti-bar">
      <div 
        class="c-replicanti-bar-fill"
        :style="{'width': width}"
      />
      <span
        :class="diffFont(progress * 100)"
      >
        {{ formatPercents(progress, 2) }}
      </span>
    </div>
    <BarTickMarks
      className="c-tick-mark--replicanti"
      :count="5"
      :resource="replicanti"
      :barStart="barStart"
      :barEnd="barEnd"
      :isPow10="true"
    />
  </div>
</template>

<style scoped>

</style>