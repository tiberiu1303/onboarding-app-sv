import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate"
import userModule from './userModule'
import taskModule from './taskModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userModule,
        taskModule,
    },
    plugins: [createPersistedState()]
})