<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 offset-4 card card-primary p-3 border"
           :class="{'border-primary' : isUser, 'border-success' : !isUser }">
        <h3
            :class="{'text-primary' : isUser, 'text-success' : !isUser }"
            class="text-center mb-3 mt-3">Vue.js | Auth</h3>
        <hr>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Kullanıcı Adını</label>
            <input v-model="user.username"  class="form-control"
                   placeholder="Kullanıcı Adını Giriniz">
          </div>
          <div v-if="!isUser" class="form-group">
            <label>E-posta Adresiniz</label>
            <input v-model="user.email" type="email" class="form-control"
                   placeholder="E-posta adresinizi giriniz">
          </div>
          <div v-if="!isUser" class="form-group">
            <label>Adınız</label>
            <input v-model="user.first_name" type="text" class="form-control"
                   placeholder="Adınızı giriniz">
          </div>
          <div v-if="!isUser" class="form-group">
            <label>Soyadınız</label>
            <input v-model="user.last_name" type="text" class="form-control"
                   placeholder="Soyadınızı giriniz">
          </div>
          <div class="form-group">
            <label>Şifre</label>
            <input v-model="user.password" type="password" class="form-control" placeholder="Şifreniz...">
          </div>
          <div v-if="!isUser" class="form-group">
            <label>Admin</label>
            <div class="col-2">
              <input v-model="user.is_superuser" type="checkbox" class="form-control">
            </div>
          </div>
          <div class="button-container d-flex  flex-column align-items-center">
            <button type="submit" :class="{'btn-primary' : isUser, 'btn-success' : !isUser }"
                    class="btn btn-block mb-2">
              {{ isUser ? 'Giriş Yap' : 'Kayıt Ol' }}
            </button>
            <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
              {{ isUser ? 'Üye değilim' : 'Üyeliğim var' }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

import Vue from 'vue'


export default {
  name: "Auth",
  data() {
    return {
      user: {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        password: null,
        is_superuser: false,
      },
      isUser: false,
    }
  },
  methods: {
    onSubmit() {
      if (this.isUser) {
        this.$store.dispatch("login", this.user)
            .then(response => {
              Vue.notify({
                type: 'success',
                title: 'Başarılı',
                text: 'Başarıyla giriş yaptınız!',
              });

              setTimeout( ()=> {
                this.$router.push("/")
              },1000)

            }).catch(r => {
          Vue.notify({
            type: 'error',
            title: 'Başarısız',
            text: 'Lütfen bilgileri kontrol ediniz!',
          });
        })
      } else {
        this.$store.dispatch('register', this.user).then(response => {
          this.isUser = true
          Vue.notify({
            type: 'success',
            title: 'Başarılı',
            text: 'Başarıyla kayıt oldunuz!',
          });
        }).catch(r => {
          Vue.notify({
            type: 'error',
            title: 'Başarısız',
            text: 'Bir şeyler ters gitti!',
          });
        })
      }
    }
  },
}
</script>

<style scoped>

</style>