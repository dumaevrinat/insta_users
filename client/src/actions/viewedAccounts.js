import {ADD_VIEWED_ACCOUNT, CLEAR_VIEWED_ACCOUNTS, DELETE_VIEWED_ACCOUNT} from "./types"

export const addViewedAccount = (account) => ({
    type: ADD_VIEWED_ACCOUNT,
    payload: account
})

export const deleteViewedAccount = (accountId) => ({
    type: DELETE_VIEWED_ACCOUNT,
    payload: accountId
})

export const clearViewedAccounts = () => ({
    type: CLEAR_VIEWED_ACCOUNTS
})
