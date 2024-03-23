<template>
  <div class="main-page">
    <h2>{{ user ? user.login : 'Моя поликрипта'}}</h2>
    <table v-if="!loading">
      <tr><td align="left">Макскоины</td><td align="right">{{ user && user.maxcoins }}</td></tr>
      <tr><td align="left">Ниссомони</td><td align="right">{{ user && user.nissomani }}</td></tr>
      <tr>
        <td align="left">Дички  <router-link to="/cards">🃏</router-link> </td>
        <td align="right">{{ user && user.piski }}</td>
      </tr>
      <tr><td align="left">Илюшекели</td><td align="right">{{ user && user.ilushekels }}</td></tr>
      <tr><td align="left">Рудии</td><td align="right">{{ user && user.rudies }}</td></tr>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  data() {
    return{}
  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    })
  },
  created() {
    console.log('MainPage created');
    this.updateUser()
  },
  methods: {
    ...mapActions( { 
      callRequest:'CALL_REQUEST',
      getUser: 'GET_USER'
    }),
    async updateUser() {
      await this.callRequest(this.getUser)
    },
    async logOf() {
      localStorage.removeItem('token')
      await this.updateUser()
      this.$router.push('/login')
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
