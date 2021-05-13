import request from '../api/requests'
const state = {
    task: {},
    taskPeriods: {},
    tasks: {},
};
const mutations = {
    NEW_TASK(state, task) {
        state.task = task
    },
    TASK_PERIODS(state, periods) {
        state.taskPeriods = periods
    },
    TASKS(state, tasks) {
        state.tasks = tasks
    }
};

const actions = {
    NewTask({commit}, taskData) {
        return new Promise ((resolve, reject) => {
            request.newTask(taskData)
            .then(resp => {
                commit('NEW_TASK', resp.data.token)

                resolve (resp.data.message)
            })
            .catch(err => {
                reject(err.response.data.message)
              })
        })
    },
    getTaskPeriods({commit}) {
        return new Promise((resolve, reject) => {
            request.getTaskPeriods()
            .then(resp => {
                resolve (resp.data)
                commit('TASK_PERIODS', resp.data)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getTasks({commit}) {
        return new Promise((resolve, reject) => {
            request.getTasks()
            .then(resp => {
                resolve (resp.data)
                commit('TASKS', resp.data)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    }
};

const getters = {
    getTaskPeriods: state => {
        return state.taskPeriods
    },
    getTasks: state => {
        return state.tasks
    },
};

export default {
  state,
  mutations,
  getters,
  actions,
};