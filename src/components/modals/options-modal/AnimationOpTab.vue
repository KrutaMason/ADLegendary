<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import OptionsModalSet from "@/components/OptionsModalSet";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "AnimationOpTab",
  components: {
    ModalOptionsToggleButton,
    OptionsModalSet,
    SliderComponent
  },
  data() {
    return {
      infinityUnlocked: false,
      eternityUnlocked: false,
      dilationUnlocked: false,
      tachyonsUnlocked: false,
      realityUnlocked: false,
      celestialsUnlocked: false,
      animatedThemeUnlocked: false,
      bigCrunch: false,
      eternity: false,
      dilation: false,
      tachyonParticles: false,
      reality: false,
      celreality: false,
      background: false,
      blobSnowflakes: 16,
      isBlackHoleUnlocked: false,
      blobHole: false,
      isS11Active: false,
      isS11Unlocked: false,
      wobbly:false,
    };
  },
  computed: {
    sliderProps() {
      return {
        min: 1,
        max: 500,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
    fullCompletion() {
      return player.records.fullGameCompletions > 0;
    }
  },
  watch: {
    bigCrunch(newValue) {
      player.options.animations.bigCrunch = newValue;
    },
    eternity(newValue) {
      player.options.animations.eternity = newValue;
    },
    dilation(newValue) {
      player.options.animations.dilation = newValue;
    },
    tachyonParticles(newValue) {
      player.options.animations.tachyonParticles = newValue;
    },
    reality(newValue) {
      player.options.animations.reality = newValue;
    },
    celreality(newValue) {
      player.options.animations.celreality = newValue;
    },
    background(newValue) {
      player.options.animations.background = newValue;
    },
    blobSnowflakes(newValue) {
      player.options.animations.blobSnowflakes = parseInt(newValue, 10);
    },
    blobHole(newValue) {
      player.options.animations.blobHole = newValue;
    },
    wobbly(newValue) {
      player.options.animations.wobbly = newValue;
    }
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.infinityUnlocked = this.fullCompletion || progress.isInfinityUnlocked;
      this.eternityUnlocked = this.fullCompletion || progress.isEternityUnlocked;
      this.realityUnlocked = this.fullCompletion || progress.isRealityUnlocked;
      // 136 is given upon dilating
      this.dilationUnlocked = this.realityUnlocked || Achievement(136).canBeApplied;
      this.tachyonsUnlocked = this.realityUnlocked || Currency.tachyonParticles.gt(0);
      this.animatedThemeUnlocked = Theme.animatedThemeUnlocked;
      this.isS11Active = Theme.currentName() === "S11";
      this.isS11Unlocked = Themes.available().map(t => t.name).includes("S11");
      this.isBlackHoleUnlocked = player.blackHole[0].unlocked;
      this.celestialsUnlocked = Achievement(147).isUnlocked;

      const options = player.options.animations;
      this.bigCrunch = options.bigCrunch;
      this.eternity = options.eternity;
      this.dilation = options.dilation;
      this.tachyonParticles = options.tachyonParticles;
      this.reality = options.reality;
      this.celreality = options.celreality;
      this.background = options.background;
      this.blobSnowflakes = options.blobSnowflakes;
      this.blobHole = options.blobHole;
      this.wobbly = options.wobbly;
    },
    adjustSliderValue(value) {
      this.blobSnowflakes = value;
      player.options.blobSnowflakes = this.blobSnowflakes;
    }
  }
};
</script>

<template>
  <div>
    <div class="c-optionmodal--section-name">Animation Options</div>
    <div class="c-optionmodal--section-multicolumn">
    <OptionsModalSet
      :tooltip="'Has a wobbly effect when hovering over buttons'"
    >
      <template #label>Wobbles</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="wobbly"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Shrinks the screen when performing a Big Crunch'"
      v-if="infinityUnlocked"
    >
      <template #label>Big Crunch</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="bigCrunch"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Makes the screen fade out when performing an Eternity'"
      v-if="eternityUnlocked"
    >
      <template #label>Eternity</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="eternity"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Streches or compresses the screen when Dilating Time or exiting Dilation'"
      v-if="dilationUnlocked"
    >
      <template #label>Time Dilation</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="dilation"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Display Particles in the Time Dilation subtab; Disabling may improve performance'"
      v-if="tachyonsUnlocked"
    >
      <template #label>Tachyons in Background</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="tachyonParticles"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Travels through the stars when making a new Reality'"
      v-if="realityUnlocked"
    >
      <template #label>Reality</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="reality"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Show animation in the background while in a Celestial Reality'"
      v-if="celestialsUnlocked"
    >
      <template #label>Celestial Reality in Background</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="celreality"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="'Have the particles around the Black Hole be blobs on other themes'"
      v-if="isS11Unlocked && isBlackHoleUnlocked"
    >
      <template #label>Always use Blobhole</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="blobHole"
          text=""
        />
      </template>
    </OptionsModalSet>
    <OptionsModalSet
      :tooltip="!isS11Active ? 'Some themes have animations in the background; Disabling may improve performance' 
      : 'Blobs fall all over the screen; Disabling may improve performance'"
      v-if="animatedThemeUnlocked"
    >
      <template #label>{{!isS11Active ? "Animated Background" : "Blobflakes"}}</template>
      <template #config>
        <ModalOptionsToggleButton
          class="o-primary-btn o-primary-btn--optionmodal"
          v-model="background"
          onclick="Themes.find(Theme.currentName()).set();"
          text=""
        />
      </template>
    </OptionsModalSet>
    </div>
    <div class="c-optionmodal--section">
    <OptionsModalSet
      :tooltip="'Display how many blobs are falling at a time; Reducing the amount may improve performance'"
      :showValue="true"
      :value="blobSnowflakes"
      :displayValue="formatInt(blobSnowflakes)"
      v-if="isS11Active"
    >
      <template #label>Number of Blobflakes</template>
      <template #config>
        <SliderComponent
          class="l-optionmodal--slider"
          v-bind="sliderProps"
          :value="blobSnowflakes"
          @input="adjustSliderValue($event)"
        />
      </template>
    </OptionsModalSet>
    </div>
  </div>
</template>