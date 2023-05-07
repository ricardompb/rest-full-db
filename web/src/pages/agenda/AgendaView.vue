<template>
  <div class="q-pa-sm">
    <q-toolbar class="bg-primary text-white">
      <b>Agendas</b>
      <q-space/>
      <q-btn flat dense round icon="add" @click="$router.push('/agenda/form')">
        <q-tooltip class="bg-green">Adicionar nova agenda</q-tooltip>
      </q-btn>
    </q-toolbar>
    <div class="q-pt-sm">
      <q-table :rows="form.rows"
               :columns="columns"
               class="cursor-pointer"
               dense
               flat
               @row-click="rowClick"
               hide-pagination
               hide-selected-banner
               :rows-per-page-options="[0]"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { loading, formatPhone, notify } from 'boot/app'

export default defineComponent({
  name: 'AgendaView',
  data () {
    return {
      form: {
        rows: []
      },
      columns: [
        { name: 'id', label: 'ID', field: row => row.id, align: 'left' },
        { name: 'nome', label: 'Nome', field: row => row.nome, align: 'left' },
        { name: 'telefone', label: 'Telefone', field: row => row.telefone, align: 'left', format: val => formatPhone(val) }
      ]
    }
  },
  async created () {
    loading.show(this)
    try {
      const res = await this.$api.get('/agendas/v1')
      const { message } = res.data
      if (message) {
        notify({
          type: 'negative',
          message
        })
        return
      }
      this.form.rows = res.data
    } finally {
      loading.hide(this)
    }
  },
  methods: {
    async rowClick (_, row) {
      this.$router.push(`/agenda/form?id=${row.id}`)
    }
  }
})
</script>
