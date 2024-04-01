<template>
  <div class="deck _centered">
    <h2>Твоя колода</h2>
    <button :disabled="!canBuy" @click="isUnpackingVisible = true">Открыть пачку (10 дичек)</button>
    <br>
    <router-link to="/trading">
      <button>Обмен карточками</button>
    </router-link>
    <br>
    <h4>у тебя {{ formatedDichki }}</h4>
    <h4 v-if="cards && cards.length">у тебя в коллекции {{ cards.length }} карт из {{ cardsTotal }}</h4>
    <router-link class="link" to="/">Назад</router-link>
    <br>
    <p v-if="loading">Загрузка...</p>
    <div class="card-grid" v-else-if="cards && cards.length">
      <div class="card-container" v-for="item in cards" :key="item.id">
        <div class="counter badge" v-if="item.number > 1">x{{ item.number }}</div>
        <div class="in-trading badge" v-if="isInTrading(item.id)">на обмен</div>
        <card  
          @click="chosenCard = item"
          v-bind="item.card"
          size="s"
        />
      </div>
    </div>
    <p v-else>У тебя пока нет карт</p>

    <div v-if="chosenCard" class="card-display" @click="chosenCard = null"> 
      <card v-bind="chosenCard.card" :isUsable="true" @use-actions="useAction(chosenCard)"/>
      <button v-if="!isInTrading(chosenCard.id) && !user.is_trading" @click="trade">Выставить на обмен</button>
    </div>

    <unpacking v-if="isUnpackingVisible" @unpacked="handleUnpacking"/>
  </div>
</template>
<script>
import { api } from '@/api';
import { mapState, mapActions} from 'vuex'
import Card from '@/components/Card.vue'
import Unpacking from '@/components/Unpacking.vue'
import { pluralize } from '@/utils';

export default {
  name: 'CardsCollection',
  components: {
    Card,
    Unpacking
  },
  data() {
    return{
      cards: [],
      myLots: [],
      cardsTotal: 0,
      chosenCard: null,
      isUnpackingVisible: false
    }
  },
  created() {
    this.updateCollection()
    this.updateUser()
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST', updateUser: 'GET_USER'}),
    handleUnpacking() {
      this.isUnpackingVisible = false
      this.updateCollection()
      this.updateUser()
    },
    async updateCollection () {
       await this.callRequest(async () => {
        const cards = await api.getCollection()
        this.cards = cards.collection.reverse()
        this.cardsTotal = cards.allCardsCount
        this.myLots = await api.getMyLots()
      })
    },
    async trade () {
      await this.callRequest(async () => {
        await api.createLot(this.chosenCard.id)
        this.$router.push('/trading')
      })
    },
    isInTrading(id){
      return this.myLots.find(({collection_item_id}) => collection_item_id === id)
    },
    async useAction(item) {
      await api.useCard(item.id)
      await this.updateCollection()
      this.chosenCard = false
    }
  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    }),
    formatedDichki() {
      return pluralize(this.user.piski,['дичка', 'дички', 'дичек'])
    },
    canBuy() {
      return this.user?.piski >= 10
    },
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
h4 {
  margin-top: 8px;
  margin-bottom: 0;
}
.history-item__header {
  display: flex;
  justify-content: space-between;
}
.counter {
  background-color: #35a33a;
  top: -5px;
  left: -5px;
  padding: 2px 10px;
}

.badge {
  border-radius: 10px;
  position: absolute;
  color: #fff;
  width: fit-content;
}
.in-trading {
  background-color: #8333a3;
  top: -5px;
  right: -5px;
  font-size: 10px;
  line-height: 1;
  padding: 8px 10px;

}

.card-container {
  position: relative;
}

.card-grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  /* grid-template-columns: 1fr; */
}
.card-display{
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  height: 110vh;
  width: 100vw;
  background-color: #000b;
}
</style>
