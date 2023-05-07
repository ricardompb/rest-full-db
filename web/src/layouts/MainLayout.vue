<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          Trabalho Final
        </q-toolbar-title>

        <q-separator/>
        <q-btn icon="power_settings_new" flat dense @click="logoff" />

      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen"
              show-if-above
              bordered>
      <q-list>
        <EssentialLink v-for="link in essentialLinks"
                       :key="link.title"
                       v-bind="link"/>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { segurancaStore } from 'stores/app'

const linksList = [
  {
    title: 'Agenda',
    caption: 'Agenda telefonica',
    icon: 'event_note',
    link: '/agenda/form'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = segurancaStore()
    const logoff = async () => {
      await store.logoff()
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logoff
    }
  }
})
</script>
