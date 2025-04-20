<script>
import ResourceButton from "./ResourceButton";
export default {
  name: "ResourceInfo",
  components: {
    ResourceButton,
  },
  props: {
    resource: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      name: undefined,
      value:undefined,
      related:undefined,
      info:"",
    };
  },
  methods: {
    update() {
      this.name = this.resource.name
      this.info = this.resource.info()
      this.value = (typeof this.resource.formatValue === 'function') ? this.resource.formatValue() : undefined
      this.related = Array.isArray(this.resource.related) ? this.resource.related.sort(function(a, b){return a-b}) : undefined
    }
  }
}
</script>
<template>
  <div class="l-resource_info-container">
     <div class="l-resource_info-title c-resource_info-description">
     <ResourceButton
       :key="resource.id"                
       :resourceID="resource.id"
       :selected="-1"
        class="o-resource--selected"
        style="pointer-events: none;"
      />
      <br>
      <div class="l-resource_info-name">{{ name }}</div>
        <div class="l-resource_info-value"
          v-if="value">Currently: <span v-html="value" />
       </div>    
     </div>
      <div class="l-resource_info-description c-resource_info-description" v-html="info"/>
      <div class="l-resource_info-title c-resource_info-description" v-if="related">
        Similar / Associated Types <br>
      <div class="l-resource_info-similar">
      <ResourceButton
        v-for="i in related.length"
        :key="related[i-1]"                
        :resourceID="related[i-1]"
        class="l-resource-button-small"
        :selected="-1"
      />
      </div>
      </div>
  </div>
</template>
<style scoped>
.l-resource_info-container{
  width:25%;
  min-width: 40rem;
  height:60rem;
  color:var(--color-text);
  border: var(--var-border-width,0.3rem) solid;
  border-image: var(--leg-border-render) 3;
  box-shadow: var(--box-shadow);
  background: url(../../../../public/images/upgrades/bought.png),linear-gradient(transparent,var(--color-accent) 500%),var(--leg-base-render);
  background-position: center;
  padding: .5rem;
  margin:0.5rem;
  display:flex;
  flex-direction: column;
}
.l-resource_info-title{
  border-radius: 1rem;
  padding:.5rem 0;
  margin:.5rem
}
.l-resource_info-description{
  height:100%;
  text-align:left;
  border-radius: 1rem;
  padding:1rem;
  margin:.5rem;
  overflow: auto;
}
.c-resource_info-description{
  background:linear-gradient(transparent,var(--color-accent) 500%),linear-gradient(#ffffff80,#ffffff80);
  box-shadow: 0.1rem 0.1rem 1rem black;
}
.s-base--dark .c-resource_info-description{
  background:linear-gradient(transparent,var(--color-accent) 500%),linear-gradient(#00000080,#00000080);
  border:0.1rem #88888888 solid;
}
.l-resource_info-name{
  font-size:2rem;
  font-weight:bold;
  font-family:cambria;
  line-height:1.2
}
.l-resource_info-value{
  font-style: italic;
  border-top:0.1rem solid;
  border-image:linear-gradient(90deg,transparent,var(--color-text),transparent) 1
}
.l-resource_info-similar{
  display:flex;
  justify-content: center;
}
</style>