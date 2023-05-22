import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0835af81 = () => interopDefault(import('..\\pages\\home.vue' /* webpackChunkName: "pages/home" */))
const _2fcb9fd0 = () => interopDefault(import('..\\pages\\info.vue' /* webpackChunkName: "pages/info" */))
const _3e542498 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _52906176 = () => interopDefault(import('..\\pages\\typefaces\\_.vue' /* webpackChunkName: "pages/typefaces/_" */))
const _087489e2 = () => interopDefault(import('..\\pages\\services\\_.vue' /* webpackChunkName: "pages/services/_" */))
const _89aa316e = () => interopDefault(import('..\\pages\\products\\_.vue' /* webpackChunkName: "pages/products/_" */))
const _52bd8420 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _0835af81,
    pathToRegexpOptions: {"strict":true},
    name: "home"
  }, {
    path: "/info",
    component: _2fcb9fd0,
    pathToRegexpOptions: {"strict":true},
    name: "info"
  }, {
    path: "/test",
    component: _3e542498,
    pathToRegexpOptions: {"strict":true},
    name: "test"
  }, {
    path: "/typefaces/*",
    component: _52906176,
    pathToRegexpOptions: {"strict":true},
    name: "typefaces-all"
  }, {
    path: "/services/*",
    component: _087489e2,
    pathToRegexpOptions: {"strict":true},
    name: "services-all"
  }, {
    path: "/products/*",
    component: _89aa316e,
    pathToRegexpOptions: {"strict":true},
    name: "products-all"
  }, {
    path: "/",
    component: _52bd8420,
    pathToRegexpOptions: {"strict":true},
    name: "index"
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
