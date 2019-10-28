import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/main'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/profile/:uid',
      name: 'view-profile',
      component: () => import('./views/ViewProfile.vue')
    },
    {
      path: '/post/:id',
      name: 'view-post',
      component: () => import('./views/ViewPost.vue')
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('./views/CreatePost.vue'),
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          next();
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/wall',
      name: 'wall',
      component: () => import('./views/Wall.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          next();
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/Chat.vue'),
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          next();
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          next();
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          next();
        } else {
          next({ path: '/' })
        }
      }
    }
  ]
})

export default router;
