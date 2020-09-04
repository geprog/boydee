<template>
  <div class="home">
    <v-btn :href="loginUrl">{{ $t('login') }}</v-btn>
    <pre>{{ user }}</pre>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  get user() {
    console.log(this.$store.state.auth.user);
    return this.$store.state.auth.user;
  }

  get loginUrl() {
    return 'http://localhost:3000/oauth/github?redirect=/auth/callback';
  }
}
</script>
