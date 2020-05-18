<template>
  <div id="app">
    <Navbar />
    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
* {
  border-radius: 0px;
}
body {
  background-color: #f3f3f3;
}
</style>