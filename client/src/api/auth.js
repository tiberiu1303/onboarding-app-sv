import axios from "axios"
// import store from '../state/index'
// import router from '../router/routes'


const BaseApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// BaseApi.interceptors.response.use(resp => {
//     return resp
// }, () => {
//     store.dispatch('LogOut')

//     router.push('/login')
// })

let Auth =  function() {
    const token = localStorage.getItem('auth-token')

    if (token) {
        BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
    return BaseApi
}

export default Auth