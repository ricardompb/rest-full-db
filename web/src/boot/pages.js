import { segurancaStore } from 'stores/app'

export const anonymousRouter = []
export const routes = {
  routes: [],
  push (routes) {
    if (routes instanceof Array) {
      this.routes.push(...routes)
      return
    }
    this.routes.push(routes)
  },
  replace (newRoute) {
    const index = this.routes.findIndex(p => p.path === newRoute.path)
    if (index > -1) {
      this.routes[index] = newRoute
    }
  },
  addRoute (router) {
    this.routes.forEach(route => (router.addRoute(route)))
  }
}

export default ({ app, router }) => {
  console.log('%c✔ plugin: Trabalho Final', 'color: #148f32')
  router.beforeEach((to, from, next) => {
    const [path] = (to.fullPath || '').split('?')
    if (anonymousRouter.includes(path)) {
      return next()
    }
    const store = segurancaStore()
    const { token } = store.auth
    if (token) {
      return next()
    }
    return next('/login')
  })
  routes.addRoute(router)
}
