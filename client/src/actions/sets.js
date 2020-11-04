import {ADD_ACCOUNTS, ADD_SET, CLEAR_ACCOUNTS, CLEAR_SETS, DELETE_SET, UPDATE_SET} from './types'

import {createError} from "./error"
import {getLikesOnPost} from "../api"
import {isTaskStop, timeout} from "../utils"

export const addSet = (set) => ({
    type: ADD_SET,
    payload: set
})

export const updateSet = (set) => ({
    type: UPDATE_SET,
    payload: set
})

export const deleteSet = (id) => ({
    type: DELETE_SET,
    payload: id
})

export const clearSets = () => ({
    type: CLEAR_SETS
})

export const addAccounts = (setId, accounts) => ({
    type: ADD_ACCOUNTS,
    payload: {setId, accounts}
})

export const clearAccounts = (setId) => ({
    type: CLEAR_ACCOUNTS,
    payload: setId
})

export const addAllAccountsFromLikes = (shortcode, setId, taskId) => async (dispatch, getState) => {
    let hasNextPage = true
    let after = ''

    while (hasNextPage && !isTaskStop(getState().tasks.tasks.find(t => t.id === taskId))) {
        await getLikesOnPost(shortcode, after)
            .then((result) => {
                if (result.data.data) {
                    const edgeLikedBy = result.data.data.shortcode_media.edge_liked_by

                    dispatch(addAccounts(setId, edgeLikedBy.edges))

                    hasNextPage = edgeLikedBy.page_info.has_next_page
                    after = edgeLikedBy.page_info.end_cursor
                } else {
                    dispatch(createError({message: 'Error getting information from Instagram'}))
                    hasNextPage = false
                }
            })
            .catch((error) => {
                dispatch(createError({message: 'Error getting information from Instagram'}))
                hasNextPage = false
            })

        if (hasNextPage && !isTaskStop(getState().tasks.tasks.find(t => t.id === taskId))) {
            await timeout(getState().tasks.delayInTask)
        }
    }
}
