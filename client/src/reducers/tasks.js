import {ADD_TASK, CLEAR_TASKS, DELETE_TASK, SET_DELAY_IN_TASK, UPDATE_TASK} from "../actions/types"

const initialState = {
    delayInTask: 2500,
    tasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((item) => item.id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((item) => item.id === action.payload.id ? action.payload : item)
            }
        case CLEAR_TASKS:
            return {
                ...state,
                tasks: []
            }
        case SET_DELAY_IN_TASK:
            return {
                ...state,
                delayInTask: action.payload
            }
        default:
            return state
    }
}
