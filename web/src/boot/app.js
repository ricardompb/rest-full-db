import { anonymousRouter, routes } from 'boot/pages'
import MainLayout from 'layouts/MainLayout.vue'

export default ({ app }) => {
  console.log('%c✔ plugin: Trabalho Final - APP', 'color: #148f32')

  anonymousRouter.push('/login')

  routes.push([{
    path: '/login',
    component: () => import('pages/login/LoginForm.vue')
  }, {
    path: '/agenda/form',
    component: MainLayout,
    children: [
      { path: 'form', component: () => import('pages/agenda/AgendaForm.vue') }
    ]
  }])
}
