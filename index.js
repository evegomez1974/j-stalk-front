import { createPinia, PiniaVuePlugin } from 'pinia'
import { createORM } from 'pinia-orm'

Vue.use(PiniaVuePlugin)
const pinia = createPinia().use(createORM())
