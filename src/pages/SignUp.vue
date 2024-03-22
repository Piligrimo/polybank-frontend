<template>
  <div class="sign-up">
    <input type="text" v-model="login" placeholder="Логин">
    <input type="password" v-model="password" placeholder="Пароль">
    <input type="password" v-model="confirmPassword" placeholder="Повтори пароль">
    <p class="error-message"> {{ errorMessage }} </p>
    <button @click="signUp">Зарегистрироваться</button>
    <router-link class="link" to="/login">Войти</router-link>
  </div>
</template>

<script>
import {api} from '../api'

export default {
  name: 'SignUp',
  props: {
    msg: String
  },
  data() {
    return {
      login: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    async signUp() {
      try {
        await api.signUp({
          login: this.login,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.errorMessage = error.response.data.message
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
