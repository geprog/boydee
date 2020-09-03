<template>
  <div id="app">
    <div id="nav">
      <AppBar />
      <router-link to="/">{{ $t('home') }}</router-link> |
      <router-link to="/about">{{ $t('about') }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
@Component({
  components: { AppBar },
})
export default {

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
