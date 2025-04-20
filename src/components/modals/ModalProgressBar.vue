<script>
import OfflineSpeedupButton from "@/components/OfflineSpeedupButton";

export default {
  name: "ModalProgressBar",
  components: {
    OfflineSpeedupButton,
  },
  computed: {
    progress() {
      return this.$viewModel.modal.progressBar;
    },
    foregroundStyle() {
      return {
        width: `${this.progress.current / this.progress.max * 100}%`,
      };
    },
    remainingTime() {
      const timeSinceStart = Date.now() - this.progress.startTime;
      const ms = timeSinceStart * (this.progress.max - this.progress.current) / this.progress.current;
      return TimeSpan.fromMilliseconds(ms).toStringShort();
    },
    buttons() {
      return this.progress.buttons || [];
    }
  },
};
</script>

<template>
  <div
    class="l-modal-overlay c-modal-overlay progress-bar-modal"
  >
    <div class="c-modal">
      <div class="modal-progress-bar">
        <div class="modal-progress-bar__label">
          {{ progress.label }}
        </div>
        <div>
          {{ progress.info() }}
        </div>
        <div class="modal-progress-bar__margin">
          <div>
            {{ progress.progressName }}: {{ formatInt(progress.current) }}/{{ formatInt(progress.max) }}
          </div>
          <div>
            Remaining: {{ remainingTime }}
          </div>
          <div class="modal-progress-bar__hbox">
            <div class="modal-progress-bar__bg">
              <div
                class="modal-progress-bar__fg"
                :style="foregroundStyle"
              />
            </div>
          </div>
        </div>
        <div class="modal-progress-bar__buttons">
          <OfflineSpeedupButton
            v-for="(button, id) in buttons"
            :key="id"
            :button="button"
            :progress="progress"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-modal {
  z-index: 8;
}

.c-modal {
  position: fixed;
  /* stylelint-disable-next-line unit-allowed-list */
  top: 50vh;
  /* stylelint-disable-next-line unit-allowed-list */
  left: 50vw;
  transform: translate(-50%, -50%);
}

.modal-progress-bar {
  display: flex;
  flex-direction: column;
  width: 40rem;
  z-index: 3;
  justify-content: space-between;
  align-items: center;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.6rem;
  background: linear-gradient(transparent, var(--base) 500%);
  background-origin: border-box;
  --base: var(--color-accent)
}

.modal-progress-bar__hbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.modal-progress-bar__bg {
  width: 20rem;
  height: 2rem;
  background: linear-gradient(gray -50%,#222222 49%, black 50%, #222222);
  margin-right: 1rem;
  margin-left: 1rem;
}

.modal-progress-bar__fg {
  height: 100%;
  background: linear-gradient(lightblue -50%,blue 49%, darkblue 50%, blue);
}

.modal-progress-bar__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-bottom: none;
  border-radius: var(--var-border-radius, 1rem) var(--var-border-radius, 1rem) 0 0;
  margin-bottom: -0.6rem;
}

.modal-progress-bar__label {
  font-size: x-large;
  font-family: cambria;
  font-weight: bold;
  line-height: 1.1;
  padding: 0.2rem 2rem;
  margin-bottom: 0.5rem;
  margin-top: -0.6rem;
  border: 0.4rem double color-mix(in srgb, var(--base) 75%, transparent);
  border-top: none;
  border-radius: 0 0 var(--var-border-radius, 1rem) var(--var-border-radius, 1rem);
  background-image: linear-gradient(90deg, 
  color-mix(in srgb, var(--base) 10%, transparent), 
  color-mix(in srgb, var(--base) 35%, transparent), 
  color-mix(in srgb, var(--base) 10%, transparent));
  background-origin: border-box;
}

.modal-progress-bar__margin {
  margin: 1rem 0;
}
</style>
