<script>
export default {
  name: "ReplicantiBar",
   data() {
    return {
     width: 0,
    };
   },
   methods: {
    update() {
      this.progress = Math.min(Replicanti.amount.log10() / replicantiCap().log10(), 1)
      this.width = `${this.progress * 100}%`
    }
   }
}
</script>

<template>
    <div class="c-replicanti-bar">
      <div 
      class="c-replicanti-bar-fill"
      :style="{'width':width}"
      />
      {{ formatPercents(progress, 2) }}
    </div>
</template>

<style scoped>

</style>