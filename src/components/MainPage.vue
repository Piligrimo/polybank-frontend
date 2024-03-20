<template>
  <div class="main-page">
    <h2>{{ user ? user.login : 'Моя поликрипта'}}</h2>
    <table v-if="!loading">
      <tr><td align="left">Макскоины</td><td align="right">{{ user.maxcoins }}</td></tr>
      <tr><td align="left">Ниссомони</td><td align="right">{{ user.nissomani }}</td></tr>
      <tr><td align="left">Дички</td><td align="right">{{ user.piski }}</td></tr>
      <tr><td align="left">Илюшекели</td><td align="right">{{ user.ilushekels }}</td></tr>
      <tr><td align="left">Рудии</td><td align="right">{{ user.rudies }}</td></tr>
    </table>
    <p v-else>Загрузка...</p>
    <br>
    <router-link to="/transaction">
      <button>Перевести</button>
    </router-link>
    <router-link class="link" to="/history">История</router-link>
    <p class="link" @click="logOf">Выйти</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'MainPage',
  data() {

  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    })
  },
  methods: {
    logOf() {
      localStorage.removeItem('token')
      this.$emit('auth')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  margin: auto;
}
button,
input {
  display: block;
  margin: auto;
  margin-bottom: 10px;
}

table {
  width: 200px;
  margin: auto;
}

</style>
