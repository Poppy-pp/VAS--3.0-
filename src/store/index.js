import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'
import storage from './modules/storage'

const store = new Vuex.Store({
    modules: {
        app,
        permission,
        user,
        tagsView,
        storage
    },
    getters,
    strict: false,
    state: {
        IMG_URL: 'image/',
        ORIGINAL_URL: 'img/',
        userLogin: false,//员工登陆权限
        baseUrl: '/template/' //保险模板默认URL
    }
})

export default store
