<template>
  <div class="new-room">
    <div v-if="svg" class="room-preview">
      <p class="room-preview-title">This will be your new room:</p>
      <div v-html="svg" class="room-preview-svg" />
      <div class="room-preview-buttons">
        <v-btn class="btn-reset-room" color="error" @click="resetRoom"><v-icon>fa-times</v-icon></v-btn>
        <v-btn class="btn-save-room" color="primary" @click="saveRoom"><v-icon>fa-save</v-icon></v-btn>
      </div>
    </div>
    <b-field v-else>
      <b-upload v-model="file" drag-drop accept="image/svg+xml,.svg">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <v-icon>fa-upload</v-icon>
            </p>
            <p>Drop your room image (.svg) here or click to upload one</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </div>
</template>

<script lang="ts">
import cheerio from 'cheerio';
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
      }
    };

    fr.readAsText(file);
  }

  resetRoom(): void {
    this.svg = null;
    this.file = null;
  }

  async saveRoom(): Promise<void> {
    if (!this.svg) {
      throw new Error('No SVG found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Room, Desk } = this.$FeathersVuex.api;
    const $ = cheerio.load(this.svg);

    const room = new Room();
    room.svg = this.svg;
    await room.create();

    $('[data-desk]').each((index, element) => {
      const desk = new Desk();
      desk._id = $(element).data('desk');
      desk.room = room._id;
      void desk.create();
    });

    this.$router.replace({ name: 'home' });
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

.room-preview {
  display: flex;
  flex-flow: column;
}

.room-preview-title {
  font-size: 1.5rem;
}

.room-preview-svg {
  margin: 2rem 0;
}

.room-preview-buttons {
  display: flex;
  justify-content: center;
}

.btn-reset-room {
  margin-right: 1rem;
}
</style>
