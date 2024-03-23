<template>
  <div class="deck _centered">
    <h2>Твоя колода</h2>
    <button :disabled="!canBuy" @click="isUnpackingVisible = true">Открыть пачку (10 дичек)</button>
    <h4>у тебя {{ formatedDichki }}</h4>
    <router-link class="link" to="/">Назад</router-link>
    <br>
    <p v-if="loading">Загрузка...</p>
    <div class="card-grid" v-else-if="cards && cards.length">
      <div class="card-container" v-for="item in cards" :key="item.card.id">
        <div class="counter" v-if="item.number > 1">x{{ item.number }}</div>
        <card  
          @click="chosenCard = item.card"
          v-bind="item.card"
          size="s"
        />
      </div>
    </div>
    <p v-else>У тебя пока нет карт</p>

    <div v-if="chosenCard" class="card-display" @click="chosenCard = null"> 
      <card v-bind="chosenCard"/>
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
      chosenCard: null,
      isUnpackingVisible: false
    }
  },
  created() {
    this.updateCollection()
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST', updateUser: 'GET_USER'}),
    handleUnpacking() {
      this.isUnpackingVisible = false
      this.updateCollection()
      this.updateUser()
    },
    async updateCollection () {
      const res =  await this.callRequest(api.getCollection)
      this.cards = res.reverse()
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
    }
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
.history-item__header {
  display: flex;
  justify-content: space-between;
}
.counter {
  border-radius: 10px;
  position: absolute;
  top: -5px;
  left: -5px;
  background-color: #35a33a;
  padding: 2px 10px;
  color: #fff;
  width: fit-content;
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
