import {
    SEARCH_USER,
    SEARCH_USER_CLEAR,
    SET_ERROR_SEARCH_USERS,
    SET_STATUS_SEARCH_USERS
} from './types'

import {searchByQuery} from "../api"
export const searchUsers = (users) => ({
    type: SEARCH_USER,
    payload: users
})

export const clearSearchUsers = () => ({
    type: SEARCH_USER_CLEAR
})

export const setStatusSearchUsers = (status) => ({
    type: SET_STATUS_SEARCH_USERS,
    payload: status
})

export const setErrorSearchUsers = (error) => ({
    type: SET_ERROR_SEARCH_USERS,
    payload: error
})
export const search = (query) => (dispatch) => {
    dispatch(setStatusSearchUsers('loading'))

    searchByQuery(query)
        .then((result) => {
            if (result.data.users) {
                dispatch(searchUsers(result.data.users))
                dispatch(setStatusSearchUsers('succeeded'))
            } else {
                dispatch(setErrorSearchUsers({message: 'Error getting information from Instagram'}))
            }
        })
        .catch(() => {
            dispatch(setErrorSearchUsers({message: 'Error getting information from Instagram'}))
        })
}
