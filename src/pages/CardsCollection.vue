<template>
  <div class="history">
    <h2>Твоя колода</h2>
    <p v-if="loading">Загрузка...</p>
    <template v-else-if="cards.length">
      <card
        v-for="card in cards"
        v-bind="card"
        :key="card.id"
      />
    </template>
    <p v-else>У тебя пока нет карт</p>

    <router-link class="link" to="/">Назад</router-link>
  </div>
</template>
<script>
import { api } from '@/api';
import { mapState, mapActions} from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'CardsCollection',
  components: {
    Card
  },
  data() {
    return{
      cards: [],
    }
  },
  async created() {
    this.cards = await this.callRequest(api.getCards)
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST' }),
  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history-item {
  border-radius: 10px;
  background-color: #fff;
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
  color: #525252;
  background-color: #e7e7e7;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  padding: 12px 18px;
  margin-top: 16px;
}
h3 {
  color: #202020;
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
  text-align: right;
}
</style>
