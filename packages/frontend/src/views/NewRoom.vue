<template>
  <div class="new-room">
    <div v-if="svg" class="room-preview">
      <p class="room-preview-title">This will be your new room:</p>
      <div v-html="svg" class="room-preview-svg" />
      <v-btn color="primary" @click="saveRoom">Save new room</v-btn>
    </div>
    <b-field v-else>
      <b-upload v-model="file" drag-drop accept="image/svg+xml,.svg">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <v-icon>fa-upload</v-icon>
            </p>
            <p>Drop your room SVG image here or click to upload one</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class NewRoom extends Vue {
  private file: File | null = null;
  private svg: string | null = null;

  @Watch('file')
  onFileChanged(file: File | null): void {
    if (!file) {
      return;
    }

    const fr = new FileReader();

    fr.onload = (e) => {
      if (e && e.target && e.target.result) {
        this.svg = e.target.result.toString();
        // TODO: interpret svg file
      }
    };

    fr.readAsText(file);
  }

  async saveRoom(): Promise<void> {
    if (!this.svg) {
      throw new Error('No SVG found');
    }

    await this.$store.dispatch('room/create', room);
  }
}
</script>

<style scoped>
.new-room {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.room-preview-title {
  font-size: 1.5rem;
}

.room-preview-svg {
  margin: 2rem 0;
}
</style>
