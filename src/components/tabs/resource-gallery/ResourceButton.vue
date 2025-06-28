<script>
export default {
  name: "ResourceButton",
  props: {
    resourceID: {
      type: Number,
      required: true
    },
    selected: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      name: undefined,
    };
  },
  computed: {
    resource() {
      return GameDatabase.resourceGallery.resources[this.resourceID];
    },
    symbol() {
      if (Array.isArray(this.resource.symbol)) return this.resource.isUnlocked() ? this.resource.symbol[0] : '<i class="fa-solid fa-lock"></i>'
      return this.resource.isUnlocked() ? this.resource.symbol : '<i class="fa-solid fa-lock"></i>'
    },
    secondarySymbol(){
      if (Array.isArray(this.resource.symbol)&&this.resource.isUnlocked()) return this.resource.symbol[1]
    },
    styleclass(){
      if (this.resource.isUnlocked()) return this.resource.formatClass
    },
  },
  methods: {
    update() {
      this.name = this.resource.isUnlocked() ?  this.resource.name : this.resource.name.replace(/[a-zA-Z0-9-]/gu, "?");
    }
  }
}
</script>
<template>
    <button 
    @click="emitClick"
    v-tooltip="name"
    :class="[styleclass,{'o-resource--selected':resourceID===selected}]"
    class="l-resource-button c-resource-button">
    <span 
      class="l-resource-button__symbol"
      v-html="symbol"
    />
    <span
      class="l-resource-button__symbol"
      v-if="secondarySymbol"
      v-html="secondarySymbol"/>
    </button>
</template>
<style scoped>
.l-resource-button{
  width:6rem;
  height:6rem;
  border-radius: var(--var-border-radius,.5rem);
  margin:0.3rem;
  font-size:3rem;
  user-select: none;
  font-family: typewriter;
  cursor: pointer;
  transition-duration:0.05s;
  position:relative;
  line-height:1
}
.l-resource-button-small{
  width:4rem;
  height:4rem;
  font-size:2rem;
  border-radius: var(--var-border-radius,.5rem);
}
.l-resource-button__symbol:first-child{
  position: absolute;
  font-size: 95%;
  top: 10%;
  left: 10%;
}
.l-resource-button__symbol:nth-child(2){
  position: absolute;
  font-size: 95%;
  bottom: 10%;
  right: 10%;
}
.l-resource-button__symbol:only-of-type{
  position: relative;
  font-size: 100%;
  top: unset;
  left: unset;
  bottom: unset;
  right: unset;
}
.c-resource-button{
  color:#aaaaaa;
  background:url(../../../../public/images/glyphs-alchemy/glyph-pattern.png),
  linear-gradient(#ffffff88 -100%,transparent 49%, #00000044 50%, transparent),
  linear-gradient(var(--bg) -35%,black 200%);
  background-position: center;
  border: 0.1rem solid var(--border);
  box-shadow: var(--var-box-shadow, 0 0 0.3rem 0.2rem #00000066,0 0 1rem black inset, 0 0 0 0.2rem var(--border) inset);
  text-shadow: var(--var-text-shadow, 0.1rem 0.1rem 0.3rem black);
  --bg:#666666;
  --border:gray
}
.s-base--metro .c-resource-button{
  background:url(../../../../public/images/glyphs-alchemy/glyph-pattern.png),linear-gradient(var(--bg) -35%,black 175%);
  background-position: center;
}
.c-resource-button:hover{
  box-shadow: 0 0 0.3rem 0.2rem var(--border),0 0 0.5rem black inset, 0 0 0 0.3rem var(--border) inset;
  border-color: var(--color-text);
}
.o-resource--selected{
  box-shadow: 0 0 0.5rem 0.2rem var(--border),0 0 0.5rem white inset, 0 0 0 0.3rem var(--border) inset,0 0 0 0.4rem var(--color-text) inset;
  text-shadow: 0.1rem 0.1rem 0.3rem black,-0.1rem -0.1rem 0.3rem var(--border);
  border-color: var(--color-text);
}
.o-resource--selected:hover{
  box-shadow: 0 0 0.5rem 0.2rem white,0 0 0.5rem white inset, 0 0 0 0.3rem var(--border) inset,0 0 0 0.4rem var(--color-text) inset;
}
.o-resource--antimatter{
  color:white;
  --bg:var(--color-accent);
  --border:var(--color-accent);
}
.o-resource--infinity{
  color:white;
  --bg:var(--color-infinity);
  --border:var(--color-infinity);
}
.o-resource--replicanti{
  color:white;
  --bg:var(--color-replicanti);
  --border:var(--color-replicanti);
}
.o-resource--eternity{
  color:white;
  --bg:var(--color-eternity);
  --border:var(--color-eternity);
}
.o-resource--dilation{
  color:white;
  --bg:var(--color-dilation);
  --border:var(--color-dilation);
}
.o-resource--reality{
  color:white;
  --bg:var(--color-reality);
  --border:var(--color-reality);
}
.o-resource--celestial{
  color:white;
  --bg:var(--color-celestials);
  --border:var(--color-celestials);
}
.o-resource--forgotten{
  color:white;
  --bg:var(--color-ra--base);
  --border:var(--color-ra--base);
}
.o-resource--laitela{
  color:black;
  --bg:#333333;
  --border:#888888;
}
.o-resource--laitela{
  color:white;
  --bg:#333333;
  --border:#888888;
}
.o-resource--doomed{
  color:white;
  --bg:var(--color-pelle--base);
  --border:var(--color-pelle--base);
}
.o-resource--special{
  color:white;
  --bg:magenta;
  --border:magenta;
}
.o-resource--blob{
  color:white;
  --bg:#fbc21b;
  --border:#fbc21b;
}
</style>