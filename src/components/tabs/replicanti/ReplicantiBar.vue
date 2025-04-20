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
      this.width = Math.min(Replicanti.amount.log10() / replicantiCap().log10(), 1)
    }
   }
}
</script>

<template>
    <div class="c-replicanti-bar">
      <div 
      class="c-replicanti-bar-fill"
      :style="{'width':formatPercents(width, 2)}"
      />
      {{ formatPercents(width, 2) }}
    </div>
</template>

<style scoped>

</style>