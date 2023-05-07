import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notify } from 'boot/app'

export const segurancaStore = defineStore('auth', {
  state: () => ({
    auth: {
      token: null
    }
  }),
  actions: {
    async login ({ login, senha }) {
      const res = await api.post('/seguranca/login', { login, senha })
      this.auth = res.data
      const { message } = this.auth
      if (message) {
        notify({ type: 'negative', message })
        return
      }
      await this.router.push('/')
    },
    async logoff () {
      this.auth = { token: null }
      await this.router.push('/login')
    }
  },
  persist: {
    key: 'app',
    paths: ['auth'],
    storage: localStorage
  }
})
