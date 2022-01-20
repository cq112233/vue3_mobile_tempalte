import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
const store = createStore({
  modules: {
    user,
    app,
    permission
  }
})

export default store
