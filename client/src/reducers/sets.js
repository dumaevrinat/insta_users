import {ADD_ACCOUNTS, ADD_SET, CLEAR_ACCOUNTS, CLEAR_SETS, DELETE_SET, UPDATE_SET} from '../actions/types'

const initialState = {
    sets: [
        {
            id: '0598cf75-bbe5-40d1-85e8-5d04f2a2ad6a',
            name: 'Untitled set #1',
            accounts: []
        },
        {
            id: '6ad7ade8-573a-467f-97b6-81204f6d14a4',
            name: 'Untitled set #2',
            accounts: []
        }
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, action.payload]
            }
        case UPDATE_SET:
            return {
                ...state,
                sets: state.sets.map((s) => s.id === action.payload.id ? action.payload : s)
            }
        case DELETE_SET:
            return {
                ...state,
                sets: state.sets.filter((s) => s.id !== action.payload)
            }
        case CLEAR_SETS:
            return {
                ...state,
                sets: []
            }
        case ADD_ACCOUNTS:
            const set = state.sets.find(s => s.id === action.payload.setId)
            const accounts = [...set.accounts, ...action.payload.accounts]

            set.accounts = [...new Map(accounts.map(account => [account.node.id, account])).values()]

            return {
                ...state,
                sets: state.sets.map((s) => s.id === action.payload.setId ? set: s)
            }
        case CLEAR_ACCOUNTS:
            return {
                ...state,
                sets: state.sets.map((s) => s.id === action.payload ? {...s, accounts: []}: s)
            }
        default:
            return state
    }
}
