import request from '../api/requests'
const state = {
    auth_token: localStorage.getItem('auth-token') || '',
    users: {},
};
const mutations = {
    AUTH_REQUEST(state, token) {
        state.auth_token = token 
    },
    AUTH_LOGOUT(state) {
        state.auth_token = '' 
    },
    USERS(state, users) {
        state.users = users
    },
};

const actions = {
    SignUp({commit}, userData) {
        return new Promise ((resolve, reject) => {
            request.signUpUser(userData)
            .then(resp => {
                localStorage.setItem('auth-token', resp.data.token)
                commit('AUTH_REQUEST', resp.data.token)

                resolve (resp.data.message)
            })
            .catch((err) => {
                reject(err.response.data.message)
            })
        })
    },
    LogIn({commit}, userData) {
        return new Promise ((resolve, reject) => {
            request.loginUser(userData)
            .then(resp => {

                localStorage.setItem('auth-token', resp.data.token)
                commit('AUTH_REQUEST', resp.data.token)

                resolve (resp.data.message)
            })
            .catch((err) => {
                reject(err.response.data.message)
              })
        })
    },
    LogOut({commit}) {
        return new Promise((resolve, reject) => {
            request.logoutUser()
            .then(res => {
                localStorage.removeItem(res.data.message)
                commit('AUTH_LOGOUT')
                resolve('Logged out')
            })
            .catch(() => {
                reject('An error occurred on loginout!')
            })
        })
    },
    getUsers({commit}) {
        return new Promise((resolve, reject) => {
            request.getUsers()
            .then(resp => {
                resolve (resp.data)
                commit('USERS', resp.data)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};

const getters = {
    isAuthenticated: state => {
        return state.auth_token
    },
    getUsers: state => {
        return state.users
    },
};

export default {
  state,
  mutations,
  getters,
  actions,
};