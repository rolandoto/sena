import { userConstants } from "../../_constants";

export function authReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.USERLOGIN_REQUEST:
            return {
                validating: true,
            };
        case userConstants.USERLOGIN_SUCCESS:
            return {
                auth: action.response.auth,
                token: action.response.token,
                userInfo: action.response.userInfo,
                message: action.response.message,
            };
        case userConstants.USERLOGIN_FAILURE:
            return {
                auth: action.response.auth,
                token: action.response.token,
                message: action.response.message,
            };
        case userConstants.USERLOGOUT:
            return {};
        default:
            return state;
    }
}
