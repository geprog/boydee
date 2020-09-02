<template>
  <div class="home">
    <img src="../assets/logo.png" />
    <HelloWorld :msg="$t('welcome_vue')" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
