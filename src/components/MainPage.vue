<template>
  <div class="main-page">
    <h2>{{ user.login }}</h2>
    <table>
      <tr><td align="left">Макскоины</td><td align="right">{{ user.maxcoins }}</td></tr>
      <tr><td align="left">Ниссомони</td><td align="right">{{ user.nissomani }}</td></tr>
      <tr><td align="left">Дички</td><td align="right">{{ user.piski }}</td></tr>
      <tr><td align="left">Илюшекели</td><td align="right">{{ user.ilushekels }}</td></tr>
      <tr><td align="left">Рудии</td><td align="right">{{ user.rudies }}</td></tr>
    </table>
    <br>
    <button  @click="$emit('change-screen', 'TRANSACTION')">Перевести</button>
    <p class="link" @click="$emit('change-screen', 'HISTORY')">История</p>
    <p class="link" @click="logOf">Выйти</p>
  </div>
</template>
<script>
//import {api} from '../api'

export default {
  name: 'MainPage',
  props: {
    user: Object
  },
  data() {

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
