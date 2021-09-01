import { userConstants } from "../../_constants";

export const chagePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USERUPDATEPASSWORD_REQUEST:
            return {
                requestLoading: true,
            };
        case userConstants.USERUPDATEPASSWORD_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.USERUPDATEPASSWORD_FAILURE:
            return {
                status: action.response.status,
                type: action.response.type,
                message: action.response.message,
            };
        default:
            return state;
    }
};
