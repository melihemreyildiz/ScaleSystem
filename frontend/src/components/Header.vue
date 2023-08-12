<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
        <a class="navbar-brand" href="#">Management İşlemleri</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link class="nav-item" tag="li" to="/">
                    <a class="nav-link" href="#">Anasayfa</a>
                </router-link>
                <router-link class="nav-item" tag="li" to="/about">
                    <a class="nav-link" href="#">Hakkımda</a>
                </router-link>
              <router-link class="nav-item" tag="li" to="/routes">
                    <a class="nav-link" href="#">Route List</a>
                </router-link>
            </ul>
            <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
                <li class="nav-item">
                    <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
                </li>
            </ul>
<!--          <ul class="navbar-nav my-2 my-lg-0" :class="loginClass">-->
<!--                <li class="nav-item">-->
<!--                    <a @click="$router.push('/auth')" class="nav-link" href="#">Login</a>-->
<!--                </li>-->
<!--            </ul>-->
        </div>
    </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
            logout() {
                this.$store.dispatch("logout")
            }
        },
        computed: {
            logoutClass() {
                return {
                    'd-none': !this.$store.getters.isAuthenticated
                }
            },
            loginClass() {
                return {
                    'd-none': this.$store.getters.isAuthenticated
                }
            },
        }
}
</script>

<style scoped>

</style>