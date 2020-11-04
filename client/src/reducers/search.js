import {
    SEARCH_USER,
    SEARCH_USER_CLEAR,
    SET_ERROR_SEARCH_USERS,
    SET_STATUS_SEARCH_USERS
} from '../actions/types'

const initialState = {
    searchUsers: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_SEARCH_USERS:
            return {
                ...state,
                status: action.payload
            }
        case SET_ERROR_SEARCH_USERS:
            return {
                ...state,
                status: 'failed',
                error: action.payload
            }
        case SEARCH_USER:
            return {
                ...state,
                searchUsers: action.payload
            }
        case SEARCH_USER_CLEAR:
            return {
                ...state,
                searchUsers: []
            }
        default:
            return state
    }
}
