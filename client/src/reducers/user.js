import {GET_USER, SET_ERROR_GET_USER, SET_STATUS_GET_USER} from '../actions/types'

const initialState = {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_GET_USER:
            return {
                ...state,
                status: action.payload
            }
        case SET_ERROR_GET_USER:
            return {
                ...state,
                status: 'failed',
                error: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}
