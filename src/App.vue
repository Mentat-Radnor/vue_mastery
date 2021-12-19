<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div id="nav">
    <router-link :to="{ name: 'EventList' }">EventList</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <h1>Events for Good</h1>

  <router-view />
</template>

<script>
export default {
  inject: ['GStore'],
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
