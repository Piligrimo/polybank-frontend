<template>
  <div class="sig-nup">
    <input type="text" v-model="login" placeholder="Логин">
    <input type="password" v-model="password" placeholder="Пароль">
    <p class="error-message"> {{ errorMessage }} </p>
    <button @click="signIn">Войти</button>
    <router-link class="link" to="/signup">У меня нет аккаунта</router-link>
  </div>
</template>

<script>
import {api} from '../api'

export default {
  name: 'LogIn',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '' 
    }
  },
  methods: {
    async signIn() {
      try {
        await api.signIn({
          login: this.login,
          password: this.password,
        })
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.errorMessage = error.response?.data?.message
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display: block;
  margin: auto;
  margin-bottom: 10px;
}

</style>
