import { httpRequest } from '../../httpRequest'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './UserType'

export const fetchUserRequest = () => {
    return {
        type : FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = profileData => {
    return {
        type : FETCH_USER_SUCCESS,
        payload : profileData
    }
}

export const fetchUserFailure = error => {
    return {
        type : FETCH_USER_FAILURE,
        payload : error
    }
}

export const getUser = () => {

    return dispatch => {
        dispatch(fetchUserRequest())
        httpRequest.get('/user/get-user')
            .then(responce => {
                const profileData = responce.data
                dispatch(fetchUserSuccess(profileData))
            })
            .catch(error => {
                const errorMsg = error.meassage
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}
