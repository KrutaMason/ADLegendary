<script>
export default { 
  name: "OptionsModalSet",
  props: {
    showValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Number,
      required: false,
    },
    displayValue: {
      type: String,
      required: false,
      default: ""
    },
    hideInfo: {
      type: Boolean,
      required: false,
      default: false
    },
    tooltip: {
      type: String,
      required: false,
    },
  },
}
</script>
<template>
  <div class="l-optionmodal--option c-optionmodal--option">
    <div class="l-optionmodal--name">
      <slot name="label"/>
    </div>
    <div class="l-optionmodal--config">
      <slot name="config"/>
      <div 
        class="c-optionmodal--value"
        :class="diffFont(value)"
        v-if="showValue"
      >
        {{ displayValue }}
      </div>
      <div 
        class="c-optionmodal--info"
        v-tooltip="tooltip"
        v-if="!hideInfo"
      >
        <i class="fas fa-question"/>
      </div>
    </div>
  </div>    
</template>