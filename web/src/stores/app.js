import { defineStore } from 'pinia'

export const segurancaStore = defineStore('auth', {
  state: () => ({
    auth: {
      token: null
    }
  }),
  actions: {
    async login ({ login, senha }) {}
  }
})
