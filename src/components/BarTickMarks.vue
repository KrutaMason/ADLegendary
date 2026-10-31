<script>
export default {
  name: "BarTickMarks",
  props: {
    className: {
      type: String,
      required: false,
      default: ""
    },
    count: {
      type: Number,
      required: true,
    },
    resource: {
      type: [Number, Object],
      required: true
    },
    barStart: {
      type: Object,
      required: true
    },
    barEnd: {
      type: [Number, Object],
      required: true
    },
    isPow10: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    customBarValue(value) {
      const start = this.isPow10 ? this.barStart.log10() : this.barStart;
      const end = this.isPow10 ? this.barEnd.log10() : this.barEnd;
      if (value === 1) return this.barEnd;
      if (this.isPow10) return Decimal.pow10(start * (1 - value) + end * value)
      return this.barStart.times(1 - value).plus(this.barEnd.times(value));
    },
    tickMarkClass(number) {
      return {
        [this.className]: true,
        //[`${this.className}--unlocked`]: this.resource.gte(this.customBarValue(this.tickMarkRatio(number)))
        [`c-tick-mark--unlocked`]: this.resource.gte(this.customBarValue(this.tickMarkRatio(number)))
      }
    },
    tickMarkRatio(number) {
      return 0 + (1 / (this.count - 1)) * (number - 1);
    },
    tickMarkStyle(number) {
      let percent = (1 / (this.count - 1)) * (number - 1) * 100;
      return {
        "left": `${percent}%`,
        "transform": `translate(${-percent}%)`,
      }
    },
    tickMarkFormat(number) {
      if (this.isPow10) return format(this.customBarValue(this.tickMarkRatio(number)), 2)
      return formatInt(this.customBarValue(this.tickMarkRatio(number)))
    },
  }
}
</script>

<template>
  <div class="l-tick-mark--container">
    <div
      v-for="markID in count"
      :key="markID"
      class="l-tick-mark c-tick-mark"
      :class="tickMarkClass(markID)"
      :style="tickMarkStyle(markID)"
      v-html="tickMarkFormat(markID)"
    />
  </div>
</template>

<style scoped>

</style>