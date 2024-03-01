export const AddDocs = () => import('../..\\components\\addDocs.vue' /* webpackChunkName: "components/add-docs" */).then(c => wrapFunctional(c.default || c))
export const CardCompany = () => import('../..\\components\\cardCompany.vue' /* webpackChunkName: "components/card-company" */).then(c => wrapFunctional(c.default || c))
export const CardStudent = () => import('../..\\components\\cardStudent.vue' /* webpackChunkName: "components/card-student" */).then(c => wrapFunctional(c.default || c))
export const Contact = () => import('../..\\components\\contact.vue' /* webpackChunkName: "components/contact" */).then(c => wrapFunctional(c.default || c))
export const ForgetWord = () => import('../..\\components\\forgetWord.vue' /* webpackChunkName: "components/forget-word" */).then(c => wrapFunctional(c.default || c))
export const FormLogin = () => import('../..\\components\\formLogin.vue' /* webpackChunkName: "components/form-login" */).then(c => wrapFunctional(c.default || c))
export const FormSignUp = () => import('../..\\components\\formSignUp.vue' /* webpackChunkName: "components/form-sign-up" */).then(c => wrapFunctional(c.default || c))
export const InfosUserProfil = () => import('../..\\components\\infosUserProfil.vue' /* webpackChunkName: "components/infos-user-profil" */).then(c => wrapFunctional(c.default || c))
export const ListDocsUser = () => import('../..\\components\\listDocsUser.vue' /* webpackChunkName: "components/list-docs-user" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../..\\components\\navBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const NavBarDeco = () => import('../..\\components\\navBarDeco.vue' /* webpackChunkName: "components/nav-bar-deco" */).then(c => wrapFunctional(c.default || c))
export const NotConnected = () => import('../..\\components\\notConnected.vue' /* webpackChunkName: "components/not-connected" */).then(c => wrapFunctional(c.default || c))
export const PDFViewer = () => import('../..\\components\\PDFViewer.vue' /* webpackChunkName: "components/p-d-f-viewer" */).then(c => wrapFunctional(c.default || c))
export const JobOffersCardJobOffer = () => import('../..\\components\\jobOffers\\cardJobOffer.vue' /* webpackChunkName: "components/job-offers-card-job-offer" */).then(c => wrapFunctional(c.default || c))
export const JobOffersCreateJobOffer = () => import('../..\\components\\jobOffers\\createJobOffer.vue' /* webpackChunkName: "components/job-offers-create-job-offer" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
