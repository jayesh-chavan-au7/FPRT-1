import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_ADMIN_PRODUCT_SUCCEESS,
    FETCH_ADMIN_VENDOR_SUCCEESS,
    FETCH_ADMIN_USERS_SUCCEESS,
    FETCH_ADMIN_BRANDS_SUCCEESS,
    FETCH_ADMIN_CATEGORIES_SUCCEESS
} from "./UserType";

const initialState = {
    loading: false,
    profile: {},
    adminProducts: [],
    adminVendors: [],
    adminUsers:[],
    adminBrands:[],
    adminCategories:[],
    error: "",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: { ...action.payload },
            };
        case FETCH_ADMIN_PRODUCT_SUCCEESS:
            return {
                ...state,
                loading: false,
                adminProducts: action.payload,
            };
        case FETCH_ADMIN_VENDOR_SUCCEESS:
            return {
                ...state,
                loading: false,
                adminVendors: action.payload,
            };
        case FETCH_ADMIN_USERS_SUCCEESS:
            return {
                ...state,
                loading: false,
                adminUsers: action.payload,
            };
        case FETCH_ADMIN_BRANDS_SUCCEESS:
            return {
                ...state,
                loading: false,
                adminBrands: action.payload,
            };
        case FETCH_ADMIN_CATEGORIES_SUCCEESS:
            return {
                ...state,
                loading: false,
                adminCategories: action.payload,
            };                
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
