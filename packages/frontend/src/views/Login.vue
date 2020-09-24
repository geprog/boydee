<template>
  <div class="login">
    <v-btn color="primary" class="login-btn" :href="loginUrl"
      ><span>{{ $t('login') }}</span
      ><v-icon small>fab fa-github-square</v-icon></v-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  get loginUrl() {
    return 'http://localhost:3000/oauth/github?redirect=/auth/callback';
  }

  mounted(): void {
    if (this.$store.getters['auth/isAuthenticated']) {
      void this.$router.replace({ name: 'home' });
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  margin-top: 52px;
}

.login-btn {
  margin: auto;
}

.login-btn span {
  margin-right: 1rem;
}
</style>
