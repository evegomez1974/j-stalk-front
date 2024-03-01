import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _01b6f912 = () => interopDefault(import('..\\pages\\addNewJobOffer.vue' /* webpackChunkName: "pages/addNewJobOffer" */))
const _cda83596 = () => interopDefault(import('..\\pages\\companiesList.vue' /* webpackChunkName: "pages/companiesList" */))
const _e86e2136 = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _c0550c6e = () => interopDefault(import('..\\pages\\notConneted.vue' /* webpackChunkName: "pages/notConneted" */))
const _c0e4ad60 = () => interopDefault(import('..\\pages\\profil.vue' /* webpackChunkName: "pages/profil" */))
const _0313d66c = () => interopDefault(import('..\\pages\\SignUp.vue' /* webpackChunkName: "pages/SignUp" */))
const _63005f6a = () => interopDefault(import('..\\pages\\studentsList.vue' /* webpackChunkName: "pages/studentsList" */))
const _52f6520e = () => interopDefault(import('..\\pages\\jobOffersList.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addNewJobOffer",
    component: _01b6f912,
    name: "addNewJobOffer"
  }, {
    path: "/companiesList",
    component: _cda83596,
    name: "companiesList"
  }, {
    path: "/Login",
    component: _e86e2136,
    name: "Login"
  }, {
    path: "/notConneted",
    component: _c0550c6e,
    name: "notConneted"
  }, {
    path: "/profil",
    component: _c0e4ad60,
    name: "profil"
  }, {
    path: "/SignUp",
    component: _0313d66c,
    name: "SignUp"
  }, {
    path: "/studentsList",
    component: _63005f6a,
    name: "studentsList"
  }, {
    path: "/",
    component: _52f6520e,
    name: "jobOffersList"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
