import Auth from './auth'

export default {
    signUpUser(data) {
        return Auth().post('/user', data)
    },
    loginUser(data) {
        return Auth().post('/user/login', data)
    },
    logoutUser() {
        return Auth().post('/user/logout')
    },
    getUsers() {
        return Auth().get('/user')
    },
    newTask(data) {
        return Auth().post('/task', data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getTasks() {
        return Auth().get('/task')
    },
    getTaskPeriods() {
        return Auth().get('/task/periods')
    }
}