<template>
  <div class="home">
    <p>{{ error }}</p>
    <p>{{ user }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthCallback extends Vue {
  error: string | null = null;

  async mounted(): Promise<void> {
    try {
      await this.$store.dispatch('auth/authenticate');
    } catch (err) {
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
