import { createPinia } from 'pinia'
import { createPiniaORMPlugin } from 'pinia-orm'

const pinia = createPinia()
pinia.use(createPiniaORMPlugin())