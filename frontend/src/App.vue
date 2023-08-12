<template>
  <div id="app">
    <Header/>
    <notifications position="bottom right"/>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header"
import axios from 'axios'

export default {
  name: "App",
  components: {
    Header,
  },
  beforeCreate() {
    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  created(){
      this.$store.dispatch("initAuth")
  }
}
</script>