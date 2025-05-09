import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import { Pages } from './types'
import MainLayout from '@/shared/layout/MainLayout.vue'
import { useStore } from '@/app/store/mainStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      meta: { title: '' },
      component: MainLayout,
      beforeEnter: (
        to: RouteLocationNormalizedGeneric,
        from: RouteLocationNormalizedLoadedGeneric,
        next: NavigationGuardNext,
      ) => {
        const store = useStore()

        switch (to.fullPath) {
          case '/chat':
            if (store.token) {
              next()
            } else {
              next(Pages.LOGIN)
            }
            break

          case '/login':
            if (store.token) {
              next(Pages.CHAT)
            } else {
              next()
            }
            break

          case '/signup':
            if (store.token) {
              next(Pages.CHAT)
            } else {
              next()
            }
            break

          default:
            next(Pages.LOGIN)
            break
        }
      },

      children: [
        {
          path: Pages.SIGNUP,
          name: 'signup',
          meta: { title: 'Зарегистрироваться' },
          component: () => import('@/pages/signup/Signup.vue'),
        },
        {
          path: Pages.LOGIN,
          name: 'login',
          meta: { title: 'Войти' },
          component: () => import('@/pages/login/Login.vue'),
        },
        {
          path: Pages.CHAT,
          name: 'chat',
          meta: { title: 'Чат' },
          component: () => import('@/pages/chat/ChannelsPage.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
