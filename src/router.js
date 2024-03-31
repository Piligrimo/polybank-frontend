import { createWebHashHistory, createRouter } from 'vue-router'
import { store } from '@/store'

import MainPage from './pages/MainPage.vue'
import SignUp from './pages/SignUp.vue'
import LogIn from './pages/LogIn.vue'
import TransactionPage from './pages/TransactionPage.vue'
import History from './pages/History.vue'
import CardsCollection from './pages/CardsCollection.vue'
import CardsTrading from './pages/CardsTrading.vue'
import TradeOffer from './pages/TradeOffer.vue'

const routes = [
  { path: '/', component: MainPage, meta: {shouldBeAuthed: true} },
  { path: '/signup', component: SignUp, meta: {shouldBeAuthed: false} },
  { path: '/login', component: LogIn, meta: {shouldBeAuthed: false} },
  { path: '/transaction', component: TransactionPage, meta: {shouldBeAuthed: true} },
  { path: '/history', component: History, meta: {shouldBeAuthed: true} },
  { path: '/cards', component: CardsCollection, meta: {shouldBeAuthed: true}  },
  { path: '/trading', component: CardsTrading,  meta: {shouldBeAuthed: true}  },
  { path: '/trading/:id', component: TradeOffer,  meta: {shouldBeAuthed: true}  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if(to.meta.shouldBeAuthed === undefined) {
    next()
    return
  }


  let user = store.state.user
  if (!user) {
    user = await store.dispatch('CALL_REQUEST', () => store.dispatch('GET_USER'))
  }

  

  if(to.meta.shouldBeAuthed && !user) {
    next('/login')
    return
  }
  if (!to.meta.shouldBeAuthed && user) {
    next('/')
    return
  }
  next()
})