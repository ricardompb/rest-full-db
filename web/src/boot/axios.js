import { boot } from 'quasar/wrappers'
import { segurancaStore } from 'stores/app'
import { notify } from 'boot/app'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.SERVER_URL })

api.interceptors.request.use(
  (config) => {
    const store = segurancaStore()
    const { token } = store.auth
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

api.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    notify({ type: 'negative', message: error.response.data.message })
    if (error.response.status === 401) {
      const store = segurancaStore()
      store.logoff().catch()
    }
    return Promise.reject(error)
  })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
