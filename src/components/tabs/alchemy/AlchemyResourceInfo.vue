<script>
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "AlchemyResourceInfo",
  components: {
    EffectDisplay
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: 0,
      cap: 0,
      capped: false,
      flow: 0,
      isReactionActive: false,
      reactionProduction: 0,
      isUnlocked: false,
      unlockRequirement: ""
    };
  },
  computed: {
    reaction() {
      return this.resource.reaction;
    },
    tier() {
      return this.resource.config.tier;
    },
    isBaseResource() {
      return this.resource.isBaseResource;
    },
    reactionText() {
      if (this.resource === AlchemyResource.reality) return this.realityReactionText;
      const reagents = this.reaction.reagents
        .map(r => `${format(r.cost)}${r.resource.symbol}`)
        .join(" + ");
      return `${reagents} ➜ ${format(this.reactionProduction, 2, 2)}${this.resource.symbol}`;
    },
    realityReactionText() {
      const reagents = this.reaction.reagents
        .map(r => r.resource.symbol)
        .join(" + ");
      return `${reagents} ➜ ${this.resource.symbol}`;
    },
    effectConfig() {
      const resource = this.resource;
      return {
        effect: () => resource.effectValue,
        formatEffect: resource.config.formatEffect
      };
    },
    resourceAmount() {
      return formatFloat(this.amount, 1);
    },
    resourceCap() {
      return formatFloat(this.cap, 1);
    },
    formattedFlow() {
      const sign = this.flow >= 0 ? "+" : "-";
      if (Math.abs(this.flow) < 0.01) return "None";
      const resourceText = `${sign}${format(Math.abs(this.flow), 2, 2)}/sec`;
      const color = this.flow > 0 ? "9CCC65" : "CC6666";
      return `<span style="color:#${color}">${resourceText}</span>`;
    },
    isDoomed: () => Pelle.isDoomed,
    colorStyle() {
      return {
        background: this.isUnlocked?`radial-gradient(at top,white -50%,${this.color},black)`:`radial-gradient(at top,white -50%,#444444,black)`,
      };
    },
    crateStyle(){
      let posID = 1;
      switch (this.tier) {
        case 1:
          posID = 1;
          break;
        case 2:
          posID = 2;
          break;
        case 3:
          posID = 3;
          break;
        case 4:
          posID = 5;
          break;
        case 5:
          posID = 7;
          break;
        default:
          posID = 1;
      }
      if (Pelle.isDoomed) return posID = 8
      return posID
    },
  },
  methods: {
    update() {
      const resource = this.resource;
      this.amount = resource.amount;
      this.color = resource._config.color;
      this.cap = resource.cap;
      this.capped = resource.capped;
      this.flow = resource.flow;
      this.isUnlocked = resource.isUnlocked;
      this.unlockRequirement = resource.lockText;
      if (!this.isBaseResource) {
        this.isReactionActive = !this.isDoomed && this.reaction.isActive;
        this.reactionProduction = this.reaction.reactionProduction;
      }
    }
  }
};
</script>

<template>
  <div 
  class="c-alchemy-resource-info"
  >
    <div 
      v-if="isUnlocked"
      class="c-alchemy-resource-info__inner"
      :style="{'--base':color}"
    >
      <div class="l-resource-component__container">
        <div class="l-resource-component" 
        :style="[colorStyle, {'--crate-posx': crateStyle}]"
        >
          <div style="padding-bottom: 0.3rem;">{{ resource.symbol }}</div>
        </div>
      </div>
      <span class="c-alchemy-resource-info__title">
        {{ resource.symbol }} <span class="c-alchemy-resource-info__name">{{ resource.name }}</span> {{ resource.symbol }}
      </span>
      <div class="c-alchemy-resource-info__tier">
        <span 
          v-for="i in tier"
          :key="i"
        >★</span>
        <br> Tier {{ tier }}
      </div>
      <div class="c-alchemy-resource-info__description">
      <span v-if="isBaseResource">Base Resource</span>
      <span v-else>Reaction: {{ isReactionActive ? "Active" : "Inactive" }} ({{ reactionText }})</span>
      <span v-if="isDoomed"> Destroyed by Pelle </span>
      <span v-else>
        {{ capped ? "Capped" : "Current" }}: {{ resourceAmount }} / {{ resourceCap }}
        (Recent change: <span v-html="formattedFlow" />)
      </span>
      <span :class="{ 'o-pelle-disabled': isDoomed }">
        <EffectDisplay
          label="Effect"
          :config="effectConfig"
        />
      </span>
    </div>
    </div>
    <div 
      v-else 
      class="c-alchemy-resource-info__inner"
    >
      <div class="l-resource-component__container">
       <div class="l-resource-component" :style="colorStyle">
         <div style="padding-top: 0.3rem;">?</div>
        </div>
      </div>
      <span class="c-alchemy-resource-info__title">
        <span class="c-alchemy-resource-info__name">{{ resource.name.replace(/[a-zA-Z0-9-]/gu, "?") }}</span>
      </span>
      <div class="c-alchemy-resource-info__tier">
        <span 
          v-for="i in tier"
          :key="i"
        >★</span>
        <br> Tier {{ tier }}
      </div>
      <div class="c-alchemy-resource-info__description c-alchemy-resource-info__description-locked">
        Unlock requirement: {{ unlockRequirement }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-alchemy-resource-info__name {
  font-family: cambria;
  font-size: 1.75rem;
  line-height: 1.2
}
.c-alchemy-resource-info__description {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;
}
.c-alchemy-resource-info__description-locked{
  color: var(--base);
  font-size: 2rem;
  font-weight: bold;
  font-family: cambria;
}
.c-alchemy-resource-info__tier{
  opacity: 0.5;
  position: absolute;
  text-align: right;
  top: 0;
  right: 0;
  line-height: 1;
  margin-right: 0.5rem;
}
</style>
