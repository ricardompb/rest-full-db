const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/agenda',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'view', component: () => import('pages/agenda/AgendaView.vue') },
      { path: 'form', component: () => import('pages/agenda/AgendaForm.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
