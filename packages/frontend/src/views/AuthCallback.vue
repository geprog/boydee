<template>
  <div class="home">
    <p>{{ error }}</p>
    <p>{{ user }}</p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthCallback extends Vue {
  error: string | null = null;

  async mounted(): Promise<void> {
    try {
      // eslint-disable-next-line no-console
      console.log('here');
      await this.$store.dispatch('auth/authenticate');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error');
      // eslint-disable-next-line no-console
      console.log(err);
      this.error = err.className === 'not-autenticated' ? 'Incorrect values' : 'Error on login';
      return;
    }

    this.$router.push('/');
  }

  get user() {
    return this.$store.state.auth.user;
  }
}
</script>
