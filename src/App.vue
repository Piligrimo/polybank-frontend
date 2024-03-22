<template>
  <h1>ПОЛИБАНК</h1>
  <router-view/>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions( { 
      callRequest:'CALL_REQUEST',
      getUser: 'GET_USER'
    }),
  }
}
</script>

<style>
body {
  background: rgb(2,0,36);
  background: linear-gradient(187deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(169,0,255,1) 100%);
  min-height: 100vh;
}

button {
  background-color: rgba(169,0,255,1);
  border: 2px solid rgb(249, 85, 255) ;
  color: #fdfdfd;
  text-transform: uppercase;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
}
a:-webkit-any-link {
  text-decoration: none;
}

textarea,
select,
input {
  border: 2px solid rgb(249, 85, 255) ;
  padding: 8px 16px;
  border-radius: 30px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fdfdfd;
  margin-top: 60px;
}
.error-message {
  color: red;
  font-size: 12px;
}
.link {
  color: rgb(255, 255, 255);
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 4px;
  display: block;
}
.link:hover {
  opacity: 0.8;
}
</style>
