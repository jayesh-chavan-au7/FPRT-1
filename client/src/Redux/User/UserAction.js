import { httpRequest } from "../../httpRequest";
import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_ADMIN_PRODUCT_SUCCEESS,
    FETCH_ADMIN_VENDOR_SUCCEESS,
    FETCH_ADMIN_USERS_SUCCEESS,
    FETCH_ADMIN_BRANDS_SUCCEESS,
    FETCH_ADMIN_CATEGORIES_SUCCEESS,
    FETCH_USERS_PRODUCTS_SUCCESS
} from "./UserType";

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    };
};

export const fetchUserSuccess = (profileData) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: profileData,
    };
};

export const fetchAdminProductSuccess = (productsData) => {
    return {
        type: FETCH_ADMIN_PRODUCT_SUCCEESS,
        payload: productsData,
    };
};

export const fetchAdminVendorsSuccess = (vendorsData) => {
    return {
        type: FETCH_ADMIN_VENDOR_SUCCEESS,
        payload: vendorsData,
    };
};

export const fetchAdminUsersSuccess = (usersData) => {
    return {
        type: FETCH_ADMIN_USERS_SUCCEESS,
        payload: usersData,
    };
};

export const fetchAdminBrandsSuccess = (brandsData) => {
    return {
        type: FETCH_ADMIN_BRANDS_SUCCEESS,
        payload: brandsData,
    };
};

export const fetchAdminCategoriesSuccess = (categoiesData) => {
    return {
        type: FETCH_ADMIN_CATEGORIES_SUCCEESS,
        payload: categoiesData,
    };
};

export const fetchUserProductSuccess = (productsData) => {
    return {
        type: FETCH_USERS_PRODUCTS_SUCCESS,
        payload: productsData,
    };
};

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error,
    };
};

export const getUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/user/get-user")
            .then((responce) => {
                const profileData = responce.data;
                dispatch(fetchUserSuccess(profileData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};

export const getAdminProducts = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/admin/getall-products")
            .then((responce) => {
                const productsData = responce.data;
                dispatch(fetchAdminProductSuccess(productsData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};

export const getAdminVendors = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/admin/getall-vendors?type=vendor")
            .then((responce) => {
                const vendorsData = responce.data;
                dispatch(fetchAdminVendorsSuccess(vendorsData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};

export const getAdminUsers = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/admin/getall-users?type=user")
            .then((responce) => {
                const usersData = responce.data;
                dispatch(fetchAdminUsersSuccess(usersData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};


export const getAdminBrands = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/admin/getall-brands")
            .then((responce) => {
                const brandsData = responce.data;
                dispatch(fetchAdminBrandsSuccess(brandsData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};


export const getAdminCategories = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/admin/getall-categories")
            .then((responce) => {
                const categoriesData = responce.data;
                dispatch(fetchAdminCategoriesSuccess(categoriesData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};
export const getUserProducts = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        httpRequest
            .get("/user/getall-products")
            .then((responce) => {
                const productsData = responce.data;
                dispatch(fetchUserProductSuccess(productsData));
            })
            .catch((error) => {
                const errorMsg = error.meassage;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};