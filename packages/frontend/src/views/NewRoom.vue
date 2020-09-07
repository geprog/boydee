<template>
  <div class="new-room">
    <b-field>
      <b-upload v-model="file" drag-drop accept="image/svg+xml,.svg">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <v-icon>fa-upload</v-icon>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Buefy from 'buefy';

import FileUpload from '@/components/FileUpload.vue';

import 'buefy/dist/buefy.css';

Vue.use(Buefy);

@Component
export default class NewRoom extends Vue {
  private file: File | null = null;

  @Watch('file')
  onFileChanged(file: File | null) {
    if (!file) {
      return;
    }

    const fr = new FileReader();

    fr.onload = (e) => {
      if (e && e.target) {
        const svg = e.target.result;

        console.log(svg);

        // TODO: interpret svg file
      }
    };

    fr.readAsText(file);
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
</style>
