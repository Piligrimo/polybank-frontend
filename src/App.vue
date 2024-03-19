<template>
  <h1>ПОЛИБАНК</h1>
  <component 
    :is="screen" 
    :user="currentUser"
    @auth="getCurrentUser"
    @change-screen="setScreen"
  />
</template>

<script>
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import MainPage from './components/MainPage.vue'
import TransactionPage from './components/TransactionPage.vue'
import History from './components/History.vue'
import { api } from './api';

const screenEnum = {
  LOGIN: 'LogIn',
  SIGN_UP: 'SignUp',
  TRANSACTION: 'TransactionPage',
  MAIN: 'MainPage',
  HISTORY: 'History',
}

export default {
  name: 'App',
  components: {
    SignUp,
    LogIn,
    MainPage,
    TransactionPage,
    History
  },
  data() {
    return {
      screen: screenEnum.LOGIN,
      currentUser: null
    }
  },
  created() {
    this.getCurrentUser() 
  },
  methods: {
    setScreen(screen) {
      this.screen = screenEnum[screen]
    },
    async getCurrentUser() {
      this.currentUser = await api.me()
      if (this.currentUser) {
        this.screen = screenEnum.MAIN
      } else {
        this.screen = screenEnum.LOGIN
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error-message {
  color: red;
  font-size: 12px;
}
.link {
  color: grey;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}
.link:hover {
  opacity: 0.8;
}
</style>
