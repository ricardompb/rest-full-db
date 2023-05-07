import { boot } from 'quasar/wrappers'
import VueTheMask from 'vue-the-mask'

export default boot(({ app }) => {
  console.log('%c✔ plugin: Vendors', 'color: #148f32')
  app.use(VueTheMask)
})
