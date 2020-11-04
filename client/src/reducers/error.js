import {CREATE_ERROR, SET_OPEN_ERROR} from "../actions/types"

const initialState = {
    isOpen: false,
    error: {
        message: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_OPEN_ERROR:
            return {
                ...state,
                isOpen: action.payload
            }
        default:
            return state
    }
}
