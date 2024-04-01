<template>
  <div class="deck _centered">
    <h2>Твоя колода</h2>
    <br>
    <p v-if="loading">Загрузка...</p>
    <div class="card-grid" v-else-if="cards && cards.length">
      <div class="card-container" v-for="item in cards" :key="item.id">
        <card  
          @click="chosenCard = item"
          v-bind="item"
          size="s"
        />
      </div>
    </div>
    <p v-else>У тебя пока нет карт</p>

    <div v-if="chosenCard" class="card-display" @click="chosenCard = null"> 
      <card v-bind="chosenCard"/>
    </div>
  </div>
</template>
<script>
import { api } from '@/api';
import { mapState, mapActions} from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'CardsCollection',
  components: {
    Card,
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
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST', updateUser: 'GET_USER'}),
    async updateCollection () {
       await this.callRequest(async () => {
        const cards = await api.getCards()
        this.cards = cards.reverse()
      })
    },
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
