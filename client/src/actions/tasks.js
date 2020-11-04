import {ADD_TASK, CLEAR_TASKS, DELETE_TASK, SET_DELAY_IN_TASK, UPDATE_TASK} from './types'

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id
})

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task
})

export const clearTasks = () => ({
    type: CLEAR_TASKS
})

export const setDelayInTask = (delay) => ({
    type: SET_DELAY_IN_TASK,
    payload: delay
})

export const nextTask = () => (dispatch, getState) => {
    const task = getState().tasks.tasks.find(t => t.isWorking === false && t.isDone === false)

    if (task) {
        dispatch(runTask(task))
    }
}

export const runTask = (task) => async (dispatch, getState) => {
    const workingTask = getState().tasks.tasks.find(t => t.isWorking === true)

    if (!workingTask) {
        dispatch(updateTask({...task, isWorking: true}))

        await dispatch(task.action(...task.args))

        dispatch(updateTask({...task, isWorking: false, isDone: true}))

        dispatch(nextTask())
    }
}
