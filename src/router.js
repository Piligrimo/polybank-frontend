import { createWebHashHistory, createRouter } from 'vue-router'
import { store } from '@/store'

import MainPage from './components/MainPage.vue'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import TransactionPage from './components/TransactionPage.vue'
import History from './components/History.vue'

const routes = [
  { path: '/', component: MainPage, meta: {shouldBeAuthed: true} },
  { path: '/signup', component: SignUp, meta: {shouldBeAuthed: false} },
  { path: '/login', component: LogIn, meta: {shouldBeAuthed: false} },
  { path: '/transaction', component: TransactionPage, meta: {shouldBeAuthed: true} },
  { path: '/history', component: History, meta: {shouldBeAuthed: true} },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let user = store.state.user
  console.log(user, 1, to.path);
  if (!user) {
    user = await store.dispatch('CALL_REQUEST', () => store.dispatch('GET_USER'))
    console.log(user);

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