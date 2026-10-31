<script>

export default {
  name: "LogoHolder",
  props: {
    credit: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  computed: {
    image() {
      if (this.credit) return "images/title_normal.png";
      switch (this.$viewModel.theme) {
        case "S4":
          return "images/title-s4.png";
        case "S14":
          return "images/title-s14.png";
        default:
          return "images/title_normal.png";
      }
    }
  }
};
</script>

<template>
  <img 
    class="o-title" 
    :src="image" 
    alt=""
  >
</template>

<style scoped>

</style>