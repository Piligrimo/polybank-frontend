const axios = require('axios');
const instance = axios.create(
    {
        baseURL: "http://192.168.0.25:8081/",
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
    async transite({recieverId, sum, currency}) {
        try {
            const token = localStorage.getItem('token')
            await instance.put('/transite', { recieverId, sum, currency},{headers: {token}})
        } catch (e) {
            console.error(e)
        }
    }
}