import { anonymousRouter, routes } from 'boot/pages'
import { Dialog, Notify } from 'quasar'

export function notify (params) {
  const opts = { ...params, html: true }
  if (params.type === 'negative') {
    opts.timeout = 10000
  }
  return Notify.create(opts)
}

export const loading = {
  active: false,
  show (self) {
    if (this.active) return
    this.active = true
    self.$q.loading.show()
  },
  hide (self) {
    this.active = false
    self.$q.loading.hide()
  }
}

export const formatPhone = val => {
  if (!val) return
  return val.length === 10
    ? val.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    : val.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export function confirm (message, okCb, cancelCb) {
  Dialog.create({
    message,
    html: true,
    ok: 'Sim',
    cancel: 'Não',
    focus: 'cancel',
    persistent: true,
    title: 'Confirmação'
  }).onOk(() => okCb())
    .onCancel(() => cancelCb ? cancelCb() : null)
}

export default ({ app }) => {
  console.log('%c✔ plugin: Trabalho Final - APP', 'color: #148f32')

  anonymousRouter.push('/login')

  routes.push([{
    path: '/login',
    component: () => import('pages/login/LoginForm.vue')
  }, {
    path: '/agenda',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'view', component: () => import('pages/agenda/AgendaView.vue') },
      { path: 'form', component: () => import('pages/agenda/AgendaForm.vue') }
    ]
  }])
}
