<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="checkApi">{{ $t('hello_world.check_api') }}</button>
    <h2>{{ $t('hello_world.api_result') }}:</h2>
    <pre>{{ apiResult }}</pre>
    <br />

    <hr />
    <form @submit.prevent="createUser">
      <input v-model="firstName" type="text" :placeholder="$t('user.firstname')" required />
      <input v-model="lastName" type="text" :placeholder="$t('user.lastname')" required />
      <button>{{ $t('user.create_user') }}</button>
    </form>
    <h2>{{ $t('user.create_user_result') }}:</h2>
    <pre>{{ userResult }}</pre>
    <br />

    <hr />
    <button @click="listUsers">{{ $t('user.list_users') }}</button>
    <h2>{{ $t('user.list_users') }}:</h2>
    <pre>{{ users }}</pre>
    <br />

    <hr />
    <h2>{{ $t('language') }}:</h2>
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="i" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { getMessage, User } from '@boydee/commons';
import { Paginated } from '@feathersjs/feathers';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { feathers } from '@/lib';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private firstName = '';
  private lastName = '';
  private apiResult: string | null = null;
  private userResult: User | User[] | null = null;
  private users: User | User[] | Paginated<User> | null = null;
  private helloService = feathers.service('hello');
  private userService = feathers.service('user');
  private langs = ['en', 'de'];

  private async checkApi(): Promise<void> {
    this.apiResult = null;
    const hello = await this.helloService.get(0);
    this.apiResult = getMessage(hello);
  }

  private async createUser(): Promise<void> {
    const user = new User(this.firstName, this.lastName);
    this.firstName = 'ssg';
    this.lastName = 'ishimura';
    this.userResult = await this.userService.create(user);
  }

  private async listUsers(): Promise<void> {
    this.users = await this.userService.find();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
