<template>
  <div class="trading _centered">
    <h2>Предложение обмена</h2>
    <router-link class="link" to="/cards">Назад</router-link>
    <br>
    <p v-if="loading">Загрузка...</p>
    <div v-else class="card-container _centered">
      <div class="login-badge">{{ lot.user.login }}</div>
      <card v-bind="lot.item.card">
      </card>
      <button v-if="isMyLot" @click="cancelTrade">отозвать карту</button>
      <button v-else-if="!user.is_trading" @click="handleOfferMenu">
        {{ isOfferMenuVisible ? 'отменить обмен' : 'предложить обмен'}}
      </button>
      <br>
      <div v-if="isOfferMenuVisible" class="block" id="my-offer">
        <h4>Валюта</h4>
        <table v-if="!loading">
          <tr>
            <td align="left">Макскоины</td>
            <td align="right"><input type="number" v-model="myOffer.maxcoins" :max="user && user.maxcoins"></td>
            <td align="left"> (до {{ user && user.maxcoins }})</td>
          </tr>
          <tr>
            <td align="left">Ниссомони</td>
            <td align="right"><input type="number" v-model="myOffer.nissomani" :max="user && user.nissomani"></td>
            <td align="left"> (до {{ user && user.nissomani }})</td>
          </tr>
          <tr>
            <td align="left">Дички </td>
            <td align="right"><input type="number" v-model="myOffer.piski" :max="user && user.piski"></td>
            <td align="left"> (до {{ user && user.piski }})</td>
          </tr>
          <tr>
            <td align="left">Илюшекели</td>
            <td align="right"><input type="number" v-model="myOffer.ilushekels" :max="user && user.ilushekels"></td>
            <td align="left"> (до {{ user && user.ilushekels }})</td>
          </tr>
          <tr>
            <td align="left">Рудии</td>
            <td align="right"><input type="number" v-model="myOffer.rudies" :max="user && user.rudies"></td>
            <td align="left"> (до {{ user && user.rudies }})</td>
          </tr>
        </table>
        <h4>Карты <span class="add-card-icon" @click="isPickerVisible = true">➕</span></h4>
        <div class="my-offer-cards">
          <span v-if="!myOffer.cards.length">карты не выбраны</span>
          <p v-for="item in myOffer.cards" :key="item.card.id">{{item.card.name}} ({{ rarities[item.card.rarity] }})</p>
        </div>
        <div class="offer-button-container">
          <button class="offer-button" @click="makeOffer">предложить</button>
        </div>
      </div>
    </div>
    <div v-for="offer in offers" :key="offer.id" class="block offer">
      <div>
        <h4>{{offer.login}}</h4>
        <p 
          v-for="(line, i) in formatContent(offer.content)" 
          class="offer-line"
          :key="i"
        >
          {{ line }}
        </p>
      </div>
      <button v-if="isMyLot" class="offer-button" @click="accept(offer.id)">принять</button>
      <button v-else class="offer-button" @click="cancelOffer(offer.id)">отозвать</button>
    </div>
    <card-picker v-if="isPickerVisible" :cards="myCards" @pick="pickCard" />
  </div>
</template>
<script>
import { api } from '@/api';
import { mapState, mapActions} from 'vuex'
import Card from '@/components/Card.vue'
import CardPicker from '@/components/CardPicker.vue'
import { setToInterval, pluralize, currencyDictionary } from '@/utils';

export default {
  name: 'CardsTrading',
  components: {
    Card,
    CardPicker
  },
  data() {
    return{
      lot: null,
      myOffer: {
        maxcoins: 0,
        nissomani: 0,
        piski: 0,
        ilushekels: 0,
        rudies: 0,
        cards: []
      },
      offers: [],
      myCards: {},
      isPickerVisible: false,
      isOfferMenuVisible: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({ callRequest:'CALL_REQUEST', updateUser: 'GET_USER'}),
    async init () {
      await this.callRequest(async () => {
        const cards = await api.getCollection()
        this.myCards = cards.collection
        this.lot = await api.getLot(this.$route.params.id)
        if (!this.lot) {
          this.$router.push('/trading')
        }
        this.offers = await api.getOffersByLot(this.$route.params.id)
        this.isOfferMenuVisible = false
        this.updateUser()
        this.myOffer =  {
          maxcoins: 0,
          nissomani: 0,
          piski: 0,
          ilushekels: 0,
          rudies: 0,
          cards: []
        }
      })
    },
    pickCard(item) {
      this.myOffer.cards.push(item)
      let myCardsTemp = this.myCards.slice()
      const chosenItem = myCardsTemp.find(({id}) => item.id === id)
      chosenItem.number -- 
      if (chosenItem.number <= 0) {
        myCardsTemp = myCardsTemp.filter(({id}) => item.id !== id)
      }
      this.myCards = myCardsTemp
      this.isPickerVisible = false
    },
    handleOfferMenu() {
      this.isOfferMenuVisible = !this.isOfferMenuVisible
      this.$nextTick(() => {
        const offerBlock = document.getElementById('my-offer')
        if (this.isOfferMenuVisible) {
          window.scrollTo({
              top: offerBlock.offsetTop + 50,
              behavior: "smooth",
            }
          )
        }
      })
    },
    async makeOffer() {
      await this.callRequest(async () => {
        const payload = {
          lotId: this.lot.id,
          content: {}
        }
        Object.entries(this.myOffer).forEach(([key, value]) => {
          if (key === 'cards') {
            payload.content.cards = value
          } else {
            payload.content[key] = setToInterval(value, 0, this.user[key])
          }
        })
        await api.createOffer(payload)
        this.init()
      })
    },
    async accept(offerId) {
      await api.acceptTrade( this.lot.id, offerId)
      this.$router.push('/cards')
    },
    async cancelTrade() {
      await api.cancelTrade(this.lot.id)
      this.$router.push('/cards')
    },
    async cancelOffer(id) {
      await api.cancelOffer(id)
      this.init()
    },
    formatContent(content) {
      const parsed = JSON.parse(content)
      const lines = []
      Object.entries(parsed).forEach(([key, value]) => {
        if (key === 'cards') {
          value.forEach(({card}) => {
            lines.push(`${card.name} (${ this.rarities[card.rarity]})`)
          })
        } else if (value)  {
          lines.push(pluralize(value, currencyDictionary[key]))
        }
      })
      if (!lines.length) return ['Ничего']
      return lines
    }
  },
  computed: {
    ...mapState({
      user: ({user})=> user,
      loading: ({loading}) => loading
    }),
    rarities() {
      return {
        trash: 'мусор',
        common: 'обычная',
        rare: 'редкая',
        epic: 'эпичная',
        legendary: 'легендарная',
      }
    },
    isMyLot() {
      return this.user.id === this.lot.user.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  width: 60px;
  padding: 4px 8px;
  font-size: 14px;
}

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
  font-size: 17px;
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
.block {
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  color: #333333;
  margin-bottom: 40px;
  padding: 8px 16px;
}
.my-offer-cards {
  font-size: 14px;
}
.add-card-icon {
  cursor: pointer;
}
h4 {
  margin-bottom: 8px;
}
table {
  width: 100%;
  font-size: 14px;
}
.offer-button-container { 
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 8px;
}

.offer-button {
  font-size: 12px;
  padding: 6px 10px;
}
.offer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 20px;
}
.offer-line{
  margin-bottom: 0;
}
</style>
