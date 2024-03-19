<template>
  <div class="history">
    <h2>История</h2>

    <template v-if="history.length">
      <div v-for="item in history" :key="item.id" class="history-item">
        <div class="history-item__header">
          <h3 :style="{color: isPositive(item) ? 'lime' : 'grey' }"> 
            {{ isPositive(item) ? '+' : '-' }}{{ formatSum(item) }} 
          </h3>
          <p class="person">
            {{ isPositive(item) ? 'от' : 'для' }} {{ isPositive(item) ? item.giver : item.reciever }}
          </p>
        </div>
        <div v-if="item.comment" class="comment">
          {{ item.comment }}
        </div>
      </div>      
    </template>
    <p v-else>У тебя пока не быдо переводов</p>

    <p class="link" @click="$emit('change-screen', 'MAIN')">Назад</p>
  </div>
</template>
<script>
import { api } from '@/api';

const currencyDictionary = {
  maxcoins: ['Макскоин','Макскоинов','Макскоинов'],
  nissomani: ['Ниссомони','Ниссомони','Ниссомони'],
  piski: ['Дичка','Дички','Дичек'],
  ilushekels: ['Илюшекель','Илюшекеля','Илюшекелей'],
  rudies: ['Рудия','Рудии','Рудий'],
}

const pluralize = (amount, [one, two, five]) => {
  if (amount >=5 && amount <=20) return `${amount}${five}`
  const div = amount % 10
  if (div === 1) return `${amount} ${one}`
  if (div >= 2 && div <= 4) return `${amount} ${two}`
  return `${amount} ${five}`
}

export default {
  name: 'HistoryPage',
  props: {
    user: Object
  },
  data() {
    return{
      history: [],
    }
  },
  async created() {
    this.history = await api.getHistory()
  },
  methods: {
    isPositive({reciever}) {
      return reciever === this.user?.login
    },
    formatSum ({currency, sum}) {
      return pluralize(sum, currencyDictionary[currency])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history-item {
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-bottom: 24px;
  max-width: 300px;
  text-align: left;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
}
.comment {
  color: grey;
  background-color: #e7e7e7;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 16px;
}
h3 {
  margin: 0;
  width: min-content;
  white-space: nowrap
}
.history-item__header {
  display: flex;
  justify-content: space-between;
}
.person {
  font-size: 12px;
  margin: 0;
  color: gray;
}
</style>
