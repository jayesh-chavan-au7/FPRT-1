import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './UserType'

const initialState = {
    loading : false,
    profile : {},
    error : ''
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading : true
            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading : false,
                profile : {...action.payload}
            }
        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state;
    }
}

export default userReducer