import { anonymousRouter, routes } from 'boot/pages'

export default ({ app }) => {
  console.log('%c✔ plugin: Trabalho Final - APP', 'color: #148f32')

  anonymousRouter.push('/login')
  routes.push({
    path: '/login',
    component: () => import('pages/login/LoginForm.vue')
  })
}
