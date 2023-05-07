<template>
  <div class="q-pa-sm">
    <q-toolbar class="bg-primary text-white">
      <b>Agenda: {{ display }}</b>
      <q-space/>
      <q-btn flat dense icon="save" label="Salvar" @click="salvar">
        <q-tooltip class="bg-green">Salvar</q-tooltip>
      </q-btn>
      <q-btn flat dense icon="delete" label="Excluir" @click="remover">
        <q-tooltip class="bg-green">Remover</q-tooltip>
      </q-btn>
      <q-btn flat dense icon="door_back" label="Sair" @click="$router.go(-1)">
        <q-tooltip class="bg-green">Sair</q-tooltip>
      </q-btn>
    </q-toolbar>
    <div class="q-pt-sm">
      <div class="row q-col-gutter-sm">
        <q-input label="Id"
                 class="col-md-2 col-xs-12"
                 v-model="form.data.id"
                 :readonly="true"/>
        <q-input label="Nome"
                 v-model="form.data.nome"
                 class="col-md-5 col-xs-12"/>
        <q-input label="Telefone"
                 v-mask="['(##) ####-####', '(##) #####-####']"
                 v-model="form.data.telefone"
                 class="col-md-5 col-xs-12"/>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { loading, confirm, notify } from 'boot/app'

export default defineComponent({
  name: 'AgendaForm',
  data () {
    return {
      form: {
        data: {}
      }
    }
  },
  computed: {
    display () {
      return this.$route.query.id ? this.$route.query.id : '[NOVO]'
    }
  },
  methods: {
    async salvar () {
      let res
      if (!this.$route.query.id) {
        res = await this.$api.post('/agendas/v1', { ...this.form.data })
      } else {
        res = await this.$api.put(`/agendas/v1/${this.$route.query.id}`, { ...this.form.data })
      }

      const { message } = res.data
      if (message) {
        notify({
          type: 'negative',
          message
        })
        return
      }

      await this.$router.go(-1)
    },
    async remover () {
      await confirm('Deseja realmente excluir a agenda?', async () => {
        await this.$api.delete(`/agendas/v1/${this.$route.query.id}`)
        await this.$router.go(-1)
      })
    }
  },
  async created () {
    loading.show(this)
    try {
      if (this.$route.query.id) {
        const res = await this.$api.get(`/agendas/v1/${this.$route.query.id}`)
        this.form.data = res.data
      }
    } finally {
      loading.hide(this)
    }
  }
})
</script>
