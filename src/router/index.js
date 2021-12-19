import { createRouter, createWebHashHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'

import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'

import EventService from '@/service/EventService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/about-us',
    name: 'About',

    component: About,
  },
  {
    path: '/about',
    redirect: { name: 'About' },
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: async (to) => {
      try {
        const { data } = await EventService.getEvent(to.params.id)
        GStore.event = data
      } catch (error) {
        if (error.response && error.response.status == 404) {
          return {
            name: '404Resource',
            params: { resource: 'event' },
          }
        } else {
          return { name: 'NetworkError' }
        }
      }
    },
    children: [
      {
        path: '',
        name: 'EventDetails',

        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',

        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',

        component: EventEdit,
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events' + to.params.afterEvent }
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },

  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
