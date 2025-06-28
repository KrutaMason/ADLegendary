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
      <div class="l-resource_info-name">{{ name }}</div>
     <ResourceButton
       :key="resource.id"                
       :resourceID="resource.id"
       :selected="-1"
        class="o-resource--selected"
        style="pointer-events: none;"
      />
      <div class="l-resource_info-value" v-if="value" v-html="value"></div>
     </div>
      <div class="l-resource_info-description c-resource_info-description" v-html="info"/>
      <div class="l-resource_info-others c-resource_info-description" v-if="related">
      <div class="l-resource_info-name l-resource_info-name__small">Similar / Associated Types</div>
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
  border: 1.2rem solid;
  border-image: var(--leg-border-render) 12 round;
  box-shadow: var(--var-box-shadow, var(--box-shadow));
  background: url(../../../../public/images/upgrades/bought.png),linear-gradient(transparent,var(--color-accent) 500%),var(--leg-base-render);
  background-position: center;
  padding: .5rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  display:flex;
  flex-direction: column;
}
.s-base--metro .l-resource_info-container{
  border: 0.3rem solid;
  border-image: var(--leg-border-render) 3 round;
}
.l-resource_info-title{
  border-radius: var(--var-border-radius, 1rem);
  padding: 0.6rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.l-resource_info-description{
  height:100%;
  text-align:left;
  border-radius: var(--var-border-radius, 1rem);
  padding: 0.6rem;
  margin: 0.5rem;
  overflow: auto;
}
.l-resource_info-others{
  border-radius: var(--var-border-radius, 1rem);
  padding: 0.6rem 0 0.2rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.c-resource_info-description{
  background:linear-gradient(transparent,var(--color-accent) 500%),linear-gradient(#ffffff80,#ffffff80);
  box-shadow: var(--var-box-shadow, 0.1rem 0.1rem 0.5rem black);
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);;
  border-radius: var(--var-border-radius, 1rem);
  --base: var(--color-accent);
  background-origin: border-box;
}
.s-base--dark .c-resource_info-description{
  background:linear-gradient(transparent,var(--color-accent) 500%),linear-gradient(#00000080,#00000080);
}
.l-resource_info-name{
  font-size: 2rem;
  font-weight: bold;
  font-family: cambria;
  line-height: 1.1;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-top: none;
  border-radius: 0 0 var(--var-border-radius, 1rem) var(--var-border-radius, 1rem);
  background-image: linear-gradient(90deg,color-mix(in srgb,var(--base) 10%,transparent),
  color-mix(in srgb,var(--base) 35%,transparent),
  color-mix(in srgb,var(--base) 10%,transparent));
  background-origin: border-box;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  margin-top: -0.6rem;
}
.l-resource_info-name__small{
  font-size: 1.5rem;
}
.l-resource_info-value{
  padding: 0 1rem;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);;
  border-bottom: none;
  border-radius: var(--var-border-radius,1rem) var(--var-border-radius,1rem) 0 0;
  background-image: linear-gradient(90deg,color-mix(in srgb,var(--base) 10%,transparent),
  color-mix(in srgb,var(--base) 35%,transparent),
  color-mix(in srgb,var(--base) 10%,transparent));
  background-origin: border-box;
  margin-bottom: -0.6rem;
  margin-top: 0.5rem;
}
.l-resource_info-similar{
  display:flex;
  justify-content: center;
}
</style>