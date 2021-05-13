<template>
  <div id="app">
      <Header v-if="checkShowHeaderFooter()"/>
      <Sidebar v-if="checkShowHeaderFooter()"/>
      <transition name="fade" mode="out-in">
          <router-view />
      </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
      Header,
      Sidebar
  },
  methods: {
    checkShowHeaderFooter() {
       if (this.$route.name === 'Login' || this.$route.name === 'SignUp') {
          return false
       }

       return true
    }
  }
}
</script>
