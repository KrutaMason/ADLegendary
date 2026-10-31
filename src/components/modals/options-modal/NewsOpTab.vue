<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import OptionsModalSet from "@/components/OptionsModalSet"
import PrimaryButton from "@/components/PrimaryButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "NewsOpTab",
  components: {
    ModalOptionsToggleButton,
    OptionsModalSet,
    PrimaryButton,
    SliderComponent
  },
  data() {
    return {
      enabled: false,
      repeatBuffer: 40,
      AIChance: 0,
      speed: 1,
      includeAnimated: false,
    };
  },
  computed: {
    newsMessageCount() {
      return GameDatabase.news.length;
    },
    newsOnOffLabel() {
      return `${this.enabled ? "ON" : "OFF"}`;
    },
    sliderPropsRepeatBuffer() {
      return {
        min: 0,
        max: 80,
        interval: 1,
        width: "98%",
        tooltip: false
      };
    },
    sliderPropsAIChance() {
      return {
        min: 0,
        max: 1,
        interval: 0.01,
        width: "98%",
        tooltip: false
      };
    },
    sliderPropsSpeed() {
      return {
        min: 0.5,
        max: 2,
        interval: 0.01,
        width: "98%",
        tooltip: false
      };
    },
  },
  watch: {
    type(newValue) {
      player.options.news.type = newValue;
    },
    repeatBuffer(newValue) {
      player.options.news.repeatBuffer = parseInt(newValue, 10);
    },
    AIChance(newValue) {
      player.options.news.AIChance = parseFloat(newValue, 10);
    },
    speed(newValue) {
      player.options.news.speed = parseFloat(newValue, 10);
    },
    includeAnimated(newValue) {
      player.options.news.includeAnimated = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options.news;
      this.enabled = options.enabled;
      this.repeatBuffer = options.repeatBuffer;
      this.AIChance = options.AIChance;
      this.speed = options.speed;
      this.includeAnimated = options.includeAnimated;
    },
    adjustSliderValueRepeatBuffer(value) {
      this.repeatBuffer = value;
      player.options.repeatBuffer = this.repeatBuffer;
    },
    adjustSliderValueAIChance(value) {
      this.AIChance = value;
      player.options.AIChance = this.AIChance;
    },
    adjustSliderValueSpeed(value) {
      this.speed = value;
      player.options.speed = this.speed;
    }
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">News Options</div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="`Display the news ticker at the top of the screen with ${formatInt(newsMessageCount)} different messages`"
    >
      <template #label>Display News</template>
      <template #config>
        <PrimaryButton
          class="o-primary-btn--optionmodal"
          onclick="GameOptions.toggleNews()"
        >
          {{ newsOnOffLabel }}
        </PrimaryButton>
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="`Number of news messages that will pass until you're able to see a same message again`"
      :showValue="true"
      :value="repeatBuffer"
      :displayValue="formatInt(parseInt(repeatBuffer))"
    >
      <template #label>Message repeat buffer</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsRepeatBuffer"
          :value="repeatBuffer"
          @input="adjustSliderValueRepeatBuffer($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Probability of an AI message showing next; AI messages are pre-generated with GPT-2'"
      :showValue="true"
      :value="AIChance"
      :displayValue="formatPercents(parseFloat(AIChance))"
    >
      <template #label>AI messages</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsAIChance"
          :value="AIChance"
          @input="adjustSliderValueAIChance($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'How fast the news messages move; Slower scrolling speeds give more time to read'"
      :showValue="true"
      :value="speed"
      :displayValue="formatPercents(parseFloat(speed))"
    >
      <template #label>Scroll speed</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderPropsSpeed"
          :value="speed"
          @input="adjustSliderValueSpeed($event)"
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Some news messages have fancy animations'"
    >
      <template #label>Animation Effects</template>
      <template #config>
        <ModalOptionsToggleButton
          v-model="includeAnimated"
          class="o-primary-btn o-primary-btn--optionmodal"
          text=""
        />
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>