<template>
  <div class="main-page">
    <h2>{{ user.login }}</h2>
    <table>
      <tr><td align="left">Макскоины</td><td align="right">{{ user.maxcoins }}</td></tr>
      <tr><td align="left">Ниссомани</td><td align="right">{{ user.nissomani }}</td></tr>
      <tr><td align="left">Письки</td><td align="right">{{ user.piski }}</td></tr>
      <tr><td align="left">Илюшекели</td><td align="right">{{ user.ilushekels }}</td></tr>
      <tr><td align="left">Рудии</td><td align="right">{{ user.rudies }}</td></tr>
      <br>
      <button  @click="$emit('change-screen', 'TRANSACTION')">Перевести</button>
      <br>
      <br>
      <br>
      <br>
      <p class="link" @click="logOf">Выйти</p>

    </table>
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
