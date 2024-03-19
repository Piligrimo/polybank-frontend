<template>
  <div class="transaction">
    <h2>Перевод</h2>
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
      <button  @click="transite">Перевести</button>
      
      <p class="link"  @click="$emit('change-screen', 'MAIN')">Назад</p>
  </div>
</template>
<script>
import { api } from '@/api'

export default {
  name: 'MainPage',
  props: {
    user: Object
  },
  data() {
    return {
      users: [],
      sum: 0,
      receiver: null,
      selectedCurrency: null
    }
  },
  async created() {
    this.users = await api.users()
  },
  computed: {
    otherUsers() {
      return this.users.filter(({id})=> id !== this.user.id)
    },
    currencies() {
      return [
        {label: 'Макскоины', name: 'maxcoins'},
        {label: 'Ниссомани', name: 'nissomani'},
        {label: 'Письки', name: 'piski'},
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
      await api.transite({ 
        recieverId: this.receiver, 
        sum: Math.min(this.sum, this.maxAmount),
        currency: this.selectedCurrency
      })
      this.$emit('change-screen', 'MAIN')
      this.$emit('auth')
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
  color: grey;
  margin-top: 0;
  font-size: 11px;
  width: 150px;
  margin: auto;
  text-align: right;
}

</style>
