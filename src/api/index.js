const axios = require('axios');
const isLocal = false
const instance = axios.create(
    {
        baseURL: isLocal ? "http://localhost:8081/" : "https://smart-busy-chess.glitch.me/",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }
    })

export const api = {
    async me() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/me', {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async users() {
        try {
            const { data } = await instance.get('/users')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async signUp({login, password, confirmPassword}) {
        const { data } = await instance.post('/user', { login, password, confirmPassword })
        localStorage.setItem('token', data.token)
    },
    async signIn({login, password}) {
        const res = await instance.post('/login', { login, password })
        localStorage.setItem('token', res.data.token)
        return res
    },
    async transite({recieverId, sum, currency, comment}) {
        try {
            const token = localStorage.getItem('token')
            await instance.put('/transite', { recieverId, sum, currency, comment},{headers: {token}})
        } catch (e) {
            console.error(e)
        }
    },
    async getHistory() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/history', {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getCards() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/cards', {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async openPack() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.post('/open-pack', {}, {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getCollection() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/collection', {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getLots() {
        try {
            const { data } = await instance.get('/lots')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getLot(id) {
        try {
            const { data } = await instance.get('/lots/'+id)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getOffersByLot(id) {
        try {
            const { data } = await instance.get('/offers/'+id)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async createOffer(payload) {
        try {
            const token = localStorage.getItem('token')
            await instance.post('/offers', payload,  {headers: {token}})
        } catch (e) {
            console.error(e)
        }
    },
    async getMyLots() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/my-lots', {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async createLot(collectionItem) {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.post('/lots', {collectionItem},  {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async cancelTrade(lotId) {
        try {
            const { data } = await instance.delete('/lots/'+lotId)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async cancelOffer(offerId) {
        try {
            const { data } = await instance.delete('/offers/'+offerId)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async acceptTrade(lot, offer) {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.post('/accept', {lot, offer},  {headers: {token}})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async useCard(id) {
        try {
            const { data } = await instance.delete('/use-card/'+id)
            return data
        } catch (e) {
            console.error(e)
        }
    },
}