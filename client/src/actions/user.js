import {GET_USER, SET_ERROR_GET_USER, SET_STATUS_GET_USER} from './types'

import {getUserInfo} from "../api"

export const setStatusGetUser = (status) => ({
    type: SET_STATUS_GET_USER,
    payload: status
})

export const setErrorGetUser = (error) => ({
    type: SET_ERROR_GET_USER,
    payload: error
})

export const addUser = (user) => ({
    type: GET_USER,
    payload: user
})

export const getUser = (username) => (dispatch) => {
    dispatch(setStatusGetUser('loading'))

    getUserInfo(username)
        .then((result) => {
            if (result.data.graphql) {
                dispatch(addUser(result.data.graphql.user))
                dispatch(setStatusGetUser('succeeded'))
            } else {
                dispatch(setErrorGetUser({message: 'Error getting information from Instagram'}))
            }
        })
        .catch((error) => {
            if (error.response && (error.response.status === 404)) {
                dispatch(setErrorGetUser({message: 'Error getting information from Instagram', status: 404}))
            } else {
                dispatch(setErrorGetUser({message: 'Error getting information from Instagram'}))
            }
        })
}
