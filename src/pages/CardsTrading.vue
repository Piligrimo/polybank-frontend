<template>
  <div class="trading _centered">
    <h2>Обмен карточками</h2>
    <router-link class="link" to="/cards">Назад</router-link>
    <br>
    <p v-if="loading">Загрузка...</p>
    <div class="trading-grid" v-else-if="lots && lots.length">
      <div class="card-container" v-for="{item, id, user} in lots" :key="id">
        <div class="login-badge">{{ user.login }}</div>
        <router-link :to="`/trading/${id}`">
          <card v-bind="item.card" size="s"/>
        </router-link>
      </div>
    </div>
    <p v-else>Сейчас нет доступных лотов</p>
  </div>
</template>
<script>
import { api } from '@/api';
import { mapState, mapActions} from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'CardsTrading',
  components: {
    Card,
  },
  data() {
    return{
      lots: [],
    }
  },
  created() {
    this.updateCollection()
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST', updateUser: 'GET_USER'}),
    async updateCollection () {
      const res =  await this.callRequest(api.getLots)
      this.lots = res.reverse()
    }
  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: #202020;
  margin: 0;
  width: min-content;
  white-space: nowrap
}
.login-badge {
  border-radius: 15px;
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 12px;
  background-color: #ffffff;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  padding: 4px 10px;
  color: #2f2f2f;
  font-weight: bold;
  width: fit-content;
}

.card-container {
  position: relative;
}

.trading-grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
