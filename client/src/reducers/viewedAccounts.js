import {ADD_VIEWED_ACCOUNT, CLEAR_VIEWED_ACCOUNTS, DELETE_VIEWED_ACCOUNT} from "../actions/types"

const initialState = {
    viewedAccounts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIEWED_ACCOUNT:
            console.log(action.payload)
            let newAccounts = []

            if (!state.viewedAccounts.find(a => a.id === action.payload.id)) {
                if (state.viewedAccounts.length === 10) {
                    newAccounts = [...state.viewedAccounts.slice(1), action.payload]
                } else {
                    console.log(action.payload)
                    newAccounts = [...state.viewedAccounts, action.payload]
                }
            } else {
                newAccounts = [...state.viewedAccounts]
            }

            return {
                ...state,
                viewedAccounts: newAccounts
            }
        case DELETE_VIEWED_ACCOUNT:
            return {
                ...state,
                viewedAccounts: state.viewedAccounts.filter((item) => item.id !== action.payload)
            }
        case CLEAR_VIEWED_ACCOUNTS:
            return {
                ...state,
                viewedAccounts: []
            }
        default:
            return state
    }
}
