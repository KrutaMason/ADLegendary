<script>
import ResourceButton from "./ResourceButton";
import ResourceInfo from "./ResourceInfo";
export default {
  name: "ResourceGalleryTab",
  components: {
    ResourceButton,
    ResourceInfo,
  },
  data() {
    return {
        infoResourceId: 0,
    };
  },
  computed:{
    resources: () => GameDatabase.resourceGallery.resources,
    infoResource() {
      return this.resources[this.infoResourceId];
    },
  },
  methods:{
    handleClick(id) {
      if(this.resources[id].isUnlocked()) {
        this.infoResourceId = this.resources[id].id
        AudioManagement.playSound("click_light")
      };
    },
  }
}
</script>
<template>
    <div class="c-stats-tab">
      <div style="display: flex;justify-content: center;">
        <div class="l-resource_gallery-container">
            <div class="l-resource_buttons-container">
                <ResourceButton
                v-for="(resource, i) in resources.length"
                :key="i-1"                
                :resourceID="resource-1"
                :selected="infoResourceId"
                @click="handleClick(resource-1)"
                />
            </div>
        </div>
        <ResourceInfo
        :resource="infoResource"
        :key="infoResourceId"
        />
      </div>
        <br>
        Note: More information on some resources will reveal as the game progresses.
    </div>
</template>
<style scoped>
.l-resource_gallery-container{
    width:37.5%;
    min-width: 30rem;
    height:60rem;
    border: var(--var-border-width,0.3rem) solid;
    border-image: var(--leg-border-render) 3;
    box-shadow: var(--box-shadow);
    background: url(../../../../public/images/upgrades/bought.png),linear-gradient(transparent,var(--color-accent) 500%),var(--leg-base-render);
  background-position: center;
    overflow: auto;
    padding: 0.5rem;
    margin:0.5rem
}
.l-resource_buttons-container{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
}
</style>