import {CREATE_ERROR, SET_OPEN_ERROR} from "./types"

export const setIsOpenError = (isOpen) => ({
    type: SET_OPEN_ERROR,
    payload: isOpen
})

export const createError = (error) => (dispatch) => {
    dispatch({
        type: CREATE_ERROR,
        payload: error
    })

    dispatch(setIsOpenError(true))
}
