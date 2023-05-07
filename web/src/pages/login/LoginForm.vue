<template>
  <form class="row justify-center q-pt-lg">
    <div class="container q-pt-lg q-gutter-sm">
      <q-img src="./LoginForm.svg" width="350px"/>
      <q-input label="E-mail"
               :readonly="loading"
               v-model="form.login"
               autofocus/>
      <q-input label="Senha"
               :readonly="loading"
               v-model="form.senha"/>
      <div class="row">
        <q-btn @click="login"
               dense
               :loading="loading"
               color="primary"
               class="q-mt-sm col-md-12 col-xs-12">
          Entrar
        </q-btn>
      </div>
    </div>
  </form>
</template>

<script>
import { segurancaStore } from 'stores/app'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  setup () {
    const store = segurancaStore()
    const form = ref({})
    const loading = ref(false)
    const login = async () => {
      loading.value = true
      try {
        await store.login({ ...form.value })
      } finally {
        loading.value = false
      }
    }
    return { form, loading, login }
  }
})
</script>
