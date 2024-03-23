<template>
  <div class="transaction _centered">
    <h2>Перевод</h2>
    <template v-if="user">
      <label for="user">Кому</label>
      <select v-model="receiver" id="user">
        <option 
          v-for="user in otherUsers" 
          :value="user.id" 
          :key="user.id"
        >
          {{ user.login }}
        </option>
      </select>
      <br>

      <label for="sum">Сколько</label>
      <input v-model="sum" type="number" min="0" :max="maxAmount" id="sum" style="margin-bottom: 0;">
      <p v-if="maxAmount" class="hint">У тебя есть {{ maxAmount }}</p>
      <br>

      <label for="currency">Чего</label>
      <select v-model="selectedCurrency" id="currency"> 
        <option 
          v-for="currency in currencies" 
          :value="currency.name" 
          :key="currency.name"
        >
          {{ currency.label }}
        </option>
      </select>

      <label for="comment">Коммент</label>
      <textarea v-model="comment" name="comment" id="comment" rows="5"/>
      <p class="error-message"> {{ errorMessage }} </p>
    </template>
    <button  @click="transite">Перевести</button>
    <router-link class="link" to="/">Назад</router-link>
  </div>
</template>
<script>
import { api } from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'MainPage',
  data() {
    return {
      users: [],
      sum: 0,
      receiver: null,
      selectedCurrency: null,
      errorMessage: '',
      comment:''
    }
  },
  async created() {
    this.users = await api.users()
  },
  computed: {
    ...mapState({user: ({ user } ) => user}),
    otherUsers() {
      return this.users.filter(({id})=> id !== this.user?.id)
    },
    currencies() {
      return [
        {label: 'Макскоины', name: 'maxcoins'},
        {label: 'Ниссомани', name: 'nissomani'},
        {label: 'Дички', name: 'piski'},
        {label: 'Илюшекели', name: 'ilushekels'},
        {label: 'Рудии', name: 'rudies'},
      ]
    },
    maxAmount() {
      if (!this.selectedCurrency) return null
      return this.user[this.selectedCurrency]
    }
  },
  methods: {
    async transite() {
      if (!this.receiver) {
        this.errorMessage = 'Выбери получателя'
        return
      }
      if (this.sum <= 0) {
        this.errorMessage = 'Выбери положительную сумму'
        return
      }
      if (!this.selectedCurrency) {
        this.errorMessage = 'Выбери валюту'
        return
      }
      await api.transite({ 
        recieverId: this.receiver, 
        sum: Math.min(this.sum, this.maxAmount),
        currency: this.selectedCurrency,
        comment: this.comment
      })
      this.$router.push('/')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  width: 100%;
  text-align: left;
}

textarea,
select,
input
 {
  width: 150px;
  display: block;
  margin: auto;
  margin-bottom: 10px;
}

table {
  width: 200px;
  margin: auto;
}

.hint {
  color: rgb(225, 225, 225);
  margin-top: 0;
  font-size: 11px;
  width: 150px;
  margin: auto;
  text-align: right;
}

</style>
